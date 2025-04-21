import { Category } from "@/types/Category";
import BaseService from "./BaseService";

/**
 * Service class for managing categories.
 * This class provides methods to interact with the category-related API endpoints.
 * It includes methods for fetching, creating, updating, and deleting categories.
 * It uses the AxiosInstance for making HTTP requests.
 * Singleton pattern is used to ensure only one instance of the service exists.
 */
class CategoryService extends BaseService {
  /**
   * This method fetches all the top-level categories from the API.
   * It returns a promise that resolves to an array of categories.
   * @returns {Promise<Category[]>} A promise that resolves to an array of categories.
   */
  async getParents(): Promise<Category[]> {
    const response = await this.http.get<Category[]>("/v1/categories/parents");
    return response.data;
  }

  /**
   * This method fetches all the child categories of a given parent category from the API.
   * It returns a promise that resolves to an array of categories.
   * @param parentId - The ID of the parent category.
   * @param id - The ID of the category to fetch.
   * @returns {Promise<Category[]>} A promise that resolves to an array of categories.
   */
  async getCategoryById(id: number): Promise<Category> {
    const response = await this.http.get<Category>(`/v1/categories/${id}`);
    return response.data;
  }

  /**
   * This method fetches all the child categories of a given parent category from the API.
   * It returns a promise that resolves to an array of categories.
   * @param data The data to create a new category.
   * @returns {Promise<Category>} A promise that resolves to the created category.
   */
  async createCategory(data: Partial<Category>): Promise<Category> {
    const response = await this.http.post<Category>("/v1/categories", data);
    return response.data;
  }

  /**
   * This method updates an existing category in the API.
   * It returns a promise that resolves to the updated category.
   * @param id The ID of the category to update.
   * @param data The data to update the category with.
   * @returns {Promise<Category>} A promise that resolves to the updated category.
   */
  async updateCategory(id: number, data: Partial<Category>): Promise<Category> {
    const response = await this.http.put<Category>(`/v1/categories/${id}`, data);
    return response.data;
  }

  /**
   * This method deletes a category from the API.
   * It returns a promise that resolves when the category is deleted.
   * @param id The ID of the category to delete.
   */
  async deleteCategory(id: number): Promise<void> {
    await this.http.delete(`/v1/categories/${id}`);
  }

  /**
   * This method force deletes a category from the API.
   * It returns a promise that resolves when the category is force deleted.
   * This is a permanent deletion and cannot be undone.
   * @param id The ID of the category to force delete.
   */
  async forceDeleteCategory(id: number): Promise<void> {
    await this.http.delete(`/v1/categories/${id}/force`);
  }

  /**
   * This method fetches the category tree from the API.
   * It returns a promise that resolves to an array of categories.
   * The category tree is a hierarchical representation of categories.
   * Each category may have child categories, forming a tree structure.
   * This method is useful for displaying categories in a nested format.
   * @returns {Promise<Category[]>} A promise that resolves to an array of categories.
   */
  async getCategoryTree(): Promise<Category[]> {
    const response = await this.http.get<Category[]>("/v1/categories/tree");
    return response.data;
  }

  /**
   * This method fetches all the child categories of a given parent category from the API.
   * It returns a promise that resolves to an array of categories.
   * @param parentId - The ID of the parent category.
   * @returns {Promise<Category[]>} A promise that resolves to an array of categories.
   */
  async getCategoryTreeByParentId(parentId: number): Promise<Category[]> {
    const response = await this.http.get<Category[]>(`/v1/categories?parentId=${parentId}`);
    return response.data;
  }
}

export default new CategoryService();
