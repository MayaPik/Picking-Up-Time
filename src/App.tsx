import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginScreen } from "./Pages/login/LoginScreen";
import { MainScreen } from "./Pages/main/MainScreen";
import { useStore } from "./store";
import "./App.css";

function App() {
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
