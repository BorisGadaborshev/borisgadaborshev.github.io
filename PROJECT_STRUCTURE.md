# Структура проекта Liv Pic

## 📁 Корневая директория

```
livpic/
├── public/                    # Статические файлы
│   └── images/               # Изображения (SVG, PNG)
├── src/                      # Исходный код
├── images/                   # Оригинальные изображения (backup)
├── node_modules/             # Зависимости (генерируется)
├── dist/                     # Production сборка (генерируется)
├── index.html               # Главный HTML
├── index-old.html           # Старая версия (backup)
├── package.json             # Зависимости проекта
├── tsconfig.json            # Конфигурация TypeScript
├── vite.config.ts           # Конфигурация Vite
├── .eslintrc.cjs            # Конфигурация ESLint
├── .gitignore               # Игнорируемые файлы
└── *.md                     # Документация
```

## 📂 Директория src/ (FSD архитектура)

### Слои (от верхнего к нижнему)

```
src/
├── app/                      # 🎯 Слой приложения
│   ├── providers/
│   │   ├── TelegramProvider.tsx    # Инициализация Telegram Web App
│   │   ├── GlobalStyles.tsx        # Глобальные стили
│   │   └── index.tsx              # Экспорт провайдеров
│   ├── App.tsx                    # Главный компонент
│   └── index.ts
│
├── pages/                    # 📄 Страницы (пока не используется)
│
├── widgets/                  # 🧩 Виджеты (крупные блоки)
│   └── main-screen/
│       ├── ui/
│       │   ├── MainScreen.tsx      # Главный компонент экрана
│       │   ├── Background.tsx      # Фон с эллипсами
│       │   ├── Header.tsx          # Шапка с меню
│       │   └── Content.tsx         # Контент (заголовки, текст)
│       └── index.ts
│
├── features/                 # ⚙️ Фичи (пока не используется)
│
├── entities/                 # 🎲 Бизнес-сущности
│   └── image-upload/
│       ├── model/
│       │   └── useImageUpload.ts   # Хук для загрузки изображений
│       ├── ui/
│       │   └── ImageUploadButton.tsx # Кнопка загрузки
│       └── index.ts
│
└── shared/                   # 🔧 Общий код
    ├── config/
    │   ├── theme.ts               # Тема (цвета, шрифты)
    │   └── index.ts
    ├── lib/
    │   ├── telegram.ts            # Утилиты Telegram API
    │   └── index.ts
    ├── types/
    │   ├── telegram.ts            # Типы Telegram Web App
    │   ├── index.ts
    │   └── ...                    # Другие типы
    └── ui/
        ├── Button/
        │   ├── Button.tsx         # Переиспользуемая кнопка
        │   └── index.ts
        ├── Icon/
        │   ├── Icon.tsx           # Компонент иконки
        │   └── index.ts
        └── index.ts
```

## 🎯 Принципы FSD

### Правило импортов
Каждый слой может импортировать только из нижележащих слоев:

```
app → widgets → features → entities → shared
```

❌ **Нельзя:**
```typescript
// widgets не может импортировать из app
import { App } from '@app';
```

✅ **Можно:**
```typescript
// widgets может импортировать из entities и shared
import { useImageUpload } from '@entities/image-upload';
import { Button } from '@shared/ui';
```

### Структура модуля

Каждый модуль следует структуре:

```
feature-name/
├── ui/              # UI компоненты
├── model/           # Бизнес-логика, хуки, стейт
├── api/             # API запросы
├── lib/             # Утилиты
├── config/          # Конфигурация
└── index.ts         # Public API (экспорты)
```

## 📝 Примеры использования

### Создание нового UI компонента

```typescript
// src/shared/ui/Card/Card.tsx
import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

const StyledCard = styled.div`
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
`;

export const Card: FC<CardProps> = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

// src/shared/ui/Card/index.ts
export { Card } from './Card';

// src/shared/ui/index.ts
export { Card } from './Card';
```

### Создание новой сущности

```typescript
// src/entities/user/model/useUser.ts
export const useUser = () => {
  // логика
};

// src/entities/user/ui/UserCard.tsx
export const UserCard: FC = () => {
  // UI
};

// src/entities/user/index.ts
export { useUser } from './model/useUser';
export { UserCard } from './ui/UserCard';
```

### Создание нового виджета

```typescript
// src/widgets/settings-panel/ui/SettingsPanel.tsx
import { useUser } from '@entities/user';
import { Button } from '@shared/ui';

export const SettingsPanel: FC = () => {
  const { user } = useUser();
  
  return (
    <div>
      <Button>Настройки</Button>
    </div>
  );
};

// src/widgets/settings-panel/index.ts
export { SettingsPanel } from './ui/SettingsPanel';
```

## 🔗 Алиасы импортов

Настроены в `tsconfig.json` и `vite.config.ts`:

```typescript
@app/*     → src/app/*
@pages/*   → src/pages/*
@widgets/* → src/widgets/*
@features/* → src/features/*
@entities/* → src/entities/*
@shared/*  → src/shared/*
```

## 📦 Зависимости

### Production
- `react` - UI библиотека
- `react-dom` - React для браузера
- `@emotion/react` - CSS-in-JS
- `@emotion/styled` - Styled components

### Development
- `typescript` - типизация
- `vite` - сборщик
- `@vitejs/plugin-react` - React плагин
- `eslint` - линтер
- `@emotion/babel-plugin` - оптимизация Emotion

## 🎨 Стилизация

### Emotion styled components

```typescript
import styled from '@emotion/styled';

const Button = styled.button`
  background: #2079cc;
  color: white;
  
  &:hover {
    opacity: 0.8;
  }
`;
```

### Динамические стили

```typescript
const Button = styled.button<{ primary?: boolean }>`
  background: ${props => props.primary ? '#2079cc' : '#ccc'};
`;

<Button primary>Главная кнопка</Button>
```

### Использование темы

```typescript
import { theme } from '@shared/config';

const Button = styled.button`
  background: ${theme.colors.primary};
  font-family: ${theme.fonts.primary};
`;
```

## 🚀 Команды разработки

```bash
npm run dev      # Запуск dev-сервера
npm run build    # Сборка production
npm run preview  # Просмотр сборки
npm run lint     # Проверка кода
```

## 📚 Дополнительная документация

- [QUICKSTART.md](QUICKSTART.md) - быстрый старт
- [INSTALLATION.md](INSTALLATION.md) - установка
- [MIGRATION.md](MIGRATION.md) - миграция с Vanilla JS
- [README.md](README.md) - общая информация

## 🎓 Полезные ссылки

- [FSD Документация](https://feature-sliced.design/)
- [React Документация](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Emotion Docs](https://emotion.sh/docs/introduction)
- [Vite Guide](https://vitejs.dev/guide/)
