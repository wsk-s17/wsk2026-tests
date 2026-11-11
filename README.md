# Примеры авто-тестов для WSK 2026

Тренировочный набор. Демо-проекты и тесты к ним устроены так же, как на
соревновании, но задание здесь другое.

## Состав

| Папка                      | Что это                      | Инструмент |
| -------------------------- | ---------------------------- | ---------- |
| [server-side](server-side) | Laravel: страницы и REST API | -          |
| [client-side](client-side) | React SPA                    | -          |
| [tests/ssr](tests/ssr)     | Тесты страниц server-side    | Cypress    |
| [tests/api](tests/api)     | Тесты API server-side        | Bruno      |
| [tests/spa](tests/spa)     | Тесты client-side            | Cypress    |

## Требования

- Node.js 20+
- PHP 8.4+ (для server-side)

## Порядок

1. Запустить проект (инструкция в его README).
2. В папке с тестами: `npm install`, затем `npm test`.

Тесты не запускают проект сами. Если проект не запущен - все тесты упадут.

## Cypress

```bash
npm test                                   # все тесты, без окна
npm run open                               # окно Cypress
npx cypress run --spec cypress/e2e/02-*    # один файл
npx cypress run --browser firefox          # в Firefox
```

Адрес проекта по умолчанию указан в `cypress.config.js`. Поменять без правки
файла:

```bash
BASE_URL=http://localhost:8080 npm test                 # bash
$env:BASE_URL="http://localhost:8080"; npm test         # PowerShell
```

Правила:

- Тесты ищут элементы только по атрибуту `data-cy`. Классы, id и тексты кнопок
  можно делать любыми.
- Ошибка поля формы - в элементе `<data-cy поля>-error`.
- Элементы-счётчики содержат только число.
- Тесты создают свои данные с уникальными именами, поэтому базу можно не очищать
  между запусками.
- Список нужных `data-cy` всегда есть в задании, таблицей.

## Bruno

```bash
npm test                                   # вся коллекция
npx bru run "02 Notes" --env Local         # одна папка
```

Коллекцию можно открыть в приложении Bruno: Open Collection -> папка
`tests/api`, окружение `Local`.

Ответы сравниваются с ожидаемыми символ в символ: код, структура JSON, текст
`message`.

## Частые проблемы

| Симптом                                     | Причина                                                  |
| ------------------------------------------- | -------------------------------------------------------- |
| `cy.visit() failed trying to load`          | Проект не запущен или другой порт - проверьте `BASE_URL` |
| `Expected to find element: [data-cy="..."]` | Нет атрибута на странице или опечатка в нём              |
| Bruno: `ECONNREFUSED`                       | API не запущен или неверный `baseUrl` в окружении        |
| `Cypress binary is missing`                 | Выполните `npx cypress install`                          |
