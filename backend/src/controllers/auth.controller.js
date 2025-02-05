import User from "../models/user.model.js"
import { generateToken } from "../lib/utils.js";
//imiport the user model here
import bcrypt from "bcryptjs"
//import bcrypt here

export const signup= async(req,res)=>{
    const{fullName,email,password}=req.body;

     try {

        if(password.length<6)
        {
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }
        //check fo password length
        
        const user= await User.findOne({email});
    
        if(user) return res.status(400).json({message:" This email is taken "})
            //check for email if already exists show an error

        const salt =await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,salt);
            //salt and hash the password

        const newUser =new User({
            fullName,
            email,
            password: hashedPassword
        })
        //create new user document withh all the attributes from the req body using the user model

        if(newUser){
            //generate the jwt token here
            generateToken(newUser._id,res)

            await newUser.save();

        }

        else{
            res.status(400).json({message:"Invalid User data Data"})
        }

    }
//    trying each signup usecase scenario 
    
    catch (error) {
        
    }
}

export const login=(req,res)=>{
    res.send("login route");

}

export const logout=(req,res)=>{
    res.send("logout route");

}

//  function that will handle the signup logic when the person clicks on thesignup button