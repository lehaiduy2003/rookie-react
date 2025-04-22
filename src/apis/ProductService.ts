import { ProductPaging } from "@/types/Product";
import BaseService from "./BaseService";
import { ProductDetail } from "@/types/ProductDetail";

/**
 * ProductService class handles product-related API calls.
 * It extends the BaseService class to utilize the AxiosInstance for making HTTP requests.
 * This class provides methods for managing products, including fetching, creating, updating, and deleting products.
 */
class ProductService extends BaseService {
  /**
   * Fetches all products from the API.
   * @param params Optional parameter to filter products.
   * @returns {Promise<Product[]>} A promise that resolves to an array of products.
   */
  async getProducts(params?: Record<string, string>): Promise<ProductPaging> {
    // If param is provided, append it to the URL as query parameters
    if (params) {
      const queryString = super.buildParams(params);
      const response = await this.http.get<ProductPaging>(`/v1/products?${queryString}`);
      return response.data;
    }
    // If no param is provided, fetch the default endpoint
    // the backend handled the default value for pageNo, pageSize, sortBy, and sortDir,...
    const response = await this.http.get<ProductPaging>("/v1/products");
    return response.data;
  }

  /**
   * Fetches a product by its ID from the API.
   * @param id The ID of the product to fetch.
   * @returns {Promise<ProductDetail>} A promise that resolves to the product details.
   */
  async getProduct(id: number): Promise<ProductDetail> {
    const response = await this.http.get<ProductDetail>(`/v1/products/${id}`);
    return response.data;
  }

  /**
   * Creates a new product in the API.
   * this data validation is handled by the backend
   * @param data The data to create a new product.
   * @returns {Promise<ProductDetail>} A promise that resolves to the created product details.
   */
  async createProduct(data: object): Promise<ProductDetail> {
    const response = await this.http.post<ProductDetail>("/v1/products", data);
    return response.data;
  }

  /**
   * Updates an existing product in the API.
   * this data validation is handled by the backend
   * @param id The ID of the product to update.
   * @param data The data to update the product.
   * @returns {Promise<ProductDetail>} A promise that resolves to the updated product details.
   */
  async updateProductById(id: number, data: object): Promise<ProductDetail> {
    const response = await this.http.put<ProductDetail>(`/v1/products/${id}`, data);
    return response.data;
  }

  /**
   * Deletes a product by its ID from the API.
   * @param id The ID of the product to delete.
   * @returns {Promise<void>} A promise that resolves when the product is deleted.
   */
  async deleteProductById(id: number): Promise<void> {
    await this.http.delete(`/v1/products/${id}`);
  }

  /**
   * Update the featured status of a product.
   * @param id the product id
   * @param featured true or false
   * @returns {Promise<ProductDetail>} A promise that resolves to the updated product details.
   */
  async updateFeaturedProduct(id: number, featured: "true" | "false"): Promise<ProductDetail> {
    const response = await this.http.put<ProductDetail>(`/v1/products/${id}/featured=${featured}`);
    return response.data;
  }
}

export default new ProductService();
