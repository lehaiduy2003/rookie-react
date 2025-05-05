/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import AuthButtons from "@/components/AuthButtons";
import useAuthStore from "@/stores/authStore";

jest.mock("@/stores/authStore", () => ({
  __esModule: true,
  default: {
    getState: jest.fn(),
  },
}));

describe("AuthButtons component", () => {
  const getStateMock = useAuthStore.getState as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when unauthenticated", () => {
    beforeEach(() => {
      getStateMock.mockReturnValue({ isAuthenticated: false });
    });

    test("renders login and register buttons", () => {
      render(<AuthButtons />);
      expect(screen.getByText("Login")).toBeInTheDocument();
      expect(screen.getByText("Register")).toBeInTheDocument();
      expect(screen.queryByText("Profile")).not.toBeInTheDocument();
      expect(screen.queryByText("Logout")).not.toBeInTheDocument();
    });

    test("redirects to /auth/login when Login is clicked", () => {
      delete (window as any).location;
      (window as any).location = { href: "" };

      render(<AuthButtons />);
      fireEvent.click(screen.getByText("Login"));
      expect(window.location.href).toBe("/auth/login");
    });

    test("redirects to /auth/register when Register is clicked", () => {
      delete (window as any).location;
      (window as any).location = { href: "" };

      render(<AuthButtons />);
      fireEvent.click(screen.getByText("Register"));
      expect(window.location.href).toBe("/auth/register");
    });
  });

  describe("when authenticated", () => {
    const logoutMock = jest.fn();

    beforeEach(() => {
      getStateMock.mockReturnValue({
        isAuthenticated: true,
        logout: logoutMock,
      });

      Object.defineProperty(window, "location", {
        value: { reload: jest.fn() },
        writable: true,
      });
    });

    test("renders profile and logout buttons", () => {
      render(<AuthButtons />);
      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Logout")).toBeInTheDocument();
      expect(screen.queryByText("Login")).not.toBeInTheDocument();
      expect(screen.queryByText("Register")).not.toBeInTheDocument();
    });

    test("calls logout and reloads the page when Logout is clicked", () => {
      render(<AuthButtons />);
      fireEvent.click(screen.getByText("Logout"));
      expect(logoutMock).toHaveBeenCalled();
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});
