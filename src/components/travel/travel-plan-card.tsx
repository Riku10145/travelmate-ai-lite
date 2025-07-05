"use client";

import { TravelPlan } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Wallet, Star } from "lucide-react";

interface TravelPlanCardProps {
  plan: TravelPlan;
  onViewDetails?: (plan: TravelPlan) => void;
}

export function TravelPlanCard({ plan, onViewDetails }: TravelPlanCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getSeasonBadgeColor = (season: string) => {
    switch (season) {
      case "spring":
        return "bg-pink-100 text-pink-800";
      case "summer":
        return "bg-blue-100 text-blue-800";
      case "autumn":
        return "bg-orange-100 text-orange-800";
      case "winter":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeasonLabel = (season: string) => {
    switch (season) {
      case "spring":
        return "春";
      case "summer":
        return "夏";
      case "autumn":
        return "秋";
      case "winter":
        return "冬";
      default:
        return season;
    }
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{plan.title}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {plan.destination}
            </CardDescription>
          </div>
          <Badge className={getSeasonBadgeColor(plan.season)}>
            {getSeasonLabel(plan.season)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{plan.duration}日間</span>
            </div>
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{formatCurrency(plan.estimatedCost)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">主な活動</h4>
            <div className="flex flex-wrap gap-2">
              {plan.activities.slice(0, 3).map((activity, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {activity}
                </Badge>
              ))}
              {plan.activities.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{plan.activities.length - 3}個
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">おすすめ商品</h4>
            <div className="grid grid-cols-2 gap-2">
              {plan.recommendedProducts.slice(0, 2).map((product) => (
                <div key={product.id} className="flex items-center gap-2 text-xs">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span className="truncate">{product.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button
              onClick={() => onViewDetails?.(plan)}
              className="w-full"
              variant="outline"
            >
              詳細を見る
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}