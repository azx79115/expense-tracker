const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

//新增畫面
router.get("/new", (req, res) => {
  res.render("new");
});

//儲存新增支出
router.post("/new", async (req, res) => {
  try {
    const record = req.body;
    const userId = req.user._id;
    console.log(record);
    const category = await Category.find({ name: record.category });
    if (!category) {
      throw new Error("Category not found");
    }
    await Record.create({ ...record, categoryId: category._id, userId });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//修改畫面
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  Record.findById(id)
    .lean()
    .then((record) => {
      record.date = record.date.toISOString().substring(0, 10);
      Category.findById(record.categoryId).then((category) => {
        record.category = category.name;
        res.render("edit", { record });
      });
    });
});

//刪除
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Record.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Detect Error!");
  }
});

module.exports = router;
