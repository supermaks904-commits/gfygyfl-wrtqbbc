/* ───────── Сбор старых данных для переноса в PostgreSQL ─────────
   Источники (локальные файлы):
     • data/db.json, data/matches/*.json, club_codes.json                                        */
import fs from 'fs';
import path from 'path';
import type { LegacyData, CodeReg } from './pg_store.ts';

function readJson(file: string): any | null {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return null; }
}

function readMatchDir(dir: string): Map<string, any> {
  const out = new Map<string, any>();
  let files: string[] = [];
  try { files = fs.readdirSync(dir); } catch { return out; }
  for (const f of files) {
    if (!f.endsWith('.json')) continue;
    const m = readJson(path.join(dir, f));
    if (m) out.set(f.slice(0, -5), m);
  }
  return out;
}

export async function collectLegacy(opts: { dataDir: string; codesFile: string; useFiles?: boolean }): Promise<LegacyData | null> {
  const useFiles = opts.useFiles !== false;
  if (!useFiles) return null;

  const db = readJson(path.join(opts.dataDir, 'db.json'));
  if (!db) return null;

  const matches = readMatchDir(path.join(opts.dataDir, 'matches'));
  const localCodesRaw = readJson(opts.codesFile);
  const codes: CodeReg = {
    admin: localCodesRaw?.admin,
    clubs: (localCodesRaw?.clubs && typeof localCodesRaw.clubs === 'object') ? localCodesRaw.clubs : {},
  };

  const sessions = (db?.sessions && typeof db.sessions === 'object') ? db.sessions : {};
  return { db, matches, codes, sessions, source: 'локальный data/db.json' };
}
