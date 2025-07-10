import { useState, useEffect } from 'react';

export interface User {
  name?: string;
  email: string;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    localStorage.setItem('user', JSON.stringify({
      ...userData,
      isAuthenticated: true
    }));
    setUser({
      ...userData,
      isAuthenticated: true
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAuthenticated = !!user?.isAuthenticated;

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout
  };
}

export default useAuth;
