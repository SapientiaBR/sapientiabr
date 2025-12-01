import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import sapientLogo from '@/assets/sapient-logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          ? 'bg-sapient-dark/90 backdrop-blur-md py-2 shadow-lg'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img
            src={sapientLogo}
            alt="Sapient.IA Logo"
            className="h-10"
          />
          <div className="ml-2">
            <h1 className="text-white text-xl font-bold">SAPIENT.IA</h1>
            <p className="text-gray-300 text-xs">AUTOMATION SOLUTIONS</p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#services" className="text-white hover:text-sapient-purple transition-colors">
            Serviços
          </a>
          <a href="#pain-points" className="text-white hover:text-sapient-purple transition-colors">
            Soluções
          </a>
          <a href="#benefits" className="text-white hover:text-sapient-purple transition-colors">
            Benefícios
          </a>
          <a href="#noctua-bot" className="text-white hover:text-sapient-purple transition-colors">
            NoctuaBot
          </a>
          <a href="#contact" className="text-white hover:text-sapient-purple transition-colors">
            Contato
          </a>
          <Button 
            className="bg-gradient-sapient hover:opacity-90 transition-opacity"
            onClick={() => window.open("https://wa.me/5511920795583", "_blank")}
          >
            Teste Grátis
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
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
        <div className="md:hidden bg-sapient-dark/95 backdrop-blur-lg py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <a 
              href="#services" 
              className="text-white hover:text-sapient-purple transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Serviços
            </a>
            <a 
              href="#pain-points" 
              className="text-white hover:text-sapient-purple transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Soluções
            </a>
            <a 
              href="#benefits" 
              className="text-white hover:text-sapient-purple transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Benefícios
            </a>
            <a 
              href="#noctua-bot" 
              className="text-white hover:text-sapient-purple transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              NoctuaBot
            </a>
            <a 
              href="#contact" 
              className="text-white hover:text-sapient-purple transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contato
            </a>
            <Button 
              className="bg-gradient-sapient hover:opacity-90 transition-opacity w-full"
              onClick={() => window.open("https://wa.me/5511920795583", "_blank")}
            >
              Teste Grátis
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
