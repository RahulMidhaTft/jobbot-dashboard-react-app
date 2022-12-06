import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import "./Header.css";

export const Header = () => {
  const context = useContext(AuthContext);
  return (
    <div className="header">
      <h4>JobBot Console</h4>
      <div className="header-right">
        {context.isLoggedIn && (
          <>
            <input placeholder="Search..." />
            <button className="btn btn-primary" onClick={context.logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};
