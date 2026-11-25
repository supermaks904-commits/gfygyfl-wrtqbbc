// @ts-nocheck
/**
 * Club family mappings (main club <-> reserve "-2" / "-3" <-> youth "-М" / "-мол." / "-д")
 */
export const CLUB_FAMILY_GROUPS: string[][] = [
  ["Динамо Москва", "Динамо-2", "Динамо-2 Москва", "Динамо М", "Динамо-М", "Динамо-мол."],
  ["Динамо Махачкала", "Динамо-2 Мх", "Динамо Мх-2", "Динамо-2 Махачкала", "Динамо Махачкала-2"],
  ["Арсенал Тула", "Арсенал-2", "Арсенал-2 Тула"],
  ["Родина", "Родина-2", "Родина-3", "Родина-М", "Родина-м", "Родина-д", "Родина-мол."],
  ["Балтика", "Балтика-2", "Балтика-БФУ", "Балтика-М"],
  ["Чайка", "Чайка-М", "Чайка-2"],
  ["Чертаново", "Чертаново-мол.", "Чертаново-М", "Чертаново-2"],
  ["Зенит", "Зенит-2", "Зенит-М", "Зенит-м", "Зенит-д"],
  ["Спартак", "Спартак-2", "Спартак-М", "Спартак-м", "Спартак-мол."],
  ["Рубин", "Рубин-2", "Рубин-М", "Рубин-м"],
  ["Краснодар", "Краснодар-2", "Краснодар-3", "Краснодар-М", "Краснодар-м"],
  ["Локомотив", "Локомотив-2", "Локомотив-М", "Локомотив-м", "Казанка"],
  ["ЦСКА", "ЦСКА-2", "ЦСКА-М", "ЦСКА-м"]
];

const RESERVE_SUFFIX_RE = /(?:\s*[-–]\s*(?:2|3|4|м|д|мол\.?|u19|u21|дубль|молод[её]жка)|\s+(?:2|3|4|м|д|мол\.?|u19|u21|\(дубль\)|\(мол\.?\)|дубль))$/i;

export function isReserveOrYouthName(name: string): boolean {
  if (!name) return false;
  const trimmed = name.trim();
  if (RESERVE_SUFFIX_RE.test(trimmed)) return true;
  if (/бфу|казанка|мх$/i.test(trimmed) && /2|бфу|казанка/i.test(trimmed)) return true;
  return false;
}

export function familyNamesOf(name: string): string[] {
  if (!name) return [];
  const raw = name.trim();
  const low = raw.toLowerCase();
  const out: string[] = [];
  const seen = new Set<string>();
  const add = (s: string) => {
    const k = s.trim().toLowerCase();
    if (k && !seen.has(k)) {
      seen.add(k);
      out.push(s.trim());
    }
  };

  let matchedGroup = CLUB_FAMILY_GROUPS.find((g) => g.some((item) => item.toLowerCase() === low));
  const stripped = raw.replace(RESERVE_SUFFIX_RE, "").trim();
  if (!matchedGroup && stripped && stripped.toLowerCase() !== low) {
    matchedGroup = CLUB_FAMILY_GROUPS.find((g) => g.some((item) => item.toLowerCase() === stripped.toLowerCase()));
  }

  if (matchedGroup) {
    for (const item of matchedGroup) add(item);
    const root = matchedGroup[0];
    for (const v of [root, `${root}-2`, `${root} 2`, `${root}-3`, `${root} 3`, `${root}-м`, `${root}-М`, `${root} М`, `${root}-д`, `${root}-мол.`, `${root}-мол`, `${root}-U19`, `${root} U19`, `${root}-U21`, `${root} U21`]) {
      add(v);
    }
    return out;
  }

  const base = stripped || raw;
  for (const v of [
    base,
    `${base}-2`,
    `${base} 2`,
    `${base}-3`,
    `${base} 3`,
    `${base}-м`,
    `${base}-М`,
    `${base} М`,
    `${base}-д`,
    `${base}-мол.`,
    `${base}-мол`,
    `${base}-U19`,
    `${base} U19`,
    `${base}-U21`,
    `${base} U21`,
    `${base}-дубль`,
    `${base} (дубль)`
  ]) {
    add(v);
  }
  return out;
}
