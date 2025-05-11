
import React from 'react';

const LoadingState: React.FC = () => {
  return (<div className="flex flex-col items-center justify-center py-16">
    <div className="relative">
      <div className="h-12 w-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
    </div>
    <div className="text-muted-foreground mt-6 font-medium">Chargement des offres...</div>
  </div>
  );
};

export default LoadingState;
