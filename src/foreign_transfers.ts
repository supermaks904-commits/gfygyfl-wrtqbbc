// @ts-nocheck
/**
 * Foreign clubs and international transfer / loan offers
 */

export const FOREIGN_CLUBS: any[] = [
  // Уровень 1 (Топ и предтоп Европы / саудовские гранды)
  { id: "monaco", name: "Монако", country: "Франция", flag: "🇫🇷", league: "Лига 1", reputation: 84, tier: "top" },
  { id: "atalanta", name: "Аталанта", country: "Италия", flag: "🇮🇹", league: "Серия А", reputation: 84, tier: "top" },
  { id: "porto", name: "Порту", country: "Португалия", flag: "🇵🇹", league: "Примейра-лига", reputation: 84, tier: "top" },
  { id: "marseille", name: "Марсель", country: "Франция", flag: "🇫🇷", league: "Лига 1", reputation: 83, tier: "top" },
  { id: "sociedad", name: "Реал Сосьедад", country: "Испания", flag: "🇪🇸", league: "Ла Лига", reputation: 83, tier: "top" },
  { id: "alhilal", name: "Аль-Хиляль", country: "Саудовская Аравия", flag: "🇸🇦", league: "Про-лига", reputation: 83, tier: "top" },
  { id: "galatasaray", name: "Галатасарай", country: "Турция", flag: "🇹🇷", league: "Суперлига", reputation: 82, tier: "top" },
  { id: "alnasr", name: "Аль-Наср", country: "Саудовская Аравия", flag: "🇸🇦", league: "Про-лига", reputation: 82, tier: "top" },
  { id: "lyon", name: "Лион", country: "Франция", flag: "🇫🇷", league: "Лига 1", reputation: 81, tier: "top" },
  { id: "fenerbahce", name: "Фенербахче", country: "Турция", flag: "🇹🇷", league: "Суперлига", reputation: 81, tier: "top" },
  { id: "feyenoord", name: "Фейеноорд", country: "Нидерланды", flag: "🇳🇱", league: "Эредивизи", reputation: 81, tier: "top" },
  { id: "flamengo", name: "Фламенго", country: "Бразилия", flag: "🇧🇷", league: "Серия А", reputation: 81, tier: "top" },

  // Уровень 2 (Крепкие середняки топ-лиг и гранды Турции/Греции/Бельгии/Нидерландов/Португалии/ОАЭ)
  { id: "sevilla", name: "Севилья", country: "Испания", flag: "🇪🇸", league: "Ла Лига", reputation: 80, tier: "mid" },
  { id: "fiorentina", name: "Фиорентина", country: "Италия", flag: "🇮🇹", league: "Серия А", reputation: 80, tier: "mid" },
  { id: "az_alkmaar", name: "АЗ Алкмаар", country: "Нидерланды", flag: "🇳🇱", league: "Эредивизи", reputation: 80, tier: "mid" },
  { id: "olympiacos", name: "Олимпиакос", country: "Греция", flag: "🇬🇷", league: "Суперлига", reputation: 79, tier: "mid" },
  { id: "braga", name: "Брага", country: "Португалия", flag: "🇵🇹", league: "Примейра-лига", reputation: 79, tier: "mid" },
  { id: "brugge", name: "Брюгге", country: "Бельгия", flag: "🇧🇪", league: "Про-лига", reputation: 79, tier: "mid" },
  { id: "anderlecht", name: "Андерлехт", country: "Бельгия", flag: "🇧🇪", league: "Про-лига", reputation: 78, tier: "mid" },
  { id: "besiktas", name: "Бешикташ", country: "Турция", flag: "🇹🇷", league: "Суперлига", reputation: 78, tier: "mid" },
  { id: "girona", name: "Жирона", country: "Испания", flag: "🇪🇸", league: "Ла Лига", reputation: 78, tier: "mid" },
  { id: "wolfsburg", name: "Вольфсбург", country: "Германия", flag: "🇩🇪", league: "Бундеслига", reputation: 78, tier: "mid" },
  { id: "slavia_prague", name: "Славия Прага", country: "Чехия", flag: "🇨🇿", league: "Шанс-лига", reputation: 78, tier: "mid" },
  { id: "paok", name: "ПАОК", country: "Греция", flag: "🇬🇷", league: "Суперлига", reputation: 77, tier: "mid" },
  { id: "twente", name: "Твенте", country: "Нидерланды", flag: "🇳🇱", league: "Эредивизи", reputation: 77, tier: "mid" },
  { id: "young_boys", name: "Янг Бойз", country: "Швейцария", flag: "🇨🇭", league: "Суперлига", reputation: 77, tier: "mid" },
  { id: "al_ain", name: "Аль-Айн", country: "ОАЭ", flag: "🇦🇪", league: "Про-лига", reputation: 77, tier: "mid" },

  // Уровень 3 (Середняки, балканские, турецкие, центральноевропейские, азиатские и американские клубы)
  { id: "trabzonspor", name: "Трабзонспор", country: "Турция", flag: "🇹🇷", league: "Суперлига", reputation: 76, tier: "lower" },
  { id: "crvena_zvezda", name: "Црвена Звезда", country: "Сербия", flag: "🇷🇸", league: "Суперлига", reputation: 76, tier: "lower" },
  { id: "aek_athens", name: "АЕК Афины", country: "Греция", flag: "🇬🇷", league: "Суперлига", reputation: 76, tier: "lower" },
  { id: "torino", name: "Торино", country: "Италия", flag: "🇮🇹", league: "Серия А", reputation: 76, tier: "lower" },
  { id: "dinamo_zagreb", name: "Динамо Загреб", country: "Хорватия", flag: "🇭🇷", league: "ХНЛ", reputation: 76, tier: "lower" },
  { id: "sturm_graz", name: "Штурм Грац", country: "Австрия", flag: "🇦🇹", league: "Бундеслига", reputation: 76, tier: "lower" },
  { id: "basaksehir", name: "Истанбул Башакшехир", country: "Турция", flag: "🇹🇷", league: "Суперлига", reputation: 75, tier: "lower" },
  { id: "ferencvaros", name: "Ференцварош", country: "Венгрия", flag: "🇭🇺", league: "НБ I", reputation: 75, tier: "lower" },
  { id: "qarabag", name: "Карабах", country: "Азербайджан", flag: "🇦🇿", league: "Премьер-лига", reputation: 75, tier: "lower" },
  { id: "viktoria_plzen", name: "Виктория Пльзень", country: "Чехия", flag: "🇨🇿", league: "Шанс-лига", reputation: 75, tier: "lower" },
  { id: "gent", name: "Гент", country: "Бельгия", flag: "🇧🇪", league: "Про-лига", reputation: 75, tier: "lower" },
  { id: "partizan", name: "Партизан", country: "Сербия", flag: "🇷🇸", league: "Суперлига", reputation: 74, tier: "lower" },
  { id: "alaves", name: "Алавес", country: "Испания", flag: "🇪🇸", league: "Ла Лига", reputation: 74, tier: "lower" },
  { id: "augsburg", name: "Аугсбург", country: "Германия", flag: "🇩🇪", league: "Бундеслига", reputation: 74, tier: "lower" },
  { id: "ludogorets", name: "Лудогорец", country: "Болгария", flag: "🇧🇬", league: "Первая лига", reputation: 74, tier: "lower" },
  { id: "shanghai_shenhua", name: "Шанхай Шэньхуа", country: "Китай", flag: "🇨🇳", league: "Суперлига", reputation: 74, tier: "lower" },
  { id: "legia_warsaw", name: "Легия Варшава", country: "Польша", flag: "🇵🇱", league: "Экстракласса", reputation: 74, tier: "lower" },
  { id: "basel", name: "Базель", country: "Швейцария", flag: "🇨🇭", league: "Суперлига", reputation: 74, tier: "lower" },
  { id: "cincinnati", name: "Цинциннати", country: "США", flag: "🇺🇸", league: "МЛС", reputation: 74, tier: "lower" },
  { id: "lehavre", name: "Гавр", country: "Франция", flag: "🇫🇷", league: "Лига 1", reputation: 73, tier: "lower" },
  { id: "slovan", name: "Слован Братислава", country: "Словакия", flag: "🇸🇰", league: "Найк-лига", reputation: 73, tier: "lower" },
  { id: "samsunspor", name: "Самсунспор", country: "Турция", flag: "🇹🇷", league: "Суперлига", reputation: 73, tier: "lower" },
  { id: "maccabi_ta", name: "Маккаби Тель-Авив", country: "Израиль", flag: "🇮🇱", league: "Премьер-лига", reputation: 73, tier: "lower" },
  { id: "hajduk", name: "Хайдук Сплит", country: "Хорватия", flag: "🇭🇷", league: "ХНЛ", reputation: 73, tier: "lower" },
  { id: "kasimpasa", name: "Касымпаша", country: "Турция", flag: "🇹🇷", league: "Суперлига", reputation: 73, tier: "lower" },

  // Уровень 4 (Скромные и ближние лиги — активный спрос на игроков ротации, скамейки и аренды)
  { id: "aris_limassol", name: "Арис Лимасол", country: "Кипр", flag: "🇨🇾", league: "Дивизион А", reputation: 72, tier: "modest" },
  { id: "lech_poznan", name: "Лех Познань", country: "Польша", flag: "🇵🇱", league: "Экстракласса", reputation: 72, tier: "modest" },
  { id: "lask", name: "ЛАСК", country: "Австрия", flag: "🇦🇹", league: "Бундеслига", reputation: 72, tier: "modest" },
  { id: "astana", name: "Астана", country: "Казахстан", flag: "🇰🇿", league: "КПЛ", reputation: 71, tier: "modest" },
  { id: "vojvodina", name: "Войводина", country: "Сербия", flag: "🇷🇸", league: "Суперлига", reputation: 71, tier: "modest" },
  { id: "al_wasl", name: "Аль-Васль", country: "ОАЭ", flag: "🇦🇪", league: "Про-лига", reputation: 71, tier: "modest" },
  { id: "kairat", name: "Кайрат", country: "Казахстан", flag: "🇰🇿", league: "КПЛ", reputation: 70, tier: "modest" },
  { id: "ordabasy", name: "Ордабасы", country: "Казахстан", flag: "🇰🇿", league: "КПЛ", reputation: 69, tier: "modest" },
  { id: "neftchi_baku", name: "Нефтчи Баку", country: "Азербайджан", flag: "🇦🇿", league: "Премьер-лига", reputation: 69, tier: "modest" },
  { id: "dinamo_minsk", name: "Динамо Минск", country: "Беларусь", flag: "🇧🇾", league: "Высшая лига", reputation: 68, tier: "modest" },
  { id: "dinamo_batumi", name: "Динамо Батуми", country: "Грузия", flag: "🇬🇪", league: "Эровнули-лига", reputation: 68, tier: "modest" },
  { id: "pyunik", name: "Пюник", country: "Армения", flag: "🇦🇲", league: "Премьер-лига", reputation: 67, tier: "modest" }
];

const MAX_FOREIGN_OFFERS_PER_BUYER_SEASON = 1;
const MAX_FOREIGN_PENDING_PER_BUYER = 1;
const MAX_FOREIGN_PENDING_LEAGUE_WIDE = 12;
const MAX_FOREIGN_AUTO_OFFERS_PER_SEASON = 50;
const MAX_FOREIGN_OFFERS_PER_RU_CLUB_SEASON = 5;
const FOREIGN_LEAGUE_MATCH_GAP = 1;
const FOREIGN_RU_CLUB_MATCH_GAP = 2;

function getForeignClubTier(c: any): "top" | "mid" | "lower" | "modest" {
  if (c?.tier) return c.tier;
  const rep = Number(c?.reputation || 75);
  if (rep >= 81) return "top";
  if (rep >= 77) return "mid";
  if (rep >= 73) return "lower";
  return "modest";
}

function getForeignClubQuota(db2: any, clubObjOrId: any, targetSeason?: string) {
  const fClub = typeof clubObjOrId === "string"
    ? FOREIGN_CLUBS.find((c) => c.id.toLowerCase() === clubObjOrId.toLowerCase() || c.name.toLowerCase() === clubObjOrId.toLowerCase())
    : clubObjOrId;
  const cId = String(fClub?.id || clubObjOrId || "").trim().toLowerCase();
  const cName = String(fClub?.name || clubObjOrId || "").trim().toLowerCase();
  const season = targetSeason || db2?.settings?.season || "2026/27";
  const offers = Array.isArray(db2?.foreignOffers) ? db2.foreignOffers : [];
  let pending = 0;
  let seasonOffers = 0;
  for (const o of offers) {
    if (!o) continue;
    const oId = String(o.buyerClubId || "").trim().toLowerCase();
    const oName = String(o.buyerClub || "").trim().toLowerCase();
    if (!((cId && oId === cId) || (cName && oName === cName))) continue;
    if (o.status === "pending") pending++;
    if (!o.season || o.season === season) seasonOffers++;
  }
  return {
    pending,
    seasonOffers,
    eligible: pending < MAX_FOREIGN_PENDING_PER_BUYER && seasonOffers < MAX_FOREIGN_OFFERS_PER_BUYER_SEASON
  };
}

function getClubLeagueContext(db2: any, clubObj: any) {
  const comp = String(clubObj?.comp || "rpl").toLowerCase();
  const targetSeason = db2?.settings?.season || "2026/27";
  const compTeams = (db2?.teams || []).filter((t: any) => String(t?.comp || "").toLowerCase() === comp);
  const total = Math.max(compTeams.length || (comp === "fnl" ? 18 : 16), 2);
  let rank = Math.ceil(total / 2);
  const pct = rank / total;
  return {
    comp,
    season: targetSeason,
    rank,
    total,
    played: 0,
    pct,
    isRelegationOrBottom: comp === "fnl" || pct > 0.72,
    isBottomHalf: comp === "fnl" || rank > Math.ceil(total / 2),
    isTopContender: comp === "rpl" && rank <= 6,
    isUpperHalf: comp === "rpl" && rank <= Math.min(10, Math.ceil(total * 0.63))
  };
}

function getEligibleForeignClubPool(player2: any, clubCtx?: any, db2?: any, seasonStats?: any) {
  const ovr = Number(player2?.ovr || player2?.rating || 74);
  const age = Number(player2?.age || 25);
  const avgR = Number(seasonStats?.avgRating || 0);
  const games = Number(seasonStats?.games || 0);
  const isBenchTarget = Boolean(seasonStats?.isBenchTarget);
  const comp = clubCtx?.comp || "rpl";
  const rank = Number(clubCtx?.rank || 8);
  const isTopContender = clubCtx ? !!clubCtx.isTopContender : true;
  const isUpperHalf = clubCtx ? !!clubCtx.isUpperHalf : true;
  const isRelegationOrBottom = clubCtx ? !!clubCtx.isRelegationOrBottom : false;

  let maxReputation = 84;
  if (isBenchTarget) {
    maxReputation = (comp === "rpl" && ovr >= 75 && age <= 23) ? 78 : 75;
  } else if (comp === "fnl") {
    maxReputation = rank <= 3 && age <= 22 && ovr >= 73 ? 75 : 72;
  } else if (isRelegationOrBottom) {
    maxReputation = age <= 22 && ovr >= 75 && avgR >= 7.3 && games >= 6 ? 76 : 74;
  } else if (!isUpperHalf) {
    maxReputation = age <= 22 && ovr >= 76 && avgR >= 7.35 ? 77 : 76;
  } else if (!isTopContender) {
    maxReputation = ovr >= 80 && avgR >= 7.45 && games >= 8 ? 82 : 80;
  }

  let pool = FOREIGN_CLUBS.filter((c) => Number(c.reputation || 75) <= maxReputation);
  if (isBenchTarget) {
    const pBench = pool.filter((c) => c.reputation <= (ovr >= 74 && age <= 23 ? 77 : 74));
    if (pBench.length) pool = pBench;
  } else if (ovr >= 80 && isTopContender) {
    const pTop = pool.filter((c) => c.reputation >= 78);
    if (pTop.length) pool = pTop;
  } else if (ovr >= 75 && !isRelegationOrBottom && comp === "rpl") {
    const pMid = pool.filter((c) => c.reputation >= 74);
    if (pMid.length) pool = pMid;
  } else if (ovr < 73 || isRelegationOrBottom || comp === "fnl") {
    const pLow = pool.filter((c) => c.reputation <= Math.min(maxReputation, 75));
    if (pLow.length) pool = pLow;
  }

  if (db2) {
    const season = clubCtx?.season || db2?.settings?.season || "2026/27";
    pool = pool.filter((c) => getForeignClubQuota(db2, c, season).eligible);
  }
  return pool;
}

function normalizeWatchClubs(watch: any): any[] {
  if (!watch || typeof watch !== "object") return [];
  if (!Array.isArray(watch.watchedClubs)) {
    watch.watchedClubs = [];
    if (watch.watchedClubId) {
      const c = FOREIGN_CLUBS.find((x) => x.id === watch.watchedClubId);
      if (c) {
        watch.watchedClubs.push({
          clubId: c.id,
          name: c.name,
          country: c.country,
          flag: c.flag || "🌍",
          league: c.league,
          tier: getForeignClubTier(c),
          heat: Number(watch.heat || 35),
          watchedMatches: Number(watch.watchedMatches || 1),
          consecutivePoor: Number(watch.consecutivePoor || 0),
          watchStartedAt: watch.watchStartedAt || new Date().toISOString(),
          focus: watch.focus || "form"
        });
      }
    }
  }
  return watch.watchedClubs;
}

function syncWatchSummary(watch: any) {
  const list = normalizeWatchClubs(watch);
  list.sort((a, b) => Number(b.heat || 0) - Number(a.heat || 0) || Number(b.watchedMatches || 0) - Number(a.watchedMatches || 0));
  const top = list[0] || null;
  watch.watchedClubId = top ? top.clubId : null;
  watch.watchedMatches = top ? Number(top.watchedMatches || 1) : 0;
  watch.consecutivePoor = top ? Number(top.consecutivePoor || 0) : 0;
  watch.status = list.length ? "watching" : (watch.status === "dropped" ? "dropped" : "none");
  if (list.length) {
    watch.heat = Math.max(Number(watch.heat || 0), ...list.map((w) => Number(w.heat || 0)));
  }
}

function collectPlayerSeasonScoutProfile(db2: any, pid: string, currentFixture?: any, currentMatch?: any) {
  const targetSeason = db2?.settings?.season || "2026/27";
  const allFx = Array.isArray(db2?.fixtures) ? db2.fixtures : [];
  const pObj = (db2?.players || []).find((x: any) => x.id === pid);
  const watchMap = (db2.scoutWatchlist && typeof db2.scoutWatchlist === "object") ? db2.scoutWatchlist : (db2.scoutWatchlist = {});
  const watch = watchMap[pid] || (watchMap[pid] = { heat: 0, ratingsByFixture: {}, motmFixtures: {}, watchedClubId: null, watchedClubs: [], updatedAt: "" });
  if (!watch.ratingsByFixture || typeof watch.ratingsByFixture !== "object") watch.ratingsByFixture = {};
  if (!watch.motmFixtures || typeof watch.motmFixtures !== "object") watch.motmFixtures = {};
  normalizeWatchClubs(watch);

  const officialTeamDone = allFx
    .filter((f: any) =>
      f && f.status === "done" &&
      f.comp !== "friendly" && f.comp !== "friendly_match" &&
      (!f.season || f.season === targetSeason) &&
      pObj?.teamId && (f.home === pObj.teamId || f.away === pObj.teamId)
    );

  const officialDone = allFx
    .filter((f: any) =>
      f && f.status === "done" &&
      f.comp !== "friendly" && f.comp !== "friendly_match" &&
      (!f.season || f.season === targetSeason) &&
      f.st?.players?.[pid] &&
      ((Number(f.st.players[pid].min) || 0) > 0 || f.st.players[pid].started === true)
    )
    .sort((a: any, b: any) => String(a.date || "").localeCompare(String(b.date || "")) || String(a.time || "").localeCompare(String(b.time || "")));

  let games = 0, minutes = 0, goals = 0, assists = 0, saves = 0, cleanSheets = 0, tackles = 0, motmCount = 0;
  let benchApps = 0;
  const ratingSeq: number[] = [];

  for (const f of officialDone) {
    const ps = f.st.players[pid] || {};
    games += 1;
    minutes += Number(ps.min || 0);
    if (!ps.started && Number(ps.min || 0) <= 25) benchApps += 1;
    goals += Number(ps.g || 0);
    assists += Number(ps.a || 0);
    saves += Number(ps.sv || 0);
    cleanSheets += Number(ps.cs || 0);
    tackles += Number(ps.tk || 0);

    let rVal = Number(watch.ratingsByFixture[f.id]);
    if (!Number.isFinite(rVal) || rVal <= 0) {
      if (currentFixture && currentFixture.id === f.id && Array.isArray(currentMatch?.ratings)) {
        const foundR = currentMatch.ratings.find((x: any) => (x.playerId || x.id) === pid);
        rVal = Number(foundR?.rating || 6.5);
      } else {
        rVal = 6.5;
      }
      watch.ratingsByFixture[f.id] = rVal;
    }

    const isFixtureMotm = Boolean(
      watch.motmFixtures[f.id] ||
      f.motm?.pid === pid ||
      f.motm?.playerId === pid ||
      (currentFixture?.id === f.id && (currentMatch?.motm?.pid === pid || currentMatch?.motm?.playerId === pid))
    );
    if (isFixtureMotm) {
      watch.motmFixtures[f.id] = true;
      motmCount += 1;
    }
    ratingSeq.push(rVal);
  }

  const unusedBenchCount = Math.max(0, officialTeamDone.length - games) + benchApps;
  const avgRating = ratingSeq.length ? +(ratingSeq.reduce((s, v) => s + v, 0) / ratingSeq.length).toFixed(2) : 0;
  const last5 = ratingSeq.slice(-5);
  const last5AvgRating = last5.length ? +(last5.reduce((s, v) => s + v, 0) / last5.length).toFixed(2) : 0;
  const last5StrongCount = last5.filter((v) => v >= 7.1).length;
  const lastMatchRating = ratingSeq.length ? ratingSeq[ratingSeq.length - 1] : 0;
  const teamMatches = officialTeamDone.length;
  const isBenchTarget = teamMatches >= 2 && (games <= 2 || (minutes / Math.max(1, teamMatches * 90)) < 0.34);

  return {
    season: targetSeason,
    games, minutes, goals, assists, saves, cleanSheets, tackles, motmCount,
    avgRating, last5AvgRating, last5StrongCount, lastMatchRating, recentRatings: last5,
    benchApps, unusedBenchCount, teamMatches, isBenchTarget
  };
}

function estimateFeeMln(player: any, offerType: "transfer" | "loan", seasonStats?: any): number {
  const ovr = Number(player?.ovr || player?.rating || 74);
  const age = Number(player?.age || 25);
  const mvRaw = Number(player?.marketValue || 0);
  let baseMln = 0;
  if (Number.isFinite(mvRaw) && mvRaw > 0) {
    baseMln = mvRaw >= 1000 ? mvRaw / 1e6 : mvRaw;
  } else {
    if (ovr >= 82) baseMln = 14 + (ovr - 82) * 3.5;
    else if (ovr >= 78) baseMln = 6.5 + (ovr - 78) * 1.9;
    else if (ovr >= 74) baseMln = 2.4 + (ovr - 74) * 1.0;
    else if (ovr >= 70) baseMln = 1.0 + (ovr - 70) * 0.35;
    else baseMln = 0.4 + Math.max(0, ovr - 65) * 0.1;
  }
  const ageMult = age <= 21 ? 1.25 : age <= 24 ? 1.12 : age <= 28 ? 1.0 : age <= 31 ? 0.8 : 0.6;
  let formMult = 1.0;
  if (seasonStats?.isBenchTarget) {
    formMult = 0.78;
  } else if (seasonStats && seasonStats.games >= 3) {
    const avgR = Number(seasonStats.avgRating || 6.8);
    if (avgR >= 7.5) formMult += 0.22;
    else if (avgR >= 7.2) formMult += 0.12;
    if ((seasonStats.goals || 0) + (seasonStats.assists || 0) >= 6) formMult += 0.08;
  }
  let feeMln = baseMln * ageMult * formMult * (1.0 + Math.random() * 0.18);
  feeMln = offerType === "loan" ? Math.max(0.2, Math.min(2.5, feeMln * 0.18)) : Math.max(0.3, Math.min(38, feeMln));
  return Math.round(feeMln * 10) / 10;
}

function pickMatchingForeignClub(player: any, preferredNameOrId?: string, clubCtx?: any, db2?: any, seasonStats?: any) {
  const pool = getEligibleForeignClubPool(player, clubCtx, db2, seasonStats);
  if (preferredNameOrId) {
    const key = String(preferredNameOrId).trim().toLowerCase();
    const inPool = pool.find((c) => c.id.toLowerCase() === key || c.name.toLowerCase() === key);
    if (inPool) return inPool;
    const found = FOREIGN_CLUBS.find((c) => c.id.toLowerCase() === key || c.name.toLowerCase() === key);
    if (found && (!db2 || getForeignClubQuota(db2, found, clubCtx?.season).eligible)) return found;
  }
  if (pool.length) return pool[Math.floor(Math.random() * pool.length)];
  return FOREIGN_CLUBS[FOREIGN_CLUBS.length - 1];
}

function formatSeasonSummaryText(pObj: any, st: any): string {
  if (!st) return "";
  if (!st.games) {
    return st.teamMatches > 0 ? `на скамейке/в ротации (${st.unusedBenchCount} игр без старта)` : "игровой резерв";
  }
  const isGk = pObj?.pos === "ВР";
  const parts = [`${st.games} матчей`, `ср. оценка ${st.avgRating}`];
  if (isGk) {
    if (st.cleanSheets > 0) parts.push(`${st.cleanSheets} на ноль`);
    if (st.saves > 0) parts.push(`${st.saves} сейвов`);
  } else {
    if (st.goals > 0) parts.push(`${st.goals} гол.`);
    if (st.assists > 0) parts.push(`${st.assists} ассист.`);
    if (st.goals === 0 && st.assists === 0 && st.tackles > 0) parts.push(`${st.tackles} отборов`);
  }
  if (st.isBenchTarget) parts.push("мало игровой практики");
  else if (st.last5AvgRating >= 7.1 && st.games >= 4) parts.push(`${st.last5StrongCount} из 5 последних игр ≥ 7.1`);
  return parts.join(" · ");
}

export async function createForeignOfferWithAI(options: {
  player: any;
  club: any;
  db2?: any;
  clubCtx?: any;
  performanceReason?: string;
  triggerReason?: string;
  preferLoan?: boolean;
  seasonStats?: any;
  preferredBuyerId?: string;
  llmJSON?: (sys: string, prompt: string, opts?: any) => Promise<any>;
}): Promise<any> {
  const player = options.player;
  const club = options.club;
  const db2 = options.db2;
  const clubCtx = options.clubCtx || (db2 && club ? getClubLeagueContext(db2, club) : null);
  const ovr = Number(player?.ovr || player?.rating || 74);
  const age = Number(player?.age || 25);
  const st = options.seasonStats;
  const isBench = Boolean(st?.isBenchTarget);
  let offerType: "transfer" | "loan" = options.preferLoan
    ? "loan"
    : isBench
      ? (Math.random() < 0.7 ? "loan" : "transfer")
      : ((age <= 22 && ovr < 77 && Math.random() < 0.4) || Math.random() < 0.25 ? "loan" : "transfer");

  let buyer = pickMatchingForeignClub(player, options.preferredBuyerId, clubCtx, db2, st);
  let feeAmount = estimateFeeMln(player, offerType, st);
  let wage = `€${Math.round(Math.max(8, Math.min(140, feeAmount * 7.5 + (ovr - 65) * 1.3)))} тыс./нед.`;
  const seasonStr = formatSeasonSummaryText(player, st);
  let triggerReason = options.triggerReason || (isBench
    ? `Поиск усиления со скамейки и игровой практики (${seasonStr || `OVR ${ovr}`})`
    : (seasonStr ? `Игровая форма по сезону: ${seasonStr}` : options.performanceReason)) || `Оценка скаутов и потенциал игрока (${ovr}) в «${club?.name || "клубе"}»`;
  let scoutReport = options.performanceReason || (isBench
    ? `Скауты «${buyer.name}» обратили внимание на резервиста ${player?.name || "игрока"} (${player?.pos || "ЦП"}, OVR ${ovr}): футболист редко играет в основе «${club?.name || "клуба"}» и готов усилить глубину состава (${offerType === "loan" ? "предложена аренда" : "бюджетный выкуп"}).`
    : `Международные скауты клуба «${buyer.name}» оценили игру ${player?.name || "футболиста"} (${seasonStr || `OVR ${ovr}`}) и направили официальное предложение (${offerType === "loan" ? "аренда" : "трансфер"}).`);

  if (typeof options.llmJSON === "function") {
    try {
      const eligiblePool = getEligibleForeignClubPool(player, clubCtx, db2, st);
      const allowedList = (eligiblePool.length ? eligiblePool : [buyer]).slice(0, 14);
      const clubList = allowedList.map((c) => `${c.name} (${c.country}, ${c.league}, рейтинг ${c.reputation})`).join("; ");
      const sys = "Ты — международный футбольный скаут. Сгенерируй реалистичное зарубежное предложение (выкуп или аренда) строго из переданного списка клубов. Отвечай строго в JSON.";
      const prompt = `Игрок: ${player?.name || "Игрок"}, позиция: ${player?.pos || "ЦП"}, возраст: ${age}, OVR: ${ovr}, клуб: «${club?.name || "Клуб"}». Статус: ${isBench ? "игрок скамейки/ротации (мало минут)" : "основная обойма"}.\nСезон: ${seasonStr || "рейтинг"}.\nПовод: ${triggerReason}.\nТип: ${offerType === "loan" ? "аренда (loan)" : "полноценный трансфер (transfer)"}, базовый расчёт: €${feeAmount}M.\nКлубы (выбери ТОЛЬКО из списка): ${clubList}.\nВерни JSON: {"buyerClub":"","type":"transfer|loan","feeAmount":0,"wage":"","triggerReason":"","scoutReport":""}`;
      const aiRes = await options.llmJSON(sys, prompt, { task: "foreign-scout-offer", temp: 0.45, max: 600 });
      if (aiRes && typeof aiRes === "object") {
        if (aiRes.buyerClub) {
          const matched = allowedList.find((c) => c.name.toLowerCase() === String(aiRes.buyerClub).trim().toLowerCase());
          if (matched) buyer = matched;
        }
        if (aiRes.type === "loan" || aiRes.type === "transfer") offerType = aiRes.type;
        const aiFee = Number(aiRes.feeAmount);
        if (Number.isFinite(aiFee) && aiFee >= 0.2 && aiFee <= 50) feeAmount = Math.round(aiFee * 10) / 10;
        if (aiRes.wage) wage = String(aiRes.wage).slice(0, 40);
        if (aiRes.triggerReason) triggerReason = String(aiRes.triggerReason).slice(0, 180);
        if (aiRes.scoutReport) scoutReport = String(aiRes.scoutReport).slice(0, 350);
      }
    } catch {
    }
  }

  const feeNum = Math.round(feeAmount * 1e6);
  const fee = feeAmount < 1 ? `€${Math.round(feeAmount * 1000)}K` : `€${feeAmount.toFixed(1)}M`;
  return {
    id: `fo_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    season: clubCtx?.season || db2?.settings?.season || "2026/27",
    pid: player?.id,
    playerId: player?.id,
    playerName: player?.name || "Игрок",
    pos: player?.pos || "ЦП",
    clubId: club?.id,
    clubName: club?.name || "",
    buyerClubId: buyer.id,
    buyerClub: buyer.name,
    buyerCountry: buyer.country,
    buyerLeague: buyer.league,
    buyerFlag: buyer.flag || "🌍",
    buyerLogo: "",
    type: offerType,
    fee,
    feeAmount,
    feeNum,
    wage,
    triggerReason,
    scoutReport,
    seasonStats: st || null,
    status: "pending",
    date: new Date().toISOString()
  };
}

export async function checkForeignInterestAfterMatch(db: any, match: any, fixture: any): Promise<any[]> {
  if (!db || !match || !fixture || fixture.comp === "friendly" || fixture.comp === "friendly_match") return [];
  if (!Array.isArray(db.foreignOffers)) db.foreignOffers = [];
  if (!Array.isArray(db.transfers)) db.transfers = [];
  if (!db.scoutWatchlist || typeof db.scoutWatchlist !== "object") db.scoutWatchlist = {};
  return [];
}

export function respondToForeignOffer(
  db: any,
  offerId: string,
  action: "accept" | "reject" | string,
  tid?: string,
  comment?: string
): any {
  if (!db || !Array.isArray(db.foreignOffers)) throw new Error("База зарубежных предложений недоступна");
  const offer = db.foreignOffers.find((o: any) => o.id === offerId);
  if (!offer) throw new Error("Зарубежное предложение не найдено");
  if (tid && offer.clubId && offer.clubId !== tid) throw new Error("Предложение адресовано другому клубу");
  if (offer.status !== "pending") throw new Error("По этому предложению уже принято решение");
  if (action !== "accept" && action !== "reject") throw new Error("Неизвестное действие по зарубежному предложению");

  const nowIso = new Date().toISOString();
  if (!Array.isArray(db.transfers)) db.transfers = [];
  const linkedTransfer = db.transfers.find((t: any) => t.foreignOfferId === offer.id || t.id === "tr_" + offer.id);

  if (action === "reject") {
    offer.status = "rejected";
    offer.respondedAt = nowIso;
    if (comment) offer.comment = String(comment).slice(0, 300);
    if (linkedTransfer) {
      linkedTransfer.status = "rejected";
      linkedTransfer.clubApproval = "rejected";
      linkedTransfer.rejectedAt = nowIso;
    }
    return { ok: true, status: "rejected", offer };
  }

  const pid = offer.pid || offer.playerId;
  const p = (db.players || []).find((x: any) => x.id === pid);
  const seller = (db.teams || []).find((x: any) => x.id === offer.clubId);
  if (!p) throw new Error("Игрок не найден в базе");
  if (!seller) throw new Error("Клуб-продавец не найден");
  if (p.teamId !== seller.id) throw new Error(`Игрок ${p.name} уже не числится в составе «${seller.name}»`);

  const feeAmt = offer.feeAmount !== undefined && offer.feeAmount !== null && Number.isFinite(Number(offer.feeAmount))
    ? Number(offer.feeAmount)
    : offer.feeNum && Number(offer.feeNum) >= 1000 ? Number(offer.feeNum) / 1e6 : 0;
  const feeEuros = Math.round(Math.max(0, feeAmt) * 1e6);

  if (db.squads && Array.isArray(db.squads[seller.id])) {
    db.squads[seller.id] = db.squads[seller.id].filter((id: string) => id !== p.id);
  }
  if (offer.type === "loan") {
    p.loanFromId = seller.id;
    p.loanFromName = seller.name;
    p.loanIsForeign = true;
    p.teamId = null;
    p.abroadClub = offer.buyerClub;
    p.abroadCountry = offer.buyerCountry;
  } else {
    p.teamId = null;
    p.formerClub = seller.name;
    p.abroadClub = offer.buyerClub;
    p.abroadCountry = offer.buyerCountry;
    delete p.loanFromId;
    delete p.loanFromName;
    delete p.loanIsForeign;
  }

  if (!Array.isArray(db.budgetHistory)) db.budgetHistory = [];
  if (feeEuros > 0) {
    const prevBudget = seller.budget || 0;
    seller.budget = prevBudget + feeEuros;
    db.budgetHistory.push({
      id: `bh_${Date.now()}`,
      teamId: seller.id,
      teamName: seller.name,
      amount: feeEuros,
      prevBudget,
      newBudget: seller.budget,
      type: offer.type === "loan" ? "foreign_loan" : "foreign_sale",
      typeLabel: offer.type === "loan" ? "Аренда за рубеж" : "Трансфер за рубеж",
      description: `${offer.type === "loan" ? "Аренда" : "Продажа"} за рубеж: ${p.name} в «${offer.buyerClub}» (${offer.buyerCountry}) (+€${feeEuros.toLocaleString("ru-RU")})`,
      date: nowIso,
      byAdmin: false
    });
  }

  offer.status = "accepted";
  offer.respondedAt = nowIso;
  offer.feeAmount = feeAmt;
  if (linkedTransfer) {
    linkedTransfer.status = "approved";
    linkedTransfer.clubApproval = "approved";
    linkedTransfer.adminApproval = "approved";
    linkedTransfer.executedAt = nowIso;
    linkedTransfer.fee = offer.fee;
    linkedTransfer.feeAmount = feeAmt;
  } else {
    db.transfers.push({
      id: "tr_" + offer.id,
      pid: p.id,
      playerName: p.name,
      pos: p.pos || offer.pos || "ЦП",
      from: seller.id,
      fromName: seller.name,
      to: null,
      toName: offer.buyerClub,
      isForeign: true,
      buyerCountry: offer.buyerCountry,
      buyerFlag: offer.buyerFlag || "🌍",
      type: offer.type || "transfer",
      fee: offer.fee,
      feeAmount: feeAmt,
      date: nowIso.slice(0, 10),
      status: "approved",
      clubApproval: "approved",
      adminApproval: "approved",
      executedAt: nowIso,
      note: offer.scoutReport,
      foreignOfferId: offer.id
    });
  }

  return { ok: true, status: "accepted", offer, netIncome: feeEuros, newBudget: seller.budget };
}
