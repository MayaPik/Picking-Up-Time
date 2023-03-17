import { FunctionComponent } from "react";
import { useStore } from "../../store";
import { Stack, Button } from "@mui/material";
import "./login.css";

export const UserTypePath: FunctionComponent = () => {
  const usertype = useStore((state) => state.usertype);
  const setUsertype = useStore((state) => state.setUsertype);
  const language = useStore((state) => state.language);

  const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const userType = event.currentTarget.value;
    setUsertype(userType);
  };

  return (
    <Stack direction="row" spacing={2} className="buttons">
      <Button
        onClick={handleChange}
        variant={usertype === "child" ? "contained" : "outlined"}
        value="child"
      >
        {language === "eng" ? "Parent" : "הורה"}
      </Button>
      <Button
        onClick={handleChange}
        variant={usertype === "guide" ? "contained" : "outlined"}
        value="guide"
      >
        {language === "eng" ? "Guide" : "מדריכ/ה"}
      </Button>
      <Button
        onClick={handleChange}
        variant={usertype === "admin" ? "contained" : "outlined"}
        value="admin"
      >
        {language === "eng" ? "Admin" : "מנהל/ת"}
      </Button>
    </Stack>
  );
};

export default UserTypePath;
