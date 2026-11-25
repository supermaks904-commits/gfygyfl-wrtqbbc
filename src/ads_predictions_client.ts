/* Adsgram monetization, Sponsors + RFS Bonus, Friendly Ad Gates, Telegram Leaderboard Identity, Multi-Market Matchday Predictions League, and National Team Proposals */

interface AppBridge {
  api: (path: string, body?: any) => Promise<any>;
  act: (fn: () => Promise<any>, okMsg?: string | ((d: any) => string)) => Promise<any>;
  e: (s: any) => string;
  toast: (msg: string, isErr?: boolean) => void;
  modal: (html: string, mount?: (el: HTMLElement, close: () => void) => void) => void;
  S: { tok: string; code: string; me: any; st: any };
  teamName: (id: string) => string;
  teamLogo: (id: string) => string;
  compName: (id: string) => string;
  pgClub: (app: HTMLElement) => Promise<void>;
  pgNational: (app: HTMLElement) => Promise<void>;
  pgAdmin: (app: HTMLElement) => Promise<void>;
  getClubTid: () => string;
}

declare global {
  interface Window {
    __RPL_APP__?: AppBridge;
    __TG_USER__?: {
      tgId?: string;
      displayName?: string;
      username?: string;
      photoUrl?: string;
      verified?: boolean;
      linkedTeamId?: string | null;
    } | null;
    Adsgram?: {
      init: (opts: { blockId: string; debug?: boolean; debugConsole?: boolean }) => {
        show: () => Promise<{ done?: boolean; error?: boolean; state?: string; description?: string }>;
        addEventListener?: (event: string, cb: (e?: any) => void) => void;
        removeEventListener?: (event: string, cb: (e?: any) => void) => void;
        destroy?: () => void;
      };
    };
    Telegram?: any;
    __RPL_EXT__?: any;
  }
}

function ensureExtStyles() {
  if (typeof document === 'undefined') return;
  let st = document.getElementById('rpl_ext_styles') as HTMLStyleElement | null;
  if (!st) {
    st = document.createElement('style');
    st.id = 'rpl_ext_styles';
    document.head.appendChild(st);
  }
  st.textContent = `
    .pred-hero{
      background:linear-gradient(135deg,#0b281c 0%,#123d2b 100%);
      color:#ffffff;
      border-radius:14px;
      padding:18px 20px;
      margin-bottom:14px;
      display:flex;
      flex-wrap:wrap;
      align-items:center;
      justify-content:space-between;
      gap:16px;
      border:1px solid #1d583e;
    }
    .pred-hero-title{
      font:700 22px Unbounded,sans-serif;
      margin:0 0 4px;
      color:#ffffff;
      letter-spacing:-0.01em;
    }
    .pred-hero-sub{
      font-size:13px;
      color:#cde2d4;
      line-height:1.4;
    }
    .pred-hero-right{
      display:flex;
      align-items:center;
      gap:14px;
      flex-wrap:wrap;
    }
    .pred-wallet{
      background:rgba(255,255,255,0.08);
      border:1px solid rgba(255,255,255,0.16);
      border-radius:10px;
      padding:8px 14px;
      text-align:right;
      font-variant-numeric:tabular-nums;
    }
    .pred-wallet-lbl{
      font-size:11px;
      color:#b8d4c2;
    }
    .pred-wallet-val{
      font:700 18px Unbounded,sans-serif;
      color:#f0c419;
      margin-top:1px;
    }
    .pred-tg-user{
      display:flex;
      align-items:center;
      gap:9px;
      font-size:13px;
      color:#e8f2ec;
    }
    .pred-tg-ava{
      width:32px;
      height:32px;
      border-radius:50%;
      object-fit:cover;
      border:1.5px solid rgba(255,255,255,0.35);
      flex-shrink:0;
    }
    .pred-ads-panel{
      position:relative;
      overflow:hidden;
      background:linear-gradient(180deg,#ffffff 0%,#f2f8f4 100%);
      border:1px solid #c3d8cb;
      border-top:3px solid #166534;
      border-radius:14px;
      padding:14px 16px;
      margin-bottom:14px;
      box-shadow:0 4px 16px rgba(13,47,33,0.05);
    }
    .pred-ads-head{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      flex-wrap:wrap;
      margin-bottom:12px;
    }
    .pred-ads-title-wrap{
      display:flex;
      align-items:center;
      gap:10px;
    }
    .pred-ads-title-ico{
      width:30px;
      height:30px;
      border-radius:8px;
      background:#0d2f21;
      color:#f0c419;
      display:flex;
      align-items:center;
      justify-content:center;
      flex-shrink:0;
      border:1px solid #1f5c3f;
    }
    .pred-ads-title{
      font:700 14.5px Unbounded,Onest,sans-serif;
      color:#0d2f21;
      letter-spacing:-0.01em;
    }
    .pred-ads-sub{
      font-size:12px;
      color:#536b5d;
      margin-top:1px;
    }
    .pred-ads-grid{
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:10px;
    }
    .sp-cards-grid{
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:12px;
    }
    .coin-offer-btn{
      appearance:none;
      -webkit-appearance:none;
      position:relative;
      overflow:hidden;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      gap:10px;
      width:100%;
      min-height:88px;
      text-align:left;
      background:linear-gradient(160deg,#ffffff 0%,#f3f9f5 100%);
      color:#10261c;
      border:1.5px solid #c6dacd;
      border-radius:12px;
      padding:12px 13px 11px;
      cursor:pointer;
      transition:border-color .16s ease,background .16s ease,transform .14s ease,box-shadow .16s ease;
    }
    .coin-offer-btn::after{
      content:'';
      position:absolute;
      right:-22px;
      bottom:-22px;
      width:74px;
      height:74px;
      border-radius:50%;
      border:2px solid rgba(22,101,52,0.08);
      pointer-events:none;
    }
    .coin-offer-btn.featured{
      background:linear-gradient(155deg,#0d2f21 0%,#144530 100%);
      border-color:#1e5f43;
      color:#ffffff;
    }
    .coin-offer-btn.featured::after{
      border-color:rgba(240,196,25,0.14);
    }
    .coin-offer-btn:hover:not(:disabled){
      border-color:#15803d;
      background:linear-gradient(160deg,#ffffff 0%,#e9f6ee 100%);
      transform:translateY(-2px);
      box-shadow:0 6px 16px rgba(13,47,33,0.09);
    }
    .coin-offer-btn.featured:hover:not(:disabled){
      border-color:#f0c419;
      background:linear-gradient(155deg,#103828 0%,#195239 100%);
      box-shadow:0 8px 18px rgba(13,47,33,0.18);
    }
    .coin-offer-btn:disabled{
      opacity:.56;
      cursor:not-allowed;
    }
    .coin-offer-top{
      position:relative;
      z-index:1;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      width:100%;
    }
    .coin-offer-left{
      display:flex;
      align-items:center;
      gap:10px;
      min-width:0;
      flex:1;
    }
    .coin-offer-ico{
      width:38px;
      height:38px;
      border-radius:10px;
      background:#0d2f21;
      color:#f0c419;
      border:1px solid #1e5b3f;
      display:flex;
      align-items:center;
      justify-content:center;
      flex-shrink:0;
    }
    .coin-offer-btn.featured .coin-offer-ico{
      background:rgba(240,196,25,0.15);
      border-color:rgba(240,196,25,0.38);
      color:#f0c419;
    }
    .coin-offer-name{
      font:700 13.5px Onest,system-ui,sans-serif;
      color:#0d2f21;
      line-height:1.25;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .coin-offer-btn.featured .coin-offer-name{
      color:#ffffff;
    }
    .coin-offer-meta{
      font-size:11.5px;
      color:#556e60;
      margin-top:2px;
      font-variant-numeric:tabular-nums;
    }
    .coin-offer-btn.featured .coin-offer-meta{
      color:#c3ddd0;
    }
    .coin-offer-reward{
      display:inline-flex;
      align-items:center;
      gap:5px;
      padding:6px 10px;
      border-radius:9px;
      background:#0d2f21;
      color:#f0c419;
      font:700 13px Unbounded,sans-serif;
      white-space:nowrap;
      flex-shrink:0;
      font-variant-numeric:tabular-nums;
      border:1px solid #1c553b;
    }
    .coin-offer-btn.featured .coin-offer-reward{
      background:#f0c419;
      color:#0d2f21;
      border-color:#ffd747;
    }
    .coin-offer-foot{
      position:relative;
      z-index:1;
      display:flex;
      align-items:center;
      gap:10px;
      width:100%;
    }
    .coin-offer-track{
      flex:1;
      height:6px;
      border-radius:99px;
      background:#dfebe3;
      overflow:hidden;
    }
    .coin-offer-btn.featured .coin-offer-track{
      background:rgba(255,255,255,0.16);
    }
    .coin-offer-fill{
      height:100%;
      border-radius:99px;
      background:linear-gradient(90deg,#166534 0%,#22c55e 100%);
      transition:width .25s ease;
    }
    .coin-offer-btn.featured .coin-offer-fill{
      background:linear-gradient(90deg,#eab308 0%,#fde047 100%);
    }
    .coin-offer-count{
      font-size:11px;
      font-weight:700;
      color:#4b6456;
      white-space:nowrap;
      font-variant-numeric:tabular-nums;
    }
    .coin-offer-btn.featured .coin-offer-count{
      color:#d5eae0;
    }
    .pred-toolbar{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:12px;
      flex-wrap:wrap;
      margin-bottom:14px;
      border-bottom:2px solid var(--line);
      padding-bottom:8px;
    }
    .pred-tabs{
      display:flex;
      gap:6px;
      flex-wrap:wrap;
    }
    .pred-tabs button{
      background:transparent;
      border:0;
      padding:8px 13px;
      min-height:40px;
      border-radius:8px;
      cursor:pointer;
      font-weight:600;
      font-size:13.5px;
      color:var(--muted);
      transition:background .12s,color .12s;
      white-space:nowrap;
    }
    .pred-tabs button:hover{
      color:var(--ink);
      background:#eef4f0;
    }
    .pred-tabs button.on{
      background:#0d2f21;
      color:#ffffff;
    }
    .pred-stake-bar{
      display:flex;
      align-items:center;
      gap:6px;
      flex-wrap:wrap;
    }
    .pred-stake-lbl{
      font-size:12.5px;
      font-weight:600;
      color:#5b7064;
      margin-right:2px;
    }
    .pred-stake-btn{
      min-width:38px;
      min-height:36px;
      padding:4px 10px;
      border-radius:7px;
      border:1px solid #c7d6cc;
      background:#ffffff;
      color:#10261c;
      font-weight:700;
      font-size:13px;
      font-variant-numeric:tabular-nums;
      cursor:pointer;
      transition:all .12s;
    }
    .pred-stake-btn:hover{
      border-color:#1b5c3f;
    }
    .pred-stake-btn.on{
      background:#1b5c3f;
      border-color:#1b5c3f;
      color:#ffffff;
    }
    .pred-grid{
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:14px;
    }
    .pred-card{
      background:#ffffff;
      border:1px solid #d1ded5;
      border-radius:12px;
      padding:15px 16px;
      display:flex;
      flex-direction:column;
      gap:12px;
    }
    .pred-card-head{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:8px;
      font-size:12px;
      color:#5b7064;
      font-variant-numeric:tabular-nums;
    }
    .pred-teams{
      display:grid;
      grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);
      align-items:center;
      gap:10px;
    }
    .pred-team{
      display:flex;
      align-items:center;
      gap:8px;
      min-width:0;
    }
    .pred-team.away{
      justify-content:flex-end;
      text-align:right;
    }
    .pred-team-logo{
      width:28px;
      height:28px;
      object-fit:contain;
      flex-shrink:0;
    }
    .pred-team-name{
      font:700 14.5px Onest,system-ui,sans-serif;
      color:#0d2f21;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    .pred-vs{
      font-size:12px;
      font-weight:700;
      color:#85998d;
    }
    .pred-sec-lbl{
      font-size:11.5px;
      font-weight:600;
      color:#5b7064;
      margin-bottom:5px;
      display:flex;
      justify-content:space-between;
      align-items:center;
    }
    .pred-line-3{
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:6px;
    }
    .pred-line-2{
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:6px;
    }
    .pred-quick-split{
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:10px;
      padding-top:10px;
      border-top:1px solid #ebf1ed;
    }
    .pred-odd-btn{
      appearance:none;
      -webkit-appearance:none;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:6px;
      width:100%;
      min-height:42px;
      padding:7px 10px;
      border-radius:8px;
      border:1px solid #d0ddd4;
      background:#f7faf8;
      color:#10261c;
      font-size:13px;
      font-weight:500;
      cursor:pointer;
      transition:border-color .12s,background .12s,color .12s;
      text-align:left;
    }
    .pred-odd-btn:hover:not(:disabled){
      border-color:#1b5c3f;
      background:#edf6f0;
    }
    .pred-odd-btn.on{
      background:#0d2f21;
      border-color:#0d2f21;
      color:#ffffff;
    }
    .pred-odd-btn.betted{
      background:#f0fdf4;
      border-color:#86efac;
      color:#166534;
      cursor:default;
    }
    .pred-odd-k{
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    .pred-odd-v{
      font-variant-numeric:tabular-nums;
      font-weight:700;
      font-size:13px;
      color:#0d2f21;
      flex-shrink:0;
    }
    .pred-odd-btn.on .pred-odd-v{
      color:#f0c419;
    }
    .pred-odd-btn.betted .pred-odd-v{
      color:#15803d;
    }
    .pred-more-btn{
      appearance:none;
      -webkit-appearance:none;
      width:100%;
      min-height:40px;
      padding:8px 12px;
      border-radius:8px;
      border:1px dashed #c2d3c8;
      background:#fbfdfb;
      color:#1b5c3f;
      font-size:12.5px;
      font-weight:600;
      display:flex;
      align-items:center;
      justify-content:space-between;
      cursor:pointer;
      transition:background .12s,border-color .12s;
    }
    .pred-more-btn:hover{
      background:#f1f7f3;
      border-color:#1b5c3f;
    }
    .pred-more-panel{
      padding-top:10px;
      border-top:1px solid #e5eee8;
      display:flex;
      flex-direction:column;
      gap:10px;
    }
    .pred-es-grid{
      display:grid;
      grid-template-columns:repeat(4,minmax(0,1fr));
      gap:6px;
    }
    .pred-es-custom{
      display:flex;
      align-items:center;
      gap:6px;
      margin-top:6px;
      flex-wrap:wrap;
    }
    .pred-inline-input{
      width:48px !important;
      padding:5px 6px !important;
      text-align:center;
      font-variant-numeric:tabular-nums;
    }
    .pred-slip{
      background:#0d2f21;
      color:#ffffff;
      border-radius:10px;
      padding:11px 13px;
      display:flex;
      flex-direction:column;
      gap:9px;
    }
    .pred-slip-top{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      flex-wrap:wrap;
    }
    .toast{
      z-index:2500 !important;
    }
    .pred-slip-cta{
      background:#f0c419;
      color:#0d2f21;
      border:0;
      border-radius:7px;
      padding:8px 15px;
      min-height:38px;
      font-weight:700;
      font-size:13px;
      cursor:pointer;
      white-space:nowrap;
    }
    .pred-slip-cta:hover:not(:disabled){
      background:#ffd43b;
    }
    .pred-slip-cta:disabled{
      opacity:0.65;
      cursor:not-allowed;
    }
    .pred-active-bets{
      border-top:1px solid #e5eee8;
      padding-top:8px;
      display:flex;
      flex-direction:column;
      gap:4px;
      font-size:12.5px;
      font-variant-numeric:tabular-nums;
    }
    .pred-active-row{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:8px;
      color:#166534;
    }
    .pred-prob-wrap{
      display:flex;
      flex-direction:column;
      gap:4px;
    }
    .pred-prob-bar{
      height:5px;
      border-radius:999px;
      overflow:hidden;
      display:flex;
      background:#e7efea;
    }
    .pred-prob-1{ background:#1b5c3f; }
    .pred-prob-x{ background:#9fb3a7; }
    .pred-prob-2{ background:#2b6cb0; }
    .pred-prob-meta{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:8px;
      font-size:11px;
      color:#5b7064;
      font-variant-numeric:tabular-nums;
      flex-wrap:wrap;
    }
    .pred-mkt-tabs{
      display:flex;
      gap:5px;
      flex-wrap:wrap;
      padding-bottom:6px;
      border-bottom:1px solid #e5eee8;
    }
    .pred-mkt-tab{
      appearance:none;
      -webkit-appearance:none;
      background:#f2f6f3;
      border:1px solid #d5e1d9;
      border-radius:7px;
      padding:5px 10px;
      font-size:12px;
      font-weight:600;
      color:#3d5347;
      cursor:pointer;
      transition:all .12s;
    }
    .pred-mkt-tab:hover{
      border-color:#1b5c3f;
      color:#0d2f21;
    }
    .pred-mkt-tab.on{
      background:#0d2f21;
      border-color:#0d2f21;
      color:#ffffff;
    }
    .pred-filter-row{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      flex-wrap:wrap;
      margin-bottom:14px;
    }
    .pred-comp-pills{
      display:flex;
      gap:6px;
      flex-wrap:wrap;
    }
    .pred-comp-pill{
      appearance:none;
      background:#ffffff;
      border:1px solid #cddad1;
      border-radius:8px;
      padding:6px 11px;
      font-size:12.5px;
      font-weight:600;
      color:#3d5347;
      cursor:pointer;
    }
    .pred-comp-pill.on{
      background:#1b5c3f;
      border-color:#1b5c3f;
      color:#ffffff;
    }
    .pred-search-input{
      min-width:200px;
      max-width:260px;
      padding:7px 11px !important;
      font-size:13px !important;
    }
    .pred-coupon-dock{
      position:fixed;
      right:18px;
      bottom:16px;
      width:min(430px, calc(100vw - 24px));
      background:#0d2f21;
      color:#ffffff;
      border-radius:14px;
      box-shadow:0 14px 36px rgba(9,32,22,0.38);
      border:1px solid rgba(255,255,255,0.14);
      z-index:1200;
      overflow:hidden;
    }
    .pred-coupon-head{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      padding:11px 14px;
      background:#092419;
      cursor:pointer;
    }
    .pred-coupon-body{
      max-height:54vh;
      overflow-y:auto;
      padding:10px 12px;
      display:flex;
      flex-direction:column;
      gap:8px;
    }
    .pred-coupon-item{
      background:rgba(255,255,255,0.08);
      border:1px solid rgba(255,255,255,0.12);
      border-radius:10px;
      padding:9px 10px;
      display:flex;
      flex-direction:column;
      gap:7px;
    }
    .pred-coupon-item-top{
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:8px;
    }
    .pred-coupon-stake-row{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:8px;
      flex-wrap:wrap;
      font-variant-numeric:tabular-nums;
    }
    .pred-coupon-qty{
      display:flex;
      align-items:center;
      gap:4px;
    }
    .pred-coupon-qty button{
      min-width:28px;
      height:28px;
      border-radius:6px;
      border:1px solid rgba(255,255,255,0.22);
      background:rgba(255,255,255,0.12);
      color:#ffffff;
      font-weight:700;
      font-size:12.5px;
      cursor:pointer;
      padding:0 6px;
    }
    .pred-coupon-qty button:hover{
      background:rgba(255,255,255,0.22);
    }
    .pred-coupon-qty input{
      width:52px !important;
      height:28px !important;
      padding:2px 5px !important;
      border-radius:6px !important;
      border:1px solid rgba(255,255,255,0.28) !important;
      background:#ffffff !important;
      color:#0d2f21 !important;
      font-weight:700 !important;
      text-align:center !important;
      font-size:13px !important;
    }
    .pred-coupon-foot{
      padding:10px 14px 12px;
      background:#092419;
      border-top:1px solid rgba(255,255,255,0.12);
      display:flex;
      flex-direction:column;
      gap:8px;
    }
    .pred-coupon-presets{
      display:flex;
      align-items:center;
      gap:5px;
      flex-wrap:wrap;
      font-size:11.5px;
      color:#b9d4c4;
    }
    .pred-coupon-presets button{
      border:1px solid rgba(255,255,255,0.24);
      background:rgba(255,255,255,0.10);
      color:#ffffff;
      border-radius:6px;
      padding:3px 8px;
      font-size:11.5px;
      font-weight:700;
      cursor:pointer;
    }
    .pred-coupon-presets button:hover{
      background:rgba(255,255,255,0.22);
    }
    .pred-line-4{
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:6px;
    }
    @media (max-width:860px){
      .pred-grid{ grid-template-columns:1fr; }
      .pred-ads-grid{ grid-template-columns:1fr; }
      .sp-cards-grid{ grid-template-columns:1fr; }
    }
    @media (max-width:640px){
      .pred-coupon-dock{ right:10px; left:10px; bottom:calc(10px + env(safe-area-inset-bottom)); width:auto; }
    }
    @media (max-width:560px){
      .pred-hero{ padding:14px 15px; }
      .pred-hero-title{ font-size:18px; }
      .pred-quick-split{ grid-template-columns:1fr; gap:8px; }
      .pred-es-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); }
      .pred-line-4{ grid-template-columns:repeat(2,minmax(0,1fr)); }
      .pred-search-input{ min-width:0; max-width:100%; width:100%; }
      .pred-comp-pills{ width:100%; flex-wrap:nowrap; overflow-x:auto; -webkit-overflow-scrolling:touch; padding-bottom:2px; scrollbar-width:none; }
      .pred-comp-pills::-webkit-scrollbar{ display:none; }
      .pred-comp-pill{ flex-shrink:0; min-height:38px; }
      .pred-odd-btn{ padding:7px 7px; font-size:12.5px; }
    }
    .rpl-adsgram-task{
      --adsgram-task-font-size:15px;
      --adsgram-task-icon-size:44px;
      --adsgram-task-icon-title-gap:12px;
      --adsgram-task-icon-border-radius:10px;
      --adsgram-task-button-width:96px;
      display:block;
      width:100%;
      box-sizing:border-box;
      background:linear-gradient(155deg,#0d2f21 0%,#144530 100%);
      color:#fff;
      padding:14px 16px;
      border-radius:12px;
      border:1px solid #1e5f43;
      margin:8px 0 12px;
    }
    .rpl-task-reward{
      font-weight:700;
      color:#f0c419;
      margin:0;
    }
    .rpl-task-btn{
      background:#f0c419;
      color:#0b261b;
      padding:8px 14px;
      border-radius:8px;
      text-align:center;
      cursor:pointer;
      font-weight:700;
      font-size:12.5px;
    }
    .rpl-task-btn.claim{
      background:#22c55e;
      color:#fff;
    }
    .rpl-task-btn.done{
      background:#166534;
      color:#bbf7d0;
      cursor:default;
      opacity:.85;
    }
    .adcab-hero{
      background:linear-gradient(135deg,#0b281c 0%,#144530 100%);
      color:#ffffff;
      border-radius:14px;
      padding:18px 20px;
      margin-bottom:14px;
      border:1px solid #1d583e;
      display:flex;
      flex-wrap:wrap;
      align-items:center;
      justify-content:space-between;
      gap:14px;
    }
    .adcab-hero h2{margin:0 0 4px;font:700 20px Unbounded,sans-serif;color:#fff}
    .adcab-hero-sub{font-size:13px;color:#cde2d4;line-height:1.45;max-width:680px}
    .adcab-kpis{
      display:grid;
      grid-template-columns:repeat(6,minmax(0,1fr));
      gap:10px;
      margin-bottom:14px;
    }
    .adcab-kpi{
      background:#ffffff;
      border:1px solid var(--line);
      border-radius:12px;
      padding:12px 13px;
      display:flex;
      flex-direction:column;
      gap:4px;
      font-variant-numeric:tabular-nums;
    }
    .adcab-kpi-lbl{font-size:11.5px;color:var(--muted);font-weight:600}
    .adcab-kpi-val{font:700 19px Unbounded,sans-serif;color:#0d2f21;line-height:1.15}
    .adcab-kpi-sub{font-size:11.5px;color:#4b6456}
    .adcab-fmt-grid{
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:12px;
      margin-bottom:14px;
    }
    .adcab-subtabs{
      display:flex;
      gap:6px;
      flex-wrap:wrap;
      margin-bottom:14px;
      padding-bottom:8px;
      border-bottom:2px solid var(--line);
    }
    .adcab-subtabs button{
      background:#f4f8f5;
      border:1px solid #d4e0d8;
      padding:7px 13px;
      border-radius:8px;
      cursor:pointer;
      font-weight:600;
      font-size:13px;
      color:#3d5347;
      transition:all .12s;
    }
    .adcab-subtabs button:hover{border-color:#15803d;color:#0d2f21}
    .adcab-subtabs button.on{background:#0d2f21;border-color:#0d2f21;color:#fff}
    .adcab-badge{
      display:inline-flex;
      align-items:center;
      gap:4px;
      padding:2px 8px;
      border-radius:6px;
      font-size:11.5px;
      font-weight:700;
      white-space:nowrap;
    }
    .adcab-badge.ok{background:#dcfce7;color:#166534;border:1px solid #86efac}
    .adcab-badge.warn{background:#fef3c7;color:#92400e;border:1px solid #fde68a}
    .adcab-badge.err{background:#fee2e2;color:#991b1b;border:1px solid #fca5a5}
    .adcab-badge.info{background:#e0f2fe;color:#075985;border:1px solid #bae6fd}
    .adcab-badge.muted{background:#f1f5f9;color:#475569;border:1px solid #cbd5e1}
    @media (max-width:1100px){
      .adcab-kpis{grid-template-columns:repeat(3,minmax(0,1fr))}
    }
    @media (max-width:760px){
      .adcab-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}
      .adcab-fmt-grid{grid-template-columns:1fr}
    }
  `;
}

ensureExtStyles();

function getClientUid(): string {
  try {
    const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (tgUser?.id) {
      const id = `tg_${tgUser.id}`;
      localStorage.setItem('rpl_client_uid', id);
      return id;
    }
    if (window.__TG_USER__?.tgId) {
      const id = `tg_${window.__TG_USER__.tgId}`;
      localStorage.setItem('rpl_client_uid', id);
      return id;
    }
    let uid = localStorage.getItem('rpl_client_uid') || '';
    if (!uid) {
      uid = 'u_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      localStorage.setItem('rpl_client_uid', uid);
    }
    return uid;
  } catch {
    return 'u_browser';
  }
}

function getTgUserMeta(): { id: string; name: string; username: string; photo: string } {
  try {
    const u = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (u?.id) {
      const name = [u.first_name, u.last_name].filter(Boolean).join(' ').trim() || (u.username ? `@${u.username}` : '');
      const photo = typeof u.photo_url === 'string' ? u.photo_url : '';
      return {
        id: String(u.id),
        name,
        username: String(u.username || ''),
        photo,
      };
    }
    const cached = window.__TG_USER__;
    if (cached?.tgId) {
      return {
        id: String(cached.tgId),
        name: String(cached.displayName || ''),
        username: String(cached.username || ''),
        photo: String(cached.photoUrl || ''),
      };
    }
    return { id: '', name: '', username: '', photo: '' };
  } catch {
    return { id: '', name: '', username: '', photo: '' };
  }
}

export function getClientHeaders(): Record<string, string> {
  const meta = getTgUserMeta();
  const h: Record<string, string> = { 'X-Client-Id': getClientUid() };
  if (meta.id) h['X-Tg-Id'] = meta.id;
  if (meta.name) h['X-Tg-Name'] = encodeURIComponent(meta.name);
  if (meta.username) h['X-Tg-Username'] = encodeURIComponent(meta.username);
  if (meta.photo) h['X-Tg-Photo'] = meta.photo;
  return h;
}

export async function syncTelegramAuth(): Promise<any | null> {
  try {
    const wa = window.Telegram?.WebApp;
    const initData = typeof wa?.initData === 'string' ? wa.initData : '';
    const user = wa?.initDataUnsafe?.user || null;
    if (!initData && !user?.id) return null;
    if (user?.id) {
      try {
        localStorage.setItem('rpl_client_uid', `tg_${user.id}`);
      } catch {}
    }
    const res = await B().api('/auth/telegram', { initData, user });
    if (res?.telegramUser) {
      window.__TG_USER__ = {
        ...res.telegramUser,
        linkedTeamId: res.linkedTeamId || null,
      };
    }
    return res;
  } catch {
    return null;
  }
}

function B(): AppBridge {
  return window.__RPL_APP__!;
}

function fmtEuro(n: number): string {
  const v = Math.round(Number(n) || 0);
  return v < 0 ? '-€' + Math.abs(v).toLocaleString('ru-RU') : '€' + v.toLocaleString('ru-RU');
}

function fmtCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return [h, m, s].map((x) => String(x).padStart(2, '0')).join(':');
}

function fmtShortCooldown(ms: number): string {
  if (ms <= 0) return '00:00';
  const totalSec = Math.ceil(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function isRealConfiguredSdkBlockId(blockId: string): boolean {
  const v = String(blockId || '').trim();
  return /^\d+$/.test(v) || /^task-\d+$/i.test(v) || /^int-\d+$/i.test(v);
}

async function waitForAdsgramSdk(timeoutMs = 4500): Promise<boolean> {
  if (typeof window.Adsgram?.init === 'function' || customElements?.get('adsgram-task')) return true;
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    await new Promise((r) => setTimeout(r, 120));
    if (typeof window.Adsgram?.init === 'function' || customElements?.get('adsgram-task')) return true;
  }
  return typeof window.Adsgram?.init === 'function' || !!customElements?.get('adsgram-task');
}

function formatAdsgramErrMsg(raw: any, fallback: string): string {
  const s = String(raw || '').trim();
  if (!s) return fallback;
  if (/There are currently no ads to display/i.test(s)) {
    return 'Adsgram: сейчас нет доступных рекламных объявлений для показа. Попробуйте чуть позже.';
  }
  if (/Unable to retrieve launch parameters|open your app in Telegram/i.test(s)) {
    return 'Adsgram: реклама работает только при запуске игры внутри Telegram Mini App.';
  }
  if (/Platform App url.*not equal/i.test(s)) {
    return `Adsgram: URL мини-приложения не совпадает с настройками платформы (${s}).`;
  }
  if (/is not active/i.test(s)) {
    return `Adsgram: рекламный блок не активен или проходит модерацию (${s}).`;
  }
  if (/is not found/i.test(s)) {
    return `Adsgram: рекламный блок не найден (${s}). Проверьте Block ID в Админке.`;
  }
  if (/wrong prefix|should starts with/i.test(s)) {
    return `Adsgram: неверный тип/префикс Block ID (${s}). Проверьте формат ID (число / int-... / task-...).`;
  }
  if (/Session.*too old|restart the app/i.test(s)) {
    return 'Adsgram: сессия устарела — перезапустите Telegram Mini App.';
  }
  if (/several ads in a row/i.test(s)) {
    return 'Adsgram: подождите пару секунд перед следующим показом.';
  }
  if (/skipped/i.test(s)) {
    return 'Реклама пропущена — просмотр не засчитан.';
  }
  return s;
}

/**
 * Executes an Adsgram ad block (Rewarded, Interstitial int-*, or Task task-*)
 * strictly matching the official Adsgram SDK docs.
 */
export async function runAdsgramBlock(
  blockKey: string,
  title: string,
  subtitle?: string,
  opts?: { teamId?: string; isAdminTest?: boolean }
): Promise<{ adProof: string; blockKey: string; clicked: boolean; cooldown?: any } | null> {
  const { api, e, toast, modal } = B();
  const wa = window.Telegram?.WebApp;
  const tgInitData = typeof wa?.initData === 'string' ? wa.initData : '';
  const tgUser = wa?.initDataUnsafe?.user || null;
  const teamIdParam = opts?.teamId ? { teamId: opts.teamId } : {};
  const adminTestParam = opts?.isAdminTest ? { isAdminTest: true } : {};

  let session: any;
  try {
    session = await api('/ads/start', { blockKey, ...teamIdParam, ...adminTestParam, tgInitData, tgUser });
  } catch (err: any) {
    toast(err?.message || 'Не удалось запустить рекламный блок Adsgram', true);
    return null;
  }

  const blockId = String(session?.blockId || '').trim();
  const sessionToken = String(session?.sessionToken || '').trim();
  const cancelSession = (reason = 'cancel', detail = '') => {
    if (sessionToken) {
      api('/ads/cancel', { sessionToken, ...teamIdParam, reason, detail }).catch(() => {});
    }
  };
  const reportClientEvent = (kind: 'error' | 'cancel' | 'skip', detail: string) => {
    api('/ads/client-event', { blockKey, blockId, kind, detail, ...teamIdParam }).catch(() => {});
  };

  if (!isRealConfiguredSdkBlockId(blockId)) {
    cancelSession('error', `Некорректный Block ID: ${blockId || blockKey}`);
    toast(`Рекламный блок «${blockId || blockKey}» ещё не настроен. Укажите реальный Block ID в Админке.`, true);
    return null;
  }

  const sdkReady = await waitForAdsgramSdk(4500);
  const isTaskBlock = /^task-\d+$/i.test(blockId);
  const isInterstitialBlock = /^int-\d+$/i.test(blockId);

  if (isTaskBlock) {
    if (!customElements?.get('adsgram-task') && !sdkReady) {
      cancelSession('sdk_error', 'SDK <adsgram-task> не загружен (блокировщик или вне Telegram)');
      toast('Рекламный SDK Adsgram не загружен. Отключите блокировщик рекламы или откройте игру в Telegram Mini App.', true);
      return null;
    }

    return new Promise((resolve) => {
      let resolved = false;
      let observer: MutationObserver | null = null;
      let watchdogTimer: any = null;
      let countdownTimer: any = null;

      const finish = (val: any) => {
        if (resolved) return;
        resolved = true;
        if (observer) observer.disconnect();
        if (watchdogTimer) clearTimeout(watchdogTimer);
        if (countdownTimer) clearInterval(countdownTimer);
        resolve(val);
      };

      const html = `
        <div style="max-width:460px;margin:0 auto">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px">
            <span style="font-size:12px;font-weight:700;color:#0d2f21">Adsgram Task · <code>${e(blockId)}</code></span>
          </div>
          <h3 style="margin:0 0 4px;font-size:17px">${e(title)}</h3>
          ${subtitle ? `<div class="small muted" style="margin-bottom:8px">${e(subtitle)}</div>` : ''}
          <div id="rpl_task_mount"></div>
          <div id="rpl_task_err" class="small" style="display:none;background:#fef2f2;border:1px solid #fecaca;color:#991b1b;padding:9px 11px;border-radius:8px;margin-bottom:10px;line-height:1.45"></div>
          <div class="row" style="justify-content:flex-end;gap:8px;margin-top:6px">
            <button type="button" id="rpl_task_retry" class="btn alt sm" style="display:none">Повторить</button>
            <button type="button" id="rpl_task_cancel" class="btn alt sm">Закрыть</button>
          </div>
        </div>
      `;

      modal(html, (el, close) => {
        const closeModal = typeof close === 'function' ? close : () => el.remove();
        const mountBox = el.querySelector('#rpl_task_mount') as HTMLElement | null;
        const errBox = el.querySelector('#rpl_task_err') as HTMLElement | null;
        const retryBtn = el.querySelector('#rpl_task_retry') as HTMLButtonElement | null;
        const cancelBtn = el.querySelector('#rpl_task_cancel') as HTMLButtonElement | null;

        const showTaskStatus = (msg: string, showRetry = true) => {
          if (errBox) {
            errBox.textContent = msg;
            errBox.style.display = 'block';
          }
          if (retryBtn) {
            retryBtn.style.display = showRetry ? 'inline-flex' : 'none';
          }
        };

        const clearTaskStatus = () => {
          if (errBox) {
            errBox.textContent = '';
            errBox.style.display = 'none';
          }
          if (retryBtn) retryBtn.style.display = 'none';
        };

        const mountTaskElement = () => {
          if (!mountBox) return;
          clearTaskStatus();
          if (watchdogTimer) clearTimeout(watchdogTimer);
          if (countdownTimer) clearInterval(countdownTimer);
          mountBox.innerHTML = '';

          if (!customElements?.get('adsgram-task')) {
            showTaskStatus('Веб-компонент <adsgram-task> не зарегистрирован скриптом Adsgram.', true);
            return;
          }

          const taskEl = document.createElement('adsgram-task');
          taskEl.setAttribute('data-block-id', blockId);
          taskEl.className = 'rpl-adsgram-task';
          taskEl.id = 'rpl_adsgram_task_el';
          taskEl.innerHTML = `
            <p slot="reward" class="rpl-task-reward">Награда</p>
            <div slot="button" class="rpl-task-btn">Перейти</div>
            <div slot="claim" class="rpl-task-btn claim">Забрать</div>
            <div slot="done" class="rpl-task-btn done">Готово</div>
          `;

          let taskEventSeen = false;

          // Attach ALL listeners BEFORE appending to live DOM so synchronous connectedCallback events are never missed.
          taskEl.addEventListener('reward', async () => {
            taskEventSeen = true;
            if (watchdogTimer) clearTimeout(watchdogTimer);
            if (countdownTimer) clearInterval(countdownTimer);
            try {
              const completed = await api('/ads/complete', {
                sessionToken,
                ...teamIdParam,
                clicked: true,
                sdkCompleted: true,
                done: true,
                error: false,
                state: 'task_reward',
                description: '',
                rewardEventFired: true,
              });
              closeModal();
              finish({ adProof: completed.adProof, blockKey, clicked: !!completed.clicked });
            } catch (err: any) {
              const msg = err?.message || 'Сервер не подтвердил выполнение задания Adsgram.';
              showTaskStatus(msg, false);
              toast(msg, true);
            }
          });

          taskEl.addEventListener('onBannerNotFound', () => {
            taskEventSeen = true;
            if (watchdogTimer) clearTimeout(watchdogTimer);
            const perfNow = typeof performance !== 'undefined' ? performance.now() : 120000;
            const coldLeftSec = perfNow < 120000 ? Math.ceil((120000 - perfNow) / 1000) : 0;
            reportClientEvent(
              'error',
              coldLeftSec > 2 && tgInitData
                ? `Task onBannerNotFound (прогрев Mini App ~${coldLeftSec}с)`
                : 'Task onBannerNotFound: нет активных кампаний'
            );
            if (coldLeftSec > 2 && tgInitData) {
              let left = coldLeftSec;
              showTaskStatus(
                `Adsgram проверяет свежесть сессии Mini App — задание автоматически подгрузится через ${left} сек (можно нажать «Повторить»).`,
                true
              );
              countdownTimer = setInterval(() => {
                left -= 1;
                if (left > 0 && !resolved && document.body.contains(el)) {
                  if (errBox) {
                    errBox.textContent = `Adsgram проверяет свежесть сессии Mini App — задание автоматически подгрузится через ${left} сек (можно нажать «Повторить»).`;
                  }
                } else {
                  clearInterval(countdownTimer);
                }
              }, 1000);
            } else {
              showTaskStatus(
                'Задание Adsgram сейчас не найдено (нет активных кампаний или в платформе Adsgram создано больше 1 Task-блока).',
                true
              );
            }
          });

          taskEl.addEventListener('onError', (ev: any) => {
            taskEventSeen = true;
            if (watchdogTimer) clearTimeout(watchdogTimer);
            const detail = ev?.detail && typeof ev.detail === 'object' ? ev.detail.description : ev?.detail;
            const rawDetail = String(detail || ev?.description || 'Task onError');
            reportClientEvent('error', `Task: ${rawDetail}`);
            const msg = formatAdsgramErrMsg(
              detail || ev?.description,
              `Не удалось загрузить задание Adsgram (${blockId}).`
            );
            showTaskStatus(msg, true);
          });

          taskEl.addEventListener('onTooLongSession', () => {
            taskEventSeen = true;
            if (watchdogTimer) clearTimeout(watchdogTimer);
            reportClientEvent('error', 'Task onTooLongSession: сессия устарела');
            showTaskStatus('Сессия слишком долгая — перезапустите Telegram Mini App для получения заданий Adsgram.', false);
          });

          taskEl.addEventListener('onFastReturn', () => {
            reportClientEvent('cancel', 'Task onFastReturn: быстрый возврат без выполнения');
            showTaskStatus('Вы слишком быстро вернулись — перейдите по заданию и оставайтесь там несколько секунд.', false);
          });

          mountBox.appendChild(taskEl);

          // In sad.min.js, non-400 Task errors (e.g. NoUserData outside Telegram) do not emit onError/onBannerNotFound.
          if (!tgInitData) {
            watchdogTimer = setTimeout(() => {
              if (!resolved && !taskEventSeen && document.body.contains(el)) {
                reportClientEvent('error', 'Task открыт вне Telegram Mini App (нет initData)');
                showTaskStatus(
                  'Блок Adsgram Task работает только внутри Telegram Mini App (в обычном браузере Telegram не передаёт параметры запуска).',
                  true
                );
              }
            }, 2200);
          }
        };

        mountTaskElement();

        if (retryBtn) {
          retryBtn.onclick = () => mountTaskElement();
        }

        if (cancelBtn) {
          cancelBtn.onclick = () => {
            cancelSession('cancel', 'Закрыто окно Task-задания');
            closeModal();
            finish(null);
          };
        }

        observer = new MutationObserver(() => {
          if (!document.body.contains(el)) {
            cancelSession('cancel', 'Модальное окно Task закрыто');
            finish(null);
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      });
    });
  }

  if (!sdkReady || typeof window.Adsgram?.init !== 'function') {
    cancelSession('sdk_error', 'window.Adsgram.init недоступен (блокировщик или сеть)');
    toast('Рекламный SDK Adsgram не загружен. Отключите блокировщик рекламы или откройте игру в Telegram Mini App.', true);
    return null;
  }

  let controller: any;
  try {
    controller = window.Adsgram.init({ blockId });
  } catch (err: any) {
    const initErr = String(err?.description || err?.message || 'Ошибка Adsgram.init');
    cancelSession('sdk_error', initErr);
    toast(formatAdsgramErrMsg(initErr, 'Не удалось инициализировать блок Adsgram'), true);
    return null;
  }

  let eventError: string | null = null;
  let bannerNotFound = false;
  let skipped = false;
  let rewardEventFired = false;
  let completeEventFired = false;

  const onBannerNotFound = () => {
    bannerNotFound = true;
    eventError = 'Реклама Adsgram сейчас не подобрана для показа. Попробуйте чуть позже.';
  };
  const onError = (ev: any) => {
    const desc = String(ev?.description || '').trim();
    if (desc) eventError = desc;
  };
  const onSkip = () => {
    skipped = true;
  };
  const onReward = () => {
    rewardEventFired = true;
  };
  const onComplete = () => {
    completeEventFired = true;
  };
  const onNonStopShow = () => {
    eventError = 'Adsgram: подождите пару секунд перед следующим показом рекламы.';
  };
  const onTooLongSession = () => {
    eventError = 'Adsgram: сессия устарела — перезапустите Telegram Mini App.';
  };

  try {
    if (typeof controller?.addEventListener === 'function') {
      controller.addEventListener('onBannerNotFound', onBannerNotFound);
      controller.addEventListener('onError', onError);
      controller.addEventListener('onSkip', onSkip);
      controller.addEventListener('onReward', onReward);
      controller.addEventListener('onComplete', onComplete);
      controller.addEventListener('onNonStopShow', onNonStopShow);
      controller.addEventListener('onTooLongSession', onTooLongSession);
    }
  } catch {}

  const cleanupListeners = () => {
    try {
      if (typeof controller?.removeEventListener === 'function') {
        controller.removeEventListener('onBannerNotFound', onBannerNotFound);
        controller.removeEventListener('onError', onError);
        controller.removeEventListener('onSkip', onSkip);
        controller.removeEventListener('onReward', onReward);
        controller.removeEventListener('onComplete', onComplete);
        controller.removeEventListener('onNonStopShow', onNonStopShow);
        controller.removeEventListener('onTooLongSession', onTooLongSession);
      }
    } catch {}
  };

  try {
    const res = await controller.show();
    // Per official Adsgram docs:
    // - Rewarded show() resolves on full view (onReward, done: true).
    // - Interstitial (int-*) show() resolves on full view OR close (onComplete, done: true).
    const isDone = Boolean(
      !res?.error &&
      res?.done !== false &&
      !bannerNotFound &&
      (isInterstitialBlock ? (completeEventFired || res?.done === true || res === undefined) : !skipped)
    );
    if (!isDone) {
      const reason = bannerNotFound ? 'no_ad' : skipped ? 'skip' : 'error';
      const rawDetail = eventError || res?.description || (skipped ? 'Реклама пропущена пользователем' : 'Показ не завершён');
      cancelSession(reason, String(rawDetail));
      toast(
        formatAdsgramErrMsg(
          eventError || res?.description,
          skipped ? 'Реклама пропущена — просмотр не засчитан.' : 'Реклама Adsgram не была досмотрена до конца.'
        ),
        true
      );
      return null;
    }

    const completed = await api('/ads/complete', {
      sessionToken,
      ...teamIdParam,
      tgInitData,
      tgUser,
      clicked: true,
      sdkCompleted: true,
      done: true,
      error: false,
      state: String(res?.state || (isInterstitialBlock ? 'interstitial_complete' : 'reward')),
      description: String(res?.description || ''),
      rewardEventFired: rewardEventFired || completeEventFired,
    });
    return { adProof: completed.adProof, blockKey, clicked: !!completed.clicked, cooldown: completed.cooldown || null };
  } catch (err: any) {
    const rawMsg = String(err?.description || err?.message || eventError || '').trim();
    const reason = bannerNotFound || /no ads/i.test(rawMsg) ? 'no_ad' : skipped ? 'skip' : 'error';
    cancelSession(reason, rawMsg || 'Promise show() отклонился');
    toast(
      formatAdsgramErrMsg(rawMsg, 'Просмотр рекламы Adsgram не выполнен или отменён.'),
      true
    );
    return null;
  } finally {
    cleanupListeners();
  }
}

// ─── Club Tab: Sponsors + RFS Bonus ───────────────────────────────────────────
let sponsorTimerHandle: any = null;

export function renderClubSponsorsTab(cb: HTMLElement, c: any, reloadClub: () => void) {
  const { api, e, toast, S, getClubTid } = B();
  const sp = c.sponsors;
  if (!sp) {
    cb.innerHTML = '<div class="panel">Данные спонсоров недоступны.</div>';
    return;
  }
  const teamParam = S.me?.role === 'admin' ? { teamId: getClubTid() } : {};
  const pct = Math.min(100, Math.round((sp.totalViews / sp.totalRequired) * 100));

  const nowSp = Date.now();
  const sponsorCards = sp.sponsors
    .map((s: any) => {
      const done = s.views >= s.maxViews;
      const cdTarget = Number(s.nextAvailableAt || 0);
      const inCd = !done && cdTarget > nowSp;
      const btnDisabled = done || inCd;
      return `
      <div class="panel" style="margin-bottom:0;display:flex;flex-direction:column;justify-content:space-between;border-top:3px solid ${s.accentColor}">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:6px">
            <div>
              <div style="font:700 16px Unbounded,sans-serif">${e(s.name)}</div>
              <div class="small muted">${e(s.tagline)}</div>
            </div>
            <div style="font-variant-numeric:tabular-nums;font-weight:700;font-size:15px;color:#15803d;white-space:nowrap">+${fmtEuro(s.rewardEur)}</div>
          </div>
          <div class="small" style="margin-bottom:10px;line-height:1.4">${e(s.description)}</div>
          <div class="small muted" style="margin-bottom:10px;font-variant-numeric:tabular-nums">
            ${e(s.formatLabel)} · Одобрение 95/5 · Блок: <code>${e(s.blockId)}</code>
          </div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:600;margin-bottom:4px;font-variant-numeric:tabular-nums">
            <span>Показы за сутки</span>
            <span>${s.views} / ${s.maxViews} (одобрено: ${s.approvedCount}${s.declinedCount ? `, отказ: ${s.declinedCount}` : ''})</span>
          </div>
          <div style="height:7px;background:var(--soft);border-radius:99px;overflow:hidden;margin-bottom:12px">
            <div style="height:100%;width:${Math.round((s.views / s.maxViews) * 100)}%;background:${s.accentColor}"></div>
          </div>
          <button class="btn" data-sp-ask="${e(s.id)}" data-sp-block="${e(s.blockKey)}" data-sp-name="${e(s.name)}" ${btnDisabled ? 'disabled' : ''} style="width:100%;min-height:44px;font-variant-numeric:tabular-nums;${btnDisabled ? 'opacity:0.6' : ''}">
            ${done
              ? `Лимит ${s.maxViews}/${s.maxViews} выполнен`
              : inCd
                ? `<span data-sp-cd="${cdTarget}">Перерыв ${fmtShortCooldown(cdTarget - nowSp)}</span>`
                : `Попросить деньги (${fmtEuro(s.rewardEur)})`}
          </button>
        </div>
      </div>`;
    })
    .join('');

  const rfsCdTarget = Number(sp.rfsNextAvailableAt || 0);
  const rfsInCd = sp.rfsUnlocked && sp.rfsExtraViews < sp.rfsMaxViews && rfsCdTarget > nowSp;
  const rfsDisabled = !sp.rfsUnlocked || sp.rfsExtraViews >= sp.rfsMaxViews || rfsInCd;

  cb.innerHTML = `
    <div class="panel">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px">
        <div>
          <h2 style="margin:0 0 4px">Спонсорская программа клуба</h2>
          <div class="small muted">Запросите финансирование у 3 спонсоров (одобрение 95/5). Комбо из 30 показов (10 + 10 + 10) открывает бонус от РФС. Перерыв между показами — 2 мин.</div>
        </div>
        <div style="text-align:right;font-variant-numeric:tabular-nums">
          <div class="small muted">Общий сброс (24 часа)</div>
          <div id="sp_reset_timer" style="font:700 18px Unbounded,sans-serif;color:var(--deep)">${sp.resetAt ? fmtCountdown(sp.remainingMs) : 'Цикл не начат'}</div>
        </div>
      </div>

      <div style="background:var(--soft);border-radius:10px;padding:12px 14px;border:1px solid var(--line);margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;margin-bottom:6px;font-variant-numeric:tabular-nums">
          <span>Прогресс до бонуса РФС</span>
          <span>${sp.totalViews} / ${sp.totalRequired} реклам · Заработано за сутки: ${fmtEuro(sp.earnedEurCycle + sp.rfsEarnedEur)}</span>
        </div>
        <div style="height:10px;background:#dce6de;border-radius:99px;overflow:hidden">
          <div style="height:100%;width:${pct}%;background:var(--green);transition:width 0.3s"></div>
        </div>
        <div class="small muted" style="margin-top:6px">
          Важно: если не успеть посмотреть все ${sp.totalRequired} реклам за 24 часа с момента первого просмотра (даже если не хватило 1 рекламы), прогресс сбросится на 0/${sp.totalRequired}.
        </div>
      </div>

      <div class="sp-cards-grid">${sponsorCards}</div>
    </div>

    <div class="panel" style="border:1.5px solid ${sp.rfsUnlocked ? '#15803d' : 'var(--line)'};background:${sp.rfsUnlocked ? '#f0fdf4' : 'var(--panel)'}">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px">
        <div style="flex:1;min-width:240px">
          <h3 style="margin:0 0 4px">Бонус от РФС — Премиум-финансирование</h3>
          <div class="small" style="line-height:1.45">
            ${sp.rfsUnlocked
              ? `Все ${sp.totalRequired} реклам просмотрены! ${sp.rfsClaimed
                  ? `Бонус активирован. Каждая дополнительная реклама в этом блоке приносит +€1 000 в бюджет клуба (просмотрено: ${sp.rfsExtraViews}/${sp.rfsMaxViews}, заработано: ${fmtEuro(sp.rfsEarnedEur)}).`
                  : 'Нажмите кнопку и посмотрите 1 бонусную рекламу РФС, чтобы получить +€1 000 и открыть режим выплат по €1 000 за каждый следующий показ до 24-часового сброса!'}`
              : `Откроется после просмотра всех ${sp.totalRequired} реклам у 3 спонсоров (осталось ${Math.max(0, sp.totalRequired - sp.totalViews)}). После активации каждая дополнительная реклама приносит по €1 000 до конца 24-часового цикла.`}
          </div>
          <div class="small muted" style="margin-top:4px">Рекламный блок Adsgram: <code>${e(sp.rfsBlockId)}</code> · Перерыв между показами: 2 мин</div>
        </div>
        <button class="btn" id="sp_rfs_btn" ${rfsDisabled ? 'disabled' : ''} style="min-height:46px;font-variant-numeric:tabular-nums;${rfsDisabled ? 'opacity:0.55' : ''}">
          ${!sp.rfsUnlocked
            ? `Заблокировано (${sp.totalViews}/${sp.totalRequired})`
            : sp.rfsExtraViews >= sp.rfsMaxViews
              ? 'Лимит блока 30/30 исчерпан'
              : rfsInCd
                ? `<span data-sp-cd="${rfsCdTarget}">Перерыв ${fmtShortCooldown(rfsCdTarget - nowSp)}</span>`
                : sp.rfsClaimed
                  ? 'Смотреть рекламу РФС (+€1 000)'
                  : 'Получить бонус от РФС (+€1 000)'}
        </button>
      </div>
    </div>

    <div class="panel">
      <h3 style="margin:0 0 10px">История обращений к спонсорам и РФС</h3>
      ${sp.history.length
        ? `<div class="wrap"><table><thead><tr><th class="l">Источник</th><th class="l">Решение</th><th>Сумма</th><th class="l">Время</th></tr></thead><tbody>
          ${sp.history.map((h: any) => `
            <tr>
              <td class="l"><b>${e(h.sponsorName)}</b></td>
              <td class="l">${h.approved ? '<span style="color:#15803d;font-weight:600">Одобрено</span>' : '<span style="color:#b91c1c;font-weight:600">Отказ (5%)</span>'}</td>
              <td style="font-variant-numeric:tabular-nums">${h.approved ? `+${fmtEuro(h.amount)}` : '€0'}</td>
              <td class="l small muted">${new Date(h.date).toLocaleString('ru-RU')}</td>
            </tr>`).join('')}
        </tbody></table></div>`
        : '<div class="small muted">Обращений в этом цикле пока нет.</div>'}
    </div>
  `;

  if (sponsorTimerHandle) clearInterval(sponsorTimerHandle);
  const hasSpCd = !!cb.querySelector('[data-sp-cd]');
  if (sp.resetAt || hasSpCd) {
    sponsorTimerHandle = setInterval(() => {
      const el = document.getElementById('sp_reset_timer');
      if (!el) {
        clearInterval(sponsorTimerHandle);
        return;
      }
      const nowTick = Date.now();
      let needReload = false;
      if (sp.resetAt) {
        const left = sp.resetAt - nowTick;
        if (left > 0) el.textContent = fmtCountdown(left);
        else {
          el.textContent = 'Сброс…';
          needReload = true;
        }
      }
      cb.querySelectorAll('[data-sp-cd]').forEach((cdEl) => {
        const target = Number((cdEl as HTMLElement).dataset.spCd || 0);
        const rem = target - nowTick;
        if (rem > 0) {
          cdEl.textContent = `Перерыв ${fmtShortCooldown(rem)}`;
        } else {
          needReload = true;
        }
      });
      if (needReload) {
        clearInterval(sponsorTimerHandle);
        setTimeout(() => reloadClub(), 500);
      }
    }, 1000);
  }

  cb.querySelectorAll('[data-sp-ask]').forEach((btn) => {
    (btn as HTMLButtonElement).onclick = async () => {
      const bEl = btn as HTMLButtonElement;
      if (bEl.disabled) return;
      bEl.disabled = true;
      try {
        const sponsorId = bEl.dataset.spAsk!;
        const blockKey = bEl.dataset.spBlock!;
        const spName = bEl.dataset.spName!;
        const adRes = await runAdsgramBlock(
          blockKey,
          `Запрос к спонсору «${spName}»`,
          'После просмотра спонсор рассмотрит заявку (вероятность одобрения 95/5).',
          teamParam
        );
        if (!adRes) return;
        const res = await api('/club/sponsors/request', { ...teamParam, sponsorId, adProof: adRes.adProof });
        toast(res.message, !res.approved);
        reloadClub();
      } catch (err: any) {
        toast(err?.message || 'Ошибка обращения к спонсору', true);
      } finally {
        if (document.body.contains(bEl)) bEl.disabled = false;
      }
    };
  });

  const rfsBtn = document.getElementById('sp_rfs_btn') as HTMLButtonElement | null;
  if (rfsBtn && !rfsBtn.disabled) {
    rfsBtn.onclick = async () => {
      if (rfsBtn.disabled) return;
      rfsBtn.disabled = true;
      try {
        const adRes = await runAdsgramBlock(
          'rfs_bonus',
          'Бонус от РФС (+€1 000)',
          `Премиум-показ после выполнения ${sp.totalRequired}/${sp.totalRequired} реклам спонсоров.`,
          teamParam
        );
        if (!adRes) return;
        const res = await api('/club/sponsors/rfs-claim', { ...teamParam, adProof: adRes.adProof });
        toast(res.message);
        reloadClub();
      } catch (err: any) {
        toast(err?.message || 'Ошибка получения бонуса РФС', true);
      } finally {
        if (document.body.contains(rfsBtn)) rfsBtn.disabled = false;
      }
    };
  }
}

// ─── Predictions Page (#/predictions) ─────────────────────────────────────────
let PRED_SUBTAB: 'matches' | 'leagues' | 'history' = 'matches';
let SELECTED_STAKE = 1;
let PRED_COMP_FILTER = 'all';
let PRED_SEARCH = '';
let COUPON_EXPANDED = true;
const OPEN_MARKETS_FIXTURES = new Set<string>();
const FIXTURE_ACTIVE_GROUP = new Map<string, string>();
let CACHED_PRED_DATA: any = null;
let CACHED_PRED_AT = 0;
let PRED_FETCH_SEQ = 0;

interface CouponItem {
  key: string;
  fixtureId: string;
  matchLabel: string;
  market: string;
  marketTitle: string;
  pick: string;
  label: string;
  odd: number;
  stake: number;
  exactHome?: number;
  exactAway?: number;
}
let COUPON_ITEMS: CouponItem[] = [];

function fmtCoins(n: any): string {
  const num = Math.round(Number(n || 0) * 100) / 100;
  return Number.isInteger(num) ? String(num) : num.toFixed(2).replace(/\.?0+$/, '');
}

function isFixtureBetLocked(f: any, nowMs = Date.now()): boolean {
  const closeAt = Number(f?.betCloseAt || 0);
  return closeAt > 0 && nowMs >= closeAt;
}

export async function renderPredictionsPage(app: HTMLElement, opts?: { forceReload?: boolean; silent?: boolean }) {
  ensureExtStyles();
  const { api, e } = B();
  const seq = ++PRED_FETCH_SEQ;

  if (CACHED_PRED_DATA && !opts?.forceReload) {
    renderPredictionsContent(app, CACHED_PRED_DATA);
    if (Date.now() - CACHED_PRED_AT > 15_000) {
      api('/predictions').then((fresh) => {
        if (seq !== PRED_FETCH_SEQ || !document.body.contains(app)) return;
        CACHED_PRED_DATA = fresh;
        CACHED_PRED_AT = Date.now();
        if (PRED_SUBTAB !== 'matches' || !COUPON_ITEMS.length) {
          renderPredictionsContent(app, fresh);
        }
      }).catch(() => {});
    }
    return;
  }

  if (!CACHED_PRED_DATA && !opts?.silent) {
    app.innerHTML = '<div class="panel">Загрузка линии прогнозов…</div>';
  }
  try {
    const fresh = await api('/predictions');
    if (seq !== PRED_FETCH_SEQ) return;
    CACHED_PRED_DATA = fresh;
    CACHED_PRED_AT = Date.now();
    renderPredictionsContent(app, fresh);
  } catch (err: any) {
    if (seq !== PRED_FETCH_SEQ) return;
    if (!CACHED_PRED_DATA) {
      app.innerHTML = `<div class="panel warn">${e(err?.message || 'Ошибка загрузки прогнозов')}</div>`;
    }
  }
}

function renderPredictionsContent(app: HTMLElement, data: any) {
  ensureExtStyles();
  const { api, e, toast } = B();

  const wallet = data.wallet;
  const prof = data.profile || {};
  const tgMeta = getTgUserMeta();
  const viewerName = tgMeta.name || prof.displayName || '';
  const viewerPhoto = tgMeta.photo || prof.photoUrl || '';

  // Map fixtureId -> list of placed predictions, and placed key set for O(1) lookup
  const myPredsByFixture = new Map<string, any[]>();
  const placedByKey = new Map<string, any>();
  for (const p of data.myPredictions || []) {
    if (!myPredsByFixture.has(p.fixtureId)) myPredsByFixture.set(p.fixtureId, []);
    myPredsByFixture.get(p.fixtureId)!.push(p);
    const mk = p.market || 'outcome';
    const key = mk === 'exact_score'
      ? `${p.fixtureId}|${mk}|${p.exactHome}:${p.exactAway}`
      : `${p.fixtureId}|${mk}|${p.pick}`;
    placedByKey.set(key, p);
  }

  // Prune coupon items for fixtures no longer open, locked (<=2 min to kickoff), or already placed
  const nowRender = Date.now();
  const openFixSet = new Set<string>(
    (data.fixtures || []).filter((f: any) => !isFixtureBetLocked(f, nowRender)).map((f: any) => f.id)
  );
  COUPON_ITEMS = COUPON_ITEMS.filter((it) => openFixSet.has(it.fixtureId) && !placedByKey.has(it.key));

  const couponKeySet = new Set<string>(COUPON_ITEMS.map((it) => it.key));

  const renderOddBtn = (
    fid: string,
    matchLabel: string,
    marketId: string,
    marketTitle: string,
    shortLbl: string,
    odd: number,
    pick: string,
    fullLabel: string,
    isBetClosed = false
  ) => {
    const itemKey = `${fid}|${marketId}|${pick}`;
    const placed = placedByKey.get(itemKey);
    const inCoupon = couponKeySet.has(itemKey);
    const isDisabled = !!placed || isBetClosed;
    const titleAttr = placed
      ? 'title="Ставка уже принята"'
      : isBetClosed
        ? 'title="Приём ставок завершается за 2 минуты до матча"'
        : '';
    return `
      <button type="button"
        class="pred-odd-btn ${placed ? 'betted' : inCoupon ? 'on' : ''}"
        ${isDisabled ? `disabled ${titleAttr}` : ''}
        data-sel-bet="${e(fid)}"
        data-match-label="${e(matchLabel)}"
        data-market="${e(marketId)}"
        data-market-title="${e(marketTitle)}"
        data-pick="${e(pick)}"
        data-label="${e(fullLabel)}"
        data-odd="${odd}">
        <span class="pred-odd-k">${placed ? `✓ ${fmtCoins(placed.stake)}м · ` : ''}${e(shortLbl)}</span>
        <span class="pred-odd-v">${Number(odd).toFixed(2)}</span>
      </button>`;
  };

  const renderMarketBlock = (f: any, m: any, matchLabel: string, isBetClosed = false) => {
    if (!m || !Array.isArray(m.options) || !m.options.length) return '';
    const colsClass = m.options.length === 2
      ? 'pred-line-2'
      : (m.id === 'combo_w_total' || m.id === 'combo_w_btts' || m.id === 'ht_ft')
        ? 'pred-line-4'
        : 'pred-line-3';
    return `
      <div>
        <div class="pred-sec-lbl">
          <span>${e(m.title)}</span>
          <span style="font-weight:400;font-size:11px;color:#7a9183">${e(m.subtitle || '')}</span>
        </div>
        <div class="${colsClass}">
          ${m.options.map((o: any) =>
            renderOddBtn(f.id, matchLabel, m.id, m.title, o.shortLabel, o.odd, o.pick, o.label, isBetClosed)
          ).join('')}
        </div>
      </div>`;
  };

  const renderMatchesTab = () => {
    const allFx: any[] = data.fixtures || [];
    if (!allFx.length) {
      return '<div class="panel"><div class="empty">На данный момент нет открытых матчей для прогноза. Как только появятся новые туры РПЛ, Кубка или товарищеские матчи — они появятся здесь.</div></div>';
    }

    const q = PRED_SEARCH.trim().toLowerCase();
    const filtered = allFx.filter((f) => {
      if (PRED_COMP_FILTER !== 'all' && f.comp !== PRED_COMP_FILTER) return false;
      if (q) {
        const txt = `${f.homeName} ${f.awayName} ${f.label} ${f.compName}`.toLowerCase();
        if (!txt.includes(q)) return false;
      }
      return true;
    });

    const compCounts: Record<string, number> = { all: allFx.length };
    for (const f of allFx) compCounts[f.comp] = (compCounts[f.comp] || 0) + 1;
    const compPills = [
      { id: 'all', name: 'Все' },
      { id: 'rpl', name: 'РПЛ' },
      { id: 'cup', name: 'Кубок' },
      { id: 'supercup', name: 'Суперкубок' },
      { id: 'friendly_match', name: 'Товарищ.' },
    ].filter((cp) => cp.id === 'all' || (compCounts[cp.id] || 0) > 0);

    return `
      <div class="pred-filter-row">
        <div class="pred-comp-pills">
          ${compPills.map((cp) => `
            <button type="button" class="pred-comp-pill ${PRED_COMP_FILTER === cp.id ? 'on' : ''}" data-pred-comp="${e(cp.id)}">${e(cp.name)} (${compCounts[cp.id] || 0})</button>
          `).join('')}
        </div>
        <input id="pred_search_inp" class="pred-search-input" type="search" placeholder="Поиск команды…" value="${e(PRED_SEARCH)}">
      </div>

      ${!filtered.length
        ? '<div class="panel"><div class="empty">По выбранному фильтру матчей не найдено.</div></div>'
        : `<div class="pred-grid" style="${COUPON_ITEMS.length ? 'padding-bottom:130px' : ''}">
        ${filtered.map((f: any) => {
          const matchLabel = `${f.homeName} — ${f.awayName}`;
          const placedList = myPredsByFixture.get(f.id) || [];
          const fxMarkets: any[] = Array.isArray(f.markets) && f.markets.length ? f.markets : (data.markets || []);
          const byId = new Map<string, any>(fxMarkets.map((m) => [m.id, m]));

          const mOutcome = byId.get('outcome');
          const mDouble = byId.get('double_chance');
          const mHcp0 = byId.get('hcp_0');
          const mTotal25 = byId.get('total_goals');
          const mBtts = byId.get('btts');

          const quickScores: Array<{ h: number; a: number; score: string; odd: number }> = f.quickScores || [];
          const isExtraOpen = OPEN_MARKETS_FIXTURES.has(f.id);
          const activeGroup = FIXTURE_ACTIVE_GROUP.get(f.id) || 'main';
          const probs = f.probs || { p1: 36, pX: 28, p2: 36 };
          const totalOutcomesCount = fxMarkets.reduce((s, m) => s + (m.id === 'exact_score' || m.id === 'specials' ? 0 : (m.options?.length || 0)), 0) + quickScores.length;

          const groupTabs = [
            { id: 'main', label: 'Форы и Тоталы' },
            { id: 'goals', label: 'ИТ и Комбо' },
            { id: 'halves', label: 'Таймы' },
            { id: 'stats', label: 'Статистика и События' },
            { id: 'exact', label: 'Точный счёт' },
          ];

          const groupMarkets = fxMarkets.filter((m) =>
            m.group === activeGroup &&
            m.id !== 'exact_score' &&
            m.id !== 'specials' &&
            !(activeGroup === 'main' && (m.id === 'outcome' || m.id === 'double_chance' || m.id === 'total_goals' || m.id === 'btts'))
          );

          const customH = Math.max(0, Math.min(15, Number((document.getElementById(`es_h_${f.id}`) as HTMLInputElement)?.value ?? 1)));
          const customA = Math.max(0, Math.min(15, Number((document.getElementById(`es_a_${f.id}`) as HTMLInputElement)?.value ?? 1)));
          const customOdd = f.exactMatrix?.[customH]?.[customA] ?? Math.min(3.0, Math.round((1.5 + Math.min(1.5, Math.max(0, customH + customA - 4) * 0.18)) * 100) / 100);
          const betCloseAt = Number(f.betCloseAt || 0);
          const nowFx = Date.now();
          const isBetClosed = betCloseAt > 0 && nowFx >= betCloseAt;
          const remCloseMs = betCloseAt > nowFx ? betCloseAt - nowFx : 0;
          const closeBadgeHtml = isBetClosed
            ? '<span style="color:#b91c1c;font-weight:700">Приём закрыт (за 2 мин)</span>'
            : (remCloseMs > 0 && remCloseMs <= 60 * 60 * 1000)
              ? `<span style="color:#b45309;font-weight:600" data-fx-lock="${betCloseAt}">⏳ Приём ещё ${fmtShortCooldown(remCloseMs)}</span>`
              : `<span>${e(f.date)} · ${e(f.time)}</span>`;

          return `
          <div class="pred-card" data-fx-card="${e(f.id)}" style="${isBetClosed ? 'opacity:0.72' : ''}">
            <div class="pred-card-head">
              <span><b>${e(f.compName)}</b> · ${e(f.label)}</span>
              ${closeBadgeHtml}
            </div>

            <div class="pred-teams">
              <div class="pred-team">
                ${f.homeLogo ? `<img src="${e(f.homeLogo)}" alt="" class="pred-team-logo">` : ''}
                <span class="pred-team-name">${e(f.homeName)}</span>
              </div>
              <span class="pred-vs">vs</span>
              <div class="pred-team away">
                <span class="pred-team-name">${e(f.awayName)}</span>
                ${f.awayLogo ? `<img src="${e(f.awayLogo)}" alt="" class="pred-team-logo">` : ''}
              </div>
            </div>

            <div class="pred-prob-wrap">
              <div class="pred-prob-bar" title="Оценка шансов линии">
                <div class="pred-prob-1" style="width:${probs.p1}%"></div>
                <div class="pred-prob-x" style="width:${probs.pX}%"></div>
                <div class="pred-prob-2" style="width:${probs.p2}%"></div>
              </div>
              <div class="pred-prob-meta">
                <span>Шансы: П1 ${Math.round(probs.p1)}% · Х ${Math.round(probs.pX)}% · П2 ${Math.round(probs.p2)}%</span>
                <span>xG: ${Number(f.expectedGoals?.home || 1.2).toFixed(2)} – ${Number(f.expectedGoals?.away || 1.1).toFixed(2)}${f.refereeName ? ` · Судья: ${e(f.refereeName)}` : ''}</span>
              </div>
            </div>

            ${mOutcome ? `
              <div>
                <div class="pred-sec-lbl"><span>Основной исход (1 Х 2)</span></div>
                <div class="pred-line-3">
                  ${mOutcome.options.map((o: any) =>
                    renderOddBtn(f.id, matchLabel, 'outcome', 'Исход матча', o.shortLabel, o.odd, o.pick, o.label, isBetClosed)
                  ).join('')}
                </div>
              </div>` : ''}

            ${mDouble ? `
              <div>
                <div class="pred-sec-lbl"><span>Двойной шанс</span></div>
                <div class="pred-line-3">
                  ${mDouble.options.map((o: any) =>
                    renderOddBtn(f.id, matchLabel, 'double_chance', 'Двойной шанс', o.shortLabel, o.odd, o.pick, o.label, isBetClosed)
                  ).join('')}
                </div>
              </div>` : ''}

            <div class="pred-quick-split">
              ${mTotal25 ? `
                <div>
                  <div class="pred-sec-lbl"><span>Тотал 2.5</span></div>
                  <div class="pred-line-2">
                    ${mTotal25.options.map((o: any) =>
                      renderOddBtn(f.id, matchLabel, 'total_goals', 'Тотал 2.5', o.shortLabel, o.odd, o.pick, o.label, isBetClosed)
                    ).join('')}
                  </div>
                </div>` : ''}
              ${mBtts ? `
                <div>
                  <div class="pred-sec-lbl"><span>Обе забьют</span></div>
                  <div class="pred-line-2">
                    ${mBtts.options.map((o: any) =>
                      renderOddBtn(f.id, matchLabel, 'btts', 'Обе забьют', o.shortLabel === 'ОЗ Да' ? 'Да' : 'Нет', o.odd, o.pick, o.label, isBetClosed)
                    ).join('')}
                  </div>
                </div>` : ''}
            </div>

            ${mHcp0 ? `
              <div>
                <div class="pred-sec-lbl"><span>Фора (0) · возврат при ничьей</span></div>
                <div class="pred-line-2">
                  ${mHcp0.options.map((o: any) =>
                    renderOddBtn(f.id, matchLabel, 'hcp_0', 'Фора (0)', o.shortLabel, o.odd, o.pick, o.label, isBetClosed)
                  ).join('')}
                </div>
              </div>` : ''}

            <button type="button" class="pred-more-btn" data-toggle-mk="${e(f.id)}">
              <span>Вся роспись БК (${totalOutcomesCount} пунктов: Форы, Тоталы, ИТ, Таймы, ЖК, Угловые, Счёт)</span>
              <span>${isExtraOpen ? 'Скрыть ▲' : 'Открыть ▼'}</span>
            </button>

            ${isExtraOpen ? `
              <div class="pred-more-panel">
                <div class="pred-mkt-tabs">
                  ${groupTabs.map((gt) => `
                    <button type="button" class="pred-mkt-tab ${activeGroup === gt.id ? 'on' : ''}" data-fx-group="${e(f.id)}" data-group="${e(gt.id)}">${e(gt.label)}</button>
                  `).join('')}
                </div>

                ${activeGroup !== 'exact'
                  ? groupMarkets.map((m) => renderMarketBlock(f, m, matchLabel, isBetClosed)).join('')
                  : `<div>
                      <div class="pred-sec-lbl">
                        <span>Популярные счета</span>
                        <span style="font-weight:400;font-size:11px;color:#7a9183">Можно выбрать несколько вариантов</span>
                      </div>
                      <div class="pred-es-grid">
                        ${quickScores.map((qs) => {
                          const k = `${f.id}|exact_score|${qs.h}:${qs.a}`;
                          const placed = placedByKey.get(k);
                          const inCoupon = couponKeySet.has(k);
                          return `
                            <button type="button"
                              class="pred-odd-btn ${placed ? 'betted' : inCoupon ? 'on' : ''}"
                              ${(placed || isBetClosed) ? 'disabled' : ''}
                              data-es-pick="${e(f.id)}"
                              data-match-label="${e(matchLabel)}"
                              data-eh="${qs.h}"
                              data-ea="${qs.a}"
                              data-odd="${qs.odd}">
                              <span class="pred-odd-k">${placed ? '✓ ' : ''}${qs.score}</span>
                              <span class="pred-odd-v">${Number(qs.odd).toFixed(2)}</span>
                            </button>`;
                        }).join('')}
                      </div>
                      <div class="pred-es-custom">
                        <span class="small muted">Свой счёт:</span>
                        <input id="es_h_${e(f.id)}" class="pred-inline-input" type="number" min="0" max="15" value="${customH}" data-es-inp="${e(f.id)}" ${isBetClosed ? 'disabled' : ''}>
                        <b>:</b>
                        <input id="es_a_${e(f.id)}" class="pred-inline-input" type="number" min="0" max="15" value="${customA}" data-es-inp="${e(f.id)}" ${isBetClosed ? 'disabled' : ''}>
                        <button type="button" class="btn alt sm" data-es-custom="${e(f.id)}" data-match-label="${e(matchLabel)}" style="min-height:36px" ${isBetClosed ? 'disabled' : ''}>
                          В купон (<span id="es_odd_lbl_${e(f.id)}">×${Number(customOdd).toFixed(2)}</span>)
                        </button>
                      </div>
                    </div>`}
              </div>` : ''}

            ${placedList.length ? `
              <div class="pred-active-bets">
                <div class="small muted" style="font-weight:600;margin-bottom:2px">Ваши ставки на матч (${placedList.length}):</div>
                ${placedList.map((pr: any) => `
                  <div class="pred-active-row">
                    <span>✓ ${e(pr.pickLabel)}${pr.market === 'outcome' && pr.exactHome !== null && pr.exactAway !== null ? ` (бонус ${pr.exactHome}:${pr.exactAway})` : ''}</span>
                    <span><b>×${Number(pr.odd || 1.35).toFixed(2)}</b> · ${fmtCoins(pr.stake)} мон.</span>
                  </div>
                `).join('')}
              </div>` : ''}
          </div>`;
        }).join('')}
      </div>`}
    `;
  };

  const renderLeaguesTab = () => {
    const baseBoard: any[] = Array.isArray(data.leaderboard) ? data.leaderboard : [];

    const byCorrect = [...baseBoard].sort(
      (a, b) =>
        b.correct - a.correct ||
        b.points - a.points ||
        b.kpd - a.kpd ||
        a.wrong - b.wrong ||
        String(a.displayName || '').localeCompare(String(b.displayName || ''), 'ru')
    );

    const byWrong = [...baseBoard].sort(
      (a, b) =>
        b.wrong - a.wrong ||
        b.total - a.total ||
        a.correct - b.correct ||
        String(a.displayName || '').localeCompare(String(b.displayName || ''), 'ru')
    );

    const byKpd = [...baseBoard].sort(
      (a, b) =>
        b.kpd - a.kpd ||
        b.correct - a.correct ||
        b.total - a.total ||
        b.points - a.points ||
        String(a.displayName || '').localeCompare(String(b.displayName || ''), 'ru')
    );

    const byPoints = [...baseBoard].sort(
      (a, b) =>
        b.points - a.points ||
        b.correct - a.correct ||
        b.kpd - a.kpd ||
        a.wrong - b.wrong ||
        String(a.displayName || '').localeCompare(String(b.displayName || ''), 'ru')
    );

    const renderBoardCard = (
      title: string,
      subtitle: string,
      rows: any[],
      focusCol: 'correct' | 'wrong' | 'kpd' | 'points'
    ) => {
      const colLabel = focusCol === 'correct'
        ? 'Угадал'
        : focusCol === 'wrong'
          ? 'Не угадал'
          : focusCol === 'kpd'
            ? 'КПД'
            : 'Очки';
      return `
      <div class="panel" style="margin-bottom:0">
        <div style="margin-bottom:10px">
          <h3 style="margin:0 0 3px">${e(title)}</h3>
          <div class="small muted">${e(subtitle)}</div>
        </div>
        <div class="wrap">
          <table class="idx-table">
            <thead>
              <tr>
                <th>#</th>
                <th class="l">Участник</th>
                <th>${colLabel}</th>
              </tr>
            </thead>
            <tbody style="font-variant-numeric:tabular-nums">
              ${rows.map((r: any, idx: number) => {
                const rank = idx + 1;
                const isMe = r.actorKey === data.actorKey || (Array.isArray(r.aliasActorKeys) && r.aliasActorKeys.includes(data.actorKey));
                const subBits: string[] = [];
                if (r.teamName) {
                  subBits.push(
                    `<span style="display:inline-flex;align-items:center;gap:4px;vertical-align:middle">${
                      r.teamLogo
                        ? `<img src="${e(r.teamLogo)}" alt="" style="width:14px;height:14px;object-fit:contain;flex-shrink:0;border-radius:2px">`
                        : ''
                    }<span>${e(r.teamName)}</span></span>`
                  );
                }
                if (r.telegramUsername) {
                  subBits.push(`<span>@${e(r.telegramUsername)}</span>`);
                }
                const subHtml = subBits.length
                  ? subBits.join('<span style="opacity:0.55">·</span>')
                  : '<span>Участник</span>';
                const initialChar = e((String(r.displayName || 'У').replace(/^@/, '') || 'У').slice(0, 1).toUpperCase());
                const avatarHtml = r.photoUrl
                  ? `<img src="${e(r.photoUrl)}" alt="" referrerpolicy="no-referrer" style="width:32px;height:32px;border-radius:50%;object-fit:cover;flex-shrink:0;border:1px solid var(--line)" onerror="this.style.display='none';if(this.nextElementSibling)this.nextElementSibling.style.display='flex'"><div style="width:32px;height:32px;border-radius:50%;background:var(--deep);color:#fff;display:none;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${initialChar}</div>`
                  : `<div style="width:32px;height:32px;border-radius:50%;background:var(--deep);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${initialChar}</div>`;
                const valHtml = focusCol === 'correct'
                  ? `<td style="color:#15803d;font-weight:700">${r.correct}</td>`
                  : focusCol === 'wrong'
                    ? `<td style="color:#b91c1c;font-weight:700">${r.wrong}</td>`
                    : focusCol === 'kpd'
                      ? `<td style="color:#0369a1;font-weight:700">${r.kpd}%</td>`
                      : `<td style="color:#0d2f21;font-weight:800">${r.points}</td>`;
                return `
                <tr style="${isMe ? 'background:#f0fdf4;' : ''}">
                  <td><b>${rank <= 3 ? (rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉') : rank}</b></td>
                  <td class="l">
                    <div style="display:flex;align-items:center;gap:9px">
                      ${avatarHtml}
                      <div style="min-width:0">
                        <div style="font-weight:600;line-height:1.25">${e(r.displayName)}${isMe ? ' (вы)' : ''}${r.cups > 0 ? ` <span title="Кубок победителя Лиги прогнозов" style="margin-left:4px">🏆${r.cups > 1 ? '×' + r.cups : ''}</span>` : ''}</div>
                        <div class="small muted" style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin-top:2px;line-height:1.2">${subHtml}</div>
                      </div>
                    </div>
                  </td>
                  ${valHtml}
                </tr>`;
              }).join('') || '<tr><td colspan="3" class="empty">Участников пока нет</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>`;
    };

    return `
      <div class="grid g2" style="gap:14px">
        ${renderBoardCard('Лучшие по угадыванию', 'Больше всего верных прогнозов', byCorrect, 'correct')}
        ${renderBoardCard('Лучшие по не угадыванию', 'Больше всего неугаданных прогнозов', byWrong, 'wrong')}
        ${renderBoardCard('Лучшие по КПД', 'Наивысший процент точных ставок', byKpd, 'kpd')}
        ${renderBoardCard('Лучшие по очкам', 'Максимум набранных очков в сезоне', byPoints, 'points')}
      </div>
    `;
  };

  const renderHistoryTab = () => `
    <div class="panel">
      <h3 style="margin:0 0 10px">Мои ставки и прогнозы (${(data.myPredictions || []).length})</h3>
      ${(data.myPredictions || []).length
        ? `<div class="wrap"><table><thead><tr><th class="l">Матч</th><th class="l">Событие и выбор</th><th>Коэф.</th><th>Ставка</th><th class="l">Результат</th><th>Начисление</th></tr></thead><tbody style="font-variant-numeric:tabular-nums">
          ${data.myPredictions.map((p: any) => `
            <tr>
              <td class="l"><b>${e(p.homeName)} — ${e(p.awayName)}</b><div class="small muted">${e(p.label)} · ${e(p.date)}</div></td>
              <td class="l">
                <div style="font-weight:600">${e(p.pickLabel || p.pick)}${p.market === 'outcome' && p.exactHome !== null && p.exactAway !== null ? ` (бонус ${p.exactHome}:${p.exactAway})` : ''}</div>
                <div class="small muted">${e(p.marketTitle || 'Исход матча')}</div>
              </td>
              <td><b>×${Number(p.odd || 1.35).toFixed(2)}</b></td>
              <td>${fmtCoins(p.stake)} мон.</td>
              <td class="l">${
                p.status === 'won'
                  ? `<span style="color:#15803d;font-weight:700">Зашёл (${e(p.statSummary || p.actualScore || '')})</span>`
                  : p.status === 'lost'
                    ? `<span style="color:#b91c1c">Не зашёл (${e(p.statSummary || p.actualScore || '')})</span>`
                    : p.status === 'void'
                      ? `<span style="color:#b45309;font-weight:600">Возврат (${e(p.actualScore || 'нет статистики')})</span>`
                      : '<span class="muted">Ожидание матча</span>'
              }</td>
              <td>${
                p.status === 'won'
                  ? `+${p.pointsAwarded} очк. / +${fmtCoins(p.coinsWon)} мон.`
                  : p.status === 'void'
                    ? `+${fmtCoins(p.coinsWon)} мон.`
                    : '—'
              }</td>
            </tr>`).join('')}
        </tbody></table></div>`
        : '<div class="empty">Вы ещё не делали ставок в этом сезоне.</div>'}
    </div>
  `;

  const renderCouponHtml = () => {
    if (!COUPON_ITEMS.length || PRED_SUBTAB !== 'matches') return '';
    const totalStake = COUPON_ITEMS.reduce((s, it) => s + Math.max(1, Number(it.stake || 1)), 0);
    const totalReturn = COUPON_ITEMS.reduce((s, it) => s + Math.max(1, Number(it.stake || 1)) * Number(it.odd || 1), 0);
    const notEnough = totalStake > Number(wallet.coins || 0);

    return `
      <div class="pred-coupon-dock" id="pred_coupon_dock">
        <div class="pred-coupon-head" id="pred_coupon_toggle">
          <div>
            <div style="font-weight:700;font-size:14px">Купон ставок (${COUPON_ITEMS.length} ${COUPON_ITEMS.length === 1 ? 'пункт' : COUPON_ITEMS.length < 5 ? 'пункта' : 'пунктов'})</div>
            <div style="font-size:11.5px;color:#b8d4c2;font-variant-numeric:tabular-nums">
              К оплате: <b>${fmtCoins(totalStake)} мон.</b> · Макс. выплата: <b style="color:#f0c419">${fmtCoins(totalReturn)} мон.</b>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:12px;color:#cde2d4">${COUPON_EXPANDED ? 'Свернуть ▼' : 'Открыть ▲'}</span>
          </div>
        </div>
        ${COUPON_EXPANDED ? `
          <div class="pred-coupon-body">
            <div class="pred-coupon-presets">
              <span>На все пункты:</span>
              ${[1, 2, 3, 5, 10].map((v) => `<button type="button" data-cp-all="${v}">${v} м.</button>`).join('')}
              <button type="button" id="pred_cp_clear" style="margin-left:auto;border-color:rgba(255,140,140,0.4);color:#fecaca">Очистить</button>
            </div>
            ${COUPON_ITEMS.map((it, idx) => {
              const winCoins = Math.round(it.stake * it.odd * 100) / 100;
              const pts = Math.max(1, Math.round(it.stake * it.odd * 1.5));
              return `
                <div class="pred-coupon-item">
                  <div class="pred-coupon-item-top">
                    <div style="min-width:0;flex:1">
                      <div style="font-size:11px;color:#b8d4c2">${e(it.matchLabel)} · ${e(it.marketTitle)}</div>
                      <div style="font-weight:700;font-size:13px;margin-top:1px">${e(it.label)} <span style="color:#f0c419">×${Number(it.odd).toFixed(2)}</span></div>
                    </div>
                    <button type="button" data-cp-del="${idx}" title="Убрать пункт" style="background:none;border:0;color:#d1ded5;font-size:17px;line-height:1;cursor:pointer;padding:2px 4px">×</button>
                  </div>
                  <div class="pred-coupon-stake-row">
                    <div class="pred-coupon-qty">
                      <button type="button" data-cp-step="${idx}" data-delta="-1">−</button>
                      <input type="number" min="1" max="500" value="${it.stake}" data-cp-input="${idx}">
                      <button type="button" data-cp-step="${idx}" data-delta="1">+</button>
                      ${[2, 5, 10].map((q) => `<button type="button" data-cp-set="${idx}" data-val="${q}">${q}</button>`).join('')}
                    </div>
                    <div style="font-size:12px;color:#d6e9dd;text-align:right">
                      Выплата: <b style="color:#f0c419">${fmtCoins(winCoins)} м.</b> <span style="opacity:0.75">(+${pts} очк.)</span>
                    </div>
                  </div>
                </div>`;
            }).join('')}
          </div>
          <div class="pred-coupon-foot">
            ${notEnough
              ? `<div style="font-size:12px;color:#fecaca">Не хватает монет: нужно ${fmtCoins(totalStake)}, на балансе ${fmtCoins(wallet.coins)}. Уменьшите ставки или посмотрите рекламу выше.</div>`
              : ''}
            <div id="pred_cp_status" style="display:none;font-size:12px;color:#fecaca;line-height:1.35"></div>
            <button type="button" class="pred-slip-cta" id="pred_cp_submit" style="width:100%;min-height:42px;font-size:13.5px;${notEnough ? 'opacity:0.55;cursor:not-allowed' : ''}" ${notEnough ? 'disabled' : ''}>
              ${COUPON_ITEMS.length === 1
                ? `Поставить за ${fmtCoins(totalStake)} мон.`
                : `Поставить ${COUPON_ITEMS.length} ставок за ${fmtCoins(totalStake)} мон.`}
            </button>
          </div>` : ''}
      </div>`;
  };

  app.innerHTML = `
    <div class="pred-hero">
      <div style="min-width:220px;flex:1">
        <h1 class="pred-hero-title">Прогноз на тур</h1>
        <div class="pred-hero-sub">
          Сезон ${e(data.season)} · Призы Топ-3: 1 место — €1 250 000 + 10 мон. + 🏆 Кубок победителя · 2 место — €500 000 + 5 мон. · 3 место — €250 000 + 3 мон.
        </div>
      </div>
      <div class="pred-hero-right">
        ${viewerName ? `
          <div class="pred-tg-user">
            ${viewerPhoto ? `<img src="${e(viewerPhoto)}" alt="" referrerpolicy="no-referrer" class="pred-tg-ava" onerror="this.style.display='none'">` : ''}
            <div>
              <div style="font-weight:600">${e(viewerName)}</div>
              <div style="font-size:11px;color:#b8d4c2">Отображается в лиге</div>
            </div>
          </div>` : ''}
        <div class="pred-wallet">
          <div class="pred-wallet-lbl">Ваш баланс</div>
          <div class="pred-wallet-val">${fmtCoins(wallet.coins)} мон.</div>
        </div>
      </div>
    </div>

    <div class="pred-ads-panel">
      <div class="pred-ads-head">
        <div class="pred-ads-title-wrap">
          <span class="pred-ads-title-ico" aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9.5"/>
              <polygon points="12,7.5 16,10.4 14.5,15 9.5,15 8,10.4"/>
              <line x1="12" y1="2.5" x2="12" y2="7.5"/>
              <line x1="21" y1="9.2" x2="16" y2="10.4"/>
              <line x1="17.8" y1="19.5" x2="14.5" y2="15"/>
              <line x1="6.2" y1="19.5" x2="9.5" y2="15"/>
              <line x1="3" y1="9.2" x2="8" y2="10.4"/>
            </svg>
          </span>
          <div>
            <div class="pred-ads-title">Игровая касса прогнозов</div>
            <div class="pred-ads-sub">5 монет на старте · Каждая ставка оплачивается монетами · Пополняйте баланс через Adsgram</div>
          </div>
        </div>
        <span class="small muted" style="font-weight:600;font-variant-numeric:tabular-nums">
          Сброс (24 ч): <b id="pred_reset_timer">${wallet.resetAt ? fmtCountdown(Math.max(0, wallet.resetAt - Date.now())) : '24:00:00'}</b> · Перерыв между рекламами: <b>2 мин</b>
        </span>
      </div>
      <div class="pred-ads-grid">
        ${data.coinOffers.map((o: any) => {
          const maxV = Number(o.maxViews || 30);
          const pct = Math.min(100, Math.round((Number(o.views || 0) / maxV) * 100));
          const maxed = Number(o.views || 0) >= maxV;
          const cdTarget = Number(o.nextAvailableAt || 0);
          const nowPr = Date.now();
          const inCd = !maxed && cdTarget > nowPr;
          const isFeatured = o.blockKey === 'coins_long';
          const footMeta = o.blockKey === 'coins_short'
            ? { title: 'Быстрый пас', sub: 'Короткий ролик · 5 сек' }
            : o.blockKey === 'coins_banner'
              ? { title: 'Щит у поля', sub: 'Баннер матча · бровка' }
              : { title: 'Перерыв матча', sub: 'Полный ролик · 30 сек' };
          const iconSvg = o.blockKey === 'coins_short'
            ? `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/><path d="M12 2v3"/></svg>`
            : o.blockKey === 'coins_banner'
              ? `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2"/><line x1="12" y1="5" x2="12" y2="19"/><circle cx="12" cy="12" r="2.6"/><path d="M2.5 9.2h2.8v5.6H2.5"/><path d="M21.5 9.2h-2.8v5.6h2.8"/></svg>`
              : `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55-.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`;
          return `
          <button type="button" class="coin-offer-btn${isFeatured ? ' featured' : ''}" data-earn-coins="${e(o.blockKey)}" ${(maxed || inCd) ? 'disabled' : ''}>
            <div class="coin-offer-top">
              <div class="coin-offer-left">
                <span class="coin-offer-ico" aria-hidden="true">${iconSvg}</span>
                <div style="min-width:0">
                  <div class="coin-offer-name">${e(footMeta.title)}</div>
                  <div class="coin-offer-meta">${e(footMeta.sub)}</div>
                </div>
              </div>
              <span class="coin-offer-reward" ${inCd ? `data-pred-cd="${cdTarget}" style="background:#fef3c7;color:#92400e"` : ''}>${maxed ? 'Лимит' : inCd ? `⏳ ${fmtShortCooldown(cdTarget - nowPr)}` : `+${o.rewardCoins} мон.`}</span>
            </div>
            <div class="coin-offer-foot">
              <div class="coin-offer-track"><div class="coin-offer-fill" style="width:${pct}%"></div></div>
              <span class="coin-offer-count">${o.views}/${maxV}</span>
            </div>
          </button>`;
        }).join('')}
      </div>
    </div>

    <div class="pred-toolbar">
      <div class="pred-tabs">
        <button type="button" data-pred-tab="matches" class="${PRED_SUBTAB === 'matches' ? 'on' : ''}">Линия матчей (${data.fixtures.length})</button>
        <button type="button" data-pred-tab="leagues" class="${PRED_SUBTAB === 'leagues' ? 'on' : ''}">Таблица лидеров (${data.leaderboard.length})</button>
        <button type="button" data-pred-tab="history" class="${PRED_SUBTAB === 'history' ? 'on' : ''}">Мои ставки (${(data.myPredictions || []).length})</button>
      </div>
      ${PRED_SUBTAB === 'matches' ? `
        <div class="pred-stake-bar">
          <span class="pred-stake-lbl">Ставка по умолч.:</span>
          ${[1, 2, 3, 5, 10].map((v) => `
            <button type="button" class="pred-stake-btn ${SELECTED_STAKE === v ? 'on' : ''}" data-stake-val="${v}">${v}</button>
          `).join('')}
        </div>` : ''}
    </div>

    ${PRED_SUBTAB === 'matches' ? renderMatchesTab() : PRED_SUBTAB === 'leagues' ? renderLeaguesTab() : renderHistoryTab()}
    ${renderCouponHtml()}
  `;

  if ((window as any).__predTimerHandle) clearInterval((window as any).__predTimerHandle);
  const hasPredCd = !!app.querySelector('[data-pred-cd]');
  const hasFxLock = !!app.querySelector('[data-fx-lock]');
  if (wallet.resetAt || hasPredCd || hasFxLock) {
    (window as any).__predTimerHandle = setInterval(() => {
      const el = document.getElementById('pred_reset_timer');
      if (!el) {
        clearInterval((window as any).__predTimerHandle);
        return;
      }
      const nowTick = Date.now();
      let needReload = false;
      let needLockRefresh = false;
      if (wallet.resetAt) {
        const left = wallet.resetAt - nowTick;
        if (left > 0) el.textContent = fmtCountdown(left);
        else {
          el.textContent = 'Сброс…';
          needReload = true;
        }
      }
      app.querySelectorAll('[data-pred-cd]').forEach((cdEl) => {
        const target = Number((cdEl as HTMLElement).dataset.predCd || 0);
        const rem = target - nowTick;
        if (rem > 0) {
          cdEl.textContent = `⏳ ${fmtShortCooldown(rem)}`;
        } else {
          needReload = true;
        }
      });
      app.querySelectorAll('[data-fx-lock]').forEach((lockEl) => {
        const target = Number((lockEl as HTMLElement).dataset.fxLock || 0);
        const rem = target - nowTick;
        if (rem > 0) {
          lockEl.textContent = `⏳ Приём ещё ${fmtShortCooldown(rem)}`;
        } else {
          needLockRefresh = true;
        }
      });
      if (needReload) {
        clearInterval((window as any).__predTimerHandle);
        setTimeout(() => renderPredictionsPage(app, { forceReload: true, silent: true }), 500);
      } else if (needLockRefresh) {
        clearInterval((window as any).__predTimerHandle);
        toast('Приём ставок на матч завершён за 2 минуты до начала', true);
        renderPredictionsContent(app, data);
      }
    }, 1000);
  }

  app.querySelectorAll('[data-pred-tab]').forEach((b) => {
    (b as HTMLElement).onclick = () => {
      PRED_SUBTAB = (b as HTMLElement).dataset.predTab as any;
      renderPredictionsContent(app, data);
    };
  });

  app.querySelectorAll('[data-earn-coins]').forEach((b) => {
    (b as HTMLButtonElement).onclick = async () => {
      const btn = b as HTMLButtonElement;
      if (btn.disabled) return;
      btn.disabled = true;
      try {
        const blockKey = btn.dataset.earnCoins!;
        const label = blockKey === 'coins_short'
          ? '+1 монета (5 сек)'
          : blockKey === 'coins_banner'
            ? '+2 монеты (баннер)'
            : '+3 монеты (30 сек)';
        const adRes = await runAdsgramBlock(blockKey, `Пополнение баланса: ${label}`);
        if (!adRes) return;
        const res = await api('/predictions/earn-coins', { blockKey, adProof: adRes.adProof });
        toast(res.message);
        renderPredictionsPage(app, { forceReload: true, silent: true });
      } catch (err: any) {
        toast(err?.message || 'Ошибка начисления монет', true);
      } finally {
        if (document.body.contains(btn)) btn.disabled = false;
      }
    };
  });

  // Competition filter & search
  app.querySelectorAll('[data-pred-comp]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      PRED_COMP_FILTER = (b as HTMLElement).dataset.predComp || 'all';
      renderPredictionsContent(app, data);
    };
  });

  const searchInp = document.getElementById('pred_search_inp') as HTMLInputElement | null;
  if (searchInp) {
    searchInp.oninput = () => {
      PRED_SEARCH = searchInp.value;
      const pos = searchInp.selectionStart ?? PRED_SEARCH.length;
      renderPredictionsContent(app, data);
      const nextInp = document.getElementById('pred_search_inp') as HTMLInputElement | null;
      if (nextInp) {
        nextInp.focus();
        try { nextInp.setSelectionRange(pos, pos); } catch {}
      }
    };
  }

  // Global default stake switcher (applied to newly picked items)
  app.querySelectorAll('[data-stake-val]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      SELECTED_STAKE = Number((b as HTMLElement).dataset.stakeVal || 1);
      app.querySelectorAll('[data-stake-val]').forEach((btn) => {
        btn.classList.toggle('on', Number((btn as HTMLElement).dataset.stakeVal) === SELECTED_STAKE);
      });
    };
  });

  // Toggle any standard market odd button in/out of the multi-item coupon
  app.querySelectorAll('[data-sel-bet]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const ds = (b as HTMLElement).dataset;
      const fid = ds.selBet!;
      const fxObj = (data.fixtures || []).find((x: any) => x.id === fid);
      if (fxObj && isFixtureBetLocked(fxObj)) {
        toast('Приём ставок на этот матч закрыт за 2 минуты до начала.', true);
        renderPredictionsContent(app, data);
        return;
      }
      const matchLabel = ds.matchLabel || '';
      const market = ds.market!;
      const marketTitle = ds.marketTitle || '';
      const pick = ds.pick!;
      const label = ds.label || pick;
      const odd = Number(ds.odd || 1.35);
      const key = `${fid}|${market}|${pick}`;

      const idx = COUPON_ITEMS.findIndex((it) => it.key === key);
      if (idx >= 0) {
        COUPON_ITEMS.splice(idx, 1);
      } else {
        COUPON_ITEMS.push({
          key,
          fixtureId: fid,
          matchLabel,
          market,
          marketTitle,
          pick,
          label,
          odd,
          stake: SELECTED_STAKE,
        });
        COUPON_EXPANDED = true;
      }
      renderPredictionsContent(app, data);
    };
  });

  // Toggle quick exact-score odd button in/out of coupon
  app.querySelectorAll('[data-es-pick]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const ds = (b as HTMLElement).dataset;
      const fid = ds.esPick!;
      const fxObj = (data.fixtures || []).find((x: any) => x.id === fid);
      if (fxObj && isFixtureBetLocked(fxObj)) {
        toast('Приём ставок на этот матч закрыт за 2 минуты до начала.', true);
        renderPredictionsContent(app, data);
        return;
      }
      const matchLabel = ds.matchLabel || '';
      const eh = Number(ds.eh);
      const ea = Number(ds.ea);
      const odd = Number(ds.odd || 1.48);
      const key = `${fid}|exact_score|${eh}:${ea}`;

      const idx = COUPON_ITEMS.findIndex((it) => it.key === key);
      if (idx >= 0) {
        COUPON_ITEMS.splice(idx, 1);
      } else {
        COUPON_ITEMS.push({
          key,
          fixtureId: fid,
          matchLabel,
          market: 'exact_score',
          marketTitle: 'Точный счёт',
          pick: 'exact',
          label: `Точный счёт ${eh}:${ea}`,
          odd,
          stake: SELECTED_STAKE,
          exactHome: eh,
          exactAway: ea,
        });
        COUPON_EXPANDED = true;
      }
      renderPredictionsContent(app, data);
    };
  });

  // Live exact-score custom odd preview from server matrix
  app.querySelectorAll('[data-es-inp]').forEach((inp) => {
    (inp as HTMLInputElement).oninput = () => {
      const fid = (inp as HTMLElement).dataset.esInp!;
      const fxObj = (data.fixtures || []).find((x: any) => x.id === fid);
      const eh = Math.max(0, Math.min(15, Math.round(Number((document.getElementById(`es_h_${fid}`) as HTMLInputElement)?.value || 0))));
      const ea = Math.max(0, Math.min(15, Math.round(Number((document.getElementById(`es_a_${fid}`) as HTMLInputElement)?.value || 0))));
      const matOdd = fxObj?.exactMatrix?.[eh]?.[ea];
      const estOdd = matOdd || Math.min(3.0, Math.round((1.5 + Math.min(1.5, Math.max(0, eh + ea - 4) * 0.18)) * 100) / 100);
      const lbl = document.getElementById(`es_odd_lbl_${fid}`);
      if (lbl) lbl.textContent = `×${Number(estOdd).toFixed(2)}`;
    };
  });

  // Add custom exact score into coupon
  app.querySelectorAll('[data-es-custom]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const ds = (b as HTMLElement).dataset;
      const fid = ds.esCustom!;
      const fxObj = (data.fixtures || []).find((x: any) => x.id === fid);
      if (fxObj && isFixtureBetLocked(fxObj)) {
        toast('Приём ставок на этот матч закрыт за 2 минуты до начала.', true);
        renderPredictionsContent(app, data);
        return;
      }
      const matchLabel = ds.matchLabel || '';
      const eh = Math.max(0, Math.min(15, Math.round(Number((document.getElementById(`es_h_${fid}`) as HTMLInputElement)?.value || 0))));
      const ea = Math.max(0, Math.min(15, Math.round(Number((document.getElementById(`es_a_${fid}`) as HTMLInputElement)?.value || 0))));
      const matOdd = fxObj?.exactMatrix?.[eh]?.[ea];
      const estOdd = matOdd || Math.min(3.0, Math.round((1.5 + Math.min(1.5, Math.max(0, eh + ea - 4) * 0.18)) * 100) / 100);
      const key = `${fid}|exact_score|${eh}:${ea}`;
      if (placedByKey.has(key)) {
        toast(`Счёт ${eh}:${ea} уже поставлен в этом матче`, true);
        return;
      }
      if (!COUPON_ITEMS.some((it) => it.key === key)) {
        COUPON_ITEMS.push({
          key,
          fixtureId: fid,
          matchLabel,
          market: 'exact_score',
          marketTitle: 'Точный счёт',
          pick: 'exact',
          label: `Точный счёт ${eh}:${ea}`,
          odd: estOdd,
          stake: SELECTED_STAKE,
          exactHome: eh,
          exactAway: ea,
        });
        COUPON_EXPANDED = true;
      }
      renderPredictionsContent(app, data);
    };
  });

  // Coupon interactions
  const cpToggle = document.getElementById('pred_coupon_toggle');
  if (cpToggle) {
    cpToggle.onclick = () => {
      COUPON_EXPANDED = !COUPON_EXPANDED;
      renderPredictionsContent(app, data);
    };
  }
  const cpClear = document.getElementById('pred_cp_clear');
  if (cpClear) {
    cpClear.onclick = () => {
      COUPON_ITEMS = [];
      renderPredictionsContent(app, data);
    };
  }
  app.querySelectorAll('[data-cp-all]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const v = Math.max(1, Math.min(500, Number((b as HTMLElement).dataset.cpAll || 1)));
      COUPON_ITEMS.forEach((it) => { it.stake = v; });
      renderPredictionsContent(app, data);
    };
  });
  app.querySelectorAll('[data-cp-del]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const idx = Number((b as HTMLElement).dataset.cpDel);
      COUPON_ITEMS.splice(idx, 1);
      renderPredictionsContent(app, data);
    };
  });
  app.querySelectorAll('[data-cp-step]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const idx = Number((b as HTMLElement).dataset.cpStep);
      const delta = Number((b as HTMLElement).dataset.delta || 0);
      if (COUPON_ITEMS[idx]) {
        COUPON_ITEMS[idx].stake = Math.max(1, Math.min(500, COUPON_ITEMS[idx].stake + delta));
        renderPredictionsContent(app, data);
      }
    };
  });
  app.querySelectorAll('[data-cp-set]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const idx = Number((b as HTMLElement).dataset.cpSet);
      const val = Number((b as HTMLElement).dataset.val || 1);
      if (COUPON_ITEMS[idx]) {
        COUPON_ITEMS[idx].stake = Math.max(1, Math.min(500, val));
        renderPredictionsContent(app, data);
      }
    };
  });
  app.querySelectorAll('[data-cp-input]').forEach((inp) => {
    (inp as HTMLInputElement).onchange = () => {
      const idx = Number((inp as HTMLElement).dataset.cpInput);
      const val = Math.max(1, Math.min(500, Math.round(Number((inp as HTMLInputElement).value || 1))));
      if (COUPON_ITEMS[idx]) {
        COUPON_ITEMS[idx].stake = val;
        renderPredictionsContent(app, data);
      }
    };
  });

  const cpSubmit = document.getElementById('pred_cp_submit') as HTMLButtonElement | null;
  if (cpSubmit) {
    cpSubmit.onclick = async () => {
      if (!COUPON_ITEMS.length || cpSubmit.disabled) return;
      const origLabel = cpSubmit.textContent || '';
      const statusEl = document.getElementById('pred_cp_status');
      if (statusEl) {
        statusEl.style.display = 'none';
        statusEl.textContent = '';
      }
      cpSubmit.disabled = true;
      cpSubmit.textContent = '⏳ Оформляем ставку…';
      let timeoutId: ReturnType<typeof setTimeout> | null = null;
      try {
        const res = await Promise.race([
          api('/predictions/bet-batch', {
            bets: COUPON_ITEMS.map((it) => ({
              fixtureId: it.fixtureId,
              market: it.market,
              pick: it.pick,
              stake: it.stake,
              exactHome: it.exactHome,
              exactAway: it.exactAway,
            })),
          }),
          new Promise<never>((_, reject) => {
            timeoutId = setTimeout(
              () => reject(new Error('Сервер не ответил за 2 секунды. Попробуйте ещё раз.')),
              2000
            );
          }),
        ]);
        if (timeoutId) clearTimeout(timeoutId);
        toast(res.message);
        COUPON_ITEMS = [];
        if (typeof res.coins === 'number') data.wallet.coins = res.coins;
        if (Array.isArray(res.predictions) && res.predictions.length) {
          data.myPredictions = [...res.predictions].reverse().concat(data.myPredictions || []);
        }
        renderPredictionsContent(app, data);
      } catch (err: any) {
        if (timeoutId) clearTimeout(timeoutId);
        const msg = err?.message || 'Ошибка оформления купона';
        toast(msg, true);
        if (statusEl) {
          statusEl.textContent = msg;
          statusEl.style.display = 'block';
        }
        cpSubmit.disabled = false;
        cpSubmit.textContent = origLabel;
      }
    };
  }

  // Expand / Collapse full bookmaker rospis & switch category tabs
  app.querySelectorAll('[data-toggle-mk]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const fid = (b as HTMLElement).dataset.toggleMk!;
      if (OPEN_MARKETS_FIXTURES.has(fid)) OPEN_MARKETS_FIXTURES.delete(fid);
      else OPEN_MARKETS_FIXTURES.add(fid);
      renderPredictionsContent(app, data);
    };
  });

  app.querySelectorAll('[data-fx-group]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const ds = (b as HTMLElement).dataset;
      FIXTURE_ACTIVE_GROUP.set(ds.fxGroup!, ds.group || 'main');
      renderPredictionsContent(app, data);
    };
  });
}

// ─── National Team Proposals & Voting Enhancement ─────────────────────────────
let nationalTimerHandle: any = null;

export async function renderNationalProposalsSection(
  container: HTMLElement,
  cur: any,
  isAdmin: boolean,
  reloadNational: () => void
) {
  const { api, e, toast, S } = B();
  const isClub = S.me?.role === 'club';
  let clubRoster: any[] = [];
  if (isClub) {
    try {
      const c = await api('/club');
      clubRoster = (c.roster || c.squad || []).filter(
        (p: any) => !p.nat || p.nat === 'RUS' || p.nat === 'Россия' || p.nation === 'Россия'
      );
    } catch {
      clubRoster = [];
    }
  }

  const playerProps = cur.playerProposals || [];
  const oppProps = cur.opponentProposals || [];
  const adQuota = cur.adQuota || {
    views: 0,
    maxViews: 30,
    remaining: 30,
    resetAt: null,
    remainingMs: 0,
    cooldownMs: 120000,
    cooldownRemainingMs: 0,
    nextAvailableAt: null,
  };

  const nowNt = Date.now();
  const ntViews = Math.max(0, Number(adQuota.views || 0));
  const ntMax = Math.max(1, Number(adQuota.maxViews || 30));
  const ntPct = Math.min(100, Math.round((ntViews / ntMax) * 100));
  const ntMaxed = ntViews >= ntMax;
  const ntCdTarget =
    Number(adQuota.nextAvailableAt || 0) ||
    (Number(adQuota.cooldownRemainingMs || 0) > 0 ? nowNt + Number(adQuota.cooldownRemainingMs) : 0);
  const ntInCd = !ntMaxed && ntCdTarget > nowNt;
  const ntResetTarget =
    Number(adQuota.resetAt || 0) ||
    (Number(adQuota.remainingMs || 0) > 0 ? nowNt + Number(adQuota.remainingMs) : 0);
  const ntBtnDisabled = ntMaxed || ntInCd;

  container.innerHTML = `
    <div class="panel" style="margin-top:16px;margin-bottom:0">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:10px">
        <div>
          <h3 style="margin:0 0 4px">Реклама в разделе сборной</h3>
          <div class="small muted">Перерыв между просмотрами рекламы — 2 мин · Лимит — ${ntMax} просмотров в день (за 24 часа)</div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center;font-variant-numeric:tabular-nums">
          <div style="text-align:right">
            <div class="small muted">Перерыв (2 мин)</div>
            <div id="nt_cd_status" ${ntInCd ? `data-nt-cd-status="${ntCdTarget}"` : ''} style="font:700 15px Unbounded,sans-serif;color:${ntMaxed ? '#b91c1c' : ntInCd ? '#b45309' : '#15803d'}">
              ${ntMaxed ? 'Лимит исчерпан' : ntInCd ? `⏳ ${fmtShortCooldown(ntCdTarget - nowNt)}` : 'Готово'}
            </div>
          </div>
          <div style="text-align:right">
            <div class="small muted">Сброс (24 часа)</div>
            <div id="nt_reset_timer" style="font:700 15px Unbounded,sans-serif;color:var(--deep)">
              ${ntResetTarget > nowNt ? fmtCountdown(ntResetTarget - nowNt) : 'Цикл не начат'}
            </div>
          </div>
        </div>
      </div>
      <div style="background:var(--soft);border-radius:10px;padding:10px 12px;border:1px solid var(--line)">
        <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;margin-bottom:6px;font-variant-numeric:tabular-nums">
          <span>Просмотры рекламы за сутки</span>
          <span>${ntViews} / ${ntMax} (осталось ${Math.max(0, ntMax - ntViews)})</span>
        </div>
        <div style="height:8px;background:#dce6de;border-radius:99px;overflow:hidden">
          <div style="height:100%;width:${ntPct}%;background:${ntMaxed ? '#dc2626' : 'var(--green)'};transition:width 0.3s"></div>
        </div>
      </div>
    </div>

    <div class="grid g2" style="margin-top:12px">
      <div class="panel" style="margin-bottom:0">
        <h3 style="margin:0 0 6px">Предложить игрока в сборную России</h3>
        <div class="small muted" style="margin-bottom:10px;line-height:1.45">
          За просмотр рекламы можно предложить своего российского игрока и голосовать за кандидатов. Больше голосов даёт приоритет при равной хорошей форме (например, 4 голоса важнее 1), но провально играющий игрок не займёт место сильного кандидата.
        </div>

        ${isClub && clubRoster.length
          ? `<div style="background:var(--soft);padding:10px;border-radius:8px;border:1px solid var(--line);margin-bottom:12px">
              <div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:8px">
                <select id="nt_prop_pid" style="flex:1;min-width:190px">
                  ${clubRoster.map((p: any) => `<option value="${e(p.id)}">${e(p.name)} (${e(p.pos)} · Рейт ${Number(p.rating || 0).toFixed(1)})</option>`).join('')}
                </select>
                <button class="btn sm" id="nt_prop_player_btn" ${ntBtnDisabled ? 'disabled' : ''} style="min-height:42px;font-variant-numeric:tabular-nums;${ntBtnDisabled ? 'opacity:0.6' : ''}">
                  ${ntMaxed
                    ? `Лимит ${ntMax}/${ntMax}`
                    : ntInCd
                      ? `<span data-nt-cd="${ntCdTarget}" data-nt-cd-fmt="long">Перерыв ${fmtShortCooldown(ntCdTarget - nowNt)}</span>`
                      : 'Предложить (реклама)'}
                </button>
              </div>
              <input id="nt_prop_note" maxlength="160" placeholder="Почему достоин вызова (необязательно)" style="width:100%">
            </div>`
          : !isClub && !isAdmin
            ? '<div class="small muted" style="margin-bottom:10px">Войдите по коду клуба, чтобы предложить игрока своего клуба. Голосовать за кандидатов могут все!</div>'
            : ''}

        ${playerProps.length
          ? `<div class="wrap"><table><thead><tr><th class="l">Кандидат</th><th>Стат.</th><th>Голоса</th><th></th></tr></thead><tbody style="font-variant-numeric:tabular-nums">
            ${playerProps.map((pr: any) => `
              <tr>
                <td class="l">
                  <b>${e(pr.playerName)}</b> <span class="small muted">(${e(pr.pos)}, ${e(pr.teamName)})</span>
                  <div class="small muted">
                    ${pr.inActiveSquad ? '<span style="color:#15803d;font-weight:700">В составе сборной</span>' : 'Кандидат'}
                    ${pr.note ? ' · ' + e(pr.note) : ''}
                  </div>
                </td>
                <td class="small">М:${pr.matches} Г:${pr.goals} Р:${Number(pr.rating || 0).toFixed(1)}</td>
                <td><b>${pr.votes}</b></td>
                <td>
                  <button class="btn alt sm" data-nt-vote-pl="${e(pr.pid)}" ${ntBtnDisabled ? 'disabled' : ''} style="min-height:38px;font-variant-numeric:tabular-nums;${ntBtnDisabled ? 'opacity:0.6' : ''}">
                    ${ntMaxed
                      ? 'Лимит'
                      : ntInCd
                        ? `<span data-nt-cd="${ntCdTarget}" data-nt-cd-fmt="short">⏳ ${fmtShortCooldown(ntCdTarget - nowNt)}</span>`
                        : '+1 (реклама)'}
                  </button>
                </td>
              </tr>`).join('')}
          </tbody></table></div>`
          : '<div class="small muted">На этот сбор клубы ещё не предлагали кандидатов.</div>'}
      </div>

      <div class="panel" style="margin-bottom:0">
        <h3 style="margin:0 0 6px">Соперник для товарищеского матча сборной</h3>
        <div class="small muted" style="margin-bottom:10px;line-height:1.45">
          Предложите сборную-соперника за рекламу или проголосуйте за уже созданный вариант. Голосование открыто для всех пользователей.
        </div>

        <div style="background:var(--soft);padding:10px;border-radius:8px;border:1px solid var(--line);margin-bottom:12px">
          <div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:8px">
            <input id="nt_prop_opp_name" list="nat_list" maxlength="60" placeholder="Страна / Сборная (например: Сербия, Египет)" style="flex:1;min-width:190px">
            <button class="btn sm" id="nt_prop_opp_btn" ${ntBtnDisabled ? 'disabled' : ''} style="min-height:42px;font-variant-numeric:tabular-nums;${ntBtnDisabled ? 'opacity:0.6' : ''}">
              ${ntMaxed
                ? `Лимит ${ntMax}/${ntMax}`
                : ntInCd
                  ? `<span data-nt-cd="${ntCdTarget}" data-nt-cd-fmt="long">Перерыв ${fmtShortCooldown(ntCdTarget - nowNt)}</span>`
                  : 'Предложить (реклама)'}
            </button>
          </div>
          <input id="nt_prop_opp_comment" maxlength="140" placeholder="Комментарий (например: матч на ВТБ Арене)" style="width:100%">
        </div>

        ${oppProps.length
          ? `<div class="wrap"><table><thead><tr><th class="l">Сборная</th><th>Голоса</th><th></th></tr></thead><tbody style="font-variant-numeric:tabular-nums">
            ${oppProps.map((op: any) => `
              <tr>
                <td class="l">
                  <b>${e(op.opponent)}</b>
                  <div class="small muted">От: ${e(op.proposedByName)}${op.comment ? ' · ' + e(op.comment) : ''}</div>
                </td>
                <td><b>${op.votes}</b></td>
                <td>
                  <div class="row" style="gap:4px;justify-content:flex-end">
                    <button class="btn alt sm" data-nt-vote-opp="${e(op.id)}" ${ntBtnDisabled ? 'disabled' : ''} style="min-height:38px;font-variant-numeric:tabular-nums;${ntBtnDisabled ? 'opacity:0.6' : ''}">
                      ${ntMaxed
                        ? 'Лимит'
                        : ntInCd
                          ? `<span data-nt-cd="${ntCdTarget}" data-nt-cd-fmt="short">⏳ ${fmtShortCooldown(ntCdTarget - nowNt)}</span>`
                          : 'Голос (реклама)'}
                    </button>
                    ${isAdmin ? `<button class="btn sm" data-nt-pick-opp="${e(op.opponent)}" title="Подставить соперника в форму матча">Выбрать</button>` : ''}
                  </div>
                </td>
              </tr>`).join('')}
          </tbody></table></div>`
          : '<div class="small muted">Предложений соперника пока нет — будьте первым!</div>'}
      </div>
    </div>
  `;

  if (nationalTimerHandle) clearInterval(nationalTimerHandle);
  if (ntResetTarget > nowNt || ntInCd) {
    nationalTimerHandle = setInterval(() => {
      if (!document.body.contains(container)) {
        clearInterval(nationalTimerHandle);
        return;
      }
      const nowTick = Date.now();
      let needReload = false;
      const resetEl = document.getElementById('nt_reset_timer');
      if (resetEl && ntResetTarget > 0) {
        const left = ntResetTarget - nowTick;
        if (left > 0) resetEl.textContent = fmtCountdown(left);
        else {
          resetEl.textContent = 'Сброс…';
          needReload = true;
        }
      }
      const statusEl = container.querySelector('[data-nt-cd-status]') as HTMLElement | null;
      if (statusEl) {
        const target = Number(statusEl.dataset.ntCdStatus || 0);
        const rem = target - nowTick;
        if (rem > 0) {
          statusEl.textContent = `⏳ ${fmtShortCooldown(rem)}`;
        } else {
          needReload = true;
        }
      }
      container.querySelectorAll('[data-nt-cd]').forEach((cdEl) => {
        const el = cdEl as HTMLElement;
        const target = Number(el.dataset.ntCd || 0);
        const rem = target - nowTick;
        if (rem > 0) {
          el.textContent = el.dataset.ntCdFmt === 'long'
            ? `Перерыв ${fmtShortCooldown(rem)}`
            : `⏳ ${fmtShortCooldown(rem)}`;
        } else {
          needReload = true;
        }
      });
      if (needReload) {
        clearInterval(nationalTimerHandle);
        setTimeout(() => reloadNational(), 400);
      }
    }, 1000);
  }

  const propPlBtn = document.getElementById('nt_prop_player_btn') as HTMLButtonElement | null;
  if (propPlBtn && !propPlBtn.disabled) {
    propPlBtn.onclick = async () => {
      if (propPlBtn.disabled) return;
      const pid = (document.getElementById('nt_prop_pid') as HTMLSelectElement).value;
      const note = (document.getElementById('nt_prop_note') as HTMLInputElement).value.trim();
      if (!pid) return;
      propPlBtn.disabled = true;
      let reloaded = false;
      try {
        const adRes = await runAdsgramBlock('nt_propose_player', 'Предложение игрока в сборную России');
        if (!adRes) {
          reloadNational();
          reloaded = true;
          return;
        }
        const res = await api('/national/propose-player', { pid, note, adProof: adRes.adProof });
        toast(res.message);
        reloadNational();
        reloaded = true;
      } catch (err: any) {
        toast(err?.message || 'Ошибка предложения игрока', true);
        reloadNational();
        reloaded = true;
      } finally {
        if (!reloaded && document.body.contains(propPlBtn)) propPlBtn.disabled = false;
      }
    };
  }

  container.querySelectorAll('[data-nt-vote-pl]').forEach((b) => {
    const btn = b as HTMLButtonElement;
    if (btn.disabled) return;
    btn.onclick = async () => {
      if (btn.disabled) return;
      const pid = btn.dataset.ntVotePl!;
      btn.disabled = true;
      let reloaded = false;
      try {
        const adRes = await runAdsgramBlock('nt_vote_player', 'Голосование за игрока в сборную России');
        if (!adRes) {
          reloadNational();
          reloaded = true;
          return;
        }
        const res = await api('/national/vote-player', { pid, adProof: adRes.adProof });
        toast(res.message);
        reloadNational();
        reloaded = true;
      } catch (err: any) {
        toast(err?.message || 'Ошибка голосования', true);
        reloadNational();
        reloaded = true;
      } finally {
        if (!reloaded && document.body.contains(btn)) btn.disabled = false;
      }
    };
  });

  const propOppBtn = document.getElementById('nt_prop_opp_btn') as HTMLButtonElement | null;
  if (propOppBtn && !propOppBtn.disabled) {
    propOppBtn.onclick = async () => {
      if (propOppBtn.disabled) return;
      const opponent = (document.getElementById('nt_prop_opp_name') as HTMLInputElement).value.trim();
      const comment = (document.getElementById('nt_prop_opp_comment') as HTMLInputElement).value.trim();
      if (opponent.length < 2) {
        toast('Укажите название сборной-соперника', true);
        return;
      }
      propOppBtn.disabled = true;
      let reloaded = false;
      try {
        const adRes = await runAdsgramBlock('nt_propose_opp', `Предложить соперника: ${opponent}`);
        if (!adRes) {
          reloadNational();
          reloaded = true;
          return;
        }
        const res = await api('/national/propose-opponent', { opponent, comment, adProof: adRes.adProof });
        toast(res.message);
        reloadNational();
        reloaded = true;
      } catch (err: any) {
        toast(err?.message || 'Ошибка предложения соперника', true);
        reloadNational();
        reloaded = true;
      } finally {
        if (!reloaded && document.body.contains(propOppBtn)) propOppBtn.disabled = false;
      }
    };
  }

  container.querySelectorAll('[data-nt-vote-opp]').forEach((b) => {
    const btn = b as HTMLButtonElement;
    if (btn.disabled) return;
    btn.onclick = async () => {
      if (btn.disabled) return;
      const proposalId = btn.dataset.ntVoteOpp!;
      btn.disabled = true;
      let reloaded = false;
      try {
        const adRes = await runAdsgramBlock('nt_vote_opp', 'Голосование за соперника сборной России');
        if (!adRes) {
          reloadNational();
          reloaded = true;
          return;
        }
        const res = await api('/national/vote-opponent', { proposalId, adProof: adRes.adProof });
        toast(res.message);
        reloadNational();
        reloaded = true;
      } catch (err: any) {
        toast(err?.message || 'Ошибка голосования', true);
        reloadNational();
        reloaded = true;
      } finally {
        if (!reloaded && document.body.contains(btn)) btn.disabled = false;
      }
    };
  });

  container.querySelectorAll('[data-nt-pick-opp]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const inp = document.getElementById('nt_opp') as HTMLInputElement | null;
      if (inp) {
        inp.value = (b as HTMLElement).dataset.ntPickOpp!;
        inp.scrollIntoView({ behavior: 'smooth', block: 'center' });
        toast(`Соперник «${inp.value}» подставлен в форму матча`);
      }
    };
  });
}

// ─── Admin Settings Adsgram Block Panel ───────────────────────────────────────
export function renderAdminAdsSettingsHtml(ov: any, e: (s: any) => string): string {
  const defs = ov.settings?.adsgramBlockDefs || [];
  const blocks = ov.settings?.adsgramBlocks || {};
  if (!defs.length) return '';
  const baseUrl = String(ov.settings?.appBaseUrl || ov.settings?.siteUrl || (typeof location !== 'undefined' ? location.origin : '')).replace(/\/+$/, '');
  const sdkRewardUrl = baseUrl ? `${baseUrl}/api/ads/sdk-reward?userid=[userId]` : '/api/ads/sdk-reward?userid=[userId]';
  const isBlockOk = (_d: any, val: string) => {
    const v = String(val || '').trim();
    return isRealConfiguredSdkBlockId(v);
  };

  return `
    <div class="panel" style="margin-top:16px">
      <h3>Рекламная сеть Adsgram (отдельный Block ID для каждой кнопки)</h3>
      <p class="small muted" style="margin:0 0 10px">Укажите реальные Block ID из личного кабинета Adsgram: числовой ID (<code>60557</code> — Reward), <code>int-12345</code> (Interstitial) или <code>task-12345</code> (Task). По правилам Adsgram на одно Mini App допускается не более 1 блока типа Task — один и тот же <code>task-...</code> можно указать в обоих полях для баннерных заданий.</p>
      <div class="grid g2">
        ${defs.map((d: any) => {
          const curVal = String(blocks[d.key] || d.defaultBlockId);
          const ok = isBlockOk(d, curVal);
          return `
          <label class="small" style="display:block">
            <span style="display:flex;justify-content:space-between;gap:6px;align-items:center">
              <span>${e(d.label)}</span>
              <span style="font-size:11px;font-weight:700;color:${ok ? '#15803d' : '#b91c1c'}">${ok ? '✓ Подключён' : '✕ Заглушка'}</span>
            </span>
            <input id="ads_blk_${e(d.key)}" value="${e(curVal)}" style="width:100%;margin-top:4px;font-family:monospace">
          </label>`;
        }).join('')}
      </div>

      <div style="margin-top:14px;padding:12px 14px;background:var(--soft);border:1px solid var(--line);border-radius:10px">
        <div style="font-weight:700;font-size:13.5px;margin-bottom:6px">Серверная проверка Mini App SDK (S2S Reward URL)</div>
        <div class="small muted" style="line-height:1.5;margin-bottom:8px">
          <b>SDK Reward URL</b> (необязательно; включайте галочку ниже только если прописали этот URL во всех Reward-блоках в кабинете Adsgram):<br>
          <code style="user-select:all;word-break:break-all">${e(sdkRewardUrl)}</code>
        </div>
        <label class="small" style="display:flex;align-items:center;gap:8px;cursor:pointer">
          <input type="checkbox" id="ads_require_s2s" ${ov.settings?.requireAdsgramS2S ? 'checked' : ''} style="width:auto">
          <span>Требовать строгое S2S-подтверждение от сервера Adsgram (Reward URL) для мини-приложения</span>
        </label>
      </div>

      <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
        <div class="small muted">Наградить Топ-3 Лиги прогнозов по итогам текущего сезона (€1 250 000 + 10 мон. + Кубок / €500 000 + 5 мон. / €250 000 + 3 мон.)</div>
        <button type="button" class="btn alt sm" id="btn_award_pred_season">Выдать призы Лиги прогнозов</button>
      </div>
    </div>
  `;
}

export function collectAdminAdsBlocks(ov: any): Record<string, string> {
  const defs = ov.settings?.adsgramBlockDefs || [];
  const out: Record<string, string> = {};
  for (const d of defs) {
    const inp = document.getElementById('ads_blk_' + d.key) as HTMLInputElement | null;
    if (inp && inp.value.trim()) out[d.key] = inp.value.trim();
  }
  return out;
}

export function collectAdminAdsRequireS2S(): boolean {
  const inp = document.getElementById('ads_require_s2s') as HTMLInputElement | null;
  return !!inp?.checked;
}

// ─── Admin Tab: Personal Ads Cabinet ("Реклама") ──────────────────────────────
let ADM_ADS_SUBTAB: 'overview' | 'clubs' | 'wallets' | 'logs' | 'settings' = 'overview';
let ADM_ADS_CLUB_Q = '';
let ADM_ADS_CLUB_COMP = 'all';
let ADM_ADS_WALLET_Q = '';
let ADM_ADS_LOG_TYPE = 'all';
let ADM_ADS_LOG_Q = '';
let LAST_TEST_RESULT: { blockKey: string; ok: boolean; msg: string; ts: number } | null = null;

function fmtRelTime(ts: number): string {
  if (!ts) return '—';
  const diffSec = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (diffSec < 60) return `${diffSec}с назад`;
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}м назад`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}ч назад`;
  return new Date(ts).toLocaleDateString('ru-RU');
}

function formatBadgeHtml(sdkType: string): string {
  if (sdkType === 'interstitial') return '<span class="adcab-badge info">Interstitial (int-)</span>';
  if (sdkType === 'task') return '<span class="adcab-badge warn">Task (task-)</span>';
  return '<span class="adcab-badge ok">Rewarded</span>';
}

function catLabelRu(cat: string): string {
  switch (cat) {
    case 'sponsors': return 'Спонсоры / РФС';
    case 'friendly': return 'Товарищеские';
    case 'predictions': return 'Лига прогнозов';
    case 'national': return 'Сборная России';
    case 'interview': return 'Интервью';
    case 'transfers': return 'Трансферы';
    default: return cat;
  }
}

export async function renderAdminAdsTab(ab: HTMLElement, ov: any, _reloadAdmin: () => void) {
  ensureExtStyles();
  const { api, act, e, toast } = B();

  ab.innerHTML = '<div class="panel">Загрузка личного кабинета рекламы Adsgram…</div>';

  let dash: any;
  try {
    dash = await api('/admin/ads/dashboard');
  } catch (err: any) {
    ab.innerHTML = `<div class="panel warn">Не удалось загрузить статистику рекламы: ${e(err?.message || 'Ошибка сервера')}</div>`;
    return;
  }

  const paint = () => {
    const k = dash.kpis || {};
    const cfg = dash.config || {};
    const fmt = dash.formatStats || {};
    const uniqueTaskIds: string[] = Array.isArray(cfg.uniqueTaskIds) ? cfg.uniqueTaskIds : [];
    const taskRuleOk = uniqueTaskIds.length <= 1;

    const approvalRateTotal = (k.totalSponsorApprovals + k.totalSponsorDeclines) > 0
      ? Math.round((k.totalSponsorApprovals / (k.totalSponsorApprovals + k.totalSponsorDeclines)) * 100)
      : 95;

    const heroHtml = `
      <div class="adcab-hero">
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">
            <h2>Личный кабинет рекламы</h2>
            <span class="adcab-badge ${cfg.requireAdsgramS2S ? 'ok' : 'muted'}">S2S: ${cfg.requireAdsgramS2S ? 'Строгий режим ВКЛ' : 'Клиентский режим'}</span>
            <span class="adcab-badge ${taskRuleOk ? 'ok' : 'err'}">Task-блоков: ${uniqueTaskIds.length}/1</span>
          </div>
          <div class="adcab-hero-sub">
            Полная аналитика по всем 14 рекламным блокам Adsgram, выплатам клубам в евро, начислению монет болельщикам, активным сессиям, S2S-подтверждениям и логам ошибок SDK.
          </div>
        </div>
        <div class="row" style="gap:8px;flex-wrap:wrap">
          <button type="button" class="btn sm" id="adcab_refresh" style="background:#f0c419;color:#0d2f21;font-weight:700">🔄 Обновить</button>
          <button type="button" class="btn sm alt" id="adcab_clear_logs">🧹 Очистить журнал</button>
        </div>
      </div>

      ${!taskRuleOk ? `
        <div class="warn" style="margin-bottom:14px">
          <b>⚠️ Внимание по правилам Adsgram:</b> сейчас указано <b>${uniqueTaskIds.length}</b> разных ID формата <code>task-*</code> (${uniqueTaskIds.map((x) => `<code>${e(x)}</code>`).join(', ')}).
          Adsgram разрешает только <b>1 блок типа Task на одно Mini App</b>. Укажите один и тот же <code>task-...</code> во всех Task-полях во вкладке «Настройки блоков», иначе лишние блоки не будут отдавать рекламу!
        </div>
      ` : ''}

      <div class="adcab-kpis">
        <div class="adcab-kpi">
          <span class="adcab-kpi-lbl">Просмотров завершено</span>
          <span class="adcab-kpi-val">${Number(k.totalCompleted || 0).toLocaleString('ru-RU')}</span>
          <span class="adcab-kpi-sub">За сессию: ${k.totalCompletedSession || 0} / ${k.totalStartedSession || 0} запусков</span>
        </div>
        <div class="adcab-kpi">
          <span class="adcab-kpi-lbl">Выплачено клубам</span>
          <span class="adcab-kpi-val" style="color:#15803d">${fmtEuro(k.totalEurAllTime || 0)}</span>
          <span class="adcab-kpi-sub">За 24ч: ${fmtEuro(k.totalEurCycle || 0)} · Одобрено ${approvalRateTotal}%</span>
        </div>
        <div class="adcab-kpi">
          <span class="adcab-kpi-lbl">Монет с рекламы</span>
          <span class="adcab-kpi-val" style="color:#b45309">${Number(k.totalCoinsIssuedByAds || 0).toLocaleString('ru-RU')}</span>
          <span class="adcab-kpi-sub">На руках: ${fmtCoins(k.totalCoinsInCirculation || 0)} мон. (${k.totalWallets || 0} чел.)</span>
        </div>
        <div class="adcab-kpi">
          <span class="adcab-kpi-lbl">Конверсия показа</span>
          <span class="adcab-kpi-val">${k.completionRatePct !== null && k.completionRatePct !== undefined ? k.completionRatePct + '%' : '—'}</span>
          <span class="adcab-kpi-sub">Ошибок: ${k.totalErrorsSession || 0} · Пропусков: ${k.totalCancelsSession || 0}</span>
        </div>
        <div class="adcab-kpi">
          <span class="adcab-kpi-lbl">S2S Callbacks</span>
          <span class="adcab-kpi-val">${k.s2sReceivedSession || 0}</span>
          <span class="adcab-kpi-sub">Совпало с сессиями: ${k.s2sMatchedSession || 0}</span>
        </div>
        <div class="adcab-kpi">
          <span class="adcab-kpi-lbl">Активность сейчас</span>
          <span class="adcab-kpi-val">${k.activeSessionsCount || 0}</span>
          <span class="adcab-kpi-sub">Клубов в 24ч цикле: ${k.activeClubsInCycleCount || 0}</span>
        </div>
      </div>

      <div class="adcab-subtabs">
        <button type="button" data-adcab-tab="overview" class="${ADM_ADS_SUBTAB === 'overview' ? 'on' : ''}">📊 Обзор и блоки (14)</button>
        <button type="button" data-adcab-tab="clubs" class="${ADM_ADS_SUBTAB === 'clubs' ? 'on' : ''}">🏢 Клубы и спонсоры (${(dash.clubsTable || []).length})</button>
        <button type="button" data-adcab-tab="wallets" class="${ADM_ADS_SUBTAB === 'wallets' ? 'on' : ''}">🪙 Игроки и монеты (${(dash.walletsTable || []).length})</button>
        <button type="button" data-adcab-tab="logs" class="${ADM_ADS_SUBTAB === 'logs' ? 'on' : ''}">📜 Журнал и S2S (${(dash.recentEvents || []).length})</button>
        <button type="button" data-adcab-tab="settings" class="${ADM_ADS_SUBTAB === 'settings' ? 'on' : ''}">⚙️ Настройки блоков</button>
      </div>
    `;

    let bodyHtml = '';

    if (ADM_ADS_SUBTAB === 'overview') {
      const renderFmtCard = (title: string, subtitle: string, fObj: any, badgeCls: string) => {
        const conv = fObj?.startedSession > 0 ? Math.round((fObj.completedSession / fObj.startedSession) * 100) + '%' : '—';
        return `
          <div class="panel" style="margin-bottom:0">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px">
              <b style="font-size:14.5px">${e(title)}</b>
              <span class="adcab-badge ${badgeCls}">${fObj?.configured || 0}/${fObj?.blocks || 0} ID</span>
            </div>
            <div class="small muted" style="margin-bottom:10px">${e(subtitle)}</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;text-align:center;background:var(--soft);padding:8px;border-radius:8px;font-variant-numeric:tabular-nums">
              <div><div class="small muted">Всего</div><b>${fObj?.completed || 0}</b></div>
              <div><div class="small muted">Запуски/Ок</div><b>${fObj?.startedSession || 0}/${fObj?.completedSession || 0}</b></div>
              <div><div class="small muted">Ошибки / %</div><b>${fObj?.errorsSession || 0} · ${conv}</b></div>
            </div>
          </div>`;
      };

      const topErrors: any[] = dash.topErrorReasons || [];
      const sponsorsBr: any[] = dash.sponsorsBreakdown || [];
      const blocksTable: any[] = dash.blocksTable || [];

      bodyHtml = `
        <div class="adcab-fmt-grid">
          ${renderFmtCard('Rewarded (Видео)', 'Числовой Block ID · 15–30с видео с обязательным досмотром', fmt.reward, 'ok')}
          ${renderFmtCard('Interstitial (int-)', 'Префикс int- · Короткие полноэкранные блоки 5–10с', fmt.interstitial, 'info')}
          ${renderFmtCard('Task (task-)', 'Префикс task- · Карточка задания с переходом (макс. 1 на App)', fmt.task, 'warn')}
        </div>

        ${LAST_TEST_RESULT ? `
          <div class="panel" style="border-left:4px solid ${LAST_TEST_RESULT.ok ? '#16a34a' : '#dc2626'};background:${LAST_TEST_RESULT.ok ? '#f0fdf4' : '#fef2f2'};margin-bottom:14px">
            <div class="row sp" style="gap:8px;align-items:center">
              <div>
                <b>Тест блока <code>${e(LAST_TEST_RESULT.blockKey)}</code> (${new Date(LAST_TEST_RESULT.ts).toLocaleTimeString('ru-RU')}):</b>
                <span>${e(LAST_TEST_RESULT.msg)}</span>
              </div>
              <button type="button" class="btn sm alt" id="adcab_close_test">Скрыть</button>
            </div>
          </div>
        ` : ''}

        <div class="panel">
          <h3 style="margin:0 0 10px">Выручка клубов по источникам (за всё время)</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px">
            ${sponsorsBr.map((sp) => `
              <div style="border:1px solid var(--line);border-top:3px solid ${e(sp.accentColor)};border-radius:10px;padding:11px 13px;background:#fff;font-variant-numeric:tabular-nums">
                <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:4px">
                  <b style="font-size:14px">${e(sp.name)}</b>
                  <code class="small">${e(sp.blockId)}</code>
                </div>
                <div style="font:700 18px Unbounded,sans-serif;color:#15803d;margin:4px 0">${fmtEuro(sp.eur)}</div>
                <div class="small muted">Одобрено: <b>${sp.approved}</b>${sp.declined ? ` · Отказ (5%): <b>${sp.declined}</b>` : ''}</div>
                <div class="small muted">Посл.: ${fmtRelTime(sp.lastAt)}</div>
              </div>
            `).join('')}
          </div>
        </div>

        ${topErrors.length ? `
          <div class="panel" style="border-left:4px solid #f59e0b;background:#fffbeb">
            <h3 style="margin:0 0 8px;color:#92400e">Частые причины отказов и ошибок SDK (текущая сессия сервера)</h3>
            <div style="display:flex;flex-wrap:wrap;gap:8px">
              ${topErrors.map((er) => `
                <span class="adcab-badge warn" style="white-space:normal;padding:5px 10px">
                  <b>${er.count}×</b> ${e(er.reason)}
                </span>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="panel">
          <div class="row sp" style="margin-bottom:10px;flex-wrap:wrap;gap:8px">
            <div>
              <h3 style="margin:0 0 2px">Все рекламные блоки приложения (14)</h3>
              <div class="small muted">Нажмите «▶ Тест» внутри Telegram Mini App для проверки выдачи рекламы конкретного блока без начисления баланса.</div>
            </div>
          </div>
          <div class="wrap">
            <table>
              <thead>
                <tr>
                  <th class="l">Блок и категория</th>
                  <th class="l">Block ID</th>
                  <th>Формат</th>
                  <th class="l">Награда / Лимит</th>
                  <th>Заверш. всего</th>
                  <th>Запуски / Ош.</th>
                  <th>Выдано</th>
                  <th>Посл.</th>
                  <th>Проверка</th>
                </tr>
              </thead>
              <tbody style="font-variant-numeric:tabular-nums">
                ${blocksTable.map((b) => {
                  const issued = b.eur > 0 ? fmtEuro(b.eur) : b.coins > 0 ? `${b.coins} мон.` : '—';
                  return `
                    <tr>
                      <td class="l" style="min-width:210px">
                        <div style="font-weight:700">${e(b.label)}</div>
                        <div class="small muted">${e(catLabelRu(b.category))} · key: <code>${e(b.key)}</code></div>
                      </td>
                      <td class="l">
                        <code style="font-weight:700">${e(b.blockId)}</code>
                        <div class="small">${b.configured ? '<span style="color:#15803d">✓ Активен</span>' : '<span style="color:#b91c1c">✕ Заглушка</span>'}</div>
                      </td>
                      <td>${formatBadgeHtml(b.sdkType)}</td>
                      <td class="l small">${e(b.rewardLabel)}<div class="muted">лимит: ${b.maxPerCycle}/цикл</div></td>
                      <td><b>${b.completed}</b>${b.declinedCount ? `<div class="small muted">отказ: ${b.declinedCount}</div>` : ''}</td>
                      <td>
                        <div>${b.sessionStarted} / ${b.sessionCompleted}</div>
                        <div class="small ${(b.sessionErrors + b.sessionCancels) > 0 ? 'warn' : 'muted'}" style="padding:0;background:none;border:0">ош:${b.sessionErrors} · отм:${b.sessionCancels}</div>
                      </td>
                      <td><b>${issued}</b></td>
                      <td class="small muted">${fmtRelTime(b.lastAt)}</td>
                      <td>
                        <button type="button" class="btn alt sm" data-adcab-test="${e(b.key)}" data-adcab-lbl="${e(b.label)}">▶ Тест</button>
                      </td>
                    </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (ADM_ADS_SUBTAB === 'clubs') {
      const q = ADM_ADS_CLUB_Q.trim().toLowerCase();
      const clubs: any[] = (dash.clubsTable || []).filter((c: any) => {
        if (ADM_ADS_CLUB_COMP !== 'all' && c.comp !== ADM_ADS_CLUB_COMP) return false;
        if (q && !String(c.name || '').toLowerCase().includes(q)) return false;
        return true;
      });
      bodyHtml = `
        <div class="panel">
          <div class="row sp" style="gap:10px;flex-wrap:wrap;margin-bottom:12px">
            <div class="row" style="gap:6px;flex-wrap:wrap">
              ${[['all', 'Все лиги'], ['rpl', 'РПЛ'], ['fnl', 'Первая лига'], ['fnl2', '2-я лига']].map(([cid, cname]) => `
                <button type="button" class="btn sm ${ADM_ADS_CLUB_COMP === cid ? '' : 'alt'}" data-adcab-ccomp="${cid}">${cname}</button>
              `).join('')}
            </div>
            <input id="adcab_club_q" value="${e(ADM_ADS_CLUB_Q)}" placeholder="Поиск клуба…" style="max-width:240px">
          </div>
          <div class="wrap">
            <table>
              <thead>
                <tr>
                  <th class="l">Клуб</th>
                  <th>Газпром (€750)</th>
                  <th>Т-Банк (€500)</th>
                  <th>Аэрофлот (€250)</th>
                  <th>РФС (€1000)</th>
                  <th>Товар.</th>
                  <th>За 24ч</th>
                  <th>Всего с рекл.</th>
                  <th class="l">Статус / Сброс</th>
                </tr>
              </thead>
              <tbody style="font-variant-numeric:tabular-nums">
                ${clubs.map((c) => {
                  const cdTxt = c.activeCooldownMs > 0 ? `КД ${fmtShortCooldown(c.activeCooldownMs)}` : '';
                  const resetTxt = c.cycleActive && c.remainingMs > 0 ? `Сброс ${fmtCountdown(c.remainingMs)}` : 'Цикл свободен';
                  return `
                    <tr>
                      <td class="l">
                        <div class="t-cell">
                          ${c.logo ? `<img class="t-logo" src="${e(c.logo)}" alt="">` : ''}
                          <div>
                            <b>${e(c.name)}</b>
                            <div class="small muted">${e(c.compName)} · Бюджет: ${fmtEuro(c.budget)}</div>
                          </div>
                        </div>
                      </td>
                      <td><b>${c.gazpromViews}/10</b>${c.gazpromDeclined ? `<div class="small muted">отк:${c.gazpromDeclined}</div>` : ''}</td>
                      <td><b>${c.tbankViews}/10</b>${c.tbankDeclined ? `<div class="small muted">отк:${c.tbankDeclined}</div>` : ''}</td>
                      <td><b>${c.aeroflotViews}/10</b>${c.aeroflotDeclined ? `<div class="small muted">отк:${c.aeroflotDeclined}</div>` : ''}</td>
                      <td>
                        <div><b>${c.totalViewsCycle}/30</b></div>
                        <div class="small">${c.rfsClaimed ? `<span style="color:#15803d;font-weight:700">Бонус (${c.rfsExtraViews}/30)</span>` : c.rfsUnlocked ? '<span style="color:#0284c7">Открыт</span>' : '<span class="muted">закрыт</span>'}</div>
                      </td>
                      <td><b>${c.friendlyAdsTotal}</b></td>
                      <td><b>${fmtEuro(c.earnedEurCycle + c.rfsEarnedEurCycle)}</b></td>
                      <td><b style="color:#15803d">${fmtEuro(c.allTimeAdEur)}</b><div class="small muted">${c.allTimeAdTxCount} выпл.</div></td>
                      <td class="l small">
                        <div>${resetTxt}</div>
                        ${cdTxt ? `<div style="color:#b45309;font-weight:600">${cdTxt}</div>` : `<div class="muted">Посл.: ${fmtRelTime(c.lastAdAt)}</div>`}
                      </td>
                    </tr>`;
                }).join('') || '<tr><td colspan="9" class="empty">Клубы не найдены</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (ADM_ADS_SUBTAB === 'wallets') {
      const q = ADM_ADS_WALLET_Q.trim().toLowerCase();
      const wallets: any[] = (dash.walletsTable || []).filter((w: any) => {
        if (!q) return true;
        return `${w.displayName} ${w.tgId} ${w.telegramUsername} ${w.teamName}`.toLowerCase().includes(q);
      });
      bodyHtml = `
        <div class="panel">
          <div class="row sp" style="gap:10px;flex-wrap:wrap;margin-bottom:12px">
            <div>
              <h3 style="margin:0 0 2px">Кошельки болельщиков и владельцев (Лига прогнозов)</h3>
              <div class="small muted">Показывается баланс монет, сколько получено всего и активность по рекламным блокам монет за текущие 24 часа.</div>
            </div>
            <input id="adcab_wallet_q" value="${e(ADM_ADS_WALLET_Q)}" placeholder="Поиск по имени, @username, TG ID…" style="max-width:260px">
          </div>
          <div class="wrap">
            <table>
              <thead>
                <tr>
                  <th class="l">Пользователь</th>
                  <th class="l">Telegram</th>
                  <th>Баланс</th>
                  <th>Всего заработано</th>
                  <th>За 24ч (+1 / +2 / +3)</th>
                  <th class="l">Последний просмотр</th>
                </tr>
              </thead>
              <tbody style="font-variant-numeric:tabular-nums">
                ${wallets.map((w) => `
                  <tr>
                    <td class="l">
                      <div class="t-cell">
                        ${w.photoUrl ? `<img src="${e(w.photoUrl)}" alt="" style="width:26px;height:26px;border-radius:50%;object-fit:cover">` : ''}
                        <div>
                          <b>${e(w.displayName)}</b>
                          <div class="small muted">${w.teamName ? `Клуб: ${e(w.teamName)}` : (w.profileKind === 'admin' ? 'Администратор' : 'Болельщик')}</div>
                        </div>
                      </div>
                    </td>
                    <td class="l small">
                      ${w.tgId ? `<code>${e(w.tgId)}</code>` : '<span class="muted">Браузер</span>'}
                      ${w.telegramUsername ? `<div>@${e(w.telegramUsername)}</div>` : ''}
                    </td>
                    <td><b style="color:#b45309">${fmtCoins(w.coins)} мон.</b></td>
                    <td><b>${fmtCoins(w.totalEarnedCoins)}</b> <span class="small muted">(~${fmtCoins(w.earnedAdEst)} с рекл.)</span></td>
                    <td><b>${w.cycleTotal}</b> <span class="small muted">(${w.cycleShort} / ${w.cycleBanner} / ${w.cycleLong})</span></td>
                    <td class="l small muted">${fmtRelTime(w.lastAdAt)}</td>
                  </tr>`).join('') || '<tr><td colspan="6" class="empty">Кошельки не найдены</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (ADM_ADS_SUBTAB === 'logs') {
      const q = ADM_ADS_LOG_Q.trim().toLowerCase();
      const events: any[] = (dash.recentEvents || []).filter((ev: any) => {
        if (ADM_ADS_LOG_TYPE !== 'all' && ev.type !== ADM_ADS_LOG_TYPE) return false;
        if (q) {
          const hay = `${ev.actorLabel} ${ev.blockKey} ${ev.blockId} ${ev.tgId} ${ev.detail}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });
      const activeSess: any[] = dash.activeSessions || [];
      const s2sList: any[] = dash.recentS2S || [];

      const evBadge = (tp: string) => {
        if (tp === 'credit') return '<span class="adcab-badge ok">💰 Начислено</span>';
        if (tp === 'complete') return '<span class="adcab-badge ok">✅ Досмотрено</span>';
        if (tp === 'start') return '<span class="adcab-badge info">▶ Запуск</span>';
        if (tp === 's2s') return '<span class="adcab-badge info">🔗 S2S Webhook</span>';
        if (tp === 'cancel') return '<span class="adcab-badge warn">⏭ Отмена/Пропуск</span>';
        return '<span class="adcab-badge err">❌ Ошибка</span>';
      };

      bodyHtml = `
        <div class="grid g2">
          <div class="panel" style="margin-bottom:0">
            <h3 style="margin:0 0 6px">Активные просмотры прямо сейчас (${activeSess.length})</h3>
            <div class="small muted" style="margin-bottom:10px">Сессии в окне последних 15 минут, ещё не использованные для действия.</div>
            ${activeSess.length ? `
              <div class="wrap">
                <table>
                  <thead><tr><th class="l">Кто</th><th class="l">Блок</th><th>Прошло</th><th>Статус</th></tr></thead>
                  <tbody style="font-variant-numeric:tabular-nums">
                    ${activeSess.map((s) => `
                      <tr>
                        <td class="l small"><b>${e(s.actorLabel)}</b>${s.tgId ? ` <span class="muted">#${e(s.tgId)}</span>` : ''}</td>
                        <td class="l small"><code>${e(s.blockId)}</code> <span class="muted">(${e(s.blockKey)})</span></td>
                        <td>${s.elapsedSec}с</td>
                        <td>${s.verified ? '<span class="adcab-badge ok">Подтверждена</span>' : s.s2sConfirmed ? '<span class="adcab-badge info">S2S есть</span>' : '<span class="adcab-badge muted">Смотрит</span>'}</td>
                      </tr>`).join('')}
                  </tbody>
                </table>
              </div>
            ` : '<div class="small muted">Сейчас нет активных рекламных сессий.</div>'}
          </div>

          <div class="panel" style="margin-bottom:0">
            <h3 style="margin:0 0 6px">S2S Reward URL и входящие отклики (${s2sList.length})</h3>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;background:var(--soft);padding:8px 10px;border-radius:8px;border:1px solid var(--line);margin-bottom:10px">
              <code id="adcab_s2s_url" style="font-size:12px;word-break:break-all;flex:1">${e(cfg.sdkRewardUrl)}</code>
              <button type="button" class="btn sm alt" id="adcab_copy_s2s">📋 Копировать</button>
            </div>
            ${s2sList.length ? `
              <div class="wrap" style="max-height:220px;overflow-y:auto">
                <table>
                  <thead><tr><th class="l">Время</th><th class="l">TG ID</th><th class="l">Block ID</th><th>Статус</th></tr></thead>
                  <tbody style="font-variant-numeric:tabular-nums">
                    ${s2sList.slice(0, 25).map((r) => `
                      <tr>
                        <td class="l small">${new Date(r.receivedAt).toLocaleTimeString('ru-RU')}</td>
                        <td class="l"><code>${e(r.tgId)}</code></td>
                        <td class="l"><code>${e(r.blockId || '—')}</code></td>
                        <td>${r.used ? '<span class="adcab-badge ok">Засчитан</span>' : '<span class="adcab-badge info">В ожидании</span>'}</td>
                      </tr>`).join('')}
                  </tbody>
                </table>
              </div>
            ` : '<div class="small muted">S2S callback-запросы от Adsgram ещё не поступали в этой сессии сервера.</div>'}
          </div>
        </div>

        <div class="panel" style="margin-top:14px">
          <div class="row sp" style="gap:10px;flex-wrap:wrap;margin-bottom:12px">
            <div class="row" style="gap:6px;flex-wrap:wrap">
              ${[
                ['all', 'Все'],
                ['credit', 'Начисления'],
                ['complete', 'Досмотрено'],
                ['error', 'Ошибки / Нет рекламы'],
                ['cancel', 'Отмены / Пропуски'],
                ['s2s', 'S2S'],
                ['start', 'Запуски'],
              ].map(([tp, tl]) => `
                <button type="button" class="btn sm ${ADM_ADS_LOG_TYPE === tp ? '' : 'alt'}" data-adcab-logt="${tp}">${tl}</button>
              `).join('')}
            </div>
            <input id="adcab_log_q" value="${e(ADM_ADS_LOG_Q)}" placeholder="Фильтр: клуб, блок, ошибка, TG ID…" style="max-width:260px">
          </div>

          <div class="wrap">
            <table>
              <thead>
                <tr>
                  <th class="l">Время</th>
                  <th>Событие</th>
                  <th class="l">Кто / TG ID</th>
                  <th class="l">Блок (ID)</th>
                  <th class="l">Подробности и причина</th>
                </tr>
              </thead>
              <tbody style="font-variant-numeric:tabular-nums">
                ${events.map((ev) => `
                  <tr>
                    <td class="l small muted" style="white-space:nowrap">${new Date(ev.ts).toLocaleTimeString('ru-RU')}</td>
                    <td>${evBadge(ev.type)}</td>
                    <td class="l small"><b>${e(ev.actorLabel)}</b>${ev.tgId ? `<div class="muted">TG: ${e(ev.tgId)}</div>` : ''}</td>
                    <td class="l small"><code>${e(ev.blockId || '—')}</code><div class="muted">${e(ev.blockKey || '')}</div></td>
                    <td class="l small" style="white-space:normal;min-width:240px">
                      ${e(ev.detail)}
                      ${ev.durationMs ? ` <span class="muted">(${(ev.durationMs / 1000).toFixed(1)}с)</span>` : ''}
                    </td>
                  </tr>`).join('') || '<tr><td colspan="5" class="empty">Событий по выбранному фильтру пока нет.</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (ADM_ADS_SUBTAB === 'settings') {
      const defs: any[] = cfg.defs || [];
      const blocksMap = cfg.blocks || {};
      const categories = ['sponsors', 'predictions', 'friendly', 'national', 'interview', 'transfers'];

      bodyHtml = `
        <div class="panel">
          <h3 style="margin:0 0 6px">Управление Block ID и проверкой Adsgram</h3>
          <p class="small muted" style="margin:0 0 14px">
            Формат ID в Adsgram: число (<code>60557</code>) — длинная Reward-реклама; <code>int-...</code> — короткий Interstitial; <code>task-...</code> — карточка Task (не более 1 уникального Task-блока на приложение!).
          </p>

          ${categories.map((cat) => {
            const items = defs.filter((d) => d.category === cat);
            if (!items.length) return '';
            return `
              <div style="margin-bottom:16px">
                <div style="font-weight:700;font-size:13.5px;color:#0d2f21;margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid var(--line)">${e(catLabelRu(cat))}</div>
                <div class="grid g2">
                  ${items.map((d) => {
                    const val = String(blocksMap[d.key] || d.defaultBlockId);
                    const ok = isRealConfiguredSdkBlockId(val);
                    return `
                      <label class="small" style="display:block">
                        <span style="display:flex;justify-content:space-between;gap:6px;align-items:center">
                          <span>${e(d.label)}</span>
                          <span style="font-weight:700;color:${ok ? '#15803d' : '#b91c1c'}">${ok ? '✓ Валидный ID' : '✕ Неверный формат'}</span>
                        </span>
                        <input id="adcab_blk_${e(d.key)}" value="${e(val)}" style="width:100%;margin-top:4px;font-family:monospace">
                      </label>`;
                  }).join('')}
                </div>
              </div>`;
          }).join('')}

          <div style="margin-top:12px;padding:12px 14px;background:var(--soft);border:1px solid var(--line);border-radius:10px">
            <div style="font-weight:700;font-size:13.5px;margin-bottom:6px">Серверная проверка Mini App SDK (S2S Reward URL)</div>
            <div class="small muted" style="line-height:1.5;margin-bottom:8px">
              Если включаете строгую проверку — обязательно пропишите этот Reward URL во всех Reward-блоках в кабинете Adsgram:<br>
              <code style="user-select:all;word-break:break-all">${e(cfg.sdkRewardUrl)}</code>
            </div>
            <label class="small" style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="adcab_require_s2s" ${cfg.requireAdsgramS2S ? 'checked' : ''} style="width:auto">
              <span>Требовать строгое S2S-подтверждение от сервера Adsgram (Reward URL) для Reward/Task блоков</span>
            </label>
          </div>

          <div class="row sp" style="margin-top:14px;flex-wrap:wrap;gap:10px">
            <button type="button" class="btn" id="adcab_save_cfg">💾 Сохранить настройки рекламы</button>
            <button type="button" class="btn alt sm" id="adcab_award_pred">🏆 Выдать призы Топ-3 Лиги прогнозов за сезон</button>
          </div>
        </div>
      `;
    }

    ab.innerHTML = heroHtml + bodyHtml;

    // Wire actions
    const refreshBtn = document.getElementById('adcab_refresh');
    if (refreshBtn) refreshBtn.onclick = () => renderAdminAdsTab(ab, ov, _reloadAdmin);

    const clearBtn = document.getElementById('adcab_clear_logs');
    if (clearBtn) {
      clearBtn.onclick = async () => {
        if (!confirm('Очистить журнал рекламных событий и счётчики текущей сессии сервера? (Выплаты в базе не затронутся)')) return;
        await act(() => api('/admin/ads/clear-logs', {}), 'Журнал рекламы очищен');
        renderAdminAdsTab(ab, ov, _reloadAdmin);
      };
    }

    const closeTestBtn = document.getElementById('adcab_close_test');
    if (closeTestBtn) {
      closeTestBtn.onclick = () => {
        LAST_TEST_RESULT = null;
        paint();
      };
    }

    ab.querySelectorAll('[data-adcab-tab]').forEach((b) => {
      (b as HTMLButtonElement).onclick = () => {
        ADM_ADS_SUBTAB = (b as HTMLElement).dataset.adcabTab as any;
        paint();
      };
    });

    ab.querySelectorAll('[data-adcab-test]').forEach((b) => {
      (b as HTMLButtonElement).onclick = async () => {
        const btn = b as HTMLButtonElement;
        if (btn.disabled) return;
        btn.disabled = true;
        const bk = btn.dataset.adcabTest!;
        const lbl = btn.dataset.adcabLbl || bk;
        try {
          const adRes = await runAdsgramBlock(bk, `Тест блока: ${lbl}`, 'Проверка выдачи Adsgram без начисления наград', { isAdminTest: true });
          LAST_TEST_RESULT = adRes
            ? { blockKey: bk, ok: true, msg: 'Блок отработал успешно, получено подтверждение от сервера!', ts: Date.now() }
            : { blockKey: bk, ok: false, msg: 'Показ не завершён или реклама не выдана (см. детали в «Журнал и S2S»).', ts: Date.now() };
          renderAdminAdsTab(ab, ov, _reloadAdmin);
        } catch (err: any) {
          LAST_TEST_RESULT = { blockKey: bk, ok: false, msg: err?.message || 'Ошибка теста', ts: Date.now() };
          renderAdminAdsTab(ab, ov, _reloadAdmin);
        }
      };
    });

    ab.querySelectorAll('[data-adcab-ccomp]').forEach((b) => {
      (b as HTMLButtonElement).onclick = () => {
        ADM_ADS_CLUB_COMP = (b as HTMLElement).dataset.adcabCcomp || 'all';
        paint();
      };
    });

    const clubQ = document.getElementById('adcab_club_q') as HTMLInputElement | null;
    if (clubQ) {
      clubQ.oninput = () => {
        ADM_ADS_CLUB_Q = clubQ.value;
        const pos = clubQ.selectionStart ?? ADM_ADS_CLUB_Q.length;
        paint();
        const next = document.getElementById('adcab_club_q') as HTMLInputElement | null;
        if (next) {
          next.focus();
          try { next.setSelectionRange(pos, pos); } catch {}
        }
      };
    }

    const walletQ = document.getElementById('adcab_wallet_q') as HTMLInputElement | null;
    if (walletQ) {
      walletQ.oninput = () => {
        ADM_ADS_WALLET_Q = walletQ.value;
        const pos = walletQ.selectionStart ?? ADM_ADS_WALLET_Q.length;
        paint();
        const next = document.getElementById('adcab_wallet_q') as HTMLInputElement | null;
        if (next) {
          next.focus();
          try { next.setSelectionRange(pos, pos); } catch {}
        }
      };
    }

    ab.querySelectorAll('[data-adcab-logt]').forEach((b) => {
      (b as HTMLButtonElement).onclick = () => {
        ADM_ADS_LOG_TYPE = (b as HTMLElement).dataset.adcabLogt || 'all';
        paint();
      };
    });

    const logQ = document.getElementById('adcab_log_q') as HTMLInputElement | null;
    if (logQ) {
      logQ.oninput = () => {
        ADM_ADS_LOG_Q = logQ.value;
        const pos = logQ.selectionStart ?? ADM_ADS_LOG_Q.length;
        paint();
        const next = document.getElementById('adcab_log_q') as HTMLInputElement | null;
        if (next) {
          next.focus();
          try { next.setSelectionRange(pos, pos); } catch {}
        }
      };
    }

    const copyS2sBtn = document.getElementById('adcab_copy_s2s');
    if (copyS2sBtn) {
      copyS2sBtn.onclick = () => {
        const u = document.getElementById('adcab_s2s_url')?.textContent || cfg.sdkRewardUrl || '';
        navigator.clipboard?.writeText(u).then(() => toast('Reward URL скопирован')).catch(() => toast('Не удалось скопировать', true));
      };
    }

    const saveCfgBtn = document.getElementById('adcab_save_cfg');
    if (saveCfgBtn) {
      saveCfgBtn.onclick = async () => {
        const adsgramBlocks: Record<string, string> = {};
        for (const d of cfg.defs || []) {
          const inp = document.getElementById('adcab_blk_' + d.key) as HTMLInputElement | null;
          if (inp && inp.value.trim()) adsgramBlocks[d.key] = inp.value.trim();
        }
        const requireAdsgramS2S = !!(document.getElementById('adcab_require_s2s') as HTMLInputElement | null)?.checked;
        await act(() => api('/admin/ads/settings', { adsgramBlocks, requireAdsgramS2S }), 'Настройки рекламы сохранены');
        renderAdminAdsTab(ab, ov, _reloadAdmin);
      };
    }

    const awardPredBtn = document.getElementById('adcab_award_pred');
    if (awardPredBtn) {
      awardPredBtn.onclick = async () => {
        await act(() => api('/admin/predictions/award-season', {}), 'Призы Лиги прогнозов выданы Топ-3');
      };
    }
  };

  paint();
}

window.__RPL_EXT__ = {
  getClientHeaders,
  syncTelegramAuth,
  runAdsgramBlock,
  renderClubSponsorsTab,
  renderPredictionsPage,
  renderNationalProposalsSection,
  renderAdminAdsSettingsHtml,
  collectAdminAdsBlocks,
  collectAdminAdsRequireS2S,
  renderAdminAdsTab,
};

if (typeof window !== 'undefined' && (window.Telegram?.WebApp?.initData || window.Telegram?.WebApp?.initDataUnsafe?.user?.id)) {
  syncTelegramAuth().catch(() => {});
}
