import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  FileText,
  BookOpen,
  Package,
  Calendar,
  ClipboardCheck,
  RotateCcw,
  CreditCard,
  Wallet,
  BarChart3,
  Award,
  FileSignature,
  MessageSquareWarning,
  Archive,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Alunos', path: '/alunos' },
  { icon: FileText, label: 'Matrículas', path: '/matriculas' },
  { icon: BookOpen, label: 'Cursos', path: '/cursos' },
  { icon: Package, label: 'Pacotes', path: '/pacotes' },
  { icon: Calendar, label: 'Turmas', path: '/turmas' },
  { icon: ClipboardCheck, label: 'Chamada', path: '/chamada' },
  { icon: RotateCcw, label: 'Reposição', path: '/reposicao' },
  { icon: CreditCard, label: 'Mensalidades', path: '/mensalidades' },
  { icon: Wallet, label: 'Caixa do Dia', path: '/caixa' },
  { icon: BarChart3, label: 'Relatórios', path: '/relatorios' },
  { icon: Award, label: 'Certificados', path: '/certificados' },
  { icon: FileSignature, label: 'Contratos', path: '/contratos' },
  { icon: MessageSquareWarning, label: 'Penalidades', path: '/penalidades' },
  { icon: Archive, label: 'Estoque', path: '/estoque' },
  { icon: Shield, label: 'Auditoria', path: '/auditoria' },
  { icon: Settings, label: 'Configurações', path: '/configuracoes' },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out',
        'hidden lg:flex flex-col',
        'bg-sidebar border-r border-sidebar-border',
        isOpen ? 'w-64' : 'w-20'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary glow-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          {isOpen && (
            <div className="animate-fade-in">
              <h1 className="text-lg font-bold text-gradient">MegaCursos</h1>
              <p className="text-xs text-muted-foreground">Gestão Escolar</p>
            </div>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4 custom-scrollbar">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            const menuButton = (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  isActive
                    ? 'bg-gradient-primary text-primary-foreground glow-primary'
                    : 'text-sidebar-foreground'
                )}
              >
                <Icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'drop-shadow-lg')} />
                {isOpen && <span className="animate-fade-in truncate">{item.label}</span>}
              </Link>
            );

            if (!isOpen) {
              return (
                <Tooltip key={item.path} delayDuration={0}>
                  <TooltipTrigger asChild>{menuButton}</TooltipTrigger>
                  <TooltipContent side="right" className="glass">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return menuButton;
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      {isOpen && (
        <div className="border-t border-sidebar-border p-4">
          <p className="text-xs text-muted-foreground text-center">
            v1.0.0 Beta
          </p>
        </div>
      )}
    </aside>
  );
}
