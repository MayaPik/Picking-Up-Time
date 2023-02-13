import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface LoginScreenProps {
  userType: string | null;
  username: string | null;
}

export const MainScreen: React.FC<LoginScreenProps> = ({
  userType,
  username,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      if (!localStorage.getItem("email")) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("email");
    navigate("/");
  };
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <h3>Only the cool kids get here :)</h3>
      <br></br>
      <button className="signOutBtn" onClick={handleSignOut}>
        SIGN OUT
      </button>
    </div>
  );
};
