import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ParentScreen } from "./ParentScreen";
import { AdminScreen } from "./AdminScreen";
import { GuideScreen } from "./GuideScreen";
import { useStore } from "../../store";
import { Box, Chip, Button } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

export const MainScreen: React.FC = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const usertype = useStore((state) => state.usertype);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      setUser(JSON.parse(user));
    }
  }, [setUser]);

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
    <Box>
      <Chip
        icon={<FaceIcon />}
        label={`signed in as ${user.username}`}
        variant="outlined"
        sx={{ mr: "auto" }}
      />
      <Button onClick={handleSignOut}>SIGN OUT</Button>
      <PageDisplay />
    </Box>
  );
};
