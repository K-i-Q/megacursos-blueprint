import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  CreditCard,
  MoreHorizontal,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Alunos', path: '/alunos' },
  { icon: ClipboardCheck, label: 'Chamada', path: '/chamada' },
  { icon: CreditCard, label: 'Pagamentos', path: '/mensalidades' },
];

interface MobileNavProps {
  onMoreClick: () => void;
}

export function MobileNav({ onMoreClick }: MobileNavProps) {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-background/90 backdrop-blur-xl border-t border-border">
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className={cn('h-5 w-5', isActive && 'drop-shadow-lg')} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={onMoreClick}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground transition-all duration-200"
          >
            <MoreHorizontal className="h-5 w-5" />
            <span className="text-[10px] font-medium">Mais</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
