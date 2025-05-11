
import React from 'react';
import { FileX } from 'lucide-react';

interface EmptyStateProps {
  message: string;
  showResultsOnly: boolean;
  onClearFilters: () => void;
  hasFilters: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  showResultsOnly,
  onClearFilters,
  hasFilters
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted p-5 rounded-full mb-4">
        <FileX className="h-10 w-10 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground mb-4">
        {showResultsOnly
          ? "Aucune offre avec résultats (concurrent et montant) trouvée pour les filtres actuels."
          : "Aucune offre trouvée avec les critères actuels."
        }
      </p>
      {hasFilters && (
        <button
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded text-sm font-medium"
          onClick={onClearFilters}
        >
          Effacer tous les filtres
        </button>
      )}
    </div>
  );
};

export default EmptyState;
