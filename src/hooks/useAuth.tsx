import { useState, useEffect, useCallback } from 'react';
import { ENDPOINTS } from '@/config/api.config';
import { toast } from 'sonner';
import type { User, AuthResponse, RefreshTokenResponse } from '@/types/api';

// User type is now imported from @/types/api

interface AuthResponse {
  success: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
    role?: string;
  };
  token: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user exists in localStorage
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          ...parsedUser,
          isAuthenticated: true
        });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((userData: User, token: string, refreshToken?: string) => {
    try {
      const userToStore = {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        isAuthenticated: true
      };
      
      localStorage.setItem('user', JSON.stringify(userToStore));
      localStorage.setItem('token', token);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      
      setUser(userToStore);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données utilisateur:', error);
      toast.error('Erreur lors de la connexion');
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const token = localStorage.getItem('token');
      
      // Appeler l'API de déconnexion si on a un token
      if (token && refreshToken) {
        try {
          await fetch(ENDPOINTS.AUTH.LOGOUT, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
          });
        } catch (error) {
          console.error('Erreur lors de la déconnexion côté serveur:', error);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      setUser(null);
    }
  }, []);

  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      const storedRefreshToken = localStorage.getItem('refreshToken');
      if (!storedRefreshToken) {
        return false;
      }

      const response = await fetch(ENDPOINTS.AUTH.REFRESH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: storedRefreshToken }),
      });

      if (!response.ok) {
        return false;
      }

      const data: RefreshTokenResponse = await response.json();
      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      return false;
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        // Essayer de rafraîchir le token
        const refreshed = await refreshToken();
        if (!refreshed) {
          logout();
          return;
        }
        token = localStorage.getItem('token');
      }

      const response = await fetch(ENDPOINTS.AUTH.PROFILE, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Essayer de rafraîchir le token une dernière fois
          const refreshed = await refreshToken();
          if (!refreshed) {
            logout();
            toast.error('Session expirée. Veuillez vous reconnecter.');
          }
        }
        return;
      }

      const data: AuthResponse = await response.json();
      if (data.success && data.user) {
        const userToStore = {
          _id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          isAuthenticated: true
        };
        localStorage.setItem('user', JSON.stringify(userToStore));
        setUser(userToStore);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
    }
  }, [logout, refreshToken]);

  const isAuthenticated = !!user?.isAuthenticated;

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refreshUser,
    refreshToken
  };
}

export default useAuth;
