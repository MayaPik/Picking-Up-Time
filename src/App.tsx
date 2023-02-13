import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginScreen } from "./login/LoginScreen";
import { MainScreen } from "./main/MainScreen";
import "./App.css";

function App() {
  const [userType, setUserType] = useState("parent");
  const [username, setUsername] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LoginScreen userType={userType} setUserType={setUserType} />
          }
        />
        <Route
          path="/main"
          element={<MainScreen userType={userType} username={username} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
