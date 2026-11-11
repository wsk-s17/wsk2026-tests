# SSR тесты (Cypress)

Проверяют страницы демо-проекта [server-side](../../server-side): вход, выход,
создание и удаление заметок.

## Запуск

Сначала запустите server-side (http://localhost:8000).

```bash
npm install
npm test          # все тесты в терминале
npm run open      # окно Cypress, тесты по одному
```

Другой адрес:

```bash
BASE_URL=http://localhost:8080 npm test
```

В PowerShell: `$env:BASE_URL="http://localhost:8080"; npm test`

## Что ищут тесты

Тесты используют только адреса `/login`, `/notes`, `/notes/new` и пользователя
`demo@test.wsk` / `demopass`.

Ошибка поля выводится в элементе `<data-cy поля>-error`, например
`note-form-title-error`.

| Атрибут            | Элемент                           |
| ------------------ | --------------------------------- |
| `nav-logout`       | Кнопка выхода                     |
| `alert-success`    | Сообщение об успехе               |
| `alert-error`      | Сообщение об отказе               |
| `login-email`      | Поле email                        |
| `login-password`   | Поле пароля                       |
| `login-submit`     | Кнопка входа                      |
| `notes-count`      | Количество заметок (только число) |
| `note-card`        | Карточка заметки                  |
| `note-title`       | Заголовок заметки                 |
| `note-body`        | Текст заметки                     |
| `note-delete`      | Кнопка удаления                   |
| `note-form-title`  | Поле заголовка                    |
| `note-form-body`   | Поле текста                       |
| `note-form-submit` | Кнопка сохранения                 |

## Если тест упал

- Скриншот момента падения - в `cypress/screenshots`.
- В `npm run open` можно кликнуть по шагу и увидеть страницу в этот момент.
