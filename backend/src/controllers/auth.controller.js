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
        //create new user document withh all the attributes from the req body using the new user model Instance

        if(newUser){
            //generate the jwt token here
            generateToken(newUser._id,res);

            await newUser.save();
            //saved the created user in db
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                profilePic:newUser.profilePic
            });
            //send the sucessful esponse back to the server with

        }

        else{
            res.status(400).json({message:"Invalid User Data"});
        }

    }
//    trying each signup usecase scenario 
    
    catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
        
    }
    //print and send the errror  as the response
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
    //compare db and input password hashes and also retrn true if they match

    if(!isPasswordCorrect)
    {
        res.status(400).json({message:"Invalid Credentials"});
    }

    generateToken(user._id,res);
    //will generate a cookie for the user with valid credentials

    res.status(200).json({
        _id:user._id,
        fullName:user._fullName,
        email:user.email,
        profilePic:user.profilePic
    })
//sending the response back to the frontend with the user data

    
    

} 

catch (error) {

    console.log(error);

    res.status(500).json({message:"Internal server Error"});

}


}

export const logout=(req,res)=>{

try {

res.cookie("jwt","",{maxAge:0});
//clear the cooie with the jwt token

res.status(200).json({message:"Logged out Successfuly"});

} 

catch (error)
 {

    console.log(error);

    res.status(500).json({message:"Internal Server Error"});
    
}



}

export const updateProfile=async(req,res)=>{
    try {
        
        const{profilePic}=req.body;
            //get the profile pic from the req body
        const userId =req.user._id;

        if(!profilePic)
        {
            return res.status(400).json({message:"Profile Pic is Required"});


        }

        const uploadResponse=await cloudinary.uploader.upload(profilePic);
        //upload prfile pic to cloudinary cloud
 
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});
        //update the user profile pic in the db
    } 
    
    catch (error) {

        console.log("Error in the pic updating backend function:",error);


        return res.status(500).json({message:"Internal Server Error "});



    }

}

export const checkAuth= (req,res)=>
{
    try{

        res.status(200).json(req.user);
    }
    
    catch(error){
        console.log("The error incheckAuth backend controller:",error);

        return res.status(500).json({message:"INternal Server Error"});


    }

}


//  function that will handle the signup logic when the person clicks on thesignup button