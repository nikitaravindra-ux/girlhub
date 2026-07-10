export default function MusicPage() {
  return (
    <main className="min-h-screen p-8 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">🎧 Music</h1>
      <p className="text-gray-600 mb-4">
        Swap the src below for your own public playlist link (right-click a
        playlist in Spotify → Share → Embed playlist). For dynamic playlist
        fetching + AI mood recommendations, register a Spotify Developer app
        and call their Web API from the backend.
      </p>
      <iframe
        style={{ borderRadius: 16 }}
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M"
        width="100%"
        height="380"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
    </main>
  );
}