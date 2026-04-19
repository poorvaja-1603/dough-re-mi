const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const Product = require("./models/Product");
const User = require("./models/User");

const products = [
  // CAKES
  {
    name: "Strawberry CheeseCake",
    description:
      "Creamy, rich cheesecake layered over a buttery biscuit base and topped with sweet, juicy strawberries for the perfect balance of indulgent and fresh.",
    price: 299,
    category: "cakes",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400",
    isBestSeller: false,
  },
  {
    name: "Biscoff CheeseCake",
    description:
      "Creamy, velvety cheesecake on a crunchy biscuit base, finished with a generous layer of rich Lotus Biscoff spread and crumbs for an irresistibly caramelized flavor.",
    price: 349,
    category: "cakes",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400",
    isBestSeller: false,
  },
  {
    name: "Black Forest Cake",
    description:
      "Moist chocolate sponge layered with fresh whipped cream and juicy cherries, finished with rich chocolate shavings for a classic, indulgent Black Forest experience!",
    price: 399,
    category: "cakes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
    isBestSeller: false,
  },
  {
    name: "Chocolate Truffle Cake",
    description:
      "Decadent, moist chocolate cake layered and coated with smooth, rich chocolate truffle ganache for an intensely indulgent treat!",
    price: 349,
    category: "cakes",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400",
    isBestSeller: false,
  },

  // BAKERY
  {
    name: "Baguette",
    description:
      "Classic French baguette with a crisp, golden crust and a light, airy crumb, baked fresh for a rustic yet elegant bite!",
    price: 100,
    category: "bakery",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?w=400",
    isBestSeller: true,
    bestSellerRank: 1,
  },
  {
    name: "ChocoChip Muffin",
    description:
      "Soft, fluffy muffin loaded with rich, melty chocolate chips and baked to golden perfection for a warm, indulgent bite every time!",
    price: 100,
    category: "bakery",
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400",
    isBestSeller: false,
  },
  {
    name: "Pretzel",
    description:
      "Golden-baked pretzel with a soft, chewy center and a lightly crisp, salted crust — the perfect balance of warmth, flavor, and comfort!",
    price: 120,
    category: "bakery",
    image: "https://images.unsplash.com/photo-1586040140378-b5fc2eda2d87?w=400",
    isBestSeller: false,
  },
  {
    name: "Croissant",
    description:
      "Buttery, flaky croissant baked to golden perfection, featuring delicate layers and a light, airy center that melts with every bite!",
    price: 199,
    category: "bakery",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
    isBestSeller: true,
    bestSellerRank: 3,
  },

  // COOKIES
  {
    name: "ChocolateChip Cookie",
    description:
      "Golden-baked cookie loaded with rich, melty chocolate chips, featuring crisp edges and a soft, gooey center for the ultimate indulgent bite.",
    price: 99,
    category: "cookies",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
    isBestSeller: false,
  },
  {
    name: "OatMeal Raisin Cookie",
    description:
      "Hearty oatmeal cookie studded with sweet, juicy raisins, baked to a warm golden finish with a soft, chewy texture and comforting homemade flavor.",
    price: 99,
    category: "cookies",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",
    isBestSeller: true,
    bestSellerRank: 2,
  },
  {
    name: "Peanut Butter Cookie",
    description:
      "Rich, nutty peanut butter cookie with a soft, tender center and lightly crisp exterior, delivering a perfectly balanced sweet and savory indulgence.",
    price: 99,
    category: "cookies",
    image: "https://images.unsplash.com/photo-1590080876034-1f6fac70e09d?w=400",
    isBestSeller: false,
  },
  {
    name: "Sugar Cookies",
    description:
      "Classic buttery sugar cookie with a delicate crumb and lightly crisp edges, offering a simple, sweet elegance that melts in every bite.",
    price: 99,
    category: "cookies",
    image: "https://images.unsplash.com/photo-1612201803767-ffe2d9e68bde?w=400",
    isBestSeller: false,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  // Seed products
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Database seeded with", products.length, "products");

  // Create admin if not exists
  const adminExists = await User.findOne({ email: "admin@doughremi.com" });
  if (!adminExists) {
    await User.create({
      name: "Admin",
      email: "admin@doughremi.com",
      password: "admin123",
      isAdmin: true,
    });
    console.log("Admin account created");
    console.log("   Email:    admin@doughremi.com");
    console.log("   Password: admin123");
  } else {
    console.log("Admin already exists, skipping");
  }

  mongoose.connection.close();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
