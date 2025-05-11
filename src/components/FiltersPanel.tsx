
import React, { useRef } from 'react';
import { Search, Download } from 'lucide-react';
import { DataSource, Acheteur, FilterState } from '../types/procurement';
import { getExportParamsString } from '../utils/helpers';

interface FiltersPanelProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string | number | boolean) => void;
  onClearFilters: () => void;
  sources: DataSource[];
  acheteurs: Acheteur[];
  perPageOptions: string[];
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  sources,
  acheteurs,
  perPageOptions,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
      <form onSubmit={handleSearchSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2">
            <div className="flex bg-muted rounded-md overflow-hidden items-center border border-border focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
              <div className="flex items-center justify-center pl-3">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                name="q"
                value={filters.q}
                placeholder="Recherche libre"
                className="flex-1 bg-transparent py-2 px-3 focus:outline-none text-foreground"
                aria-label="Recherche libre"
                onChange={(e) => onFilterChange('q', e.target.value)}
                ref={searchInputRef}
              />
              {filters.q && (
                <button
                  type="button"
                  className="px-3 text-muted-foreground hover:text-foreground"
                  onClick={() => onFilterChange('q', '')}
                  aria-label="Effacer la recherche"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className="results-toggle grid grid-cols-2 overflow-hidden rounded-md col-span-1 md:col-span-2">
            <button
              type="button"
              className={`py-2 px-4 text-sm font-medium transition-colors ${!filters.showResultsOnly
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted"
                }`}
              onClick={() => onFilterChange('showResultsOnly', false)}
            >
              Toutes les offres
            </button>
            <button
              type="button"
              className={`py-2 px-4 text-sm font-medium transition-colors ${filters.showResultsOnly
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted"
                }`}
              onClick={() => onFilterChange('showResultsOnly', true)}
            >
              Afficher Résultats
            </button>
          </div>

          <div>
            <select
              className="w-full bg-muted border border-border rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-foreground"
              value={filters.dataSourceId}
              onChange={(e) => onFilterChange('dataSourceId', e.target.value)}
              aria-label="Filtrer par source"
            >
              <option value="">— Toutes Sources —</option>
              {sources.map((ds) => (
                <option key={ds.id} value={ds.id}>
                  {ds.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              name="acheteur"
              className="w-full bg-muted border border-border rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-foreground"
              aria-label="Filtrer par acheteur"
              value={filters.acheteurId}
              onChange={(e) => onFilterChange('acheteurId', e.target.value)}
            >
              <option value="">— Acheteur —</option>
              {acheteurs.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              name="per_page"
              className="w-full bg-muted border border-border rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-foreground"
              aria-label="Articles par page"
              value={filters.perPage}
              onChange={(e) => onFilterChange('perPage', parseInt(e.target.value, 10))}
            >
              {perPageOptions.map((n) => (
                <option key={n} value={parseInt(n, 10)}>
                  {n} / page
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <button
              type="button"
              className="bg-blue-900 hover:bg-blue-800 text-white px-3 py-2 rounded text-sm font-medium disabled:opacity-50"
              onClick={onClearFilters}
              disabled={!filters.q && !filters.dataSourceId && !filters.acheteurId}
            >
              Réinitialiser
            </button>

            <div className="flex items-center space-x-2">
              <a
                href={`/export.csv?${getExportParamsString({
                  q: filters.q,
                  dataSourceId: filters.dataSourceId,
                  acheteurId: filters.acheteurId,
                })}`}
                className="bg-muted hover:bg-muted text-muted-foreground px-3 py-2 rounded text-sm font-medium flex items-center space-x-1"
              >
                <Download className="h-4 w-4" />
                <span>CSV</span>
              </a>
              <a
                href={`/export.json?${getExportParamsString({
                  q: filters.q,
                  dataSourceId: filters.dataSourceId,
                  acheteurId: filters.acheteurId,
                })}`}
                className="bg-muted hover:bg-muted text-muted-foreground px-3 py-2 rounded text-sm font-medium flex items-center space-x-1"
              >
                <Download className="h-4 w-4" />
                <span>JSON</span>
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FiltersPanel;
