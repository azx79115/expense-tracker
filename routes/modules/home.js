const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

//首頁全部
router.get("/", async (req, res) => {
  const userId = req.user._id;
  //從Record資料庫中查找符合userId項目，並依照日期降序
  const records = await Record.find({ userId }).lean().sort({ date: "desc" });
  //建立初始records陣列
  const formattedRecords = [];
  //設定起始總金額為0
  let totalAmount = 0;
  //使用for...of遍歷records
  for (const record of records) {
    //從Category資料庫查找與record.categoryId符合的類別
    const category = await Category.findById(record.categoryId).lean();
    //轉換日期格式
    const formattedDate = new Date(record.date)
      .toLocaleString()
      .substring(0, 9);
    //totalAmount = amount總和
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
router.get("/:category", async (req, res) => {
  const category = req.params.category;
  const userId = req.user._id;
  //從資料庫中找到與req相同的category
  const foundCategory = await Category.findOne({ name: category });
  const categoryId = foundCategory._id;
  //從資料庫中找到符合用戶的支出項目與categoryId,並依日期降序排列
  const records = await Record.find({ userId, categoryId })
    .lean()
    .sort({ date: "desc" });
  let totalAmount = 0;
  const formattedRecords = records.map((record) => {
    totalAmount += record.amount;
    record.date = new Date(record.date).toLocaleString().substring(0, 9);
    record.categoryIcon = foundCategory.icon;
    return record;
  });

  res.render("index", { records: formattedRecords, totalAmount });
});

module.exports = router;
