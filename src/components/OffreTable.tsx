
import React from 'react';
import { Calendar, User, Database, ExternalLink, FileText } from 'lucide-react';
import { Offre } from '../types/procurement';
import { formatReference, formatDate, getDataSourceBadgeClass } from '../utils/helpers';

interface OffreTableProps {
  offres: Offre[];
  onShowResults: (offre: Offre) => void;
}

const OffreTable: React.FC<OffreTableProps> = ({ offres, onShowResults }) => {
  return (
    <div className="w-full overflow-x-auto">      <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-border">
          <th className="p-4 text-left font-semibold text-sm w-16">Image</th>
          <th className="p-4 text-left font-semibold text-sm w-40">Référence</th>
          <th className="p-4 text-left font-semibold text-sm">Détails de l'offre</th>
          <th className="p-3 text-left font-semibold text-sm w-40">Échéance</th>
          <th className="p-3 text-left font-semibold text-sm w-40">Actions</th>
        </tr>
      </thead>
      <tbody>
        {offres.map((offre) => (<tr key={offre.id} className="border-b border-border hover:bg-primary/5 transition-colors duration-200">
          <td className="p-4">
            {offre.image ? (
              <div className="h-12 w-12 rounded overflow-hidden">
                <img
                  src={`https://procurement.edoffice.online/media/${offre.image}`}
                  alt={`Vignette ${offre.reference}`}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </td>
          <td className="p-3">
            <div className="font-medium text-sm truncate max-w-[10rem]" title={offre.reference}>
              {formatReference(offre.reference)}
            </div>
          </td>
          <td className="p-3">
            <div className="space-y-2">
              {offre.acheteur?.name && (
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="truncate">{offre.acheteur.name}</span>
                </div>
              )}
              <div className="text-sm line-clamp-2" title={offre.objet}>
                {offre.objet}
              </div>
              <div>
                <span className={getDataSourceBadgeClass(offre.dataSource?.title)}>
                  <Database className="h-3 w-3" />
                  <span>{offre.dataSource?.title || 'N/A'}</span>
                </span>
              </div>
            </div>
          </td>
          <td className="p-3">
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{formatDate(offre.dateRemisDesPlis)}</span>
            </div>
          </td>
          <td className="p-3">
            {offre.concurrentRetenu && offre.montantTtc ? (
              <button
                onClick={() => onShowResults(offre)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-3 rounded text-sm transition-colors flex items-center space-x-2"
              >
                <FileText className="h-4 w-4" />
                <span>Résultats</span>
              </button>
            ) : offre.offreUrl ? (
              <a
                href={offre.offreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium py-2 px-3 rounded text-sm transition-colors flex items-center space-x-2"
              >
                <span>Voir l'offre</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </td>
        </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default OffreTable;
