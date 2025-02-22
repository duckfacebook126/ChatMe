import mongoose from "mongoose";

import User from "./user.model.js";

//crete a message schema based on the User model it wil have object tha is the document structure and that objects are called fileds of the doucments
//these objects will have attributes which will have values and which will act as the fields attributes, the tiemstamps true
// will make sure that the wit displays the date alomg side each document
const messageSchema =new mongoose.Schema(

    {
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },

        recieverId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },

        text:{
            type:String
            
        },

        image:{

            type:String
        }
    },

    {timestamps: true}
);

const Message =mongoose.model("Message",messageSchema);
//here create a model based on teh Message schema
export default Message;

//message model for the users