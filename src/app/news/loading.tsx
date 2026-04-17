export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-6">
      <div className="h-10 bg-gray-200 rounded w-64 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="aspect-video bg-gray-200 animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
