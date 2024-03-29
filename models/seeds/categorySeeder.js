const mongoose = require("mongoose");
const db = require("../../config/mongoose");
const Category = require("../category");

const category = [
  { name: "家居物業", icon: '<i class="fa-solid fa-house"></i>' },
  { name: "交通出行", icon: '<i class="fa-solid fa-van-shuttle"></i>' },
  { name: "休閒娛樂", icon: '<i class="fa-solid fa-face-grin-beam"></i>' },
  { name: "餐飲食品", icon: '<i class="fa-solid fa-utensils"></i>' },
  { name: "其他", icon: '<i class="fa-solid fa-pen"></i>' },
];

db.once("open", async () => {
  try {
    //創建category種子資料
    await Category.create(category);
    console.log("categorySeeder is done!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
});
