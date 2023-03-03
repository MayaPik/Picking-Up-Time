import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginScreen } from "./Pages/login/LoginScreen";
import { MainScreen } from "./Pages/main/MainScreen";
import { useStore } from "./store";
import "./App.css";

function App() {
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
  }, [setUser, setUsertype, setIsLoggedIn, server, isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/main" element={<MainScreen onLogOut={handleLogout} />} />
      </Routes>
    </Router>
  );
}

export default App;
