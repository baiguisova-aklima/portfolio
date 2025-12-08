# Настройка DNS для aklima-baiguisova.com

## Требуемая DNS запись:

**A запись:**
- **Тип:** A
- **Имя/Хост:** @ (или оставьте пустым)
- **Значение/IP:** 216.198.79.1
- **TTL:** 3600 (или Auto)

## Инструкции для популярных регистраторов:

### Namecheap
1. Войдите в аккаунт на namecheap.com
2. Перейдите в Domain List → выберите `aklima-baiguisova.com`
3. Нажмите "Manage" → "Advanced DNS"
4. В разделе "Host Records" нажмите "Add New Record"
5. Выберите тип "A Record"
6. Host: `@` (или оставьте пустым)
7. Value: `216.198.79.1`
8. TTL: Automatic
9. Сохраните изменения

### GoDaddy
1. Войдите в аккаунт на godaddy.com
2. Перейдите в "My Products" → "DNS"
3. Найдите домен `aklima-baiguisova.com`
4. В разделе "Records" нажмите "Add"
5. Тип: A
6. Имя: @
7. Значение: 216.198.79.1
8. TTL: 1 hour
9. Сохраните

### Cloudflare
1. Войдите в Cloudflare
2. Выберите домен `aklima-baiguisova.com`
3. Перейдите в "DNS" → "Records"
4. Нажмите "Add record"
5. Тип: A
6. Имя: @
7. IPv4 address: 216.198.79.1
8. Proxy status: DNS only (серый облачко)
9. Сохраните

### Google Domains
1. Войдите в domains.google.com
2. Выберите домен `aklima-baiguisova.com`
3. Перейдите в "DNS"
4. В разделе "Custom resource records" нажмите "Add"
5. Имя хоста: @
6. Тип: A
7. Данные: 216.198.79.1
8. TTL: 3600
9. Сохраните

## После настройки:

1. **Подождите 5-60 минут** - DNS изменения могут занять время
2. Вернитесь в Vercel → Settings → Domains
3. Нажмите кнопку "Refresh" рядом с доменом
4. Статус должен измениться с "Invalid Configuration" на "Valid"

## Проверка DNS:

Можно проверить, применились ли изменения, выполнив в терминале:
```bash
dig aklima-baiguisova.com
```

Или используйте онлайн-инструменты:
- https://dnschecker.org
- https://www.whatsmydns.net

## Важно:

- Если у вас уже есть другие A записи для @, их нужно удалить или заменить
- Не добавляйте CNAME запись для @ вместе с A записью - это конфликт
- Если домен использует Cloudflare с проксированием (оранжевое облачко), убедитесь, что оно отключено для этой записи

