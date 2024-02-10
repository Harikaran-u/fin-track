const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("welcome on board transaction");
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`this is your id: ${id}`);
});

module.exports = router;
