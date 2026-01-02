import { useState } from 'react';
import {
  Wallet,
  Plus,
  ArrowUpCircle,
  ArrowDownCircle,
  Search,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockCashEntries, CashEntry } from '@/data/mockData';
import { useProfile } from '@/contexts/ProfileContext';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function Caixa() {
  const { hasPermission } = useProfile();
  const [entries, setEntries] = useState<CashEntry[]>(mockCashEntries);
  const [search, setSearch] = useState('');
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    tipo: '' as 'entrada' | 'saida' | '',
    descricao: '',
    valor: 0,
  });

  // Filter entries
  const filteredEntries = entries.filter((entry) =>
    entry.descricao.toLowerCase().includes(search.toLowerCase())
  );

  // Stats
  const totalEntradas = entries
    .filter((e) => e.tipo === 'entrada')
    .reduce((acc, e) => acc + e.valor, 0);
  const totalSaidas = entries
    .filter((e) => e.tipo === 'saida')
    .reduce((acc, e) => acc + e.valor, 0);
  const saldo = totalEntradas - totalSaidas;

  // Create entry
  const handleCreate = () => {
    const now = new Date();
    const entry: CashEntry = {
      id: `ce${Date.now()}`,
      tipo: newEntry.tipo as 'entrada' | 'saida',
      descricao: newEntry.descricao,
      valor: newEntry.valor,
      data: now.toISOString().split('T')[0],
      hora: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setEntries([entry, ...entries]);
    setIsNewOpen(false);
    setNewEntry({ tipo: '', descricao: '', valor: 0 });

    toast({
      title: `${entry.tipo === 'entrada' ? 'Entrada' : 'Saída'} registrada!`,
      description: `R$ ${entry.valor.toFixed(2)} - ${entry.descricao}`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Caixa do Dia"
        description="Controle de entradas e saídas"
        icon={Wallet}
        action={
          hasPermission('create', 'caixa')
            ? {
                label: 'Novo Lançamento',
                icon: Plus,
                onClick: () => setIsNewOpen(true),
              }
            : undefined
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-success/20 flex items-center justify-center">
              <ArrowUpCircle className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Entradas</p>
              <p className="text-xl font-bold text-success">R$ {totalEntradas.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-destructive/20 flex items-center justify-center">
              <ArrowDownCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Saídas</p>
              <p className="text-xl font-bold text-destructive">R$ {totalSaidas.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Saldo</p>
              <p className={cn('text-xl font-bold', saldo >= 0 ? 'text-success' : 'text-destructive')}>
                R$ {saldo.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="glass-card rounded-xl p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar lançamentos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 glass border-glass-border"
          />
        </div>
      </div>

      {/* Entries List */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="divide-y divide-border">
          {filteredEntries.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Nenhum lançamento encontrado
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'h-10 w-10 rounded-xl flex items-center justify-center',
                      entry.tipo === 'entrada' ? 'bg-success/20' : 'bg-destructive/20'
                    )}
                  >
                    {entry.tipo === 'entrada' ? (
                      <ArrowUpCircle className="h-5 w-5 text-success" />
                    ) : (
                      <ArrowDownCircle className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{entry.descricao}</p>
                    <p className="text-xs text-muted-foreground">
                      {entry.data} às {entry.hora}
                    </p>
                  </div>
                </div>
                <p
                  className={cn(
                    'text-lg font-bold',
                    entry.tipo === 'entrada' ? 'text-success' : 'text-destructive'
                  )}
                >
                  {entry.tipo === 'entrada' ? '+' : '-'} R$ {entry.valor.toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* New Entry Sheet */}
      <Sheet open={isNewOpen} onOpenChange={setIsNewOpen}>
        <SheetContent className="w-full sm:max-w-lg glass border-glass-border">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              Novo Lançamento
            </SheetTitle>
            <SheetDescription>Registre uma entrada ou saída no caixa</SheetDescription>
          </SheetHeader>

          <div className="space-y-4 py-6">
            <div>
              <Label>Tipo</Label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                <Button
                  type="button"
                  variant={newEntry.tipo === 'entrada' ? 'default' : 'outline'}
                  onClick={() => setNewEntry({ ...newEntry, tipo: 'entrada' })}
                  className={cn(newEntry.tipo === 'entrada' && 'bg-success hover:bg-success/90')}
                >
                  <ArrowUpCircle className="mr-2 h-4 w-4" />
                  Entrada
                </Button>
                <Button
                  type="button"
                  variant={newEntry.tipo === 'saida' ? 'default' : 'outline'}
                  onClick={() => setNewEntry({ ...newEntry, tipo: 'saida' })}
                  className={cn(newEntry.tipo === 'saida' && 'bg-destructive hover:bg-destructive/90')}
                >
                  <ArrowDownCircle className="mr-2 h-4 w-4" />
                  Saída
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                value={newEntry.descricao}
                onChange={(e) => setNewEntry({ ...newEntry, descricao: e.target.value })}
                placeholder="Descrição do lançamento"
                className="glass border-glass-border mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="valor">Valor (R$)</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                value={newEntry.valor || ''}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, valor: parseFloat(e.target.value) || 0 })
                }
                className="glass border-glass-border mt-1.5"
              />
            </div>
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={() => setIsNewOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!newEntry.tipo || !newEntry.descricao || !newEntry.valor}
              className="bg-gradient-primary glow-primary"
            >
              Registrar
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
