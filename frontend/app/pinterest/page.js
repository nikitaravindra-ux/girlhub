export default function PinterestPage() {
  return (
    <main className="min-h-screen p-8 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-pink-500 mb-6">📌 Pinterest Doomscroll</h1>
      <p className="text-gray-600 mb-4">
        Pinterest doesn't support embedding a full scrolling feed in an
        iframe. The usual options are a board-embed widget or the official
        Pinterest API (requires a Pinterest Developer app + OAuth).
      </p>
      <div className="bg-white/60 rounded-xl p-6 shadow text-gray-500">
        Pinterest widget placeholder — drop your board embed code here.
      </div>
    </main>
  );
}