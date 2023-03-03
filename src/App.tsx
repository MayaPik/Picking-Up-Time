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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${server}/api/user`, {
          credentials: "include",
        });
        const user = await response.json();
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [setUser, setUsertype, setIsLoggedIn, server, isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/main" element={<MainScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
