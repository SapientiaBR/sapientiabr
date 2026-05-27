import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const emailSchema = z
  .string()
  .trim()
  .email({ message: 'Por favor, insira um e-mail válido.' })
  .max(255, { message: 'E-mail muito longo.' });

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Newsletter | Sapient.IA';
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
      'Inscreva-se na newsletter da Sapient.IA e receba novidades sobre automação inteligente e IA.'
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

  return (
    <div className="bg-sapient-dark min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 pt-32 pb-20">
        <div className="w-full max-w-xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Inscreva-se na nossa <span className="bg-gradient-sapient bg-clip-text text-transparent">Newsletter</span>
          </h1>
          <p className="text-gray-300 text-lg mb-10">
            Receba conteúdos exclusivos sobre automação inteligente, IA e como transformar seu negócio.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
            <Input
              type="email"
              required
              maxLength={255}
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              aria-label="Seu e-mail"
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-12 px-6 bg-gradient-sapient hover:opacity-90 transition-opacity"
            >
              {loading ? 'Inscrevendo...' : 'Inscrever-se'}
            </Button>
          </form>
          <p className="text-gray-500 text-xs mt-4">
            Sem spam. Você pode cancelar a qualquer momento.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Newsletter;