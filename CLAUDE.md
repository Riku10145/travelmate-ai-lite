# TravelMate AI Lite - 開発メモ

## プロジェクト概要
- **プロジェクト名**: TravelMate AI Lite
- **目的**: 予算3万円で実現可能な最小限のAI旅行相談アプリ
- **開発期間**: 8週間
- **総予算**: ¥30,000

## 技術スタック
- **フロントエンド**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **UI**: shadcn/ui
- **データベース**: Supabase (無料枠)
- **AI**: OpenAI API (無料枠)
- **認証**: Supabase Auth
- **デプロイ**: Vercel (無料枠)

## インストール済み依存関係
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.50.3",
    "@supabase/ssr": "^0.6.1",
    "openai": "^5.8.2",
    "lucide-react": "^0.525.0",
    "react-hook-form": "^7.60.0",
    "uuid": "^11.1.0",
    "date-fns": "^4.1.0",
    "clsx": "^2.1.1",
    "class-variance-authority": "^0.7.1"
  },
  "devDependencies": {
    "@types/uuid": "^10.0.0"
  }
}
```

## ディレクトリ構造
```
src/
├── app/               # Next.js App Router
├── components/        # UIコンポーネント
│   ├── chat/          # チャット関連
│   ├── travel/        # 旅行関連
│   ├── blog/          # ブログ関連
│   └── ui/            # 汎用UIコンポーネント
├── lib/               # 外部サービス設定
├── types/             # TypeScript型定義
├── utils/             # ユーティリティ関数
└── data/              # モックデータ
```

## 開発コマンド
```bash
# 開発サーバー起動
yarn dev

# ビルド
yarn build

# 本番プレビュー
yarn start

# リンター
yarn lint
```

## API無料枠制限
- **OpenAI**: 月$5の無料クレジット
- **Supabase**: 500MB DB, 2GB転送量
- **Vercel**: 100GB転送量

## 今後の実装予定
1. 基本レイアウトの作成
2. Supabase設定とデータベース作成
3. AI相談チャット機能
4. アフィリエイト機能
5. ブログ機能
6. SEO最適化

## 注意事項
- 環境変数は`.env.local`ファイルで管理
- APIキーは絶対にコミットしない
- 無料枠を超えないよう使用量を監視

## Git設定
- ユーザー名: Riku10145
- メールアドレス: riku205riku@gmail.com