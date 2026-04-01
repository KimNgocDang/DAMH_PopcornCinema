// API base configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiClient = {
  get: async (url: string, headers?: Record<string, string>) => {
    const token = localStorage.getItem("token");
    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    };

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "GET",
      headers: defaultHeaders,
      credentials: "include",
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }
    return responseData;
  },

  post: async (url: string, data?: any, headers?: Record<string, string>) => {
    const token = localStorage.getItem("token");
    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    };

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: defaultHeaders,
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }
    return responseData;
  },

  put: async (url: string, data?: any, headers?: Record<string, string>) => {
    const token = localStorage.getItem("token");
    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    };

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "PUT",
      headers: defaultHeaders,
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }
    return responseData;
  },

  delete: async (url: string, headers?: Record<string, string>) => {
    const token = localStorage.getItem("token");
    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    };

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "DELETE",
      headers: defaultHeaders,
      credentials: "include",
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }
    return responseData;
  },

  patch: async (url: string, data?: any, headers?: Record<string, string>) => {
    const token = localStorage.getItem("token");
    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    };

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "PATCH",
      headers: defaultHeaders,
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }
    return responseData;
  },
};

export default apiClient;
