import MockAdapter from "axios-mock-adapter";
import api from "@/configs/axios";
import useAuthStore from "@/stores/authStore";
import * as refreshTokenModule from "@/configs/refreshTokenHandler";

// Mock the refreshToken module
jest.mock("@/configs/refreshTokenHandler", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the Zustand auth store
jest.mock("@/stores/authStore", () => ({
  __esModule: true,
  default: {
    getState: jest.fn(),
  },
}));

describe("Axios Interceptor", () => {
  let mock: MockAdapter;
  const refreshTokenMock = refreshTokenModule.default as jest.Mock;
  const getStateMock = useAuthStore.getState as jest.Mock;

  beforeEach(() => {
    mock = new MockAdapter(api);
    jest.clearAllMocks();
  });

  afterEach(() => {
    mock.reset();
  });

  describe("Request Interceptor", () => {
    test("attaches Authorization header when token exists", async () => {
      getStateMock.mockReturnValue({
        getAccessToken: () => "valid-token",
      });

      mock.onGet("/test").reply((config) => {
        expect(config.headers?.Authorization).toBe("Bearer valid-token");
        return [200, { ok: true }];
      });

      const response = await api.get("/test");
      expect(response.status).toBe(200);
      expect(response.data).toEqual({ ok: true });
    });

    test("does not attach Authorization header when no token", async () => {
      getStateMock.mockReturnValue({
        getAccessToken: () => null,
      });

      mock.onGet("/test").reply((config) => {
        expect(config.headers?.Authorization).toBeUndefined();
        return [200, { ok: true }];
      });

      const response = await api.get("/test");
      expect(response.status).toBe(200);
      expect(response.data).toEqual({ ok: true });
    });
  });

  describe("Response Interceptor", () => {
    test("passes through successful response", async () => {
      getStateMock.mockReturnValue({
        getAccessToken: () => "valid-token",
      });

      mock.onGet("/success").reply(200, { message: "success" });

      const response = await api.get("/success");
      expect(response.status).toBe(200);
      expect(response.data).toEqual({ message: "success" });
    });

    test("refreshes token on 401 and retries request", async () => {
      const loginMock = jest.fn();
      getStateMock.mockReturnValue({
        getAccessToken: () => "expired-token",
        userId: "123",
        userDetail: { id: "123", name: "User" },
        login: loginMock,
        logout: jest.fn(),
      });

      // First call fails with 401
      mock.onGet("/protected").replyOnce(401);
      // Then refresh token is successful
      refreshTokenMock.mockResolvedValue({ accessToken: "new-token" });
      // Retry request succeeds
      mock.onGet("/protected").replyOnce(200, { secure: true });

      const response = await api.get("/protected");
      expect(response.status).toBe(200);
      expect(response.data).toEqual({ secure: true });
      expect(refreshTokenMock).toHaveBeenCalledTimes(1);
      expect(loginMock).toHaveBeenCalledWith("123", { id: "123", name: "User" }, "new-token");
    });

    test("queues requests during token refresh and retries them after success", async () => {
      const loginMock = jest.fn();
      const logoutMock = jest.fn();

      getStateMock.mockReturnValue({
        getAccessToken: () => "expired-token",
        userId: "123",
        userDetail: { id: "123", name: "User" },
        login: loginMock,
        logout: logoutMock,
      });

      mock.onGet("/a").replyOnce(401);
      mock.onGet("/b").replyOnce(401);
      mock.onGet("/a").replyOnce(200, { result: "A_OK" });
      mock.onGet("/b").replyOnce(200, { result: "B_OK" });

      // Only 1 refresh call
      refreshTokenMock.mockResolvedValue({ accessToken: "new-token" });

      const promiseA = api.get("/a");
      const promiseB = api.get("/b");

      const [resA, resB] = await Promise.all([promiseA, promiseB]);

      expect(resA.data).toEqual({ result: "A_OK" });
      expect(resB.data).toEqual({ result: "B_OK" });
      expect(refreshTokenMock).toHaveBeenCalledTimes(1);
    });

    test("logs out if refresh token fails", async () => {
      const logoutMock = jest.fn();
      getStateMock.mockReturnValue({
        getAccessToken: () => "expired-token",
        userId: "123",
        userDetail: { id: "123", name: "User" },
        login: jest.fn(),
        logout: logoutMock,
      });

      mock.onGet("/fail").replyOnce(401);
      refreshTokenMock.mockRejectedValueOnce(new Error("Refresh failed"));

      await expect(api.get("/fail")).rejects.toThrow("Refresh failed");

      expect(refreshTokenMock).toHaveBeenCalledTimes(1);
      expect(logoutMock).toHaveBeenCalledTimes(1);
    });

    test("rejects non-401 errors immediately", async () => {
      getStateMock.mockReturnValue({
        getAccessToken: () => "valid-token",
      });

      mock.onGet("/error").reply(500, { error: "Server error" });

      await expect(api.get("/error")).rejects.toMatchObject({
        response: {
          status: 500,
          data: { error: "Server error" },
        },
      });

      expect(refreshTokenMock).not.toHaveBeenCalled();
    });

    test("does not retry if request already retried once", async () => {
      getStateMock.mockReturnValue({
        getAccessToken: () => "expired-token",
        userId: "123",
        userDetail: { id: "123" },
        login: jest.fn(),
        logout: jest.fn(),
      });

      const configWithRetry = {
        url: "/retry",
        method: "get",
        _retry: true,
      };

      mock.onGet("/retry").reply(401);

      await expect(api(configWithRetry)).rejects.toMatchObject({
        response: {
          status: 401,
        },
      });

      expect(refreshTokenMock).not.toHaveBeenCalled();
    });
  });
});
