const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Product = require('../models/Product');
const Contact = require('../models/Contact');

// ==== BOOKINGS ====
// Create Booking
router.post('/book', async (req, res) => {
  try {
    const { name, phone, service, date, time, message } = req.body;
    const newBooking = new Booking({ name, phone, service, date, time, message });
    await newBooking.save();
    res.status(201).json({ success: true, message: 'Booking received successfully', booking: newBooking });
  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Get Bookings (Admin)
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});


// ==== CONTACT ====
// Submit Contact Form
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ success: true, message: 'Message sent successfully', contact: newContact });
  } catch (error) {
    console.error('Contact Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Get Contacts (Admin)
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});


// ==== PRODUCTS ====
// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Get single product
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Add Product (Admin)
router.post('/products', async (req, res) => {
    try {
      const { name, price, description, image, category } = req.body;
      const newProduct = new Product({ name, price, description, image, category });
      await newProduct.save();
      res.status(201).json({ success: true, message: 'Product added successfully', product: newProduct });
    } catch (error) {
      console.error('Product Error:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
