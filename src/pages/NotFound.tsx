import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Magnetic } from "@/motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-sapient-deep px-4">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-radial" />

      <div className="relative z-10 text-center">
        <p className="mb-4 font-label text-xs uppercase tracking-[0.3em] text-ink-muted">
          Erro 404
        </p>
        <h1 className="mb-4 text-6xl font-bold text-ink-primary md:text-7xl">
          Página <em className="accent">não encontrada</em>
        </h1>
        <p className="mx-auto mb-8 max-w-md text-lg text-ink-secondary">
          O endereço <code className="text-purple-300">{location.pathname}</code> não existe. Pode
          ter sido movido ou digitado com um erro.
        </p>
        <Magnetic>
          <Link
            to="/"
            className="inline-flex h-12 items-center gap-2 rounded-md bg-gradient-sapient px-6 font-medium text-ink-on-brand transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o início
          </Link>
        </Magnetic>
      </div>
    </div>
  );
};

export default NotFound;
