import React, { useState } from "react";
import "./style.css";
import * as API from "../../services/api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [isUserName, setUserName] = useState("admin@gmail.com");
  const [isPassword, setPassword] = useState("admin@123");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const submit = async () => {
    setLoading(true);
    const body = {
      email: isUserName,
      password: isPassword,
    };
    try {
      const result = await API.login(body);
      if (result?.token) {
        await localStorage.setItem('token', (result?.token))
        toast.success("User has been successfully login.");
        history.push("/dashboard");
      }
      setLoading(false);
    } catch (error) {
      toast.error(error?.data?.messages || "Something went wrong");
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="top_background">
        <div className="row">
          <div className="col-md-12">
            <div
              className="background"
              id="background"
              style={{ backgroundImage: "url(/images/login_background.png)" }}
            >
              <div className="top_logo">
                <img src="images/top_logo.png" alt=""></img>
                <h2>Login</h2>
              </div>
              <div className="login_form">
                <div className="form_row login_text">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Enter Username"
                    name="user_name"
                    onChange={(e) => setUserName(e?.target?.value)}
                    value={isUserName}
                  />
                </div>
                <div className="form_row_password login_text">
                  <i className="fas fa-key"></i>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    onChange={(e) => setPassword(e?.target?.value)}
                    value={isPassword}
                  />
                </div>
                <button onClick={() => submit()} disabled={loading}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
