const express = require("express");

const { register, login } = require("../controllers/authController");
const authenticateUser = require("../../middleware/authenticateUser");

const router = express.Router();

router.post("/register", register);

router.post("/login", authenticateUser, login);

module.exports = router;
