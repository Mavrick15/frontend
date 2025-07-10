import { useState } from 'react';
import { API_URL } from '@/config/api.config';
import { toast } from 'sonner';

interface ApiOptions {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  withCredentials?: boolean;
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

  const fetchData = async (): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const url = `${API_URL}${options.endpoint}`;
      
      const response = await fetch(url, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: options.withCredentials ? 'include' : 'same-origin',
        ...(options.body ? { body: JSON.stringify(options.body) } : {}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error(`Error: ${error.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export const useMutation = <T = any>(options: ApiOptions): ApiResponse<T> & { mutate: (body?: any) => Promise<T | null> } => {
  const api = useApi<T>({ ...options, method: options.method || 'POST' });
  
  const mutate = async (body?: any): Promise<T | null> => {
    const mutationOptions = { ...options };
    if (body) {
      mutationOptions.body = body;
    }
    
    const apiWithNewOptions = useApi<T>(mutationOptions);
    return apiWithNewOptions.fetchData();
  };
  
  return { ...api, mutate };
};
