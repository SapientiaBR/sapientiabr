import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PainPointsSection from '@/components/PainPointsSection';
import ServicesSection from '@/components/ServicesSection';
import BenefitsSection from '@/components/BenefitsSection';
import NoctuaBotSection from '@/components/NoctuaBotSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="bg-sapient-dark min-h-screen">
      <Navbar />
      <HeroSection />
      <PainPointsSection />
      <ServicesSection />
      <BenefitsSection />
      <NoctuaBotSection />
      <ContactSection />

      {/* Newsletter CTA */}
      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-sapient mb-6">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Fique por dentro das novidades
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-lg mx-auto mb-6">
            Se inscreva na nossa{' '}
            <Link
              to="/newsletter"
              className="text-sapient-purple hover:text-white font-semibold underline underline-offset-4 transition-colors"
            >
              newsletter
            </Link>
            {' '}e receba conteúdo sobre automação inteligente e IA aplicada ao seu negócio.
          </p>
          <Link
            to="/newsletter"
            className="inline-flex items-center gap-2 h-11 px-6 bg-gradient-sapient hover:opacity-90 transition-opacity text-white rounded-md font-medium"
          >
            Inscrever-se
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
