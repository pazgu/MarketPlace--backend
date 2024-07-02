const express = require("express");
const {
  verifyToken,
  authorizeProductOwner,
} = require("../middleware/auth.middleware");

const {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  editProduct,
  getUserProducts,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", getProducts);
router.get("/myProducts", verifyToken, getUserProducts);
router.get("/:id", getProductById);
router.post("/create", verifyToken, createProduct);
router.delete("/:id", verifyToken, authorizeProductOwner, deleteProduct);
router.put("/:id", verifyToken, authorizeProductOwner, editProduct);

module.exports = router;
