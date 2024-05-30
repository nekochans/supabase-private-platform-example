# Supabase検証用プロジェクト

管理者がアカウントを発行して運用するアプリケーションを想定しています。

## Getting Started

### Node.js のインストール（既に終わっている場合は省略）

20 系の最新安定版を利用します。

[asdf](https://asdf-vm.com/) などを使ってバージョン管理を出来るようにするのがオススメです。

### Docker Desktopのインストール（既に終わっている場合は省略）

以下からインストールを行います。

https://matsuand.github.io/docs.docker.jp.onthefly/desktop/mac/install/

https://supabase.com/docs/guides/cli/local-development にも記載がありますが [OrbStack](https://orbstack.dev/) 等の別のツールでも利用出来るようです。（筆者は未確認）

### 依存Packageのインストール

```bash
npm ci
```

### Supabaseの起動

以下のコマンドを実行します。

```bash
npm run supabase:start
```

### 環境変数の設定

以下の環境変数を設定します。

```
NEXT_PUBLIC_SUPABASE_URL=Supabaseの "API URL" を設定
NEXT_PUBLIC_SUPABASE_ANON_KEY=Supabaseの "anon key" を設定
```

具体的な値の確認は以下のコマンドを実行すると確認できます。

```bash
npm run supabase:status
```

### アプリケーションの起動

以下のコマンドを実行します。

http://localhost:24000 にアクセスするとアプリケーションが表示されます。

```bash
npm run dev
```

## メールの受信確認について

http://localhost:24000/login/magiclink にアクセスするとMagicLinkによるログインが実行可能です。

しかしローカル環境ではメールの送信は行われない為、`Inbucket` というツールでメールの内容確認を実施します。

以下のURLでツールにアクセス可能です。

http://127.0.0.1:54324

`npm run supabase:status` を実行すると `Inbucket URL` という項目があるのでそこからもURLを確認可能です。

## Supabaseの停止

以下のコマンドを実行します。

```bash
npm run supabase:stop
```

## SupabaseのMigration実行

以下でMigrationを実行します。

```bash
npm run supabase:db:reset
```

このコマンドは一度DBをリセットしてからMigrationを実行するのでローカル開発環境のデータが消えてしまう点にご注意ください。

## SupabaseのMigrationファイル作成

以下のように実行します。

```bash
npm run supabase:migration:new create_triggers_functions_refresh_updated_at
npm run supabase:migration:new create_table_users
npm run supabase:migration:new create_triggers_on_users
```

`supabase/migrations/20240529151715_create_table_users.sql` のようなファイルが作成されます。

### Migrationファイルの命名規則

#### トリガー関数

`create_triggers_functions_トリガー関数名` という命名規則に従います。

例えば `refresh_updated_at` というトリガー関数を作成する場合、以下のように実行します。

```bash
npm run supabase:migration:new create_triggers_functions_refresh_updated_at
```

#### テーブル作成

`create_table_テーブル名` という命名規則に従います。

例えば `users` というテーブルを作成する場合、以下のように実行します。

```bash
npm run supabase:migration:new create_table_users
```

#### トリガー設定

`create_triggers_on_テーブル名` という命名規則に従います。

例えば `users` というテーブルにトリガーを設定する場合、以下のように実行します。

```bash
npm run supabase:migration:new create_triggers_on_users
```
