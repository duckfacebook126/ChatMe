import dotenv from "dotenv";
//import the dotenv for acesing the environment variables
import jwt from "jsonwebtoken";
dotenv.config();
//configure the dot envimport jwt from "jsonwebtoken"

export const generateToken =(userId,res)=>{

    const token =jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });

    //signing the token 

    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure: process.env.NODE_ENV!=='development'
    });
    //storing the token in the cookies

    return token;
}
//generating the token above, with the usertId and the Secret key from tyhe env files
