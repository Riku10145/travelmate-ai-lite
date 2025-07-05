import { Activity } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Wallet } from "lucide-react";

interface ActivityListProps {
  activities: Activity[];
}

export function ActivityList({ activities }: ActivityListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "sightseeing":
        return "観光";
      case "experience":
        return "体験";
      case "shopping":
        return "ショッピング";
      case "relaxation":
        return "リラクゼーション";
      default:
        return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "sightseeing":
        return "bg-blue-100 text-blue-800";
      case "experience":
        return "bg-green-100 text-green-800";
      case "shopping":
        return "bg-purple-100 text-purple-800";
      case "relaxation":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">アクティビティ一覧</h3>
      <div className="grid gap-4">
        {activities.map((activity) => (
          <Card key={activity.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{activity.name}</CardTitle>
                <Badge className={getCategoryColor(activity.category)}>
                  {getCategoryLabel(activity.category)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{activity.duration}時間</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wallet className="w-4 h-4 text-muted-foreground" />
                    <span>{formatCurrency(activity.cost)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}