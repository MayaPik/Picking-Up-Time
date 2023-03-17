import { FunctionComponent } from "react";
import { UserTypePath } from "./UserTypePath";
import { FormOfLoginScreen } from "./FormOfLoginScreen";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../Components/Navbar";
import kidsBackground from "../../Assests/Pictures/kidsBackground.png";
import { useStore } from "../../store";

import "./login.css";

export const LoginScreen: FunctionComponent = () => {
  const navigate = useNavigate();
  const language = useStore((state) => state.language);

  const handleResetPasswordClick = () => {
    navigate("/resetpassword");
  };

  return (
    <div>
      <Navbar />
      <UserTypePath />
      <FormOfLoginScreen />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          sx={{ m: 1 }}
          onClick={handleResetPasswordClick}
        >
          {language === "eng" ? " Reset Password" : "איפוס סיסמא"}
        </Button>
      </Box>
      <div className="kidsFlex">
        <img src={kidsBackground} alt="" className="kids" />
      </div>
    </div>
  );
};
