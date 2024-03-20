const ENDPOINTS = {
  STUDENTS: {
    LIST: "students/",
    DETAILS: (id: string) => `students/${id}/`,
    CREATE: "students/",
    UPLOAD: "students/upload/",
  },
  INSTRUCTORS: {
    LIST: "instructors/",
    DETAILS: (id: string) => `instructors/${id}`,
    CREATE: "instructors/",
  },
  DONORS: {
    LIST: "donors/",
    DETAILS: (id: string) => `donors/${id}`,
    CREATE: "donors/",
  },
  EMPLOYERS: {
    LIST: "employers/",
    DETAILS: (id: string) => `employers/${id}`,
    CREATE: "employers/",
  },
  LOGIN: "login/",
  // ... other model or resource endpoints
};

export default ENDPOINTS;
