const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModels");
const app = express();
require("dotenv").config();
const clusterUsername = process.env.CLUSTER_USERNAME;
const clusterPW = process.env.CLUSTER_PASSWORD;

app.use(express.json());

app.get("/blog", (req, res) => {
  res.send("Hello blog testing with nodemon");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const id = req.body.params.id;
    const product = await Product.findById(id, req.body, { new: true }); // req.body is the data we want to update // new returns the modified rather than the original
    console.log("id", id);
    console.log("product", product);
    if (!product) {
      return res
        .status(404)
        .json({ message: `We cannot find any product with this id ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = res.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find product with ID: ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// mongoose.set("strictQuery", false) ??
mongoose
  .connect(
    `mongodb+srv://${clusterUsername}:${clusterPW}@cluster0.w2fht.mongodb.net/node-api?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("node api app is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
