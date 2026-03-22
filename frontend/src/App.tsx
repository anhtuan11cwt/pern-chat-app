import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import background from "./assets/background.png";
import ProtectedRoute from "./components/layout/protected-route";
import { useSocketConnection } from "./customHooks/use-socket-connection";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  useSocketConnection();

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center bg-fixed"
      style={{
        backgroundColor: "#0f0a1a",
        backgroundImage: `url(${background})`,
      }}
    >
      <Toaster position="top-center" />
      <Routes>
        <Route element={<LoginPage />} path="/" />
        <Route element={<RegisterPage />} path="/register" />
        <Route
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
          path="/chat"
        />
      </Routes>
    </div>
  );
}

export default App;
