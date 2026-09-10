export const GAME_TEXT = {
  title: 'ALEKSEI: LEVEL 38',
  subtitle: 'Based on a true story. Mostly.',
  intro: ['Ozersk. The story begins.', 'A player has entered the game.'],
  controls: 'WASD / стрелки — идти · Space / Enter — действие',
  scenes: [
    { label: 'MISSION 01', title: 'SURVIVE OZERSK', objective: 'Высыпь немного земли из цветка, пока уборщица не смотрит.' },
    { label: 'LEVEL 02', title: 'ПИТЕР', objective: 'Поздоровайся с Германом.' },
    { label: 'LEVEL 03', title: 'ТБИЛИСИ', objective: 'Подойди к Аклиме.' },
    { label: 'LEVEL 04', title: 'В ГОСТЯХ · ХИНКАЛИ', objective: 'Поздоровайся с гостями.' },
    { label: 'LEVEL 05 · DLC', title: 'THAILAND', objective: 'Садись на байк.' },
    { label: 'LEVEL 06', title: 'BARCELONA', objective: 'Победи взрослую жизнь.' },
    { label: 'LEVEL 07', title: 'THE HARD QUEST', objective: 'Поддержи Аклиму.' },
    { label: 'LEVEL 08', title: 'WEDDING', objective: 'Подойди к арке.' },
    { label: 'LEVEL 09', title: 'HOME BASE', objective: 'Осмотрись и садись рядом с Аклимой.' },
  ],
  finalStats: [
    '7 years survived at nuclear factory',
    'Several countries',
    'Thousands of commits',
    '3 guitars',
    '4 animals',
    '1 wife',
  ],
  letter: [
    'Лёша,',
    'я очень люблю жизнь, которую мы с тобой собрали.',
    'Из Озерска, завода, ночного кодинга, Питера и Тбилиси ты дошёл до Барселоны, нашей огромной стаи, гитар, путешествий и этого гигантского телевизора.',
    'Спасибо, что ты мой самый надёжный человек. Спасибо, что поддерживаешь меня даже тогда, когда у меня самой заканчиваются силы.',
    'Спасибо за нашу странную, смешную и очень красивую жизнь.',
    'С днём рождения. Я люблю тебя. ❤️',
  ],
} as const;

export const GUEST_TEXT = {
  names: { alex: 'АЛЕКС', natia: 'НАТИЯ', dad: 'ПАПА', mom: 'МАМА', aklima: 'АКЛИМА', aleksei: 'АЛЕКСЕЙ' },
  eating: 'Пробуем хинкали…',
  memoryTitle: 'ВОСПОМИНАНИЕ · ЗАВОД',
  shiftCountdown: 'ДО КОНЦА СМЕНЫ · 00:30',
  pillowMarks: ['СЛЕДЫ', 'ОТ ПОДУШКИ'],
  laughter: 'ХА!',
} as const;

export const OZERSK_TEXT = {
  escape: 'Алексей сам бежит в укрытие…',
  hiding: 'Тс-с… За шкафом не видно.',
  cover: 'УКРЫТИЕ',
} as const;

export const OBJECTIVES: readonly (readonly string[])[] = [
  ['Подойди к цветку справа. Высыпь землю, пока уборщица не смотрит — 0/3.', 'Высыпь землю, пока уборщица не смотрит — 1/3.', 'Высыпь землю ещё раз, пока уборщица не смотрит — 2/3.', 'Переверни горшок, пока уборщица не смотрит.', 'Подними и прочитай записку у горшка, пока уборщица не смотрит.', 'Подойди к компьютеру слева и начни кодить.', 'Подойди к двери EXIT справа и выйди с завода.'],
  ['Подойди к Герману справа и поговори с ним.', 'Подойди к компьютеру в центре и начни кодить.'],
  ['Подойди к Аклиме у балкона справа.', 'Подойди к миске слева от дивана и покорми Еву.', 'Подойди к Еве у дивана и погладь её.', 'Подойди к дивану — Ева готовит побег!', 'Подойди к Аклиме на балконе справа.'],
  ['Поздоровайся с гостями — Алекс слева у стола.', 'Попробуй хинкали — твоя тарелка в центре стола.', 'Поговори с папой — справа у стола.', 'Расскажи папе про завод.'],
  ['Подойди к красному мотоциклу слева и садись.', 'Доедь вправо до тарелки с креветками.'],
  ['Закрой четыре дела в тире.', 'Подойди к серой кошке Лее справа от бассейна.', 'Подойди к Дрейку, коричневому псу справа.', 'Подойди к бассейну слева и собери всех вместе.'],
  ['Подойди к Аклиме за ноутбуком справа и обними её.'],
  ['Подойди к Аклиме под свадебной аркой справа и скажи «да».'],
  ['Исследуй дом. Красный мяч справа — игра с Дрейком. Для финала сядь рядом с Аклимой на диван.'],
];

export const DIALOG = {
  fetch: ['Дрейк принёс мяч!', 'Ещё раз? Конечно, ещё раз.'],
  dirt: ['Ш-ш-ш… Земля на полу: +1', 'Уборщица ничего не заметила. Наверное.'],
  daysLater: ['Несколько дней спустя…'],
  note: ['ACHIEVEMENT UNLOCKED: FAFO'],
  noteMessage: 'ПОШЁЛ НАХУЙ',
  coding: ['Но по ночам Алексей качал другой skill tree.', 'HTML · CSS · JavaScript', '+1 Coding  ·  +1 Coding  ·  +1 Coding', '7 years later', 'QUIT JOB'],
  german: ['NEW PROFESSION: DEVELOPER', 'Герман: «Пойдём?»', 'Балкон. Облачко дыма. Обратно в офис.', 'Code. Deploy. Repeat.', '2022', 'Everything changed.'],
  meetAklima: ['NEW CHARACTER DISCOVERED: AKLIMA', 'Side quest unlocked: Take care of Eva.'],
  evaFood: ['Ева поела. Миска: чисто. Пол: почти чисто.'],
  evaPet: ['Ева поглажена.', 'DOG TRUST +100'],
  evaSave: ['Квартира спасена за 0.3 секунды до катастрофы.', 'Aklima has returned.'],
  kiss: ['Вечер. Балкон. Несколько бокалов спустя…', '💛', 'MAIN QUEST STARTED', 'ACHIEVEMENT UNLOCKED: FIRST KISS'],
  guests: ['Алекс: «Привет! Проходите к столу!»', 'Натия: «Хинкали уже готовы!»', 'Мама: «Садитесь, пока горячие».', 'Аклима: «Как же хорошо собраться вместе».'],
  khinkali: ['Алексей: «Вот это хинкали!»'],
  dad: ['Папа: «Расскажи про завод =)»'],
  factoryStory: ['Алексей: «Самое сложное на заводе — было вовремя проснуться».', 'Алексей: «За 30 минут до окончания рабочей смены».', 'Алексей: «Иначе на лице остаются следы от подушки».', 'Папа смеётся. За ним — весь стол.'],
  bike: ['One month later…', 'Алексей и Аклима едут к морю.', 'Ветер: 10/10 · Навигация: optimistic'],
  shrimp: ['Shrimp consumed.', 'Happiness +50', 'THAI DLC COMPLETED'],
  leiaJoin: ['LEIA joined the party.', 'Alignment: Unknown'],
  drakeJoin: ['DRAKE joined the party.', 'Special ability: Chaos', 'Party size increased.'],
  barcelona: ['Party relocated to Barcelona.', 'Sagrada Família → Santa Maria del Mar', 'Новый дом. Крыша. Бассейн. Всё серьёзно.'],
  rejections: ['Application sent.', 'Rejected.', 'Application sent.', 'Rejected.', 'We decided to move forward with another candidate…'],
  support: ['Алексей обнимает Аклиму.', 'Support given.', 'Sometimes the strongest character is the one who stays next to you.', 'Aleksei +1000'],
  wedding: ['I DO', '✨  ✦  ✨  ✦  ✨', 'ACHIEVEMENT UNLOCKED:', 'CO-OP MODE: PERMANENT'],
  tv: ['GTA VI · CO-OP NIGHT', 'Все в сборе. Можно включать.'],
  console: ['Press X to ignore responsibilities.'],
  guitar1: ['Guitar.'],
  guitar2: ['Another guitar.'],
  guitar3: ['This one was absolutely necessary.'],
  eva: ['Eva', 'Class: Toy Poodle', 'Special ability: Being Eva'],
  drake: ['Drake', 'Class: Maltipoo', 'Special ability: Chaos'],
  leia: ['Leia', 'Class: Cat', 'Alignment: Unknown'],
  osiris: ['Osiris', 'Class: Orange Cat', 'Veteran'],
} as const;

export const CHALLENGES = {
  cleaner: { scene: 0, title: 'НЕ ПОПАДИСЬ УБОРЩИЦЕ', short: 'Озерск', instruction: 'Три попытки. Подойди к цветку и действуй, пока уборщица отвернулась.', controls: 'Стрелки — идти · Space / A — высыпать землю', success: 'ТРИ ИЗ ТРЁХ. ОНА НЕ В ВОСТОРГЕ.', failure: '' },
  chase: { scene: 2, title: 'СПАСИ ДИВАН', short: 'Погоня за Евой', instruction: 'Ева бежит к дивану! Догони её до того, как она успеет.', controls: 'Стрелки — бежать · лови Еву касанием', success: 'ДИВАН СПАСЁН!', failure: 'ДИВАН НЕ УСПЕЛ СПАСТИСЬ…' },
  ride: { scene: 4, title: 'К МОРЮ ЗА КРЕВЕТКАМИ', short: 'Поездка на байке', instruction: 'Объезжай конусы, ящики и песок. Аклима держится сзади, море — впереди.', controls: '← → — рулить · байк едет сам', success: 'МОРЕ. КРЕВЕТКИ. ВЫ ДОЕХАЛИ.', failure: '' },
  shooting: { scene: 5, title: 'ПОБЕДИ ВЗРОСЛУЮ ЖИЗНЬ', short: 'Тир в Барселоне', instruction: 'По 3 попадания в каждую мишень. Встань под ней и стреляй в жёлтый центр!', controls: '← → — двигаться · удерживай Space / A — стрелять', success: 'ADULTING COMPLETED. MOSTLY.', failure: '' },
} as const;
export const SHOOTING_TARGETS = [
  { name: 'АРЕНДА КВАРТИРЫ', short: 'Аренда', hint: 'Поймай хорошую квартиру', stamp: 'БЕРЁМ!', color: '#d5a262' },
  { name: 'СТРАХОВКА', short: 'Страховка', hint: 'Стреляй, когда щит открыт', stamp: 'ПОКРЫТО', color: '#75b9b3' },
  { name: 'ВОДИТЕЛЬСКИЕ ПРАВА', short: 'Права', hint: 'Предугадай следующий поворот', stamp: 'СДАЛ!', color: '#bf99d2' },
  { name: 'ВНЖ', short: 'ВНЖ', hint: 'Разберись с бумагами', stamp: 'ОДОБРЕНО', color: '#edba77' },
] as const;
export const MEDALS = { gold: 'ЗОЛОТО', silver: 'СЕРЕБРО', bronze: 'БРОНЗА' } as const;
export const ARCADE_TEXT = {
  departure: 'Аклима: «Присмотри за Евой. Я скоро!»',
  returning: 'Аклима вернулась. Диван цел. Почти чудо.',
  paperwork: 'ЕЩЁ ОДНА БУМАЖКА', open: 'ЩИТ ОТКРЫТ', shield: 'ЩИТ ЗАКРЫТ',
  ready: 'НА СТАРТ…', run: 'ЛОВИ ЕВУ!', sea: 'МОРЕ', miss: 'УПС!',
  shootingIntro: ['Новый город. Новые возможности.', 'И четыре небольших дела…'],
} as const;
