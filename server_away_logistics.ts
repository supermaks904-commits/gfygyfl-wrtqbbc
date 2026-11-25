import type { Express, Request, Response } from "express";

export interface AwayLogisticsServerContext {
  getDb: () => any;
  save: () => void;
  S: () => string;
  team: (id: string) => any;
  tn: (id: string) => string;
  teamLogo: (id: string) => string;
  fx: (id: string) => any;
  pubFx: (f: any) => any;
  isIntraSquad: (f: any) => boolean;
  isFinalMatch: (f: any) => boolean;
  realAt: (f: any) => Date;
  needClub: any;
  fail: (res: Response, msg: string, code?: number) => void;
  uid: () => string;
  compName: (id: string) => string;
}

export type TransportModeId =
  | "local_bus"
  | "local_camp"
  | "bus"
  | "train_coupe"
  | "train_sv"
  | "flight_regular"
  | "flight_comfort"
  | "flight_charter";

export type DelegationTierId = "base" | "extended" | "fan_support";
export type HotelTierId = "economy_3" | "business_4" | "resort_5";
export type ArrivalWindowId = "matchday" | "minus_1" | "minus_2";
export type CateringTierId = "hotel_buffet" | "sport_menu" | "club_chef";
export type MedicalTierId = "standard_kit" | "physio_mobile";
export type LocalTransferId = "rented_bus" | "escort";
export type TrainingPitchId = "none" | "rent_pitch";
export type InsuranceTierId = "none" | "backup_plan";

export interface KitChecklist {
  reserveKit: boolean;
  weatherGear: boolean;
  studsCheck: boolean;
  docsVerified: boolean;
}

export interface AwayLogisticsSelection {
  transport: TransportModeId;
  delegation: DelegationTierId;
  hotel: HotelTierId;
  arrival: ArrivalWindowId;
  catering: CateringTierId;
  medical: MedicalTierId;
  localTransfer: LocalTransferId;
  trainingPitch: TrainingPitchId;
  insurance: InsuranceTierId;
  kitPrep: KitChecklist;
}

export interface TravelIncident {
  id: string;
  title: string;
  description: string;
  energyPenalty: number;
  powerPenalty: number;
  fixCost: number;
  fixLabel: string;
  resolved: boolean;
  resolvedAt?: string;
}

export interface AwayLogisticsRecord {
  key: string;
  fixtureId: string;
  teamId: string;
  season: string;
  originCity: string;
  destCity: string;
  destStadium: string;
  distKm: number;
  timezoneShiftH: number;
  selection: AwayLogisticsSelection;
  totalCost: number;
  paidAmount: number;
  readinessScore: number;
  energyDelta: number;
  powerMod: number;
  homeEdgeMitigation: number;
  travelHours: number;
  riskPercent: number;
  incident: TravelIncident | null;
  summaryLine: string;
  promptSummary: string;
  updatedAt: string;
  confirmedAt: string;
}

const CITY_COORDS: Record<string, { lat: number; lon: number; tz: number; airport: boolean; rail: boolean; droneZone?: boolean; hotelPrefix: string }> = {
  "Москва": { lat: 55.75, lon: 37.62, tz: 3, airport: true, rail: true, droneZone: true, hotelPrefix: "Столичный" },
  "Химки": { lat: 55.89, lon: 37.43, tz: 3, airport: true, rail: true, droneZone: true, hotelPrefix: "Северные ворота" },
  "Санкт-Петербург": { lat: 59.95, lon: 30.32, tz: 3, airport: true, rail: true, droneZone: true, hotelPrefix: "Невский" },
  "Краснодар": { lat: 45.04, lon: 38.97, tz: 3, airport: false, rail: true, droneZone: true, hotelPrefix: "Кубанский" },
  "Сочи": { lat: 43.41, lon: 39.96, tz: 3, airport: true, rail: true, droneZone: true, hotelPrefix: "Приморский" },
  "Ростов-на-Дону": { lat: 47.22, lon: 39.72, tz: 3, airport: false, rail: true, droneZone: true, hotelPrefix: "Донской" },
  "Казань": { lat: 55.79, lon: 49.12, tz: 3, airport: true, rail: true, droneZone: true, hotelPrefix: "Кремлёвский" },
  "Нижний Новгород": { lat: 56.33, lon: 44.0, tz: 3, airport: true, rail: true, droneZone: true, hotelPrefix: "Волжский" },
  "Самара": { lat: 53.2, lon: 50.15, tz: 4, airport: true, rail: true, droneZone: true, hotelPrefix: "Жигулёвский" },
  "Тольятти": { lat: 53.5, lon: 49.42, tz: 4, airport: true, rail: true, droneZone: true, hotelPrefix: "Автоград" },
  "Оренбург": { lat: 51.77, lon: 55.1, tz: 5, airport: true, rail: true, droneZone: true, hotelPrefix: "Степной" },
  "Грозный": { lat: 43.32, lon: 45.69, tz: 3, airport: true, rail: true, droneZone: true, hotelPrefix: "Терек Плаза" },
  "Махачкала": { lat: 42.98, lon: 47.5, tz: 3, airport: true, rail: true, droneZone: true, hotelPrefix: "Каспийский" },
  "Калининград": { lat: 54.71, lon: 20.51, tz: 2, airport: true, rail: false, droneZone: false, hotelPrefix: "Балтийский" },
  "Воронеж": { lat: 51.67, lon: 39.18, tz: 3, airport: false, rail: true, droneZone: true, hotelPrefix: "Центральный" },
  "Тула": { lat: 54.19, lon: 37.61, tz: 3, airport: false, rail: true, droneZone: true, hotelPrefix: "Оружейный" },
  "Екатеринбург": { lat: 56.84, lon: 60.6, tz: 5, airport: true, rail: true, droneZone: false, hotelPrefix: "Уральский" },
  "Уфа": { lat: 54.73, lon: 55.97, tz: 5, airport: true, rail: true, droneZone: true, hotelPrefix: "Агидель" },
  "Челябинск": { lat: 55.16, lon: 61.4, tz: 5, airport: true, rail: true, droneZone: false, hotelPrefix: "Южноуральский" },
  "Красноярск": { lat: 56.01, lon: 92.87, tz: 7, airport: true, rail: true, droneZone: false, hotelPrefix: "Енисейский" },
  "Хабаровск": { lat: 48.48, lon: 135.07, tz: 10, airport: true, rail: true, droneZone: false, hotelPrefix: "Амурский" },
  "Владивосток": { lat: 43.12, lon: 131.89, tz: 10, airport: true, rail: true, droneZone: false, hotelPrefix: "Тихоокеанский" },
  "Новосибирск": { lat: 55.03, lon: 82.92, tz: 7, airport: true, rail: true, droneZone: false, hotelPrefix: "Обской" },
  "Волгоград": { lat: 48.7, lon: 44.51, tz: 3, airport: true, rail: true, droneZone: true, hotelPrefix: "Сталинградский" },
  "Ярославль": { lat: 57.63, lon: 39.87, tz: 3, airport: true, rail: true, droneZone: true, hotelPrefix: "Золотое Кольцо" },
  "Ульяновск": { lat: 54.32, lon: 48.39, tz: 4, airport: true, rail: true, droneZone: true, hotelPrefix: "Симбирский" },
  "Саратов": { lat: 51.53, lon: 46.03, tz: 4, airport: true, rail: true, droneZone: true, hotelPrefix: "Саратовский" },
  "Тюмень": { lat: 57.15, lon: 65.53, tz: 5, airport: true, rail: true, droneZone: false, hotelPrefix: "Западно-Сибирский" },
  "Пермь": { lat: 58.01, lon: 56.25, tz: 5, airport: true, rail: true, droneZone: false, hotelPrefix: "Камский" },
  "Набережные Челны": { lat: 55.74, lon: 52.4, tz: 3, airport: true, rail: true, droneZone: true, hotelPrefix: "Камский" },
  "Нижнекамск": { lat: 55.63, lon: 51.82, tz: 3, airport: true, rail: true, droneZone: true, hotelPrefix: "Нефтехим" },
  "Песчанокопское": { lat: 46.2, lon: 41.07, tz: 3, airport: false, rail: true, droneZone: true, hotelPrefix: "Степная Чайка" },
  "Новороссийск": { lat: 44.72, lon: 37.77, tz: 3, airport: false, rail: true, droneZone: true, hotelPrefix: "Черноморский" },
  "Владикавказ": { lat: 43.02, lon: 44.68, tz: 3, airport: true, rail: true, droneZone: true, hotelPrefix: "Аланский" },
  "Томск": { lat: 56.5, lon: 84.97, tz: 7, airport: true, rail: true, droneZone: false, hotelPrefix: "Сибирский" },
  "Омск": { lat: 54.99, lon: 73.37, tz: 6, airport: true, rail: true, droneZone: false, hotelPrefix: "Иртыш" },
  "Белгород": { lat: 50.6, lon: 36.59, tz: 3, airport: false, rail: true, droneZone: true, hotelPrefix: "Белогорье" },
  "Курск": { lat: 51.73, lon: 36.19, tz: 3, airport: false, rail: true, droneZone: true, hotelPrefix: "Соловьиный" },
  "Брянск": { lat: 53.24, lon: 34.37, tz: 3, airport: false, rail: true, droneZone: true, hotelPrefix: "Деснянский" },
  "Иваново": { lat: 57.0, lon: 40.97, tz: 3, airport: true, rail: true, droneZone: true, hotelPrefix: "Текстильный" },
  "Кострома": { lat: 57.77, lon: 40.93, tz: 3, airport: false, rail: true, droneZone: false, hotelPrefix: "Волжский" },
  "Муром": { lat: 55.57, lon: 42.04, tz: 3, airport: false, rail: true, droneZone: true, hotelPrefix: "Окский" },
  "Киров": { lat: 58.6, lon: 49.66, tz: 3, airport: true, rail: true, droneZone: false, hotelPrefix: "Вятский" },
  "Ижевск": { lat: 56.85, lon: 53.2, tz: 4, airport: true, rail: true, droneZone: true, hotelPrefix: "Удмуртский" },
  "Астрахань": { lat: 46.35, lon: 48.04, tz: 4, airport: true, rail: true, droneZone: true, hotelPrefix: "Волжский" },
  "Нальчик": { lat: 43.48, lon: 43.61, tz: 3, airport: true, rail: true, droneZone: true, hotelPrefix: "Эльбрус" },
  "Ставрополь": { lat: 45.04, lon: 41.97, tz: 3, airport: true, rail: true, droneZone: true, hotelPrefix: "Кавказский" },
  "Липецк": { lat: 52.61, lon: 39.59, tz: 3, airport: false, rail: true, droneZone: true, hotelPrefix: "Липецкий" },
  "Рязань": { lat: 54.62, lon: 39.74, tz: 3, airport: false, rail: true, droneZone: true, hotelPrefix: "Есенинский" },
  "Калуга": { lat: 54.51, lon: 36.26, tz: 3, airport: true, rail: true, droneZone: true, hotelPrefix: "Космический" },
  "Тверь": { lat: 56.86, lon: 35.91, tz: 3, airport: false, rail: true, droneZone: true, hotelPrefix: "Тверской" },
  "Вологда": { lat: 59.22, lon: 39.89, tz: 3, airport: false, rail: true, droneZone: false, hotelPrefix: "Северный" },
  "Череповец": { lat: 59.13, lon: 37.91, tz: 3, airport: true, rail: true, droneZone: false, hotelPrefix: "Шексна" },
  "Пенза": { lat: 53.2, lon: 45.0, tz: 3, airport: true, rail: true, droneZone: true, hotelPrefix: "Сура" },
  "Тамбов": { lat: 52.72, lon: 41.45, tz: 3, airport: false, rail: true, droneZone: true, hotelPrefix: "Цнинский" },
  "Смоленск": { lat: 54.78, lon: 32.04, tz: 3, airport: false, rail: true, droneZone: true, hotelPrefix: "Днепровский" },
  "Орёл": { lat: 52.97, lon: 36.07, tz: 3, airport: false, rail: true, droneZone: true, hotelPrefix: "Тургеневский" },
  "Владимир": { lat: 56.13, lon: 40.41, tz: 3, airport: false, rail: true, droneZone: true, hotelPrefix: "Княжеский" },
};

function normalizeCityName(raw?: string): string {
  const s = String(raw || "").trim();
  if (!s) return "";
  if (/^г\.\s*/i.test(s)) return s.replace(/^г\.\s*/i, "").trim();
  return s;
}

function calcHaversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.min(1, Math.sqrt(a))));
}

function resolveCityCoords(
  cityRaw: string,
  fallbackTeam?: any
): { lat: number; lon: number; tz: number; airport: boolean; rail: boolean; droneZone?: boolean; hotelPrefix: string } {
  const city = normalizeCityName(cityRaw);
  const exact = CITY_COORDS[city];
  if (exact) return exact;
  const partialKey = Object.keys(CITY_COORDS).find((k) => city.toLowerCase().includes(k.toLowerCase()));
  if (partialKey) return CITY_COORDS[partialKey];
  if (Number.isFinite(Number(fallbackTeam?.lat)) && Number.isFinite(Number(fallbackTeam?.lon))) {
    const lon = Number(fallbackTeam.lon);
    const estTz = lon < 26 ? 2 : lon < 45 ? 3 : lon < 53 ? 4 : lon < 68 ? 5 : lon < 82 ? 6 : lon < 98 ? 7 : 9;
    return {
      lat: Number(fallbackTeam.lat),
      lon,
      tz: estTz,
      airport: true,
      rail: city.toLowerCase() !== "калининград",
      droneZone: lon < 56,
      hotelPrefix: city ? `Гранд ${city}` : "Городской",
    };
  }
  return { lat: 55.75, lon: 37.62, tz: 3, airport: true, rail: true, droneZone: true, hotelPrefix: city || "Центральный" };
}

export function isAwayOrTravelFixture(ctx: AwayLogisticsServerContext, f: any, tid: string): {
  needsTravel: boolean;
  role: "away" | "neutral" | "home";
  originCity: string;
  destCity: string;
  destStadium: string;
  distKm: number;
  timezoneShiftH: number;
  destAirport: boolean;
  destRail: boolean;
  originRail: boolean;
  droneZone: boolean;
  hotelPrefix: string;
} {
  const myTeam = ctx.team(tid);
  const homeTeam = ctx.team(f?.home);
  const isNeutral = !!(f?.neutralField || ctx.isFinalMatch(f));
  const originCity = normalizeCityName(myTeam?.city) || "Москва";

  let destCity = "";
  let destStadium = "";
  let destTeam = homeTeam;

  if (isNeutral) {
    destCity = normalizeCityName(f?.city);
    if (!destCity && f?.stadium) {
      const m = String(f.stadium).match(/г\.\s*([^,)]+)/i);
      if (m) destCity = normalizeCityName(m[1]);
    }
    if (!destCity) destCity = normalizeCityName(homeTeam?.city) || "Москва";
    destStadium = String(f?.stadium || homeTeam?.stadium || `Стадион (${destCity})`);
    destTeam = null;
  } else {
    destCity = normalizeCityName(f?.city) || normalizeCityName(homeTeam?.city) || "Москва";
    destStadium = String(f?.stadium || homeTeam?.stadium || `Стадион (${destCity})`);
  }

  const originMeta = resolveCityCoords(originCity, myTeam);
  const destMeta = resolveCityCoords(destCity, destTeam);
  const distKm = Math.max(15, calcHaversineKm(originMeta.lat, originMeta.lon, destMeta.lat, destMeta.lon));
  const timezoneShiftH = Math.abs(destMeta.tz - originMeta.tz);
  const droneZone = !!(destMeta.droneZone || originMeta.droneZone);

  if (ctx.isIntraSquad(f)) {
    return {
      needsTravel: false,
      role: "home",
      originCity,
      destCity,
      destStadium,
      distKm: 0,
      timezoneShiftH: 0,
      destAirport: true,
      destRail: true,
      originRail: true,
      droneZone: false,
      hotelPrefix: destMeta.hotelPrefix,
    };
  }

  if (f?.away === tid) {
    return {
      needsTravel: true,
      role: isNeutral ? "neutral" : "away",
      originCity,
      destCity,
      destStadium,
      distKm,
      timezoneShiftH,
      destAirport: destMeta.airport,
      destRail: destMeta.rail,
      originRail: originMeta.rail,
      droneZone,
      hotelPrefix: destMeta.hotelPrefix,
    };
  }

  if (f?.home === tid && isNeutral && destCity.toLowerCase() !== originCity.toLowerCase() && distKm >= 60) {
    return {
      needsTravel: true,
      role: "neutral",
      originCity,
      destCity,
      destStadium,
      distKm,
      timezoneShiftH,
      destAirport: destMeta.airport,
      destRail: destMeta.rail,
      originRail: originMeta.rail,
      droneZone,
      hotelPrefix: destMeta.hotelPrefix,
    };
  }

  return {
    needsTravel: false,
    role: "home",
    originCity,
    destCity,
    destStadium,
    distKm: 0,
    timezoneShiftH: 0,
    destAirport: true,
    destRail: true,
    originRail: true,
    droneZone: false,
    hotelPrefix: destMeta.hotelPrefix,
  };
}

export interface LogisticsOptionCatalog {
  fixtureId: string;
  originCity: string;
  destCity: string;
  destStadium: string;
  distKm: number;
  timezoneShiftH: number;
  isSameCity: boolean;
  isEnclave: boolean;
  destAirport: boolean;
  canUseRail: boolean;
  skyStatus: {
    level: "clear" | "caution" | "high";
    headline: string;
    detail: string;
    airRiskBonus: number;
    droneRisk: boolean;
    weatherRisk: boolean;
  };
  scaleFactor: number;
  transportOptions: {
    id: TransportModeId;
    label: string;
    subtitle: string;
    cost: number;
    travelHours: number;
    energyImpact: number;
    powerImpact: number;
    riskPercent: number;
    available: boolean;
    disabledReason?: string;
    recommended?: boolean;
    railSafe?: boolean;
    airAffected?: boolean;
  }[];
  delegationOptions: {
    id: DelegationTierId;
    label: string;
    subtitle: string;
    cost: number;
    powerImpact: number;
    homeEdgeMitigation: number;
  }[];
  hotelOptions: {
    id: HotelTierId;
    label: string;
    subtitle: string;
    baseCost: number;
    energyImpact: number;
    powerImpact: number;
    riskPercent: number;
  }[];
  arrivalOptions: {
    id: ArrivalWindowId;
    label: string;
    subtitle: string;
    hotelMultiplier: number;
    energyImpact: number;
    powerImpact: number;
    recommended?: boolean;
  }[];
  cateringOptions: {
    id: CateringTierId;
    label: string;
    subtitle: string;
    cost: number;
    energyImpact: number;
    riskPercent: number;
  }[];
  medicalOptions: {
    id: MedicalTierId;
    label: string;
    subtitle: string;
    cost: number;
    energyImpact: number;
  }[];
  localTransferOptions: {
    id: LocalTransferId;
    label: string;
    subtitle: string;
    cost: number;
    riskPercent: number;
    powerImpact: number;
  }[];
  trainingPitchOptions: {
    id: TrainingPitchId;
    label: string;
    subtitle: string;
    cost: number;
    powerImpact: number;
  }[];
  insuranceOptions: {
    id: InsuranceTierId;
    label: string;
    subtitle: string;
    cost: number;
    riskReduction: number;
  }[];
}

function roundMoney(n: number): number {
  return Math.max(0, Math.round(n / 100) * 100);
}

function stableHash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function computeSkyStatus(f: any, geo: ReturnType<typeof isAwayOrTravelFixture>, isSameCity: boolean): LogisticsOptionCatalog["skyStatus"] {
  if (isSameCity) {
    return {
      level: "clear",
      headline: "Выезд в пределах домашнего региона",
      detail: "Авиаперелёт не требуется — команда добирается наземным транспортом без зависимости от аэропортов.",
      airRiskBonus: 0,
      droneRisk: false,
      weatherRisk: false,
    };
  }

  const wd = f?.weatherDetails || {};
  const condStr = `${wd.condition || ""} ${f?.weather || ""} ${f?.weatherShort || ""}`.toLowerCase();
  const wind = Number(wd.wind || 0);
  const temp = Number(wd.temp ?? 12);
  const badWeather =
    /гроз|ливен|метел|пург|буран|шторм|туман|гололед|мокрый снег/.test(condStr) || wind >= 10 || temp <= -17;

  const h = stableHash(`${f?.id || ""}:${geo.originCity}:${geo.destCity}`);
  const droneRoll = h % 100;
  // Realistic corridor risk: drone alert / план «Ковёр» happens more often along active western/southern/central air corridors
  const droneRisk = geo.droneZone ? droneRoll < 42 : droneRoll < 12;

  if (!geo.destAirport) {
    const extra = badWeather || droneRisk ? 18 : 10;
    return {
      level: "high",
      headline: `Аэропорт г. ${geo.destCity} закрыт — перелёт только до соседнего хаба`,
      detail: droneRisk
        ? `Прямых рейсов нет, а в соседних хабах возможны ограничения «Ковёр» (беспилотная опасность)${badWeather ? " и сложная погода" : ""}. Поездом можно доехать напрямую без авиа-отмен.`
        : `Прилёт в ближайший открытый аэропорт + 2–3 часа автобусом${badWeather ? " в сложную погоду" : ""}. Железная дорога работает без ограничений.`,
      airRiskBonus: extra,
      droneRisk,
      weatherRisk: badWeather,
    };
  }

  if (droneRisk && badWeather) {
    return {
      level: "high",
      headline: "Высокий риск отмены вылета (план «Ковёр» и непогода)",
      detail: `На маршруте ${geo.originCity} — ${geo.destCity} возможны временные закрытия неба (беспилотная опасность) и задержки по метеоусловиям. Поезд идёт строго по расписанию (0% риска от закрытия неба).`,
      airRiskBonus: 22,
      droneRisk: true,
      weatherRisk: true,
    };
  }

  if (droneRisk) {
    return {
      level: "caution",
      headline: "Возможен план «Ковёр» (беспилотная опасность)",
      detail: `В аэропортах вылета или прибытия (${geo.originCity} / ${geo.destCity}) периодически вводят ограничения воздушного пространства — возможен перенос рейса или уход на запасной аэродром. На ж/д пути ограничений нет.`,
      airRiskBonus: 14,
      droneRisk: true,
      weatherRisk: false,
    };
  }

  if (badWeather) {
    return {
      level: "caution",
      headline: `Сложные метеоусловия для авиации (${wd.condition || f?.weatherShort || "ветер/осадки"})`,
      detail: `Сильный ветер или осадки могут задержать регулярные и чартерные рейсы. Поезда идут в обычном режиме по любым доступным ж/д путям.`,
      airRiskBonus: 11,
      droneRisk: false,
      weatherRisk: true,
    };
  }

  return {
    level: "clear",
    headline: "Небо открыто — штатная полетная и ж/д обстановка",
    detail: "Регулярные рейсы, чартеры и поезда курсируют по расписанию без ограничений.",
    airRiskBonus: 0,
    droneRisk: false,
    weatherRisk: false,
  };
}

export function buildLogisticsCatalog(ctx: AwayLogisticsServerContext, f: any, tid: string): LogisticsOptionCatalog {
  const geo = isAwayOrTravelFixture(ctx, f, tid);
  const myTeam = ctx.team(tid);
  const comp = String(myTeam?.comp || f?.comp || "rpl");
  // Realistic pricing in € (~100 ₽ per €1) scaled by league budget
  const scaleFactor = comp === "rpl" ? 1 : comp === "fnl" ? 0.55 : 0.35;
  const dist = geo.distKm;
  const isSameCity = dist < 70;
  const isEnclave = geo.destCity === "Калининград" || geo.originCity === "Калининград";
  const canUseRail = !isEnclave && geo.destRail && geo.originRail;
  const hp = geo.hotelPrefix || geo.destCity;
  const skyStatus = computeSkyStatus(f, geo, isSameCity);

  const busHours = +(Math.max(1.2, dist / 68)).toFixed(1);
  // Real Russian train speed: ~65 km/h average for long distance, faster express on short routes
  const trainCoupeHours = +(Math.max(2.0, dist / 65)).toFixed(1);
  const trainSvHours = +(Math.max(1.8, dist <= 1200 ? dist / 84 : dist / 74)).toFixed(1);
  const flightHours = +(Math.max(1.3, dist / 740 + 2.0)).toFixed(1);
  const charterHours = +(Math.max(1.1, dist / 760 + 0.9)).toFixed(1);

  const busFatiguePenalty = dist < 150 ? -1 : dist < 400 ? -3 : dist < 700 ? -6 : -9;
  const trainCoupeEnergy = dist <= 950 ? 0 : dist <= 2000 ? -3 : -7;
  const trainCoupePower = dist <= 950 ? 0.02 : dist <= 2000 ? -0.05 : -0.22;
  const trainSvEnergy = dist <= 950 ? 2 : dist <= 2000 ? 0 : -4;
  const trainSvPower = dist <= 950 ? 0.09 : dist <= 2000 ? 0.03 : -0.1;

  const regularFlightNotice = !geo.destAirport
    ? `Аэропорт г. ${geo.destCity} закрыт — борт летит до соседнего хаба + автобус до арены (+2.5 ч).`
    : skyStatus.droneRisk || skyStatus.weatherRisk
      ? "Общая регистрация; при плане «Ковёр» или непогоде возможна отмена или перенос рейса."
      : "Регулярный перелёт (эконом-блок ~30 мест), стандартное ожидание в терминале.";

  // Realistic costs (~100 ₽ = €1) for ~28–34 person club delegation:
  // Makhachkala (1590 km): Regular flight ~€7,300 (730k ₽), Business ~€13,800 (1.38M ₽), Charter ~€43,900 (4.39M ₽), Train Coupe ~€4,300 (430k ₽)
  const trainCoupeCost = roundMoney((1800 + Math.min(dist, 2000) * 1.6 + Math.max(0, dist - 2000) * 0.7) * scaleFactor);
  const trainSvCost = roundMoney((3400 + Math.min(dist, 2000) * 2.5 + Math.max(0, dist - 2000) * 1.1) * scaleFactor);
  const flightRegularCost = roundMoney((2800 + dist * 2.8) * scaleFactor);
  const flightComfortCost = roundMoney((6200 + dist * 4.8) * scaleFactor);
  const flightCharterCost = roundMoney((24000 + dist * 12.5) * scaleFactor);

  const railDisabledReason = isEnclave
    ? "Калининград отделён госграницей — сквозной клубный ж/д выезд без транзитных виз невозможен"
    : "В городе отправления или прибытия нет прямого ж/д сообщения";

  const transportOptions: LogisticsOptionCatalog["transportOptions"] = isSameCity
    ? [
        {
          id: "local_bus",
          label: "Клубный автобус с базы",
          subtitle: `Выезд по городу (${dist} км) за 4 часа до стартового свистка`,
          cost: roundMoney(800 * scaleFactor),
          travelHours: 1.0,
          energyImpact: 0,
          powerImpact: 0,
          riskPercent: 5,
          available: true,
          recommended: true,
        },
        {
          id: "local_camp",
          label: "Заезд в загородный отель-базу с кортежем",
          subtitle: "Изоляция от городского шума и спокойный предматчевый режим",
          cost: roundMoney(2400 * scaleFactor),
          travelHours: 0.8,
          energyImpact: 2,
          powerImpact: 0.08,
          riskPercent: 1,
          available: true,
        },
      ]
    : [
        {
          id: "bus",
          label: "Клубный автобус (межгород)",
          subtitle:
            dist <= 950 && !isEnclave
              ? `~${busHours} ч в пути (${dist} км). Не зависит от аэропортов, но утомляет на длинной трассе.`
              : isEnclave
                ? "Для Калининграда наземный транзит недоступен."
                : `Дистанция ${dist} км превышает лимит автобусного выезда (950 км).`,
          cost: roundMoney((1100 + dist * 2.4) * scaleFactor),
          travelHours: busHours,
          energyImpact: busFatiguePenalty,
          powerImpact: dist > 450 ? -0.16 : -0.04,
          riskPercent: dist > 450 ? 20 : 10,
          available: dist <= 950 && !isEnclave,
          disabledReason: isEnclave ? "Калининград — нужен авиаперелёт" : dist > 950 ? "Свыше 950 км автобусом запрещено регламентом" : undefined,
        },
        {
          id: "train_coupe",
          label: "Поезд (купейные блоки + штабной вагон)",
          subtitle: canUseRail
            ? `~${trainCoupeHours} ч в пути (${dist} км). Можно ехать куда угодно по ж/д — 0% риска отмены из-за закрытия неба и плана «Ковёр».`
            : railDisabledReason,
          cost: trainCoupeCost,
          travelHours: trainCoupeHours,
          energyImpact: trainCoupeEnergy,
          powerImpact: trainCoupePower,
          riskPercent: dist > 2500 ? 6 : 3,
          available: canUseRail,
          railSafe: true,
          recommended: canUseRail && (!geo.destAirport || skyStatus.level === "high") && dist <= 1800,
          disabledReason: canUseRail ? undefined : railDisabledReason,
        },
        {
          id: "train_sv",
          label: "Скоростной экспресс / СВ (люкс-купе)",
          subtitle: canUseRail
            ? `~${trainSvHours} ч в пути (${dist} км). Полноценный сон в СВ, питание и безвизовое движение по всем ж/д путям даже при закрытых аэропортах.`
            : railDisabledReason,
          cost: trainSvCost,
          travelHours: trainSvHours,
          energyImpact: trainSvEnergy,
          powerImpact: trainSvPower,
          riskPercent: dist > 2500 ? 4 : 2,
          available: canUseRail,
          railSafe: true,
          recommended: canUseRail && dist >= 180 && dist <= 1100,
          disabledReason: canUseRail ? undefined : railDisabledReason,
        },
        {
          id: "flight_regular",
          label: "Рейсовый авиаперелёт (эконом-блок)",
          subtitle: `${regularFlightNotice} ~${+(flightHours + (geo.destAirport ? 0 : 2.5)).toFixed(1)} ч.`,
          cost: flightRegularCost,
          travelHours: +(flightHours + (geo.destAirport ? 0 : 2.5)).toFixed(1),
          energyImpact: geo.destAirport ? -2 : -4,
          powerImpact: geo.destAirport ? -0.03 : -0.09,
          riskPercent: (geo.destAirport ? 12 : 20) + skyStatus.airRiskBonus,
          available: dist >= 280,
          airAffected: true,
          disabledReason: dist < 280 ? "На дистанции до 280 км перелёт не требуется" : undefined,
        },
        {
          id: "flight_comfort",
          label: "Прямой рейс (Комфорт/Бизнес + приоритет багажа)",
          subtitle: `Увеличенный шаг кресел и быстрая выдача формы. Зависит от погоды и режима воздушного пространства.`,
          cost: flightComfortCost,
          travelHours: +(flightHours + (geo.destAirport ? -0.3 : 2.0)).toFixed(1),
          energyImpact: geo.destAirport ? 1 : -2,
          powerImpact: 0.08,
          riskPercent: (geo.destAirport ? 7 : 13) + Math.round(skyStatus.airRiskBonus * 0.85),
          available: dist >= 280,
          airAffected: true,
          recommended: (dist > 1100 && skyStatus.level === "clear") || isEnclave,
          disabledReason: dist < 280 ? "На дистанции до 280 км перелёт не требуется" : undefined,
        },
        {
          id: "flight_charter",
          label: "Собственный чартерный борт клуба",
          subtitle: `Вылет по графику тренера, VIP-терминал и быстрый вылет домой. В зоне «Ковра» возможен уход на запасной аэродром.`,
          cost: flightCharterCost,
          travelHours: +(charterHours + (geo.destAirport ? 0 : 1.8)).toFixed(1),
          energyImpact: 3,
          powerImpact: 0.16,
          riskPercent: 2 + Math.round(skyStatus.airRiskBonus * 0.45),
          available: dist >= 240,
          airAffected: true,
          disabledReason: dist < 240 ? "Чартер доступен для выездов от 240 км" : undefined,
        },
      ];

  const delegationOptions: LogisticsOptionCatalog["delegationOptions"] = [
    {
      id: "base",
      label: "Базовая делегация (26 чел.)",
      subtitle: "Заявка на матч, главные тренеры, врач и начальник команды",
      cost: 0,
      powerImpact: 0,
      homeEdgeMitigation: 0,
    },
    {
      id: "extended",
      label: "Расширенный штаб (34 чел.)",
      subtitle: "Доп. места для видеоаналитика, реабилитолога, массажистов и администратора",
      cost: roundMoney(1200 * scaleFactor),
      powerImpact: 0.06,
      homeEdgeMitigation: 0.01,
    },
    {
      id: "fan_support",
      label: "Штаб + субсидия гостевого сектора",
      subtitle: "Квота билетов на выезд для активных фанатов — поддержка на чужой арене",
      cost: roundMoney(3200 * scaleFactor),
      powerImpact: 0.1,
      homeEdgeMitigation: 0.06,
    },
  ];

  const hotelOptions: LogisticsOptionCatalog["hotelOptions"] = [
    {
      id: "economy_3",
      label: `«${hp}» 3★ (Стандарт / у вокзала)`,
      subtitle: "Базовые номера, слышен уличный трафик, нет отдельного зала для тактики",
      baseCost: roundMoney(1400 * scaleFactor),
      energyImpact: -3,
      powerImpact: -0.08,
      riskPercent: 16,
    },
    {
      id: "business_4",
      label: `«${hp} Арена» 4★ (Бизнес-отель)`,
      subtitle: "10–15 мин до стадиона, тихий этаж для команды, зал для теоретических разборов",
      baseCost: roundMoney(3200 * scaleFactor),
      energyImpact: 1,
      powerImpact: 0.05,
      riskPercent: 5,
    },
    {
      id: "resort_5",
      label: `Резиденция «${hp} Премиум» 5★ SPA`,
      subtitle: "Закрытое крыло с охраной, крио-зона, бассейн, восстановительный центр",
      baseCost: roundMoney(6800 * scaleFactor),
      energyImpact: 3,
      powerImpact: 0.12,
      riskPercent: 1,
    },
  ];

  const arrivalOptions: LogisticsOptionCatalog["arrivalOptions"] = isSameCity
    ? [
        {
          id: "matchday",
          label: "Сбор на арене за 4 часа до игры",
          subtitle: "Без ночёвки в гостинице, игроки спят дома",
          hotelMultiplier: 0.35,
          energyImpact: 0,
          powerImpact: 0,
          recommended: true,
        },
        {
          id: "minus_1",
          label: "Заезд на базу/в отель накануне вечером",
          subtitle: "Полный режим изоляции и спокойный предматчевый завтрак",
          hotelMultiplier: 1.0,
          energyImpact: 1,
          powerImpact: 0.04,
        },
      ]
    : [
        {
          id: "matchday",
          label: "Прибытие в день матча утром",
          subtitle: "Экономия 35% на отеле, но спешка перед установкой и тяжёлые ноги после дороги",
          hotelMultiplier: 0.65,
          energyImpact: -3,
          powerImpact: -0.09,
        },
        {
          id: "minus_1",
          label: "Заезд за 1 сутки до матча (классика)",
          subtitle: "Ночной сон на месте, предыгровой разбор и спокойный выход к стадиону",
          hotelMultiplier: 1.0,
          energyImpact: 1,
          powerImpact: 0.04,
          recommended: geo.timezoneShiftH < 2 && dist < 1400,
        },
        {
          id: "minus_2",
          label: "Ранний заезд за 2 суток (акклиматизация)",
          subtitle:
            geo.timezoneShiftH >= 2 || dist >= 1400
              ? `Разница часовых поясов ${geo.timezoneShiftH} ч и ${dist} км — ранняя адаптация снимает джетлаг.`
              : "Дополнительный день на месте для полного привыкания к климату и газону",
          hotelMultiplier: 1.75,
          energyImpact: geo.timezoneShiftH >= 2 || dist >= 1400 ? 4 : 2,
          powerImpact: geo.timezoneShiftH >= 2 || dist >= 1400 ? 0.14 : 0.06,
          recommended: geo.timezoneShiftH >= 2 || dist >= 1400,
        },
      ];

  const cateringOptions: LogisticsOptionCatalog["cateringOptions"] = [
    {
      id: "hotel_buffet",
      label: "Общий ресторан отеля (стандарт)",
      subtitle: "Обычный шведский стол без спецзаказа — лёгкий риск непривычной кухни",
      cost: 0,
      energyImpact: -1,
      riskPercent: 10,
    },
    {
      id: "sport_menu",
      label: "Согласованное спорт-меню от диетолога",
      subtitle: "Сложные углеводы, паста, режим питья и электролиты строго по таймингу",
      cost: roundMoney(900 * scaleFactor),
      energyImpact: 1,
      riskPercent: 2,
    },
    {
      id: "club_chef",
      label: "Выездной шеф-повар клуба + своя вода",
      subtitle: "Свои продукты, контроль каждой порции и нулевой риск сбоя ЖКТ",
      cost: roundMoney(2200 * scaleFactor),
      energyImpact: 2,
      riskPercent: 0,
    },
  ];

  const medicalOptions: LogisticsOptionCatalog["medicalOptions"] = [
    {
      id: "standard_kit",
      label: "Штатная аптечка врача",
      subtitle: "Базовые тейпы и обезболивающие в поездке",
      cost: 0,
      energyImpact: 0,
    },
    {
      id: "physio_mobile",
      label: "Массажисты + мобильное крио/физио",
      subtitle: "Лимфодренаж после дороги, восстановительные процедуры в номерах",
      cost: roundMoney(1500 * scaleFactor),
      energyImpact: 3,
    },
  ];

  const localTransferOptions: LogisticsOptionCatalog["localTransferOptions"] = [
    {
      id: "rented_bus",
      label: "Арендованный местный автобус",
      subtitle: "Движение в общем потоке города — возможны пробки перед ареной",
      cost: roundMoney(500 * scaleFactor),
      riskPercent: 10,
      powerImpact: 0,
    },
    {
      id: "escort",
      label: "Клубный лайнер + сопровождение ГИБДД",
      subtitle: "«Зелёная волна» от отеля до раздевалки за 90 минут до свистка",
      cost: roundMoney(1800 * scaleFactor),
      riskPercent: 0,
      powerImpact: 0.05,
    },
  ];

  const trainingPitchOptions: LogisticsOptionCatalog["trainingPitchOptions"] = [
    {
      id: "none",
      label: "Без выездной тренировки",
      subtitle: "Только утренняя прогулка и разминка в коридоре отеля",
      cost: 0,
      powerImpact: 0,
    },
    {
      id: "rent_pitch",
      label: "Аренда поля и проба газона арены (MD-1)",
      subtitle: "Игроки привыкают к отскоку мяча, ветру и освещению стадиона",
      cost: roundMoney(1500 * scaleFactor),
      powerImpact: 0.09,
    },
  ];

  const insuranceOptions: LogisticsOptionCatalog["insuranceOptions"] = [
    {
      id: "none",
      label: "Без резервного плана на случай отмен",
      subtitle: "При плане «Ковёр», тумане или поломке трансфера решать проблему придётся экстренно",
      cost: 0,
      riskReduction: 0,
    },
    {
      id: "backup_plan",
      label: "Резервная бронь РЖД / подменный борт + страховка",
      subtitle: "Автоматическая пересадка на поезд/резервный автобус при закрытии аэропорта и дубль багажа",
      cost: roundMoney(1100 * scaleFactor),
      riskReduction: 75,
    },
  ];

  return {
    fixtureId: f.id,
    originCity: geo.originCity,
    destCity: geo.destCity,
    destStadium: geo.destStadium,
    distKm: geo.distKm,
    timezoneShiftH: geo.timezoneShiftH,
    isSameCity,
    isEnclave,
    destAirport: geo.destAirport,
    canUseRail,
    skyStatus,
    scaleFactor,
    transportOptions,
    delegationOptions,
    hotelOptions,
    arrivalOptions,
    cateringOptions,
    medicalOptions,
    localTransferOptions,
    trainingPitchOptions,
    insuranceOptions,
  };
}

export function sanitizeSelection(catalog: LogisticsOptionCatalog, rawSel: Partial<AwayLogisticsSelection> | null | undefined): AwayLogisticsSelection {
  const pickValid = <T extends { id: string; available?: boolean }>(list: T[], val: any, fallbackPref?: string): T => {
    const found = list.find((x) => x.id === val && x.available !== false);
    if (found) return found;
    if (fallbackPref) {
      const pref = list.find((x) => x.id === fallbackPref && x.available !== false);
      if (pref) return pref;
    }
    return list.find((x) => x.available !== false) || list[0];
  };

  const tr = pickValid(catalog.transportOptions, rawSel?.transport, catalog.isSameCity ? "local_bus" : catalog.distKm > 900 ? "flight_regular" : "train_coupe");
  const del = pickValid(catalog.delegationOptions, rawSel?.delegation, "base");
  const hot = pickValid(catalog.hotelOptions, rawSel?.hotel, "business_4");
  const arr = pickValid(catalog.arrivalOptions, rawSel?.arrival, "minus_1");
  const cat = pickValid(catalog.cateringOptions, rawSel?.catering, "sport_menu");
  const med = pickValid(catalog.medicalOptions, rawSel?.medical, "standard_kit");
  const loc = pickValid(catalog.localTransferOptions, rawSel?.localTransfer, "rented_bus");
  const trn = pickValid(catalog.trainingPitchOptions, rawSel?.trainingPitch, "none");
  const ins = pickValid(catalog.insuranceOptions, rawSel?.insurance, "none");

  const kp = rawSel?.kitPrep || ({} as any);
  return {
    transport: tr.id as TransportModeId,
    delegation: del.id as DelegationTierId,
    hotel: hot.id as HotelTierId,
    arrival: arr.id as ArrivalWindowId,
    catering: cat.id as CateringTierId,
    medical: med.id as MedicalTierId,
    localTransfer: loc.id as LocalTransferId,
    trainingPitch: trn.id as TrainingPitchId,
    insurance: ins.id as InsuranceTierId,
    kitPrep: {
      reserveKit: kp.reserveKit !== false,
      weatherGear: kp.weatherGear !== false,
      studsCheck: kp.studsCheck !== false,
      docsVerified: kp.docsVerified !== false,
    },
  };
}

export function evaluateLogisticsPlan(
  catalog: LogisticsOptionCatalog,
  sel: AwayLogisticsSelection,
  existingIncident?: TravelIncident | null
): {
  totalCost: number;
  readinessScore: number;
  energyDelta: number;
  powerMod: number;
  homeEdgeMitigation: number;
  travelHours: number;
  riskPercent: number;
  summaryLine: string;
  promptSummary: string;
} {
  const tr = catalog.transportOptions.find((x) => x.id === sel.transport) || catalog.transportOptions[0];
  const del = catalog.delegationOptions.find((x) => x.id === sel.delegation) || catalog.delegationOptions[0];
  const hot = catalog.hotelOptions.find((x) => x.id === sel.hotel) || catalog.hotelOptions[0];
  const arr = catalog.arrivalOptions.find((x) => x.id === sel.arrival) || catalog.arrivalOptions[0];
  const cat = catalog.cateringOptions.find((x) => x.id === sel.catering) || catalog.cateringOptions[0];
  const med = catalog.medicalOptions.find((x) => x.id === sel.medical) || catalog.medicalOptions[0];
  const loc = catalog.localTransferOptions.find((x) => x.id === sel.localTransfer) || catalog.localTransferOptions[0];
  const trn = catalog.trainingPitchOptions.find((x) => x.id === sel.trainingPitch) || catalog.trainingPitchOptions[0];
  const ins = catalog.insuranceOptions.find((x) => x.id === sel.insurance) || catalog.insuranceOptions[0];

  const hotelCost = roundMoney(hot.baseCost * arr.hotelMultiplier);
  const totalCost = roundMoney(
    tr.cost + del.cost + hotelCost + cat.cost + med.cost + loc.cost + trn.cost + ins.cost
  );

  // Kit checklist completeness
  const kitItems = [sel.kitPrep.reserveKit, sel.kitPrep.weatherGear, sel.kitPrep.studsCheck, sel.kitPrep.docsVerified];
  const missingKit = kitItems.filter((v) => !v).length;

  // Timezone penalty if far & arriving late
  let tzPenaltyEnergy = 0;
  let tzPenaltyPower = 0;
  if (catalog.timezoneShiftH >= 2 && sel.arrival !== "minus_2") {
    tzPenaltyEnergy = sel.arrival === "matchday" ? -4 : -2;
    tzPenaltyPower = sel.arrival === "matchday" ? -0.15 : -0.06;
  }

  let rawRisk = tr.riskPercent + hot.riskPercent + cat.riskPercent + loc.riskPercent + missingKit * 6;
  rawRisk = Math.round(Math.max(1, Math.min(75, rawRisk * (1 - ins.riskReduction / 100))));

  let energyDelta = tr.energyImpact + hot.energyImpact + arr.energyImpact + cat.energyImpact + med.energyImpact + tzPenaltyEnergy - (missingKit > 0 ? 1 : 0);
  let powerMod = tr.powerImpact + del.powerImpact + hot.powerImpact + arr.powerImpact + loc.powerImpact + trn.powerImpact + tzPenaltyPower - missingKit * 0.04;

  if (existingIncident && !existingIncident.resolved) {
    energyDelta -= existingIncident.energyPenalty;
    powerMod -= existingIncident.powerPenalty;
  }

  energyDelta = Math.max(-12, Math.min(5, Math.round(energyDelta)));
  powerMod = +Math.max(-0.55, Math.min(0.38, powerMod)).toFixed(2);
  const homeEdgeMitigation = +Math.min(0.1, del.homeEdgeMitigation + (trn.id === "rent_pitch" ? 0.02 : 0)).toFixed(2);

  // Readiness 0..100 score
  const readinessScore = Math.max(25, Math.min(100, Math.round(74 + energyDelta * 2.2 + powerMod * 28 - missingKit * 4)));

  const summaryLine = `${tr.label} · ${hot.label} · ${arr.label}${del.id === "fan_support" ? " · Гостевой сектор" : ""}`;
  const incText = existingIncident && !existingIncident.resolved
    ? ` Проблема в дороге: ${existingIncident.title} (${existingIncident.description}).`
    : existingIncident && existingIncident.resolved
      ? ` Дорожная накладка («${existingIncident.title}») оперативно устранена начальником команды.`
      : "";
  const kitWarn = missingKit > 0 ? ` Внимание: не до конца закрыт чек-лист экипировки/документов (${4 - missingKit}/4).` : "";

  const promptSummary = `Маршрут: ${catalog.originCity} → ${catalog.destCity} (${catalog.distKm} км${catalog.timezoneShiftH ? `, разница поясов ${catalog.timezoneShiftH} ч` : ""}). Транспорт: ${tr.label} (~${tr.travelHours} ч). Размещение: ${hot.label}, ${arr.label}. Питание и медицина: ${cat.label}; ${med.label}. В городе: ${loc.label}; предыгровая тренировка: ${trn.label}; делегация: ${del.label}. Готовность выезда: ${readinessScore}/100 (эффект на свежесть ${energyDelta >= 0 ? "+" : ""}${energyDelta}%).${incText}${kitWarn}`;

  return {
    totalCost,
    readinessScore,
    energyDelta,
    powerMod,
    homeEdgeMitigation,
    travelHours: tr.travelHours,
    riskPercent: rawRisk,
    summaryLine,
    promptSummary,
  };
}

function rollTravelIncident(catalog: LogisticsOptionCatalog, sel: AwayLogisticsSelection, riskPercent: number, uid: () => string): TravelIncident | null {
  const roll = Math.random() * 100;
  if (roll >= riskPercent) return null;

  const pool: Omit<TravelIncident, "id" | "resolved">[] = [];
  const isFlight = sel.transport === "flight_regular" || sel.transport === "flight_comfort" || sel.transport === "flight_charter";
  if (isFlight) {
    if (catalog.skyStatus?.droneRisk) {
      pool.push({
        title: "Закрытие аэропорта — план «Ковёр» (беспилотная опасность)",
        description: `В воздушной зоне г. ${catalog.destCity} / вылета ввели временные ограничения из-за беспилотной опасности. Авиарейс отменён или ушёл на запасной аэродром.`,
        energyPenalty: 4,
        powerPenalty: 0.14,
        fixCost: roundMoney((catalog.canUseRail ? 2800 : 3800) * catalog.scaleFactor),
        fixLabel: catalog.canUseRail
          ? "Экстренно пересадить команду в купе ближайшего поезда и подать автобус на вокзал"
          : "Срочно зафрахтовать резервный борт после снятия ограничений и VIP-трансфер",
      });
    }
    if (catalog.skyStatus?.weatherRisk) {
      pool.push({
        title: "Отмена вылета по метеоусловиям (туман / метель / ветер)",
        description: `Аэропорт г. ${catalog.destCity} приостановил приём судов по погоде, команда задержалась в терминале на 4.5 часа.`,
        energyPenalty: 3,
        powerPenalty: 0.11,
        fixCost: roundMoney(2400 * catalog.scaleFactor),
        fixLabel: "Оплатить бизнес-зал с зонами сна и ночной фаст-трек трансфер до отеля",
      });
    }
    if (sel.transport !== "flight_charter") {
      pool.push({
        title: "Задержка рейса и досмотр спортивного багажа",
        description: `Вылет в г. ${catalog.destCity} сдвинулся на 2.5 часа, команда добралась до отеля поздней ночью.`,
        energyPenalty: 3,
        powerPenalty: 0.09,
        fixCost: roundMoney(2100 * catalog.scaleFactor),
        fixLabel: "Заказать приоритетную доставку баулов и восстановительный массаж в отеле",
      });
    }
  }
  if (sel.transport === "bus" && catalog.distKm > 300) {
    pool.push({
      title: "Многокилометровый затор на трассе",
      description: `Клубный автобус простоял 3 часа на ремонте трассы по пути в г. ${catalog.destCity}, игроки затекли в креслах.`,
      energyPenalty: 4,
      powerPenalty: 0.12,
      fixCost: roundMoney(1800 * catalog.scaleFactor),
      fixLabel: "Экстренно снять зал ЛФК и сауну для разминки мышц в отеле",
    });
  }
  if (sel.hotel === "economy_3") {
    pool.push({
      title: "Шумное мероприятие на этаже отеля 3★",
      description: "Соседний банкетный зал не давал футболистам уснуть до полуночи перед матчем.",
      energyPenalty: 3,
      powerPenalty: 0.11,
      fixCost: roundMoney(2400 * catalog.scaleFactor),
      fixLabel: "Переселить основу в тихое крыло / соседний бизнес-отель",
    });
  }
  if (sel.catering === "hotel_buffet") {
    pool.push({
      title: "Сбой в спортивном меню",
      description: "Кухня отеля поздно подала ужин с непривычной кухней, часть основы недобрала углеводов.",
      energyPenalty: 2,
      powerPenalty: 0.08,
      fixCost: roundMoney(1400 * catalog.scaleFactor),
      fixLabel: "Закупить спортпит, гели и заказать пасту из проверенного кейтеринга",
    });
  }
  if (sel.localTransfer === "rented_bus") {
    pool.push({
      title: "Пробка на подъезде к стадиону",
      description: "Арендованный автобус упёрся в перекрытие улиц, разминка сократилась на 15 минут.",
      energyPenalty: 2,
      powerPenalty: 0.09,
      fixCost: roundMoney(1600 * catalog.scaleFactor),
      fixLabel: "Запросить оперативное окно заезда через дежурного инспектора РФС",
    });
  }
  if (!sel.kitPrep.studsCheck || !sel.kitPrep.weatherGear) {
    pool.push({
      title: "Накладка с бутсами и термобельём",
      description: "Перед выездом не проверили сменные шипы SG под влажный газон и утепление для скамейки.",
      energyPenalty: 1,
      powerPenalty: 0.1,
      fixCost: roundMoney(1300 * catalog.scaleFactor),
      fixLabel: "Срочно докупить комплект шипов и термоэкипировки в городе матча",
    });
  }

  if (!pool.length) {
    pool.push({
      title: "Заминка с размещением и багажом",
      description: "Небольшая неразбериха при заселении задержала вечернюю установку тренера на час.",
      energyPenalty: 2,
      powerPenalty: 0.07,
      fixCost: roundMoney(1500 * catalog.scaleFactor),
      fixLabel: "Нанять локального координатора для ускоренного чек-ина",
    });
  }

  const picked = pool[Math.floor(Math.random() * pool.length)];
  return {
    id: uid(),
    ...picked,
    resolved: false,
  };
}

/**
 * Used by computePlayerFatigue, computeLightMatchProfile, buildCtx, and buildUser in server.ts.
 */
export function getAwayLogisticsMatchImpact(
  ctx: AwayLogisticsServerContext,
  f: any,
  tid: string
): {
  isAwayTravel: boolean;
  organized: boolean;
  distKm: number;
  destCity: string;
  energyDelta: number;
  powerMod: number;
  homeEdgeMitigation: number;
  readinessScore: number;
  summaryLine: string;
  promptSummary: string;
} {
  if (!f || !f.id || !tid) {
    return {
      isAwayTravel: false,
      organized: false,
      distKm: 0,
      destCity: "",
      energyDelta: 0,
      powerMod: 0,
      homeEdgeMitigation: 0,
      readinessScore: 100,
      summaryLine: "",
      promptSummary: "",
    };
  }
  const geo = isAwayOrTravelFixture(ctx, f, tid);
  if (!geo.needsTravel) {
    return {
      isAwayTravel: false,
      organized: false,
      distKm: 0,
      destCity: "",
      energyDelta: 0,
      powerMod: 0,
      homeEdgeMitigation: 0,
      readinessScore: 100,
      summaryLine: "",
      promptSummary: "",
    };
  }

  const db = ctx.getDb();
  const key = `${f.id}:${tid}`;
  const rec: AwayLogisticsRecord | undefined = db?.awayLogistics?.[key];
  if (rec && rec.confirmedAt) {
    return {
      isAwayTravel: true,
      organized: true,
      distKm: rec.distKm || geo.distKm,
      destCity: rec.destCity || geo.destCity,
      energyDelta: Number(rec.energyDelta || 0),
      powerMod: Number(rec.powerMod || 0),
      homeEdgeMitigation: Number(rec.homeEdgeMitigation || 0),
      readinessScore: Number(rec.readinessScore || 75),
      summaryLine: rec.summaryLine || "",
      promptSummary: rec.promptSummary || "",
    };
  }

  // Unorganized away trip -> emergency last-minute travel penalty scaled by distance!
  const unorgEnergy = geo.distKm < 70 ? -2 : geo.distKm < 450 ? -5 : geo.distKm < 1400 ? -8 : -10;
  const unorgPower = geo.distKm < 70 ? -0.05 : geo.distKm < 450 ? -0.18 : geo.distKm < 1400 ? -0.32 : -0.45;
  return {
    isAwayTravel: true,
    organized: false,
    distKm: geo.distKm,
    destCity: geo.destCity,
    energyDelta: unorgEnergy,
    powerMod: unorgPower,
    homeEdgeMitigation: 0,
    readinessScore: Math.max(38, 66 + unorgEnergy * 2),
    summaryLine: "Авральный выезд (логистика не была организована заранее)",
    promptSummary: `Клуб не организовал выезд заранее (${geo.originCity} → ${geo.destCity}, ${geo.distKm} км): команда добиралась в последний момент дешёвым рейсом/автобусом без нормального размещения и восстановления (штраф к свежести ${unorgEnergy}%).`,
  };
}

export function getClubAwayFixturesSummary(ctx: AwayLogisticsServerContext, tid: string) {
  const db = ctx.getDb();
  if (!db.awayLogistics || typeof db.awayLogistics !== "object") db.awayLogistics = {};
  const curS = ctx.S();
  const upcomingAway = (db.fixtures || [])
    .filter((f: any) => (!f.season || f.season === curS) && f.status === "scheduled" && (f.home === tid || f.away === tid))
    .sort((a: any, b: any) => ctx.realAt(a).getTime() - ctx.realAt(b).getTime() || `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
    .map((f: any) => {
      const geo = isAwayOrTravelFixture(ctx, f, tid);
      if (!geo.needsTravel) return null;
      const key = `${f.id}:${tid}`;
      const rec: AwayLogisticsRecord | null = db.awayLogistics[key] || null;
      const oppId = f.home === tid ? f.away : f.home;
      const compRaw = String(f.comp || "");
      const compStageLow = String(f.cupStage || "").toLowerCase();
      const compLblLow = String(f.label || "").toLowerCase();
      const tdKey = compRaw === "cup"
        ? ((f.cupPath === "rpl_group" || f.cupPath === "rpl_playoff" || f.cupPath === "superfinal" || compStageLow === "superfinal" || compStageLow.startsWith("rpl_") || compLblLow.includes("путь рпл") || compLblLow.includes("пути рпл") || (!f.cupPath && !f.cupStage && Number(f.round) >= 1 && Number(f.round) <= 6)) ? "cup_rpl" : "cup_regions")
        : (compRaw === "playoff_rpl_fnl" ? "playoff" : compRaw);
      const tdForComp =
        db.settings?.techDefeat === true &&
        compRaw !== "friendly_match" &&
        (!Array.isArray(db.settings?.techDefeatComps) ||
          db.settings.techDefeatComps.includes(tdKey) ||
          (compRaw === "cup" && db.settings.techDefeatComps.includes("cup")));
      return {
        fixtureId: f.id,
        role: geo.role,
        organized: !!(rec && rec.confirmedAt),
        distKm: geo.distKm,
        destCity: geo.destCity,
        destStadium: geo.destStadium,
        oppName: ctx.tn(oppId),
        readinessScore: rec?.readinessScore ?? (geo.distKm < 70 ? 64 : 46),
        summaryLine: rec?.summaryLine || (tdForComp ? "Выезд не организован — неявка, ТН 0:3 и штраф КДК" : "Выезд не организован (для этой лиги Авто-ТН выключен)"),
        hasUnresolvedIncident: !!(rec?.incident && !rec.incident.resolved),
      };
    })
    .filter(Boolean);

  const byFixtureId: Record<string, any> = {};
  let unplannedCount = 0;
  for (const item of upcomingAway as any[]) {
    byFixtureId[item.fixtureId] = item;
    if (!item.organized) unplannedCount++;
  }
  return { unplannedCount, byFixtureId };
}

export function registerAwayLogisticsRoutes(app: Express, ctx: AwayLogisticsServerContext) {
  app.get("/api/club/logistics", ctx.needClub, (req: any, res: Response) => {
    const db = ctx.getDb();
    if (!db.awayLogistics || typeof db.awayLogistics !== "object") db.awayLogistics = {};
    const tid = req.tid;
    const t = ctx.team(tid);
    if (!t) return ctx.fail(res, "Клуб не найден", 404);

    const curS = ctx.S();
    const myUpcoming = (db.fixtures || [])
      .filter((f: any) => (!f.season || f.season === curS) && f.status === "scheduled" && (f.home === tid || f.away === tid))
      .sort((a: any, b: any) => ctx.realAt(a).getTime() - ctx.realAt(b).getTime() || `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));

    const trips = myUpcoming
      .map((f: any) => {
        const geo = isAwayOrTravelFixture(ctx, f, tid);
        if (!geo.needsTravel) return null;
        const catalog = buildLogisticsCatalog(ctx, f, tid);
        const key = `${f.id}:${tid}`;
        const saved: AwayLogisticsRecord | null = db.awayLogistics[key] || null;
        const oppId = f.home === tid ? f.away : f.home;
        const defaultSelection = saved?.selection || sanitizeSelection(catalog, {});
        const preview = saved
          ? {
              totalCost: saved.totalCost,
              readinessScore: saved.readinessScore,
              energyDelta: saved.energyDelta,
              powerMod: saved.powerMod,
              homeEdgeMitigation: saved.homeEdgeMitigation,
              travelHours: saved.travelHours,
              riskPercent: saved.riskPercent,
              summaryLine: saved.summaryLine,
              promptSummary: saved.promptSummary,
            }
          : evaluateLogisticsPlan(catalog, defaultSelection, null);

        return {
          fixture: {
            ...ctx.pubFx(f),
            oppId,
            oppName: ctx.tn(oppId),
            oppLogo: ctx.teamLogo(oppId),
            compName: ctx.compName(f.comp),
          },
          role: geo.role,
          catalog,
          organized: !!(saved && saved.confirmedAt),
          saved,
          defaultSelection,
          preview,
        };
      })
      .filter(Boolean);

    const recentLogs = Object.values(db.awayLogistics || {})
      .filter((r: any) => r && r.teamId === tid)
      .sort((a: any, b: any) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")))
      .slice(0, 10);

    res.json({
      team: {
        id: t.id,
        name: t.name,
        city: normalizeCityName(t.city) || "Москва",
        stadium: t.stadium || "",
        budget: Number(t.budget || 0),
        formattedBudget:
          Number(t.budget || 0) < 0
            ? "-€" + Math.abs(Math.round(Number(t.budget || 0))).toLocaleString("ru-RU")
            : "€" + Math.round(Number(t.budget || 0)).toLocaleString("ru-RU"),
      },
      trips,
      unplannedCount: trips.filter((x: any) => !x.organized).length,
      recentLogs,
    });
  });

  app.post("/api/club/logistics/save", ctx.needClub, (req: any, res: Response) => {
    const db = ctx.getDb();
    if (!db.awayLogistics || typeof db.awayLogistics !== "object") db.awayLogistics = {};
    const tid = req.tid;
    const t = ctx.team(tid);
    if (!t) return ctx.fail(res, "Клуб не найден", 404);

    const fixtureId = String(req.body?.fixtureId || "").trim();
    const f = ctx.fx(fixtureId);
    if (!f) return ctx.fail(res, "Матч не найден", 404);
    if (f.status !== "scheduled") return ctx.fail(res, "Матч уже начался или завершён — изменить выезд нельзя", 400);

    const geo = isAwayOrTravelFixture(ctx, f, tid);
    if (!geo.needsTravel) return ctx.fail(res, "Этот матч проходит дома — организация выезда не требуется", 400);

    const catalog = buildLogisticsCatalog(ctx, f, tid);
    const sel = sanitizeSelection(catalog, req.body?.selection || {});
    const key = `${f.id}:${tid}`;
    const prevRec: AwayLogisticsRecord | undefined = db.awayLogistics[key];
    const prevPaid = Number(prevRec?.paidAmount || 0);

    // Roll travel incident only on first booking or if risk increased significantly and no existing incident
    let incident: TravelIncident | null = prevRec?.incident || null;
    const baseEval = evaluateLogisticsPlan(catalog, sel, incident);

    const deltaCost = baseEval.totalCost - prevPaid;
    const curBudget = Number(t.budget || 0);
    if (deltaCost > 0 && curBudget < deltaCost) {
      return ctx.fail(
        res,
        `Недостаточно средств на выезд! Требуется доплата €${deltaCost.toLocaleString("ru-RU")}, а на балансе клуба €${Math.round(curBudget).toLocaleString("ru-RU")}. Выберите более экономный транспорт или гостиницу.`,
        400
      );
    }

    if (!prevRec) {
      incident = rollTravelIncident(catalog, sel, baseEval.riskPercent, ctx.uid);
    } else if (incident && !incident.resolved) {
      // If the manager upgraded to charter or 5★ or insurance, automatically mitigate certain incidents!
      if (sel.insurance === "backup_plan" || (sel.transport === "flight_charter" && sel.hotel === "resort_5")) {
        incident = {
          ...incident,
          resolved: true,
          resolvedAt: new Date().toISOString(),
        };
      }
    }

    const finalEval = evaluateLogisticsPlan(catalog, sel, incident);
    const nowIso = new Date().toISOString();

    if (deltaCost !== 0) {
      const prevBudget = Number(t.budget || 0);
      t.budget = prevBudget - deltaCost;
      if (!Array.isArray(db.budgetHistory)) db.budgetHistory = [];
      const oppName = ctx.tn(f.home === tid ? f.away : f.home);
      db.budgetHistory.push({
        id: ctx.uid(),
        teamId: t.id,
        teamName: t.name,
        amount: -deltaCost,
        prevBudget,
        newBudget: t.budget,
        type: "away_logistics",
        typeLabel: deltaCost > 0 ? "Выездная логистика" : "Корректировка выезда (возврат)",
        description:
          deltaCost > 0
            ? `Организация выезда в г. ${geo.destCity} на матч против «${oppName}» (${finalEval.summaryLine}): -€${deltaCost.toLocaleString("ru-RU")}`
            : `Экономия при изменении выезда в г. ${geo.destCity} против «${oppName}»: +€${Math.abs(deltaCost).toLocaleString("ru-RU")}`,
        date: nowIso,
      });
    }

    const rec: AwayLogisticsRecord = {
      key,
      fixtureId: f.id,
      teamId: tid,
      season: f.season || ctx.S(),
      originCity: geo.originCity,
      destCity: geo.destCity,
      destStadium: geo.destStadium,
      distKm: geo.distKm,
      timezoneShiftH: geo.timezoneShiftH,
      selection: sel,
      totalCost: finalEval.totalCost,
      paidAmount: baseEval.totalCost,
      readinessScore: finalEval.readinessScore,
      energyDelta: finalEval.energyDelta,
      powerMod: finalEval.powerMod,
      homeEdgeMitigation: finalEval.homeEdgeMitigation,
      travelHours: finalEval.travelHours,
      riskPercent: finalEval.riskPercent,
      incident,
      summaryLine: finalEval.summaryLine,
      promptSummary: finalEval.promptSummary,
      updatedAt: nowIso,
      confirmedAt: prevRec?.confirmedAt || nowIso,
    };

    db.awayLogistics[key] = rec;
    ctx.save();

    res.json({
      ok: true,
      record: rec,
      deltaCost,
      budget: t.budget,
      formattedBudget:
        Number(t.budget || 0) < 0
          ? "-€" + Math.abs(Math.round(Number(t.budget || 0))).toLocaleString("ru-RU")
          : "€" + Math.round(Number(t.budget || 0)).toLocaleString("ru-RU"),
      message: incident && !incident.resolved
        ? `Выезд организован, но возникла дорожная накладка: «${incident.title}». Её можно устранить прямо сейчас!`
        : `Выездная логистика в г. ${geo.destCity} утверждена (готовность ${rec.readinessScore}%).`,
    });
  });

  app.post("/api/club/logistics/resolve-incident", ctx.needClub, (req: any, res: Response) => {
    const db = ctx.getDb();
    if (!db.awayLogistics || typeof db.awayLogistics !== "object") db.awayLogistics = {};
    const tid = req.tid;
    const t = ctx.team(tid);
    if (!t) return ctx.fail(res, "Клуб не найден", 404);

    const fixtureId = String(req.body?.fixtureId || "").trim();
    const f = ctx.fx(fixtureId);
    if (!f) return ctx.fail(res, "Матч не найден", 404);
    if (f.status !== "scheduled") return ctx.fail(res, "Матч уже начался или завершён", 400);

    const key = `${f.id}:${tid}`;
    const rec: AwayLogisticsRecord | undefined = db.awayLogistics[key];
    if (!rec || !rec.incident || rec.incident.resolved) {
      return ctx.fail(res, "Активных дорожных накладок не найдено", 400);
    }

    const fixCost = Number(rec.incident.fixCost || 0);
    const curBudget = Number(t.budget || 0);
    if (fixCost > 0 && curBudget < fixCost) {
      return ctx.fail(res, `Недостаточно средств для устранения накладки (€${fixCost.toLocaleString("ru-RU")})`, 400);
    }

    const nowIso = new Date().toISOString();
    if (fixCost > 0) {
      const prevBudget = curBudget;
      t.budget = prevBudget - fixCost;
      if (!Array.isArray(db.budgetHistory)) db.budgetHistory = [];
      db.budgetHistory.push({
        id: ctx.uid(),
        teamId: t.id,
        teamName: t.name,
        amount: -fixCost,
        prevBudget,
        newBudget: t.budget,
        type: "away_logistics",
        typeLabel: "Экстренная логистика выезда",
        description: `Устранение накладки в г. ${rec.destCity} («${rec.incident.title}»): -€${fixCost.toLocaleString("ru-RU")}`,
        date: nowIso,
      });
    }

    rec.incident = {
      ...rec.incident,
      resolved: true,
      resolvedAt: nowIso,
    };
    const catalog = buildLogisticsCatalog(ctx, f, tid);
    const recomputed = evaluateLogisticsPlan(catalog, rec.selection, rec.incident);
    rec.readinessScore = recomputed.readinessScore;
    rec.energyDelta = recomputed.energyDelta;
    rec.powerMod = recomputed.powerMod;
    rec.homeEdgeMitigation = recomputed.homeEdgeMitigation;
    rec.promptSummary = recomputed.promptSummary;
    rec.updatedAt = nowIso;

    db.awayLogistics[key] = rec;
    ctx.save();

    res.json({
      ok: true,
      record: rec,
      budget: t.budget,
      formattedBudget:
        Number(t.budget || 0) < 0
          ? "-€" + Math.abs(Math.round(Number(t.budget || 0))).toLocaleString("ru-RU")
          : "€" + Math.round(Number(t.budget || 0)).toLocaleString("ru-RU"),
      message: `Накладка «${rec.incident.title}» устранена! Готовность выезда выросла до ${rec.readinessScore}%.`,
    });
  });
}
