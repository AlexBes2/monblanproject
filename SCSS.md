# SCSS Architecture

Полная документация по структуре и использованию SCSS стилей проекта.

## 📁 Файловая структура

```
src/scss/
├── _variables.scss    # Переменные (цвета, размеры, шрифты)
├── _mixins.scss       # Миксины (адаптивность, типография, утилиты)
├── _base.scss         # Базовые стили (reset, типография, формы)
├── _profile.scss      # Стили профиля, фильтра, волн
├── _posts.scss        # Стили постов, карточек, кнопок
└── main.scss          # Главный файл (импорты и глобальные стили)
```

## 🎨 Variables (\_variables.scss)

### Цвета

```scss
// Primary colors
$color-primary: #2d8659; // Зелёный
$color-primary-light: #e0f2f1; // Светлый зелёный
$color-primary-dark: #1b5e3f; // Тёмный зелёный

// Secondary colors
$color-secondary: #ff4081; // Розовый
$color-secondary-light: #ffb3d9; // Светлый розовый

// Text colors
$color-text: #333333; // Чёрный текст
$color-text-light: #666666; // Серый текст
$color-text-lighter: #999999; // Светлый серый

// Background colors
$color-bg: #ffffff; // Белый фон
$color-bg-light: #f5f5f5; // Светлый серый фон

// Border colors
$color-border: #e0e0e0; // Граница
$color-border-light: #f0f0f0; // Светлая граница
```

### Шрифты

```scss
$font-family-main: "Roboto", sans-serif; // Основной шрифт
$font-family-heading: "Montserrat", sans-serif; // Заголовки

$font-weight-regular: 400; // Обычный
$font-weight-medium: 500; // Средний
$font-weight-bold: 700; // Полужирный

// Размеры шрифтов
$font-size-h1: 28px; // Для h1
$font-size-h2: 24px; // Для h2
$font-size-h3: 20px; // Для h3
$font-size-body: 14px; // Основной текст
$font-size-small: 12px; // Мелкий текст
$font-size-xs: 11px; // Очень мелкий

// Интерлиньяж
$line-height-heading: 1.2; // Для заголовков
$line-height-body: 1.6; // Для основного текста
```

### Брейкпоинты (Breakpoints)

```scss
$breakpoint-xs: 320px; // Мобильные
$breakpoint-sm: 480px; // Мобильные (большие)
$breakpoint-md: 768px; // Планшеты
$breakpoint-lg: 1024px; // Десктопы
$breakpoint-xl: 1280px; // Большие десктопы
```

### Отступы (Spacing)

```scss
$spacing-xs: 4px; // Минимальный отступ
$spacing-sm: 8px; // Маленький
$spacing-md: 16px; // Средний
$spacing-lg: 24px; // Большой
$spacing-xl: 32px; // Очень большой
$spacing-xxl: 48px; // Максимальный
```

### Переходы и Тени

```scss
$transition-fast: 0.15s; // Быстрый переход
$transition-base: 0.3s; // Базовый переход
$transition-slow: 0.5s; // Медленный переход
$transition-timing: ease-in-out; // Функция времени

$shadow-sm: 0 1px 3px rgba(...); // Маленькая тень
$shadow-md: 0 4px 6px rgba(...); // Средняя тень
$shadow-lg: 0 10px 20px rgba(...); // Большая тень
```

### Border Radius

```scss
$border-radius-sm: 4px; // Слегка закруглено
$border-radius-md: 8px; // Закруглено
$border-radius-lg: 12px; // Очень закруглено
$border-radius-xl: 16px; // Экстра закруглено
$border-radius-full: 50%; // Круг
```

## 🔧 Mixins (\_mixins.scss)

### Адаптивные миксины

```scss
// Использование
@include respond-to("md") {
  width: 100%;
}

// Доступные значения: xs, sm, md, lg, xl
```

### Типографические миксины

```scss
// Заголовки
@include heading-h1; // 28px, Montserrat, вес 500
@include heading-h2; // 24px, Roboto, вес 500
@include heading-h3; // 20px, Roboto, вес 500

// Текст
@include body-text; // 14px, Roboto, вес 400
@include small-text; // 12px, Roboto, вес 400, серый цвет
```

### Layout миксины

```scss
@include flex-center; // Flex центр по всем осям
@include flex-between; // Flex между (justify-content: space-between)
@include flex-column; // Flex в столбик
@include absolute-center; // Абсолютное позиционирование в центр
```

### Кнопочные миксины

```scss
@include button-base; // Базовые стили кнопки
@include hover-transition; // Переход при наведении
```

### Утилиты

```scss
@include box-shadow($shadow-md); // Добавить тень
@include truncate; // Обрезать текст (одна строка)
@include multiline-truncate(2); // Обрезать текст (2 строки)
@include clearfix; // Clearfix для float
```

## 📝 Base Styles (\_base.scss)

Базовые стили для всех элементов:

- **Reset CSS** - обнуление margin/padding для всех элементов
- **Типография** - стили для h1-h3, p, a
- **Кнопки** - базовые стили .btn и вариации
- **Формы** - стили для input, textarea, select
- **Списки** - обнуление list-style
- **Изображения** - max-width: 100%
- **Helpers** - утилиты (.container, .hidden, .sr-only)

## 🎭 Profile Styles (\_profile.scss)

### Компоненты

#### .profile-section

Основной контейнер с градиентным фоном

#### .profile-container

Flex контейнер для левой и правой части

#### .profile-left

Левая часть с логотипом (скрыта на мобильных)

#### .profile-logo

Круглый логотип с тенью

#### .profile-right

Правая часть с содержимым (профиль + посты)

#### .profile-header

Заголовок профиля с статистикой и фильтром

#### .profile-info

Информация профиля (имя, статус, статистика)

#### .profile-stats / .stat

Статистика профиля (посты, подписчики, подписки)

#### .filter-section

Фильтр по датам

#### .date-input

Input с календарём

#### .filter-clear

Кнопка очистки фильтра (розовая)

#### .view-toggle

Переключатель между сеткой и списком

#### .view-btn

Кнопка переключения вида

#### .wave-decoration

Волнистый фон слева и справа (используется clip-path)

### Адаптивность

```scss
@include respond-to("md") {
  // Больше отступов
}

@media (max-width: 1024px) {
  // Скрыть левую часть профиля
  .profile-left {
    display: none;
  }
}
```

## 📊 Posts Styles (\_posts.scss)

### Компоненты

#### .posts-container

Grid контейнер для постов

- **Grid**: 3 колонны на десктопе, 2 на планшете, 1 на мобильном
- **.list-view** - переключить на 1 колонну

#### .post-card

Карточка одного поста

- Flex колонка с тенью
- Hover эффект: поднятие и увеличение тени

#### .post-image

Изображение поста

- Высота: 280px на мобильном, 320px на десктопе
- Zoom эффект при hover

#### .post-info

Информация поста

- Flex колонка с пробелом
- Содержит заголовок, дату, описание, статистику

#### .post-title / .post-title-badge

Заголовок и бейдж "Image upload"

#### .post-date

Дата поста (серый текст)

#### .post-description

Описание поста (обрезается на 2 строки)

#### .post-meta / .post-stat

Метаинформация (лайки и комментарии)

#### .load-more-btn

Кнопка загрузки (розовая, с анимацией спиннера)

### Анимации

```scss
@keyframes spin { ... }           // Спиннер загрузки
@keyframes fadeIn { ... }         // Появление карточки поста
```

### Empty State

```scss
.empty-state { ... }              // Контейнер "нет постов"
.empty-state-icon { ... }         // Иконка (📭)
.empty-state-title { ... }        // Заголовок
.empty-state-text { ... }         // Описание
```

## 🚀 Компиляция

### Gulp командки

```bash
# Компилировать SCSS
npx gulp scss

# Выходные файлы
dist/css/main.css       # Неминифицированный
dist/css/main.min.css   # Минифицированный
```

### Автоматический префикс

Все вендорные префиксы добавляются автоматически через `gulp-autoprefixer`:

```scss
// Написали:
display: flex;

// Получили:
display: -webkit-flex;
display: -moz-flex;
display: flex;
```

## 📱 Media Queries паттерны

### Mobile First (рекомендуется)

```scss
.element {
  // Мобильные стили по умолчанию
  width: 100%;

  @include respond-to("md") {
    width: 50%;
  }

  @include respond-to("lg") {
    width: 25%;
  }
}
```

### Для специфичных случаев

```scss
@media (max-width: 480px) {
  // Только мобильные
}

@media (min-width: 768px) and (max-width: 1024px) {
  // Только планшеты
}
```

## 🎯 Лучшие практики

1. ✅ **Используй переменные** - избегай повтора значений
2. ✅ **Используй миксины** - для типографии, адаптивности
3. ✅ **BEM-методология** - .block\_\_element--modifier
4. ✅ **Вложенность** - максимум 3 уровня глубины
5. ✅ **Mobile First** - начни с мобильных, расширяй к десктопу
6. ✅ **Модульность** - разделяй по компонентам (\_profile, \_posts)
7. ✅ **Порядок импортов** - переменные → миксины → базовые → компоненты

## 🔄 Использование цветов

### Примеры в коде

```scss
// Основной зелёный
background-color: $color-primary;

// Светлый зелёный фон с тёмным текстом
background-color: $color-primary-light;
color: $color-primary-dark;

// Вторичный розовый для акцентов
border-color: $color-secondary;

// Серый текст
color: $color-text-light;
```

## 📚 Ссылки на компоненты

- Profile: смотри `_profile.scss`
- Posts: смотри `_posts.scss`
- Typography: смотри `_base.scss`
- Layout: смотри `_mixins.scss`

## 🛠️ Кастомизация

### Изменить основной цвет

```scss
// В _variables.scss
$color-primary: #новый_цвет;
// Все будет обновлено автоматически
```

### Изменить шрифт

```scss
// В _variables.scss
$font-family-main: "Новый шрифт", sans-serif;
```

### Добавить новый брейкпоинт

```scss
// В _variables.scss
$breakpoint-custom: 600px;

// В _mixins.scss добавить:
@else if $breakpoint == "custom" {
  @media (min-width: $breakpoint-custom) {
    @content;
  }
}
```

---

**Автоматизация:** Все файлы автоматически перекомпилируются при сохранении (если запущен `npm start`)
