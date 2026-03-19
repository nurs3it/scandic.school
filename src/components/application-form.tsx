"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApplicationForm } from "@/lib/hooks";
import { ApplicationFormData } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, AlertCircle, User } from "lucide-react";
import { useLocale } from './locale-provider';
import { formatPhoneNumber } from '@/lib/phone-mask';

// Validates +7 (XXX) XXX-XX-XX format
function isValidPhone(phone: string): boolean {
  return /^\+7\s?\(?\d{3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/.test(phone);
}

interface FieldErrors {
  parentName?: string;
  parentPhone?: string;
  grade?: string;
  language?: string;
}

export function ApplicationForm() {
  const { translations } = useLocale();

  const applicationData = translations.application as Record<string, unknown>;

  const t = {
    title: (applicationData?.title as string) || "Enrollment Inquiry",
    subtitle: (applicationData?.subtitle as string) || "Submit your inquiry and our admissions team will contact you.",
    contactInfo: (applicationData?.parentInfo as string) || "Contact Information",
    parentName: (applicationData?.parentName as string) || "Parent's Full Name *",
    parentPhone: (applicationData?.parentPhone as string) || "Contact Phone Number *",
    grade: (applicationData?.grade as string) || "Grade Applying For *",
    language: (applicationData?.language as string) || "Language of Instruction *",
    parentNamePlaceholder: ((applicationData?.placeholders as Record<string, string>)?.parentName) || "Enter full name",
    parentPhonePlaceholder: ((applicationData?.placeholders as Record<string, string>)?.parentPhone) || "+7 (___) ___-__-__",
    gradePlaceholder: ((applicationData?.selectPlaceholders as Record<string, string>)?.grade) || "Select grade",
    languagePlaceholder: ((applicationData?.selectPlaceholders as Record<string, string>)?.language) || "Select language",
    gradeOptions: Object.entries(
      (applicationData?.gradeOptions as Record<string, string>) || { "1": "Grade 1", "2": "Grade 2", "3": "Grade 3", "4": "Grade 4" }
    ).filter(([value]) => value !== "0").map(([value, label]) => ({ value, label: label as string })),
    languageOptions: Object.entries(
      (applicationData?.languageOptions as Record<string, string>) || { kazakh: "Kazakh", russian: "Russian" }
    ).map(([value, label]) => ({ value, label: label as string })),
    submit: (applicationData?.submitButton as string) || "Submit Inquiry",
    submitting: (applicationData?.submittingButton as string) || "Submitting...",
    error: (applicationData?.errorMessage as string) || "An error occurred. Please try again.",
    additionalInfo: (applicationData?.additionalInfo as string) || "After submitting, our admissions team will reach out to confirm details and next steps.",
    license: (applicationData?.licenseInfo as string) || "License: KZ96LAA00035527 | Grades 1-4 | IB PYP",
    required: "This field is required",
    phoneInvalid: "Enter a valid phone number: +7 (XXX) XXX-XX-XX",
    nameTooShort: "Name must be at least 2 characters",
  };

  const [formData, setFormData] = useState({
    parentName: "",
    parentPhone: "",
    grade: "" as "1" | "2" | "3" | "4" | "",
    language: "" as "kazakh" | "russian" | "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const router = useRouter();
  const applicationMutation = useApplicationForm();

  function validate(data: typeof formData): FieldErrors {
    const errors: FieldErrors = {};
    if (!data.parentName.trim()) errors.parentName = t.required;
    else if (data.parentName.trim().length < 2) errors.parentName = t.nameTooShort;
    if (!data.parentPhone) errors.parentPhone = t.required;
    else if (!isValidPhone(data.parentPhone)) errors.parentPhone = t.phoneInvalid;
    if (!data.grade) errors.grade = t.required;
    if (!data.language) errors.language = t.required;
    return errors;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { parentName: true, parentPhone: true, grade: true, language: true };
    setTouched(allTouched);
    const errors = validate(formData);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    applicationMutation.mutate(formData as ApplicationFormData, {
      onSuccess: () => router.push("/thanks"),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (touched[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: validate(updated)[name as keyof FieldErrors] }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = formatPhoneNumber(e.target.value);
    const updated = { ...formData, parentPhone: masked };
    setFormData(updated);
    if (touched.parentPhone) {
      setFieldErrors((prev) => ({ ...prev, parentPhone: validate(updated).parentPhone }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFieldErrors((prev) => ({ ...prev, [name]: validate(formData)[name as keyof FieldErrors] }));
  };

  const handleSelectChange = (name: string, value: string) => {
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFieldErrors((prev) => ({ ...prev, [name]: validate(updated)[name as keyof FieldErrors] }));
  };

  const apiError = applicationMutation.isError
    ? (applicationMutation.error instanceof Error
        ? applicationMutation.error.message
        : t.error)
    : null;

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-secondary mb-4">
          {t.title}
        </CardTitle>
        <p className="text-gray-600 text-lg">
          {t.subtitle}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold text-secondary">{t.contactInfo}</h3>
          </div>

          {/* Parent Name */}
          <div>
            <Label htmlFor="parentName" className="text-sm font-medium text-gray-700">
              {t.parentName}
            </Label>
            <Input
              id="parentName"
              name="parentName"
              type="text"
              value={formData.parentName}
              onChange={handleChange}
              onBlur={() => handleBlur("parentName")}
              placeholder={t.parentNamePlaceholder}
              className={`mt-2 ${fieldErrors.parentName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
            {fieldErrors.parentName && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />{fieldErrors.parentName}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="parentPhone" className="text-sm font-medium text-gray-700">
              {t.parentPhone}
            </Label>
            <Input
              id="parentPhone"
              name="parentPhone"
              type="tel"
              inputMode="numeric"
              value={formData.parentPhone}
              onChange={handlePhoneChange}
              onBlur={() => handleBlur("parentPhone")}
              placeholder={t.parentPhonePlaceholder}
              className={`mt-2 ${fieldErrors.parentPhone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
            {fieldErrors.parentPhone && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />{fieldErrors.parentPhone}
              </p>
            )}
          </div>

          {/* Grade */}
          <div>
            <Label className="text-sm font-medium text-gray-700">
              {t.grade}
            </Label>
            <Select
              value={formData.grade}
              onValueChange={(value) => handleSelectChange("grade", value)}
            >
              <SelectTrigger className={`mt-2 ${fieldErrors.grade ? "border-red-500 ring-red-500" : ""}`}>
                <SelectValue placeholder={t.gradePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {t.gradeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.grade && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />{fieldErrors.grade}
              </p>
            )}
          </div>

          {/* Language */}
          <div>
            <Label className="text-sm font-medium text-gray-700">
              {t.language}
            </Label>
            <Select
              value={formData.language}
              onValueChange={(value) => handleSelectChange("language", value)}
            >
              <SelectTrigger className={`mt-2 ${fieldErrors.language ? "border-red-500 ring-red-500" : ""}`}>
                <SelectValue placeholder={t.languagePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {t.languageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.language && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />{fieldErrors.language}
              </p>
            )}
          </div>

          {/* API Error */}
          {apiError && (
            <div className="flex items-start space-x-2 text-red-700 bg-red-50 border border-red-200 p-4 rounded-lg">
              <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
              <span>{apiError}</span>
            </div>
          )}

          <div className="text-center pt-2">
            <Button
              type="submit"
              disabled={applicationMutation.isPending}
              className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-12 py-4 text-lg glow-effect"
            >
              {applicationMutation.isPending ? (
                t.submitting
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  {t.submit}
                </>
              )}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>{t.additionalInfo}</p>
            <p className="mt-2">{t.license}</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
