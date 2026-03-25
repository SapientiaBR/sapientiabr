
import React from 'react';
import { Clock, DollarSign, Users, TimerOff, MessageSquare, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowCard } from '@/components/ui/spotlight-card';
import { Button } from '@/components/ui/button';

const PainPointsSection = () => {
  const painPoints = [
    {
      icon: <Clock className="w-10 h-10 text-red-400" />,
      title: 'Processos Manuais',
      description: 'Tarefas repetitivas e processos manuais que sugam seu tempo e energia, impedindo o foco no crescimento.'
    },
    {
      icon: <Users className="w-10 h-10 text-red-400" />,
      title: 'Funcionários Problemáticos',
      description: 'Funcionários preguiçosos que custam o dobro do salário real, faltam constantemente e ainda podem processar a empresa quando saem.'
    },
    {
      icon: <Briefcase className="w-10 h-10 text-red-400" />,
      title: 'Riscos Trabalhistas',
      description: 'Processos trabalhistas que drenam os recursos financeiros e comprometem a reputação da sua empresa.'
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-red-400" />,
      title: 'Atendimento Lento',
      description: 'Respostas demoradas que fazem clientes desistirem antes mesmo de serem atendidos.'
    },
    {
      icon: <DollarSign className="w-10 h-10 text-red-400" />,
      title: 'Custos Crescentes',
      description: 'Custos fixos que só aumentam enquanto a margem de lucro do seu negócio encolhe.'
    },
    {
      icon: <TimerOff className="w-10 h-10 text-red-400" />,
      title: 'Falta de Tempo',
      description: 'Falta tempo até para postar nas redes sociais e atrair novos negócios.'
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
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden group hover:border-sapient-purple transition-all duration-300">
              <CardContent className="p-6">
                <div className="mb-4 bg-white/10 p-3 rounded-lg inline-block group-hover:bg-gradient-sapient transition-all duration-300">
                  {point.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{point.title}</h3>
                <p className="text-gray-400">{point.description}</p>
              </CardContent>
            </Card>
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
