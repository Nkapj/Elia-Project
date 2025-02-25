// le rendu JS 
// import des rotes 
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import WeekDetails from "./pages/WeekDetails";
import SwitchWeek from "./pages/SwitchWeek"
import SwitchDay from "./pages/SwitchDay"
import SwitchShift from "./pages/SwitchShift";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/week/:weekId" element={<WeekDetails />} />
        <Route path="/switchweek/:weekId" element={<SwitchWeek/>} />
        <Route path="/switchday/:dayId" element={<SwitchDay />} />
        <Route path="/switchShift/:dayId" element={<SwitchShift />} />
      </Routes>
    </Router>
  );
}

export default App;
