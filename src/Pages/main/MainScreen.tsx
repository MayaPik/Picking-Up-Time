import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { ParentScreen } from "./ParentScreen";
import { AdminScreen } from "./AdminScreen";
import { GuideScreen } from "./GuideScreen";
import { useStore } from "../../store";
import {
  Box,
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import "./mainscreen.css";

export const MainScreen: React.FC = () => {
  const user = useStore((state) => state.user);
  const usertype = useStore((state) => state.usertype);
  const server = useStore((state) => state.server);
  const setUser = useStore((state) => state.setUser);
  const setUsertype = useStore((state) => state.setUsertype);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);

  const handleLogout = async () => {
    try {
      await fetch(`${server}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser({});
      setIsLoggedIn(false);
      setUsertype(null);
    } catch (error) {
      console.error(error);
    }
  };

  const PageDisplay: React.FC = () => {
    if (usertype === "child") {
      return <ParentScreen />;
    } else if (usertype === "guide") {
      return <GuideScreen />;
    } else if (usertype === "admin") {
      return <AdminScreen />;
    } else {
      return <Navigate to="/" />;
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
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Button onClick={handleLogout}>SIGN OUT</Button>
      </div>
      <PageDisplay />
    </Box>
  );
};
