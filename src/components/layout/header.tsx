import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "./navigation";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">TravelMate AI Lite</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/chat"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              AI相談
            </Link>
            <Link
              href="/plans"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              旅行プラン
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              ブログ
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button asChild className="hidden sm:flex">
              <Link href="/chat">相談開始</Link>
            </Button>
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
}