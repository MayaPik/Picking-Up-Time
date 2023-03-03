import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LoginScreen } from "./Pages/login/LoginScreen";
import { MainScreen } from "./Pages/main/MainScreen";
import { useStore } from "./store";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const server = useStore((state) => state.server);
  const setUser = useStore((state) => state.setUser);
  const setUsertype = useStore((state) => state.setUsertype);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);

  const handleLogout = () => {
    fetch(`${server}/api/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        setUser({});
        setIsLoggedIn(false);
        setUsertype(null);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    try {
      fetch(`${server}/api/user`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((user) => {
          console.log(user);
          setUser(user);
          setIsLoggedIn(true);
          if (user.adminid) {
            setUsertype("admin");
          } else if (user.childid) {
            setUsertype("child");
          } else if (user.guideid) {
            setUsertype("guide");
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    }

    if (isLoggedIn && window.location.href !== "/main") {
      navigate("/main");
    }
  }, [setUser, setUsertype, setIsLoggedIn, server, isLoggedIn, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/main" element={<MainScreen onLogout={handleLogout} />} />
      </Routes>
    </>
  );
}

export default App;
