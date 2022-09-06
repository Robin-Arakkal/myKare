import { useEffect } from "react";
import { isLogedIn, logOutUser } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const res = logOutUser();
    if (res.status) {
      navigate("/login");
    }
  };
  return (
    <div className="Layout">
      <nav className="header">
        {isLogedIn() && (
          <button className="logout-btn" onClick={() => handleLogout()}>
            Log Out
          </button>
        )}
      </nav>
      <div className="content-wrapper">{children} </div>
    </div>
  );
}

export default Layout;
