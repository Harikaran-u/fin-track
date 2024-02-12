import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Loader from "./Loader";
import RecentTrans from "./RecentTrans";
import Summary from "./Summary";

import "../styles/dashboard.css";

const Dashboard = () => {
  const [transactionList, setTranstactionList] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [isNotAvailable, setNotAvailable] = useState(false);
  const navigate = useNavigate();

  function getCurrentBalance(dataList) {
    let income = 0;
    let expense = 0;
    dataList.forEach((eachTrans) => {
      if (eachTrans.transactionType === "Income") {
        income += eachTrans.amount;
      } else {
        expense += eachTrans.amount;
      }
    });
    const totalIncome = income - expense;
    setCurrentBalance(totalIncome);
  }

  async function getAllTransactions() {
    const userId = localStorage.getItem("userId");
    const allTransUrl = `https://fin-track-server.onrender.com/transaction/all/${userId}`;

    try {
      const response = await fetch(allTransUrl);
      const data = await response.json();
      if (response.status === 404) {
        setLoading(false);
        setNotAvailable(true);
      } else {
        setTranstactionList(data.transactionsList);
        setLoading(false);
        getCurrentBalance(data.transactionsList);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/access", { replace: true });
    } else {
      getAllTransactions();
    }
  }, []);

  const MainComponent = (
    <>
      <h1 className="balance-head">
        Current balance:
        <span
          className={`balance-value ${
            currentBalance < 0 ? "expense" : "income"
          }`}
        >
          <FaRupeeSign className="rs-symbol" />
          {`${currentBalance}/-`}
        </span>
      </h1>
      <div className="custom-row table-data-container">
        <div className="table-container">
          <h1 className="table-title-head">Recent Transactions</h1>
          <div className="transactions-container">
            <RecentTrans transactionList={transactionList} />
          </div>
        </div>
        <Summary />
      </div>
    </>
  );

  return (
    <div>
      <Navbar />
      {isLoading && <Loader />}
      {isNotAvailable ? <div className="not-available"></div> : MainComponent}
    </div>
  );
};

export default Dashboard;
