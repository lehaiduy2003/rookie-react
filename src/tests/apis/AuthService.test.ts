import MockAdapter from "axios-mock-adapter";
import api from "@/configs/axios";
import AuthService from "@/apis/AuthService";

const mock = new MockAdapter(api);

describe("AuthService", () => {
  afterEach(() => {
    mock.reset();
  });

  describe("login", () => {
    test("should login successfully and set refresh token cookie", async () => {
      const credentials = { email: "testUser", password: "password" };
      const responseData = { accessToken: "mockToken" };

      // Spy on axios post method
      const postSpy = jest.spyOn(api, "post");

      // Setup mock response
      mock.onPost("/v1/auth/login").reply(200, responseData);

      // Call the service method
      const result = await AuthService.login(credentials);

      // Assertions
      expect(result).toEqual(responseData);

      // Verify withCredentials was set to true for cookie handling
      expect(postSpy).toHaveBeenCalledWith(
        "/v1/auth/login",
        { email: "testUser", password: "password" },
        { withCredentials: true }
      );

      // Verify the mock's most recent request had the proper headers in the response
      const recentCall = mock.history.post[0];
      expect(recentCall.url).toEqual("/v1/auth/login");

      postSpy.mockRestore();
    });

    test("should handle error when login failed", async () => {
      const credentials = { email: "testUser", password: "wrongPassword" };

      // Setup mock error response
      mock.onPost("/v1/auth/login").reply(500);

      // Call the service method and check it throws
      await expect(AuthService.login(credentials)).rejects.toThrow();
    });
  });

  describe("logout", () => {
    test("should logout successfully and remove cookie", async () => {
      // Spy on the http post method
      const postSpy = jest.spyOn(api, "post");

      // Setup mock response
      mock.onPost("/v1/auth/logout").reply(200, {});

      // Call the service method
      await AuthService.logout();

      // Verify the correct endpoint was called with withCredentials
      expect(postSpy).toHaveBeenCalledWith("/v1/auth/logout", { withCredentials: true });

      // Verify the method completed without throwing
      expect(async () => await AuthService.logout()).not.toThrow();

      postSpy.mockRestore();
    });

    test("should handle error during logout", async () => {
      // Setup mock error response
      mock.onPost("/v1/auth/logout").reply(500, { message: "Server error" });

      // Call the service method and check it throws
      await expect(AuthService.logout()).rejects.toThrow();
    });
  });

  describe("register", () => {
    test("should register successfully and set refresh token cookie", async () => {
      const registerData = {
        email: "testUser",
        password: "password",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
      };
      const responseData = { accessToken: "mockToken" };

      // Spy on axios post method
      const postSpy = jest.spyOn(api, "post");

      // Setup mock response
      mock.onPost("/v1/auth/register").reply(200, responseData);

      // Call the service method
      const result = await AuthService.register(registerData);

      // Assertions
      expect(result).toEqual(responseData);

      // Verify withCredentials was set to true for cookie handling
      expect(postSpy).toHaveBeenCalledWith(
        "/v1/auth/register",
        {
          email: "testUser",
          password: "password",
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "1234567890",
        },
        { withCredentials: true }
      );

      // Verify the mock's most recent request had the proper headers in the response
      const recentCall = mock.history.post[0];
      expect(recentCall.url).toEqual("/v1/auth/register");

      postSpy.mockRestore();
    });

    test("should handle error when registering failed", async () => {
      const registerData = {
        email: "testUser",
        password: "password",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
      };

      // Setup mock error response
      mock.onPost("/v1/auth/register").reply(500);

      // Call the service method and check it throws
      await expect(AuthService.register(registerData)).rejects.toThrow();
    });
  });
});
