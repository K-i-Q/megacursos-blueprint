import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Alunos from "@/pages/Alunos";
import Turmas from "@/pages/Turmas";
import Chamada from "@/pages/Chamada";
import Mensalidades from "@/pages/Mensalidades";
import Caixa from "@/pages/Caixa";
import Relatorios from "@/pages/Relatorios";
import { SkeletonPage } from "@/components/SkeletonPage";
import {
  FileText, BookOpen, Package, RotateCcw, Award,
  FileSignature, MessageSquareWarning, Archive, Shield, Settings
} from "lucide-react";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProfileProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/alunos" element={<Alunos />} />
              <Route path="/matriculas" element={<SkeletonPage title="Matrículas" description="Gestão de matrículas" icon={FileText} />} />
              <Route path="/cursos" element={<SkeletonPage title="Cursos" description="Catálogo de cursos" icon={BookOpen} />} />
              <Route path="/pacotes" element={<SkeletonPage title="Pacotes" description="Pacotes de cursos" icon={Package} />} />
              <Route path="/turmas" element={<Turmas />} />
              <Route path="/chamada" element={<Chamada />} />
              <Route path="/reposicao" element={<SkeletonPage title="Reposição de Aula" description="Gestão de reposições" icon={RotateCcw} />} />
              <Route path="/mensalidades" element={<Mensalidades />} />
              <Route path="/caixa" element={<Caixa />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/certificados" element={<SkeletonPage title="Certificados" description="Emissão de certificados" icon={Award} />} />
              <Route path="/contratos" element={<SkeletonPage title="Contratos" description="Gestão de contratos" icon={FileSignature} />} />
              <Route path="/penalidades" element={<SkeletonPage title="Penalidades / WhatsApp" description="Mensagens e penalidades" icon={MessageSquareWarning} />} />
              <Route path="/estoque" element={<SkeletonPage title="Estoque de Apostilas" description="Controle de materiais" icon={Archive} />} />
              <Route path="/auditoria" element={<SkeletonPage title="Auditoria" description="Log de ações" icon={Shield} />} />
              <Route path="/configuracoes" element={<SkeletonPage title="Configurações" description="Perfis e acessos" icon={Settings} />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ProfileProvider>
  </QueryClientProvider>
);

export default App;
