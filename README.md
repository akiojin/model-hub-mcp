# model-hub-mcp

OpenAI、Anthropic、GoogleのAIモデル情報を取得できるMCP（Model Context Protocol）サーバーです。

## 機能

- **マルチプロバイダー対応**: OpenAI、Anthropic、Google AIの3つのプロバイダーに対応
- **モデル一覧取得**: 各プロバイダーから利用可能なモデルの一覧を取得
- **モデル詳細取得**: 特定のモデルの詳細情報を取得
- **統合取得**: すべての設定済みプロバイダーからモデル情報を一括取得

## インストール

```bash
npm install
```

## 設定

1. `.env.example`を`.env`にコピーします：
```bash
cp .env.example .env
```

2. `.env`ファイルに各プロバイダーのAPIキーを設定します：
```
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
```

注意: 使用しないプロバイダーのAPIキーは空のままで構いません。

## ビルド

TypeScriptコードをコンパイルします：
```bash
npm run build
```

## 使用方法

MCPサーバーとして起動：
```bash
npm start
```

開発モード（TypeScriptを直接実行）：
```bash
npm run dev
```

## 利用可能なツール

### list_models
特定のプロバイダーから利用可能なモデルの一覧を取得します。

パラメータ:
- `provider`: "openai" | "anthropic" | "google"

### get_model
特定のモデルの詳細情報を取得します。

パラメータ:
- `provider`: "openai" | "anthropic" | "google"
- `model_id`: モデルID（例: "gpt-4", "claude-3-opus", "gemini-pro"）

### list_all_models
設定済みのすべてのプロバイダーからモデル情報を一括取得します。

## MCPクライアントでの設定例

Claude DesktopやClineなどのMCPクライアントで使用する場合の設定例：

```json
{
  "mcpServers": {
    "model-hub": {
      "command": "node",
      "args": ["/path/to/model-hub-mcp/dist/index.js"],
      "env": {
        "OPENAI_API_KEY": "your_openai_api_key",
        "ANTHROPIC_API_KEY": "your_anthropic_api_key",
        "GOOGLE_API_KEY": "your_google_api_key"
      }
    }
  }
}
```

## ライセンス

MIT