import React, { useState } from "react";
import { useStore } from "../store";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

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
    <Box>
      <h2>
        Please enter your phone number to receive a verification code and reset
        your password.
      </h2>
      <label>
        Phone Number:
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <Button onClick={handleSendVerificationCode}>
        Send Verification Code
      </Button>
      <br />
      <br />
      <label>
        Verification Code:
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        New Password:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <br />
      <br />
      <Button onClick={handleResetPassword}>Reset Password</Button>
      {message && message}
      {error && error}
      {message ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 2,
            alignItems: "center",
          }}
        >
          <Button variant="outlined" sx={{ m: 3 }} onClick={handleGoBack}>
            Go Back To Login
          </Button>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};
