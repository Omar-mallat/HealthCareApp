import React from "react";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom"; // Assure-toi que c'est bien "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import Service from "./pages/Service";
import Register from "./pages/Register";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
