import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "none";

if (API_URL === undefined) {
  throw new Error("API_URL is not defined");
}

function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const TOKEN = localStorage.getItem("access_token");
    if (TOKEN) {
      config.headers["Authorization"] = `Token ${TOKEN}`;
    }
    const csrftoken = getCookie("csrftoken");
    if (csrftoken) {
      config.headers["X-CSRFToken"] = csrftoken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
