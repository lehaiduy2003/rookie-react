/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import useAuthStore from "@/stores/authStore";
import RatingList from "@/pages/productDetail/components/rating/RatingList";
import { Rating } from "@/types/Rating";

// Mock các component con
jest.mock("@/pages/productDetail/components/rating/RatingItem", () => ({ rating }: any) => (
  <div>{rating.comment}</div>
));
jest.mock("@/pages/productDetail/components/rating/RatingSection", () => () => (
  <div>Mock RatingSection</div>
));

// Mock Zustand
jest.mock("@/stores/authStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseAuthStore = useAuthStore as unknown as jest.Mock;

describe("RatingList", () => {
  const ratings = [
    {
      id: 1,
      comment: "Great!",
      createdOn: new Date(),
      updatedOn: new Date(),
      score: 5,
      productId: 101,
      customer: {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        avatar: "/path/to/avatar.jpg",
        role: "CUSTOMER",
        memberTier: "VIP",
      },
    },
    {
      id: 2,
      comment: "Not bad",
      createdOn: new Date(),
      updatedOn: new Date(),
      score: 4,
      productId: 101,
      customer: {
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        avatar: "/path/to/avatar2.jpg",
        role: "CUSTOMER",
        memberTier: "COMMON",
      },
    },
  ] as Rating[];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows review form when user is CUSTOMER", () => {
    mockUseAuthStore.mockImplementation((fn) =>
      fn({ userDetail: { id: "123", role: "CUSTOMER" } })
    );

    render(<RatingList ratings={ratings} productId="101" />);

    expect(screen.getByText("Mock RatingSection")).toBeInTheDocument();
    expect(screen.getByText("Great!")).toBeInTheDocument();
    expect(screen.getByText("Not bad")).toBeInTheDocument();
  });

  test("shows message when user is not CUSTOMER", () => {
    mockUseAuthStore.mockImplementation((fn) => fn({ userDetail: { id: "123", role: "ADMIN" } }));

    render(<RatingList ratings={ratings} productId="101" />);

    expect(screen.getByText(/Please log in as a customer/i)).toBeInTheDocument();
    expect(screen.getByText("Great!")).toBeInTheDocument();
  });

  test("shows message when no ratings exist", () => {
    mockUseAuthStore.mockImplementation((fn) =>
      fn({ userDetail: { id: "123", role: "CUSTOMER" } })
    );

    render(<RatingList ratings={[]} productId="101" />);

    expect(screen.getByText(/No reviews yet/)).toBeInTheDocument();
  });

  test("shows fallback message when user is unauthenticated", () => {
    mockUseAuthStore.mockImplementation((fn) => fn({ userDetail: null }));

    render(<RatingList ratings={[]} productId="101" />);

    expect(screen.getByText(/Please log in as a customer/i)).toBeInTheDocument();
  });
});
