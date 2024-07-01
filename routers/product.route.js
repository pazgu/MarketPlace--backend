const express = require("express");
const { verifyToken } = require("./middleware/auth.middleware");

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
router.post("/", verifyToken, createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", editProduct);

module.exports = router;
