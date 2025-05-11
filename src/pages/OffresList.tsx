
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { request } from 'graphql-request';
import debounce from 'lodash.debounce';
import { motion, AnimatePresence } from 'framer-motion';

// Contexts and types
import { useTheme } from '../contexts/ThemeContext';
import { Offre, Acheteur, DataSource, OffresQueryVariables, FilterState } from '../types/procurement';
import { FETCH_OFFRES_QUERY, FETCH_ACHETEURS_QUERY, GET_DATASOURCES, GRAPHQL_ENDPOINT } from '../lib/graphql';

// Utils
import { getInitialStateFromURL, updateURLParams } from '../utils/helpers';

// Components
import Header from '../components/Header';
import FiltersPanel from '../components/FiltersPanel';
import OffreCard from '../components/OffreCard';
import OffreTable from '../components/OffreTable';
import OffreResultModal from '../components/OffreResultModal';
import Pagination from '../components/Pagination';
import DataSourceCarousel from '../components/DataSourceCarousel';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import StatsBanner from '@/components/StatsBanner';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';

const OffresList: React.FC = () => {
  const { theme } = useTheme();
  const initialState = getInitialStateFromURL();

  // State for data
  const [offres, setOffres] = useState<Offre[]>([]);
  const [sources, setSources] = useState<DataSource[]>([]);
  const [allAcheteurs, setAllAcheteurs] = useState<Acheteur[]>([]);

  // State for filters
  const [filters, setFilters] = useState<FilterState>({
    q: initialState.q,
    dataSourceId: initialState.dataSourceId,
    acheteurId: initialState.acheteurId,
    page: initialState.page,
    perPage: initialState.perPage,
    showResultsOnly: initialState.showResultsOnly,
  });

  // State for UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isFiltersVisible, setFiltersVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'table'>(() =>
    window.innerWidth < 768 ? 'card' : 'table'
  );
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [selectedOffreForModal, setSelectedOffreForModal] = useState<Offre | null>(null);

  const perPageOptions = ['10', '20', '50', '100'];

  // Load acheteurs data
  useEffect(() => {
    request(GRAPHQL_ENDPOINT, FETCH_ACHETEURS_QUERY)
      .then((data: any) => {
        setAllAcheteurs(data.allAcheteurs || []);
      })
      .catch((err) => {
        console.error("Error fetching acheteurs:", err);
      });
  }, []);

  // Load data sources
  useEffect(() => {
    request(GRAPHQL_ENDPOINT, GET_DATASOURCES)
      .then((data: any) => setSources(data.allDataSources))
      .catch(console.error);
  }, []);

  // Handle responsive view mode
  useEffect(() => {
    const handleResize = () => {
      setViewMode(window.innerWidth < 768 ? 'card' : 'table');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load offres data with debounce
  const loadOffres = useCallback(
    debounce((vars: OffresQueryVariables) => {
      setLoading(true);
      setError(null);
      request(GRAPHQL_ENDPOINT, FETCH_OFFRES_QUERY, vars)
        .then((data: any) => {
          const results = data.allOffres;
          setOffres(results.items || []);
          setTotalCount(results.totalCount || 0);
          setTotalPages(results.totalPages > 0 ? results.totalPages : 1);

          // Update page if needed
          if (results.totalPages > 0 && vars.page > results.totalPages) {
            setFilters(prev => ({ ...prev, page: results.totalPages }));
          } else if (vars.page < 1) {
            setFilters(prev => ({ ...prev, page: 1 }));
          }
        })
        .catch((err) => {
          console.error("Error fetching offres:", err);
          setError(err);
          setOffres([]);
          setTotalCount(0);
          setTotalPages(1);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300),
    []
  );

  // Filter offres based on results toggle
  const offresToDisplay = useMemo(() => {
    if (!filters.showResultsOnly) {
      return offres;
    }
    return offres.filter(
      (offre) => offre.concurrentRetenu && offre.montantTtc
    );
  }, [offres, filters.showResultsOnly]);

  // Load offres when filters change
  useEffect(() => {
    const vars: OffresQueryVariables = {
      q: filters.q || null,
      dataSourceId: filters.dataSourceId || null,
      acheteurId: filters.acheteurId || null,
      page: filters.page,
      perPage: filters.perPage,
    };
    loadOffres(vars);
  }, [filters, loadOffres]);

  // Update URL params when filters change
  useEffect(() => {
    updateURLParams(filters);
  }, [filters]);

  // Handlers
  const handleFilterChange = (key: keyof FilterState, value: string | number | boolean) => {
    setFilters(prev => {
      // Reset to page 1 when any filter except page changes
      if (key !== 'page') {
        return { ...prev, [key]: value, page: 1 };
      }

      // Make sure the page value is always a number
      if (key === 'page') {
        return { ...prev, page: typeof value === 'number' ? value : parseInt(value as string, 10) };
      }

      return { ...prev, [key]: value };
    });
  };

  const handlePageChange = (newPage: number) => {
    const validPage = Math.min(Math.max(1, newPage), totalPages);
    handleFilterChange('page', validPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowResultsModal = (offre: Offre) => {
    setSelectedOffreForModal(offre);
    setIsResultModalOpen(true);
  };

  const toggleFilters = () => {
    setFiltersVisible(!isFiltersVisible);
  };

  const clearFilters = () => {
    setFilters(prev => ({
      ...prev,
      q: '',
      dataSourceId: '',
      acheteurId: '',
      page: 1
    }));
  };

  const retryFetchOffres = () => {
    const vars: OffresQueryVariables = {
      q: filters.q || null,
      dataSourceId: filters.dataSourceId || null,
      acheteurId: filters.acheteurId || null,
      page: filters.page,
      perPage: filters.perPage,
    };
    loadOffres(vars);
  };

  const hasFilters = !!(filters.q || filters.dataSourceId || filters.acheteurId);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }} id="offers">
        <Header
          totalCount={totalCount}
          loading={loading}
          toggleFilters={toggleFilters}
          isFiltersVisible={isFiltersVisible}
        />

        <AnimatePresence>
          {(isFiltersVisible || window.innerWidth >= 768) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <FiltersPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                sources={sources}
                acheteurs={allAcheteurs}
                perPageOptions={perPageOptions}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error.message} onRetry={retryFetchOffres} />
          ) : offresToDisplay.length === 0 ? (
            <EmptyState
              message="Aucune offre trouvée"
              showResultsOnly={filters.showResultsOnly}
              onClearFilters={clearFilters}
              hasFilters={hasFilters}
            />
          ) : viewMode === 'card' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              <AnimatePresence>
                {offresToDisplay.map(offre => (
                  <OffreCard
                    key={offre.id}
                    offre={offre}
                    onShowResults={handleShowResultsModal}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="p-4">
              <OffreTable
                offres={offresToDisplay}
                onShowResults={handleShowResultsModal}
              />
            </div>
          )}

          {!loading && !error && totalCount > 0 && totalPages > 1 && (
            <div className="border-t border-border p-4">
              <Pagination
                currentPage={filters.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemCount={offresToDisplay.length}
                totalCount={totalCount}
                showResultsOnly={filters.showResultsOnly}
              />
            </div>
          )}
        </div>

      </div>
      <StatsBanner />

      <AnimatePresence>
        {isResultModalOpen && (
          <OffreResultModal
            isOpen={isResultModalOpen}
            onClose={() => setIsResultModalOpen(false)}
            offre={selectedOffreForModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OffresList;
