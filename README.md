# Japan Population Trends Graph

This SPA was developed as a coding test for Yumemi, Inc.
Despite the outcome of the interview, the development process was a valuable learning experience.
The following sections detail the positive feedback from Yumemi engineers and outline the development journey.

## Feedback from Yumemi engineers:

> なお、担当者からのレビューは以下の通りです。
> よろしければ参考までにご確認いただけますと幸いです。
> ーーーーーーーーーーーーーーーーーーーー
>
> ## Goodチェック
>
> - 独自にワイヤーフレームを解釈してデザイン・実装している
> - API で取得したデータをキャッシュしている
> - API のエラーハンドリングができている
> - 通信時のローディングの UI を実装している
> - データが存在しないときに専用の UI を用意している
> - README が充実している
> - API-key をアプリケーションコードから秘匿している
> - API-key をビルドファイルから秘匿している
> - コメントの量が適切である
> - コミットの粒度が適切である
> - 比較的短時間（15時間以内）で完成している
> - 最新の Next.js 15 と React 19 を活用し、モダンな実装が行われている
> - コンポーネント設計が適切で、機能ごとに責務が分離されている
>   - 汎用的な UI コンポーネントと機能固有のコンポーネントを分離するアプローチを採択している
> - use server ディレクティブを活用して、クライアントに API キーが漏洩しないよう秘匿されている
> - Zustand による状態管理と TanStack Query によるデータフェッチが効率的に実装されている
> - ローディング状態やエラー状態のハンドリングが丁寧に実装されている
> - 都道府県チェックのリセットボタンを用意されている
> - 都道府県チェックボックス一覧にアコーディオン UI をつけられている
> - Recharts の tickFormatter を活用して数値のカンマ区切り表示をされている
> - 生成 AI を活用して充実したテストの実装がされている（README より）
> - メモとして振り返りを記載することで、思考や意思決定を残している
>
> ## Nextチェック
>
> - ラベルをクリックしてチェックボックスを操作できない
> - チェックボックスにホバーした時に cursor: pointer になっていない
> - html 要素の lang が ja でない
> - Prettier の実行スクリプトが定義されておらず、一部ファイルのフォーマットがかけられていない
>
> ## 総合評価
>
> Webプログラミング歴が約半年という比較的短い経験にもかかわらず、タスク管理をはじめ、設計・実装・テストにおいて全体的に高水準な成果が見受けられ、短時間で効率的に開発が進められていると感じました。
>
> モダンな技術スタックの理解と明晰な実装・設計力をお持ちのように感じます。

## TODO

- [x] Install Core Dependencies: recharts for graphs, tanstack for data fetching
- [x] Eslint, Prettier configuration (add prettier tailwind plugin for better class order)
- [x] Credential information handling (ENV)
- [x] Set Up TanStack Query for state management
- [x] Use Zustand for better state management?
- [x] Start fetching data from API
- [x] Successfully fetched prefectures and population data from API
- [x] Custom Hooks
- [x] Build chart component
- [x] Build prefecture checkbox component
- [x] Build category select component
- [x] Error handling
- [x] Add skeleton for two main components
- [x] Adjust layout and responsiveness
- [x] Write Tests
- [x] Deployment

## Notes

### 3/30 Recap

Finished scaffolding of the app. Implemented Tanstack Query and Zustand for stage management and got the data displayed.
Question: Would there be security problems with server action that I used for queries. Get the app deployed.

### 3/31 Recap

Did not make much progress. Added reset checkbox feature. Thinking should I use app route for SSR? Maybe add Zod for schema validation?

## 4/1 Recap

Have made a lot progress today. Added line chart feature. Successfully got the server side cache working. Built skeletons for card and checkbox. Made the app a little bit not ugly.

## 4/4 Recap

Spent a lot of time on refactoring. Modified the overall UI. Wrote tests with AI. Ready to submit.

## Key Point Checklist

- [x] Used React(Next.js)
- [x] Used TypeScript
- [x] Properly type
- [x] ESlint
- [x] Prettier
- [x] Ensured ESLint and Prettier work together
- [x] Proper code format
- [x] View logic is separated from business logic
- [x] Used semantic HTML elements
- [x] Used Git with clear, meaningful commit messages
- [x] Properly tested
- [x] Set up CI/CD for linting/testing
- [x] Beautiful UI (Kind of)
