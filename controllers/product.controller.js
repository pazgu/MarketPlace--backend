const fs = require("fs");
const products = require("../models/data.json");

function getProducts(req, res) {
  res.status(200).json(products);
}

function getProductById(req, res) {
  const { id } = req.params;
  const product = products.find((product) => product._id === id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json(product);
}

function deleteProduct(req, res) {
  const { id } = req.params;
  const productIndex = products.findIndex((product) => product._id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: "product not found" });
  }
  products.splice(productIndex, 1);
  fs.writeFileSync("./models/data.json", JSON.stringify(products));
  res.status(200).json({ message: "Product was deleted" });
}

function createProduct(req, res) {
  const { _id, name, price, category } = req.body;

  const existingProduct = products.find((product) => product._id === _id);
  if (existingProduct) {
    return res
      .status(409)
      .json({ message: "Product with the same ID already exists" });
  }

  const newProduct = {
    _id,
    name,
    price,
    category,
  };

  products.push(newProduct);
  fs.writeFileSync("./models/data.json", JSON.stringify(products));
  res
    .status(201)
    .json({ message: "Product created successfully", product: newProduct });
}

function editProduct(req, res) {
  const { _id, name, price, category } = req.body;
  const existingProductIndex = products.findIndex(
    (product) => product._id === _id
  );
  if (existingProductIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  const editedProduct = {
    _id,
    name,
    price,
    category,
  };
  products[existingProductIndex] = editedProduct;
  fs.writeFileSync("./models/data.json", JSON.stringify(products, null, 2));
  res.status(200).json({ message: "Product was updated" });
}

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  editProduct,
};
