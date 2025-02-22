
import mongoose from "mongoose";
//import the mongoose

export const connectDB =async()=>{

    try{
        const conn =await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected:${conn.connection.host}`);
    }
    
    catch(error){
        
        console.log(`MongoDB connection error:${error}`);


    }

    //try catch block for getting the connectionto mongodb and checking fo rhe error



}

//connection to the mongo db database