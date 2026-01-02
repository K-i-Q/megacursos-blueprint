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
  X,
  GraduationCap,
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

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

interface MobileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileDrawer({ open, onOpenChange }: MobileDrawerProps) {
  const location = useLocation();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0 bg-sidebar border-r border-sidebar-border">
        <SheetHeader className="p-4 border-b border-sidebar-border">
          <SheetTitle className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary glow-primary">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gradient">MegaCursos</h1>
              <p className="text-xs text-muted-foreground">Gestão Escolar</p>
            </div>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-5rem)] py-4 custom-scrollbar">
          <nav className="space-y-1 px-3">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    isActive
                      ? 'bg-gradient-primary text-primary-foreground glow-primary'
                      : 'text-sidebar-foreground'
                  )}
                >
                  <Icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'drop-shadow-lg')} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
