import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Navbar from "./Navbar";
import "../styles/trackform.css";

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

const transactionUrl = "https://fin-track-server.onrender.com/transaction/new";

const TrackForm = () => {
  const [category, setCategory] = useState(categoryList[0].name);
  const [type, setType] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [isCreated, setCreated] = useState(false);
  const [info, setInfo] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/access", { replace: true });
    }
  }, []);

  async function handleFinanceData(e) {
    e.preventDefault();

    const data = {
      userId: userId,
      categoryName: category,
      transactionType: type,
      amount: amount,
      date: date,
      description: description,
    };
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(transactionUrl, configObj);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        const inteval = setInterval(() => setCreated(true), 3000);
        setTimeout(() => {
          clearInterval(inteval);
          setCreated(false);
        }, 3000);
        setInfo(data.message);
      } else {
        const inteval = setInterval(() => setCreated(true), 3000);
        setTimeout(() => {
          clearInterval(inteval);
          setCreated(false);
        }, 3000);
        setInfo(data.message);
      }
      setType("Income");
      setAmount(0);
      setDescription("");
      setDate("");
      setCategory(categoryList[0].name);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="track-form-main-container">
      <Navbar />
      <form className="track-form-container" onSubmit={handleFinanceData}>
        <h1 className="track-head">FinTrack</h1>
        <label className="track-label" htmlFor="category">
          Select a category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="select a category"
          className="drop-down-list"
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
          className="type-container"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Select a type"
        >
          <input
            type="radio"
            name="typeGroup"
            value="Income"
            id="income"
            className="radio-input"
            onChange={(e) => setType(e.target.value)}
            required
          />
          <label className="track-label" htmlFor="income">
            Income
          </label>

          <input
            type="radio"
            name="typeGroup"
            value="Expenses"
            id="expenses"
            className="radio-input"
            onChange={(e) => setType(e.target.value)}
            required
          />
          <label className="track-label" htmlFor="expenses">
            Expenses
          </label>
        </div>
        <label className="track-label" htmlFor="amountInput">
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
        <label className="track-label" htmlFor="dateInput">
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
        <label className="track-label" htmlFor="descriptionInput">
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
        {isCreated && <p className="track-info">{info}</p>}
        <button
          type="submit"
          className="custom-btn track-submit-btn"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Before submit once verify..."
        >
          Submit
        </button>

        <Tooltip id="my-tooltip" place="right-start" />
      </form>
    </div>
  );
};

export default TrackForm;
