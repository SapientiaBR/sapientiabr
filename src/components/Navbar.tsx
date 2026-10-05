import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Link } from 'react-router-dom';
import sapientLogo from '@/assets/sapient-logo.png';
import { useAncora } from '@/lib/ancora';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { ancora, naHome } = useAncora();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-sapient-deep/85 backdrop-blur-xl py-2 shadow-lg border-b border-ink-primary/[0.06]'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href={naHome ? '#' : '/'} className="flex items-center">
          <img
            src={sapientLogo}
            alt="Sapient.IA Logo"
            className="h-10"
          />
          <div className="ml-2">
            <h1 className="text-ink-primary text-xl font-bold">SAPIENT.IA</h1>
            <p className="text-ink-secondary text-xs tracking-[0.18em] font-label">AUTOMATION SOLUTIONS</p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href={ancora('services')} className="text-ink-primary/85 hover:text-purple-300 transition-colors">
            Serviços
          </a>
          <a href={ancora('pain-points')} className="text-ink-primary/85 hover:text-purple-300 transition-colors">
            Soluções
          </a>
          <a href={ancora('benefits')} className="text-ink-primary/85 hover:text-purple-300 transition-colors">
            Benefícios
          </a>
          <a href={ancora('otus')} className="text-ink-primary/85 hover:text-purple-300 transition-colors">
            Otus
          </a>
          <Link to="/precos" className="text-ink-primary/85 hover:text-purple-300 transition-colors">
            Preços
          </Link>
          <a href={ancora('contact')} className="text-ink-primary/85 hover:text-purple-300 transition-colors">
            Contato
          </a>
          <ThemeToggle />
          <Button
            className="bg-gradient-sapient hover:opacity-90 transition-opacity"
            onClick={() => window.open("https://wa.me/5511920795583", "_blank")}
          >
            Agendar diagnóstico
          </Button>
        </div>

        {/* No celular o alternador fica fora do menu sanfona: trocar o tema é
            uma preferência de leitura, e ter de abrir a navegação para chegar
            nela faz o usuário perder o lugar da rolagem. */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-ink-primary focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-sapient-deep/95 backdrop-blur-lg py-4">
          <div className="container mx-auto flex flex-col space-y-4">
            <a
              href={ancora('services')}
              className="text-ink-primary/85 hover:text-purple-300 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Serviços
            </a>
            <a
              href={ancora('pain-points')}
              className="text-ink-primary/85 hover:text-purple-300 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Soluções
            </a>
            <a
              href={ancora('benefits')}
              className="text-ink-primary/85 hover:text-purple-300 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Benefícios
            </a>
            <a
              href={ancora('otus')}
              className="text-ink-primary/85 hover:text-purple-300 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Otus
            </a>
            <Link
              to="/precos"
              className="text-ink-primary/85 hover:text-purple-300 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Preços
            </Link>
            <a
              href={ancora('contact')}
              className="text-ink-primary/85 hover:text-purple-300 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contato
            </a>
            <Button
              className="bg-gradient-sapient hover:opacity-90 transition-opacity w-full"
              onClick={() => window.open("https://wa.me/5511920795583", "_blank")}
            >
              Agendar diagnóstico
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
