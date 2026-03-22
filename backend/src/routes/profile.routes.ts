import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller";
import { upload } from "../middleware/upload";

const router = Router();

// GET /api/profile - Lấy thông tin profile của user đang đăng nhập
router.get("/", getProfile);

// PUT /api/profile - Cập nhật profile (name, bio, avatar)
router.put("/", upload.single("avatar"), updateProfile);

export default router;
