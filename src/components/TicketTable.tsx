import React from 'react';
import { Calendar, Clock, User, AlertCircle, ArrowUpDown } from 'lucide-react';
import { Ticket } from '../types/ticket';
import { TicketBadge } from './TicketBadge';

interface TicketTableProps {
  tickets: Ticket[];
  sortField: keyof Ticket | null;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof Ticket) => void;
}

export const TicketTable: React.FC<TicketTableProps> = ({ 
  tickets, 
  sortField, 
  sortDirection, 
  onSort 
}) => {
  const getSortIcon = (field: keyof Ticket) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return (
      <ArrowUpDown 
        className={`w-4 h-4 ${sortDirection === 'asc' ? 'text-blue-600 rotate-180' : 'text-blue-600'}`}
      />
    );
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSort('id')}
            >
              <div className="flex items-center gap-2">
                ID
                {getSortIcon('id')}
              </div>
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSort('solicitante')}
            >
              <div className="flex items-center gap-2">
                Solicitante
                {getSortIcon('solicitante')}
              </div>
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSort('titulo')}
            >
              <div className="flex items-center gap-2">
                Título
                {getSortIcon('titulo')}
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prioridade
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSort('sla')}
            >
              <div className="flex items-center gap-2">
                SLA
                {getSortIcon('sla')}
              </div>
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSort('tecnico')}
            >
              <div className="flex items-center gap-2">
                Técnico
                {getSortIcon('tecnico')}
              </div>
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSort('dataVencimento')}
            >
              <div className="flex items-center gap-2">
                Vencimento
                {getSortIcon('dataVencimento')}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tickets.map((ticket) => {
            const isExpired = new Date(ticket.dataVencimento) < new Date();
            return (
              <tr key={ticket.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{ticket.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">
                      {ticket.solicitante}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 font-medium max-w-xs truncate">
                    {ticket.titulo}
                  </div>
                  <div className="text-sm text-gray-500 max-w-xs truncate">
                    {ticket.descricao}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TicketBadge type="status" value={ticket.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TicketBadge type="priority" value={ticket.prioridade} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TicketBadge type="sla" value={ticket.sla} slaExpired={isExpired} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <AlertCircle className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {ticket.tecnico}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-2" />
                    <span className={`text-sm ${isExpired ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                      {new Date(ticket.dataVencimento).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};