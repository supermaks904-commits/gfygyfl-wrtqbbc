/* Выездные матчи и логистика клуба: билеты, ж/д и авиаперелёты, гостиница, питание, медицина, чек-лист и дорожные накладки */

declare global {
  interface Window {
    __RPL_LOGISTICS__?: {
      renderClubLogisticsTab: (
        cb: HTMLElement,
        clubData: any,
        onRefreshClub: () => void,
        preselectFixtureId?: string
      ) => Promise<void>;
      openFixtureLogistics?: (fixtureId: string) => void;
    };
  }
}

function ensureLogisticsStyles() {
  if (typeof document === "undefined") return;
  let st = document.getElementById("rpl_logistics_styles") as HTMLStyleElement | null;
  if (!st) {
    st = document.createElement("style");
    st.id = "rpl_logistics_styles";
    document.head.appendChild(st);
  }
  st.textContent = `
    .log-wrap{display:flex;flex-direction:column;gap:16px}
    .log-hero{
      background:linear-gradient(135deg,#0b3b24 0%,#135235 62%,#0f452c 100%);
      color:#ffffff;
      border-radius:14px;
      padding:20px 22px;
      border:1px solid #1d6442;
      display:flex;
      flex-wrap:wrap;
      align-items:center;
      justify-content:space-between;
      gap:16px;
      box-shadow:0 8px 24px rgba(11,59,36,0.12);
    }
    .log-hero-eyebrow{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#a7d7b8;margin-bottom:4px}
    .log-hero-title{font:700 20px Unbounded,sans-serif;margin:0 0 6px;color:#fff;letter-spacing:-0.015em}
    .log-hero-sub{font-size:13px;color:#d6e8dc;line-height:1.5;max-width:64ch}
    .log-hero-kpis{display:flex;gap:10px;flex-wrap:wrap;align-items:stretch}
    .log-kpi{
      background:rgba(255,255,255,0.08);
      border:1px solid rgba(255,255,255,0.16);
      border-radius:10px;
      padding:10px 14px;
      font-variant-numeric:tabular-nums;
      min-width:128px;
      display:flex;
      flex-direction:column;
      justify-content:center;
    }
    .log-kpi-lbl{font-size:11px;color:#bdd8c6;font-weight:500}
    .log-kpi-val{font:700 16px Unbounded,sans-serif;color:#f0c419;margin-top:3px}

    .log-trip-strip{display:grid;grid-template-columns:repeat(auto-fill,minmax(248px,1fr));gap:10px}
    .log-trip-btn{
      text-align:left;
      background:var(--panel);
      border:1px solid var(--line);
      border-radius:11px;
      padding:12px 14px;
      cursor:pointer;
      transition:border-color .15s,background .15s,box-shadow .15s;
      display:flex;
      flex-direction:column;
      gap:7px;
      font-variant-numeric:tabular-nums;
    }
    .log-trip-btn:hover{border-color:var(--green);background:#f9fcfa}
    .log-trip-btn.on{
      border-color:var(--deep);
      border-width:2px;
      background:#f0f8f2;
      box-shadow:0 4px 14px rgba(11,59,36,0.08);
    }
    .log-trip-top{display:flex;align-items:center;justify-content:space-between;gap:8px}
    .log-trip-opp{display:flex;align-items:center;gap:8px;font-weight:700;font-size:14px;color:var(--ink);min-width:0}
    .log-trip-opp img{width:24px;height:24px;object-fit:contain;flex-shrink:0}
    .log-trip-meta{font-size:12px;color:var(--muted);line-height:1.4}
    .log-trip-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;padding-top:6px;border-top:1px solid rgba(0,0,0,0.06);font-size:12px}
    .log-status-ok{font-weight:700;color:#15803d}
    .log-status-warn{font-weight:700;color:#b91c1c}
    .log-status-inc{font-weight:700;color:#b45309}

    .log-brief{
      background:var(--panel);
      border:1px solid var(--line);
      border-radius:12px;
      padding:16px 18px;
      display:flex;
      flex-direction:column;
      gap:12px;
      font-variant-numeric:tabular-nums;
    }
    .log-brief-top{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:12px}
    .log-route-title{font:700 17px Onest,sans-serif;color:var(--deep);letter-spacing:-0.01em}
    .log-route-meta{font-size:13px;color:var(--muted);margin-top:4px;line-height:1.4}
    .log-presets{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
    .log-preset-btn{
      background:#f4f7f5;
      color:var(--deep);
      border:1px solid var(--line);
      border-radius:8px;
      padding:7px 12px;
      font-size:12.5px;
      font-weight:700;
      cursor:pointer;
      transition:background .15s,border-color .15s;
    }
    .log-preset-btn:hover{background:#e5f2ea;border-color:var(--green)}

    .log-sky-banner{
      border-radius:9px;
      padding:11px 14px;
      border:1px solid;
      display:flex;
      flex-wrap:wrap;
      justify-content:space-between;
      align-items:center;
      gap:10px;
      font-size:12.5px;
      line-height:1.45;
    }
    .log-sky-banner.clear{background:#f2faf5;border-color:#bfe3cc;color:#14532d}
    .log-sky-banner.caution{background:#fffbeb;border-color:#fde68a;color:#78350f}
    .log-sky-banner.high{background:#fef2f2;border-color:#fecaca;color:#7f1d1d}
    .log-sky-title{font-weight:800;font-size:13px;margin-bottom:2px}

    .log-sec{
      background:var(--panel);
      border:1px solid var(--line);
      border-radius:12px;
      padding:18px;
    }
    .log-sec-head{display:flex;justify-content:space-between;align-items:baseline;gap:10px;margin-bottom:13px;flex-wrap:wrap;padding-bottom:9px;border-bottom:1px solid var(--line)}
    .log-sec-title{font:700 15px Onest,sans-serif;color:var(--deep);margin:0}
    .log-sec-hint{font-size:12.5px;color:var(--muted)}
    .log-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:10px}
    .log-grid-2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
    @media(max-width:780px){.log-grid-2{grid-template-columns:minmax(0,1fr)}}

    .log-opt{
      text-align:left;
      background:#ffffff;
      border:1px solid var(--line);
      border-radius:10px;
      padding:12px 14px;
      cursor:pointer;
      transition:border-color .15s,background .15s,box-shadow .15s;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      gap:8px;
      font-variant-numeric:tabular-nums;
      position:relative;
    }
    .log-opt:hover:not(:disabled){border-color:var(--green);background:#f8fcf9}
    .log-opt.on{
      border-color:var(--green);
      border-width:2px;
      background:#eff8f2;
      box-shadow:0 2px 10px rgba(22,122,68,0.08);
    }
    .log-opt:disabled{opacity:.52;cursor:not-allowed;background:#f7f8f7}
    .log-opt-row{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
    .log-opt-name{font-weight:700;font-size:13.5px;color:var(--ink);line-height:1.35}
    .log-opt-price{font-weight:800;font-size:13.5px;color:var(--deep);white-space:nowrap;flex-shrink:0}
    .log-opt-rec{font-size:11px;font-weight:700;color:#15803d;margin-top:2px}
    .log-opt-sub{font-size:12px;color:var(--muted);line-height:1.45}
    .log-opt-stats{
      font-size:11.5px;
      color:var(--ink);
      opacity:.88;
      display:flex;
      gap:8px;
      flex-wrap:wrap;
      padding-top:7px;
      border-top:1px solid rgba(0,0,0,0.06);
      align-items:center;
    }
    .log-safe-txt{color:#15803d;font-weight:700}
    .log-air-txt{color:#b45309;font-weight:600}

    .log-checklist{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}
    @media(max-width:680px){.log-checklist{grid-template-columns:minmax(0,1fr)}}
    .log-chk{
      display:flex;align-items:center;gap:10px;
      padding:10px 13px;border:1px solid var(--line);border-radius:9px;background:#fff;cursor:pointer;font-size:13px;color:var(--ink);
      transition:border-color .15s,background .15s;
    }
    .log-chk:hover{border-color:var(--green);background:#f9fcfa}
    .log-chk input{width:17px;height:17px;accent-color:var(--green);margin:0;flex-shrink:0}

    .log-inc-box{
      background:#fffbeb;
      border:1px solid #f59e0b;
      border-radius:11px;
      padding:14px 16px;
      display:flex;
      flex-wrap:wrap;
      align-items:center;
      justify-content:space-between;
      gap:12px;
    }
    .log-inc-box.resolved{background:#f0fdf4;border-color:#86efac}

    .log-footer-bar{
      background:linear-gradient(135deg,#0b3b24 0%,#124e32 100%);
      color:#fff;
      border-radius:12px;
      padding:18px 20px;
      display:flex;
      flex-direction:column;
      gap:14px;
      font-variant-numeric:tabular-nums;
      box-shadow:0 8px 20px rgba(11,59,36,0.14);
    }
    .log-footer-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px}
    .log-footer-metrics{display:flex;gap:20px;flex-wrap:wrap;align-items:center}
    .log-fm-lbl{font-size:11px;color:#b8d4c2}
    .log-fm-val{font-weight:800;font-size:16px;color:#fff;margin-top:2px}
    .log-meter-row{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding-top:10px;border-top:1px solid rgba(255,255,255,0.14)}
    .log-meter-track{flex:1;min-width:180px;height:7px;background:rgba(255,255,255,0.16);border-radius:999px;overflow:hidden}
    .log-meter-fill{height:100%;border-radius:999px;transition:width .2s ease}
    .log-breakdown{font-size:12px;color:#cce3d4}
  `;
}

function fmtEuro(n: number): string {
  const v = Math.round(Number(n || 0));
  return v < 0 ? "-€" + Math.abs(v).toLocaleString("ru-RU") : "€" + v.toLocaleString("ru-RU");
}

function fmtDateRu(d?: string): string {
  if (!d) return "—";
  const m = String(d).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return d;
  return `${m[3]}.${m[2]}.${m[1]}`;
}

function roundMoneyClient(n: number): number {
  return Math.max(0, Math.round(n / 100) * 100);
}

function computeClientPreview(catalog: any, sel: any, incident: any) {
  const tr = (catalog.transportOptions || []).find((x: any) => x.id === sel.transport) || catalog.transportOptions[0];
  const del = (catalog.delegationOptions || []).find((x: any) => x.id === sel.delegation) || catalog.delegationOptions[0];
  const hot = (catalog.hotelOptions || []).find((x: any) => x.id === sel.hotel) || catalog.hotelOptions[0];
  const arr = (catalog.arrivalOptions || []).find((x: any) => x.id === sel.arrival) || catalog.arrivalOptions[0];
  const cat = (catalog.cateringOptions || []).find((x: any) => x.id === sel.catering) || catalog.cateringOptions[0];
  const med = (catalog.medicalOptions || []).find((x: any) => x.id === sel.medical) || catalog.medicalOptions[0];
  const loc = (catalog.localTransferOptions || []).find((x: any) => x.id === sel.localTransfer) || catalog.localTransferOptions[0];
  const trn = (catalog.trainingPitchOptions || []).find((x: any) => x.id === sel.trainingPitch) || catalog.trainingPitchOptions[0];
  const ins = (catalog.insuranceOptions || []).find((x: any) => x.id === sel.insurance) || catalog.insuranceOptions[0];

  const transportCost = roundMoneyClient(tr?.cost || 0);
  const hotelCost = roundMoneyClient((hot?.baseCost || 0) * (arr?.hotelMultiplier || 1));
  const extrasCost = roundMoneyClient(
    (del?.cost || 0) + (cat?.cost || 0) + (med?.cost || 0) + (loc?.cost || 0) + (trn?.cost || 0) + (ins?.cost || 0)
  );
  const totalCost = roundMoneyClient(transportCost + hotelCost + extrasCost);

  const kp = sel.kitPrep || {};
  const kitItems = [kp.reserveKit !== false, kp.weatherGear !== false, kp.studsCheck !== false, kp.docsVerified !== false];
  const missingKit = kitItems.filter((v) => !v).length;

  let tzPenaltyEnergy = 0;
  let tzPenaltyPower = 0;
  if ((catalog.timezoneShiftH || 0) >= 2 && sel.arrival !== "minus_2") {
    tzPenaltyEnergy = sel.arrival === "matchday" ? -4 : -2;
    tzPenaltyPower = sel.arrival === "matchday" ? -0.15 : -0.06;
  }

  let riskPercent =
    (tr?.riskPercent || 0) +
    (hot?.riskPercent || 0) +
    (cat?.riskPercent || 0) +
    (loc?.riskPercent || 0) +
    missingKit * 6;
  riskPercent = Math.round(Math.max(1, Math.min(75, riskPercent * (1 - (ins?.riskReduction || 0) / 100))));

  let energyDelta =
    (tr?.energyImpact || 0) +
    (hot?.energyImpact || 0) +
    (arr?.energyImpact || 0) +
    (cat?.energyImpact || 0) +
    (med?.energyImpact || 0) +
    tzPenaltyEnergy -
    (missingKit > 0 ? 1 : 0);

  let powerMod =
    (tr?.powerImpact || 0) +
    (del?.powerImpact || 0) +
    (hot?.powerImpact || 0) +
    (arr?.powerImpact || 0) +
    (loc?.powerImpact || 0) +
    (trn?.powerImpact || 0) +
    tzPenaltyPower -
    missingKit * 0.04;

  if (incident && !incident.resolved) {
    energyDelta -= Number(incident.energyPenalty || 0);
    powerMod -= Number(incident.powerPenalty || 0);
  }

  energyDelta = Math.max(-12, Math.min(5, Math.round(energyDelta)));
  powerMod = +Math.max(-0.55, Math.min(0.38, powerMod)).toFixed(2);
  const readinessScore = Math.max(25, Math.min(100, Math.round(74 + energyDelta * 2.2 + powerMod * 28 - missingKit * 4)));

  return {
    transportCost,
    hotelCost,
    extrasCost,
    totalCost,
    readinessScore,
    energyDelta,
    powerMod,
    travelHours: tr?.travelHours || 1,
    riskPercent,
  };
}

function buildPresetSelection(catalog: any, preset: "economy" | "optimum" | "premium"): any {
  const availTr = (catalog.transportOptions || []).filter((x: any) => x.available !== false);
  const pickTr = (ids: string[]) => {
    for (const id of ids) {
      const f = availTr.find((x: any) => x.id === id);
      if (f) return f.id;
    }
    return availTr[0]?.id || "bus";
  };

  if (preset === "economy") {
    return {
      transport: pickTr(["local_bus", "bus", "train_coupe", "flight_regular"]),
      delegation: "base",
      hotel: "economy_3",
      arrival: "matchday",
      catering: "hotel_buffet",
      medical: "standard_kit",
      localTransfer: "rented_bus",
      trainingPitch: "none",
      insurance: "none",
      kitPrep: { reserveKit: true, weatherGear: true, studsCheck: true, docsVerified: true },
    };
  }
  if (preset === "premium") {
    return {
      transport: pickTr(["local_camp", "flight_charter", "flight_comfort", "train_sv"]),
      delegation: "fan_support",
      hotel: "resort_5",
      arrival: catalog.isSameCity
        ? "minus_1"
        : catalog.timezoneShiftH >= 2 || catalog.distKm >= 1300
          ? "minus_2"
          : "minus_1",
      catering: "club_chef",
      medical: "physio_mobile",
      localTransfer: "escort",
      trainingPitch: "rent_pitch",
      insurance: "backup_plan",
      kitPrep: { reserveKit: true, weatherGear: true, studsCheck: true, docsVerified: true },
    };
  }
  // optimum
  return {
    transport: pickTr(
      catalog.skyStatus?.level === "high"
        ? ["local_bus", "train_sv", "train_coupe", "flight_comfort", "flight_regular", "bus"]
        : ["local_bus", "train_sv", "flight_comfort", "train_coupe", "flight_regular", "bus"]
    ),
    delegation: "extended",
    hotel: "business_4",
    arrival: catalog.isSameCity
      ? "matchday"
      : catalog.timezoneShiftH >= 2 || catalog.distKm >= 1500
        ? "minus_2"
        : "minus_1",
    catering: "sport_menu",
    medical: "physio_mobile",
    localTransfer: "rented_bus",
    trainingPitch: "rent_pitch",
    insurance: "backup_plan",
    kitPrep: { reserveKit: true, weatherGear: true, studsCheck: true, docsVerified: true },
  };
}

let activeSelectedFixtureId = "";

async function renderClubLogisticsTab(
  cb: HTMLElement,
  _clubData: any,
  onRefreshClub: () => void,
  preselectFixtureId?: string
) {
  ensureLogisticsStyles();
  const app = window.__RPL_APP__;
  if (!app) {
    cb.innerHTML = '<div class="panel warn">Модуль логистики не подключён к ядру приложения</div>';
    return;
  }
  const { api, act, e, S } = app;
  const isAdmin = S.me?.role === "admin";
  const tid = app.getClubTid ? app.getClubTid() : "";
  const q = isAdmin && tid ? `?teamId=${encodeURIComponent(tid)}` : "";
  const withT = (obj: any) => (isAdmin && tid ? { ...obj, teamId: tid } : obj);

  cb.innerHTML = '<div class="panel muted">Загружаем расписание выездов, тарифы билетов и гостиниц…</div>';

  let data: any;
  try {
    data = await api(`/club/logistics${q}`);
  } catch (err: any) {
    cb.innerHTML = `
      <div class="panel">
        <div style="color:#991b1b;font-weight:700;margin-bottom:8px">Не удалось загрузить логистику выездов: ${e(err?.message || "ошибка сети")}</div>
        <button type="button" class="btn sm" id="btn_log_retry">Повторить</button>
      </div>`;
    cb.querySelector("#btn_log_retry")?.addEventListener("click", () =>
      renderClubLogisticsTab(cb, _clubData, onRefreshClub, preselectFixtureId)
    );
    return;
  }

  const trips: any[] = Array.isArray(data?.trips) ? data.trips : [];
  if (!trips.length) {
    cb.innerHTML = `
      <div class="log-wrap">
        <div class="log-hero">
          <div>
            <div class="log-hero-eyebrow">Штаб команды и операционный центр</div>
            <h2 class="log-hero-title">Выездные матчи и логистика</h2>
            <div class="log-hero-sub">Здесь начальник команды организует ж/д и авиабилеты, гостиницы, питание, сопровождение и предматчевую подготовку к гостевым и нейтральным матчам.</div>
          </div>
          <div class="log-kpi">
            <div class="log-kpi-lbl">Баланс клуба</div>
            <div class="log-kpi-val">${e(data?.team?.formattedBudget || fmtEuro(data?.team?.budget || 0))}</div>
          </div>
        </div>
        <div class="panel empty">
          Ближайших выездных матчей в календаре пока нет — ближайшие игры пройдут дома или расписание ещё не сформировано.
        </div>
      </div>`;
    return;
  }

  if (preselectFixtureId && trips.some((t) => t.fixture.id === preselectFixtureId)) {
    activeSelectedFixtureId = preselectFixtureId;
  } else if (!activeSelectedFixtureId || !trips.some((t) => t.fixture.id === activeSelectedFixtureId)) {
    const firstUnplanned = trips.find((t) => !t.organized);
    activeSelectedFixtureId = (firstUnplanned || trips[0]).fixture.id;
  }

  const draftByFixture: Record<string, any> = {};
  for (const t of trips) {
    draftByFixture[t.fixture.id] = JSON.parse(JSON.stringify(t.saved?.selection || t.defaultSelection));
  }

  const renderUI = () => {
    const trip = trips.find((t) => t.fixture.id === activeSelectedFixtureId) || trips[0];
    const f = trip.fixture;
    const cat = trip.catalog;
    const sky = cat.skyStatus || { level: "clear", headline: "Небо открыто", detail: "" };
    const sel = draftByFixture[f.id];
    const saved = trip.saved;
    const incident = saved?.incident || null;
    const prevPaid = Number(saved?.paidAmount || 0);
    const ev = computeClientPreview(cat, sel, incident);
    const deltaCost = ev.totalCost - prevPaid;
    const curBudget = Number(data?.team?.budget || 0);
    const cantAfford = deltaCost > 0 && curBudget < deltaCost;

    const readinessColor = ev.readinessScore >= 82 ? "#4ade80" : ev.readinessScore >= 64 ? "#fde047" : "#fca5a5";
    const effSign = ev.energyDelta > 0 ? "+" : "";

    const renderTripCard = (item: any) => {
      const fx = item.fixture;
      const isOn = fx.id === f.id;
      const hasInc = !!(item.saved?.incident && !item.saved.incident.resolved);
      const skyLvl = item.catalog?.skyStatus?.level;
      const statusHtml = hasInc
        ? `<span class="log-status-inc">Накладка · ${item.saved.readinessScore}%</span>`
        : item.organized
          ? `<span class="log-status-ok">Готовность ${item.saved.readinessScore}%</span>`
          : `<span class="log-status-warn">Не оформлен · риск ТН 0:3 и штрафа</span>`;
      const corridorNote = !item.catalog?.destAirport
        ? "Аэропорт закрыт"
        : skyLvl === "high"
          ? "Риск «Ковёр»/погода"
          : skyLvl === "caution"
            ? "Осторожно: авиа"
            : "Дорога открыта";
      return `
        <button type="button" class="log-trip-btn ${isOn ? "on" : ""}" data-log-pick="${e(fx.id)}">
          <div class="log-trip-top">
            <div class="log-trip-opp">
              ${fx.oppLogo ? `<img src="${e(fx.oppLogo)}" alt=""/>` : ""}
              <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${e(fx.oppName)}</span>
            </div>
            <span class="small muted">${e(fmtDateRu(fx.gameDate || fx.date))}</span>
          </div>
          <div class="log-trip-meta">
            ${e(item.catalog.destCity)} · ${item.catalog.distKm} км${item.catalog.timezoneShiftH ? ` · +${item.catalog.timezoneShiftH} ч` : ""} · ${e(fx.compName || fx.comp)}
          </div>
          <div class="log-trip-foot">
            ${statusHtml}
            <span class="small muted">${corridorNote}</span>
          </div>
        </button>`;
    };

    cb.innerHTML = `
      <div class="log-wrap">
        <div class="log-hero">
          <div>
            <div class="log-hero-eyebrow">Логистика выездов · ${e(data.team.name)}</div>
            <h2 class="log-hero-title">Выездные матчи и командировки</h2>
            <div class="log-hero-sub">Выбирайте поезда или авиарейсы с учётом реальной воздушной обстановки (план «Ковёр», погода), бронируйте гостиницу, время заезда, питание и эскорт до арены.</div>
          </div>
          <div class="log-hero-kpis">
            <div class="log-kpi">
              <div class="log-kpi-lbl">База клуба</div>
              <div class="log-kpi-val" style="color:#fff">${e(data.team.city)}</div>
            </div>
            <div class="log-kpi">
              <div class="log-kpi-lbl">Открытые выезды</div>
              <div class="log-kpi-val" style="color:${data.unplannedCount > 0 ? "#fca5a5" : "#86efac"}">${data.unplannedCount} из ${trips.length}</div>
            </div>
            <div class="log-kpi">
              <div class="log-kpi-lbl">Баланс клуба</div>
              <div class="log-kpi-val">${e(data.team.formattedBudget)}</div>
            </div>
          </div>
        </div>

        <div class="log-trip-strip">
          ${trips.map(renderTripCard).join("")}
        </div>

        <div class="log-brief">
          <div class="log-brief-top">
            <div style="min-width:240px">
              <div class="log-route-title">
                ${e(cat.originCity)} → ${e(cat.destCity)} · ${trip.role === "neutral" ? "Нейтральное поле" : "Выезд"} против «${e(f.oppName)}»
              </div>
              <div class="log-route-meta">
                ${e(cat.destStadium)} · ${cat.distKm} км${cat.timezoneShiftH ? ` · разница поясов ${cat.timezoneShiftH} ч` : ""} · Матч: ${e(fmtDateRu(f.gameDate || f.date))} ${e(f.gameTime || f.time || "")}
              </div>
              ${f.weatherShort ? `<div class="small" style="margin-top:4px;color:var(--ink)">Погода в городе матча: <b>${e(f.weather || f.weatherShort)}</b></div>` : ""}
            </div>
            <div class="log-presets">
              <span class="small muted" style="font-weight:600;margin-right:2px">Быстрая смета:</span>
              <button type="button" class="log-preset-btn" data-log-preset="economy">Эконом</button>
              <button type="button" class="log-preset-btn" data-log-preset="optimum">Оптимум</button>
              <button type="button" class="log-preset-btn" data-log-preset="premium">Премиум / Чартер</button>
            </div>
          </div>

          <div class="log-sky-banner ${e(sky.level || "clear")}">
            <div style="flex:1;min-width:240px">
              <div class="log-sky-title">${e(sky.headline)}</div>
              <div>${e(sky.detail)}</div>
            </div>
            <div style="font-weight:700;white-space:nowrap">
              ${cat.canUseRail ? "Ж/д пути открыты · без лимита км" : "Только авиаперелёт"}
            </div>
          </div>
        </div>

        ${incident ? `
          <div class="log-inc-box ${incident.resolved ? "resolved" : ""}">
            <div style="flex:1;min-width:240px">
              <div style="font-weight:800;font-size:14px;color:${incident.resolved ? "#166534" : "#9a3412"}">
                ${incident.resolved ? "✅ Дорожная накладка устранена: " : "⚠ Дорожная накладка: "}${e(incident.title)}
              </div>
              <div class="small" style="margin-top:3px;color:var(--ink);line-height:1.45">
                ${e(incident.description)}${!incident.resolved ? ` (штраф без вмешательства: −${incident.energyPenalty}% свежести)` : ""}
              </div>
            </div>
            ${!incident.resolved ? `
              <button type="button" class="btn sm" id="btn_log_resolve_inc" style="background:#b45309;color:#fff;white-space:nowrap">
                ${e(incident.fixLabel)} (−${fmtEuro(incident.fixCost)})
              </button>` : ""}
          </div>
        ` : ""}

        <div class="log-sec">
          <div class="log-sec-head">
            <h3 class="log-sec-title">01. Билеты, транспорт и делегация</h3>
            <span class="log-sec-hint">Дистанция ${cat.distKm} км · поезда идут по любым открытым ж/д путям, самолёты зависят от неба</span>
          </div>
          <div class="log-grid">
            ${cat.transportOptions.map((o: any) => `
              <button type="button" class="log-opt ${sel.transport === o.id ? "on" : ""}" data-opt-group="transport" data-opt-val="${e(o.id)}" ${o.available === false ? "disabled" : ""}>
                <div>
                  <div class="log-opt-row">
                    <div>
                      <div class="log-opt-name">${e(o.label)}</div>
                      ${o.recommended ? `<div class="log-opt-rec">Оптимальный выбор под маршрут</div>` : ""}
                    </div>
                    <span class="log-opt-price">${fmtEuro(o.cost)}</span>
                  </div>
                  <div class="log-opt-sub" style="margin-top:5px">${e(o.available === false && o.disabledReason ? o.disabledReason : o.subtitle)}</div>
                </div>
                <div class="log-opt-stats">
                  <span>~${o.travelHours} ч в пути</span>
                  <span>·</span>
                  <span>Свежесть: ${o.energyImpact >= 0 ? "+" : ""}${o.energyImpact}%</span>
                  <span>·</span>
                  ${o.railSafe
                    ? `<span class="log-safe-txt">0% риска от «Ковра»</span>`
                    : o.airAffected && sky.airRiskBonus > 0
                      ? `<span class="log-air-txt">Риск сбоя: ${o.riskPercent}%</span>`
                      : `<span>Риск сбоя: ${o.riskPercent}%</span>`}
                </div>
              </button>
            `).join("")}
          </div>

          <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--line)">
            <div class="small" style="font-weight:700;margin-bottom:8px;color:var(--deep)">Квота билетов делегации и гостевой сектор</div>
            <div class="log-grid">
              ${cat.delegationOptions.map((o: any) => `
                <button type="button" class="log-opt ${sel.delegation === o.id ? "on" : ""}" data-opt-group="delegation" data-opt-val="${e(o.id)}">
                  <div>
                    <div class="log-opt-row">
                      <span class="log-opt-name">${e(o.label)}</span>
                      <span class="log-opt-price">${o.cost > 0 ? fmtEuro(o.cost) : "Включено"}</span>
                    </div>
                    <div class="log-opt-sub" style="margin-top:4px">${e(o.subtitle)}</div>
                  </div>
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <div class="log-sec">
          <div class="log-sec-head">
            <h3 class="log-sec-title">02. Гостиница и окно заезда</h3>
            <span class="log-sec-hint">Размещение в г. ${e(cat.destCity)} и время на акклиматизацию</span>
          </div>
          <div class="log-grid">
            ${cat.hotelOptions.map((o: any) => {
              const arrObj = cat.arrivalOptions.find((a: any) => a.id === sel.arrival) || cat.arrivalOptions[0];
              const calcCost = roundMoneyClient(o.baseCost * (arrObj?.hotelMultiplier || 1));
              return `
                <button type="button" class="log-opt ${sel.hotel === o.id ? "on" : ""}" data-opt-group="hotel" data-opt-val="${e(o.id)}">
                  <div>
                    <div class="log-opt-row">
                      <span class="log-opt-name">${e(o.label)}</span>
                      <span class="log-opt-price">${fmtEuro(calcCost)}</span>
                    </div>
                    <div class="log-opt-sub" style="margin-top:4px">${e(o.subtitle)}</div>
                  </div>
                  <div class="log-opt-stats">
                    <span>Сон и тонус: ${o.energyImpact >= 0 ? "+" : ""}${o.energyImpact}%</span>
                    <span>·</span>
                    <span>Риск шума: ${o.riskPercent}%</span>
                  </div>
                </button>`;
            }).join("")}
          </div>

          <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--line)">
            <div class="small" style="font-weight:700;margin-bottom:8px;color:var(--deep)">График заезда команды</div>
            <div class="log-grid">
              ${cat.arrivalOptions.map((o: any) => `
                <button type="button" class="log-opt ${sel.arrival === o.id ? "on" : ""}" data-opt-group="arrival" data-opt-val="${e(o.id)}">
                  <div>
                    <div class="log-opt-row">
                      <div>
                        <span class="log-opt-name">${e(o.label)}</span>
                        ${o.recommended ? `<div class="log-opt-rec">Рекомендуется по дистанции</div>` : ""}
                      </div>
                      <span class="log-opt-price">×${o.hotelMultiplier} к отелю</span>
                    </div>
                    <div class="log-opt-sub" style="margin-top:4px">${e(o.subtitle)}</div>
                  </div>
                  <div class="log-opt-stats">
                    <span>Свежесть: ${o.energyImpact >= 0 ? "+" : ""}${o.energyImpact}%</span>
                  </div>
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <div class="log-grid-2">
          <div class="log-sec">
            <div class="log-sec-head">
              <h3 class="log-sec-title">03. Питание и медицина</h3>
              <span class="log-sec-hint">Рацион и восстановление мышц</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:8px">
              ${cat.cateringOptions.map((o: any) => `
                <button type="button" class="log-opt ${sel.catering === o.id ? "on" : ""}" data-opt-group="catering" data-opt-val="${e(o.id)}">
                  <div class="log-opt-row">
                    <span class="log-opt-name">${e(o.label)}</span>
                    <span class="log-opt-price">${o.cost > 0 ? fmtEuro(o.cost) : "€0"}</span>
                  </div>
                  <div class="log-opt-sub">${e(o.subtitle)}</div>
                </button>
              `).join("")}
              <div style="border-top:1px solid var(--line);margin:4px 0"></div>
              ${cat.medicalOptions.map((o: any) => `
                <button type="button" class="log-opt ${sel.medical === o.id ? "on" : ""}" data-opt-group="medical" data-opt-val="${e(o.id)}">
                  <div class="log-opt-row">
                    <span class="log-opt-name">${e(o.label)}</span>
                    <span class="log-opt-price">${o.cost > 0 ? fmtEuro(o.cost) : "€0"}</span>
                  </div>
                  <div class="log-opt-sub">${e(o.subtitle)}</div>
                </button>
              `).join("")}
            </div>
          </div>

          <div class="log-sec">
            <div class="log-sec-head">
              <h3 class="log-sec-title">04. Трансфер на месте, поле и страховка</h3>
              <span class="log-sec-hint">Логистика в городе матча</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:8px">
              ${cat.localTransferOptions.map((o: any) => `
                <button type="button" class="log-opt ${sel.localTransfer === o.id ? "on" : ""}" data-opt-group="localTransfer" data-opt-val="${e(o.id)}">
                  <div class="log-opt-row">
                    <span class="log-opt-name">${e(o.label)}</span>
                    <span class="log-opt-price">${fmtEuro(o.cost)}</span>
                  </div>
                  <div class="log-opt-sub">${e(o.subtitle)}</div>
                </button>
              `).join("")}
              ${cat.trainingPitchOptions.map((o: any) => `
                <button type="button" class="log-opt ${sel.trainingPitch === o.id ? "on" : ""}" data-opt-group="trainingPitch" data-opt-val="${e(o.id)}">
                  <div class="log-opt-row">
                    <span class="log-opt-name">${e(o.label)}</span>
                    <span class="log-opt-price">${o.cost > 0 ? fmtEuro(o.cost) : "€0"}</span>
                  </div>
                  <div class="log-opt-sub">${e(o.subtitle)}</div>
                </button>
              `).join("")}
              ${cat.insuranceOptions.map((o: any) => `
                <button type="button" class="log-opt ${sel.insurance === o.id ? "on" : ""}" data-opt-group="insurance" data-opt-val="${e(o.id)}">
                  <div class="log-opt-row">
                    <span class="log-opt-name">${e(o.label)}</span>
                    <span class="log-opt-price">${o.cost > 0 ? fmtEuro(o.cost) : "€0"}</span>
                  </div>
                  <div class="log-opt-sub">${e(o.subtitle)}</div>
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <div class="log-sec">
          <div class="log-sec-head">
            <h3 class="log-sec-title">05. Чек-лист начальника команды и инвентарь</h3>
            <span class="log-sec-hint">Пропущенный пункт повышает риск накладки и снижает готовность</span>
          </div>
          <div class="log-checklist">
            <label class="log-chk">
              <input type="checkbox" data-log-chk="reserveKit" ${sel.kitPrep?.reserveKit !== false ? "checked" : ""}/>
              <span>Два комплекта формы (основа + резерв под цвета хозяев)</span>
            </label>
            <label class="log-chk">
              <input type="checkbox" data-log-chk="weatherGear" ${sel.kitPrep?.weatherGear !== false ? "checked" : ""}/>
              <span>Термобельё, накидки и дождевики под прогноз погоды</span>
            </label>
            <label class="log-chk">
              <input type="checkbox" data-log-chk="studsCheck" ${sel.kitPrep?.studsCheck !== false ? "checked" : ""}/>
              <span>Сменные шипы SG/FG под состояние газона арены</span>
            </label>
            <label class="log-chk">
              <input type="checkbox" data-log-chk="docsVerified" ${sel.kitPrep?.docsVerified !== false ? "checked" : ""}/>
              <span>Паспорта делегации, заявочные листы и допуски РФС</span>
            </label>
          </div>
        </div>

        <div class="log-footer-bar">
          <div class="log-footer-top">
            <div class="log-footer-metrics">
              <div>
                <div class="log-fm-lbl">Готовность выезда</div>
                <div class="log-fm-val" style="color:${readinessColor}">${ev.readinessScore}/100</div>
              </div>
              <div>
                <div class="log-fm-lbl">Эффект на свежесть</div>
                <div class="log-fm-val">${effSign}${ev.energyDelta}%</div>
              </div>
              <div>
                <div class="log-fm-lbl">В дороге</div>
                <div class="log-fm-val">~${ev.travelHours} ч</div>
              </div>
              <div>
                <div class="log-fm-lbl">Риск сбоя</div>
                <div class="log-fm-val">${ev.riskPercent}%</div>
              </div>
              <div>
                <div class="log-fm-lbl">${saved ? "Новая смета / Доплата" : "Итоговая смета"}</div>
                <div class="log-fm-val" style="color:#f0c419">
                  ${fmtEuro(ev.totalCost)}${saved ? ` (${deltaCost >= 0 ? "+" : ""}${fmtEuro(deltaCost)})` : ""}
                </div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
              ${cantAfford ? `<span class="small" style="color:#fca5a5;font-weight:700">Не хватает ${fmtEuro(deltaCost - curBudget)}</span>` : ""}
              <button type="button" class="btn" id="btn_log_save" style="background:var(--yellow);color:var(--deep);font-weight:800;padding:11px 20px;border-radius:9px" ${cantAfford ? "disabled" : ""}>
                ${saved ? (deltaCost === 0 ? "Обновить план выезда" : deltaCost > 0 ? `Доплатить ${fmtEuro(deltaCost)} и сохранить` : `Сохранить (возврат ${fmtEuro(Math.abs(deltaCost))})`) : `Оплатить ${fmtEuro(ev.totalCost)} и утвердить выезд`}
              </button>
            </div>
          </div>
          <div class="log-meter-row">
            <div class="log-breakdown">
              Билеты и дорога: <b>${fmtEuro(ev.transportCost)}</b> · Отель: <b>${fmtEuro(ev.hotelCost)}</b> · Штаб, питание и сервисы: <b>${fmtEuro(ev.extrasCost)}</b>
            </div>
            <div class="log-meter-track" title="Готовность выезда: ${ev.readinessScore}%">
              <div class="log-meter-fill" style="width:${ev.readinessScore}%;background:${readinessColor}"></div>
            </div>
          </div>
        </div>

        ${Array.isArray(data.recentLogs) && data.recentLogs.length ? `
          <div class="panel" style="margin-top:2px">
            <h3 style="margin:0 0 10px">Журнал оформленных выездов (${data.recentLogs.length})</h3>
            <div class="wrap">
              <table>
                <thead>
                  <tr>
                    <th class="l">Маршрут</th>
                    <th>Дистанция</th>
                    <th>Готовность</th>
                    <th>Бюджет</th>
                    <th class="l">План логистики</th>
                  </tr>
                </thead>
                <tbody>
                  ${data.recentLogs.map((r: any) => `
                    <tr>
                      <td class="l"><b>${e(r.originCity)} → ${e(r.destCity)}</b></td>
                      <td>${r.distKm} км</td>
                      <td style="font-weight:700;color:${r.readinessScore >= 80 ? "#15803d" : r.readinessScore >= 60 ? "#b45309" : "#b91c1c"}">${r.readinessScore}%</td>
                      <td style="font-weight:700">${fmtEuro(r.paidAmount)}</td>
                      <td class="l small">${e(r.summaryLine)}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        ` : ""}
      </div>`;

    cb.querySelectorAll("[data-log-pick]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeSelectedFixtureId = (btn as HTMLElement).dataset.logPick || "";
        renderUI();
      });
    });

    cb.querySelectorAll("[data-log-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const preset = (btn as HTMLElement).dataset.logPreset as "economy" | "optimum" | "premium";
        draftByFixture[f.id] = buildPresetSelection(cat, preset);
        renderUI();
      });
    });

    cb.querySelectorAll("[data-opt-group]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const el = btn as HTMLElement;
        const grp = el.dataset.optGroup;
        const val = el.dataset.optVal;
        if (!grp || !val) return;
        draftByFixture[f.id][grp] = val;
        renderUI();
      });
    });

    cb.querySelectorAll("[data-log-chk]").forEach((inp) => {
      inp.addEventListener("change", () => {
        const el = inp as HTMLInputElement;
        const k = el.dataset.logChk;
        if (!k) return;
        if (!draftByFixture[f.id].kitPrep) draftByFixture[f.id].kitPrep = {};
        draftByFixture[f.id].kitPrep[k] = el.checked;
        renderUI();
      });
    });

    cb.querySelector("#btn_log_save")?.addEventListener("click", async () => {
      const r = await act(
        () => api("/club/logistics/save", withT({ fixtureId: f.id, selection: draftByFixture[f.id] })),
        (d: any) => d?.message || "Выездная логистика сохранена!"
      );
      if (r) {
        await renderClubLogisticsTab(cb, _clubData, onRefreshClub, f.id);
        onRefreshClub();
      }
    });

    cb.querySelector("#btn_log_resolve_inc")?.addEventListener("click", async () => {
      const r = await act(
        () => api("/club/logistics/resolve-incident", withT({ fixtureId: f.id })),
        (d: any) => d?.message || "Накладка устранена!"
      );
      if (r) {
        await renderClubLogisticsTab(cb, _clubData, onRefreshClub, f.id);
        onRefreshClub();
      }
    });
  };

  renderUI();
}

window.__RPL_LOGISTICS__ = {
  renderClubLogisticsTab,
};
