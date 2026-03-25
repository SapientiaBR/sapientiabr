import React from 'react';
import { Clock, DollarSign, Users, TimerOff, MessageSquare, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowCard } from '@/components/ui/spotlight-card';

const PainPointsSection = () => {
  const painPoints = [
    {
      icon: <Clock className="w-8 h-8 text-red-400" />,
      title: "Processos Lentos",
      description: "Eliminamos gargalos operacionais que consomem o tempo da sua equipe e atrasam entregas."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-white" />,
      title: "Custo Elevado",
      description: "Reduzimos desperdícios financeiros através da automação inteligente de tarefas repetitivas."
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Falta de Leads",
      description: "Implementamos sistemas de aquisição que trazem clientes qualificados constantemente."
    },
    {
      icon: <TimerOff className="w-8 h-8 text-white" />,
      title: "Baixa Produtividade",
      description: "Otimizamos o fluxo de trabalho para que sua equipe foque no que realmente gera valor."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-white" />,
      title: "Atendimento Ineficiente",
      description: "Automatizamos o suporte para garantir respostas rápidas e satisfação do cliente 24/7."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-white" />,
      title: "Gestão Desorganizada",
      description: "Centralizamos seus dados e processos em uma estrutura clara e fácil de gerenciar."
    }
  ];

  return (
    <section id="pain-points" className="bg-sapient-dark py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Problemas que <span className="text-gradient-sapient">Resolvemos</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Identificamos os principais desafios que os negócios enfrentam hoje e desenvolvemos
            soluções inteligentes para superá-los.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <GlowCard
              key={index}
              glowColor="red"
              customSize
              className="p-6 group !grid-rows-none !flex !flex-col"
            >
              <div className="mb-4 bg-gradient-sapient flex items-center justify-center gap-3 px-4 py-3 rounded-xl">
                {point.icon}
                <h3 className="text-xl font-semibold text-white">{point.title}</h3>
              </div>
              <p className="text-gray-400">{point.description}</p>
            </GlowCard>
          ))}
        </div>
        
        {/* FOMO Section */}
        <div className="mt-20 bg-gradient-sapient rounded-lg p-8 text-white text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Não perca mais tempo e dinheiro!</h3>
          <p className="mb-6 text-lg">
            Enquanto você hesita, seus concorrentes já estão automatizando seus processos e conquistando seus clientes. 
            <strong className="block mt-2">Apenas 3 vagas disponíveis este mês para implementação prioritária!</strong>
          </p>
          <div className="flex justify-center">
            <Button 
              className="bg-white text-sapient-purple hover:bg-gray-100 font-bold px-8 py-4 text-lg transition-colors"
              onClick={() => window.open("https://bit.ly/40BtBp2", "_blank")}
            >
              Garanta sua vaga agora!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
