import { FunctionComponent } from "react";
import { UserTypePath } from "./UserTypePath";
import { FormOfLoginScreen } from "./FormOfLoginScreen";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import kidsBackground from "../../Assests/Pictures/kidsBackground.png";
import "./login.css";

export const LoginScreen: FunctionComponent = () => {
  const navigate = useNavigate();

  const handleResetPasswordClick = () => {
    navigate("/resetpassword");
  };

  return (
    <div>
      <UserTypePath />
      <FormOfLoginScreen />
      <Button onClick={handleResetPasswordClick}>Reset Password</Button>
      <div className="kidsFlex">
        <img src={kidsBackground} alt="" className="kids" />
      </div>
    </div>
  );
};
