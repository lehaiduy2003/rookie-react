import { Rating } from "@/types/Rating";
import BaseService from "./BaseService";
import { RatingForm } from "@/types/ReviewForm";
/**
 * AuthService class handles authentication-related API calls.
 * It extends the BaseService class to utilize the AxiosInstance for making HTTP requests.
 * This class provides methods for logging in, logging out, and refreshing tokens.
 */
class RatingService extends BaseService {
  /**
   * Registers a new rating for a product.
   * It sends a POST request to the /ratings endpoint with the rating details.
   * @param comment comment of the rating
   * @param score score of the rating
   * @param productId id of the product
   * @param customerId id of the customer
   * @returns {Promise<Rating>} A promise that resolves to the created rating object.
   */
  async createRating(data: RatingForm): Promise<Rating> {
    try {
      const { comment, score, productId, customerId } = data;
      const response = await this.http.post("/v1/ratings", {
        comment,
        score,
        productId,
        customerId,
      });
      return response.data;
    } catch (error) {
      console.error("create a rating error:", error);
      throw error;
    }
  }
}

export default new RatingService();
