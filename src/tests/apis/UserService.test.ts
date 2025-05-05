import MockAdapter from "axios-mock-adapter";
import api from "@/configs/axios";
import { CustomerForm } from "@/types/CustomerFormValues";
import UserService from "@/apis/UserService";

// Create a mock for the axios instance
const mock = new MockAdapter(api);

describe("UserService", () => {
  // Reset mocks after each test
  afterEach(() => {
    mock.reset();
  });

  describe("getUsers", () => {
    test("should get user by id successfully", async () => {
      const userId = "1";
      const responseData = {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "abc@example.com",
        phoneNumber: "1234567890",
        address: "123 Main St",
      };
      // Setup mock response
      mock.onGet(`/v1/users/${userId}`).reply(200, responseData);
      // Call the service method
      const result = await UserService.getUserById(userId);
      // Assertions
      expect(result).toEqual(responseData);
    });

    test("should handle error when getting user by id failed", async () => {
      const userId = "2";
      // Setup mock error response
      mock.onGet(`/v1/users/${userId}`).reply(500);
      // Call the service method and check it throws
      await expect(UserService.getUserById(userId)).rejects.toThrow();
    });

    test("should get users without parameters", async () => {
      // Mock response data
      const responseData = {
        content: [{ id: "1", firstName: "John", lastName: "Doe" }],
        totalElements: 1,
        totalPages: 1,
        pageSize: 10,
        pageNo: 0,
      };

      // Setup mock response
      mock.onGet("/v1/users").reply(200, responseData);

      // Call the service method
      const result = await UserService.getUsers();

      // Assertions
      expect(result).toEqual(responseData);
    });

    test("should handle error when fetching users with parameters failed", async () => {
      // Mock response data

      const params = {
        invalidParam: "invalid",
      };

      // Setup mock response with query parameters
      mock.onGet("/v1/users", { params: params }).reply(500);

      // Call the service method with parameters
      await expect(UserService.getUsers(params)).rejects.toThrow();
    });

    test("should get users with parameters", async () => {
      // Mock response data
      const responseData = {
        content: [{ id: 1, firstName: "John", lastName: "Doe" }],
        totalElements: 1,
        totalPages: 1,
        pageSize: 10,
        pageNo: 0,
      };

      const params = {
        pageNo: "0",
        pageSize: "10",
      };

      // Setup mock response with query parameters
      mock.onGet("/v1/users?pageNo=0&pageSize=10").reply(200, responseData);

      // Call the service method with parameters
      const result = await UserService.getUsers(params);

      // Assertions
      expect(result).toEqual(responseData);
    });

    test("Should handle error when get users with invalid parameters", async () => {
      // Setup mock error response
      mock.onGet("/v1/users?pageNo=invalid").reply(400, { message: "Invalid parameters" });

      // Call the service method and check it throws
      await expect(UserService.getUsers({ pageNo: "invalid" })).rejects.toThrow();
    });
  });

  describe("deleteUserById", () => {
    test("should delete user by id successfully", async () => {
      const userId = "1";

      // Setup mock response
      mock.onDelete(`/v1/users/${userId}`).reply(204);

      // Call the service method and check it doesn't throw
      await expect(UserService.deleteUserById(userId)).resolves.not.toThrow();
    });

    test("should handle error when deleting user failed", async () => {
      const userId = "invalid-id";
      // Setup mock error response
      mock.onDelete(`/v1/users/${userId}`).reply(500);
      // Call the service method and check it throws
      await expect(UserService.deleteUserById(userId)).rejects.toThrow();
    });
  });

  describe("updateById", () => {
    test("should update user successfully", async () => {
      const userId = "1";
      const userData: CustomerForm = {
        firstName: "Updated",
        lastName: "User",
        email: "updated@example.com",
        phoneNumber: "1234567890",
        address: "123 Main St",
      };

      // Setup mock response
      mock.onPut(`/v1/users/${userId}/by-admin`).reply(200);

      // Call the service method
      await expect(UserService.updateById(userId, userData)).resolves.not.toThrow();
    });

    test("should handle error when updating user failed", async () => {
      const userId = "invalid-id";
      const userData: CustomerForm = {
        firstName: "Invalid",
        lastName: "User",
        email: "invalid@example.com",
        phoneNumber: "0987654321",
        address: "456 Side St",
      };
      // Setup mock error response
      mock.onPut(`/v1/users/${userId}/by-admin`).reply(500);
      // Call the service method and check it throws
      await expect(UserService.updateById(userId, userData)).rejects.toThrow();
    });
  });
});
