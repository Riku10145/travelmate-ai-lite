"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Bot, User, MessageSquare } from "lucide-react";
import { ChatMessage, UserPreferences } from "@/types";
import { InteractiveHearing } from "./interactive-hearing";

interface ChatInterfaceProps {
  initialMessages?: ChatMessage[];
}

export function ChatInterface({ initialMessages = [] }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHearing, setShowHearing] = useState(false);
  const [, setHearingPreferences] = useState<UserPreferences | null>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          messages: messages,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'チャットAPIでエラーが発生しました');
      }

      const data = await response.json();
      
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `申し訳ございません。${error instanceof Error ? error.message : 'エラーが発生しました。'}`,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startHearing = () => {
    setShowHearing(true);
    const hearingStartMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "assistant",
      content: "詳しくヒアリングして、あなたにぴったりの旅行プランをご提案します！",
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, hearingStartMessage]);
  };

  const handleHearingComplete = async (preferences: UserPreferences) => {
    setHearingPreferences(preferences);
    setShowHearing(false);
    setIsLoading(true);

    try {
      // Create detailed prompt based on hearing results
      const detailedPrompt = createDetailedPrompt(preferences);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: detailedPrompt,
          messages: messages,
          preferences: preferences
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'チャットAPIでエラーが発生しました');
      }

      const data = await response.json();
      
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `申し訳ございません。${error instanceof Error ? error.message : 'エラーが発生しました。'}`,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const createDetailedPrompt = (preferences: UserPreferences): string => {
    const parts = [
      "ヒアリング結果に基づいて、詳細で実用的な旅行プランを作成してください。",
    ];

    if (preferences.budget) {
      const budgetText = typeof preferences.budget === 'string' && preferences.budget === 'custom' 
        ? '要相談' 
        : `${preferences.budget}円`;
      parts.push(`予算: ${budgetText}`);
    }
    if (preferences.duration) {
      parts.push(`期間: ${preferences.duration === 1 ? '日帰り' : `${preferences.duration}日間`}`);
    }
    if (preferences.groupSize) {
      parts.push(`人数: ${preferences.groupSize}名`);
    }
    if (preferences.transportation) {
      parts.push(`交通手段: ${preferences.transportation}`);
    }
    if (preferences.interests && preferences.interests.length > 0) {
      parts.push(`興味のあること: ${preferences.interests.join(', ')}`);
    }
    if (preferences.departureLocation) {
      parts.push(`出発地: ${preferences.departureLocation}`);
    }

    return parts.join('\n');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI旅行相談にようこそ！</h3>
            <p className="text-muted-foreground mb-6">
              予算3万円以内で実現可能な具体的な旅行プランを提案します。
            </p>
            
            <div className="space-y-4 max-w-md mx-auto">
              <Button 
                onClick={startHearing} 
                className="w-full h-auto p-4 text-left"
                disabled={isLoading}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5" />
                  <div>
                    <div className="font-semibold text-sm">詳細ヒアリングで最適プラン作成</div>
                    <div className="text-xs opacity-80">予算・人数・交通手段など詳しくお聞きします</div>
                  </div>
                </div>
              </Button>
              
              <div className="text-left bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">または直接メッセージで相談</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 「3万円で京都2泊3日の旅行プランを教えて」</li>
                  <li>• 「1万円で日帰り温泉旅行のプランは？」</li>
                  <li>• 「初めての一人旅でおすすめの場所は？」</li>
                  <li>• 「カップルで楽しめる関東の旅行先は？」</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <Card className={`max-w-[70%] ${message.role === "user" ? "bg-primary text-primary-foreground" : ""}`}>
              <CardContent className="p-3">
                <div className="flex items-start space-x-2">
                  {message.role === "assistant" && (
                    <Bot className="w-5 h-5 mt-1 text-muted-foreground" />
                  )}
                  {message.role === "user" && (
                    <User className="w-5 h-5 mt-1 text-primary-foreground" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString("ja-JP", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
        
        {showHearing && (
          <InteractiveHearing 
            onComplete={handleHearingComplete}
          />
        )}
        
        {isLoading && (
          <div className="flex justify-start">
            <Card className="max-w-[70%]">
              <CardContent className="p-3">
                <div className="flex items-start space-x-2">
                  <Bot className="w-5 h-5 mt-1 text-muted-foreground" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="旅行について何でもお聞かせください..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !inputValue.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}