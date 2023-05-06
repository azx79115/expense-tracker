const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

//首頁全部
router.get("/", async (req, res) => {
  const userId = req.user._id;
  const records = await Record.find({ userId }).lean().sort({ date: "desc" });

  const formattedRecords = [];
  let totalAmount = 0;

  for (const record of records) {
    const category = await Category.findById(record.categoryId).lean();
    const formattedDate = new Date(record.date)
      .toLocaleString()
      .substring(0, 9);
    totalAmount += record.amount;

    formattedRecords.push({
      ...record,
      categoryIcon: category.icon,
      date: formattedDate,
    });
  }

  res.render("index", { records: formattedRecords, totalAmount });
});

//選擇類別檢閱
router.get("/category/:category", async (req, res) => {
  const category = req.params.category;
  const userId = req.user._id;

  const foundCategory = await Category.findOne({ name: category });
  // console.log(foundCategory);
  const categoryId = foundCategory._id;
  const records = await Record.find({ userId, categoryId })
    .lean()
    .sort({ date: "desc" });
  let totalAmount = 0;
  const formattedRecords = records.map((record) => {
    console.log(record);
    totalAmount += record.amount;
    record.date = new Date(record.date).toLocaleString().substring(0, 9);
    // console.log(record.categoryIcon);
    record.categoryIcon = foundCategory.icon;
    // console.log(record.categoryIcon);
    return record;
  });

  res.render("index", { records: formattedRecords, totalAmount });
});

module.exports = router;
