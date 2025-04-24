import "@testing-library/jest-dom";

jest.mock("@/configs/env", () => ({
  VITE_ENCRYPTION_KEY: "mock-key",
  VITE_API_URL: "http://localhost:8081/api",
}));
