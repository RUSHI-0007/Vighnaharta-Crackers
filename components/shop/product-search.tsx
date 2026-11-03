"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ProductSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set("search", query.trim());
    } else {
      params.delete("search");
    }
    startTransition(() => {
      router.push(`/shop?${params.toString()}`);
    });
  };

  const handleClear = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    startTransition(() => {
      router.push(`/shop?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search fireworks by name..."
        className="pl-9 pr-9 bg-card border-border h-10 rounded-lg text-xs sm:text-sm text-white placeholder:text-slate-500"
      />
      {isPending && (
        <Loader2 className="absolute right-9 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-primary" />
      )}
      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </form>
  );
}
