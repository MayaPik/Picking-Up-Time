import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginScreen } from "./Pages/login/LoginScreen";
import { MainScreen } from "./Pages/main/MainScreen";
import { useStore } from "./store";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  useEffect(() => {
    const checkUser = () => {
      if (isLoggedIn && window.location.pathname === "/") {
        window.location.href = "/main";
      } else if (!isLoggedIn) {
        navigate("/");
      }
    };
    checkUser();
  }, [isLoggedIn, navigate]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/main" element={<MainScreen />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
