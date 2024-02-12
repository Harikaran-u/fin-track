import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Tooltip } from "react-tooltip";

const RecentTrans = (props) => {
  const { transactionList } = props;
  const navigate = useNavigate();
  function convertDate(date) {
    const formattedDate = format(new Date(date), "dd-MM-yyyy");
    return formattedDate;
  }
  function modifyTransData(transData) {
    navigate("/modify", { state: { transData } });
  }

  return (
    <>
      <table
        className="main-table"
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Click here & scroll for more..."
      >
        <thead>
          <tr>
            <th className="t-head">S.no</th>
            <th className="t-head">Category</th>
            <th className="t-head">Description</th>
            <th className="t-head">Type</th>
            <th className="t-head">Date</th>
            <th className="t-head">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactionList.map((eachTrans, index) => (
            <tr
              key={eachTrans._id}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Click to modify"
              onClick={() => modifyTransData(eachTrans)}
            >
              <td className="t-data">{index + 1}</td>
              <td className="t-data">{eachTrans.categoryName}</td>
              <td className="t-data">{eachTrans.description}</td>
              <td className="t-data">{eachTrans.transactionType}</td>
              <td className="t-data">{convertDate(eachTrans.date)}</td>
              <td
                className={
                  eachTrans.transactionType !== "Income"
                    ? "expense t-data"
                    : "income t-data"
                }
              >
                {eachTrans.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Tooltip id="my-tooltip" place="right-start" />
    </>
  );
};

export default RecentTrans;
