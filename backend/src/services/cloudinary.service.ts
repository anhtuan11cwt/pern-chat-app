import cloudinary from "../lib/cloudinary";

// Upload buffer lên Cloudinary, trả về URL và publicId
export const uploadToCloudinary = (
  buffer: Buffer,
): Promise<{ secure_url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "chatapp-tutorial",
        format: "webp", // Tự động convert sang WebP để tối ưu
        transformation: [{ crop: "fill", height: 400, width: 400 }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as { secure_url: string; public_id: string });
      },
    );
    uploadStream.end(buffer);
  });
};

// Xóa ảnh cũ khỏi Cloudinary dựa trên publicId
export const deleteFromCloudinary = async (publicId: string) => {
  await cloudinary.uploader.destroy(publicId);
};
