import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { ProductWithCategory } from "@/types";

function getPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";
  return createSupabaseClient(url, key);
}

const fallbackProducts: ProductWithCategory[] = [
  {
    id: "a1000000-0000-0000-0000-000000000001",
    category_id: "c1000000-0000-0000-0000-000000000001",
    slug: "electric-sparklers-10cm",
    name_en: "10 cm Electric Sparklers",
    name_mr: "१० सेमी इलेक्ट्रिक फुलबाजे",
    description: "धूरमुक्त चमकदार सोनेरी ठिणग्या (Box of 10 sticks)",
    price: 60,
    discount_percent: 20,
    unit: "Box of 10",
    image_path: null,
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: "c1000000-0000-0000-0000-000000000001", name_en: "Sparklers", name_mr: "फुलबाजे", slug: "sparklers", sort_order: 1, created_at: new Date().toISOString() },
  },
  {
    id: "a1000000-0000-0000-0000-000000000002",
    category_id: "c1000000-0000-0000-0000-000000000001",
    slug: "colour-sparklers-15cm",
    name_en: "15 cm Colour Sparklers",
    name_mr: "१५ सेमी रंगीबेरंगी फुलबाजे",
    description: "लाल, हिरवा आणि पिवळा आकर्षक प्रकाश",
    price: 90,
    discount_percent: 25,
    unit: "Box of 10",
    image_path: null,
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: "c1000000-0000-0000-0000-000000000001", name_en: "Sparklers", name_mr: "फुलबाजे", slug: "sparklers", sort_order: 1, created_at: new Date().toISOString() },
  },
  {
    id: "a1000000-0000-0000-0000-000000000003",
    category_id: "c1000000-0000-0000-0000-000000000001",
    slug: "giant-sparklers-30cm",
    name_en: "30 cm Giant Sparklers",
    name_mr: "३० सेमी मोठे फुलबाजे",
    description: "दीर्घकाळ जळणारे आणि लहान मुलांसाठी सुरक्षित",
    price: 180,
    discount_percent: 30,
    unit: "Box of 5",
    image_path: null,
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: "c1000000-0000-0000-0000-000000000001", name_en: "Sparklers", name_mr: "फुलबाजे", slug: "sparklers", sort_order: 1, created_at: new Date().toISOString() },
  },
  {
    id: "a1000000-0000-0000-0000-000000000004",
    category_id: "c1000000-0000-0000-0000-000000000002",
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
    category: { id: "c1000000-0000-0000-0000-000000000002", name_en: "Flower Pots", name_mr: "अनार", slug: "flower-pots", sort_order: 2, created_at: new Date().toISOString() },
  },
  {
    id: "a1000000-0000-0000-0000-000000000005",
    category_id: "c1000000-0000-0000-0000-000000000002",
    slug: "special-colour-koti",
    name_en: "Special Colour Koti",
    name_mr: "स्पेशल कलर कोटी अनार",
    description: "अनेक रंगांचा अप्रतिम प्रकाश फवारा",
    price: 240,
    discount_percent: 25,
    unit: "Box of 10",
    image_path: null,
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: "c1000000-0000-0000-0000-000000000002", name_en: "Flower Pots", name_mr: "अनार", slug: "flower-pots", sort_order: 2, created_at: new Date().toISOString() },
  },
  {
    id: "a1000000-0000-0000-0000-000000000006",
    category_id: "c1000000-0000-0000-0000-000000000002",
    slug: "deluxe-mega-fountain",
    name_en: "Deluxe Mega Fountain",
    name_mr: "डीलक्स महा अनार",
    description: "२० फूट उंच जाणारा विहंगम सोनेरी प्रकाश",
    price: 350,
    discount_percent: 30,
    unit: "Box of 5",
    image_path: null,
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: "c1000000-0000-0000-0000-000000000002", name_en: "Flower Pots", name_mr: "अनार", slug: "flower-pots", sort_order: 2, created_at: new Date().toISOString() },
  },
  {
    id: "a1000000-0000-0000-0000-000000000007",
    category_id: "c1000000-0000-0000-0000-000000000003",
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
    category: { id: "c1000000-0000-0000-0000-000000000003", name_en: "Ground Chakkars", name_mr: "भुईचक्र", slug: "ground-chakkars", sort_order: 3, created_at: new Date().toISOString() },
  },
  {
    id: "a1000000-0000-0000-0000-000000000008",
    category_id: "c1000000-0000-0000-0000-000000000003",
    slug: "deluxe-spinning-wheel",
    name_en: "Deluxe Spinning Wheel",
    name_mr: "डीलक्स फिरकी चक्र",
    description: "रंगीबेरंगी ठिणग्यांसह दीर्घकाळ फिरणारे चक्र",
    price: 200,
    discount_percent: 25,
    unit: "Box of 10",
    image_path: null,
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: "c1000000-0000-0000-0000-000000000003", name_en: "Ground Chakkars", name_mr: "भुईचक्र", slug: "ground-chakkars", sort_order: 3, created_at: new Date().toISOString() },
  },
  {
    id: "a1000000-0000-0000-0000-000000000009",
    category_id: "c1000000-0000-0000-0000-000000000004",
    slug: "whistling-rocket",
    name_en: "Whistling Sound Rocket",
    name_mr: "शिट्टी रॉकेट",
    description: "आकाशात शिट्टी वाजवून वर जाणारा रॉकेट",
    price: 220,
    discount_percent: 20,
    unit: "Box of 10",
    image_path: null,
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: "c1000000-0000-0000-0000-000000000004", name_en: "Rockets", name_mr: "रॉकेट", slug: "rockets", sort_order: 4, created_at: new Date().toISOString() },
  },
  {
    id: "a1000000-0000-0000-0000-000000000010",
    category_id: "c1000000-0000-0000-0000-000000000004",
    slug: "lunik-colour-rocket",
    name_en: "Lunik Parachute Rocket",
    name_mr: "पॅराशूट रॉकेट",
    description: "आकाशात फुटून पॅराशूट खाली येते",
    price: 380,
    discount_percent: 25,
    unit: "Box of 5",
    image_path: null,
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: "c1000000-0000-0000-0000-000000000004", name_en: "Rockets", name_mr: "रॉकेट", slug: "rockets", sort_order: 4, created_at: new Date().toISOString() },
  },
  {
    id: "a1000000-0000-0000-0000-000000000011",
    category_id: "c1000000-0000-0000-0000-000000000005",
    slug: "2-sound-cracker",
    name_en: "2 Sound Cracker",
    name_mr: "२ आवाज फटाका",
    description: "दोन वेळा मोठा आवाज करणारा फटाका",
    price: 100,
    discount_percent: 15,
    unit: "Box of 10",
    image_path: null,
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: "c1000000-0000-0000-0000-000000000005", name_en: "Sound Crackers", name_mr: "आवाज फटाके", slug: "sound-crackers", sort_order: 5, created_at: new Date().toISOString() },
  },
  {
    id: "a1000000-0000-0000-0000-000000000012",
    category_id: "c1000000-0000-0000-0000-000000000005",
    slug: "red-fort-lad-1000",
    name_en: "Red Fort 1000 Crackers",
    name_mr: "१००० फटाक्यांची माळ",
    description: "सलग मोठा आवाज देणारी क्लासिक दिवाळी माळ",
    price: 450,
    discount_percent: 30,
    unit: "1 Piece",
    image_path: null,
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: "c1000000-0000-0000-0000-000000000005", name_en: "Sound Crackers", name_mr: "आवाज फटाके", slug: "sound-crackers", sort_order: 5, created_at: new Date().toISOString() },
  },
  {
    id: "a1000000-0000-0000-0000-000000000013",
    category_id: "c1000000-0000-0000-0000-000000000005",
    slug: "hydro-bomb-green",
    name_en: "Green Hydro Bomb",
    name_mr: "ग्रीन हायड्रो बॉम्ब",
    description: "अतिशय शक्तिशाली मोठा आवाज",
    price: 140,
    discount_percent: 20,
    unit: "Box of 10",
    image_path: null,
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: "c1000000-0000-0000-0000-000000000005", name_en: "Sound Crackers", name_mr: "आवाज फटाके", slug: "sound-crackers", sort_order: 5, created_at: new Date().toISOString() },
  },
  {
    id: "a1000000-0000-0000-0000-000000000014",
    category_id: "c1000000-0000-0000-0000-000000000006",
    slug: "single-sky-shot-colour",
    name_en: "Single Sky Shot Colour",
    name_mr: "सिंगल स्काय शॉट",
    description: "आकाशात जाऊन उमलणारा विविधरंगी गोळा",
    price: 90,
    discount_percent: 20,
    unit: "1 Pipe",
    image_path: null,
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: "c1000000-0000-0000-0000-000000000006", name_en: "Sky Shots", name_mr: "स्काय शॉट्स", slug: "sky-shots", sort_order: 6, created_at: new Date().toISOString() },
  },
  {
    id: "a1000000-0000-0000-0000-000000000015",
    category_id: "c1000000-0000-0000-0000-000000000006",
    slug: "12-shots-multi-colour",
    name_en: "12 Shots Multi-Colour Aerial",
    name_mr: "१२ शॉट्स मल्टिकलर",
    description: "सलग १२ रंगीबेरंगी आकाशीय फटाके",
    price: 420,
    discount_percent: 25,
    unit: "1 Box",
    image_path: null,
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: "c1000000-0000-0000-0000-000000000006", name_en: "Sky Shots", name_mr: "स्काय शॉट्स", slug: "sky-shots", sort_order: 6, created_at: new Date().toISOString() },
  },
  {
    id: "a1000000-0000-0000-0000-000000000016",
    category_id: "c1000000-0000-0000-0000-000000000007",
    slug: "diwali-family-mega-box",
    name_en: "Diwali Family Mega Gift Box (25 Items)",
    name_mr: "दिवाळी फॅमिली मेगा गिफ्ट बॉक्स (२५ प्रकार)",
    description: "सर्व आवडत्या फटाक्यांचा संपूर्ण कौटुंबिक संच",
    price: 1500,
    discount_percent: 35,
    unit: "1 Big Box",
    image_path: null,
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: "c1000000-0000-0000-0000-000000000007", name_en: "Gift Boxes", name_mr: "फॅमिली गिफ्ट बॉक्स", slug: "gift-boxes", sort_order: 7, created_at: new Date().toISOString() },
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
