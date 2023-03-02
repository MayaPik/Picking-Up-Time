import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginScreen } from "./Pages/login/LoginScreen";
import { MainScreen } from "./Pages/main/MainScreen";
import { useStore } from "./store";
import "./App.css";

function App() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  // const user = useStore((state) => state.user);
  // const usertype = useStore((state) => state.usertype);
  // const navigate = useNavigate();
  const server = useStore((state) => state.server);
  const setUser = useStore((state) => state.setUser);
  const setUsertype = useStore((state) => state.setUsertype);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);

  useEffect(() => {
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
  }, [setUser, setUsertype, setIsLoggedIn, server]);

  useEffect(() => {
    const checkUserLoggedIn = () => {
      if (isLoggedIn && window.location.pathname === "/") {
        window.location.href = "/main";
      }
    };
    // const checkUserLoggedOut = () => {
    //   if (isLoggedIn === false && window.location.pathname !== "/") {
    //     window.location.href = "/";
    //   }
    // };
    checkUserLoggedIn();
    // checkUserLoggedOut();
  }, [isLoggedIn]);

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
