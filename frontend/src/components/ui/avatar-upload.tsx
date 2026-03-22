interface AvatarUploadProps {
  onFileSelect: (file: File, previewUrl: string) => void;
  preview: string | null;
}

const AvatarUpload = ({ preview, onFileSelect }: AvatarUploadProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    onFileSelect(file, previewUrl);
  };

  return (
    <label className="flex flex-col items-center gap-3 cursor-pointer group">
      <div
        className="w-24 h-24 rounded-full bg-white/10 border-2 border-dashed border-white/20
          flex items-center justify-center overflow-hidden
          group-hover:border-violet-500/50 transition-colors"
      >
        {preview ? (
          <img
            alt="Xem trước ảnh đại diện"
            className="w-full h-full object-cover"
            src={preview}
          />
        ) : (
          <span className="text-gray-400 text-xs text-center px-2">
            Tải ảnh đại diện lên
          </span>
        )}
      </div>
      <input accept="image/*" hidden onChange={handleChange} type="file" />
    </label>
  );
};

export default AvatarUpload;
