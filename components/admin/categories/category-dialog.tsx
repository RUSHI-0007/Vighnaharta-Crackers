"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createCategoryAction, updateCategoryAction } from "@/actions/categories";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { Category } from "@/types";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
}

export function CategoryDialog({
  open,
  onOpenChange,
  category,
}: CategoryDialogProps) {
  const [nameEn, setNameEn] = useState(category?.name_en || "");
  const [nameMr, setNameMr] = useState(category?.name_mr || "");
  const [slug, setSlug] = useState(category?.slug || "");
  const [sortOrder, setSortOrder] = useState(category?.sort_order ?? 0);
  const [isPending, startTransition] = useTransition();

  const handleNameEnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNameEn(val);
    if (!category) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameEn.trim() || !nameMr.trim() || !slug.trim()) {
      toast.error("Please fill all required fields.");
      return;
    }

    startTransition(async () => {
      const data = {
        name_en: nameEn.trim(),
        name_mr: nameMr.trim(),
        slug: slug.trim(),
        sort_order: Number(sortOrder),
      };

      const res = category
        ? await updateCategoryAction(category.id, data)
        : await createCategoryAction(data);

      if (res.ok) {
        toast.success(category ? "Category updated!" : "Category created!");
        onOpenChange(false);
      } else {
        toast.error(res.error || "Action failed.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="cat_name_en">English Name *</Label>
            <Input
              id="cat_name_en"
              required
              value={nameEn}
              onChange={handleNameEnChange}
              placeholder="e.g. Sparklers"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cat_name_mr">Marathi Name *</Label>
            <Input
              id="cat_name_mr"
              required
              value={nameMr}
              onChange={(e) => setNameMr(e.target.value)}
              placeholder="उदा. फुलबाजे"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cat_slug">URL Slug *</Label>
            <Input
              id="cat_slug"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="sparklers"
              className="font-mono text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cat_sort">Sort Order Number</Label>
            <Input
              id="cat_sort"
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="h-4 w-4 animate-spin mr-1.5" />}
              {category ? "Save Changes" : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

