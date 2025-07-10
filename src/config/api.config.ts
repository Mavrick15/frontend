const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const ENDPOINTS = {
    AUTH: {
        SIGNUP: `${API_BASE_URL}/api/auth/signup`,
        LOGIN: `${API_BASE_URL}/api/auth/login`,
        PROFILE: `${API_BASE_URL}/api/auth/profile`,
    },

    FORMATIONS: `${API_BASE_URL}/api/formations`,

    TELECOM_OPINIONS: `${API_BASE_URL}/api/telecom-opinions`,

    ENROLLMENTS: `${API_BASE_URL}/api/enrollments`,
};
