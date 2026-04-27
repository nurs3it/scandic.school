'use client';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Upload, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import { useLocale } from './locale-provider';
import { submitTournamentRegistration } from '@/lib/tournaments-api';
import { isRegistrationActive } from '@/lib/tournament-utils';
import { formatPhoneNumber, extractPhoneNumber } from '@/lib/phone-mask';
import type { Tournament } from '@/lib/types/tournaments';

const t = {
  ru: {
    closed: 'Регистрация на этот турнир закрыта',
    title: 'Подать заявку',
    participantName: 'ФИО участника',
    parentName: 'ФИО родителя/опекуна',
    phone: 'Телефон',
    email: 'Email',
    grade: 'Класс',
    comment: 'Комментарий',
    paymentLabel: 'Оплата',
    payUpload: 'Загрузить чек',
    payNotify: 'Сообщить менеджеру об оплате',
    receiptHint: 'JPG, PNG или PDF, до 5 MB',
    paymentNote: 'Когда и как вы оплатили (опц.)',
    consent: 'Согласен с обработкой персональных данных',
    submit: 'Отправить заявку',
    sending: 'Отправляем…',
    success: 'Заявка принята',
    successHint: 'Мы свяжемся с вами в ближайшее время.',
    errorPhone: 'Телефон в формате +7 7XX XXX XX XX',
    errorRequired: 'Заполните обязательные поля',
    fileTooBig: 'Файл больше 5 MB',
  },
  en: {
    closed: 'Registration is closed',
    title: 'Register',
    participantName: 'Participant name',
    parentName: 'Parent/guardian name',
    phone: 'Phone',
    email: 'Email',
    grade: 'Grade',
    comment: 'Comment',
    paymentLabel: 'Payment',
    payUpload: 'Upload receipt',
    payNotify: 'Notify manager',
    receiptHint: 'JPG, PNG or PDF, up to 5 MB',
    paymentNote: 'How and when you paid (optional)',
    consent: 'I agree to personal data processing',
    submit: 'Submit',
    sending: 'Sending…',
    success: 'Application received',
    successHint: 'We will contact you shortly.',
    errorPhone: 'Phone format: +7 7XX XXX XX XX',
    errorRequired: 'Fill required fields',
    fileTooBig: 'File larger than 5 MB',
  },
  kk: {
    closed: 'Тіркелу жабылған',
    title: 'Өтінім беру',
    participantName: 'Қатысушы аты-жөні',
    parentName: 'Ата-ана аты-жөні',
    phone: 'Телефон',
    email: 'Email',
    grade: 'Сынып',
    comment: 'Пікір',
    paymentLabel: 'Төлем',
    payUpload: 'Чекті жүктеу',
    payNotify: 'Менеджерге хабарлау',
    receiptHint: 'JPG, PNG, PDF, 5 MB-қа дейін',
    paymentNote: 'Қашан және қалай төледіңіз',
    consent: 'Деректерді өңдеуге келісемін',
    submit: 'Жіберу',
    sending: 'Жіберілуде…',
    success: 'Өтінім қабылданды',
    successHint: 'Жақын арада хабарласамыз.',
    errorPhone: 'Формат: +7 7XX XXX XX XX',
    errorRequired: 'Міндетті өрістерді толтырыңыз',
    fileTooBig: 'Файл 5 MB-тан үлкен',
  },
};

const KZ_PHONE_DIGITS = /^77\d{9}$/;
const MAX_RECEIPT = 5 * 1024 * 1024;

export function TournamentRegistrationForm({ tournament }: { tournament: Tournament }) {
  const { locale } = useLocale();
  const tt = t[locale as keyof typeof t] ?? t.ru;
  const active = isRegistrationActive(tournament);

  const [participantName, setParticipantName] = useState('');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [comment, setComment] = useState('');
  const [payMode, setPayMode] = useState<'upload' | 'notify'>('upload');
  const [receipt, setReceipt] = useState<File | null>(null);
  const [paymentNote, setPaymentNote] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!participantName || !phone || !consent) return setError(tt.errorRequired);
    const phoneDigits = extractPhoneNumber(phone);
    if (!KZ_PHONE_DIGITS.test(phoneDigits)) return setError(tt.errorPhone);
    if (payMode === 'upload' && receipt && receipt.size > MAX_RECEIPT) return setError(tt.fileTooBig);

    const fd = new FormData();
    fd.append('participantName', participantName);
    if (parentName) fd.append('parentName', parentName);
    fd.append('phone', '+' + phoneDigits);
    if (email) fd.append('email', email);
    if (grade) fd.append('grade', grade);
    if (comment) fd.append('comment', comment);
    if (!tournament.isFree) {
      if (payMode === 'upload' && receipt) fd.append('receipt', receipt);
      if (payMode === 'notify' && paymentNote) fd.append('paymentNote', paymentNote);
    }
    mutation.mutate(fd);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 space-y-4">
      <h3 className="text-2xl font-bold text-secondary mb-2">{tt.title}</h3>
      <Field label={tt.participantName + ' *'}><input required value={participantName} onChange={(e) => setParticipantName(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" /></Field>
      <Field label={tt.parentName}><input value={parentName} onChange={(e) => setParentName(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" /></Field>
      <Field label={tt.phone + ' *'}><div className="relative"><Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" /><input required type="tel" placeholder="+7 7XX XXX XX XX" value={phone} onChange={(e) => setPhone(formatPhoneNumber(e.target.value))} className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" /></div></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label={tt.email}><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" /></Field>
        <Field label={tt.grade}><input value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" /></Field>
      </div>
      <Field label={tt.comment}><textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" /></Field>

      {!tournament.isFree && (
        <fieldset className="border border-gray-200 rounded-xl p-4 space-y-3">
          <legend className="px-2 text-sm font-semibold text-secondary">{tt.paymentLabel}</legend>
          <div className="grid grid-cols-2 gap-2">
            <RadioOption checked={payMode === 'upload'} onChange={() => setPayMode('upload')} label={tt.payUpload} />
            <RadioOption checked={payMode === 'notify'} onChange={() => setPayMode('notify')} label={tt.payNotify} />
          </div>
          {payMode === 'upload' ? (
            <label className="flex items-center gap-3 cursor-pointer p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary/40 transition">
              <Upload className="w-5 h-5 text-gray-400" />
              <span className="flex-1 text-sm text-gray-600">{receipt ? receipt.name : tt.receiptHint}</span>
              <input type="file" accept="image/*,application/pdf" onChange={(e) => setReceipt(e.target.files?.[0] ?? null)} className="hidden" />
            </label>
          ) : (
            <textarea rows={3} placeholder={tt.paymentNote} value={paymentNote} onChange={(e) => setPaymentNote(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
          )}
        </fieldset>
      )}

      <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
        <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
        <span>{tt.consent}</span>
      </label>

      {error && <p className="text-sm text-red-600 flex items-center gap-2"><AlertCircle className="w-4 h-4" />{error}</p>}

      <button type="submit" disabled={mutation.isPending} className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition shadow-lg disabled:opacity-50">
        {mutation.isPending ? tt.sending : tt.submit}
      </button>
    </form>
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

function RadioOption({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button type="button" onClick={onChange} className={`px-3 py-2 rounded-lg text-sm font-medium border transition ${checked ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
      {label}
    </button>
  );
}
