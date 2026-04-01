import { apiClient } from "./api";

export const authAPI = {
  register: (data: { fullName: string; email: string; password: string }) =>
    apiClient.post("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    apiClient.post("/auth/login", data),
};
