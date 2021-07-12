const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  store: {
    type: String,
    enum: ["常溫", "冷藏", "冷凍"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Food", foodSchema);
