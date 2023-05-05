const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("list", listSchema);
