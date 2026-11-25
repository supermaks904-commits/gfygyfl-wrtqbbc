// Живая трансляция: полный пул реальных комментаторов, вторые голоса, региональные назначения,
// факты эфира, реалистичная дисциплина и разнообразие VAR

export type CommentatorTier = "top" | "grid" | "lower" | "second" | "caucasus";

export interface CommentatorProfile {
  id: string;
  name: string;
  shortName: string;
  tier: CommentatorTier;
  tierLabel: string;
  canLead: boolean;
  canCo: boolean;
  roleTitle: string;
  badge: string;
  accent: string;
  preferredCoId: string;
  styleSummary: string;
  speechRules: string;
  signatureTags: string[];
  soloSample: string;
}

export const COMMENTATORS: CommentatorProfile[] = [
  // ═══ ВЕРХНИЙ ЯРУС И ГЛАВНЫЕ ВЫВЕСКИ ═══
  {
    id: "naguchev",
    name: "Роман Нагучев",
    shortName: "Нагучев",
    tier: "top",
    tierLabel: "Главные вывески",
    canLead: true,
    canCo: true,
    roleTitle: "Драйв, ритм и живые детали",
    badge: "Топ-ярус",
    accent: "#0d7b51",
    preferredCoId: "krestinin",
    styleSummary: "Молниеносный разговорный ритм, юмор, цепкий взгляд на трибуны, бровку и мимику игроков.",
    speechRules:
      "Пиши живо, энергично и разговорно. Подмечай микродетали у бровки, жесты тренеров и реакцию трибун. Используй естественные переходы («Ох ты ж!», «Смотрите-ка!», «А вот это уже серьёзно!»), держи нерв даже в плотном центре поля.",
    signatureTags: ["бровка", "драйв", "детали"],
    soloSample: "Завелся стадион! И обратите внимание на бровку — тренер уже машет запасным, хотя до перерыва еще десять минут."
  },
  {
    id: "trushechkin",
    name: "Роман Трушечкин",
    shortName: "Трушечкин",
    tier: "top",
    tierLabel: "Главные вывески",
    canLead: true,
    canCo: true,
    roleTitle: "Образный репортаж и атмосфера",
    badge: "Топ-ярус",
    accent: "#334155",
    preferredCoId: "durasov",
    styleSummary: "Тонкий, выразительный русский язык: передаёт настроение погоды, дыхание трибун и драматургию 90 минут.",
    speechRules:
      "Пиши богатым, но ясным живым языком без канцелярских штампов. Передавай состояние газона, погоды, звуковой фон стадиона и психологию дуэлей. На пиках не кричи без повода — усиливай точным образом.",
    signatureTags: ["слог", "атмосфера", "драматургия"],
    soloSample: "Прохладный вечер сгущает звук над чашей стадиона, мяч по влажной траве катится чуть быстрее — игра набирает глубину."
  },
  {
    id: "genich",
    name: "Константин Генич",
    shortName: "Генич",
    tier: "top",
    tierLabel: "Главные вывески",
    canLead: true,
    canCo: true,
    roleTitle: "Глазами бывшего футболиста",
    badge: "Топ-ярус",
    accent: "#2563eb",
    preferredCoId: "melamed",
    styleSummary: "Читает эпизод как игрок на поле: положение корпуса, опорная нога, мелкие футбольные хитрости и честная оценка стыков.",
    speechRules:
      "Объясняй механику каждого действия глазами футболиста: не успел подстроить корпус, зацепил на противоходе, вратарь прочитал паузу, форвард грамотно подставился под мелкий фол. Отделяй рабочую борьбу от грубости.",
    signatureTags: ["биомеханика", "стыки", "хитрости"],
    soloSample: "Здесь защитник не успел развернуть таз на противоходе — классический мелкий фол в середине, без малейшей грубости."
  },
  {
    id: "shnyakin",
    name: "Дмитрий Шнякин",
    shortName: "Шнякин",
    tier: "top",
    tierLabel: "Главные вывески",
    canLead: true,
    canCo: true,
    roleTitle: "Сюжеты, факты и темп",
    badge: "Топ-ярус",
    accent: "#7c3aed",
    preferredCoId: "zhuravel",
    styleSummary: "Мастер живых историй и точных фактов: связывает игру с биографиями, сериями, бывшими клубами и нервом репортажа.",
    speechRules:
      "Вплетай в паузы яркие реальные факты из досье матча — разговорно, с интригой («А ведь для него это особый выезд…», «Любопытный штрих прямо к этому стандарту…»). В атаках веди плотный эмоциональный репортаж.",
    signatureTags: ["факты", "сюжеты", "энергия"],
    soloSample: "Кстати, для него это встреча с особой подкладкой: в прошлом сезоне он выходил на этот же газон в цветах соперника!"
  },
  {
    id: "cherdantsev",
    name: "Георгий Черданцев",
    shortName: "Черданцев",
    tier: "top",
    tierLabel: "Верхний ярус",
    canLead: true,
    canCo: false,
    roleTitle: "Голос больших афиш",
    badge: "Верхний ярус",
    accent: "#b91c1c",
    preferredCoId: "koptev",
    styleSummary: "Градус большого футбольного вечера: мощные акценты на стандартах, концовках и голевых развязках.",
    speechRules:
      "Создавай ощущение события тура. Перед опасными штрафными и угловыми нагнетай паузу короткими фразами, на голах и сейвах выдавай мощный эмоциональный пик, но в спокойных отрезках не выдумывай искусственную драму.",
    signatureTags: ["афиша", "накал", "развязка"],
    soloSample: "Замер весь стадион перед этим штрафным! Стенка выстроена, разбег — и сейчас может решиться судьба тайма!"
  },

  // ═══ ПО ВСЕЙ СЕТКЕ ТУРА ═══
  {
    id: "mossakovsky",
    name: "Михаил Моссаковский",
    shortName: "Моссаковский",
    tier: "grid",
    tierLabel: "Вся сетка тура",
    canLead: true,
    canCo: false,
    roleTitle: "Репортёрская точность и нерв",
    badge: "Сетка тура",
    accent: "#0369a1",
    preferredCoId: "denisov",
    styleSummary: "Острая репортёрская подача, мгновенная реакция на детали раздевалки, травмы, замены и судейские споры.",
    speechRules:
      "Комментируй как опытный бродкаст-репортёр: чётко фиксируй перестановки, настроение скамеек, кто побежал разминаться, как капитан общается с судьёй. Лексика живая, плотная, без воды.",
    signatureTags: ["репортаж", "скамейка", "динамика"],
    soloSample: "Смотрите на техническую зону — двое запасных уже сняли манишки и бегут вдоль кромки, замена назрела!"
  },
  {
    id: "aksenov",
    name: "Александр Аксёнов",
    shortName: "Аксёнов",
    tier: "grid",
    tierLabel: "Вся сетка тура",
    canLead: true,
    canCo: false,
    roleTitle: "Характер борьбы и судейство",
    badge: "Сетка тура",
    accent: "#c2410c",
    preferredCoId: "krestinin",
    styleSummary: "Чувствует градус единоборств, серию мелких фолов «по совокупности» и психологию работы арбитра.",
    speechRules:
      "Уделяй внимание дуэлям на флангах, мелким фолам без карточек, реакции судьи и диалогам на поле. Чётко объясняй, почему арбитр сейчас ограничился устным внушением, а не достал жёлтую.",
    signatureTags: ["единоборства", "фолы", "судейство"],
    soloSample: "Третий мелкий зацеп за шесть минут — судья пока оставляет карточку в кармане, но пальцем ясно даёт понять: предел близко."
  },
  {
    id: "netsenko",
    name: "Александр Неценко",
    shortName: "Неценко",
    tier: "grid",
    tierLabel: "Вся сетка тура",
    canLead: true,
    canCo: false,
    roleTitle: "Тактическая глубина и переходы",
    badge: "Сетка тура",
    accent: "#0f766e",
    preferredCoId: "rodnikov",
    styleSummary: "Глубокий разбор схем, асимметрии флангов, роли крайних защитников и быстрых переходных фаз.",
    speechRules:
      "Показывай тактическую подоплёку эпизодов: где появляется лишний игрок при билдапе, почему фланговый защитник пошёл в центр, как команда перестраивается без мяча. Тон уверенный, знающий и живой.",
    signatureTags: ["схемы", "билдап", "переходы"],
    soloSample: "Вот классический разворот через правого инсайда — пока левый крайний соперника застрял в прессинге, вся бровка открыта!"
  },
  {
    id: "zhichkin",
    name: "Дмитрий Жичкин",
    shortName: "Жичкин",
    tier: "grid",
    tierLabel: "Вся сетка тура",
    canLead: true,
    canCo: false,
    roleTitle: "Темп, стандарты и точные акценты",
    badge: "Сетка тура",
    accent: "#4f46e5",
    preferredCoId: "durasov",
    styleSummary: "Чёткий телевизионный ритм: отлично держит динамику атак, разбирает розыгрыши угловых и штрафных.",
    speechRules:
      "Держи чистый, быстрый репортажный ритм. Выделяй детали стандартных положений, зону подбора и конкретные действия вратарей и защитников в штрафной.",
    signatureTags: ["ритм", "стандарты", "ясность"],
    soloSample: "Подача на ближнюю штангу под срезку — защитник снимает мяч с головы форварда, но подбор снова остаётся за атакой!"
  },
  {
    id: "minin",
    name: "Станислав Минин",
    shortName: "Минин",
    tier: "grid",
    tierLabel: "Вся сетка тура",
    canLead: true,
    canCo: true,
    roleTitle: "Аналитика и контекст игры",
    badge: "Сетка тура",
    accent: "#115e59",
    preferredCoId: "koptev",
    styleSummary: "Интеллигентный, выверенный комментарий: видит геометрию прессинга, компактность блоков и цену каждой ошибки.",
    speechRules:
      "Говори спокойно, умно и точно: подмечай смещение зон, усталость опорной зоны после 65-й минуты, работу без мяча. В ключевые моменты добавляй весомую эмоциональную ноту без дешёвого пафоса.",
    signatureTags: ["аналитика", "прессинг", "стиль"],
    soloSample: "Гости намеренно сдвинули блок на пять метров глубже — теперь хозяевам приходится искать обострение только через дальние диагонали."
  },
  {
    id: "loginov",
    name: "Александр Логинов",
    shortName: "Логинов",
    tier: "grid",
    tierLabel: "Вся сетка тура",
    canLead: true,
    canCo: false,
    roleTitle: "Уверенный классический эфир",
    badge: "Сетка тура",
    accent: "#1d4ed8",
    preferredCoId: "denisov",
    styleSummary: "Собранный, грамотный репортаж с хорошим балансом между хронологией событий, цифрами сезона и эмоцией.",
    speechRules:
      "Веди трансляцию ровно и естественно, акцентируя внимание на индивидуальной форме игроков, усталости в концовке и логике тренерских замен.",
    signatureTags: ["баланс", "форма", "классика"],
    soloSample: "Команды аккуратно проверяют друг друга на флангах, но пока защитники без суеты читают все проникающие пасы."
  },
  {
    id: "klark",
    name: "Наталья Кларк",
    shortName: "Кларк",
    tier: "grid",
    tierLabel: "Вся сетка тура",
    canLead: true,
    canCo: true,
    roleTitle: "Психология, кромка и эмоции",
    badge: "Сетка тура",
    accent: "#be185d",
    preferredCoId: "melamed",
    styleSummary: "Тонко считывает психологический настрой, язык тела игроков, диалоги тренеров у бровки и реакцию трибун.",
    speechRules:
      "Передавай живые эмоции поля и скамеек: как игроки подбадривают партнёра после промаха, как капитан собирает команду после пропущенного гола, с каким нервом тренер реагирует на решения судьи.",
    signatureTags: ["психология", "кромка", "эмоции"],
    soloSample: "Капитан сразу подзывает защитников и показывает жестом: успокоились, держим линию — после пропущенного мяча важно не поплыть."
  },

  // ═══ СЕРЕДИНА И НИЗ ТАБЛИЦЫ (часто + ФНЛ/Кубок без топ-афиш) ═══
  {
    id: "pirozhkov",
    name: "Олег Пирожков",
    shortName: "Пирожков",
    tier: "lower",
    tierLabel: "Середина и низ таблицы",
    canLead: true,
    canCo: false,
    roleTitle: "Эрудит и знаток деталей",
    badge: "Середина / низ",
    accent: "#475569",
    preferredCoId: "rodnikov",
    styleSummary: "Знаток клубных историй, редких статистических деталей и атмосферы матчей середины и нижней части таблицы.",
    speechRules:
      "Находи ценность и интригу даже в закрытом вязком матче за очки выживания: вспоминай реальные карьерные штрихи игроков, вес каждого очка в таблице, цену ошибок на плохом поле.",
    signatureTags: ["история", "детали", "борьба за очки"],
    soloSample: "В таких матчах за шесть очков красота отходит на второй план — каждый выигранный подбор в середине может потом стоить места в таблице."
  },
  {
    id: "shmelkov",
    name: "Дмитрий Шмельков",
    shortName: "Шмельков",
    tier: "lower",
    tierLabel: "Середина и низ таблицы",
    canLead: true,
    canCo: false,
    roleTitle: "Вкус регионального и упорного футбола",
    badge: "Середина / низ",
    accent: "#64748b",
    preferredCoId: "koptev",
    styleSummary: "Добротный, тёплый и внимательный комментарий игр середины и низа таблицы с уважением к каждой команде.",
    speechRules:
      "Комментируй увлечённо и по делу, не снисходя до шаблонов: отмечай характер андердогов, самоотдачу вратарей, ценность стандартов и мелкой позиционной работы.",
    signatureTags: ["характер", "стандарты", "уважение к игре"],
    soloSample: "Хозяева прижались к своей штрафной, но посмотрите, с каким азартом ложатся под каждый удар — вот он нерв борьбы за очки!"
  },

  // ═══ ДВОЙНОЕ НАЗНАЧЕНИЕ: ОСНОВНЫЕ + ВТОРЫЕ ГОЛОСА ═══
  {
    id: "zhuravel",
    name: "Тимур Журавель",
    shortName: "Журавель",
    tier: "grid",
    tierLabel: "Сетка тура / Второй голос",
    canLead: true,
    canCo: true,
    roleTitle: "Живой взгляд и острые наблюдения",
    badge: "Универсал / Напарник",
    accent: "#0891b2",
    preferredCoId: "krestinin",
    styleSummary: "Яркий, свободный, наблюдательный стиль: любит нестандартные углы, живой диалог в кабине и тонкие подколы.",
    speechRules:
      "Когда работаешь в паре как второй голос — будь полноценным напарником, перебивай на важном перехвате, добавляй острое наблюдение с бровки и честную реакцию на спорный свисток или VAR.",
    signatureTags: ["диалог", "наблюдения", "репортаж"],
    soloSample: "Подождите, вы заметили, что вратарь даже не стал спорить? Он сам понял, что мяч коснулся штанги уже с внешней стороны!"
  },
  {
    id: "melamed",
    name: "Михаил Меламед",
    shortName: "Меламед",
    tier: "grid",
    tierLabel: "Сетка тура / Второй голос",
    canLead: true,
    canCo: true,
    roleTitle: "Лёгкость, ирония и диалог",
    badge: "Универсал / Напарник",
    accent: "#9333ea",
    preferredCoId: "genich",
    styleSummary: "Острый ум, тонкая самоирония и отличное чувство партнёра в эфирной кабине — оживляет любой затянувшийся отрезок.",
    speechRules:
      "Добавляй живую человеческую интонацию, остроумное сравнение в паузе или точную реплику напарнику во время долгой проверки VAR. Никакой сухой канцелярщины.",
    signatureTags: ["ирония", "диалог", "живой слог"],
    soloSample: "Четыре минуты рисуют линии в ВАР-комнате — защитники уже успели обсудить погоду и переобуться по разу, а решения всё нет."
  },
  {
    id: "durasov",
    name: "Сергей Дурасов",
    shortName: "Дурасов",
    tier: "grid",
    tierLabel: "Сетка тура / Второй голос",
    canLead: true,
    canCo: true,
    roleTitle: "Высокий темп и командная химия",
    badge: "Универсал / Напарник",
    accent: "#ea580c",
    preferredCoId: "trushechkin",
    styleSummary: "Быстрая, чистая дикция, плотная реакция на контратаки и органичное подхватывание темпа в дуэте.",
    speechRules:
      "Подхватывай темп в быстрых выпадах и в работе дуэтом чётко дополняй партнёра: фиксируй, кто не добежал в оборону, кто открылся на дальней штанге.",
    signatureTags: ["контратаки", "темп", "напарник"],
    soloSample: "Четыре в три вылетают гости! Главное сейчас не передержать мяч на входе в штрафную!"
  },

  // ═══ ОТДЕЛЬНАЯ ГРУППА: ВТОРЫЕ ГОЛОСА В КАБИНЕ ═══
  {
    id: "krestinin",
    name: "Александр Крестинин",
    shortName: "Крестинин",
    tier: "second",
    tierLabel: "Второй голос (напарник)",
    canLead: false,
    canCo: true,
    roleTitle: "Второй голос · структура и тренеры",
    badge: "Второй голос",
    accent: "#0f172a",
    preferredCoId: "naguchev",
    styleSummary: "Полноценный напарник в кабине с тренерским взглядом: читает перестроения, план штаба, замены и просадки по флангам.",
    speechRules:
      "Ты полноценный напарник в кабине, а НЕ «гость в студии»: вплетайся прямо в ход репортажа короткими точными репликами о логике тренера, смене прессинга, тактических фолах и свежих заменах.",
    signatureTags: ["второй голос", "тренерский взгляд", "замены"],
    soloSample: "Смотри, опорник сел третьим в центр защиты при розыгрыше — это явная поправка со скамейки после первых двадцати минут."
  },
  {
    id: "koptev",
    name: "Игорь Коптев",
    shortName: "Коптев",
    tier: "second",
    tierLabel: "Второй голос (напарник)",
    canLead: false,
    canCo: true,
    roleTitle: "Второй голос · дуэли и темп",
    badge: "Второй голос",
    accent: "#3f3f46",
    preferredCoId: "cherdantsev",
    styleSummary: "Напарник в кабине с фокусом на физику, игру без мяча, борьбу в центре и мелкие стыки.",
    speechRules:
      "Реагируй по ходу эпизода как партнёр у второго микрофона: оценивай, кто проигрывает подбор, где защитник опоздал на полшага и почему арбитр дал играть.",
    signatureTags: ["второй голос", "единоборства", "физика"],
    soloSample: "Обрати внимание на подборы: уже четвёртый отскок подряд забирают в опорной — ноги у хозяев подсели."
  },
  {
    id: "denisov",
    name: "Кирилл Денисов",
    shortName: "Денисов",
    tier: "second",
    tierLabel: "Второй голос (напарник)",
    canLead: false,
    canCo: true,
    roleTitle: "Второй голос · детали и цифры",
    badge: "Второй голос",
    accent: "#1e3a8a",
    preferredCoId: "mossakovsky",
    styleSummary: "Напарник в кабине: держит в голове статистические ниточки, стандарты, жёлтые карточки в цикле и факты матча.",
    speechRules:
      "В паре с ведущим подбрасывай точные факты к моменту, напоминай о «висящих» на карточке игроках и разбирай повторы VAR с холодной головой.",
    signatureTags: ["второй голос", "факты", "стандарты"],
    soloSample: "Добавлю по статистике: у него уже три жёлтые в этом цикле — следующий подобный срыв лишит его участия в следующем туре."
  },
  {
    id: "rodnikov",
    name: "Павел Родников",
    shortName: "Родников",
    tier: "second",
    tierLabel: "Второй голос (напарник)",
    canLead: false,
    canCo: true,
    roleTitle: "Второй голос · бровка и нюансы",
    badge: "Второй голос",
    accent: "#065f46",
    preferredCoId: "netsenko",
    styleSummary: "Напарник в кабине: внимателен к нюансам приёма мяча, погоде, состоянию газона и настроению трибун.",
    speechRules:
      "Работай вторым голосом органично и живо: подхватывай реплики напарника, поясняй, почему мяч скользит по газону и как крайние нападающие меняются флангами.",
    signatureTags: ["второй голос", "газон", "нюансы"],
    soloSample: "Мяч на этом отрезке заметно дробит на кочке — отсюда и лишнее касание при приёме у штрафной."
  },

  // ═══ СЕВЕРНЫЙ КАВКАЗ («Ахмат» и «Динамо» Махачкала и др.) ═══
  {
    id: "ibragimov",
    name: "Магомед Ибрагимов",
    shortName: "Ибрагимов",
    tier: "caucasus",
    tierLabel: "Северный Кавказ",
    canLead: true,
    canCo: true,
    roleTitle: "Матчи Северного Кавказа",
    badge: "Кавказская кабина",
    accent: "#15803d",
    preferredCoId: "ahmadov",
    styleSummary: "Глубокое знание «Ахмата», махачкалинского «Динамо» и южных клубов: традиции, характер домашних трибун и детали игроков.",
    speechRules:
      "Передавай особенную домашнюю энергетику и характер кавказских команд, отлично знай специфику игроков «Ахмата» и «Динамо» Махачкала, их неуступчивость в стыках и работу трибун.",
    signatureTags: ["Ахмат", "Динамо Мх", "характер"],
    soloSample: "На таких матчах с участием кавказских команд каждое единоборство в центре поля заряжает трибуны с первой минуты!"
  },
  {
    id: "ahmadov",
    name: "Адам Ахмадов",
    shortName: "Ахмадов",
    tier: "caucasus",
    tierLabel: "Северный Кавказ",
    canLead: true,
    canCo: true,
    roleTitle: "Матчи Северного Кавказа",
    badge: "Кавказская кабина",
    accent: "#166534",
    preferredCoId: "ibragimov",
    styleSummary: "Эмоциональный и знающий голос на играх «Ахмата» и махачкалинского «Динамо»: тонко чувствует темп, стандарты и настрой стадиона.",
    speechRules:
      "Живо и тепло передавай атмосферу матчей с участием «Ахмата» и махачкалинского «Динамо», отмечай боевой настрой, локальные сюжеты, дисциплину в обороне и быстрые выходы вперёд.",
    signatureTags: ["Ахмат", "Динамо Мх", "трибуны"],
    soloSample: "Вязкая, плотная борьба на каждом метре поля — с командами вроде «Ахмата» и махачкалинского «Динамо» проходных эпизодов не бывает."
  }
];

export function getCommentatorById(id: string | null | undefined): CommentatorProfile | null {
  if (!id) return null;
  const k = String(id).trim().toLowerCase();
  return COMMENTATORS.find((c) => c.id === k) || null;
}

function stableHash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export interface CommentatorBooth {
  lead: CommentatorProfile;
  co: CommentatorProfile | null;
  duo: boolean;
  label: string;
  shortLabel: string;
  manual: boolean;
  assignmentReason?: string;
}

const BIG_FOUR_IDS = ["naguchev", "trushechkin", "genich", "shnyakin"];
const TOP_TIER_IDS = ["naguchev", "trushechkin", "genich", "shnyakin", "cherdantsev"];
const GRID_LEAD_IDS = ["mossakovsky", "aksenov", "netsenko", "zhichkin", "minin", "zhuravel", "melamed", "durasov", "loginov", "klark"];
const GRID_CORE_IDS = ["mossakovsky", "aksenov", "netsenko", "zhichkin"];
const LOWER_TIER_IDS = ["pirozhkov", "shmelkov"];
const SECOND_VOICE_IDS = ["krestinin", "durasov", "koptev", "denisov", "melamed", "zhuravel", "rodnikov"];
const CAUCASUS_CLUB_RE = /(?:ахмат|динамо[\s-]*(?:2[\s-]*)?(?:махачкала|мх)|алания|анжи|спартак-нальчик|маш?ук|динамо\s+ставрополь)/i;
const CAUCASUS_PRIMARY_RE = /(?:ахмат|динамо[\s-]*(?:2[\s-]*)?(?:махачкала|мх))/i;
const BIG_CLUB_NAMES_RE = /^(?:зенит|спартак|цска|динамо москва|краснодар|локомотив)$/i;

export interface MatchAssignmentHints {
  derby?: boolean;
  rivalry?: boolean;
  finalMatch?: boolean;
  homeName?: string;
  awayName?: string;
  homePos?: number | null;
  awayPos?: number | null;
  homePower?: number | null;
  awayPower?: number | null;
  comp?: string | null;
}

export function resolveMatchCommentatorBooth(
  f: any,
  opts?: MatchAssignmentHints
): CommentatorBooth {
  const manualLead = getCommentatorById(f?.commentatorId);
  const manualCo = f?.coCommentatorId === "none" ? null : getCommentatorById(f?.coCommentatorId);
  if (manualLead) {
    const co = manualCo && manualCo.id !== manualLead.id ? manualCo : null;
    const duo = !!co;
    return {
      lead: manualLead,
      co,
      duo,
      label: duo ? `${manualLead.name} и ${co!.name}` : manualLead.name,
      shortLabel: duo ? `${manualLead.shortName} / ${co!.shortName}` : manualLead.shortName,
      manual: true,
      assignmentReason: "Назначено вручную"
    };
  }

  const hName = String(opts?.homeName || "").trim();
  const aName = String(opts?.awayName || "").trim();
  const comp = String(opts?.comp || f?.comp || "rpl").toLowerCase();
  const hPos = typeof opts?.homePos === "number" && opts.homePos > 0 ? opts.homePos : null;
  const aPos = typeof opts?.awayPos === "number" && opts.awayPos > 0 ? opts.awayPos : null;

  const isPrimaryCaucasus = CAUCASUS_PRIMARY_RE.test(hName) || CAUCASUS_PRIMARY_RE.test(aName);
  const isCaucasus = isPrimaryCaucasus || CAUCASUS_CLUB_RE.test(hName) || CAUCASUS_CLUB_RE.test(aName);
  const isCaucasusDerby = CAUCASUS_CLUB_RE.test(hName) && CAUCASUS_CLUB_RE.test(aName);

  const isBigStage = !!(
    opts?.derby ||
    opts?.rivalry ||
    opts?.finalMatch ||
    comp === "supercup" ||
    comp === "playoff" ||
    comp === "playoff_rpl_fnl" ||
    (comp === "cup" && ["rpl_playoff_qf", "rpl_playoff_sf", "regions_final", "superfinal"].includes(String(f?.cupStage || "")))
  );

  const hIsBig = BIG_CLUB_NAMES_RE.test(hName);
  const aIsBig = BIG_CLUB_NAMES_RE.test(aName);
  const marqueeNames = hIsBig && aIsBig;
  const oneBigClub = hIsBig || aIsBig;

  const bothTop6 = hPos !== null && aPos !== null && hPos <= 6 && aPos <= 6;
  const oneTop4OtherTop8 = hPos !== null && aPos !== null && ((hPos <= 4 && aPos <= 8) || (aPos <= 4 && hPos <= 8));
  const strongPowers = typeof opts?.homePower === "number" && typeof opts?.awayPower === "number" && opts.homePower >= 78 && opts.awayPower >= 78;

  const seedStr = `${f?.id || ""}:${f?.home || hName}:${f?.away || aName}:${f?.round || ""}`;
  const h = stableHash(seedStr);

  const isMainMarquee = isBigStage || bothTop6 || (oneTop4OtherTop8 && marqueeNames) || (comp === "rpl" && marqueeNames);
  const isTopTier = isMainMarquee || oneTop4OtherTop8 || strongPowers || (comp === "rpl" && oneBigClub && ((h % 100) < 35));

  const bothLowerHalf = hPos !== null && aPos !== null && hPos >= 9 && aPos >= 9;
  const preseasonLowerPairing = hPos === null && aPos === null && !oneBigClub && !isCaucasusDerby && ((h >>> 2) % 100) < 55;
  const isLowerMatch = !isTopTier && !isBigStage && (bothLowerHalf || preseasonLowerPairing || /^(fnl|2la|2lb|media)/.test(comp));

  // Determine main lead pool according to tier rules
  let leadPoolIds: string[];
  let assignmentReason = "Назначение по сетке тура";
  if (isMainMarquee) {
    // Главное внимание — четвёрка Нагучев, Трушечкин, Генич, Шнякин (плюс Черданцев на части афиш)
    leadPoolIds = (h % 10) < 8 ? BIG_FOUR_IDS : TOP_TIER_IDS;
    assignmentReason = "Главная вывеска / верхний ярус";
  } else if (isTopTier) {
    leadPoolIds = TOP_TIER_IDS;
    assignmentReason = "Матч верхнего яруса";
  } else if (isLowerMatch) {
    // Пирожков и Шмельков чаще получают середину и низ таблицы (~65%), остальные из сетки тура (~35%)
    leadPoolIds = (h % 100) < 65 ? LOWER_TIER_IDS : GRID_CORE_IDS;
    assignmentReason = "Матч середины / нижней части таблицы";
  } else {
    // По всей сетке тура: Моссаковский, Аксёнов, Неценко, Жичкин + остальные комментаторы сетки
    leadPoolIds = (h % 100) < 58 ? GRID_CORE_IDS : GRID_LEAD_IDS;
    assignmentReason = "Стандартная сетка тура";
  }

  const pickedLeadId = leadPoolIds[h % leadPoolIds.length];
  let lead = getCommentatorById(pickedLeadId) || COMMENTATORS[0];

  // Caucasus match special rule: connect Ибрагимов и Ахмадов ("их ставят на «Ахмат» и махачкалинское «Динамо»")
  let co: CommentatorProfile | null = null;
  if (isCaucasus) {
    const caucId = ((h >>> 3) % 2 === 0) ? "ibragimov" : "ahmadov";
    const otherCaucId = caucId === "ibragimov" ? "ahmadov" : "ibragimov";
    if (isCaucasusDerby) {
      lead = getCommentatorById(caucId)!;
      co = getCommentatorById(otherCaucId)!;
      assignmentReason = "Кавказский матч — региональная пара";
    } else if (isPrimaryCaucasus || (h % 100) < 85) {
      if (isTopTier) {
        // Big game involving Ахмат / Динамо Мх: top lead + Ибрагимов/Ахмадов in the booth
        co = getCommentatorById(caucId)!;
      } else if ((h % 100) < 40) {
        // Regional voice leads with a second voice or partner
        lead = getCommentatorById(caucId)!;
        const secPick = SECOND_VOICE_IDS[(h >>> 5) % SECOND_VOICE_IDS.length];
        co = (h % 3 === 0) ? getCommentatorById(otherCaucId) : getCommentatorById(secPick);
      } else {
        // Tour lead + Ибрагимов/Ахмадов connected to broadcast
        co = getCommentatorById(caucId)!;
      }
      assignmentReason = "Подключён региональный комментатор Северного Кавказа";
    }
  }

  // Regular second-voice pairing in the booth (полноценные напарники в кабине!)
  if (!co) {
    const shouldHaveSecond = isMainMarquee ? true : isTopTier ? ((h % 100) < 75) : isLowerMatch ? ((h % 100) < 28) : ((h % 100) < 55);
    if (shouldHaveSecond) {
      const candidates = SECOND_VOICE_IDS.filter((id) => id !== lead.id);
      const pickedCoId = candidates[(h >>> 4) % candidates.length];
      co = getCommentatorById(pickedCoId);
    }
  }

  const cleanCo = co && co.id !== lead.id ? co : null;
  return {
    lead,
    co: cleanCo,
    duo: !!cleanCo,
    label: cleanCo ? `${lead.name} и ${cleanCo.name}` : lead.name,
    shortLabel: cleanCo ? `${lead.shortName} / ${cleanCo.shortName}` : lead.shortName,
    manual: false,
    assignmentReason
  };
}

export function pubCommentatorBooth(booth: CommentatorBooth) {
  return {
    id: booth.lead.id,
    name: booth.lead.name,
    shortName: booth.lead.shortName,
    tier: booth.lead.tier,
    tierLabel: booth.lead.tierLabel,
    roleTitle: booth.lead.roleTitle,
    badge: booth.lead.badge,
    accent: booth.lead.accent,
    styleSummary: booth.lead.styleSummary,
    coId: booth.co?.id || null,
    coName: booth.co?.name || null,
    coShortName: booth.co?.shortName || null,
    coRoleTitle: booth.co?.roleTitle || null,
    coBadge: booth.co?.badge || null,
    duo: booth.duo,
    label: booth.label,
    shortLabel: booth.shortLabel,
    manual: booth.manual,
    assignmentReason: booth.assignmentReason || null
  };
}

export interface DisciplinaryProfile {
  tier: "calm" | "balanced" | "intense";
  foulsTarget: string;
  yellowTarget: string;
  redRule: string;
  refMood: string;
  allowStraightRedRate: number;
  yellowOnFoulProb: number;
  lightFoulRatioNote: string;
}

export function buildDisciplinaryProfile(ctx: any, isDerby: boolean, isRivalry: boolean, isFinal: boolean): DisciplinaryProfile {
  const head = ctx?.refereeCrew?.head;
  const bio = String(head?.bio || "").toLowerCase();
  const matches = Number(head?.matches || 0);
  const avgYc = matches > 0 ? Number(head?.yellows || 0) / matches : 3.8;
  const avgRc = matches > 0 ? Number(head?.reds || 0) / matches : 0.14;

  const tempH = String(ctx?.coaches?.home?.coach?.temperament || "").toLowerCase();
  const tempA = String(ctx?.coaches?.away?.coach?.temperament || "").toLowerCase();
  const spH = String(ctx?.lineup?.home?.speech || "").toLowerCase();
  const spA = String(ctx?.lineup?.away?.speech || "").toLowerCase();

  const strictRef = /строг|принципиал|жёстк|много карточ|не терп/i.test(bio) || avgYc >= 4.7 || avgRc >= 0.25;
  const softRef = /даёт играть|либераль|мягк|спокойн|редко достаёт/i.test(bio) || (matches >= 3 && avgYc <= 3.1);
  const heatedSpeech = /разорв|кость в кость|давить|жестко|жёстко|бить|ломать|агрессив/i.test(`${spH} ${spA}`);
  const hotTemp = /вспыльч|взрывн|эмоцион|буйн/i.test(`${tempH} ${tempA}`);

  if (isDerby || isFinal || (strictRef && (isRivalry || heatedSpeech))) {
    return {
      tier: "intense",
      foulsTarget: "22–31 фол на обе команды (из них 16–24 — обычные мелкие/тактические фолы БЕЗ карточки)",
      yellowTarget: "4–6 жёлтых карточек суммарно на обе команды (при сильной вязкости может быть 3)",
      redRule:
        "Прямые КК и вторые ЖК всё равно РЕДКИ (~20–25% даже в дерби, то есть в 3 из 4 дерби удалений НЕТ). Максимум 1 удаление за матч и ТОЛЬКО если игрок уже висел на ЖК или допустил действительно опасный фол / фол последней надежды. Тренерам КК не давай, кроме экстремального скандала.",
      refMood: strictRef
        ? `${head?.name || "Арбитр"} держит высокий градус строгости, но сначала предупреждает устно (verbal_warning) перед жёлтой.`
        : "Дерби/финал повышенной принципиальности — много мелких стыков и споров, но судья старается не ломать игру ранним удалением.",
      allowStraightRedRate: 0.011,
      yellowOnFoulProb: 0.19,
      lightFoulRatioNote: "минимум 75% фолов — обычные мелкие нарушения без карточки"
    };
  }

  if (softRef && !isRivalry && !heatedSpeech && !hotTemp) {
    return {
      tier: "calm",
      foulsTarget: "16–24 фола на обе команды (из них 13–20 — лёгкие позиционные фолы БЕЗ карточки)",
      yellowTarget: "1–3 жёлтые карточки за весь матч",
      redRule:
        "КРАСНЫЕ КАРТОЧКИ ПРАКТИЧЕСКИ ИСКЛЮЧЕНЫ (0 КК в ~90% подобных игр). Никаких удалений ради «остроты» — даже жёлтые арбитр достаёт только за явный срыв атаки или откровенную накладку.",
      refMood: `${head?.name || "Арбитр"} даёт командам бороться и играть в темпе, предпочитая устные внушения (verbal_warning) и свистки без лишнего размахивания карточками.`,
      allowStraightRedRate: 0.004,
      yellowOnFoulProb: 0.12,
      lightFoulRatioNote: "80–88% фолов — лёгкие фолы без карточки"
    };
  }

  return {
    tier: "balanced",
    foulsTarget: "18–27 фолов на обе команды (из них 14–22 — обычные мелкие фолы БЕЗ карточки)",
    yellowTarget: "2–5 жёлтых карточек суммарно на обе команды",
    redRule:
      "КРАСНЫЕ КАРТОЧКИ — РЕДКОСТЬ: в ~82–85% таких матчей игра заканчивается БЕЗ УДАЛЕНИЙ (0 КК). Вторая жёлтая или прямая красная возможна лишь в редких случаях по логике конкретной грубой ошибки или ФПН — НЕ суй красную в каждый матч!",
    refMood: `${head?.name || "Арбитр"} ведёт матч в сбалансированной манере: мелкие толчки, задержки за майку и фолы в атаке фиксирует обычным свистком без карточки, ЖК показывает за срыв перспективной атаки или грубость.`,
    allowStraightRedRate: 0.007,
    yellowOnFoulProb: 0.15,
    lightFoulRatioNote: "75–85% фолов — лёгкие/рабочие фолы без карточки"
  };
}

export function buildMatchFacts(
  ctx: any,
  helpers: {
    player: (id: string) => any;
    age: (p: any, date: string) => number | null;
    aggPlayers: () => Record<string, any>;
    tn: (tid: string) => string;
    date: string;
    compId: string | null;
    isDerby: boolean;
    isRivalry: boolean;
  }
): string[] {
  const facts: string[] = [];
  const { player, age, aggPlayers, date, compId } = helpers;
  const hName = ctx?.sides?.home?.name || "Хозяева";
  const aName = ctx?.sides?.away?.name || "Гости";
  const agMap = Object.values(aggPlayers() || {});

  if (ctx?.tableStandings?.home && ctx?.tableStandings?.away) {
    const hShort = String(ctx.tableStandings.home).split(", форма:")[0];
    const aShort = String(ctx.tableStandings.away).split(", форма:")[0];
    facts.push(`Турнирный расклад перед матчем: ${hName} — ${hShort}; ${aName} — ${aShort}.`);
  }

  if (ctx?.h2h?.recent?.length) {
    const last = ctx.h2h.recent[0];
    const sc = last.scorers?.length ? ` (отличились: ${last.scorers.slice(0, 3).join(", ")})` : "";
    facts.push(
      `Очная история (${ctx.h2h.total} матчей: ${hName} ${ctx.h2h.homeWins}В, ничьих ${ctx.h2h.draws}, ${aName} ${ctx.h2h.awayWins}В): в последний раз (${last.date}) сыграли ${last.homeName} ${last.score} ${last.awayName}${sc}.`
    );
  } else {
    facts.push(`Команды впервые сойдутся в официальном завершённом матче текущей симуляции — чистый лист очных встреч.`);
  }

  const allMatchPids = [
    ...(ctx?.lineup?.home?.starters || []),
    ...(ctx?.lineup?.home?.bench || []),
    ...(ctx?.lineup?.away?.starters || []),
    ...(ctx?.lineup?.away?.bench || [])
  ];
  const scoredRows: Array<{ p: any; sideName: string; g: number; a: number; m: number; cs: number }> = [];
  for (const pid of allMatchPids) {
    const p = player(pid);
    if (!p) continue;
    const row =
      agMap.find((x: any) => x.pid === pid && x.comp === (compId || "rpl")) ||
      agMap.find((x: any) => x.pid === pid && x.comp === "rpl");
    if (row && (row.g > 0 || row.a >= 2 || row.cs >= 2)) {
      const sideKey = ctx?.pidSide?.[pid];
      const sideName = sideKey === "away" ? aName : hName;
      scoredRows.push({ p, sideName, g: row.g || 0, a: row.a || 0, m: row.m || 0, cs: row.cs || 0 });
    }
  }
  scoredRows.sort((x, y) => y.g * 2 + y.a - (x.g * 2 + x.a));
  if (scoredRows.length) {
    const top = scoredRows[0];
    if (top.g > 0 || top.a > 0) {
      facts.push(
        `Главная ударная сила заявки: ${top.p.name} (${top.sideName}) — ${top.g} гол. и ${top.a} пас. в ${top.m} матчах этого сезона.`
      );
    }
  }

  const riskPlayers: string[] = [];
  if (compId) {
    for (const pid of allMatchPids) {
      const p = player(pid);
      if (!p) continue;
      const ycCycle = (p.ycByComp?.[compId] || 0) % 4;
      if (ycCycle === 3) {
        const sName = ctx?.pidSide?.[pid] === "away" ? aName : hName;
        riskPlayers.push(`${p.name} (${sName})`);
      }
    }
  }
  if (riskPlayers.length) {
    facts.push(`На грани дисквалификации (3 жёлтые из 4, следующая — пропуск матча): ${riskPlayers.slice(0, 4).join(", ")}.`);
  }

  const aged: Array<{ name: string; sideName: string; age: number }> = [];
  const loaned: string[] = [];
  const richBio: string[] = [];
  for (const pid of allMatchPids) {
    const p = player(pid);
    if (!p) continue;
    const sName = ctx?.pidSide?.[pid] === "away" ? aName : hName;
    const a = age(p, date);
    if (a && a >= 15 && a <= 45) aged.push({ name: p.name, sideName: sName, age: a });
    if (ctx?.loan?.[pid] && loaned.length < 2) {
      loaned.push(`${p.name} играет за ${sName} на правах аренды из клуба «${ctx.loan[pid]}»`);
    }
    if (richBio.length < 2 && Array.isArray(p.achievements) && p.achievements.length) {
      const ach = String(p.achievements[0]).trim();
      if (ach && ach.length >= 8) {
        richBio.push(`${p.name} (${sName}): ${ach}${p.realClub ? ` (в реальности — ${p.realClub})` : ""}`);
      }
    }
  }
  if (aged.length >= 2) {
    aged.sort((x, y) => x.age - y.age);
    const y = aged[0], o = aged[aged.length - 1];
    if (o.age - y.age >= 10) {
      facts.push(`Контраст поколений: самый юный в заявке — ${y.name} (${y.sideName}, ${y.age} лет), самый опытный — ${o.name} (${o.sideName}, ${o.age} лет).`);
    }
  }
  if (loaned.length) facts.push(`Арендная интрига: ${loaned.join("; ")}.`);
  if (richBio.length) facts.push(`Из биографий участников: ${richBio.join(" | ")}.`);

  const cH = ctx?.coaches?.home?.coach;
  const cA = ctx?.coaches?.away?.coach;
  if (cH && cA) {
    const fH = ctx?.lineup?.home?.formation || "4-3-3";
    const fA = ctx?.lineup?.away?.formation || "4-3-3";
    facts.push(
      `Дуэль тренеров: ${cH.name} (${hName}, схема ${fH}, стиль «${cH.styleTitle || cH.style}») против ${cA.name} (${aName}, схема ${fA}, стиль «${cA.styleTitle || cA.style}»).`
    );
  }

  const hRef = ctx?.refereeCrew?.head;
  if (hRef?.name) {
    const statLine = Number(hRef.matches || 0) > 0
      ? `(${hRef.matches} игр, ${hRef.yellows || 0} ЖК, ${hRef.reds || 0} КК, ${hRef.penalties || 0} пенальти)`
      : "(дебютный матч в этом сезоне симуляции)";
    facts.push(`Судейский штрих: главный арбитр ${hRef.name}${hRef.city ? ` из ${hRef.city}` : ""} ${statLine}${ctx.refereeCrew?.var ? `; на ВАР — ${ctx.refereeCrew.var}` : ""}.`);
  }

  if (ctx?.weather) {
    facts.push(`Условия игры на «${ctx.stadium || "стадионе"}»: ${ctx.weather}.`);
  }

  return facts.slice(0, 10);
}

export function buildVarPauseCommentaryBeat(
  cur: any,
  nxt: any,
  ctx: any,
  beatIdx: number,
  totalBeats: number,
  usedTexts?: Set<string>
) {
  const curLow = `${cur?.text || ""}`.toLowerCase();
  const combined = `${cur?.text || ""} ${nxt?.text || ""}`.toLowerCase();
  const hName = ctx?.sides?.home?.name || "хозяева";
  const aName = ctx?.sides?.away?.name || "гости";
  const hCoach = ctx?.coaches?.home?.coach?.name || `тренер ${hName}`;
  const aCoach = ctx?.coaches?.away?.coach?.name || `тренер ${aName}`;
  const headRef = ctx?.refereeCrew?.head?.name || "главный арбитр";
  const varRef = ctx?.refereeCrew?.var || "видеоассистент";
  const booth = ctx?.commentatorBooth || resolveMatchCommentatorBooth({});
  const leadName = booth?.lead?.shortName || "Комментатор";
  const coName = booth?.duo && booth?.co ? booth.co.shortName : null;
  const speakerA = leadName;
  const speakerB = coName || leadName;

  const playerHint = cur?.players?.[0] || nxt?.players?.[0] || "";
  const isMon = /монит|экран|бровк/i.test(curLow);
  const isOffside = /офсайд|лини|вне\s+игр/i.test(combined);
  const isHand = /рукой|рук[аеуо]|локт|кист/i.test(combined);
  const isRed = /красн|удален|груб|шипами|стык|прям/i.test(combined);
  const isPen = /пенальти|штрафн|точк|паден|симул|нырок/i.test(combined);

  const poolOffside = [
    { type: "commentator_intro", speaker: speakerA, text: `${speakerA} разбирает эпизод по раскадровке: «Смотрим первый кадр отрыва мяча от ноги пасующего${playerHint ? ` — бутса ${playerHint} на одной линии с пяткой крайнего защитника, по-моему, гол чистый!»` : " — мне кажется, атакующий успел задержаться на грани, хотя подождём проекцию»."}` },
    { type: "commentator_intro", speaker: speakerB, text: `${coName ? `${coName}: ` : `${speakerA}: `}«Обратите внимание не только на форварда, но и на игрока перед вратарём: перекрывает он обзор или нет? Лично мне видится пассивный офсайд без помехи киперу — хотя арбитр может счесть иначе».` },
    { type: "crowd", speaker: speakerA, text: `Трибуны гудят в нетерпении: пока ${varRef} сверяет точку касания и линию последнего защитника, капитаны ${hName} и ${aName} не отходят от ${headRef}.` },
    { type: "var", speaker: speakerA, text: `На экран трансляции выводят калибровочную сетку с разных камер — ключевой вопрос сейчас в том, был ли мяч задет от соперника или шёл прямым пасом.` },
    { type: "tactical_note", speaker: speakerB, text: `${coName ? `${coName}: ` : ""}«Линия обороны рискнула с искусственным офсайдом, но один шаг назад разрушил синхронность — вот от одного кадра сейчас и зависит итог».` }
  ];

  const poolHand = [
    { type: "commentator_intro", speaker: speakerB, text: `${coName ? `${coName}: ` : `${speakerA}: `}«Давайте честно: рука отставлена вверх, площадь тела увеличена — по нынешним трактовкам я практически уверен в пенальти, хотя расстояние было крошечным!»` },
    { type: "commentator_intro", speaker: speakerA, text: `${speakerA}: «А с камеры из-за ворот я вижу рикошет от собственного бедра прямо в прижатый локоть! На мой взгляд, здесь не за что ставить точку — ждём, что скажет ${headRef}».` },
    { type: "var", speaker: speakerA, text: `${varRef} крутит эпизод на разной скорости, чтобы понять: опорная это рука при падении в подкат или осознанный барьер на пути мяча.` },
    { type: "crowd", speaker: speakerA, text: `Игроки обеих команд обступили арбитра и спорят буквально на сантиметрах — свист и аплодисменты на стадионе сменяют друг друга каждые пять секунд.` }
  ];

  const poolPen = [
    { type: "commentator_intro", speaker: speakerB, text: `${coName ? `${coName}: ` : `${speakerA}: `}«Крупный план из-за ворот${playerHint ? ` по дуэли с ${playerHint}` : ""} очень красноречив: по мне, нападающий сам зацепился носком за уже стоявшую ногу защитника — я бы пенальти отменил!»` },
    { type: "commentator_intro", speaker: speakerA, text: `${speakerA}: «Не соглашусь! Посмотрите, как левое колено защитника перекрывает траекторию рывка — в динамике и на повторе для меня это явная подножка на точку!»` },
    { type: "crowd", speaker: speakerA, text: `${hCoach} и ${aCoach} эмоционально спорят с резервным арбитром у технической зоны, а трибуны давят свистом на бригаду.` },
    { type: "var", speaker: speakerA, text: `${varRef} проверяет сразу две вещи: где именно начался контакт — на линии штрафной или сантиметром раньше — и не было ли фола в начале этой атаки.` },
    { type: "tactical_note", speaker: speakerA, text: `Пока тянется пауза, вратари общаются с защитниками и проверяют перчатки, а штатные пенальтисты уже переглядываются у штрафной.` }
  ];

  const poolRed = [
    { type: "commentator_intro", speaker: speakerB, text: `${coName ? `${coName}: ` : `${speakerA}: `}«В замедленном повторе любой подкат выглядит пугающе, но посмотрите на ногу: он стелется по газону и убирает шипы в последний момент — на мой взгляд, это максимум жёлтая, а не удаление!»` },
    { type: "commentator_intro", speaker: speakerA, text: `${speakerA}: «А мне кажется, точка контакта слишком высоко над голеностопом — при такой скорости арбитр вполне может достать красную карточку!»` },
    { type: "crowd", speaker: speakerA, text: `Вокруг ${headRef} кипят страсти, капитаны пытаются развести одноклубников в стороны, чтобы не нахватать лишних жёлтых за споры.` },
    { type: "tactical_note", speaker: speakerA, text: `Запасные ${hName} и ${aName} поднялись с мест — возможное удаление способно перечеркнуть все стартовые задумки тренеров.` },
    { type: "var", speaker: speakerA, text: `Бригада на ВАР во главе с ${varRef} оценивает интенсивность стыка: шла ли нога прямой с риском травмы или это жёсткое игровое столкновение.` }
  ];

  const poolMon = [
    { type: "commentator_intro", speaker: speakerA, text: `${headRef} подошёл к экрану у боковой линии — прямо сейчас он сравнивает нормальную скорость эпизода и стоп-кадр касания.` },
    { type: "commentator_intro", speaker: speakerB, text: `${coName ? `${coName}: ` : `${speakerA}: `}«По тому, как долго ${headRef} пересматривает один и тот же ракурс, рискну предположить: он склоняется к изменению первоначального решения — посмотрим, совпадёт ли с нашим разбором!»` },
    { type: "tactical_note", speaker: speakerB, text: `${coName ? `${coName}: ` : ""}Пока ${headRef} изучает повтор у бровки, игроки ${hName} и ${aName} разминаются коротким пасом, чтобы не остыть.` },
    { type: "crowd", speaker: speakerA, text: `Решающие секунды у экрана: болельщики ловят каждое движение арбитра, тренеры в напряжении ждут жеста от бровки.` },
    { type: "var", speaker: speakerA, text: `${headRef} просит прокрутить момент с другого ракурса — нужна ясность по первому касанию до падения.` }
  ];

  const poolGen = [
    { type: "commentator_intro", speaker: speakerA, text: `${speakerA} разбирает детали момента: «С этого угла видно лёгкий толчок в спину за пару секунд до удара — честно говоря, я бы удивился, если бы ВАР это пропустил, но посмотрим трактовку судьи».` },
    { type: "commentator_intro", speaker: speakerB, text: `${coName ? `${coName}: ` : `${speakerA}: `}«Мне в динамике эпизод показался абсолютно игровым, без криминала — очень интересно, что именно насторожило видеоассистентов».` },
    { type: "crowd", speaker: speakerA, text: `Трибуны по-разному встречают затянувшуюся паузу: одна часть стадиона свистит, другая скандирует кричалки.` },
    { type: "var", speaker: speakerA, text: `${varRef} уточняет по радиосвязи детали эпизода на предмет предшествующего нарушения или касания мяча.` },
    { type: "tactical_note", speaker: speakerB, text: `${coName ? `${coName}: ` : ""}Обе команды используют паузу как мини-тайм-аут: защитники получают персональные подсказки от тренеров у бровки.` }
  ];

  const pool = isMon
    ? poolMon
    : isOffside
      ? poolOffside
      : isHand
        ? poolHand
        : isRed
          ? poolRed
          : isPen
            ? poolPen
            : poolGen;
  const fallbackPool = [...pool, ...poolGen, ...poolMon, ...poolPen, ...poolOffside, ...poolHand];
  const startIdx = Math.abs(Math.round((cur?.min || 1) * 11 + (cur?.sec || 0) * 3 + beatIdx * 5 + totalBeats)) % pool.length;
  let picked = pool[startIdx];
  if (usedTexts) {
    let foundUnused = null;
    for (let k = 0; k < pool.length; k++) {
      const cand = pool[(startIdx + k) % pool.length];
      if (!usedTexts.has(cand.text)) {
        foundUnused = cand;
        break;
      }
    }
    if (foundUnused) {
      picked = foundUnused;
    } else {
      const anyUnused = fallbackPool.find((x) => !usedTexts.has(x.text));
      if (anyUnused) picked = anyUnused;
    }
    usedTexts.add(picked.text);
  }
  const out: any = {
    type: picked.type,
    team: "none",
    players: [],
    pids: [],
    text: picked.text,
    varPause: true
  };
  if (booth?.duo && picked.speaker) out.speaker = picked.speaker;
  return out;
}

export function buildCommentatorPromptBlock(ctx: any, mode: "full" | "light" = "full"): string {
  const booth: CommentatorBooth = ctx?.commentatorBooth || resolveMatchCommentatorBooth({});
  const disc: DisciplinaryProfile = ctx?.disciplinaryProfile || buildDisciplinaryProfile(ctx, false, false, false);
  const facts: string[] = Array.isArray(ctx?.broadcastFacts) ? ctx.broadcastFacts : [];

  const lines: string[] = [];
  lines.push(`═══ ЖИВАЯ ТРАНСЛЯЦИЯ: КОММЕНТАТОРЫ, РЕАЛИЗМ ФОЛОВ, ФАКТЫ И ВАР ═══`);
  if (booth.duo && booth.co) {
    lines.push(
      `А. КАБИНА КОММЕНТАТОРОВ (ПОЛНОЦЕННЫЕ НАПАРНИКИ, а не «ведущий + гость в студии»): в эфире работают ${booth.lead.name} (${booth.lead.roleTitle}) и ${booth.co.name} (${booth.co.roleTitle}).`
    );
    lines.push(`• Голос ${booth.lead.shortName}: ${booth.lead.styleSummary} Стиль: ${booth.lead.speechRules}`);
    lines.push(`• Голос ${booth.co.shortName} (второй голос в кабине): ${booth.co.styleSummary} Стиль: ${booth.co.speechRules}`);
    lines.push(
      `• КАК ОНИ РАБОТАЮТ ВМЕСТЕ: Это два живых напарника у микрофонов в одной кабине! ${booth.lead.shortName} ведёт основной темп и атаки, ${booth.co.shortName} живо подхватывает эпизод, разбирает стыки, перестроения, VAR и подбрасывает факты — они переговариваются друг с другом прямо по ходу матча! Указывай поле "speaker": "${booth.lead.shortName}" или "${booth.co.shortName}" на репликах (особенно в "fact", "tactical_note", "commentator_intro", "var", "foul", "goal").`
    );
  } else {
    lines.push(`А. КОММЕНТАТОР МАТЧА: ${booth.lead.name} (${booth.lead.roleTitle}).`);
    lines.push(`• Фирменный стиль: ${booth.lead.styleSummary}`);
    lines.push(`• Как говорить: ${booth.lead.speechRules}`);
    lines.push(
      `• Ориентир интонации ${booth.lead.shortName}: «${booth.lead.soloSample}». Держи его живой авторский голос весь матч от первой до последней минуты!`
    );
  }

  lines.push(``);
  lines.push(`Б. ЖИВОЙ ЯЗЫК БЕЗ «БОТОВСКИХ ШАБЛОНОВ» (ОБЯЗАТЕЛЬНО):`);
  lines.push(
    `• ЗАПРЕЩЕНО повторять подряд однотипные конструкции вроде «Игрок Х отдал пас игроку Y», «Опасный момент у ворот», «Футболист пробил по воротам», «Нарушает правила против». Меняй синтаксис в каждом событии: то деталь борьбы корпуса в корпус, то жест тренера у бровки, то шум трибун, то обрыв мысли на перехвате («Режет угол, качнув защитника… нет, ставят корпус!»).`
  );
  lines.push(
    `• События на поле должны течь естественно: борьба за подбор, перевод с фланга на фланг, высокий прессинг, ошибки при приёме под давлением, мелкие остановки игры.`
  );

  lines.push(``);
  lines.push(`В. РЕАЛИСТИЧНОСТЬ ФОЛОВ, ЖЁЛТЫХ И КРАСНЫХ КАРТОЧЕК (${disc.tier.toUpperCase()}):`);
  lines.push(`• Настрой судейства на эту игру: ${disc.refMood}`);
  lines.push(`• Ориентир фолов на весь матч: ${disc.foulsTarget} (${disc.lightFoulRatioNote}).`);
  lines.push(
    `• ОБЫЧНЫЕ МЕЛКИЕ ФОЛЫ БЕЗ КАРТОЧКИ (~80% всех фолов!): обязательно показывай обычные рабочие нарушения без ЖК — лёгкий толчок в спину при приёме, зацеп за пятку на развороте, задержка за плечо в середине поля, неаккуратная накладка в борьбе за ничейный мяч, высоко поднятая нога, фол в атаке при верховой борьбе. Для таких эпизодов используй "foul" (и иногда "verbal_warning"), БЕЗ последующего события "yellow"!`
  );
  lines.push(`• Ориентир жёлтых карточек: ${disc.yellowTarget}.`);
  lines.push(`• ${disc.redRule}`);

  if (mode === "full") {
    lines.push(``);
    lines.push(`Г. УНИКАЛЬНОСТЬ ВАР И ЖИВОЙ РАЗБОР КОММЕНТАТОРАМИ (БЕЗ ШАБЛОННЫХ ФРАЗ):`);
    lines.push(
      `• ЗАПРЕЩЕНО повторять клише вроде «прикладывает палец к наушнику» или «крутят повторы с разных камер»! Каждый инцидент ВАР описывай по-своему — через живые детали самого момента (отскок от бедра в руку, касание мяча носком до контакта, перекрытие обзора киперу, точка попадания шипов, фол в начале голевой фазы, линия штрафной).`
    );
    lines.push(
      `• ОБЯЗАТЕЛЬНЫЙ РАЗБОР КОММЕНТАТОРАМИ И ПРАВО НА ОШИБКУ: во время паузы ВАР комментаторы сами детально разбирают спорный момент (что они видят на стоп-кадре и под каким углом) и озвучивают СВОЮ смелую оценку ДО вердикта арбитра! Причём их мнение НЕ обязано быть правильным — примерно в 35–45% случаев комментатор (или один из напарников в споре) ошибается в прогнозе, а после решения судьи честно реагирует в эфире («Признаю, я был уверен в пенальти, а с ракурса из-за ворот видно касание мяча!»).`
    );
    lines.push(
      `• Чередуй разные сценарии VAR-динамики:`
    );
    lines.push(
      `  1) Тихая быстрая проверка без длинной остановки (гол засчитан после короткой паузы в центре поля, либо мелкий спор разрешён без похода к экрану).`
    );
    lines.push(
      `  2) Проверка и ПОДТВЕРЖДЕНИЕ решения арбитра (гол остаётся в силе — мяч задел плечо/грудь; или пенальти не назначен — защитник сыграл в мяч; или исходная ЖК оставлена без красной).`
    );
    lines.push(
      `  3) Отмена гола по уникальной причине (сантиметровый офсайд плеча/буцы, пассивный офсайд с помехой вратарю, случайная рука автора гола, фол в отборе за 10–15 сек до взятия ворот).`
    );
    lines.push(
      `  4) Пересмотр у монитора в обе стороны: назначен пенальти / редкая КК ИЛИ наоборот отменён пенальти (+ возможная ЖК за симуляцию) / отменена прямая красная с заменой на жёлтую.`
    );
    lines.push(
      `• Во многих спокойных матчах обходись 0–1 вмешательством ВАР; 2 длинные проверки — редкость.`
    );
  }

  if (facts.length) {
    lines.push(``);
    lines.push(`Д. ИНТЕРЕСНЫЕ ФАКТЫ ДЛЯ ЖИВОГО ЭФИРА (используй в паузах, типом "fact", "tactical_note" или вплетая в комментарий):`);
    for (const fct of facts) {
      lines.push(`• ${fct}`);
    }
    lines.push(
      mode === "full"
        ? `• Вставь 2–4 события с типом "fact" (или органично вплети факты в комментарий во время пауз, аута, подготовки к стандарту или спокойного отрезка). Никогда не выдумывай статистику не из контекста!`
        : `• Упомяни в заметке (note) или ключевых событиях 1–2 реальных факта из списка выше (предыстория, серия, лидеры).`
    );
  }

  return lines.join("\n");
}

// ---------- Rich Fallback Phrases (when LLM is unavailable or fails) ----------

const LIGHT_FOUL_TEMPLATES = [
  (f: string, v: string) => `${f} слегка подталкивает ${v} в спину при борьбе за верховой мяч — мелкий рабочий фол в центре поля.`,
  (f: string, v: string) => `${f} опаздывает на полшага в отборе и цепляет ${v} за бутсу на развороте — свисток арбитра без карточки.`,
  (f: string, v: string) => `${f} придерживает ${v} за футболку, не давая развернуть быструю атаку — фол зафиксирован, играем дальше.`,
  (f: string, v: string) => `${f} ставит корпус неаккуратно и сбивает темп прорыва ${v} — обычный тактический фол на бровке.`,
  (f: string, v: string) => `Небольшая накладка со стороны ${f} в единоборстве против ${v} — арбитр сразу указывает на точку штрафного.`,
  (f: string, v: string) => `${f} высоко поднимает ногу в борьбе за подбор рядом с ${v} — свисток за опасную игру, но без жёлтой.`,
  (f: string, v: string) => `${f} в атаке слишком активно помогает себе руками против ${v} — мяч переходит сопернику.`,
  (f: string, v: string) => `Мелкий фол у центральной линии: ${f} задевает ${v} по голеностопу в попытке сыграть на опережение.`
];

const YELLOW_FOUL_TEMPLATES = [
  (f: string, v: string) => `${f} в жёстком подкате сбивает ${v}, срывая быстрый выход в контратаку — откровенный фол на предупреждение!`,
  (f: string, v: string) => `${f} срывает перспективный прорыв ${v}, прихватывая соперника руками за плечо — судья тянется к карману.`,
  (f: string, v: string) => `Опоздал в стык ${f} и неприятно врезался в ${v} на границе трети поля — жёсткое нарушение правил.`
];

const GENERIC_PASS_VARIANTS: Array<(p1: string, p2: string, tName: string, oppName: string) => string> = [
  (p1, p2, t) => `${p1} аккуратно уходит от прессинга и находит ${p2} между линиями — ${t} наращивает давление.`,
  (p1, p2, t) => `Спокойный контроль от ${t}: ${p1} переводит мяч на фланг к ${p2}, заставляя оборону смещаться.`,
  (p1, p2) => `${p1} ставит корпус, сохраняет мяч под давлением и отдаёт точный короткий пас на ${p2}.`,
  (p1, p2, t, o) => `${p1} бросает мяч по бровке на ход ${p2} — крайние защитники ${o} тут же сужают зону.`
];

const PASS_TEMPLATES: Record<string, Array<(p1: string, p2: string, tName: string, oppName: string) => string>> = {
  naguchev: [
    (p1, p2, t) => `${p1} выкручивается из-под опеки и тут же бросает мяч вперёд на ${p2} — ${t} старается завести темп!`,
    (p1, p2, t) => `Смотрите, как тонко ${p1} вырезает передачу по бровке на ${p2} — тренеры ${t} активно подсказывают с кромки.`,
    (p1, p2, t) => `${p1} мягким касанием отыгрывается с ${p2}, и ${t} уже разворачивает атаку на противоположный край.`
  ],
  genich: [
    (p1, p2, t) => `${p1} грамотно прикрывает мяч корпусом и выводит его из-под давления на ${p2} — очень зрелое решение для ${t}.`,
    (p1, p2) => `Передача в недодачу чуть тормозит темп, но ${p2} сам вытягивается на мяч после паса ${p1} и сохраняет владение.`,
    (p1, p2, t) => `${p1} читает открывание ${p2} между линиями — ${t} пробует вскрыть середину коротким розыгрышем.`
  ],
  shnyakin: [
    (p1, p2, t) => `${p1} находит свободным ${p2} в полуфланге — у ${t} сейчас именно через эту зону идёт большая часть остроты.`,
    (p1, p2) => `Неторопливый перепас: ${p1} возвращает мяч ${p2}, команда собирается с мыслями и ищет брешь в блоке.`,
    (p1, p2) => `${p1} диагональю переводит игру на ${p2}, заставляя оборону соперника смещаться по ширине поля.`
  ],
  minin: [
    (p1, p2, t) => `${p1} через короткую стенку с ${p2} отрезает первую линию прессинга — ${t} планомерно забирает территорию.`,
    (p1, p2) => `${p1} смещается в опорную, получает и переводит мяч в левый полуфланг на ${p2}, меняя вектор атаки.`,
    (p1, p2, t) => `${t} выстраивает позиционное наступление: ${p1} и ${p2} методично раскачивают оборонительный блок.`
  ],
  cherdantsev: [
    (p1, p2, t) => `${p1} разгоняет атаку! Точный пас вперёд на ${p2} — ${t} начинает давить на подступах к штрафной!`,
    (p1, p2) => `${p1} ищет обострение, катит мяч на ход ${p2} — трибуны сразу реагируют шумом!`,
    (p1, p2, t) => `Вязкая борьба за центр, ${p1} выцарапывает мяч и подключает ${p2} — ${t} снова в игре.`
  ],
  trushechkin: [
    (p1, p2, t) => `${p1} мягко опускает мяч на газон и отправляет его вдоль поля к ${p2} — дышит атака ${t}.`,
    (p1, p2) => `Спокойный обмен передачами между ${p1} и ${p2}: пауза в темпе, где каждый ждёт неосторожного шага соперника.`,
    (p1, p2, t) => `${p1} чувствует свободное пространство на краю и отправляет туда ${p2} — рисунок ${t} выстраивается неспешно.`
  ],
  aksenov: [
    (p1, p2, t) => `${p1} вырывается из жёсткой опеки и успевает сунуть мяч на ${p2} — ${t} не уступает в стыках.`,
    (p1, p2) => `${p1} и ${p2} вдвоём выходят из-под плотного прессинга на фланге, судья рядом всё контролирует.`,
    (p1, p2, t) => `${p1} отправляет мяч вперёд на ${p2}, заставляя защитников пятиться лицом к своим воротам — ${t} добавляет в движении.`
  ],
  mossakovsky: [
    (p1, p2, t) => `${p1} моментально вводит мяч в свободный коридор на ${p2} — скамейка ${t} требует ещё быстрее поднимать темп!`,
    (p1, p2) => `Чёткая комбинация на третьем: ${p1} сбрасывает на ${p2}, пока запасные вдоль бровки внимательно следят за игрой.`
  ],
  netsenko: [
    (p1, p2, t) => `${p1} отрезает двоих проникающим пасом на ${p2} в полуфланг — геометрия атаки ${t} сейчас работает безупречно.`,
    (p1, p2) => `${p1} и ${p2} разыгрывают треугольник на правом краю, вытягивая крайнего защитника из линии.`
  ],
  zhichkin: [
    (p1, p2, t) => `Плотный темп от ${t}: ${p1} первым касанием разворачивает атаку налево на ${p2}.`,
    (p1, p2) => `${p1} переводит мяч к штрафной на ${p2} — защитникам приходится быстро садиться к воротам.`
  ],
  zhuravel: [
    (p1, p2, t) => `Вот это интересно: ${p1} нестандартно пяткой оставляет мяч ${p2}, и у ${t} сразу появляется пространство!`,
    (p1, p2) => `${p1} ищет ${p2} на краю, одновременно оглядываясь на бровку — подсказ от тренера идёт постоянно.`
  ],
  melamed: [
    (p1, p2, t) => `${p1} без всякой суеты катит на ${p2} — пока остальные ищут драму, ${t} спокойно катает мяч в середине.`,
    (p1, p2) => `Лёгкий обыгрыш в стенку между ${p1} и ${p2}: красиво, но главное — мяч продвинулся на двадцать метров.`
  ],
  durasov: [
    (p1, p2, t) => `${p1} ускоряет перевод на ${p2}, и ${t} на хорошей скорости пересекает центральный круг!`,
    (p1, p2) => `Без лишних касаний ${p1} выводит ${p2} на свободный край — отличный ритм перехода!`
  ],
  loginov: [
    (p1, p2, t) => `${p1} надёжно контролирует мяч и подключает ${p2} на левом полуфланге — ${t} ищет подход к штрафной.`,
    (p1, p2) => `Грамотный розыгрыш через центр: ${p1} переводит на ${p2}, сохраняя баланс в опорной зоне.`
  ],
  klark: [
    (p1, p2, t) => `${p1} уверенно зовёт мяч, получает и переводит на ${p2} — видно, как команда поймала внутреннее спокойствие.`,
    (p1, p2, t) => `${p1} подбадривает партнёров жестом и находит передачей ${p2} — у ${t} сейчас живой рабочий настрой.`
  ],
  pirozhkov: [
    (p1, p2, t) => `${p1} в трудовой борьбе проталкивает мяч к ${p2} — в таких играх каждое точное действие на вес золота.`,
    (p1, p2) => `Неторопливый, но осмысленный выход из обороны: ${p1} находит ${p2} в свободной зоне.`
  ],
  shmelkov: [
    (p1, p2, t) => `${p1} с упорством пробирается вдоль бровки и переводит на ${p2} — ${t} старается закрепиться на чужой половине.`,
    (p1, p2) => `${p1} и ${p2} цепляются за каждый мяч в середине поля, не давая сопернику забрать инициативу.`
  ],
  ibragimov: [
    (p1, p2, t) => `${p1} на характере выигрывает позицию и тут же отправляет в прорыв ${p2} — трибуны заводятся!`,
    (p1, p2, t) => `Плотный темп: ${p1} заряжает передачу на ${p2}, ${t} высоко поджимает соперника.`
  ],
  ahmadov: [
    (p1, p2, t) => `${p1} цепко сохраняет мяч и без задержки выводит его на ${p2} — боевой темп держится на высоком уровне!`,
    (p1, p2, t) => `${p1} диагональю включает ${p2}, и ${t} на кураже идёт вперёд под рев трибун.`
  ]
};

export function pickCommentatorPassLine(
  commentatorId: string,
  p1: string,
  p2: string,
  tName: string,
  oppName: string,
  rVal: number
): string {
  const pool = PASS_TEMPLATES[commentatorId] || GENERIC_PASS_VARIANTS;
  const fn = pool[Math.floor(rVal * pool.length) % pool.length];
  return fn(p1, p2, tName, oppName);
}

export function pickRealisticFoulLine(isYellow: boolean, fName: string, vName: string, rVal: number): string {
  const pool = isYellow ? YELLOW_FOUL_TEMPLATES : LIGHT_FOUL_TEMPLATES;
  const fn = pool[Math.floor(rVal * pool.length) % pool.length];
  return fn(fName, vName);
}
