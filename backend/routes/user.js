import { getCurrentUser, loginUser, registerUser } from "../controllers/user.js";
import { verifyJWT } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js"
import express from "express"
const router = express.Router()

router.post("/register",upload.single("avatar"),registerUser)
router.post("/login",loginUser);
router.get('/get-user',verifyJWT,getCurrentUser)




export default router;