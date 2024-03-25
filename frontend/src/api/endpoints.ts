const ENDPOINTS = {
  STUDENTS: {
    LIST: "students/",
    DETAILS: (id: string) => `students/${id}/`,
    CREATE: "students/",
    UPLOAD: "upload/students/",
  },
  INSTRUCTORS: {
    LIST: "instructors/",
    DETAILS: (id: string) => `instructors/${id}`,
    CREATE: "instructors/",
    UPLOAD: "upload/instructors/",
  },
  DONORS: {
    LIST: "donors/",
    DETAILS: (id: string) => `donors/${id}`,
    CREATE: "donors/",
    UPLOAD: "upload/donors/",
  },
  EMPLOYERS: {
    LIST: "employers/",
    DETAILS: (id: string) => `employers/${id}`,
    CREATE: "employers/",
    UPLOAD: "upload/employers/",
  },
  COHORTS: {
    LIST: "cohorts/",
    DETAILS: (id: string) => `cohorts/${id}`,
    CREATE: "cohorts/",
    UPLOAD: "upload/cohorts/",
  },
  LOGIN: "login/",
  // ... other model or resource endpoints
};

export default ENDPOINTS;
