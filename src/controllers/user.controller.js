import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/APIerror.js";
import User from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/Cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import upload from "../middlewares/multer.middleware.js";
import path from "path";

// const registerUser = asyncHandler(async (req, res) => {
//     const { fullname, email, username, password } = req.body;
//     console.log("email", email);


//     if ([fullname, email, username, password].some(field => field?.trim() === "")) {
//         throw new ApiError(400, "All fields are required");
//     }

//     const existedUser = User.findOne({
//         $or :[{username},{email}]

//     })

//     if(existedUser){
//         throw new ApiError(409,"User with email or username already exists")
//     }
//        const avartarLocalPath = req.files?.avatar[0]?.path
//        const coverImageLocalPath = req.files?.coverImage[0]?.path;
//        path;


//        if(!avatarLocalPath){
//         throw new ApiError(400,"Avatar file is required")
//        }

//       const avatar = await uploadOnCloudinary(avatarLocalPath)
//       const uploadOnCloudinary = await uploadOnCloudinary(coverImageLocalPath);
//       (coverImageLocalPath)


//       if(!avatar){
//         throw new ApiError(400,"Avtar fie is required")
//       }
    
//     const user = await  User.create({
//          fullname,
//          avatar:avatar.url,
//          coverImage:coverImage?.url  || "",
//          email,
//          password,
//          username:username.toLowerCase(),
//       })
//  const createUser = await User.findById(user._id).select(
//     "-password -refreshToken "  
//  )


//  if(!createUser){
//     throw new ApiError(500,"Something went wrong while registering the user ")
//  }


// return res.status(201).json(
//     new ApiResponse(200,createdUser,"User registered Successfully")
// )

// });




const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, username, password } = req.body;
    console.log("email", email);

    if ([fullname, email, username, password].some(field => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    });

    const createUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createUser, "User registered Successfully")
    );
});

export {
    registerUser,
}