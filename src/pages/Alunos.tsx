import { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  UserX,
  Phone,
  Calendar,
  Book,
  Package,
  CheckCircle,
  XCircle,
  Gift,
  FileText,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockStudents, mockCourses, mockPackages, Student } from '@/data/mockData';
import { useProfile } from '@/contexts/ProfileContext';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function Alunos() {
  const { hasPermission } = useProfile();
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isNewStudentOpen, setIsNewStudentOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // New student form state
  const [newStudent, setNewStudent] = useState({
    nome: '',
    whatsapp: '',
    cursos: [] as string[],
    pacotes: [] as string[],
    dataInicio: '',
    dataTermino: '',
    checklist: { apostila: false, mimo: false, carne: false },
    observacoes: '',
  });

  // Filter students
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.nome.toLowerCase().includes(search.toLowerCase()) ||
      student.whatsapp.includes(search);
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesTag =
      tagFilter === 'all' ||
      (tagFilter === 'novo' && student.tags.includes('novo')) ||
      (tagFilter === 'concluindo' && student.tags.includes('concluindo'));
    return matchesSearch && matchesStatus && matchesTag;
  });

  // Generate matricula
  const generateMatricula = () => {
    const num = students.length + 1;
    return `MC-${String(num).padStart(6, '0')}`;
  };

  // Handle new student submission
  const handleCreateStudent = () => {
    const matricula = generateMatricula();
    const student: Student = {
      id: `s${Date.now()}`,
      matricula,
      nome: newStudent.nome,
      whatsapp: newStudent.whatsapp,
      foto: `https://ui-avatars.com/api/?name=${encodeURIComponent(newStudent.nome)}&background=3b82f6&color=fff`,
      cursos: newStudent.cursos,
      pacotes: newStudent.pacotes,
      dataInicio: newStudent.dataInicio,
      dataTermino: newStudent.dataTermino,
      status: 'ativo',
      tags: ['novo'],
      checklist: newStudent.checklist,
      observacoes: newStudent.observacoes,
    };

    setStudents([student, ...students]);
    setIsNewStudentOpen(false);
    setNewStudent({
      nome: '',
      whatsapp: '',
      cursos: [],
      pacotes: [],
      dataInicio: '',
      dataTermino: '',
      checklist: { apostila: false, mimo: false, carne: false },
      observacoes: '',
    });

    toast({
      title: 'Aluno cadastrado!',
      description: `${student.nome} - ${matricula}`,
    });
  };

  // Handle student deactivation
  const handleDeactivate = (student: Student) => {
    setStudents(
      students.map((s) =>
        s.id === student.id ? { ...s, status: 'inativo' as const } : s
      )
    );
    toast({
      title: 'Aluno desativado',
      description: student.nome,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Alunos"
        description="Gerencie os alunos matriculados"
        icon={Users}
        action={
          hasPermission('create', 'alunos')
            ? {
                label: 'Novo Aluno',
                icon: Plus,
                onClick: () => setIsNewStudentOpen(true),
              }
            : undefined
        }
      />

      {/* Filters */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou WhatsApp..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 glass border-glass-border"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] glass border-glass-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="glass border-glass-border">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="ativo">Ativos</SelectItem>
                <SelectItem value="inativo">Inativos</SelectItem>
                <SelectItem value="concluido">Concluídos</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger className="w-[140px] glass border-glass-border">
                <SelectValue placeholder="Tags" />
              </SelectTrigger>
              <SelectContent className="glass border-glass-border">
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="novo">Novos</SelectItem>
                <SelectItem value="concluindo">Concluindo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="glass-card rounded-xl overflow-hidden">
        <ScrollArea className="w-full">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 p-4 border-b border-border bg-muted/30 text-sm font-semibold text-muted-foreground">
              <div className="w-12">Foto</div>
              <div>Aluno</div>
              <div className="w-32">Status</div>
              <div className="w-24">Tags</div>
              <div className="w-24">Checklist</div>
              <div className="w-24">Ações</div>
            </div>
            {filteredStudents.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                Nenhum aluno encontrado
              </div>
            ) : (
              filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 p-4 border-b border-border/50 items-center hover:bg-muted/30 transition-colors"
                >
                  <img
                    src={student.foto}
                    alt={student.nome}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div>
                    <p className="font-medium">{student.nome}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {student.whatsapp}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {student.matricula}
                    </p>
                  </div>
                  <div className="w-32">
                    <Badge
                      variant={
                        student.status === 'ativo'
                          ? 'default'
                          : student.status === 'inativo'
                          ? 'destructive'
                          : 'secondary'
                      }
                      className={cn(
                        student.status === 'ativo' && 'bg-success/20 text-success border-0'
                      )}
                    >
                      {student.status === 'ativo'
                        ? 'Ativo'
                        : student.status === 'inativo'
                        ? 'Inativo'
                        : 'Concluído'}
                    </Badge>
                  </div>
                  <div className="w-24 flex gap-1 flex-wrap">
                    {student.tags.includes('novo') && (
                      <Badge className="text-[10px] bg-primary/20 text-primary border-0">
                        Novo
                      </Badge>
                    )}
                    {student.tags.includes('concluindo') && (
                      <Badge className="text-[10px] bg-warning/20 text-warning border-0">
                        Concluindo
                      </Badge>
                    )}
                  </div>
                  <div className="w-24 flex gap-1">
                    {student.checklist.apostila ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                    {student.checklist.mimo ? (
                      <Gift className="h-4 w-4 text-success" />
                    ) : (
                      <Gift className="h-4 w-4 text-muted-foreground" />
                    )}
                    {student.checklist.carne ? (
                      <FileText className="h-4 w-4 text-success" />
                    ) : (
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="w-24">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Ações
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass border-glass-border">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedStudent(student);
                            setIsDetailOpen(true);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalhes
                        </DropdownMenuItem>
                        {hasPermission('edit', 'alunos') && (
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                        )}
                        {hasPermission('delete', 'alunos') && student.status === 'ativo' && (
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeactivate(student)}
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            Desativar
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* New Student Sheet */}
      <Sheet open={isNewStudentOpen} onOpenChange={setIsNewStudentOpen}>
        <SheetContent className="w-full sm:max-w-lg glass border-glass-border overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Novo Aluno
            </SheetTitle>
            <SheetDescription>
              Preencha os dados para cadastrar um novo aluno. Matrícula: {generateMatricula()}
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 py-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  value={newStudent.nome}
                  onChange={(e) => setNewStudent({ ...newStudent, nome: e.target.value })}
                  placeholder="Digite o nome do aluno"
                  className="glass border-glass-border mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="whatsapp">WhatsApp *</Label>
                <Input
                  id="whatsapp"
                  value={newStudent.whatsapp}
                  onChange={(e) => setNewStudent({ ...newStudent, whatsapp: e.target.value })}
                  placeholder="(11) 99999-9999"
                  className="glass border-glass-border mt-1.5"
                />
              </div>
            </div>

            {/* Courses & Packages */}
            <div className="space-y-4">
              <div>
                <Label>Cursos</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {mockCourses.map((curso) => (
                    <div
                      key={curso.id}
                      className={cn(
                        'p-3 rounded-lg border cursor-pointer transition-all',
                        newStudent.cursos.includes(curso.id)
                          ? 'border-primary bg-primary/20'
                          : 'border-border hover:border-primary/50'
                      )}
                      onClick={() => {
                        const cursos = newStudent.cursos.includes(curso.id)
                          ? newStudent.cursos.filter((c) => c !== curso.id)
                          : [...newStudent.cursos, curso.id];
                        setNewStudent({ ...newStudent, cursos });
                      }}
                    >
                      <p className="text-sm font-medium">{curso.nome}</p>
                      <p className="text-xs text-muted-foreground">{curso.cargaHoraria}h</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Pacotes</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {mockPackages.map((pacote) => (
                    <div
                      key={pacote.id}
                      className={cn(
                        'p-3 rounded-lg border cursor-pointer transition-all',
                        newStudent.pacotes.includes(pacote.id)
                          ? 'border-accent bg-accent/20'
                          : 'border-border hover:border-accent/50'
                      )}
                      onClick={() => {
                        const pacotes = newStudent.pacotes.includes(pacote.id)
                          ? newStudent.pacotes.filter((p) => p !== pacote.id)
                          : [...newStudent.pacotes, pacote.id];
                        setNewStudent({ ...newStudent, pacotes });
                      }}
                    >
                      <p className="text-sm font-medium">{pacote.nome}</p>
                      <p className="text-xs text-muted-foreground">{pacote.qtdAulas} aulas</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dataInicio">Data Início</Label>
                <Input
                  id="dataInicio"
                  type="date"
                  value={newStudent.dataInicio}
                  onChange={(e) => setNewStudent({ ...newStudent, dataInicio: e.target.value })}
                  className="glass border-glass-border mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="dataTermino">Data Término</Label>
                <Input
                  id="dataTermino"
                  type="date"
                  value={newStudent.dataTermino}
                  onChange={(e) => setNewStudent({ ...newStudent, dataTermino: e.target.value })}
                  className="glass border-glass-border mt-1.5"
                />
              </div>
            </div>

            {/* Checklist */}
            <div>
              <Label>Checklist de Entrega</Label>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="apostila"
                    checked={newStudent.checklist.apostila}
                    onCheckedChange={(checked) =>
                      setNewStudent({
                        ...newStudent,
                        checklist: { ...newStudent.checklist, apostila: !!checked },
                      })
                    }
                  />
                  <Label htmlFor="apostila" className="text-sm cursor-pointer">
                    Apostila
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="mimo"
                    checked={newStudent.checklist.mimo}
                    onCheckedChange={(checked) =>
                      setNewStudent({
                        ...newStudent,
                        checklist: { ...newStudent.checklist, mimo: !!checked },
                      })
                    }
                  />
                  <Label htmlFor="mimo" className="text-sm cursor-pointer">
                    Mimo
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="carne"
                    checked={newStudent.checklist.carne}
                    onCheckedChange={(checked) =>
                      setNewStudent({
                        ...newStudent,
                        checklist: { ...newStudent.checklist, carne: !!checked },
                      })
                    }
                  />
                  <Label htmlFor="carne" className="text-sm cursor-pointer">
                    Carnê
                  </Label>
                </div>
              </div>
            </div>

            {/* Observations */}
            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={newStudent.observacoes}
                onChange={(e) => setNewStudent({ ...newStudent, observacoes: e.target.value })}
                placeholder="Anotações sobre o aluno..."
                className="glass border-glass-border mt-1.5"
              />
            </div>
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={() => setIsNewStudentOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreateStudent}
              disabled={!newStudent.nome || !newStudent.whatsapp}
              className="bg-gradient-primary glow-primary"
            >
              Cadastrar Aluno
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Student Detail Sheet */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="w-full sm:max-w-lg glass border-glass-border overflow-y-auto">
          {selectedStudent && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-4">
                  <img
                    src={selectedStudent.foto}
                    alt={selectedStudent.nome}
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div>
                    <SheetTitle>{selectedStudent.nome}</SheetTitle>
                    <SheetDescription>{selectedStudent.matricula}</SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-6 py-6">
                <div className="glass-card rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedStudent.whatsapp}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {selectedStudent.dataInicio} a {selectedStudent.dataTermino}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={cn(
                        selectedStudent.status === 'ativo' && 'bg-success/20 text-success border-0'
                      )}
                    >
                      {selectedStudent.status}
                    </Badge>
                    {selectedStudent.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className={cn(
                          tag === 'novo' && 'bg-primary/20 text-primary border-0',
                          tag === 'concluindo' && 'bg-warning/20 text-warning border-0'
                        )}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedStudent.cursos.length > 0 && (
                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <Book className="h-4 w-4" />
                      Cursos
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.cursos.map((cursoId) => {
                        const curso = mockCourses.find((c) => c.id === cursoId);
                        return (
                          <Badge key={cursoId} variant="secondary">
                            {curso?.nome}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedStudent.pacotes.length > 0 && (
                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <Package className="h-4 w-4" />
                      Pacotes
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.pacotes.map((pacoteId) => {
                        const pacote = mockPackages.find((p) => p.id === pacoteId);
                        return (
                          <Badge key={pacoteId} variant="secondary">
                            {pacote?.nome}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div>
                  <Label className="mb-2 block">Checklist</Label>
                  <div className="flex gap-4">
                    <div
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded-lg',
                        selectedStudent.checklist.apostila
                          ? 'bg-success/20 text-success'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Apostila</span>
                    </div>
                    <div
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded-lg',
                        selectedStudent.checklist.mimo
                          ? 'bg-success/20 text-success'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      <Gift className="h-4 w-4" />
                      <span className="text-sm">Mimo</span>
                    </div>
                    <div
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded-lg',
                        selectedStudent.checklist.carne
                          ? 'bg-success/20 text-success'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">Carnê</span>
                    </div>
                  </div>
                </div>

                {selectedStudent.observacoes && (
                  <div>
                    <Label className="mb-2 block">Observações</Label>
                    <p className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
                      {selectedStudent.observacoes}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
