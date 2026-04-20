"use server";

import { revalidatePath } from "next/cache";
import type { OrderFormData } from "@/types/merch";

// Types for form data
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ApplicationFormData {
  parentName: string;
  grade: "0" | "1" | "2" | "3" | "4";
  language: "kazakh" | "russian";
  parentPhone: string;
}

// Contact form submission
export async function submitContactForm(formData: ContactFormData) {
  try {
    // Simulate API call - replace with actual implementation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    console.log("Contact form submitted:", formData);
    
    // Here you would typically:
    // 1. Send email notification
    // 2. Save to database
    // 3. Send confirmation to user
    
    return {
      success: true,
      message: "Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "Произошла ошибка при отправке сообщения. Попробуйте еще раз.",
    };
  }
}

// Application form submission
export async function submitApplicationForm(formData: ApplicationFormData) {
  try {
    // Simulate API call - replace with actual implementation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    console.log("Application form submitted:", formData);
    
    // Here you would typically:
    // 1. Send to Google Forms API
    // 2. Send email notification
    // 3. Save to database
    // 4. Send confirmation to user
    
    return {
      success: true,
      message: "Заявка успешно подана! Мы свяжемся с вами.",
    };
  } catch (error) {
    console.error("Application form error:", error);
    return {
      success: false,
      message: "Произошла ошибка при подаче заявки. Попробуйте еще раз.",
    };
  }
}

// Newsletter subscription
export async function subscribeToNewsletter(email: string) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    console.log("Newsletter subscription:", email);
    
    return {
      success: true,
      message: "Вы успешно подписались на рассылку!",
    };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return {
      success: false,
      message: "Произошла ошибка при подписке. Попробуйте еще раз.",
    };
  }
}

// Order form submission
export async function submitOrder(orderData: OrderFormData) {
  try {
    const apiUrl = process.env.NESTJS_API_URL || 'https://scandic-school-api.onrender.com';

    const payload = {
      parentName: orderData.parentName,
      childrenNames: orderData.childrenNames,
      phone: orderData.phone,
      total: orderData.total,
      items: orderData.items.map(item => ({
        name: item.item.name,
        price: item.item.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        image: item.item.image,
      })),
    };

    const res = await fetch(`${apiUrl}/merch-orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `HTTP ${res.status}`);
    }

    return {
      success: true,
      message: "Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время для подтверждения.",
    };
  } catch (error) {
    console.error("Order submission error:", error);
    return {
      success: false,
      message: "Произошла ошибка при оформлении заказа. Попробуйте еще раз.",
    };
  }
}

// Revalidate pages after form submissions
export async function revalidatePages() {
  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/application");
  revalidatePath("/merch");
}
