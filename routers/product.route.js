const express = require("express");

const {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  editProduct,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", editProduct);

module.exports = router;
