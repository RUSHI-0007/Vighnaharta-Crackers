"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { duplicateProductAction, deleteProductAction } from "@/actions/products";
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
import { Edit2, Copy, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function ProductRowActions({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDuplicate = () => {
    startTransition(async () => {
      const res = await duplicateProductAction(productId);
      if (res.ok) {
        toast.success(`"${productName}" duplicated!`);
      } else {
        toast.error(res.error || "Failed to duplicate product.");
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteProductAction(productId);
      if (res.ok) {
        toast.success(`"${productName}" deleted!`);
        setDeleteOpen(false);
      } else {
        toast.error(res.error || "Failed to delete product.");
      }
    });
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <Link href={`/admin/products/${productId}/edit`}>
          <Button size="sm" variant="outline" className="h-9 px-2.5 gap-1">
            <Edit2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
        </Link>

        <Button
          size="sm"
          variant="ghost"
          onClick={handleDuplicate}
          disabled={isPending}
          className="h-9 px-2.5"
          title="Duplicate product"
        >
          <Copy className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => setDeleteOpen(true)}
          disabled={isPending}
          className="h-9 px-2.5 text-destructive hover:bg-destructive/10"
          title="Delete product"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &ldquo;{productName}&rdquo;?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin mr-1.5" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

