import React, { useState, useRef } from "react";
import { ParentScreen } from "./ParentScreen";
import { AdminScreen } from "./AdminScreen";
import { GuideScreen } from "./GuideScreen";
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
      <div className="chip">
        <Chip
          icon={<FaceIcon />}
          label={`signed in as ${user.username}`}
          variant="outlined"
        />
        <Button onClick={handleClickOpen}>Change Password</Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Change Password"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your old password and the new one
            </DialogContentText>
            <TextField
              margin="normal"
              label="Old Password"
              type="text"
              fullWidth
              inputRef={oldPasswordRef}
            />
            <TextField
              margin="normal"
              label="New Password"
              type="password"
              fullWidth
              inputRef={newPasswordRef}
            />
            <Button onClick={handleChangePassword}>Change Password</Button>
            {message && message}
            {error && error}
          </DialogContent>
        </Dialog>
        <Button onClick={handleLogout}>SIGN OUT</Button>
      </div>
      <PageDisplay />
    </Box>
  );
};
