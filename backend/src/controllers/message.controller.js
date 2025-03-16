import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

//importing the message model
export const getUsersForSidebar=async (req,res)=>
    
    {


        try {
         const loggedInUserId =req.user._id;
         //get the logged in userId  

         const filteredUsers= await User.find({_id:{$ne:loggedInUserId }}).select("-password");
            //get all users except the currently logged in user

         res.status(200).json(filteredUsers);

        } 
        
        
        catch (error) {
            console.log("error from the getUsersForSidebar function",error);

            return res.status(500).json({message:"Internal Server Error"});
            
        }
        //catchr the eros

};



export const getMessages=async (req,res)=>
    {

        try {

            const {id:userToChatId}=req.params;
            //get the id of user to chat with from the paramaters

            const myId=req.user._id;
            //get the id of the logged in user

            const messages =await Message.find({
                $or:[
                    {senderId:myId, recieverId:userToChatId},
                    {senderId:userToChatId,recieverId:myId}
                ]
            });
            //find the  mesages in the messages collection with sender and reciever Id,
            //  or the reversed sender and receiver Id for messages of both sides 


            return res.status(200).json(messages);

            //send back ok response along withe the messages form the data base
            
        }
        
        catch(error) 
        {
            console.log("error from the getMessages function",error);

            return res.status(500).json({message:"Internal Server Error"});
            
        }



    }

    export const sendMessage=async (req,res)=>
        {
            try
            {
               const{text,image}=req.body;

               const {id:recieverId}=req.params;

               const senderId=req.user._id;

               let imageUrl;

               if(image)

               {
               const uploadResponse=await cloudinary.uploader.upload(image);
               //upload prfile pic to cloudinary cloud
               imageUrl =uploadResponse.secure_url;
               }


               const newMessage = new Message({

                senderId,
                recieverId,
                text,
                image:imageUrl
               });
                ///above function will create and store  he new message document inside the database
              
               await newMessage.save();

            

               //todo: realtime functionality using the Socket.io goes here
               
                return res.status(201).json({newMessage});
                //send new message stored inside the db as the response
                
            } 
            
            catch (error) {
                console.log("Error in the send Message controller backend",error.message);

            }

        }