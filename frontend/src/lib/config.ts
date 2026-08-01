const rawApiUrl = import.meta.env.VITE_API_URL;
let apiUrl = rawApiUrl ? rawApiUrl.replace(/\/+$/, '') : '/api';
if (apiUrl !== '/api' && !apiUrl.endsWith('/api')) {
  apiUrl = `${apiUrl}/api`;
}
export const API_BASE = apiUrl;
export const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  '475777238685-i0b2uet4vp2u7jqs7jej2v1nvuiv5r0j.apps.googleusercontent.com';

