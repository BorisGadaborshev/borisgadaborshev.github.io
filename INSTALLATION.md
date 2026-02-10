# Инструкция по установке и запуску

## Требования

- Node.js версии 18 или выше
- npm или yarn

## Установка

### 1. Установите зависимости

```bash
npm install
```

Это установит все необходимые пакеты:
- React 18
- TypeScript
- Emotion (CSS-in-JS)
- Vite
- И другие зависимости

### 2. Проверьте структуру

Убедитесь, что файлы на месте:

```
livpic/
├── public/
│   └── images/          # ✓ Изображения должны быть здесь
├── src/                 # ✓ Исходный код
├── index.html           # ✓ Главный HTML файл
└── package.json         # ✓ Зависимости
```

## Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

### Что происходит при запуске:
1. Vite запускает dev-сервер
2. Включается hot-reload (изменения применяются мгновенно)
3. TypeScript проверяет типы
4. React компоненты рендерятся

## Сборка для production

```bash
npm run build
```

Результат сборки будет в папке `dist/`.

### Что происходит при сборке:
1. TypeScript компилирует код
2. Vite оптимизирует бандл
3. Минификация и tree-shaking
4. Создается production-ready версия

## Предпросмотр production сборки

```bash
npm run preview
```

Откроется локальный сервер с production сборкой.

## Возможные проблемы

### 1. Ошибка "Cannot find module"

**Решение:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### 2. Изображения не загружаются

**Проверьте:**
- Файлы находятся в `public/images/`
- Пути в коде: `/images/имя-файла.svg`

**Решение:**
```bash
cp images/*.svg images/*.png public/images/
```

### 3. TypeScript ошибки

**Проверьте:**
- `tsconfig.json` на месте
- Установлены все типы: `@types/react`, `@types/node`

**Решение:**
```bash
npm install --save-dev @types/react @types/react-dom @types/node
```

### 4. Порт 3000 занят

Vite автоматически выберет другой порт (3001, 3002, и т.д.)

Или явно укажите порт:
```bash
npm run dev -- --port 4000
```

## Деплой в Telegram Mini Apps

### 1. Соберите проект

```bash
npm run build
```

### 2. Загрузите содержимое `dist/` на хостинг

Можно использовать:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

### 3. Настройте Telegram Bot

1. Создайте бота через @BotFather
2. Создайте Web App: `/newapp`
3. Укажите URL вашего хостинга

## Команды

| Команда | Описание |
|---------|----------|
| `npm install` | Установка зависимостей |
| `npm run dev` | Запуск dev-сервера |
| `npm run build` | Сборка для production |
| `npm run preview` | Просмотр production сборки |
| `npm run lint` | Проверка кода ESLint |

## Структура после установки

```
node_modules/         # Зависимости (не коммитить)
dist/                 # Production сборка (не коммитить)
public/               # Статические файлы
src/                  # Исходный код
├── app/              # Слой приложения
├── widgets/          # Виджеты
├── entities/         # Бизнес-сущности
└── shared/           # Общий код
```

## Дополнительно

### Изменение порта

В `vite.config.ts`:

```typescript
server: {
  port: 4000, // Ваш порт
}
```

### Настройка путей

Алиасы уже настроены в `tsconfig.json` и `vite.config.ts`:

```typescript
import { Button } from '@shared/ui';
import { MainScreen } from '@widgets/main-screen';
```

### Hot Reload

При сохранении файлов изменения применяются автоматически без перезагрузки страницы (React Fast Refresh).

## Поддержка

Если возникли проблемы:
1. Проверьте версию Node.js: `node --version` (должна быть >= 18)
2. Очистите кеш: `rm -rf node_modules package-lock.json && npm install`
3. Проверьте логи в консоли браузера (F12)
4. Проверьте терминал на наличие ошибок TypeScript
