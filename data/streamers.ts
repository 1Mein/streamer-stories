import type { Streamer } from '~/types/domain'

export const streamers: Streamer[] = [{
  slug: 'serega-pirat',
  portrait: {
    src: '/images/streamers/serega-pirat.webp',
    alt: 'Серёга Пират в коричневой футболке со сложенными перед собой руками',
    sourceUrl: 'https://i-m-i.ru/profiles/seryoga-pirat',
    credit: 'Фото из профиля ИМИ',
    width: 900,
    height: 900
  },
  name: 'Серёга Пират',
  alias: 'Serega Pirat',
  eyebrow: 'стример · автор · игровой архив',
  bio: 'Сергей Евгеньевич Маляр, известный как Серёга Пират, — стример, музыкант и автор ироничного Dota-рэпа. Его история соединяет игровые мувики, разборы киберспортивных событий, стриминг, постироничную музыку и мемы русскоязычного Dota 2-сообщества.',
  theme: {
    colors: { background: '#10100f', surface: '#1b1b18', text: '#f5f0e8', muted: '#a8a89e', accent: '#d7ff42', secondary: '#ff7447' },
    radius: '2px'
  },
  accounts: [
    { platform: 'YouTube', handle: '@serega_pirat999', url: 'https://www.youtube.com/@serega_pirat999', verified: true },
    { platform: 'Telegram', handle: '@serega_pirat2', url: 'https://t.me/serega_pirat2', verified: true },
    { platform: 'VK', handle: 'twitch_pirat', url: 'https://vk.com/twitch_pirat', verified: true },
    { platform: 'Twitch', handle: 'serega_pirat', url: 'https://www.twitch.tv/serega_pirat', verified: false },
    { platform: 'Trovo', handle: 'serega_pirat', url: 'https://trovo.live/serega_pirat', verified: false },
    { platform: 'Kick', handle: 'serega_pirat', url: 'https://kick.com/serega_pirat', verified: false },
    { platform: 'Spotify', handle: 'Serega Pirat', url: 'https://open.spotify.com/artist/5IS4dQ9lDW01IY1buR7bW7', verified: false }
  ],
  events: [
    { id: 'origin', date: '1996–2014', year: '01', title: 'Ранние годы и образование', description: 'По данным предоставленных публикаций, Сергей Евгеньевич Маляр родился 30 декабря 1996 года в Санкт-Петербурге, учился в Дальнереченске и жил во Владивостоке. Позже он окончил вуз по специальности «управление морским транспортом», но выбрал блогинг и музыку.', category: 'origin', verified: false, sources: ['24smi', '360'] },
    { id: 'youtube-start', date: 'С 2014 года', year: '02', title: 'Мувики и Dota 2', description: 'Сергей начал с игровых нарезок по Dota 2 на YouTube. В 2016–2017 годах, согласно справке, сотрудничал с Team Empire.', category: 'content', verified: false, sources: ['cyber-sports'] },
    { id: 'video-era', date: '2016–2020', year: '03', title: 'Разборы, пародии и вирусные видео', description: 'Известность принесли ироничные разборы решафлов NAVI, пародии на Папича и ролики «Гарри Поттер и школа Доты» и «Тилт».', category: 'milestone', verified: false, sources: ['24smi', '360'] },
    { id: 'streaming', date: '2020–2024', year: '04', title: 'Стриминг и смена площадок', description: 'После банов на Twitch трансляции постепенно переместились на YouTube, Trovo и Kick. В феврале 2024 года, по данным публикаций, канал Twitch получил длительную блокировку за ненормативную лексику.', category: 'platform', verified: false, sources: ['cybersport', '360'] },
    { id: 'music', date: '2021–2026', year: '05', title: 'Музыка и медийные турниры', description: 'Серёга Пират развил направление ироничного Dota-рэпа, выпустил альбом «Вот мой альбом, сори», записал трек с Team Spirit и участвовал в медийных турнирах BetBoom Streamers Battle.', category: 'content', verified: false, sources: ['spotify', 'cybersport'] },
    { id: 'vietnam', date: 'С конца 2022 года', year: '06', title: 'Жизнь во Вьетнаме', description: 'Публикации сообщают, что в конце 2022 года Сергей эмигрировал во Вьетнам; в 2024–2026 годах его локация менялась.', category: 'origin', verified: false, sources: ['cyber-sports', 'metaratings'] }
  ],
  sources: [
    { id: 'youtube', title: 'YouTube · СЕРЕГА ПИРАТ', url: 'https://www.youtube.com/@serega_pirat999', platform: 'YouTube', checkedAt: '2026-10-17', status: 'verified' },
    { id: 'telegram', title: 'Telegram · Серега пират', url: 'https://t.me/serega_pirat2', platform: 'Telegram', checkedAt: '2026-10-17', status: 'verified' },
    { id: 'vk', title: 'VK · twitch_pirat', url: 'https://vk.com/twitch_pirat', platform: 'VK', checkedAt: '2026-10-17', status: 'limited' },
    { id: 'twitch', title: 'Twitch · serega_pirat', url: 'https://www.twitch.tv/serega_pirat', platform: 'Twitch', checkedAt: '2026-10-17', status: 'limited' }
    ,{ id: '24smi', title: '24СМИ · биография', url: 'https://24smi.org/celebrity/392243-serega-pirat.html', platform: 'Media profile', checkedAt: '2026-10-17', status: 'limited' },
    { id: '360', title: '360 · профиль стримера', url: 'https://360.ru/tekst/znamenitosti/kto-takoj-serega-pirat/', platform: 'Media profile', checkedAt: '2026-10-17', status: 'limited' },
    { id: 'cyber-sports', title: 'Sports.ru · интервью и биография', url: 'https://cyber.sports.ru/dota2/blogs/3130657.html', platform: 'Media profile', checkedAt: '2026-10-17', status: 'limited' },
    { id: 'cybersport', title: 'Cybersport.ru · профиль игрока', url: 'https://www.cybersport.ru/players/cs2/serega-pirat', platform: 'Media profile', checkedAt: '2026-10-17', status: 'limited' },
    { id: 'metaratings', title: 'Meta-ratings · профиль стримера', url: 'https://cybersport.metaratings.ru/articles/strimer-seryoga-pirat/', platform: 'Media profile', checkedAt: '2026-10-17', status: 'limited' },
    { id: 'spotify', title: 'Spotify · Serega Pirat', url: 'https://open.spotify.com/artist/5IS4dQ9lDW01IY1buR7bW7', platform: 'Spotify', checkedAt: '2026-10-17', status: 'limited' }
  ],
  genres: ['игровые стримы', 'юмор', 'общение', 'YouTube-видео'],
  media: [
    { id: 'avatar', title: 'Аватар публичного YouTube-канала', imageUrl: 'https://yt3.googleusercontent.com/lp68Xkk4cBzjYkgYtD1caN0Bq2vv5M8JY9W88B_FDQHM0EEYFAk5Kgz7fFhuKC_FnsmdTcyAaA=s900-c-k-c0x00ffffff-no-rj', url: 'https://www.youtube.com/@serega_pirat999', sourceId: 'youtube', kind: 'avatar' },
    { id: 'video-fvJREjH7GUs', title: 'Видео на официальном YouTube-канале', imageUrl: 'https://i.ytimg.com/vi/fvJREjH7GUs/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=fvJREjH7GUs', sourceId: 'youtube', kind: 'video' },
    { id: 'video-t7Fc3SAiEnU', title: 'Видео на официальном YouTube-канале', imageUrl: 'https://i.ytimg.com/vi/t7Fc3SAiEnU/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=t7Fc3SAiEnU', sourceId: 'youtube', kind: 'video' },
    { id: 'video-kokYlGNAU0w', title: 'Видео на официальном YouTube-канале', imageUrl: 'https://i.ytimg.com/vi/kokYlGNAU0w/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=kokYlGNAU0w', sourceId: 'youtube', kind: 'video' }
  ],
  biography: {
    confirmed: [
      'Сергей Евгеньевич Маляр, известный под псевдонимом Серёга Пират, — стример, музыкант и автор контента, связанный с русскоязычным сообществом Dota 2.',
      'По данным присланных публикаций, он родился 30 декабря 1996 года в Санкт-Петербурге, учился в Дальнереченске, жил во Владивостоке и окончил вуз по специальности «управление морским транспортом».',
      'Карьеру начал с создания мувиков по Dota 2 в 2014 году, а затем перешёл к ироничным разборам, пародиям, стримам и музыкальным проектам.',
      'Его публичный образ объединяет игровой юмор, постиронию, намеренно абсурдные тексты, Dota-рэп и нестандартные стратегии в пользовательских картах.',
      'В конце 2022 года, согласно публикациям, Сергей переехал во Вьетнам. В 2024–2026 годах его локация менялась.'
    ],
    unknown: [
      'В сети встречается ошибочная альтернативная дата рождения — 3 сентября 1995 года; в профиль внесена дата, которую приводят большинство указанных публикаций.',
      'Количество подписчиков, прослушиваний и просмотров может меняться; крупные цифры аудитории и отдельные показатели не считаются постоянными биографическими фактами.',
      'Подробности личной жизни, точные даты переездов и полный список сотрудничества требуют отдельной проверки по первичным публикациям.'
    ],
    details: [
      { label: 'Настоящее имя', value: 'Маляр Сергей Евгеньевич' },
      { label: 'Дата рождения', value: '30 декабря 1996 года' },
      { label: 'География', value: 'Санкт-Петербург · Дальнереченск · Владивосток · Рязань · Вьетнам' },
      { label: 'Образование', value: 'Высшее образование по специальности «управление морским транспортом»' },
      { label: 'Никнейм', value: '«Пират» был выбран случайно для комментария на YouTube; сам Сергей объяснял, что мог бы выбрать «Серега Кулак» или «Серега Бандит».' },
      { label: 'Основные площадки', value: 'YouTube, Twitch, Trovo и Kick' }
    ],
    music: [
      { date: '2024', title: 'ЧСВ', detail: 'Совместный трек с Lida, один из наиболее известных релизов проекта.' },
      { date: '2024', title: 'Зомби-апокалипсис', detail: 'Песня, которая, по данным публикаций, получила вирусное распространение весной 2024 года.' },
      { date: 'Август 2024', title: 'Совместный трек с Team Spirit', detail: 'Официальная песня поддержки двукратных чемпионов The International.' },
      { date: '2026', title: '«Вот мой альбом, сори»', detail: 'Полноформатный альбом с ироничным названием.' },
      { date: 'Разные годы', title: 'Другие песни', detail: '«Почему ты еще не фанат?», «тп на аме», «Мой байк», «Гимн Дахака», «И я кричу, остановите катку», «ну где моя нога», «Ну и что, что я вор?», «Маша» и «Качалка».' }
    ],
    collaborations: [
      { name: 'Team Empire', role: 'киберспортивная организация', detail: 'По данным справки, сотрудничество с организацией относится к периоду 2016–2017 годов.' },
      { name: 'Lida', role: 'стример и музыкант', detail: 'Совместный трек «ЧСВ» и связанные с ним музыкальные активности.' },
      { name: 'Team Spirit', role: 'киберспортивная команда', detail: 'Совместный официальный трек поддержки, записанный в августе 2024 года.' },
      { name: 'BetBoom Streamers Battle', role: 'медийные турниры', detail: 'Участие в турнирах по Dota 2 и CS2.' },
      { name: 'Quizzzmeow', role: 'живые выступления', detail: 'Публикации упоминают выступления Серёги Пирата в качестве приглашённого артиста.' }
    ],
    setup: [],
    contacts: [],
    interests: [
      'Dota 2, пользовательские карты и нестандартные стратегии, включая Dota 1x6.',
      'Мувики, разборы решафлов, пародии на Папича и вирусные игровые видео.',
      'Мемы сообщества: «через позор», намеренно плохой вокал, абсурдные тексты и постироничный образ.'
    ]
  },
  updatedAt: '17.10.2026'
}, {
  slug: 'derzko',
  portrait: {
    src: '/images/streamers/derzko.webp',
    alt: 'Derzko в чёрной футболке и наушниках во время трансляции',
    sourceUrl: 'https://www.twitch.tv/derzko69/clip/BoredInnocentHerbsDatBoi-XUz60XjbGcQzUv7u',
    credit: 'Кадр трансляции derzko69 / Twitch',
    width: 900,
    height: 740
  },
  name: 'Дерзко',
  alias: 'derzko69 · Данила Киселёв',
  eyebrow: 'стример · музыкант · контент-мейкер',
  bio: 'Данила Киселёв — стример, музыкант и контент-мейкер из Мытищ. Его публичный образ соединяет игровые эфиры, музыку, косплей и разговорный формат.',
  theme: {
    colors: { background: '#100b1b', surface: '#1b102b', text: '#f5edff', muted: '#b9a8c9', accent: '#c084fc', secondary: '#f0abfc' },
    radius: '14px'
  },
  accounts: [
    { platform: 'Twitch', handle: 'derzko69', url: 'https://www.twitch.tv/derzko69', verified: true },
    { platform: 'YouTube', handle: '@derzko69', url: 'https://www.youtube.com/@derzko69', verified: true },
    { platform: 'Telegram', handle: '@gigaderzko69', url: 'https://telegram.me/gigaderzko69', verified: true },
    { platform: 'Discord', handle: 'derzko69', url: 'https://discord.gg/derzko69', verified: true },
    { platform: 'Boosty', handle: 'derzko69', url: 'https://boosty.to/derzko69', verified: true },
    { platform: 'VK', handle: 'gigaderzko69', url: 'https://vk.com/gigaderzko69', verified: true },
    { platform: 'TikTok', handle: '@derzko69', url: 'https://tiktok.com/@derzko69', verified: true }
  ],
  events: [
    { id: 'origin', date: '2002–2017', year: '01', title: 'Детство и начало пути', description: 'По присланной биографической справке, Данила Алексеевич Киселёв родился 30 июня 2002 года и вырос в Мытищах. 8 ноября 2017 года был создан канал derzko69.', category: 'origin', verified: false, sources: ['twitch'] },
    { id: 'shpana-era', date: '2023–2025', year: '02', title: 'Эпоха «Шпаны»', description: 'Осенью 2023 года Данила присоединился к объединению «Шпана». В этот период проходили совместные стримы, шоу и IRL-мероприятия; 10 декабря 2024 года он покинул объединение, а 10 июня 2025 года «Шпана» окончательно распалась.', category: 'collab', verified: false, sources: ['twitch'] },
    { id: 'music-era', date: '2024–2025', year: '03', title: 'Музыкальный этап', description: 'В дискографии появились «Farma», «Русская душа», «Welcome to Moscow» и «Я не должон». Релизы объединяют электронную музыку, стрим-рэп и хип-хоп, а часть работ создана вместе с другими артистами.', category: 'content', verified: false, sources: ['youtube'] },
    { id: 'formats', date: '2025–2026', year: '04', title: 'Расширение контента', description: 'В публичном описании этого периода соединяются игровые эфиры, косплей-аукционы, просмотры аниме и кино, совместные шоу, IRL-мероприятия и спортивные челленджи. 28 июня 2026 года, согласно справке, запущен Boosty.', category: 'content', verified: false, sources: ['twitch', 'boosty'] },
    { id: 'now', date: 'Текущий этап', year: '05', title: 'Стример, музыкант и контент-мейкер', description: 'Сегодня образ derzko69 строится вокруг игровых трансляций, музыкальных проектов, косплея, общения с аудиторией и публичных сообществ.', category: 'platform', verified: true, sources: ['twitch', 'youtube'] }
  ],
  sources: [
    { id: 'twitch', title: 'Twitch · derzko69', url: 'https://www.twitch.tv/derzko69', platform: 'Twitch', checkedAt: '2026-10-17', status: 'verified' },
    { id: 'youtube', title: 'YouTube · @derzko69', url: 'https://www.youtube.com/@derzko69', platform: 'YouTube', checkedAt: '2026-10-17', status: 'verified' },
    { id: 'telegram', title: 'Telegram · @gigaderzko69', url: 'https://telegram.me/gigaderzko69', platform: 'Telegram', checkedAt: '2026-10-17', status: 'verified' },
    { id: 'discord', title: 'Discord · derzko69', url: 'https://discord.gg/derzko69', platform: 'Discord', checkedAt: '2026-10-17', status: 'verified' },
    { id: 'boosty', title: 'Boosty · derzko69', url: 'https://boosty.to/derzko69', platform: 'Boosty', checkedAt: '2026-10-17', status: 'verified' },
    { id: 'vk', title: 'VK · gigaderzko69', url: 'https://vk.com/gigaderzko69', platform: 'VK', checkedAt: '2026-10-17', status: 'verified' }
  ],
  genres: ['игровые стримы', 'музыка', 'косплей', 'аниме и кино', 'общение'],
  media: [
    { id: 'derzko-avatar', title: 'Публичный образ derzko69', imageUrl: 'https://derzko69.ru/images/homeview/avatar-2.webp', url: 'https://www.twitch.tv/derzko69', sourceId: 'twitch', kind: 'avatar' },
    { id: 'derzko-hero', title: 'Визуальный архив профиля', imageUrl: 'https://derzko69.ru/images/homeview/derzko-hero-wide.webp', url: 'https://www.youtube.com/@derzko69', sourceId: 'youtube', kind: 'video' },
    { id: 'derzko-cosplay', title: 'Косплей-архив', imageUrl: 'https://derzko69.ru/images/homeview/фон.webp', url: 'https://www.twitch.tv/derzko69', sourceId: 'twitch', kind: 'video' },
    { id: 'derzko-bg', title: 'Атмосфера архива', imageUrl: 'https://derzko69.ru/images/homeview/фон.webp', url: 'https://www.youtube.com/@derzko69', sourceId: 'youtube', kind: 'video' }
  ],
  biography: {
    unknown: [],
    confirmed: [
      'Данила Алексеевич Киселёв, известный под псевдонимом derzko69 (Дерзко 69), — стример, музыкант и контент-мейкер из Мытищ Московской области. Его деятельность объединяет игровые трансляции, общение с аудиторией, музыку, косплей, совместные шоу и IRL-мероприятия.',
      'По присланной биографической справке, Данила родился 30 июня 2002 года и вырос в Мытищах. Он получил 9 классов образования и среднее профессиональное образование с красным дипломом по специальности «Компьютерные системы и комплексы». В публичном описании также упоминаются спортзал, силовые челленджи и тренировки во время стримов.',
      'Канал derzko69 был создан 8 ноября 2017 года. Со временем к игровым эфирам добавились просмотры аниме и фильмов, косплей-аукционы, совместные форматы и спортивные активности.',
      'Осенью 2023 года Данила присоединился к объединению «Шпана». В рамках проекта проходили совместные стримы, шоу и IRL-мероприятия. 10 декабря 2024 года он покинул объединение, а 10 июня 2025 года «Шпана» окончательно распалась.',
      'Музыкальная часть карьеры включает релизы «Farma», «Русская душа», «Welcome to Moscow» и «Я не должон». Среди связанных с проектом артистов и авторов указаны METAN, EVEN CUTE, ЯКОРЪ и НАВЕРНОЕ ПОЭТ.',
      'В материалах о происхождении псевдонима «Дерзко» приводится версия о переходе от скромного характера к более открытому и напористому образу. Число 69 связывается с последними цифрами роста 169 см и знаком Рака; это именно опубликованное объяснение, а не независимо установленная этимология.'
    ],
    details: [
      { label: 'Полное имя', value: 'Данила Алексеевич Киселёв' },
      { label: 'Дата рождения', value: '30 июня 2002 года' },
      { label: 'Город', value: 'Мытищи, Московская область, Россия' },
      { label: 'Рост и вес', value: '169 см и 66 кг' },
      { label: 'Образование', value: '9 классов и среднее профессиональное образование с красным дипломом по специальности «Компьютерные системы и комплексы»' },
      { label: 'Спорт', value: 'Спортзал, силовые челленджи и тренировки во время стримов' }
    ],
    music: [
      { date: '7 июня 2024', title: 'Farma', detail: 'Electronic / Beat · совместно с METAN' },
      { date: '13 сентября 2024', title: 'Русская душа', detail: 'Hip-Hop / Stream-Rap' },
      { date: '28 февраля 2025', title: 'Welcome to Moscow', detail: 'Dance / Electronic · совместно с EVEN CUTE, ЯКОРЪ и НАВЕРНОЕ ПОЭТ' },
      { date: '19 мая 2025', title: 'Я не должон', detail: 'Rap / Hip-Hop · сольный трек' }
    ],
    collaborations: [
      { name: 'Шпана', role: 'стримерское объединение', detail: 'Основание — 9 октября 2023 года; уход Данилы — 10 декабря 2024 года; окончательный распуск — 10 июня 2025 года.' },
      { name: 'Lida', role: 'музыкант и стример', detail: 'Совместные трансляции, музыкальные эфиры, шоу и IRL-коллаборации.' },
      { name: 'CMH', role: 'стример', detail: 'Совместные стримы, мероприятия «Шпаны» и подкаст-форматы.' },
      { name: 'Deepins', role: 'стример и тиктокер', detail: 'Совместные трансляции, прохождения игр и обсуждение контента.' },
      { name: 'METAN', role: 'фитнес-блогер', detail: 'Спортивные рубрики, силовые челленджи и совместный релиз «Farma».' },
      { name: 'Квартирск', role: 'стримерское сообщество', detail: 'Совместные стримы, игры в мафию и игровые турниры.' }
    ],
    setup: [
      { label: 'Процессор', value: 'AMD Ryzen 7 9800X3D · до 5,2 ГГц' },
      { label: 'Видеокарта', value: 'MSI GeForce RTX 4080 SUPER · 16 ГБ' },
      { label: 'Оперативная память', value: 'TEAMGROUP T-Force Delta RGB Black · 64 ГБ DDR5 · 6000 МГц' },
      { label: 'Материнская плата', value: 'MSI MPG X870E CARBON WIFI' },
      { label: 'Накопитель', value: 'ADATA LEGEND 850 NVMe · 1 ТБ' },
      { label: 'Блок питания', value: 'MSI MPG A1000G · 1000 Вт' },
      { label: 'Мониторы', value: 'Два игровых монитора · 240 Гц каждый' },
      { label: 'Предыдущий ПК', value: 'Intel Core i5-13400F · RTX 3070 Ti · 32 ГБ DDR5 · Gigabyte B760 AORUS ELITE AX' }
    ],
    contacts: [
      { label: 'Основной email', value: 'derzko@gca.holdings' },
      { label: 'Резервный email', value: 'derzko69business@gmail.com' },
      { label: 'Аудитория Twitch', value: 'Более 1,6 млн подписчиков ' },
      { label: 'Аудитория Telegram', value: 'Около 228 тыс. подписчиков ' },
      { label: 'Аудитория YouTube', value: 'Около 328 тыс. подписчиков ' },
      { label: 'Discord', value: 'Около 16 тыс. участников ' }
    ],
    interests: [
      'Косплей-аукционы: Джайро Цеппели, Император Человечества, Тигр Порше, Бискит Крюгер и Хигурума.',
      'Просмотры аниме, фильмов и сериалов: «Рик и Морти», «Тайна Коко», «Повелитель тайн», «Восхождение в тени», «Стальной алхимик: Братство», Hunter × Hunter.',
      'Игровые трансляции и архив пройденных игр: «Лихо Одноглазое», «Копатель Онлайн», GuGu Pizza и другие.'
    ]
  },
  updatedAt: '17.10.2026'
}]

export function getStreamer(slug: string) { return streamers.find((streamer) => streamer.slug === slug) }
