import type { Express, Response } from "express";

export type FineCategory =
  | "no_show"
  | "fans_pyro"
  | "fans_behavior"
  | "fair_play"
  | "team_discipline"
  | "staff_conduct"
  | "media_criticism"
  | "regulation"
  | "other";

export interface ClubFineRecord {
  id: string;
  season: string;
  teamId: string;
  teamName: string;
  comp: string;
  category: FineCategory;
  categoryLabel: string;
  article?: string;
  amount: number;
  fairPlayPenalty: number;
  reason: string;
  fixtureId?: string | null;
  matchLabel?: string;
  issuedBy: "auto_kdk" | "auto_match" | "admin";
  issuedAt: string;
  revoked?: boolean;
  revokedAt?: string;
  revokeReason?: string;
}

export interface FairPlayAdjustment {
  id: string;
  season: string;
  teamId: string;
  delta: number;
  reason: string;
  createdAt: string;
}

export interface FinesFairPlayContext {
  getDb: () => any;
  save: () => void;
  S: () => string;
  team: (id: string) => any;
  tn: (id: string) => string;
  teamLogo: (id: string) => string;
  fx: (id: string) => any;
  compName: (id: string) => string;
  admin: any;
  needClub: any;
  fail: (res: Response, msg: string, code?: number) => void;
  uid: () => string;
  tg: (text: string) => void;
  esc: (s: any) => string;
}

export interface FinePresetDef {
  category: FineCategory;
  label: string;
  article: string;
  baseAmountRpl: number;
  fairPlayPenalty: number;
  defaultReason: string;
}

const FINE_PRESETS: FinePresetDef[] = [
  {
    category: "fans_pyro",
    label: "Болельщики: пиротехника и файеры",
    article: "ст. 114 ДР РФС",
    baseAmountRpl: 1000,
    fairPlayPenalty: 6,
    defaultReason: "Использование зрителями пиротехнических изделий и задымление сектора во время матча",
  },
  {
    category: "fans_behavior",
    label: "Болельщики: скандирования / беспорядки",
    article: "ст. 112 ДР РФС",
    baseAmountRpl: 2500,
    fairPlayPenalty: 10,
    defaultReason: "Неправомерные действия болельщиков, оскорбительные скандирования и бросание предметов на поле",
  },
  {
    category: "fair_play",
    label: "Нарушение принципов Фэйр-плэй",
    article: "ст. 97 ДР РФС",
    baseAmountRpl: 800,
    fairPlayPenalty: 8,
    defaultReason: "Неспортивное поведение, симуляции или умышленное нарушение принципов честной игры (Fair Play)",
  },
  {
    category: "team_discipline",
    label: "Недисциплинированное поведение команды",
    article: "ст. 98 ДР РФС",
    baseAmountRpl: 1000,
    fairPlayPenalty: 6,
    defaultReason: "Получение командой пяти и более жёлтых / двух и более красных карточек в одном матче",
  },
  {
    category: "staff_conduct",
    label: "Поведение тренера / штаба в техзоне",
    article: "ст. 90 ДР РФС",
    baseAmountRpl: 1200,
    fairPlayPenalty: 5,
    defaultReason: "Выход за пределы технической зоны, демонстративное несогласие с решениями арбитра или удаление тренера",
  },
  {
    category: "media_criticism",
    label: "Критика судейства / срыв флеш-интервью",
    article: "ст. 95 ДР РФС",
    baseAmountRpl: 1500,
    fairPlayPenalty: 4,
    defaultReason: "Оскорбительные высказывания в адрес судейской бригады или нарушение медиарегламента",
  },
  {
    category: "regulation",
    label: "Нарушение регламента матча / стадиона",
    article: "ст. 101 ДР РФС",
    baseAmountRpl: 600,
    fairPlayPenalty: 3,
    defaultReason: "Задержка выхода команды на поле или нарушение организационного регламента матча",
  },
  {
    category: "no_show",
    label: "Неявка на матч (срыв игры)",
    article: "ст. 86 ДР РФС",
    baseAmountRpl: 5000,
    fairPlayPenalty: 15,
    defaultReason: "Неявка команды на официальный матч из-за неоформленного выезда / срыва организации",
  },
  {
    category: "other",
    label: "Прочее взыскание КДК РФС",
    article: "Решение КДК",
    baseAmountRpl: 1000,
    fairPlayPenalty: 5,
    defaultReason: "Дисциплинарный штраф по решению КДК РФС",
  },
];

function ensureFinesDb(db: any) {
  if (!Array.isArray(db.clubFines)) db.clubFines = [];
  if (!Array.isArray(db.clubFairPlayAdjustments)) db.clubFairPlayAdjustments = [];
  if (!db.clubFinesProcessed || typeof db.clubFinesProcessed !== "object" || Array.isArray(db.clubFinesProcessed)) {
    db.clubFinesProcessed = {};
  }
  if (!Array.isArray(db.budgetHistory)) db.budgetHistory = [];
  if (!Array.isArray(db.clubNotifications)) db.clubNotifications = [];
}

function fmtEuroServer(n: number): string {
  const v = Math.round(Number(n || 0));
  return v < 0 ? "-€" + Math.abs(v).toLocaleString("ru-RU") : "€" + v.toLocaleString("ru-RU");
}

function roundMoney100(n: number): number {
  return Math.max(0, Math.round(n / 100) * 100);
}

export function leagueScaleForFine(comp?: string): number {
  const c = String(comp || "rpl");
  if (c === "rpl" || c === "cup" || c === "supercup") return 1;
  if (c === "fnl") return 0.5;
  return 0.3;
}

export function getFinePresets(comp?: string) {
  const sf = leagueScaleForFine(comp);
  return FINE_PRESETS.map((p) => ({
    ...p,
    suggestedAmount: roundMoney100(p.baseAmountRpl * sf),
  }));
}

export function issueClubFine(
  ctx: FinesFairPlayContext,
  opts: {
    teamId: string;
    category: FineCategory;
    amount?: number;
    fairPlayPenalty?: number;
    reason: string;
    article?: string;
    fixtureId?: string | null;
    matchLabel?: string;
    issuedBy: "auto_kdk" | "auto_match" | "admin";
    notifyTg?: boolean;
  }
): ClubFineRecord | null {
  const db = ctx.getDb();
  ensureFinesDb(db);
  const t = ctx.team(opts.teamId);
  if (!t) return null;

  const preset = FINE_PRESETS.find((x) => x.category === opts.category) || FINE_PRESETS[FINE_PRESETS.length - 1];
  const sf = leagueScaleForFine(t.comp);
  const amount = opts.amount !== undefined ? Math.max(0, Math.round(Number(opts.amount || 0))) : roundMoney100(preset.baseAmountRpl * sf);
  const fpPen =
    opts.fairPlayPenalty !== undefined ? Math.max(0, Math.min(40, Math.round(Number(opts.fairPlayPenalty || 0)))) : preset.fairPlayPenalty;
  const reason = String(opts.reason || preset.defaultReason).trim().slice(0, 260) || preset.defaultReason;
  const article = String(opts.article || preset.article).trim().slice(0, 60);
  const nowIso = new Date().toISOString();
  const season = ctx.S();

  const rec: ClubFineRecord = {
    id: ctx.uid(),
    season,
    teamId: t.id,
    teamName: t.name,
    comp: t.comp || "rpl",
    category: preset.category,
    categoryLabel: preset.label,
    article,
    amount,
    fairPlayPenalty: fpPen,
    reason,
    fixtureId: opts.fixtureId || null,
    matchLabel: opts.matchLabel || "",
    issuedBy: opts.issuedBy,
    issuedAt: nowIso,
    revoked: false,
  };

  db.clubFines.unshift(rec);
  if (db.clubFines.length > 1000) db.clubFines.length = 1000;

  const prevBudget = Number(t.budget || 0);
  const newBudget = prevBudget - amount;
  t.budget = newBudget;

  if (amount > 0) {
    db.budgetHistory.push({
      id: ctx.uid(),
      teamId: t.id,
      teamName: t.name,
      amount: -amount,
      prevBudget,
      newBudget,
      type: "kdk_fine",
      typeLabel: "Штраф КДК РФС",
      description: `${preset.label}${article ? ` (${article})` : ""}: ${reason}${rec.matchLabel ? ` · ${rec.matchLabel}` : ""} (−${fmtEuroServer(amount)})`,
      date: nowIso,
      byAdmin: opts.issuedBy === "admin",
    });
  }

  db.clubNotifications.unshift({
    id: ctx.uid(),
    teamId: t.id,
    type: "kdk_fine",
    subtype: preset.category,
    title: `Штраф КДК РФС: ${preset.label}`,
    message: `${reason}${article ? ` (${article})` : ""}.${amount > 0 ? ` Списано ${fmtEuroServer(amount)}.` : ""}${fpPen > 0 ? ` Штраф Фэйр-плэй: −${fpPen} б.` : ""} Баланс: ${fmtEuroServer(newBudget)}.`,
    amount: -amount,
    formattedAmount: amount > 0 ? `-${fmtEuroServer(amount)}` : undefined,
    prevBudget,
    newBudget,
    formattedNewBudget: fmtEuroServer(newBudget),
    createdAt: Date.now(),
    date: nowIso,
    read: false,
  });
  if (db.clubNotifications.length > 500) db.clubNotifications.length = 500;

  ctx.save();

  if (opts.notifyTg) {
    try {
      ctx.tg(
        `⚖️ <b>КДК РФС · Штраф клубу «${ctx.esc(t.name)}»</b>\n` +
          `Статья: ${ctx.esc(preset.label)}${article ? ` (${ctx.esc(article)})` : ""}\n` +
          `Причина: ${ctx.esc(reason)}\n` +
          `Сумма: <b>${fmtEuroServer(amount)}</b>${fpPen > 0 ? ` · Фэйр-плэй: <b>−${fpPen}</b>` : ""}`
      );
    } catch {}
  }

  return rec;
}

export function revokeClubFine(ctx: FinesFairPlayContext, fineId: string, revokeReason?: string): ClubFineRecord | null {
  const db = ctx.getDb();
  ensureFinesDb(db);
  const rec: ClubFineRecord | undefined = db.clubFines.find((x: ClubFineRecord) => x.id === fineId);
  if (!rec || rec.revoked) return null;

  const t = ctx.team(rec.teamId);
  const nowIso = new Date().toISOString();
  rec.revoked = true;
  rec.revokedAt = nowIso;
  rec.revokeReason = String(revokeReason || "Отмена штрафа по апелляции в КДК").trim().slice(0, 180);

  if (t && rec.amount > 0) {
    const prevBudget = Number(t.budget || 0);
    t.budget = prevBudget + rec.amount;
    db.budgetHistory.push({
      id: ctx.uid(),
      teamId: t.id,
      teamName: t.name,
      amount: rec.amount,
      prevBudget,
      newBudget: t.budget,
      type: "kdk_refund",
      typeLabel: "Возврат штрафа КДК",
      description: `Отмена взыскания «${rec.categoryLabel}»: ${rec.revokeReason} (+${fmtEuroServer(rec.amount)})`,
      date: nowIso,
      byAdmin: true,
    });
    db.clubNotifications.unshift({
      id: ctx.uid(),
      teamId: t.id,
      type: "kdk_refund",
      title: `Апелляция удовлетворена: отмена штрафа ${fmtEuroServer(rec.amount)}`,
      message: `Штраф «${rec.categoryLabel}» отменён (${rec.revokeReason}). Средства возвращены на счёт клуба.`,
      amount: rec.amount,
      formattedAmount: `+${fmtEuroServer(rec.amount)}`,
      createdAt: Date.now(),
      date: nowIso,
      read: false,
    });
  }

  ctx.save();
  return rec;
}

export function applyNoShowTechDefeatFine(
  ctx: FinesFairPlayContext,
  f: any,
  tid: string,
  reasons: string[]
): { amount: number; fine: ClubFineRecord | null } {
  const db = ctx.getDb();
  ensureFinesDb(db);
  const dedupKey = `noshow:${f?.id || ""}:${tid}`;
  if (db.clubFinesProcessed[dedupKey]) {
    const existing = db.clubFines.find((x: ClubFineRecord) => x.fixtureId === f?.id && x.teamId === tid && x.category === "no_show" && !x.revoked);
    return { amount: existing?.amount || 0, fine: existing || null };
  }

  const hasTravelNoShow = reasons.some((r) => /не организован выезд|неявка/i.test(String(r || "")));
  if (!hasTravelNoShow) return { amount: 0, fine: null };

  const t = ctx.team(tid);
  if (!t) return { amount: 0, fine: null };
  db.clubFinesProcessed[dedupKey] = Date.now();

  const oppId = f.home === tid ? f.away : f.home;
  const matchLabel = `${ctx.tn(f.home)} — ${ctx.tn(f.away)}`;
  const fine = issueClubFine(ctx, {
    teamId: tid,
    category: "no_show",
    reason: `Неявка на выездной матч против «${ctx.tn(oppId)}» (не оформлена выездная логистика)`,
    article: "ст. 86 ДР РФС",
    fixtureId: f.id,
    matchLabel,
    issuedBy: "auto_kdk",
    notifyTg: false,
  });

  return { amount: fine?.amount || 0, fine };
}

function stableHash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function processMatchFinesAndFairPlay(ctx: FinesFairPlayContext, f: any, m: any) {
  if (!f || !m || f.comp === "friendly_match" || f.comp === "intra") return;
  const db = ctx.getDb();
  ensureFinesDb(db);
  if (db.clubFinesProcessed[f.id]) return;
  db.clubFinesProcessed[f.id] = Date.now();

  const events = Array.isArray(m.events) ? m.events : [];
  const matchLabel = `${ctx.tn(f.home)} — ${ctx.tn(f.away)}`;
  const isDerby = !!(m.ctx?.derby && !String(m.ctx.derby).startsWith("нет"));

  for (const side of ["home", "away"] as const) {
    const tid = f[side];
    const t = ctx.team(tid);
    if (!t) continue;
    const sf = leagueScaleForFine(t.comp || f.comp);

    let yc = 0;
    let rc = 0;
    let staffCard = 0;

    for (const ev of events) {
      if (ev.team !== side) continue;
      if (ev.person) {
        if (ev.type === "yellow" || ev.type === "red") staffCard++;
        continue;
      }
      if (ev.type === "yellow") yc++;
      if (ev.type === "red") rc++;
    }

    // Check st fallback if events didn't encode cards
    if (yc === 0 && Number(f.st?.yellow?.[side] || 0) > 0) yc = Number(f.st.yellow[side]);
    if (rc === 0 && Number(f.st?.red?.[side] || 0) > 0) rc = Number(f.st.red[side]);

    if (yc >= 5 || rc >= 2) {
      issueClubFine(ctx, {
        teamId: tid,
        category: "team_discipline",
        amount: roundMoney100(1000 * sf),
        fairPlayPenalty: 6,
        reason: `Недисциплинированное поведение команды в матче «${matchLabel}» (${yc} ЖК, ${rc} КК)`,
        article: "ст. 98 ДР РФС",
        fixtureId: f.id,
        matchLabel,
        issuedBy: "auto_match",
        notifyTg: true,
      });
    }

    if (staffCard > 0) {
      issueClubFine(ctx, {
        teamId: tid,
        category: "staff_conduct",
        amount: roundMoney100(900 * sf),
        fairPlayPenalty: 5,
        reason: `Недисциплинированное поведение представителя тренерского штаба в матче «${matchLabel}»`,
        article: "ст. 90 ДР РФС",
        fixtureId: f.id,
        matchLabel,
        issuedBy: "auto_match",
        notifyTg: true,
      });
    }

    // Realistic supporter / stadium incidents (weighted by derby & away travel fan presence)
    const awayLog = db.awayLogistics?.[`${f.id}:${tid}`];
    const hasFanTrip = side === "away" && awayLog?.selection?.delegation === "fan_support";
    const hVal = stableHash(`${f.id}:${tid}:${f.date || ""}`) % 100;

    const pyroChance = isDerby ? 24 : hasFanTrip ? 18 : 10;
    const chantChance = isDerby ? 12 : 5;

    if (hVal < chantChance) {
      issueClubFine(ctx, {
        teamId: tid,
        category: "fans_behavior",
        amount: roundMoney100(2200 * sf),
        fairPlayPenalty: 9,
        reason: `Скандирования и бросание предметов болельщиками ${side === "away" ? "гостевого сектора" : "трибун"} на матче «${matchLabel}»`,
        article: "ст. 112 ДР РФС",
        fixtureId: f.id,
        matchLabel,
        issuedBy: "auto_match",
        notifyTg: true,
      });
    } else if (hVal < chantChance + pyroChance) {
      issueClubFine(ctx, {
        teamId: tid,
        category: "fans_pyro",
        amount: roundMoney100(900 * sf),
        fairPlayPenalty: 5,
        reason: `Использование пиротехники и файеров болельщиками на матче «${matchLabel}»`,
        article: "ст. 114 ДР РФС",
        fixtureId: f.id,
        matchLabel,
        issuedBy: "auto_match",
        notifyTg: true,
      });
    }
  }
}

export function computeFairPlayStandings(ctx: FinesFairPlayContext, compFilter?: string, seasonOverride?: string) {
  const db = ctx.getDb();
  ensureFinesDb(db);
  const curS = seasonOverride || ctx.S();

  const teams = (db.teams || []).filter((t: any) => !compFilter || compFilter === "all" || t.comp === compFilter);
  const finesAll: ClubFineRecord[] = (db.clubFines || []).filter(
    (x: ClubFineRecord) => !x.revoked && (!x.season || x.season === curS)
  );
  const adjAll: FairPlayAdjustment[] = (db.clubFairPlayAdjustments || []).filter(
    (x: FairPlayAdjustment) => !x.season || x.season === curS
  );
  const doneFixtures = (db.fixtures || []).filter(
    (f: any) => f.status === "done" && f.comp !== "friendly_match" && (!f.season || f.season === curS)
  );

  const fineMap: Record<string, { count: number; totalAmount: number; fpPenalty: number; fanCount: number }> = {};
  for (const fn of finesAll) {
    const slot = (fineMap[fn.teamId] ||= { count: 0, totalAmount: 0, fpPenalty: 0, fanCount: 0 });
    slot.count++;
    slot.totalAmount += Number(fn.amount || 0);
    slot.fpPenalty += Number(fn.fairPlayPenalty || 0);
    if (fn.category === "fans_pyro" || fn.category === "fans_behavior") slot.fanCount++;
  }

  const adjMap: Record<string, number> = {};
  for (const a of adjAll) {
    adjMap[a.teamId] = (adjMap[a.teamId] || 0) + Number(a.delta || 0);
  }

  const matchMap: Record<string, { played: number; yc: number; rc: number; cleanMatches: number; noShows: number }> = {};
  for (const f of doneFixtures) {
    const isTech = !!f.tech;
    for (const side of ["home", "away"] as const) {
      const tid = f[side];
      if (!tid) continue;
      const s = (matchMap[tid] ||= { played: 0, yc: 0, rc: 0, cleanMatches: 0, noShows: 0 });
      s.played++;
      if (isTech && Array.isArray(f.tech?.[side]) && f.tech[side].length > 0) {
        s.noShows++;
        continue;
      }
      const yc = Number(f.st?.yellow?.[side] || 0);
      const rc = Number(f.st?.red?.[side] || 0);
      s.yc += yc;
      s.rc += rc;
      const hadMatchFine = finesAll.some((fn) => fn.fixtureId === f.id && fn.teamId === tid);
      if (yc === 0 && rc === 0 && !hadMatchFine) {
        s.cleanMatches++;
      }
    }
  }

  const rows = teams.map((t: any) => {
    const ms = matchMap[t.id] || { played: 0, yc: 0, rc: 0, cleanMatches: 0, noShows: 0 };
    const fs = fineMap[t.id] || { count: 0, totalAmount: 0, fpPenalty: 0, fanCount: 0 };
    const manualDelta = adjMap[t.id] || 0;

    // Fair Play rating (base 100, +1.5 per clean match, -1 per YC, -4 per RC, minus KDK penalties)
    const rawScore = 100 + ms.cleanMatches * 1.5 - ms.yc * 1.0 - ms.rc * 4.0 - fs.fpPenalty + manualDelta;
    const fairPlayScore = +Math.max(0, Math.min(130, rawScore)).toFixed(1);

    return {
      teamId: t.id,
      teamName: t.name,
      teamLogo: ctx.teamLogo(t.id),
      comp: t.comp,
      compName: ctx.compName(t.comp),
      played: ms.played,
      cleanMatches: ms.cleanMatches,
      yellowCards: ms.yc,
      redCards: ms.rc,
      finesCount: fs.count,
      fanIncidents: fs.fanCount,
      totalFinedEur: fs.totalAmount,
      fairPlayScore,
    };
  });

  rows.sort(
    (a: any, b: any) =>
      b.fairPlayScore - a.fairPlayScore ||
      a.totalFinedEur - b.totalFinedEur ||
      a.redCards - b.redCards ||
      a.yellowCards - b.yellowCards ||
      a.teamName.localeCompare(b.teamName, "ru")
  );

  return rows.map((r: any, idx: number) => ({ ...r, rank: idx + 1 }));
}

export function getClubFinesSummary(ctx: FinesFairPlayContext, tid: string) {
  const db = ctx.getDb();
  ensureFinesDb(db);
  const t = ctx.team(tid);
  if (!t) return { finesCount: 0, totalFinedEur: 0, fairPlayScore: 100, rank: 1 };
  const rows = computeFairPlayStandings(ctx, t.comp);
  const row = rows.find((r: any) => r.teamId === tid);
  return {
    finesCount: row?.finesCount || 0,
    totalFinedEur: row?.totalFinedEur || 0,
    fairPlayScore: row?.fairPlayScore ?? 100,
    rank: row?.rank || 1,
    totalTeamsInComp: rows.length,
  };
}

export function registerFinesFairPlayRoutes(app: Express, ctx: FinesFairPlayContext) {
  app.get("/api/fines/fair-play", (req: any, res: Response) => {
    const db = ctx.getDb();
    ensureFinesDb(db);
    const comp = String(req.query?.comp || "rpl");
    const standings = computeFairPlayStandings(ctx, comp);
    const curS = ctx.S();
    const recentFines = (db.clubFines || [])
      .filter((x: ClubFineRecord) => (!x.season || x.season === curS) && (comp === "all" || x.comp === comp))
      .slice(0, 60);
    res.json({
      comp,
      season: curS,
      standings,
      recentFines,
      presets: getFinePresets(comp === "all" ? "rpl" : comp),
    });
  });

  app.get("/api/club/fines", ctx.needClub, (req: any, res: Response) => {
    const db = ctx.getDb();
    ensureFinesDb(db);
    const tid = req.tid;
    const t = ctx.team(tid);
    if (!t) return ctx.fail(res, "Клуб не найден", 404);
    const curS = ctx.S();

    const clubFines = (db.clubFines || [])
      .filter((x: ClubFineRecord) => x.teamId === tid && (!x.season || x.season === curS))
      .slice(0, 80);
    const standings = computeFairPlayStandings(ctx, t.comp, curS);
    const myStanding = standings.find((r: any) => r.teamId === tid) || {
      rank: 1,
      fairPlayScore: 100,
      finesCount: 0,
      totalFinedEur: 0,
      yellowCards: 0,
      redCards: 0,
      cleanMatches: 0,
      fanIncidents: 0,
    };

    res.json({
      team: {
        id: t.id,
        name: t.name,
        comp: t.comp,
        compName: ctx.compName(t.comp),
        budget: Number(t.budget || 0),
        formattedBudget: fmtEuroServer(t.budget || 0),
      },
      summary: myStanding,
      fines: clubFines,
      standings,
    });
  });

  app.post("/api/admin/fines/issue", ctx.admin, (req: any, res: Response) => {
    const teamId = String(req.body?.teamId || "").trim();
    const category = String(req.body?.category || "other").trim() as FineCategory;
    const amount = Number(req.body?.amount);
    const fairPlayPenalty = req.body?.fairPlayPenalty !== undefined ? Number(req.body?.fairPlayPenalty) : undefined;
    const reason = String(req.body?.reason || "").trim();
    const article = String(req.body?.article || "").trim();
    const fixtureId = req.body?.fixtureId ? String(req.body.fixtureId).trim() : null;

    const t = ctx.team(teamId);
    if (!t) return ctx.fail(res, "Клуб не найден", 404);
    if (!Number.isFinite(amount) || amount < 0 || amount > 5_000_000) {
      return ctx.fail(res, "Укажите корректную сумму штрафа (от €0 до €5 000 000)", 400);
    }

    let matchLabel = "";
    if (fixtureId) {
      const f = ctx.fx(fixtureId);
      if (f) matchLabel = `${ctx.tn(f.home)} — ${ctx.tn(f.away)}`;
    }

    const rec = issueClubFine(ctx, {
      teamId,
      category,
      amount,
      fairPlayPenalty,
      reason,
      article,
      fixtureId,
      matchLabel,
      issuedBy: "admin",
      notifyTg: req.body?.notifyTg !== false,
    });

    if (!rec) return ctx.fail(res, "Не удалось выписать штраф", 400);
    res.json({
      ok: true,
      fine: rec,
      message: `Штраф КДК ${fmtEuroServer(rec.amount)} наложен на клуб «${t.name}»${rec.fairPlayPenalty ? ` (Фэйр-плэй −${rec.fairPlayPenalty})` : ""}.`,
    });
  });

  app.post("/api/admin/fines/revoke", ctx.admin, (req: any, res: Response) => {
    const fineId = String(req.body?.id || "").trim();
    const reason = String(req.body?.reason || "").trim();
    const rec = revokeClubFine(ctx, fineId, reason);
    if (!rec) return ctx.fail(res, "Активный штраф не найден", 404);
    res.json({
      ok: true,
      fine: rec,
      message: `Штраф клуба «${rec.teamName}» отменён, ${fmtEuroServer(rec.amount)} возвращены в бюджет.`,
    });
  });

  app.post("/api/admin/fines/fairplay-adjust", ctx.admin, (req: any, res: Response) => {
    const db = ctx.getDb();
    ensureFinesDb(db);
    const teamId = String(req.body?.teamId || "").trim();
    const delta = Number(req.body?.delta || 0);
    const reason = String(req.body?.reason || "").trim().slice(0, 200);
    const t = ctx.team(teamId);
    if (!t) return ctx.fail(res, "Клуб не найден", 404);
    if (!Number.isFinite(delta) || delta === 0 || Math.abs(delta) > 30) {
      return ctx.fail(res, "Корректировка Фэйр-плэй должна быть от -30 до +30 (не 0)", 400);
    }
    db.clubFairPlayAdjustments.push({
      id: ctx.uid(),
      season: ctx.S(),
      teamId: t.id,
      delta: Math.round(delta * 10) / 10,
      reason: reason || (delta > 0 ? "Поощрение РФС за честную игру (Fair Play)" : "Штраф Фэйр-плэй от КДК"),
      createdAt: new Date().toISOString(),
    });
    ctx.save();
    res.json({
      ok: true,
      message: `Рейтинг Фэйр-плэй клуба «${t.name}» изменён на ${delta > 0 ? "+" : ""}${delta}.`,
    });
  });
}
