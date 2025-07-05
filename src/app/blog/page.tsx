"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, FileText } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">ブログ</h1>
            <p className="text-muted-foreground">
              旅行に関する役立つ情報やコツをお届けします。
            </p>
          </div>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <CardTitle className="text-2xl mb-2">準備中</CardTitle>
                    <p className="text-muted-foreground">
                      ブログ機能は現在準備中です。<br />
                      近日中に旅行に関する有益な情報をお届けします。
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="opacity-50">
                <CardHeader>
                  <CardTitle className="text-lg">予算3万円で楽しむ東京旅行</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>2024年12月15日</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>5分で読める</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    限られた予算で最大限に東京を楽しむためのコツとおすすめスポットをご紹介...
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">東京</Badge>
                    <Badge variant="secondary">予算旅行</Badge>
                    <Badge variant="secondary">観光</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="opacity-50">
                <CardHeader>
                  <CardTitle className="text-lg">京都の隠れた名所を巡る</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>2024年12月10日</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>8分で読める</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    観光客の少ない京都の穴場スポットで、静かな時間を過ごしませんか...
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">京都</Badge>
                    <Badge variant="secondary">穴場</Badge>
                    <Badge variant="secondary">歴史</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="opacity-50">
                <CardHeader>
                  <CardTitle className="text-lg">大阪グルメ完全ガイド</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>2024年12月5日</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>10分で読める</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    たこ焼きからお好み焼きまで、大阪のソウルフードを食べ尽くそう...
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">大阪</Badge>
                    <Badge variant="secondary">グルメ</Badge>
                    <Badge variant="secondary">食べ歩き</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="opacity-50">
                <CardHeader>
                  <CardTitle className="text-lg">旅行の荷物を最小限に抑えるコツ</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>2024年12月1日</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>6分で読める</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    身軽な旅行を実現するためのパッキング術と必需品選びのポイント...
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">旅行準備</Badge>
                    <Badge variant="secondary">パッキング</Badge>
                    <Badge variant="secondary">節約</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}