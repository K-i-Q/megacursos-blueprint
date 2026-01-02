import { useState } from 'react';
import {
  ClipboardCheck,
  Calendar,
  Check,
  X,
  RotateCcw,
  Save,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  mockClassGroups,
  mockStudents,
  mockCourses,
  mockPackages,
  mockAttendance,
  Attendance,
} from '@/data/mockData';
import { useProfile } from '@/contexts/ProfileContext';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function Chamada() {
  const { hasPermission } = useProfile();
  const [selectedTurma, setSelectedTurma] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<Record<string, 'presente' | 'falta'>>({});

  // Get students for selected class (mock - returns all active students)
  const studentsInClass = mockStudents.filter((s) => s.status === 'ativo');

  // Get course/package name for turma
  const getTurmaName = (turmaId: string) => {
    const turma = mockClassGroups.find((t) => t.id === turmaId);
    if (!turma) return '';
    const curso = mockCourses.find((c) => c.id === turma.cursoId);
    const pacote = mockPackages.find((p) => p.id === turma.pacoteId);
    return `${turma.dia} ${turma.horario} - ${curso?.nome || pacote?.nome || 'Turma'}`;
  };

  // Handle attendance toggle
  const toggleAttendance = (studentId: string) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === 'presente' ? 'falta' : 'presente',
    }));
  };

  // Mark all present
  const markAllPresent = () => {
    const newAttendance: Record<string, 'presente' | 'falta'> = {};
    studentsInClass.forEach((s) => {
      newAttendance[s.id] = 'presente';
    });
    setAttendance(newAttendance);
  };

  // Save attendance
  const saveAttendance = () => {
    toast({
      title: 'Chamada salva!',
      description: `${Object.values(attendance).filter((a) => a === 'presente').length} presentes, ${Object.values(attendance).filter((a) => a === 'falta').length} faltas`,
    });
  };

  // Stats
  const presentCount = Object.values(attendance).filter((a) => a === 'presente').length;
  const absentCount = Object.values(attendance).filter((a) => a === 'falta').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Chamada / Frequência"
        description="Registre a presença dos alunos"
        icon={ClipboardCheck}
      />

      {/* Selection */}
      <div className="glass-card rounded-xl p-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label>Turma</Label>
            <Select value={selectedTurma} onValueChange={setSelectedTurma}>
              <SelectTrigger className="glass border-glass-border mt-1.5">
                <SelectValue placeholder="Selecione a turma" />
              </SelectTrigger>
              <SelectContent className="glass border-glass-border">
                {mockClassGroups.map((turma) => (
                  <SelectItem key={turma.id} value={turma.id}>
                    {getTurmaName(turma.id)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="glass border-glass-border mt-1.5"
            />
          </div>
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={markAllPresent}
              disabled={!selectedTurma}
              className="w-full glass border-glass-border"
            >
              <Check className="mr-2 h-4 w-4" />
              Marcar Todos Presente
            </Button>
          </div>
        </div>
      </div>

      {/* Attendance Stats */}
      {selectedTurma && (
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">{studentsInClass.length}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-success">{presentCount}</p>
            <p className="text-sm text-muted-foreground">Presentes</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-destructive">{absentCount}</p>
            <p className="text-sm text-muted-foreground">Faltas</p>
          </div>
        </div>
      )}

      {/* Student List */}
      {selectedTurma ? (
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="divide-y divide-border">
            {studentsInClass.map((student) => {
              const status = attendance[student.id];
              return (
                <div
                  key={student.id}
                  className={cn(
                    'flex items-center justify-between p-4 transition-colors',
                    status === 'presente' && 'bg-success/10',
                    status === 'falta' && 'bg-destructive/10'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={student.foto}
                      alt={student.nome}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{student.nome}</p>
                      <p className="text-xs text-muted-foreground">{student.matricula}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {status && (
                      <Badge
                        className={cn(
                          'mr-2',
                          status === 'presente'
                            ? 'bg-success/20 text-success border-0'
                            : 'bg-destructive/20 text-destructive border-0'
                        )}
                      >
                        {status === 'presente' ? 'Presente' : 'Falta'}
                      </Badge>
                    )}
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant={status === 'presente' ? 'default' : 'outline'}
                        onClick={() =>
                          setAttendance((prev) => ({ ...prev, [student.id]: 'presente' }))
                        }
                        className={cn(
                          status === 'presente' && 'bg-success hover:bg-success/90'
                        )}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={status === 'falta' ? 'default' : 'outline'}
                        onClick={() =>
                          setAttendance((prev) => ({ ...prev, [student.id]: 'falta' }))
                        }
                        className={cn(
                          status === 'falta' && 'bg-destructive hover:bg-destructive/90'
                        )}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-xl p-12 text-center">
          <ClipboardCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Selecione uma turma e data para fazer a chamada
          </p>
        </div>
      )}

      {/* Save Button */}
      {selectedTurma && Object.keys(attendance).length > 0 && (
        <div className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-50">
          <Button
            size="lg"
            onClick={saveAttendance}
            className="bg-gradient-primary glow-primary shadow-lg gap-2"
          >
            <Save className="h-5 w-5" />
            Salvar Chamada
          </Button>
        </div>
      )}
    </div>
  );
}
