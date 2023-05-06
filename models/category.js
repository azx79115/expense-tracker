const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//category模型
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
});

module.exports = mongoose.model("categories", categorySchema);
