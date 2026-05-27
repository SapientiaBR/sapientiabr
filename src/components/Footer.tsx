import React from 'react';
import { Linkedin, Instagram, MessageCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import sapientLogo from '@/assets/sapient-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sapient-dark py-16 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="max-w-md">
            <div className="flex items-center mb-6">
              <img 
                src={sapientLogo} 
                alt="Sapient.IA Logo" 
                className="h-8 mr-2"
              />
              <div>
                <h3 className="text-white font-bold text-xl">SAPIENT.IA</h3>
                <p className="text-gray-400 text-xs">AUTOMATION SOLUTIONS</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Transformando negócios através de soluções de automação inteligente baseadas em IA.
            </p>
          </div>

          <div className="flex space-x-6">
            <a 
              href="https://www.linkedin.com/in/sapient-ia-automation-solutions-b397b7348/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="https://www.instagram.com/sapientia.br" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://wa.me/5511920795583" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
            <a 
              href="https://bit.ly/40BtBp2" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Agendar reunião"
            >
              <Calendar className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="mt-10 p-5 rounded-lg border border-white/10 bg-white/5">
          <p className="text-gray-300 text-sm md:text-base">
            Atende clínicas ou consultórios? Conheça também a{' '}
            <a
              href="https://secretariainvisivel.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sapient-purple hover:text-white font-semibold underline underline-offset-4 transition-colors"
            >
              Secretaria Invisível
            </a>
            {' '}— nossa solução dedicada para a área da saúde.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Sapient.IA. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <Link to="/newsletter" className="text-gray-400 hover:text-white transition-colors text-sm">Newsletter</Link>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Termos de Uso</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Política de Privacidade</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
