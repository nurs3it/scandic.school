'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="container mx-auto px-4 py-24 text-center space-y-4">
      <h2 className="text-2xl font-bold">Не удалось загрузить новости</h2>
      <button onClick={reset} className="px-4 py-2 bg-primary text-white rounded-lg">Повторить</button>
    </div>
  );
}
