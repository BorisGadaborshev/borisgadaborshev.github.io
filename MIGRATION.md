# Миграция проекта на React + TypeScript + FSD

## Что изменилось

### Было (Vanilla JS)
- `index.html` - статический HTML
- `styles.css` - глобальные стили
- `script.js` - простой JavaScript
- Отсутствие типизации
- Нет модульности

### Стало (React + TypeScript + FSD)
- **React компоненты** - модульная структура
- **TypeScript** - полная типизация
- **Emotion (CSS-in-JS)** - стили в компонентах
- **FSD архитектура** - четкое разделение ответственности
- **Vite** - быстрая разработка и сборка

## Структура проекта

```
livpic/
├── public/
│   └── images/              # Статические изображения
├── src/
│   ├── app/                 # Слой приложения
│   │   ├── providers/       # Провайдеры (Telegram, стили)
│   │   ├── App.tsx          # Главный компонент
│   │   └── index.ts
│   ├── widgets/             # Виджеты
│   │   └── main-screen/     # Главный экран
│   │       ├── ui/
│   │       │   ├── Background.tsx
│   │       │   ├── Content.tsx
│   │       │   ├── Header.tsx
│   │       │   └── MainScreen.tsx
│   │       └── index.ts
│   ├── entities/            # Бизнес-сущности
│   │   └── image-upload/    # Загрузка изображений
│   │       ├── model/
│   │       │   └── useImageUpload.ts
│   │       ├── ui/
│   │       │   └── ImageUploadButton.tsx
│   │       └── index.ts
│   └── shared/              # Общий код
│       ├── config/          # Конфигурация
│       │   └── theme.ts
│       ├── lib/             # Утилиты
│       │   └── telegram.ts
│       ├── types/           # Типы
│       │   ├── telegram.ts
│       │   └── index.ts
│       └── ui/              # UI компоненты
│           ├── Button/
│           ├── Icon/
│           └── index.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Преимущества новой архитектуры

### 1. **Типизация (TypeScript)**
- Меньше ошибок на этапе разработки
- Автодополнение в IDE
- Легче рефакторинг

### 2. **Модульность (FSD)**
- Четкое разделение ответственности
- Легко масштабировать
- Переиспользуемые компоненты

### 3. **CSS-in-JS (Emotion)**
- Локальные стили компонентов
- Динамические стили на основе props
- Нет конфликтов имен классов
- TypeScript поддержка

### 4. **Производительность (Vite)**
- Мгновенный hot reload
- Быстрая сборка
- Оптимизация для production

## Как запустить

```bash
# 1. Установить зависимости
npm install

# 2. Запустить dev-сервер
npm run dev

# 3. Открыть http://localhost:3000
```

## Сравнение кода

### Было (Vanilla JS):
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const selectButton = document.getElementById('selectButton');
    selectButton.addEventListener('click', () => {
        fileInput.click();
    });
});
```

### Стало (React + TypeScript):
```typescript
export const ImageUploadButton: FC<ImageUploadButtonProps> = ({ 
  onImageSelect, 
  icon 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleClick = () => {
    inputRef.current?.click();
  };
  
  return (
    <Button onClick={handleClick}>
      <GalleryIcon src={icon} alt="Gallery" />
      <ButtonLabel>
        <LabelText>Выбрать изображение</LabelText>
      </ButtonLabel>
    </Button>
  );
};
```

## Старые файлы

Старые файлы сохранены с префиксом `-old`:
- `index-old.html`
- `styles.css` (можно удалить)
- `script.js` (можно удалить)

## Следующие шаги

1. Добавить обработку выбранного изображения
2. Создать API для обработки изображений
3. Добавить анимации и переходы
4. Реализовать историю загрузок
5. Добавить тесты

## Полезные ссылки

- [React документация](https://react.dev/)
- [TypeScript документация](https://www.typescriptlang.org/)
- [Emotion документация](https://emotion.sh/)
- [FSD методология](https://feature-sliced.design/)
- [Vite документация](https://vitejs.dev/)
