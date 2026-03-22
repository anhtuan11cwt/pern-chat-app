import { useState } from "react";
import { IoChatbubbles } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { inputStyles } from "@/lib/constants";

const RegisterPage = () => {
  const [data, setData] = useState({ email: "", fullName: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Replace with real auth API
    await new Promise((resolve) => setTimeout(resolve, 800));

    setLoading(false);
    navigate("/chat");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl flex items-center justify-between gap-10 max-md:flex-col">
        {/* Left: Branding */}
        <div className="flex flex-col items-center text-center gap-3">
          <IoChatbubbles className="text-violet-500" size={80} />
          <h2 className="text-2xl lg:text-3xl font-semibold text-white">
            Ứng dụng Chat
          </h2>
          <p className="text-gray-400 text-sm max-w-xs">
            Tạo tài khoản và tham gia cuộc trò chuyện
          </p>
        </div>

        {/* Right: Form Card */}
        <form
          className="w-full max-w-sm bg-white/5 border border-white/20
            rounded-xl p-6 flex flex-col gap-5 shadow-xl backdrop-blur-xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-medium text-white">Tạo tài khoản</h2>

          <div>
            <label
              className="block text-sm text-gray-300 mb-1.5"
              htmlFor="register-name"
            >
              Họ và tên
            </label>
            <input
              autoComplete="name"
              className={inputStyles}
              id="register-name"
              name="fullName"
              onChange={handleChange}
              placeholder="Họ và tên"
              required
              type="text"
              value={data.fullName}
            />
          </div>

          <div>
            <label
              className="block text-sm text-gray-300 mb-1.5"
              htmlFor="register-email"
            >
              Email
            </label>
            <input
              autoComplete="email"
              className={inputStyles}
              id="register-email"
              name="email"
              onChange={handleChange}
              placeholder="Địa chỉ email"
              required
              type="email"
              value={data.email}
            />
          </div>

          <div>
            <label
              className="block text-sm text-gray-300 mb-1.5"
              htmlFor="register-password"
            >
              Mật khẩu
            </label>
            <input
              autoComplete="new-password"
              className={inputStyles}
              id="register-password"
              name="password"
              onChange={handleChange}
              placeholder="Mật khẩu"
              required
              type="password"
              value={data.password}
            />
          </div>

          <button
            className="mt-2 bg-gradient-to-r from-purple-500 to-indigo-500
              hover:from-purple-600 hover:to-indigo-600
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200 rounded-lg py-2.5 font-medium text-white cursor-pointer"
            disabled={loading}
            type="submit"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>

          <p className="text-sm text-center text-gray-400">
            Đã có tài khoản?{" "}
            <button
              className="text-violet-400 cursor-pointer hover:underline"
              onClick={() => navigate("/")}
              type="button"
            >
              Đăng nhập
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
