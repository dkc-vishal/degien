interface RefreshTokenResponse {
  access_token: string;
  refresh_token?: string;
}

export class TokenRefreshManager {
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: any) => void;
  }> = [];

  /**
   * Refresh the access token using the refresh token
   */
  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data: RefreshTokenResponse = await response.json();

      // Store new tokens
      localStorage.setItem("auth_token", data.access_token);
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }

      return data.access_token;
    } catch (error) {
      // Clear tokens and redirect to login
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_role");

      // Redirect to login
      window.location.href = "/Auth/Login";

      throw error;
    }
  }

  /**
   * Handle token refresh with queue management to avoid multiple simultaneous refresh calls
   */
  async handleTokenRefresh(): Promise<string> {
    if (this.isRefreshing) {
      // If already refreshing, queue this request
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject });
      });
    }

    this.isRefreshing = true;

    try {
      const newToken = await this.refreshToken();

      // Process queued requests
      this.failedQueue.forEach(({ resolve }) => resolve(newToken));
      this.failedQueue = [];

      return newToken;
    } catch (error) {
      // Reject all queued requests
      this.failedQueue.forEach(({ reject }) => reject(error));
      this.failedQueue = [];

      throw error;
    } finally {
      this.isRefreshing = false;
    }
  }

  /**
   * Check if token is expired (optional - for proactive refresh)
   */
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      // Check if token expires in the next 30 seconds
      return payload.exp && payload.exp - currentTime < 30;
    } catch {
      return true; // If we can't parse it, consider it expired
    }
  }

  /**
   * Get a valid token (refresh if needed)
   */
  async getValidToken(): Promise<string> {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      throw new Error("No token available");
    }

    if (this.isTokenExpired(token)) {
      return this.handleTokenRefresh();
    }

    return token;
  }
}

export const tokenRefreshManager = new TokenRefreshManager();
