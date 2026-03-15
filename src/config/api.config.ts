const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5010';

export const API_URL = API_BASE_URL;

export const ENDPOINTS = {
    AUTH: {
        SIGNUP: `${API_BASE_URL}/api/auth/signup`,
        LOGIN: `${API_BASE_URL}/api/auth/login`,
        PROFILE: `${API_BASE_URL}/api/auth/profile`,
        REFRESH: `${API_BASE_URL}/api/auth/refresh`,
        LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    },

    FORMATIONS: `${API_BASE_URL}/api/formations`,

    TELECOM_OPINIONS: `${API_BASE_URL}/api/telecom-opinions`,

    CONTACT_REQUESTS: `${API_BASE_URL}/api/contact-requests`,

    ENROLLMENTS: `${API_BASE_URL}/api/enrollments`,

    INVOICES: {
        BASE: `${API_BASE_URL}/api/invoices`,
        CREATE: `${API_BASE_URL}/api/invoices`,
        LIST: `${API_BASE_URL}/api/invoices`,
        GET: (id: string) => `${API_BASE_URL}/api/invoices/${id}`,
        UPDATE_STATUS: (id: string) => `${API_BASE_URL}/api/invoices/${id}/status`,
    },
    TESTIMONIALS: {
        BASE: `${API_BASE_URL}/api/testimonials`,
        LIST: `${API_BASE_URL}/api/testimonials`,
        GET: (id: string) => `${API_BASE_URL}/api/testimonials/${id}`,
    },
    STATISTICS: {
        BASE: `${API_BASE_URL}/api/statistics`,
        LIST: `${API_BASE_URL}/api/statistics`,
        GET: (id: string) => `${API_BASE_URL}/api/statistics/${id}`,
    },
    PAYMENTS: {
        BASE: `${API_BASE_URL}/api/payments`,
        INITIATE: `${API_BASE_URL}/api/payments`,
        LIST: `${API_BASE_URL}/api/payments`,
        GET: (id: string) => `${API_BASE_URL}/api/payments/${id}`,
        CONFIRM: (id: string) => `${API_BASE_URL}/api/payments/${id}/confirm`,
        CANCEL: (id: string) => `${API_BASE_URL}/api/payments/${id}/cancel`,
    },
    COMPANY: {
        BASE: `${API_BASE_URL}/api/company`,
        GET: `${API_BASE_URL}/api/company`,
    },
};
