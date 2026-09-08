import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/theme/useTheme';

/**
 * Alterna claro e escuro.
 *
 * Os dois ícones ficam empilhados na mesma célula de grid e trocam por opacidade
 * e rotação, em vez de um substituir o outro na árvore. Assim a caixa nunca
 * muda de tamanho no meio da transição e a navbar não treme.
 *
 * O rótulo anuncia o destino ("Ativar tema claro"), não o estado atual: é o que
 * um leitor de tela precisa ouvir antes de decidir se aperta.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const indoParaClaro = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={indoParaClaro ? 'Ativar tema claro' : 'Ativar tema escuro'}
      title={indoParaClaro ? 'Tema claro' : 'Tema escuro'}
      className={`grid h-9 w-9 place-items-center rounded-full border border-ink-primary/10 bg-ink-primary/[0.04] text-ink-primary/80 transition-colors hover:border-ink-primary/20 hover:bg-ink-primary/[0.08] hover:text-ink-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 ${className}`}
    >
      <span className="grid h-5 w-5 place-items-center [&>*]:col-start-1 [&>*]:row-start-1">
        <Sun
          aria-hidden="true"
          className={`h-5 w-5 transition-all duration-300 ${
            indoParaClaro ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
          }`}
        />
        <Moon
          aria-hidden="true"
          className={`h-5 w-5 transition-all duration-300 ${
            indoParaClaro ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />
      </span>
    </button>
  );
}

export default ThemeToggle;
