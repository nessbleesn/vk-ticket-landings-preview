# VK ticket landings

Два автономных статических лендинга для рекламного трафика из ВК:

- `family-ticket` — семейные билеты на 3 и 4 человек;
- `theme-locations` — билет на тематические локации.

## Временная публикация

- https://nessbleesn.github.io/vk-ticket-landings-preview/family-ticket/
- https://nessbleesn.github.io/vk-ticket-landings-preview/theme-locations/

## Локальный запуск

Запустите статический сервер из этой папки:

```powershell
python -m http.server 4173
```

Откройте:

- `http://127.0.0.1:4173/family-ticket/`
- `http://127.0.0.1:4173/theme-locations/`

## Аналитика

В каждом лендинге есть файл `tracking-config.js` с пустыми полями для VK Pixel и Яндекс Метрики. Пока ID не заданы, внешние счётчики не загружаются. CTA уже имеют отдельные имена целей, а UTM, `vk_click_id`, `yclid` и `gclid` переносятся в ссылку на оплату.

Перед публикацией повторно проверить цены, доступность товарных ссылок и актуальный состав включённых локаций.
