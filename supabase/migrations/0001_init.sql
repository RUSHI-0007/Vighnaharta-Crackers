-- ==============================================================================
-- Migration: 0001_init.sql
-- Project: Vighnaharta Fataka Stall (विघ्नहर्ता फटाका स्टॉल)
-- ==============================================================================

-- 1. Create Enums / Check constraints
CREATE TYPE payment_method_enum AS ENUM ('upi_qr', 'cod');
CREATE TYPE payment_status_enum AS ENUM ('pending', 'paid', 'failed');
CREATE TYPE order_status_enum AS ENUM ('pending', 'confirmed', 'out_for_delivery', 'delivered', 'cancelled');

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL,
  name_mr TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_mr TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL CHECK (price > 0),
  discount_percent INT NOT NULL DEFAULT 0 CHECK (discount_percent >= 0 AND discount_percent <= 90),
  unit TEXT NOT NULL DEFAULT 'Box',
  image_path TEXT,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Settings Table (Single Row: id = 1)
CREATE TABLE IF NOT EXISTS settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  upi_enabled BOOLEAN NOT NULL DEFAULT true,
  cod_enabled BOOLEAN NOT NULL DEFAULT true,
  upi_id TEXT,
  qr_image_path TEXT,
  min_order_amount NUMERIC NOT NULL DEFAULT 0 CHECK (min_order_amount >= 0),
  accepting_orders BOOLEAN NOT NULL DEFAULT true,
  delivery_note TEXT,
  CONSTRAINT check_payment_method_active CHECK (upi_enabled OR cod_enabled)
);

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_code TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  address TEXT NOT NULL,
  landmark TEXT,
  notes TEXT,
  lat NUMERIC,
  lng NUMERIC,
  subtotal NUMERIC NOT NULL,
  discount_total NUMERIC NOT NULL DEFAULT 0,
  total NUMERIC NOT NULL,
  payment_method payment_method_enum NOT NULL,
  payment_status payment_status_enum NOT NULL DEFAULT 'pending',
  status order_status_enum NOT NULL DEFAULT 'pending',
  admin_note TEXT,
  screenshot_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Order Items Table (Snapshot records)
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  name_en TEXT NOT NULL,
  name_mr TEXT NOT NULL,
  unit TEXT NOT NULL,
  unit_price NUMERIC NOT NULL,
  mrp NUMERIC NOT NULL,
  qty INT NOT NULL CHECK (qty > 0),
  line_total NUMERIC NOT NULL
);

-- 7. Customer Summary View (Phone grouped, excluding cancelled orders)
CREATE OR REPLACE VIEW customer_summary AS
WITH ranked_orders AS (
  SELECT
    phone,
    customer_name,
    customer_email,
    address,
    created_at,
    total,
    ROW_NUMBER() OVER (PARTITION BY phone ORDER BY created_at DESC) as rn
  FROM orders
  WHERE status != 'cancelled'
)
SELECT
  r.customer_name as name,
  o.phone,
  r.customer_email as email,
  r.address,
  COUNT(o.id)::int as orders_count,
  COALESCE(SUM(o.total), 0)::numeric as total_spent,
  MIN(o.created_at) as first_order_at,
  MAX(o.created_at) as last_order_at
FROM orders o
JOIN ranked_orders r ON o.phone = r.phone AND r.rn = 1
WHERE o.status != 'cancelled'
GROUP BY o.phone, r.customer_name, r.customer_email, r.address;

-- 8. Enable Row Level Security (RLS) on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- 9. RLS Policies
-- Categories: Public read, Authenticated write
CREATE POLICY "Public categories are viewable by everyone" ON categories
  FOR SELECT USING (true);
CREATE POLICY "Categories can be inserted by authenticated admin" ON categories
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Categories can be updated by authenticated admin" ON categories
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Categories can be deleted by authenticated admin" ON categories
  FOR DELETE USING (auth.role() = 'authenticated');

-- Products: Public read, Authenticated write
CREATE POLICY "Public products are viewable by everyone" ON products
  FOR SELECT USING (true);
CREATE POLICY "Products can be inserted by authenticated admin" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Products can be updated by authenticated admin" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Products can be deleted by authenticated admin" ON products
  FOR DELETE USING (auth.role() = 'authenticated');

-- Settings: Public read, Authenticated write
CREATE POLICY "Public settings are viewable by everyone" ON settings
  FOR SELECT USING (true);
CREATE POLICY "Settings can be updated by authenticated admin" ON settings
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Orders & Order Items: No public direct access
-- Authenticated admins can view, insert, update orders
CREATE POLICY "Orders are viewable by authenticated admin" ON orders
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Orders can be updated by authenticated admin" ON orders
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Order items are viewable by authenticated admin" ON order_items
  FOR SELECT USING (auth.role() = 'authenticated');

-- 10. Storage Buckets Creation & Policies
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('product-images', 'product-images', true),
  ('site-assets', 'site-assets', true),
  ('payment-screenshots', 'payment-screenshots', false)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies:
-- product-images: Public read, Admin write
CREATE POLICY "Public product images access" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Admin product images insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin product images update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin product images delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- site-assets: Public read, Admin write
CREATE POLICY "Public site-assets access" ON storage.objects
  FOR SELECT USING (bucket_id = 'site-assets');
CREATE POLICY "Admin site-assets insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'site-assets' AND auth.role() = 'authenticated');
CREATE POLICY "Admin site-assets update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'site-assets' AND auth.role() = 'authenticated');

-- payment-screenshots: PRIVATE, Admin read/write only (public uploads via service-role API)
CREATE POLICY "Admin payment screenshots select" ON storage.objects
  FOR SELECT USING (bucket_id = 'payment-screenshots' AND auth.role() = 'authenticated');

