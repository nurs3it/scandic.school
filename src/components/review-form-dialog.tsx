"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { reviewsService } from "@/lib/api/services";
import { RatingEnum } from "@/lib/api/types";

interface ReviewFormDialogProps {
  buttonText: string;
  locale: string;
}

export function ReviewFormDialog({ buttonText, locale }: ReviewFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: "",
    text: "",
  });

  const translations = {
    en: {
      title: "Share Your Review",
      description: "Tell us about your experience with Scandic School",
      nameLabel: "Your Name (Optional)",
      namePlaceholder: "John Smith",
      reviewLabel: "Your Review",
      reviewPlaceholder: "Share your experience...",
      ratingLabel: "Rating",
      cancel: "Cancel",
      submit: "Submit Review",
      success: "Thank you for your review!",
      error: "Failed to submit review. Please try again.",
    },
    ru: {
      title: "Поделиться отзывом",
      description: "Расскажите нам о вашем опыте с Scandic School",
      nameLabel: "Ваше имя (необязательно)",
      namePlaceholder: "Иван Петров",
      reviewLabel: "Ваш отзыв",
      reviewPlaceholder: "Поделитесь вашим опытом...",
      ratingLabel: "Оценка",
      cancel: "Отмена",
      submit: "Отправить отзыв",
      success: "Спасибо за ваш отзыв!",
      error: "Не удалось отправить отзыв. Попробуйте еще раз.",
    },
    kk: {
      title: "Пікір қалдыру",
      description: "Scandic School туралы тәжірибеңізбен бөлісіңіз",
      nameLabel: "Атыңыз (міндетті емес)",
      namePlaceholder: "Айгүл Нұрланова",
      reviewLabel: "Сіздің пікіріңіз",
      reviewPlaceholder: "Тәжірибеңізбен бөлісіңіз...",
      ratingLabel: "Баға",
      cancel: "Болдырмау",
      submit: "Пікір жіберу",
      success: "Пікіріңіз үшін рахмет!",
      error: "Пікір жіберу мүмкін болмады. Қайталап көріңіз.",
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.ru;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.text.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      await reviewsService.create({
        name: formData.name.trim() || undefined,
        text: formData.text.trim(),
        rating: rating as RatingEnum,
      });

      setFormData({ name: "", text: "" });
      setRating(5);
      setOpen(false);
      
      // Reload the page to show the new review
      window.location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-8 py-3 rounded-lg transition-colors duration-300">
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-secondary">{t.title}</DialogTitle>
            <DialogDescription>{t.description}</DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Name Field */}
            <div className="grid gap-2">
              <Label htmlFor="name">{t.nameLabel}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t.namePlaceholder}
                disabled={isLoading}
              />
            </div>

            {/* Rating Field */}
            <div className="grid gap-2">
              <Label>{t.ratingLabel}</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    disabled={isLoading}
                    className="transition-transform hover:scale-110 disabled:opacity-50"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoveredRating || rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Text Field */}
            <div className="grid gap-2">
              <Label htmlFor="review">{t.reviewLabel}</Label>
              <Textarea
                id="review"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                placeholder={t.reviewPlaceholder}
                rows={4}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              {t.cancel}
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !formData.text.trim()}
              className="bg-primary hover:bg-primary/90 text-secondary"
            >
              {isLoading ? "..." : t.submit}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

