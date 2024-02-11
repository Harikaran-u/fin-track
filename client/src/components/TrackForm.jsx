import React, { useState } from "react";
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

const TrackForm = () => {
  const [selectedCategory, setCategory] = useState(categoryList[0].name);
  const [type, setType] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  function handleFinanceData(e) {
    e.preventDefault();
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
          value={selectedCategory}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="select a category"
          className="drop-down-list"
          id="category"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Select a category"
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
          />
          <label className="track-label" htmlFor="income">
            Income
          </label>

          <input
            type="radio"
            name="typeGroup"
            value="Expences"
            id="expences"
            className="radio-input"
            onChange={(e) => setType(e.target.value)}
          />
          <label className="track-label" htmlFor="expences">
            Expences
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
        />
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
