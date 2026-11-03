"use client";

import { useState } from "react";
import type { Category, ProductWithCategory } from "@/types";
import { formatCurrency } from "@/lib/format";
import { calculateEffectivePrice } from "@/lib/pricing";
import { StockSwitch } from "@/components/admin/products/stock-switch";
import { ProductRowActions } from "@/components/admin/products/product-row-actions";
import { BulkActionBar } from "@/components/admin/products/bulk-action-bar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Sparkles, Package } from "lucide-react";

interface ProductsTableProps {
  products: ProductWithCategory[];
  categories: Category[];
}

export function ProductsTable({ products, categories }: ProductsTableProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filtering
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      search === "" ||
      p.name_en.toLowerCase().includes(search.toLowerCase()) ||
      p.name_mr.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || p.category_id === selectedCategory;

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "in_stock" && p.in_stock) ||
      (stockFilter === "out_of_stock" && !p.in_stock);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredProducts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products by English or Marathi name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40 sm:w-48 h-11">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name_en} ({c.name_mr})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={stockFilter} onValueChange={setStockFilter}>
            <SelectTrigger className="w-36 h-11">
              <SelectValue placeholder="Stock Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stock</SelectItem>
              <SelectItem value="in_stock">In Stock</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-2xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    filteredProducts.length > 0 &&
                    selectedIds.length === filteredProducts.length
                  }
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>MRP</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Final Price</TableHead>
              <TableHead>Stock Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((p) => {
              const effectivePrice = calculateEffectivePrice(p.price, p.discount_percent);
              const isSelected = selectedIds.includes(p.id);

              return (
                <TableRow key={p.id} data-state={isSelected ? "selected" : undefined}>
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) =>
                        handleToggleRow(p.id, Boolean(checked))
                      }
                      aria-label={`Select ${p.name_en}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-secondary/50 border border-border flex items-center justify-center shrink-0 overflow-hidden">
                        {p.image_path ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={p.image_path}
                            alt={p.name_en}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-xl">🎇</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-foreground text-sm truncate">
                            {p.name_mr}
                          </p>
                          {p.featured && (
                            <Badge variant="gold" className="text-[9px] px-1.5 py-0">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {p.name_en} • <span className="font-mono">{p.unit}</span>
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {p.category?.name_en || "General"}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {formatCurrency(p.price)}
                  </TableCell>
                  <TableCell>
                    {p.discount_percent > 0 ? (
                      <Badge variant="destructive" className="font-mono text-xs">
                        {p.discount_percent}% OFF
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">0%</span>
                    )}
                  </TableCell>
                  <TableCell className="font-mono font-bold text-sm text-primary">
                    {formatCurrency(effectivePrice)}
                  </TableCell>
                  <TableCell>
                    <StockSwitch
                      productId={p.id}
                      initialInStock={p.in_stock}
                      productName={p.name_en}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <ProductRowActions
                      productId={p.id}
                      productName={p.name_en}
                    />
                  </TableCell>
                </TableRow>
              );
            })}

            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center text-muted-foreground">
                  <Package className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  <p>No products match your filters.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Stacked Cards (Optimized for 360px phones) */}
      <div className="md:hidden space-y-3">
        {filteredProducts.map((p) => {
          const effectivePrice = calculateEffectivePrice(p.price, p.discount_percent);
          const isSelected = selectedIds.includes(p.id);

          return (
            <div
              key={p.id}
              className={`rounded-2xl border p-4 bg-card space-y-3 transition-colors ${
                isSelected ? "border-primary bg-primary/5" : "border-border"
              }`}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={(checked) =>
                    handleToggleRow(p.id, Boolean(checked))
                  }
                  aria-label={`Select ${p.name_en}`}
                  className="mt-1"
                />

                <div className="h-14 w-14 rounded-xl bg-secondary/50 border border-border flex items-center justify-center shrink-0 overflow-hidden">
                  {p.image_path ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image_path}
                      alt={p.name_en}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl">🎇</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-heading font-bold text-sm text-foreground truncate">
                      {p.name_mr}
                    </h4>
                    {p.featured && (
                      <Badge variant="gold" className="text-[9px] px-1 py-0">
                        <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                        Top
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{p.name_en}</p>
                  <p className="text-[11px] text-accent font-medium mt-0.5">
                    {p.category?.name_en || "General"} • {p.unit}
                  </p>
                </div>
              </div>

              {/* Price and Stock Row */}
              <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
                <div>
                  <span className="text-muted-foreground line-through mr-1.5 font-mono">
                    {formatCurrency(p.price)}
                  </span>
                  <span className="font-heading font-bold text-base text-primary">
                    {formatCurrency(effectivePrice)}
                  </span>
                  {p.discount_percent > 0 && (
                    <Badge variant="destructive" className="ml-1.5 text-[10px] px-1 py-0 font-bold">
                      {p.discount_percent}% OFF
                    </Badge>
                  )}
                </div>

                <StockSwitch
                  productId={p.id}
                  initialInStock={p.in_stock}
                  productName={p.name_en}
                />
              </div>

              {/* Mobile Actions */}
              <div className="flex justify-end pt-2 border-t border-border/50">
                <ProductRowActions
                  productId={p.id}
                  productName={p.name_en}
                />
              </div>
            </div>
          );
        })}

        {filteredProducts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
            <Package className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">No products found.</p>
          </div>
        )}
      </div>

      {/* Floating Bulk Action Bar */}
      <BulkActionBar
        selectedIds={selectedIds}
        onClear={() => setSelectedIds([])}
      />
    </div>
  );
}

