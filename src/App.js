import React from "react";
import { ToastContainer } from "react-toastify";

import Routes from "./routes";

import "./styles/login.scss";

const App = () => {
  return (
    <div>
      <ToastContainer
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        position="top-right"
        theme="dark"
      />
      <Routes />
    </div>
  );
};

export default App;
