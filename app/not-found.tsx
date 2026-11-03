import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background text-foreground">
      <span className="text-6xl mb-4">🎆</span>
      <h1 className="text-3xl font-heading text-primary mb-2">
        पृष्ठ सापडले नाही (Page Not Found)
      </h1>
      <p className="text-muted-foreground max-w-md mb-6">
        आपण शोधत असलेले पृष्ठ अस्तित्वात नाही किंवा हलवले गेले आहे.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
      >
        मुख्यपृष्ठावर जा (Go to Home)
      </Link>
    </div>
  );
}
