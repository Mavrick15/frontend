/**
 * Utilitaires de validation côté client
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Valide une adresse email
 */
export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!email) {
    errors.push('L\'email est requis');
  } else if (!emailRegex.test(email)) {
    errors.push('L\'email n\'est pas valide');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Valide un mot de passe
 */
export const validatePassword = (password: string, minLength: number = 8): ValidationResult => {
  const errors: string[] = [];

  if (!password) {
    errors.push('Le mot de passe est requis');
  } else {
    if (password.length < minLength) {
      errors.push(`Le mot de passe doit contenir au moins ${minLength} caractères`);
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une majuscule');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une minuscule');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un chiffre');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un caractère spécial');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Valide un nom
 */
export const validateName = (name: string, minLength: number = 2, maxLength: number = 50): ValidationResult => {
  const errors: string[] = [];

  if (!name) {
    errors.push('Le nom est requis');
  } else {
    if (name.length < minLength) {
      errors.push(`Le nom doit contenir au moins ${minLength} caractères`);
    }
    if (name.length > maxLength) {
      errors.push(`Le nom ne peut pas dépasser ${maxLength} caractères`);
    }
    if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(name)) {
      errors.push('Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Valide un numéro de téléphone (format français)
 */
export const validatePhone = (phone: string): ValidationResult => {
  const errors: string[] = [];
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

  if (!phone) {
    errors.push('Le numéro de téléphone est requis');
  } else if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    errors.push('Le numéro de téléphone n\'est pas valide');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Valide une URL
 */
export const validateURL = (url: string): ValidationResult => {
  const errors: string[] = [];

  if (!url) {
    errors.push('L\'URL est requise');
  } else {
    try {
      new URL(url);
    } catch {
      errors.push('L\'URL n\'est pas valide');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Valide un code postal français
 */
export const validatePostalCode = (code: string): ValidationResult => {
  const errors: string[] = [];
  const postalCodeRegex = /^(0[1-9]|[1-9][0-9])[0-9]{3}$/;

  if (!code) {
    errors.push('Le code postal est requis');
  } else if (!postalCodeRegex.test(code)) {
    errors.push('Le code postal n\'est pas valide (format: 5 chiffres)');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Valide que deux valeurs correspondent (ex: mot de passe et confirmation)
 */
export const validateMatch = (value1: string, value2: string, fieldName: string = 'Les valeurs'): ValidationResult => {
  const errors: string[] = [];

  if (value1 !== value2) {
    errors.push(`${fieldName} ne correspondent pas`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Valide un champ requis
 */
export const validateRequired = (value: string | number | null | undefined, fieldName: string): ValidationResult => {
  const errors: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push(`${fieldName} est requis`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Valide une longueur de chaîne
 */
export const validateLength = (
  value: string,
  minLength?: number,
  maxLength?: number,
  fieldName: string = 'Le champ'
): ValidationResult => {
  const errors: string[] = [];

  if (minLength !== undefined && value.length < minLength) {
    errors.push(`${fieldName} doit contenir au moins ${minLength} caractères`);
  }
  if (maxLength !== undefined && value.length > maxLength) {
    errors.push(`${fieldName} ne peut pas dépasser ${maxLength} caractères`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
