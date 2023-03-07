import { FunctionComponent, useState } from "react";
import { Alert, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import "./login.css";

export const FormOfLoginScreen: FunctionComponent = () => {
  const navigate = useNavigate();

  const server = useStore((state) => state.server);
  const usertype = useStore((state) => state.usertype);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${server}/api/${usertype}/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.message) {
        navigate("/main");
      } else {
        setError(data.error_message);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
    }
  };
  return (
    <Box sx={{ p: 2 }}>
      <h1 className="header">
        Hey {usertype === "child" ? "parent" : usertype}, please sign in
      </h1>
      <Box className="dialog" component="form" onSubmit={handleForm}>
        <TextField
          className="box"
          label="User Name Or Phone Number"
          name="username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          className="box"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button type="submit" variant="contained" sx={{ m: 3 }}>
          Sign In
        </Button>
        {error && usertype === null ? (
          <Alert severity="error">Please Choose a user type</Alert>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};
