'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useCart } from '@/contexts/cart-context';
import { submitOrder } from '@/lib/actions';
import { formatPhoneNumber, extractPhoneNumber } from '@/lib/phone-mask';

const orderFormSchema = z.object({
  parentName: z.string().min(2, 'ФИО должно содержать минимум 2 символа'),
  childrenNames: z.string().min(2, 'Укажите ФИО детей'),
  phone: z.string()
    .min(1, 'Номер телефона обязателен')
    .refine((val) => {
      const digits = val.replace(/\D/g, '');
      return digits.length >= 10 && digits.length <= 11;
    }, 'Некорректный номер телефона. Используйте формат +7 (___) ___-__-__'),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

interface OrderFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function OrderFormDialog({ isOpen, onClose, onSuccess }: OrderFormDialogProps) {
  const { items, getTotalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      parentName: '',
      childrenNames: '',
      phone: '',
    },
  });

  const onSubmit = async (data: OrderFormValues) => {
    setIsSubmitting(true);
    try {
      // Извлекаем только цифры из отформатированного номера
      const phoneDigits = extractPhoneNumber(data.phone);
      
      const result = await submitOrder({
        parentName: data.parentName,
        childrenNames: data.childrenNames,
        phone: phoneDigits,
        items,
        total: getTotalPrice(),
      });

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          clearCart();
          form.reset();
          setIsSuccess(false);
          onSuccess();
        }, 2000);
      } else {
        alert(result.message || 'Произошла ошибка при отправке заказа');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Произошла ошибка при отправке заказа. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = getTotalPrice();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {isSuccess ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-8"
          >
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Заказ успешно оформлен!
            </h3>
            <p className="text-gray-600">
              Мы свяжемся с вами в ближайшее время для подтверждения заказа.
            </p>
          </motion.div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Оформление заказа
              </DialogTitle>
              <DialogDescription>
                Заполните форму, и мы свяжемся с вами для подтверждения заказа
              </DialogDescription>
            </DialogHeader>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Ваш заказ:</h4>
              <div className="space-y-2 mb-3">
                {items.map((cartItem) => (
                  <div key={`${cartItem.item.id}-${cartItem.selectedSize}-${cartItem.selectedColor}`} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {cartItem.item.name} × {cartItem.quantity}
                      {cartItem.selectedSize && ` (${cartItem.selectedSize})`}
                      {cartItem.selectedColor && ` - ${cartItem.selectedColor}`}
                    </span>
                    <span className="font-semibold">
                      {(cartItem.item.price * cartItem.quantity).toLocaleString('ru-RU')} ₸
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-3 border-t">
                <span className="font-bold text-lg">Итого:</span>
                <span className="text-2xl font-bold text-primary">
                  {totalPrice.toLocaleString('ru-RU')} ₸
                </span>
              </div>
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="parentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ФИО родителя (законного представителя) *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Иванов Иван Иванович"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="childrenNames"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ФИО детей *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Иванов Петр Иванович, Иванова Мария Ивановна"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-gray-500">
                        Если детей несколько, укажите через запятую
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Номер телефона для обратной связи *</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+7 (___) ___-__-__"
                          value={field.value}
                          onChange={(e) => {
                            const formatted = formatPhoneNumber(e.target.value);
                            field.onChange(formatted);
                          }}
                          onBlur={field.onBlur}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Отмена
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      'Оформить заказ'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

