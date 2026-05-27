import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'sonner';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import expressoLogo from '@/assets/expresso-ia-logo.png';

const emailSchema = z
  .string()
  .trim()
  .email({ message: 'Por favor, insira um e-mail válido.' })
  .max(255, { message: 'E-mail muito longo.' });

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Expresso IA · Newsletter da Sapient.IA';
    const meta =
      document.querySelector('meta[name="description"]') ??
      (() => {
        const m = document.createElement('meta');
        m.setAttribute('name', 'description');
        document.head.appendChild(m);
        return m;
      })();
    meta.setAttribute(
      'content',
      'Assine o Expresso IA: a newsletter da Sapient.IA com automação inteligente e IA aplicada a negócios, direto ao ponto.'
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        'https://n8n.sapientiabr.cloud/webhook/1edba48f-ad29-4ef1-b13d-1fd1af16c5fc',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: result.data,
            source: 'sapientiabr-newsletter',
            submitted_at: new Date().toISOString(),
          }),
        }
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      toast.success('Inscrição confirmada! Em breve você receberá nossas novidades.');
      setEmail('');
    } catch (err) {
      console.error('Newsletter submit error:', err);
      toast.error('Não foi possível concluir a inscrição. Tente novamente em instantes.');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    'Cases reais de automação com IA',
    'Ferramentas testadas pelo nosso time',
    'Conteúdo direto ao ponto, sem enrolação',
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col text-slate-900">
      <header className="px-6 py-5">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Sapient.IA
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-xl text-center">
          <h1 className="sr-only">Expresso IA — Newsletter da Sapient.IA</h1>

          <img
            src={expressoLogo}
            alt="Expresso IA by Sapient.IA"
            className="mx-auto w-64 md:w-80 h-auto select-none"
            draggable={false}
          />

          <p className="mt-2 text-lg md:text-xl text-slate-600 max-w-md mx-auto">
            A newsletter rápida e direta sobre automação inteligente e IA aplicada ao seu negócio.
          </p>

          <ul className="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-3 sm:gap-x-6 sm:gap-y-2 text-sm text-slate-700">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2 justify-center">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-sapient text-white shrink-0">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col sm:flex-row gap-3 w-full"
          >
            <Input
              type="email"
              required
              maxLength={255}
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-sapient-purple"
              aria-label="Seu e-mail"
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-12 px-6 bg-gradient-sapient hover:opacity-90 transition-opacity text-white"
            >
              {loading ? 'Inscrevendo...' : 'Inscrever-se'}
            </Button>
          </form>

          <p className="text-slate-500 text-xs mt-4">
            Sem spam. Você pode cancelar a qualquer momento.
          </p>
        </div>
      </main>

      <footer className="px-6 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Sapient.IA · Expresso IA
      </footer>
    </div>
  );
};

export default Newsletter;