export type PaymentMethod = "upi_qr" | "cod";
export type PaymentStatus = "pending" | "paid" | "failed";
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface Category {
  id: string;
  name_en: string;
  name_mr: string;
  slug: string;
  sort_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  category_id: string;
  slug: string;
  name_en: string;
  name_mr: string;
  description: string | null;
  price: number;
  discount_percent: number;
  unit: string;
  image_path: string | null;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductWithCategory extends Product {
  category?: Category | null;
}

export interface Settings {
  id: number;
  upi_enabled: boolean;
  cod_enabled: boolean;
  upi_id: string | null;
  qr_image_path: string | null;
  min_order_amount: number;
  accepting_orders: boolean;
  delivery_note: string | null;
}

export interface Order {
  id: string;
  order_code: string;
  customer_name: string;
  phone: string;
  customer_email: string;
  address: string;
  landmark: string | null;
  notes: string | null;
  lat: number | null;
  lng: number | null;
  subtotal: number;
  discount_total: number;
  total: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  status: OrderStatus;
  admin_note: string | null;
  screenshot_path: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  name_en: string;
  name_mr: string;
  unit: string;
  unit_price: number;
  mrp: number;
  qty: number;
  line_total: number;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

export interface CustomerSummary {
  name: string;
  phone: string;
  email: string;
  address: string;
  orders_count: number;
  total_spent: number;
  first_order_at: string;
  last_order_at: string;
}

