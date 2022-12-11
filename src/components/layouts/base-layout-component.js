import React, { useContext } from "react";
import { useLocation } from "react-router-dom"; //eslint-disable-line

import { AuthContext } from "../../context/auth-context";

import "./base-layout-component.css";

export const BaseLayout = ({ children }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <div>
      <div className="header">
        <h4>JobBot Console</h4>
        <div className="header-right">
          {isLoggedIn && (
            <>
              <input placeholder="Search..." />
              <button className="btn btn-primary" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};
