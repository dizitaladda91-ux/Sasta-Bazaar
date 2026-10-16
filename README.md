# SASTA BAZAAR - Everyday Luxury
### 100% Custom Full-Stack E-Commerce Platform (React + Node.js/Express)
**No Shopify dependency, no monthly fees, 100% custom code owned by you.**

---

## 🏗️ Architecture Overview

```
├── client (Frontend: React + Vite + Tailwind CSS + Lucide Icons)
│   ├── Port: http://localhost:3000
│   ├── Pages: Home, Shop, Collection, Product Details, Cart, Wishlist, Search, Track Order, Admin
│   └── API Proxy: /api/* -> http://localhost:5000
│
├── server (Backend: Node.js + Express REST API)
│   ├── Port: http://localhost:5000
│   ├── Storage (No external DB required): server/data/
│   │   ├── products.json   (Full 61 products catalog with real prices, sizes, and images)
│   │   ├── orders.json     (Live orders with customer details, tracking numbers, items)
│   │   ├── inquiries.json  (Customer messages and custom tailoring requests)
│   │   └── subscribers.json (Newsletter email signups with 10% coupon codes)
│   └── Endpoints:
│       ├── GET  /api/products          (Search, filter by category/price/stock, sorting)
│       ├── GET  /api/products/:handle   (Product details)
│       ├── GET  /api/categories        (Category counts)
│       ├── POST /api/orders            (Checkout order creation & calculation)
│       ├── GET  /api/orders/:orderId   (Track live courier status)
│       ├── POST /api/contact           (Customer support inquiry)
│       ├── POST /api/newsletter        (10% coupon generation & subscriber storage)
│       ├── GET  /api/admin/stats       (Revenue, orders, products metrics)
│       ├── GET  /api/admin/orders      (Admin order management)
│       ├── PATCH /api/admin/orders/:id (Update status: Processing -> Dispatched -> Delivered)
│       ├── POST /api/admin/products    (Add new product to live catalog)
│       └── DELETE /api/admin/products/:id (Delete product from catalog)
```

---

## 🚀 How to Run (Single Command)

In your terminal:
```powershell
cd "c:\Users\Divyanshu\Desktop\sasta bazar"

# Starts BOTH Backend Server (Port 5000) and Frontend (Port 3000) concurrently:
npm run dev
```

- **Frontend Storefront:** [http://localhost:3000](http://localhost:3000)
- **Store Admin Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Order Tracking:** [http://localhost:3000/track-order](http://localhost:3000/track-order)
- **Backend API:** [http://localhost:5000/api/products](http://localhost:5000/api/products)

---

## 🛒 Features Built Just Like Shopify (Custom Coding)

1. **Independent Product Management**:
   - Add new suits, lehengas, or hijabs directly from the Admin Panel (`/admin`).
   - Edit prices, compare-at prices, sizes, and images without touching code.
2. **Real Order Placement & Tracking**:
   - Customers place orders on `/cart` with full shipping calculation (£40 free shipping rule).
   - Instant order confirmation with generated ID (e.g. `SB-982143`).
   - Customers track their order status on `/track-order`.
   - Store owners update statuses (Processing &rarr; Dispatched &rarr; Delivered) in the Admin Dashboard.
3. **Customer Inquiries & Newsletter Leads**:
   - Contact form messages stored in `server/data/inquiries.json`.
   - Newsletter signups automatically receive the `WELCOME10` 10% discount coupon code and persist in `server/data/subscribers.json`.
