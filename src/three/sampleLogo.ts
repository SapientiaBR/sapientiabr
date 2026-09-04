/**
 * Converte um PNG com canal alfa numa nuvem de partículas.
 *
 * A ideia: desenhar a imagem num canvas fora da tela, ler os pixels e ficar
 * com os que têm alfa acima do limiar. Cada pixel sobrevivente vira uma
 * partícula que carrega a própria cor — então a nuvem reproduz o gradiente
 * real da logo, sem precisar recriá-lo no shader.
 */

export interface ParticleCloud {
  /** xyz por partícula, normalizado no intervalo [-1, 1] pelo maior lado. */
  positions: Float32Array;
  /** rgb por partícula, 0..1. */
  colors: Float32Array;
  /** Quatro valores aleatórios por partícula, para variar o movimento. */
  seeds: Float32Array;
  count: number;
  /** Largura / altura do recorte útil da imagem. */
  aspect: number;
}

export interface SampleOptions {
  /** Largura em que a imagem é lida. Mais alto = mais partículas candidatas. */
  sampleWidth?: number;
  /** Alfa mínimo (0-255) para o pixel virar partícula. */
  alphaThreshold?: number;
  /** Teto de partículas. O excedente é descartado por amostragem. */
  maxCount?: number;
  /**
   * Mantém apenas a maior faixa horizontal contínua de conteúdo.
   *
   * A logo é um lockup: a coruja em cima e duas linhas de texto embaixo,
   * separadas por linhas totalmente transparentes. Como partículas, o texto
   * vira um borrão ilegível — e ele já aparece por extenso na navbar. Isolar a
   * maior faixa deixa só a coruja, sem depender de recorte fixo.
   */
  isolateLargestBand?: boolean;
}

/** Gerador determinístico: a mesma logo produz sempre a mesma nuvem. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
    img.src = src;
  });
}

export async function sampleImageToParticles(
  src: string,
  {
    sampleWidth = 620,
    alphaThreshold = 40,
    maxCount = 40000,
    isolateLargestBand = true,
  }: SampleOptions = {},
): Promise<ParticleCloud> {
  const img = await loadImage(src);

  const w = sampleWidth;
  const h = Math.max(1, Math.round((img.naturalHeight / img.naturalWidth) * w));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Canvas 2D indisponível');
  ctx.drawImage(img, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);

  // A logo vem com bastante área transparente em volta. Recortar pelo alfa faz
  // o desenho ocupar o quadro inteiro em vez de flutuar pequeno no meio.
  let minX = w;
  let minY = h;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > alphaThreshold) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) throw new Error('Imagem sem pixels acima do limiar de alfa');

  if (isolateLargestBand) {
    // Conta pixels opacos por linha e agrupa as linhas contíguas não vazias.
    // A faixa com mais pixels é a marca; as demais são texto do lockup.
    const perRow = new Int32Array(h);
    for (let y = minY; y <= maxY; y++) {
      let c = 0;
      for (let x = minX; x <= maxX; x++) {
        if (data[(y * w + x) * 4 + 3] > alphaThreshold) c++;
      }
      perRow[y] = c;
    }

    let best = { y0: minY, y1: maxY, total: -1 };
    let start = -1;
    for (let y = minY; y <= maxY + 1; y++) {
      const filled = y <= maxY && perRow[y] > 0;
      if (filled && start < 0) start = y;
      if (!filled && start >= 0) {
        let total = 0;
        for (let k = start; k < y; k++) total += perRow[k];
        if (total > best.total) best = { y0: start, y1: y - 1, total };
        start = -1;
      }
    }

    minY = best.y0;
    maxY = best.y1;

    // O recorte vertical mudou; o horizontal precisa ser recalculado dentro dele.
    minX = w;
    maxX = -1;
    for (let y = minY; y <= maxY; y++) {
      for (let x = 0; x < w; x++) {
        if (data[(y * w + x) * 4 + 3] > alphaThreshold) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
        }
      }
    }
  }

  const boxW = maxX - minX + 1;
  const boxH = maxY - minY + 1;
  const half = Math.max(boxW, boxH) / 2;

  const candidates: number[] = [];
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (data[(y * w + x) * 4 + 3] > alphaThreshold) candidates.push(y * w + x);
    }
  }

  const rand = mulberry32(0x5a91e7);

  // Fisher-Yates parcial: embaralha só o necessário para escolher maxCount
  // sem viés espacial. Cortar os primeiros N sem embaralhar deixaria a nuvem
  // com o topo da imagem denso e a base vazia.
  const take = Math.min(maxCount, candidates.length);
  for (let i = 0; i < take; i++) {
    const j = i + Math.floor(rand() * (candidates.length - i));
    const tmp = candidates[i];
    candidates[i] = candidates[j];
    candidates[j] = tmp;
  }

  const positions = new Float32Array(take * 3);
  const colors = new Float32Array(take * 3);
  const seeds = new Float32Array(take * 4);

  for (let i = 0; i < take; i++) {
    const idx = candidates[i];
    const x = idx % w;
    const y = (idx - x) / w;
    const o = idx * 4;

    positions[i * 3] = (x - (minX + boxW / 2)) / half;
    // Y do canvas cresce para baixo; no espaço 3D cresce para cima.
    positions[i * 3 + 1] = -(y - (minY + boxH / 2)) / half;
    positions[i * 3 + 2] = 0;

    colors[i * 3] = data[o] / 255;
    colors[i * 3 + 1] = data[o + 1] / 255;
    colors[i * 3 + 2] = data[o + 2] / 255;

    seeds[i * 4] = rand();
    seeds[i * 4 + 1] = rand();
    seeds[i * 4 + 2] = rand();
    seeds[i * 4 + 3] = rand();
  }

  return { positions, colors, seeds, count: take, aspect: boxW / boxH };
}
