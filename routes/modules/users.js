const express = require('express')
const router = express.Router()

// 載入登入畫面
router.get('/login', (req, res) => {
  res.render('login')
})
// 接收登入資料
router.post('/login', (req, res) => {

})
// 載入註冊畫面
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router