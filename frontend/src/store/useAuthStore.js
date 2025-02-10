import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
export const useAuthStore = create((set)=>({
    authUser:null,

    isSigningUp:false,
    isLoggingIn:false,
    isUpdaingProfile:false,


    isCheckingAuth:true,

    checkAuth:async()=>{
        try {

            const res =await axiosInstance.get("/auth/check");
            set({authUser:res.data})
            
        } 
        
        catch (error) {
            set({authUser:null});

            console.log(error);
            
        }

        finally{

            set({isCheckingAuth:false});
        }
    },

    signup:async(data)=>{

    }
    
}));