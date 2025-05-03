import axios from "axios";
import { VITE_API_URL } from "./env";

interface refreshTokenResponse {
  accessToken: string;
}

/**
 * Refreshes the access token for the current user.
 * It sends a POST request to the /auth/refresh-token endpoint to obtain a new access token.
 * This is typically used when the current access token has expired.
 * The new access token is returned in the response.
 * @returns {Promise<refreshTokenResponse>} A promise that resolves to the new access token.
 */
export default async function refreshToken(): Promise<refreshTokenResponse> {
  try {
    const response = await axios.get(`${VITE_API_URL}/v1/auth/refresh`, {
      withCredentials: true, // fetch this api with cookies
    });
    return response.data;
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
}
