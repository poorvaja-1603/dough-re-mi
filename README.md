# 🎵 Dough Re Mi — Online Bakery Management System

MERN Stack | VESIT Sem IV Mini Project

---

## 📁 Project Structure

```
dough-re-mi/
├── backend/
│   ├── models/         User.js, Product.js, Order.js
│   ├── routes/         auth.js, products.js, orders.js, payment.js, users.js
│   ├── middleware/     auth.js
│   ├── server.js
│   ├── seed.js         ← Run this to populate products
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── context/    CartContext.js
    │   ├── pages/      Home, ProductList, Cart, Checkout, MyAccount,
    │   │               MyOrders, SavedAddresses, Login, Register, AboutUs
    │   ├── components/ Navbar.js
    │   ├── api.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── .env.example
    └── package.json
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local) or MongoDB Atlas (free)

---

### 1️⃣ Backend Setup

```bash
cd backend
npm install
```

Create your `.env` file:
```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/dough-re-mi
JWT_SECRET=any_random_long_secret_string
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
```

**Seed the database** (adds all products from Figma):
```bash
node seed.js
```

**Start backend:**
```bash
npm run dev    # with nodemon (development)
# or
npm start      # plain node
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create your `.env` file:
```bash
cp .env.example .env
```

Edit `.env`:
```
REACT_APP_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
```

**Start frontend:**
```bash
npm start
```

The app runs on `http://localhost:3000`

---

## 💳 Razorpay Test Mode Setup (FREE for demo)

1. Go to [razorpay.com](https://razorpay.com) → Sign Up (free)
2. Dashboard → Toggle **Test Mode** (top right)
3. Settings → API Keys → Generate Test Key
4. Copy **Key ID** and **Key Secret** into both `.env` files
5. For demo payment, use test card:
   - Card: `4111 1111 1111 1111`
   - Expiry: any future date
   - CVV: any 3 digits
   - OTP: `123456`

> ✅ Test Mode is 100% free, no real money involved.

---

## 🌐 Routes

| Route | Description |
|---|---|
| `/` | Home page |
| `/cakes` | Cakes listing |
| `/bakery` | Bakery listing |
| `/cookies` | Cookies listing |
| `/about-us` | About page |
| `/cart` | Cart |
| `/checkout` | Checkout + Razorpay |
| `/my-account` | User profile |
| `/my-orders` | Order history |
| `/saved-addresses` | Delivery addresses |
| `/login` | Login |
| `/register` | Register |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/products` | All products |
| GET | `/api/products?category=cakes` | Filter by category |
| GET | `/api/products/bestsellers` | Bestsellers |
| POST | `/api/orders` | Place order |
| GET | `/api/orders/my` | User's orders |
| POST | `/api/payment/create-order` | Create Razorpay order |
| POST | `/api/payment/verify` | Verify payment |
| GET | `/api/users/profile` | Get profile |
| PUT | `/api/users/cart` | Sync cart |

---

## 🛠 Tech Stack

- **Frontend**: React.js, React Router v6, Axios, plain CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcryptjs
- **Payment**: Razorpay (Test Mode)
