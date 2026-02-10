# Liv Pic - Telegram Mini App

Приложение для создания живых портретов из статических изображений.

## Технологии

- **React 18** - UI библиотека
- **TypeScript** - типизация
- **Emotion (CSS-in-JS)** - стилизация компонентов
- **Vite** - сборщик и dev-сервер
- **FSD Architecture** - архитектура проекта

## Структура проекта (FSD)

```
src/
├── app/              # Инициализация приложения
│   ├── providers/    # Провайдеры (Telegram, стили)
│   └── App.tsx       # Корневой компонент
├── pages/            # Страницы приложения (пока не используется)
├── widgets/          # Крупные самодостаточные блоки
│   └── main-screen/  # Главный экран приложения
├── features/         # Части функциональности (пока не используется)
├── entities/         # Бизнес-сущности
│   └── image-upload/ # Загрузка изображений
└── shared/           # Переиспользуемый код
    ├── config/       # Конфигурация (темы)
    ├── lib/          # Утилиты (Telegram API)
    ├── types/        # TypeScript типы
    └── ui/           # UI компоненты
```

## Установка

```bash
# Установка зависимостей
npm install

# Копирование изображений в public
cp -r images public/
```

## Запуск

```bash
# Режим разработки
npm run dev

# Сборка для production
npm run build

# Предпросмотр production сборки
npm run preview
```

## Разработка

### Добавление новых компонентов

1. **Shared UI компоненты** - в `src/shared/ui/`
2. **Бизнес-сущности** - в `src/entities/`
3. **Виджеты** - в `src/widgets/`
4. **Страницы** - в `src/pages/`

### Стилизация

Используется Emotion (CSS-in-JS):

```tsx
import styled from '@emotion/styled';

const Button = styled.button`
  background: #2079cc;
  color: white;
`;
```

## Telegram Mini App

Приложение использует Telegram Web App API:
- Автоматическая инициализация при запуске
- Настройка цветовой схемы
- Работа с файлами через input

## Production

Для деплоя:

```bash
npm run build
```

Результат сборки будет в папке `dist/`.

## Структура слоёв FSD

- **app** - настройки приложения, провайдеры
- **pages** - страницы приложения
- **widgets** - крупные независимые блоки
- **features** - части бизнес-логики
- **entities** - бизнес-сущности
- **shared** - переиспользуемый код

Каждый слой импортирует только нижележащие слои.
