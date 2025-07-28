import React from 'react';
import { Grid, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'table' | 'cards';
  onViewChange: (view: 'table' | 'cards') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex rounded-lg border border-gray-300 bg-white">
      <button
        onClick={() => onViewChange('table')}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-l-lg transition-colors ${
          view === 'table'
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        <List className="w-4 h-4" />
        Tabela
      </button>
      <button
        onClick={() => onViewChange('cards')}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-r-lg transition-colors ${
          view === 'cards'
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        <Grid className="w-4 h-4" />
        Cards
      </button>
    </div>
  );
};