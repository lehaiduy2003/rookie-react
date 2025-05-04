import BaseService from "./BaseService";
import { UserDetailPaging } from "@/types/UserDetail";
import { CustomerForm } from "@/types/CustomerFormValues";
/**
 * UserService class handles authentication-related API calls.
 * It extends the BaseService class to utilize the AxiosInstance for making HTTP requests.
 * This class provides methods for logging in, logging out, and refreshing tokens.
 */
class UserService extends BaseService {
  /**
   * Get the list of users from the system.
   * @param params the search parameters for the user list
   * @returns {Promise<UserPaging>} A promise that resolves to the created user object.
   */
  async getUsers(params?: Record<string, string>): Promise<UserDetailPaging> {
    // If param is provided, append it to the URL as query parameters
    if (params) {
      const queryString = super.buildParams(params);
      const response = await this.http.get<UserDetailPaging>(`/v1/users?${queryString}`);
      return response.data;
    }
    // If no param is provided, fetch the default endpoint
    // the backend handled the default value for pageNo, pageSize, sortBy, and sortDir,...
    const response = await this.http.get<UserDetailPaging>("/v1/users");
    return response.data;
  }

  /**
   * delete a user from the system.
   * @param id the id of the user to be fetched
   * @returns {Promise<void>} a promise that resolves to deleted user object.
   */
  async deleteUserById(id: string): Promise<void> {
    try {
      const response = await this.http.delete(`/v1/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Deleting error:", error);
      throw error;
    }
  }

  async updateById(id: string, user: CustomerForm): Promise<void> {
    try {
      const response = await this.http.put(`/v1/users/${id}/by-admin`, user);
      return response.data;
    } catch (error) {
      console.error("Updating error:", error);
      throw error;
    }
  }
}

export default new UserService();
