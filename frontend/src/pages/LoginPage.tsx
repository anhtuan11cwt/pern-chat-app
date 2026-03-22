import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoChatbubbles } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { authClient } from "@/lib/auth-client";
import { inputStyles } from "@/lib/constants";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data: session } = authClient.useSession();
  useEffect(() => {
    if (session) navigate("/chat");
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: result, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message as string);
        return;
      }

      if (result) {
        toast.success("Đăng nhập thành công!");
        navigate("/chat");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            Đăng nhập vào tài khoản của bạn và bắt đầu trò chuyện trong thời
            gian thực
          </p>
        </div>

        {/* Right: Form Card */}
        <form
          className="w-full max-w-sm bg-white/5 border border-white/20
            rounded-xl p-6 flex flex-col gap-5 shadow-xl backdrop-blur-xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-medium text-white">Chào mừng trở lại</h2>

          <div>
            <label
              className="block text-sm text-gray-300 mb-1.5"
              htmlFor="login-email"
            >
              Email
            </label>
            <input
              autoComplete="email"
              className={inputStyles}
              id="login-email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Địa chỉ email"
              required
              type="email"
              value={email}
            />
          </div>

          <div>
            <label
              className="block text-sm text-gray-300 mb-1.5"
              htmlFor="login-password"
            >
              Mật khẩu
            </label>
            <input
              autoComplete="current-password"
              className={inputStyles}
              id="login-password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              required
              type="password"
              value={password}
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
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <p className="text-sm text-center text-gray-400">
            Chưa có tài khoản?{" "}
            <button
              className="text-violet-400 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
              type="button"
            >
              Đăng ký
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
