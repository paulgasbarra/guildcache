const ENDPOINTS = {
    STUDENTS: {
        LIST: 'students/',
        DETAILS: (id:string) => `students/${id}/`,
        CREATE: 'students/',
    },
    LOGIN: 'login/',
    // ... other model or resource endpoints
};

export default ENDPOINTS;
