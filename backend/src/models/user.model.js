import mongoose from "mongoose"
//create a user  mdoel that will deifine the user document structure and the user document atributes
const userSchema = new  mongoose.Schema(

      {
        email:{
            type:String,
            required: true,
            unique: true,
        },
        fullName:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
            minlength:6,

        },
        profilePic:{
            type:String,
            required:false,
            defualt:"",

        }




      },
      {timestamps:true}


);

const User = mongoose.model("User",userSchema);
//User model basde on the user schema
export default User;