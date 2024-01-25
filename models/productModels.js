const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the product name"],
    },
    quantity: {
      type: String,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
