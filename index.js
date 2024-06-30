const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { verifyToken } = require("./middleware/auth.middleware");

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
  const usersRoutes = require("./routers/user.route");
  // auth routes
  const authRoutes = require("./routers/auth.route");
  const protectedRoutes = require("./routers/protected.route");

  app.use("/api/auth", authRoutes);
  app.use("/api/protected", verifyToken, protectedRoutes);

  app.use("/api/products", productsRoutes);
  app.use("/api/users", usersRoutes);

  app.listen(PORT, () => console.log(`app runing on port ${PORT}`));
}

main();
