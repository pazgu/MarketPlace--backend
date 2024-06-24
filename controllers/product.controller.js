// const fs = require("fs");
// const products = require("../models/");
const Product = require("../models/product.model");

async function getProducts(req, res) {
  const params = {
    name: req.query.name,
    minPrice: req.query.minPrice,
    maxPrice: req.query.maxPrice,
    inStock: req.query.inStock,
    page: req.query.page,
    limit: req.query.limit,
  };

  try {
    const filteredProducts = await filterByParams(params);
    res.status(200).json(filteredProducts);
  } catch (error) {
    console.log(
      "product.controller, getProducts. Error while getting products",
      error
    );
    res.status(500).json({ message: error.message });
  }
}

async function filterByParams(req, res) {
  const { name, minPrice, maxPrice, inStock, page = 1, limit = 10 } = req.body;
  let query = {};
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
  if (minPrice !== undefined && maxPrice !== undefined) {
    query.price = { $gte: minPrice, $lte: maxPrice };
  } else if (minPrice !== undefined) {
    query.price = { $gte: minPrice };
  } else if (maxPrice !== undefined) {
    query.price = { $lte: maxPrice };
  }
  if (inStock !== undefined) {
    query.quantity = inStock ? { $gt: 0 } : { $eq: 0 };
  }
  // Calculate the number of documents to skip
  const skip = (page - 1) * limit;
  try {
    const products = await Product.find(query).skip(skip).limit(limit);
    const total = await Product.countDocuments(query);
    return {
      products,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while filtering products" });
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
