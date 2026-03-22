import { Navigate } from "react-router-dom";
import LoadingScreen from "@/components/ui/loading-screen";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // TODO: Replace with real auth check (e.g., authClient.useSession())
  // For now, we assume the user is authenticated if they navigated to /chat
  const isAuthenticated = true;
  const isPending = false;

  if (isPending) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate replace to="/" />;

  return <>{children}</>;
};

export default ProtectedRoute;
