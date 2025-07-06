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
以下の条件で旅行プランを提案してください：

- 予算は3万円以内で実現可能なプランを重視
- 具体的な観光地、宿泊施設、交通手段、食事の提案
- 季節や天候を考慮した現実的なアドバイス
- 初心者にも分かりやすい説明
- 安全性と楽しさのバランスを重視

回答は以下の構造で提供してください：
1. 提案の概要
2. 予算の内訳
3. 日程と活動
4. おすすめポイント
5. 注意事項

温かく親しみやすい口調で、まるで友人に相談されているかのように回答してください。`;

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