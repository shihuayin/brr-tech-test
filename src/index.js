import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //  log in or not
  <AuthProvider>
    {/* admin or normal user */}
    <DataProvider>
      <App />
    </DataProvider>
  </AuthProvider>
);
