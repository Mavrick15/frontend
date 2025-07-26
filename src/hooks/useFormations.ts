import { useState, useEffect, useCallback, useRef } from 'react';
import { ENDPOINTS } from '@/config/api.config';

export interface Formation {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  duration: string;
  instructor: string;
  price: string;
  seats: number;
  level: string;
  image?: string;
}

interface PaginationData {
  total: number;
  limit: number;
  offset: number;
  pages: number;
}

interface FormationsResponse {
  formations: Formation[];
  pagination: PaginationData;
}

interface UseFormationsProps {
  limit?: number;
  initialOffset?: number;
  searchTerm?: string;
  levelFilter?: string;
  locationFilter?: string;
}

const useFormations = ({
  limit = 10,
  initialOffset = 0,
  searchTerm = '',
  levelFilter = '',
  locationFilter = '',
}: UseFormationsProps = {}) => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    limit,
    offset: initialOffset,
    pages: 0,
  });
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const fetchFormations = useCallback(async (offset: number) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.append('limit', limit.toString());
      params.append('offset', offset.toString());

      if (debouncedSearchTerm) params.append('search', debouncedSearchTerm);
      if (levelFilter) params.append('level', levelFilter);
      if (locationFilter) params.append('location', locationFilter);

      const response = await fetch(`${ENDPOINTS.FORMATIONS}?${params.toString()}`, { signal });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ message: 'Erreur inconnue' }));
        const errorMessage = errorBody.message || `Erreur du serveur (${response.status})`;
        console.error(`Erreur HTTP ${response.status}:`, errorBody);
        throw new Error(errorMessage);
      }

      const data: FormationsResponse = await response.json();

      setFormations(data.formations);
      setPagination(data.pagination);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return;
      }
      console.error('Erreur lors du chargement des formations:', err);

      if (err instanceof SyntaxError) {
        setError('Impossible de lire la réponse du serveur. Format de données inattendu.');
      } else if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        setError('Erreur réseau: Impossible de se connecter au serveur API.');
      } else {
        setError(err.message || 'Une erreur est survenue lors du chargement des formations.');
      }
      setFormations([]);
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [limit, debouncedSearchTerm, levelFilter, locationFilter]);

  const goToPage = useCallback((page: number) => {
    const newOffset = (page - 1) * pagination.limit;
    if (newOffset !== pagination.offset) {
      fetchFormations(newOffset);
    }
  }, [pagination.limit, pagination.offset, fetchFormations]);

  useEffect(() => {
    fetchFormations(initialOffset);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchFormations, initialOffset]);

  return {
    formations,
    loading,
    error,
    pagination,
    goToPage,
    refetch: () => fetchFormations(pagination.offset),
  };
};

export default useFormations;
