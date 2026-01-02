import { useState } from 'react';
import {
  BarChart3,
  Calendar,
  Download,
  Printer,
  Users,
  CreditCard,
  TrendingUp,
  ClipboardCheck,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockStudents, mockPayments, mockAttendance } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

export default function Relatorios() {
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-01-31');

  // Calculate stats (mock)
  const faturamentoTotal = mockPayments
    .filter((p) => p.status === 'pago')
    .reduce((acc, p) => acc + p.valor, 0);

  const alunosNovos = mockStudents.filter((s) => s.tags.includes('novo')).length;

  const faturamentoNovos = mockPayments
    .filter((p) => {
      const student = mockStudents.find((s) => s.id === p.alunoId);
      return p.status === 'pago' && student?.tags.includes('novo');
    })
    .reduce((acc, p) => acc + p.valor, 0);

  const presencas = mockAttendance.filter((a) => a.status === 'presente').length;
  const faltas = mockAttendance.filter((a) => a.status === 'falta').length;
  const taxaPresenca = presencas + faltas > 0 ? (presencas / (presencas + faltas)) * 100 : 0;

  // Export CSV
  const exportCSV = () => {
    const headers = ['Métrica', 'Valor'];
    const data = [
      ['Faturamento Total', `R$ ${faturamentoTotal.toFixed(2)}`],
      ['Alunos Novos', alunosNovos.toString()],
      ['Faturamento Novos', `R$ ${faturamentoNovos.toFixed(2)}`],
      ['Presenças', presencas.toString()],
      ['Faltas', faltas.toString()],
      ['Taxa de Presença', `${taxaPresenca.toFixed(1)}%`],
    ];

    const csvContent = [headers.join(','), ...data.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `relatorio_${startDate}_${endDate}.csv`;
    link.click();

    toast({
      title: 'Relatório exportado!',
      description: 'O arquivo CSV foi baixado.',
    });
  };

  // Print
  const handlePrint = () => {
    window.print();
    toast({
      title: 'Imprimindo relatório',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Relatórios"
        description="Análise de dados e métricas"
        icon={BarChart3}
      />

      {/* Date Filter */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <Label htmlFor="startDate">Data Início</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="glass border-glass-border mt-1.5"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="endDate">Data Fim</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="glass border-glass-border mt-1.5"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportCSV} className="gap-2">
              <Download className="h-4 w-4" />
              Exportar CSV
            </Button>
            <Button variant="outline" onClick={handlePrint} className="gap-2">
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Faturamento */}
        <div className="glass-card rounded-xl p-6 tilt-card">
          <div className="flex items-start justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-success" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Faturamento no Período</p>
          <p className="text-3xl font-bold text-success">R$ {faturamentoTotal.toFixed(2)}</p>
        </div>

        {/* Alunos Novos */}
        <div className="glass-card rounded-xl p-6 tilt-card">
          <div className="flex items-start justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Matrículas (Novos Alunos)</p>
          <p className="text-3xl font-bold">{alunosNovos}</p>
        </div>

        {/* Faturamento Novos */}
        <div className="glass-card rounded-xl p-6 tilt-card">
          <div className="flex items-start justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Faturamento Novos Alunos</p>
          <p className="text-3xl font-bold text-accent">R$ {faturamentoNovos.toFixed(2)}</p>
        </div>

        {/* Presenças */}
        <div className="glass-card rounded-xl p-6 tilt-card">
          <div className="flex items-start justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center">
              <ClipboardCheck className="h-6 w-6 text-success" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Presenças</p>
          <p className="text-3xl font-bold text-success">{presencas}</p>
        </div>

        {/* Faltas */}
        <div className="glass-card rounded-xl p-6 tilt-card">
          <div className="flex items-start justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-destructive/20 flex items-center justify-center">
              <ClipboardCheck className="h-6 w-6 text-destructive" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Faltas</p>
          <p className="text-3xl font-bold text-destructive">{faltas}</p>
        </div>

        {/* Taxa Presença */}
        <div className="glass-card rounded-xl p-6 tilt-card">
          <div className="flex items-start justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-warning/20 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-warning" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Taxa de Presença</p>
          <p className="text-3xl font-bold text-warning">{taxaPresenca.toFixed(1)}%</p>
        </div>
      </div>

      {/* Detailed Tables */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Alunos por Status */}
        <div className="glass-card rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Alunos por Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <span>Ativos</span>
              <span className="font-bold text-success">
                {mockStudents.filter((s) => s.status === 'ativo').length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span>Concluídos</span>
              <span className="font-bold">
                {mockStudents.filter((s) => s.status === 'concluido').length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
              <span>Inativos</span>
              <span className="font-bold text-destructive">
                {mockStudents.filter((s) => s.status === 'inativo').length}
              </span>
            </div>
          </div>
        </div>

        {/* Mensalidades por Status */}
        <div className="glass-card rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Mensalidades por Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <span>Pagas</span>
              <span className="font-bold text-success">
                {mockPayments.filter((p) => p.status === 'pago').length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
              <span>Em Aberto</span>
              <span className="font-bold text-warning">
                {mockPayments.filter((p) => p.status === 'aberto').length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
              <span>Atrasadas</span>
              <span className="font-bold text-destructive">
                {mockPayments.filter((p) => p.status === 'atrasado').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
