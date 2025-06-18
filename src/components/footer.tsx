export default function Footer() {
  return (
    <footer className="px-2/5 mt-28 mb-8 text-center text-gray-500">
      <small className="mb-2 block text-base font-semibold">
        &copy; 2025 Scheff Chuk.
      </small>
      <p className="flex flex-col items-center gap-1 px-10 text-start text-sm/loose">
        本アプリは、ゆめみ フロントエンド
        コーディングテストの課題として作成されました。
        <span>
          Next.js、TypeScript、Tailwind CSS、Recharts
          を用いて開発し、状態管理には Tanstack Query と Zustand
          を、ホスティングには Vercel を利用しています。
        </span>
      </p>
    </footer>
  );
}
