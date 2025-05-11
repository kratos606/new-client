
import { DataSource } from "../types/procurement";

export const formatReference = (reference: string | undefined): string => {
  if (!reference) return '';
  if (reference.includes(';')) {
    const parts = reference.split(';');
    return parts.length > 1 ? `${parts[0].trim()}...` : parts[0].trim();
  }
  return reference.length > 30 ? reference.substring(0, 27) + '...' : reference;
};

export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getDataSourceBadgeClass = (sourceTitle: string | undefined): string => {
  if (!sourceTitle) return 'procurement-badge-secondary';
  
  switch (sourceTitle.toLowerCase()) {
    case 'marchespublics': return 'procurement-badge-primary';
    case 'tanmia': return 'procurement-badge-success';
    case 'undp': return 'procurement-badge-info';
    case 'afdb': return 'procurement-badge-warning';
    case 'afdb_consultants': return 'procurement-badge-danger';
    default: return 'procurement-badge-secondary';
  }
};

export const getInitialStateFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    q: params.get('q') || '',
    dataSourceId: params.get('dataSource') || '',
    acheteurId: params.get('acheteurId') || '',
    page: parseInt(params.get('page') || '1', 10),
    perPage: parseInt(params.get('perPage') || '20', 10),
    showResultsOnly: params.get('showResults') === 'true',
  };
};

export const updateURLParams = (filters: {
  q: string;
  dataSourceId: string;
  acheteurId: string;
  page: number;
  perPage: number;
  showResultsOnly: boolean;
}) => {
  const params = new URLSearchParams();
  if (filters.q) params.set('q', filters.q);
  if (filters.dataSourceId) params.set('dataSource', filters.dataSourceId);
  if (filters.acheteurId) params.set('acheteurId', filters.acheteurId);
  if (filters.page !== 1) params.set('page', filters.page.toString());
  if (filters.perPage !== 20) params.set('perPage', filters.perPage.toString());
  if (filters.showResultsOnly) params.set('showResults', 'true');

  const queryString = params.toString();
  const newUrl = queryString
    ? `${window.location.pathname}?${queryString}`
    : window.location.pathname;
  
  window.history.replaceState(null, '', newUrl);
};

export const getExportParamsString = (filters: {
  q: string;
  dataSourceId: string;
  acheteurId: string;
}) => {
  const params = new URLSearchParams();
  if (filters.q) params.append('q', filters.q);
  if (filters.dataSourceId) params.append('data_source', filters.dataSourceId);
  if (filters.acheteurId) params.append('acheteur', filters.acheteurId);
  return params.toString();
};
