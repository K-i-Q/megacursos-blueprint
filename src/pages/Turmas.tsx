import { useState } from 'react';
import {
  Calendar,
  Plus,
  Clock,
  MapPin,
  Users,
  Book,
  Package,
  Edit,
  Trash2,
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
import { mockClassGroups, mockCourses, mockPackages, ClassGroup } from '@/data/mockData';
import { useProfile } from '@/contexts/ProfileContext';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export default function Turmas() {
  const { hasPermission } = useProfile();
  const [classGroups, setClassGroups] = useState<ClassGroup[]>(mockClassGroups);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    dia: '',
    horario: '',
    sala: '',
    vagas: 15,
    cursoId: '',
    pacoteId: '',
  });

  const handleCreate = () => {
    const turma: ClassGroup = {
      id: `t${Date.now()}`,
      dia: newClass.dia,
      horario: newClass.horario,
      sala: newClass.sala,
      vagas: newClass.vagas,
      vagasOcupadas: 0,
      cursoId: newClass.cursoId || undefined,
      pacoteId: newClass.pacoteId || undefined,
    };

    setClassGroups([...classGroups, turma]);
    setIsNewOpen(false);
    setNewClass({ dia: '', horario: '', sala: '', vagas: 15, cursoId: '', pacoteId: '' });

    toast({
      title: 'Turma criada!',
      description: `${turma.dia} às ${turma.horario}`,
    });
  };

  const groupedByDay = diasSemana.reduce((acc, dia) => {
    acc[dia] = classGroups.filter((t) => t.dia === dia);
    return acc;
  }, {} as Record<string, ClassGroup[]>);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Turmas"
        description="Gerencie as turmas e horários"
        icon={Calendar}
        action={
          hasPermission('create', 'turmas')
            ? {
                label: 'Nova Turma',
                icon: Plus,
                onClick: () => setIsNewOpen(true),
              }
            : undefined
        }
      />

      {/* Calendar View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {diasSemana.map((dia) => (
          <div key={dia} className="glass-card rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {dia}
            </h3>
            <div className="space-y-3">
              {groupedByDay[dia].length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhuma turma
                </p>
              ) : (
                groupedByDay[dia].map((turma) => {
                  const curso = mockCourses.find((c) => c.id === turma.cursoId);
                  const pacote = mockPackages.find((p) => p.id === turma.pacoteId);
                  const occupancyPercent = (turma.vagasOcupadas / turma.vagas) * 100;

                  return (
                    <div
                      key={turma.id}
                      className="p-4 rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-medium">{turma.horario}</span>
                        </div>
                        <Badge
                          className={cn(
                            'text-xs',
                            occupancyPercent >= 90
                              ? 'bg-destructive/20 text-destructive'
                              : occupancyPercent >= 70
                              ? 'bg-warning/20 text-warning'
                              : 'bg-success/20 text-success'
                          )}
                        >
                          {turma.vagasOcupadas}/{turma.vagas}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium mb-1">
                        {curso?.nome || pacote?.nome || 'Turma'}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {turma.sala}
                      </div>
                      {/* Progress bar */}
                      <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all',
                            occupancyPercent >= 90
                              ? 'bg-destructive'
                              : occupancyPercent >= 70
                              ? 'bg-warning'
                              : 'bg-success'
                          )}
                          style={{ width: `${occupancyPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Class Sheet */}
      <Sheet open={isNewOpen} onOpenChange={setIsNewOpen}>
        <SheetContent className="w-full sm:max-w-lg glass border-glass-border">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Nova Turma
            </SheetTitle>
            <SheetDescription>Configure os detalhes da nova turma</SheetDescription>
          </SheetHeader>

          <div className="space-y-4 py-6">
            <div>
              <Label>Dia da Semana</Label>
              <Select value={newClass.dia} onValueChange={(v) => setNewClass({ ...newClass, dia: v })}>
                <SelectTrigger className="glass border-glass-border mt-1.5">
                  <SelectValue placeholder="Selecione o dia" />
                </SelectTrigger>
                <SelectContent className="glass border-glass-border">
                  {diasSemana.map((dia) => (
                    <SelectItem key={dia} value={dia}>
                      {dia}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="horario">Horário</Label>
              <Input
                id="horario"
                type="time"
                value={newClass.horario}
                onChange={(e) => setNewClass({ ...newClass, horario: e.target.value })}
                className="glass border-glass-border mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="sala">Sala</Label>
              <Input
                id="sala"
                value={newClass.sala}
                onChange={(e) => setNewClass({ ...newClass, sala: e.target.value })}
                placeholder="Ex: Sala 01, Lab Info"
                className="glass border-glass-border mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="vagas">Vagas</Label>
              <Input
                id="vagas"
                type="number"
                value={newClass.vagas}
                onChange={(e) => setNewClass({ ...newClass, vagas: parseInt(e.target.value) || 0 })}
                className="glass border-glass-border mt-1.5"
              />
            </div>

            <div>
              <Label>Curso (opcional)</Label>
              <Select
                value={newClass.cursoId}
                onValueChange={(v) => setNewClass({ ...newClass, cursoId: v, pacoteId: '' })}
              >
                <SelectTrigger className="glass border-glass-border mt-1.5">
                  <SelectValue placeholder="Selecione um curso" />
                </SelectTrigger>
                <SelectContent className="glass border-glass-border">
                  <SelectItem value="">Nenhum</SelectItem>
                  {mockCourses.map((curso) => (
                    <SelectItem key={curso.id} value={curso.id}>
                      {curso.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Pacote (opcional)</Label>
              <Select
                value={newClass.pacoteId}
                onValueChange={(v) => setNewClass({ ...newClass, pacoteId: v, cursoId: '' })}
              >
                <SelectTrigger className="glass border-glass-border mt-1.5">
                  <SelectValue placeholder="Selecione um pacote" />
                </SelectTrigger>
                <SelectContent className="glass border-glass-border">
                  <SelectItem value="">Nenhum</SelectItem>
                  {mockPackages.map((pacote) => (
                    <SelectItem key={pacote.id} value={pacote.id}>
                      {pacote.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={() => setIsNewOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!newClass.dia || !newClass.horario || !newClass.sala}
              className="bg-gradient-primary glow-primary"
            >
              Criar Turma
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
