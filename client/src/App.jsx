import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sign from "./components/Sign";
import Home from "./components/Home";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/access" element={<Sign />} />
      </Routes>
    </Router>
  );
};

export default App;
