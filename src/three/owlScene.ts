import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Clock,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three';
import vertexShader from './shaders/owl.vert.glsl?raw';
import fragmentShader from './shaders/owl.frag.glsl?raw';
import { sampleImageToParticles, type ParticleCloud } from './sampleLogo';

export interface OwlSceneHandle {
  /** 0 = logo formada, 1 = dissolvida. Dirigido pelo scroll. */
  setProgress(value: number): void;
  /** Liga e desliga o loop de render (usado quando o hero sai da tela). */
  setRunning(running: boolean): void;
  resize(): void;
  dispose(): void;
}

export interface OwlSceneOptions {
  /** Teto de partículas. Reduzido em aparelhos fracos. */
  maxParticles?: number;
  /** Tamanho base do ponto, em pixels. */
  pointSize?: number;
}

/**
 * Cena Three.js da logo em partículas.
 *
 * Imperativa de propósito: nenhum React aqui dentro. O componente que a usa só
 * monta, alimenta com progresso de scroll e descarta. Isso mantém o loop de
 * render fora do ciclo de reconciliação.
 */
export async function createOwlScene(
  canvas: HTMLCanvasElement,
  logoSrc: string,
  { maxParticles = 40000, pointSize = 2.6 }: OwlSceneOptions = {},
): Promise<OwlSceneHandle> {
  const cloud: ParticleCloud = await sampleImageToParticles(logoSrc, {
    maxCount: maxParticles,
    sampleWidth: maxParticles > 20000 ? 620 : 420,
  });

  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: 'high-performance',
  });
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 3.2;

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(cloud.positions, 3));
  geometry.setAttribute('aColor', new BufferAttribute(cloud.colors, 3));
  geometry.setAttribute('aSeed', new BufferAttribute(cloud.seeds, 4));

  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new Vector2(999, 999) },
    uMouseRadius: { value: 0.45 },
    uMouseStrength: { value: 0.16 },
    uProgress: { value: 0 },
    uSize: { value: pointSize },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uScale: { value: 1 },
    uOpacity: { value: 0 },
  };

  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    // Aditivo: onde as partículas se sobrepõem o brilho soma, e é isso que dá
    // o núcleo luminoso no meio do desenho.
    blending: AdditiveBlending,
  });

  const points = new Points(geometry, material);
  scene.add(points);

  const clock = new Clock();
  const pointer = new Vector2(999, 999);
  const targetMouse = new Vector2(999, 999);

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const { clientWidth: w, clientHeight: h } = parent;
    if (w === 0 || h === 0) return;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);

    // Em telas estreitas o desenho precisa encolher para caber na altura;
    // em telas largas ele é limitado pela altura de qualquer forma.
    const fitByHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    uniforms.uScale.value = Math.min(fitByHeight * 0.42, (fitByHeight * camera.aspect) * 0.42);
  }

  function onPointerMove(event: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    const ndcX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    const visibleHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    targetMouse.set((ndcX * visibleHeight * camera.aspect) / 2, (ndcY * visibleHeight) / 2);
  }

  function onPointerLeave() {
    targetMouse.set(999, 999);
  }

  let running = true;
  let frame = 0;

  function loop() {
    frame = requestAnimationFrame(loop);
    if (!running) return;

    uniforms.uTime.value = clock.getElapsedTime();

    // Suaviza o cursor: seguir o ponteiro cru faz a repulsão saltar entre frames.
    pointer.lerp(targetMouse, 0.12);
    uniforms.uMouse.value.copy(pointer);

    // Fade-in de entrada, uma vez só.
    if (uniforms.uOpacity.value < 0.85) {
      uniforms.uOpacity.value = Math.min(0.85, uniforms.uOpacity.value + 0.012);
    }

    renderer.render(scene, camera);
  }

  resize();
  window.addEventListener('resize', resize);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerleave', onPointerLeave);
  loop();

  return {
    setProgress(value) {
      uniforms.uProgress.value = value;
    },
    setRunning(value) {
      running = value;
      // Sem isso, o delta acumulado enquanto pausado faria a animação saltar
      // ao voltar para a tela.
      if (value) clock.getDelta();
    },
    resize,
    dispose() {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
