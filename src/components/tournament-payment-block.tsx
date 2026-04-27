'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Phone, Copy, Check } from 'lucide-react';
import type { Tournament } from '@/lib/types/tournaments';
import { formatPrice } from '@/lib/tournament-utils';

export function TournamentPaymentBlock({ tournament }: { tournament: Tournament }) {
  const [copied, setCopied] = useState(false);
  if (tournament.isFree) return null;

  const showPhone = tournament.paymentMethod === 'KASPI_PHONE' || tournament.paymentMethod === 'BOTH';
  const showQr = tournament.paymentMethod === 'KASPI_QR' || tournament.paymentMethod === 'BOTH';

  function copyPhone() {
    if (!tournament.kaspiPhone) return;
    navigator.clipboard.writeText(tournament.kaspiPhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-3xl p-6 md:p-8">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-600 mb-1">Стоимость участия</p>
        <p className="text-4xl font-bold text-secondary">{formatPrice(tournament.price)}</p>
      </div>
      <div className={`grid gap-4 ${showPhone && showQr ? 'md:grid-cols-2' : ''}`}>
        {showPhone && tournament.kaspiPhone && (
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-xs uppercase text-gray-500 tracking-wider mb-2">Kaspi Gold</p>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <p className="text-lg font-semibold text-secondary flex-1">{tournament.kaspiPhone}</p>
              <button type="button" onClick={copyPhone} className="p-2 hover:bg-gray-100 rounded-lg transition" aria-label="Копировать номер">
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-500" />}
              </button>
            </div>
          </div>
        )}
        {showQr && tournament.kaspiQrUrl && (
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-xs uppercase text-gray-500 tracking-wider mb-2 text-center">QR-код Kaspi</p>
            <div className="relative aspect-square max-w-[240px] mx-auto">
              <Image src={tournament.kaspiQrUrl} alt="QR-код для оплаты Kaspi" fill className="object-contain" />
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">Откройте Kaspi → Сканер</p>
          </div>
        )}
      </div>
    </section>
  );
}
