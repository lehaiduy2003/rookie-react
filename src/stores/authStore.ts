import { create } from "zustand";
import { persist } from "zustand/middleware";
import CryptoJS from "crypto-js";
import { UserDetail } from "@/types/UserDetail";
import { VITE_ENCRYPTION_KEY } from "@/configs/env";

// You'll need to install crypto-js: npm install crypto-js
// And its types: npm install --save @types/crypto-js

// Secret key for encryption (ideally store this in environment variables)
const ENCRYPTION_KEY = VITE_ENCRYPTION_KEY;

// Store userId and role in localStorage
const saveUserPersistentData = (userId: string | null, role: string | null) => {
  if (userId && role) {
    localStorage.setItem("userId", userId);
    localStorage.setItem("userRole", role);
  } else {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
  }
};

// Get userId and role from localStorage
const getUserPersistentData = () => {
  return {
    userId: localStorage.getItem("userId"),
    role: localStorage.getItem("userRole"),
  };
};

interface AuthState {
  userId: string | null;
  userDetail: UserDetail | null;
  encryptedToken: string | null;
  isAuthenticated: boolean;
  login: (userId: string, userDetail: UserDetail, accessToken: string) => void;
  logout: () => void;
  getAccessToken: () => string | null;
  getRole: () => string | null;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userId: null,
      userDetail: null,
      encryptedToken: null,
      isAuthenticated: false,

      // Encrypt token during login
      login: (userId: string, userDetail: UserDetail, accessToken: string) => {
        const encryptedToken = CryptoJS.AES.encrypt(accessToken, ENCRYPTION_KEY).toString();

        // Save userId and role to localStorage
        saveUserPersistentData(userId, userDetail?.role || null);

        set({ userId, userDetail, encryptedToken, isAuthenticated: true });
      },

      logout: () => {
        // Clear localStorage items
        saveUserPersistentData(null, null);

        set({ userId: null, userDetail: null, encryptedToken: null, isAuthenticated: false });
      },

      // Decrypt token when needed
      getAccessToken: () => {
        const { encryptedToken } = get();
        if (!encryptedToken) return null;

        try {
          const bytes = CryptoJS.AES.decrypt(encryptedToken, ENCRYPTION_KEY);
          return bytes.toString(CryptoJS.enc.Utf8);
        } catch (error) {
          console.error("Failed to decrypt token:", error);
          return null;
        }
      },
      // Get user role from either state or localStorage
      getRole: () => {
        const { userDetail } = get();
        // First check if we have the role in state
        if (userDetail?.role) {
          return userDetail.role;
        }

        // If not in state, check localStorage as fallback
        return getUserPersistentData().role;
      },
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (name) => {
          const data = sessionStorage.getItem(name);
          return data === null ? null : JSON.parse(data);
        },
        setItem: (name, value) => sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
      // Only persist these specific state items
      partialize: (state) => ({
        userId: state.userId,
        userDetail: state.userDetail,
        encryptedToken: state.encryptedToken,
        isAuthenticated: state.isAuthenticated,
        login: state.login,
        logout: state.logout,
        getAccessToken: state.getAccessToken,
        getRole: state.getRole,
      }),
    }
  )
);

// Initialize userId from localStorage when the app starts
const persistedData = getUserPersistentData();
if (persistedData.userId && !useAuthStore.getState().isAuthenticated) {
  // If we have a userId but no authentication, update the userId in the store
  useAuthStore.setState({ userId: persistedData.userId });
}

export default useAuthStore;
