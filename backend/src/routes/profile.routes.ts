import { type Request, type Response, Router } from "express";
import prisma from "../lib/prisma";
import { upload } from "../middleware/upload";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../services/cloudinary.service";
import { getServerSession } from "../services/getSession.service";

const router = Router();

// GET /api/profile — Lấy thông tin profile của user đang đăng nhập
router.get("/", async (req: Request, res: Response) => {
  try {
    const session = await getServerSession(req);
    if (!session?.user?.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await prisma.user.findUnique({
      select: { avatar: true, bio: true, id: true, name: true },
      where: { id: session.user.id },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/profile — Cập nhật profile (name, bio, avatar)
router.put(
  "/",
  upload.single("avatar"), // Multer xử lý file field tên "avatar"
  async (req: Request, res: Response) => {
    try {
      const session = await getServerSession(req);
      if (!session?.user?.id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const userId = session.user.id;
      const { bio, name } = req.body;

      // Kiểm tra user tồn tại
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!existingUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Giữ nguyên avatar cũ trừ khi có file mới
      let avatarUrl = existingUser.avatar;
      let avatarPublicId = existingUser.avatarPublicId;

      if (req.file) {
        // Xóa ảnh cũ trên Cloudinary nếu có
        if (existingUser.avatarPublicId) {
          await deleteFromCloudinary(existingUser.avatarPublicId);
        }

        // Upload ảnh mới
        const result = await uploadToCloudinary(req.file.buffer);
        avatarUrl = result.secure_url;
        avatarPublicId = result.public_id;
      }

      const updatedUser = await prisma.user.update({
        data: {
          ...(name && { name }),
          ...(bio !== undefined && { bio }),
          avatar: avatarUrl,
          avatarPublicId,
        },
        where: { id: userId },
      });

      res.status(200).json({ message: "Profile updated", user: updatedUser });
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  },
);

export default router;
