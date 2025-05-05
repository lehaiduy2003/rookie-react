import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute";
import useAuthStore from "@/stores/authStore";
import { RoleEnumSchema } from "@/enums/Role";

// Mock Zustand store
jest.mock("@/stores/authStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseAuthStore = useAuthStore as unknown as jest.Mock;

describe("PrivateRoute", () => {
  const TestComponent = () => <div>Test Component</div>;
  const LoginPage = () => <div>Login Page</div>;
  const HomePage = () => <div>Home Page</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("redirects to login page if user is not authenticated", () => {
    mockUseAuthStore.mockImplementation((selector) =>
      selector({
        isAuthenticated: false,
        getRole: () => null,
      })
    );

    render(
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute userRole={RoleEnumSchema.Enum.ADMIN}>
                <TestComponent />
              </PrivateRoute>
            }
          />
          <Route path="/auth/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText("Test Component")).not.toBeInTheDocument();
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("redirects to home page if user is authenticated but not authorized", () => {
    // Correctly mock the zustand store pattern
    mockUseAuthStore.mockImplementation((selector) =>
      selector({
        isAuthenticated: true,
        getRole: () => RoleEnumSchema.Enum.CUSTOMER,
      })
    );

    render(
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute userRole={RoleEnumSchema.Enum.ADMIN}>
                <TestComponent />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText("Test Component")).not.toBeInTheDocument();
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  test("renders children if user is authenticated and authorized", () => {
    // Correctly mock the zustand store pattern
    mockUseAuthStore.mockImplementation((selector) =>
      selector({
        isAuthenticated: true,
        getRole: () => RoleEnumSchema.Enum.ADMIN,
      })
    );

    render(
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute userRole={RoleEnumSchema.Enum.ADMIN}>
                <TestComponent />
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Test Component")).toBeInTheDocument();
  });
});
