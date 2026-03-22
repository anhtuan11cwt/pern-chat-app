import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import AvatarUpload from "@/components/ui/avatar-upload";
import { inputStyles } from "@/lib/constants";
import { useEditProfileStore } from "@/store/use-edit-profile-store";

const EditProfileModal = () => {
  const { isOpen, close } = useEditProfileStore();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const fetchProfile = async () => {
      // TODO: Replace with real API call
      setName("John Doe");
      setBio("Xin chào! Mình đang sử dụng ChatApp.");
      setAvatarPreview(null);
    };
    fetchProfile();
  }, [isOpen]);

  const handleProfileSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
    close();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        aria-label="Đóng hộp thoại"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
        onClick={close}
        type="button"
      />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-md bg-white/8 border border-white/20
          rounded-2xl p-6 shadow-2xl backdrop-blur-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Chỉnh sửa hồ sơ</h2>
          <button
            aria-label="Đóng"
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10
              transition-colors cursor-pointer"
            onClick={close}
            type="button"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleProfileSetup}>
          {/* Avatar Upload */}
          <div className="flex justify-center">
            <AvatarUpload
              onFileSelect={(_file: File, previewUrl: string) => {
                setAvatarPreview(previewUrl);
              }}
              preview={avatarPreview}
            />
          </div>

          {/* Name Input */}
          <div>
            <label
              className="block text-sm text-gray-300 mb-1.5"
              htmlFor="profile-name"
            >
              Họ và tên
            </label>
            <input
              className={inputStyles}
              id="profile-name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Họ và tên của bạn"
              type="text"
              value={name}
            />
          </div>

          {/* Bio Textarea */}
          <div>
            <label
              className="block text-sm text-gray-300 mb-1.5"
              htmlFor="profile-bio"
            >
              Tiểu sử
            </label>
            <textarea
              className={`${inputStyles} resize-none`}
              id="profile-bio"
              onChange={(e) => setBio(e.target.value)}
              placeholder="Hãy kể về bản thân bạn..."
              rows={3}
              value={bio}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-300
                hover:bg-white/5 transition-colors cursor-pointer"
              onClick={close}
              type="button"
            >
              Hủy
            </button>
            <button
              className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500
                hover:from-purple-600 hover:to-indigo-600
                disabled:opacity-50 disabled:cursor-not-allowed
                text-white font-medium transition-all cursor-pointer"
              disabled={loading}
              type="submit"
            >
              {loading ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
