"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Category, Product } from "@/types";
import { createProductAction, updateProductAction } from "@/actions/products";
import { ProductImageUpload } from "@/components/admin/products/image-upload";
import { calculateEffectivePrice } from "@/lib/pricing";
import { formatCurrency } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProductFormProps {
  categories: Category[];
  product?: Product | null;
}

export function ProductForm({ categories, product }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [nameEn, setNameEn] = useState(product?.name_en || "");
  const [nameMr, setNameMr] = useState(product?.name_mr || "");
  const [categoryId, setCategoryId] = useState(
    product?.category_id || categories[0]?.id || ""
  );
  const [price, setPrice] = useState<string>(product ? String(product.price) : "");
  const [discountPercent, setDiscountPercent] = useState<string>(
    product ? String(product.discount_percent) : "0"
  );
  const [unit, setUnit] = useState(product?.unit || "Box of 10");
  const [description, setDescription] = useState(product?.description || "");
  const [imagePath, setImagePath] = useState<string | null>(product?.image_path || null);
  const [inStock, setInStock] = useState<boolean>(product ? product.in_stock : true);
  const [featured, setFeatured] = useState<boolean>(product ? product.featured : false);

  // Live price calculation
  const numPrice = parseFloat(price) || 0;
  const numDiscount = parseInt(discountPercent, 10) || 0;
  const effectivePrice = calculateEffectivePrice(numPrice, numDiscount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameEn.trim() || !nameMr.trim()) {
      toast.error("Please enter English and Marathi product names.");
      return;
    }
    if (!categoryId) {
      toast.error("Please select a category.");
      return;
    }
    if (numPrice <= 0) {
      toast.error("MRP must be greater than 0.");
      return;
    }
    if (numDiscount < 0 || numDiscount > 90) {
      toast.error("Discount percent must be between 0 and 90.");
      return;
    }

    startTransition(async () => {
      const payload = {
        name_en: nameEn.trim(),
        name_mr: nameMr.trim(),
        category_id: categoryId,
        price: numPrice,
        discount_percent: numDiscount,
        unit: unit.trim() || "Box",
        description: description.trim() || null,
        image_path: imagePath,
        in_stock: inStock,
        featured,
      };

      const res = product
        ? await updateProductAction(product.id, payload)
        : await createProductAction(payload);

      if (res.ok) {
        toast.success(product ? "Product updated!" : "Product created!");
        router.push("/admin/products");
        router.refresh();
      } else {
        toast.error(res.error || "Action failed.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/products">
          <Button variant="outline" size="sm" type="button" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Products</span>
          </Button>
        </Link>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 space-y-6">
        {/* Name inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="name_en">English Name *</Label>
            <Input
              id="name_en"
              required
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="e.g. 10 cm Electric Sparklers"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="name_mr">Marathi Name *</Label>
            <Input
              id="name_mr"
              required
              value={nameMr}
              onChange={(e) => setNameMr(e.target.value)}
              placeholder="उदा. १० सेमी इलेक्ट्रिक फुलबाजे"
            />
          </div>
        </div>

        {/* Category & Unit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="category">Category *</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name_en} ({c.name_mr})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="unit">Unit (Packaging) *</Label>
            <Input
              id="unit"
              required
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="e.g. Box of 10, 1 Piece, 1 Box"
            />
          </div>
        </div>

        {/* Price & Discount & Live Effective Price Preview */}
        <div className="rounded-2xl border border-border/80 bg-secondary/40 p-4 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-accent">
            Pricing & Wholesale Discount
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div className="space-y-1.5">
              <Label htmlFor="price">MRP (₹) *</Label>
              <Input
                id="price"
                type="number"
                min="1"
                step="1"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="100"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="discount">Discount Percent (%)</Label>
              <Input
                id="discount"
                type="number"
                min="0"
                max="90"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                placeholder="20"
              />
            </div>

            {/* Live Preview Card */}
            <div className="rounded-xl border border-primary/30 bg-card p-3 text-center sm:text-left">
              <span className="text-[10px] text-muted-foreground block">
                Live Effective Sale Price
              </span>
              <span className="font-heading text-xl font-bold text-primary">
                {formatCurrency(effectivePrice)}
              </span>
              {numDiscount > 0 && (
                <span className="text-[11px] text-emerald-400 block">
                  Customer saves {formatCurrency(numPrice - effectivePrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="आकर्षक सोनेरी प्रकाश, धूरमुक्त..."
          />
        </div>

        {/* Image Upload Dropzone */}
        <div className="space-y-1.5">
          <Label>Product Photo</Label>
          <ProductImageUpload value={imagePath} onChange={setImagePath} />
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border/60">
          <div className="flex items-center justify-between rounded-xl border border-border p-3.5">
            <div>
              <Label htmlFor="in_stock" className="font-bold cursor-pointer">
                In Stock (उपलब्ध आहे)
              </Label>
              <p className="text-xs text-muted-foreground">
                Turn off to hide add-to-cart button
              </p>
            </div>
            <Switch
              id="in_stock"
              checked={inStock}
              onCheckedChange={setInStock}
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border p-3.5">
            <div>
              <Label htmlFor="featured" className="font-bold cursor-pointer">
                Featured Product (लोकप्रिय)
              </Label>
              <p className="text-xs text-muted-foreground">
                Highlight on home page
              </p>
            </div>
            <Switch
              id="featured"
              checked={featured}
              onCheckedChange={setFeatured}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/products")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending} className="min-w-[120px]">
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                <span>Saving...</span>
              </>
            ) : (
              <span>{product ? "Update Product" : "Create Product"}</span>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

