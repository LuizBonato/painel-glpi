import { Ticket } from '../types/ticket';

export const mockTickets: Ticket[] = [
  {
    id: 1001,
    solicitante: "Ana Silva",
    titulo: "Problema com impressora HP LaserJet",
    descricao: "Impressora não está conectando à rede",
    sla: "4h",
    status: "aberto",
    prioridade: "alta",
    tecnico: "João Santos",
    dataAbertura: "2025-01-15 08:30",
    dataVencimento: "2025-01-15 12:30",
    categoria: "Hardware"
  },
  {
    id: 1002,
    solicitante: "Carlos Mendes",
    titulo: "Acesso negado ao sistema ERP",
    descricao: "Usuário não consegue acessar módulo financeiro",
    sla: "2h",
    status: "em_andamento",
    prioridade: "urgente",
    tecnico: "Maria Costa",
    dataAbertura: "2025-01-15 09:15",
    dataVencimento: "2025-01-15 11:15",
    categoria: "Software"
  },
  {
    id: 1003,
    solicitante: "Fernanda Lima",
    titulo: "Lentidão na rede",
    descricao: "Internet muito lenta no setor comercial",
    sla: "8h",
    status: "resolvido",
    prioridade: "normal",
    tecnico: "Pedro Oliveira",
    dataAbertura: "2025-01-14 14:20",
    dataVencimento: "2025-01-14 22:20",
    categoria: "Rede"
  },
  {
    id: 1004,
    solicitante: "Roberto Alves",
    titulo: "Instalação de software Adobe Creative",
    descricao: "Necessário instalar pacote Adobe para design",
    sla: "24h",
    status: "aberto",
    prioridade: "baixa",
    tecnico: "Ana Garcia",
    dataAbertura: "2025-01-15 10:45",
    dataVencimento: "2025-01-16 10:45",
    categoria: "Software"
  },
  {
    id: 1005,
    solicitante: "Luciana Santos",
    titulo: "Monitor com defeito",
    descricao: "Monitor Dell apresentando linhas na tela",
    sla: "12h",
    status: "em_andamento",
    prioridade: "normal",
    tecnico: "João Santos",
    dataAbertura: "2025-01-15 07:00",
    dataVencimento: "2025-01-15 19:00",
    categoria: "Hardware"
  },
  {
    id: 1006,
    solicitante: "Marcos Ferreira",
    titulo: "Backup não funcionando",
    descricao: "Sistema de backup automático falhou",
    sla: "1h",
    status: "fechado",
    prioridade: "urgente",
    tecnico: "Maria Costa",
    dataAbertura: "2025-01-14 16:30",
    dataVencimento: "2025-01-14 17:30",
    categoria: "Sistema"
  },
  {
    id: 1007,
    solicitante: "Patricia Ramos",
    titulo: "Email não sincronizando",
    descricao: "Outlook não está recebendo emails",
    sla: "6h",
    status: "aberto",
    prioridade: "alta",
    tecnico: "Pedro Oliveira",
    dataAbertura: "2025-01-15 11:20",
    dataVencimento: "2025-01-15 17:20",
    categoria: "Email"
  },
  {
    id: 1008,
    solicitante: "Diego Costa",
    titulo: "Criação de usuário no sistema",
    descricao: "Novo funcionário precisa de acesso aos sistemas",
    sla: "24h",
    status: "em_andamento",
    prioridade: "normal",
    tecnico: "Ana Garcia",
    dataAbertura: "2025-01-15 13:15",
    dataVencimento: "2025-01-16 13:15",
    categoria: "Acesso"
  }
];