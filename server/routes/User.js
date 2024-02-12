const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../dbmodels/UserModel");

router.use(express.json());

const secret_key = "My_Secret_Token";
const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{8,16}$/;

router.post("/register", async (req, res) => {
  const { body } = req;
  const { username, password } = body;

  async function verifyCredentials() {
    const isValidCredential =
      usernameRegex.test(username) && passwordRegex.test(password);

    if (isValidCredential) {
      try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPwd });
        await newUser.save();

        res.status(200).json({
          message: "New user created successfully",
          userId: newUser._id,
        });
      } catch (error) {
        res.status(503).json({ message: "Server error", error });
      }
    } else {
      res.status(400).json({ message: "Invalid username or password" });
    }
  }

  try {
    const isPresent = await User.findOne({ username });

    if (isPresent) {
      res.status(409).json({ message: "Username already exist" });
    } else {
      verifyCredentials();
    }
  } catch (error) {
    res.status(503).json({ message: "Server down", error });
  }
});

router.post("/login", async (req, res) => {
  const { body } = req;
  const { username, password } = body;
  try {
    const validUser = await User.findOne({ username });
    if (validUser) {
      const userPwd = validUser.password;
      const isValidPwd = await bcrypt.compare(password, userPwd);
      if (isValidPwd) {
        const payload = { username, password };
        const jwtToken = jwt.sign(payload, secret_key);
        const userId = validUser._id;
        res
          .status(200)
          .json({ message: "Login successful..", authToken: jwtToken, userId });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(400).json({ message: "Invalid username" });
    }
  } catch (error) {
    res.status(503).json({ message: "Server down" });
  }
});

module.exports = router;
