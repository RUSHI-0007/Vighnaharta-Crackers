"use client";

import { useState } from "react";
import type { CustomerSummary } from "@/types";
import { formatCurrency, formatDate } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Download, Phone, Mail, Users, ArrowUpDown } from "lucide-react";

export function CustomersTable({ customers }: { customers: CustomerSummary[] }) {
  const [search, setSearch] = useState("");
  const [sortDesc, setSortDesc] = useState(true);

  const filtered = customers
    .filter((c) => {
      if (!search) return true;
      const term = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(term) ||
        c.phone.includes(term) ||
        c.email.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      return sortDesc
        ? b.total_spent - a.total_spent
        : a.total_spent - b.total_spent;
    });

  return (
    <div className="space-y-4">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer name, phone, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortDesc(!sortDesc)}
            className="h-11 gap-1.5 text-xs"
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
            <span>Sort: {sortDesc ? "Highest Spent" : "Lowest Spent"}</span>
          </Button>

          <a href="/api/admin/export/customers" download>
            <Button size="sm" className="h-11 gap-1.5 text-xs">
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </Button>
          </a>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-2xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Latest Delivery Address</TableHead>
              <TableHead className="text-center">Orders Count</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Last Order</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((customer) => (
              <TableRow key={customer.phone}>
                <TableCell>
                  <p className="font-bold text-foreground text-sm">
                    {customer.name}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="space-y-0.5 text-xs">
                    <a
                      href={`tel:${customer.phone}`}
                      className="flex items-center gap-1 text-primary hover:underline font-mono"
                    >
                      <Phone className="h-3 w-3" />
                      <span>{customer.phone}</span>
                    </a>
                    <a
                      href={`mailto:${customer.email}`}
                      className="flex items-center gap-1 text-muted-foreground hover:text-foreground truncate max-w-[180px]"
                    >
                      <Mail className="h-3 w-3" />
                      <span>{customer.email}</span>
                    </a>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground max-w-xs truncate">
                  {customer.address}
                </TableCell>
                <TableCell className="text-center font-mono font-bold text-xs">
                  {customer.orders_count}
                </TableCell>
                <TableCell className="font-heading font-bold text-primary text-base">
                  {formatCurrency(customer.total_spent)}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {formatDate(customer.last_order_at)}
                </TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  <p>No customers found.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Stacked Cards (360px friendly) */}
      <div className="md:hidden space-y-3">
        {filtered.map((customer) => (
          <div
            key={customer.phone}
            className="rounded-2xl border border-border bg-card p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-heading font-bold text-foreground text-base">
                  {customer.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5 max-w-[200px] truncate">
                  {customer.address}
                </p>
              </div>

              <div className="text-right">
                <span className="font-heading font-bold text-lg text-primary block">
                  {formatCurrency(customer.total_spent)}
                </span>
                <span className="text-[10px] text-muted-foreground font-semibold">
                  {customer.orders_count} {customer.orders_count === 1 ? "Order" : "Orders"}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/50 text-xs">
              <a
                href={`tel:${customer.phone}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-primary font-mono font-bold"
              >
                <Phone className="h-3 w-3" />
                <span>{customer.phone}</span>
              </a>

              <span className="text-[11px] text-muted-foreground ml-auto">
                Last: {formatDate(customer.last_order_at)}
              </span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
            <Users className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">No customers found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

