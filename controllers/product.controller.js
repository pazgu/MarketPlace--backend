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
    product = await Product.findById(id).exec();
    await product.deleteOne({ id });
    res.status(200).json({ message: "Product was deleted" });
  } catch (error) {
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: error.message });
  }
}

async function createProduct(req, res) {
  const { _id } = req.body;

  const existingProduct = products.find((product) => product._id === _id);
  if (existingProduct) {
    return res
      .status(409)
      .json({ message: "Product with the same ID already exists" });
  }
  const newProduct = req.body;
  products.push(newProduct);
  // fs.writeFileSync("./models/data.json", JSON.stringify(products));
  res
    .status(201)
    .json({ message: "Product created successfully", product: newProduct });
}

async function editProduct(req, res) {
  const { _id, name, price, category } = req.body;
  const existingProductIndex = products.findIndex(
    (product) => product._id === _id
  );
  if (existingProductIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  const editedProduct = req.body;
  products[existingProductIndex] = editedProduct;
  // fs.writeFileSync("./models/data.json", JSON.stringify(products, null, 2));
  res.status(200).json({ message: "Product was updated" });
}

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  editProduct,
};
