"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginAction } from "@/actions/auth";
import { siteConfig } from "@/config/site";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Lock, Mail, Loader2, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("कृपया ईमेल आणि पासवर्ड प्रविष्ट करा.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    startTransition(async () => {
      const res = await loginAction(null, formData);
      if (res.ok) {
        toast.success("लॉगिन यशस्वी!");
        router.push(redirectTo);
        router.refresh();
      } else {
        toast.error(res.error || "लॉगिन अयशस्वी झाले.");
      }
    });
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-background shadow-lg mb-2">
          <Sparkles className="h-6 w-6" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          {siteConfig.name.mr}
        </h1>
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
          स्टॉल मालक ॲडमिन पॅनेल (Owner Login)
        </p>
      </div>

      {/* Login Card */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">ईमेल (Admin Email)</Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@example.com"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">पासवर्ड (Password)</Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 text-sm font-bold rounded-xl mt-2 cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span>पडताळत आहे...</span>
              </>
            ) : (
              "लॉगिन करा (Sign In)"
            )}
          </Button>
        </form>
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>मुख्य दुकानावर परत जा (Back to Shop)</span>
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Suspense fallback={<div className="text-muted-foreground">लोड होत आहे...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

