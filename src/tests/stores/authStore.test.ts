import { VITE_ENCRYPTION_KEY } from "@/configs/env";
import useAuthStore from "@/stores/authStore";
import { UserDetail } from "@/types/UserDetail";
import CryptoJS from "crypto-js";

// Mocking sessionStorage
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.sessionStorage = mockSessionStorage as any;

describe("Auth Store", () => {
  const mockUserDetail: UserDetail = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    role: "ADMIN",
    bio: "This is a bio",
    address: "123 Main St",
    phoneNumber: "123-456-7890",
    createdOn: new Date(),
    updatedOn: new Date(),
    avatar: "avatar.png",
    dob: new Date(),
    memberTier: "COMMON",
    isActive: true,
    email: "example@mail.com",
  };

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test("login encrypts token and stores user data", () => {
    const accessToken = "test-access-token";

    // Call login action
    const login = useAuthStore.getState().login;
    login("user1", mockUserDetail, accessToken);

    const { userId, userDetail, encryptedToken, isAuthenticated } = useAuthStore.getState();

    // Test if the userId, userDetail, and encryptedToken are set
    expect(userId).toBe("user1");
    expect(userDetail).toEqual(mockUserDetail);
    expect(isAuthenticated).toBe(true);

    // Decrypt the token and check if it matches the original
    const bytes = CryptoJS.AES.decrypt(encryptedToken!, VITE_ENCRYPTION_KEY);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
    expect(decryptedToken).toBe(accessToken);
  });

  test("logout clears user data", () => {
    // Call logout action
    const logout = useAuthStore.getState().logout;
    logout();

    const { userId, userDetail, encryptedToken, isAuthenticated } = useAuthStore.getState();

    // Test if the user data is cleared
    expect(userId).toBeNull();
    expect(userDetail).toBeNull();
    expect(encryptedToken).toBeNull();
    expect(isAuthenticated).toBe(false);
  });

  test("getAccessToken decrypts token correctly", () => {
    const accessToken = "test-access-token";
    const encryptedToken = CryptoJS.AES.encrypt(accessToken, VITE_ENCRYPTION_KEY).toString();

    // Set the encrypted token in the store
    useAuthStore.setState({ encryptedToken });

    const getAccessToken = useAuthStore.getState().getAccessToken();

    // Check if the decrypted token matches the original accessToken
    expect(getAccessToken).toBe(accessToken);
  });

  test("getAccessToken returns null when no encryptedToken", () => {
    // Set the encrypted token as null
    useAuthStore.setState({ encryptedToken: null });

    const getAccessToken = useAuthStore.getState().getAccessToken();

    // Since there is no token, it should return null
    expect(getAccessToken).toBeNull();
  });

  test("getRole returns role from userDetail", () => {
    // Set userDetail in the store
    useAuthStore.setState({ userDetail: mockUserDetail });

    const getRole = useAuthStore.getState().getRole();

    // Check if the role is returned correctly
    expect(getRole).toBe(mockUserDetail.role);
  });

  test("getRole returns undefined when no userDetail", () => {
    // Set userDetail as null
    useAuthStore.setState({ userDetail: null });

    const getRole = useAuthStore.getState().getRole();

    // Since there's no userDetail, it should return undefined
    expect(getRole).toBeUndefined();
  });
});
