import { Navigate } from "react-router-dom";
import LoadingScreen from "@/components/ui/loading-screen";
import { authClient } from "@/lib/auth-client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <LoadingScreen />;
  if (!session) return <Navigate replace to="/" />;

  return <>{children}</>;
};

export default ProtectedRoute;
