import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center space-y-4">
      <h2 className="text-3xl font-bold">Новость не найдена</h2>
      <p className="text-gray-600">Возможно, она была удалена или скрыта.</p>
      <Link href="/news" className="inline-block mt-4 px-5 py-2.5 bg-primary text-white rounded-full">
        Все новости
      </Link>
    </div>
  );
}
