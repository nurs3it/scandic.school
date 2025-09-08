"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { 
  submitContactForm, 
  submitApplicationForm, 
  subscribeToNewsletter,
  type ContactFormData,
  type ApplicationFormData 
} from "./actions";

// Contact form mutation
export function useContactForm() {
  return useMutation({
    mutationFn: submitContactForm,
    onSuccess: (data) => {
      if (data.success) {
        // You can add toast notification here
        console.log("Contact form submitted successfully");
      }
    },
    onError: (error) => {
      console.error("Contact form error:", error);
    },
  });
}

// Application form mutation
export function useApplicationForm() {
  return useMutation({
    mutationFn: submitApplicationForm,
    onSuccess: (data) => {
      if (data.success) {
        // You can add toast notification here
        console.log("Application form submitted successfully");
      }
    },
    onError: (error) => {
      console.error("Application form error:", error);
    },
  });
}

// Newsletter subscription mutation
export function useNewsletterSubscription() {
  return useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: (data) => {
      if (data.success) {
        // You can add toast notification here
        console.log("Newsletter subscription successful");
      }
    },
    onError: (error) => {
      console.error("Newsletter subscription error:", error);
    },
  });
}

// Mock data queries (replace with actual API calls)
export function useSchoolInfo() {
  return useQuery({
    queryKey: ["school-info"],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      return {
        name: "Scandic International School",
        license: "KZ96LAA00035527",
        grades: "0–4 классы",
        program: "IB PYP",
        address: "ул. Кайрата Жумагалиева 18, 3 этаж",
        phone: "8 706 610 57 81",
        email: "info@scandic.school",
        instagram: "https://www.instagram.com/scandic.school/",
        mission: "Предоставить высочайший уровень образования для детей разных стран, национальностей и культурных традиций",
        values: [
          "Уважение к себе, другим и окружающему миру",
          "Стремление к успеху и совершенству",
          "Создание атмосферы заботы и взаимопонимания",
          "Развитие креативности и уверенности в себе"
        ],
        stats: {
          students: 150,
          nationalities: 25,
          teacherRatio: "1:8",
          greenSpace: "5000 m²"
        }
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePrograms() {
  return useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      return [
        {
          id: "early-years",
          title: "Early Years (0-1 классы)",
          description: "Программа раннего развития для детей 3-6 лет",
          language: "Казахский язык",
          features: [
            "Игровое обучение",
            "Развитие социальных навыков",
            "Подготовка к школе",
            "Творческое развитие"
          ]
        },
        {
          id: "primary",
          title: "Primary School (1-4 классы)",
          description: "Начальная школа с программой IB PYP",
          language: "Русский язык",
          features: [
            "Международная программа IB PYP",
            "Изучение английского языка",
            "Развитие критического мышления",
            "Проектная деятельность"
          ]
        }
      ];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
