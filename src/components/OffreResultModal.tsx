
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Offre } from '../types/procurement';
import { formatReference } from '../utils/helpers';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  offre: Offre | null;
}

const OffreResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, offre }) => {
  if (!isOpen || !offre) return null;

  return (<motion.div
    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    onClick={onClose}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >      <motion.div
    className="bg-card border border-border/50 rounded-lg shadow-xl w-full max-w-md backdrop-blur-sm hover:border-accent/50 transition-all duration-300"
    onClick={(e) => e.stopPropagation()}
    initial={{ y: -30, opacity: 0, scale: 0.95 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    exit={{ y: -30, opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
  >
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="text-xl font-semibold">Résultats de l'offre</h2>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground rounded-full p-1"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Référence</p>
          <p className="font-medium">{formatReference(offre.reference)}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Objet</p>
          <p className="text-sm">{offre.objet}</p>
        </div>

        <div className="border-t border-border pt-4">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">Concurrent Retenu</p>
            <p className="font-medium">{offre.concurrentRetenu || 'Non spécifié'}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Montant TTC</p>
            <p className="font-bold text-lg">{offre.montantTtc || 'Non spécifié'}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4 flex justify-end">
        <button
          onClick={onClose}
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded font-medium"
        >
          Fermer
        </button>
      </div>
    </motion.div>
  </motion.div>
  );
};

export default OffreResultModal;
