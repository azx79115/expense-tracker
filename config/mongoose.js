const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 設定連線
mongoose
  .connect('mongodb://localhost/expense-tracker')
  .catch((err) => console.error('Err connecting to MongoDB', err))

//取得資料連線狀態
const db = mongoose.connection

//連線異常
db.on('error', () => {
  console.log('mongodb err!')
})
//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db