const express = require("express");

const userController = require("./user");
const {
    authenticating,
    authorizing
} = require("../middleware/auth");
const router = express.Router();
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/test-private",
    authenticating,
    authorizing(["driver","passenger","admin"]),
    userController.testPrivate);
module.exports = router;