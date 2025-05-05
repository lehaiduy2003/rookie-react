import MockAdapter from "axios-mock-adapter";
import { VITE_API_URL } from "@/configs/env";
import refreshToken from "@/configs/refreshTokenHandler";
import axios from "axios";

const mock = new MockAdapter(axios);

describe("RefreshTokenHandler", () => {
  afterEach(() => {
    mock.reset();
  });

  test("should refresh token successfully", async () => {
    const mockResponse = {
      accessToken: "newAccessToken",
    };

    mock.onGet(`${VITE_API_URL}/v1/auth/refresh`).reply(200, mockResponse);
    const response = await refreshToken();

    expect(response).toEqual(mockResponse);

    const request = mock.history.get[0];
    expect(request.withCredentials).toBe(true);
    expect(response);
  });

  test("should handle error when refreshing token", async () => {
    mock.onGet(`${VITE_API_URL}/v1/auth/refresh`).reply(500, { message: "Internal Server Error" });

    await expect(refreshToken()).rejects.toThrow("Request failed with status code 500");
  });
});
