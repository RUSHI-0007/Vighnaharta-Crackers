"use client";

import { useState, useTransition } from "react";
import type { Category } from "@/types";
import { CategoryDialog } from "@/components/admin/categories/category-dialog";
import { deleteCategoryAction } from "@/actions/categories";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Edit2, Trash2, Plus, Layers, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function CategoryList({ categories }: { categories: Category[] }) {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!categoryToDelete) return;

    startTransition(async () => {
      const res = await deleteCategoryAction(categoryToDelete.id);
      if (res.ok) {
        toast.success("Category deleted!");
        setCategoryToDelete(null);
      } else {
        toast.error(res.error || "Failed to delete category.");
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleOpenAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Category</span>
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="divide-y divide-border/60">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-accent font-mono font-bold text-xs shrink-0">
                  #{cat.sort_order}
                </div>
                <div className="min-w-0">
                  <h4 className="font-heading text-sm font-bold text-foreground truncate">
                    {cat.name_mr} ({cat.name_en})
                  </h4>
                  <p className="text-xs text-muted-foreground font-mono">
                    /{cat.slug}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOpenEdit(cat)}
                  className="h-9 px-3 gap-1"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setCategoryToDelete(cat)}
                  className="h-9 px-3 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}

          {categories.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              <Layers className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p>No categories found.</p>
            </div>
          )}
        </div>
      </div>

      <CategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        category={editingCategory}
      />

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={categoryToDelete !== null}
        onOpenChange={(open) => !open && setCategoryToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &ldquo;{categoryToDelete?.name_en}&rdquo;?
              This action cannot be undone. If products are attached to this category, deletion will be blocked.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isPending}
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin mr-1.5" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

