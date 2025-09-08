# Scandic International School Website

Современный сайт-визитка для международной школы Scandic International School, построенный с использованием Next.js 15, TypeScript, Tailwind CSS и Shadcn UI.

## 🚀 Технологии

- **Next.js 15** - React фреймворк с App Router
- **TypeScript** - Статическая типизация
- **Turbopack** - Быстрая сборка и разработка
- **Tailwind CSS** - Утилитарный CSS фреймворк
- **Shadcn UI** - Компоненты на основе Radix UI
- **TanStack Query** - Управление состоянием и кэширование
- **Framer Motion** - Анимации и переходы
- **Server Actions** - Серверные действия Next.js

## 🎨 Дизайн

- **Цветовая палитра:**
  - Primary: #ffb400 (Scandic Yellow)
  - Secondary: #153b24 (Scandic Green)
  - Accent: #ff6b35 (Orange)
- **Шрифт:** Montserrat
- **Адаптивный дизайн** для всех устройств
- **Анимации** с использованием Framer Motion

## 📱 Страницы

- **Главная** (`/`) - Hero секция, особенности, программы, CTA
- **О нас** (`/about`) - Миссия, ценности, статистика
- **Контакты** (`/contact`) - Контактная информация и форма обратной связи
- **Заявка** (`/application`) - Форма подачи заявки на поступление

## 🛠 Установка и запуск

1. **Клонирование репозитория:**
```bash
git clone <repository-url>
cd scandic-school
```

2. **Установка зависимостей:**
```bash
npm install
```

3. **Запуск в режиме разработки:**
```bash
npm run dev
```

4. **Сборка для продакшена:**
```bash
npm run build
```

5. **Запуск продакшен версии:**
```bash
npm start
```

## 📁 Структура проекта

```
src/
├── app/                    # App Router страницы
│   ├── about/             # Страница "О нас"
│   ├── contact/           # Страница "Контакты"
│   ├── application/       # Страница "Заявка"
│   ├── globals.css        # Глобальные стили
│   ├── layout.tsx         # Корневой layout
│   ├── page.tsx           # Главная страница
│   ├── loading.tsx        # Компонент загрузки
│   ├── robots.ts          # Robots.txt
│   └── sitemap.ts         # Sitemap.xml
├── components/            # React компоненты
│   ├── ui/               # Shadcn UI компоненты
│   ├── animated-text.tsx # Анимированный текст
│   ├── contact-form.tsx  # Форма контактов
│   ├── footer.tsx        # Подвал сайта
│   ├── glow-button.tsx   # Кнопка с эффектом свечения
│   ├── header.tsx        # Шапка сайта
│   ├── hero-section.tsx  # Hero секция
│   └── ...               # Другие компоненты
└── lib/                  # Утилиты и сервисы
    ├── actions.ts        # Server Actions
    ├── hooks.ts          # TanStack Query хуки
    ├── query-client.tsx  # Query Client провайдер
    └── utils.ts          # Утилиты
```

## ⚡ Оптимизация производительности

- **Turbopack** для быстрой разработки
- **Автоматическая оптимизация изображений** с Next.js Image
- **Code splitting** и lazy loading
- **Кэширование** с TanStack Query
- **Compression** и оптимизированные заголовки
- **SEO оптимизация** с мета-тегами и sitemap

## 🎯 Особенности

- **Многоязычность** - Поддержка русского, казахского и английского языков
- **Адаптивный дизайн** - Отлично работает на всех устройствах
- **Анимации** - Плавные переходы и эффекты
- **Формы** - Интеграция с Server Actions
- **SEO** - Оптимизация для поисковых систем
- **Доступность** - Соответствие стандартам доступности

## 📞 Контакты

- **Адрес:** ул. Кайрата Жумагалиева 18, 3 этаж
- **Телефон:** 8 706 610 57 81
- **Email:** info@scandic.school
- **Instagram:** @scandic.school
- **Лицензия:** KZ96LAA00035527

## 📄 Лицензия

© 2024 Scandic International School. Все права защищены.

---

Создано с ❤️ для Scandic International School