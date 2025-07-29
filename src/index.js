// import dotenv from "dotenv";


// import mongoose from "mongoose";
// import {DB_NAME} from "./constants.js";
// import connectDB from "./db/index.js";
// dotenv.config({
//     path:"./env"
// });
// import express from "express";

// const app = express();

// (async () => {
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error ", (error) => {
//            console.error("Connection error:", error);
//            throw error;
//        });


//        app.listen(process.env.PORT,()=>{
//         console.log("App is listening on port ${process.env.PORT}");
        
//        })
//     } catch (error) {
//         console.error("MONGODB CONNECTION FAILED :", error);
//         throw error;
//     }
    
// })

import mongoose from "mongoose"
import {DB_NAME} from "./constants.js"
import e from "express";
import dotenv from "dotenv";
import { app } from "./app.js"; 


dotenv.config({ path: "./.env" });


const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connectes !! DB HOST ${connectionInstance.connection.host}`);
        
    } catch (error ) {
        console.log('MongoDB connection failed',error);
        process.exit(1); 
    }
}

console.log("server is running on port", process.env.PORT);



