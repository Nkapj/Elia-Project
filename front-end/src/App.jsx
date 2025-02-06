// le rendu JS 
// import des rotes 
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import WeekDetails from "./pages/WeekDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/week/:id" element={<WeekDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
