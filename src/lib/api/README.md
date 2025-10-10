# API Service Documentation

Удобный сервис для работы с бэкендом школы Scandic School.

## Структура

```text
src/lib/api/
├── types.ts          # TypeScript типы для всех API моделей
├── client.ts         # Базовый API клиент
├── config.ts         # Конфигурация API
├── utils.ts          # Утилиты для валидации и обработки ошибок
├── actions.ts        # Server Actions для GET запросов
├── index.ts          # Главный экспорт
├── examples.ts       # Примеры использования
└── services/         # Сервисы для каждого эндпоинта
    ├── documents.ts
    ├── teachers.ts
    ├── reviews.ts
    └── school.ts
```

## Быстрый старт

### 1. Импорт

```typescript
import { 
  documentsService, 
  teachersService, 
  reviewsService, 
  schoolService,
  getDocuments,
  getTeachers,
  getReviews,
  getSchoolInfo
} from '@/lib/api';
```

### 2. Server Actions (для Server Components)

```typescript
// В Server Component
export default async function DocumentsPage() {
  const documentsResult = await getDocuments();
  
  if (!documentsResult.success) {
    return <div>Error: {documentsResult.error}</div>;
  }
  
  return (
    <div>
      {documentsResult.data?.map(doc => (
        <div key={doc.id}>{doc.title}</div>
      ))}
    </div>
  );
}
```

### 3. Client-side использование

```typescript
// В Client Component
'use client';

import { useEffect, useState } from 'react';
import { documentsService } from '@/lib/api';

export default function DocumentsList() {
  const [documents, setDocuments] = useState([]);
  
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await documentsService.getAll();
        setDocuments(docs);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchDocuments();
  }, []);
  
  return (
    <div>
      {documents.map(doc => (
        <div key={doc.id}>{doc.title}</div>
      ))}
    </div>
  );
}
```

## Доступные сервисы

### DocumentsService

```typescript
// Получение документов
const documents = await documentsService.getAll();
const document = await documentsService.getById(1);

// Создание документа
const newDoc = await documentsService.create({
  title: 'Новый документ',
  file: file,
  audience: 'ALL'
});

// Скачивание документа
await documentsService.download(1);

// Фильтрация
const publicDocs = documentsService.getPublicDocuments(documents);
const parentDocs = documentsService.getDocumentsByAudience(documents, 'Родители');
```

### TeachersService

```typescript
// Получение преподавателей
const teachers = await teachersService.getAll();
const teacher = await teachersService.getById(1);

// Поиск
const searchResults = teachersService.searchTeachers(teachers, 'математика');
const mathTeachers = teachersService.getTeachersBySubject(teachers, 'математика');
const teachersWithPhotos = teachersService.getTeachersWithPhotos(teachers);
```

### ReviewsService

```typescript
// Получение отзывов
const reviews = await reviewsService.getAll();

// Статистика
const averageRating = reviewsService.getAverageRating(reviews);
const ratingDistribution = reviewsService.getRatingDistribution(reviews);
const recentReviews = reviewsService.getRecentReviews(reviews, 10);

// Фильтрация
const fiveStarReviews = reviewsService.getReviewsByRating(reviews, 5);
const namedReviews = reviewsService.getReviewsWithNames(reviews);
```

### SchoolService

```typescript
// Получение информации о школе
const schoolData = await schoolService.getAll();
const schoolInfo = schoolService.getSchoolInfo(schoolData);
const contactInfo = schoolService.getContactInfo(schoolInfo);
```

## Server Actions

Все Server Actions возвращают объект с полями `success`, `data` и `error`:

```typescript
// Документы
const result = await getDocuments();
const publicDocs = await getPublicDocuments();
const document = await getDocumentById(1);

// Преподаватели
const teachers = await getTeachers();
const teacher = await getTeacherById(1);
const teachersWithPhotos = await getTeachersWithPhotos();

// Отзывы
const reviews = await getReviews();
const recentReviews = await getRecentReviews(10);
const stats = await getReviewsStats();

// Школа
const schoolInfo = await getSchoolInfo();
const contactInfo = await getContactInfo();
```

## Обработка ошибок

```typescript
import { ApiError, handleApiError } from '@/lib/api';

try {
  const documents = await documentsService.getAll();
} catch (error) {
  const apiError = handleApiError(error);
  console.error('API Error:', apiError.message);
  console.error('Status:', apiError.status);
}
```

## Конфигурация

Создайте файл `.env.local`:

```env
# Для клиентской части
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Для серверной части
API_BASE_URL=http://localhost:8000
```

## Утилиты

```typescript
import { 
  validateEmail, 
  validatePhone, 
  formatDate, 
  formatFileSize,
  isImageFile,
  retryWithBackoff 
} from '@/lib/api';

// Валидация
const isValidEmail = validateEmail('user@example.com');
const isValidPhone = validatePhone('+7 123 456 78 90');

// Форматирование
const formattedDate = formatDate('2024-01-15T10:30:00Z');
const fileSize = formatFileSize(1024000); // "1000 KB"

// Проверка файлов
const isImage = isImageFile('photo.jpg'); // true

// Повторные попытки
const data = await retryWithBackoff(() => documentsService.getAll());
```

## Примеры использования

Подробные примеры см. в файле `examples.ts`.

## Типы данных

Все типы экспортируются из `types.ts`:

- `Document` - документы
- `Teacher` - преподаватели  
- `Review` - отзывы
- `SchoolInfo` - информация о школе
- `AudienceEnum` - аудитория документов
- `RatingEnum` - оценки отзывов
- `ApiError` - ошибки API
