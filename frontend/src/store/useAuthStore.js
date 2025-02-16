import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            set({ authUser: null });
            console.error("Auth check error:", error);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Signup failed";
            toast.error(errorMessage);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Login failed";
            toast.error(errorMessage);
            console.error("Login error:", error);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Logout failed";
            toast.error(errorMessage);
            console.error("Logout error:", error);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true }); // Set loading to true *before* the request

        try {
            console.log("try block running");
            const res = await axiosInstance.put("/auth/update-profile", data);
            console.log("the res from put request is",res);
            set({
                 authUser: res.data,
                 isUpdatingProfile:false

             });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error);
            // More robust error handling:
            if (error.response) {
                toast.error(error.response.data.message || "Profile update failed");
            } else if (error.request) {
                toast.error("No response from server"); // Network error
            } else {
                toast.error("An unexpected error occurred"); // Other error
            }
        } finally {
            console.log("finally blck running");
            set({ isUpdatingProfile: false }); // *Crucially*, set loading to false in *finally*
        }
    }
}));