import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { MdDashboard, MdLogout, MdMenu, MdClose } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../styles/nav.css";

const Navbar = () => {
  const [trigger, setTrigger] = useState(false);
  const navigate = useNavigate();
  const submitLogout = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure want to logout?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userId");
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
          <button className="custom-btn custom-row nav-btn">
            <MdDashboard className="nav-btn-icon" />
            Dashboard
          </button>
        </Link>
        <Link to={"/new"} className="custom-link">
          <button className="custom-btn custom-row nav-btn">
            <AiOutlineTransaction className="nav-btn-icon" />
            New Record
          </button>
        </Link>
        <button
          className="custom-row custom-btn log-out-btn"
          onClick={submitLogout}
        >
          <MdLogout className="nav-btn-icon" />
          Logout
        </button>
      </ul>
      {!trigger && (
        <button
          className="menu-btn"
          onClick={() => setTrigger((prev) => !prev)}
        >
          <MdMenu size={30} />
        </button>
      )}
      {trigger && (
        <div className="info-details-sm-container">
          <button
            className="menu-btn close-btn"
            onClick={() => setTrigger((prev) => !prev)}
          >
            <MdClose />
          </button>
          <Link to={"/"} className="custom-link">
            <button className="custom-btn custom-row nav-btn">
              <MdDashboard className="nav-btn-icon" />
              Dashboard
            </button>
          </Link>
          <Link to={"/new"} className="custom-link">
            <button className="custom-btn custom-row nav-btn">
              <AiOutlineTransaction className="nav-btn-icon" />
              New Transaction
            </button>
          </Link>
          <button
            className="custom-btn custom-row log-out-btn"
            onClick={submitLogout}
          >
            <MdLogout className="nav-btn-icon" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
