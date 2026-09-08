import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'dark' | 'light';

/** Mesma chave lida pelo script inline do index.html. */
export const STORAGE_KEY = 'sapient-theme';

/**
 * O escuro é o tema da marca, então ele é o padrão — inclusive para quem tem o
 * sistema em claro. `prefers-color-scheme` não entra: a escolha aqui é
 * explícita e fica guardada.
 */
export const DEFAULT_THEME: Theme = 'dark';

/**
 * O atributo no <html> é a fonte da verdade, não um estado do React.
 *
 * Quem lê o tema não é só o botão: o shader do hero e do CTA precisa recarregar
 * a paleta quando ele muda. Com um `useState` por componente, cada um teria a
 * sua cópia e o clique na navbar não chegaria aos outros. Observando o atributo,
 * todo mundo lê o mesmo lugar — inclusive o valor que o script inline do
 * index.html escreveu antes do React existir.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  // Outra aba trocando o tema também conta.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      applyTheme(e.newValue === 'light' ? 'light' : 'dark');
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    observer.disconnect();
    window.removeEventListener('storage', onStorage);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

/**
 * O escuro não escreve `data-theme`. Assim o seletor `[data-theme='light']` dos
 * tokens é o único caso especial, e o CSS base continua sendo o tema da marca —
 * quem lê a folha de estilo vê o padrão sem precisar cruzar seletores.
 */
export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'light') root.setAttribute('data-theme', 'light');
  else root.removeAttribute('data-theme');
}

/** Só o valor, para quem apenas reage à troca. */
export function useThemeValue(): Theme {
  return useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_THEME);
}

export function useTheme() {
  const theme = useThemeValue();

  const setTheme = useCallback((proximo: Theme) => {
    applyTheme(proximo);
    try {
      localStorage.setItem(STORAGE_KEY, proximo);
    } catch {
      // Navegação privada: a escolha vale só para esta visita, e tudo bem.
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(getSnapshot() === 'dark' ? 'light' : 'dark');
  }, [setTheme]);

  return { theme, setTheme, toggle };
}
