const express = require("express");

const userController = require("./user");
const router = express.Router();
router.post("/register", userController.register);
module.exports = router;