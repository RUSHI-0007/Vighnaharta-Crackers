"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/lib/translations";

export function ProductSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
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
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#737373]" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t.common.searchPlaceholder}
        className="pl-9 pr-9 bg-white border-[#e9e0d5] h-10 rounded-[10px] text-xs sm:text-[13px] text-[#202d3a] placeholder:text-[#737373]"
      />
      {isPending && (
        <Loader2 className="absolute right-9 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-[#b91c32]" />
      )}
      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#202d3a] p-1 cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </form>
  );
}
