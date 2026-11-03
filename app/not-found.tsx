import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background text-foreground">
      <span className="text-6xl mb-4 select-none">🎆</span>
      <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground mb-2">
        Page Not Found (404)
      </h1>
      <p className="text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
        The fireworks page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm shadow-xl shadow-orange-500/25 hover:opacity-95 transition-opacity"
      >
        Return to Homepage &rarr;
      </Link>
    </div>
  );
}
