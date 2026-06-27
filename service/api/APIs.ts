const API_BASE = 'https://back-end-axuraa.fly.dev/api/v1';

export const ENDPOINTS = {
    Home: {
        partners: `${API_BASE}/site/home/partners` // GET

    },
    Services: {
        getAll: `${API_BASE}/services`, // GET
        getById: (id: string) => `${API_BASE}/services/${id}`, // GET
    },
    Projects: {
        getAll: `${API_BASE}/projects`, // GET
        getById: (id: string) => `${API_BASE}/projects/${id}`, // GET
    },
    BusinessSolutions: {

    },
    Contact: {
        create: `${API_BASE}/contact-requests`, // POST
        getAll: `${API_BASE}/contact-requests`, // GET
        getById: `${API_BASE}/contact-requests`, // GET
        update: `${API_BASE}/contact-requests`, // PUT
        delete: `${API_BASE}/contact-requests`, // DELETE
    },
    AboutUs: {
        history: `${API_BASE}/site/about/history`, // GET
    },
    General: {
        contactInformation: `${API_BASE}/site/contact`, // GET
        trackRecords: `${API_BASE}/site/track-records` // GET
    },
    TeamMembers: {
        getAll: `${API_BASE}/team-members`, // GET
        getById: (id: string) => `${API_BASE}/team-members/${id}`, // GET
    },
    Clients: {
        getAll: `${API_BASE}/clients` // GET
    }
}