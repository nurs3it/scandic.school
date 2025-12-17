export interface MerchItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[]; // Дополнительные изображения для детальной страницы
  category?: string;
  inStock: boolean;
  sizes?: string[]; // Размеры, если применимо
  colors?: string[]; // Цвета, если применимо
}

export interface CartItem {
  item: MerchItem;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface OrderFormData {
  parentName: string;
  childrenNames: string; // ФИО детей (может быть несколько через запятую)
  phone: string;
  items: CartItem[];
  total: number;
}

