# server-side

Демо-проект на Laravel 12: заметки. Есть SSR-страницы (Blade) и REST API. База - SQLite.

## Запуск

Нужен PHP 8.4+.

```bash
php artisan migrate:fresh --seed
php artisan serve
```

Адрес: http://localhost:8000

Пользователь: `demo@test.wsk` / `demopass`

## Страницы

| Адрес        | Что там              |
| ------------ | -------------------- |
| `/login`     | Вход                 |
| `/notes`     | Список своих заметок |
| `/notes/new` | Создание заметки     |

## API

| Метод    | Адрес             | Ответ                             |
| -------- | ----------------- | --------------------------------- |
| `POST`   | `/api/login`      | `200 {token, user}`, `401`, `400` |
| `GET`    | `/api/notes`      | `200 [note]`                      |
| `POST`   | `/api/notes`      | `201 note`, `400`                 |
| `GET`    | `/api/notes/{id}` | `200 note`, `404`                 |
| `DELETE` | `/api/notes/{id}` | `204`, `404`                      |

Все запросы кроме `/api/login` - с заголовком `Authorization: Bearer <token>`, без него `401`.

Ошибка валидации:

```json
{ "message": "Validation failed", "errors": { "title": "required" } }
```
