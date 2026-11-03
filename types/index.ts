export * from "./database";

export interface CartItem {
  productId: string;
  name_en: string;
  name_mr: string;
  unit: string;
  mrp: number;
  discount_percent: number;
  unit_price: number;
  quantity: number;
  image_path: string | null;
}

export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

export type OrderTrackingInfo = {
  order_code: string;
  customer_name: string;
  phone: string;
  address: string;
  landmark: string | null;
  status: import("./database").OrderStatus;
  payment_method: import("./database").PaymentMethod;
  payment_status: import("./database").PaymentStatus;
  admin_note: string | null;
  subtotal: number;
  discount_total: number;
  total: number;
  created_at: string;
  items: Array<{
    name_en: string;
    name_mr: string;
    unit: string;
    qty: number;
    unit_price: number;
    line_total: number;
  }>;
};

