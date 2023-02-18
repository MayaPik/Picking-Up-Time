import { FunctionComponent, useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";

export const FormOfLoginScreen: FunctionComponent = () => {
  const backend = useStore((state) => state.backend);
  const usertype = useStore((state) => state.usertype);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${backend}/api/${usertype}/login`, {
        method: "POST",
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
        localStorage.setItem("user", JSON.stringify(data.data.user));
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
      <Typography variant="h4">Hey {usertype}, please sign in</Typography>
      <Box
        component="form"
        onSubmit={handleForm}
        sx={{ display: "flex", flexDirection: "column", mt: 2 }}
      >
        <TextField
          label="User Name"
          name="username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ m: 5 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ m: 5 }}
        />
        <Button type="submit" variant="contained" sx={{ m: 5 }}>
          Sign In
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Box>
  );
};
