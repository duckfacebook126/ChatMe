import {Server} from "socket.io";
import http from "http";
import  express from "express";


const app= express();
//creating an express object to initialize the app
const server = http.createServer(app);//creating a http server
//  that will redirect the incoming request to the express app

const io =new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    },
});
//new socket IO server object is created


io.on("connection",(socket)=>{

    console.log("A user is connected",socket.id);

    socket.on("disconnect",()=>{
        console.log("A user is Disconnected",socket.id);
    });
});

//this will intantiate the acove scket io server and will listen to the connection event
//and will log the user connected and disconnected

export  {io,app,server};
//this file is just an aditoinal layer to the server js of sockect io for relatime 
//messagibg and the response
