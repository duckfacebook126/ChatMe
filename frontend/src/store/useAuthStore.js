import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
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

        set({isSigningup:true});
        try{
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data});
            toast.success("Account Created sucessfully");
        }

        catch(error)
        {
            toast.error(error.response.data.message);
        }

        finally{
            set({siSigningup:flase});
        }

    },

    login:async(data)=>{
        set({isLoggingIn:true});
        
        try{
            const res =await axiosInstance.post("/auth/login",data);
            set({authUser:res.data});
            toast.success("Logged In sucessfully")


        }

        catch(error)
        {

            set({isLoggingIn:false});
            console.log(error);
        }


    },

    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out succssfully");

            
        } 
        
        catch (error) {
            toast.error(error.response.data.message);
        }

    }
    
}));