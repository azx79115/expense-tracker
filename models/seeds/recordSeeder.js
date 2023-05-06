const mongoose = require("mongoose");
const db = require("../../config/mongoose");
const User = require("../user");
const Category = require("../category");
const Record = require("../record");
const bcrypt = require("bcryptjs");
const user = {
  name: "DAD",
  email: "DAD@DAD",
  password: "123456",
};
const records = [
  { name: "水費", date: "2023/04/01", amount: 1500, category: "家居物業" },
  { name: "加油", date: "2023/05/02", amount: 1000, category: "交通出行" },
  { name: "唱歌", date: "2023/01/03", amount: 500, category: "休閒娛樂" },
  { name: "西堤", date: "2023/04/04", amount: 500, category: "餐飲食品" },
  { name: "貓糧貓砂", date: "2023/03/25", amount: 2000, category: "其他" },
];

db.once("open", async () => {
  try {
    //處理異步加密
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    //創建使用者帳戶
    const createUser = await User.create({
      name: user.name,
      email: user.email,
      password: hash,
    });
    const userId = createUser._id;
    //使用map遍歷records，並創建records種子資料
    const promises = records.map(async (record) => {
      const category = await Category.findOne({ name: record.category });
      const categoryId = category._id;
      return Record.create({ ...record, userId, categoryId });
    });
    //使用Promise.all確保所有種子資料建立
    await Promise.all(promises);
    console.log("recordSeeder is done!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
});
