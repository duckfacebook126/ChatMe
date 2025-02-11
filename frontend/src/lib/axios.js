import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"http://localhost:5001/api",
     withCredentials:true
});


// Creates an axios instance that will be reused fro send axios requests to backend