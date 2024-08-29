const express = require("express");
const router = express.Router();

const userRoute = require("./user.js");
const authRoute = require("./auth.js");

router.use("/users", userRoute);
router.use("/auth", authRoute);

module.exports = router;
