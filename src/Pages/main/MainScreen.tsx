import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ParentScreen } from "./ParentScreen";
import { AdminScreen } from "./AdminScreen";
import { GuideScreen } from "./GuideScreen";
import { useStore } from "../../store";

export const MainScreen: React.FC = () => {
  const navigate = useNavigate();
  const usertype = useStore((state) => state.usertype);
  const username = useStore((state) => state.username);
  const setUsertype = useStore((state) => state.setUsertype);
  const setUsername = useStore((state) => state.setUsername);
  const setUserid = useStore((state) => state.setUserid);

  useEffect(() => {
    if (localStorage.getItem("username")) {
      setUsername(localStorage.getItem("username"));
    }
    if (localStorage.getItem("usertype")) {
      setUsertype(localStorage.getItem("usertype"));
    }
    if (localStorage.getItem("userid")) {
      setUserid(Number(localStorage.getItem("userid")));
    }
  }, [username, usertype, setUsertype, setUsername, setUserid]);

  useEffect(() => {
    const checkUser = () => {
      if (!localStorage.getItem("username")) {
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
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div>
      <div className="dashboard">
        <p>
          signed in as {username}{" "}
          <button onClick={handleSignOut}>SIGN OUT</button>
        </p>
        <PageDisplay />
        <br />
      </div>
    </div>
  );
};
