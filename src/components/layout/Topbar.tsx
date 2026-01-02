import { useState } from 'react';
import { useProfile } from '@/contexts/ProfileContext';
import { Profile, profileLabels } from '@/data/mockData';
import { cn } from '@/lib/utils';
import {
  Search,
  Bell,
  Menu,
  User,
  ChevronDown,
  LogOut,
  Settings,
  Moon,
  Sun,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface TopbarProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export function Topbar({ onMenuClick, sidebarOpen }: TopbarProps) {
  const { currentProfile, setCurrentProfile } = useProfile();
  const [searchOpen, setSearchOpen] = useState(false);

  const profiles: Profile[] = ['secretaria', 'instrutorIngles', 'instrutorInformatica', 'vendedor', 'coordenador'];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-30 h-16 border-b border-border transition-all duration-300',
        'bg-background/80 backdrop-blur-xl',
        'lg:left-64',
        !sidebarOpen && 'lg:left-20'
      )}
    >
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search - Desktop */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar alunos, turmas..."
                className="w-64 lg:w-80 pl-10 glass border-glass-border focus:border-primary"
              />
            </div>
          </div>

          {/* Search - Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Profile Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="glass border-glass-border gap-2 hidden sm:flex">
                <User className="h-4 w-4" />
                <span className="hidden lg:inline">{profileLabels[currentProfile]}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass border-glass-border">
              <DropdownMenuLabel>Selecionar Perfil</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              {profiles.map((profile) => (
                <DropdownMenuItem
                  key={profile}
                  onClick={() => setCurrentProfile(profile)}
                  className={cn(
                    'cursor-pointer',
                    currentProfile === profile && 'bg-primary/20 text-primary'
                  )}
                >
                  {profileLabels[profile]}
                  {currentProfile === profile && (
                    <Badge className="ml-auto bg-primary text-primary-foreground">Ativo</Badge>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
              3
            </span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary-foreground">MC</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass border-glass-border">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="cursor-pointer text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search Expanded */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 p-4 bg-background/95 backdrop-blur-xl border-b border-border md:hidden animate-slide-in-up">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar alunos, turmas..."
              className="w-full pl-10 glass border-glass-border"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
