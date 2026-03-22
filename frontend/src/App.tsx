import { Route, Routes } from "react-router-dom";
import background from "./assets/background.png";
import ProtectedRoute from "./components/layout/protected-route";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center bg-fixed"
      style={{
        backgroundColor: "#0f0a1a",
        backgroundImage: `url(${background})`,
      }}
    >
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
