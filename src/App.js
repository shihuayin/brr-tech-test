// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Staff from "./pages/Staff";
import Tickets from "./pages/Tickets";
import Todo from "./pages/Todo";
import ITRequest from "./pages/ITRequest";

export default function App() {
  return (
    <BrowserRouter>
      {/*  navgation */}
      <Navbar />

      {/* main */}
      <div className="container mx-auto px-4 py-8 flex-1 w-full">
        <Routes>
          {/*welocme */}
          <Route path="/" element={<Welcome />} />

          {/* dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/request" element={<ITRequest />} />

          {/* other page, back to nav */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/*  footer  */}
      <Footer />
    </BrowserRouter>
  );
}
