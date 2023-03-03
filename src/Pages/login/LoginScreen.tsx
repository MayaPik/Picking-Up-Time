import { FunctionComponent } from "react";
import { UserTypePath } from "./UserTypePath";
import { FormOfLoginScreen } from "./FormOfLoginScreen";
import kidsBackground from "../../Assests/Pictures/kidsBackground.png";
import "./login.css";

export const LoginScreen: FunctionComponent = () => {
  return (
    <div>
      <UserTypePath />
      <FormOfLoginScreen />
      <div className="kidsFlex">
        <img src={kidsBackground} alt="" className="kids" />
      </div>
    </div>
  );
};
