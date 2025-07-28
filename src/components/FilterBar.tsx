import React from 'react';
import { Search, Filter, Users, Tag } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  statusFilter: string;
  priorityFilter: string;
  technicianFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onTechnicianChange: (value: string) => void;
  clearFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  statusFilter,
  priorityFilter,
  technicianFilter,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onTechnicianChange,
  clearFilters
}) => {
  const hasActiveFilters = statusFilter || priorityFilter || technicianFilter || searchTerm;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por título, solicitante ou descrição..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 lg:w-auto">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[140px]"
            >
              <option value="">Todos os Status</option>
              <option value="aberto">Aberto</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="resolvido">Resolvido</option>
              <option value="fechado">Fechado</option>
            </select>
          </div>

          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={priorityFilter}
              onChange={(e) => onPriorityChange(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[140px]"
            >
              <option value="">Todas Prioridades</option>
              <option value="baixa">Baixa</option>
              <option value="normal">Normal</option>
              <option value="alta">Alta</option>
              <option value="urgente">Urgente</option>
            </select>
          </div>

          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={technicianFilter}
              onChange={(e) => onTechnicianChange(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[140px]"
            >
              <option value="">Todos Técnicos</option>
              <option value="João Santos">João Santos</option>
              <option value="Maria Costa">Maria Costa</option>
              <option value="Pedro Oliveira">Pedro Oliveira</option>
              <option value="Ana Garcia">Ana Garcia</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium text-sm"
            >
              Limpar Filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
};