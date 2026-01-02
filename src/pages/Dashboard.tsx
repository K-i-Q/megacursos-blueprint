import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserPlus,
  CreditCard,
  ClipboardCheck,
  BarChart3,
  AlertCircle,
  Calendar,
  TrendingUp,
  Clock,
  FileText,
} from 'lucide-react';
import { StatsCard } from '@/components/ui/stats-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockStudents, mockPayments, mockClassGroups, mockCourses } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  // Calculate stats
  const totalAlunos = mockStudents.filter((s) => s.status === 'ativo').length;
  const alunosNovos = mockStudents.filter((s) => s.tags.includes('novo')).length;
  const alunosConcluindo = mockStudents.filter((s) => s.tags.includes('concluindo')).length;
  const mensalidadesAbertas = mockPayments.filter(
    (p) => p.status === 'aberto' || p.status === 'atrasado'
  ).length;
  const mensalidadesAtrasadas = mockPayments.filter((p) => p.status === 'atrasado');

  // Today's classes (mock - Segunda)
  const turmasHoje = mockClassGroups.filter((t) => t.dia === 'Segunda');

  // Recent enrollments
  const ultimasMatriculas = mockStudents.slice(0, 3);

  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      {/* Hero Section with Parallax Effect */}
      <div className="relative overflow-hidden rounded-2xl glass-card p-6 lg:p-8">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-1/4 -left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-4xl font-bold mb-2">
                Bem-vindo ao <span className="text-gradient">MegaCursos</span>
              </h1>
              <p className="text-muted-foreground">
                Gestão escolar simplificada. Hoje é {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="gap-2 glass border-glass-border">
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">Última atualização:</span> agora
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total de Alunos"
          value={totalAlunos}
          subtitle="Ativos no momento"
          icon={Users}
          variant="primary"
          trend={{ value: 12, positive: true }}
        />
        <StatsCard
          title="Alunos Novos"
          value={alunosNovos}
          subtitle="Primeiro mês"
          icon={UserPlus}
          variant="success"
        />
        <StatsCard
          title="Concluindo"
          value={alunosConcluindo}
          subtitle="Último mês"
          icon={TrendingUp}
          variant="warning"
        />
        <StatsCard
          title="Mensalidades Abertas"
          value={mensalidadesAbertas}
          subtitle={`${mensalidadesAtrasadas.length} atrasadas`}
          icon={CreditCard}
          variant="danger"
        />
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          Ações Rápidas
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Link to="/alunos">
            <Button
              variant="outline"
              className="w-full h-auto py-4 flex flex-col gap-2 glass border-glass-border hover:border-primary hover:glow-primary transition-all"
            >
              <UserPlus className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Novo Aluno</span>
            </Button>
          </Link>
          <Link to="/mensalidades">
            <Button
              variant="outline"
              className="w-full h-auto py-4 flex flex-col gap-2 glass border-glass-border hover:border-success hover:shadow-[0_0_20px_hsl(142_71%_45%/0.2)] transition-all"
            >
              <CreditCard className="h-6 w-6 text-success" />
              <span className="text-sm font-medium">Lançar Pagamento</span>
            </Button>
          </Link>
          <Link to="/chamada">
            <Button
              variant="outline"
              className="w-full h-auto py-4 flex flex-col gap-2 glass border-glass-border hover:border-accent hover:glow-accent transition-all"
            >
              <ClipboardCheck className="h-6 w-6 text-accent" />
              <span className="text-sm font-medium">Fazer Chamada</span>
            </Button>
          </Link>
          <Link to="/relatorios">
            <Button
              variant="outline"
              className="w-full h-auto py-4 flex flex-col gap-2 glass border-glass-border hover:border-warning hover:shadow-[0_0_20px_hsl(38_92%_50%/0.2)] transition-all"
            >
              <BarChart3 className="h-6 w-6 text-warning" />
              <span className="text-sm font-medium">Gerar Relatório</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Payments */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Mensalidades em Atraso
            </h2>
            <Link to="/mensalidades">
              <Button variant="ghost" size="sm">Ver todas</Button>
            </Link>
          </div>
          <ScrollArea className="h-[200px]">
            {mensalidadesAtrasadas.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">
                Nenhuma mensalidade em atraso
              </p>
            ) : (
              <div className="space-y-3">
                {mensalidadesAtrasadas.map((payment) => {
                  const student = mockStudents.find((s) => s.id === payment.alunoId);
                  return (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-destructive" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{student?.nome}</p>
                          <p className="text-xs text-muted-foreground">
                            {payment.mes} • R$ {payment.valor.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        Atrasado
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Today's Classes */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Turmas de Hoje
            </h2>
            <Link to="/turmas">
              <Button variant="ghost" size="sm">Ver todas</Button>
            </Link>
          </div>
          <ScrollArea className="h-[200px]">
            {turmasHoje.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">
                Nenhuma turma hoje
              </p>
            ) : (
              <div className="space-y-3">
                {turmasHoje.map((turma) => {
                  const curso = mockCourses.find((c) => c.id === turma.cursoId);
                  return (
                    <div
                      key={turma.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{curso?.nome || 'Turma'}</p>
                          <p className="text-xs text-muted-foreground">
                            {turma.horario} • {turma.sala}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {turma.vagasOcupadas}/{turma.vagas}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Recent Enrollments */}
        <div className="glass-card rounded-xl p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" />
              Últimas Matrículas
            </h2>
            <Link to="/alunos">
              <Button variant="ghost" size="sm">Ver todos</Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ultimasMatriculas.map((student) => (
              <div
                key={student.id}
                className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/50 transition-colors"
              >
                <img
                  src={student.foto}
                  alt={student.nome}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{student.nome}</p>
                  <p className="text-xs text-muted-foreground">{student.matricula}</p>
                  <div className="flex gap-1 mt-1">
                    {student.tags.includes('novo') && (
                      <Badge className="text-[10px] bg-success/20 text-success border-0">
                        Novo
                      </Badge>
                    )}
                    {student.tags.includes('concluindo') && (
                      <Badge className="text-[10px] bg-warning/20 text-warning border-0">
                        Concluindo
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
