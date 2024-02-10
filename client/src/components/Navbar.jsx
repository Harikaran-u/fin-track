import React from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../styles/nav.css";

const Navbar = () => {
  const navigate = useNavigate();
  const submit = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure want to logout?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.removeItem("authToken");
            navigate("/access", { replace: true });
          },
        },
        {
          label: "No",
          // onClick: () => alert("Click No")
        },
      ],
    });
  };
  return (
    <div className="custom-row nav-container">
      <h1 className="nav-head">FinTrack</h1>
      <ul className="custom-row info-details-container">
        <li className="info-link">About us</li>
        <li className="info-link">Contact us</li>
        <button className="custom-btn log-out-btn" onClick={submit}>
          Logout
        </button>
      </ul>
    </div>
  );
};

export default Navbar;
