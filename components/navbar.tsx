import { Zap } from "lucide-react";
import Link from "next/link";
import { AuthStatus } from "./auth-status";

interface NavbarProps {
  showLinks?: boolean;
}

export default function Navbar({ showLinks = true }: NavbarProps) {
  return (
    <header className="border-b bg-background px-4 md:px-6">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">TurboPrompt</span>
        </Link>
        {showLinks && (
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Testimonials
            </Link>
          </nav>
        )}
        <div className="flex items-center gap-4">
          <AuthStatus />
        </div>
      </div>
    </header>
  );
}
