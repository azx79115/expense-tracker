const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const usePassport = require("./config/passport");
const methodOverride = require("method-override");
const flash = require("connect-flash");

//引用路由
const routes = require("./routes");
//引用mongoose
require("./config/mongoose");

const app = express();
//如果在heroku執行使用process.env.PORT，否則為本地3000
const PORT = process.env.PORT || 3000;

// Handlebars引擎
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));

//session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
//呼叫Passport函式並傳入app
usePassport(app);

//設定res.locals
app.use((req, res, next) => {
  console.log(req.user);
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});
//掛載flash
app.use(flash());
//method前置處理
app.use(methodOverride("_method"));
// 將req導入路由
app.use(routes);

// 設定伺服器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
