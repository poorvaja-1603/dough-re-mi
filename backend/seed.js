const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");

const products = [
  // CAKES
  {
    name: "Strawberry CheeseCake",
    description:
      "Creamy, rich cheesecake layered over a buttery biscuit base and topped with sweet, juicy strawberries for the perfect balance of indulgent and fresh.",
    price: 299,
    category: "cakes",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
    isBestSeller: false,
  },
  {
    name: "Biscoff CheeseCake",
    description:
      "Creamy, velvety cheesecake on a crunchy biscuit base, finished with a generous layer of rich Lotus Biscoff spread and crumbs for an irresistibly caramelized flavor.",
    price: 349,
    category: "cakes",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80",
    isBestSeller: false,
  },
  {
    name: "Black Forest Cake",
    description:
      "Moist chocolate sponge layered with fresh whipped cream and juicy cherries, finished with rich chocolate shavings for a classic, indulgent Black Forest experience!",
    price: 399,
    category: "cakes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    isBestSeller: false,
  },
  {
    name: "Chocolate Truffle Cake",
    description:
      "Decadent, moist chocolate cake layered and coated with smooth, rich chocolate truffle ganache for an intensely indulgent treat!",
    price: 349,
    category: "cakes",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80",
    isBestSeller: false,
  },
  {
    name: "Red Velvet Cake",
    description:
      "A classic red velvet cake with a velvety texture, subtle cocoa flavor, and a rich cream cheese frosting that melts in your mouth.",
    price: 399,
    category: "cakes",
    image: "https://res.cloudinary.com/dqfwkavre/image/upload/v1776594033/red_velvet_n9t2o7.avif",
    isBestSeller: true,
    bestSellerRank: 4,
  },
  {
    name: "Blueberry Cheesecake",
    description:
      "A creamy cheesecake topped with a thick, sweet blueberry compote on a crunchy graham cracker crust.",
    price: 349,
    category: "cakes",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80",
    isBestSeller: false,
  },

  // BAKERY
  {
    name: "Baguette",
    description:
      "Classic French baguette with a crisp, golden crust and a light, airy crumb, baked fresh for a rustic yet elegant bite!",
    price: 100,
    category: "bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    isBestSeller: true,
    bestSellerRank: 1,
  },
  {
    name: "ChocoChip Muffin",
    description:
      "Soft, fluffy muffin loaded with rich, melty chocolate chips and baked to golden perfection for a warm, indulgent bite every time!",
    price: 100,
    category: "bakery",
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&q=80",
    isBestSeller: false,
  },
  {
    name: "Pretzel",
    description:
      "Golden-baked pretzel with a soft, chewy center and a lightly crisp, salted crust — the perfect balance of warmth, flavor, and comfort!",
    price: 120,
    category: "bakery",
    image: "https://res.cloudinary.com/dqfwkavre/image/upload/v1776594032/pretzel_lwsjrh.webp",
    isBestSeller: false,
  },
  {
    name: "Croissant",
    description:
      "Buttery, flaky croissant baked to golden perfection, featuring delicate layers and a light, airy center that melts with every bite!",
    price: 199,
    category: "bakery",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
    isBestSeller: true,
    bestSellerRank: 3,
  },
  {
    name: "Garlic Bread",
    description:
      "Freshly baked artisan bread infused with roasted garlic, herbs, and melted butter for a savory, aromatic delight.",
    price: 150,
    category: "bakery",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&q=80",
    isBestSeller: false,
  },
  {
    name: "Blueberry Muffin",
    description:
      "Bursting with fresh, juicy blueberries and topped with a light sugar crumble for a sweet, fruity breakfast treat.",
    price: 120,
    category: "bakery",
    image: "https://images.unsplash.com/photo-1558303420-f814d8a590f5?w=800&q=80",
    isBestSeller: false,
  },

  // COOKIES
  {
    name: "ChocolateChip Cookie",
    description:
      "Golden-baked cookie loaded with rich, melty chocolate chips, featuring crisp edges and a soft, gooey center for the ultimate indulgent bite.",
    price: 99,
    category: "cookies",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
    isBestSeller: false,
  },
  {
    name: "OatMeal Raisin Cookie",
    description:
      "Hearty oatmeal cookie studded with sweet, juicy raisins, baked to a warm golden finish with a soft, chewy texture and comforting homemade flavor.",
    price: 99,
    category: "cookies",
    image: "https://res.cloudinary.com/dqfwkavre/image/upload/v1776594033/oatmeal_raisin_qvth4h.webp",
    isBestSeller: true,
    bestSellerRank: 2,
  },
  {
    name: "Peanut Butter Cookie",
    description:
      "Rich, nutty peanut butter cookie with a soft, tender center and lightly crisp exterior, delivering a perfectly balanced sweet and savory indulgence.",
    price: 99,
    category: "cookies",
    image: "https://res.cloudinary.com/dqfwkavre/image/upload/v1776594032/peanut_butter_cookies_jyg3wv.webp",
    isBestSeller: false,
  },
  {
    name: "Sugar Cookies",
    description:
      "Classic buttery sugar cookie with a delicate crumb and lightly crisp edges, offering a simple, sweet elegance that melts in every bite.",
    price: 99,
    category: "cookies",
    image: "https://res.cloudinary.com/dqfwkavre/image/upload/v1776594033/sugar_cookie_s2lywz.webp",
    isBestSeller: false,
  },
  {
    name: "Double Chocolate Cookie",
    description:
      "A chocolate lover’s dream: rich cocoa dough packed with semi-sweet chocolate chunks for a double dose of decadence.",
    price: 110,
    category: "cookies",
    image: "https://res.cloudinary.com/dqfwkavre/image/upload/v1776594033/double_chocolate_cookies_tkiv9b.webp",
    isBestSeller: false,
  },
  {
    name: "Macarons Box (6pcs)",
    description:
      "A colorful assortment of delicate French macarons with assorted fillings: vanilla, pistachio, raspberry, and lemon.",
    price: 450,
    category: "cookies",
    image: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=800&q=80",
    isBestSeller: false,
  },
  {
    name: "Chocolate Brownie",
    description:
      "Fudgy, dense, and intensely chocolatey brownie with a crackly top and a gooey center.",
    price: 150,
    category: "bakery",
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&q=80",
    isBestSeller: true,
    bestSellerRank: 5,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  // 1. Clear existing data
  await Order.deleteMany({});
  await Product.deleteMany({});
  // We keep users but only remove the specific ones we are about to re-add to avoid auth issues for the USER
  await User.deleteMany({ email: { $in: [
    "admin@doughremi.com",
    "2024.poorvaja.joshi@ves.ac.in",
    "2024.tanvi.jagade@ves.ac.in",
    "2024.riya.bhatt@ves.ac.in"
  ]}});

  // 2. Seed products
  const createdProducts = await Product.insertMany(products);
  console.log("✅ Database seeded with", products.length, "products");

  // 3. Create Admin
  const admin = await User.create({
    name: "Admin",
    email: "admin@doughremi.com",
    password: "admin123",
    isAdmin: true,
  });
  console.log("✅ Admin account created (admin@doughremi.com / admin123)");

  // 4. Create Mock Users
  const users = [
    { name: "Poorvaja Joshi", email: "2024.poorvaja.joshi@ves.ac.in", password: "password123" },
    { name: "Tanvi Jagade", email: "2024.tanvi.jagade@ves.ac.in", password: "password123" },
    { name: "Riya Bhatt", email: "2024.riya.bhatt@ves.ac.in", password: "password123" },
  ];
  const createdUsers = await User.insertMany(users);
  console.log("✅ Mock users created (Poorvaja, Tanvi, Riya)");

  // 5. Create Mock Orders for Analytics
  const getProd = (name) => createdProducts.find(p => p.name === name);

  const mockOrders = [
    {
      user: createdUsers[0]._id, // Poorvaja
      items: [
        { product: getProd("Red Velvet Cake")._id, name: "Red Velvet Cake", price: 399, quantity: 1, image: getProd("Red Velvet Cake").image },
        { product: getProd("Croissant")._id, name: "Croissant", price: 199, quantity: 2, image: getProd("Croissant").image }
      ],
      totalAmount: 797,
      deliveryAddress: { street: "Chembur West", city: "Mumbai", state: "Maharashtra", pincode: "400071" },
      paymentMethod: "razorpay",
      paymentStatus: "paid",
      orderStatus: "delivered",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
    },
    {
      user: createdUsers[1]._id, // Tanvi
      items: [
        { product: getProd("Strawberry CheeseCake")._id, name: "Strawberry CheeseCake", price: 299, quantity: 2, image: getProd("Strawberry CheeseCake").image }
      ],
      totalAmount: 598,
      deliveryAddress: { street: "Vashinaka", city: "Mumbai", state: "Maharashtra", pincode: "400074" },
      paymentMethod: "razorpay",
      paymentStatus: "paid",
      orderStatus: "delivered",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
    },
    {
      user: createdUsers[2]._id, // Riya
      items: [
        { product: getProd("Chocolate Brownie")._id, name: "Chocolate Brownie", price: 150, quantity: 4, image: getProd("Chocolate Brownie").image },
        { product: getProd("Macarons Box (6pcs)")._id, name: "Macarons Box (6pcs)", price: 450, quantity: 1, image: getProd("Macarons Box (6pcs)").image }
      ],
      totalAmount: 1050,
      deliveryAddress: { street: "Ghatkopar East", city: "Mumbai", state: "Maharashtra", pincode: "400075" },
      paymentMethod: "cod",
      paymentStatus: "pending",
      orderStatus: "preparing",
      createdAt: new Date() // Today
    },
    {
      user: createdUsers[0]._id, // Poorvaja again
      items: [
        { product: getProd("Chocolate Truffle Cake")._id, name: "Chocolate Truffle Cake", price: 349, quantity: 1, image: getProd("Chocolate Truffle Cake").image }
      ],
      totalAmount: 349,
      deliveryAddress: { street: "Chembur West", city: "Mumbai", state: "Maharashtra", pincode: "400071" },
      paymentMethod: "razorpay",
      paymentStatus: "paid",
      orderStatus: "out_for_delivery",
      createdAt: new Date()
    }
  ];

  await Order.insertMany(mockOrders);
  console.log("✅ Mock orders created for analytics");

  mongoose.connection.close();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
