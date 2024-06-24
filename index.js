const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // Load config

async function main() {
  await connectDB();
  //Middleware - run this for every request
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  const productsRoutes = require("./routers/product.route");
  app.use("/api/products", productsRoutes);

  app.listen(PORT, () => console.log(`app runing on port ${PORT}`));
}

main();
