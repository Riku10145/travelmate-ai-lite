import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

interface ChatRequest {
  message: string;
  messages?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

// Gemini AI クライアントの初期化
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { message, messages = [] }: ChatRequest = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'メッセージが必要です' },
        { status: 400 }
      );
    }

    // Gemini 1.5 Flash モデルを使用（無料枠が豊富）
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // 旅行相談専用のシステムプロンプト
    const systemPrompt = `あなたは親切で知識豊富な旅行相談のプロフェッショナルです。
予算3万円以内で実現可能な具体的で実用的な旅行プランを提案してください。

## 必須要素
- **具体的な金額**：交通費、宿泊費、食事代、観光費用を明記
- **詳細スケジュール**：時間帯別の行動プラン
- **実在する施設**：ホテル名、レストラン名、観光地名を具体的に
- **交通手段**：電車の路線名、バス番号、所要時間、料金
- **予約方法**：実際の予約サイトや方法

## 回答フォーマット（必須）
### 🗾 旅行プラン概要
- **目的地**: [具体的な地名]
- **期間**: [X泊Y日]
- **総予算**: [金額]円
- **テーマ**: [例：グルメ旅、歴史探訪、温泉巡りなど]

### 💰 詳細予算内訳
- 交通費: [金額]円
- 宿泊費: [金額]円（[具体的なホテル名]）
- 食事代: [金額]円
- 観光・体験費: [金額]円
- お土産・その他: [金額]円

### 📅 日程スケジュール
**1日目**
- XX:XX 出発（[具体的な駅名・交通手段]）
- XX:XX [具体的な観光地名]到着（入場料○○円）
- XX:XX [具体的なレストラン名]でランチ（予算○○円）
- XX:XX [宿泊施設名]チェックイン

### 🌟 おすすめポイント・注意事項
- [具体的なTipsや注意点]

友人に相談されているような親しみやすい口調で、実際に使える情報を提供してください。`;

    // 会話履歴を構築
    let conversationHistory = systemPrompt + '\n\n';
    
    // 過去のメッセージを追加
    messages.forEach((msg) => {
      const prefix = msg.role === 'user' ? 'ユーザー: ' : 'アシスタント: ';
      conversationHistory += `${prefix}${msg.content}\n\n`;
    });
    
    // 現在のメッセージを追加
    conversationHistory += `ユーザー: ${message}\n\nアシスタント: `;

    // Gemini API にリクエスト送信
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: conversationHistory }] }],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    const response = await result.response;
    const aiResponse = response.text();

    if (!aiResponse) {
      throw new Error('AI応答が生成されませんでした');
    }

    return NextResponse.json({
      message: aiResponse,
      model: 'gemini-1.5-flash',
    });

  } catch (error: unknown) {
    console.error('Gemini API Error:', error);

    // エラーメッセージをユーザーフレンドリーに
    let errorMessage = 'チャット機能で問題が発生しました。しばらく後にもう一度お試しください。';
    
    if (error && typeof error === 'object') {
      if ('message' in error && typeof error.message === 'string') {
        if (error.message.includes('quota')) {
          errorMessage = 'API使用量の上限に達しました。後ほどお試しください。';
        } else if (error.message.includes('rate limit')) {
          errorMessage = 'リクエストが多すぎます。少し待ってからお試しください。';
        } else if (error.message.includes('API key')) {
          errorMessage = 'API設定に問題があります。管理者にお問い合わせください。';
        }
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}