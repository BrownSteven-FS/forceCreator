export const API_BASE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api_v1"
    : import.meta.env.VITE_BASE_URL;
