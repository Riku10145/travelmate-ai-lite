"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { MessageSquare, TrendingUp, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-20 px-4 text-center">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              あなたの<span className="text-primary">理想の旅</span>を<br />
              AIと一緒に見つけよう
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              予算3万円以内で楽しめる、あなただけの旅行プランを無料で作成します
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/chat">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  今すぐ相談する
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/plans">
                  旅行プラン例を見る
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">TravelMate AI Liteの特徴</h3>
              <p className="text-muted-foreground">
                予算内で最高の旅行体験を提供します
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <MessageSquare className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>AI相談チャット</CardTitle>
                  <CardDescription>
                    あなたの希望を聞いて、最適な旅行プランを提案します
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    予算、期間、好みに合わせて個別にカスタマイズされた旅行プランを生成
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <TrendingUp className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>予算最適化</CardTitle>
                  <CardDescription>
                    3万円以内で最大限楽しめるプランを提案
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    交通費、宿泊費、食事代、観光費用を総合的に考慮した予算プランニング
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>完全無料</CardTitle>
                  <CardDescription>
                    すべての機能を無料でご利用いただけます
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    アカウント登録不要で、今すぐ旅行プランの作成を開始できます
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h3 className="text-3xl font-bold mb-8">
              今すぐ始めよう
            </h3>
            <p className="text-xl text-muted-foreground mb-8">
              あなたの次の旅行を、AIと一緒に計画しませんか？
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/chat">
                <MessageSquare className="w-5 h-5 mr-2" />
                AI相談を始める
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 TravelMate AI Lite. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
