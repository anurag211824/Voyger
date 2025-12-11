
import { getMessage, sendMessage } from "../controllers/message.js";
import { verifyJWT } from "../middleware/auth.js";
import express from "express"
const router = express.Router()

router.post("/send",verifyJWT,sendMessage)
router.get("/chat-message",verifyJWT,getMessage)
export default router;