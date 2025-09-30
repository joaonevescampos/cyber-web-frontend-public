import { useAuth, useClerk } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const LogoutButton: React.FC = () => {
  const { signOut } = useClerk();
  const { isSignedIn } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Erro to logout:", error);
    }
  };

  return (
    <div className="absolute bottom-[-45px] right-0">
      {isSignedIn ? (
        <button
          className="border-1 px-8 py-2 cursor-pointer text-red-800 bg-white"
          onClick={handleLogout}
        >
          Sair
        </button>
      ) : (
        <Link to="/sign-in">
          <button className="border-1 px-8 py-2 cursor-pointer bg-white">
            Entrar
          </button>
        </Link>
      )}
    </div>
  );
};

export default LogoutButton;
