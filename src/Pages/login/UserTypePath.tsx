import { FunctionComponent } from "react";
import { useStore } from "../../store";
import { Stack, Button } from "@mui/material";
import "./login.css";
export const UserTypePath: FunctionComponent = () => {
  const setUsertype = useStore((state) => state.setUsertype);
  const usertype = useStore((state) => state.usertype);

  const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const userType = event.currentTarget.value;
    setUsertype(userType);
    localStorage.setItem("usertype", userType);
  };

  return (
    <Stack direction="row" spacing={2} className="buttons">
      <Button
        onClick={handleChange}
        variant={usertype === "child" ? "contained" : "outlined"}
        value="child"
      >
        Parent
      </Button>
      <Button
        onClick={handleChange}
        variant={usertype === "guide" ? "contained" : "outlined"}
        value="guide"
      >
        Guide
      </Button>
      <Button
        onClick={handleChange}
        variant={usertype === "admin" ? "contained" : "outlined"}
        value="admin"
      >
        Admin
      </Button>
    </Stack>
  );
};

export default UserTypePath;
