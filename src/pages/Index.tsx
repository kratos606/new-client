
import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import OffresList from './OffresList';

const Index = () => {
  return (
    <ThemeProvider>
      <OffresList />
    </ThemeProvider>
  );
};

export default Index;
