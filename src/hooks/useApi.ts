import { useState, useCallback } from 'react';
import { API_URL } from '@/config/api.config';
import { toast } from 'sonner';
import type { ApiResponse as ApiResponseType, ApiError } from '@/types/api';

interface ApiOptions {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  skipToast?: boolean;
}

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  fetchData: () => Promise<T | null>;
}

export const useApi = <T = any>(options: ApiOptions): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const url = `${API_URL}${options.endpoint}`;
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      // Add authorization token if available
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(url, {
        method: options.method || 'GET',
        headers,
        credentials: options.withCredentials ? 'include' : 'same-origin',
        ...(options.body ? { body: JSON.stringify(options.body) } : {}),
      });

      if (!response.ok) {
        // Si 401, essayer de rafraîchir le token
        if (response.status === 401) {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            try {
              const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
              });

              if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json();
                localStorage.setItem('token', refreshData.token);
                if (refreshData.refreshToken) {
                  localStorage.setItem('refreshToken', refreshData.refreshToken);
                }
                
                // Réessayer la requête originale avec le nouveau token
                const retryResponse = await fetch(url, {
                  method: options.method || 'GET',
                  headers: {
                    ...headers,
                    'Authorization': `Bearer ${refreshData.token}`,
                  },
                  credentials: options.withCredentials ? 'include' : 'same-origin',
                  ...(options.body ? { body: JSON.stringify(options.body) } : {}),
                });

                if (retryResponse.ok) {
                  const result = await retryResponse.json();
                  setData(result);
                  return result;
                }
              }
            } catch (refreshError) {
              // Si le refresh échoue, continuer avec l'erreur originale
            }
          }
        }

        let errorMessage = 'Une erreur est survenue';
        try {
          const errorData: ApiError = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = `Erreur HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const result: T = await response.json();
      setData(result);
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error);
      if (!options.skipToast) {
        toast.error(`Erreur: ${error.message}`);
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [options.endpoint, options.method, options.body, options.headers, options.withCredentials, options.skipToast]);

  return { data, loading, error, fetchData };
};

export const useMutation = <T = unknown>(options: ApiOptions): ApiResponse<T> & { mutate: (body?: unknown) => Promise<T | null> } => {
  const [mutationOptions, setMutationOptions] = useState<ApiOptions>({ ...options, method: options.method || 'POST' });
  const api = useApi<T>(mutationOptions);
  
  const mutate = useCallback(async (body?: unknown): Promise<T | null> => {
    const newOptions = { ...mutationOptions };
    if (body) {
      newOptions.body = body;
    }
    setMutationOptions(newOptions);
    // Use the fetchData from the current api instance
    return api.fetchData();
  }, [mutationOptions, api]);
  
  return { ...api, mutate };
};
