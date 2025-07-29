import {Router} from "express"
import {registerUser} from "../controllers/user.controller.js"
import {upload} from "../middlewares/upload.js"


const router = Router();



router.route("register").post(
   upload.fields([
    {
        name:"avatar",
        maxcount:1
    },
    {
        name:"coverImage",
        maxcount:1
    }
   ]),
    registerUser
);

// router.post(
//   "/register",
//   upload.fields([
//     { name: "avatar", maxCount: 1 },
//     { name: "coverImage", maxCount: 1 }
//   ]),
//   registerUser
// );
export default router;