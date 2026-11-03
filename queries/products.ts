import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { ProductWithCategory } from "@/types";

function getPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";
  return createSupabaseClient(url, key);
}

const fallbackProducts: ProductWithCategory[] = [
  {
    id: "p1",
    category_id: "c1",
    slug: "electric-sparklers-10cm",
    name_en: "10 cm Electric Sparklers",
    name_mr: "१० सेमी इलेक्ट्रिक फुलबाजे",
    description: "धूरमुक्त चमकदार सोनेरी ठिणग्या",
    price: 60,
    discount_percent: 20,
    unit: "Box of 10",
    image_path: null,
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "p2",
    category_id: "c2",
    slug: "standard-flower-pot",
    name_en: "Flower Pots Standard",
    name_mr: "अनार स्टँडर्ड",
    description: "उंच सोनेरी कारंजे देणारा लोकप्रिय अनार",
    price: 150,
    discount_percent: 20,
    unit: "Box of 10",
    image_path: null,
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "p3",
    category_id: "c3",
    slug: "ground-chakkar-special",
    name_en: "Ground Chakkar Special",
    name_mr: "भुईचक्र स्पेशल",
    description: "जमिनीवर जलद गतीने फिरणारे चक्र",
    price: 120,
    discount_percent: 20,
    unit: "Box of 10",
    image_path: null,
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "p4",
    category_id: "c7",
    slug: "diwali-family-mega-box",
    name_en: "Diwali Family Mega Gift Box",
    name_mr: "दिवाळी फॅमिली मेगा गिफ्ट बॉक्स",
    description: "सर्व आवडत्या फटाक्यांचा संपूर्ण कौटुंबिक संच",
    price: 1500,
    discount_percent: 35,
    unit: "1 Big Box",
    image_path: null,
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function getProducts(options: {
  categorySlug?: string;
  categoryId?: string;
  featuredOnly?: boolean;
  inStockOnly?: boolean;
  search?: string;
} = {}): Promise<ProductWithCategory[]> {
  try {
    const supabase = getPublicClient();
    let query = supabase
      .from("products")
      .select("*, category:categories(*)")
      .order("created_at", { ascending: false });

    if (options.featuredOnly) {
      query = query.eq("featured", true);
    }
    if (options.inStockOnly) {
      query = query.eq("in_stock", true);
    }
    if (options.categoryId) {
      query = query.eq("category_id", options.categoryId);
    }
    if (options.search) {
      query = query.or(`name_en.ilike.%${options.search}%,name_mr.ilike.%${options.search}%`);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return fallbackProducts;
    }

    let results = data as ProductWithCategory[];
    if (options.categorySlug) {
      results = results.filter((p) => p.category?.slug === options.categorySlug);
    }
    return results;
  } catch {
    return fallbackProducts;
  }
}

export async function getProductById(id: string): Promise<ProductWithCategory | null> {
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(*)")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      return fallbackProducts.find((p) => p.id === id) || null;
    }
    return data as ProductWithCategory;
  } catch {
    return fallbackProducts.find((p) => p.id === id) || null;
  }
}
