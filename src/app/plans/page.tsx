"use client";

import { Header } from "@/components/layout/header";
import { TravelPlanCard } from "@/components/travel/travel-plan-card";
import { mockTravelPlans } from "@/data/mock-travel-plans";

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">旅行プラン一覧</h1>
            <p className="text-muted-foreground">
              予算3万円以内で楽しめる、おすすめの旅行プランをご紹介します。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTravelPlans.map((plan) => (
              <TravelPlanCard
                key={plan.id}
                plan={plan}
                onViewDetails={(plan) => {
                  console.log("View details for:", plan.title);
                }}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}