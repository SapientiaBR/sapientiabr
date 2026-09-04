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
import FAQSection from '@/components/FAQSection';
import GuaranteeSection from '@/components/GuaranteeSection';
import FinalCTASection from '@/components/FinalCTASection';
import Footer from '@/components/Footer';
import { SectionRail, RevealOnScroll, Magnetic, type RailSection } from '@/motion';

/** Âncoras do rail lateral. A ordem espelha a da página. */
const RAIL: RailSection[] = [
  { id: 'hero', label: 'Início' },
  { id: 'pain-points', label: 'Problemas' },
  { id: 'services', label: 'Soluções' },
  { id: 'benefits', label: 'Benefícios' },
  { id: 'otus', label: 'Otus' },
  { id: 'contact', label: 'Contato' },
  { id: 'faq', label: 'FAQ' },
];

const Index = () => {
  return (
    <div className="bg-sapient-deep min-h-screen">
      <Navbar />
      <SectionRail sections={RAIL} />
      <HeroSection />
      <PainPointsSection />
      <ServicesSection />
      <BenefitsSection />
      <NoctuaBotSection />
      <ContactSection />
      <FAQSection />
      <GuaranteeSection />
      <FinalCTASection />

      {/* Newsletter CTA */}
      <RevealOnScroll as="section" className="py-16 border-t border-white/10">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-sapient mb-6">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Fique por dentro das <em className="accent">novidades</em>
          </h2>
          <p className="text-ink-secondary text-base md:text-lg max-w-lg mx-auto mb-6">
            Se inscreva na nossa{' '}
            <Link
              to="/newsletter"
              className="text-purple-300 hover:text-white font-semibold underline underline-offset-4 transition-colors"
            >
              newsletter
            </Link>
            {' '}e receba conteúdo sobre automação inteligente e IA aplicada ao seu negócio.
          </p>
          <Magnetic>
            <Link
              to="/newsletter"
              className="inline-flex items-center gap-2 h-11 px-6 bg-gradient-sapient hover:opacity-90 transition-opacity text-white rounded-md font-medium"
            >
              Inscrever-se
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Magnetic>
        </div>
      </RevealOnScroll>

      <Footer />
    </div>
  );
};

export default Index;
