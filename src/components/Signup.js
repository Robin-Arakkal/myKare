import { useEffect, useReducer, useState } from "react";
import { signUpUser } from "../utils/helpers";
import Layout from "./Layout";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const reducer = (state, action) => {
    switch (action.type) {
      case "firstname":
        return { ...state, firstname: action.firstname };
      case "lastname":
        return { ...state, lastname: action.lastname };
      case "email":
        return { ...state, email: action.email };
      case "password":
        return { ...state, password: action.password };
      default:
        throw new Error();
    }
  };

  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (Object.values(state).every((val) => val.length > 0)) {
      setDisabled(false);
    }
  }, [state]);

  const handleSignup = (e) => {
    e.preventDefault();
    const res = signUpUser(state);
    if (res?.status) {
      navigate("/login");
    }
  };
  return (
    <Layout>
      <div className="signup">
        <div className="auth-form-container">
          <form className="signup-form" onSubmit={(e) => handleSignup(e)}>
            <div className="auth-block">
              <label className="auth-label">First Name</label>
              <input
                required
                className="auth-input"
                type="text"
                onChange={(e) =>
                  dispatch({ type: "firstname", firstname: e.target.value })
                }
              />
            </div>
            <div className="auth-block">
              <label className="auth-label">Last Name</label>
              <input
                required
                className="auth-input"
                type="text"
                onChange={(e) =>
                  dispatch({ type: "lastname", lastname: e.target.value })
                }
              />
            </div>
            <div className="auth-block">
              <label className="auth-label">Email</label>
              <input
                required
                className="auth-input"
                type="email"
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
                onChange={(e) =>
                  dispatch({ type: "password", password: e.target.value })
                }
              />
            </div>
            <button className="auth-input" type="btn" disabled={disabled}>
              Sign Up
            </button>
          </form>
          <Link className="auth-link" to="/login">
            Log In
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Signup;
