import MockAdapter from "axios-mock-adapter";
import api from "@/configs/axios";
import CategoryService from "@/apis/CategoryService";

const mock = new MockAdapter(api);

describe("CategoryService", () => {
  afterEach(() => {
    mock.reset();
  });

  describe("getCategories", () => {
    test("should fetch categories", async () => {
      const categories = [
        { id: 1, name: "Category 1" },
        { id: 2, name: "Category 2" },
      ];

      mock.onGet("/v1/categories").reply(200, categories);

      const response = await CategoryService.getAllCategories();
      expect(response).toEqual(categories);
    });

    test("should handle error when fetching categories failed", async () => {
      mock.onGet("/v1/categories").reply(500);

      await expect(CategoryService.getAllCategories()).rejects.toThrow();
    });

    test("should fetch categories with query parameters", async () => {
      const categories = [
        { id: 1, name: "Category 1" },
        { id: 2, name: "Category 2" },
      ];

      const queryParams = {
        name: "Category",
        description: "Test",
      };

      mock.onGet("/v1/categories?name=Category&description=Test").reply(200, categories);

      const response = await CategoryService.getAllCategories(queryParams);
      expect(response).toEqual(categories);
    });

    test("should handle error when fetching categories with query parameters failed", async () => {
      const queryParams = {
        invalidField: "Test",
      };

      mock.onGet("/v1/categories", { params: queryParams }).reply(500);

      await expect(CategoryService.getAllCategories(queryParams)).rejects.toThrow();
    });
  });

  describe("getCategoryById", () => {
    test("should fetch category by ID", async () => {
      const category = { id: 1, name: "Category 1" };

      mock.onGet("/v1/categories/1").reply(200, category);

      const response = await CategoryService.getCategoryById(1);
      expect(response).toEqual(category);
    });

    test("should handle error when fetching category failed", async () => {
      mock.onGet("/v1/categories/1").reply(500);

      await expect(CategoryService.getCategoryById(1)).rejects.toThrow();
    });
  });

  describe("createCategory", () => {
    test("should create a new category", async () => {
      const newCategory = { name: "New Category" };
      const createdCategory = { id: 1, ...newCategory };

      mock.onPost("/v1/categories").reply(201, createdCategory);

      const response = await CategoryService.createCategory(newCategory);
      expect(response).toEqual(createdCategory);
    });

    test("should handle error when creating a category failed", async () => {
      const newCategory = { name: "New Category" };

      mock.onPost("/v1/categories").reply(500);

      await expect(CategoryService.createCategory(newCategory)).rejects.toThrow();
    });
  });

  describe("updateCategory", () => {
    test("should update an existing category", async () => {
      const updatedCategory = { id: 1, name: "Updated Category" };

      mock.onPut("/v1/categories/1").reply(200, updatedCategory);

      const response = await CategoryService.updateCategory(1, updatedCategory);
      expect(response).toEqual(updatedCategory);
    });

    test("should handle error when updating a category failed", async () => {
      const updatedCategory = { id: 1, name: "Updated Category" };

      mock.onPut("/v1/categories/1").reply(500);

      await expect(CategoryService.updateCategory(1, updatedCategory)).rejects.toThrow();
    });
  });

  describe("deleteCategory", () => {
    test("should delete a category", async () => {
      mock.onDelete("/v1/categories/1").reply(204);

      await CategoryService.deleteCategory(1);
    });

    test("should handle error when deleting a category failed", async () => {
      mock.onDelete("/v1/categories/1").reply(500);

      await expect(CategoryService.deleteCategory(1)).rejects.toThrow();
    });
  });

  describe("Force delete category", () => {
    test("should force delete a category", async () => {
      mock.onDelete("/v1/categories/1/force").reply(204);

      await CategoryService.forceDeleteCategory(1);
    });

    test("should handle error when force deleting a category failed", async () => {
      mock.onDelete("/v1/categories/1/force").reply(500);

      await expect(CategoryService.forceDeleteCategory(1)).rejects.toThrow();
    });
  });

  describe("getParents", () => {
    test("should fetch parent categories", async () => {
      const parents = [
        { id: 1, name: "Parent Category 1" },
        { id: 2, name: "Parent Category 2" },
      ];

      mock.onGet("/v1/categories/parents").reply(200, parents);

      const response = await CategoryService.getParents();
      expect(response).toEqual(parents);
    });

    test("should handle error when fetching parent categories failed", async () => {
      mock.onGet("/v1/categories/parents").reply(500);

      await expect(CategoryService.getParents()).rejects.toThrow();
    });
  });

  describe("getCategoryTree", () => {
    test("should fetch category tree", async () => {
      const categoryTree = [
        { id: 1, name: "Category 1", children: [] },
        { id: 2, name: "Category 2", children: [] },
      ];

      mock.onGet("/v1/categories/tree").reply(200, categoryTree);

      const response = await CategoryService.getCategoryTree();
      expect(response).toEqual(categoryTree);
    });

    test("should handle error when fetching category tree failed", async () => {
      mock.onGet("/v1/categories/tree").reply(500);

      await expect(CategoryService.getCategoryTree()).rejects.toThrow();
    });
  });

  describe("getCategoryTreeByParentId", () => {
    test("should fetch categories by parent ID", async () => {
      const categories = [
        { id: 1, name: "Child Category 1" },
        { id: 2, name: "Child Category 2" },
      ];

      mock.onGet("/v1/categories?parentId=1").reply(200, categories);

      const response = await CategoryService.getCategoryTreeByParentId(1);
      expect(response).toEqual(categories);
    });

    test("should handle error when fetching categories by parent ID failed", async () => {
      mock.onGet("/v1/categories/parents/1").reply(500);

      await expect(CategoryService.getCategoryTreeByParentId(1)).rejects.toThrow();
    });
  });
});
