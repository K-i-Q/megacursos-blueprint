import { useState } from 'react';
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  Check,
  Clock,
  AlertCircle,
  Wallet,
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
import { mockPayments, mockStudents, Payment } from '@/data/mockData';
import { useProfile } from '@/contexts/ProfileContext';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function Mensalidades() {
  const { hasPermission } = useProfile();
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    alunoId: '',
    mes: '',
    valor: 0,
    metodo: '' as 'pix' | 'cartao' | 'dinheiro' | '',
  });

  // Filter payments
  const filteredPayments = payments.filter((payment) => {
    const student = mockStudents.find((s) => s.id === payment.alunoId);
    const matchesSearch = student?.nome.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Group by status
  const groupedPayments = {
    atrasado: filteredPayments.filter((p) => p.status === 'atrasado'),
    aberto: filteredPayments.filter((p) => p.status === 'aberto'),
    pago: filteredPayments.filter((p) => p.status === 'pago'),
  };

  // Handle payment
  const handlePayment = (paymentId: string, metodo: 'pix' | 'cartao' | 'dinheiro') => {
    setPayments(
      payments.map((p) =>
        p.id === paymentId
          ? { ...p, status: 'pago' as const, metodo, dataPagamento: new Date().toISOString().split('T')[0] }
          : p
      )
    );
    toast({
      title: 'Pagamento registrado!',
      description: `Método: ${metodo}`,
    });
  };

  // Create new payment
  const handleCreatePayment = () => {
    const payment: Payment = {
      id: `pay${Date.now()}`,
      alunoId: newPayment.alunoId,
      mes: newPayment.mes,
      valor: newPayment.valor,
      status: 'pago',
      metodo: newPayment.metodo as 'pix' | 'cartao' | 'dinheiro',
      dataPagamento: new Date().toISOString().split('T')[0],
    };

    setPayments([payment, ...payments]);
    setIsPaymentOpen(false);
    setNewPayment({ alunoId: '', mes: '', valor: 0, metodo: '' });

    toast({
      title: 'Pagamento lançado!',
      description: `R$ ${payment.valor.toFixed(2)}`,
    });
  };

  // Stats
  const totalAberto = payments
    .filter((p) => p.status === 'aberto' || p.status === 'atrasado')
    .reduce((acc, p) => acc + p.valor, 0);
  const totalPago = payments
    .filter((p) => p.status === 'pago')
    .reduce((acc, p) => acc + p.valor, 0);

  const PaymentCard = ({ payment }: { payment: Payment }) => {
    const student = mockStudents.find((s) => s.id === payment.alunoId);
    return (
      <div
        className={cn(
          'p-4 rounded-xl border transition-all hover:border-primary/50',
          payment.status === 'atrasado' && 'bg-destructive/10 border-destructive/30',
          payment.status === 'aberto' && 'bg-warning/10 border-warning/30',
          payment.status === 'pago' && 'bg-success/10 border-success/30'
        )}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={student?.foto}
              alt={student?.nome}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{student?.nome}</p>
              <p className="text-xs text-muted-foreground">{payment.mes}</p>
            </div>
          </div>
          <Badge
            className={cn(
              'text-xs',
              payment.status === 'atrasado' && 'bg-destructive/20 text-destructive border-0',
              payment.status === 'aberto' && 'bg-warning/20 text-warning border-0',
              payment.status === 'pago' && 'bg-success/20 text-success border-0'
            )}
          >
            {payment.status === 'atrasado' && <AlertCircle className="h-3 w-3 mr-1" />}
            {payment.status === 'aberto' && <Clock className="h-3 w-3 mr-1" />}
            {payment.status === 'pago' && <Check className="h-3 w-3 mr-1" />}
            {payment.status}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">R$ {payment.valor.toFixed(2)}</p>
          {payment.status !== 'pago' && hasPermission('create', 'mensalidades') && (
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handlePayment(payment.id, 'pix')}
                className="text-xs"
              >
                Pix
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handlePayment(payment.id, 'cartao')}
                className="text-xs"
              >
                Cartão
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handlePayment(payment.id, 'dinheiro')}
                className="text-xs"
              >
                Dinheiro
              </Button>
            </div>
          )}
          {payment.status === 'pago' && payment.metodo && (
            <Badge variant="secondary" className="text-xs">
              {payment.metodo}
            </Badge>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Mensalidades"
        description="Controle de pagamentos dos alunos"
        icon={CreditCard}
        action={
          hasPermission('create', 'mensalidades')
            ? {
                label: 'Lançar Pagamento',
                icon: Plus,
                onClick: () => setIsPaymentOpen(true),
              }
            : undefined
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-destructive/20 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Em Aberto</p>
              <p className="text-xl font-bold">R$ {totalAberto.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-success/20 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Recebido</p>
              <p className="text-xl font-bold">R$ {totalPago.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por aluno..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 glass border-glass-border"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] glass border-glass-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="glass border-glass-border">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="atrasado">Atrasados</SelectItem>
              <SelectItem value="aberto">Em Aberto</SelectItem>
              <SelectItem value="pago">Pagos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Payments Grid */}
      <div className="space-y-6">
        {groupedPayments.atrasado.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Atrasados ({groupedPayments.atrasado.length})
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedPayments.atrasado.map((payment) => (
                <PaymentCard key={payment.id} payment={payment} />
              ))}
            </div>
          </div>
        )}

        {groupedPayments.aberto.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-warning">
              <Clock className="h-5 w-5" />
              Em Aberto ({groupedPayments.aberto.length})
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedPayments.aberto.map((payment) => (
                <PaymentCard key={payment.id} payment={payment} />
              ))}
            </div>
          </div>
        )}

        {groupedPayments.pago.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-success">
              <Check className="h-5 w-5" />
              Pagos ({groupedPayments.pago.length})
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedPayments.pago.map((payment) => (
                <PaymentCard key={payment.id} payment={payment} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* New Payment Sheet */}
      <Sheet open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <SheetContent className="w-full sm:max-w-lg glass border-glass-border">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Lançar Pagamento
            </SheetTitle>
            <SheetDescription>Registre um novo pagamento</SheetDescription>
          </SheetHeader>

          <div className="space-y-4 py-6">
            <div>
              <Label>Aluno</Label>
              <Select
                value={newPayment.alunoId}
                onValueChange={(v) => setNewPayment({ ...newPayment, alunoId: v })}
              >
                <SelectTrigger className="glass border-glass-border mt-1.5">
                  <SelectValue placeholder="Selecione o aluno" />
                </SelectTrigger>
                <SelectContent className="glass border-glass-border">
                  {mockStudents.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="mes">Mês Referência</Label>
              <Input
                id="mes"
                type="month"
                value={newPayment.mes}
                onChange={(e) => setNewPayment({ ...newPayment, mes: e.target.value })}
                className="glass border-glass-border mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="valor">Valor (R$)</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                value={newPayment.valor || ''}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, valor: parseFloat(e.target.value) || 0 })
                }
                className="glass border-glass-border mt-1.5"
              />
            </div>

            <div>
              <Label>Forma de Pagamento</Label>
              <div className="grid grid-cols-3 gap-2 mt-1.5">
                {(['pix', 'cartao', 'dinheiro'] as const).map((metodo) => (
                  <Button
                    key={metodo}
                    type="button"
                    variant={newPayment.metodo === metodo ? 'default' : 'outline'}
                    onClick={() => setNewPayment({ ...newPayment, metodo })}
                    className={cn(
                      newPayment.metodo === metodo && 'bg-primary'
                    )}
                  >
                    {metodo === 'pix' ? 'Pix' : metodo === 'cartao' ? 'Cartão' : 'Dinheiro'}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={() => setIsPaymentOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreatePayment}
              disabled={!newPayment.alunoId || !newPayment.mes || !newPayment.valor || !newPayment.metodo}
              className="bg-gradient-primary glow-primary"
            >
              Lançar Pagamento
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
