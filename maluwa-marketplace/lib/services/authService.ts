import api from "../api";

export interface User {
  _id?: string;
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  isVendor: boolean;
  vendorStatus?: "pending" | "approved" | "rejected";
  dateCreated?: Date;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  isVendor?: boolean;
}

const TOKEN_STORAGE_KEY = "maluwa_token";
const USER_STORAGE_KEY = "maluwa_user";
const LAST_ACTIVITY_KEY = "maluwa_last_activity";
const SESSION_TIMEOUT_MS = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

export const authService = {
  // Register new user
  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post("/auth/register", data);
      const { token, user } = response.data;

      // Store token and user
      this.setToken(token);
      this.setUser(user);
      this.updateLastActivity();

      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  // Login user
  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post("/auth/login", data);
      const { token, user } = response.data;

      // Store token and user
      this.setToken(token);
      this.setUser(user);
      this.updateLastActivity();

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Get current user
  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get("/auth/me");
      const user = response.data;

      // Update stored user
      this.setUser(user);
      this.updateLastActivity();

      return user;
    } catch (error) {
      console.error("Failed to get current user:", error);
      throw error;
    }
  },

  // Update user profile
  async updateProfile(data: { fullName?: string; email?: string; phone?: string }): Promise<User> {
    try {
      const response = await api.put("/auth/me", data);
      const user = response.data.user;

      // Update stored user
      this.setUser(user);
      this.updateLastActivity();

      return user;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  },

  // Change password
async changePassword(data: { currentPassword: string; newPassword: string }): Promise<void> {
  try {
    await api.put("/auth/change-password", data);
  } catch (error) {
    console.error("Failed to change password:", error);
    throw error;
  }
},

  // Logout user
  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(LAST_ACTIVITY_KEY);
    }
  },

  // Set token in storage
  setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
  },

  // Get token from storage
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },

  // Set user in storage
  setUser(user: User): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
  },

  // Get user from storage
  getUser(): User | null {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem(USER_STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  },

  // Update last activity timestamp
  updateLastActivity(): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
    }
  },

  // Get last activity timestamp
  getLastActivity(): number | null {
    if (typeof window === "undefined") return null;
    const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
    return lastActivity ? parseInt(lastActivity, 10) : null;
  },

  // Check if session has expired (6 hours of inactivity)
  hasSessionExpired(): boolean {
    const lastActivity = this.getLastActivity();
    if (!lastActivity) return false;

    const elapsed = Date.now() - lastActivity;
    return elapsed > SESSION_TIMEOUT_MS;
  },

  // Get remaining session time in milliseconds
  getSessionTimeRemaining(): number {
    const lastActivity = this.getLastActivity();
    if (!lastActivity) return SESSION_TIMEOUT_MS;

    const elapsed = Date.now() - lastActivity;
    const remaining = SESSION_TIMEOUT_MS - elapsed;
    return Math.max(0, remaining);
  },

  // Check if user is logged in
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  },

  // Check if user is vendor
  isVendor(): boolean {
    const user = this.getUser();
    return user?.isVendor || false;
  },

  // Verify token with backend
  async verifyToken(): Promise<boolean> {
    try {
      const response = await api.post("/auth/verify-token");
      return response.data.valid;
    } catch {
      return false;
    }
  },

  // Clear auth data
  clearAuth(): void {
    this.logout();
  },
};
