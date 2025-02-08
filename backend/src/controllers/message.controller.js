import Message from "../models/message.model";

export const getUsersForSidebar=async (req,res)=>
    
    {


        try {
         const loggedInUserId =req.user._id;  

         const filteredUsers= await User.find({_id:{$ne:loggedInUserId }}).slect("-password");

         res.status(200).json(filteredUsers)

        } 
        
        
        catch (error) {
            console.log("error from the getUsersForSidebar function",error);

            returnres.status(500).json({message:"Internal Server Error"});
            
        }

};



export const getMessages=async (req,res)=>
    {

        try {

            const {id:userToChatId}=req.params;

            const myId=req.user._id;

            const messages =await Message.find({
                $or:[
                    {senderId:myId, recieverId:userToChatId},
                    {senderId:userToChatId,recieverId:myId}
                ]
            });


            res.status(200).json(messages);
            
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

               
                
            } 
            
            catch (error) {
                
            }

        }