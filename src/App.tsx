import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SmoothScroll } from "@/motion/SmoothScroll";
import { PageMask } from "@/motion/PageMask";
import Index from "./pages/Index";
import Newsletter from "./pages/Newsletter";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// A página /sequencial é um HTML estático em public/sequencial/. Se o host
// devolver o app em vez do arquivo, esta rota manda para o arquivo direto.
const Sequencial = () => {
  window.location.replace("/sequencial/index.html" + window.location.search);
  return null;
};

// /leobbq também é estático (public/leobbq/), pelo mesmo motivo.
const LeoBBQ = () => {
  window.location.replace("/leobbq/index.html" + window.location.search + window.location.hash);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PageMask />
      <SmoothScroll>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/sequencial" element={<Sequencial />} />
            <Route path="/leobbq" element={<LeoBBQ />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SmoothScroll>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
