# Как получить красивый URL для портфолио

## Варианты красивых URL:

1. **Кастомный домен** (рекомендуется):
   - `aklima-baiguisova.com`
   - `aklima.com`
   - `aklimamorozova.com`
   - Или любой другой домен на ваш выбор

2. **Бесплатный поддомен Vercel**:
   - `your-project-name.vercel.app` (автоматически при деплое)

## Деплой на Vercel (самый простой способ):

1. **Установите Vercel CLI** (если еще не установлен):
   ```bash
   npm i -g vercel
   ```

2. **Залогиньтесь в Vercel**:
   ```bash
   vercel login
   ```

3. **Задеплойте проект**:
   ```bash
   vercel
   ```

4. **Добавьте кастомный домен**:
   - Зайдите на [vercel.com](https://vercel.com)
   - Откройте ваш проект
   - Перейдите в Settings → Domains
   - Добавьте ваш домен (например, `aklima-baiguisova.com`)
   - Следуйте инструкциям по настройке DNS

## Альтернатива: GitHub Pages

Если хотите использовать GitHub Pages, нужно:
1. Раскомментировать `basePath` в `next.config.js`
2. Настроить GitHub Actions для автоматического деплоя

## Где купить домен:

- [Namecheap](https://www.namecheap.com)
- [Google Domains](https://domains.google)
- [Cloudflare](https://www.cloudflare.com/products/registrar)

После покупки домена настройте DNS записи согласно инструкциям Vercel.

