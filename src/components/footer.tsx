export default function Footer() {
  return (
    <footer className="mt-28 mb-8 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">&copy; 2025 Scheff Chuk.</small>
      <p className="text-xs">
        <span className="font-semibold">このアプリについて：</span>
        本アプリは、ゆめみ フロントエンド
        コーディングテストの課題として作成されました。
        Next.js、TypeScript、Tailwind CSS、Recharts を用いて開発し、状態管理には
        Tanstack Query と Zustand を、ホスティングには Vercel を利用しています。
      </p>
    </footer>
  );
}
