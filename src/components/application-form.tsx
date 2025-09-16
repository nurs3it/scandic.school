"use client";

import { useState } from "react";
import { useApplicationForm } from "@/lib/hooks";
import { ApplicationFormData } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, CheckCircle, AlertCircle, User, GraduationCap } from "lucide-react";
import { useLocale } from './locale-provider';

interface ApplicationTranslations {
  title: string;
  subtitle: string;
  sections: {
    parentInfo: string;
    childInfo: string;
  };
  fields: {
    parentName: string;
    parentPhone: string;
    childName: string;
    childBirthDate: string;
    grade: string;
    language: string;
    englishLevel: string;
    preferredTime: string;
  };
  placeholders: {
    parentName: string;
    parentPhone: string;
    childName: string;
    grade: string;
    language: string;
    englishLevel: string;
    preferredTime: string;
  };
  options: {
    grades: Array<{ value: string; label: string }>;
    languages: Array<{ value: string; label: string }>;
    englishLevels: Array<{ value: string; label: string }>;
  };
  messages: {
    submitting: string;
    submit: string;
    error: string;
    success: string;
    license: string;
  };
}

export function ApplicationForm() {
  const { translations } = useLocale();
  
  // Безопасный доступ к переводам формы заявки
  const applicationTranslations: ApplicationTranslations = (translations as Record<string, ApplicationTranslations>).application || {
    title: "Application Form",
    subtitle: "Apply for admission to Scandic International School",
    sections: {
      parentInfo: "Parent Information",
      childInfo: "Child Information"
    },
    fields: {
      parentName: "Parent's Full Name (Legal Representative) *",
      parentPhone: "Contact Phone Number *",
      childName: "Child's Full Name *",
      childBirthDate: "Child's Date of Birth *",
      grade: "Grade Applying For *",
      language: "Language of Instruction *",
      englishLevel: "Child's English Level *",
      preferredTime: "Preferred Interview Time *"
    },
    placeholders: {
      parentName: "Enter full name",
      parentPhone: "+1 (___) ___-____",
      childName: "Enter child's full name",
      grade: "Select grade",
      language: "Select language",
      englishLevel: "Select level",
      preferredTime: "Specify desired date and time"
    },
    options: {
      grades: [
        { value: "0", label: "Grade 0" },
        { value: "1", label: "Grade 1" },
        { value: "2", label: "Grade 2" },
        { value: "3", label: "Grade 3" },
        { value: "4", label: "Grade 4" }
      ],
      languages: [
        { value: "kazakh", label: "Kazakh" },
        { value: "russian", label: "Russian" }
      ],
      englishLevels: [
        { value: "beginner", label: "Beginner" },
        { value: "intermediate", label: "Intermediate (Pre-Intermediate and above)" },
        { value: "unknown", label: "Don't know" }
      ]
    },
    messages: {
      submitting: "Submitting application...",
      submit: "Submit Application",
      error: "An error occurred while submitting the application. Please try again.",
      success: "We will contact you to confirm the interview within 24 hours.",
      license: "License: KZ96LAA00035527 | Grades 0-4 | IB PYP"
    }
  };
  const [formData, setFormData] = useState({
    parentName: "",
    parentPhone: "",
    childName: "",
    childBirthDate: "",
    grade: "" as "0" | "1" | "2" | "3" | "4" | "",
    language: "" as "kazakh" | "russian" | "",
    englishLevel: "" as "beginner" | "intermediate" | "unknown" | "",
    preferredTime: "",
  });

  const applicationMutation = useApplicationForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.parentName || !formData.parentPhone || !formData.childName || 
        !formData.childBirthDate || !formData.grade || !formData.language || 
        !formData.englishLevel || !formData.preferredTime) {
      return;
    }

    applicationMutation.mutate(formData as ApplicationFormData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const gradeOptions = applicationTranslations?.options?.grades || [];
  const languageOptions = applicationTranslations?.options?.languages || [];
  const englishLevelOptions = applicationTranslations?.options?.englishLevels || [];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-secondary mb-4">
          {applicationTranslations?.title || "Application Form"}
        </CardTitle>
        <p className="text-gray-600 text-lg">
          {applicationTranslations?.subtitle || "Apply for admission to Scandic International School"}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Parent Information */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold text-secondary">{applicationTranslations?.sections?.parentInfo || "Parent Information"}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="parentName" className="text-sm font-medium text-gray-700">
                  {applicationTranslations?.fields?.parentName || "Parent's Full Name (Legal Representative) *"}
                </Label>
                <Input
                  id="parentName"
                  name="parentName"
                  type="text"
                  required
                  value={formData.parentName}
                  onChange={handleChange}
                  placeholder={applicationTranslations?.placeholders?.parentName || "Enter full name"}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="parentPhone" className="text-sm font-medium text-gray-700">
                  {applicationTranslations?.fields?.parentPhone || "Contact Phone Number *"}
                </Label>
                <Input
                  id="parentPhone"
                  name="parentPhone"
                  type="tel"
                  required
                  value={formData.parentPhone}
                  onChange={handleChange}
                  placeholder={applicationTranslations?.placeholders?.parentPhone || "+1 (___) ___-____"}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          {/* Child Information */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold text-secondary">{applicationTranslations?.sections?.childInfo || "Child Information"}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="childName" className="text-sm font-medium text-gray-700">
                  {applicationTranslations?.fields?.childName || "Child's Full Name *"}
                </Label>
                <Input
                  id="childName"
                  name="childName"
                  type="text"
                  required
                  value={formData.childName}
                  onChange={handleChange}
                  placeholder={applicationTranslations?.placeholders?.childName || "Enter child's full name"}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="childBirthDate" className="text-sm font-medium text-gray-700">
                  {applicationTranslations?.fields?.childBirthDate || "Child's Date of Birth *"}
                </Label>
                <Input
                  id="childBirthDate"
                  name="childBirthDate"
                  type="date"
                  required
                  value={formData.childBirthDate}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  {applicationTranslations?.fields?.grade || "Grade Applying For *"}
                </Label>
                <Select
                  value={formData.grade}
                  onValueChange={(value) => handleSelectChange("grade", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder={applicationTranslations?.placeholders?.grade || "Select grade"} />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  {applicationTranslations?.fields?.language || "Language of Instruction *"}
                </Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => handleSelectChange("language", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder={applicationTranslations?.placeholders?.language || "Select language"} />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  {applicationTranslations?.fields?.englishLevel || "Child's English Level *"}
                </Label>
                <Select
                  value={formData.englishLevel}
                  onValueChange={(value) => handleSelectChange("englishLevel", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder={applicationTranslations?.placeholders?.englishLevel || "Select level"} />
                  </SelectTrigger>
                  <SelectContent>
                    {englishLevelOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="preferredTime" className="text-sm font-medium text-gray-700">
                  {applicationTranslations?.fields?.preferredTime || "Preferred Interview Time *"}
                </Label>
                <Input
                  id="preferredTime"
                  name="preferredTime"
                  type="text"
                  required
                  value={formData.preferredTime}
                  onChange={handleChange}
                  placeholder={applicationTranslations?.placeholders?.preferredTime || "Specify desired date and time"}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          {/* Status Messages */}
          {applicationMutation.isSuccess && (
            <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-lg">
              <CheckCircle className="h-5 w-5" />
              <span>{applicationMutation.data?.message}</span>
            </div>
          )}

          {applicationMutation.isError && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span>{applicationTranslations?.messages?.error || "An error occurred while submitting the application. Please try again."}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              disabled={applicationMutation.isPending}
              className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-12 py-4 text-lg glow-effect"
            >
              {applicationMutation.isPending ? (
                applicationTranslations?.messages?.submitting || "Submitting application..."
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  {applicationTranslations?.messages?.submit || "Submit Application"}
                </>
              )}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center text-sm text-gray-500">
            <p>
              {applicationTranslations?.messages?.success || "We will contact you to confirm the interview within 24 hours."}
            </p>
            <p className="mt-2">
              {applicationTranslations?.messages?.license || "License: KZ96LAA00035527 | Grades 0-4 | IB PYP"}
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
