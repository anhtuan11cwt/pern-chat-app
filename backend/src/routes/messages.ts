import { Router } from "express";
import { createMessage, getMessages } from "../controllers/message.controller";

const router = Router();

// POST / — Tạo tin nhắn mới
router.post("/", createMessage);

// GET /:conversationId — Lấy tin nhắn theo cuộc hội thoại
router.get("/:conversationId", getMessages);

export default router;
