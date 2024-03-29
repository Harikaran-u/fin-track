import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sign from "./components/Sign";
import TrackForm from "./components/TrackForm";
import Dashboard from "./components/Dashboard";
import ModifyData from "./components/ModifyData";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/access" element={<Sign />} />
        <Route path="/new" element={<TrackForm />} />
        <Route path="/modify" element={<ModifyData />} />
      </Routes>
    </Router>
  );
};

export default App;
