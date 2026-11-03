"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
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

    for (const cat of categories) {
      const prods = filteredProducts.filter(
        (p) => p.category?.slug === cat.slug || p.category_id === cat.id
      );
      if (prods.length > 0) {
        groups.push({ category: cat, products: prods });
      }
    }

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
      {/* 1. Header Toolbar */}
      <div className="bg-white rounded-2xl border border-[#e9e0d5] p-5 sm:p-7 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-[#b91c32]/10 text-[#b91c32] flex items-center justify-center border border-[#b91c32]/20 shrink-0">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#b91c32] block">
                Wholesale Catalog
              </span>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#202d3a] tracking-tight leading-tight">
                Quick Shop / Wholesale Price List
              </h1>
              <p className="text-xs text-[#737373]">
                Order fireworks in bulk or family packs with instant quantity steppers
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#737373]" />
            <input
              type="text"
              placeholder="Search by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#e9e0d5] bg-[#fff9f0]/60 text-[#202d3a] placeholder-[#737373] focus:bg-white focus:outline-none focus:border-[#b91c32]"
            />
          </div>
        </div>

        {/* Horizontal Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none border-t border-[#e9e0d5] -mx-1 px-1">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#b91c32] text-white shadow-xs font-bold"
                : "bg-[#f5eddf] text-[#202d3a] hover:bg-[#e9e0d5]"
            }`}
          >
            All ({products.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                selectedCategory === cat.slug
                  ? "bg-[#b91c32] text-white shadow-xs font-bold"
                  : "bg-[#f5eddf] text-[#202d3a] hover:bg-[#e9e0d5]"
              }`}
            >
              {cat.name_en}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Products List */}
      {groupedProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e9e0d5] p-12 text-center text-[#737373] text-sm shadow-2xs">
          No firecrackers found matching your search.
        </div>
      ) : (
        <>
          {/* Mobile View: High-Density List */}
          <div className="md:hidden space-y-4">
            {groupedProducts.map((group) => (
              <div
                key={group.category?.id || "other"}
                className="bg-white rounded-2xl border border-[#e9e0d5] overflow-hidden shadow-2xs"
              >
                {/* Category Header */}
                <div className="bg-[#f5eddf] px-4 py-2.5 border-b border-[#e9e0d5] flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#202d3a] uppercase tracking-wide">
                    <span className="w-1.5 h-3.5 bg-[#b91c32] rounded-full inline-block" />
                    <span>
                      {group.category ? group.category.name_en : "Other Firecrackers"}
                    </span>
                    {group.category && (
                      <span className="text-[11px] font-normal text-[#737373]">
                        ({group.category.name_mr})
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#737373] bg-white font-mono px-2 py-0.5 rounded-full border border-[#e9e0d5]">
                    {group.products.length}
                  </span>
                </div>

                {/* Items list */}
                <div className="divide-y divide-[#f5eddf]">
                  {group.products.map((product) => {
                    const effectivePrice = calculateEffectivePrice(
                      product.price,
                      product.discount_percent
                    );
                    const qty = cartQuantities[product.id] || 0;
                    const lineAmount = effectivePrice * qty;

                    return (
                      <div
                        key={product.id}
                        className={`p-3.5 flex items-center gap-3 transition-colors ${
                          qty > 0 ? "bg-[#fbecef]/30" : ""
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="relative h-12 w-12 rounded-xl bg-[#fff9f0] border border-[#e9e0d5] flex items-center justify-center shrink-0 overflow-hidden">
                          {product.image_path ? (
                            <Image
                              src={product.image_path}
                              alt={product.name_en}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <Flame className="h-5 w-5 text-[#b91c32]" />
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 pr-1">
                          <span className="font-semibold text-xs text-[#202d3a] block leading-snug truncate">
                            {product.name_en}
                          </span>
                          <span className="text-[11px] text-[#737373] block truncate">
                            {product.name_mr} • {product.unit}
                          </span>
                          <div className="flex items-baseline gap-1.5 mt-0.5">
                            <span className="font-bold text-xs text-[#b91c32] font-mono">
                              {formatCurrency(effectivePrice)}
                            </span>
                            {product.discount_percent > 0 && (
                              <span className="text-[10px] text-[#737373] line-through font-mono">
                                {formatCurrency(product.price)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Stepper */}
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <div className="flex items-center rounded-lg border border-[#e9e0d5] bg-[#fff9f0] overflow-hidden">
                            <button
                              type="button"
                              onClick={() => handleDecrement(product)}
                              disabled={qty === 0}
                              className={`h-7 w-7 flex items-center justify-center transition-colors ${
                                qty > 0
                                  ? "hover:bg-[#f5eddf] text-[#202d3a] cursor-pointer"
                                  : "text-[#737373]/40 cursor-not-allowed"
                              }`}
                              aria-label="Decrease"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-[24px] text-center font-mono font-bold text-xs text-[#202d3a]">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleIncrement(product)}
                              className="h-7 w-7 bg-[#b91c32]/10 hover:bg-[#b91c32] hover:text-white text-[#b91c32] flex items-center justify-center transition-colors cursor-pointer"
                              aria-label="Increase"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          {qty > 0 && (
                            <span className="text-[10px] font-bold text-[#b91c32] font-mono">
                              = {formatCurrency(lineAmount)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-2xl border border-[#e9e0d5] shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#202d3a]">
                <thead className="bg-[#f5eddf] text-[11px] uppercase tracking-wider text-[#737373] border-b border-[#e9e0d5] font-bold">
                  <tr>
                    <th scope="col" className="py-3.5 px-4 min-w-[220px]">
                      Product
                    </th>
                    <th scope="col" className="py-3.5 px-3 text-right">
                      MRP
                    </th>
                    <th scope="col" className="py-3.5 px-3 text-right">
                      Our Price
                    </th>
                    <th scope="col" className="py-3.5 px-3 text-center">
                      Savings
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-center min-w-[120px]">
                      Quantity
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-right min-w-[100px]">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#f5eddf]">
                  {groupedProducts.map((group) => (
                    <tr key={group.category?.id || "other"} className="contents">
                      {/* Category Header Row */}
                      <tr className="bg-[#fff9f0] border-t-2 border-[#b91c32]">
                        <td
                          colSpan={6}
                          className="py-3 px-4 font-bold text-[#202d3a] text-xs uppercase tracking-wide flex items-center gap-2"
                        >
                          <span className="w-1.5 h-4 bg-[#b91c32] rounded-full inline-block" />
                          <span className="font-serif text-sm">
                            {group.category ? group.category.name_en : "Other Firecrackers"}
                          </span>
                          {group.category && (
                            <span className="text-[11px] font-normal text-[#737373]">
                              ({group.category.name_mr})
                            </span>
                          )}
                          <span className="text-[10px] bg-[#f5eddf] text-[#202d3a] font-mono px-2 py-0.5 rounded-full ml-auto">
                            {group.products.length} items
                          </span>
                        </td>
                      </tr>

                      {/* Products */}
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
                            className={`hover:bg-[#fff9f0]/80 transition-colors ${
                              qty > 0 ? "bg-[#fbecef]/20" : ""
                            }`}
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 rounded-lg bg-[#fff9f0] border border-[#e9e0d5] flex items-center justify-center shrink-0 overflow-hidden">
                                  {product.image_path ? (
                                    <Image
                                      src={product.image_path}
                                      alt={product.name_en}
                                      fill
                                      className="object-cover"
                                      sizes="40px"
                                    />
                                  ) : (
                                    <Flame className="h-5 w-5 text-[#b91c32]" />
                                  )}
                                </div>
                                <div>
                                  <span className="font-semibold text-[#202d3a] block leading-tight">
                                    {product.name_en}
                                  </span>
                                  <span className="text-[11px] text-[#737373] block">
                                    {product.name_mr}
                                  </span>
                                  <span className="text-[10px] text-[#737373] font-mono">
                                    Unit: {product.unit}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className="py-3 px-3 text-right text-[#737373] line-through font-mono">
                              {formatCurrency(product.price)}
                            </td>

                            <td className="py-3 px-3 text-right font-bold text-[#b91c32] font-mono text-sm">
                              {formatCurrency(effectivePrice)}
                            </td>

                            <td className="py-3 px-3 text-center">
                              {product.discount_percent > 0 ? (
                                <span className="inline-block bg-[#fbecef] text-[#b91c32] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#b91c32]/20">
                                  {product.discount_percent}% OFF
                                </span>
                              ) : (
                                <span className="text-[#737373] text-[11px]">-</span>
                              )}
                            </td>

                            <td className="py-3 px-4">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleDecrement(product)}
                                  disabled={qty === 0}
                                  className={`h-7 w-7 rounded-lg border flex items-center justify-center transition-colors ${
                                    qty > 0
                                      ? "border-[#e9e0d5] bg-white hover:bg-[#f5eddf] text-[#202d3a] cursor-pointer"
                                      : "border-[#e9e0d5]/60 bg-[#fff9f0] text-[#737373]/40 cursor-not-allowed"
                                  }`}
                                  aria-label="Decrease"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>

                                <span className="min-w-[28px] text-center font-mono font-bold text-xs text-[#202d3a]">
                                  {qty}
                                </span>

                                <button
                                  type="button"
                                  onClick={() => handleIncrement(product)}
                                  className="h-7 w-7 rounded-lg border border-[#b91c32]/30 bg-[#fbecef] hover:bg-[#b91c32] hover:text-white text-[#b91c32] flex items-center justify-center transition-colors cursor-pointer"
                                  aria-label="Increase"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </td>

                            <td className="py-3 px-4 text-right font-bold text-[#202d3a] font-mono">
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
        </>
      )}

      {/* 3. Floating Sticky Bottom Bar (Dark Navy Theme with Gold / Crimson) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#202d3a] text-white border-t border-white/10 shadow-[0_-4px_24px_rgba(0,0,0,0.18)] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="container mx-auto max-w-6xl flex items-center justify-between gap-3">
          {/* Left Totals */}
          <div className="flex items-center gap-3 sm:gap-6 text-xs">
            <div>
              <span className="text-[10px] uppercase text-[#c6cdd2] font-semibold block leading-none">
                ITEMS
              </span>
              <span className="font-bold text-white text-xs sm:text-sm font-mono leading-tight">
                {mounted ? totalCount : 0}
              </span>
            </div>

            <div className="hidden sm:block border-l border-white/10 pl-4">
              <span className="text-[10px] uppercase text-[#c6cdd2] font-semibold block leading-none">
                MRP TOTAL
              </span>
              <span className="font-semibold text-[#c6cdd2] text-xs line-through font-mono leading-tight">
                {mounted ? formatCurrency(subtotal) : "₹0.00"}
              </span>
            </div>

            {discountTotal > 0 && (
              <div className="border-l border-white/10 pl-3 sm:pl-4">
                <span className="text-[10px] uppercase text-[#e9b94f] font-semibold block leading-none">
                  SAVINGS
                </span>
                <span className="font-bold text-[#e9b94f] text-xs font-mono leading-tight">
                  {mounted ? formatCurrency(discountTotal) : "₹0.00"}
                </span>
              </div>
            )}

            <div className="border-l border-white/10 pl-3 sm:pl-4">
              <span className="text-[10px] uppercase text-[#c6cdd2] font-semibold block leading-none">
                PAYABLE
              </span>
              <span className="font-black text-white text-sm sm:text-base font-mono leading-tight">
                {mounted ? formatCurrency(total) : "₹0.00"}
              </span>
            </div>
          </div>

          {/* Right: Checkout CTA */}
          <div className="flex items-center gap-3">
            {totalCount > 0 && (
              <span className="hidden lg:inline-flex items-center gap-1 text-[11px] text-[#e9b94f] font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Items in bag</span>
              </span>
            )}
            <Link
              href="/cart"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#b91c32] hover:bg-[#981426] active:scale-95 text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 shadow-sm transition-all whitespace-nowrap cursor-pointer"
            >
              <span>View Bag</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
