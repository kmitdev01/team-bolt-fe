import React from "react";
import "./App.css";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes />
    </div>
  );
}

export default App;
