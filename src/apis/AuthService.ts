import { Auth } from "@/types/Auth";
import BaseService from "./BaseService";
/**
 * AuthService class handles authentication-related API calls.
 * It extends the BaseService class to utilize the AxiosInstance for making HTTP requests.
 * This class provides methods for logging in, logging out, and refreshing tokens.
 */
class AuthService extends BaseService {
  /**
   * Logs in a user with the provided email and password.
   * It sends a POST request to the /auth/login endpoint with the user's credentials.
   * @param email email of user
   * @param password password of user
   * @returns {Promise<Auth>} Auth object containing user information and tokens.
   */
  async login(email: string, password: string): Promise<Auth> {
    try {
      const response = await this.http.post("/v1/auth/login", { email, password });
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  /**
   * Logs out the current user.
   * It sends a POST request to the /auth/logout endpoint to invalidate the user's session.
   * @returns {Promise<void>} A promise that resolves when the logout is successful.
   */
  async logout(): Promise<void> {
    try {
      await this.http.post("/v1/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }
}

export default new AuthService();
