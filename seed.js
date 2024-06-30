// seed.js
// This script seeds the database with sample data.
// This is for development purposes only and should not be used in production.

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bcrypt = require("bcrypt");

const Product = require("./models/product.model");
const User = require("./models/user.model");

const SALT_ROUNDS = 10; // Number of rounds to generate salt. 10 is recommended value

dotenv.config(); // Load environment variables

const products = [
  {
    name: "Wireless Headphones",
    price: 99.99,
    quantity: 150,
    categories: ["Electronics", "Audio"],
    image: "https://picsum.photos/200/300?random=1",
  },
  {
    name: "Smartphone",
    price: 599.99,
    quantity: 75,
    categories: ["Electronics", "Communication"],
    image: "https://picsum.photos/200/300?random=2",
  },
  {
    name: "Laptop",
    price: 1299.99,
    quantity: 50,
    categories: ["Electronics", "Computers"],
    image: "https://picsum.photos/200/300?random=3",
  },
  {
    name: "Smartwatch",
    price: 199.99,
    quantity: 200,
    categories: ["Electronics", "Wearables"],
    image: "https://picsum.photos/200/300?random=4",
  },
  {
    name: "Bluetooth Speaker",
    price: 49.99,
    quantity: 300,
    categories: ["Electronics", "Audio"],
    image: "https://picsum.photos/200/300?random=5",
  },
  {
    name: "Tablet",
    price: 299.99,
    quantity: 100,
    categories: ["Electronics", "Computers"],
    image: "https://picsum.photos/200/300?random=6",
  },
  {
    name: "Gaming Console",
    price: 399.99,
    quantity: 60,
    categories: ["Electronics", "Gaming"],
    image: "https://picsum.photos/200/300?random=7",
  },
  {
    name: "Digital Camera",
    price: 499.99,
    quantity: 80,
    categories: ["Electronics", "Photography"],
    image: "https://picsum.photos/200/300?random=8",
  },
  {
    name: "E-reader",
    price: 129.99,
    quantity: 120,
    categories: ["Electronics", "Books"],
    image: "https://picsum.photos/200/300?random=9",
  },
  {
    name: "External Hard Drive",
    price: 79.99,
    quantity: 250,
    categories: ["Electronics", "Computers"],
    image: "https://picsum.photos/200/300?random=10",
  },
  {
    name: "Wireless Mouse",
    price: 29.99,
    quantity: 400,
    categories: ["Accessories", "Computers"],
    image: "https://picsum.photos/200/300?random=11",
  },
  {
    name: "Mechanical Keyboard",
    price: 89.99,
    quantity: 150,
    categories: ["Accessories", "Computers"],
    image: "https://picsum.photos/200/300?random=12",
  },
  {
    name: "Fitness Tracker",
    price: 149.99,
    quantity: 180,
    categories: ["Wearables", "Fitness"],
    image: "https://picsum.photos/200/300?random=13",
  },
  {
    name: "4K TV",
    price: 799.99,
    quantity: 40,
    categories: ["Electronics", "Home Entertainment"],
    image: "https://picsum.photos/200/300?random=14",
  },
  {
    name: "VR Headset",
    price: 349.99,
    quantity: 55,
    categories: ["Electronics", "Gaming"],
    image: "https://picsum.photos/200/300?random=15",
  },
  {
    name: "Portable Charger",
    price: 24.99,
    quantity: 500,
    categories: ["Accessories", "Mobile Devices"],
    image: "https://picsum.photos/200/300?random=16",
  },
  {
    name: "Smart Home Hub",
    price: 99.99,
    quantity: 140,
    categories: ["Smart Home", "Automation"],
    image: "https://picsum.photos/200/300?random=17",
  },
  {
    name: "Electric Toothbrush",
    price: 69.99,
    quantity: 200,
    categories: ["Health", "Personal Care"],
    image: "https://picsum.photos/200/300?random=18",
  },
  {
    name: "Air Purifier",
    price: 149.99,
    quantity: 90,
    categories: ["Home Appliances", "Health"],
    image: "https://picsum.photos/200/300?random=19",
  },
  {
    name: "Coffee Maker",
    price: 79.99,
    quantity: 110,
    categories: ["Home Appliances", "Kitchen"],
    image: "https://picsum.photos/200/300?random=20",
  },
  {
    name: "Instant Pot",
    price: 99.99,
    quantity: 130,
    categories: ["Home Appliances", "Kitchen"],
    image: "https://picsum.photos/200/300?random=21",
  },
  {
    name: "Robot Vacuum",
    price: 299.99,
    quantity: 70,
    categories: ["Home Appliances", "Cleaning"],
    image: "https://picsum.photos/200/300?random=22",
  },
  {
    name: "Smart Thermostat",
    price: 199.99,
    quantity: 85,
    categories: ["Smart Home", "Climate Control"],
    image: "https://picsum.photos/200/300?random=23",
  },
  {
    name: "Noise Cancelling Headphones",
    price: 249.99,
    quantity: 65,
    categories: ["Electronics", "Audio"],
    image: "https://picsum.photos/200/300?random=24",
  },
  {
    name: "Dash Cam",
    price: 59.99,
    quantity: 150,
    categories: ["Electronics", "Automotive"],
    image: "https://picsum.photos/200/300?random=25",
  },
  {
    name: "Action Camera",
    price: 199.99,
    quantity: 90,
    categories: ["Electronics", "Photography"],
    image: "https://picsum.photos/200/300?random=26",
  },
  {
    name: "Wireless Charger",
    price: 39.99,
    quantity: 220,
    categories: ["Accessories", "Mobile Devices"],
    image: "https://picsum.photos/200/300?random=27",
  },
  {
    name: "Smart Light Bulbs",
    price: 49.99,
    quantity: 300,
    categories: ["Smart Home", "Lighting"],
    image: "https://picsum.photos/200/300?random=28",
  },
  {
    name: "Streaming Device",
    price: 49.99,
    quantity: 180,
    categories: ["Electronics", "Home Entertainment"],
    image: "https://picsum.photos/200/300?random=29",
  },
  {
    name: "Home Security Camera",
    price: 129.99,
    quantity: 100,
    categories: ["Smart Home", "Security"],
    image: "https://picsum.photos/200/300?random=30",
  },
];

const users = [
  {
    username: "omer_mazig",
    password: "1234",
    firstName: "Omer",
    lastName: "Mazig",
  },
  {
    username: "baba_bubu",
    password: "5678",
    firstName: "Baba",
    lastName: "BuBu",
  },
];

async function seedDB() {
  try {
    await connectDB(); // Connect to the database
    await User.deleteMany({});
    await Product.deleteMany({});

    // const createdUsers = await User.insertMany(users);
    const createdUsers = await Promise.all(
      users.map(async (u) => {
        const hashedPassword = await bcrypt.hash(u.password, SALT_ROUNDS); // Hash password
        const user = new User({ ...u, password: hashedPassword }); // Create new user object
        await user.save(); // Save user to database
        return user; // Return the saved user object
      })
    );

    // Assign each product a user
    const productsWithUsers = products.map((product, index) => {
      return {
        ...product,
        user: createdUsers[index % createdUsers.length]._id,
      };
    });

    const createdProducts = await Product.insertMany(productsWithUsers);

    // Update users with the products they are selling
    for (let product of createdProducts) {
      await User.findByIdAndUpdate(
        product.user,
        { $push: { products: product._id } },
        { new: true, useFindAndModify: false }
      );
    }

    console.log("Database seeded");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
}

seedDB();
