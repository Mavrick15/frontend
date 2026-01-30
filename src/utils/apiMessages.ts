/**
 * Utilitaire pour extraire et formater les messages des réponses API backend.
 * Gère : message, errors (validation), erreurs réseau.
 * Voir backend/docs/MESSAGES_API.md pour les formats de réponse.
 */

export type ApiErrorPayload = {
  message?: string;
  success?: boolean;
  errors?: Array<{ msg: string; path?: string }>;
};

const DEFAULT_ERROR = "Une erreur est survenue. Veuillez réessayer.";
const DEFAULT_NETWORK_ERROR = "Impossible de contacter le serveur. Vérifiez votre connexion.";

/**
 * Extrait un message d'erreur à afficher à partir du corps de réponse API.
 * Priorité : errors[].msg (validation) > message > défaut.
 */
export function getApiErrorMessage(
  data: ApiErrorPayload | null | undefined,
  defaultMessage: string = DEFAULT_ERROR
): string {
  if (!data) return defaultMessage;
  if (Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors.map((e) => e.msg).join(" ");
  }
  if (typeof data.message === "string" && data.message.trim()) {
    return data.message.trim();
  }
  return defaultMessage;
}

/**
 * Extrait un message de succès à afficher.
 * Gère message et success.
 */
export function getApiSuccessMessage(
  data: { message?: string; success?: boolean } | null | undefined,
  defaultMessage: string = "Opération réussie."
): string {
  if (!data) return defaultMessage;
  if (typeof data.message === "string" && data.message.trim()) {
    return data.message.trim();
  }
  return defaultMessage;
}

/**
 * Parse la réponse fetch : lit le JSON et retourne { ok, status, data, errorMessage }.
 * En cas d'erreur réseau ou de JSON invalide, errorMessage est renseigné.
 */
export async function parseApiResponse(response: Response): Promise<{
  ok: boolean;
  status: number;
  data: ApiErrorPayload & Record<string, unknown>;
  errorMessage: string;
  successMessage: string;
}> {
  let data: (ApiErrorPayload & Record<string, unknown>) | null = null;
  try {
    const text = await response.text();
    data = text ? (JSON.parse(text) as ApiErrorPayload & Record<string, unknown>) : {};
  } catch {
    data = {};
  }
  const errorMessage = getApiErrorMessage(data);
  const successMessage = getApiSuccessMessage(data);
  return {
    ok: response.ok,
    status: response.status,
    data: data ?? {},
    errorMessage,
    successMessage,
  };
}

/**
 * Message par défaut pour les erreurs réseau (fetch failed, etc.).
 */
export function getNetworkErrorMessage(): string {
  return DEFAULT_NETWORK_ERROR;
}
