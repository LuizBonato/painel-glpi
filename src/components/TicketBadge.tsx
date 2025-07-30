import React from 'react';

interface TicketBadgeProps {
  type: 'status' | 'priority' | 'sla';
  value: string;
  slaExpired?: boolean;
}

export const TicketBadge: React.FC<TicketBadgeProps> = ({ type, value, slaExpired = false }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aberto':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'em_andamento':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolvido':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'fechado':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'baixa':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'normal':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'alta':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'urgente':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSlaColor = (_sla: string, expired: boolean) => {
    if (expired) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const formatValue = (type: string, value: string) => {
    if (type === 'status') {
      return value.replace('_', ' ').toUpperCase();
    }
    if (type === 'priority') {
      return value.toUpperCase();
    }
    return value;
  };

  let colorClass = '';
  switch (type) {
    case 'status':
      colorClass = getStatusColor(value);
      break;
    case 'priority':
      colorClass = getPriorityColor(value);
      break;
    case 'sla':
      colorClass = getSlaColor(value, slaExpired);
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass} transition-colors duration-200`}>
      {formatValue(type, value)}
    </span>
  );
};