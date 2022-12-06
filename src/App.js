import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/Auth";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { RequireAuth } from "./components/Helpers/RequireAuth";
import { Header } from "./components/UI/Header";
import { routes } from "./routes";
import AuthContext from "./store/auth-context";

function App() {
  const authContext = useContext(AuthContext);

  return (
    <div>
      <Header />
      {!authContext.isLoggedIn ? <Auth /> : <Dashboard />}
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.requireAuth ? (
                <RequireAuth>{route.jsx}</RequireAuth>
              ) : (
                route.jsx
              )
            }
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
