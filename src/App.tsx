import React, { useState, useMemo } from 'react';
import { Ticket } from './types/ticket';
import { StatsCards } from './components/StatsCards';
import { FilterBar } from './components/FilterBar';
import { ViewToggle } from './components/ViewToggle';
import { TicketTable } from './components/TicketTable';
import { TicketCard } from './components/TicketCard';
import { Pagination } from './components/Pagination';
import { Settings, RefreshCw } from 'lucide-react';

function App() {
const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [technicianFilter, setTechnicianFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [view, setView] = useState<'table' | 'cards'>('table');
  const [sortField, setSortField] = useState<keyof Ticket | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = searchTerm === '' || 
        ticket.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.solicitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.descricao.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === '' || ticket.status === statusFilter;
      const matchesPriority = priorityFilter === '' || ticket.prioridade === priorityFilter;
      const matchesTechnician = technicianFilter === '' || ticket.tecnico === technicianFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesTechnician;
    });
  }, [tickets, searchTerm, statusFilter, priorityFilter, technicianFilter]);

  const sortedTickets = useMemo(() => {
    if (!sortField) return filteredTickets;

    return [...filteredTickets].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'dataVencimento' || sortField === 'dataAbertura') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredTickets, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedTickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTickets = sortedTickets.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: keyof Ticket) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setPriorityFilter('');
    setTechnicianFilter('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, priorityFilter, technicianFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sistema de Chamados GLPI</h1>
              <p className="mt-2 text-gray-600">Gerencie e acompanhe todos os chamados de TI</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-4 h-4" />
                Atualizar
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Settings className="w-4 h-4" />
                Configurações
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards tickets={filteredTickets} />

        {/* Filters */}
        <FilterBar
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          technicianFilter={technicianFilter}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
          onTechnicianChange={setTechnicianFilter}
          clearFilters={clearFilters}
        />

        {/* View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            {sortedTickets.length} chamado{sortedTickets.length !== 1 ? 's' : ''} encontrado{sortedTickets.length !== 1 ? 's' : ''}
          </div>
          <ViewToggle view={view} onViewChange={setView} />
        </div>

        {/* Content */}
        {paginatedTickets.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 text-lg mb-2">Nenhum chamado encontrado</div>
            <p className="text-gray-500">Tente ajustar os filtros para encontrar chamados.</p>
          </div>
        ) : (
          <>
            {view === 'table' ? (
              <TicketTable
                tickets={paginatedTickets}
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                totalItems={sortedTickets.length}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;