# npm公開手順

## 初回セットアップ

1. npmアカウントを作成（まだの場合）
   ```bash
   npm adduser
   ```

2. パッケージ名の重複確認
   ```bash
   npm view model-hub-mcp
   ```
   （404エラーが返れば、その名前は利用可能）

## 公開手順

1. ビルドとテスト
   ```bash
   npm run build
   npm start  # 動作確認
   ```

2. package.jsonの確認
   - version番号
   - repository URL（GitHubリポジトリがある場合は更新）
   - author情報

3. 公開
   ```bash
   npm publish
   ```

## 更新時

1. バージョンを上げる
   ```bash
   npm version patch  # 0.1.0 -> 0.1.1
   # または
   npm version minor  # 0.1.0 -> 0.2.0
   # または  
   npm version major  # 0.1.0 -> 1.0.0
   ```

2. 公開
   ```bash
   npm publish
   ```

## 公開後の確認

```bash
# パッケージ情報を確認
npm view model-hub-mcp

# npxで動作確認
npx model-hub-mcp
```