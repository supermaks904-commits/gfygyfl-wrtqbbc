/* Модуль КДК РФС: штрафы клубов (болельщики, Фэйр-плэй, неявки, дисциплина) и таблица Фэйр-плэй лиги */

declare global {
  interface Window {
    __RPL_FINES__?: {
      renderClubFinesTab: (cb: HTMLElement, clubData: any, onRefreshClub: () => void) => Promise<void>;
      renderAdminFinesTab: (ab: HTMLElement, ov: any, onRefreshAdmin: () => void) => Promise<void>;
    };
  }
}

function ensureFinesStyles() {
  if (typeof document === "undefined") return;
  let st = document.getElementById("rpl_fines_styles") as HTMLStyleElement | null;
  if (!st) {
    st = document.createElement("style");
    st.id = "rpl_fines_styles";
    document.head.appendChild(st);
  }
  st.textContent = `
    .kdk-wrap{display:flex;flex-direction:column;gap:16px}
    .kdk-hero{
      background:linear-gradient(135deg,#0b3b24 0%,#154c33 100%);
      color:#fff;
      border-radius:14px;
      padding:20px 22px;
      border:1px solid #1e6243;
      display:flex;
      flex-wrap:wrap;
      align-items:center;
      justify-content:space-between;
      gap:16px;
    }
    .kdk-eyebrow{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#a7d7b8;margin-bottom:4px}
    .kdk-title{font:700 20px Unbounded,sans-serif;margin:0 0 6px;color:#fff}
    .kdk-sub{font-size:13px;color:#d6e8dc;line-height:1.5;max-width:66ch}
    .kdk-kpis{display:flex;gap:10px;flex-wrap:wrap;align-items:stretch}
    .kdk-kpi{
      background:rgba(255,255,255,0.09);
      border:1px solid rgba(255,255,255,0.16);
      border-radius:10px;
      padding:10px 14px;
      min-width:124px;
      font-variant-numeric:tabular-nums;
    }
    .kdk-kpi-lbl{font-size:11px;color:#bdd8c6}
    .kdk-kpi-val{font:700 16px Unbounded,sans-serif;color:#f0c419;margin-top:3px}

    .kdk-grid-2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
    @media(max-width:860px){.kdk-grid-2{grid-template-columns:minmax(0,1fr)}}

    .kdk-presets{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px;margin-bottom:14px}
    .kdk-preset{
      text-align:left;
      background:#fff;
      border:1px solid var(--line);
      border-radius:9px;
      padding:10px 12px;
      cursor:pointer;
      transition:border-color .15s,background .15s;
      display:flex;
      flex-direction:column;
      gap:4px;
      font-variant-numeric:tabular-nums;
    }
    .kdk-preset:hover{border-color:var(--green);background:#f7fbf8}
    .kdk-preset.on{border-color:var(--deep);border-width:2px;background:#eef7f0}
    .kdk-preset-top{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;font-weight:700;font-size:12.5px;color:var(--ink)}
    .kdk-preset-amt{font-weight:800;color:#b91c1c;white-space:nowrap}
    .kdk-preset-sub{font-size:11.5px;color:var(--muted);line-height:1.35}

    .kdk-fp-bar{display:inline-block;width:64px;height:6px;background:#e2e8f0;border-radius:999px;overflow:hidden;vertical-align:middle;margin-right:6px}
    .kdk-fp-fill{height:100%;border-radius:999px}
    .kdk-row-me{background:#eef7f0 !important;font-weight:600}
    .kdk-revoked{opacity:.58;text-decoration:line-through}
  `;
}

function fmtEurKdk(n: number): string {
  const v = Math.round(Number(n || 0));
  return v < 0 ? "-€" + Math.abs(v).toLocaleString("ru-RU") : "€" + v.toLocaleString("ru-RU");
}

function fmtDateKdk(d?: string): string {
  if (!d) return "—";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return String(d);
  return dt.toLocaleDateString("ru-RU") + " " + dt.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

function fpColor(score: number): string {
  if (score >= 95) return "#15803d";
  if (score >= 82) return "#b45309";
  return "#b91c1c";
}

function renderFairPlayTableHtml(standings: any[], e: (s: any) => string, myTeamId?: string): string {
  if (!standings.length) return '<div class="empty">Данных по рейтингу Фэйр-плэй пока нет</div>';
  return `
    <div class="wrap">
      <table style="font-size:13px;font-variant-numeric:tabular-nums">
        <thead>
          <tr>
            <th>#</th>
            <th class="l">Клуб</th>
            <th>И</th>
            <th>Чистых игр</th>
            <th>ЖК</th>
            <th>КК</th>
            <th>Инцид. фанов</th>
            <th>Штрафы КДК</th>
            <th>Фэйр-плэй</th>
          </tr>
        </thead>
        <tbody>
          ${standings.map((r: any) => {
            const isMe = myTeamId && r.teamId === myTeamId;
            const col = fpColor(r.fairPlayScore);
            const pct = Math.max(0, Math.min(100, Math.round((r.fairPlayScore / 115) * 100)));
            return `
              <tr class="${isMe ? "kdk-row-me" : ""}">
                <td style="font-weight:700">${r.rank}</td>
                <td class="l">
                  <div class="row" style="gap:8px;align-items:center">
                    ${r.teamLogo ? `<img class="t-logo sm" src="${e(r.teamLogo)}" alt=""/>` : ""}
                    <span><b>${e(r.teamName)}</b>${isMe ? ' <span class="small" style="color:var(--green);font-weight:700">(вы)</span>' : ""}</span>
                  </div>
                </td>
                <td>${r.played}</td>
                <td style="color:#15803d;font-weight:600">${r.cleanMatches}</td>
                <td>${r.yellowCards}</td>
                <td style="color:${r.redCards > 0 ? "#b91c1c" : "inherit"};font-weight:${r.redCards > 0 ? "700" : "400"}">${r.redCards}</td>
                <td style="color:${r.fanIncidents > 0 ? "#b45309" : "inherit"}">${r.fanIncidents}</td>
                <td style="font-weight:700;color:${r.totalFinedEur > 0 ? "#b91c1c" : "var(--muted)"}">${r.totalFinedEur > 0 ? fmtEurKdk(r.totalFinedEur) : "€0"}</td>
                <td style="white-space:nowrap">
                  <span class="kdk-fp-bar"><span class="kdk-fp-fill" style="width:${pct}%;background:${col}"></span></span>
                  <b style="color:${col}">${r.fairPlayScore}</b>
                </td>
              </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>`;
}

async function renderClubFinesTab(cb: HTMLElement, _clubData: any, _onRefreshClub: () => void) {
  ensureFinesStyles();
  const app = window.__RPL_APP__;
  if (!app) return;
  const { api, e, S } = app;
  const isAdmin = S.me?.role === "admin";
  const tid = app.getClubTid ? app.getClubTid() : "";
  const q = isAdmin && tid ? `?teamId=${encodeURIComponent(tid)}` : "";

  cb.innerHTML = '<div class="panel muted">Загружаем решения КДК РФС и рейтинг Фэйр-плэй…</div>';

  let data: any;
  try {
    data = await api(`/club/fines${q}`);
  } catch (err: any) {
    cb.innerHTML = `<div class="panel warn">Ошибка загрузки данных КДК: ${e(err?.message || "ошибка сети")}</div>`;
    return;
  }

  const sm = data.summary || {};
  const fines: any[] = Array.isArray(data.fines) ? data.fines : [];
  const standings: any[] = Array.isArray(data.standings) ? data.standings : [];
  const fpVal = Number(sm.fairPlayScore ?? 100);

  cb.innerHTML = `
    <div class="kdk-wrap">
      <div class="kdk-hero">
        <div>
          <div class="kdk-eyebrow">Дисциплинарный регламент РФС · ${e(data.team?.name || "")}</div>
          <h2 class="kdk-title">КДК, штрафы и рейтинг Фэйр-плэй</h2>
          <div class="kdk-sub">Автоматические и индивидуальные санкции за поведение болельщиков (файеры, скандирования), недисциплинированную игру, нарушения Фэйр-плэй и неявки на выездные матчи.</div>
        </div>
        <div class="kdk-kpis">
          <div class="kdk-kpi">
            <div class="kdk-kpi-lbl">Индекс Фэйр-плэй</div>
            <div class="kdk-kpi-val" style="color:${fpVal >= 95 ? "#86efac" : fpVal >= 80 ? "#f0c419" : "#fca5a5"}">${fpVal} (#${sm.rank || 1})</div>
          </div>
          <div class="kdk-kpi">
            <div class="kdk-kpi-lbl">Штрафы за сезон</div>
            <div class="kdk-kpi-val" style="color:${(sm.totalFinedEur || 0) > 0 ? "#fca5a5" : "#86efac"}">${fmtEurKdk(sm.totalFinedEur || 0)}</div>
          </div>
          <div class="kdk-kpi">
            <div class="kdk-kpi-lbl">Чистых матчей</div>
            <div class="kdk-kpi-val" style="color:#fff">${sm.cleanMatches || 0}</div>
          </div>
          <div class="kdk-kpi">
            <div class="kdk-kpi-lbl">Взысканий</div>
            <div class="kdk-kpi-val" style="color:#fff">${sm.finesCount || 0}</div>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="row sp" style="margin-bottom:10px;flex-wrap:wrap;gap:8px">
          <h3 style="margin:0">Постановления КДК по клубу (${fines.length})</h3>
          <span class="small muted">Штрафы списываются с бюджета клуба автоматически</span>
        </div>
        <div class="wrap">
          <table style="font-size:13px;font-variant-numeric:tabular-nums">
            <thead>
              <tr>
                <th class="l">Дата</th>
                <th class="l">Статья / Категория</th>
                <th>Штраф</th>
                <th>Фэйр-плэй</th>
                <th class="l">Формулировка КДК / Матч</th>
              </tr>
            </thead>
            <tbody>
              ${fines.length ? fines.map((fn: any) => `
                <tr class="${fn.revoked ? "kdk-revoked" : ""}">
                  <td class="l small muted" style="white-space:nowrap">${e(fmtDateKdk(fn.issuedAt))}</td>
                  <td class="l">
                    <b>${e(fn.categoryLabel)}</b>
                    ${fn.article ? `<div class="small muted">${e(fn.article)}</div>` : ""}
                  </td>
                  <td style="font-weight:800;color:${fn.revoked ? "var(--muted)" : "#b91c1c"}">${fmtEurKdk(fn.amount)}</td>
                  <td style="font-weight:700;color:${fn.fairPlayPenalty > 0 && !fn.revoked ? "#b45309" : "var(--muted)"}">${fn.fairPlayPenalty > 0 ? `−${fn.fairPlayPenalty}` : "0"}</td>
                  <td class="l small" style="line-height:1.4">
                    ${e(fn.reason)}
                    ${fn.matchLabel ? `<div class="muted">Матч: ${e(fn.matchLabel)}</div>` : ""}
                    ${fn.revoked ? `<div style="color:#15803d;font-weight:700">Отменён: ${e(fn.revokeReason || "апелляция")}</div>` : ""}
                  </td>
                </tr>
              `).join("") : '<tr><td colspan="5" class="empty">У клуба нет ни одного штрафа КДК — образцовая дисциплина!</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <div class="panel">
        <div class="row sp" style="margin-bottom:10px;flex-wrap:wrap;gap:8px">
          <h3 style="margin:0">Таблица Фэйр-плэй (${e(data.team?.compName || "Лига")})</h3>
          <span class="small muted">База 100 · +1.5 за матч без карт и штрафов · −1 ЖК · −4 КК · штрафы КДК</span>
        </div>
        ${renderFairPlayTableHtml(standings, e, data.team?.id)}
      </div>
    </div>`;
}

let ADMIN_FINES_COMP = "rpl";

async function renderAdminFinesTab(ab: HTMLElement, ov: any, onRefreshAdmin: () => void) {
  ensureFinesStyles();
  const app = window.__RPL_APP__;
  if (!app) return;
  const { api, act, e } = app;

  ab.innerHTML = '<div class="panel muted">Загружаем реестр КДК РФС и таблицу Фэйр-плэй…</div>';

  let data: any;
  try {
    data = await api(`/fines/fair-play?comp=${encodeURIComponent(ADMIN_FINES_COMP)}`);
  } catch (err: any) {
    ab.innerHTML = `<div class="panel warn">Ошибка загрузки раздела КДК: ${e(err?.message || "ошибка сети")}</div>`;
    return;
  }

  const presets: any[] = Array.isArray(data.presets) ? data.presets : [];
  const teams: any[] = (ov?.teams || []).filter((t: any) => ADMIN_FINES_COMP === "all" || t.comp === ADMIN_FINES_COMP);
  const allTeams: any[] = ov?.teams || [];
  const targetTeams = teams.length ? teams : allTeams;
  const recentFines: any[] = Array.isArray(data.recentFines) ? data.recentFines : [];
  const standings: any[] = Array.isArray(data.standings) ? data.standings : [];
  const firstPreset = presets[0] || { category: "fans_pyro", suggestedAmount: 1000, fairPlayPenalty: 6, article: "ст. 114 ДР РФС", defaultReason: "" };

  ab.innerHTML = `
    <div class="kdk-wrap">
      <div class="panel">
        <div class="row sp" style="margin-bottom:12px;flex-wrap:wrap;gap:10px">
          <div>
            <h3 style="margin:0">⚖️ Наложить штраф КДК РФС / санкцию на клуб</h3>
            <div class="small muted" style="margin-top:3px">Выберите типовую статью (болельщики, Фэйр-плэй, судейство, неявка) или задайте индивидуальное постановление — сумма автоматически спишется со счёта клуба.</div>
          </div>
          <div class="tabs" style="margin:0">
            ${[["rpl", "РПЛ"], ["fnl", "Первая лига"], ["2la_gold", "2А Золото"], ["2la_silver", "2А Серебро"], ["media", "Медиалига"], ["all", "Все"]].map(([id, lbl]) => `
              <button type="button" class="${ADMIN_FINES_COMP === id ? "on" : ""}" data-kdk-comp="${id}" style="padding:5px 10px;font-size:12px">${lbl}</button>
            `).join("")}
          </div>
        </div>

        <div class="kdk-presets">
          ${presets.map((p: any, idx: number) => `
            <button type="button" class="kdk-preset ${idx === 0 ? "on" : ""}" data-kdk-preset="${e(p.category)}">
              <div class="kdk-preset-top">
                <span>${e(p.label)}</span>
                <span class="kdk-preset-amt">${fmtEurKdk(p.suggestedAmount)}</span>
              </div>
              <div class="kdk-preset-sub">${e(p.article)} · Фэйр-плэй −${p.fairPlayPenalty}</div>
            </button>
          `).join("")}
        </div>

        <div class="row" style="gap:10px;flex-wrap:wrap;align-items:flex-end">
          <div style="flex:2;min-width:210px">
            <label class="small muted">Клуб-нарушитель</label>
            <select id="kdk_team_id" style="width:100%">
              ${targetTeams.map((t: any) => `<option value="${e(t.id)}">${e(t.name)} (${e((t.comp || "").toUpperCase())} · баланс ${fmtEurKdk(t.budget || 0)})</option>`).join("")}
            </select>
          </div>
          <div style="flex:1;min-width:130px">
            <label class="small muted">Штраф (€)</label>
            <input id="kdk_amount" type="number" min="0" max="5000000" step="100" value="${firstPreset.suggestedAmount}" style="width:100%">
          </div>
          <div style="flex:1;min-width:130px">
            <label class="small muted">Штраф Фэйр-плэй</label>
            <input id="kdk_fp_pen" type="number" min="0" max="40" step="1" value="${firstPreset.fairPlayPenalty}" style="width:100%">
          </div>
          <div style="flex:1.2;min-width:150px">
            <label class="small muted">Статья регламента</label>
            <input id="kdk_article" type="text" value="${e(firstPreset.article)}" style="width:100%">
          </div>
        </div>

        <div style="margin-top:10px">
          <label class="small muted">Формулировка постановления КДК</label>
          <input id="kdk_reason" type="text" value="${e(firstPreset.defaultReason)}" placeholder="Причина штрафа..." style="width:100%">
        </div>

        <div class="row sp" style="margin-top:12px;flex-wrap:wrap;gap:10px">
          <label style="display:flex;align-items:center;gap:6px;font-size:13px;margin:0">
            <input type="checkbox" id="kdk_tg" checked style="width:auto;margin:0"> Опубликовать решение КДК в Telegram-канал
          </label>
          <button type="button" class="btn" id="btn_kdk_issue" style="background:#b91c1c;color:#fff;font-weight:700">Выписать штраф КДК</button>
        </div>
      </div>

      <div class="panel">
        <h3 style="margin:0 0 10px">🌿 Бонус или корректировка рейтинга Фэйр-плэй (без денежного штрафа)</h3>
        <div class="row" style="gap:10px;flex-wrap:wrap;align-items:flex-end">
          <div style="flex:2;min-width:200px">
            <label class="small muted">Клуб</label>
            <select id="fp_adj_tid" style="width:100%">
              ${targetTeams.map((t: any) => `<option value="${e(t.id)}">${e(t.name)}</option>`).join("")}
            </select>
          </div>
          <div style="flex:1;min-width:120px">
            <label class="small muted">Дельта баллов (−30..+30)</label>
            <input id="fp_adj_delta" type="number" min="-30" max="30" step="0.5" value="3" style="width:100%">
          </div>
          <div style="flex:2;min-width:220px">
            <label class="small muted">Основание</label>
            <input id="fp_adj_reason" type="text" value="Образцовое поведение команды и поддержка Фэйр-плэй" style="width:100%">
          </div>
          <button type="button" class="btn" id="btn_fp_adj">Применить к Фэйр-плэй</button>
        </div>
      </div>

      <div class="panel">
        <div class="row sp" style="margin-bottom:10px;flex-wrap:wrap;gap:8px">
          <h3 style="margin:0">Таблица Фэйр-плэй лиги</h3>
          <span class="small muted">Сводный рейтинг честной игры и штрафов</span>
        </div>
        ${renderFairPlayTableHtml(standings, e)}
      </div>

      <div class="panel">
        <div class="row sp" style="margin-bottom:10px;flex-wrap:wrap;gap:8px">
          <h3 style="margin:0">Журнал решений КДК (${recentFines.length})</h3>
          <span class="small muted">Ошибочный штраф можно отменить с возвратом суммы на счёт клуба</span>
        </div>
        <div class="wrap">
          <table style="font-size:12.5px;font-variant-numeric:tabular-nums">
            <thead>
              <tr>
                <th class="l">Дата</th>
                <th class="l">Клуб</th>
                <th class="l">Нарушение</th>
                <th>Сумма</th>
                <th>ФП</th>
                <th class="l">Детали</th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              ${recentFines.length ? recentFines.map((fn: any) => `
                <tr class="${fn.revoked ? "kdk-revoked" : ""}">
                  <td class="l small muted" style="white-space:nowrap">${e(fmtDateKdk(fn.issuedAt))}</td>
                  <td class="l"><b>${e(fn.teamName)}</b></td>
                  <td class="l">${e(fn.categoryLabel)}<div class="small muted">${e(fn.article || "")}</div></td>
                  <td style="font-weight:800;color:${fn.revoked ? "var(--muted)" : "#b91c1c"}">${fmtEurKdk(fn.amount)}</td>
                  <td style="font-weight:700">${fn.fairPlayPenalty ? `−${fn.fairPlayPenalty}` : "0"}</td>
                  <td class="l small">${e(fn.reason)}</td>
                  <td>
                    ${fn.revoked
                      ? '<span class="small muted">Отменён</span>'
                      : `<button type="button" class="btn alt sm" data-kdk-revoke="${e(fn.id)}">Отменить</button>`}
                  </td>
                </tr>
              `).join("") : '<tr><td colspan="7" class="empty">Решений КДК в этой лиге пока нет</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;

  let selectedCategory = firstPreset.category;

  ab.querySelectorAll("[data-kdk-comp]").forEach((btn) => {
    btn.addEventListener("click", () => {
      ADMIN_FINES_COMP = (btn as HTMLElement).dataset.kdkComp || "rpl";
      renderAdminFinesTab(ab, ov, onRefreshAdmin);
    });
  });

  ab.querySelectorAll("[data-kdk-preset]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = (btn as HTMLElement).dataset.kdkPreset || "other";
      selectedCategory = cat;
      ab.querySelectorAll("[data-kdk-preset]").forEach((b) => b.classList.remove("on"));
      btn.classList.add("on");
      const p = presets.find((x: any) => x.category === cat);
      if (p) {
        (ab.querySelector("#kdk_amount") as HTMLInputElement).value = String(p.suggestedAmount);
        (ab.querySelector("#kdk_fp_pen") as HTMLInputElement).value = String(p.fairPlayPenalty);
        (ab.querySelector("#kdk_article") as HTMLInputElement).value = String(p.article || "");
        (ab.querySelector("#kdk_reason") as HTMLInputElement).value = String(p.defaultReason || "");
      }
    });
  });

  ab.querySelector("#btn_kdk_issue")?.addEventListener("click", async () => {
    const teamId = (ab.querySelector("#kdk_team_id") as HTMLSelectElement)?.value;
    const amount = Number((ab.querySelector("#kdk_amount") as HTMLInputElement)?.value || 0);
    const fairPlayPenalty = Number((ab.querySelector("#kdk_fp_pen") as HTMLInputElement)?.value || 0);
    const article = (ab.querySelector("#kdk_article") as HTMLInputElement)?.value || "";
    const reason = (ab.querySelector("#kdk_reason") as HTMLInputElement)?.value || "";
    const notifyTg = !!(ab.querySelector("#kdk_tg") as HTMLInputElement)?.checked;

    const r = await act(
      () => api("/admin/fines/issue", { teamId, category: selectedCategory, amount, fairPlayPenalty, article, reason, notifyTg }),
      (d: any) => d?.message || "Штраф выписан"
    );
    if (r) {
      await renderAdminFinesTab(ab, ov, onRefreshAdmin);
      onRefreshAdmin();
    }
  });

  ab.querySelector("#btn_fp_adj")?.addEventListener("click", async () => {
    const teamId = (ab.querySelector("#fp_adj_tid") as HTMLSelectElement)?.value;
    const delta = Number((ab.querySelector("#fp_adj_delta") as HTMLInputElement)?.value || 0);
    const reason = (ab.querySelector("#fp_adj_reason") as HTMLInputElement)?.value || "";
    const r = await act(
      () => api("/admin/fines/fairplay-adjust", { teamId, delta, reason }),
      (d: any) => d?.message || "Рейтинг Фэйр-плэй обновлён"
    );
    if (r) {
      await renderAdminFinesTab(ab, ov, onRefreshAdmin);
    }
  });

  ab.querySelectorAll("[data-kdk-revoke]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = (btn as HTMLElement).dataset.kdkRevoke;
      if (!id) return;
      const r = await act(
        () => api("/admin/fines/revoke", { id, reason: "Апелляция в КДК РФС" }),
        (d: any) => d?.message || "Штраф отменён"
      );
      if (r) {
        await renderAdminFinesTab(ab, ov, onRefreshAdmin);
        onRefreshAdmin();
      }
    });
  });
}

window.__RPL_FINES__ = {
  renderClubFinesTab,
  renderAdminFinesTab,
};
