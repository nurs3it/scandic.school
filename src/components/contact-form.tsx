"use client";

import { useState } from "react";
import { useContactForm } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useLocale } from './locale-provider';

export function ContactForm() {
  const { translations } = useLocale();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = (translations as any).contact;
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const contactMutation = useContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-secondary text-center">
          {t.title}
        </CardTitle>
        <p className="text-gray-600 text-center">
          {t.subtitle}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {t.form.name} *
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={t.form.placeholders.name}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t.form.email} *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={t.form.placeholders.email}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              {t.form.phone}
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t.form.placeholders.phone}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              {t.form.message} *
            </label>
            <Textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder={t.form.placeholders.message}
              rows={5}
              className="w-full"
            />
          </div>

          {contactMutation.isSuccess && (
            <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-lg">
              <CheckCircle className="h-5 w-5" />
              <span>{t.form.messages.success || contactMutation.data?.message}</span>
            </div>
          )}

          {contactMutation.isError && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span>{t.form.messages.error}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={contactMutation.isPending}
            className="w-full bg-primary hover:bg-primary/90 text-secondary font-semibold py-3"
          >
            {contactMutation.isPending ? (
              t.form.messages.sending
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                {t.form.submit}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
