"use client";

import { Header } from "@/components/layout/header";
import { ChatInterface } from "@/components/chat/chat-interface";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-4">AI旅行相談</h1>
            <p className="text-muted-foreground">
              あなたの希望を聞かせてください。予算内で最適な旅行プランを提案します。
            </p>
          </div>
          
          <div className="bg-card rounded-lg shadow-sm border h-[70vh]">
            <ChatInterface />
          </div>
        </div>
      </main>
    </div>
  );
}