
import React from 'react';
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
      <Footer />
    </div>
  );
};

export default Index;
