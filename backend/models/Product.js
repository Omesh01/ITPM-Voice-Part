const mongoose = require("mongoose");

var Product = mongoose.model("Product", {
  name: { type: String, required: true },
  image: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

module.exports = { Product };
