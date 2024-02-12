import React, { useEffect, useState } from "react";

const Summary = () => {
  const [summaryList, setSummaryList] = useState([]);

  async function getSummary(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setSummaryList(data.monthlySummary);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const summaryUrl = `https://fin-track-server.onrender.com/transaction/summary/${userId}`;
    getSummary(summaryUrl);
  });

  return (
    <div className="monthly-summary-container">
      <h1 className="monthly-table-head">Monthly Summary</h1>
      <table className="main-table summary-table">
        <thead>
          <tr>
            <th className="t-head">S.no</th>
            <th className="t-head">Month</th>
            <th className="t-head">Year</th>
            <th className="t-head">Income</th>
            <th className="t-head">Expenses</th>
            <th className="t-head">Net Balance</th>
          </tr>
        </thead>
        <tbody>
          {summaryList.map((eachTrans, index) => (
            <tr key={index}>
              <td className="t-data">{index + 1}</td>
              <td className="t-data">{eachTrans.month}</td>
              <td className="t-data">{eachTrans.year}</td>
              <td className="t-data income">{eachTrans.income}</td>
              <td className="t-data expense">{eachTrans.expenses}</td>
              <td className="t-data">{eachTrans.netValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Summary;
