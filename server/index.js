import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Paths to database files
const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Helper functions for reading & writing database files
const readJson = (file) => {
  try {
    if (!fs.existsSync(file)) return [];
    const content = fs.readFileSync(file, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
    return [];
  }
};

const writeJson = (file, data) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
    return false;
  }
};

// ==========================================
// 1. PRODUCTS API
// ==========================================

// GET /api/products - Get all products with filtering, search, sorting
app.get('/api/products', (req, res) => {
  let products = readJson(PRODUCTS_FILE);
  const { category, subcategory, search, filter, sort, limit } = req.query;

  // Search filter
  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.handle.toLowerCase().includes(q)
    );
  }

  // Category filter
  if (category && category !== 'All') {
    products = products.filter(p => p.category === category || p.subcategory === category);
  }

  // Subcategory filter
  if (subcategory) {
    products = products.filter(p => p.subcategory === subcategory);
  }

  // Preset filter (sale, new)
  if (filter === 'sale') {
    products = products.filter(p => p.discountPercent > 0);
  } else if (filter === 'new') {
    products = products.filter(p => p.isNewArrival);
  } else if (filter === 'best-seller') {
    products = products.filter(p => p.isBestSeller);
  }

  // Sorting
  if (sort === 'price-low') {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === 'discount') {
    products.sort((a, b) => b.discountPercent - a.discountPercent);
  } else if (sort === 'newest') {
    products.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
  }

  if (limit) {
    products = products.slice(0, parseInt(limit, 10));
  }

  res.json({
    success: true,
    count: products.length,
    products
  });
});

// GET /api/products/:handle - Get single product by handle or ID
app.get('/api/products/:handle', (req, res) => {
  const { handle } = req.params;
  const products = readJson(PRODUCTS_FILE);
  const product = products.find(p => p.handle === handle || String(p.id) === handle);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product with handle/ID "${handle}" not found`
    });
  }

  res.json({
    success: true,
    product
  });
});

// GET /api/categories - Get category breakdown and counts
app.get('/api/categories', (req, res) => {
  const products = readJson(PRODUCTS_FILE);
  const categoriesMap = {};

  products.forEach(p => {
    const cat = p.category || 'Uncategorized';
    if (!categoriesMap[cat]) {
      categoriesMap[cat] = {
        name: cat,
        count: 0,
        subcategories: new Set()
      };
    }
    categoriesMap[cat].count++;
    if (p.subcategory) {
      categoriesMap[cat].subcategories.add(p.subcategory);
    }
  });

  const categories = Object.values(categoriesMap).map(c => ({
    name: c.name,
    count: c.count,
    subcategories: Array.from(c.subcategories)
  }));

  res.json({
    success: true,
    categories
  });
});

// ==========================================
// 2. ORDERS & CHECKOUT API
// ==========================================

// POST /api/orders - Place a new order
app.post('/api/orders', (req, res) => {
  const { customer, items, shippingMethod, promoCode, paymentMethod } = req.body;

  if (!customer || !customer.name || !customer.email || !customer.address) {
    return res.status(400).json({
      success: false,
      message: 'Missing required customer details (name, email, address)'
    });
  }

  if (!items || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Cannot place an empty order'
    });
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate discount
  let discount = 0;
  if (promoCode && promoCode.toUpperCase() === 'WELCOME10') {
    discount = Math.round(subtotal * 0.10 * 100) / 100;
  }

  // Calculate UK shipping (£40 free shipping rule)
  const shipping = (subtotal >= 40.00 || shippingMethod === 'free') ? 0.00 : 3.99;
  const total = Math.max(0, Math.round((subtotal - discount + shipping) * 100) / 100);

  // Generate unique order ID like SB-682914
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const orderId = `SB-${randomSuffix}`;

  const newOrder = {
    orderId,
    customer: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone || '',
      address: customer.address,
      postcode: customer.postcode || '',
      city: customer.city || ''
    },
    items,
    subtotal: Math.round(subtotal * 100) / 100,
    discount,
    shipping,
    total,
    currency: '£',
    paymentMethod: paymentMethod || 'Online Card Payment',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    trackingNumber: `RM${Math.floor(10000000 + Math.random() * 90000000)}GB`,
    courier: 'Royal Mail Tracked 48',
    createdAt: new Date().toISOString()
  };

  const orders = readJson(ORDERS_FILE);
  orders.unshift(newOrder);
  writeJson(ORDERS_FILE, orders);

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    order: newOrder
  });
});

// GET /api/orders/:orderId - Track an order by ID
app.get('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const orders = readJson(ORDERS_FILE);
  const order = orders.find(o => o.orderId.toUpperCase() === orderId.toUpperCase());

  if (!order) {
    return res.status(404).json({
      success: false,
      message: `Order reference "${orderId}" not found`
    });
  }

  res.json({
    success: true,
    order
  });
});

// ==========================================
// 3. CONTACT & INQUIRIES API
// ==========================================

// POST /api/contact - Customer message submission
app.post('/api/contact', (req, res) => {
  const { name, email, orderRef, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required'
    });
  }

  const newInquiry = {
    id: `INQ-${Date.now()}`,
    type: 'contact',
    name,
    email,
    orderRef: orderRef || null,
    subject: subject || 'General Inquiry',
    message,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  const inquiries = readJson(INQUIRIES_FILE);
  inquiries.unshift(newInquiry);
  writeJson(INQUIRIES_FILE, inquiries);

  res.status(201).json({
    success: true,
    message: 'Inquiry received. We will respond within 24 hours.',
    inquiry: newInquiry
  });
});

// POST /api/customization - Custom tailoring request
app.post('/api/customization', (req, res) => {
  const { name, email, phone, garmentType, details } = req.body;

  if (!name || !email || !details) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and tailoring details are required'
    });
  }

  const newRequest = {
    id: `TAILOR-${Date.now()}`,
    type: 'customization',
    name,
    email,
    phone: phone || '',
    garmentType: garmentType || 'Suit Alteration',
    details,
    status: 'Pending Review',
    createdAt: new Date().toISOString()
  };

  const inquiries = readJson(INQUIRIES_FILE);
  inquiries.unshift(newRequest);
  writeJson(INQUIRIES_FILE, inquiries);

  res.status(201).json({
    success: true,
    message: 'Tailoring request received. Our coordinator will contact you.',
    request: newRequest
  });
});

// ==========================================
// 4. NEWSLETTER SUBSCRIBERS API
// ==========================================

// POST /api/newsletter - Join newsletter & get 10% coupon
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({
      success: false,
      message: 'Valid email address is required'
    });
  }

  const subscribers = readJson(SUBSCRIBERS_FILE);
  const existing = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());

  if (existing) {
    return res.json({
      success: true,
      message: 'Welcome back! Your coupon code is WELCOME10 for 10% off.',
      couponCode: 'WELCOME10'
    });
  }

  const newSub = {
    id: `SUB-${Date.now()}`,
    email: email.toLowerCase().trim(),
    couponCode: 'WELCOME10',
    createdAt: new Date().toISOString()
  };

  subscribers.unshift(newSub);
  writeJson(SUBSCRIBERS_FILE, subscribers);

  res.status(201).json({
    success: true,
    message: 'Subscribed successfully! Use code WELCOME10 for 10% off your first order.',
    couponCode: 'WELCOME10'
  });
});

// ==========================================
// 5. CUSTOMER AUTHENTICATION & ACCOUNT API
// ==========================================

// POST /api/auth/register - Create customer account
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, phone, newsletter } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Name, email and password are required'
    });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const users = readJson(USERS_FILE);

  const existing = users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    return res.status(409).json({
      success: false,
      message: 'An account with this email address already exists. Please log in.'
    });
  }

  const newUser = {
    id: `USR-${Date.now().toString().slice(-6)}`,
    name: name.trim(),
    email: normalizedEmail,
    password: password, // In production, hash with bcrypt
    phone: phone ? phone.trim() : '',
    address: {
      street: '',
      city: 'London',
      postalCode: '',
      country: 'United Kingdom'
    },
    role: 'customer',
    joinedAt: new Date().toISOString()
  };

  users.push(newUser);
  writeJson(USERS_FILE, users);

  // If opted into newsletter, record in subscribers
  if (newsletter) {
    const subscribers = readJson(SUBSCRIBERS_FILE);
    if (!subscribers.some(s => s.email === normalizedEmail)) {
      subscribers.unshift({
        id: `SUB-${Date.now()}`,
        email: normalizedEmail,
        couponCode: 'WELCOME10',
        createdAt: new Date().toISOString()
      });
      writeJson(SUBSCRIBERS_FILE, subscribers);
    }
  }

  // Return user without password
  const { password: _, ...safeUser } = newUser;

  res.status(201).json({
    success: true,
    message: 'Welcome to Sasta Bazaar! Your account has been created.',
    user: safeUser,
    couponCode: 'WELCOME10'
  });
});

// POST /api/auth/login - Authenticate customer
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const users = readJson(USERS_FILE);

  const user = users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!user || user.password !== password) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password. Please check your credentials.'
    });
  }

  const { password: _, ...safeUser } = user;

  res.json({
    success: true,
    message: 'Signed in successfully!',
    user: safeUser
  });
});

// GET /api/auth/profile - Get customer profile
app.get('/api/auth/profile', (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email query parameter required' });
  }

  const users = readJson(USERS_FILE);
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const { password: _, ...safeUser } = user;
  res.json({ success: true, user: safeUser });
});

// PUT /api/auth/profile - Update profile details
app.put('/api/auth/profile', (req, res) => {
  const { email, name, phone, address } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'User email is required' });
  }

  let users = readJson(USERS_FILE);
  const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase().trim());
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  users[index] = {
    ...users[index],
    name: name !== undefined ? name.trim() : users[index].name,
    phone: phone !== undefined ? phone.trim() : users[index].phone,
    address: address ? { ...users[index].address, ...address } : users[index].address
  };

  writeJson(USERS_FILE, users);

  const { password: _, ...safeUser } = users[index];
  res.json({
    success: true,
    message: 'Profile updated successfully',
    user: safeUser
  });
});

// GET /api/auth/orders - Get customer orders
app.get('/api/auth/orders', (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const orders = readJson(ORDERS_FILE);
  const userOrders = orders.filter(
    o => o.customer && o.customer.email && o.customer.email.toLowerCase() === email.toLowerCase().trim()
  );

  res.json({
    success: true,
    orders: userOrders
  });
});

// ==========================================
// 6. ADMIN API (FULL STORE MANAGEMENT)
// ==========================================

// GET /api/admin/stats - Overview metrics
app.get('/api/admin/stats', (req, res) => {
  const products = readJson(PRODUCTS_FILE);
  const orders = readJson(ORDERS_FILE);
  const inquiries = readJson(INQUIRIES_FILE);
  const subscribers = readJson(SUBSCRIBERS_FILE);

  const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter(o => o.orderStatus === 'Processing').length;

  res.json({
    success: true,
    stats: {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalSales: Math.round(totalSales * 100) / 100,
      currency: '£',
      pendingOrders,
      totalSubscribers: subscribers.length,
      totalInquiries: inquiries.length
    }
  });
});

// GET /api/admin/orders - All orders
app.get('/api/admin/orders', (req, res) => {
  const orders = readJson(ORDERS_FILE);
  res.json({
    success: true,
    orders
  });
});

// PATCH /api/admin/orders/:orderId - Update order status (Processing, Dispatched, Delivered)
app.patch('/api/admin/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const { orderStatus, trackingNumber, courier } = req.body;
  const orders = readJson(ORDERS_FILE);

  const orderIndex = orders.findIndex(o => o.orderId.toUpperCase() === orderId.toUpperCase());
  if (orderIndex === -1) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  if (orderStatus) orders[orderIndex].orderStatus = orderStatus;
  if (trackingNumber) orders[orderIndex].trackingNumber = trackingNumber;
  if (courier) orders[orderIndex].courier = courier;

  writeJson(ORDERS_FILE, orders);

  res.json({
    success: true,
    message: 'Order status updated',
    order: orders[orderIndex]
  });
});

// POST /api/admin/products - Add a new product
app.post('/api/admin/products', (req, res) => {
  const { title, category, subcategory, price, compareAtPrice, sizes, images, description } = req.body;

  if (!title || !price) {
    return res.status(400).json({ success: false, message: 'Title and price are required' });
  }

  const products = readJson(PRODUCTS_FILE);
  const id = Date.now();
  const handle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const numPrice = parseFloat(price);
  const numCompare = compareAtPrice ? parseFloat(compareAtPrice) : null;
  const discount = (numCompare && numCompare > numPrice)
    ? Math.round(((numCompare - numPrice) / numCompare) * 100)
    : 0;

  const newProduct = {
    id,
    handle,
    title,
    rawTitle: title,
    category: category || 'Ladies Collection',
    subcategory: subcategory || 'Casual Everyday Wear Suits',
    collectionSlug: category ? category.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'casual-wear',
    price: numPrice,
    compareAtPrice: numCompare,
    discountPercent: discount,
    currency: '£',
    available: true,
    images: images && images.length > 0 ? images : ['https://cdn.shopify.com/s/files/1/1083/5361/8269/files/1E1687CB-99B0-4DF8-B0A1-477F97E542DC.png?v=1782829448'],
    primaryImage: (images && images[0]) || 'https://cdn.shopify.com/s/files/1/1083/5361/8269/files/1E1687CB-99B0-4DF8-B0A1-477F97E542DC.png?v=1782829448',
    hoverImage: (images && images[1]) || (images && images[0]) || 'https://cdn.shopify.com/s/files/1/1083/5361/8269/files/1E1687CB-99B0-4DF8-B0A1-477F97E542DC.png?v=1782829448',
    isImagePlaceholder: false,
    description: description || '<p>Premium ethnic garment crafted with fine embroidery and comfortable fabrics.</p>',
    sizes: sizes && sizes.length > 0 ? sizes : ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [],
    vendor: 'SASTA BAZAAR',
    isBestSeller: false,
    isNewArrival: true,
    variants: (sizes || ['S', 'M', 'L', 'XL', 'XXL']).map((s, idx) => ({
      id: id + idx,
      title: s,
      price: numPrice,
      compareAtPrice: numCompare,
      available: true
    }))
  };

  products.unshift(newProduct);
  writeJson(PRODUCTS_FILE, products);

  // Also update src/data/products.json so frontend bundle has latest
  writeJson(path.join(__dirname, '..', 'src', 'data', 'products.json'), products);

  res.status(201).json({
    success: true,
    message: 'Product added successfully',
    product: newProduct
  });
});

// PUT /api/admin/products/:id - Edit an existing product
app.put('/api/admin/products/:id', (req, res) => {
  const { id } = req.params;
  const products = readJson(PRODUCTS_FILE);
  const index = products.findIndex(p => String(p.id) === String(id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const updated = { ...products[index], ...req.body };
  if (req.body.price) updated.price = parseFloat(req.body.price);
  if (req.body.compareAtPrice) updated.compareAtPrice = parseFloat(req.body.compareAtPrice);
  if (updated.compareAtPrice && updated.compareAtPrice > updated.price) {
    updated.discountPercent = Math.round(((updated.compareAtPrice - updated.price) / updated.compareAtPrice) * 100);
  }

  products[index] = updated;
  writeJson(PRODUCTS_FILE, products);
  writeJson(path.join(__dirname, '..', 'src', 'data', 'products.json'), products);

  res.json({
    success: true,
    message: 'Product updated successfully',
    product: updated
  });
});

// DELETE /api/admin/products/:id - Delete a product
app.delete('/api/admin/products/:id', (req, res) => {
  const { id } = req.params;
  let products = readJson(PRODUCTS_FILE);
  const initialLen = products.length;
  products = products.filter(p => String(p.id) !== String(id));

  if (products.length === initialLen) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  writeJson(PRODUCTS_FILE, products);
  writeJson(path.join(__dirname, '..', 'src', 'data', 'products.json'), products);

  res.json({
    success: true,
    message: 'Product deleted successfully'
  });
});

// GET /api/admin/inquiries - View messages
app.get('/api/admin/inquiries', (req, res) => {
  const inquiries = readJson(INQUIRIES_FILE);
  res.json({ success: true, inquiries });
});

// GET /api/admin/subscribers - View subscribers
app.get('/api/admin/subscribers', (req, res) => {
  const subscribers = readJson(SUBSCRIBERS_FILE);
  res.json({ success: true, subscribers });
});

// Start server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  SASTA BAZAAR Custom Backend Server Running!`);
  console.log(`  Port: http://localhost:${PORT}`);
  console.log(`  REST API: http://localhost:${PORT}/api/products`);
  console.log(`=======================================================`);
});
