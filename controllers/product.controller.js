// const fs = require("fs");
// const products = require("../models/");
const Product = require("../models/product.model");

async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(
      "product.controller, getProducts. Error while getting products",
      error
    );
    res.status(500).json({ message: error.message });
  }
}

async function getProductById(req, res) {
  let product = null;
  try {
    const { id } = req.params;
    product = await Product.findById(id).exec();
    res.status(200).json(product);
  } catch (error) {
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: error.message });
  }
}

async function deleteProduct(req, res) {
  let product = null;
  try {
    const { id } = req.params;
    product = await Product.findByIdAndDelete(id).exec();
    res.status(200).json({ message: "Product was deleted" });
  } catch (error) {
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: error.message });
  }
}

async function createProduct(req, res) {
  const productToAdd = req.body;
  const newProduct = new Product(productToAdd);
  try {
    const savedProduct = await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", savedProduct });
  } catch (error) {
    console.log(
      "product.controller, createProduct. Error while creating product",
      error
    );
    if (err.name === "ValidationError") {
      console.log(`product.controller, createProduct. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error while creating product" });
    }
  }
}

async function editProduct(req, res) {
  let product = null;
  try {
    const { id } = req.params;
    const { name, price, quantity, category } = req.body;
    product = await Product.findByIdAndUpdate(
      id,
      { name, price, category },
      { new: true, runValidators: true }
    ); // validate before updating}).exec();
    res.status(200).json({ message: "Product was updated" });
  } catch (error) {
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  editProduct,
};
