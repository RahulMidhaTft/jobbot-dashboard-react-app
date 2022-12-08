import { useContext, useRef } from "react";
import axios from "../../api/axios";
import { endpoints } from "../../api/endpoints";
import AuthContext from "../../store/auth-context";

import "./Auth.css";
const Auth = () => {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const authContext = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    axios
      .post(endpoints.auth.login, {
        data: { username: enteredUsername, password: enteredPassword },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        authContext.login(response.data.token, response.data.expiresIn);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={"auth"}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className="control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" required ref={usernameInputRef} />
        </div>
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className="login-actions">
          <button type="submit">Login</button>
        </div>
      </form>
    </section>
  );
};

export default Auth;
