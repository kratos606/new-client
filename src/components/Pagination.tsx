
import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemCount: number;
  totalCount: number;
  showResultsOnly: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemCount,
  totalCount,
  showResultsOnly,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
      <div className="flex items-center space-x-1">
        <button
          className="p-2 rounded-md hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={() => onPageChange(1)}
          disabled={currentPage <= 1}
          aria-label="Première page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button
          className="p-2 rounded-md hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Page précédente"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="px-4 py-2 bg-muted rounded-md flex items-center space-x-1">
          <span className="font-medium">{currentPage}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">{totalPages}</span>
        </div>

        <button
          className="p-2 rounded-md hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Page suivante"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          className="p-2 rounded-md hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          aria-label="Dernière page"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>

      <div className="text-sm text-muted-foreground">
        {showResultsOnly
          ? `Affichage de ${itemCount} résultats sur cette page.`
          : `Affichage de ${itemCount} sur ${totalCount} offres.`
        }
      </div>
    </div>
  );
};

export default Pagination;
