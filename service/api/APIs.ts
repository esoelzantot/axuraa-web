/**
 * Single source of truth for the backend URL.
 * Override with NEXT_PUBLIC_API_URL (e.g. in .env.local) — must include `/api/v1`.
 */
export const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "https://back-end-axuraa.fly.dev/api/v1"
).replace(/\/+$/, "");

const enc = encodeURIComponent;

export const ENDPOINTS = {
  Home: {
    partners: `${API_BASE}/site/home/partners`, // GET
    trackRecord: `${API_BASE}/site/home/track-record`, // GET
  },
  Services: {
    getAll: `${API_BASE}/services`, // GET
    getById: (id: string) => `${API_BASE}/services/${enc(id)}`, // GET
  },
  Projects: {
    getAll: `${API_BASE}/projects`, // GET
    getById: (id: string) => `${API_BASE}/projects/${enc(id)}`, // GET
  },
  Contact: {
    create: `${API_BASE}/contact-requests`, // POST
  },
  AboutUs: {
    history: `${API_BASE}/site/about/history`, // GET
  },
  General: {
    contactInformation: `${API_BASE}/site/contact`, // GET
  },
  TeamMembers: {
    getAll: `${API_BASE}/team-members`, // GET
  },
  Clients: {
    getAll: `${API_BASE}/clients`, // GET
  },
  ChatBot: {
    ask: (lang: string) => `${API_BASE}/bot?lang=${enc(lang)}`, // POST
  },
};
