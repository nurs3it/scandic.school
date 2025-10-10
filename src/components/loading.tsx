"use client";

import { useLocale } from './locale-provider';

export default function Loading() {
  const { translations } = useLocale();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">{translations.common.loading}</p>
      </div>
    </div>
  );
}
