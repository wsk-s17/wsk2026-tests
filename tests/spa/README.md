# SPA тесты (Cypress)

Проверяют демо-проект [client-side](../../client-side): список, поиск,
избранное, страница 404.

## Запуск

Сначала запустите client-side (http://localhost:5173).

```bash
npm install
npm test          # все тесты в терминале
npm run open      # окно Cypress, тесты по одному
```

Другой адрес:

```bash
BASE_URL=http://localhost:3000 npm test
```

В PowerShell: `$env:BASE_URL="http://localhost:3000"; npm test`

## Особенности

- Тесты берут данные из `cypress/fixtures/data.json` - это копия `src/data.json`
  проекта.
- Перед каждым тестом очищается `localStorage`.
- Страницы открываются через интерфейс (клики), поэтому адреса могут быть
  любыми. Прямая ссылка на термин тоже должна работать.
- Поиск отправляется клавишей Enter.

## Что ищут тесты

| Атрибут                 | Элемент                                        |
| ----------------------- | ---------------------------------------------- |
| `nav-home`              | Ссылка на список                               |
| `nav-favorites`         | Ссылка на избранное                            |
| `favorites-count`       | Количество в избранном (только число)          |
| `search-input`          | Поле поиска                                    |
| `term-card`             | Карточка термина в списке                      |
| `term-name`             | Название в карточке                            |
| `term-category`         | Категория в карточке                           |
| `term-open`             | Ссылка на страницу термина                     |
| `term-title`            | Название на странице термина                   |
| `term-definition`       | Определение                                    |
| `favorite-toggle`       | Кнопка избранного, `aria-pressed="true/false"` |
| `search-result`         | Результат поиска                               |
| `search-result-excerpt` | Текст результата, найденное слово в `<mark>`   |
| `search-empty`          | Сообщение «ничего не найдено»                  |
| `favorite-item`         | Пункт в избранном                              |
| `favorites-empty`       | Пустое избранное                               |
| `not-found`             | Страница 404                                   |

## Если тест упал

- Скриншот момента падения - в `cypress/screenshots`.
- В `npm run open` можно кликнуть по шагу и увидеть страницу в этот момент.
