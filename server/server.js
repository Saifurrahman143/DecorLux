/**
 * DecorLux — server.js
 * Node.js + Express.js Backend API
 * © 2026 Saif. All Rights Reserved.
 *
 * SETUP:
 *   1. npm install
 *   2. Copy .env.example to .env and fill in values
 *   3. npm run dev   (development with nodemon)
 *   4. npm start     (production)
 */

require('dotenv').config();

const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

/* =====================================================
   MIDDLEWARE
   ===================================================== */
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../public')));

/* =====================================================
   MONGODB CONNECTION
   ===================================================== */
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/decorlux')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

/* =====================================================
   MONGOOSE SCHEMAS
   ===================================================== */

// Booking Schema
const bookingSchema = new mongoose.Schema({
  bookingRef:   { type: String, unique: true, required: true },
  occasion:     { type: String, required: true },
  packageName:  { type: String, required: true },
  basePrice:    { type: Number, required: true },
  addons:       [{ id: String, name: String, price: Number }],
  addonsTotal:  { type: Number, default: 0 },
  discount:     { type: Number, default: 0 },
  coupon:       { type: String, default: '' },
  totalAmount:  { type: Number, required: true },
  date:         { type: String, required: true },
  timeSlot:     { type: String },
  shift:        { type: String },
  customer: {
    name:    { type: String, required: true },
    phone:   { type: String, required: true },
    email:   { type: String },
    address: { type: String },
    city:    { type: String, default: 'Patna' },
  },
  status: {
    type: String,
    enum: ['Booked', 'Confirmed', 'Assigned', 'OnTheWay', 'InProgress', 'Completed', 'Cancelled'],
    default: 'Booked',
  },
  payment: {
    method:        { type: String },
    razorpayId:    { type: String },
    status:        { type: String, default: 'pending' },
    paidAt:        { type: Date },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

bookingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

// Package Schema
const packageSchema = new mongoose.Schema({
  id:            String,
  title:         String,
  tag:           String,
  desc:          String,
  price:         Number,
  originalPrice: Number,
  image:         String,
  inclusions:    [String],
  featured:      { type: Boolean, default: false },
  active:        { type: Boolean, default: true },
});

const Package = mongoose.model('Package', packageSchema);

/* =====================================================
   UTILITY
   ===================================================== */
function generateRef() {
  return 'DL-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
}

function apiResponse(res, statusCode, success, message, data = null) {
  return res.status(statusCode).json({ success, message, data });
}

/* =====================================================
   ROUTES — BOOKINGS
   ===================================================== */

// POST /api/bookings — create a new booking
app.post('/api/bookings', async (req, res) => {
  try {
    const {
      occasion, packageName, basePrice, addons, addonsTotal,
      discount, coupon, totalAmount, date, timeSlot, shift,
      customer, payment
    } = req.body;

    if (!occasion || !packageName || !date || !customer?.name || !customer?.phone) {
      return apiResponse(res, 400, false, 'Missing required fields');
    }

    const bookingRef = generateRef();

    const booking = new Booking({
      bookingRef,
      occasion, packageName, basePrice,
      addons: addons || [],
      addonsTotal: addonsTotal || 0,
      discount: discount || 0,
      coupon: coupon || '',
      totalAmount,
      date, timeSlot, shift,
      customer,
      payment: payment || { method: 'razorpay', status: 'completed' },
      status: 'Booked',
    });

    await booking.save();

    return apiResponse(res, 201, true, 'Booking created successfully', {
      bookingRef,
      booking,
    });
  } catch (err) {
    console.error('POST /api/bookings error:', err);
    return apiResponse(res, 500, false, 'Server error: ' + err.message);
  }
});

// GET /api/bookings/:ref — track booking by reference
app.get('/api/bookings/:ref', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingRef: req.params.ref });
    if (!booking) return apiResponse(res, 404, false, 'Booking not found');
    return apiResponse(res, 200, true, 'Booking found', booking);
  } catch (err) {
    return apiResponse(res, 500, false, 'Server error: ' + err.message);
  }
});

// GET /api/bookings — list all bookings (admin)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(100);
    return apiResponse(res, 200, true, 'Bookings fetched', bookings);
  } catch (err) {
    return apiResponse(res, 500, false, 'Server error');
  }
});

// PATCH /api/bookings/:ref/status — update booking status (admin)
app.patch('/api/bookings/:ref/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Booked', 'Confirmed', 'Assigned', 'OnTheWay', 'InProgress', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return apiResponse(res, 400, false, 'Invalid status');
    }
    const booking = await Booking.findOneAndUpdate(
      { bookingRef: req.params.ref },
      { status, updatedAt: new Date() },
      { new: true }
    );
    if (!booking) return apiResponse(res, 404, false, 'Booking not found');
    return apiResponse(res, 200, true, 'Status updated', booking);
  } catch (err) {
    return apiResponse(res, 500, false, 'Server error');
  }
});

/* =====================================================
   ROUTES — PACKAGES
   ===================================================== */

// GET /api/packages
app.get('/api/packages', async (req, res) => {
  try {
    const packages = await Package.find({ active: true });
    return apiResponse(res, 200, true, 'Packages fetched', packages);
  } catch (err) {
    return apiResponse(res, 500, false, 'Server error');
  }
});

/* =====================================================
   ROUTES — RAZORPAY PAYMENT
   ===================================================== */

// POST /api/payment/create-order — create Razorpay order
app.post('/api/payment/create-order', async (req, res) => {
  try {
    const Razorpay = require('razorpay');
    const rzp = new Razorpay({
      key_id:     process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount } = req.body; // amount in paise (₹1 = 100 paise)

    const order = await rzp.orders.create({
      amount: amount * 100,  // convert to paise
      currency: 'INR',
      receipt: 'rcpt_' + Date.now(),
    });

    return apiResponse(res, 200, true, 'Order created', {
      orderId: order.id,
      amount:  order.amount,
      currency: order.currency,
      keyId:   process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error('Razorpay error:', err);
    return apiResponse(res, 500, false, 'Payment setup failed');
  }
});

// POST /api/payment/verify — verify Razorpay signature
app.post('/api/payment/verify', async (req, res) => {
  try {
    const crypto = require('crypto');
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const digest = hmac.digest('hex');

    if (digest !== razorpay_signature) {
      return apiResponse(res, 400, false, 'Invalid payment signature');
    }

    return apiResponse(res, 200, true, 'Payment verified successfully', {
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    return apiResponse(res, 500, false, 'Verification failed');
  }
});

/* =====================================================
   ROUTES — COUPON VALIDATION
   ===================================================== */
app.post('/api/coupons/validate', (req, res) => {
  const COUPONS = {
    'SAIF20':  { type: 'percent', value: 20, label: '20% discount applied!' },
    'FIRST50': { type: 'flat',    value: 500, label: '₹500 flat discount!' },
    'LOVE15':  { type: 'percent', value: 15, label: '15% discount applied!' },
  };

  const { code, amount } = req.body;
  const coupon = COUPONS[code?.toUpperCase()];

  if (!coupon) return apiResponse(res, 400, false, 'Invalid coupon code');

  const discount = coupon.type === 'percent'
    ? Math.round(amount * coupon.value / 100)
    : Math.min(coupon.value, amount);

  return apiResponse(res, 200, true, coupon.label, { discount });
});

/* =====================================================
   CATCH-ALL — serve frontend
   ===================================================== */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

/* =====================================================
   START SERVER
   ===================================================== */
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║   ✦ DecorLux Server Running          ║
║   Port: ${PORT}                          ║
║   http://localhost:${PORT}               ║
╚══════════════════════════════════════╝
  `);
});

module.exports = app;
