import { Router } from "express";
import { createOrGetConversation } from "../controllers/conversation.controller";

const router = Router();

router.post("/:userId", createOrGetConversation);

export default router;
