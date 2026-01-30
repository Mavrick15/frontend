/**
 * Tests unitaires pour le hook useAuth
 * 
 * Pour exécuter les tests:
 * npm install --save-dev @testing-library/react @testing-library/react-hooks vitest
 * npm test
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock fetch
global.fetch = vi.fn();

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('devrait initialiser avec un utilisateur null si aucun utilisateur n\'est stocké', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('devrait charger un utilisateur depuis localStorage', () => {
    const userData = {
      _id: '123',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
      isAuthenticated: true,
    };

    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', 'test-token');

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toEqual(userData);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('devrait connecter un utilisateur et le sauvegarder dans localStorage', () => {
    const { result } = renderHook(() => useAuth());

    const userData = {
      _id: '123',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
      isAuthenticated: true,
    };

    act(() => {
      result.current.login(userData, 'test-token', 'refresh-token');
    });

    expect(result.current.user).toEqual(userData);
    expect(result.current.isAuthenticated).toBe(true);
    expect(localStorage.getItem('token')).toBe('test-token');
    expect(localStorage.getItem('refreshToken')).toBe('refresh-token');
  });

  it('devrait déconnecter un utilisateur et nettoyer localStorage', () => {
    const { result } = renderHook(() => useAuth());

    // Connecter d'abord
    const userData = {
      _id: '123',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
      isAuthenticated: true,
    };

    act(() => {
      result.current.login(userData, 'test-token', 'refresh-token');
    });

    // Déconnecter
    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
  });
});
