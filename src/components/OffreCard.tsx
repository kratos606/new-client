
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ExternalLink, FileText } from 'lucide-react';
import { Offre } from '../types/procurement';
import { formatReference, formatDate, getDataSourceBadgeClass } from '../utils/helpers';

interface OffreCardProps {
  offre: Offre;
  onShowResults: (offre: Offre) => void;
}

const OffreCard: React.FC<OffreCardProps> = ({ offre, onShowResults }) => {
  return (<motion.div
    className="bg-card shadow-lg rounded-lg overflow-hidden border border-border/50 backdrop-blur-sm hover:border-accent/50 hover:shadow-xl transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <div className="p-4 border-b border-border">
      <div className="flex items-center space-x-3">
        {offre.image ? (
          <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
            <img
              src={`https://procurement.edoffice.online/media/${offre.image}`}
              alt={`Vignette ${offre.reference}`}
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <div className="h-12 w-12 rounded bg-muted flex items-center justify-center flex-shrink-0">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate" title={offre.reference}>
            {formatReference(offre.reference)}
          </div>
          <div className="mt-1">
            <span className={getDataSourceBadgeClass(offre.dataSource?.title)}>
              {offre.dataSource?.title || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="p-4">
      <div className="space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <User className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">{offre.acheteur?.name || 'Acheteur inconnu'}</span>
        </div>

        <div className="text-sm line-clamp-2" title={offre.objet}>
          {offre.objet}
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>Échéance: {formatDate(offre.dateRemisDesPlis)}</span>
        </div>
      </div>
    </div>

    {(offre.concurrentRetenu && offre.montantTtc) || offre.offreUrl ? (
      <div className="p-4 bg-muted border-t border-border">
        {offre.concurrentRetenu && offre.montantTtc ? (
          <button onClick={() => onShowResults(offre)}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg hover:-translate-y-0.5"
          >
            <FileText className="h-4 w-4" />
            <span>Afficher les résultats</span>
          </button>
        ) : offre.offreUrl ? (
          <a
            href={offre.offreUrl}
            target="_blank"
            rel="noopener noreferrer" className="w-full bg-accent hover:bg-accent/90 text-primary font-medium py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>Voir l'offre</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : null}
      </div>
    ) : null}
  </motion.div>
  );
};

export default OffreCard;
