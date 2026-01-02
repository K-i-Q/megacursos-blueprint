// Mock Data for MegaCursos - Gestão Escolar

export type Profile = 'secretaria' | 'instrutorIngles' | 'instrutorInformatica' | 'vendedor' | 'coordenador';

export interface Student {
  id: string;
  matricula: string;
  nome: string;
  whatsapp: string;
  foto: string;
  cursos: string[];
  pacotes: string[];
  dataInicio: string;
  dataTermino: string;
  status: 'ativo' | 'inativo' | 'concluido';
  tags: ('novo' | 'concluindo')[];
  checklist: {
    apostila: boolean;
    mimo: boolean;
    carne: boolean;
  };
  observacoes: string;
}

export interface Course {
  id: string;
  nome: string;
  cargaHoraria: number;
  imagem: string;
}

export interface Package {
  id: string;
  nome: string;
  cursos: string[];
  qtdAulas: number;
  imagem: string;
  ordem: number;
}

export interface ClassGroup {
  id: string;
  dia: string;
  horario: string;
  sala: string;
  vagas: number;
  vagasOcupadas: number;
  cursoId?: string;
  pacoteId?: string;
}

export interface Attendance {
  id: string;
  turmaId: string;
  alunoId: string;
  data: string;
  status: 'presente' | 'falta' | 'reposicao';
}

export interface Payment {
  id: string;
  alunoId: string;
  mes: string;
  valor: number;
  status: 'pago' | 'aberto' | 'atrasado';
  metodo?: 'pix' | 'cartao' | 'dinheiro';
  dataPagamento?: string;
}

export interface CashEntry {
  id: string;
  tipo: 'entrada' | 'saida';
  descricao: string;
  valor: number;
  data: string;
  hora: string;
}

export interface AuditLog {
  id: string;
  usuario: string;
  acao: string;
  detalhes: string;
  data: string;
  hora: string;
}

// Mock Courses
export const mockCourses: Course[] = [
  { id: 'c1', nome: 'Inglês Básico', cargaHoraria: 60, imagem: '/placeholder.svg' },
  { id: 'c2', nome: 'Inglês Intermediário', cargaHoraria: 80, imagem: '/placeholder.svg' },
  { id: 'c3', nome: 'Inglês Avançado', cargaHoraria: 100, imagem: '/placeholder.svg' },
  { id: 'c4', nome: 'Informática Básica', cargaHoraria: 40, imagem: '/placeholder.svg' },
  { id: 'c5', nome: 'Excel Avançado', cargaHoraria: 30, imagem: '/placeholder.svg' },
  { id: 'c6', nome: 'Design Gráfico', cargaHoraria: 60, imagem: '/placeholder.svg' },
  { id: 'c7', nome: 'Programação Web', cargaHoraria: 80, imagem: '/placeholder.svg' },
];

// Mock Packages
export const mockPackages: Package[] = [
  { id: 'p1', nome: 'Pacote Inglês Completo', cursos: ['c1', 'c2', 'c3'], qtdAulas: 48, imagem: '/placeholder.svg', ordem: 1 },
  { id: 'p2', nome: 'Pacote Informática Pro', cursos: ['c4', 'c5', 'c6'], qtdAulas: 36, imagem: '/placeholder.svg', ordem: 2 },
  { id: 'p3', nome: 'Pacote Full Stack', cursos: ['c4', 'c7'], qtdAulas: 40, imagem: '/placeholder.svg', ordem: 3 },
];

// Mock Students
export const mockStudents: Student[] = [
  {
    id: 's1',
    matricula: 'MC-000001',
    nome: 'Ana Carolina Silva',
    whatsapp: '(11) 99999-1111',
    foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    cursos: ['c1'],
    pacotes: ['p1'],
    dataInicio: '2025-01-05',
    dataTermino: '2025-07-05',
    status: 'ativo',
    tags: ['novo'],
    checklist: { apostila: true, mimo: true, carne: true },
    observacoes: 'Aluna dedicada, sempre pontual.',
  },
  {
    id: 's2',
    matricula: 'MC-000002',
    nome: 'Bruno Oliveira Santos',
    whatsapp: '(11) 98888-2222',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    cursos: ['c4', 'c5'],
    pacotes: [],
    dataInicio: '2024-08-10',
    dataTermino: '2025-02-10',
    status: 'ativo',
    tags: ['concluindo'],
    checklist: { apostila: true, mimo: false, carne: true },
    observacoes: '',
  },
  {
    id: 's3',
    matricula: 'MC-000003',
    nome: 'Carla Mendes Pereira',
    whatsapp: '(11) 97777-3333',
    foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    cursos: ['c2'],
    pacotes: [],
    dataInicio: '2024-09-15',
    dataTermino: '2025-03-15',
    status: 'ativo',
    tags: [],
    checklist: { apostila: true, mimo: true, carne: true },
    observacoes: 'Precisa de reforço em gramática.',
  },
  {
    id: 's4',
    matricula: 'MC-000004',
    nome: 'Daniel Costa Lima',
    whatsapp: '(11) 96666-4444',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    cursos: [],
    pacotes: ['p2'],
    dataInicio: '2024-12-01',
    dataTermino: '2025-06-01',
    status: 'ativo',
    tags: ['novo'],
    checklist: { apostila: false, mimo: false, carne: true },
    observacoes: 'Aguardando entrega de material.',
  },
  {
    id: 's5',
    matricula: 'MC-000005',
    nome: 'Eduarda Ribeiro',
    whatsapp: '(11) 95555-5555',
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    cursos: ['c7'],
    pacotes: ['p3'],
    dataInicio: '2024-10-20',
    dataTermino: '2025-04-20',
    status: 'ativo',
    tags: [],
    checklist: { apostila: true, mimo: true, carne: true },
    observacoes: '',
  },
  {
    id: 's6',
    matricula: 'MC-000006',
    nome: 'Felipe Almeida',
    whatsapp: '(11) 94444-6666',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    cursos: ['c1', 'c4'],
    pacotes: [],
    dataInicio: '2024-07-01',
    dataTermino: '2025-01-01',
    status: 'concluido',
    tags: [],
    checklist: { apostila: true, mimo: true, carne: true },
    observacoes: 'Curso finalizado com sucesso.',
  },
];

// Mock Class Groups
export const mockClassGroups: ClassGroup[] = [
  { id: 't1', dia: 'Segunda', horario: '08:00', sala: 'Sala 01', vagas: 15, vagasOcupadas: 12, cursoId: 'c1' },
  { id: 't2', dia: 'Segunda', horario: '14:00', sala: 'Sala 02', vagas: 15, vagasOcupadas: 8, cursoId: 'c4' },
  { id: 't3', dia: 'Terça', horario: '09:00', sala: 'Sala 01', vagas: 12, vagasOcupadas: 10, pacoteId: 'p1' },
  { id: 't4', dia: 'Terça', horario: '19:00', sala: 'Lab Info', vagas: 20, vagasOcupadas: 18, cursoId: 'c7' },
  { id: 't5', dia: 'Quarta', horario: '10:00', sala: 'Sala 03', vagas: 15, vagasOcupadas: 6, cursoId: 'c2' },
  { id: 't6', dia: 'Quinta', horario: '08:00', sala: 'Lab Info', vagas: 20, vagasOcupadas: 15, pacoteId: 'p2' },
  { id: 't7', dia: 'Sexta', horario: '14:00', sala: 'Sala 01', vagas: 15, vagasOcupadas: 14, cursoId: 'c3' },
];

// Mock Attendance
export const mockAttendance: Attendance[] = [
  { id: 'a1', turmaId: 't1', alunoId: 's1', data: '2025-01-06', status: 'presente' },
  { id: 'a2', turmaId: 't1', alunoId: 's3', data: '2025-01-06', status: 'presente' },
  { id: 'a3', turmaId: 't2', alunoId: 's2', data: '2025-01-06', status: 'falta' },
  { id: 'a4', turmaId: 't4', alunoId: 's5', data: '2025-01-07', status: 'presente' },
  { id: 'a5', turmaId: 't1', alunoId: 's1', data: '2024-12-30', status: 'falta' },
  { id: 'a6', turmaId: 't1', alunoId: 's1', data: '2024-12-23', status: 'presente' },
];

// Mock Payments
export const mockPayments: Payment[] = [
  { id: 'pay1', alunoId: 's1', mes: '2025-01', valor: 350, status: 'pago', metodo: 'pix', dataPagamento: '2025-01-05' },
  { id: 'pay2', alunoId: 's2', mes: '2025-01', valor: 280, status: 'aberto' },
  { id: 'pay3', alunoId: 's3', mes: '2025-01', valor: 320, status: 'atrasado' },
  { id: 'pay4', alunoId: 's4', mes: '2025-01', valor: 450, status: 'pago', metodo: 'cartao', dataPagamento: '2025-01-02' },
  { id: 'pay5', alunoId: 's5', mes: '2025-01', valor: 380, status: 'aberto' },
  { id: 'pay6', alunoId: 's1', mes: '2024-12', valor: 350, status: 'pago', metodo: 'dinheiro', dataPagamento: '2024-12-05' },
  { id: 'pay7', alunoId: 's2', mes: '2024-12', valor: 280, status: 'pago', metodo: 'pix', dataPagamento: '2024-12-10' },
  { id: 'pay8', alunoId: 's3', mes: '2024-12', valor: 320, status: 'atrasado' },
];

// Mock Cash Entries
export const mockCashEntries: CashEntry[] = [
  { id: 'ce1', tipo: 'entrada', descricao: 'Mensalidade - Ana Carolina', valor: 350, data: '2025-01-02', hora: '09:15' },
  { id: 'ce2', tipo: 'entrada', descricao: 'Mensalidade - Daniel Costa', valor: 450, data: '2025-01-02', hora: '10:30' },
  { id: 'ce3', tipo: 'saida', descricao: 'Material de escritório', valor: 85, data: '2025-01-02', hora: '11:00' },
  { id: 'ce4', tipo: 'entrada', descricao: 'Matrícula nova - Pedro Souza', valor: 150, data: '2025-01-02', hora: '14:20' },
  { id: 'ce5', tipo: 'saida', descricao: 'Café e água', valor: 45, data: '2025-01-02', hora: '16:00' },
];

// Mock Audit Logs
export const mockAuditLogs: AuditLog[] = [
  { id: 'log1', usuario: 'Maria (Secretaria)', acao: 'Cadastrou aluno', detalhes: 'Ana Carolina Silva - MC-000001', data: '2025-01-02', hora: '09:00' },
  { id: 'log2', usuario: 'João (Coordenador)', acao: 'Editou turma', detalhes: 'Turma de Inglês Básico - Segunda 08:00', data: '2025-01-02', hora: '10:15' },
  { id: 'log3', usuario: 'Carlos (Vendedor)', acao: 'Registrou matrícula', detalhes: 'Daniel Costa Lima - Pacote Informática Pro', data: '2025-01-02', hora: '11:30' },
  { id: 'log4', usuario: 'Prof. Ana (Instrutor)', acao: 'Fez chamada', detalhes: 'Turma t1 - 06/01/2025', data: '2025-01-06', hora: '08:30' },
];

// Profile permissions
export const profilePermissions: Record<Profile, {
  canCreate: string[];
  canEdit: string[];
  canDelete: string[];
  canView: string[];
}> = {
  secretaria: {
    canCreate: ['alunos', 'matriculas', 'mensalidades', 'caixa', 'chamada'],
    canEdit: ['alunos', 'turmas', 'mensalidades'],
    canDelete: ['alunos'],
    canView: ['*'],
  },
  instrutorIngles: {
    canCreate: ['chamada'],
    canEdit: ['chamada'],
    canDelete: [],
    canView: ['turmas', 'alunos', 'chamada', 'reposicao'],
  },
  instrutorInformatica: {
    canCreate: ['chamada'],
    canEdit: ['chamada'],
    canDelete: [],
    canView: ['turmas', 'alunos', 'chamada', 'reposicao'],
  },
  vendedor: {
    canCreate: ['alunos', 'matriculas'],
    canEdit: [],
    canDelete: [],
    canView: ['alunos', 'cursos', 'pacotes', 'matriculas'],
  },
  coordenador: {
    canCreate: ['*'],
    canEdit: ['*'],
    canDelete: ['alunos', 'turmas', 'cursos'],
    canView: ['*'],
  },
};

// Profile labels
export const profileLabels: Record<Profile, string> = {
  secretaria: 'Secretaria',
  instrutorIngles: 'Instrutor Inglês',
  instrutorInformatica: 'Instrutor Informática',
  vendedor: 'Vendedor',
  coordenador: 'Coordenador',
};
