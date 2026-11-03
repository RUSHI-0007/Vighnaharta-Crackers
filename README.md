# विघ्नहर्ता फटाका स्टॉल (Vighnaharta Fataka Stall) 🎆

> Mobile-first online ordering website and owner admin dashboard for a local Diwali firecracker stall at **ग्रामपंचायत समोर, गणेगाव खालसा**.

---

## 📋 Features Overview

### 🛒 Customer Flow (Guest Checkout - No Account Required)
- **Browse Firecrackers**: Real-time catalog with Marathi & English names, packaged units, MRP, wholesale discounts, and live sale prices.
- **Cart & Subtotal**: Reactive cart powered by Zustand with persistent local storage. Checks minimum order amount.
- **Delivery Details**: Name, 10-digit Indian mobile number, email, full address, landmark, and optional GPS location capture via the HTML5 Geolocation API.
- **Flexible Payments**:
  - **UPI QR**: Live dynamic UPI QR generator + copyable UPI ID + upload payment screenshot (auto-compressed to $\le$ 1MB).
  - **Cash on Delivery (COD)**: Clear instructions to keep exact cash ready upon arrival.
- **Instant Order Email**: Automated confirmation email with items breakdown, totals, and track link.
- **Order Tracking (`/track`)**: Customers can check status anytime using order code + mobile number. Shows timeline (Placed $\to$ Confirmed $\to$ Out for Delivery $\to$ Delivered), driver notes/ETA, and call-shop button.

### 👑 Owner Admin Flow (Mobile-First Dashboard)
- **Email Alerts**: Instant notification for every order with customer details, tap-to-call link, Google Maps link, full items table, and attached UPI payment screenshot.
- **Dashboard Overview**: Stat cards with NumberTicker (Today's Orders, Pending Verification, Today's Revenue, Total Customers) + recent order activity.
- **Order Management**:
  - Filter by status tabs with real-time counts (Pending, Confirmed, Out for delivery, Delivered, Cancelled) and payment methods.
  - Auto-refreshes every 30 seconds.
  - One-tap status updates with optional customer notes/ETA and automatic status notification emails.
  - High-resolution payment screenshot zoom modal.
- **Product Management**:
  - Live search and category filters.
  - Inline optimistic In-Stock switch.
  - Bulk actions: set wholesale discount % or mark in/out of stock for multiple products simultaneously.
  - Add & edit forms with live price calculation and image upload (auto-compressed in browser to ~300KB WebP and uploaded to Supabase Storage).
- **Categories**: Simple CRUD with drag/sort order and deletion safeguard (blocks deletion if products exist in category).
- **Customer CRM**: Grouped by phone number showing lifetime spend, orders count, and CSV export.
- **Stall Settings**:
  - Enable/disable UPI or COD payments independently.
  - Update UPI ID & upload custom stall QR standee photo.
  - Master "Accepting Orders" switch and minimum order amount.
  - Custom delivery announcement banner.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack) + TypeScript (Strict, zero `any`)
- **Styling**: Tailwind CSS v4 with custom Diwali theme tokens (`#0B1030` Midnight Indigo, Saffron Orange, Gold Accent, Crimson)
- **Typography**: Google Fonts via `next/font/google`: **Yatra One** (festive Devanagari headings) and **Mukta** (Devanagari body)
- **Database & Storage**: Supabase (PostgreSQL with Row Level Security, Storage buckets for images and private screenshots)
- **Authentication**: Supabase Auth (Admin email + password only)
- **State Management**: Zustand with `persist` middleware
- **Forms & Validation**: `react-hook-form` + `zod` shared schemas
- **Email Delivery**: Nodemailer + Gmail SMTP with plain inline-CSS HTML templates
- **Client Compression**: `browser-image-compression`

---

## 🚀 Setup & Installation Guide

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/Vignaharta-Crackers.git
cd Vignaharta-Crackers
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in the required variables:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Gmail SMTP for Automated Emails
GMAIL_USER=yourstall@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
OWNER_EMAIL=yourstall@gmail.com

# Deployment URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Setup Supabase Database
1. Go to [Supabase Dashboard](https://supabase.com/dashboard) and create a new project.
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste the contents of `supabase/migrations/0001_init.sql` and run it. This creates:
   - All tables (`categories`, `products`, `settings`, `orders`, `order_items`)
   - `customer_summary` view
   - Storage buckets (`product-images`, `site-assets`, `payment-screenshots`)
   - Row Level Security (RLS) policies
4. Paste the contents of `supabase/seed.sql` and run it to load the initial 7 categories, sample products, and settings.
5. Create the Stall Owner Admin user:
   - Go to **Authentication** $\to$ **Users** $\to$ **Add User** $\to$ **Create User**.
   - Enter your email and password (e.g. `owner@vighnaharta.com`).
   - Check "Auto Confirm User".

### 4. Setup Gmail App Password (for Order Emails)
1. Go to your Google Account Settings $\to$ **Security**.
2. Ensure **2-Step Verification** is turned ON.
3. Search for **App Passwords** in the search bar.
4. Name the app `Vighnaharta Stall` and click **Create**.
5. Copy the 16-character generated password into `GMAIL_APP_PASSWORD` in your `.env.local`.

### 5. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the shop, and [http://localhost:3000/admin](http://localhost:3000/admin) to view the owner dashboard.

---

## 📱 How the Owner Uses the Dashboard

1. **Log in**: Navigate to `/admin/login` on phone or computer and sign in with your admin credentials.
2. **Review Incoming Orders**:
   - The Orders tab shows live orders and auto-refreshes every 30 seconds.
   - Click **View** on an order to see customer delivery address, tap-to-call link, or open WhatsApp.
3. **Verify UPI Payment**:
   - Tap the payment screenshot thumbnail to zoom into full resolution.
   - Click **Verify Payment & Confirm** to approve, or **Reject Payment** with a reason if duplicate/invalid.
4. **Confirm Cash on Delivery**:
   - Click **Confirm Order** $\to$ the customer receives an automated confirmation email.
   - When delivered and cash is collected, click **Mark Delivered (Cash Collected)** $\to$ automatically updates payment status to Paid.
5. **Adjust Prices & Wholesale Discounts**:
   - Go to **Products** $\to$ click **Edit** on any item or select multiple products to apply bulk discount % or toggle stock status.
6. **Payment Method Switches**:
   - Go to **Settings** to toggle UPI or COD, update your UPI ID, or upload a new photo of your stall QR code standee.

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. In the **Environment Variables** section, add all variables from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `OWNER_EMAIL`
   - `NEXT_PUBLIC_SITE_URL` (set to your Vercel domain, e.g., `https://vighnaharta-crackers.vercel.app`)
4. Click **Deploy**. Vercel will build and launch the site globally.
