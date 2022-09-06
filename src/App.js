import { useEffect } from "react";
import "./App.css";
import { isLogedIn, signUpAdminUser } from "./utils/helpers";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  useEffect(() => {
    signUpAdminUser();
  }, []);

  // const authFunctions = (activity) => {
  //   switch (activity) {
  //     case "Signup":
  //       signUpUser(user);
  //       break;
  //     case "Login":
  //       logInUser(user);
  //       break;
  //     case "Logout":
  //       logOutUser();
  //       break;
  //   }
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 2000);
  // };

  const PrivateWrapper = () => {
    return isLogedIn() ? <Dashboard /> : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateWrapper />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="signup" element={<Signup />} />
      </Routes>
      <NotificationContainer />
    </div>
  );
}

export default App;
