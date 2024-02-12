import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { format, parseISO } from "date-fns";
import { Tooltip } from "react-tooltip";

import "../styles/modify.css";
const categoryList = [
  { id: 0, name: "Salary" },
  { id: 1, name: "Freelance" },
  { id: 2, name: "Investment" },
  { id: 3, name: "Rental" },
  { id: 4, name: "Other Income" },
  { id: 5, name: "Rent/Mortgage" },
  { id: 6, name: "Groceries" },
  { id: 7, name: "Utilities" },
  { id: 8, name: "Transportation" },
  { id: 9, name: "Dining Out" },
  { id: 10, name: "Entertainment" },
  { id: 11, name: "Health/Medical" },
  { id: 12, name: "Education" },
  { id: 13, name: "Shopping" },
  { id: 14, name: "Other Expenses" },
];

const ModifyData = () => {
  const [data, setData] = useState({});
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [isInfo, setInfo] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const naviagte = useNavigate();

  function convertDate(date) {
    const dateObject = parseISO(date);
    const formattedDate = format(dateObject, "yyyy-MM-dd");
    return formattedDate;
  }
  useEffect(() => {
    if (!location.state) {
      naviagte("/", { replace: true });
    } else {
      const { transData } = location.state;
      setCategory(transData.categoryName);
      setType(transData.transactionType);
      setAmount(transData.amount);
      setDate(convertDate(transData.date));
      setDescription(transData.description);
      setData(transData);
    }
  }, []);

  async function submitModifiedData(e) {
    e.preventDefault();

    const modifyUrl = `https://fin-track-server.onrender.com/transaction/update/${userId}`;
    const transData = {
      transId: data._id,
      categoryName: category,
      transactionType: type,
      amount,
      description,
      date,
    };
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transData),
    };

    try {
      const response = await fetch(modifyUrl, config);
      const data = await response.json();
      if (response.ok) {
        const interval = setTimeout(() => setInfo(true), 3000);
        setMessage(data.message);
        setTimeout(() => {
          clearInterval(interval);
          setInfo(false);
        }, 3000);
      } else {
        const interval = setTimeout(() => setInfo(true), 3000);
        setMessage(data.message);
        setTimeout(() => {
          clearInterval(interval);
          setInfo(false);
        }, 3000);
      }
    } catch (error) {
      console.log(data.message);
    }
  }

  async function deleteTransaction() {
    const deleteUrl = `https://fin-track-server.onrender.com/transaction/delete/${userId}?transId=${data._id}`;

    try {
      const config = {
        method: "DELETE",
      };
      const response = await fetch(deleteUrl, config);
      const resData = await response.json();
      if (response.ok) {
        naviagte("/", { replace: true });
      }
    } catch (error) {
      console.log(resData.message);
    }
  }

  return (
    <div className="modify-main-container">
      <Navbar />
      <form className="modify-form-container" onSubmit={submitModifiedData}>
        <h1 className="modify-head">FinTrack-Modify</h1>
        <label className="modify-label" htmlFor="category">
          Select a category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="select a category"
          className="drop-down-list-modify"
          id="category"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Select a category"
          required
        >
          {categoryList.map((eachCategory) => (
            <option key={eachCategory.id}>{eachCategory.name}</option>
          ))}
        </select>

        <div
          className="type-container-modify"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Select a type"
        >
          <input
            type="radio"
            name="typeGroup"
            value="Income"
            id="income"
            className="radio-input-modify"
            onChange={(e) => setType(e.target.value)}
            checked={type === "Income"}
            required
          />
          <label className="modify-label" htmlFor="income">
            Income
          </label>

          <input
            type="radio"
            name="typeGroup"
            value="Expenses"
            id="expenses"
            className="radio-input-modify"
            onChange={(e) => setType(e.target.value)}
            checked={type === "Expenses"}
            required
          />
          <label className="modify-label" htmlFor="expenses">
            Expenses
          </label>
        </div>
        <label className="modify-label" htmlFor="amountInput">
          Amount
        </label>
        <input
          type="number"
          className="custom-input"
          id="amountInput"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Enter a amount"
          required
        />
        <label className="modify-label" htmlFor="dateInput">
          Date
        </label>
        <input
          type="date"
          className="custom-input"
          id="dateInput"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Select a date"
          required
        />
        <label className="modify-label" htmlFor="descriptionInput">
          Description
        </label>
        <input
          type="text"
          className="custom-input"
          id="descriptionInput"
          name="description"
          placeholder="To remember..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Short & Sweet"
          required
        />
        {isInfo && <p className="modify-info">{message}</p>}
        <div className="custom-row modify-btn-container">
          <button
            type="submit"
            className="custom-btn modify-submit-btn"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Before update once verify..."
          >
            Update
          </button>
          <button
            type="button"
            onClick={deleteTransaction}
            className="custom-btn modify-submit-btn"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Before delete once verify..."
          >
            Delete
          </button>
        </div>
        <Tooltip id="my-tooltip" place="right-start" />
      </form>
    </div>
  );
};

export default ModifyData;
