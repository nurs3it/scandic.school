'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  Phone,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Wallet,
  CreditCard,
  MessageCircle,
} from 'lucide-react';
import { useLocale } from './locale-provider';
import { submitTournamentRegistration } from '@/lib/tournaments-api';
import { isRegistrationActive, formatPrice } from '@/lib/tournament-utils';
import { formatPhoneNumber, extractPhoneNumber } from '@/lib/phone-mask';
import type { Tournament } from '@/lib/types/tournaments';

const t = {
  ru: {
    closed: 'Регистрация на этот турнир закрыта',
    title: 'Подать заявку',
    stepData: 'Данные',
    stepPayment: 'Оплата',
    stepConfirm: 'Подтверждение',
    next: 'Далее',
    back: 'Назад',
    submit: 'Отправить заявку',
    sending: 'Отправляем…',
    participantName: 'ФИО участника',
    phone: 'Телефон',
    email: 'Email',
    fideId: 'FIDE ID',
    birthDate: 'Дата рождения',
    comment: 'Комментарий',
    price: 'Стоимость участия',
    kaspiPhone: 'Kaspi Gold',
    kaspiHint: 'Откройте Kaspi → Переводы → На Kaspi Gold → вставьте номер',
    qrTitle: 'QR-код Kaspi',
    qrHint: 'Откройте Kaspi → Сканер',
    copy: 'Скопировать номер',
    copied: 'Номер скопирован',
    payUpload: 'Загрузить чек',
    receiptHint: 'JPG, PNG или PDF, до 5 MB',
    summaryTitle: 'Проверьте данные',
    summaryParticipant: 'Участник',
    summaryBirthDate: 'Дата рождения',
    summaryFideId: 'FIDE ID',
    summaryPhone: 'Телефон',
    summaryEmail: 'Email',
    summaryComment: 'Комментарий',
    summaryPayment: 'Оплата',
    paymentReceipt: 'Чек загружен',
    consent: 'Согласен с обработкой персональных данных',
    success: 'Заявка принята',
    successHint: 'Мы свяжемся с вами в ближайшее время.',
    errorPhone: 'Телефон в формате +7 7XX XXX XX XX',
    errorRequired: 'Заполните обязательные поля',
    errorPayment: 'Загрузите чек или опишите оплату',
    fileTooBig: 'Файл больше 5 MB',
    free: 'Бесплатно',
    errorBirthDate: 'Введите корректную дату рождения',
    paymentMethodTitle: 'Способ оплаты',
    paymentTypeKaspi: 'Kaspi (онлайн)',
    paymentTypeCash: 'Наличными',
    paymentCashHint: 'Оплата на месте перед началом турнира. Подтвердите явку по телефону администратора.',
    paymentCashNote: 'Оплата наличными на месте',
    paymentCashSummary: 'Наличными на месте',
    supportTitle: 'Проблемы с оплатой?',
    supportHint: 'Напишите в WhatsApp технической поддержке —',
    supportContact: 'мы поможем.',
  },
  en: {
    closed: 'Registration is closed',
    title: 'Register',
    stepData: 'Details',
    stepPayment: 'Payment',
    stepConfirm: 'Confirm',
    next: 'Next',
    back: 'Back',
    submit: 'Submit',
    sending: 'Sending…',
    participantName: 'Participant name',
    phone: 'Phone',
    email: 'Email',
    fideId: 'FIDE ID',
    birthDate: 'Birth date',
    comment: 'Comment',
    price: 'Entry fee',
    kaspiPhone: 'Kaspi Gold',
    kaspiHint: 'Open Kaspi → Transfers → To Kaspi Gold → paste the number',
    qrTitle: 'Kaspi QR',
    qrHint: 'Open Kaspi → Scanner',
    copy: 'Copy number',
    copied: 'Number copied',
    payUpload: 'Upload receipt',
    receiptHint: 'JPG, PNG or PDF, up to 5 MB',
    summaryTitle: 'Review your details',
    summaryParticipant: 'Participant',
    summaryBirthDate: 'Birth date',
    summaryFideId: 'FIDE ID',
    summaryPhone: 'Phone',
    summaryEmail: 'Email',
    summaryComment: 'Comment',
    summaryPayment: 'Payment',
    paymentReceipt: 'Receipt uploaded',
    consent: 'I agree to personal data processing',
    success: 'Application received',
    successHint: 'We will contact you shortly.',
    errorPhone: 'Phone format: +7 7XX XXX XX XX',
    errorRequired: 'Fill required fields',
    errorPayment: 'Upload a receipt or describe your payment',
    fileTooBig: 'File larger than 5 MB',
    free: 'Free',
    errorBirthDate: 'Enter a valid birth date',
    paymentMethodTitle: 'Payment method',
    paymentTypeKaspi: 'Kaspi (online)',
    paymentTypeCash: 'Cash',
    paymentCashHint: 'Pay on-site before the tournament starts. Please confirm attendance with the organizer by phone.',
    paymentCashNote: 'Cash payment on-site',
    paymentCashSummary: 'Cash on-site',
    supportTitle: 'Payment issues?',
    supportHint: 'Message our support team on WhatsApp —',
    supportContact: 'we will help.',
  },
  kk: {
    closed: 'Тіркелу жабылған',
    title: 'Өтінім беру',
    stepData: 'Деректер',
    stepPayment: 'Төлем',
    stepConfirm: 'Растау',
    next: 'Әрі қарай',
    back: 'Артқа',
    submit: 'Жіберу',
    sending: 'Жіберілуде…',
    participantName: 'Қатысушы аты-жөні',
    phone: 'Телефон',
    email: 'Email',
    fideId: 'FIDE ID',
    birthDate: 'Туған күні',
    comment: 'Пікір',
    price: 'Қатысу бағасы',
    kaspiPhone: 'Kaspi Gold',
    kaspiHint: 'Kaspi → Аударымдар → Kaspi Gold-қа → нөмірді қою',
    qrTitle: 'Kaspi QR',
    qrHint: 'Kaspi → Сканер',
    copy: 'Нөмірді көшіру',
    copied: 'Нөмір көшірілді',
    payUpload: 'Чекті жүктеу',
    receiptHint: 'JPG, PNG, PDF, 5 MB-қа дейін',
    summaryTitle: 'Деректерді тексеріңіз',
    summaryParticipant: 'Қатысушы',
    summaryBirthDate: 'Туған күні',
    summaryFideId: 'FIDE ID',
    summaryPhone: 'Телефон',
    summaryEmail: 'Email',
    summaryComment: 'Пікір',
    summaryPayment: 'Төлем',
    paymentReceipt: 'Чек жүктелді',
    consent: 'Деректерді өңдеуге келісемін',
    success: 'Өтінім қабылданды',
    successHint: 'Жақын арада хабарласамыз.',
    errorPhone: 'Формат: +7 7XX XXX XX XX',
    errorRequired: 'Міндетті өрістерді толтырыңыз',
    errorPayment: 'Чекті жүктеңіз немесе төлемді сипаттаңыз',
    fileTooBig: 'Файл 5 MB-тан үлкен',
    free: 'Тегін',
    errorBirthDate: 'Туған күнді дұрыс енгізіңіз',
    paymentMethodTitle: 'Төлем тәсілі',
    paymentTypeKaspi: 'Kaspi (онлайн)',
    paymentTypeCash: 'Қолма-қол',
    paymentCashHint: 'Турнир басталар алдында жерінде төленеді. Қатысуыңызды ұйымдастырушыға телефон арқылы растаңыз.',
    paymentCashNote: 'Жерінде қолма-қол төлем',
    paymentCashSummary: 'Қолма-қол жерінде',
    supportTitle: 'Төлемде мәселе бар ма?',
    supportHint: 'WhatsApp арқылы техникалық қолдауға жазыңыз —',
    supportContact: 'көмектесеміз.',
  },
};

const KZ_PHONE_DIGITS = /^77\d{9}$/;
const MAX_RECEIPT = 5 * 1024 * 1024;

export function TournamentRegistrationForm({ tournament }: { tournament: Tournament }) {
  const { locale } = useLocale();
  const tt = t[locale as keyof typeof t] ?? t.ru;
  const active = isRegistrationActive(tournament);

  const isPaid = !tournament.isFree;
  const steps = isPaid
    ? [tt.stepData, tt.stepPayment, tt.stepConfirm]
    : [tt.stepData, tt.stepConfirm];

  const [step, setStep] = useState(0);
  const [participantName, setParticipantName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [fideId, setFideId] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [comment, setComment] = useState('');
  const [receipt, setReceipt] = useState<File | null>(null);
  const [paymentType, setPaymentType] = useState<'kaspi' | 'cash'>('kaspi');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const mutation = useMutation({
    mutationFn: (fd: FormData) => submitTournamentRegistration(tournament.slug, fd),
    onError: (e: unknown) => {
      const err = e as { response?: { data?: { message?: string } } };
      setError(err?.response?.data?.message ?? 'Ошибка отправки');
    },
  });

  if (!active) {
    return (
      <div className="rounded-2xl bg-gray-50 border border-gray-200 p-8 text-center">
        <AlertCircle className="w-10 h-10 mx-auto text-gray-400 mb-3" />
        <p className="text-gray-700 font-medium">{tt.closed}</p>
      </div>
    );
  }

  if (mutation.isSuccess) {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
        <CheckCircle2 className="w-12 h-12 mx-auto text-green-600 mb-3" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">{tt.success}</h3>
        <p className="text-green-700">{tt.successHint}</p>
      </div>
    );
  }

  function validateData(): string | null {
    if (!participantName || !phone) return tt.errorRequired;
    const phoneDigits = extractPhoneNumber(phone);
    if (!KZ_PHONE_DIGITS.test(phoneDigits)) return tt.errorPhone;
    if (birthDate) {
      const d = new Date(birthDate);
      const today = new Date();
      const minDate = new Date('1900-01-01');
      if (Number.isNaN(d.getTime()) || d > today || d < minDate) return tt.errorBirthDate;
    }
    return null;
  }

  function validatePayment(): string | null {
    if (!isPaid) return null;
    if (paymentType === 'cash') return null;
    if (!receipt) return tt.errorPayment;
    if (receipt.size > MAX_RECEIPT) return tt.fileTooBig;
    return null;
  }

  function handleNext() {
    setError(null);
    if (step === 0) {
      const err = validateData();
      if (err) return setError(err);
    }
    if (isPaid && step === 1) {
      const err = validatePayment();
      if (err) return setError(err);
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function handleBack() {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleSubmit() {
    setError(null);
    if (!consent) return setError(tt.errorRequired);
    const phoneDigits = extractPhoneNumber(phone);

    const fd = new FormData();
    fd.append('participantName', participantName);
    fd.append('phone', '+' + phoneDigits);
    if (email) fd.append('email', email);
    if (fideId) fd.append('fideId', fideId);
    if (birthDate) fd.append('birthDate', birthDate);
    if (comment) fd.append('comment', comment);
    if (isPaid) {
      if (paymentType === 'cash') {
        fd.append('paymentNote', tt.paymentCashNote);
      } else if (receipt) {
        fd.append('receipt', receipt);
      }
    }
    mutation.mutate(fd);
  }

  function copyKaspi() {
    if (!tournament.kaspiPhone) return;
    navigator.clipboard.writeText(tournament.kaspiPhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const isLast = step === steps.length - 1;
  const showPhone = tournament.paymentMethod === 'KASPI_PHONE' || tournament.paymentMethod === 'BOTH';
  const showQr = tournament.paymentMethod === 'KASPI_QR' || tournament.paymentMethod === 'BOTH';

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
      <h3 className="text-2xl font-bold text-secondary mb-6">{tt.title}</h3>

      <Stepper steps={steps} current={step} />

      <div className="mt-8 space-y-4">
        {step === 0 && (
          <>
            <Field label={tt.participantName + ' *'}>
              <input
                required
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </Field>
            <Field label={tt.phone + ' *'}>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  required
                  type="tel"
                  placeholder="+7 7XX XXX XX XX"
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={tt.email}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </Field>
              <Field label={tt.birthDate}>
                <input
                  type="date"
                  min="1900-01-01"
                  max={new Date().toISOString().slice(0, 10)}
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </Field>
            </div>
            <Field label={tt.fideId}>
              <input
                value={fideId}
                onChange={(e) => setFideId(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </Field>
            <Field label={tt.comment}>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </Field>
          </>
        )}

        {isPaid && step === 1 && (
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-5 text-center">
              <p className="text-sm text-gray-600 mb-1">{tt.price}</p>
              <p className="text-3xl font-bold text-secondary">{formatPrice(tournament.price)}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-secondary mb-2">{tt.paymentMethodTitle}</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentType('kaspi')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium text-sm transition ${
                    paymentType === 'kaspi'
                      ? 'border-primary bg-primary/5 text-secondary'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  {tt.paymentTypeKaspi}
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentType('cash')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium text-sm transition ${
                    paymentType === 'cash'
                      ? 'border-primary bg-primary/5 text-secondary'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  {tt.paymentTypeCash}
                </button>
              </div>
            </div>

            {paymentType === 'cash' ? (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
                <Wallet className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-900 leading-relaxed">{tt.paymentCashHint}</p>
              </div>
            ) : (
              <>
            <div className={`grid gap-3 ${showPhone && showQr ? 'md:grid-cols-2' : ''}`}>
              {showPhone && tournament.kaspiPhone && (
                <div className="bg-white border border-gray-200 rounded-2xl p-4">
                  <p className="text-xs uppercase text-gray-500 tracking-wider mb-2">{tt.kaspiPhone}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <p className="text-base font-semibold text-secondary">{tournament.kaspiPhone}</p>
                  </div>
                  <button
                    type="button"
                    onClick={copyKaspi}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#f14635] hover:bg-[#d83a2c] text-white rounded-xl font-semibold text-sm transition"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" /> {tt.copied}
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> {tt.copy}
                      </>
                    )}
                  </button>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">{tt.kaspiHint}</p>
                </div>
              )}
              {showQr && tournament.kaspiQrUrl && (
                <div className="bg-white border border-gray-200 rounded-2xl p-4">
                  <p className="text-xs uppercase text-gray-500 tracking-wider mb-2 text-center">{tt.qrTitle}</p>
                  <div className="relative aspect-square max-w-[200px] mx-auto">
                    <Image src={tournament.kaspiQrUrl} alt="QR" fill className="object-contain" />
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">{tt.qrHint}</p>
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-xl p-4 space-y-3">
              <p className="text-sm font-semibold text-secondary">{tt.payUpload}</p>
              <label className="flex items-center gap-3 cursor-pointer p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary/40 transition">
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="flex-1 text-sm text-gray-600">{receipt ? receipt.name : tt.receiptHint}</span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => setReceipt(e.target.files?.[0] ?? null)}
                  className="hidden"
                />
              </label>
            </div>
              </>
            )}

            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex gap-3">
              <MessageCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-sm text-green-900 leading-relaxed">
                <span className="font-semibold">{tt.supportTitle}</span>{' '}
                {tt.supportHint}{' '}
                <a
                  href="https://wa.me/77002967321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-green-700 underline underline-offset-2 hover:text-green-800"
                >
                  +7 700 296 7321
                </a>
                , {tt.supportContact}
              </p>
            </div>
          </div>
        )}

        {isLast && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-secondary">{tt.summaryTitle}</p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2 text-sm">
              <SummaryRow label={tt.summaryParticipant} value={participantName} />
              {birthDate && <SummaryRow label={tt.summaryBirthDate} value={new Date(birthDate).toLocaleDateString(locale === 'en' ? 'en-GB' : 'ru-RU')} />}
              {fideId && <SummaryRow label={tt.summaryFideId} value={fideId} />}
              <SummaryRow label={tt.summaryPhone} value={phone} />
              {email && <SummaryRow label={tt.summaryEmail} value={email} />}
              {comment && <SummaryRow label={tt.summaryComment} value={comment} />}
              {isPaid && (
                <SummaryRow
                  label={tt.summaryPayment}
                  value={
                    paymentType === 'cash'
                      ? tt.paymentCashSummary
                      : `${tt.paymentReceipt}${receipt ? ` — ${receipt.name}` : ''}`
                  }
                />
              )}
            </div>
            <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1"
              />
              <span>{tt.consent}</span>
            </label>
          </div>
        )}

        {error && (
          <p className="text-sm text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}

        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 0}
            className="flex items-center gap-1 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-4 h-4" />
            {tt.back}
          </button>
          {!isLast ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1 px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition shadow-lg"
            >
              {tt.next}
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={mutation.isPending}
              className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition shadow-lg disabled:opacity-50"
            >
              {mutation.isPending ? tt.sending : tt.submit}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center flex-1">
            <div className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition ${
                  done
                    ? 'bg-primary text-white'
                    : active
                      ? 'bg-primary text-white ring-4 ring-primary/20'
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                {done ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={`text-sm font-medium hidden sm:inline ${
                  active ? 'text-secondary' : done ? 'text-gray-700' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 flex-1 mx-2 ${done ? 'bg-primary' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-gray-500 min-w-[110px]">{label}:</span>
      <span className="text-gray-900 font-medium flex-1">{value}</span>
    </div>
  );
}
