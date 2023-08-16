const ENDPOINTS = {
    STUDENTS: {
        LIST: 'students/',
        DETAILS: (id:string) => `students/${id}/`,
        CREATE: 'students/',
    },
    // ... other model or resource endpoints
};

export default ENDPOINTS;
