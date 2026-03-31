# ✦ DecorLux — Premium Event Decoration Booking Platform

> **A production-grade, full-stack event decoration booking website**  
> Built with HTML5, CSS3, Vanilla JS (Frontend) + Node.js, Express, MongoDB (Backend)  
> © 2026 **Saif**. All Rights Reserved.

---

## 📁 Project Structure

```
decorlux/
│
├── public/               ← Frontend (open in browser / VS Code Live Server)
│   ├── index.html        ← Main HTML structure
│   ├── style.css         ← All CSS styles (variables, responsive, animations)
│   └── script.js         ← All JavaScript (booking, chat, gallery, tracking...)
│
├── server/
│   └── server.js         ← Node.js + Express API backend
│
├── admin/
│   └── admin.html        ← Admin panel (view & update bookings)
│
├── .env.example          ← Environment variables template
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### Option A — Frontend Only (No Server Needed)
1. Open the project folder in **VS Code**
2. Install the **Live Server** extension (`ritwickdey.liveserver`)
3. Right-click `public/index.html` → **Open with Live Server**
4. Site opens at `http://127.0.0.1:5500`

### Option B — Full Stack (Frontend + Backend + Database)

#### Prerequisites
- [Node.js v18+](https://nodejs.org)
- [MongoDB](https://www.mongodb.com/try/download/community) (local) OR free [MongoDB Atlas](https://cloud.mongodb.com) cluster

#### Steps

```bash
# 1. Clone / open the project folder
cd decorlux

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Then edit .env with your values (MongoDB URI, Razorpay keys, etc.)

# 4. Start the development server (with auto-restart)
npm run dev

# OR start production server
npm start
```

5. Open `http://localhost:3000` in your browser 🎉

---

## 🔑 Environment Variables (`.env`)

| Variable              | Description                        | Example                          |
|-----------------------|------------------------------------|----------------------------------|
| `PORT`                | Server port                        | `3000`                           |
| `MONGODB_URI`         | MongoDB connection string          | `mongodb://localhost:27017/decorlux` |
| `JWT_SECRET`          | JWT secret key (long random string)| `your_super_secret_here`         |
| `RAZORPAY_KEY_ID`     | Razorpay API Key ID                | `rzp_test_xxxxxxxx`              |
| `RAZORPAY_KEY_SECRET` | Razorpay API Secret                | `xxxxxxxxxxxxxxxx`               |
| `EMAIL_USER`          | Gmail for notifications            | `your@gmail.com`                 |
| `EMAIL_PASS`          | Gmail app password                 | `xxxx xxxx xxxx xxxx`            |

---

## 🛠️ VS Code Setup

### Recommended Extensions
Open VS Code → `Ctrl+Shift+X` → Install:
- **Live Server** — `ritwickdey.liveserver`
- **Prettier** — `esbenp.prettier-vscode`
- **ESLint** — `dbaeumer.vscode-eslint`
- **MongoDB for VS Code** — `mongodb.mongodb-vscode`
- **Thunder Client** — `rangav.vscode-thunder-client` (API testing)
- **Auto Rename Tag** — `formulahendry.auto-rename-tag`

### Opening the Project
```
File → Open Folder → Select the `decorlux` folder
```

---

## ✨ Features

### Frontend
| Feature | Description |
|---------|-------------|
| 🎨 Hero Section | Animated particles, occasion chips, stat counters |
| 📦 6 Packages | Dynamic cards with hover 3D effects and discount badges |
| 🖼️ Gallery | Filterable image grid (Birthday, Wedding, etc.) |
| 📅 6-Step Booking | Occasion → Date/Time → Add-ons → Details → Payment → Confirm |
| 💰 Live Pricing | Real-time total updates with coupon deductions |
| 🎟️ Coupons | SAIF20 (20% off), FIRST50 (₹500 off), LOVE15 (15% off) |
| 🔍 Order Tracking | Enter booking ref to see timeline status |
| ⭐ Reviews | 4.9★ rating with bar chart and review cards |
| 🤖 AI Recommendation | Tag-based smart package suggestion engine |
| 💬 AI Chatbot | Floating chat with smart responses |
| 🏙️ City Cards | 6 cities with click-to-select |
| ❓ FAQ Accordion | 7 expandable questions |
| 📱 Mobile-First | Fully responsive on all screen sizes |
| ✨ Custom Cursor | Gold dot + ring follower |
| 🌀 Scroll Animations | Intersection Observer reveal |

### Backend (server.js)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/bookings` | POST | Create new booking |
| `/api/bookings` | GET | List all bookings (admin) |
| `/api/bookings/:ref` | GET | Track booking by reference |
| `/api/bookings/:ref/status` | PATCH | Update booking status |
| `/api/packages` | GET | Get all packages |
| `/api/payment/create-order` | POST | Create Razorpay order |
| `/api/payment/verify` | POST | Verify Razorpay signature |
| `/api/coupons/validate` | POST | Validate coupon code |

---

## 💳 Razorpay Integration

1. Sign up at [razorpay.com](https://razorpay.com)
2. Go to **Settings → API Keys** → Generate Test Keys
3. Add keys to your `.env` file
4. The payment modal simulates Razorpay UI. Replace the `simulatePayment()` function in `script.js` with actual Razorpay checkout for production.

---

## 🗄️ MongoDB Setup

### Option 1 — Local MongoDB
```bash
# macOS
brew install mongodb-community && brew services start mongodb-community

# Windows — Download from https://www.mongodb.com/try/download/community
```

### Option 2 — MongoDB Atlas (Free Cloud)
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free cluster
3. Get connection string → paste into `.env` as `MONGODB_URI`

---

## 🎨 Customization

### Change Theme Colors
Edit CSS variables in `public/style.css`:
```css
:root {
  --gold: #C9A84C;      /* Primary gold color */
  --rose: #E8A0A8;      /* Rose accent */
  --cream: #FDF6EC;     /* Background */
  --dark: #1A1009;      /* Dark brown */
}
```

### Add New Packages
In `public/script.js`, add to the `PACKAGES` array:
```js
{
  id: 'my-package',
  title: 'My Package',
  price: 1499,
  originalPrice: 2499,
  image: 'https://your-image-url.jpg',
  inclusions: ['🎈 Balloons', '💡 Lights'],
  featured: false,
}
```

### Add New Coupons
In `public/script.js`:
```js
const COUPONS = {
  'MYNEWCODE': { type: 'percent', value: 25, label: '25% off applied!' },
  'FLAT300':   { type: 'flat', value: 300, label: '₹300 off applied!' },
};
```
Also add matching entries in `server/server.js` under the `/api/coupons/validate` route.

---

## 📱 Mobile Testing
```
Chrome DevTools → Toggle Device Toolbar (Ctrl+Shift+M)
```
Tested breakpoints: 480px, 768px, 1024px, 1280px+

---

## 🏗️ Deployment

### Frontend Only (GitHub Pages / Netlify / Vercel)
- Push the `public/` folder contents to your repo root
- Connect to Netlify/Vercel and deploy

### Full Stack (Railway / Render / VPS)
```bash
npm start
```
Set environment variables on your hosting platform dashboard.

---

## 📄 License
MIT License — Free to use for personal and commercial projects.

---

## 👨‍💻 Author
**Saif** — © 2026 All Rights Reserved  
Built with ❤️ in India 🇮🇳
