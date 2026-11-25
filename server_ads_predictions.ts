import type { Express, Request, Response } from 'express';
import crypto from 'crypto';

export interface AdsgramBlockDef {
  key: string;
  label: string;
  category: 'sponsors' | 'friendly' | 'predictions' | 'national' | 'interview' | 'transfers';
  format: 'long' | 'short' | 'banner' | 'click_long';
  durationSec: number;
  requiresClick: boolean;
  defaultBlockId: string;
  maxPerCycle: number;
}

export const ADSGRAM_BLOCKS: AdsgramBlockDef[] = [
  {
    key: 'sponsor_long',
    label: 'Спонсор 1 (Газпром Нефть) — Длинная реклама (30с, €750)',
    category: 'sponsors',
    format: 'long',
    durationSec: 30,
    requiresClick: false,
    defaultBlockId: '60557',
    maxPerCycle: 10,
  },
  {
    key: 'sponsor_short',
    label: 'Спонсор 2 (Т-Банк) — Короткая реклама (5с, €500)',
    category: 'sponsors',
    format: 'short',
    durationSec: 5,
    requiresClick: false,
    defaultBlockId: 'int-60559',
    maxPerCycle: 10,
  },
  {
    key: 'sponsor_banner',
    label: 'Спонсор 3 (Аэрофлот) — Баннерная реклама (€250)',
    category: 'sponsors',
    format: 'banner',
    durationSec: 5,
    requiresClick: false,
    defaultBlockId: 'task-60558',
    maxPerCycle: 10,
  },
  {
    key: 'rfs_bonus',
    label: 'Бонус от РФС — Премиум-реклама (€1 000 после 30/30)',
    category: 'sponsors',
    format: 'long',
    durationSec: 15,
    requiresClick: false,
    defaultBlockId: '60560',
    maxPerCycle: 30,
  },
  {
    key: 'friendly_request',
    label: 'Товарищеский матч — Подать заявку (большая реклама + клик)',
    category: 'friendly',
    format: 'click_long',
    durationSec: 30,
    requiresClick: true,
    defaultBlockId: '60564',
    maxPerCycle: 9,
  },
  {
    key: 'friendly_accept',
    label: 'Товарищеский матч — Принять приглашение (РПЛ)',
    category: 'friendly',
    format: 'short',
    durationSec: 10,
    requiresClick: false,
    defaultBlockId: 'int-60565',
    maxPerCycle: 30,
  },
  {
    key: 'nt_friendly_a',
    label: 'Матч со сборной России / U21 — Реклама 1 (лимит 30/сутки на блок, 100 на заявку)',
    category: 'friendly',
    format: 'long',
    durationSec: 15,
    requiresClick: false,
    defaultBlockId: '61002',
    maxPerCycle: 30,
  },
  {
    key: 'nt_friendly_b',
    label: 'Матч со сборной России / U21 — Реклама 2 (лимит 30/сутки на блок, 100 на заявку)',
    category: 'friendly',
    format: 'short',
    durationSec: 5,
    requiresClick: false,
    defaultBlockId: 'int-61004',
    maxPerCycle: 30,
  },
  {
    key: 'coins_short',
    label: 'Прогнозы — Быстрый пас (5с, +1 монета)',
    category: 'predictions',
    format: 'short',
    durationSec: 5,
    requiresClick: false,
    defaultBlockId: 'int-60561',
    maxPerCycle: 30,
  },
  {
    key: 'coins_banner',
    label: 'Прогнозы — Щит у поля (баннер, +2 монеты)',
    category: 'predictions',
    format: 'banner',
    durationSec: 5,
    requiresClick: false,
    defaultBlockId: 'task-60562',
    maxPerCycle: 30,
  },
  {
    key: 'coins_long',
    label: 'Прогнозы — Перерыв матча (30с, +3 монеты)',
    category: 'predictions',
    format: 'long',
    durationSec: 30,
    requiresClick: false,
    defaultBlockId: '60563',
    maxPerCycle: 30,
  },
  {
    key: 'nt_propose_player',
    label: 'Сборная России — Предложить игрока в сборную',
    category: 'national',
    format: 'short',
    durationSec: 10,
    requiresClick: false,
    defaultBlockId: '60566',
    maxPerCycle: 30,
  },
  {
    key: 'nt_vote_player',
    label: 'Сборная России — Голосовать за игрока в сборную',
    category: 'national',
    format: 'short',
    durationSec: 5,
    requiresClick: false,
    defaultBlockId: 'int-60568',
    maxPerCycle: 30,
  },
  {
    key: 'nt_propose_opp',
    label: 'Сборная России — Предложить соперника на матч',
    category: 'national',
    format: 'short',
    durationSec: 10,
    requiresClick: false,
    defaultBlockId: '60567',
    maxPerCycle: 30,
  },
  {
    key: 'nt_vote_opp',
    label: 'Сборная России — Голосовать за соперника сборной',
    category: 'national',
    format: 'short',
    durationSec: 5,
    requiresClick: false,
    defaultBlockId: 'int-60569',
    maxPerCycle: 30,
  },
  {
    key: 'nt_u21_propose_player',
    label: 'Сборная России U21 — Предложить игрока в сборную',
    category: 'national',
    format: 'short',
    durationSec: 10,
    requiresClick: false,
    defaultBlockId: '60931',
    maxPerCycle: 30,
  },
  {
    key: 'nt_u21_vote_player',
    label: 'Сборная России U21 — Голосовать за игрока в сборную',
    category: 'national',
    format: 'short',
    durationSec: 5,
    requiresClick: false,
    defaultBlockId: 'int-60569',
    maxPerCycle: 30,
  },
  {
    key: 'nt_u21_propose_opp',
    label: 'Сборная России U21 — Предложить соперника на матч',
    category: 'national',
    format: 'short',
    durationSec: 10,
    requiresClick: false,
    defaultBlockId: '60932',
    maxPerCycle: 30,
  },
  {
    key: 'nt_u21_vote_opp',
    label: 'Сборная России U21 — Голосовать за соперника сборной',
    category: 'national',
    format: 'short',
    durationSec: 5,
    requiresClick: false,
    defaultBlockId: 'int-60925',
    maxPerCycle: 30,
  },
  {
    key: 'interview_ask',
    label: 'Интервью после матча — Задать вопрос игроку',
    category: 'interview',
    format: 'short',
    durationSec: 5,
    requiresClick: false,
    defaultBlockId: 'int-60570',
    maxPerCycle: 50,
  },
  {
    key: 'transfer_request',
    label: 'Трансферы — Подача заявки на трансфер (РПЛ / Европа / Свободные агенты)',
    category: 'transfers',
    format: 'short',
    durationSec: 5,
    requiresClick: false,
    defaultBlockId: 'int-61173',
    maxPerCycle: 100,
  },
];

export interface SponsorConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  blockKey: 'sponsor_long' | 'sponsor_short' | 'sponsor_banner';
  formatLabel: string;
  rewardEur: number;
  maxViews: number;
  approvalRate: number;
  accentColor: string;
}

export const SPONSORS: SponsorConfig[] = [
  {
    id: 'gazprom_neft',
    name: 'Газпром Нефть',
    tagline: 'Генеральный энергетический партнёр',
    description: 'Крупный спонсорский транш за просмотр длинной рекламы. Высокая выплата при одобрении заявки.',
    blockKey: 'sponsor_long',
    formatLabel: 'Длинная реклама (30с)',
    rewardEur: 750,
    maxViews: 10,
    approvalRate: 0.95,
    accentColor: '#0284c7',
  },
  {
    id: 'tbank',
    name: 'Т-Банк',
    tagline: 'Официальный финансовый партнёр',
    description: 'Быстрое финансирование клуба за короткую 5-секундную рекламу. Оптимально по времени.',
    blockKey: 'sponsor_short',
    formatLabel: 'Короткая реклама (5с)',
    rewardEur: 500,
    maxViews: 10,
    approvalRate: 0.95,
    accentColor: '#ca8a04',
  },
  {
    id: 'aeroflot',
    name: 'Аэрофлот',
    tagline: 'Официальный авиаперевозчик лиги',
    description: 'Базовая спонсорская поддержка за просмотр рекламного баннера перед выездными матчами.',
    blockKey: 'sponsor_banner',
    formatLabel: 'Баннерная реклама',
    rewardEur: 250,
    maxViews: 10,
    approvalRate: 0.95,
    accentColor: '#1d4ed8',
  },
];

const CYCLE_MS = 24 * 60 * 60 * 1000;
const AD_COOLDOWN_MS = 2 * 60 * 1000;
const TRANSFER_COOLDOWN_MS = 60 * 1000;
const FRIENDLY_BREAK_LIMIT = 9;
const STARTER_COINS = 5;
const RFS_REQUIRED_VIEWS = 30;
const PREDICTION_AD_MAX_PER_CYCLE = 30;
const NATIONAL_AD_MAX_PER_DAY = 30;

function getCooldownLeftMs(lastAt: any): number {
  const ts = Number(lastAt || 0);
  if (!ts) return 0;
  return Math.max(0, ts + AD_COOLDOWN_MS - Date.now());
}

/* ───────── Товарищеский матч со сборной России / U21: 100 реклам ─────────
   Два блока (nt_friendly_a и nt_friendly_b) начисляются в общий счётчик клуба (st.points).
   Лимит — 30 просмотров за 24 часа на КАЖДЫЙ блок отдельно, пауза между просмотрами блока — 3 минуты.
   Просмотры накапливаются на счёте клуба (в том числе свыше 100) и списываются только при подаче заявки (100).
   При отказе, отклонении, отзыве или истечении заявки возвращается 80 просмотров (а не 100). */
export const NT_FRIENDLY_BLOCK_KEYS = ['nt_friendly_a', 'nt_friendly_b'] as const;
export const NT_FRIENDLY_REQUIRED_ADS = 100;
export const NT_FRIENDLY_REFUND_ADS = 80;
export const NT_FRIENDLY_DAILY_LIMIT = 30;
export const NT_FRIENDLY_COOLDOWN_MS = 3 * 60 * 1000;

function ensureNtFriendlyState(db: any, teamId: string) {
  db.ntFriendlyAds ||= {};
  let st = db.ntFriendlyAds[teamId];
  if (!st || typeof st !== 'object') {
    st = { points: 0, total: 0, spent: 0, byBlock: {}, blockCycles: {}, cycleStartedAt: 0, dayViews: 0, lastAdAt: 0 };
    db.ntFriendlyAds[teamId] = st;
  }
  const now = Date.now();
  st.points = Math.max(0, Number(st.points || 0));
  st.total = Math.max(0, Number(st.total || 0));
  st.spent = Math.max(0, Number(st.spent || 0));
  st.lastAdAt = Number(st.lastAdAt || 0);
  st.byBlock ||= {};

  if (!st.blockCycles || typeof st.blockCycles !== 'object') {
    st.blockCycles = {};
    const legacyActive = Number(st.cycleStartedAt || 0) > 0 && now - Number(st.cycleStartedAt) < CYCLE_MS;
    const legacyDayViews = legacyActive ? Math.max(0, Number(st.dayViews || 0)) : 0;
    for (const bk of NT_FRIENDLY_BLOCK_KEYS) {
      const seeded = legacyActive
        ? Math.min(NT_FRIENDLY_DAILY_LIMIT, legacyDayViews, Math.max(0, Number(st.byBlock[bk] || 0)))
        : 0;
      st.blockCycles[bk] = {
        cycleStartedAt: seeded > 0 ? Number(st.cycleStartedAt || 0) : 0,
        dayViews: seeded,
        lastAdAt: seeded > 0 ? st.lastAdAt : 0,
      };
    }
  }

  for (const bk of NT_FRIENDLY_BLOCK_KEYS) {
    let bc = st.blockCycles[bk];
    if (!bc || typeof bc !== 'object') {
      bc = { cycleStartedAt: 0, dayViews: 0, lastAdAt: 0 };
      st.blockCycles[bk] = bc;
    }
    bc.cycleStartedAt = Number(bc.cycleStartedAt || 0);
    bc.dayViews = Math.max(0, Number(bc.dayViews || 0));
    bc.lastAdAt = Number(bc.lastAdAt || 0);
    if (bc.cycleStartedAt > 0 && now - bc.cycleStartedAt >= CYCLE_MS) {
      bc.cycleStartedAt = 0;
      bc.dayViews = 0;
      bc.lastAdAt = 0;
    }
  }
  return st;
}

export function getNtFriendlyAdSummary(db: any, teamId: string) {
  const st = ensureNtFriendlyState(db, teamId);
  const now = Date.now();
  const blocks: Record<string, {
    blockKey: string;
    dailyLimit: number;
    dailyUsed: number;
    limitReached: boolean;
    limitResetsAt: number | null;
    cooldownMs: number;
    cooldownRemainingMs: number;
    nextAvailableAt: number | null;
    totalViews: number;
  }> = {};

  let totalDailyUsed = 0;
  let allLimitsReached = true;
  let minCdLeft = 0;
  let hasReadyBlock = false;

  for (const bk of NT_FRIENDLY_BLOCK_KEYS) {
    const bc = st.blockCycles[bk];
    const dailyUsed = Math.min(NT_FRIENDLY_DAILY_LIMIT, bc.dayViews);
    const limitReached = dailyUsed >= NT_FRIENDLY_DAILY_LIMIT;
    const cdLeft = limitReached ? 0 : (bc.lastAdAt ? Math.max(0, bc.lastAdAt + NT_FRIENDLY_COOLDOWN_MS - now) : 0);
    totalDailyUsed += dailyUsed;
    if (!limitReached) {
      allLimitsReached = false;
      if (cdLeft === 0) hasReadyBlock = true;
      else if (minCdLeft === 0 || cdLeft < minCdLeft) minCdLeft = cdLeft;
    }
    blocks[bk] = {
      blockKey: bk,
      dailyLimit: NT_FRIENDLY_DAILY_LIMIT,
      dailyUsed,
      limitReached,
      limitResetsAt: limitReached && bc.cycleStartedAt ? bc.cycleStartedAt + CYCLE_MS : null,
      cooldownMs: NT_FRIENDLY_COOLDOWN_MS,
      cooldownRemainingMs: cdLeft,
      nextAvailableAt: cdLeft > 0 ? now + cdLeft : null,
      totalViews: Number(st.byBlock[bk] || 0),
    };
  }

  const effectiveCd = hasReadyBlock ? 0 : minCdLeft;

  return {
    required: NT_FRIENDLY_REQUIRED_ADS,
    refundAds: NT_FRIENDLY_REFUND_ADS,
    points: st.points,
    total: st.total,
    spent: st.spent,
    ready: st.points >= NT_FRIENDLY_REQUIRED_ADS,
    dailyLimit: NT_FRIENDLY_DAILY_LIMIT,
    dailyUsed: totalDailyUsed,
    limitReached: allLimitsReached,
    limitResetsAt: null,
    cooldownMs: NT_FRIENDLY_COOLDOWN_MS,
    cooldownRemainingMs: effectiveCd,
    nextAvailableAt: effectiveCd > 0 ? now + effectiveCd : null,
    blocks,
    byBlock: { ...st.byBlock },
    blockKeys: [...NT_FRIENDLY_BLOCK_KEYS],
  };
}

export function checkNtFriendlyAdAllowed(
  db: any,
  teamId: string,
  blockKey?: string
): { ok: true } | { ok: false; error: string } {
  const st = ensureNtFriendlyState(db, teamId);
  const bk = (NT_FRIENDLY_BLOCK_KEYS as readonly string[]).includes(String(blockKey || ''))
    ? (blockKey as (typeof NT_FRIENDLY_BLOCK_KEYS)[number])
    : null;
  if (blockKey && !bk) {
    return { ok: false, error: 'Неизвестный рекламный блок для матча со сборной.' };
  }
  const keysToCheck = bk ? [bk] : [...NT_FRIENDLY_BLOCK_KEYS];
  let lastErr = '';
  for (const k of keysToCheck) {
    const bc = st.blockCycles[k];
    if (bc.dayViews >= NT_FRIENDLY_DAILY_LIMIT) {
      lastErr = `Дневной лимит этого блока исчерпан (${NT_FRIENDLY_DAILY_LIMIT}/${NT_FRIENDLY_DAILY_LIMIT}). Можно смотреть другой блок или дождаться обновления лимита.`;
      continue;
    }
    const cdLeft = bc.lastAdAt ? Math.max(0, bc.lastAdAt + NT_FRIENDLY_COOLDOWN_MS - Date.now()) : 0;
    if (cdLeft > 0) {
      lastErr = `Перерыв между просмотрами этого блока: подождите ещё ${fmtCooldownWords(cdLeft)}.`;
      continue;
    }
    return { ok: true };
  }
  return { ok: false, error: lastErr || 'Реклама временно недоступна.' };
}

/** Засчитывает один просмотр (adProof от /api/ads/complete) на счёт клуба. */
export function creditNtFriendlyAd(
  ctx: AdServerContext,
  teamId: string,
  blockKey: string,
  actorKey: string,
  adProof?: string
): { ok: true } | { ok: false; error: string } {
  const db = ctx.getDb();
  if (!(NT_FRIENDLY_BLOCK_KEYS as readonly string[]).includes(blockKey)) {
    return { ok: false, error: 'Неизвестный рекламный блок для матча со сборной.' };
  }
  const chk = checkNtFriendlyAdAllowed(db, teamId, blockKey);
  if (!chk.ok) return chk;
  const v = verifyAndConsumeAdProof(adProof, blockKey, actorKey, false, actorKey.startsWith('club:') ? 'admin' : undefined);
  if (!v.ok) return v;
  const st = ensureNtFriendlyState(db, teamId);
  const bc = st.blockCycles[blockKey];
  const now = Date.now();
  if (!bc.cycleStartedAt) bc.cycleStartedAt = now;
  bc.dayViews += 1;
  bc.lastAdAt = now;
  st.points += 1;
  st.total += 1;
  st.lastAdAt = now;
  st.byBlock[blockKey] = Number(st.byBlock[blockKey] || 0) + 1;
  pushAdEvent(ctx, {
    type: 'credit',
    blockKey,
    blockId: getAdsgramBlocks(db)[blockKey] || blockKey,
    actorKey,
    detail: `Матч со сборной (${blockKey}): на счёте клуба ${st.points} просм. (блок ${bc.dayViews}/${NT_FRIENDLY_DAILY_LIMIT})`,
  });
  return { ok: true };
}

/** Списывает 100 просмотров со счёта клуба при подаче заявки. */
export function spendNtFriendlyAds(db: any, teamId: string): { ok: true } | { ok: false; error: string } {
  const st = ensureNtFriendlyState(db, teamId);
  if (st.points < NT_FRIENDLY_REQUIRED_ADS) {
    return { ok: false, error: `Для заявки нужно ${NT_FRIENDLY_REQUIRED_ADS} просмотров рекламы, на счёте клуба ${st.points}.` };
  }
  st.points -= NT_FRIENDLY_REQUIRED_ADS;
  st.spent += NT_FRIENDLY_REQUIRED_ADS;
  return { ok: true };
}

/** Возвращает 80 просмотров на счёт клуба, если заявка отклонена / отозвана / истекла. */
export function refundNtFriendlyAds(db: any, teamId: string) {
  const st = ensureNtFriendlyState(db, teamId);
  st.points += NT_FRIENDLY_REFUND_ADS;
  st.spent = Math.max(0, st.spent - NT_FRIENDLY_REFUND_ADS);
}

function fmtCooldownWords(ms: number): string {
  const sec = Math.max(1, Math.ceil(ms / 1000));
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m > 0 ? `${m} мин ${String(s).padStart(2, '0')} сек` : `${s} сек`;
}

const SEASON_PRIZES = [
  {
    place: 1,
    label: '1 место',
    prizeEur: 1_250_000,
    prizeCoins: 10,
    hasCup: true,
    cupTitle: 'Кубок победителя Лиги прогнозов',
    badge: '🏆 Кубок победителя Лиги прогнозов',
  },
  {
    place: 2,
    label: '2 место',
    prizeEur: 500_000,
    prizeCoins: 5,
    hasCup: false,
    cupTitle: '',
    badge: '🥈 2 место Лиги прогнозов',
  },
  {
    place: 3,
    label: '3 место',
    prizeEur: 250_000,
    prizeCoins: 3,
    hasCup: false,
    cupTitle: '',
    badge: '🥉 3 место Лиги прогнозов',
  },
];

export interface AdServerContext {
  getDb: () => any;
  save: () => void;
  S: () => string;
  team: (id: string) => any;
  tn: (id: string) => string;
  teamLogo: (id: string) => string;
  player: (id: string) => any;
  getMatch?: (id: string) => any;
  uid: () => string;
  needClub: (req: Request, res: Response, next: () => void) => void;
  admin: (req: Request, res: Response, next: () => void) => void;
  fail: (res: Response, msg: string, code?: number) => void;
  cleanTxt: (v: any, max?: number) => string;
  ensureNationalTeam: (teamType?: 'main' | 'u21') => any;
  ageOfPlayer?: (p: any) => number | null;
  ensureInitialBudgets: () => void;
  compName: (id: string) => string;
  getTgBotToken?: () => string;
  getSiteUrl?: () => string;
}

export type PredictionMarketGroup = 'main' | 'goals' | 'halves' | 'stats' | 'exact';

export interface PredictionMarketOption {
  pick: string;
  label: string;
  shortLabel: string;
  odd: number;
  basePts: number;
}

export interface PredictionMarketDef {
  id: string;
  group: PredictionMarketGroup;
  title: string;
  subtitle: string;
  options: PredictionMarketOption[];
}

export const PREDICTION_MARKETS: PredictionMarketDef[] = [
  {
    id: 'outcome',
    group: 'main',
    title: 'Исход матча',
    subtitle: 'Основное время (П1 / Х / П2)',
    options: [
      { pick: '1', label: 'П1 (Хозяева)', shortLabel: 'П1', odd: 1.32, basePts: 2 },
      { pick: 'X', label: 'Ничья (Х)', shortLabel: 'Х', odd: 1.40, basePts: 2 },
      { pick: '2', label: 'П2 (Гости)', shortLabel: 'П2', odd: 1.41, basePts: 2 },
    ],
  },
  {
    id: 'double_chance',
    group: 'main',
    title: 'Двойной шанс',
    subtitle: 'Перестраховка исхода',
    options: [
      { pick: '1X', label: '1Х (Хозяева не проиграют)', shortLabel: '1Х', odd: 1.15, basePts: 2 },
      { pick: '12', label: '12 (Без ничьей)', shortLabel: '12', odd: 1.16, basePts: 2 },
      { pick: 'X2', label: 'Х2 (Гости не проиграют)', shortLabel: 'Х2', odd: 1.24, basePts: 2 },
    ],
  },
  {
    id: 'hcp_0',
    group: 'main',
    title: 'Фора (0)',
    subtitle: 'Возврат ставки при ничьей',
    options: [
      { pick: 'f1_0', label: 'Фора 1 (0)', shortLabel: 'Ф1 (0)', odd: 1.21, basePts: 2 },
      { pick: 'f2_0', label: 'Фора 2 (0)', shortLabel: 'Ф2 (0)', odd: 1.35, basePts: 2 },
    ],
  },
  {
    id: 'hcp_m10',
    group: 'main',
    title: 'Фора (-1.0 / +1.0)',
    subtitle: 'Возврат при разнице ровно 1 мяч',
    options: [
      { pick: 'f1_m10', label: 'Фора 1 (-1.0)', shortLabel: 'Ф1 (-1.0)', odd: 1.39, basePts: 2 },
      { pick: 'f2_p10', label: 'Фора 2 (+1.0)', shortLabel: 'Ф2 (+1.0)', odd: 1.17, basePts: 2 },
    ],
  },
  {
    id: 'hcp_m15',
    group: 'main',
    title: 'Фора (-1.5 / +1.5)',
    subtitle: 'Победа в 2+ гола или удержание',
    options: [
      { pick: 'f1_m15', label: 'Фора 1 (-1.5)', shortLabel: 'Ф1 (-1.5)', odd: 1.42, basePts: 2 },
      { pick: 'f2_p15', label: 'Фора 2 (+1.5)', shortLabel: 'Ф2 (+1.5)', odd: 1.13, basePts: 2 },
    ],
  },
  {
    id: 'hcp_p10',
    group: 'main',
    title: 'Фора (+1.0 / -1.0)',
    subtitle: 'Возврат при победе гостей в 1 мяч',
    options: [
      { pick: 'f1_p10', label: 'Фора 1 (+1.0)', shortLabel: 'Ф1 (+1.0)', odd: 1.11, basePts: 2 },
      { pick: 'f2_m10', label: 'Фора 2 (-1.0)', shortLabel: 'Ф2 (-1.0)', odd: 1.44, basePts: 2 },
    ],
  },
  {
    id: 'hcp_p15',
    group: 'main',
    title: 'Фора (+1.5 / -1.5)',
    subtitle: 'Удержание хозяев или разгром гостей',
    options: [
      { pick: 'f1_p15', label: 'Фора 1 (+1.5)', shortLabel: 'Ф1 (+1.5)', odd: 1.09, basePts: 2 },
      { pick: 'f2_m15', label: 'Фора 2 (-1.5)', shortLabel: 'Ф2 (-1.5)', odd: 1.46, basePts: 2 },
    ],
  },
  {
    id: 'total_1_5',
    group: 'main',
    title: 'Тотал голов 1.5',
    subtitle: 'Суммарно забито в матче',
    options: [
      { pick: 'over_1_5', label: 'Тотал больше 1.5', shortLabel: 'ТБ 1.5', odd: 1.16, basePts: 2 },
      { pick: 'under_1_5', label: 'Тотал меньше 1.5', shortLabel: 'ТМ 1.5', odd: 1.40, basePts: 2 },
    ],
  },
  {
    id: 'total_2_0',
    group: 'main',
    title: 'Тотал голов 2.0',
    subtitle: 'Возврат при ровно 2 голах',
    options: [
      { pick: 'over_2_0', label: 'Тотал больше 2.0', shortLabel: 'ТБ 2.0', odd: 1.21, basePts: 2 },
      { pick: 'under_2_0', label: 'Тотал меньше 2.0', shortLabel: 'ТМ 2.0', odd: 1.35, basePts: 2 },
    ],
  },
  {
    id: 'total_goals',
    group: 'main',
    title: 'Тотал голов 2.5',
    subtitle: 'Классический тотал матча',
    options: [
      { pick: 'over_2_5', label: 'Тотал больше 2.5', shortLabel: 'ТБ 2.5', odd: 1.29, basePts: 2 },
      { pick: 'under_2_5', label: 'Тотал меньше 2.5', shortLabel: 'ТМ 2.5', odd: 1.28, basePts: 2 },
    ],
  },
  {
    id: 'total_3_0',
    group: 'main',
    title: 'Тотал голов 3.0',
    subtitle: 'Возврат при ровно 3 голах',
    options: [
      { pick: 'over_3_0', label: 'Тотал больше 3.0', shortLabel: 'ТБ 3.0', odd: 1.36, basePts: 2 },
      { pick: 'under_3_0', label: 'Тотал меньше 3.0', shortLabel: 'ТМ 3.0', odd: 1.20, basePts: 2 },
    ],
  },
  {
    id: 'total_3_5',
    group: 'main',
    title: 'Тотал голов 3.5',
    subtitle: 'Верховой или закрытый матч',
    options: [
      { pick: 'over_3_5', label: 'Тотал больше 3.5', shortLabel: 'ТБ 3.5', odd: 1.40, basePts: 2 },
      { pick: 'under_3_5', label: 'Тотал меньше 3.5', shortLabel: 'ТМ 3.5', odd: 1.16, basePts: 2 },
    ],
  },
  {
    id: 'btts',
    group: 'main',
    title: 'Обе забьют',
    subtitle: 'Голы обеих команд в матче',
    options: [
      { pick: 'yes', label: 'Обе забьют: Да', shortLabel: 'ОЗ Да', odd: 1.28, basePts: 2 },
      { pick: 'no', label: 'Обе забьют: Нет', shortLabel: 'ОЗ Нет', odd: 1.29, basePts: 2 },
    ],
  },
  {
    id: 'it1_0_5',
    group: 'goals',
    title: 'Инд. тотал Хозяев 0.5',
    subtitle: 'Забьют ли хозяева',
    options: [
      { pick: 'over_0_5', label: 'ИТ1 Б 0.5', shortLabel: 'ИТ1 Б 0.5', odd: 1.13, basePts: 2 },
      { pick: 'under_0_5', label: 'ИТ1 М 0.5', shortLabel: 'ИТ1 М 0.5', odd: 1.43, basePts: 2 },
    ],
  },
  {
    id: 'it1_1_5',
    group: 'goals',
    title: 'Инд. тотал Хозяев 1.5',
    subtitle: '2+ гола хозяев',
    options: [
      { pick: 'over_1_5', label: 'ИТ1 Б 1.5', shortLabel: 'ИТ1 Б 1.5', odd: 1.32, basePts: 2 },
      { pick: 'under_1_5', label: 'ИТ1 М 1.5', shortLabel: 'ИТ1 М 1.5', odd: 1.24, basePts: 2 },
    ],
  },
  {
    id: 'it2_0_5',
    group: 'goals',
    title: 'Инд. тотал Гостей 0.5',
    subtitle: 'Забьют ли гости',
    options: [
      { pick: 'over_0_5', label: 'ИТ2 Б 0.5', shortLabel: 'ИТ2 Б 0.5', odd: 1.18, basePts: 2 },
      { pick: 'under_0_5', label: 'ИТ2 М 0.5', shortLabel: 'ИТ2 М 0.5', odd: 1.38, basePts: 2 },
    ],
  },
  {
    id: 'it2_1_5',
    group: 'goals',
    title: 'Инд. тотал Гостей 1.5',
    subtitle: '2+ гола гостей',
    options: [
      { pick: 'over_1_5', label: 'ИТ2 Б 1.5', shortLabel: 'ИТ2 Б 1.5', odd: 1.39, basePts: 2 },
      { pick: 'under_1_5', label: 'ИТ2 М 1.5', shortLabel: 'ИТ2 М 1.5', odd: 1.17, basePts: 2 },
    ],
  },
  {
    id: 'first_goal',
    group: 'goals',
    title: 'Первый гол в матче',
    subtitle: 'Кто откроет счёт',
    options: [
      { pick: 'home', label: 'Первый гол: Хозяева', shortLabel: '1-й гол К1', odd: 1.26, basePts: 2 },
      { pick: 'none', label: 'Голов не будет (0:0)', shortLabel: 'Без голов', odd: 1.48, basePts: 2 },
      { pick: 'away', label: 'Первый гол: Гости', shortLabel: '1-й гол К2', odd: 1.34, basePts: 2 },
    ],
  },
  {
    id: 'both_halves_goal',
    group: 'goals',
    title: 'Голы в обоих таймах',
    subtitle: 'Минимум по 1 голу в 1Т и 2Т',
    options: [
      { pick: 'yes', label: 'Голы в обоих таймах: Да', shortLabel: 'Оба тайма Да', odd: 1.27, basePts: 2 },
      { pick: 'no', label: 'Голы в обоих таймах: Нет', shortLabel: 'Оба тайма Нет', odd: 1.30, basePts: 2 },
    ],
  },
  {
    id: 'combo_w_total',
    group: 'goals',
    title: 'Комбо: Исход + Тотал',
    subtitle: 'Двойное условие на матч',
    options: [
      { pick: '1_over15', label: 'П1 и ТБ 1.5', shortLabel: 'П1 и ТБ 1.5', odd: 1.36, basePts: 2 },
      { pick: '1_over25', label: 'П1 и ТБ 2.5', shortLabel: 'П1 и ТБ 2.5', odd: 1.41, basePts: 2 },
      { pick: '1_under25', label: 'П1 и ТМ 2.5', shortLabel: 'П1 и ТМ 2.5', odd: 1.44, basePts: 2 },
      { pick: '2_over15', label: 'П2 и ТБ 1.5', shortLabel: 'П2 и ТБ 1.5', odd: 1.43, basePts: 2 },
      { pick: '2_over25', label: 'П2 и ТБ 2.5', shortLabel: 'П2 и ТБ 2.5', odd: 1.46, basePts: 2 },
      { pick: '2_under25', label: 'П2 и ТМ 2.5', shortLabel: 'П2 и ТМ 2.5', odd: 1.48, basePts: 2 },
      { pick: '1x_over15', label: '1Х и ТБ 1.5', shortLabel: '1Х и ТБ 1.5', odd: 1.25, basePts: 2 },
      { pick: 'x2_over15', label: 'Х2 и ТБ 1.5', shortLabel: 'Х2 и ТБ 1.5', odd: 1.34, basePts: 2 },
      { pick: 'x_under25', label: 'Ничья и ТМ 2.5', shortLabel: 'Х и ТМ 2.5', odd: 1.43, basePts: 2 },
    ],
  },
  {
    id: 'combo_w_btts',
    group: 'goals',
    title: 'Комбо: Исход + Обе забьют',
    subtitle: 'Исход с условием по голам обеих команд',
    options: [
      { pick: '1_btts_y', label: 'П1 и ОЗ — Да', shortLabel: 'П1 и ОЗ Да', odd: 1.43, basePts: 2 },
      { pick: '1_btts_n', label: 'П1 и ОЗ — Нет', shortLabel: 'П1 и ОЗ Нет', odd: 1.41, basePts: 2 },
      { pick: '2_btts_y', label: 'П2 и ОЗ — Да', shortLabel: 'П2 и ОЗ Да', odd: 1.47, basePts: 2 },
      { pick: '2_btts_n', label: 'П2 и ОЗ — Нет', shortLabel: 'П2 и ОЗ Нет', odd: 1.45, basePts: 2 },
      { pick: '1x_btts_y', label: '1Х и ОЗ — Да', shortLabel: '1Х и ОЗ Да', odd: 1.34, basePts: 2 },
      { pick: 'x2_btts_y', label: 'Х2 и ОЗ — Да', shortLabel: 'Х2 и ОЗ Да', odd: 1.38, basePts: 2 },
    ],
  },
  {
    id: 'ht_outcome',
    group: 'halves',
    title: '1-й тайм: Исход',
    subtitle: 'Результат к перерыву',
    options: [
      { pick: '1', label: '1-й тайм: П1', shortLabel: '1Т П1', odd: 1.37, basePts: 2 },
      { pick: 'X', label: '1-й тайм: Ничья', shortLabel: '1Т Х', odd: 1.31, basePts: 2 },
      { pick: '2', label: '1-й тайм: П2', shortLabel: '1Т П2', odd: 1.43, basePts: 2 },
    ],
  },
  {
    id: 'ht_total_0_5',
    group: 'halves',
    title: '1-й тайм: Тотал 0.5',
    subtitle: 'Голы до перерыва',
    options: [
      { pick: 'over_0_5', label: '1Т Тотал больше 0.5', shortLabel: '1Т ТБ 0.5', odd: 1.19, basePts: 2 },
      { pick: 'under_0_5', label: '1Т Тотал меньше 0.5', shortLabel: '1Т ТМ 0.5', odd: 1.37, basePts: 2 },
    ],
  },
  {
    id: 'ht_total_1_5',
    group: 'halves',
    title: '1-й тайм: Тотал 1.5',
    subtitle: 'Результативный 1-й тайм',
    options: [
      { pick: 'over_1_5', label: '1Т Тотал больше 1.5', shortLabel: '1Т ТБ 1.5', odd: 1.38, basePts: 2 },
      { pick: 'under_1_5', label: '1Т Тотал меньше 1.5', shortLabel: '1Т ТМ 1.5', odd: 1.18, basePts: 2 },
    ],
  },
  {
    id: 'ht_ft',
    group: 'halves',
    title: 'Тайм / Матч',
    subtitle: 'Исход 1-го тайма и всего матча',
    options: [
      { pick: '1_1', label: 'Тайм/Матч: П1 / П1', shortLabel: 'П1/П1', odd: 1.40, basePts: 2 },
      { pick: 'X_1', label: 'Тайм/Матч: Х / П1', shortLabel: 'Х/П1', odd: 1.45, basePts: 2 },
      { pick: '2_1', label: 'Тайм/Матч: П2 / П1', shortLabel: 'П2/П1', odd: 1.95, basePts: 3 },
      { pick: '1_X', label: 'Тайм/Матч: П1 / Х', shortLabel: 'П1/Х', odd: 1.49, basePts: 2 },
      { pick: 'X_X', label: 'Тайм/Матч: Х / Х', shortLabel: 'Х/Х', odd: 1.45, basePts: 2 },
      { pick: '2_X', label: 'Тайм/Матч: П2 / Х', shortLabel: 'П2/Х', odd: 1.50, basePts: 2 },
      { pick: '1_2', label: 'Тайм/Матч: П1 / П2', shortLabel: 'П1/П2', odd: 2.15, basePts: 3 },
      { pick: 'X_2', label: 'Тайм/Матч: Х / П2', shortLabel: 'Х/П2', odd: 1.47, basePts: 2 },
      { pick: '2_2', label: 'Тайм/Матч: П2 / П2', shortLabel: 'П2/П2', odd: 1.46, basePts: 2 },
    ],
  },
  {
    id: 'corners',
    group: 'stats',
    title: 'Угловые: Тотал 8.5',
    subtitle: 'Подачи с угла поля',
    options: [
      { pick: 'over_8_5', label: 'Угловых больше 8.5', shortLabel: 'Угл Б 8.5', odd: 1.26, basePts: 2 },
      { pick: 'under_8_5', label: 'Угловых меньше 8.5', shortLabel: 'Угл М 8.5', odd: 1.30, basePts: 2 },
    ],
  },
  {
    id: 'corners_9_5',
    group: 'stats',
    title: 'Угловые: Тотал 9.5',
    subtitle: 'Повышенный тотал угловых',
    options: [
      { pick: 'over_9_5', label: 'Угловых больше 9.5', shortLabel: 'Угл Б 9.5', odd: 1.32, basePts: 2 },
      { pick: 'under_9_5', label: 'Угловых меньше 9.5', shortLabel: 'Угл М 9.5', odd: 1.24, basePts: 2 },
    ],
  },
  {
    id: 'corners_outcome',
    group: 'stats',
    title: 'Угловые: Исход',
    subtitle: 'Кто подаст больше угловых',
    options: [
      { pick: '1', label: 'Угловые: П1', shortLabel: 'Угл П1', odd: 1.25, basePts: 2 },
      { pick: 'X', label: 'Угловые: Ничья', shortLabel: 'Угл Х', odd: 1.47, basePts: 2 },
      { pick: '2', label: 'Угловые: П2', shortLabel: 'Угл П2', odd: 1.35, basePts: 2 },
    ],
  },
  {
    id: 'yellow_cards',
    group: 'stats',
    title: 'Жёлтые карточки: Тотал 3.5',
    subtitle: 'Всего предупреждений в матче',
    options: [
      { pick: 'over_3_5', label: 'ЖК больше 3.5', shortLabel: 'ЖК Б 3.5', odd: 1.25, basePts: 2 },
      { pick: 'under_3_5', label: 'ЖК меньше 3.5', shortLabel: 'ЖК М 3.5', odd: 1.31, basePts: 2 },
    ],
  },
  {
    id: 'yc_4_5',
    group: 'stats',
    title: 'Жёлтые карточки: Тотал 4.5',
    subtitle: 'Жёсткая игра и споры',
    options: [
      { pick: 'over_4_5', label: 'ЖК больше 4.5', shortLabel: 'ЖК Б 4.5', odd: 1.34, basePts: 2 },
      { pick: 'under_4_5', label: 'ЖК меньше 4.5', shortLabel: 'ЖК М 4.5', odd: 1.22, basePts: 2 },
    ],
  },
  {
    id: 'sot_7_5',
    group: 'stats',
    title: 'Удары в створ: Тотал 7.5',
    subtitle: 'Точные удары обеих команд',
    options: [
      { pick: 'over_7_5', label: 'Удары в створ больше 7.5', shortLabel: 'Створ Б 7.5', odd: 1.24, basePts: 2 },
      { pick: 'under_7_5', label: 'Удары в створ меньше 7.5', shortLabel: 'Створ М 7.5', odd: 1.33, basePts: 2 },
    ],
  },
  {
    id: 'sot_9_5',
    group: 'stats',
    title: 'Удары в створ: Тотал 9.5',
    subtitle: 'Открытый атакующий футбол',
    options: [
      { pick: 'over_9_5', label: 'Удары в створ больше 9.5', shortLabel: 'Створ Б 9.5', odd: 1.34, basePts: 2 },
      { pick: 'under_9_5', label: 'Удары в створ меньше 9.5', shortLabel: 'Створ М 9.5', odd: 1.22, basePts: 2 },
    ],
  },
  {
    id: 'fouls_21_5',
    group: 'stats',
    title: 'Фолы: Тотал 21.5',
    subtitle: 'Нарушения правил в матче',
    options: [
      { pick: 'over_21_5', label: 'Фолов больше 21.5', shortLabel: 'Фолы Б 21.5', odd: 1.28, basePts: 2 },
      { pick: 'under_21_5', label: 'Фолов меньше 21.5', shortLabel: 'Фолы М 21.5', odd: 1.29, basePts: 2 },
    ],
  },
  {
    id: 'penalty_yn',
    group: 'stats',
    title: 'Пенальти в матче',
    subtitle: 'Будет ли назначен 11-метровый',
    options: [
      { pick: 'yes', label: 'Пенальти: Да', shortLabel: 'Пенальти Да', odd: 1.40, basePts: 2 },
      { pick: 'no', label: 'Пенальти: Нет', shortLabel: 'Пенальти Нет', odd: 1.15, basePts: 2 },
    ],
  },
  {
    id: 'red_yn',
    group: 'stats',
    title: 'Удаление (КК) в матче',
    subtitle: 'Покажет ли арбитр красную карточку',
    options: [
      { pick: 'yes', label: 'Удаление: Да', shortLabel: 'КК Да', odd: 1.44, basePts: 2 },
      { pick: 'no', label: 'Удаление: Нет', shortLabel: 'КК Нет', odd: 1.10, basePts: 2 },
    ],
  },
  {
    id: 'goal_75_yn',
    group: 'stats',
    title: 'Гол на 75+ минуте',
    subtitle: 'Забитый мяч в концовке (75-90+ мин)',
    options: [
      { pick: 'yes', label: 'Гол на 75+ мин: Да', shortLabel: 'Гол 75+ Да', odd: 1.32, basePts: 2 },
      { pick: 'no', label: 'Гол на 75+ мин: Нет', shortLabel: 'Гол 75+ Нет', odd: 1.24, basePts: 2 },
    ],
  },
  {
    id: 'specials',
    group: 'stats',
    title: 'Спецсобытия (архив)',
    subtitle: 'Совместимость со старыми ставками',
    options: [
      { pick: 'penalty_yes', label: 'Будет назначен пенальти', shortLabel: 'Пенальти', odd: 1.40, basePts: 2 },
      { pick: 'red_yes', label: 'Будет удаление (КК)', shortLabel: 'Красная', odd: 1.44, basePts: 2 },
      { pick: 'goal_75_plus', label: 'Гол на 75+ минуте', shortLabel: 'Гол 75+', odd: 1.32, basePts: 2 },
      { pick: 'ht_draw', label: 'Ничья в 1-м тайме', shortLabel: 'Ничья 1Т', odd: 1.31, basePts: 2 },
    ],
  },
  {
    id: 'exact_score',
    group: 'exact',
    title: 'Точный счёт',
    subtitle: 'Итоговый счёт основного времени',
    options: [
      { pick: 'exact', label: 'Точный счёт', shortLabel: 'Точн. счёт', odd: 1.48, basePts: 2 },
    ],
  },
];

function findMarketOption(market: string, pick: string): { marketDef: PredictionMarketDef; option: PredictionMarketOption } | null {
  const m = PREDICTION_MARKETS.find((x) => x.id === market);
  if (!m) return null;
  const opt = m.options.find((o) => o.pick === pick);
  if (!opt) return null;
  return { marketDef: m, option: opt };
}

const BET_LOCK_BEFORE_MS = 2 * 60 * 1000;

function getFixtureKickoffMs(f: any): number {
  if (!f) return Number.NaN;
  const hold = Number(f.hold);
  if (Number.isFinite(hold) && hold > 0) return hold;
  const rawD = String(f.realDate || f.date || '').trim();
  const d = /^\d{4}-\d{2}-\d{2}$/.test(rawD) ? rawD : '';
  if (!d) return Number.NaN;
  const rawT = String(f.realTime || f.time || '12:00').trim();
  let t = '12:00:00';
  const m = rawT.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);
  if (m) {
    const hh = String(Math.min(23, Math.max(0, Number(m[1])))).padStart(2, '0');
    const mm = String(Math.min(59, Math.max(0, Number(m[2])))).padStart(2, '0');
    const ss = String(Math.min(59, Math.max(0, Number(m[3] || 0)))).padStart(2, '0');
    t = `${hh}:${mm}:${ss}`;
  }
  const ms = new Date(`${d}T${t}+03:00`).getTime();
  return Number.isFinite(ms) ? ms : Number.NaN;
}

function getFixtureBetLockInfo(f: any, nowMs = Date.now()): { kickoffAt: number | null; betCloseAt: number | null; locked: boolean } {
  const kickoffMs = getFixtureKickoffMs(f);
  const kickoffAt = Number.isFinite(kickoffMs) ? kickoffMs : null;
  const betCloseAt = kickoffAt !== null ? kickoffAt - BET_LOCK_BEFORE_MS : null;
  const statusLocked = !f || f.status !== 'scheduled';
  const timeLocked = betCloseAt !== null && nowMs >= betCloseAt;
  return { kickoffAt, betCloseAt, locked: statusLocked || timeLocked };
}

function clampNum(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function roundCoins(v: number): number {
  return Math.round(Number(v || 0) * 100) / 100;
}

function roundBookieOdd(raw: number): number {
  const clamped = clampNum(raw, 1.04, 3.0);
  return Math.round(clamped * 100) / 100;
}

function oddFromProb(prob: number, _margin = 1.055, minOdd = 1.04, maxOdd = 3.0, rareCutoff = 0.032): number {
  const p = clampNum(prob, 0.0005, 0.96);
  let raw: number;
  if (p >= rareCutoff) {
    const t = clampNum((0.96 - p) / (0.96 - rareCutoff), 0, 1);
    raw = 1.04 + 0.46 * Math.pow(t, 0.92);
  } else {
    const r = clampNum((rareCutoff - p) / (rareCutoff - 0.0005), 0, 1);
    raw = 1.50 + 1.50 * Math.pow(r, 1.85);
  }
  const lo = clampNum(minOdd, 1.04, 1.50);
  const hi = clampNum(maxOdd, lo, 3.0);
  return roundBookieOdd(clampNum(raw, lo, hi));
}

function pairOddsFromProbs(pA: number, pB: number, margin = 1.058): [number, number] {
  const sum = pA + pB;
  if (sum <= 0.0001) return [1.28, 1.28];
  const nA = clampNum(pA / sum, 0.02, 0.98);
  const nB = 1 - nA;
  return [
    oddFromProb(nA, margin, 1.04, 3.0),
    oddFromProb(nB, margin, 1.04, 3.0),
  ];
}

function tripleOddsFromProbs(pA: number, pB: number, pC: number, margin = 1.065): [number, number, number] {
  const sum = Math.max(0.001, pA + pB + pC);
  return [
    oddFromProb(pA / sum, margin, 1.05, 3.0),
    oddFromProb(pB / sum, margin, 1.05, 3.0),
    oddFromProb(pC / sum, margin, 1.05, 3.0),
  ];
}

function poissonP(k: number, lambda: number): number {
  let res = Math.exp(-lambda);
  for (let i = 1; i <= k; i++) res = (res * lambda) / i;
  return res;
}

function poissonCDF(maxK: number, lambda: number): number {
  let s = 0;
  for (let k = 0; k <= maxK; k++) s += poissonP(k, lambda);
  return clampNum(s, 0, 1);
}

function buildPoissonGrid(lambdaH: number, lambdaA: number, maxG = 7): number[][] {
  const grid: number[][] = [];
  let sumGrid = 0;
  for (let h = 0; h <= maxG; h++) {
    grid[h] = [];
    for (let a = 0; a <= maxG; a++) {
      let p = poissonP(h, lambdaH) * poissonP(a, lambdaA);
      // Slight low-score calibration without over-inflating draws
      if (h === 0 && a === 0) p *= 0.98;
      else if (h === 1 && a === 1) p *= 1.01;
      else if ((h === 1 && a === 0) || (h === 0 && a === 1)) p *= 0.99;
      grid[h][a] = p;
      sumGrid += p;
    }
  }
  for (let h = 0; h <= maxG; h++) {
    for (let a = 0; a <= maxG; a++) grid[h][a] /= sumGrid;
  }
  return grid;
}

function getTeamFormAndStrength(
  ctx: AdServerContext,
  teamId: string,
  fixture?: any
): {
  ovr: number;
  attOvr: number;
  defOvr: number;
  formDelta: number;
  budgetEdge: number;
  style: string;
  compTier: number;
} {
  const db = ctx.getDb();
  const t = ctx.team(teamId);
  const comp = String(t?.comp || 'rpl');
  const compTier = comp === 'rpl' ? 0 : comp === 'fnl' ? -5.8 : -7.8;

  const players = (Array.isArray(db.players) ? db.players : []).filter((p: any) => p.teamId === teamId && !p.archived);
  const playerById = new Map<string, any>(players.map((p: any) => [p.id, p]));

  // Prefer submitted match lineup if present
  const lineupObj = fixture?.id ? (db.lineups?.[`${fixture.id}:${teamId}`] || db.lineups?.[`${fixture.id}:${teamId}:home`]) : null;
  const starterIds: string[] = Array.isArray(lineupObj?.starters) ? lineupObj.starters : [];
  let xiRatings: number[] = [];
  if (starterIds.length >= 9) {
    xiRatings = starterIds
      .map((pid) => Number(playerById.get(pid)?.ovr || playerById.get(pid)?.rating || 0))
      .filter((n) => Number.isFinite(n) && n > 0);
  }
  if (xiRatings.length < 9) {
    const gks = players
      .filter((p: any) => String(p.pos || '') === 'ВР' || String(p.pos || '') === 'GK')
      .map((p: any) => Number(p.ovr || p.rating || 70))
      .sort((a: number, b: number) => b - a)
      .slice(0, 1);
    const outfield = players
      .filter((p: any) => String(p.pos || '') !== 'ВР' && String(p.pos || '') !== 'GK')
      .map((p: any) => Number(p.ovr || p.rating || 70))
      .sort((a: number, b: number) => b - a)
      .slice(0, 10);
    xiRatings = [...gks, ...outfield];
  }
  const fallbackOvr = comp === 'rpl' ? 76.5 : 70.5;
  const ovr = xiRatings.length ? xiRatings.reduce((s, x) => s + x, 0) / xiRatings.length : fallbackOvr;

  const attPositions = new Set(['ЦФ', 'ЛВ', 'ПВ', 'АП', 'ST', 'CF', 'LW', 'RW', 'CAM']);
  const defPositions = new Set(['ВР', 'ЦЗ', 'ЛЗ', 'ПЗ', 'ОП', 'GK', 'CB', 'LB', 'RB', 'CDM']);
  const attList = players
    .filter((p: any) => attPositions.has(String(p.pos || '')))
    .map((p: any) => Number(p.ovr || p.rating || ovr))
    .sort((a: number, b: number) => b - a)
    .slice(0, 4);
  const defList = players
    .filter((p: any) => defPositions.has(String(p.pos || '')))
    .map((p: any) => Number(p.ovr || p.rating || ovr))
    .sort((a: number, b: number) => b - a)
    .slice(0, 5);
  const attOvr = attList.length ? attList.reduce((s: number, x: number) => s + x, 0) / attList.length : ovr;
  const defOvr = defList.length ? defList.reduce((s: number, x: number) => s + x, 0) / defList.length : ovr;

  // Club financial/reputation edge so top clubs cleanly separate from bottom underdogs
  const rawBudget = Number(t?.budget || 6_000_000);
  const budgetEdge = clampNum(Math.log10(Math.max(500_000, rawBudget) / 6_000_000) * 3.1, -2.6, 3.8);

  // Season form from completed fixtures (exponential weight as season progresses)
  const season = ctx.S();
  const done = (Array.isArray(db.fixtures) ? db.fixtures : []).filter(
    (fx: any) => (fx.season || season) === season && fx.status === 'done' && (fx.home === teamId || fx.away === teamId)
  );
  let pts = 0;
  let gd = 0;
  for (const fx of done) {
    const isH = fx.home === teamId;
    const gf = Number(isH ? fx.hg : fx.ag) || 0;
    const ga = Number(isH ? fx.ag : fx.hg) || 0;
    gd += gf - ga;
    if (gf > ga) pts += 3;
    else if (gf === ga) pts += 1;
  }
  const n = done.length;
  const ppg = n > 0 ? pts / n : 1.35;
  const gdpm = n > 0 ? gd / n : 0;
  const weight = Math.min(1, n / 6);
  const formDelta = weight * ((ppg - 1.35) * 2.2 + gdpm * 1.15);

  const style = String(db.tactics?.[teamId]?.style || 'balanced');
  return { ovr, attOvr, defOvr, formDelta, budgetEdge, style, compTier };
}

export function computeFixtureMarkets(ctx: AdServerContext, f: any): {
  markets: PredictionMarketDef[];
  quickScores: Array<{ h: number; a: number; score: string; odd: number }>;
  exactMatrix: number[][];
  calcExactOdd: (eh: number, ea: number) => number;
  expectedGoals: { home: number; away: number };
  probs: { p1: number; pX: number; p2: number };
  refereeName: string | null;
} {
  const db = ctx.getDb();
  const home = getTeamFormAndStrength(ctx, f.home, f);
  const away = getTeamFormAndStrength(ctx, f.away, f);
  const isDerby = !!(Array.isArray(db.derbies) && db.derbies.some((d: any) => (d.a === f.home && d.b === f.away) || (d.a === f.away && d.b === f.home)));
  const isNeutral = !!f.neutralField || f.comp === 'supercup';

  const homePower = home.ovr + home.budgetEdge + home.formDelta + home.compTier;
  const awayPower = away.ovr + away.budgetEdge + away.formDelta + away.compTier;
  const homeAdv = isNeutral ? 0 : 1.65;
  const diff = clampNum((homePower + homeAdv) - awayPower, -15, 15);

  const tempoShiftH = clampNum((home.attOvr - away.defOvr) * 0.028, -0.15, 0.15);
  const tempoShiftA = clampNum((away.attOvr - home.defOvr) * 0.028, -0.15, 0.15);

  const styleTempo = (s: string, opp: string) => {
    let m = 1.0;
    if (s === 'attack') m *= 1.13;
    else if (s === 'press') m *= 1.07;
    else if (s === 'bus') m *= 0.85;
    if (opp === 'attack') m *= 1.09;
    else if (opp === 'bus') m *= 0.87;
    if (isDerby) m *= 0.96;
    return m;
  };

  // Weather impact
  const wTxt = String(f.weather || '').toLowerCase();
  const badPitch = /(дожд|снег|ливн|тяжёл|тяжел|гряз)/.test(wTxt);
  const weatherTempo = badPitch ? 0.94 : 1.0;

  const baseGoal = isNeutral ? 1.33 : 1.37;
  const lambdaH = clampNum(baseGoal * Math.exp(0.112 * diff) * (1 + tempoShiftH) * styleTempo(home.style, away.style) * weatherTempo, 0.45, 3.15);
  const lambdaA = clampNum(baseGoal * Math.exp(-0.112 * diff) * (1 + tempoShiftA) * styleTempo(away.style, home.style) * weatherTempo, 0.35, 2.85);
  const totalLambda = lambdaH + lambdaA;

  // Referee style
  const refObj = Array.isArray(db.referees)
    ? db.referees.find((r: any) => r.id === f.refId || r.name === f.referee)
    : null;
  const refStyle = String(refObj?.style || 'balanced');
  const refName = refObj?.name || (typeof f.referee === 'string' && f.referee) || null;

  // Full-time, 1st-half, and 2nd-half Poisson grids
  const gridFT = buildPoissonGrid(lambdaH, lambdaA, 7);
  const gridHT = buildPoissonGrid(lambdaH * 0.44, lambdaA * 0.44, 4);
  const grid2T = buildPoissonGrid(lambdaH * 0.56, lambdaA * 0.56, 4);

  // Aggregate FT probabilities
  let p1 = 0, pX = 0, p2 = 0;
  let pOver15 = 0, pOver25 = 0, pOver35 = 0;
  let pTot2Win = 0, pTot2Loss = 0;
  let pTot3Win = 0, pTot3Loss = 0;
  let pBtts = 0;
  let pF1m15 = 0, pF2m15 = 0;
  let pF1m10Win = 0, pF1m10Loss = 0;
  let pF2m10Win = 0, pF2m10Loss = 0;
  let pIt1_05 = 0, pIt1_15 = 0, pIt2_05 = 0, pIt2_15 = 0;
  let p1_o15 = 0, p1_o25 = 0, p1_u25 = 0;
  let p2_o15 = 0, p2_o25 = 0, p2_u25 = 0;
  let p1x_o15 = 0, px2_o15 = 0, px_u25 = 0;
  let p1_by = 0, p1_bn = 0, p2_by = 0, p2_bn = 0, p1x_by = 0, px2_by = 0;

  for (let h = 0; h <= 7; h++) {
    for (let a = 0; a <= 7; a++) {
      const p = gridFT[h][a];
      const tot = h + a;
      const diffG = h - a;
      const btts = h > 0 && a > 0;

      if (h > a) p1 += p;
      else if (h === a) pX += p;
      else p2 += p;

      if (tot >= 2) pOver15 += p;
      if (tot >= 3) pOver25 += p;
      if (tot >= 4) pOver35 += p;

      if (tot >= 3) pTot2Win += p;
      else if (tot <= 1) pTot2Loss += p;

      if (tot >= 4) pTot3Win += p;
      else if (tot <= 2) pTot3Loss += p;

      if (btts) pBtts += p;
      if (diffG >= 2) pF1m15 += p;
      if (diffG <= -2) pF2m15 += p;
      if (diffG >= 2) pF1m10Win += p;
      else if (diffG <= 0) pF1m10Loss += p;
      if (diffG <= -2) pF2m10Win += p;
      else if (diffG >= 0) pF2m10Loss += p;

      if (h >= 1) pIt1_05 += p;
      if (h >= 2) pIt1_15 += p;
      if (a >= 1) pIt2_05 += p;
      if (a >= 2) pIt2_15 += p;

      if (h > a && tot >= 2) p1_o15 += p;
      if (h > a && tot >= 3) p1_o25 += p;
      if (h > a && tot <= 2) p1_u25 += p;
      if (a > h && tot >= 2) p2_o15 += p;
      if (a > h && tot >= 3) p2_o25 += p;
      if (a > h && tot <= 2) p2_u25 += p;
      if (h >= a && tot >= 2) p1x_o15 += p;
      if (a >= h && tot >= 2) px2_o15 += p;
      if (h === a && tot <= 2) px_u25 += p;

      if (h > a && btts) p1_by += p;
      if (h > a && !btts) p1_bn += p;
      if (a > h && btts) p2_by += p;
      if (a > h && !btts) p2_bn += p;
      if (h >= a && btts) p1x_by += p;
      if (a >= h && btts) px2_by += p;
    }
  }

  // 1st Half probabilities & Both-halves / HT-FT convolution
  let pHt1 = 0, pHtX = 0, pHt2 = 0, pHtOver05 = 0, pHtOver15 = 0;
  let p2tOver05 = 0;
  for (let h = 0; h <= 4; h++) {
    for (let a = 0; a <= 4; a++) {
      const p = gridHT[h][a];
      if (h > a) pHt1 += p;
      else if (h === a) pHtX += p;
      else pHt2 += p;
      if (h + a >= 1) pHtOver05 += p;
      if (h + a >= 2) pHtOver15 += p;

      const pSec = grid2T[h][a];
      if (h + a >= 1) p2tOver05 += pSec;
    }
  }
  const pBothHalvesGoal = clampNum(pHtOver05 * p2tOver05, 0.25, 0.78);

  // HT/FT convolution
  const htFtProbs: Record<string, number> = {
    '1_1': 0, 'X_1': 0, '2_1': 0,
    '1_X': 0, 'X_X': 0, '2_X': 0,
    '1_2': 0, 'X_2': 0, '2_2': 0,
  };
  for (let hh = 0; hh <= 4; hh++) {
    for (let ha = 0; ha <= 4; ha++) {
      const ph = gridHT[hh][ha];
      const htRes = hh > ha ? '1' : hh < ha ? '2' : 'X';
      for (let sh = 0; sh <= 4; sh++) {
        for (let sa = 0; sa <= 4; sa++) {
          const ps = grid2T[sh][sa];
          const fh = hh + sh;
          const fa = ha + sa;
          const ftRes = fh > fa ? '1' : fh < fa ? '2' : 'X';
          htFtProbs[`${htRes}_${ftRes}`] += ph * ps;
        }
      }
    }
  }

  // First goal probabilities
  const pZeroZero = gridFT[0][0];
  const pAnyGoal = Math.max(0.01, 1 - pZeroZero);
  const pFirstHome = pAnyGoal * (lambdaH / Math.max(0.05, totalLambda));
  const pFirstAway = pAnyGoal * (lambdaA / Math.max(0.05, totalLambda));

  // Coherent bookmaker odds tuned so almost all lines sit at 1.04–1.50 and only very rare longshots reach up to 3.00
  const [odd1, oddX, odd2] = tripleOddsFromProbs(p1, pX, p2, 1.09);
  const odd1X = oddFromProb(p1 + pX, 1.08, 1.04, 3.0);
  const odd12 = oddFromProb(p1 + p2, 1.08, 1.04, 3.0);
  const oddX2 = oddFromProb(pX + p2, 1.08, 1.04, 3.0);

  const [oddF1_0, oddF2_0] = pairOddsFromProbs(p1, p2, 1.085);
  const [oddF1_m10, oddF2_p10] = pairOddsFromProbs(pF1m10Win, pF1m10Loss, 1.09);
  const [oddF1_m15, oddF2_p15] = pairOddsFromProbs(pF1m15, 1 - pF1m15, 1.09);
  const [oddF1_p10, oddF2_m10] = pairOddsFromProbs(pF2m10Loss, pF2m10Win, 1.09);
  const [oddF1_p15, oddF2_m15] = pairOddsFromProbs(1 - pF2m15, pF2m15, 1.09);

  const [oddO15, oddU15] = pairOddsFromProbs(pOver15, 1 - pOver15, 1.085);
  const [oddO20, oddU20] = pairOddsFromProbs(pTot2Win, pTot2Loss, 1.09);
  const [oddO25, oddU25] = pairOddsFromProbs(pOver25, 1 - pOver25, 1.095);
  const [oddO30, oddU30] = pairOddsFromProbs(pTot3Win, pTot3Loss, 1.09);
  const [oddO35, oddU35] = pairOddsFromProbs(pOver35, 1 - pOver35, 1.09);
  const [oddBttsY, oddBttsN] = pairOddsFromProbs(pBtts, 1 - pBtts, 1.095);

  const [oddIt1_05o, oddIt1_05u] = pairOddsFromProbs(pIt1_05, 1 - pIt1_05, 1.085);
  const [oddIt1_15o, oddIt1_15u] = pairOddsFromProbs(pIt1_15, 1 - pIt1_15, 1.095);
  const [oddIt2_05o, oddIt2_05u] = pairOddsFromProbs(pIt2_05, 1 - pIt2_05, 1.085);
  const [oddIt2_15o, oddIt2_15u] = pairOddsFromProbs(pIt2_15, 1 - pIt2_15, 1.095);

  const [oddHt1, oddHtX, oddHt2] = tripleOddsFromProbs(pHt1, pHtX, pHt2, 1.10);
  const [oddHtO05, oddHtU05] = pairOddsFromProbs(pHtOver05, 1 - pHtOver05, 1.085);
  const [oddHtO15, oddHtU15] = pairOddsFromProbs(pHtOver15, 1 - pHtOver15, 1.095);
  const [oddBothHalvesY, oddBothHalvesN] = pairOddsFromProbs(pBothHalvesGoal, 1 - pBothHalvesGoal, 1.095);
  const [oddFgH, oddFgNone, oddFgA] = tripleOddsFromProbs(pFirstHome, pZeroZero, pFirstAway, 1.095);

  // Statistical lines (driven by team tactics, xG, derby, referee & weather)
  const attackScore = (s: string) => (s === 'attack' ? 0.8 : s === 'possession' ? 0.6 : s === 'press' ? 0.3 : s === 'bus' ? -0.6 : 0);
  const cornerExpH = clampNum(4.7 + (lambdaH - 1.3) * 1.15 + attackScore(home.style) + (badPitch ? 0.35 : 0), 3.0, 7.5);
  const cornerExpA = clampNum(4.1 + (lambdaA - 1.2) * 1.15 + attackScore(away.style) + (badPitch ? 0.35 : 0), 2.5, 7.0);
  const cornerExpTotal = cornerExpH + cornerExpA;
  const pCoOver85 = 1 - poissonCDF(8, cornerExpTotal);
  const pCoOver95 = 1 - poissonCDF(9, cornerExpTotal);
  const [oddCoO85, oddCoU85] = pairOddsFromProbs(pCoOver85, 1 - pCoOver85, 1.095);
  const [oddCoO95, oddCoU95] = pairOddsFromProbs(pCoOver95, 1 - pCoOver95, 1.095);

  // Corner 1X2
  let pCo1 = 0, pCoX = 0, pCo2 = 0;
  for (let ch = 0; ch <= 12; ch++) {
    const ph = poissonP(ch, cornerExpH);
    for (let ca = 0; ca <= 12; ca++) {
      const p = ph * poissonP(ca, cornerExpA);
      if (ch > ca) pCo1 += p;
      else if (ch === ca) pCoX += p;
      else pCo2 += p;
    }
  }
  const [oddCo1, oddCoX, oddCo2] = tripleOddsFromProbs(pCo1, pCoX, pCo2, 1.10);

  // Yellow cards
  const pressCards = (home.style === 'press' ? 0.55 : home.style === 'bus' ? 0.30 : 0) + (away.style === 'press' ? 0.55 : away.style === 'bus' ? 0.30 : 0);
  const refCardDelta = refStyle === 'strict' ? 0.75 : refStyle === 'lenient' ? -0.55 : 0;
  const ycExp = clampNum(3.65 + pressCards + (isDerby ? 0.95 : 0) + refCardDelta + (badPitch ? 0.25 : 0), 2.3, 6.4);
  const pYcOver35 = 1 - poissonCDF(3, ycExp);
  const pYcOver45 = 1 - poissonCDF(4, ycExp);
  const [oddYcO35, oddYcU35] = pairOddsFromProbs(pYcOver35, 1 - pYcOver35, 1.095);
  const [oddYcO45, oddYcU45] = pairOddsFromProbs(pYcOver45, 1 - pYcOver45, 1.095);

  // Shots on target (SOT)
  const sotExp = clampNum(5.2 + totalLambda * 1.45 + (home.style === 'attack' ? 0.5 : 0) + (away.style === 'attack' ? 0.5 : 0), 5.8, 13.0);
  const pSot75 = 1 - poissonCDF(7, sotExp);
  const pSot95 = 1 - poissonCDF(9, sotExp);
  const [oddSotO75, oddSotU75] = pairOddsFromProbs(pSot75, 1 - pSot75, 1.095);
  const [oddSotO95, oddSotU95] = pairOddsFromProbs(pSot95, 1 - pSot95, 1.095);

  // Fouls
  const foulExp = clampNum(21.4 + pressCards * 2.2 + (isDerby ? 3.2 : 0) + (refStyle === 'strict' ? 1.5 : -0.5) + (badPitch ? 1.2 : 0), 15.5, 29.5);
  const pFouls215 = 1 - poissonCDF(21, foulExp);
  const [oddFoO215, oddFoU215] = pairOddsFromProbs(pFouls215, 1 - pFouls215, 1.095);

  // Events (Penalty, Red Card, Goal 75+)
  const pPen = clampNum(0.22 + (totalLambda - 2.55) * 0.04 + (isDerby ? 0.04 : 0) + (refStyle === 'strict' ? 0.04 : 0), 0.16, 0.36);
  const pRed = clampNum(0.13 + (isDerby ? 0.06 : 0) + (refStyle === 'strict' ? 0.04 : 0) + pressCards * 0.03, 0.10, 0.28);
  const pLate75 = clampNum(1 - Math.exp(-0.24 * totalLambda), 0.34, 0.58);
  const [oddPenY, oddPenN] = pairOddsFromProbs(pPen, 1 - pPen, 1.09);
  const [oddRedY, oddRedN] = pairOddsFromProbs(pRed, 1 - pRed, 1.09);
  const [oddLateY, oddLateN] = pairOddsFromProbs(pLate75, 1 - pLate75, 1.095);

  const calcExactOdd = (eh: number, ea: number) => {
    const h = clampNum(Math.round(eh), 0, 15);
    const a = clampNum(Math.round(ea), 0, 15);
    const p = h <= 7 && a <= 7
      ? gridFT[h][a]
      : Math.max(0.0005, poissonP(Math.min(h, 12), lambdaH) * poissonP(Math.min(a, 12), lambdaA));
    return oddFromProb(p, 1.10, 1.15, 3.0, 0.012);
  };

  // 6x6 exact score coefficient matrix for instant accurate custom scores in UI
  const exactMatrix: number[][] = [];
  for (let h = 0; h <= 5; h++) {
    exactMatrix[h] = [];
    for (let a = 0; a <= 5; a++) {
      exactMatrix[h][a] = calcExactOdd(h, a);
    }
  }

  const quickCandidates: Array<[number, number]> = [
    [1, 0], [2, 0], [2, 1], [3, 0], [3, 1],
    [0, 0], [1, 1], [2, 2],
    [0, 1], [0, 2], [1, 2], [1, 3],
  ];
  const quickScores = quickCandidates.map(([h, a]) => ({
    h,
    a,
    score: `${h}:${a}`,
    odd: calcExactOdd(h, a),
  }));

  const mk = (
    id: string,
    group: PredictionMarketGroup,
    title: string,
    subtitle: string,
    opts: Array<{ pick: string; label: string; shortLabel: string; odd: number }>
  ): PredictionMarketDef => ({
    id,
    group,
    title,
    subtitle,
    options: opts.map((o) => ({ ...o, basePts: Math.max(1, Math.round(o.odd * 1.5)) })),
  });

  const homeNm = ctx.tn(f.home);
  const awayNm = ctx.tn(f.away);

  const markets: PredictionMarketDef[] = [
    mk('outcome', 'main', 'Исход матча', 'Основное время (П1 / Х / П2)', [
      { pick: '1', label: `П1 (${homeNm})`, shortLabel: 'П1', odd: odd1 },
      { pick: 'X', label: 'Ничья (Х)', shortLabel: 'Х', odd: oddX },
      { pick: '2', label: `П2 (${awayNm})`, shortLabel: 'П2', odd: odd2 },
    ]),
    mk('double_chance', 'main', 'Двойной шанс', 'Перестраховка исхода', [
      { pick: '1X', label: `1Х (${homeNm} не проиграет)`, shortLabel: '1Х', odd: odd1X },
      { pick: '12', label: '12 (Без ничьей)', shortLabel: '12', odd: odd12 },
      { pick: 'X2', label: `Х2 (${awayNm} не проиграет)`, shortLabel: 'Х2', odd: oddX2 },
    ]),
    mk('hcp_0', 'main', 'Фора (0)', 'Возврат ставки при ничьей', [
      { pick: 'f1_0', label: `Ф1 (0) · ${homeNm}`, shortLabel: 'Ф1 (0)', odd: oddF1_0 },
      { pick: 'f2_0', label: `Ф2 (0) · ${awayNm}`, shortLabel: 'Ф2 (0)', odd: oddF2_0 },
    ]),
    mk('hcp_m10', 'main', 'Фора (-1.0 / +1.0)', 'Возврат при разнице ровно 1 мяч', [
      { pick: 'f1_m10', label: 'Фора 1 (-1.0)', shortLabel: 'Ф1 (-1.0)', odd: oddF1_m10 },
      { pick: 'f2_p10', label: 'Фора 2 (+1.0)', shortLabel: 'Ф2 (+1.0)', odd: oddF2_p10 },
    ]),
    mk('hcp_m15', 'main', 'Фора (-1.5 / +1.5)', 'Победа в 2+ мяча или удержание', [
      { pick: 'f1_m15', label: 'Фора 1 (-1.5)', shortLabel: 'Ф1 (-1.5)', odd: oddF1_m15 },
      { pick: 'f2_p15', label: 'Фора 2 (+1.5)', shortLabel: 'Ф2 (+1.5)', odd: oddF2_p15 },
    ]),
    mk('hcp_p10', 'main', 'Фора (+1.0 / -1.0)', 'Возврат при победе гостей в 1 мяч', [
      { pick: 'f1_p10', label: 'Фора 1 (+1.0)', shortLabel: 'Ф1 (+1.0)', odd: oddF1_p10 },
      { pick: 'f2_m10', label: 'Фора 2 (-1.0)', shortLabel: 'Ф2 (-1.0)', odd: oddF2_m10 },
    ]),
    mk('hcp_p15', 'main', 'Фора (+1.5 / -1.5)', 'Удержание хозяев или победа гостей в 2+', [
      { pick: 'f1_p15', label: 'Фора 1 (+1.5)', shortLabel: 'Ф1 (+1.5)', odd: oddF1_p15 },
      { pick: 'f2_m15', label: 'Фора 2 (-1.5)', shortLabel: 'Ф2 (-1.5)', odd: oddF2_m15 },
    ]),
    mk('total_1_5', 'main', 'Тотал 1.5', 'Суммарно голов в матче', [
      { pick: 'over_1_5', label: 'Тотал больше 1.5', shortLabel: 'ТБ 1.5', odd: oddO15 },
      { pick: 'under_1_5', label: 'Тотал меньше 1.5', shortLabel: 'ТМ 1.5', odd: oddU15 },
    ]),
    mk('total_2_0', 'main', 'Тотал 2.0', 'Возврат при ровно 2 голах', [
      { pick: 'over_2_0', label: 'Тотал больше 2.0', shortLabel: 'ТБ 2.0', odd: oddO20 },
      { pick: 'under_2_0', label: 'Тотал меньше 2.0', shortLabel: 'ТМ 2.0', odd: oddU20 },
    ]),
    mk('total_goals', 'main', 'Тотал 2.5', 'Основной тотал матча', [
      { pick: 'over_2_5', label: 'Тотал больше 2.5', shortLabel: 'ТБ 2.5', odd: oddO25 },
      { pick: 'under_2_5', label: 'Тотал меньше 2.5', shortLabel: 'ТМ 2.5', odd: oddU25 },
    ]),
    mk('total_3_0', 'main', 'Тотал 3.0', 'Возврат при ровно 3 голах', [
      { pick: 'over_3_0', label: 'Тотал больше 3.0', shortLabel: 'ТБ 3.0', odd: oddO30 },
      { pick: 'under_3_0', label: 'Тотал меньше 3.0', shortLabel: 'ТМ 3.0', odd: oddU30 },
    ]),
    mk('total_3_5', 'main', 'Тотал 3.5', 'Верховой / низовой матч', [
      { pick: 'over_3_5', label: 'Тотал больше 3.5', shortLabel: 'ТБ 3.5', odd: oddO35 },
      { pick: 'under_3_5', label: 'Тотал меньше 3.5', shortLabel: 'ТМ 3.5', odd: oddU35 },
    ]),
    mk('btts', 'main', 'Обе забьют', 'Голы обеих команд', [
      { pick: 'yes', label: 'Обе забьют: Да', shortLabel: 'ОЗ Да', odd: oddBttsY },
      { pick: 'no', label: 'Обе забьют: Нет', shortLabel: 'ОЗ Нет', odd: oddBttsN },
    ]),

    // Goals & Combos
    mk('it1_0_5', 'goals', `ИТ ${homeNm} 0.5`, 'Индивидуальный тотал хозяев', [
      { pick: 'over_0_5', label: `ИТ1 Б 0.5 (${homeNm})`, shortLabel: 'ИТ1 Б 0.5', odd: oddIt1_05o },
      { pick: 'under_0_5', label: `ИТ1 М 0.5 (${homeNm})`, shortLabel: 'ИТ1 М 0.5', odd: oddIt1_05u },
    ]),
    mk('it1_1_5', 'goals', `ИТ ${homeNm} 1.5`, '2+ гола хозяев', [
      { pick: 'over_1_5', label: `ИТ1 Б 1.5 (${homeNm})`, shortLabel: 'ИТ1 Б 1.5', odd: oddIt1_15o },
      { pick: 'under_1_5', label: `ИТ1 М 1.5 (${homeNm})`, shortLabel: 'ИТ1 М 1.5', odd: oddIt1_15u },
    ]),
    mk('it2_0_5', 'goals', `ИТ ${awayNm} 0.5`, 'Индивидуальный тотал гостей', [
      { pick: 'over_0_5', label: `ИТ2 Б 0.5 (${awayNm})`, shortLabel: 'ИТ2 Б 0.5', odd: oddIt2_05o },
      { pick: 'under_0_5', label: `ИТ2 М 0.5 (${awayNm})`, shortLabel: 'ИТ2 М 0.5', odd: oddIt2_05u },
    ]),
    mk('it2_1_5', 'goals', `ИТ ${awayNm} 1.5`, '2+ гола гостей', [
      { pick: 'over_1_5', label: `ИТ2 Б 1.5 (${awayNm})`, shortLabel: 'ИТ2 Б 1.5', odd: oddIt2_15o },
      { pick: 'under_1_5', label: `ИТ2 М 1.5 (${awayNm})`, shortLabel: 'ИТ2 М 1.5', odd: oddIt2_15u },
    ]),
    mk('first_goal', 'goals', 'Первый гол в матче', 'Кто откроет счёт', [
      { pick: 'home', label: `Первый гол: ${homeNm}`, shortLabel: '1-й К1', odd: oddFgH },
      { pick: 'none', label: 'Голов не будет (0:0)', shortLabel: 'Без голов', odd: oddFgNone },
      { pick: 'away', label: `Первый гол: ${awayNm}`, shortLabel: '1-й К2', odd: oddFgA },
    ]),
    mk('both_halves_goal', 'goals', 'Голы в обоих таймах', 'Хотя бы по 1 голу в каждом тайме', [
      { pick: 'yes', label: 'Голы в обоих таймах: Да', shortLabel: 'Оба 1Т/2Т Да', odd: oddBothHalvesY },
      { pick: 'no', label: 'Голы в обоих таймах: Нет', shortLabel: 'Оба 1Т/2Т Нет', odd: oddBothHalvesN },
    ]),
    mk('combo_w_total', 'goals', 'Исход + Тотал', 'Комбинированные ставки', [
      { pick: '1_over15', label: 'П1 и ТБ 1.5', shortLabel: 'П1 и ТБ 1.5', odd: oddFromProb(p1_o15, 1.075, 1.05, 3.0) },
      { pick: '1_over25', label: 'П1 и ТБ 2.5', shortLabel: 'П1 и ТБ 2.5', odd: oddFromProb(p1_o25, 1.075, 1.05, 3.0) },
      { pick: '1_under25', label: 'П1 и ТМ 2.5', shortLabel: 'П1 и ТМ 2.5', odd: oddFromProb(p1_u25, 1.075, 1.05, 3.0) },
      { pick: '2_over15', label: 'П2 и ТБ 1.5', shortLabel: 'П2 и ТБ 1.5', odd: oddFromProb(p2_o15, 1.075, 1.05, 3.0) },
      { pick: '2_over25', label: 'П2 и ТБ 2.5', shortLabel: 'П2 и ТБ 2.5', odd: oddFromProb(p2_o25, 1.075, 1.05, 3.0) },
      { pick: '2_under25', label: 'П2 и ТМ 2.5', shortLabel: 'П2 и ТМ 2.5', odd: oddFromProb(p2_u25, 1.075, 1.05, 3.0) },
      { pick: '1x_over15', label: '1Х и ТБ 1.5', shortLabel: '1Х и ТБ 1.5', odd: oddFromProb(p1x_o15, 1.07, 1.04, 3.0) },
      { pick: 'x2_over15', label: 'Х2 и ТБ 1.5', shortLabel: 'Х2 и ТБ 1.5', odd: oddFromProb(px2_o15, 1.07, 1.04, 3.0) },
      { pick: 'x_under25', label: 'Ничья и ТМ 2.5', shortLabel: 'Х и ТМ 2.5', odd: oddFromProb(px_u25, 1.075, 1.05, 3.0) },
    ]),
    mk('combo_w_btts', 'goals', 'Исход + Обе забьют', 'Победа/ничья и голы команд', [
      { pick: '1_btts_y', label: 'П1 и ОЗ — Да', shortLabel: 'П1 и ОЗ Да', odd: oddFromProb(p1_by, 1.075, 1.05, 3.0) },
      { pick: '1_btts_n', label: 'П1 и ОЗ — Нет', shortLabel: 'П1 и ОЗ Нет', odd: oddFromProb(p1_bn, 1.075, 1.05, 3.0) },
      { pick: '2_btts_y', label: 'П2 и ОЗ — Да', shortLabel: 'П2 и ОЗ Да', odd: oddFromProb(p2_by, 1.075, 1.05, 3.0) },
      { pick: '2_btts_n', label: 'П2 и ОЗ — Нет', shortLabel: 'П2 и ОЗ Нет', odd: oddFromProb(p2_bn, 1.075, 1.05, 3.0) },
      { pick: '1x_btts_y', label: '1Х и ОЗ — Да', shortLabel: '1Х и ОЗ Да', odd: oddFromProb(p1x_by, 1.07, 1.04, 3.0) },
      { pick: 'x2_btts_y', label: 'Х2 и ОЗ — Да', shortLabel: 'Х2 и ОЗ Да', odd: oddFromProb(px2_by, 1.07, 1.04, 3.0) },
    ]),

    // Halves
    mk('ht_outcome', 'halves', '1-й тайм: Исход', 'Счёт к перерыву', [
      { pick: '1', label: '1-й тайм: П1', shortLabel: '1Т П1', odd: oddHt1 },
      { pick: 'X', label: '1-й тайм: Ничья', shortLabel: '1Т Х', odd: oddHtX },
      { pick: '2', label: '1-й тайм: П2', shortLabel: '1Т П2', odd: oddHt2 },
    ]),
    mk('ht_total_0_5', 'halves', '1-й тайм: Тотал 0.5', 'Забитые мячи в 1-м тайме', [
      { pick: 'over_0_5', label: '1Т Тотал больше 0.5', shortLabel: '1Т ТБ 0.5', odd: oddHtO05 },
      { pick: 'under_0_5', label: '1Т Тотал меньше 0.5', shortLabel: '1Т ТМ 0.5', odd: oddHtU05 },
    ]),
    mk('ht_total_1_5', 'halves', '1-й тайм: Тотал 1.5', 'Результативность 1-го тайма', [
      { pick: 'over_1_5', label: '1Т Тотал больше 1.5', shortLabel: '1Т ТБ 1.5', odd: oddHtO15 },
      { pick: 'under_1_5', label: '1Т Тотал меньше 1.5', shortLabel: '1Т ТМ 1.5', odd: oddHtU15 },
    ]),
    mk('ht_ft', 'halves', 'Тайм / Матч', 'Итог 1-го тайма и итоговый результат', [
      { pick: '1_1', label: 'Тайм/Матч: П1 / П1', shortLabel: 'П1/П1', odd: oddFromProb(htFtProbs['1_1'], 1.10, 1.08, 3.0) },
      { pick: 'X_1', label: 'Тайм/Матч: Х / П1', shortLabel: 'Х/П1', odd: oddFromProb(htFtProbs['X_1'], 1.10, 1.10, 3.0) },
      { pick: '2_1', label: 'Тайм/Матч: П2 / П1', shortLabel: 'П2/П1', odd: oddFromProb(htFtProbs['2_1'], 1.12, 1.15, 3.0) },
      { pick: '1_X', label: 'Тайм/Матч: П1 / Х', shortLabel: 'П1/Х', odd: oddFromProb(htFtProbs['1_X'], 1.10, 1.12, 3.0) },
      { pick: 'X_X', label: 'Тайм/Матч: Х / Х', shortLabel: 'Х/Х', odd: oddFromProb(htFtProbs['X_X'], 1.10, 1.10, 3.0) },
      { pick: '2_X', label: 'Тайм/Матч: П2 / Х', shortLabel: 'П2/Х', odd: oddFromProb(htFtProbs['2_X'], 1.10, 1.12, 3.0) },
      { pick: '1_2', label: 'Тайм/Матч: П1 / П2', shortLabel: 'П1/П2', odd: oddFromProb(htFtProbs['1_2'], 1.12, 1.15, 3.0) },
      { pick: 'X_2', label: 'Тайм/Матч: Х / П2', shortLabel: 'Х/П2', odd: oddFromProb(htFtProbs['X_2'], 1.10, 1.10, 3.0) },
      { pick: '2_2', label: 'Тайм/Матч: П2 / П2', shortLabel: 'П2/П2', odd: oddFromProb(htFtProbs['2_2'], 1.10, 1.08, 3.0) },
    ]),

    // Stats & Events
    mk('corners', 'stats', 'Угловые: Тотал 8.5', 'Подачи с угла поля', [
      { pick: 'over_8_5', label: 'Угловых больше 8.5', shortLabel: 'Угл Б 8.5', odd: oddCoO85 },
      { pick: 'under_8_5', label: 'Угловых меньше 8.5', shortLabel: 'Угл М 8.5', odd: oddCoU85 },
    ]),
    mk('corners_9_5', 'stats', 'Угловые: Тотал 9.5', 'Повышенный тотал угловых', [
      { pick: 'over_9_5', label: 'Угловых больше 9.5', shortLabel: 'Угл Б 9.5', odd: oddCoO95 },
      { pick: 'under_9_5', label: 'Угловых меньше 9.5', shortLabel: 'Угл М 9.5', odd: oddCoU95 },
    ]),
    mk('corners_outcome', 'stats', 'Угловые: Исход', 'Кто подаст больше угловых', [
      { pick: '1', label: `Угловые: П1 (${homeNm})`, shortLabel: 'Угл П1', odd: oddCo1 },
      { pick: 'X', label: 'Угловые: Ничья', shortLabel: 'Угл Х', odd: oddCoX },
      { pick: '2', label: `Угловые: П2 (${awayNm})`, shortLabel: 'Угл П2', odd: oddCo2 },
    ]),
    mk('yellow_cards', 'stats', 'Жёлтые карточки: Тотал 3.5', 'Всего предупреждений', [
      { pick: 'over_3_5', label: 'ЖК больше 3.5', shortLabel: 'ЖК Б 3.5', odd: oddYcO35 },
      { pick: 'under_3_5', label: 'ЖК меньше 3.5', shortLabel: 'ЖК М 3.5', odd: oddYcU35 },
    ]),
    mk('yc_4_5', 'stats', 'Жёлтые карточки: Тотал 4.5', 'Жёсткость матча и судьи', [
      { pick: 'over_4_5', label: 'ЖК больше 4.5', shortLabel: 'ЖК Б 4.5', odd: oddYcO45 },
      { pick: 'under_4_5', label: 'ЖК меньше 4.5', shortLabel: 'ЖК М 4.5', odd: oddYcU45 },
    ]),
    mk('sot_7_5', 'stats', 'Удары в створ: Тотал 7.5', 'Удары в створ ворот', [
      { pick: 'over_7_5', label: 'Удары в створ больше 7.5', shortLabel: 'Створ Б 7.5', odd: oddSotO75 },
      { pick: 'under_7_5', label: 'Удары в створ меньше 7.5', shortLabel: 'Створ М 7.5', odd: oddSotU75 },
    ]),
    mk('sot_9_5', 'stats', 'Удары в створ: Тотал 9.5', 'Высокая острота у ворот', [
      { pick: 'over_9_5', label: 'Удары в створ больше 9.5', shortLabel: 'Створ Б 9.5', odd: oddSotO95 },
      { pick: 'under_9_5', label: 'Удары в створ меньше 9.5', shortLabel: 'Створ М 9.5', odd: oddSotU95 },
    ]),
    mk('fouls_21_5', 'stats', 'Фолы: Тотал 21.5', 'Суммарно нарушений правил', [
      { pick: 'over_21_5', label: 'Фолов больше 21.5', shortLabel: 'Фолы Б 21.5', odd: oddFoO215 },
      { pick: 'under_21_5', label: 'Фолов меньше 21.5', shortLabel: 'Фолы М 21.5', odd: oddFoU215 },
    ]),
    mk('penalty_yn', 'stats', 'Пенальти в матче', 'Назначение 11-метрового', [
      { pick: 'yes', label: 'Пенальти: Да', shortLabel: 'Пенальти Да', odd: oddPenY },
      { pick: 'no', label: 'Пенальти: Нет', shortLabel: 'Пенальти Нет', odd: oddPenN },
    ]),
    mk('red_yn', 'stats', 'Удаление (КК) в матче', 'Красная карточка любому игроку', [
      { pick: 'yes', label: 'Удаление (КК): Да', shortLabel: 'КК Да', odd: oddRedY },
      { pick: 'no', label: 'Удаление (КК): Нет', shortLabel: 'КК Нет', odd: oddRedN },
    ]),
    mk('goal_75_yn', 'stats', 'Гол на 75+ минуте', 'Забитый мяч в концовке', [
      { pick: 'yes', label: 'Гол на 75+ мин: Да', shortLabel: 'Гол 75+ Да', odd: oddLateY },
      { pick: 'no', label: 'Гол на 75+ мин: Нет', shortLabel: 'Гол 75+ Нет', odd: oddLateN },
    ]),
    {
      id: 'exact_score',
      group: 'exact',
      title: 'Точный счёт',
      subtitle: 'Итоговый счёт матча',
      options: [{ pick: 'exact', label: 'Точный счёт', shortLabel: 'Точн. счёт', odd: quickScores[0]?.odd || 1.48, basePts: 2 }],
    },
  ];

  return {
    markets,
    quickScores,
    exactMatrix,
    calcExactOdd,
    expectedGoals: { home: Math.round(lambdaH * 100) / 100, away: Math.round(lambdaA * 100) / 100 },
    probs: {
      p1: Math.round(p1 * 1000) / 10,
      pX: Math.round(pX * 1000) / 10,
      p2: Math.round(p2 * 1000) / 10,
    },
    refereeName: refName,
  };
}

interface PendingAdSession {
  token: string;
  blockKey: string;
  blockId: string;
  actorKey: string;
  tgId: string;
  startedAt: number;
  minWatchMs: number;
  requiresClick: boolean;
  clicked: boolean;
  verified: boolean;
  verifiedAt?: number;
  s2sConfirmed?: boolean;
  consumed: boolean;
  isAdminTest?: boolean;
}

const adSessions = new Map<string, PendingAdSession>();

interface SdkS2SRewardEntry {
  tgId: string;
  blockId: string;
  blockKey?: string;
  receivedAt: number;
  used: boolean;
}
const recentSdkS2SRewards: SdkS2SRewardEntry[] = [];

export interface AdEventLogItem {
  id: string;
  ts: number;
  iso: string;
  type: 'start' | 'complete' | 'credit' | 'cancel' | 'error' | 's2s' | 's2s_fail';
  blockKey: string;
  blockId: string;
  actorKey: string;
  actorLabel: string;
  tgId: string;
  detail: string;
  durationMs?: number;
  eur?: number;
  coins?: number;
}

const recentAdEvents: AdEventLogItem[] = [];
const memAdCounters: Record<string, {
  started: number;
  completed: number;
  errors: number;
  cancels: number;
  s2sReceived: number;
  s2sMatched: number;
}> = {};
const errorReasonCounts: Record<string, number> = {};

function getMemBlockCounter(blockKey: string) {
  const k = blockKey || '__unknown__';
  if (!memAdCounters[k]) {
    memAdCounters[k] = { started: 0, completed: 0, errors: 0, cancels: 0, s2sReceived: 0, s2sMatched: 0 };
  }
  return memAdCounters[k];
}

function ensureDbAdStat(db: any, blockKey: string) {
  db.adStats ||= {};
  if (!db.adStats[blockKey] || typeof db.adStats[blockKey] !== 'object') {
    db.adStats[blockKey] = { completed: 0, approved: 0, declined: 0, eur: 0, coins: 0, lastAt: 0 };
  }
  return db.adStats[blockKey];
}

function resolveActorLabelForLog(ctx: AdServerContext | null, actorKey: string, tgId?: string): string {
  if (!ctx) return actorKey || (tgId ? `TG #${tgId}` : 'Гость');
  try {
    const db = ctx.getDb();
    if (actorKey.startsWith('club:')) {
      const tid = actorKey.slice(5);
      const tName = ctx.tn(tid);
      const prof = db.ownerProfiles?.[actorKey];
      const extra = prof?.displayName ? ` (${prof.displayName})` : '';
      return tName ? `${tName}${extra}` : actorKey;
    }
    if (actorKey.startsWith('admin:')) return 'Администратор';
    const prof = db.ownerProfiles?.[actorKey];
    if (prof?.displayName) return prof.displayName;
    if (tgId && db.telegramUsers?.[`tg_${tgId}`]?.displayName) {
      return db.telegramUsers[`tg_${tgId}`].displayName;
    }
  } catch {}
  return tgId ? `TG #${tgId}` : (actorKey || 'Пользователь');
}

function pushAdEvent(
  ctx: AdServerContext | null,
  ev: {
    type: AdEventLogItem['type'];
    blockKey: string;
    blockId: string;
    actorKey: string;
    tgId?: string;
    detail: string;
    durationMs?: number;
    eur?: number;
    coins?: number;
  }
) {
  const now = Date.now();
  const tgId = String(ev.tgId || '').replace(/[^0-9]/g, '').slice(0, 32);
  recentAdEvents.unshift({
    id: 'adev_' + now.toString(36) + '_' + Math.random().toString(36).slice(2, 6),
    ts: now,
    iso: new Date(now).toISOString(),
    type: ev.type,
    blockKey: ev.blockKey || '',
    blockId: ev.blockId || '',
    actorKey: ev.actorKey || '',
    actorLabel: resolveActorLabelForLog(ctx, ev.actorKey || '', tgId),
    tgId,
    detail: String(ev.detail || '').slice(0, 260),
    durationMs: ev.durationMs,
    eur: ev.eur,
    coins: ev.coins,
  });
  if (recentAdEvents.length > 250) recentAdEvents.length = 250;
}

function bumpErrorReason(rawReason: string) {
  const clean = String(rawReason || '').trim().slice(0, 120);
  if (!clean) return;
  errorReasonCounts[clean] = (errorReasonCounts[clean] || 0) + 1;
}

function resolveBlockKeyBySdkId(db: any, blockId: string): string {
  const clean = String(blockId || '').trim();
  if (!clean) return '';
  const bare = clean.replace(/^(int-|task-)/i, '');
  const blocks = getAdsgramBlocks(db);
  for (const def of ADSGRAM_BLOCKS) {
    const cfg = String(blocks[def.key] || '').trim();
    if (!cfg) continue;
    if (cfg === clean || (bare && cfg.replace(/^(int-|task-)/i, '') === bare)) {
      return def.key;
    }
  }
  return '';
}

function pruneAdSessions() {
  const now = Date.now();
  for (const [k, v] of adSessions.entries()) {
    if (now - v.startedAt > 15 * 60 * 1000) adSessions.delete(k);
  }
  while (recentSdkS2SRewards.length > 500) {
    recentSdkS2SRewards.shift();
  }
  for (let i = recentSdkS2SRewards.length - 1; i >= 0; i--) {
    if (now - recentSdkS2SRewards[i].receivedAt > 20 * 60 * 1000) {
      recentSdkS2SRewards.splice(i, 1);
    }
  }
}

export function isConfiguredAdsgramBlockId(def: AdsgramBlockDef | undefined, rawBlockId: string): boolean {
  const v = String(rawBlockId || '').trim();
  if (!def || !v) return false;
  return /^\d+$/.test(v) || /^task-\d+$/i.test(v) || /^int-\d+$/i.test(v);
}

function recordSdkS2SReward(tgId: string, blockId: string, ctx?: AdServerContext) {
  pruneAdSessions();
  const cleanTg = String(tgId || '').replace(/[^0-9]/g, '').slice(0, 32);
  if (!cleanTg) return false;
  const cleanBlk = String(blockId || '').trim().slice(0, 64);
  const cleanBlkBare = cleanBlk.replace(/^(int-|task-)/i, '');
  const now = Date.now();
  let matchedBlockKey = ctx ? resolveBlockKeyBySdkId(ctx.getDb(), cleanBlk) : '';
  let matchedSession = false;
  // Mark any matching active session for this user as S2S confirmed
  for (const s of adSessions.values()) {
    const sBare = s.blockId.replace(/^(int-|task-)/i, '');
    if (
      !s.consumed &&
      s.tgId === cleanTg &&
      now - s.startedAt <= 15 * 60 * 1000 &&
      (!cleanBlk || cleanBlk === s.blockId || (cleanBlkBare && cleanBlkBare === sBare))
    ) {
      s.s2sConfirmed = true;
      matchedSession = true;
      if (!matchedBlockKey) matchedBlockKey = s.blockKey;
    }
  }
  recentSdkS2SRewards.push({
    tgId: cleanTg,
    blockId: cleanBlk,
    blockKey: matchedBlockKey || undefined,
    receivedAt: now,
    used: false,
  });
  const cnt = getMemBlockCounter(matchedBlockKey || '__unknown__');
  cnt.s2sReceived += 1;
  if (matchedSession) cnt.s2sMatched += 1;
  pushAdEvent(ctx || null, {
    type: 's2s',
    blockKey: matchedBlockKey,
    blockId: cleanBlk || '—',
    actorKey: `user:tg_${cleanTg}`,
    tgId: cleanTg,
    detail: matchedSession
      ? `S2S callback от Adsgram подтвердил активную сессию (${cleanBlk || 'без blockId'})`
      : `S2S callback получен (${cleanBlk || 'без blockId'})`,
  });
  return true;
}

function consumeSdkS2SReward(tgId: string, blockId: string, startedAt: number): boolean {
  if (!tgId) return false;
  const now = Date.now();
  const blockBare = String(blockId || '').replace(/^(int-|task-)/i, '');
  for (let i = recentSdkS2SRewards.length - 1; i >= 0; i--) {
    const entry = recentSdkS2SRewards[i];
    const entryBare = String(entry.blockId || '').replace(/^(int-|task-)/i, '');
    if (
      !entry.used &&
      entry.tgId === tgId &&
      entry.receivedAt >= startedAt - 5000 &&
      now - entry.receivedAt <= 15 * 60 * 1000 &&
      (!entry.blockId || entry.blockId === blockId || (entryBare && entryBare === blockBare))
    ) {
      entry.used = true;
      return true;
    }
  }
  return false;
}

export function getAdsgramBlocks(db: any): Record<string, string> {
  db.settings ||= {};
  const saved = db.settings.adsgramBlocks && typeof db.settings.adsgramBlocks === 'object' ? db.settings.adsgramBlocks : {};
  const out: Record<string, string> = {};
  for (const b of ADSGRAM_BLOCKS) {
    const candidate = String(saved[b.key] || '').trim();
    out[b.key] = isConfiguredAdsgramBlockId(b, candidate) ? candidate : b.defaultBlockId;
  }
  return out;
}

function cleanClientId(raw: any): string {
  const s = String(raw || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64);
  return s || 'anon';
}

export function resolveActor(req: any): {
  actorKey: string;
  type: 'club' | 'admin' | 'user';
  teamId: string | null;
  clientId: string;
} {
  const cid = cleanClientId(req.headers?.['x-client-id'] || req.body?.clientId || req.query?.clientId);
  if (req.me?.role === 'club' && req.me.teamId) {
    return { actorKey: `club:${req.me.teamId}`, type: 'club', teamId: req.me.teamId, clientId: cid };
  }
  if (req.me?.role === 'admin') {
    const qTid = String(req.body?.teamId || req.query?.teamId || '').trim();
    if (qTid) {
      return { actorKey: `club:${qTid}`, type: 'club', teamId: qTid, clientId: cid };
    }
    return { actorKey: `admin:${cid}`, type: 'admin', teamId: null, clientId: cid };
  }
  return { actorKey: `user:${cid}`, type: 'user', teamId: null, clientId: cid };
}

function ensureSponsorState(db: any, teamId: string) {
  db.sponsorCycles ||= {};
  const now = Date.now();
  let st = db.sponsorCycles[teamId];
  if (!st || typeof st !== 'object') {
    st = {
      cycleStartedAt: 0,
      views: { gazprom_neft: 0, tbank: 0, aeroflot: 0 },
      approved: { gazprom_neft: 0, tbank: 0, aeroflot: 0 },
      declined: { gazprom_neft: 0, tbank: 0, aeroflot: 0 },
      lastAdAt: {},
      earnedEur: 0,
      rfsClaimed: false,
      rfsExtraViews: 0,
      rfsEarnedEur: 0,
      history: [],
    };
    db.sponsorCycles[teamId] = st;
  }
  if (st.cycleStartedAt > 0 && now - st.cycleStartedAt >= CYCLE_MS) {
    st.cycleStartedAt = 0;
    st.views = { gazprom_neft: 0, tbank: 0, aeroflot: 0 };
    st.approved = { gazprom_neft: 0, tbank: 0, aeroflot: 0 };
    st.declined = { gazprom_neft: 0, tbank: 0, aeroflot: 0 };
    st.lastAdAt = {};
    st.earnedEur = 0;
    st.rfsClaimed = false;
    st.rfsExtraViews = 0;
    st.rfsEarnedEur = 0;
  }
  st.views ||= { gazprom_neft: 0, tbank: 0, aeroflot: 0 };
  st.approved ||= { gazprom_neft: 0, tbank: 0, aeroflot: 0 };
  st.declined ||= { gazprom_neft: 0, tbank: 0, aeroflot: 0 };
  st.lastAdAt ||= {};
  st.history ||= [];
  return st;
}

export function buildSponsorSummary(ctx: AdServerContext, teamId: string) {
  const db = ctx.getDb();
  const st = ensureSponsorState(db, teamId);
  const blocks = getAdsgramBlocks(db);
  const now = Date.now();
  const rawTotalViews = SPONSORS.reduce((acc, s) => acc + Math.min(s.maxViews, Number(st.views[s.id] || 0)), 0);
  const totalViews = Math.min(RFS_REQUIRED_VIEWS, rawTotalViews);
  const totalRequired = RFS_REQUIRED_VIEWS;
  const resetAt = st.cycleStartedAt > 0 ? st.cycleStartedAt + CYCLE_MS : null;
  const remainingMs = resetAt ? Math.max(0, resetAt - now) : 0;
  const rfsUnlocked = rawTotalViews >= RFS_REQUIRED_VIEWS;
  const rfsCooldownLeft = getCooldownLeftMs(st.lastAdAt.rfs);

  return {
    cycleStartedAt: st.cycleStartedAt || null,
    resetAt,
    remainingMs,
    cooldownMs: AD_COOLDOWN_MS,
    totalViews,
    rawTotalViews,
    totalRequired,
    rfsUnlocked,
    rfsClaimed: !!st.rfsClaimed,
    rfsExtraViews: Number(st.rfsExtraViews || 0),
    rfsMaxViews: 30,
    rfsRewardPerAd: 1000,
    rfsEarnedEur: Number(st.rfsEarnedEur || 0),
    rfsCooldownRemainingMs: rfsCooldownLeft,
    rfsNextAvailableAt: rfsCooldownLeft > 0 ? now + rfsCooldownLeft : null,
    earnedEurCycle: Number(st.earnedEur || 0),
    rfsBlockId: blocks.rfs_bonus,
    sponsors: SPONSORS.map((s) => {
      const cdLeft = getCooldownLeftMs(st.lastAdAt[s.id]);
      const def = ADSGRAM_BLOCKS.find((b) => b.key === s.blockKey);
      const blkId = blocks[s.blockKey];
      return {
        ...s,
        blockId: blkId,
        blockConfigured: isConfiguredAdsgramBlockId(def, blkId),
        views: Math.min(s.maxViews, Number(st.views[s.id] || 0)),
        approvedCount: Number(st.approved[s.id] || 0),
        declinedCount: Number(st.declined[s.id] || 0),
        remaining: Math.max(0, s.maxViews - Number(st.views[s.id] || 0)),
        cooldownRemainingMs: cdLeft,
        nextAvailableAt: cdLeft > 0 ? now + cdLeft : null,
      };
    }),
    rfsBlockConfigured: isConfiguredAdsgramBlockId(ADSGRAM_BLOCKS.find((b) => b.key === 'rfs_bonus'), blocks.rfs_bonus),
    history: (st.history || []).slice(0, 15),
  };
}

export function verifyAndParseTelegramAuth(
  db: any,
  initData: string | undefined,
  fallbackUser: any,
  headers?: any,
  botTokenOverride?: string
): {
  ok: boolean;
  verified: boolean;
  tgId: string;
  displayName: string;
  username: string;
  photoUrl: string;
} | null {
  const botToken = String(
    botTokenOverride ||
    process.env.TELEGRAM_BOT_TOKEN ||
    process.env.TG_BOT_TOKEN ||
    process.env.TG_TOKEN ||
    db?.settings?.tgToken ||
    ''
  ).trim();
  let parsedUser: any = null;
  let verified = false;

  if (initData && typeof initData === 'string' && initData.includes('user=')) {
    try {
      const params = new URLSearchParams(initData);
      const userJson = params.get('user');
      const hash = params.get('hash');
      if (userJson) parsedUser = JSON.parse(userJson);
      if (botToken && hash) {
        const entries: string[] = [];
        params.forEach((v, k) => {
          if (k !== 'hash') entries.push(`${k}=${v}`);
        });
        entries.sort();
        const dataCheckString = entries.join('\n');
        const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
        const calcHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
        if (calcHash === hash) {
          verified = true;
        }
      }
    } catch {
      parsedUser = null;
    }
  }

  if (!parsedUser && fallbackUser && typeof fallbackUser === 'object' && fallbackUser.id) {
    parsedUser = fallbackUser;
  }

  if (!parsedUser && headers?.['x-tg-id']) {
    parsedUser = {
      id: headers['x-tg-id'],
      first_name: decodeHeaderTxt(headers['x-tg-name']),
      username: decodeHeaderTxt(headers['x-tg-username']),
      photo_url: decodeHeaderTxt(headers['x-tg-photo']),
    };
  }

  if (!parsedUser || !parsedUser.id) return null;
  const tgId = String(parsedUser.id).replace(/[^0-9]/g, '').slice(0, 32);
  if (!tgId) return null;

  const first = String(parsedUser.first_name || '').trim();
  const last = String(parsedUser.last_name || '').trim();
  const username = String(parsedUser.username || '').replace(/^@/, '').trim().slice(0, 48);
  const fullName = [first, last].filter(Boolean).join(' ').trim() || (username ? `@${username}` : `Болельщик #${tgId.slice(-4)}`);
  const rawPhoto = String(parsedUser.photo_url || '').trim();
  const photoUrl = /^https?:\/\//i.test(rawPhoto) ? rawPhoto.slice(0, 500) : '';

  return { ok: true, verified, tgId, displayName: fullName.slice(0, 60), username, photoUrl };
}

function decodeHeaderTxt(raw: any): string {
  if (!raw) return '';
  const s = String(raw);
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export function extractTgHintsFromReq(ctx: AdServerContext, req: any): {
  tgId?: string;
  username?: string;
  name?: string;
  photo?: string;
} {
  const db = ctx.getDb();
  const tgParsed = verifyAndParseTelegramAuth(db, req.body?.tgInitData, req.body?.tgUser, req.headers, ctx.getTgBotToken?.());
  if (tgParsed) {
    return {
      tgId: tgParsed.tgId,
      username: tgParsed.username,
      name: tgParsed.displayName,
      photo: tgParsed.photoUrl,
    };
  }
  const hName = ctx.cleanTxt(decodeHeaderTxt(req.headers?.['x-tg-name']), 60);
  const hPhoto = String(req.headers?.['x-tg-photo'] || '').trim();
  const cid = cleanClientId(req.headers?.['x-client-id']);
  const tgIdFromCid = cid.startsWith('tg_') ? cid.slice(3) : '';
  const stored = tgIdFromCid ? db.telegramUsers?.[`tg_${tgIdFromCid}`] : null;
  return {
    tgId: tgIdFromCid || stored?.tgId || undefined,
    username: stored?.username || undefined,
    name: hName || stored?.displayName || undefined,
    photo: /^https?:\/\//i.test(hPhoto) ? hPhoto : stored?.photoUrl || undefined,
  };
}

export function ensureOwnerProfile(
  ctx: AdServerContext,
  actorKey: string,
  hintName?: string,
  hintPhoto?: string,
  hintTg?: { tgId?: string; username?: string }
) {
  const db = ctx.getDb();
  db.ownerProfiles ||= {};
  const isClub = actorKey.startsWith('club:');
  const isAdmin = actorKey.startsWith('admin:');
  const profileKind: 'owner' | 'spectator' | 'admin' = isClub ? 'owner' : isAdmin ? 'admin' : 'spectator';
  const teamId = isClub ? actorKey.slice(5) : null;
  const t = teamId ? ctx.team(teamId) : null;

  let existing = db.ownerProfiles[actorKey];
  let linkedTgKey = '';
  if (actorKey.startsWith('user:tg_')) {
    linkedTgKey = actorKey.slice(5);
  } else if (hintTg?.tgId) {
    linkedTgKey = `tg_${hintTg.tgId}`;
  } else if (existing?.telegramId) {
    linkedTgKey = `tg_${existing.telegramId}`;
  } else if (teamId && db.telegramClubLinks) {
    for (const [k, tid] of Object.entries(db.telegramClubLinks)) {
      if (tid === teamId) {
        linkedTgKey = k;
        break;
      }
    }
  }

  const tgRec = linkedTgKey ? db.telegramUsers?.[linkedTgKey] : null;
  const specRec = linkedTgKey ? db.ownerProfiles?.[`user:${linkedTgKey}`] : null;
  const isLegacyClubPlaceholder = (name: any) => typeof name === 'string' && /^Владелец ФК\b/.test(name.trim());
  const cleanRealName = (name: any) => {
    const s = String(name || '').trim();
    if (!s || isLegacyClubPlaceholder(s) || s === 'Зритель РПЛ' || s === 'Участник') return '';
    return s;
  };

  const effTgId = hintTg?.tgId || tgRec?.tgId || specRec?.telegramId || (linkedTgKey.startsWith('tg_') ? linkedTgKey.slice(3) : undefined) || undefined;
  const effTgUsername = hintTg?.username || tgRec?.username || specRec?.telegramUsername || undefined;
  const effName = cleanRealName(hintName) || cleanRealName(tgRec?.displayName) || cleanRealName(specRec?.displayName) || undefined;
  const effPhoto = hintPhoto || tgRec?.photoUrl || specRec?.photoUrl || undefined;
  const fallbackName = effTgUsername ? `@${effTgUsername}` : isAdmin ? 'Администратор лиги' : 'Участник';

  let prof = existing;
  if (!prof) {
    prof = {
      actorKey,
      type: isClub ? 'club' : 'user',
      profileKind,
      teamId: teamId || null,
      favoriteTeamId: null,
      telegramId: effTgId || null,
      telegramUsername: effTgUsername || '',
      displayName: effName || fallbackName,
      photoUrl: effPhoto || '',
      bio: '',
      career: isClub && t ? `Руководство клубом «${t.name}» в лиге ${ctx.compName(t.comp || 'rpl')}.` : '',
      trophies: [],
      customName: false,
      customPhoto: false,
      updatedAt: new Date().toISOString(),
    };
    db.ownerProfiles[actorKey] = prof;
  } else {
    prof.profileKind = profileKind;
    if (effTgId && !prof.telegramId) prof.telegramId = effTgId;
    if (effTgUsername && !prof.telegramUsername) prof.telegramUsername = effTgUsername;
    if (!prof.customName) {
      if (effName) {
        prof.displayName = effName;
      } else if (isLegacyClubPlaceholder(prof.displayName)) {
        prof.displayName = fallbackName;
      }
    }
    if (effPhoto && !prof.customPhoto && !prof.photoUrl) {
      prof.photoUrl = effPhoto;
    } else if (effPhoto && !prof.customPhoto && (hintPhoto || tgRec?.photoUrl)) {
      prof.photoUrl = effPhoto;
    }
    if (teamId && !prof.teamId) prof.teamId = teamId;
  }
  prof.trophies ||= [];
  return prof;
}

export function linkTelegramToClub(
  ctx: AdServerContext,
  teamId: string,
  req: any
) {
  const db = ctx.getDb();
  const hints = extractTgHintsFromReq(ctx, req);
  if (hints.tgId) {
    const tgKey = `tg_${hints.tgId}`;
    db.telegramClubLinks ||= {};
    db.telegramClubLinks[tgKey] = teamId;
    db.telegramUsers ||= {};
    if (!db.telegramUsers[tgKey] && hints.name) {
      db.telegramUsers[tgKey] = {
        tgId: hints.tgId,
        displayName: hints.name,
        username: hints.username || '',
        photoUrl: hints.photo || '',
        updatedAt: new Date().toISOString(),
      };
    }
  }
  if (teamId) {
    ensureOwnerProfile(ctx, `club:${teamId}`, hints.name, hints.photo, {
      tgId: hints.tgId,
      username: hints.username,
    });
  }
}

export function ensureWallet(db: any, actorKey: string) {
  db.predictionWallets ||= {};
  let w = db.predictionWallets[actorKey];
  const now = Date.now();
  if (!w) {
    w = {
      coins: STARTER_COINS,
      totalEarnedCoins: STARTER_COINS,
      cycleStartedAt: 0,
      adCounts: { coins_short: 0, coins_banner: 0, coins_long: 0 },
      lastAdAt: {},
    };
    db.predictionWallets[actorKey] = w;
  }
  if (w.cycleStartedAt > 0 && now - w.cycleStartedAt >= CYCLE_MS) {
    w.cycleStartedAt = 0;
    w.adCounts = { coins_short: 0, coins_banner: 0, coins_long: 0 };
    w.lastAdAt = {};
  }
  w.adCounts ||= { coins_short: 0, coins_banner: 0, coins_long: 0 };
  w.lastAdAt ||= {};
  return w;
}

export function verifyAndConsumeAdProof(
  adProof: string | undefined,
  expectedBlockKey: string,
  actorKey: string,
  requireClick = false,
  callerRole?: string
): { ok: true } | { ok: false; error: string } {
  if (!adProof) return { ok: false, error: 'Необходимо просмотреть рекламу Adsgram перед выполнением действия.' };
  const s = adSessions.get(String(adProof));
  if (!s) return { ok: false, error: 'Рекламная сессия не найдена или истекла. Посмотрите рекламу заново.' };
  if (s.consumed) return { ok: false, error: 'Этот просмотр рекламы уже использован.' };
  if (!s.verified) return { ok: false, error: 'Просмотр рекламы не завершён и не подтверждён.' };
  const now = Date.now();
  if (now - (s.verifiedAt || s.startedAt) > 10 * 60 * 1000) {
    adSessions.delete(s.token);
    return { ok: false, error: 'Подтверждение просмотра рекламы истекло. Посмотрите рекламу заново.' };
  }
  if (s.blockKey !== expectedBlockKey) return { ok: false, error: 'Несоответствие рекламного блока Adsgram.' };
  const def = ADSGRAM_BLOCKS.find((b) => b.key === expectedBlockKey);
  if (!isConfiguredAdsgramBlockId(def, s.blockId)) {
    adSessions.delete(s.token);
    return { ok: false, error: 'Рекламный блок Adsgram не настроен.' };
  }
  const adminClubBridge =
    callerRole === 'admin' && s.actorKey.startsWith('admin:') && actorKey.startsWith('club:');
  if (s.actorKey !== actorKey && !adminClubBridge) {
    return { ok: false, error: 'Сессия рекламы принадлежит другому пользователю.' };
  }
  if (requireClick && !s.clicked) {
    return { ok: false, error: 'Для выполнения действия необходимо полностью завершить рекламный показ.' };
  }
  s.consumed = true;
  return { ok: true };
}

const NATIONAL_BLOCK_KEYS = [
  'nt_propose_player',
  'nt_vote_player',
  'nt_propose_opp',
  'nt_vote_opp',
  'nt_u21_propose_player',
  'nt_u21_vote_player',
  'nt_u21_propose_opp',
  'nt_u21_vote_opp',
] as const;

type NationalBlockKey = (typeof NATIONAL_BLOCK_KEYS)[number];

function normalizeNationalBlockKey(blockKey?: string): NationalBlockKey {
  if ((NATIONAL_BLOCK_KEYS as readonly string[]).includes(String(blockKey || ''))) {
    return blockKey as NationalBlockKey;
  }
  return 'nt_propose_player';
}

function ensureNationalAdState(db: any, actorKey: string, blockKey?: string) {
  db.nationalAdUsage ||= {};
  const now = Date.now();
  let actorMap = db.nationalAdUsage[actorKey];
  if (!actorMap || typeof actorMap !== 'object' || typeof actorMap.views === 'number' || typeof actorMap.cycleStartedAt === 'number') {
    actorMap = {};
    db.nationalAdUsage[actorKey] = actorMap;
  }
  const bk = normalizeNationalBlockKey(blockKey);
  let st = actorMap[bk];
  if (!st || typeof st !== 'object') {
    st = { cycleStartedAt: 0, views: 0, lastAdAt: 0 };
    actorMap[bk] = st;
  }
  if (st.cycleStartedAt > 0 && now - st.cycleStartedAt >= CYCLE_MS) {
    st.cycleStartedAt = 0;
    st.views = 0;
    st.lastAdAt = 0;
  }
  st.views = Math.max(0, Number(st.views || 0));
  st.lastAdAt = Number(st.lastAdAt || 0);
  return st;
}

export function buildNationalAdSummary(db: any, actorKey: string) {
  const now = Date.now();
  const buttons: Record<string, { limitReached: boolean; cooldownRemainingMs: number; nextAvailableAt: number | null }> = {};
  for (const bk of NATIONAL_BLOCK_KEYS) {
    const st = ensureNationalAdState(db, actorKey, bk);
    const views = Math.min(NATIONAL_AD_MAX_PER_DAY, Number(st.views || 0));
    const limitReached = views >= NATIONAL_AD_MAX_PER_DAY;
    const cdLeft = limitReached ? 0 : getCooldownLeftMs(st.lastAdAt);
    buttons[bk] = {
      limitReached,
      cooldownRemainingMs: cdLeft,
      nextAvailableAt: cdLeft > 0 ? now + cdLeft : null,
    };
  }
  return {
    cooldownMs: AD_COOLDOWN_MS,
    buttons,
  };
}

export function checkNationalAdAllowed(
  db: any,
  actorKey: string,
  blockKey?: string
): { ok: true } | { ok: false; error: string } {
  const st = ensureNationalAdState(db, actorKey, blockKey);
  if (Number(st.views || 0) >= NATIONAL_AD_MAX_PER_DAY) {
    return {
      ok: false,
      error: 'На сегодня лимит пройден.',
    };
  }
  const cdLeft = getCooldownLeftMs(st.lastAdAt);
  if (cdLeft > 0) {
    return {
      ok: false,
      error: `Перерыв между рекламами для этой кнопки: подождите ещё ${fmtCooldownWords(cdLeft)}.`,
    };
  }
  return { ok: true };
}

function recordNationalAdUsage(ctx: AdServerContext, actorKey: string, blockKey: string) {
  const db = ctx.getDb();
  const bk = normalizeNationalBlockKey(blockKey);
  const st = ensureNationalAdState(db, actorKey, bk);
  const now = Date.now();
  if (!st.cycleStartedAt) st.cycleStartedAt = now;
  st.views = Number(st.views || 0) + 1;
  st.lastAdAt = now;

  const dbStat = ensureDbAdStat(db, bk);
  dbStat.completed = Number(dbStat.completed || 0) + 1;
  dbStat.lastAt = now;

  const blocks = getAdsgramBlocks(db);
  pushAdEvent(ctx, {
    type: 'credit',
    blockKey: bk,
    blockId: blocks[bk] || bk,
    actorKey,
    detail: `Реклама в разделе сборной (${bk})`,
  });
}

function ensureCategoryCooldownMap(db: any, category: 'friendly' | 'interview' | 'transfer'): Record<string, number> {
  db.adCooldowns ||= {};
  db.adCooldowns[category] ||= {};
  return db.adCooldowns[category];
}

export function getFriendlyCooldownSummary(db: any, actorKey: string) {
  const map = ensureCategoryCooldownMap(db, 'friendly');
  const now = Date.now();
  const cdLeft = getCooldownLeftMs(map[actorKey]);
  return {
    cooldownMs: AD_COOLDOWN_MS,
    cooldownRemainingMs: cdLeft,
    nextAvailableAt: cdLeft > 0 ? now + cdLeft : null,
  };
}

export function getInterviewCooldownSummary(db: any, actorKey: string) {
  const map = ensureCategoryCooldownMap(db, 'interview');
  const now = Date.now();
  const cdLeft = getCooldownLeftMs(map[actorKey]);
  return {
    cooldownMs: AD_COOLDOWN_MS,
    cooldownRemainingMs: cdLeft,
    nextAvailableAt: cdLeft > 0 ? now + cdLeft : null,
  };
}

export function checkInterviewAdAllowed(
  db: any,
  actorKey: string
): { ok: true } | { ok: false; error: string } {
  const cd = getInterviewCooldownSummary(db, actorKey);
  if (cd.cooldownRemainingMs > 0) {
    return {
      ok: false,
      error: `Перерыв между рекламами: подождите ещё ${fmtCooldownWords(cd.cooldownRemainingMs)}.`,
    };
  }
  return { ok: true };
}

export function recordInterviewAdCooldown(db: any, actorKey: string) {
  const map = ensureCategoryCooldownMap(db, 'interview');
  map[actorKey] = Date.now();
}

export function getTransferCooldownSummary(db: any, actorKey: string) {
  const map = ensureCategoryCooldownMap(db, 'transfer');
  const now = Date.now();
  const lastAt = Number(map[actorKey] || 0);
  const cdLeft = lastAt ? Math.max(0, lastAt + TRANSFER_COOLDOWN_MS - now) : 0;
  return {
    cooldownMs: TRANSFER_COOLDOWN_MS,
    cooldownRemainingMs: cdLeft,
    nextAvailableAt: cdLeft > 0 ? now + cdLeft : null,
  };
}

export function checkTransferAdAllowed(
  db: any,
  actorKey: string
): { ok: true } | { ok: false; error: string } {
  const cd = getTransferCooldownSummary(db, actorKey);
  if (cd.cooldownRemainingMs > 0) {
    return {
      ok: false,
      error: `Перерыв на рекламу: подождите ещё ${fmtCooldownWords(cd.cooldownRemainingMs)}.`,
    };
  }
  return { ok: true };
}

export function recordTransferAdCooldown(db: any, actorKey: string) {
  const map = ensureCategoryCooldownMap(db, 'transfer');
  map[actorKey] = Date.now();
}

export function getFriendlyBreakUsage(db: any, teamId: string): Record<string, number> {
  db.friendlyAdUsage ||= {};
  const rec = db.friendlyAdUsage[teamId];
  return rec && typeof rec === 'object' ? { ...rec } : {};
}

export function checkAndConsumeFriendlyRequestAd(
  db: any,
  teamId: string,
  breakId: string,
  actorKey: string,
  adProof?: string
): { ok: true; used: number; limit: number } | { ok: false; error: string } {
  db.friendlyAdUsage ||= {};
  db.friendlyAdUsage[teamId] ||= {};
  const used = Number(db.friendlyAdUsage[teamId][breakId] || 0);
  if (used >= FRIENDLY_BREAK_LIMIT) {
    return {
      ok: false,
      error: `Достигнут лимит заявок на товарищеские матчи за этот перерыв на сборные (${FRIENDLY_BREAK_LIMIT}/${FRIENDLY_BREAK_LIMIT}).`,
    };
  }
  const frCd = getFriendlyCooldownSummary(db, actorKey);
  if (frCd.cooldownRemainingMs > 0) {
    return {
      ok: false,
      error: `Перерыв между рекламами: подождите ещё ${fmtCooldownWords(frCd.cooldownRemainingMs)}.`,
    };
  }
  const v = verifyAndConsumeAdProof(adProof, 'friendly_request', actorKey, true, actorKey.startsWith('club:') ? 'admin' : undefined);
  if (!v.ok) return v;
  db.friendlyAdUsage[teamId][breakId] = used + 1;
  ensureCategoryCooldownMap(db, 'friendly')[actorKey] = Date.now();
  return { ok: true, used: used + 1, limit: FRIENDLY_BREAK_LIMIT };
}

export function checkAndConsumeFriendlyAcceptAd(
  db: any,
  actorKey: string,
  adProof?: string
): { ok: true } | { ok: false; error: string } {
  const frCd = getFriendlyCooldownSummary(db, actorKey);
  if (frCd.cooldownRemainingMs > 0) {
    return {
      ok: false,
      error: `Перерыв между рекламами: подождите ещё ${fmtCooldownWords(frCd.cooldownRemainingMs)}.`,
    };
  }
  const v = verifyAndConsumeAdProof(adProof, 'friendly_accept', actorKey, false, actorKey.startsWith('club:') ? 'admin' : undefined);
  if (!v.ok) return v;
  ensureCategoryCooldownMap(db, 'friendly')[actorKey] = Date.now();
  return { ok: true };
}

function extractFixtureMatchSummary(ctx: AdServerContext, f: any) {
  const hg = Number(f.hg);
  const ag = Number(f.ag);
  const st = f.st || null;
  const matchObj = ctx.getMatch ? ctx.getMatch(f.id) : null;
  const events: any[] = Array.isArray(matchObj?.events) ? matchObj.events : [];
  const hasStats = !!(st && st.teams && st.teams.home && st.teams.away);
  const hasEvents = events.length > 0;

  let totalYc: number | null = null;
  let totalCorners: number | null = null;
  let homeCorners: number | null = null;
  let awayCorners: number | null = null;
  let totalSot: number | null = null;
  let totalFouls: number | null = null;
  let totalPenalties: number | null = null;
  let totalRed: number | null = null;
  let lateGoal75: boolean | null = null;
  let htH: number | null = null;
  let htA: number | null = null;
  let htDraw: boolean | null = null;
  let firstGoalSide: 'home' | 'away' | 'none' | null = null;

  if (hasStats) {
    totalYc = Number(st.teams.home.yc || 0) + Number(st.teams.away.yc || 0);
    homeCorners = Number(st.teams.home.co || 0);
    awayCorners = Number(st.teams.away.co || 0);
    totalCorners = homeCorners + awayCorners;
    totalSot = Number(st.teams.home.sot || 0) + Number(st.teams.away.sot || 0);
    totalFouls = Number(st.teams.home.fo || 0) + Number(st.teams.away.fo || 0);
    totalPenalties = Number(st.teams.home.penF || 0) + Number(st.teams.away.penF || 0);
    totalRed = Number(st.teams.home.rc || 0) + Number(st.teams.away.rc || 0);
  } else if (hasEvents) {
    totalYc = events.filter((e) => e.type === 'yellow').length;
    homeCorners = events.filter((e) => e.type === 'corner' && e.team === 'home').length;
    awayCorners = events.filter((e) => e.type === 'corner' && e.team === 'away').length;
    totalCorners = homeCorners + awayCorners;
    totalSot = events.filter((e) => e.type === 'goal' || e.type === 'save').length;
    totalFouls = events.filter((e) => e.type === 'foul').length;
    totalPenalties = events.filter((e) => e.type === 'penalty').length;
    totalRed = events.filter((e) => e.type === 'red').length;
  }

  if (typeof f.lateGoal75 === 'boolean') {
    lateGoal75 = f.lateGoal75;
  } else if (hasEvents) {
    lateGoal75 = events.some((e) => (e.type === 'goal' || e.type === 'own_goal') && Number(e.min || 0) >= 75);
  }

  if (Array.isArray(f.ht) && f.ht.length >= 2) {
    htH = Number(f.ht[0]);
    htA = Number(f.ht[1]);
    htDraw = htH === htA;
  } else if (hasEvents) {
    let h1 = 0;
    let a1 = 0;
    for (const ev of events) {
      if (ev.type === 'halftime') break;
      if (Number(ev.min || 0) > 45 && !events.some((x) => x.type === 'halftime')) break;
      if (ev.type === 'goal' || ev.type === 'own_goal') {
        if (ev.team === 'home') h1++;
        else if (ev.team === 'away') a1++;
      }
    }
    htH = h1;
    htA = a1;
    htDraw = h1 === a1;
  }

  if (hg === 0 && ag === 0) {
    firstGoalSide = 'none';
  } else if (hasEvents) {
    const fg = events.find((e) => e.type === 'goal' || e.type === 'own_goal');
    if (fg && (fg.team === 'home' || fg.team === 'away')) firstGoalSide = fg.team;
  }

  return {
    hg,
    ag,
    htH,
    htA,
    htDraw,
    firstGoalSide,
    totalYc,
    totalCorners,
    homeCorners,
    awayCorners,
    totalSot,
    totalFouls,
    totalPenalties,
    totalRed,
    lateGoal75,
    hasStats,
  };
}

export function settlePredictionsForFixture(ctx: AdServerContext, f: any): number {
  if (!f || f.status !== 'done') return 0;
  const db = ctx.getDb();
  if (!Array.isArray(db.predictions) || !db.predictions.length) return 0;
  const hg = Number(f.hg);
  const ag = Number(f.ag);
  if (!Number.isFinite(hg) || !Number.isFinite(ag)) return 0;
  const sum = extractFixtureMatchSummary(ctx, f);
  const actual: '1' | 'X' | '2' = hg > ag ? '1' : hg < ag ? '2' : 'X';
  const tot = hg + ag;
  const diffG = hg - ag;
  const bothScored = hg > 0 && ag > 0;

  let settledCount = 0;
  const nowIso = new Date().toISOString();

  const detailBits: string[] = [`${hg}:${ag}`];
  if (sum.htH !== null && sum.htA !== null) detailBits.push(`1Т ${sum.htH}:${sum.htA}`);
  if (sum.totalYc !== null) detailBits.push(`ЖК ${sum.totalYc}`);
  if (sum.totalCorners !== null) detailBits.push(`Угл ${sum.totalCorners}`);
  if (sum.totalSot !== null) detailBits.push(`Створ ${sum.totalSot}`);
  if (sum.totalPenalties !== null && sum.totalPenalties > 0) detailBits.push(`Пен ${sum.totalPenalties}`);
  if (sum.totalRed !== null && sum.totalRed > 0) detailBits.push(`КК ${sum.totalRed}`);
  const statSummaryText = detailBits.join(' · ');

  for (const p of db.predictions) {
    if (p.fixtureId !== f.id || p.status !== 'pending') continue;
    const stake = Math.max(1, Number(p.stake || 1));
    const market = String(p.market || 'outcome');
    const found = findMarketOption(market, p.pick);
    const odd = Number(p.odd || found?.option.odd || 1.35);
    const basePts = Number(p.basePts || Math.max(1, Math.round(odd * 1.5)) || found?.option.basePts || 3);

    let outcomeState: 'won' | 'lost' | 'void' = 'lost';
    let exactBonus = false;

    if (market === 'outcome') {
      outcomeState = p.pick === actual ? 'won' : 'lost';
      if (
        outcomeState === 'won' &&
        p.exactHome !== null &&
        p.exactHome !== undefined &&
        p.exactAway !== null &&
        p.exactAway !== undefined &&
        Number(p.exactHome) === hg &&
        Number(p.exactAway) === ag
      ) {
        exactBonus = true;
      }
    } else if (market === 'double_chance') {
      const ok =
        (p.pick === '1X' && (actual === '1' || actual === 'X')) ||
        (p.pick === '12' && (actual === '1' || actual === '2')) ||
        (p.pick === 'X2' && (actual === 'X' || actual === '2'));
      outcomeState = ok ? 'won' : 'lost';
    } else if (market === 'hcp_0') {
      if (diffG === 0) outcomeState = 'void';
      else outcomeState = p.pick === 'f1_0' ? (diffG > 0 ? 'won' : 'lost') : (diffG < 0 ? 'won' : 'lost');
    } else if (market === 'hcp_m10') {
      if (diffG === 1) outcomeState = 'void';
      else outcomeState = p.pick === 'f1_m10' ? (diffG >= 2 ? 'won' : 'lost') : (diffG <= 0 ? 'won' : 'lost');
    } else if (market === 'hcp_m15') {
      outcomeState = p.pick === 'f1_m15' ? (diffG >= 2 ? 'won' : 'lost') : (diffG <= 1 ? 'won' : 'lost');
    } else if (market === 'hcp_p10') {
      if (diffG === -1) outcomeState = 'void';
      else outcomeState = p.pick === 'f1_p10' ? (diffG >= 0 ? 'won' : 'lost') : (diffG <= -2 ? 'won' : 'lost');
    } else if (market === 'hcp_p15') {
      outcomeState = p.pick === 'f1_p15' ? (diffG >= -1 ? 'won' : 'lost') : (diffG <= -2 ? 'won' : 'lost');
    } else if (market === 'total_1_5') {
      outcomeState = p.pick === 'over_1_5' ? (tot >= 2 ? 'won' : 'lost') : (tot <= 1 ? 'won' : 'lost');
    } else if (market === 'total_2_0') {
      if (tot === 2) outcomeState = 'void';
      else outcomeState = p.pick === 'over_2_0' ? (tot >= 3 ? 'won' : 'lost') : (tot <= 1 ? 'won' : 'lost');
    } else if (market === 'total_goals') {
      outcomeState = p.pick === 'over_2_5' ? (tot >= 3 ? 'won' : 'lost') : (tot <= 2 ? 'won' : 'lost');
    } else if (market === 'total_3_0') {
      if (tot === 3) outcomeState = 'void';
      else outcomeState = p.pick === 'over_3_0' ? (tot >= 4 ? 'won' : 'lost') : (tot <= 2 ? 'won' : 'lost');
    } else if (market === 'total_3_5') {
      outcomeState = p.pick === 'over_3_5' ? (tot >= 4 ? 'won' : 'lost') : (tot <= 3 ? 'won' : 'lost');
    } else if (market === 'btts') {
      outcomeState = p.pick === 'yes' ? (bothScored ? 'won' : 'lost') : (!bothScored ? 'won' : 'lost');
    } else if (market === 'it1_0_5') {
      outcomeState = p.pick === 'over_0_5' ? (hg >= 1 ? 'won' : 'lost') : (hg === 0 ? 'won' : 'lost');
    } else if (market === 'it1_1_5') {
      outcomeState = p.pick === 'over_1_5' ? (hg >= 2 ? 'won' : 'lost') : (hg <= 1 ? 'won' : 'lost');
    } else if (market === 'it2_0_5') {
      outcomeState = p.pick === 'over_0_5' ? (ag >= 1 ? 'won' : 'lost') : (ag === 0 ? 'won' : 'lost');
    } else if (market === 'it2_1_5') {
      outcomeState = p.pick === 'over_1_5' ? (ag >= 2 ? 'won' : 'lost') : (ag <= 1 ? 'won' : 'lost');
    } else if (market === 'first_goal') {
      outcomeState = sum.firstGoalSide === null ? 'void' : (p.pick === sum.firstGoalSide ? 'won' : 'lost');
    } else if (market === 'both_halves_goal') {
      if (sum.htH === null || sum.htA === null) outcomeState = 'void';
      else {
        const g1 = sum.htH + sum.htA;
        const g2 = Math.max(0, (hg - sum.htH) + (ag - sum.htA));
        const ok = g1 >= 1 && g2 >= 1;
        outcomeState = p.pick === 'yes' ? (ok ? 'won' : 'lost') : (!ok ? 'won' : 'lost');
      }
    } else if (market === 'combo_w_total') {
      const checks: Record<string, boolean> = {
        '1_over15': actual === '1' && tot >= 2,
        '1_over25': actual === '1' && tot >= 3,
        '1_under25': actual === '1' && tot <= 2,
        '2_over15': actual === '2' && tot >= 2,
        '2_over25': actual === '2' && tot >= 3,
        '2_under25': actual === '2' && tot <= 2,
        '1x_over15': (actual === '1' || actual === 'X') && tot >= 2,
        'x2_over15': (actual === 'X' || actual === '2') && tot >= 2,
        'x_under25': actual === 'X' && tot <= 2,
      };
      outcomeState = checks[p.pick] ? 'won' : 'lost';
    } else if (market === 'combo_w_btts') {
      const checks: Record<string, boolean> = {
        '1_btts_y': actual === '1' && bothScored,
        '1_btts_n': actual === '1' && !bothScored,
        '2_btts_y': actual === '2' && bothScored,
        '2_btts_n': actual === '2' && !bothScored,
        '1x_btts_y': (actual === '1' || actual === 'X') && bothScored,
        'x2_btts_y': (actual === 'X' || actual === '2') && bothScored,
      };
      outcomeState = checks[p.pick] ? 'won' : 'lost';
    } else if (market === 'ht_outcome') {
      if (sum.htH === null || sum.htA === null) outcomeState = 'void';
      else {
        const htActual = sum.htH > sum.htA ? '1' : sum.htH < sum.htA ? '2' : 'X';
        outcomeState = p.pick === htActual ? 'won' : 'lost';
      }
    } else if (market === 'ht_total_0_5') {
      if (sum.htH === null || sum.htA === null) outcomeState = 'void';
      else {
        const htTot = sum.htH + sum.htA;
        outcomeState = p.pick === 'over_0_5' ? (htTot >= 1 ? 'won' : 'lost') : (htTot === 0 ? 'won' : 'lost');
      }
    } else if (market === 'ht_total_1_5') {
      if (sum.htH === null || sum.htA === null) outcomeState = 'void';
      else {
        const htTot = sum.htH + sum.htA;
        outcomeState = p.pick === 'over_1_5' ? (htTot >= 2 ? 'won' : 'lost') : (htTot <= 1 ? 'won' : 'lost');
      }
    } else if (market === 'ht_ft') {
      if (sum.htH === null || sum.htA === null) outcomeState = 'void';
      else {
        const htActual = sum.htH > sum.htA ? '1' : sum.htH < sum.htA ? '2' : 'X';
        outcomeState = p.pick === `${htActual}_${actual}` ? 'won' : 'lost';
      }
    } else if (market === 'exact_score') {
      const eh = Number(p.exactHome);
      const ea = Number(p.exactAway);
      outcomeState = Number.isFinite(eh) && Number.isFinite(ea) && eh === hg && ea === ag ? 'won' : 'lost';
    } else if (market === 'yellow_cards') {
      if (sum.totalYc === null) outcomeState = 'void';
      else outcomeState = p.pick === 'over_3_5' ? (sum.totalYc >= 4 ? 'won' : 'lost') : (sum.totalYc <= 3 ? 'won' : 'lost');
    } else if (market === 'yc_4_5') {
      if (sum.totalYc === null) outcomeState = 'void';
      else outcomeState = p.pick === 'over_4_5' ? (sum.totalYc >= 5 ? 'won' : 'lost') : (sum.totalYc <= 4 ? 'won' : 'lost');
    } else if (market === 'corners') {
      if (sum.totalCorners === null) outcomeState = 'void';
      else outcomeState = p.pick === 'over_8_5' ? (sum.totalCorners >= 9 ? 'won' : 'lost') : (sum.totalCorners <= 8 ? 'won' : 'lost');
    } else if (market === 'corners_9_5') {
      if (sum.totalCorners === null) outcomeState = 'void';
      else outcomeState = p.pick === 'over_9_5' ? (sum.totalCorners >= 10 ? 'won' : 'lost') : (sum.totalCorners <= 9 ? 'won' : 'lost');
    } else if (market === 'corners_outcome') {
      if (sum.homeCorners === null || sum.awayCorners === null) outcomeState = 'void';
      else {
        const coAct = sum.homeCorners > sum.awayCorners ? '1' : sum.homeCorners < sum.awayCorners ? '2' : 'X';
        outcomeState = p.pick === coAct ? 'won' : 'lost';
      }
    } else if (market === 'sot_7_5') {
      if (sum.totalSot === null) outcomeState = 'void';
      else outcomeState = p.pick === 'over_7_5' ? (sum.totalSot >= 8 ? 'won' : 'lost') : (sum.totalSot <= 7 ? 'won' : 'lost');
    } else if (market === 'sot_9_5') {
      if (sum.totalSot === null) outcomeState = 'void';
      else outcomeState = p.pick === 'over_9_5' ? (sum.totalSot >= 10 ? 'won' : 'lost') : (sum.totalSot <= 9 ? 'won' : 'lost');
    } else if (market === 'fouls_21_5') {
      if (sum.totalFouls === null) outcomeState = 'void';
      else outcomeState = p.pick === 'over_21_5' ? (sum.totalFouls >= 22 ? 'won' : 'lost') : (sum.totalFouls <= 21 ? 'won' : 'lost');
    } else if (market === 'penalty_yn') {
      if (sum.totalPenalties === null) outcomeState = 'void';
      else outcomeState = p.pick === 'yes' ? (sum.totalPenalties > 0 ? 'won' : 'lost') : (sum.totalPenalties === 0 ? 'won' : 'lost');
    } else if (market === 'red_yn') {
      if (sum.totalRed === null) outcomeState = 'void';
      else outcomeState = p.pick === 'yes' ? (sum.totalRed > 0 ? 'won' : 'lost') : (sum.totalRed === 0 ? 'won' : 'lost');
    } else if (market === 'goal_75_yn') {
      if (sum.lateGoal75 === null) outcomeState = 'void';
      else outcomeState = p.pick === 'yes' ? (sum.lateGoal75 ? 'won' : 'lost') : (!sum.lateGoal75 ? 'won' : 'lost');
    } else if (market === 'specials') {
      if (p.pick === 'penalty_yes') {
        outcomeState = sum.totalPenalties === null ? 'void' : sum.totalPenalties > 0 ? 'won' : 'lost';
      } else if (p.pick === 'red_yes') {
        outcomeState = sum.totalRed === null ? 'void' : sum.totalRed > 0 ? 'won' : 'lost';
      } else if (p.pick === 'goal_75_plus') {
        outcomeState = sum.lateGoal75 === null ? 'void' : sum.lateGoal75 ? 'won' : 'lost';
      } else if (p.pick === 'ht_draw') {
        outcomeState = sum.htDraw === null ? 'void' : sum.htDraw ? 'won' : 'lost';
      }
    }

    p.status = outcomeState;
    p.actualOutcome = actual;
    p.actualScore = `${hg}:${ag}`;
    p.statSummary = statSummaryText;
    p.settledAt = nowIso;

    if (outcomeState === 'won') {
      const pts = Math.max(1, Math.round(stake * odd * 1.5)) + (exactBonus ? 5 : 0);
      const coinsBack = roundCoins(stake * odd) + (exactBonus ? 2 : 0);
      p.pointsAwarded = pts;
      p.coinsWon = coinsBack;
      p.exactHit = exactBonus || market === 'exact_score';
      const w = ensureWallet(db, p.actorKey);
      w.coins = roundCoins(Number(w.coins || 0) + coinsBack);
      w.totalEarnedCoins = roundCoins(Number(w.totalEarnedCoins || 0) + coinsBack);
    } else if (outcomeState === 'void') {
      p.pointsAwarded = 0;
      p.coinsWon = roundCoins(stake);
      p.exactHit = false;
      const w = ensureWallet(db, p.actorKey);
      w.coins = roundCoins(Number(w.coins || 0) + stake);
    } else {
      p.pointsAwarded = 0;
      p.coinsWon = 0;
      p.exactHit = false;
    }
    settledCount++;
  }
  return settledCount;
}

export function computePredictionLeaderboard(ctx: AdServerContext, season: string, filterMembers?: Set<string>) {
  const db = ctx.getDb();
  const preds = (Array.isArray(db.predictions) ? db.predictions : []).filter((p: any) => p.season === season);
  const wallets = db.predictionWallets || {};
  const profiles = db.ownerProfiles || {};
  const tgLinks = db.telegramClubLinks || {};

  // Build canonical identity mapping so a Telegram user with both user:tg_... and club:... (or admin:...) is never duplicated
  const tgIdToClubKey = new Map<string, string>();
  const usernameToClubKey = new Map<string, string>();
  const tgIdToAdminKey = new Map<string, string>();
  const usernameToAdminKey = new Map<string, string>();

  for (const [tgKey, tid] of Object.entries(tgLinks)) {
    const cleanTg = String(tgKey || '').replace(/^tg_/, '').replace(/[^0-9]/g, '');
    if (cleanTg && typeof tid === 'string' && ctx.team(tid)) {
      tgIdToClubKey.set(cleanTg, `club:${tid}`);
    }
  }
  for (const [k, p] of Object.entries(profiles) as Array<[string, any]>) {
    if (!p || typeof p !== 'object') continue;
    const tgId = String(p.telegramId || '').replace(/[^0-9]/g, '');
    const uname = String(p.telegramUsername || '').trim().toLowerCase();
    if (k.startsWith('club:')) {
      if (tgId && !tgIdToClubKey.has(tgId)) tgIdToClubKey.set(tgId, k);
      if (uname && !usernameToClubKey.has(uname)) usernameToClubKey.set(uname, k);
    } else if (k.startsWith('admin:')) {
      if (tgId && !tgIdToAdminKey.has(tgId)) tgIdToAdminKey.set(tgId, k);
      if (uname && !usernameToAdminKey.has(uname)) usernameToAdminKey.set(uname, k);
    }
  }

  const canonicalActorKey = (rawKey: string): string => {
    if (!rawKey) return rawKey;
    if (rawKey.startsWith('club:') || rawKey.startsWith('admin:')) return rawKey;
    const prof = profiles[rawKey];
    const tgId = String(
      prof?.telegramId || (rawKey.startsWith('user:tg_') ? rawKey.slice(8) : '')
    ).replace(/[^0-9]/g, '');
    const uname = String(prof?.telegramUsername || '').trim().toLowerCase();
    if (tgId && tgIdToClubKey.has(tgId)) return tgIdToClubKey.get(tgId)!;
    if (uname && usernameToClubKey.has(uname)) return usernameToClubKey.get(uname)!;
    if (tgId && tgIdToAdminKey.has(tgId)) return tgIdToAdminKey.get(tgId)!;
    if (uname && usernameToAdminKey.has(uname)) return usernameToAdminKey.get(uname)!;
    if (tgId && profiles[`user:tg_${tgId}`]) return `user:tg_${tgId}`;
    return rawKey;
  };

  const isGenericDisplayName = (name: any) => {
    const s = String(name || '').trim();
    return !s || /^Владелец ФК\b/.test(s) || s === 'Зритель РПЛ' || s === 'Участник' || s === 'Администратор лиги';
  };

  const map = new Map<string, any>();
  const ensureEntry = (rawActorKey: string) => {
    const actorKey = canonicalActorKey(rawActorKey);
    const rawProf = rawActorKey !== actorKey ? profiles[rawActorKey] : null;
    if (map.has(actorKey)) {
      const existing = map.get(actorKey);
      if (rawActorKey !== actorKey && !existing.aliasSet.has(rawActorKey)) {
        existing.aliasSet.add(rawActorKey);
        existing.coins = Math.max(existing.coins, Number(wallets[rawActorKey]?.coins ?? 0));
      }
      if (rawProf) {
        if (isGenericDisplayName(existing.displayName) && !isGenericDisplayName(rawProf.displayName)) {
          existing.displayName = rawProf.displayName;
        }
        if (!existing.photoUrl && rawProf.photoUrl) {
          existing.photoUrl = rawProf.photoUrl;
        }
        if (!existing.telegramUsername && rawProf.telegramUsername) {
          existing.telegramUsername = rawProf.telegramUsername;
        }
      }
      return existing;
    }
    const prof = ensureOwnerProfile(
      ctx,
      actorKey,
      rawProf?.displayName,
      rawProf?.photoUrl,
      rawProf?.telegramId || rawProf?.telegramUsername
        ? { tgId: rawProf.telegramId || undefined, username: rawProf.telegramUsername || undefined }
        : undefined
    );
    const tid = prof.teamId || (actorKey.startsWith('club:') ? actorKey.slice(5) : null);
    const t = tid ? ctx.team(tid) : null;
    const favT = prof.favoriteTeamId ? ctx.team(prof.favoriteTeamId) : null;
    const profileKind = prof.profileKind || (actorKey.startsWith('club:') ? 'owner' : actorKey.startsWith('admin:') ? 'admin' : 'spectator');
    const cupCount = (Array.isArray(db.predictionSeasonAwards) ? db.predictionSeasonAwards : []).filter((aw: any) =>
      Array.isArray(aw?.winners) && aw.winners.some((w: any) => w.actorKey === actorKey && (w.hasCup || w.place === 1))
    ).length;
    const cleanDisplayName = !isGenericDisplayName(prof.displayName)
      ? prof.displayName
      : prof.telegramUsername
        ? `@${prof.telegramUsername}`
        : profileKind === 'admin'
          ? 'Администратор лиги'
          : 'Участник';
    const entry = {
      actorKey,
      aliasSet: new Set<string>([actorKey, rawActorKey]),
      profileKind,
      displayName: cleanDisplayName,
      photoUrl: prof.photoUrl || '',
      telegramUsername: prof.telegramUsername || '',
      teamId: tid,
      teamName: t?.name || null,
      teamLogo: tid ? ctx.teamLogo(tid) : null,
      favoriteTeamName: favT?.name || null,
      cups: cupCount,
      correct: 0,
      wrong: 0,
      pending: 0,
      exactHits: 0,
      total: 0,
      kpd: 0,
      points: 0,
      coinsWon: 0,
      coins: Number(wallets[actorKey]?.coins ?? wallets[rawActorKey]?.coins ?? STARTER_COINS),
    };
    map.set(actorKey, entry);
    return entry;
  };

  for (const key of Object.keys(wallets)) {
    if (!filterMembers || filterMembers.has(key) || filterMembers.has(canonicalActorKey(key))) ensureEntry(key);
  }
  for (const key of Object.keys(profiles)) {
    if (!filterMembers || filterMembers.has(key) || filterMembers.has(canonicalActorKey(key))) ensureEntry(key);
  }
  if (filterMembers) {
    for (const key of filterMembers) ensureEntry(key);
  }

  for (const p of preds) {
    const canon = canonicalActorKey(p.actorKey);
    if (filterMembers && !filterMembers.has(p.actorKey) && !filterMembers.has(canon)) continue;
    const row = ensureEntry(p.actorKey);
    if (p.status === 'won') {
      row.correct++;
      row.total++;
      row.points += Number(p.pointsAwarded || 0);
      row.coinsWon += Number(p.coinsWon || 0);
      if (p.exactHit) row.exactHits++;
    } else if (p.status === 'lost') {
      row.wrong++;
      row.total++;
    } else if (p.status === 'pending') {
      row.pending++;
    }
  }

  const list = Array.from(map.values()).map(({ aliasSet, ...r }) => ({
    ...r,
    aliasActorKeys: Array.from(aliasSet),
    kpd: r.total > 0 ? Math.round((r.correct / r.total) * 1000) / 10 : 0,
  }));

  list.sort(
    (a, b) =>
      b.points - a.points ||
      b.correct - a.correct ||
      b.kpd - a.kpd ||
      a.wrong - b.wrong ||
      a.displayName.localeCompare(b.displayName, 'ru')
  );

  return list.map((r, idx) => ({ ...r, rank: idx + 1 }));
}

export function awardSeasonPredictionPrizes(ctx: AdServerContext, season?: string) {
  const db = ctx.getDb();
  const targetSeason = season || ctx.S();
  db.predictionSeasonAwards ||= [];
  if (db.predictionSeasonAwards.some((a: any) => a.season === targetSeason)) {
    return { alreadyAwarded: true, season: targetSeason, winners: [] };
  }
  ctx.ensureInitialBudgets();
  const board = computePredictionLeaderboard(ctx, targetSeason).filter((r) => r.total > 0 || r.points > 0);
  const top3 = board.slice(0, 3);
  if (!top3.length) {
    return { alreadyAwarded: false, season: targetSeason, winners: [] };
  }
  const nowIso = new Date().toISOString();
  const winners: any[] = [];

  top3.forEach((row, idx) => {
    const prize = SEASON_PRIZES[idx];
    const w = ensureWallet(db, row.actorKey);
    w.coins = Number(w.coins || 0) + prize.prizeCoins;
    w.totalEarnedCoins = Number(w.totalEarnedCoins || 0) + prize.prizeCoins;

    let awardedEur = 0;
    if (row.teamId) {
      const t = ctx.team(row.teamId);
      if (t) {
        t.budget = Number(t.budget || 0) + prize.prizeEur;
        awardedEur = prize.prizeEur;
        if (prize.hasCup) {
          t.predictionCups ||= [];
          t.predictionCups.unshift({
            id: 'pcup_' + ctx.uid(),
            season: targetSeason,
            title: prize.cupTitle,
            winnerName: row.displayName,
            date: nowIso.slice(0, 10),
          });
        }
        db.budgetHistory ||= [];
        db.budgetHistory.push({
          id: 'bh_' + ctx.uid(),
          teamId: t.id,
          amount: prize.prizeEur,
          type: 'prediction_prize',
          typeLabel: 'Приз Лиги прогнозов',
          description: `${prize.badge} (Сезон ${targetSeason}): +€${prize.prizeEur.toLocaleString('ru-RU')}, +${prize.prizeCoins} мон.${prize.hasCup ? ' + Кубок победителя' : ''}`,
          date: nowIso,
        });
      }
    }

    const prof = ensureOwnerProfile(ctx, row.actorKey);
    prof.trophies ||= [];
    prof.trophies.unshift({
      id: 'tr_' + ctx.uid(),
      title: `${prize.badge} — Сезон ${targetSeason}`,
      detail: `Очки: ${row.points} · Угадано: ${row.correct}/${row.total} · КПД: ${row.kpd}%${prize.hasCup ? ' · Награда: Кубок победителя' : ''}`,
      date: nowIso.slice(0, 10),
    });

    winners.push({
      place: prize.place,
      badge: prize.badge,
      hasCup: !!prize.hasCup,
      cupTitle: prize.cupTitle || '',
      actorKey: row.actorKey,
      displayName: row.displayName,
      teamId: row.teamId,
      teamName: row.teamName,
      points: row.points,
      correct: row.correct,
      wrong: row.wrong,
      kpd: row.kpd,
      prizeEur: awardedEur,
      prizeCoins: prize.prizeCoins,
    });
  });

  const record = { season: targetSeason, awardedAt: nowIso, winners };
  db.predictionSeasonAwards.unshift(record);
  ctx.save();
  return { alreadyAwarded: false, ...record };
}

export function getNationalProposals(ntCurrent: any) {
  ntCurrent.playerProposals ||= [];
  ntCurrent.opponentProposals ||= [];
  return {
    playerProposals: ntCurrent.playerProposals as Array<{
      pid: string;
      proposedBy: string;
      proposedByTeamId: string | null;
      proposedByName: string;
      note: string;
      votes: number;
      voters: string[];
      createdAt: string;
    }>,
    opponentProposals: ntCurrent.opponentProposals as Array<{
      id: string;
      opponent: string;
      comment: string;
      proposedBy: string;
      proposedByName: string;
      votes: number;
      voters: string[];
      createdAt: string;
    }>,
  };
}

/**
 * Applies fan/club proposal vote priority to the national team pool:
 * - Good-form players receive a bounded tie-breaker bonus proportional to votes
 *   so 4 votes beats 1 vote when both played well.
 * - Terrible-form players (matches > 0 and rating < 5.9) get ZERO vote boost so
 *   a terribly performing player with 4 votes will still lose to a solid player with 1 vote.
 */
export function scoreNationalCandidateWithVotes(
  p: any,
  votesMap: Map<string, number>,
  opts?: { isAbroad?: boolean }
): number {
  const rating = Number(p.rating || 0);
  const goals = Number(p.goals || 0);
  const assists = Number(p.assists || 0);
  const ovr = Number(p.ovr || 70);
  const matches = Number(p.matches || 0);
  const abroad = Boolean(
    opts?.isAbroad ||
    (p?.abroadClub && String(p.abroadClub).trim()) ||
    p?.teamComp === 'europe' ||
    p?.isAbroad
  );
  let baseScore = rating * 10 + goals * 3 + assists * 2 + ovr * 0.2;
  if (abroad) {
    // Легионеры за границей обычно не имеют матчей в статистике РПЛ, но должны иметь высокий приоритет
    baseScore += 92 + Math.max(0, ovr - 65) * 2.4;
  }
  const votes = votesMap.get(p.id) || 0;
  if (votes <= 0) return baseScore;
  const terribleForm = !abroad && matches > 0 && rating > 0 && rating < 5.9;
  if (terribleForm) return baseScore;
  const voteBonus = Math.min(votes, 15) * 2.5;
  return baseScore + voteBonus;
}

export function buildNationalProposalAiLines(ntCurrent: any): {
  votesMap: Map<string, number>;
  notesByPid: Map<string, string>;
  aiInstructionSuffix: string;
} {
  const { playerProposals } = getNationalProposals(ntCurrent);
  const votesMap = new Map<string, number>();
  const notesByPid = new Map<string, string>();
  for (const prop of playerProposals) {
    votesMap.set(prop.pid, Number(prop.votes || 1));
    if (prop.note) notesByPid.set(prop.pid, prop.note);
  }
  const abroadHint = ' ВАЖНО: Российские легионеры, выступающие за рубежом (помечены [ЛЕГИОНЕР: ...]), имеют ВЫСОКИЙ ПРИОРИТЕТ при вызове в сборную, даже если у них 0 матчей в статистике РПЛ — они получают практику в зарубежных чемпионатах и должны активно вызываться в состав.';
  const aiInstructionSuffix = (playerProposals.length
    ? ' Клубы и болельщики предложили часть кандидатов через голосование (указано [ПРЕДЛОЖЕН: X гол.]). Если два игрока показывают сопоставимые хорошие результаты и осталось спорное место в заявке — отдавай приоритет игроку с большим числом голосов (например 4 голоса важнее 1). Но если игрок с высоким числом голосов играет откровенно плохо (низкий рейтинг < 5.9 или провальная форма), бери достойно играющего кандидата даже с 1 голосом.'
    : '') + abroadHint;
  return { votesMap, notesByPid, aiInstructionSuffix };
}

function executeSponsorCredit(
  ctx: AdServerContext,
  teamId: string,
  sp: SponsorConfig
): { ok: true; approved: boolean; amount: number; newBudget: number; message: string; summary: any } | { ok: false; error: string } {
  const db = ctx.getDb();
  const st = ensureSponsorState(db, teamId);
  const currentViews = Number(st.views[sp.id] || 0);
  if (currentViews >= sp.maxViews) {
    return {
      ok: false,
      error: `Лимит показов у спонсора «${sp.name}» исчерпан (${sp.maxViews}/${sp.maxViews}) в этом 24-часовом цикле.`,
    };
  }
  const cdLeft = getCooldownLeftMs(st.lastAdAt[sp.id]);
  if (cdLeft > 0) {
    return {
      ok: false,
      error: `Перерыв между рекламами у спонсора «${sp.name}»: подождите ещё ${fmtCooldownWords(cdLeft)}.`,
    };
  }
  const now = Date.now();
  if (!st.cycleStartedAt) st.cycleStartedAt = now;
  st.views[sp.id] = currentViews + 1;
  st.lastAdAt[sp.id] = now;

  const approved = Math.random() < sp.approvalRate;
  const t = ctx.team(teamId);
  ctx.ensureInitialBudgets();
  const nowIso = new Date().toISOString();

  if (approved) {
    st.approved[sp.id] = Number(st.approved[sp.id] || 0) + 1;
    st.earnedEur = Number(st.earnedEur || 0) + sp.rewardEur;
    if (t) {
      t.budget = Number(t.budget || 0) + sp.rewardEur;
      db.budgetHistory ||= [];
      db.budgetHistory.push({
        id: 'bh_' + ctx.uid(),
        teamId: t.id,
        amount: sp.rewardEur,
        type: 'sponsor_ad',
        typeLabel: `Спонсор: ${sp.name}`,
        description: `${sp.name} (${sp.formatLabel}): +€${sp.rewardEur.toLocaleString('ru-RU')}`,
        date: nowIso,
      });
    }
  } else {
    st.declined[sp.id] = Number(st.declined[sp.id] || 0) + 1;
  }

  st.history.unshift({
    id: 'sph_' + ctx.uid(),
    sponsorId: sp.id,
    sponsorName: sp.name,
    approved,
    amount: approved ? sp.rewardEur : 0,
    date: nowIso,
  });
  st.history = st.history.slice(0, 30);

  const dbStat = ensureDbAdStat(db, sp.blockKey);
  if (approved) {
    dbStat.approved = Number(dbStat.approved || 0) + 1;
    dbStat.eur = Number(dbStat.eur || 0) + sp.rewardEur;
  } else {
    dbStat.declined = Number(dbStat.declined || 0) + 1;
  }
  dbStat.lastAt = now;

  const blocks = getAdsgramBlocks(db);
  pushAdEvent(ctx, {
    type: 'credit',
    blockKey: sp.blockKey,
    blockId: blocks[sp.blockKey] || sp.blockKey,
    actorKey: `club:${teamId}`,
    detail: approved
      ? `Спонсор «${sp.name}» одобрил выплату +€${sp.rewardEur.toLocaleString('ru-RU')}`
      : `Спонсор «${sp.name}» отклонил выплату (шанс 5%), показ ${st.views[sp.id]}/${sp.maxViews} засчитан`,
    eur: approved ? sp.rewardEur : 0,
  });

  ctx.save();
  const summary = buildSponsorSummary(ctx, teamId);
  return {
    ok: true,
    approved,
    amount: approved ? sp.rewardEur : 0,
    newBudget: t?.budget || 0,
    message: approved
      ? `Спонсор «${sp.name}» одобрил заявку! Начислено +€${sp.rewardEur.toLocaleString('ru-RU')}.`
      : `Спонсор «${sp.name}» отклонил запрос на финансирование (шанс отказа 5%), но просмотр засчитан в прогресс к бонусу РФС!`,
    summary,
  };
}

function executeCoinsCredit(
  ctx: AdServerContext,
  actorKey: string,
  blockKey: 'coins_short' | 'coins_banner' | 'coins_long'
): { ok: true; coinsAdded: number; coins: number; message: string } | { ok: false; error: string } {
  const db = ctx.getDb();
  const rewardMap: Record<string, number> = { coins_short: 1, coins_banner: 2, coins_long: 3 };
  const reward = rewardMap[blockKey];
  if (!reward) return { ok: false, error: 'Неверный тип рекламы для получения монет' };

  const wallet = ensureWallet(db, actorKey);
  const maxViews = PREDICTION_AD_MAX_PER_CYCLE;
  const cur = Number(wallet.adCounts[blockKey] || 0);
  if (cur >= maxViews) {
    return {
      ok: false,
      error: `Достигнут лимит рекламного блока (${maxViews}/${maxViews} за 24 часа). Выберите другой формат или дождитесь сброса.`,
    };
  }
  const cdLeft = getCooldownLeftMs(wallet.lastAdAt[blockKey]);
  if (cdLeft > 0) {
    return {
      ok: false,
      error: `Перерыв между рекламами: подождите ещё ${fmtCooldownWords(cdLeft)}.`,
    };
  }
  const now = Date.now();
  if (!wallet.cycleStartedAt) wallet.cycleStartedAt = now;
  wallet.adCounts[blockKey] = cur + 1;
  wallet.lastAdAt[blockKey] = now;
  wallet.coins = roundCoins(Number(wallet.coins || 0) + reward);
  wallet.totalEarnedCoins = roundCoins(Number(wallet.totalEarnedCoins || 0) + reward);

  const dbStat = ensureDbAdStat(db, blockKey);
  dbStat.coins = Number(dbStat.coins || 0) + reward;
  dbStat.lastAt = now;

  const blocks = getAdsgramBlocks(db);
  pushAdEvent(ctx, {
    type: 'credit',
    blockKey,
    blockId: blocks[blockKey] || blockKey,
    actorKey,
    detail: `Начислено +${reward} мон. за рекламу прогнозов (баланс: ${wallet.coins})`,
    coins: reward,
  });

  ctx.save();

  return {
    ok: true,
    coinsAdded: reward,
    coins: wallet.coins,
    message: `Начислено +${reward} ${reward === 1 ? 'монета' : 'монеты'} за просмотр рекламы!`,
  };
}

export function registerAdsAndPredictionsRoutes(app: Express, ctx: AdServerContext) {
  // ─── Adsgram Config & Ad Session Lifecycle ────────────────────────────────────
  app.get('/api/ads/config', (req, res) => {
    const db = ctx.getDb();
    const blocks = getAdsgramBlocks(db);
    const configuredBlocks: Record<string, boolean> = {};
    for (const def of ADSGRAM_BLOCKS) {
      configuredBlocks[def.key] = isConfiguredAdsgramBlockId(def, blocks[def.key]);
    }
    res.json({
      blocks,
      configuredBlocks,
      requireAdsgramS2S: !!db.settings?.requireAdsgramS2S,
      defs: ADSGRAM_BLOCKS,
      sponsors: SPONSORS,
      seasonPrizes: SEASON_PRIZES,
    });
  });

  app.post('/api/ads/start', (req, res) => {
    pruneAdSessions();
    const blockKey = String(req.body?.blockKey || '').trim();
    const def = ADSGRAM_BLOCKS.find((b) => b.key === blockKey);
    if (!def) return ctx.fail(res, 'Неизвестный рекламный блок Adsgram');
    const db = ctx.getDb();
    const blocks = getAdsgramBlocks(db);
    const blockId = String(blocks[blockKey] || '').trim();
    if (!isConfiguredAdsgramBlockId(def, blockId)) {
      return ctx.fail(
        res,
        `Рекламный блок «${def.label}» ещё не настроен (сейчас указана заглушка «${blockId}»). Укажите реальный Block ID из кабинета Adsgram в Админке → Настройки.`
      );
    }

    const actor = resolveActor(req);
    const hints = extractTgHintsFromReq(ctx, req);
    const tgId = String(hints.tgId || '').replace(/[^0-9]/g, '');
    const supportsS2S = !blockId.toLowerCase().startsWith('int-');
    if (db.settings?.requireAdsgramS2S && supportsS2S && !tgId) {
      return ctx.fail(res, 'Для строгой S2S-проверки просмотра рекламы откройте игру внутри Telegram Mini App.');
    }

    const isAdminTest = req.body?.isAdminTest === true && (req as any).me?.role === 'admin';
    if (!isAdminTest) {
      if (blockKey === 'coins_short' || blockKey === 'coins_banner' || blockKey === 'coins_long') {
        const wallet = ensureWallet(db, actor.actorKey);
        const maxViews = PREDICTION_AD_MAX_PER_CYCLE;
        if (Number(wallet.adCounts[blockKey] || 0) >= maxViews) {
          return ctx.fail(res, `Достигнут лимит блока (${maxViews}/${maxViews} за 24 часа).`);
        }
        const cdLeft = getCooldownLeftMs(wallet.lastAdAt[blockKey]);
        if (cdLeft > 0) {
          return ctx.fail(res, `Перерыв между рекламами: подождите ещё ${fmtCooldownWords(cdLeft)}.`);
        }
      } else if ((blockKey === 'sponsor_long' || blockKey === 'sponsor_short' || blockKey === 'sponsor_banner') && actor.teamId) {
        const sp = SPONSORS.find((x) => x.blockKey === blockKey);
        if (sp) {
          const st = ensureSponsorState(db, actor.teamId);
          if (Number(st.views[sp.id] || 0) >= sp.maxViews) {
            return ctx.fail(res, `Лимит показов у спонсора «${sp.name}» исчерпан (${sp.maxViews}/${sp.maxViews}) в этом 24-часовом цикле.`);
          }
          const cdLeft = getCooldownLeftMs(st.lastAdAt[sp.id]);
          if (cdLeft > 0) {
            return ctx.fail(res, `Перерыв между рекламами у спонсора «${sp.name}»: подождите ещё ${fmtCooldownWords(cdLeft)}.`);
          }
        }
      } else if (blockKey === 'rfs_bonus' && actor.teamId) {
        const st = ensureSponsorState(db, actor.teamId);
        const cdLeft = getCooldownLeftMs(st.lastAdAt.rfs);
        if (cdLeft > 0) {
          return ctx.fail(res, `Перерыв между рекламами РФС: подождите ещё ${fmtCooldownWords(cdLeft)}.`);
        }
      } else if ((NATIONAL_BLOCK_KEYS as readonly string[]).includes(blockKey)) {
        const ntCheck = checkNationalAdAllowed(db, actor.actorKey, blockKey);
        if (!ntCheck.ok) return ctx.fail(res, ntCheck.error);
      } else if (blockKey === 'friendly_request' || blockKey === 'friendly_accept') {
        const frCd = getFriendlyCooldownSummary(db, actor.actorKey);
        if (frCd.cooldownRemainingMs > 0) {
          return ctx.fail(res, `Перерыв между рекламами: подождите ещё ${fmtCooldownWords(frCd.cooldownRemainingMs)}.`);
        }
      } else if ((NT_FRIENDLY_BLOCK_KEYS as readonly string[]).includes(blockKey)) {
        if (!actor.teamId) return ctx.fail(res, 'Реклама для матча со сборной доступна только из кабинета клуба.');
        const ntFrCheck = checkNtFriendlyAdAllowed(db, actor.teamId, blockKey);
        if (!ntFrCheck.ok) return ctx.fail(res, ntFrCheck.error);
      } else if (blockKey === 'interview_ask') {
        const ivCheck = checkInterviewAdAllowed(db, actor.actorKey);
        if (!ivCheck.ok) return ctx.fail(res, ivCheck.error);
      } else if (blockKey === 'transfer_request') {
        const trCheck = checkTransferAdAllowed(db, actor.actorKey);
        if (!trCheck.ok) return ctx.fail(res, trCheck.error);
      }
    }

    const minWatchMs = blockId.toLowerCase().startsWith('int-')
      ? 300
      : blockId.toLowerCase().startsWith('task-')
        ? 1000
        : def.format === 'long' || def.format === 'click_long'
          ? 3000
          : 1500;

    const token = 'ad_' + crypto.randomBytes(14).toString('hex');
    adSessions.set(token, {
      token,
      blockKey,
      blockId,
      actorKey: actor.actorKey,
      tgId,
      startedAt: Date.now(),
      minWatchMs,
      requiresClick: def.requiresClick,
      clicked: false,
      verified: false,
      s2sConfirmed: false,
      consumed: false,
      isAdminTest,
    });
    getMemBlockCounter(blockKey).started += 1;
    pushAdEvent(ctx, {
      type: 'start',
      blockKey,
      blockId,
      actorKey: actor.actorKey,
      tgId,
      detail: `Запуск блока (${def.format === 'short' && blockId.startsWith('int-') ? 'Interstitial' : blockId.startsWith('task-') ? 'Task' : 'Rewarded'})`,
    });
    res.json({
      ok: 1,
      sessionToken: token,
      blockKey,
      blockId,
      format: def.format,
      durationSec: def.durationSec,
      requiresClick: def.requiresClick,
      requireS2S: !!db.settings?.requireAdsgramS2S && supportsS2S,
    });
  });

  app.post('/api/ads/cancel', (req: any, res) => {
    const token = String(req.body?.sessionToken || '').trim();
    const reason = String(req.body?.reason || '').trim();
    const detail = String(req.body?.detail || '').trim();
    if (!token) return res.json({ ok: 1 });
    const s = adSessions.get(token);
    if (s && !s.consumed) {
      const actor = resolveActor(req);
      if (s.actorKey === actor.actorKey || (req.me?.role === 'admin' && s.actorKey.startsWith('admin:'))) {
        const isErr = reason === 'error' || reason === 'no_ad' || reason === 'sdk_error';
        const cnt = getMemBlockCounter(s.blockKey);
        if (isErr) cnt.errors += 1;
        else cnt.cancels += 1;
        if (detail) bumpErrorReason(detail);
        pushAdEvent(ctx, {
          type: isErr ? 'error' : 'cancel',
          blockKey: s.blockKey,
          blockId: s.blockId,
          actorKey: s.actorKey,
          tgId: s.tgId,
          durationMs: Date.now() - s.startedAt,
          detail: detail || (reason === 'skip' ? 'Пользователь пропустил / закрыл рекламу' : 'Показ отменён'),
        });
        adSessions.delete(token);
      }
    }
    res.json({ ok: 1 });
  });

  app.post('/api/ads/client-event', (req: any, res) => {
    const blockKey = String(req.body?.blockKey || '').trim().slice(0, 64);
    const blockId = String(req.body?.blockId || '').trim().slice(0, 64);
    const kind = String(req.body?.kind || 'error').trim();
    const detail = String(req.body?.detail || '').trim().slice(0, 220);
    const actor = resolveActor(req);
    const hints = extractTgHintsFromReq(ctx, req);
    const tgId = String(hints.tgId || '').replace(/[^0-9]/g, '');
    if (detail) {
      const cnt = getMemBlockCounter(blockKey || '__unknown__');
      if (kind === 'cancel' || kind === 'skip') cnt.cancels += 1;
      else cnt.errors += 1;
      bumpErrorReason(detail);
      pushAdEvent(ctx, {
        type: kind === 'cancel' || kind === 'skip' ? 'cancel' : 'error',
        blockKey,
        blockId,
        actorKey: actor.actorKey,
        tgId,
        detail,
      });
    }
    res.json({ ok: 1 });
  });

  app.post('/api/ads/complete', async (req: any, res) => {
    pruneAdSessions();
    const db = ctx.getDb();
    const token = String(req.body?.sessionToken || '').trim();
    const s = adSessions.get(token);
    if (!s) return ctx.fail(res, 'Рекламная сессия не найдена или уже закрыта.');
    const actor = resolveActor(req);
    const adminClubBridge =
      req.me?.role === 'admin' &&
      ((s.actorKey.startsWith('admin:') && actor.actorKey.startsWith('club:')) ||
        (s.actorKey.startsWith('club:') && actor.actorKey.startsWith('admin:')));
    if (s.actorKey !== actor.actorKey && !adminClubBridge) {
      return ctx.fail(res, 'Сессия не принадлежит текущему пользователю.');
    }
    if (s.consumed || s.verified) {
      return ctx.fail(res, 'Эта рекламная сессия уже использована. Запустите просмотр заново.');
    }

    const now = Date.now();
    const durationMs = now - s.startedAt;
    if (durationMs > 15 * 60 * 1000) {
      getMemBlockCounter(s.blockKey).errors += 1;
      bumpErrorReason('Истекло время рекламной сессии (>15 мин)');
      pushAdEvent(ctx, { type: 'error', blockKey: s.blockKey, blockId: s.blockId, actorKey: s.actorKey, tgId: s.tgId, durationMs, detail: 'Истекло время рекламной сессии (>15 мин)' });
      adSessions.delete(token);
      return ctx.fail(res, 'Срок действия рекламной сессии истёк.');
    }

    const def = ADSGRAM_BLOCKS.find((b) => b.key === s.blockKey);
    const currentBlockId = String(getAdsgramBlocks(db)[s.blockKey] || '').trim();
    if (!isConfiguredAdsgramBlockId(def, s.blockId) || currentBlockId !== s.blockId) {
      adSessions.delete(token);
      return ctx.fail(res, 'Рекламный блок Adsgram не настроен или был изменён.');
    }

    const sdkCompleted = req.body?.sdkCompleted === true;
    const done = req.body?.done === true;
    const hasError = req.body?.error === true;
    if (!sdkCompleted || !done || hasError) {
      const errMsg = String(req.body?.description || 'Реклама Adsgram не была досмотрена до конца (показ не подтверждён).');
      getMemBlockCounter(s.blockKey).errors += 1;
      bumpErrorReason(errMsg);
      pushAdEvent(ctx, { type: 'error', blockKey: s.blockKey, blockId: s.blockId, actorKey: s.actorKey, tgId: s.tgId, durationMs, detail: errMsg });
      adSessions.delete(token);
      return ctx.fail(res, errMsg);
    }

    if (durationMs < s.minWatchMs) {
      const fastMsg = `Слишком быстрое завершение (${durationMs} мс < ${s.minWatchMs} мс)`;
      getMemBlockCounter(s.blockKey).errors += 1;
      bumpErrorReason('Слишком быстрое завершение показа');
      pushAdEvent(ctx, { type: 'error', blockKey: s.blockKey, blockId: s.blockId, actorKey: s.actorKey, tgId: s.tgId, durationMs, detail: fastMsg });
      adSessions.delete(token);
      return ctx.fail(res, 'Слишком быстрое завершение показа — реклама не была просмотрена полностью.');
    }

    const clicked = req.body?.clicked === true;
    if (s.requiresClick && !clicked) {
      getMemBlockCounter(s.blockKey).errors += 1;
      bumpErrorReason('Не завершён клик/показ рекламного предложения');
      pushAdEvent(ctx, { type: 'error', blockKey: s.blockKey, blockId: s.blockId, actorKey: s.actorKey, tgId: s.tgId, durationMs, detail: 'Не завершён обязательный показ/клик' });
      adSessions.delete(token);
      return ctx.fail(res, 'Необходимо полностью завершить показ рекламного предложения.');
    }

    if (db.settings?.requireAdsgramS2S && !s.blockId.toLowerCase().startsWith('int-')) {
      let s2sOk = !!s.s2sConfirmed || consumeSdkS2SReward(s.tgId, s.blockId, s.startedAt);
      if (!s2sOk && s.tgId) {
        // Adsgram sends the Reward URL GET request after client reward fires; wait briefly for callback delivery.
        for (let attempt = 0; attempt < 12 && !s2sOk; attempt++) {
          await new Promise((r) => setTimeout(r, 250));
          s2sOk = !!s.s2sConfirmed || consumeSdkS2SReward(s.tgId, s.blockId, s.startedAt);
        }
      }
      if (!s2sOk) {
        getMemBlockCounter(s.blockKey).errors += 1;
        bumpErrorReason('S2S Reward callback от Adsgram не поступил за 3с');
        pushAdEvent(ctx, { type: 's2s_fail', blockKey: s.blockKey, blockId: s.blockId, actorKey: s.actorKey, tgId: s.tgId, durationMs, detail: 'S2S Reward callback не поступил в течение 3 сек — просмотр отклонён строгим режимом' });
        adSessions.delete(token);
        return ctx.fail(
          res,
          'Сервер Adsgram не подтвердил просмотр (S2S Reward callback не поступил). Проверьте Reward URL в блоке Adsgram или отключите строгий S2S-режим в Админке.'
        );
      }
    }

    if (s.blockKey === 'transfer_request' && !s.isAdminTest) {
      const trCd = checkTransferAdAllowed(db, s.actorKey);
      if (!trCd.ok) {
        adSessions.delete(token);
        return ctx.fail(res, trCd.error);
      }
    }

    s.clicked = clicked;
    s.verified = true;
    s.verifiedAt = Date.now();
    let cooldown: any = null;
    if (s.blockKey === 'transfer_request' && !s.isAdminTest) {
      recordTransferAdCooldown(db, s.actorKey);
      cooldown = getTransferCooldownSummary(db, s.actorKey);
      ctx.save();
    }
    getMemBlockCounter(s.blockKey).completed += 1;
    const dbStat = ensureDbAdStat(db, s.blockKey);
    dbStat.completed = Number(dbStat.completed || 0) + 1;
    dbStat.lastAt = s.verifiedAt;
    pushAdEvent(ctx, {
      type: 'complete',
      blockKey: s.blockKey,
      blockId: s.blockId,
      actorKey: s.actorKey,
      tgId: s.tgId,
      durationMs,
      detail: `Просмотр подтверждён (${Math.round(durationMs / 100) / 10}с${s.s2sConfirmed ? ' · S2S OK' : ''})`,
    });
    res.json({ ok: 1, adProof: token, blockKey: s.blockKey, clicked: s.clicked, ...(cooldown ? { cooldown } : {}) });
  });

  const handleSdkS2SReward = (req: any, res: Response) => {
    const rawTgId =
      req.query?.userid ||
      req.query?.userId ||
      req.query?.tgid ||
      req.query?.tgId ||
      req.query?.user_id ||
      req.query?.telegram_id ||
      req.body?.userid ||
      req.body?.userId ||
      req.body?.tgid ||
      '';
    const tgId = String(rawTgId).replace(/[^0-9]/g, '').slice(0, 32);
    const blockId = String(
      req.query?.blockid ||
      req.query?.blockId ||
      req.query?.block_id ||
      req.body?.blockid ||
      req.body?.blockId ||
      ''
    ).trim();
    if (!tgId) {
      return res.status(400).json({ ok: 0, error: 'Missing userid' });
    }
    recordSdkS2SReward(tgId, blockId, ctx);
    return res.json({ ok: 1, recorded: true });
  };

  app.get('/api/ads/sdk-reward', handleSdkS2SReward);
  app.post('/api/ads/sdk-reward', handleSdkS2SReward);

  // ─── Club Sponsors & RFS Bonus ────────────────────────────────────────────────
  // ─── Товарищеский матч со сборной: засчитать просмотр рекламы (100 просмотров на заявку) ───
  app.post('/api/club/friendly/national/ad-credit', ctx.needClub, (req: any, res) => {
    const db = ctx.getDb();
    const blockKey = String(req.body?.blockKey || '').trim();
    const actor = resolveActor(req);
    const out = creditNtFriendlyAd(ctx, req.tid, blockKey, actor.actorKey, req.body?.adProof);
    if (!out.ok) return ctx.fail(res, out.error);
    ctx.save();
    res.json({ ok: 1, ads: getNtFriendlyAdSummary(db, req.tid) });
  });

  app.get('/api/club/sponsors', ctx.needClub, (req: any, res) => {
    res.json(buildSponsorSummary(ctx, req.tid));
  });

  app.post('/api/club/sponsors/request', ctx.needClub, (req: any, res) => {
    const db = ctx.getDb();
    const sponsorId = String(req.body?.sponsorId || '').trim();
    const sp = SPONSORS.find((x) => x.id === sponsorId);
    if (!sp) return ctx.fail(res, 'Спонсор не найден');
    const actor = resolveActor(req);
    const st = ensureSponsorState(db, req.tid);
    const currentViews = Number(st.views[sp.id] || 0);
    if (currentViews >= sp.maxViews) {
      return ctx.fail(res, `Лимит показов у спонсора «${sp.name}» исчерпан (${sp.maxViews}/${sp.maxViews}) в этом 24-часовом цикле.`);
    }
    const spCdLeft = getCooldownLeftMs(st.lastAdAt[sp.id]);
    if (spCdLeft > 0) {
      return ctx.fail(res, `Перерыв между рекламами у спонсора «${sp.name}»: подождите ещё ${fmtCooldownWords(spCdLeft)}.`);
    }
    const v = verifyAndConsumeAdProof(req.body?.adProof, sp.blockKey, actor.actorKey, false, req.me?.role);
    if (!v.ok) return ctx.fail(res, v.error);

    const credit = executeSponsorCredit(ctx, req.tid, sp);
    if (!credit.ok) return ctx.fail(res, credit.error);
    res.json(credit);
  });

  app.post('/api/club/sponsors/rfs-claim', ctx.needClub, (req: any, res) => {
    const db = ctx.getDb();
    const actor = resolveActor(req);
    const st = ensureSponsorState(db, req.tid);
    const totalViews = SPONSORS.reduce((acc, s) => acc + Math.min(s.maxViews, Number(st.views[s.id] || 0)), 0);
    if (totalViews < RFS_REQUIRED_VIEWS) {
      return ctx.fail(res, `Сначала нужно просмотреть все ${RFS_REQUIRED_VIEWS} реклам у спонсоров (сейчас ${totalViews}/${RFS_REQUIRED_VIEWS}).`);
    }
    if (Number(st.rfsExtraViews || 0) >= 30) {
      return ctx.fail(res, 'Достигнут лимит блока Adsgram для бонуса РФС (30/30). Дождитесь 24-часового сброса.');
    }
    const rfsCdLeft = getCooldownLeftMs(st.lastAdAt.rfs);
    if (rfsCdLeft > 0) {
      return ctx.fail(res, `Перерыв между рекламами РФС: подождите ещё ${fmtCooldownWords(rfsCdLeft)}.`);
    }
    const v = verifyAndConsumeAdProof(req.body?.adProof, 'rfs_bonus', actor.actorKey, false, req.me?.role);
    if (!v.ok) return ctx.fail(res, v.error);

    ctx.ensureInitialBudgets();
    const t = ctx.team(req.tid);
    const reward = 1000;
    const isActivation = !st.rfsClaimed;
    st.rfsClaimed = true;
    st.rfsExtraViews = Number(st.rfsExtraViews || 0) + 1;
    st.rfsEarnedEur = Number(st.rfsEarnedEur || 0) + reward;
    st.lastAdAt.rfs = Date.now();
    const nowIso = new Date().toISOString();

    if (t) {
      t.budget = Number(t.budget || 0) + reward;
      db.budgetHistory ||= [];
      db.budgetHistory.push({
        id: 'bh_' + ctx.uid(),
        teamId: t.id,
        amount: reward,
        type: 'rfs_bonus_ad',
        typeLabel: 'Бонус от РФС',
        description: isActivation
          ? `Бонус от РФС активирован (после ${RFS_REQUIRED_VIEWS}/${RFS_REQUIRED_VIEWS} реклам): +€${reward.toLocaleString('ru-RU')}`
          : `Бонусная реклама РФС #${st.rfsExtraViews}: +€${reward.toLocaleString('ru-RU')}`,
        date: nowIso,
      });
    }

    st.history.unshift({
      id: 'sph_' + ctx.uid(),
      sponsorId: 'rfs',
      sponsorName: 'Бонус от РФС',
      approved: true,
      amount: reward,
      date: nowIso,
    });
    st.history = st.history.slice(0, 30);

    const dbStat = ensureDbAdStat(db, 'rfs_bonus');
    dbStat.approved = Number(dbStat.approved || 0) + 1;
    dbStat.eur = Number(dbStat.eur || 0) + reward;
    dbStat.lastAt = Date.now();

    pushAdEvent(ctx, {
      type: 'credit',
      blockKey: 'rfs_bonus',
      blockId: getAdsgramBlocks(db).rfs_bonus || 'rfs_bonus',
      actorKey: `club:${req.tid}`,
      detail: isActivation
        ? `Активирован бонус от РФС: +€${reward.toLocaleString('ru-RU')}`
        : `Бонусная реклама РФС #${st.rfsExtraViews}: +€${reward.toLocaleString('ru-RU')}`,
      eur: reward,
    });

    ctx.save();
    res.json({
      ok: 1,
      amount: reward,
      isActivation,
      newBudget: t?.budget || 0,
      message: isActivation
        ? 'Бонус от РФС получен! +€1 000 на счёт, теперь каждая следующая реклама РФС приносит €1 000 до сброса таймера!'
        : `Бонусная реклама РФС засчитана: +€1 000 в бюджет клуба!`,
      summary: buildSponsorSummary(ctx, req.tid),
    });
  });

  // ─── Telegram WebApp Auto-Auth & Owner/Spectator Profiles ─────────────────────
  app.post('/api/auth/telegram', (req: any, res) => {
    const db = ctx.getDb();
    const parsed = verifyAndParseTelegramAuth(db, req.body?.initData, req.body?.user, req.headers, ctx.getTgBotToken?.());
    if (!parsed) {
      return ctx.fail(res, 'Данные Telegram не переданы');
    }
    const tgKey = `tg_${parsed.tgId}`;
    db.telegramUsers ||= {};
    db.telegramUsers[tgKey] = {
      tgId: parsed.tgId,
      displayName: parsed.displayName,
      username: parsed.username,
      photoUrl: parsed.photoUrl,
      verified: parsed.verified,
      updatedAt: new Date().toISOString(),
    };

    // Determine club link before creating any duplicate spectator profile
    db.telegramClubLinks ||= {};
    let activeTeamId: string | null = null;
    let clubProf: any = null;
    if (req.me?.role === 'club' && req.me.teamId) {
      activeTeamId = req.me.teamId;
      db.telegramClubLinks[tgKey] = activeTeamId;
      clubProf = ensureOwnerProfile(ctx, `club:${activeTeamId}`, parsed.displayName, parsed.photoUrl, {
        tgId: parsed.tgId,
        username: parsed.username,
      });
    } else if (db.telegramClubLinks[tgKey]) {
      const linkedTid = db.telegramClubLinks[tgKey];
      if (ctx.team(linkedTid)) {
        activeTeamId = linkedTid;
        clubProf = ensureOwnerProfile(ctx, `club:${activeTeamId}`, parsed.displayName, parsed.photoUrl, {
          tgId: parsed.tgId,
          username: parsed.username,
        });
      }
    }

    const specProf = clubProf
      ? (db.ownerProfiles?.[`user:${tgKey}`] || clubProf)
      : ensureOwnerProfile(ctx, `user:${tgKey}`, parsed.displayName, parsed.photoUrl, {
          tgId: parsed.tgId,
          username: parsed.username,
        });

    ctx.save();
    res.json({
      ok: 1,
      verified: parsed.verified,
      telegramUser: db.telegramUsers[tgKey],
      spectatorProfile: specProf,
      linkedTeamId: activeTeamId,
    });
  });

  app.get('/api/profile', (req: any, res) => {
    const actor = resolveActor(req);
    const db = ctx.getDb();
    const hints = extractTgHintsFromReq(ctx, req);
    const prof = ensureOwnerProfile(ctx, actor.actorKey, hints.name, hints.photo, {
      tgId: hints.tgId,
      username: hints.username,
    });
    const board = computePredictionLeaderboard(ctx, ctx.S());
    const stats = board.find((x) => x.actorKey === actor.actorKey || (Array.isArray(x.aliasActorKeys) && x.aliasActorKeys.includes(actor.actorKey))) || {
      rank: null,
      correct: 0,
      wrong: 0,
      pending: 0,
      total: 0,
      kpd: 0,
      points: 0,
      coins: ensureWallet(db, actor.actorKey).coins,
    };
    const t = prof.teamId ? ctx.team(prof.teamId) : null;
    const favT = prof.favoriteTeamId ? ctx.team(prof.favoriteTeamId) : null;
    const tgKey = hints.tgId ? `tg_${hints.tgId}` : prof.telegramId ? `tg_${prof.telegramId}` : '';
    const tgRec = tgKey ? db.telegramUsers?.[tgKey] : null;
    res.json({
      profile: prof,
      profileKind: prof.profileKind || (actor.type === 'club' ? 'owner' : actor.type === 'admin' ? 'admin' : 'spectator'),
      stats,
      telegramUser: tgRec || (hints.tgId ? { tgId: hints.tgId, displayName: hints.name || '', username: hints.username || '', photoUrl: hints.photo || '' } : null),
      team: t ? { id: t.id, name: t.name, comp: t.comp, compName: ctx.compName(t.comp), logo: ctx.teamLogo(t.id), budget: t.budget || 0 } : null,
      favoriteTeam: favT ? { id: favT.id, name: favT.name, comp: favT.comp, logo: ctx.teamLogo(favT.id) } : null,
    });
  });

  app.get('/api/profile/:actorKey', (req, res) => {
    const targetKey = decodeURIComponent(String(req.params.actorKey || ''));
    if (!targetKey) return ctx.fail(res, 'Профиль не указан');
    const db = ctx.getDb();
    const prof = ensureOwnerProfile(ctx, targetKey);
    const board = computePredictionLeaderboard(ctx, ctx.S());
    const stats = board.find((x) => x.actorKey === targetKey || (Array.isArray(x.aliasActorKeys) && x.aliasActorKeys.includes(targetKey))) || {
      rank: null,
      correct: 0,
      wrong: 0,
      pending: 0,
      total: 0,
      kpd: 0,
      points: 0,
      coins: Number(db.predictionWallets?.[targetKey]?.coins ?? STARTER_COINS),
    };
    const t = prof.teamId ? ctx.team(prof.teamId) : null;
    const favT = prof.favoriteTeamId ? ctx.team(prof.favoriteTeamId) : null;
    res.json({
      profile: prof,
      profileKind: prof.profileKind || (targetKey.startsWith('club:') ? 'owner' : targetKey.startsWith('admin:') ? 'admin' : 'spectator'),
      stats,
      team: t ? { id: t.id, name: t.name, comp: t.comp, compName: ctx.compName(t.comp), logo: ctx.teamLogo(t.id), budget: t.budget || 0 } : null,
      favoriteTeam: favT ? { id: favT.id, name: favT.name, comp: favT.comp, logo: ctx.teamLogo(favT.id) } : null,
    });
  });

  app.post('/api/profile', (req: any, res) => {
    const actor = resolveActor(req);
    const db = ctx.getDb();
    const hints = extractTgHintsFromReq(ctx, req);
    const prof = ensureOwnerProfile(ctx, actor.actorKey, hints.name, hints.photo, {
      tgId: hints.tgId,
      username: hints.username,
    });

    if (req.body?.syncFromTelegram) {
      const tgKey = hints.tgId ? `tg_${hints.tgId}` : prof.telegramId ? `tg_${prof.telegramId}` : '';
      const tgRec = tgKey ? db.telegramUsers?.[tgKey] : null;
      const tgName = tgRec?.displayName || hints.name;
      const tgPhoto = tgRec?.photoUrl || hints.photo;
      if (!tgName && !tgPhoto) {
        return ctx.fail(res, 'Данные Telegram не обнаружены. Откройте приложение через Telegram-бота.');
      }
      if (tgName) {
        prof.displayName = tgName;
        prof.customName = false;
      }
      if (tgPhoto) {
        prof.photoUrl = tgPhoto;
        prof.customPhoto = false;
      }
      if (tgRec?.tgId || hints.tgId) prof.telegramId = tgRec?.tgId || hints.tgId;
      if (tgRec?.username || hints.username) prof.telegramUsername = tgRec?.username || hints.username;
      prof.updatedAt = new Date().toISOString();
      ctx.save();
      return res.json({ ok: 1, profile: prof, message: 'Имя и фото подтянуты из Telegram' });
    }

    const displayName = ctx.cleanTxt(req.body?.displayName, 60);
    const bio = ctx.cleanTxt(req.body?.bio, 400);
    const career = ctx.cleanTxt(req.body?.career, 800);
    const rawPhoto = String(req.body?.photoUrl || '').trim();
    if (displayName && displayName !== prof.displayName) {
      prof.displayName = displayName;
      prof.customName = true;
    }
    if (req.body?.bio !== undefined) prof.bio = bio;
    if (req.body?.career !== undefined && prof.profileKind !== 'spectator') prof.career = career;
    if (req.body?.favoriteTeamId !== undefined) {
      const ftid = String(req.body.favoriteTeamId || '').trim();
      prof.favoriteTeamId = ftid && ctx.team(ftid) ? ftid : null;
    }
    if (req.body?.photoUrl !== undefined) {
      if (!rawPhoto) {
        prof.photoUrl = '';
        prof.customPhoto = true;
      } else if (/^(https?:\/\/|data:image\/(png|jpeg|jpg|webp);base64,)/i.test(rawPhoto) && rawPhoto.length <= 220_000) {
        if (rawPhoto !== prof.photoUrl) prof.customPhoto = true;
        prof.photoUrl = rawPhoto;
      } else {
        return ctx.fail(res, 'Некорректное фото или слишком большой файл (макс. 200 КБ).');
      }
    }
    prof.updatedAt = new Date().toISOString();
    ctx.save();
    res.json({ ok: 1, profile: prof, message: prof.profileKind === 'spectator' ? 'Профиль зрителя обновлён' : 'Профиль владельца обновлён' });
  });

  // ─── Predictions Tab & Coin Economy ───────────────────────────────────────────
  app.get('/api/predictions', (req: any, res) => {
    const db = ctx.getDb();
    const season = ctx.S();
    const now = Date.now();

    // Ensure any recently finished matches settle pending predictions (only scan fixtures that actually have pending bets)
    const pendingFixIds = new Set<string>();
    for (const p of Array.isArray(db.predictions) ? db.predictions : []) {
      if (p && p.status === 'pending' && p.fixtureId) pendingFixIds.add(p.fixtureId);
    }
    if (pendingFixIds.size > 0) {
      for (const f of db.fixtures || []) {
        if (f.status === 'done' && pendingFixIds.has(f.id)) settlePredictionsForFixture(ctx, f);
      }
    }

    const hints = extractTgHintsFromReq(ctx, req);
    const actor = resolveActor(req);
    const profile = ensureOwnerProfile(ctx, actor.actorKey, hints.name, hints.photo, {
      tgId: hints.tgId,
      username: hints.username,
    });
    const wallet = ensureWallet(db, actor.actorKey);
    const blocks = getAdsgramBlocks(db);

    const openFixtures = (db.fixtures || [])
      .filter((f: any) => {
        if ((f.season || season) !== season) return false;
        if (f.comp !== 'rpl' && f.comp !== 'cup' && f.comp !== 'supercup' && f.comp !== 'friendly_match') return false;
        return !getFixtureBetLockInfo(f, now).locked;
      })
      .sort((a: any, b: any) => {
        const ka = getFixtureKickoffMs(a);
        const kb = getFixtureKickoffMs(b);
        if (Number.isFinite(ka) && Number.isFinite(kb) && ka !== kb) return ka - kb;
        return String(a.date || '').localeCompare(String(b.date || '')) || String(a.time || '').localeCompare(String(b.time || ''));
      })
      .slice(0, 32)
      .map((f: any) => {
        const fxLine = computeFixtureMarkets(ctx, f);
        const lockInfo = getFixtureBetLockInfo(f, now);
        return {
          id: f.id,
          comp: f.comp,
          compName: ctx.compName(f.comp),
          round: f.round,
          label: f.label || `Тур ${f.round || 1}`,
          date: f.gameDate || f.date,
          time: f.gameTime || f.time || '19:00',
          realDate: f.realDate || f.date,
          realTime: f.realTime || f.time || '19:00',
          realStartAt: lockInfo.kickoffAt,
          betCloseAt: lockInfo.betCloseAt,
          homeId: f.home,
          awayId: f.away,
          homeName: ctx.tn(f.home),
          awayName: ctx.tn(f.away),
          homeLogo: ctx.teamLogo(f.home),
          awayLogo: ctx.teamLogo(f.away),
          markets: fxLine.markets,
          quickScores: fxLine.quickScores,
          exactMatrix: fxLine.exactMatrix,
          expectedGoals: fxLine.expectedGoals,
          probs: fxLine.probs,
          refereeName: fxLine.refereeName,
        };
      });

    const allPreds = Array.isArray(db.predictions) ? db.predictions : [];
    const myPredictions = allPreds
      .filter((p: any) => p.actorKey === actor.actorKey && p.season === season)
      .slice(-120)
      .reverse()
      .map((p: any) => {
        const fxObj = (db.fixtures || []).find((f: any) => f.id === p.fixtureId);
        const market = p.market || 'outcome';
        const found = findMarketOption(market, p.pick);
        return {
          ...p,
          market,
          marketTitle: p.marketTitle || found?.marketDef.title || 'Исход матча',
          pickLabel: p.pickLabel || (market === 'exact_score' ? `Точный счёт ${p.exactHome}:${p.exactAway}` : found?.option.label || p.pick),
          homeName: fxObj ? ctx.tn(fxObj.home) : p.homeName || 'Хозяева',
          awayName: fxObj ? ctx.tn(fxObj.away) : p.awayName || 'Гости',
          label: fxObj?.label || p.label || '',
          date: fxObj?.date || p.date || '',
        };
      });

    const leaderboard = computePredictionLeaderboard(ctx, season);
    const leagues: any[] = [];
    const offerMeta = [
      { blockKey: 'coins_short', blockId: blocks.coins_short, label: 'Быстрый пас', durationHint: '5 сек', rewardCoins: 1, maxViews: PREDICTION_AD_MAX_PER_CYCLE },
      { blockKey: 'coins_banner', blockId: blocks.coins_banner, label: 'Щит у поля', durationHint: 'баннер', rewardCoins: 2, maxViews: PREDICTION_AD_MAX_PER_CYCLE },
      { blockKey: 'coins_long', blockId: blocks.coins_long, label: 'Перерыв матча', durationHint: '30 сек', rewardCoins: 3, maxViews: PREDICTION_AD_MAX_PER_CYCLE },
    ];
    res.json({
      season,
      actorKey: actor.actorKey,
      profile,
      profileKind: profile.profileKind || (actor.type === 'club' ? 'owner' : actor.type === 'admin' ? 'admin' : 'spectator'),
      wallet: {
        coins: roundCoins(Number(wallet.coins || 0)),
        totalEarnedCoins: roundCoins(Number(wallet.totalEarnedCoins || 0)),
        adCounts: wallet.adCounts,
        resetAt: wallet.cycleStartedAt ? wallet.cycleStartedAt + CYCLE_MS : null,
        cooldownMs: AD_COOLDOWN_MS,
      },
      coinOffers: offerMeta.map((om) => {
        const cdLeft = getCooldownLeftMs(wallet.lastAdAt[om.blockKey]);
        return {
          ...om,
          views: Number(wallet.adCounts[om.blockKey] || 0),
          cooldownRemainingMs: cdLeft,
          nextAvailableAt: cdLeft > 0 ? now + cdLeft : null,
        };
      }),
      markets: PREDICTION_MARKETS,
      fixtures: openFixtures,
      myPredictions,
      leaderboard,
      leagues,
      teamsList: (db.teams || []).filter((t: any) => t.comp === 'rpl' || t.comp === 'fnl').map((t: any) => ({ id: t.id, name: t.name })),
      seasonPrizes: SEASON_PRIZES,
      seasonAwards: db.predictionSeasonAwards || [],
    });
  });

  app.post('/api/predictions/earn-coins', (req: any, res) => {
    const db = ctx.getDb();
    const blockKey = String(req.body?.blockKey || '').trim() as 'coins_short' | 'coins_banner' | 'coins_long';
    const rewardMap: Record<string, number> = { coins_short: 1, coins_banner: 2, coins_long: 3 };
    const reward = rewardMap[blockKey];
    if (!reward) return ctx.fail(res, 'Неверный тип рекламы для получения монет');

    const actor = resolveActor(req);
    const wallet = ensureWallet(db, actor.actorKey);
    const maxViews = PREDICTION_AD_MAX_PER_CYCLE;
    const cur = Number(wallet.adCounts[blockKey] || 0);
    if (cur >= maxViews) {
      return ctx.fail(res, `Достигнут лимит рекламного блока (${maxViews}/${maxViews} за 24 часа). Выберите другой формат или дождитесь сброса.`);
    }
    const cdLeft = getCooldownLeftMs(wallet.lastAdAt[blockKey]);
    if (cdLeft > 0) {
      return ctx.fail(res, `Перерыв между рекламами: подождите ещё ${fmtCooldownWords(cdLeft)}.`);
    }

    const v = verifyAndConsumeAdProof(req.body?.adProof, blockKey, actor.actorKey, false);
    if (!v.ok) return ctx.fail(res, v.error);

    const credit = executeCoinsCredit(ctx, actor.actorKey, blockKey);
    if (!credit.ok) return ctx.fail(res, credit.error);
    res.json(credit);
  });

  const validateAndStageBets = (rawItems: any[], actorKey: string) => {
    const db = ctx.getDb();
    if (!Array.isArray(rawItems) || !rawItems.length) {
      return { ok: false as const, error: 'Купон пуст — выберите хотя бы один пункт линии.' };
    }
    if (rawItems.length > 30) {
      return { ok: false as const, error: 'Максимум 30 ставок в одном купоне.' };
    }
    const wallet = ensureWallet(db, actorKey);
    db.predictions ||= [];

    const lineCache = new Map<string, ReturnType<typeof computeFixtureMarkets>>();
    const seenKeys = new Set<string>();
    const staged: any[] = [];
    let totalStake = 0;

    for (const item of rawItems) {
      const fixtureId = String(item?.fixtureId || '').trim();
      const market = String(item?.market || 'outcome').trim();
      const pick = String(item?.pick || '').trim();
      const stake = Math.max(1, Math.min(500, Math.round(Number(item?.stake || 1))));
      if (!Number.isFinite(stake) || stake < 1) {
        return { ok: false as const, error: 'Укажите корректную сумму монет (от 1) для каждого пункта.' };
      }

      const found = findMarketOption(market, pick);
      if (!found || market === 'specials') {
        return { ok: false as const, error: `Неизвестный пункт линии (${market}:${pick}).` };
      }

      const f = (db.fixtures || []).find((x: any) => x.id === fixtureId);
      if (!f) return { ok: false as const, error: 'Один из матчей не найден.' };
      if (f.status !== 'scheduled') return { ok: false as const, error: `Приём ставок на матч «${ctx.tn(f.home)} — ${ctx.tn(f.away)}» уже закрыт.` };
      if (getFixtureBetLockInfo(f).locked) {
        return { ok: false as const, error: `Приём ставок на матч «${ctx.tn(f.home)} — ${ctx.tn(f.away)}» завершается за 2 минуты до начала.` };
      }

      const rawEh = item?.exactHome;
      const rawEa = item?.exactAway;
      const hasExact = rawEh !== '' && rawEh !== null && rawEh !== undefined && rawEa !== '' && rawEa !== null && rawEa !== undefined;
      const exactHome = market === 'exact_score' && hasExact ? Math.max(0, Math.min(20, Math.round(Number(rawEh)))) : null;
      const exactAway = market === 'exact_score' && hasExact ? Math.max(0, Math.min(20, Math.round(Number(rawEa)))) : null;
      if (market === 'exact_score' && (exactHome === null || exactAway === null)) {
        return { ok: false as const, error: 'Укажите точный счёт хозяев и гостей (например, 2:1).' };
      }

      const itemKey = market === 'exact_score'
        ? `${fixtureId}|${market}|${exactHome}:${exactAway}`
        : `${fixtureId}|${market}|${pick}`;
      if (seenKeys.has(itemKey)) {
        return { ok: false as const, error: 'В купоне есть дублирующийся пункт.' };
      }
      seenKeys.add(itemKey);

      const duplicate = db.predictions.find((p: any) => {
        if (p.fixtureId !== fixtureId || p.actorKey !== actorKey || (p.market || 'outcome') !== market) return false;
        if (market === 'exact_score') return Number(p.exactHome) === exactHome && Number(p.exactAway) === exactAway;
        return p.pick === pick;
      });
      if (duplicate) {
        return { ok: false as const, error: `Ставка «${duplicate.pickLabel}» в матче ${ctx.tn(f.home)} — ${ctx.tn(f.away)} уже принята.` };
      }

      let fxLine = lineCache.get(fixtureId);
      if (!fxLine) {
        fxLine = computeFixtureMarkets(ctx, f);
        lineCache.set(fixtureId, fxLine);
      }
      const fxMarket = fxLine.markets.find((m) => m.id === market);
      const fxOption = fxMarket?.options.find((o) => o.pick === pick) || found.option;
      const finalOdd = market === 'exact_score'
        ? fxLine.calcExactOdd(exactHome!, exactAway!)
        : Number(fxOption.odd || found.option.odd);
      const finalBasePts = Math.max(1, Math.round(finalOdd * 1.5));
      const pickLabel = market === 'exact_score'
        ? `Точный счёт ${exactHome}:${exactAway}`
        : fxOption.label;

      totalStake += stake;
      staged.push({
        f,
        season: f.season || ctx.S(),
        market,
        marketTitle: fxMarket?.title || found.marketDef.title,
        pick,
        pickLabel,
        odd: finalOdd,
        basePts: finalBasePts,
        exactHome,
        exactAway,
        stake,
      });
    }

    if (roundCoins(Number(wallet.coins || 0)) < totalStake) {
      return {
        ok: false as const,
        error: `Недостаточно монет: сумма ставок ${totalStake} мон., на балансе ${roundCoins(Number(wallet.coins || 0))} мон. Посмотрите рекламу, чтобы получить монеты.`,
      };
    }

    return { ok: true as const, wallet, staged, totalStake };
  };

  app.post('/api/predictions/bet', (req: any, res) => {
    const db = ctx.getDb();
    const hints = extractTgHintsFromReq(ctx, req);
    const actor = resolveActor(req);
    ensureOwnerProfile(ctx, actor.actorKey, hints.name, hints.photo, { tgId: hints.tgId, username: hints.username });

    const check = validateAndStageBets([req.body || {}], actor.actorKey);
    if (!check.ok) return ctx.fail(res, check.error);

    const s = check.staged[0];
    check.wallet.coins = roundCoins(Number(check.wallet.coins) - s.stake);
    const pred = {
      id: 'pr_' + ctx.uid(),
      season: s.season,
      actorKey: actor.actorKey,
      teamId: actor.teamId,
      fixtureId: s.f.id,
      homeName: ctx.tn(s.f.home),
      awayName: ctx.tn(s.f.away),
      label: s.f.label || `Тур ${s.f.round || 1}`,
      date: s.f.date,
      market: s.market,
      marketTitle: s.marketTitle,
      pick: s.pick,
      pickLabel: s.pickLabel,
      odd: s.odd,
      basePts: s.basePts,
      exactHome: s.exactHome,
      exactAway: s.exactAway,
      stake: s.stake,
      status: 'pending',
      pointsAwarded: 0,
      coinsWon: 0,
      createdAt: new Date().toISOString(),
    };
    db.predictions.push(pred);
    ctx.save();

    res.json({
      ok: 1,
      prediction: pred,
      coins: check.wallet.coins,
      message: `Ставка «${s.pickLabel}» (×${s.odd.toFixed(2)}) принята — списано ${s.stake} мон.`,
    });
  });

  app.post('/api/predictions/bet-batch', (req: any, res) => {
    const db = ctx.getDb();
    const hints = extractTgHintsFromReq(ctx, req);
    const actor = resolveActor(req);
    ensureOwnerProfile(ctx, actor.actorKey, hints.name, hints.photo, { tgId: hints.tgId, username: hints.username });

    const check = validateAndStageBets(req.body?.bets, actor.actorKey);
    if (!check.ok) return ctx.fail(res, check.error);

    check.wallet.coins = roundCoins(Number(check.wallet.coins) - check.totalStake);
    const created: any[] = [];
    const nowIso = new Date().toISOString();
    for (const s of check.staged) {
      const pred = {
        id: 'pr_' + ctx.uid(),
        season: s.season,
        actorKey: actor.actorKey,
        teamId: actor.teamId,
        fixtureId: s.f.id,
        homeName: ctx.tn(s.f.home),
        awayName: ctx.tn(s.f.away),
        label: s.f.label || `Тур ${s.f.round || 1}`,
        date: s.f.date,
        market: s.market,
        marketTitle: s.marketTitle,
        pick: s.pick,
        pickLabel: s.pickLabel,
        odd: s.odd,
        basePts: s.basePts,
        exactHome: s.exactHome,
        exactAway: s.exactAway,
        stake: s.stake,
        status: 'pending',
        pointsAwarded: 0,
        coinsWon: 0,
        createdAt: nowIso,
      };
      db.predictions.push(pred);
      created.push(pred);
    }
    ctx.save();

    res.json({
      ok: 1,
      predictions: created,
      coins: check.wallet.coins,
      totalStake: check.totalStake,
      message: created.length === 1
        ? `Ставка «${created[0].pickLabel}» (×${created[0].odd.toFixed(2)}) принята — ${check.totalStake} мон.`
        : `Принято ставок: ${created.length} (списано ${check.totalStake} мон.)!`,
    });
  });

  app.post('/api/predictions/league/create', (req: any, res) => {
    const db = ctx.getDb();
    const name = ctx.cleanTxt(req.body?.name, 50);
    if (name.length < 2) return ctx.fail(res, 'Введите название лиги (от 2 символов)');
    const description = ctx.cleanTxt(req.body?.description, 160);
    const isPublic = req.body?.isPublic !== false;
    const actor = resolveActor(req);
    ensureOwnerProfile(ctx, actor.actorKey);
    ensureWallet(db, actor.actorKey);

    db.predictionLeagues ||= [];
    const code = crypto.randomBytes(3).toString('hex').toUpperCase();
    const lg = {
      id: 'plg_' + ctx.uid(),
      name,
      description,
      code,
      isPublic,
      ownerKey: actor.actorKey,
      members: [actor.actorKey],
      createdAt: new Date().toISOString(),
    };
    db.predictionLeagues.unshift(lg);
    ctx.save();
    res.json({ ok: 1, league: lg, message: `Лига «${name}» создана! Код приглашения: ${code}` });
  });

  app.post('/api/predictions/league/join', (req: any, res) => {
    const db = ctx.getDb();
    const q = String(req.body?.codeOrId || '').trim();
    if (!q) return ctx.fail(res, 'Укажите код или ID лиги');
    const actor = resolveActor(req);
    ensureOwnerProfile(ctx, actor.actorKey);
    ensureWallet(db, actor.actorKey);

    db.predictionLeagues ||= [];
    const lg = db.predictionLeagues.find(
      (x: any) => x.id === q || String(x.code || '').toUpperCase() === q.toUpperCase()
    );
    if (!lg) return ctx.fail(res, 'Лига с таким кодом не найдена');
    lg.members ||= [];
    if (!lg.members.includes(actor.actorKey)) {
      lg.members.push(actor.actorKey);
      ctx.save();
    }
    res.json({ ok: 1, leagueId: lg.id, message: `Вы вступили в лигу «${lg.name}»!` });
  });

  app.post('/api/predictions/league/leave', (req: any, res) => {
    const db = ctx.getDb();
    const leagueId = String(req.body?.leagueId || '').trim();
    const actor = resolveActor(req);
    const lg = (db.predictionLeagues || []).find((x: any) => x.id === leagueId);
    if (!lg) return ctx.fail(res, 'Лига не найдена');
    lg.members = (lg.members || []).filter((m: string) => m !== actor.actorKey);
    ctx.save();
    res.json({ ok: 1, message: `Вы покинули лигу «${lg.name}»` });
  });

  app.post('/api/admin/predictions/award-season', ctx.admin, (req, res) => {
    const season = String(req.body?.season || ctx.S()).trim();
    const out = awardSeasonPredictionPrizes(ctx, season);
    if (out.alreadyAwarded) {
      return ctx.fail(res, `Призы за сезон ${season} уже были выданы.`);
    }
    if (!out.winners.length) {
      return ctx.fail(res, `Нет завершённых прогнозов за сезон ${season} для награждения.`);
    }
    res.json({ ok: 1, ...out, message: `Призы Топ-3 Лиги прогнозов за сезон ${season} успешно выданы!` });
  });

  // ─── National Team Proposals & Voting ─────────────────────────────────────────
  const resolveNtTeam = (req: any): 'main' | 'u21' => {
    const raw = String(req.body?.team || req.query?.team || '').trim().toLowerCase();
    return raw === 'u21' || raw === 'u-21' || raw === 'youth' ? 'u21' : 'main';
  };

  app.post('/api/national/propose-player', ctx.needClub, (req: any, res) => {
    const db = ctx.getDb();
    const teamType = resolveNtTeam(req);
    const nt = ctx.ensureNationalTeam(teamType);
    const pid = String(req.body?.pid || '').trim();
    const note = ctx.cleanTxt(req.body?.note, 180);
    const p = ctx.player(pid);
    if (!p) return ctx.fail(res, 'Игрок не найден');
    if (req.me?.role !== 'admin' && p.teamId !== req.tid) {
      return ctx.fail(res, 'Предложить в сборную можно только игрока своего клуба.');
    }
    const rawNat = String(p.nation || p.nationality || p.nat || p.country || 'Россия').trim().toLowerCase();
    const hasRus = rawNat === '' || rawNat.includes('россия') || rawNat === 'rus' || rawNat === 'russia';
    const hasOtherCap = Boolean(
      p.playedForOtherNationalTeam ||
      (p.otherNationalTeam && String(p.otherNationalTeam).trim().toLowerCase() !== 'россия')
    );
    if (!hasRus || hasOtherCap) {
      return ctx.fail(res, 'В сборную России можно предложить только игрока с российским гражданством, не заигранного за другую сборную.');
    }
    if (teamType === 'u21') {
      const pAge = ctx.ageOfPlayer ? ctx.ageOfPlayer(p) : (p.age != null ? Number(p.age) : null);
      if (pAge === null || pAge > 21) {
        return ctx.fail(res, `В молодёжную сборную России U21 можно предложить только игрока до 21 года включительно (сейчас ${pAge ?? '?'} л.).`);
      }
    }

    const actor = resolveActor(req);
    const { playerProposals } = getNationalProposals(nt.current);
    const existing = playerProposals.find((x) => x.pid === pid);
    if (existing) {
      return ctx.fail(res, 'Этот игрок уже предложен на текущий сбор — вы можете поддержать его голосом.');
    }

    const adBlockKey = teamType === 'u21' ? 'nt_u21_propose_player' : 'nt_propose_player';
    const ntCheck = checkNationalAdAllowed(db, actor.actorKey, adBlockKey);
    if (!ntCheck.ok) return ctx.fail(res, ntCheck.error);

    const v = verifyAndConsumeAdProof(req.body?.adProof, adBlockKey, actor.actorKey, false);
    if (!v.ok) return ctx.fail(res, v.error);

    const prof = ensureOwnerProfile(ctx, actor.actorKey);
    playerProposals.push({
      pid,
      proposedBy: actor.actorKey,
      proposedByTeamId: req.tid,
      proposedByName: `${ctx.tn(req.tid)} (${prof.displayName})`,
      note,
      votes: 1,
      voters: [actor.actorKey],
      createdAt: new Date().toISOString(),
    });
    recordNationalAdUsage(ctx, actor.actorKey, adBlockKey);
    ctx.save();
    res.json({
      ok: 1,
      adQuota: buildNationalAdSummary(db, actor.actorKey),
      message: teamType === 'u21'
        ? `${p.name} предложен в сборную России U21 (1 голос)!`
        : `${p.name} предложен в сборную России (1 голос)!`,
    });
  });

  app.post('/api/national/vote-player', (req: any, res) => {
    const db = ctx.getDb();
    const teamType = resolveNtTeam(req);
    const nt = ctx.ensureNationalTeam(teamType);
    const pid = String(req.body?.pid || '').trim();
    const actor = resolveActor(req);
    const { playerProposals } = getNationalProposals(nt.current);
    const prop = playerProposals.find((x) => x.pid === pid);
    if (!prop) return ctx.fail(res, 'Кандидат не найден среди предложенных');
    prop.voters ||= [];
    if (prop.voters.includes(actor.actorKey)) {
      return ctx.fail(res, 'Вы уже отдали свой голос за этого кандидата в текущем сборе.');
    }

    const adBlockKey = teamType === 'u21' ? 'nt_u21_vote_player' : 'nt_vote_player';
    const ntCheck = checkNationalAdAllowed(db, actor.actorKey, adBlockKey);
    if (!ntCheck.ok) return ctx.fail(res, ntCheck.error);

    const v = verifyAndConsumeAdProof(req.body?.adProof, adBlockKey, actor.actorKey, false);
    if (!v.ok) return ctx.fail(res, v.error);

    prop.voters.push(actor.actorKey);
    prop.votes = prop.voters.length;
    recordNationalAdUsage(ctx, actor.actorKey, adBlockKey);
    ctx.save();
    res.json({
      ok: 1,
      votes: prop.votes,
      adQuota: buildNationalAdSummary(db, actor.actorKey),
      message: `Голос учтён! У кандидата теперь ${prop.votes} гол.`,
    });
  });

  app.post('/api/national/propose-opponent', (req: any, res) => {
    const db = ctx.getDb();
    const teamType = resolveNtTeam(req);
    const nt = ctx.ensureNationalTeam(teamType);
    const opponent = ctx.cleanTxt(req.body?.opponent, 60);
    const comment = ctx.cleanTxt(req.body?.comment, 160);
    if (opponent.length < 2) return ctx.fail(res, 'Укажите название сборной-соперника');

    const oppLow = opponent.toLowerCase();
    const isU21Opp = /\bu21\b|u-21|молод[её]ж/i.test(oppLow);
    const isRussiaBase = /^(?:сборная\s+)?(?:основная\s+сборная\s+)?(?:росси[ия]|рф)(?:\s+(?:основн\S*|взросл\S*))?$/i.test(oppLow);
    if (teamType === 'main' && isRussiaBase && !isU21Opp) {
      return ctx.fail(res, 'Основная сборная не может сыграть сама с собой — выберите другую страну или «Россия U21».');
    }
    if (teamType === 'u21' && isU21Opp && /росси|рф/i.test(oppLow)) {
      return ctx.fail(res, 'Сборная U21 не может сыграть сама с собой — выберите другую сборную или «Россия» (основную).');
    }

    const actor = resolveActor(req);
    const { opponentProposals } = getNationalProposals(nt.current);
    if (opponentProposals.some((x) => x.opponent.toLowerCase() === oppLow)) {
      return ctx.fail(res, `Сборная «${opponent}» уже есть в списке — проголосуйте за готовый вариант!`);
    }

    const adBlockKey = teamType === 'u21' ? 'nt_u21_propose_opp' : 'nt_propose_opp';
    const ntCheck = checkNationalAdAllowed(db, actor.actorKey, adBlockKey);
    if (!ntCheck.ok) return ctx.fail(res, ntCheck.error);

    const v = verifyAndConsumeAdProof(req.body?.adProof, adBlockKey, actor.actorKey, false);
    if (!v.ok) return ctx.fail(res, v.error);

    const prof = ensureOwnerProfile(ctx, actor.actorKey);
    opponentProposals.push({
      id: 'ntop_' + ctx.uid(),
      opponent,
      comment,
      proposedBy: actor.actorKey,
      proposedByName: prof.teamId ? `${ctx.tn(prof.teamId)} · ${prof.displayName}` : prof.displayName,
      votes: 1,
      voters: [actor.actorKey],
      createdAt: new Date().toISOString(),
    });
    recordNationalAdUsage(ctx, actor.actorKey, adBlockKey);
    ctx.save();
    res.json({
      ok: 1,
      adQuota: buildNationalAdSummary(db, actor.actorKey),
      message: `Соперник «${opponent}» предложен для голосования!`,
    });
  });

  app.post('/api/national/vote-opponent', (req: any, res) => {
    const db = ctx.getDb();
    const teamType = resolveNtTeam(req);
    const nt = ctx.ensureNationalTeam(teamType);
    const proposalId = String(req.body?.proposalId || '').trim();
    const actor = resolveActor(req);
    const { opponentProposals } = getNationalProposals(nt.current);
    const prop = opponentProposals.find((x) => x.id === proposalId);
    if (!prop) return ctx.fail(res, 'Вариант соперника не найден');
    prop.voters ||= [];
    if (prop.voters.includes(actor.actorKey)) {
      return ctx.fail(res, `Вы уже голосовали за сборную «${prop.opponent}».`);
    }

    const adBlockKey = teamType === 'u21' ? 'nt_u21_vote_opp' : 'nt_vote_opp';
    const ntCheck = checkNationalAdAllowed(db, actor.actorKey, adBlockKey);
    if (!ntCheck.ok) return ctx.fail(res, ntCheck.error);

    const v = verifyAndConsumeAdProof(req.body?.adProof, adBlockKey, actor.actorKey, false);
    if (!v.ok) return ctx.fail(res, v.error);

    prop.voters.push(actor.actorKey);
    prop.votes = prop.voters.length;
    recordNationalAdUsage(ctx, actor.actorKey, adBlockKey);
    ctx.save();
    res.json({
      ok: 1,
      votes: prop.votes,
      adQuota: buildNationalAdSummary(db, actor.actorKey),
      message: `Голос за матч со сборной «${prop.opponent}» учтён!`,
    });
  });

  app.post('/api/admin/national/proposal/player/delete', ctx.admin, (req: any, res) => {
    const teamType = resolveNtTeam(req);
    const nt = ctx.ensureNationalTeam(teamType);
    const pid = String(req.body?.pid || '').trim();
    if (!pid) return ctx.fail(res, 'Не указан игрок');
    const { playerProposals } = getNationalProposals(nt.current);
    const before = playerProposals.length;
    nt.current.playerProposals = playerProposals.filter((x) => x.pid !== pid);
    if (nt.current.playerProposals.length === before) {
      return ctx.fail(res, 'Предложенный игрок не найден');
    }
    ctx.save();
    res.json({ ok: 1, message: 'Вариант игрока удалён из списка' });
  });

  app.post('/api/admin/national/proposal/opponent/delete', ctx.admin, (req: any, res) => {
    const teamType = resolveNtTeam(req);
    const nt = ctx.ensureNationalTeam(teamType);
    const proposalId = String(req.body?.proposalId || req.body?.id || '').trim();
    if (!proposalId) return ctx.fail(res, 'Не указан вариант соперника');
    const { opponentProposals } = getNationalProposals(nt.current);
    const before = opponentProposals.length;
    nt.current.opponentProposals = opponentProposals.filter((x) => x.id !== proposalId);
    if (nt.current.opponentProposals.length === before) {
      return ctx.fail(res, 'Вариант соперника не найден');
    }
    ctx.save();
    res.json({ ok: 1, message: 'Вариант соперника удалён' });
  });

  // ─── Admin Ads Publisher Cabinet & Telemetry ─────────────────────────────────
  app.get('/api/admin/ads/dashboard', ctx.admin, (req, res) => {
    pruneAdSessions();
    const db = ctx.getDb();
    const now = Date.now();
    const blocks = getAdsgramBlocks(db);
    const teams: any[] = Array.isArray(db.teams) ? db.teams : [];
    const budgetHistory: any[] = Array.isArray(db.budgetHistory) ? db.budgetHistory : [];

    // Aggregate historical sponsor & RFS payouts from budgetHistory
    const spEurByBlock: Record<string, { approved: number; eur: number; lastAt: number }> = {
      sponsor_long: { approved: 0, eur: 0, lastAt: 0 },
      sponsor_short: { approved: 0, eur: 0, lastAt: 0 },
      sponsor_banner: { approved: 0, eur: 0, lastAt: 0 },
      rfs_bonus: { approved: 0, eur: 0, lastAt: 0 },
    };
    const clubHistoryMap: Record<string, { eur: number; count: number; lastAt: number }> = {};

    for (const bh of budgetHistory) {
      if (!bh || (bh.type !== 'sponsor_ad' && bh.type !== 'rfs_bonus_ad')) continue;
      const amt = Number(bh.amount || 0);
      const ts = bh.date ? new Date(bh.date).getTime() || 0 : 0;
      const tid = String(bh.teamId || '');
      if (tid) {
        if (!clubHistoryMap[tid]) clubHistoryMap[tid] = { eur: 0, count: 0, lastAt: 0 };
        clubHistoryMap[tid].eur += amt;
        clubHistoryMap[tid].count += 1;
        if (ts > clubHistoryMap[tid].lastAt) clubHistoryMap[tid].lastAt = ts;
      }
      let bKey = 'sponsor_long';
      if (bh.type === 'rfs_bonus_ad') {
        bKey = 'rfs_bonus';
      } else {
        const lbl = String(bh.typeLabel || bh.description || '');
        if (lbl.includes('Т-Банк')) bKey = 'sponsor_short';
        else if (lbl.includes('Аэрофлот')) bKey = 'sponsor_banner';
        else bKey = 'sponsor_long';
      }
      spEurByBlock[bKey].approved += 1;
      spEurByBlock[bKey].eur += amt;
      if (ts > spEurByBlock[bKey].lastAt) spEurByBlock[bKey].lastAt = ts;
    }

    // Current active cycle sums
    const sponsorCycles = db.sponsorCycles && typeof db.sponsorCycles === 'object' ? db.sponsorCycles : {};
    const cycleDeclinedByBlock: Record<string, number> = { sponsor_long: 0, sponsor_short: 0, sponsor_banner: 0 };
    for (const st of Object.values(sponsorCycles) as any[]) {
      if (!st || typeof st !== 'object') continue;
      cycleDeclinedByBlock.sponsor_long += Number(st.declined?.gazprom_neft || 0);
      cycleDeclinedByBlock.sponsor_short += Number(st.declined?.tbank || 0);
      cycleDeclinedByBlock.sponsor_banner += Number(st.declined?.aeroflot || 0);
    }

    // Friendly requests count
    const friendlyAdUsage = db.friendlyAdUsage && typeof db.friendlyAdUsage === 'object' ? db.friendlyAdUsage : {};
    const friendlyByTeam: Record<string, number> = {};
    let totalFriendlyBackfill = 0;
    for (const [tid, rec] of Object.entries(friendlyAdUsage) as any[]) {
      if (!rec || typeof rec !== 'object') continue;
      let tSum = 0;
      for (const v of Object.values(rec)) tSum += Number(v || 0);
      friendlyByTeam[tid] = tSum;
      totalFriendlyBackfill += tSum;
    }

    // Friendly accepted count (approximate from friendlyRequests accepted/done)
    const totalFriendlyAcceptedBackfill = Array.isArray(db.friendlyRequests)
      ? db.friendlyRequests.filter((r: any) => r.status === 'accepted' || r.status === 'done').length
      : 0;

    // Interview usage backfill
    const interviewUsage = db.interviewUsage && typeof db.interviewUsage === 'object' ? db.interviewUsage : {};
    let totalInterviewBackfill = 0;
    for (const matchRec of Object.values(interviewUsage) as any[]) {
      if (!matchRec || typeof matchRec !== 'object') continue;
      for (const actorRec of Object.values(matchRec) as any[]) {
        totalInterviewBackfill += Number(actorRec?.count || 0);
      }
    }

    // National proposals/votes backfill (Main and U21 separately)
    const countNtSet = (sets: any[]) => {
      let propPl = 0, votePl = 0, propOpp = 0, voteOpp = 0;
      for (const ntItem of sets) {
        const pp = Array.isArray(ntItem.playerProposals) ? ntItem.playerProposals : [];
        const op = Array.isArray(ntItem.opponentProposals) ? ntItem.opponentProposals : [];
        propPl += pp.length;
        for (const x of pp) votePl += Math.max(0, Number(x.votes || (Array.isArray(x.voters) ? x.voters.length : 1)) - 1);
        propOpp += op.length;
        for (const x of op) voteOpp += Math.max(0, Number(x.votes || (Array.isArray(x.voters) ? x.voters.length : 1)) - 1);
      }
      return { propPl, votePl, propOpp, voteOpp };
    };
    const ntMainCounts = countNtSet([
      ...(db.nationalTeam?.current ? [db.nationalTeam.current] : []),
      ...(Array.isArray(db.nationalTeam?.archive) ? db.nationalTeam.archive : []),
    ]);
    const ntU21Counts = countNtSet([
      ...(db.nationalTeamU21?.current ? [db.nationalTeamU21.current] : []),
      ...(Array.isArray(db.nationalTeamU21?.archive) ? db.nationalTeamU21.archive : []),
    ]);

    // Prediction wallets stats
    const walletsObj = db.predictionWallets && typeof db.predictionWallets === 'object' ? db.predictionWallets : {};
    let totalCoinsInCirculation = 0;
    let totalCoinsEarnedOverStarter = 0;
    let totalWalletCycleShort = 0, totalWalletCycleBanner = 0, totalWalletCycleLong = 0;
    const walletsTable = Object.entries(walletsObj).map(([actorKey, rawW]: [string, any]) => {
      const w = rawW || {};
      const coins = roundCoins(Number(w.coins || 0));
      const earnedTotal = roundCoins(Number(w.totalEarnedCoins || 0));
      const cycleValid = !(w.cycleStartedAt > 0 && now - w.cycleStartedAt >= CYCLE_MS);
      const cShort = cycleValid ? Number(w.adCounts?.coins_short || 0) : 0;
      const cBanner = cycleValid ? Number(w.adCounts?.coins_banner || 0) : 0;
      const cLong = cycleValid ? Number(w.adCounts?.coins_long || 0) : 0;
      totalCoinsInCirculation += coins;
      totalCoinsEarnedOverStarter += Math.max(0, earnedTotal - STARTER_COINS);
      totalWalletCycleShort += cShort;
      totalWalletCycleBanner += cBanner;
      totalWalletCycleLong += cLong;

      const prof = db.ownerProfiles?.[actorKey] || {};
      const tgKey = actorKey.startsWith('user:tg_') ? actorKey.slice(5) : prof.telegramId ? `tg_${prof.telegramId}` : '';
      const tgRec = tgKey ? db.telegramUsers?.[tgKey] : null;
      const teamId = actorKey.startsWith('club:') ? actorKey.slice(5) : (prof.teamId || null);
      const t = teamId ? ctx.team(teamId) : null;
      const lastAdTimes = Object.values(w.lastAdAt || {}).map((x: any) => Number(x || 0)).filter(Boolean);
      const lastAdAt = lastAdTimes.length ? Math.max(...lastAdTimes) : 0;

      return {
        actorKey,
        displayName: prof.displayName || tgRec?.displayName || (t ? t.name : actorKey),
        profileKind: prof.profileKind || (actorKey.startsWith('club:') ? 'owner' : actorKey.startsWith('admin:') ? 'admin' : 'spectator'),
        tgId: prof.telegramId || tgRec?.tgId || '',
        telegramUsername: prof.telegramUsername || tgRec?.username || '',
        photoUrl: prof.photoUrl || tgRec?.photoUrl || '',
        teamName: t?.name || '',
        teamLogo: t ? ctx.teamLogo(t.id) : '',
        coins,
        totalEarnedCoins: earnedTotal,
        earnedAdEst: Math.max(0, earnedTotal - STARTER_COINS),
        cycleShort: cShort,
        cycleBanner: cBanner,
        cycleLong: cLong,
        cycleTotal: cShort + cBanner + cLong,
        resetAt: cycleValid && w.cycleStartedAt ? w.cycleStartedAt + CYCLE_MS : null,
        lastAdAt,
      };
    }).sort((a, b) => b.totalEarnedCoins - a.totalEarnedCoins || b.coins - a.coins);

    // Reward label helper
    const rewardLabelOf = (key: string) => {
      switch (key) {
        case 'sponsor_long': return '+€750 (95%)';
        case 'sponsor_short': return '+€500 (95%)';
        case 'sponsor_banner': return '+€250 (95%)';
        case 'rfs_bonus': return '+€1 000';
        case 'friendly_request': return 'Заявка (9/пауза)';
        case 'friendly_accept': return 'Приём заявки';
        case 'nt_friendly_a': return '+1 просмотр (счёт клуба)';
        case 'nt_friendly_b': return '+1 просмотр (счёт клуба)';
        case 'coins_short': return '+1 монета';
        case 'coins_banner': return '+2 монеты';
        case 'coins_long': return '+3 монеты';
        case 'nt_propose_player': return 'Игрок в сборную';
        case 'nt_vote_player': return '+1 голос игроку';
        case 'nt_propose_opp': return 'Соперник сборной';
        case 'nt_vote_opp': return '+1 голос сопернику';
        case 'nt_u21_propose_player': return 'Игрок в сборную U21';
        case 'nt_u21_vote_player': return '+1 голос игроку U21';
        case 'nt_u21_propose_opp': return 'Соперник сборной U21';
        case 'nt_u21_vote_opp': return '+1 голос сопернику U21';
        case 'interview_ask': return 'Вопрос игроку (5/матч)';
        case 'transfer_request': return 'Заявка на трансфер';
        default: return '—';
      }
    };

    const getSdkType = (blockId: string): 'reward' | 'interstitial' | 'task' => {
      const low = String(blockId || '').toLowerCase();
      if (low.startsWith('task-')) return 'task';
      if (low.startsWith('int-')) return 'interstitial';
      return 'reward';
    };

    const persistedStats = db.adStats && typeof db.adStats === 'object' ? db.adStats : {};
    const taskBlockIdSet = new Set<string>();

    let kpiCompleted = 0;
    let kpiStartedSession = 0;
    let kpiCompletedSession = 0;
    let kpiErrorsSession = 0;
    let kpiCancelsSession = 0;
    let kpiS2sReceived = 0;
    let kpiS2sMatched = 0;
    let kpiTotalCoinsFromDb = 0;

    const formatAgg: Record<'reward' | 'interstitial' | 'task', {
      blocks: number;
      configured: number;
      completed: number;
      startedSession: number;
      completedSession: number;
      errorsSession: number;
    }> = {
      reward: { blocks: 0, configured: 0, completed: 0, startedSession: 0, completedSession: 0, errorsSession: 0 },
      interstitial: { blocks: 0, configured: 0, completed: 0, startedSession: 0, completedSession: 0, errorsSession: 0 },
      task: { blocks: 0, configured: 0, completed: 0, startedSession: 0, completedSession: 0, errorsSession: 0 },
    };

    const blocksTable = ADSGRAM_BLOCKS.map((def) => {
      const blockId = String(blocks[def.key] || '').trim();
      const configured = isConfiguredAdsgramBlockId(def, blockId);
      const sdkType = getSdkType(blockId);
      if (sdkType === 'task' && configured) taskBlockIdSet.add(blockId.toLowerCase());

      const mem = getMemBlockCounter(def.key);
      const st = persistedStats[def.key] || {};

      let histCompleted = Number(st.completed || 0);
      let histEur = Number(st.eur || 0);
      let histCoins = Number(st.coins || 0);
      let approvedCount = Number(st.approved || 0);
      let declinedCount = Number(st.declined || 0);

      if (def.key === 'sponsor_long' || def.key === 'sponsor_short' || def.key === 'sponsor_banner' || def.key === 'rfs_bonus') {
        const spHist = spEurByBlock[def.key];
        approvedCount = Math.max(approvedCount, spHist.approved);
        histEur = Math.max(histEur, spHist.eur);
        declinedCount = Math.max(declinedCount, cycleDeclinedByBlock[def.key] || 0);
        histCompleted = Math.max(histCompleted, approvedCount + declinedCount);
      } else if (def.key === 'friendly_request') {
        histCompleted = Math.max(histCompleted, totalFriendlyBackfill);
      } else if (def.key === 'friendly_accept') {
        histCompleted = Math.max(histCompleted, totalFriendlyAcceptedBackfill);
      } else if (def.key === 'interview_ask') {
        histCompleted = Math.max(histCompleted, totalInterviewBackfill);
      } else if (def.key === 'nt_propose_player') {
        histCompleted = Math.max(histCompleted, ntMainCounts.propPl);
      } else if (def.key === 'nt_vote_player') {
        histCompleted = Math.max(histCompleted, ntMainCounts.votePl);
      } else if (def.key === 'nt_propose_opp') {
        histCompleted = Math.max(histCompleted, ntMainCounts.propOpp);
      } else if (def.key === 'nt_vote_opp') {
        histCompleted = Math.max(histCompleted, ntMainCounts.voteOpp);
      } else if (def.key === 'nt_u21_propose_player') {
        histCompleted = Math.max(histCompleted, ntU21Counts.propPl);
      } else if (def.key === 'nt_u21_vote_player') {
        histCompleted = Math.max(histCompleted, ntU21Counts.votePl);
      } else if (def.key === 'nt_u21_propose_opp') {
        histCompleted = Math.max(histCompleted, ntU21Counts.propOpp);
      } else if (def.key === 'nt_u21_vote_opp') {
        histCompleted = Math.max(histCompleted, ntU21Counts.voteOpp);
      } else if (def.key === 'coins_short') {
        histCompleted = Math.max(histCompleted, totalWalletCycleShort);
        histCoins = Math.max(histCoins, totalWalletCycleShort * 1);
      } else if (def.key === 'coins_banner') {
        histCompleted = Math.max(histCompleted, totalWalletCycleBanner);
        histCoins = Math.max(histCoins, totalWalletCycleBanner * 2);
      } else if (def.key === 'coins_long') {
        histCompleted = Math.max(histCompleted, totalWalletCycleLong);
        histCoins = Math.max(histCoins, totalWalletCycleLong * 3);
      }

      histCompleted = Math.max(histCompleted, mem.completed);

      kpiCompleted += histCompleted;
      kpiStartedSession += mem.started;
      kpiCompletedSession += mem.completed;
      kpiErrorsSession += mem.errors;
      kpiCancelsSession += mem.cancels;
      kpiS2sReceived += mem.s2sReceived;
      kpiS2sMatched += mem.s2sMatched;
      kpiTotalCoinsFromDb += histCoins;

      const fa = formatAgg[sdkType];
      fa.blocks += 1;
      if (configured) fa.configured += 1;
      fa.completed += histCompleted;
      fa.startedSession += mem.started;
      fa.completedSession += mem.completed;
      fa.errorsSession += mem.errors;

      const lastAt = Math.max(
        Number(st.lastAt || 0),
        spEurByBlock[def.key]?.lastAt || 0
      );

      return {
        key: def.key,
        label: def.label,
        category: def.category,
        format: def.format,
        sdkType,
        durationSec: def.durationSec,
        requiresClick: def.requiresClick,
        maxPerCycle: def.maxPerCycle,
        rewardLabel: rewardLabelOf(def.key),
        blockId,
        defaultBlockId: def.defaultBlockId,
        configured,
        completed: histCompleted,
        approvedCount,
        declinedCount,
        eur: histEur,
        coins: histCoins,
        sessionStarted: mem.started,
        sessionCompleted: mem.completed,
        sessionErrors: mem.errors,
        sessionCancels: mem.cancels,
        s2sReceived: mem.s2sReceived,
        conversionPct: mem.started > 0 ? Math.round((mem.completed / mem.started) * 100) : null,
        lastAt,
      };
    });

    const unkMem = memAdCounters['__unknown__'];
    if (unkMem) {
      kpiErrorsSession += unkMem.errors;
      kpiCancelsSession += unkMem.cancels;
      kpiS2sReceived += unkMem.s2sReceived;
      kpiS2sMatched += unkMem.s2sMatched;
    }

    // Clubs table
    let totalEurCycle = 0;
    let activeClubsInCycleCount = 0;
    const clubsTable = teams
      .filter((t) => t && !t.archived)
      .map((t) => {
        const rawSt = sponsorCycles[t.id] || {};
        const cycleValid = rawSt.cycleStartedAt > 0 && now - rawSt.cycleStartedAt < CYCLE_MS;
        const resetAt = cycleValid ? rawSt.cycleStartedAt + CYCLE_MS : null;
        const remainingMs = resetAt ? Math.max(0, resetAt - now) : 0;

        const gViews = cycleValid ? Math.min(10, Number(rawSt.views?.gazprom_neft || 0)) : 0;
        const tViews = cycleValid ? Math.min(10, Number(rawSt.views?.tbank || 0)) : 0;
        const aViews = cycleValid ? Math.min(10, Number(rawSt.views?.aeroflot || 0)) : 0;
        const totalViewsCycle = gViews + tViews + aViews;
        const earnedEurCycle = cycleValid ? Number(rawSt.earnedEur || 0) : 0;
        const rfsEarnedEurCycle = cycleValid ? Number(rawSt.rfsEarnedEur || 0) : 0;
        const rfsExtraViews = cycleValid ? Number(rawSt.rfsExtraViews || 0) : 0;
        const rfsClaimed = cycleValid && !!rawSt.rfsClaimed;
        const rfsUnlocked = cycleValid && totalViewsCycle >= RFS_REQUIRED_VIEWS;

        if (cycleValid && totalViewsCycle > 0) activeClubsInCycleCount += 1;
        totalEurCycle += earnedEurCycle + rfsEarnedEurCycle;

        const cdList = cycleValid
          ? [
              getCooldownLeftMs(rawSt.lastAdAt?.gazprom_neft),
              getCooldownLeftMs(rawSt.lastAdAt?.tbank),
              getCooldownLeftMs(rawSt.lastAdAt?.aeroflot),
              getCooldownLeftMs(rawSt.lastAdAt?.rfs),
            ]
          : [];
        const activeCooldownMs = cdList.length ? Math.max(0, ...cdList) : 0;
        const lastTimes = Object.values(rawSt.lastAdAt || {}).map((x: any) => Number(x || 0)).filter(Boolean);
        const hist = clubHistoryMap[t.id] || { eur: 0, count: 0, lastAt: 0 };
        const lastAdAt = Math.max(hist.lastAt, lastTimes.length ? Math.max(...lastTimes) : 0);

        return {
          teamId: t.id,
          name: t.name,
          comp: t.comp,
          compName: ctx.compName(t.comp || 'rpl'),
          logo: ctx.teamLogo(t.id),
          budget: Number(t.budget || 0),
          cycleActive: cycleValid,
          resetAt,
          remainingMs,
          gazpromViews: gViews,
          gazpromApproved: cycleValid ? Number(rawSt.approved?.gazprom_neft || 0) : 0,
          gazpromDeclined: cycleValid ? Number(rawSt.declined?.gazprom_neft || 0) : 0,
          tbankViews: tViews,
          tbankApproved: cycleValid ? Number(rawSt.approved?.tbank || 0) : 0,
          tbankDeclined: cycleValid ? Number(rawSt.declined?.tbank || 0) : 0,
          aeroflotViews: aViews,
          aeroflotApproved: cycleValid ? Number(rawSt.approved?.aeroflot || 0) : 0,
          aeroflotDeclined: cycleValid ? Number(rawSt.declined?.aeroflot || 0) : 0,
          totalViewsCycle,
          rfsUnlocked,
          rfsClaimed,
          rfsExtraViews,
          earnedEurCycle,
          rfsEarnedEurCycle,
          activeCooldownMs,
          friendlyAdsTotal: friendlyByTeam[t.id] || 0,
          allTimeAdEur: Math.max(hist.eur, earnedEurCycle + rfsEarnedEurCycle),
          allTimeAdTxCount: hist.count,
          lastAdAt,
        };
      })
      .sort((a, b) =>
        b.allTimeAdEur - a.allTimeAdEur ||
        (b.earnedEurCycle + b.rfsEarnedEurCycle) - (a.earnedEurCycle + a.rfsEarnedEurCycle) ||
        b.totalViewsCycle - a.totalViewsCycle ||
        b.friendlyAdsTotal - a.friendlyAdsTotal ||
        a.name.localeCompare(b.name, 'ru')
      );

    const sponsorsBreakdown = [
      ...SPONSORS.map((sp) => {
        const bt = blocksTable.find((x) => x.key === sp.blockKey);
        return {
          id: sp.id,
          name: sp.name,
          blockKey: sp.blockKey,
          blockId: bt?.blockId || blocks[sp.blockKey],
          rewardEur: sp.rewardEur,
          accentColor: sp.accentColor,
          approved: bt?.approvedCount || 0,
          declined: bt?.declinedCount || 0,
          eur: bt?.eur || 0,
          lastAt: bt?.lastAt || 0,
        };
      }),
      (() => {
        const bt = blocksTable.find((x) => x.key === 'rfs_bonus');
        return {
          id: 'rfs',
          name: 'Бонус от РФС',
          blockKey: 'rfs_bonus',
          blockId: bt?.blockId || blocks.rfs_bonus,
          rewardEur: 1000,
          accentColor: '#15803d',
          approved: bt?.approvedCount || 0,
          declined: 0,
          eur: bt?.eur || 0,
          lastAt: bt?.lastAt || 0,
        };
      })(),
    ];

    const totalEurAllTime = sponsorsBreakdown.reduce((sum, x) => sum + Number(x.eur || 0), 0);
    const totalSponsorApprovals = sponsorsBreakdown.reduce((sum, x) => sum + Number(x.approved || 0), 0);
    const totalSponsorDeclines = sponsorsBreakdown.reduce((sum, x) => sum + Number(x.declined || 0), 0);

    const activeSessions = Array.from(adSessions.values())
      .filter((s) => !s.consumed && now - s.startedAt <= 15 * 60 * 1000)
      .sort((a, b) => b.startedAt - a.startedAt)
      .map((s) => ({
        tokenTail: s.token.slice(-6),
        blockKey: s.blockKey,
        blockId: s.blockId,
        actorKey: s.actorKey,
        actorLabel: resolveActorLabelForLog(ctx, s.actorKey, s.tgId),
        tgId: s.tgId,
        startedAt: s.startedAt,
        elapsedSec: Math.round((now - s.startedAt) / 1000),
        verified: s.verified,
        s2sConfirmed: !!s.s2sConfirmed,
      }));

    const topErrorReasons = Object.entries(errorReasonCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([reason, count]) => ({ reason, count }));

    const baseUrl = String(ctx.getSiteUrl?.() || db.settings?.siteUrl || '').trim().replace(/\/+$/, '');
    const sdkRewardUrl = baseUrl ? `${baseUrl}/api/ads/sdk-reward?userid=[userId]` : '/api/ads/sdk-reward?userid=[userId]';

    res.json({
      generatedAt: now,
      config: {
        blocks,
        defs: ADSGRAM_BLOCKS,
        requireAdsgramS2S: !!db.settings?.requireAdsgramS2S,
        sdkRewardUrl,
        uniqueTaskIds: Array.from(taskBlockIdSet),
      },
      kpis: {
        totalCompleted: kpiCompleted,
        totalStartedSession: kpiStartedSession,
        totalCompletedSession: kpiCompletedSession,
        totalErrorsSession: kpiErrorsSession,
        totalCancelsSession: kpiCancelsSession,
        completionRatePct: kpiStartedSession > 0 ? Math.round((kpiCompletedSession / kpiStartedSession) * 100) : null,
        totalEurAllTime,
        totalEurCycle,
        totalSponsorApprovals,
        totalSponsorDeclines,
        totalCoinsIssuedByAds: Math.max(kpiTotalCoinsFromDb, Math.round(totalCoinsEarnedOverStarter)),
        totalCoinsInCirculation: roundCoins(totalCoinsInCirculation),
        totalWallets: walletsTable.length,
        s2sReceivedSession: kpiS2sReceived,
        s2sMatchedSession: kpiS2sMatched,
        activeSessionsCount: activeSessions.length,
        activeClubsInCycleCount,
      },
      formatStats: formatAgg,
      blocksTable,
      sponsorsBreakdown,
      clubsTable,
      walletsTable: walletsTable.slice(0, 120),
      activeSessions,
      recentS2S: [...recentSdkS2SRewards].slice(-60).reverse(),
      recentEvents: recentAdEvents.slice(0, 150),
      topErrorReasons,
    });
  });

  app.post('/api/admin/ads/settings', ctx.admin, (req: any, res) => {
    const db = ctx.getDb();
    db.settings ||= {};
    const b = req.body || {};
    if (b.adsgramBlocks && typeof b.adsgramBlocks === 'object') {
      db.settings.adsgramBlocks ||= {};
      for (const def of ADSGRAM_BLOCKS) {
        if (typeof b.adsgramBlocks[def.key] === 'string') {
          const val = b.adsgramBlocks[def.key].trim().slice(0, 100);
          if (val) db.settings.adsgramBlocks[def.key] = val;
        }
      }
    }
    if (b.requireAdsgramS2S !== undefined) {
      db.settings.requireAdsgramS2S = !!b.requireAdsgramS2S;
    }
    ctx.save();
    res.json({
      ok: 1,
      adsgramBlocks: getAdsgramBlocks(db),
      requireAdsgramS2S: !!db.settings.requireAdsgramS2S,
      message: 'Настройки рекламных блоков Adsgram сохранены',
    });
  });

  app.post('/api/admin/ads/clear-logs', ctx.admin, (_req, res) => {
    recentAdEvents.length = 0;
    recentSdkS2SRewards.length = 0;
    for (const k of Object.keys(memAdCounters)) delete memAdCounters[k];
    for (const k of Object.keys(errorReasonCounts)) delete errorReasonCounts[k];
    res.json({ ok: 1, message: 'Журнал рекламных событий и диагностика сессии очищены' });
  });
}
