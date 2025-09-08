"use client";

import { useState } from "react";
import { useApplicationForm } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, CheckCircle, AlertCircle, Calendar, User, Phone, GraduationCap } from "lucide-react";

export function ApplicationForm() {
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

    applicationMutation.mutate(formData as any);
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

  const gradeOptions = [
    { value: "0", label: "0 класс" },
    { value: "1", label: "1 класс" },
    { value: "2", label: "2 класс" },
    { value: "3", label: "3 класс" },
    { value: "4", label: "4 класс" },
  ];

  const languageOptions = [
    { value: "kazakh", label: "Казахский" },
    { value: "russian", label: "Русский" },
  ];

  const englishLevelOptions = [
    { value: "beginner", label: "Начинающий (Beginner)" },
    { value: "intermediate", label: "Средний (Pre-Intermediate и выше)" },
    { value: "unknown", label: "Не знаю" },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-secondary mb-4">
          Заявка на набор 2025-2026
        </CardTitle>
        <p className="text-gray-600 text-lg">
          Откройте для своего ребенка мир возможностей с международным образованием
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Parent Information */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold text-secondary">Информация о родителе</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="parentName" className="text-sm font-medium text-gray-700">
                  ФИО родителя (законного представителя) *
                </Label>
                <Input
                  id="parentName"
                  name="parentName"
                  type="text"
                  required
                  value={formData.parentName}
                  onChange={handleChange}
                  placeholder="Введите ФИО"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="parentPhone" className="text-sm font-medium text-gray-700">
                  Контактный номер телефона *
                </Label>
                <Input
                  id="parentPhone"
                  name="parentPhone"
                  type="tel"
                  required
                  value={formData.parentPhone}
                  onChange={handleChange}
                  placeholder="+7 (___) ___-__-__"
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          {/* Child Information */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold text-secondary">Информация о ребенке</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="childName" className="text-sm font-medium text-gray-700">
                  ФИО ребенка *
                </Label>
                <Input
                  id="childName"
                  name="childName"
                  type="text"
                  required
                  value={formData.childName}
                  onChange={handleChange}
                  placeholder="Введите ФИО ребенка"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="childBirthDate" className="text-sm font-medium text-gray-700">
                  Дата рождения ребенка *
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
                  Класс, на который планируете поступать *
                </Label>
                <Select
                  value={formData.grade}
                  onValueChange={(value) => handleSelectChange("grade", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Выберите класс" />
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
                  Язык обучения *
                </Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => handleSelectChange("language", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Выберите язык" />
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
                  Уровень знания английского языка у ребенка *
                </Label>
                <Select
                  value={formData.englishLevel}
                  onValueChange={(value) => handleSelectChange("englishLevel", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Выберите уровень" />
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
                  Удобное время для собеседования *
                </Label>
                <Input
                  id="preferredTime"
                  name="preferredTime"
                  type="text"
                  required
                  value={formData.preferredTime}
                  onChange={handleChange}
                  placeholder="Укажите желаемую дату и время"
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
              <span>Произошла ошибка при подаче заявки. Попробуйте еще раз.</span>
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
                "Отправляем заявку..."
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Подать заявку
                </>
              )}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center text-sm text-gray-500">
            <p>
              Мы свяжемся с вами для подтверждения собеседования в течение 24 часов.
            </p>
            <p className="mt-2">
              Лицензия: KZ96LAA00035527 | 0–4 классы | IB PYP
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
