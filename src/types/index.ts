// ユーザー関連の型定義
export interface User {
  id: string;
  email: string;
  username?: string;
  ageGroup?: '20代' | '30代' | '40代' | '50代以上';
  region?: string;
  createdAt: string;
}

// チャット関連の型定義
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  affiliateLinks?: AffiliateLink[];
  suggestedProducts?: Product[];
}

export interface ChatSession {
  id: string;
  userId?: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

// アフィリエイト関連の型定義
export interface AffiliateLink {
  id: string;
  type: 'rakuten_hotel' | 'rakuten_product' | 'amazon_product';
  productId: string;
  productName: string;
  url: string;
  price?: number;
  imageUrl?: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
  category: 'hotel' | 'transport' | 'activity' | 'gear';
  affiliateLinks: AffiliateLink[];
}

// 旅行関連の型定義
export interface TravelPlan {
  id: string;
  title: string;
  destination: string;
  duration: number; // 日数
  budget: number;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  activities: string[];
  schedule: DaySchedule[];
  estimatedCost: number;
  recommendedProducts: Product[];
}

export interface DaySchedule {
  day: number;
  activities: Activity[];
  meals: Meal[];
  accommodation?: string;
  transportation?: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  location: string;
  duration: number; // 時間
  cost: number;
  category: 'sightseeing' | 'experience' | 'shopping' | 'relaxation';
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  location: string;
  cost: number;
  description?: string;
}

// ブログ関連の型定義
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
  keywords: string[];
  featuredImage?: string;
  published: boolean;
  viewCount: number;
  createdAt: string;
  publishedAt?: string;
}

// アフィリエイト追跡の型定義
export interface AffiliateClick {
  id: string;
  userId?: string;
  sessionId?: string;
  affiliateType: 'rakuten_hotel' | 'rakuten_product' | 'amazon_product';
  productId: string;
  productName: string;
  clickUrl: string;
  clickedAt: string;
  userAgent?: string;
  referer?: string;
}

// API関連の型定義
export interface ChatRequest {
  message: string;
  sessionId?: string;
  userId?: string;
}

export interface ChatResponse {
  response: string;
  sessionId: string;
  affiliateLinks: AffiliateLink[];
  suggestedProducts: Product[];
}

export interface TrackingRequest {
  affiliateType: 'rakuten_hotel' | 'rakuten_product' | 'amazon_product';
  productId: string;
  productName: string;
  originalUrl: string;
  sessionId?: string;
}

export interface TrackingResponse {
  trackingUrl: string;
  affiliateUrl: string;
}