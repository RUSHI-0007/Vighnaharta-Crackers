"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Category, ProductWithCategory } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/format";
import { calculateEffectivePrice, computeCartTotals } from "@/lib/pricing";
import { useMounted } from "@/hooks/use-mounted";
import {
  ShoppingBag,
  Search,
  Plus,
  Minus,
  ArrowRight,
  Flame,
  CheckCircle2,
} from "lucide-react";

interface QuickShopTableProps {
  categories: Category[];
  products: ProductWithCategory[];
}

export function QuickShopTable({ categories, products }: QuickShopTableProps) {
  const mounted = useMounted();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const setQty = useCartStore((s) => s.setQty);

  // Cart item lookup map: productId -> quantity
  const cartQuantities = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of items) {
      map[item.productId] = item.quantity;
    }
    return map;
  }, [items]);

  // Overall totals for floating bottom bar
  const { totalCount, subtotal, discountTotal, total } = useMemo(
    () => computeCartTotals(items),
    [items]
  );

  // Filter products by category and search
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === "all" ||
        p.category?.slug === selectedCategory ||
        p.category_id === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name_en.toLowerCase().includes(q) ||
        p.name_mr.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Group filtered products by Category
  const groupedProducts = useMemo(() => {
    const groups: { category: Category | null; products: ProductWithCategory[] }[] = [];

    // Categories in order
    for (const cat of categories) {
      const prods = filteredProducts.filter(
        (p) => p.category?.slug === cat.slug || p.category_id === cat.id
      );
      if (prods.length > 0) {
        groups.push({ category: cat, products: prods });
      }
    }

    // Uncategorized products
    const uncategorized = filteredProducts.filter(
      (p) => !groups.some((g) => g.products.some((gp) => gp.id === p.id))
    );
    if (uncategorized.length > 0) {
      groups.push({ category: null, products: uncategorized });
    }

    return groups;
  }, [categories, filteredProducts]);

  const handleIncrement = (product: ProductWithCategory) => {
    const currentQty = cartQuantities[product.id] || 0;
    if (currentQty === 0) {
      addItem(product, 1);
    } else {
      setQty(product.id, currentQty + 1);
    }
  };

  const handleDecrement = (product: ProductWithCategory) => {
    const currentQty = cartQuantities[product.id] || 0;
    if (currentQty > 0) {
      setQty(product.id, currentQty - 1);
    }
  };

  return (
    <div className="space-y-6 pb-28">
      {/* 1. Header Toolbar (like Anil Crackers Screenshot 5) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 shrink-0">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Quick Shop / Price List
              </h1>
              <p className="text-xs text-slate-500">
                Choose your products and quantities in wholesale table format
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Horizontal Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none border-t border-slate-100">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "bg-emerald-600 text-white shadow-2xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All Products ({products.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                selectedCategory === cat.slug
                  ? "bg-emerald-600 text-white shadow-2xs font-bold"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat.name_en}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Products Table */}
      {groupedProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
          No firecrackers found matching your search.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              
              {/* Table Column Headings */}
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200 font-bold">
                <tr>
                  <th scope="col" className="py-3 px-4 min-w-[200px]">
                    Product
                  </th>
                  <th scope="col" className="py-3 px-3 text-right">
                    MRP
                  </th>
                  <th scope="col" className="py-3 px-3 text-right">
                    Our Price
                  </th>
                  <th scope="col" className="py-3 px-3 text-center">
                    Discount
                  </th>
                  <th scope="col" className="py-3 px-4 text-center min-w-[120px]">
                    Quantity
                  </th>
                  <th scope="col" className="py-3 px-4 text-right min-w-[90px]">
                    Amount
                  </th>
                </tr>
              </thead>

              {/* Table Body Grouped by Category */}
              <tbody className="divide-y divide-slate-100">
                {groupedProducts.map((group) => (
                  <tr key={group.category?.id || "other"} className="contents">
                    {/* Category Header Row (like Anil Crackers Screenshot 5) */}
                    <tr className="bg-slate-50/90 border-t-2 border-emerald-500">
                      <td
                        colSpan={6}
                        className="py-2.5 px-4 font-bold text-slate-800 text-xs uppercase tracking-wide flex items-center gap-2"
                      >
                        <span className="w-1.5 h-4 bg-emerald-600 rounded-full inline-block" />
                        <span>
                          {group.category ? group.category.name_en : "Other Firecrackers"}
                        </span>
                        {group.category && (
                          <span className="text-[11px] font-normal text-slate-500 lowercase">
                            ({group.category.name_mr})
                          </span>
                        )}
                        <span className="text-[10px] bg-slate-200/70 text-slate-700 font-mono px-1.5 py-0.2 rounded ml-auto">
                          {group.products.length} items
                        </span>
                      </td>
                    </tr>

                    {/* Products in this category */}
                    {group.products.map((product) => {
                      const effectivePrice = calculateEffectivePrice(
                        product.price,
                        product.discount_percent
                      );
                      const qty = cartQuantities[product.id] || 0;
                      const lineAmount = effectivePrice * qty;

                      return (
                        <tr
                          key={product.id}
                          className={`hover:bg-slate-50/70 transition-colors ${
                            qty > 0 ? "bg-emerald-50/20" : ""
                          }`}
                        >
                          {/* Product Info */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                                {product.image_path ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={product.image_path}
                                    alt={product.name_en}
                                    className="h-full w-full object-contain p-1"
                                  />
                                ) : (
                                  <Flame className="h-5 w-5 text-amber-500" />
                                )}
                              </div>
                              <div>
                                <span className="font-bold text-slate-900 block leading-tight">
                                  {product.name_en}
                                </span>
                                <span className="text-[11px] text-slate-500 block">
                                  {product.name_mr}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  Unit: {product.unit}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* MRP */}
                          <td className="py-3 px-3 text-right text-slate-400 line-through font-mono">
                            {formatCurrency(product.price)}
                          </td>

                          {/* Our Price */}
                          <td className="py-3 px-3 text-right font-extrabold text-emerald-700 font-mono text-sm">
                            {formatCurrency(effectivePrice)}
                          </td>

                          {/* Discount Badge */}
                          <td className="py-3 px-3 text-center">
                            {product.discount_percent > 0 ? (
                              <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                                {product.discount_percent}% OFF
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">-</span>
                            )}
                          </td>

                          {/* Quantity Stepper */}
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleDecrement(product)}
                                disabled={qty === 0}
                                className={`h-7 w-7 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${
                                  qty > 0
                                    ? "border-emerald-400 bg-white hover:bg-emerald-100 text-emerald-800"
                                    : "border-slate-200 bg-slate-50 text-slate-300 cursor-not-allowed"
                                }`}
                                aria-label="Decrease"
                              >
                                <Minus className="h-3 w-3" />
                              </button>

                              <span className="min-w-[28px] text-center font-mono font-bold text-xs text-slate-800">
                                {qty}
                              </span>

                              <button
                                type="button"
                                onClick={() => handleIncrement(product)}
                                className="h-7 w-7 rounded-md border border-emerald-400 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 flex items-center justify-center transition-colors cursor-pointer"
                                aria-label="Increase"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </td>

                          {/* Line Amount */}
                          <td className="py-3 px-4 text-right font-bold text-slate-900 font-mono">
                            {formatCurrency(lineAmount)}
                          </td>
                        </tr>
                      );
                    })}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}

      {/* 3. Floating Sticky Bottom Bar (Exact match to Anil Crackers Screenshot 5) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-300 shadow-[0_-4px_16px_rgba(0,0,0,0.1)] px-4 py-3">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Left Totals Counters */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs">
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-bold block">
                ITEMS
              </span>
              <span className="font-extrabold text-slate-800 text-sm font-mono">
                {mounted ? totalCount : 0}
              </span>
            </div>

            <div className="hidden sm:block border-l border-slate-200 pl-4">
              <span className="text-[10px] uppercase text-slate-400 font-bold block">
                TOTAL MRP
              </span>
              <span className="font-bold text-slate-500 text-xs line-through font-mono">
                {mounted ? formatCurrency(subtotal) : "₹0.00"}
              </span>
            </div>

            <div className="border-l border-slate-200 pl-4">
              <span className="text-[10px] uppercase text-emerald-700 font-bold block">
                YOU SAVE
              </span>
              <span className="font-bold text-emerald-700 text-xs font-mono">
                {mounted ? formatCurrency(discountTotal) : "₹0.00"}
              </span>
            </div>

            <div className="border-l border-slate-200 pl-4">
              <span className="text-[10px] uppercase text-slate-900 font-bold block">
                PAYABLE
              </span>
              <span className="font-black text-slate-900 text-base font-mono">
                {mounted ? formatCurrency(total) : "₹0.00"}
              </span>
            </div>
          </div>

          {/* Right: View Cart Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {totalCount > 0 && (
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Ready for order</span>
              </span>
            )}
            <Link
              href="/cart"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 shadow-sm transition-all"
            >
              <span>View Cart</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
