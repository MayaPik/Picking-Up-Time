import React from "react";
import { UserTypePath } from "./UserTypePath";
import { FormOfLoginScreen } from "./FormOfLoginScreen";

export const LoginScreen: React.FC = () => {
  return (
    <div>
      <UserTypePath />
      <FormOfLoginScreen />
    </div>
  );
};
