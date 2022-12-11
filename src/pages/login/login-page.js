import { useContext, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import { ngrokApi } from "../../lib/ngrok-api";
import { useAxiosMutation } from "../../hooks/use-axios-mutation";

import "./login-page.css";

export const LoginPage = () => {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const { login, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const mutation = useAxiosMutation(ngrokApi.login, {
    onSuccess: ({ data: { token, expiresIn } }) => {
      login(token);
      navigate("/");
    },
    onError: (err) => {
      console.error("Login failed", err);
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      username: usernameInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    mutation.mutate({ data: data });
  };

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <section className="auth">
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
