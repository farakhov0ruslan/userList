# Список пользователей

React TypeScript приложение для работы с пользователями через REST API (jsonplaceholder.typicode.com).

## Реализованный функционал

### 1. Просмотр списка пользователей
- RTK Query GET endpoint
- Отображение name + email
- Файлы: `src/store/api.ts`, `src/components/UserList.tsx`

### 2. Добавление нового пользователя
- UI-форма для ввода данных
- RTK Query POST mutation
- Автоматическое обновление списка после создания
- Файлы: `src/store/api.ts`, `src/components/UserForm.tsx`

### 3. Редактирование пользователя
- Форма редактирования в модальном окне
- RTK Query PUT mutation
- Файлы: `src/store/api.ts`, `src/components/EditUserForm.tsx`

### 4. Отмена запроса через Axios с AbortController
- Отдельная кнопка для GET запроса через Axios
- Кнопка "Отменить загрузку" во время выполнения запроса
- Файлы: `src/api/axios.ts`, `src/components/AxiosDemo.tsx`

### 5. Axios Interceptors
- Настроен baseURL: `https://jsonplaceholder.typicode.com`
- Добавлен фейковый токен: `Authorization: Bearer demo-token`
- Файл: `src/api/axios.ts`

## Дополнительная реализация (не по ТЗ)

1. **Оптимистичное обновление кеша**
   - Использование `onQueryStarted` в RTK Query для корректного отображения изменений
   - Причина: JSONPlaceholder не сохраняет данные, нужно обновлять кеш вручную
   - Файл: `src/store/api.ts`

2. **Задержка в Axios запросе**
   - Добавлена задержка 3 секунды для демонстрации возможности отмены
   - Задержка реагирует на AbortController
   - Файл: `src/components/AxiosDemo.tsx`

3. **Отображение результатов Axios**
   - Показ первых 5 загруженных пользователей
   - Файл: `src/components/AxiosDemo.tsx`

## Запуск проекта

```bash
npm install
npm run dev
```
