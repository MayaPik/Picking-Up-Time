import React from "react";

interface UserTypePathProps {
  setUserType: React.Dispatch<React.SetStateAction<any>>;
}

export const UserTypePath: React.FC<UserTypePathProps> = ({ setUserType }) => {
  const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (event.currentTarget.value === "admin") {
      setUserType("admin");
    } else if (event.currentTarget.value === "child") {
      setUserType("child");
    } else {
      setUserType("guide");
    }
  };

  return (
    <div>
      <button onClick={handleChange} value="parent">
        parent
      </button>
      <button onClick={handleChange} value="child">
        child
      </button>
      <button onClick={handleChange} value="admin">
        admin
      </button>
    </div>
  );
};
