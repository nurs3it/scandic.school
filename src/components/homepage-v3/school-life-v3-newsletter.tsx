"use client";

import { useState } from "react";

type Props = {
  title: string;
  description: string;
  placeholder: string;
  submitLabel: string;
};

export function SchoolLifeNewsletter({ title, description, placeholder, submitLabel }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-brand-orange-500 text-white rounded-2xl p-6">
      <h3 className="font-display font-semibold text-xl mb-2">{title}</h3>
      <p className="text-white/90 text-sm mb-4">{description}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("[v3 newsletter stub] subscribe:", email);
          setSubmitted(true);
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="px-4 py-2 rounded-full bg-white text-brand-navy-900 placeholder:text-brand-navy-700/60 focus:outline-none focus:ring-2 focus:ring-white/40"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-full bg-white text-brand-orange-600 font-medium hover:bg-white/90"
        >
          {submitted ? "✓" : submitLabel}
        </button>
      </form>
    </div>
  );
}
