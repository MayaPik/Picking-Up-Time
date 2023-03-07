import React, { useState } from "react";
import { useStore } from "../store";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, TextField } from "@mui/material";
import kidsBackground from "../Assests/Pictures/kidsBackground.png";
import "./login/login.css";

export const ResetPassword: React.FC = () => {
  const server = useStore((state) => state.server);
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendVerificationCode = async () => {
    try {
      const response = await fetch(`${server}/send-verification-code`, {
        method: "POST",
        body: JSON.stringify({ phoneNumber }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setError("error");
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch(`${server}/reset-password`, {
        method: "POST",
        body: JSON.stringify({
          phoneNumber,
          verificationCode,
          newPassword,
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
    <>
      <Box className="dialog">
        <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
          Please enter your phone number to receive a verification code and
          reset your password.
        </Typography>
        <Box className="boxoftext">
          <TextField
            id="phone-number-input"
            label="Phone Number"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Box>
        <Box className="boxoftext">
          <Button onClick={handleSendVerificationCode}>
            Send Verification Code
          </Button>
        </Box>
        <Box className="boxoftext">
          <TextField
            id="verification-code-input"
            label="Verification Code"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </Box>
        <Box className="boxoftext">
          <TextField
            id="new-password-input"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Box>
        <Box className="boxoftext">
          <Button
            variant="contained"
            color="primary"
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </Box>
        {message && <Typography color="success">{message}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {message === "Password reset successfully." ? (
          <Box className="back">
            <Button variant="outlined" color="primary" onClick={handleGoBack}>
              Go Back To Login
            </Button>
          </Box>
        ) : (
          ""
        )}
      </Box>
      <div className="kidsFlex">
        <img src={kidsBackground} alt="" className="kids" />
      </div>
    </>
  );
};
