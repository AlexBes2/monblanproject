# JavaScript Architecture

Полная документация по структуре и использованию JavaScript модулей проекта.

## 📋 Порядок загрузки модулей

Файлы загружаются в этом порядке (определено в gulpfile.js):

1. `constants.js` - Константы и конфигурация
2. `ui-utils.js` - Утилиты UI
3. `posts-manager.js` - Управление постами
4. `calendar-manager.js` - Управление календарём
5. `view-manager.js` - Управление видами
6. `app.js` - Инициализация приложения

Такой порядок гарантирует, что все зависимости будут доступны перед их использованием.

## 🔧 Модули

### constants.js

Глобальный объект `CONSTANTS` с конфигурацией приложения.

```javascript
CONSTANTS = {
  POSTS_PER_PAGE: 9,           // Постов на странице
  VIEW_MODES: { ... },         // Режимы просмотра
  STORAGE_KEYS: { ... },       // Ключи localStorage
  SELECTORS: { ... },          // CSS селекторы
  CLASSES: { ... },            // CSS классы
  MOCK_POSTS: [ ... ]          // Mock-данные постов
}
```

**Использование:**

```javascript
var postsPerPage = CONSTANTS.POSTS_PER_PAGE;
var selector = CONSTANTS.SELECTORS.POSTS_CONTAINER;
```

---

### ui-utils.js

Объект `UIUtils` с утилитами для работы с DOM.

#### Методы

**createPostCard(post)** - Создаёт карточку поста

```javascript
var card = UIUtils.createPostCard({
  id: 1,
  title: "Today",
  date: "2016-09-08",
  displayDate: "9-08-2016",
  image: "url...",
  likes: 128,
  comments: 31,
  description: "Text",
});
document.body.appendChild(card);
```

**createEmptyState()** - Создаёт состояние "нет постов"

```javascript
var empty = UIUtils.createEmptyState();
container.appendChild(empty);
```

**showLoadingState(button)** / **hideLoadingState(button)** - Состояния загрузки

```javascript
UIUtils.showLoadingState(loadBtn);
setTimeout(function () {
  UIUtils.hideLoadingState(loadBtn);
}, 1000);
```

**toggleElement(element, show)** - Показать/скрыть элемент

```javascript
UIUtils.toggleElement(element, true); // Показать
UIUtils.toggleElement(element, false); // Скрыть
```

**setActive(element)** / **removeActive(element)** / **removeActiveAll(elements)** - Управление классом `active`

```javascript
UIUtils.setActive(button);
UIUtils.removeActive(button);
UIUtils.removeActiveAll([btn1, btn2, btn3]);
```

---

### posts-manager.js

Класс `PostsManager` управляет постами.

#### Инициализация

```javascript
var manager = new PostsManager();
manager.init();
```

#### Методы

**filterByDate(date)** - Фильтровать посты по дате (YYYY-MM-DD)

```javascript
manager.filterByDate("2016-09-08");
manager.filterByDate(null); // Отменить фильтр
```

**clearFilter()** - Очистить фильтр

```javascript
manager.clearFilter();
```

**loadMore()** - Загрузить следующую страницу

```javascript
manager.loadMore();
```

**getFilteredPostsCount()** - Получить количество отфильтрованных постов

```javascript
var count = manager.getFilteredPostsCount();
```

**getDisplayedPostsCount()** - Получить количество отображённых постов

```javascript
var displayed = manager.getDisplayedPostsCount();
```

#### Свойства

```javascript
manager.allPosts; // Все посты
manager.filteredPosts; // Отфильтрованные посты
manager.displayedPosts; // Отображённые посты
manager.selectedDate; // Выбранная дата
manager.currentPage; // Текущая страница (0-based)
```

---

### calendar-manager.js

Класс `CalendarManager` управляет календарём (flatpickr).

#### Инициализация

```javascript
var calendarManager = new CalendarManager(postsManager);
calendarManager.init();
```

#### Методы

**getSelectedDate()** - Получить выбранную дату (YYYY-MM-DD)

```javascript
var date = calendarManager.getSelectedDate();
// Возвращает строку вроде '2016-09-08' или null
```

**clearFilter()** - Очистить выбор даты и фильтр

```javascript
calendarManager.clearFilter();
```

#### Свойства

```javascript
calendarManager.calendarInstance; // Экземпляр flatpickr
calendarManager.dateInput; // DOM input элемент
calendarManager.clearFilterBtn; // DOM кнопка очистки
```

---

### view-manager.js

Класс `ViewManager` управляет переключением между видами.

#### Инициализация

```javascript
var viewManager = new ViewManager();
viewManager.init();
```

#### Методы

**switchToGridView()** - Переключиться на сетку

```javascript
viewManager.switchToGridView();
```

**switchToListView()** - Переключиться на список

```javascript
viewManager.switchToListView();
```

**getCurrentView()** - Получить текущий вид

```javascript
var current = viewManager.getCurrentView();
// Возвращает 'grid' или 'list'
```

---

### app.js

Класс `Application` инициализирует всё приложение.

#### Структура

```javascript
var Application = function () {
  this.postsManager = new PostsManager();
  this.calendarManager = new CalendarManager(this.postsManager);
  this.viewManager = new ViewManager();
};

Application.prototype.init = function () {
  this.postsManager.init();
  this.calendarManager.init();
  this.viewManager.init();
};
```

#### Автоматический запуск

```javascript
document.addEventListener("DOMContentLoaded", function () {
  var app = new Application();
  app.init();
});
```

## 🔄 Взаимодействие модулей

```
┌─────────────────────────────────────┐
│           app.js                    │
│      (инициализация)                │
└────────┬────────────────────────────┘
         │
    ┌────┴──────┬──────────┬──────────┐
    │            │          │          │
    ▼            ▼          ▼          ▼
┌────────┐  ┌────────┐  ┌──────────┐  ┌────────────┐
│ Posts  │  │Calendar│  │  View    │  │ UIUtils    │
│Manager │  │Manager │  │ Manager  │  │ (утилиты)  │
└────────┘  └────────┘  └──────────┘  └────────────┘
    │            │          │
    └────────────┴──────────┘
         │
         ▼
    ┌─────────────┐
    │ CONSTANTS   │
    │ (конфиг)    │
    └─────────────┘
```

## 💾 LocalStorage использование

Приложение сохраняет в localStorage:

```javascript
// Выбранная дата
localStorage.setItem("app-selected-date", "2016-09-08");

// Выбранный вид
localStorage.setItem("app-view-mode", "list");
```

При перезагрузке страницы эти значения восстанавливаются автоматически.

## 🎯 Типичный flow использования

### 1. Пользователь выбирает дату

```javascript
// Calendar Manager обрабатывает клик на календарь
calendarManager.onDateChange(["2016-09-09"]);

// PostsManager фильтрует посты
postsManager.filterByDate("2016-09-09");

// Посты перерисовываются
postsManager.renderPostsForCurrentPage();
```

### 2. Пользователь кликает "Load More"

```javascript
// PostsManager.loadMore() вызывается
postsManager.loadMore();

// Происходит:
postsManager.currentPage++;
postsManager.renderPostsForCurrentPage();
postsManager.updateLoadMoreButton();
```

### 3. Пользователь переключает вид

```javascript
// ViewManager обрабатывает клик
viewManager.switchToListView();

// DOM класс изменяется
container.classList.add("list-view");
```

## 🚀 Расширение функциональности

### Добавить новый посты

1. Обновить `CONSTANTS.MOCK_POSTS` или создать API запрос
2. В `PostsManager` изменить метод загрузки
3. Остальные модули работают автоматически

### Добавить фильтр

1. Создать новый класс Filter
2. Вызвать из `CalendarManager` или новой кнопки
3. Вызвать `postsManager.filterByDate()` с новыми параметрами

### Изменить UI

1. Обновить `UIUtils.createPostCard()` для новой структуры карточки
2. Обновить SCSS стили в `_posts.scss`
3. Готово - остальные модули не требуют изменений

## 📚 Лучшие практики

1. ✅ **Разделение ответственности** - каждый модуль отвечает за одно
2. ✅ **Использование констант** - избегаем magic strings/numbers
3. ✅ **Чистые функции** - максимум возвращают результат, минимум сайд-эффектов
4. ✅ **DOM API** - используем vanilla JS, без jQuery
5. ✅ **Событийная модель** - DOM события управляют логикой
6. ✅ **LocalStorage** - сохраняем состояние пользователя

## 🔗 Связанные файлы

- Селекторы: смотри `CONSTANTS.SELECTORS` в `constants.js`
- CSS классы: смотри `CONSTANTS.CLASSES` в `constants.js`
- HTML структура: смотри `src/index.html`
- Стили: смотри `src/scss/`
