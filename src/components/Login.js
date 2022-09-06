import { useReducer, useState, useEffect } from "react";
import { logInUser } from "../utils/helpers";
import Layout from "./Layout";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);

  const reducer = (state, action) => {
    switch (action.type) {
      case "email":
        return { ...state, email: action.email };
      case "password":
        return { ...state, password: action.password };
      default:
        throw new Error();
    }
  };
  const initialState = {
    email: "",
    password: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (Object.values(state).every((val) => val.length > 0)) {
      setDisabled(false);
    }
  }, [state]);

  const handleLogin = (e) => {
    e.preventDefault();
    const res = logInUser(state);
    if (res?.status) {
      navigate("/dashboard");
    }
  };
  return (
    <Layout>
      <div className="login">
        <div className="auth-form-container">
          <form className="login-form" onSubmit={(e) => handleLogin(e)}>
            <div className="auth-block">
              <label className="auth-label">Email</label>
              <input
                required
                className="auth-input"
                type="text"
                onChange={(e) =>
                  dispatch({ type: "email", email: e.target.value })
                }
              />
            </div>
            <div className="auth-block">
              <label className="auth-label">Password</label>
              <input
                required
                className="auth-input"
                type="password"
                placeholder="Enter your password"
                onChange={(e) =>
                  dispatch({ type: "password", password: e.target.value })
                }
              />
            </div>
            <button className="auth-input" type="btn" disabled={disabled}>
              Log in
            </button>
          </form>
          <Link className="auth-link" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
