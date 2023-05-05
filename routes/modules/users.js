const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const passport = require("passport");

// 載入登入畫面
router.get("/login", (req, res) => {
  res.render("login");
});
// 接收登入資料
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);
// 載入註冊畫面
router.get("/register", (req, res) => {
  res.render("register");
});
//接收註冊資料並載入資料庫
router.post("/register", (req, res) => {
  //取得表單參數
  const { name, email, password, confirmPassword } = req.body;
  //檢查使用者是否已經註冊
  User.findOne({ email })
    .then((user) => {
      if (user) {
        console.log("User already exists.");
        res.render("register", {
          name,
          email,
          password,
          confirmPassword,
        });
      } else {
        return User.create({
          name,
          email,
          password,
        })
          .then(() => res.redirect("/"))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

//登出
router.get("/logout", (req, res) => {
  req.logout(() => {
    req.flash("success_msg", "您已成功登出");
    res.redirect("/users/login");
  });
});

module.exports = router;
