import User from "../models/user.model.js"
import { generateToken } from "../lib/utils.js";
//imiport the user model here
import bcrypt from "bcryptjs"
//import bcrypt here

export const signup= async(req,res)=>{
    const{fullName,email,password}=req.body;

     try {

        if(!fullName||!email||!password)
        {
            return res.status(400).json({message:"all fileds are required"})

        }

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
            generateToken(newUser._id,res);

            await newUser.save();
            //saved the created user in db
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                ProfilePic:newUser.ProfilePic
            });

        }

        else{
            res.status(400).json({message:"Invalid User data Data"});
        }

    }
//    trying each signup usecase scenario 
    
    catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
        
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
try {
    const user =await User.findOne({email});
    if(!user)
    {
        return res.status(400).json({measage:"invalid credentilas"});
    }

    

    const isPasswordCorrect=await bcrypt.compare(password,user.password);
    if(isPasswordCorrect)
    {

    }

    
    

} 

catch (error) {
    
}
}

export const logout=(req,res)=>{
    res.send("logout route");

}

//  function that will handle the signup logic when the person clicks on thesignup button