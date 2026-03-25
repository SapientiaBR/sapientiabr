import React from 'react';
import { Button } from '@/components/ui/button';
import { ElegantShape } from '@/components/ui/shape-landing-hero';
import sapientLogo from '@/assets/sapient-logo.png';
import redMapleLogo from '@/assets/red-maple-logo.png';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-sapient-dark overflow-hidden">
      {/* Floating geometric shapes background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-sapient-purple/[0.12]"
          className="top-[-10%] left-[-10%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-sapient-blue/[0.12]"
          className="top-[15%] right-[-5%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-sapient-purple/[0.08]"
          className="bottom-[5%] left-[5%]"
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-sapient-blue/[0.08]"
          className="top-[60%] right-[15%]"
        />
        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-white/[0.06]"
          className="top-[40%] left-[20%]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-radial from-sapient-dark to-transparent opacity-90"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-sapient-dark to-transparent"></div>
      <div className="container mx-auto px-4 pt-24 pb-20 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[85vh] mb-16">
          <div className="max-w-3xl animate-fade-in text-center">
            <img 
              src={sapientLogo} 
              alt="Sapient.IA Logo" 
              className="w-40 mx-auto mb-4"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              <span className="text-gradient-sapient">Automatize</span> Seu Negócio com IA
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Transforme seu negócio com soluções de automação inteligente, rebranding profissional e gestão automatizada de redes sociais.
              Ganhe tempo, reduza custos e aumente seus resultados.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="bg-gradient-sapient hover:opacity-90 transition-opacity text-white font-medium px-8 py-6 text-lg"
                onClick={() => window.open("https://bit.ly/40BtBp2", "_blank")}
              >
                Automatize Seu Negócio
              </Button>
              <Button 
                variant="outline" 
                className="border-sapient-purple text-white bg-sapient-purple/20 hover:bg-sapient-purple/30 hover:text-white px-8 py-6 text-lg transition-colors"
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  servicesSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Conheça Nossos Serviços
              </Button>
            </div>
          </div>
        </div>
        
        {/* Sobre Nós Section */}
        <div className="max-w-5xl mx-auto">
          <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4 text-center">
              <span className="text-gradient-sapient">Sobre Nós</span>
            </h2>
            <p className="text-gray-300 mb-4 text-center">
              É com grande entusiasmo que apresentamos a <strong className="text-white">Sapient.IA</strong>, 
              sua parceira em soluções inteligentes, automações inovadoras, rebranding profissional e gestão de redes sociais!
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-sapient-purple">Por que Sapient.IA?</h3>
                <p className="text-gray-300">
                  Nosso nome é inspirado na palavra "Sapientia", que significa sabedoria. 
                  Combinamos essa essência com a tecnologia de Inteligência Artificial para criar 
                  uma marca que une o poder do conhecimento com as infinitas possibilidades da automação e design.
                </p>
              </div>
              
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-sapient-blue">O que propomos?</h3>
                <p className="text-gray-300">
                  Transformamos processos complexos em soluções simples e automatizadas, criamos identidades visuais marcantes e gerenciamos suas redes sociais, 
                  ajudando empresas a economizar tempo, reduzir custos, aumentar a eficiência e focar no crescimento.
                </p>
              </div>
            </div>
            
            <p className="text-gray-300 italic text-center">
              Combinamos tecnologia de ponta, design profissional e estratégias de marketing digital 
              para transformar processos e impulsionar resultados.
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">Confiado por empresas de todos os tamanhos</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center p-2">
              <img 
                src="/lovable-uploads/270c4ddf-c48c-4607-b418-b55200a9c04d.png" 
                alt="Construtora Zero" 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center p-2">
              <img 
                src={redMapleLogo} 
                alt="Red Maple"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center p-2">
              <img 
                src="/lovable-uploads/5a51bd6e-130f-4365-896b-7066b189ded1.png" 
                alt="Alline Móveis" 
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <a href="#pain-points" className="text-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
