import multer from "multer";

// Dùng memory storage — file được giữ trong RAM dạng Buffer
// để truyền thẳng lên Cloudinary, không lưu disk
const storage = multer.memoryStorage();

export const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // Giới hạn 5MB
  },
  storage,
});
