import fs from 'fs';
import path from 'path';

const dataDir = path.resolve('server/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Copy products to server/data/products.json if not already there
const srcProducts = path.resolve('src/data/products.json');
const destProducts = path.join(dataDir, 'products.json');
if (fs.existsSync(srcProducts) && !fs.existsSync(destProducts)) {
  fs.copyFileSync(srcProducts, destProducts);
  console.log('Copied initial products to server/data/products.json');
}

// Initialize empty collections for orders, inquiries, subscribers
const ordersFile = path.join(dataDir, 'orders.json');
if (!fs.existsSync(ordersFile)) {
  fs.writeFileSync(ordersFile, JSON.stringify([
    {
      orderId: "SB-982143",
      customer: {
        name: "Amina Begum",
        email: "amina@example.co.uk",
        phone: "+44 7700 900123",
        address: "42 High Street, Birmingham, B1 1BB, United Kingdom"
      },
      items: [
        {
          id: 16259092840797,
          title: "SB01 Lavender Lilac Cotton Blend Chickenkari Embroidered Straight Kurta Pant Dupatta Set",
          size: "M",
          price: 9.99,
          quantity: 2,
          image: "https://cdn.shopify.com/s/files/1/1083/5361/8269/files/1E1687CB-99B0-4DF8-B0A1-477F97E542DC.png?v=1782829448"
        }
      ],
      subtotal: 19.98,
      shipping: 3.99,
      discount: 0,
      total: 23.97,
      paymentMethod: "Card (Stripe Simulation)",
      paymentStatus: "Paid",
      orderStatus: "Dispatched",
      trackingNumber: "RM728491024GB",
      courier: "Royal Mail Tracked 48",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    }
  ], null, 2));
}

const inquiriesFile = path.join(dataDir, 'inquiries.json');
if (!fs.existsSync(inquiriesFile)) {
  fs.writeFileSync(inquiriesFile, JSON.stringify([], null, 2));
}

const subscribersFile = path.join(dataDir, 'subscribers.json');
if (!fs.existsSync(subscribersFile)) {
  fs.writeFileSync(subscribersFile, JSON.stringify([
    { email: "vip@sastabazaarclothing.com", couponCode: "WELCOME10", createdAt: new Date().toISOString() }
  ], null, 2));
}

console.log('Database files initialized successfully in server/data/');
