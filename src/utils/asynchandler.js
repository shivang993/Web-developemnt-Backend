// const ayncHandler = (fn)=> async (req,res,next)=>{
//    try {
//     await fn(req,res,next);
//    } catch (error) {
//     res.status(error.code || 500).json({
//   success:false,
//   message:error.message
//     }) }
// }

// import { asyncHandler } from "../utils/asynchandler.js";

const asyncHandler = (requesthandler) =>{
   return (req, res, next) => {
        return Promise.resolve(requesthandler(req, res, next)).catch((err) => next(err))
}
}
export {asyncHandler}