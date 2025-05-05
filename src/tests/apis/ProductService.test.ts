import MockAdapter from "axios-mock-adapter";
import api from "@/configs/axios";
import ProductService from "@/apis/ProductService";

const mock = new MockAdapter(api);

describe("ProductService", () => {
  afterEach(() => {
    mock.reset();
  });

  describe("getProduct", () => {
    test("should fetch product by ID", async () => {
      const productId = 1;
      const responseData = { id: productId, name: "Test Product" };

      // Setup mock response
      mock.onGet(`/v1/products/${productId}`).reply(200, responseData);

      // Call the service method
      const result = await ProductService.getProduct(productId);

      // Assertions
      expect(result).toEqual(responseData);
    });

    test("should handle error when fetching product by ID failed", async () => {
      const productId = "";

      // Setup mock error response
      mock.onGet(`/v1/products/${productId}`).reply(500);

      // Call the service method and check it throws
      await expect(ProductService.getProduct(productId)).rejects.toThrow();
    });
  });

  describe("createProduct", () => {
    test("should create a new product", async () => {
      const productData = { name: "New Product" };
      const responseData = { id: 1, ...productData };

      // Setup mock response
      mock.onPost("/v1/products").reply(201, responseData);

      // Call the service method
      const result = await ProductService.createProduct(productData);

      // Assertions
      expect(result).toEqual(responseData);
    });

    test("should handle error when creating product failed", async () => {
      const productData = {};

      // Setup mock error response
      mock.onPost("/v1/products").reply(500);

      // Call the service method and check it throws
      await expect(ProductService.createProduct(productData)).rejects.toThrow();
    });
  });

  describe("updateProduct", () => {
    test("should update an existing product", async () => {
      const productId = 1;
      const productData = { name: "Updated Product" };
      const responseData = { id: productId, ...productData };

      // Setup mock response
      mock.onPut(`/v1/products/${productId}`).reply(200, responseData);

      // Call the service method
      const result = await ProductService.updateProductById(productId, productData);

      // Assertions
      expect(result).toEqual(responseData);
    });

    test("should handle error when updating product failed", async () => {
      const productId = 1;
      const productData = { name: "" };

      // Setup mock error response
      mock.onPut(`/v1/products/${productId}`).reply(500);

      // Call the service method and check it throws
      await expect(ProductService.updateProductById(productId, productData)).rejects.toThrow();
    });
  });

  describe("deleteProduct", () => {
    test("should delete an existing product", async () => {
      const productId = 1;

      // Setup mock response
      mock.onDelete(`/v1/products/${productId}`).reply(204);

      // Call the service method
      await ProductService.deleteProductById(productId);

      // Assertions
      expect(mock.history.delete[0].url).toEqual(`/v1/products/${productId}`);
    });

    test("should handle error when deleting product failed", async () => {
      const productId = "";

      // Setup mock error response
      mock.onDelete(`/v1/products/${productId}`).reply(500);

      // Call the service method and check it throws
      await expect(ProductService.deleteProductById(productId)).rejects.toThrow();
    });
  });

  describe("getProducts", () => {
    test("should fetch products", async () => {
      const responseData = [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ];

      // Setup mock response
      mock.onGet("/v1/products").reply(200, responseData);

      // Call the service method
      const result = await ProductService.getProducts();

      // Assertions
      expect(result).toEqual(responseData);
    });

    test("should fetch products with query parameters", async () => {
      const queryParams = { pageNo: "1", pageSize: "10" };
      const responseData = [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ];

      // Setup mock response
      mock.onGet("/v1/products?pageNo=1&pageSize=10").reply(200, responseData);

      // Call the service method
      const result = await ProductService.getProducts(queryParams);

      // Assertions
      expect(result).toEqual(responseData);
    });

    test("should handle error when fetching products with invalid query parameters", async () => {
      const queryParams = { invalidParam: "1" };

      // Setup mock error response
      mock
        .onGet("/v1/products", { params: queryParams })
        .reply(400, { message: "Invalid query parameters" });

      // Call the service method and check it throws
      await expect(ProductService.getProducts(queryParams)).rejects.toThrow();
    });

    test("should handle error when fetching products with invalid page number", async () => {
      const queryParams: Record<string, string> = { pageNo: "-1" };

      // Setup mock error response
      mock.onGet("/v1/products", { params: queryParams }).reply(400, { message: "Invalid pageNo" });

      // Call the service method and check it throws
      await expect(ProductService.getProducts(queryParams)).rejects.toThrow();
    });

    test("should handle error when fetching products with page number character", async () => {
      const queryParams: Record<string, string> = { pageNo: "one" };

      // Setup mock error response
      mock.onGet("/v1/products", { params: queryParams }).reply(400, { message: "Invalid pageNo" });

      // Call the service method and check it throws
      await expect(ProductService.getProducts(queryParams)).rejects.toThrow();
    });

    test("should handle error when fetching products with invalid page size", async () => {
      const queryParams: Record<string, string> = { pageSize: "0" };

      // Setup mock error response
      mock
        .onGet("/v1/products", { params: queryParams })
        .reply(400, { message: "Invalid page size" });

      // Call the service method and check it throws
      await expect(ProductService.getProducts(queryParams)).rejects.toThrow();
    });

    test("should handle error when fetching products with page size character", async () => {
      const queryParams: Record<string, string> = { pageSize: "ten" };

      // Setup mock error response
      mock
        .onGet("/v1/products", { params: queryParams })
        .reply(400, { message: "Invalid page size" });

      // Call the service method and check it throws
      await expect(ProductService.getProducts(queryParams)).rejects.toThrow();
    });

    test("should handle error when fetching products with invalid sort order", async () => {
      const queryParams: Record<string, string> = { sort: "invalid" };

      // Setup mock error response
      mock
        .onGet("/v1/products", { params: queryParams })
        .reply(400, { message: "Invalid sort order" });

      // Call the service method and check it throws
      await expect(ProductService.getProducts(queryParams)).rejects.toThrow();
    });

    test("should handle error when fetching products with invalid sort field", async () => {
      const queryParams: Record<string, string> = { sortBy: "invalid" };

      // Setup mock error response
      mock
        .onGet("/v1/products", { params: queryParams })
        .reply(400, { message: "Invalid sort field" });

      // Call the service method and check it throws
      await expect(ProductService.getProducts(queryParams)).rejects.toThrow();
    });
  });
});
