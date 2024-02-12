const express = require("express");
const Transaction = require("../dbmodels/TransactionModel");
const User = require("../dbmodels/UserModel");
const router = express.Router();
router.use(express.json());

// valid user middleware
async function validUser(req, res, next) {
  const { params } = req;
  const userId = params.userId;
  try {
    const userData = await User.findById(userId);
    if (!userData) {
      res.status(400).json({ message: "User not found" });
    } else {
      req.userData = userData;
      next();
    }
  } catch (error) {
    res.status(503).json({ message: "Server error", error });
  }
}

// month name generator
function getMonthName(month) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month - 1] || "Unknown";
}

router.post("/new", async (req, res) => {
  const { body } = req;
  try {
    const currentUser = await User.findById(body.userId);
    if (currentUser) {
      const newTransaction = new Transaction({ ...body });
      await newTransaction.save();
      const transactionId = newTransaction._id;
      currentUser.transactions.push(transactionId);
      await currentUser.save();
      res.status(201).json({
        message: "New transaction created successfully",
        transId: transactionId,
      });
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(503).json({ message: "Server error", error });
  }
});

router.get("/all/:userId", validUser, async (req, res) => {
  try {
    const { userData } = req;
    const transactionIds = userData.transactions;
    const len = transactionIds.length;
    if (len === 0) {
      res.status(404).json({ message: "No transaction found" });
    } else {
      const transactionsList = await Transaction.find(
        {
          _id: { $in: transactionIds },
        },
        "_id userId categoryName transactionType amount description date"
      ).sort({ date: -1 });

      res
        .status(200)
        .json({ message: "Transaction data available", transactionsList });
    }
  } catch (error) {
    res.status(503).json({ message: "Server error", error });
    console.log(error);
  }
});

router.get("/summary/:userId", validUser, async (req, res) => {
  try {
    const { userData } = req;
    const transactionIds = userData.transactions;
    const len = transactionIds.length;

    if (len === 0) {
      res.status(404).json({ message: "No transaction found" });
    } else {
      const monthlySummary = await Transaction.aggregate([
        { $match: { userId: userData._id } },
        {
          $group: {
            _id: {
              month: { $month: "$date" },
              year: { $year: "$date" },
              type: "$transactionType",
            },
            totalAmount: { $sum: "$amount" },
          },
        },
        {
          $group: {
            _id: {
              month: "$_id.month",
              year: "$_id.year",
            },
            income: {
              $sum: {
                $cond: [{ $eq: ["$_id.type", "Income"] }, "$totalAmount", 0],
              },
            },
            expenses: {
              $sum: {
                $cond: [{ $eq: ["$_id.type", "Expenses"] }, "$totalAmount", 0],
              },
            },
          },
        },
        {
          $addFields: {
            netValue: { $subtract: ["$income", "$expenses"] },
          },
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 },
        },
      ]);

      const len = monthlySummary.length;
      if (len === 0) {
        res.status(404).json({ message: "No transaction found" });
      } else {
        const modifiedSummary = monthlySummary.map((eachData) => ({
          month: getMonthName(eachData._id.month),
          year: eachData._id.year,
          income: eachData.income,
          expenses: eachData.expenses,
          netValue: eachData.netValue,
        }));

        res.status(200).json({
          message: "Summary data available",
          monthlySummary: modifiedSummary,
        });
      }
    }
  } catch (error) {
    res.status(503).json({ message: "Server error", error });
    console.log(error);
  }
});

router.put("/update/:userId", validUser, async (req, res) => {
  const { body } = req;
  const { transId, categoryName, transactionType, amount, description, date } =
    body;
  const data = {
    categoryName,
    transactionType,
    amount,
    description,
    date,
  };
  try {
    const updatedDocument = await Transaction.findByIdAndUpdate(transId, data, {
      new: true,
    });
    if (updatedDocument) {
      res.status(200).json({ message: "Data updated successfully" });
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    res.status(503).json({ message: "Server error", error });
  }
});

router.delete("/delete/:userId", validUser, async (req, res) => {
  const { transId } = req.query;
  try {
    const deleteDocument = await Transaction.findByIdAndDelete(transId);
    if (deleteDocument) {
      res.status(200).json({ message: "Data deleted successfully" });
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {}
});

module.exports = router;
