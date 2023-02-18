import { FunctionComponent } from "react";
import { UserTypePath } from "./UserTypePath";
import { FormOfLoginScreen } from "./FormOfLoginScreen";

export const LoginScreen: FunctionComponent = () => {
  return (
    <div>
      <UserTypePath />
      <FormOfLoginScreen />
    </div>
  );
};
