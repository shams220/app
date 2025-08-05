import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";
import Landing from "./pages/landing/landing";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
        

      <Routes>
        <Route path="/" element = {<Landing/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
