const express = require("express");
const router = express.Router();

const records = require("./modules/records");
const home = require("./modules/home");
const New = require("./modules/new");
const users = require("./modules/users");
const { authenticator } = require("../middleware/auth");

router.use("/new", authenticator, New);
router.use("/users", users);
router.use("/records", authenticator, records);
router.use("/", authenticator, home);

module.exports = router;
