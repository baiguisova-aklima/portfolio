'use client';

import { CSSProperties, PointerEvent, useEffect, useRef, useState } from 'react';
import styles from './page.module.css';

const coupons = [
  { id: 12, image: '/Images/coupons/coupon-12.jpg', alt: 'Купон на прогулку с собаками' },
  { id: 1, image: '/Images/coupons/coupon-01.jpg', alt: 'Купон на массаж лица и спа-уход' },
  { id: 2, image: '/Images/coupons/coupon-02.jpg', alt: 'Купон на массаж пяточек' },
  { id: 3, image: '/Images/coupons/coupon-03.jpg', alt: 'Купон на массаж плеч' },
  { id: 5, image: '/Images/coupons/coupon-05.jpg', alt: 'Купон на любое блюдо на заказ' },
  { id: 6, image: '/Images/coupons/coupon-06.jpg', alt: 'Купон на три часа тишины' },
  { id: 7, image: '/Images/coupons/coupon-07.jpg', alt: 'Купон на романтичный пикник' },
  { id: 8, image: '/Images/coupons/coupon-08.jpg', alt: 'Купон на день комплиментов' },
  { id: 9, image: '/Images/coupons/coupon-09.jpg', alt: 'Купон на поездку за город' },
  { id: 10, image: '/Images/coupons/coupon-10.jpg', alt: 'Купон на целый день без моей вредной привычки' },
  { id: 11, image: '/Images/coupons/coupon-11.jpg', alt: 'Купон на совместный поход в компьютерный клуб' },
  { id: 13, image: '/photos/2026-07-14%2012.40.39.jpg', alt: 'Посмотреть наши фото' },
];

const photos = [
  { src: '/photos/2026-07-14%2012.40.00.jpg', alt: 'Мы вдвоём в кабинке подъёмника среди снежных гор' },
  { src: '/photos/2026-07-14%2012.40.21.jpg', alt: 'Мы с собакой на смотровой площадке в горах' },
  { src: '/photos/2026-07-14%2012.40.25.jpg', alt: 'Наше совместное селфи на пляже' },
  { src: '/photos/2026-07-14%2012.40.29.jpg', alt: 'Мы плаваем вместе в бирюзовом море' },
  { src: '/photos/2026-07-14%2012.40.33.jpg', alt: 'Мы вместе на фоне горного пейзажа' },
  { src: '/photos/2026-07-14%2012.40.36.jpg', alt: 'Счастливое селфи с кольцом' },
  { src: '/photos/2026-07-14%2012.40.39.jpg', alt: 'Нежный момент вдвоём в саду' },
];

const STORAGE_KEY = 'anniversary-coupons-used-v1';
const HISTORY_KEY = 'anniversary-coupons-history-v1';

type HistoryEntry = { id: number; usedAt: string };

function wrappedDistance(index: number, active: number) {
  const direct = index - active;
  const wrapped = direct > 0 ? direct - coupons.length : direct + coupons.length;
  return Math.abs(direct) <= Math.abs(wrapped) ? direct : wrapped;
}

export default function CouponExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [usedIds, setUsedIds] = useState<number[]>([]);
  const [couponHistory, setCouponHistory] = useState<HistoryEntry[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectionType, setSelectionType] = useState<'random' | 'manual' | null>(null);
  const [pendingAction, setPendingAction] = useState<'use' | 'reset' | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [confettiVisible, setConfettiVisible] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const spinTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (Array.isArray(saved)) {
        setUsedIds(saved.filter((id): id is number => Number.isInteger(id) && coupons.some((coupon) => coupon.id === id)));
      }
      const savedHistory = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
      if (Array.isArray(savedHistory)) {
        setCouponHistory(savedHistory.filter((entry): entry is HistoryEntry => (
          Number.isInteger(entry?.id) && coupons.some((coupon) => coupon.id === entry.id) && typeof entry?.usedAt === 'string'
        )));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(HISTORY_KEY);
    }
    return () => {
      if (spinTimer.current) clearTimeout(spinTimer.current);
      if (confettiTimer.current) clearTimeout(confettiTimer.current);
    };
  }, []);

  const allUsed = usedIds.length === coupons.length;
  const openGallery = () => {
    setGalleryIndex(0);
    setGalleryOpen(true);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setConfettiVisible(true);
    if (confettiTimer.current) clearTimeout(confettiTimer.current);
    confettiTimer.current = setTimeout(() => setConfettiVisible(false), 1900);
  };

  const moveGallery = (direction: number) => {
    setGalleryIndex((current) => (current + direction + photos.length) % photos.length);
  };

  const move = (direction: number) => {
    if (spinning) return;
    setSelectedId(null);
    setSelectionType(null);
    setActiveIndex((current) => (current + direction + coupons.length) % coupons.length);
  };

  const chooseRandom = () => {
    if (spinning || allUsed) return;
    const available = coupons.filter((coupon) => !usedIds.includes(coupon.id));
    const winner = available[Math.floor(Math.random() * available.length)];
    const targetIndex = coupons.findIndex((coupon) => coupon.id === winner.id);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setSelectedId(null);
    setSelectionType(null);
    if (reducedMotion) {
      setActiveIndex(targetIndex);
      setSelectedId(winner.id);
      setSelectionType('random');
      if (winner.id === 13) openGallery();
      return;
    }

    setSpinning(true);
    const startedAt = performance.now();
    const duration = 2400;

    const tick = () => {
      const progress = Math.min((performance.now() - startedAt) / duration, 1);
      if (progress >= 1) {
        setActiveIndex(targetIndex);
        setSpinning(false);
        setSelectedId(winner.id);
        setSelectionType('random');
        if (winner.id === 13) openGallery();
        return;
      }
      setActiveIndex((current) => (current + 1) % coupons.length);
      const delay = 55 + Math.pow(progress, 2.5) * 250;
      spinTimer.current = setTimeout(tick, delay);
    };

    tick();
  };

  const useCoupon = () => {
    if (!selectedId || usedIds.includes(selectedId) || spinning) return;
    setPendingAction('use');
  };

  const confirmUseCoupon = () => {
    if (!selectedId || usedIds.includes(selectedId)) {
      setPendingAction(null);
      return;
    }
    setUsedIds((current) => {
      if (current.includes(selectedId)) return current;
      const next = [...current, selectedId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    setCouponHistory((current) => {
      const next = [...current.filter((entry) => entry.id !== selectedId), { id: selectedId, usedAt: new Date().toISOString() }];
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      return next;
    });
    if (selectedId === 13) openGallery();
    setPendingAction(null);
    setSelectedId(null);
    setSelectionType(null);
  };

  const resetCoupons = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(HISTORY_KEY);
    setUsedIds([]);
    setCouponHistory([]);
    setSelectedId(null);
    setSelectionType(null);
    setActiveIndex(0);
    setPendingAction(null);
    setGalleryOpen(false);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (spinning) return;
    pointerStart.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null || spinning) return;
    const delta = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(delta) > 45) move(delta > 0 ? -1 : 1);
  };

  return (
    <main className={styles.page}>
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />
      <span className={`${styles.heart} ${styles.heartOne}`} aria-hidden="true">♥</span>
      <span className={`${styles.heart} ${styles.heartTwo}`} aria-hidden="true">♥</span>
      <span className={`${styles.heart} ${styles.heartThree}`} aria-hidden="true">♥</span>

      <section className={styles.hero} aria-labelledby="anniversary-title">
        <p className={styles.eyebrow}><span>три года вместе</span></p>
        <h1 id="anniversary-title">Лёша, с годовщиной! <span aria-hidden="true">❤️</span></h1>
        <div className={styles.message}>
          <p>Я невероятно люблю тебя и каждый наш день.</p>
          <p>В честь нашего трёхлетия я дарю тебе купоны. Можешь использовать их в любой последовательности, присылая мне картинку <span aria-hidden="true">🙂</span></p>
        </div>
        <div className={styles.flourish} aria-hidden="true"><span>♥</span></div>
      </section>

      <section
        className={styles.couponSection}
        aria-label="Карусель подарочных купонов"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
          if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
        }}
      >
        <div className={styles.counter} aria-live="polite">
          <span className={styles.counterHeart} aria-hidden="true">♥</span>
          Использовано: <strong>{usedIds.length} из {coupons.length}</strong>
        </div>

        <div className={`${styles.carouselFrame} ${spinning ? styles.isSpinning : ''}`}>
          <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => move(-1)} disabled={spinning} aria-label="Предыдущий купон">←</button>
          <div
            className={styles.carousel}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => { pointerStart.current = null; }}
          >
            <div className={styles.track} aria-live="polite" aria-atomic="true">
              {coupons.map((coupon, index) => {
                const distance = wrappedDistance(index, activeIndex);
                const isActive = distance === 0;
                const isUsed = usedIds.includes(coupon.id);
                const hidden = Math.abs(distance) > 2;
                return (
                  <button
                    type="button"
                    key={coupon.id}
                    className={`${styles.card} ${isActive ? styles.activeCard : ''} ${isUsed ? styles.usedCard : ''}`}
                    style={{ '--distance': distance, '--abs-distance': Math.abs(distance) } as CSSProperties}
                    aria-label={`${coupon.alt}${isUsed ? ', использован' : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                    aria-hidden={hidden}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => {
                      if (spinning) return;
                      if (!isActive) {
                        setSelectedId(null);
                        setSelectionType(null);
                        setActiveIndex(index);
                    } else if (!isUsed) {
                      setSelectedId(coupon.id);
                      setSelectionType('manual');
                      setPendingAction('use');
                    }
                  }}
                >
                  <img src={coupon.image} alt={coupon.alt} draggable="false" />
                  {coupon.id === 13 && (
                    <span className={styles.photoCouponLabel}><small>наш особенный купон</small>Посмотреть наши фото <span aria-hidden="true">♥</span></span>
                  )}
                  <span className={styles.cardNumber} aria-hidden="true">{String(coupon.id).padStart(2, '0')}</span>
                  {isActive && !isUsed && !spinning && (
                    <span className={styles.chooseBadge}>Использовать купон <span aria-hidden="true">♥</span></span>
                  )}
                    {isUsed && <span className={styles.usedBadge}>Использован <span aria-hidden="true">✓</span></span>}
                  </button>
                );
              })}
            </div>
          </div>
          <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => move(1)} disabled={spinning} aria-label="Следующий купон">→</button>
        </div>

        <div className={styles.dots} aria-hidden="true">
          {coupons.map((coupon, index) => <span key={coupon.id} className={index === activeIndex ? styles.activeDot : ''} />)}
        </div>

        <div className={styles.actions}>
          <button className={styles.randomButton} onClick={chooseRandom} disabled={spinning || allUsed}>
            {spinning ? 'Выбираю для нас…' : 'Выбрать случайный купон'}
            <span aria-hidden="true">✨</span>
          </button>

          {selectedId && selectionType === 'random' && !usedIds.includes(selectedId) && !spinning && (
            <div className={styles.result} role="status">
              <p><span aria-hidden="true">♥</span> {selectionType === 'random' ? 'Сегодня выпал этот купон!' : 'Отличный выбор!'}</p>
              <div className={styles.resultButtons}>
                {selectedId === 13 && <button onClick={openGallery}>Открыть фото снова</button>}
                <button onClick={useCoupon}>Использовать купон</button>
              </div>
            </div>
          )}

          {allUsed && (
            <p className={styles.completed} role="status">Все купоны использованы, но наши приключения только начинаются <span aria-hidden="true">❤️</span></p>
          )}

          {couponHistory.length > 0 && (
            <div className={styles.history}>
              <p className={styles.historyTitle}>Наша история купонов</p>
              <ol>
                {couponHistory.map((entry) => {
                  const coupon = coupons.find((item) => item.id === entry.id);
                  return (
                    <li key={`${entry.id}-${entry.usedAt}`}>
                      <span>{coupon?.alt.replace('Купон на ', '').replace('Купон ', '')}</span>
                      <time dateTime={entry.usedAt}>{new Date(entry.usedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </div>
      </section>

      <footer className={styles.footer}>С любовью <span aria-hidden="true">♥</span></footer>

      <button className={styles.secretReset} onClick={() => setPendingAction('reset')} aria-label="Начать сначала" />

      {confettiVisible && (
        <div className={styles.confetti} aria-hidden="true">
          {Array.from({ length: 42 }, (_, index) => (
            <span
              key={index}
              style={{
                '--x': `${(index * 37) % 100}vw`,
                '--delay': `${(index % 9) * 0.045}s`,
                '--drift': `${((index % 7) - 3) * 18}px`,
                '--color': ['#8b2635', '#d97983', '#efb85c', '#f4d3cf', '#ffffff'][index % 5],
              } as CSSProperties}
            />
          ))}
        </div>
      )}

      {galleryOpen && (
        <div
          className={styles.galleryBackdrop}
          role="presentation"
          onMouseDown={(event) => { if (event.target === event.currentTarget) setGalleryOpen(false); }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setGalleryOpen(false);
            if (event.key === 'ArrowLeft') moveGallery(-1);
            if (event.key === 'ArrowRight') moveGallery(1);
          }}
        >
          <div className={styles.gallery} role="dialog" aria-modal="true" aria-labelledby="gallery-title">
            <div className={styles.galleryHeader}>
              <div>
                <p>три года в кадрах</p>
                <h2 id="gallery-title">Наша маленькая история <span aria-hidden="true">♥</span></h2>
              </div>
              <button className={styles.galleryClose} onClick={() => setGalleryOpen(false)} aria-label="Закрыть фотографии" autoFocus>×</button>
            </div>
            <div className={styles.photoStage}>
              <button onClick={() => moveGallery(-1)} aria-label="Предыдущее фото">←</button>
              <img src={photos[galleryIndex].src} alt={photos[galleryIndex].alt} />
              <button onClick={() => moveGallery(1)} aria-label="Следующее фото">→</button>
              <span>{galleryIndex + 1} / {photos.length}</span>
            </div>
            <div className={styles.thumbnails} aria-label="Выбор фотографии">
              {photos.map((photo, index) => (
                <button
                  key={photo.src}
                  className={index === galleryIndex ? styles.activeThumbnail : ''}
                  onClick={() => setGalleryIndex(index)}
                  aria-label={`Открыть фото ${index + 1}`}
                  aria-current={index === galleryIndex ? 'true' : undefined}
                >
                  <img src={photo.src} alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {pendingAction && (
        <div
          className={styles.modalBackdrop}
          role="presentation"
          onMouseDown={(event) => { if (event.target === event.currentTarget) setPendingAction(null); }}
          onKeyDown={(event) => { if (event.key === 'Escape') setPendingAction(null); }}
        >
          <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="confirm-title">
            <span className={styles.modalHeart} aria-hidden="true">♥</span>
            <h2 id="confirm-title">{pendingAction === 'use' ? 'Точно использовать этот купон?' : 'Начать историю купонов сначала?'}</h2>
            <p>{pendingAction === 'use' ? 'После подтверждения купон будет отмечен как использованный.' : 'Все отметки и история выборов будут удалены.'}</p>
            <div className={styles.modalActions}>
              <button onClick={() => setPendingAction(null)} autoFocus>Отмена</button>
              <button className={styles.confirmButton} onClick={pendingAction === 'use' ? confirmUseCoupon : resetCoupons}>
                {pendingAction === 'use' ? 'Да, использовать' : 'Да, начать сначала'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
