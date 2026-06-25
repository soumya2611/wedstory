// Dynamic API Base URL configuration
// In production, VITE_API_BASE_URL should point to your live Render/Railway URL (e.g. https://wedstory-backend.onrender.com)
// In local dev without the env variable set, it defaults to empty string to use local Vite middleware proxy.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
