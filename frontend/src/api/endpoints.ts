const ENDPOINTS = {
  STUDENTS: {
    LIST: "students/",
    DETAILS: (id: string) => `students/${id}/`,
    CREATE: "students/",
  },
  INSTRUCTORS: {
    LIST: "instructors/",
    DETAILS: (id: string) => `instructors/${id}`,
    CREATE: "instructors/",
  },
  LOGIN: "login/",
  // ... other model or resource endpoints
};

export default ENDPOINTS;
