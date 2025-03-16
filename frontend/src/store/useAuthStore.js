import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client";

const baseURL="http://localhost:5001";
export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers:[],
    sockect:null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket();
            //CONNECT TO THE SOCKET AFETR CHECKING AUTH afetr every rerender

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
            get().connectSocket();
            //CONNECT TO SOCKECT AFETR SIGNUP
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

            get().connectSocket();
            //CONNECT TO THE SOCKET AFTER LOGING IN
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
            get().disconnectSocket();
            //DISCONNECT THE SOCKET AFTER LOGOUT
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
            console.log("finally block running");
            set({ isUpdatingProfile: false }); // *Crucially*, set loading to false in *finally*
        }
    },
    setSelectedUser:()=>set({selectedUser}),

    connectSocket:()=>{
        const{authUser}=get();
        if(!authUser || get().socket?.connected) return;
        const socket= io(baseURL);

        socket.connect();
        set({socket});
    },


    disconnectSocket:()=>{
        if(get().socket?.connected) get().socket.disconnect();
        //if sockect is connected only then only disconnect
    }

}));