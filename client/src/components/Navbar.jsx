import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { MdDashboard, MdLogout } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
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
        <Link to={"/"} className="custom-link">
          <button
            className="custom-btn custom-row nav-btn"
            onClick={() => selectComponent("Dashboard")}
          >
            <MdDashboard className="nav-btn-icon" />
            Dashboard
          </button>
        </Link>
        <Link to={"/new"} className="custom-link">
          <button
            className="custom-btn custom-row nav-btn"
            onClick={() => selectComponent("New Transaction")}
          >
            <AiOutlineTransaction className="nav-btn-icon" />
            New Record
          </button>
        </Link>
        <button className="custom-row custom-btn log-out-btn" onClick={submit}>
          <MdLogout className="nav-btn-icon" />
          Logout
        </button>
      </ul>
    </div>
  );
};

export default Navbar;
