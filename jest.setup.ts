import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;

jest.mock("@/configs/env", () => ({
  VITE_ENCRYPTION_KEY: "mock-key",
  VITE_API_URL: "http://test-api.com/api",
}));

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(jest.fn());
  jest.spyOn(console, "log").mockImplementation(jest.fn());
  jest.spyOn(console, "warn").mockImplementation(jest.fn());
  jest.spyOn(console, "info").mockImplementation(jest.fn());
});
