import { ChatMessage } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, User } from "lucide-react";

interface MessageProps {
  message: ChatMessage;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === "user";
  
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <Card className={`max-w-[70%] ${isUser ? "bg-primary text-primary-foreground" : ""}`}>
        <CardContent className="p-3">
          <div className="flex items-start space-x-2">
            {message.role === "assistant" && (
              <Bot className="w-5 h-5 mt-1 text-muted-foreground" />
            )}
            {message.role === "user" && (
              <User className="w-5 h-5 mt-1 text-primary-foreground" />
            )}
            <div className="flex-1">
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
  );
}