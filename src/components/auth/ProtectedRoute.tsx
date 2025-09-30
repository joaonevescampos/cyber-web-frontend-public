import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import Loading from "../modal/Loading";

export default function ProtectedRoute({ children }: any) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded)
    return (
      <main className="flex items-cente justify-center w-full h-screen">
        <Loading />
      </main>
    );

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
