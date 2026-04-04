import { authAPI } from "../services/auth.api";

export const login = async (email: string, password: string) => {
  try {
    const response = await authAPI.login({ email, password });
    
    if (response && response.token) {
      // Lưu token vào localStorage
      localStorage.setItem("token", response.token);
      // Lưu thông tin user
      localStorage.setItem("user", JSON.stringify(response.user));
      return response.user;
    }
    
    throw new Error("Login failed: Invalid response");
  } catch (error: any) {
    console.error("Login failed:", error);
    throw new Error(error?.message || "Đăng nhập thất bại. Vui lòng thử lại");
  }
};

export const register = async (fullName: string, email: string, password: string) => {
  try {
    const response = await authAPI.register({ fullName, email, password });
    
    if (response && response._id) {
      return response;
    }
    
    throw new Error("Register failed: Invalid response");
  } catch (error: any) {
    console.error("Register failed:", error);
    throw new Error(error?.message || "Đăng ký thất bại. Vui lòng thử lại");
  }
};

export const getCurrentUser = () => {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};