import React from "react";
import { useStore } from "../../store";

export const UserTypePath: React.FC = () => {
  const setUsertype = useStore((state) => state.setUsertype);

  const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.value === "admin") {
      setUsertype("admin");
      localStorage.setItem("usertype", "admin");
    } else if (event.currentTarget.value === "child") {
      setUsertype("child");
      localStorage.setItem("usertype", "child");
    } else {
      setUsertype("guide");
      localStorage.setItem("usertype", "guide");
    }
  };

  return (
    <div>
      <button onClick={handleChange} value="child">
        child
      </button>
      <button onClick={handleChange} value="guide">
        guide
      </button>
      <button onClick={handleChange} value="admin">
        admin
      </button>
    </div>
  );
};
