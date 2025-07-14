import { tokenRefreshManager } from "./token-refresh";

/**
 * Utility functions for token management
 */
export const tokenUtils = {
  /**
   * Manually refresh the access token
   */
  async refreshToken(): Promise<string> {
    return tokenRefreshManager.handleTokenRefresh();
  },

  /**
   * Get a valid token (refresh if needed)
   */
  async getValidToken(): Promise<string> {
    return tokenRefreshManager.getValidToken();
  },

  /**
   * Check if current token is expired
   */
  isTokenExpired(): boolean {
    const token = localStorage.getItem("auth_token");
    if (!token) return true;

    return tokenRefreshManager.isTokenExpired(token);
  },

  /**
   * Check if token is expiring soon (within 5 minutes)
   */
  isTokenExpiringSoon(): boolean {
    const token = localStorage.getItem("auth_token");
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const expiryTime = payload.exp;

      // Check if token expires within 5 minutes (300 seconds)
      return expiryTime - currentTime < 300;
    } catch (error) {
      return true; // If we can't parse the token, consider it expiring
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem("auth_token");
    return !!token && !this.isTokenExpired();
  },

  /**
   * Clear all tokens
   */
  clearTokens(): void {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_role");
  },
};
