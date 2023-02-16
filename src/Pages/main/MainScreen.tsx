import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ParentScreen } from "./ParentScreen";
import { AdminScreen } from "./AdminScreen";
import { GuideScreen } from "./GuideScreen";
import { useStore } from "../../store";

export const MainScreen: React.FC = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const usertype = useStore((state) => state.usertype);
  const setUsertype = useStore((state) => state.setUsertype);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      setUser(JSON.parse(user));
    }
    if (localStorage.getItem("usertype")) {
      setUsertype(localStorage.getItem("usertype"));
    }
  }, [setUser, setUsertype]);

  useEffect(() => {
    const checkUser = () => {
      if (!localStorage.getItem("user")) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  const PageDisplay: React.FC = () => {
    if (usertype === "child") {
      return <ParentScreen />;
    } else if (usertype === "guide") {
      return <GuideScreen />;
    } else {
      return <AdminScreen />;
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("usertype");

    navigate("/");
  };

  return (
    <div>
      <div className="dashboard">
        <p>
          signed in as {user.username}{" "}
          <button onClick={handleSignOut}>SIGN OUT</button>
        </p>
        <PageDisplay />
        <br />
      </div>
    </div>
  );
};
