
import React from 'react';
import { Moon, Sun, Filter } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  totalCount: number;
  loading: boolean;
  toggleFilters: () => void;
  isFiltersVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({
  totalCount,
  loading,
  toggleFilters,
  isFiltersVisible
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="flex items-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          Offers List
          {!loading && totalCount > 0 && (
            <span className="ml-3 bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 align-middle">
              {totalCount}
            </span>
          )}
        </h1>
      </div>
    </div>
  );
};

export default Header;
