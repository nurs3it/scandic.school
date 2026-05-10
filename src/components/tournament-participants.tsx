'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useLocale } from './locale-provider';
import { fetchTournamentParticipants } from '@/lib/tournaments-api';
import type { TournamentParticipant } from '@/lib/types/tournaments';

const t = {
  ru: {
    title: 'Участники',
    empty: 'Пока никто не зарегистрировался',
    loading: 'Загружаем список…',
    error: 'Не удалось загрузить список участников',
    total: (n: number) => `Всего: ${n}`,
    colNum: '№',
    colName: 'Участник',
    colBirth: 'Дата рождения',
    colFide: 'FIDE ID',
    prev: 'Назад',
    next: 'Вперёд',
    page: (p: number, total: number) => `Стр. ${p} из ${total}`,
  },
  en: {
    title: 'Participants',
    empty: 'No registrations yet',
    loading: 'Loading list…',
    error: 'Failed to load participants',
    total: (n: number) => `Total: ${n}`,
    colNum: '#',
    colName: 'Participant',
    colBirth: 'Birth date',
    colFide: 'FIDE ID',
    prev: 'Back',
    next: 'Next',
    page: (p: number, total: number) => `Page ${p} of ${total}`,
  },
  kk: {
    title: 'Қатысушылар',
    empty: 'Әзірге ешкім тіркелмеген',
    loading: 'Тізім жүктелуде…',
    error: 'Қатысушылар тізімін жүктеу мүмкін болмады',
    total: (n: number) => `Барлығы: ${n}`,
    colNum: '№',
    colName: 'Қатысушы',
    colBirth: 'Туған күні',
    colFide: 'FIDE ID',
    prev: 'Артқа',
    next: 'Әрі қарай',
    page: (p: number, total: number) => `${p} / ${total} бет`,
  },
};

const PAGE_SIZE = 200;

export function TournamentParticipants({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const tt = t[locale as keyof typeof t] ?? t.ru;
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tournament-participants', slug, page],
    queryFn: () => fetchTournamentParticipants(slug, page, PAGE_SIZE),
  });

  const dateLocale = locale === 'en' ? 'en-GB' : 'ru-RU';
  const fmtDate = (iso: string | null) =>
    iso ? new Date(iso).toLocaleDateString(dateLocale) : '—';
  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary flex items-center gap-2">
          <Users className="w-7 h-7 text-primary" />
          {tt.title}
        </h2>
        {data && data.total > 0 && (
          <span className="text-sm text-gray-500">{tt.total(data.total)}</span>
        )}
      </div>

      {isLoading && (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-500">
          {tt.loading}
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-700">
          {tt.error}
        </div>
      )}

      {data && data.total === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-500">
          {tt.empty}
        </div>
      )}

      {data && data.items.length > 0 && (
        <>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-left text-gray-500 uppercase text-xs tracking-wider">
                  <th className="px-4 py-3 w-12">{tt.colNum}</th>
                  <th className="px-4 py-3">{tt.colName}</th>
                  <th className="px-4 py-3 whitespace-nowrap">{tt.colBirth}</th>
                  <th className="px-4 py-3 whitespace-nowrap">{tt.colFide}</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((p, i) => (
                  <ParticipantRow
                    key={p.id}
                    num={(data.page - 1) * data.pageSize + i + 1}
                    p={p}
                    fmtDate={fmtDate}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4" />
                {tt.prev}
              </button>
              <span className="text-sm text-gray-500">{tt.page(page, totalPages)}</span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                {tt.next}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function ParticipantRow({
  num,
  p,
  fmtDate,
}: {
  num: number;
  p: TournamentParticipant;
  fmtDate: (iso: string | null) => string;
}) {
  return (
    <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
      <td className="px-4 py-3 text-gray-400">{num}</td>
      <td className="px-4 py-3 font-medium text-secondary">{p.participantName}</td>
      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{fmtDate(p.birthDate)}</td>
      <td className="px-4 py-3 text-gray-600">
        {p.fideId ? (
          <a
            href={`https://ratings.fide.com/profile/${encodeURIComponent(p.fideId)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            {p.fideId}
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          '—'
        )}
      </td>
    </tr>
  );
}
