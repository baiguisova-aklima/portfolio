# ALEKSEI: LEVEL 38

Короткая статическая Canvas-игра. Она живёт на существующем Next.js-маршруте `/fundraising-quick-wins-lab` и не использует сервер, базу данных, внешние API, музыку или чужие ассеты.

## Запустить локально

Из корня проекта:

```bash
npm install
npm run dev
```

Открыть `http://localhost:3000/fundraising-quick-wins-lab`.

## Где менять тексты

Все заголовки, реплики и финальное письмо находятся в `gameData.ts`.

## Где менять персонажей и графику

Пиксельные персонажи, цветок и локации рисуются собственными примитивами в `gameArt.ts`: `human`, `animal`, `flower`, `renderGame`. Анимации используют единый игровой таймер. Игровые действия находятся в `CouponExperience.tsx`. Дома возле красного мяча можно повторять бросок Дрейку; у дивана запускается сбор семьи перед поздравлением.

## Production build

```bash
npm run build
npm run start
```

## Что загружать на домен

Текущий проект рассчитан на Vercel/Next.js-хостинг: задеплойте весь репозиторий, build command — `npm run build`. URL останется `/fundraising-quick-wins-lab`.
