import { useState, useEffect } from 'react';
import { ENDPOINTS } from '@/config/api.config';
import { getNetworkErrorMessage, parseApiResponse } from '@/utils/apiMessages';
import type { Company, CompanyResponse } from '@/types/api';

export const useCompany = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(ENDPOINTS.COMPANY.GET);
      const { ok, data, errorMessage } = await parseApiResponse(response);

      if (!ok) {
        setError(errorMessage || 'Erreur lors de la récupération des informations de l\'entreprise');
        return;
      }

      const res = data as CompanyResponse;
      setCompany(res.company ?? null);
    } catch (err) {
      console.error('Erreur:', err);
      setError(err instanceof Error ? err.message : getNetworkErrorMessage());
    } finally {
      setLoading(false);
    }
  };

  return { company, loading, error, refetch: fetchCompany };
};
