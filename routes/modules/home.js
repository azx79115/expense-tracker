const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const record = require("../../models/record");

router.get("/", (req, res) => {
  const userId = req.user._id;
  Record.find({ userId })
    .lean()
    .sort({ _id: "asc" })
    .then((record) => res.render("index", { record }))
    .catch((err) => console.error(err));
});

module.exports = router;
