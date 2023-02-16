import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";

export const FormOfLoginScreen: React.FC = () => {
  const usertype = useStore((state) => state.usertype);
  // const username = useStore((state) => state.username);
  // const setUsername = useStore((state) => state.setUsername);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://mayo-final-project.herokuapp.com/api/login/${usertype}`,
        {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
    <div className="login__container">
      <h1>Hey {usertype} , please sign in</h1>
      <form onSubmit={handleSubmit} className="login__form">
        <label>User Name:</label>
        <br />
        <input
          required
          type="username"
          name="user"
          value={username ?? ""}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <br />
        <input
          required
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" className="loginBtn">
          Sign In
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};
