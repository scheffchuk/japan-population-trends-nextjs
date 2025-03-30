export default function Footer() {
  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">&copy; 2025 ScheffChuk.</small>
      <p className="text-xs">
        <span className="font-semibold">About this website:</span> built with
        Next.js (App Router & Server Actions), TypeScript, Tailwind CSS, using
        Tanstack Query and Zustand for state management, Vercel hosting.
      </p>
    </footer>
  );
}
