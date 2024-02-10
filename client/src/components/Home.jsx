import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/access", { replace: true });
    }
  }, []);
  return (
    <div className="home-page-main-container">
      <Navbar />
      <h1>Welcome-Home</h1>
    </div>
  );
};

export default Home;
