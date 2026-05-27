import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'sonner';
import { ArrowLeft, Check, MailCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import expressoLogo from '@/assets/expresso-ia-logo.png';

const emailSchema = z
  .string()
  .trim()
  .email({ message: 'Por favor, insira um e-mail válido.' })
  .max(255, { message: 'E-mail muito longo.' });

const benefits = [
  'Cases reais de automação com IA',
  'Ferramentas testadas pelo nosso time',
];

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
      setSuccess(true);
      setEmail('');
    } catch (err) {
      console.error('Newsletter submit error:', err);
      toast.error('Não foi possível concluir a inscrição. Tente novamente em instantes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col text-slate-900">
      <header className="px-5 py-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar<span className="hidden sm:inline">&nbsp;para Sapient.IA</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-5 pb-6">
        <div className="w-full max-w-xl text-center">
          <img
            src={expressoLogo}
            alt="Expresso IA by Sapient.IA"
            className="mx-auto w-44 md:w-72 h-auto select-none mb-2"
            draggable={false}
          />

          {success ? (
            <div className="mt-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-50 text-green-600 mb-3">
                <MailCheck className="w-7 h-7" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                Pronto! Você está inscrito.
              </h1>
              <p className="mt-2 text-slate-600 max-w-sm mx-auto text-sm">
                Em breve você receberá o Expresso IA no seu e-mail.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-center">
                <Link to="/">
                  <Button
                    variant="outline"
                    className="h-11 px-6 border-slate-200 text-slate-700 hover:bg-slate-50 w-full sm:w-auto"
                  >
                    Voltar para o site
                  </Button>
                </Link>
                <Button
                  onClick={() => setSuccess(false)}
                  className="h-11 px-6 bg-gradient-sapient hover:opacity-90 transition-opacity text-white w-full sm:w-auto"
                >
                  Inscrever outro e-mail
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="sr-only">Expresso IA — Newsletter da Sapient.IA</h1>

              <p className="mt-1 text-base md:text-xl text-slate-600 max-w-md mx-auto">
                IA e automação que geram resultado. Direto no seu e-mail.
              </p>

              <ul className="mt-5 hidden sm:flex sm:flex-row sm:flex-wrap sm:justify-center gap-3 sm:gap-x-6 sm:gap-y-2 text-sm text-slate-700">
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
                className="mt-5 sm:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-3 w-full"
              >
                <Input
                  type="email"
                  required
                  maxLength={255}
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-11 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-sapient-purple"
                  aria-label="Seu e-mail"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 px-6 bg-gradient-sapient hover:opacity-90 transition-opacity text-white"
                >
                  {loading ? 'Enviando...' : 'Quero receber'}
                </Button>
              </form>

              <p className="text-slate-500 text-xs mt-3">
                Sem spam. Cancele quando quiser.
              </p>
            </>
          )}
        </div>
      </main>

      <footer className="px-6 py-3 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Sapient.IA · Expresso IA
      </footer>
    </div>
  );
};

export default Newsletter;
