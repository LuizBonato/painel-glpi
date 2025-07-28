import React from 'react';
import { Calendar, Clock, User, AlertCircle } from 'lucide-react';
import { Ticket } from '../types/ticket';
import { TicketBadge } from './TicketBadge';

interface TicketCardProps {
  ticket: Ticket;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const isExpired = new Date(ticket.dataVencimento) < new Date();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-gray-600">#{ticket.id}</span>
            <TicketBadge type="status" value={ticket.status} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {ticket.titulo}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {ticket.descricao}
          </p>
        </div>
        <div className="flex flex-col gap-2 ml-4">
          <TicketBadge type="priority" value={ticket.prioridade} />
          <TicketBadge type="sla" value={ticket.sla} slaExpired={isExpired} />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span className="font-medium">Solicitante:</span>
          <span>{ticket.solicitante}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <AlertCircle className="w-4 h-4" />
          <span className="font-medium">Técnico:</span>
          <span>{ticket.tecnico}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="font-medium">Abertura:</span>
          <span>{new Date(ticket.dataAbertura).toLocaleString('pt-BR')}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4" />
          <span className="font-medium">Vencimento:</span>
          <span className={isExpired ? 'text-red-600 font-semibold' : 'text-gray-600'}>
            {new Date(ticket.dataVencimento).toLocaleString('pt-BR')}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {ticket.categoria}
        </span>
      </div>
    </div>
  );
};