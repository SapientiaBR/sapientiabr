import React from 'react';
import { Linkedin, Instagram, MessageCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import sapientLogo from '@/assets/sapient-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sapient-deep py-16 border-t border-ink-primary/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="max-w-md">
            <div className="flex items-center mb-6">
              <img
                src={sapientLogo}
                alt="Sapient.IA Logo"
                className="h-8 mr-2"
              />
              <div>
                <h3 className="text-ink-primary font-bold text-xl">SAPIENT.IA</h3>
                <p className="text-ink-secondary text-xs">AUTOMATION SOLUTIONS</p>
              </div>
            </div>
            <p className="text-ink-secondary mb-6">
              Sistemas operacionais conectados com IA para atendimento, vendas e operação.
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://www.linkedin.com/in/sapient-ia-automation-solutions-b397b7348/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-secondary hover:text-ink-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/sapientia.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-secondary hover:text-ink-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://wa.me/5511920795583"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-secondary hover:text-ink-primary transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
            <a
              href="https://bit.ly/40BtBp2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-secondary hover:text-ink-primary transition-colors"
              aria-label="Agendar reunião"
            >
              <Calendar className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="mt-10 p-5 rounded-lg border border-ink-primary/10 bg-ink-primary/5">
          <p className="text-ink-secondary text-sm md:text-base">
            Atende clínicas ou consultórios? Conheça também a{' '}
            <a
              href="https://secretariainvisivel.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-ink-primary font-semibold underline underline-offset-4 transition-colors"
            >
              Secretaria Invisível
            </a>
            {' '}— uma solução dedicada à rotina de atendimento em saúde.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-ink-primary/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-ink-secondary text-sm mb-4 md:mb-0">
            © {currentYear} Sapient.IA. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <Link to="/newsletter" className="text-ink-secondary hover:text-ink-primary transition-colors text-sm">Newsletter</Link>
            <a href="#" className="text-ink-secondary hover:text-ink-primary transition-colors text-sm">Termos de Uso</a>
            <a href="#" className="text-ink-secondary hover:text-ink-primary transition-colors text-sm">Política de Privacidade</a>
            <a href="#" className="text-ink-secondary hover:text-ink-primary transition-colors text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
