export interface Ticket {
  id: number;
  solicitante: string;
  titulo: string;
  descricao: string;
  sla: string;
  status: 'aberto' | 'em_andamento' | 'resolvido' | 'fechado';
  prioridade: 'baixa' | 'normal' | 'alta' | 'urgente';
  tecnico: string;
  dataAbertura: string;
  dataVencimento: string;
  categoria: string;
}