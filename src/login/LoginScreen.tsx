import React from "react";
import { UserTypePath } from "./UserTypePath";
import { FormOfLoginScreen } from "./FormOfLoginScreen";

interface LoginScreenProps {
  userType: string | null;
  setUserType: React.Dispatch<React.SetStateAction<any>>;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  userType,
  setUserType,
}) => {
  return (
    <div>
      <UserTypePath setUserType={setUserType} />
      <FormOfLoginScreen userType={userType} />
    </div>
  );
};
