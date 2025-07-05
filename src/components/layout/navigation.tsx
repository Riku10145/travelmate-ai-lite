"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MapPin, MessageSquare, FileText, Calendar } from "lucide-react";

const navigation = [
  {
    name: "AI相談",
    href: "/chat",
    icon: MessageSquare,
    description: "AIが旅行プランを提案します",
  },
  {
    name: "旅行プラン",
    href: "/plans",
    icon: Calendar,
    description: "おすすめの旅行プランを見る",
  },
  {
    name: "ブログ",
    href: "/blog",
    icon: FileText,
    description: "旅行に関する記事を読む",
  },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="flex flex-col h-full">
          <div className="flex items-center space-x-2 px-6 py-4 border-b">
            <MapPin className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold">TravelMate AI Lite</span>
          </div>
          
          <nav className="flex-1 py-4">
            <div className="space-y-2 px-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="px-4 py-4 border-t">
            <Button asChild className="w-full">
              <Link href="/chat" onClick={() => setOpen(false)}>
                <MessageSquare className="w-4 h-4 mr-2" />
                相談を始める
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}