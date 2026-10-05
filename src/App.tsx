import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SmoothScroll } from "@/motion/SmoothScroll";
import { PageMask } from "@/motion/PageMask";
import { RolagemDeRota } from "@/motion/RolagemDeRota";
import Index from "./pages/Index";
import Newsletter from "./pages/Newsletter";
import RaioX from "./pages/RaioX";
import Precos from "./pages/Precos";
import Obrigado from "./pages/Obrigado";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PageMask />
      <SmoothScroll>
        <BrowserRouter>
          <RolagemDeRota />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/raio-x" element={<RaioX />} />
            <Route path="/precos" element={<Precos />} />
            <Route path="/obrigado" element={<Obrigado />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SmoothScroll>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
