import { Route, Routes } from "react-router";
import "./App.css";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Header } from "./components/UI/Header";
import { routes } from "./routes";

function App() {
  return (
    <div>
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
