import React, { useState, useRef } from "react";
import { ParentScreen } from "./ParentScreen";
import { AdminScreen } from "./AdminScreen";
import { GuideScreen } from "./GuideScreen";
import { Navbar } from "../../Components/Navbar";
import { useStore } from "../../store";
import {
  Box,
  Chip,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
  TextField,
  Typography,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import "./mainscreen.css";
interface props {
  onLogout: () => void;
}

export const MainScreen: React.FC<props> = ({ onLogout: handleLogout }) => {
  const user = useStore((state) => state.user);
  const usertype = useStore((state) => state.usertype);
  const server = useStore((state) => state.server);
  const language = useStore((state) => state.language);

  const PageDisplay: React.FC = () => {
    if (usertype === "child") {
      return <ParentScreen />;
    } else if (usertype === "guide") {
      return <GuideScreen />;
    } else if (usertype === "admin") {
      return <AdminScreen />;
    } else {
      return <div>You are not authorized</div>;
    }
  };

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  const handleChangePassword = async () => {
    try {
      const oldPasswordValue = oldPasswordRef.current?.value;
      const newPasswordValue = newPasswordRef.current?.value;
      const response = await fetch(`${server}/change-password`, {
        method: "POST",
        body: JSON.stringify({
          user_id: user.user_id,
          oldPassword: oldPasswordValue,
          newPassword: newPasswordValue,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setError("error");
    }
  };

  return (
    <Box>
      <Navbar />
      <div className="chip">
        <Chip
          icon={<FaceIcon />}
          label={
            language === "eng"
              ? `signed in as ${user.username}`
              : `מחובר כ${user.username}`
          }
          variant="outlined"
        />
        <Button onClick={handleClickOpen}>Change Password</Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          className="dialog"
        >
          <DialogTitle id="responsive-dialog-title">
            <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
              {language === "eng" ? "Change Password" : "שינוי סיסמא"}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ textAlign: "center" }}>
              {language === "eng"
                ? "Please enter your old password and the new one"
                : "הכנס סיסמא חדשה וסיסמא ישנה"}
            </DialogContentText>
            <Box className="boxoftext">
              <TextField
                margin="normal"
                label={language === "eng" ? "Old Password" : " סיסמא ישנה"}
                type="password"
                fullWidth
                inputRef={oldPasswordRef}
              />
            </Box>
            <Box className="boxoftext">
              <TextField
                margin="normal"
                label={language === "eng" ? "New Password" : " סיסמא חדשה"}
                type="password"
                fullWidth
                inputRef={newPasswordRef}
              />
            </Box>
            <Box className="boxoftext">
              <Button
                variant="contained"
                color="primary"
                onClick={handleChangePassword}
              >
                {language === "eng" ? "Change Password" : "שינוי סיסמא"}
              </Button>
              <br />
              {message && <span className="textCenter"> {message}</span>}
              {error && <span className="textCenter">{error}</span>}
            </Box>
          </DialogContent>
        </Dialog>
        <Button onClick={handleLogout}>
          {" "}
          {language === "eng" ? "SIGN OUT" : "התנתקות"}
        </Button>
      </div>
      <PageDisplay />
    </Box>
  );
};
