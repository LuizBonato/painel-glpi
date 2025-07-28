import React from 'react';
import { AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Ticket } from '../types/ticket';

interface StatsCardsProps {
  tickets: Ticket[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ tickets }) => {
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'aberto').length;
  const inProgressTickets = tickets.filter(t => t.status === 'em_andamento').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolvido').length;
  const expiredTickets = tickets.filter(t => new Date(t.dataVencimento) < new Date()).length;

  const stats = [
    {
      title: 'Total de Chamados',
      value: totalTickets,
      icon: AlertCircle,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Abertos',
      value: openTickets,
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    {
      title: 'Em Andamento',
      value: inProgressTickets,
      icon: AlertCircle,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    {
      title: 'Resolvidos',
      value: resolvedTickets,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Vencidos',
      value: expiredTickets,
      icon: XCircle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`${stat.bgColor} rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200`}
          >
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3 mr-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};