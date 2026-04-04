import { apiClient } from "./api";

export const movieAPI = {
  getAll: () => apiClient.get("/movies"),

  getById: (id: string) => apiClient.get(`/movies/${id}`),

  create: (data: any) => apiClient.post("/movies", data),

  update: (id: string, data: any) => apiClient.put(`/movies/${id}`, data),

  delete: (id: string) => apiClient.delete(`/movies/${id}`),
};

export const cinemaAPI = {
  getAll: () => apiClient.get("/cinemas"),

  getById: (id: string) => apiClient.get(`/cinemas/${id}`),

  create: (data: any) => apiClient.post("/cinemas", data),

  update: (id: string, data: any) => apiClient.put(`/cinemas/${id}`, data),

  delete: (id: string) => apiClient.delete(`/cinemas/${id}`),
};

export const auditoriumAPI = {
  getAll: () => apiClient.get("/auditoriums"),

  getById: (id: string) => apiClient.get(`/auditoriums/${id}`),

  create: (data: any) => apiClient.post("/auditoriums", data),

  update: (id: string, data: any) => apiClient.put(`/auditoriums/${id}`, data),

  delete: (id: string) => apiClient.delete(`/auditoriums/${id}`),
};

export const showtimeAPI = {
  getAll: () => apiClient.get("/showtimes"),

  getById: (id: string) => apiClient.get(`/showtimes/${id}`),

  create: (data: any) => apiClient.post("/showtimes", data),

  update: (id: string, data: any) => apiClient.put(`/showtimes/${id}`, data),

  delete: (id: string) => apiClient.delete(`/showtimes/${id}`),
};

export const seatAPI = {
  getAll: () => apiClient.get("/seats"),

  getByAuditorium: (auditoriumId: string) =>
    apiClient.get(`/seats/auditorium/${auditoriumId}`),

  getById: (id: string) => apiClient.get(`/seats/${id}`),

  create: (data: any) => apiClient.post("/seats", data),

  update: (id: string, data: any) => apiClient.put(`/seats/${id}`, data),

  delete: (id: string) => apiClient.delete(`/seats/${id}`),
};

export const bookingAPI = {
  create: (data: any) => apiClient.post("/bookings", data),
};

export const snackAPI = {
  getAll: () => apiClient.get("/snacks"),

  getActive: () => apiClient.get("/snacks/active"),

  getByCategory: (category: string) => apiClient.get(`/snacks/category/${category}`),

  getById: (id: string) => apiClient.get(`/snacks/${id}`),

  create: (data: any) => apiClient.post("/snacks", data),

  update: (id: string, data: any) => apiClient.put(`/snacks/${id}`, data),

  delete: (id: string) => apiClient.delete(`/snacks/${id}`),
};
