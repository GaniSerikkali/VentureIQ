import React, { useState, useEffect, useRef } from "react";

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

.vrs-root {
  --ink: #0F1B2B;
  --surface: #16263B;
  --surface-2: #1C3049;
  --gold: #C9A227;
  --gold-soft: #E4C766;
  --paper: #EDE6D6;
  --teal: #4C8C7C;
  --red: #B2554B;
  --line: rgba(237, 230, 214, 0.14);
  font-family: 'IBM Plex Sans', sans-serif;
  background: var(--ink);
  color: var(--paper);
  min-height: 100%;
  position: relative;
  padding: 48px 24px 30px 24px;
  box-sizing: border-box;
  overflow: hidden;
}
.vrs-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.55;
}
.vrs-wrap { position: relative; z-index: 1; max-width: 1120px; margin: 0 auto; }
.vrs-topbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}
.vrs-lang-switch {
  display: flex;
  border: 1px solid var(--line);
  border-radius: 999px;
  overflow: hidden;
  flex-shrink: 0;
}
.vrs-lang-btn {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  padding: 7px 14px;
  background: transparent;
  color: rgba(237,230,214,0.5);
  border: none;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
.vrs-lang-btn.active { background: var(--gold); color: var(--ink); font-weight: 600; }
.vrs-lang-btn:not(.active):hover { color: var(--paper); }
.vrs-eyebrow {
  font-family: 'IBM Plex Mono', monospace;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-size: 11px;
  color: var(--gold-soft);
  margin-bottom: 10px;
}
.vrs-title {
  font-family: 'Spectral', serif;
  font-weight: 600;
  font-size: 40px;
  line-height: 1.1;
  margin: 0 0 8px 0;
}
.vrs-sub {
  font-family: 'IBM Plex Sans', sans-serif;
  color: rgba(237,230,214,0.62);
  font-size: 15px;
  max-width: 640px;
  margin-bottom: 10px;
}
.vrs-mission {
  font-family: 'Spectral', serif;
  font-style: italic;
  font-size: 14px;
  color: var(--gold-soft);
  max-width: 640px;
  margin-bottom: 18px;
  line-height: 1.5;
}
.vrs-disclaimer {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11.5px;
  line-height: 1.6;
  color: rgba(237,230,214,0.55);
  border-left: 2px solid var(--gold);
  padding: 10px 14px;
  max-width: 640px;
  margin-bottom: 28px;
  background: rgba(201,162,39,0.05);
}
.vrs-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 28px;
}
@media (max-width: 900px) {
  .vrs-grid { grid-template-columns: 1fr; }
}
.vrs-panel {
  background: rgba(22,38,59,0.88);
  backdrop-filter: blur(2px);
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 26px;
}
.vrs-section-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold);
  border-bottom: 1px solid var(--line);
  padding-bottom: 8px;
  margin: 26px 0 14px 0;
}
.vrs-section-title:first-child { margin-top: 0; }
.vrs-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  color: rgba(237,230,214,0.7);
  display: block;
  margin-bottom: 6px;
  margin-top: 14px;
}
.vrs-input, .vrs-select, .vrs-textarea {
  width: 100%;
  background: var(--ink);
  border: 1px solid var(--line);
  border-radius: 3px;
  color: var(--paper);
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 13.5px;
  padding: 9px 11px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.15s ease;
}
.vrs-input:focus, .vrs-select:focus, .vrs-textarea:focus {
  border-color: var(--gold);
}
.vrs-textarea { resize: vertical; min-height: 56px; line-height: 1.5; }
.vrs-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.vrs-row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
.vrs-row4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 12px; }
@media (max-width: 640px) {
  .vrs-row4 { grid-template-columns: 1fr 1fr; }
}
.vrs-hint {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 11px;
  color: rgba(237,230,214,0.4);
  margin-top: 4px;
}
.vrs-btn {
  margin-top: 28px;
  width: 100%;
  background: var(--gold);
  color: var(--ink);
  border: none;
  border-radius: 3px;
  padding: 13px 18px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, opacity 0.15s ease;
}
.vrs-btn:hover { background: var(--gold-soft); }
.vrs-btn:disabled { opacity: 0.5; cursor: default; }
.vrs-btn-ghost {
  margin-top: 18px;
  width: 100%;
  background: transparent;
  color: var(--gold-soft);
  border: 1px solid var(--gold);
  border-radius: 3px;
  padding: 11px 18px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
}
.vrs-btn-ghost:hover { background: rgba(201,162,39,0.1); }
.vrs-err {
  margin-top: 14px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12.5px;
  color: var(--red);
  border-left: 2px solid var(--red);
  padding-left: 10px;
}

.vrs-result-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.vrs-history-strip {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
}
.vrs-history-chip {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  color: rgba(237,230,214,0.65);
  background: var(--ink);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 4px 10px;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
}
.vrs-history-chip:hover { border-color: var(--gold); color: var(--gold-soft); }
.vrs-history-title {
  width: 100%;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(237,230,214,0.4);
  margin-bottom: 8px;
}
.vrs-ledger-lines {
  width: 100%;
  height: 100%;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  opacity: 0.35;
}
.vrs-ledger-lines .l { width: 100%; height: 1px; background: var(--line); }
.vrs-ledger-lines .caption {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  color: rgba(237,230,214,0.4);
  letter-spacing: 0.05em;
}
.vrs-loading-steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  min-height: 280px;
  justify-content: center;
}
.vrs-loading-step {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12.5px;
  color: rgba(237,230,214,0.28);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;
}
.vrs-loading-step.active { color: var(--gold-soft); }
.vrs-loading-step.done { color: rgba(237,230,214,0.5); }
.vrs-loading-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: rgba(237,230,214,0.2);
  flex-shrink: 0;
}
.vrs-loading-step.active .vrs-loading-dot { background: var(--gold); }
.vrs-loading-step.done .vrs-loading-dot { background: var(--teal); }

.vrs-seal-wrap {
  position: relative;
  width: 168px;
  height: 168px;
  margin: 6px auto 14px auto;
  animation: vrsStamp 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.2);
}
@keyframes vrsStamp {
  0% { transform: scale(2.2) rotate(-14deg); opacity: 0; }
  60% { transform: scale(0.95) rotate(2deg); opacity: 1; }
  100% { transform: scale(1) rotate(-6deg); opacity: 1; }
}
.vrs-seal-num { font-family: 'Spectral', serif; font-weight: 700; }

.vrs-verdict-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid;
  margin-bottom: 8px;
}
.vrs-verdict-sub {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 12px;
  color: rgba(237,230,214,0.5);
  margin-bottom: 10px;
}
.vrs-confidence {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: rgba(237,230,214,0.55);
  margin-bottom: 22px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.vrs-confidence b { color: var(--gold-soft); }

.vrs-bars { width: 100%; text-align: left; margin-top: 4px; }
.vrs-bar-row { margin-bottom: 16px; }
.vrs-bar-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  color: rgba(237,230,214,0.75);
  margin-bottom: 5px;
}
.vrs-bar-top-right { display: flex; align-items: center; gap: 8px; }
.vrs-info-btn {
  background: none;
  border: 1px solid var(--line);
  color: rgba(237,230,214,0.5);
  border-radius: 50%;
  width: 17px;
  height: 17px;
  font-size: 10px;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'IBM Plex Mono', monospace;
  transition: border-color 0.15s ease, color 0.15s ease;
}
.vrs-info-btn:hover, .vrs-info-btn.open { border-color: var(--gold); color: var(--gold-soft); }
.vrs-bar-track {
  width: 100%;
  height: 6px;
  background: var(--ink);
  border-radius: 3px;
  overflow: hidden;
}
.vrs-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s ease;
}
.vrs-bar-detail {
  margin-top: 8px;
  padding: 10px 12px;
  background: var(--ink);
  border: 1px solid var(--line);
  border-radius: 3px;
}
.vrs-bar-sub {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  color: rgba(237,230,214,0.55);
  margin-bottom: 6px;
  letter-spacing: 0.01em;
}
.vrs-bar-rationale {
  font-size: 11.5px;
  color: rgba(237,230,214,0.65);
  line-height: 1.4;
}

.vrs-block {
  width: 100%;
  text-align: left;
  border-top: 1px solid var(--line);
  padding-top: 16px;
  margin-top: 18px;
}
.vrs-block-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold-soft);
  margin-bottom: 10px;
}
.vrs-list { margin: 0; padding: 0; list-style: none; }
.vrs-list li {
  font-size: 13px;
  line-height: 1.6;
  color: rgba(237,230,214,0.85);
  padding-left: 14px;
  position: relative;
  margin-bottom: 6px;
}
.vrs-list li::before {
  content: "—";
  position: absolute;
  left: 0;
  color: var(--gold);
}

.vrs-risk-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
  border-bottom: 1px dashed var(--line);
  padding: 7px 0;
}
.vrs-risk-name {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11.5px;
  color: rgba(237,230,214,0.7);
  flex: 1;
}
.vrs-risk-val {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}
.vrs-risk-reason {
  width: 100%;
  font-size: 11px;
  color: rgba(237,230,214,0.4);
  padding: 0 0 6px 0;
  border-bottom: 1px dashed var(--line);
  margin-top: -2px;
}

.vrs-funding-type-tag {
  display: inline-block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--gold);
  color: var(--gold-soft);
  margin-bottom: 10px;
}
.vrs-funding-type-reason {
  font-size: 13px;
  line-height: 1.5;
  color: rgba(237,230,214,0.8);
}

.vrs-download-btn {
  margin-top: 26px;
  width: 100%;
  background: transparent;
  color: var(--gold-soft);
  border: 1px solid var(--gold);
  border-radius: 3px;
  padding: 12px 18px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
}
.vrs-download-btn:hover { background: rgba(201,162,39,0.1); }

.vrs-footer {
  position: relative;
  z-index: 1;
  max-width: 1120px;
  margin: 40px auto 0 auto;
  text-align: center;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  color: rgba(237,230,214,0.35);
}

@media print {
  .vrs-topbar, .vrs-lang-switch, .vrs-panel:first-child, .vrs-btn, .vrs-btn-ghost, .vrs-download-btn, .vrs-history-strip, .vrs-info-btn { display: none !important; }
  .vrs-root { background: white !important; color: black !important; }
  .vrs-grid { grid-template-columns: 1fr !important; }
  .vrs-panel { background: white !important; border-color: #ccc !important; color: black !important; }
}
`;

/* ---------------- i18n ---------------- */

const LANG_NAMES = { kk: "Kazakh", ru: "Russian", en: "English" };

const I18N = {
  kk: {
    eyebrow: "VentureIQ — AI Decision Support Platform",
    title: "Стартаптың қаржыландыруға дайындығын тексеру",
    sub: "Ерте кезеңдегі tech-стартаптарды бағалайтын шешім қабылдауға көмектесетін прототип. Мақсаты — \"бұл стартап жақсы ма?\" емес, \"бұл стартап қаржыландыруға дайын ба?\" деген сұраққа жауап беру.",
    mission: "Миссия: Қазақстандағы студент-инноваторлардың құрылымды AI-негізді қаржылық бағалау арқылы инвестицияға дайын болуына көмектесу.",
    disclaimer: "АІ инвестициялық шешім қабылдамайды. Ол сапалы және сандық ақпаратты мөлдір рубрика арқылы құрылымдайды. Соңғы шешім әрқашан инвестор немесе банкке тиесілі.",
    secBasic: "Негізгі ақпарат",
    lblName: "Стартап атауы", phName: "мыс. AgroSense",
    lblIndustry: "Сала",
    lblStage: "Кезең",
    lblFunding: "Сұралатын қаржы (KZT)", phFunding: "мыс. 1 000 000",
    secInnovation: "Инновация",
    lblPatent: "Патент бар ма?",
    lblPrototype: "Жұмыс істейтін прототип бар ма?",
    lblTrl: "Технологиялық дайындық деңгейі (TRL)",
    lblCompetitors: "Бәсекелестер саны",
    lblInnovNotes: "Қосымша түсініктеме (міндетті емес)", phInnovNotes: "Технология немесе идея туралы қосымша деталь...",
    secMarket: "Нарық және қаржы",
    lblTargetCustomers: "Мақсатты клиенттер", phTargetCustomers: "мыс. Ауыл шаруашылығы фермерлері, 500-1000 га",
    lblMarketSize: "Нарық көлемі", phMarketSize: "мыс. 50 000 фермер",
    lblRevenueModel: "Табыс моделі", phRevenueModel: "мыс. Айлық жазылым",
    secExpenses: "Айлық шығын құрылымы (KZT)",
    lblRent: "Жалдау", phRent: "50 000",
    lblMarketingCost: "Маркетинг", phMarketingCost: "40 000",
    lblDevCost: "Әзірлеу", phDevCost: "60 000",
    lblSalariesCost: "Жалақы", phSalariesCost: "0",
    lblTotalMonthlyCost: "Жалпы айлық шығын",
    lblExpectedRevenue: "Күтілетін айлық табыс (KZT)", phExpectedRevenue: "300 000",
    lblExpectedRevenueY1: "Күтілетін 1-жылдық табыс (KZT)", phExpectedRevenueY1: "2 400 000",
    lblBreakEven: "Break-even (ай)", phBreakEven: "8",
    secTeam: "Команда",
    lblTeamSize: "Команда өлшемі", phTeamSize: "мыс. 4",
    lblLeadershipYears: "Көшбасшылық тәжірибесі (жыл)", phLeadershipYears: "мыс. 2",
    lblPriorExperience: "Алдыңғы тәжірибе", phPriorExperience: "мыс. Робототехника олимпиадасында 1-орын, хакатон тәжірибесі...",
    secKazakhstan: "Қазақстандық контекст",
    lblTargetMarket: "Мақсатты нарық",
    lblAifc: "AIFC (Astana International Financial Centre) талаптарына сай ма?",
    lblGovGrants: "Осы салада мемлекеттік грант бағдарламалары бар ма?",
    secExtra: "Қосымша контекст",
    lblExtraContext: "Жоғарыда сыймаған кез келген маңызды деталь (міндетті емес)", phExtraContext: "Кез келген қосымша ақпарат...",
    btnEvaluate: "AI-мен бағалау",
    btnEvaluating: "Талдануда...",
    errMsg: "Бағалау сәтсіз аяқталды. Міндетті өрістерді толтырып, қайта көріңіз.",
    resultPlaceholder: "НӘТИЖЕ ОСЫ ЖЕРДЕ КӨРІНЕДІ",
    loadingSteps: ["Ақпаратты оқу...", "Бизнес-моделін ажырату...", "Нарықты талдау...", "Қаржыны бағалау...", "Ұсыныс жасау..."],
    barInnovation: "Инновация", barMarket: "Нарық", barTeam: "Команда", barFinance: "Қаржы",
    blockRisks: "Тәуекел картасы",
    blockFundingType: "Ұсынылатын қаржыландыру түрі",
    blockConfidence: "AI сенімділігі",
    blockStrengths: "Күшті жақтары",
    blockWeaknesses: "Әлсіз жақтары",
    blockRecommendations: "Қаржыландыруға дейін не істеу керек",
    scoreUnit: "/ 100",
    confidenceLabel: "Сенімділік",
    historyTitle: "Тарих",
    btnDownloadReport: "Инвестициялық есепті жүктеу",
    footerCredit: "Жасаған: Gani Serikkali",
    reportPreparedFor: "Дайындалды",
    industries: { robotics: "Робототехника", ai: "AI / Технология", health: "Денсаулық сақтау", agri: "Ауыл шаруашылығы", energy: "Энергетика", education: "Білім беру", fintech: "Қаржы технологиясы", other: "Басқа" },
    stages: { idea: "Идея", prototype: "Прототип", mvp: "MVP", revenue: "Ерте табыс", growth: "Өсу кезеңі" },
    trl: { t1: "TRL 1-2 — тек теориялық идея", t2: "TRL 3-4 — зертханалық тест", t3: "TRL 5-6 — жұмыс істейтін прототип", t4: "TRL 7-8 — нақты ортада сыналған", t5: "TRL 9 — толық дайын, нарықта" },
    yesno: { yes: "Иә", no: "Жоқ" },
    competitors: { c0: "0 (нарық бос)", c1_3: "1-3 бәсекелес", c4_10: "4-10 бәсекелес", c10plus: "10+ бәсекелес" },
    targetMarkets: { kazakhstan: "Қазақстан", central_asia: "Орталық Азия", global: "Жаһандық" },
    riskLabels: { technology: "Технологиялық", market: "Нарықтық", financial: "Қаржылық", execution: "Орындау", legal: "Заңдық", ip: "Зияткерлік меншік" },
    riskLevels: { Low: "Төмен", Medium: "Орташа", High: "Жоғары" },
    fundingTypes: { GRANT: "Грант", ANGEL: "Бизнес-періште инвестициясы", VC: "Венчурлық капитал (VC)", BANK_LOAN: "Банктік несие", CROWDFUNDING: "Краудфандинг" },
    innovationSub: { originality: "Бірегейлік", technology: "Технология", problem: "Мәселе маңызы" },
    marketSub: { market_size: "Нарық көлемі", customers: "Клиенттер", competition: "Бәсекелестік" },
    teamSub: { leadership: "Көшбасшылық", skills: "Дағдылар", experience: "Тәжірибе" },
    financeSub: { budget: "Бюджет", revenue_model: "Табыс моделі", risk_analysis: "Тәуекел талдауы" },
    verdict: {
      IMMEDIATE_FUNDING: { text: "ДЕРЕУ ҚАРЖЫЛАНДЫРУ", sub: "Инвестицияға толық дайын" },
      RECOMMENDED: { text: "ҰСЫНЫЛАДЫ", sub: "Инвестицияға дайын, аз түзетумен" },
      NEEDS_IMPROVEMENT: { text: "ЖЕТІЛДІРУ КЕРЕК", sub: "Әзірге инвестицияға дайын емес" },
      NOT_READY: { text: "ДАЙЫН ЕМЕС", sub: "Инвестиция сұрар алдында айтарлықтай жұмыс керек" },
    },
  },
  ru: {
    eyebrow: "VentureIQ — AI Decision Support Platform",
    title: "Проверка готовности стартапа к финансированию",
    sub: "Прототип для оценки ранних tech-стартапов, помогающий принимать решения. Цель — ответить не на вопрос \"хороший ли это стартап?\", а на вопрос \"готов ли этот стартап к финансированию?\".",
    mission: "Миссия: помочь студентам-новаторам Казахстана стать готовыми к инвестициям через структурированную AI-оценку.",
    disclaimer: "ИИ не принимает инвестиционных решений. Он структурирует качественную и количественную информацию по прозрачной методике. Итоговое решение всегда остаётся за инвестором или банком.",
    secBasic: "Основная информация",
    lblName: "Название стартапа", phName: "напр. AgroSense",
    lblIndustry: "Отрасль",
    lblStage: "Стадия",
    lblFunding: "Запрашиваемое финансирование (KZT)", phFunding: "напр. 1 000 000",
    secInnovation: "Инновация",
    lblPatent: "Есть патент?",
    lblPrototype: "Есть рабочий прототип?",
    lblTrl: "Уровень технологической готовности (TRL)",
    lblCompetitors: "Количество конкурентов",
    lblInnovNotes: "Дополнительный комментарий (необязательно)", phInnovNotes: "Дополнительные детали о технологии или идее...",
    secMarket: "Рынок и финансы",
    lblTargetCustomers: "Целевые клиенты", phTargetCustomers: "напр. Фермеры, 500-1000 га",
    lblMarketSize: "Объём рынка", phMarketSize: "напр. 50 000 фермеров",
    lblRevenueModel: "Модель дохода", phRevenueModel: "напр. Ежемесячная подписка",
    secExpenses: "Структура ежемесячных расходов (KZT)",
    lblRent: "Аренда", phRent: "50 000",
    lblMarketingCost: "Маркетинг", phMarketingCost: "40 000",
    lblDevCost: "Разработка", phDevCost: "60 000",
    lblSalariesCost: "Зарплаты", phSalariesCost: "0",
    lblTotalMonthlyCost: "Итого в месяц",
    lblExpectedRevenue: "Ожидаемый ежемесячный доход (KZT)", phExpectedRevenue: "300 000",
    lblExpectedRevenueY1: "Ожидаемый доход за 1-й год (KZT)", phExpectedRevenueY1: "2 400 000",
    lblBreakEven: "Точка безубыточности (мес.)", phBreakEven: "8",
    secTeam: "Команда",
    lblTeamSize: "Размер команды", phTeamSize: "напр. 4",
    lblLeadershipYears: "Опыт лидерства (лет)", phLeadershipYears: "напр. 2",
    lblPriorExperience: "Предыдущий опыт", phPriorExperience: "напр. 1 место на олимпиаде по робототехнике, опыт хакатонов...",
    secKazakhstan: "Казахстанский контекст",
    lblTargetMarket: "Целевой рынок",
    lblAifc: "Соответствует требованиям AIFC (МФЦА)?",
    lblGovGrants: "Есть ли государственные гранты в этой отрасли?",
    secExtra: "Дополнительный контекст",
    lblExtraContext: "Любые важные детали, не вошедшие выше (необязательно)", phExtraContext: "Любая дополнительная информация...",
    btnEvaluate: "Оценить с помощью AI",
    btnEvaluating: "Анализ...",
    errMsg: "Оценка не удалась. Заполните обязательные поля и попробуйте снова.",
    resultPlaceholder: "РЕЗУЛЬТАТ ПОЯВИТСЯ ЗДЕСЬ",
    loadingSteps: ["Чтение данных...", "Разбор бизнес-модели...", "Анализ рынка...", "Оценка финансов...", "Формирование рекомендации..."],
    barInnovation: "Инновация", barMarket: "Рынок", barTeam: "Команда", barFinance: "Финансы",
    blockRisks: "Карта рисков",
    blockFundingType: "Рекомендуемый тип финансирования",
    blockConfidence: "Уверенность AI",
    blockStrengths: "Сильные стороны",
    blockWeaknesses: "Слабые стороны",
    blockRecommendations: "Что сделать перед привлечением финансирования",
    scoreUnit: "/ 100",
    confidenceLabel: "Уверенность",
    historyTitle: "История",
    btnDownloadReport: "Скачать инвестиционный отчёт",
    footerCredit: "Автор: Gani Serikkali",
    reportPreparedFor: "Подготовлено",
    industries: { robotics: "Робототехника", ai: "AI / Технологии", health: "Здравоохранение", agri: "Сельское хозяйство", energy: "Энергетика", education: "Образование", fintech: "Финтех", other: "Другое" },
    stages: { idea: "Идея", prototype: "Прототип", mvp: "MVP", revenue: "Ранний доход", growth: "Стадия роста" },
    trl: { t1: "TRL 1-2 — только теоретическая идея", t2: "TRL 3-4 — лабораторное тестирование", t3: "TRL 5-6 — рабочий прототип", t4: "TRL 7-8 — протестирован в реальных условиях", t5: "TRL 9 — полностью готов, на рынке" },
    yesno: { yes: "Да", no: "Нет" },
    competitors: { c0: "0 (рынок пуст)", c1_3: "1-3 конкурента", c4_10: "4-10 конкурентов", c10plus: "10+ конкурентов" },
    targetMarkets: { kazakhstan: "Казахстан", central_asia: "Центральная Азия", global: "Глобальный" },
    riskLabels: { technology: "Технологический", market: "Рыночный", financial: "Финансовый", execution: "Исполнение", legal: "Юридический", ip: "Интеллектуальная собственность" },
    riskLevels: { Low: "Низкий", Medium: "Средний", High: "Высокий" },
    fundingTypes: { GRANT: "Грант", ANGEL: "Ангельская инвестиция", VC: "Венчурный капитал (VC)", BANK_LOAN: "Банковский кредит", CROWDFUNDING: "Краудфандинг" },
    innovationSub: { originality: "Оригинальность", technology: "Технология", problem: "Значимость проблемы" },
    marketSub: { market_size: "Объём рынка", customers: "Клиенты", competition: "Конкуренция" },
    teamSub: { leadership: "Лидерство", skills: "Навыки", experience: "Опыт" },
    financeSub: { budget: "Бюджет", revenue_model: "Модель дохода", risk_analysis: "Анализ рисков" },
    verdict: {
      IMMEDIATE_FUNDING: { text: "НЕМЕДЛЕННОЕ ФИНАНСИРОВАНИЕ", sub: "Полностью готов к инвестициям" },
      RECOMMENDED: { text: "РЕКОМЕНДУЕТСЯ", sub: "Готов к инвестициям, с небольшими доработками" },
      NEEDS_IMPROVEMENT: { text: "ТРЕБУЕТ ДОРАБОТКИ", sub: "Пока не готов к инвестициям" },
      NOT_READY: { text: "НЕ ГОТОВ", sub: "Нужна серьёзная работа перед привлечением инвестиций" },
    },
  },
  en: {
    eyebrow: "VentureIQ — AI Decision Support Platform",
    title: "Investment-Readiness Check for Startups",
    sub: "A decision-support prototype for evaluating early-stage tech startups. Its goal is to answer not \"is this startup good?\" but \"is this startup ready for funding?\".",
    mission: "Mission: help student innovators in Kazakhstan become investment-ready through structured AI-assisted financial evaluation.",
    disclaimer: "The AI does not make investment decisions. It structures qualitative and quantitative information using a transparent scoring framework. The final decision always belongs to the investor or bank.",
    secBasic: "Basic information",
    lblName: "Startup name", phName: "e.g. AgroSense",
    lblIndustry: "Industry",
    lblStage: "Stage",
    lblFunding: "Funding requested (KZT)", phFunding: "e.g. 1,000,000",
    secInnovation: "Innovation",
    lblPatent: "Do you have a patent?",
    lblPrototype: "Do you have a working prototype?",
    lblTrl: "Technology Readiness Level (TRL)",
    lblCompetitors: "Number of competitors",
    lblInnovNotes: "Additional notes (optional)", phInnovNotes: "Any extra detail about the technology or idea...",
    secMarket: "Market & finance",
    lblTargetCustomers: "Target customers", phTargetCustomers: "e.g. Farmers, 500-1000 hectares",
    lblMarketSize: "Market size", phMarketSize: "e.g. 50,000 farmers",
    lblRevenueModel: "Revenue model", phRevenueModel: "e.g. Monthly subscription",
    secExpenses: "Monthly expense breakdown (KZT)",
    lblRent: "Rent", phRent: "50,000",
    lblMarketingCost: "Marketing", phMarketingCost: "40,000",
    lblDevCost: "Development", phDevCost: "60,000",
    lblSalariesCost: "Salaries", phSalariesCost: "0",
    lblTotalMonthlyCost: "Total monthly cost",
    lblExpectedRevenue: "Expected monthly revenue (KZT)", phExpectedRevenue: "300,000",
    lblExpectedRevenueY1: "Expected Year 1 revenue (KZT)", phExpectedRevenueY1: "2,400,000",
    lblBreakEven: "Break-even (months)", phBreakEven: "8",
    secTeam: "Team",
    lblTeamSize: "Team size", phTeamSize: "e.g. 4",
    lblLeadershipYears: "Leadership experience (years)", phLeadershipYears: "e.g. 2",
    lblPriorExperience: "Prior experience", phPriorExperience: "e.g. 1st place at a robotics olympiad, hackathon experience...",
    secKazakhstan: "Kazakhstan context",
    lblTargetMarket: "Target market",
    lblAifc: "AIFC (Astana International Financial Centre) compatible?",
    lblGovGrants: "Are government grant programs available in this sector?",
    secExtra: "Additional context",
    lblExtraContext: "Any important detail not covered above (optional)", phExtraContext: "Any additional information...",
    btnEvaluate: "Evaluate with AI",
    btnEvaluating: "Analyzing...",
    errMsg: "Evaluation failed. Please fill in the required fields and try again.",
    resultPlaceholder: "RESULT WILL APPEAR HERE",
    loadingSteps: ["Reading the data...", "Extracting the business model...", "Analyzing the market...", "Evaluating the financials...", "Generating the recommendation..."],
    barInnovation: "Innovation", barMarket: "Market", barTeam: "Team", barFinance: "Finance",
    blockRisks: "Risk map",
    blockFundingType: "Recommended funding type",
    blockConfidence: "AI confidence",
    blockStrengths: "Strengths",
    blockWeaknesses: "Weaknesses",
    blockRecommendations: "What to do before seeking funding",
    scoreUnit: "/ 100",
    confidenceLabel: "Confidence",
    historyTitle: "History",
    btnDownloadReport: "Download Investment Report",
    footerCredit: "Built by Gani Serikkali",
    reportPreparedFor: "Prepared for",
    industries: { robotics: "Robotics", ai: "AI / Technology", health: "Healthcare", agri: "Agriculture", energy: "Energy", education: "Education", fintech: "Fintech", other: "Other" },
    stages: { idea: "Idea", prototype: "Prototype", mvp: "MVP", revenue: "Early revenue", growth: "Growth stage" },
    trl: { t1: "TRL 1-2 — theoretical idea only", t2: "TRL 3-4 — lab-tested", t3: "TRL 5-6 — working prototype", t4: "TRL 7-8 — tested in real environment", t5: "TRL 9 — fully deployed, on the market" },
    yesno: { yes: "Yes", no: "No" },
    competitors: { c0: "0 (open market)", c1_3: "1-3 competitors", c4_10: "4-10 competitors", c10plus: "10+ competitors" },
    targetMarkets: { kazakhstan: "Kazakhstan", central_asia: "Central Asia", global: "Global" },
    riskLabels: { technology: "Technology", market: "Market", financial: "Financial", execution: "Execution", legal: "Legal", ip: "Intellectual property" },
    riskLevels: { Low: "Low", Medium: "Medium", High: "High" },
    fundingTypes: { GRANT: "Grant", ANGEL: "Angel investment", VC: "Venture Capital (VC)", BANK_LOAN: "Bank loan", CROWDFUNDING: "Crowdfunding" },
    innovationSub: { originality: "Originality", technology: "Technology", problem: "Problem significance" },
    marketSub: { market_size: "Market size", customers: "Customers", competition: "Competition" },
    teamSub: { leadership: "Leadership", skills: "Skills", experience: "Experience" },
    financeSub: { budget: "Budget", revenue_model: "Revenue model", risk_analysis: "Risk analysis" },
    verdict: {
      IMMEDIATE_FUNDING: { text: "IMMEDIATE FUNDING", sub: "Fully ready for investment" },
      RECOMMENDED: { text: "RECOMMENDED", sub: "Ready for investment, with minor adjustments" },
      NEEDS_IMPROVEMENT: { text: "NEEDS IMPROVEMENT", sub: "Not yet ready for investment" },
      NOT_READY: { text: "NOT READY", sub: "Significant work needed before seeking investment" },
    },
  },
};

const BG_SVG = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900' preserveAspectRatio='xMidYMid slice' style='width:100%;height:100%'>
  <defs>
    <radialGradient id='glow1' cx='50%' cy='50%' r='50%'>
      <stop offset='0%' stop-color='#C9A227' stop-opacity='0.16'/>
      <stop offset='100%' stop-color='#C9A227' stop-opacity='0'/>
    </radialGradient>
    <radialGradient id='glow2' cx='50%' cy='50%' r='50%'>
      <stop offset='0%' stop-color='#4C8C7C' stop-opacity='0.10'/>
      <stop offset='100%' stop-color='#4C8C7C' stop-opacity='0'/>
    </radialGradient>
    <pattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'>
      <path d='M 60 0 L 0 0 0 60' fill='none' stroke='#EDE6D6' stroke-opacity='0.05' stroke-width='1'/>
    </pattern>
  </defs>
  <rect width='1200' height='900' fill='url(#grid)'/>
  <circle cx='980' cy='140' r='340' fill='url(#glow1)'/>
  <circle cx='120' cy='780' r='300' fill='url(#glow2)'/>
  <polyline points='0,760 140,700 260,730 380,600 500,650 620,480 740,520 860,340 980,380 1100,220 1200,260'
    fill='none' stroke='#C9A227' stroke-opacity='0.14' stroke-width='2'/>
  <polyline points='0,760 140,700 260,730 380,600 500,650 620,480 740,520 860,340 980,380 1100,220 1200,260'
    fill='none' stroke='#C9A227' stroke-opacity='0.28' stroke-width='1' stroke-dasharray='2 6'/>
</svg>
`;

function emptyForm() {
  return {
    name: "",
    industry: "robotics",
    stage: "idea",
    fundingRequested: "",
    hasPatent: "no",
    hasPrototype: "yes",
    trlLevel: "t2",
    competitors: "c1_3",
    innovationNotes: "",
    targetCustomers: "",
    marketSize: "",
    revenueModel: "",
    rentCost: "",
    marketingCost: "",
    devCost: "",
    salariesCost: "",
    expectedMonthlyRevenue: "",
    expectedRevenueY1: "",
    breakEvenMonths: "",
    teamSize: "",
    leadershipYears: "",
    priorExperience: "",
    targetMarket: "kazakhstan",
    aifcCompatible: "no",
    govGrants: "no",
    extraContext: "",
  };
}

export default function VentureIQ() {
  const [lang, setLang] = useState("kk");
  const t = I18N[lang];
  const [form, setForm] = useState(emptyForm());
  const [loading, setLoading] = useState(false);
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const stepTimerRef = useRef(null);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const totalMonthlyCost =
    (Number(form.rentCost) || 0) +
    (Number(form.marketingCost) || 0) +
    (Number(form.devCost) || 0) +
    (Number(form.salariesCost) || 0);

  const canSubmit =
    form.name.trim() &&
    form.targetCustomers.trim() &&
    form.teamSize.toString().trim() &&
    form.priorExperience.trim() &&
    !loading;

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const listRes = await window.storage.list("eval:", false);
      const keys = (listRes && listRes.keys) || [];
      const entries = [];
      for (const k of keys) {
        try {
          const r = await window.storage.get(k, false);
          if (r && r.value) entries.push(JSON.parse(r.value));
        } catch (e) {
          // skip unreadable entry
        }
      }
      entries.sort((a, b) => (b.ts || 0) - (a.ts || 0));
      setHistory(entries.slice(0, 12));
    } catch (e) {
      // storage may be unavailable; history simply stays empty
      setHistory([]);
    }
  }

  async function saveToHistory(evalResult) {
    const ts = Date.now();
    const entry = {
      ts,
      name: form.name,
      industry: form.industry,
      total_score: evalResult.total_score,
      verdict: evalResult.verdict,
      result: evalResult,
    };
    try {
      const res = await window.storage.set("eval:" + ts, JSON.stringify(entry), false);
      if (!res) console.error("History save returned no result");
    } catch (e) {
      console.error("Could not save history entry", e);
    }
    setHistory((h) => [entry, ...h].slice(0, 12));
  }

  function startLoadingSteps() {
    setLoadingStepIdx(0);
    stepTimerRef.current = setInterval(() => {
      setLoadingStepIdx((i) => Math.min(i + 1, t.loadingSteps.length - 1));
    }, 1700);
  }
  function stopLoadingSteps() {
    if (stepTimerRef.current) clearInterval(stepTimerRef.current);
    stepTimerRef.current = null;
  }

  async function evaluate() {
    setLoading(true);
    setError(null);
    setResult(null);
    startLoadingSteps();

    const outputLanguage = LANG_NAMES[lang];

    const systemPrompt = `You are an experienced venture-funding analyst. Your task is to evaluate not whether a startup is "good", but whether it is "ready for investment/funding". These are different questions: a brilliant idea with an unvalidated, inexperienced team may not be ready for funding.

Use a predefined rubric, never arbitrary numbers. For every criterion, tie the score to the specific data the user provided and explain why in one sentence (rationale).

Scoring:
- innovation (25 max): originality /10, technology /10 (based on TRL level and patent), problem /5
- market (25 max): market_size /10, customers /10, competition /5 (based on number of competitors)
- team (25 max): leadership /10 (based on leadership years), skills /10, experience /5 (based on team size)
- finance (25 max): budget /10 (based on ratio of total monthly costs to funding requested and to expected revenue), revenue_model /10, risk_analysis /5 (based on break-even timeline)

Assess risk across 6 categories: technology, market, financial, execution, legal, ip — each with a level (Low/Medium/High) AND one short reason.

Recommend the single most appropriate funding type given the stage, risk profile, and Kazakhstan context: GRANT, ANGEL, VC, BANK_LOAN, or CROWDFUNDING — with one sentence of reasoning (e.g. a pre-revenue student team with no collateral is rarely bank-loan-appropriate; government grants or angel investment often fit better at idea/prototype stage).

Give a confidence score (0-100) reflecting how much reliable data was provided (more concrete numbers and specifics = higher confidence), with one short reason — especially if confidence is below 70.

Then produce:
- strengths: up to 3 concrete strengths
- weaknesses: up to 3 concrete weaknesses
- recommendations: up to 3 concrete, actionable next steps (e.g. "Validate pricing with at least 20 potential customers")

Respond ONLY with the JSON object below, no other text, no markdown fences:

{
  "innovation": {"originality": number, "technology": number, "problem": number, "total": number, "rationale": "..."},
  "market": {"market_size": number, "customers": number, "competition": number, "total": number, "rationale": "..."},
  "team": {"leadership": number, "skills": number, "experience": number, "total": number, "rationale": "..."},
  "finance": {"budget": number, "revenue_model": number, "risk_analysis": number, "total": number, "rationale": "..."},
  "total_score": number,
  "verdict": "IMMEDIATE_FUNDING" | "RECOMMENDED" | "NEEDS_IMPROVEMENT" | "NOT_READY",
  "risks": {
    "technology": {"level": "Low"|"Medium"|"High", "reason": "..."},
    "market": {"level": "Low"|"Medium"|"High", "reason": "..."},
    "financial": {"level": "Low"|"Medium"|"High", "reason": "..."},
    "execution": {"level": "Low"|"Medium"|"High", "reason": "..."},
    "legal": {"level": "Low"|"Medium"|"High", "reason": "..."},
    "ip": {"level": "Low"|"Medium"|"High", "reason": "..."}
  },
  "funding_type": {"type": "GRANT"|"ANGEL"|"VC"|"BANK_LOAN"|"CROWDFUNDING", "reason": "..."},
  "confidence": {"score": number, "reason": "..."},
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "recommendations": ["...", "..."]
}

Verdict rule: 90-100 = IMMEDIATE_FUNDING, 80-89 = RECOMMENDED, 70-79 = NEEDS_IMPROVEMENT, below 70 = NOT_READY.

IMPORTANT: Write ALL text values in the JSON (rationale, reason, strengths, weaknesses, recommendations) in ${outputLanguage}. Keep the JSON keys and enum values (verdict, risk levels, funding type) themselves in English exactly as shown above.`;

    const userPrompt = `BASIC INFORMATION
Name: ${form.name}
Industry: ${t.industries[form.industry]}
Stage: ${t.stages[form.stage]}
Funding requested: ${form.fundingRequested || "not specified"} KZT

INNOVATION
Patent: ${t.yesno[form.hasPatent]}
Working prototype: ${t.yesno[form.hasPrototype]}
Technology readiness level: ${t.trl[form.trlLevel]}
Number of competitors: ${t.competitors[form.competitors]}
Additional notes: ${form.innovationNotes || "none"}

MARKET & FINANCE
Target customers: ${form.targetCustomers}
Market size: ${form.marketSize || "not specified"}
Revenue model: ${form.revenueModel || "not specified"}
Monthly expense breakdown: rent ${form.rentCost || 0} KZT, marketing ${form.marketingCost || 0} KZT, development ${form.devCost || 0} KZT, salaries ${form.salariesCost || 0} KZT (total ${totalMonthlyCost} KZT)
Expected monthly revenue: ${form.expectedMonthlyRevenue || "0"} KZT
Expected Year 1 revenue: ${form.expectedRevenueY1 || "not specified"} KZT
Break-even (months): ${form.breakEvenMonths || "unknown"}

TEAM
Team size: ${form.teamSize} people
Leadership experience (years): ${form.leadershipYears || "0"}
Prior experience: ${form.priorExperience}

KAZAKHSTAN CONTEXT
Target market: ${t.targetMarkets[form.targetMarket]}
AIFC compatible: ${t.yesno[form.aifcCompatible]}
Government grants available in sector: ${t.yesno[form.govGrants]}

ADDITIONAL CONTEXT
${form.extraContext || "none"}`;

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1800,
          system: systemPrompt,
          messages: [{ role: "user", content: userPrompt }],
        }),
      });

      if (!response.ok) throw new Error("API request failed (" + response.status + ")");

      const data = await response.json();
      const rawText = (data.content || [])
        .map((b) => (b.type === "text" ? b.text : ""))
        .join("\n")
        .trim();

      const cleaned = rawText.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      setResult(parsed);
      saveToHistory(parsed);
    } catch (err) {
      console.error(err);
      setError(t.errMsg);
    } finally {
      setLoading(false);
      stopLoadingSteps();
    }
  }

  function loadHistoryEntry(entry) {
    setResult(entry.result);
  }

  function downloadReport() {
    window.print();
  }

  return (
    <div className="vrs-root">
      <style>{STYLE}</style>
      <div className="vrs-bg" dangerouslySetInnerHTML={{ __html: BG_SVG }} />
      <div className="vrs-wrap">
        <div className="vrs-topbar">
          <div className="vrs-eyebrow">{t.eyebrow}</div>
          <div className="vrs-lang-switch">
            {["kk", "ru", "en"].map((code) => (
              <button
                key={code}
                className={"vrs-lang-btn" + (lang === code ? " active" : "")}
                onClick={() => setLang(code)}
              >
                {code === "kk" ? "ҚАЗ" : code === "ru" ? "РУС" : "ENG"}
              </button>
            ))}
          </div>
        </div>
        <h1 className="vrs-title">{t.title}</h1>
        <p className="vrs-sub">{t.sub}</p>
        <p className="vrs-mission">{t.mission}</p>
        <div className="vrs-disclaimer">{t.disclaimer}</div>

        <div className="vrs-grid">
          {/* FORM PANEL */}
          <div className="vrs-panel">
            <div className="vrs-section-title">{t.secBasic}</div>
            <span className="vrs-label">{t.lblName}</span>
            <input className="vrs-input" value={form.name} onChange={update("name")} placeholder={t.phName} />
            <div className="vrs-row2">
              <div>
                <span className="vrs-label">{t.lblIndustry}</span>
                <select className="vrs-select" value={form.industry} onChange={update("industry")}>
                  {Object.entries(t.industries).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <span className="vrs-label">{t.lblStage}</span>
                <select className="vrs-select" value={form.stage} onChange={update("stage")}>
                  {Object.entries(t.stages).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
            </div>
            <span className="vrs-label">{t.lblFunding}</span>
            <input className="vrs-input" value={form.fundingRequested} onChange={update("fundingRequested")} placeholder={t.phFunding} />

            <div className="vrs-section-title">{t.secInnovation}</div>
            <div className="vrs-row2">
              <div>
                <span className="vrs-label">{t.lblPatent}</span>
                <select className="vrs-select" value={form.hasPatent} onChange={update("hasPatent")}>
                  {Object.entries(t.yesno).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <span className="vrs-label">{t.lblPrototype}</span>
                <select className="vrs-select" value={form.hasPrototype} onChange={update("hasPrototype")}>
                  {Object.entries(t.yesno).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
            </div>
            <span className="vrs-label">{t.lblTrl}</span>
            <select className="vrs-select" value={form.trlLevel} onChange={update("trlLevel")}>
              {Object.entries(t.trl).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <span className="vrs-label">{t.lblCompetitors}</span>
            <select className="vrs-select" value={form.competitors} onChange={update("competitors")}>
              {Object.entries(t.competitors).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <span className="vrs-label">{t.lblInnovNotes}</span>
            <textarea className="vrs-textarea" value={form.innovationNotes} onChange={update("innovationNotes")} placeholder={t.phInnovNotes} />

            <div className="vrs-section-title">{t.secMarket}</div>
            <span className="vrs-label">{t.lblTargetCustomers}</span>
            <input className="vrs-input" value={form.targetCustomers} onChange={update("targetCustomers")} placeholder={t.phTargetCustomers} />
            <div className="vrs-row2">
              <div>
                <span className="vrs-label">{t.lblMarketSize}</span>
                <input className="vrs-input" value={form.marketSize} onChange={update("marketSize")} placeholder={t.phMarketSize} />
              </div>
              <div>
                <span className="vrs-label">{t.lblRevenueModel}</span>
                <input className="vrs-input" value={form.revenueModel} onChange={update("revenueModel")} placeholder={t.phRevenueModel} />
              </div>
            </div>

            <span className="vrs-label">{t.secExpenses}</span>
            <div className="vrs-row4">
              <div>
                <input className="vrs-input" value={form.rentCost} onChange={update("rentCost")} placeholder={t.phRent} />
                <div className="vrs-hint">{t.lblRent}</div>
              </div>
              <div>
                <input className="vrs-input" value={form.marketingCost} onChange={update("marketingCost")} placeholder={t.phMarketingCost} />
                <div className="vrs-hint">{t.lblMarketingCost}</div>
              </div>
              <div>
                <input className="vrs-input" value={form.devCost} onChange={update("devCost")} placeholder={t.phDevCost} />
                <div className="vrs-hint">{t.lblDevCost}</div>
              </div>
              <div>
                <input className="vrs-input" value={form.salariesCost} onChange={update("salariesCost")} placeholder={t.phSalariesCost} />
                <div className="vrs-hint">{t.lblSalariesCost}</div>
              </div>
            </div>
            <div className="vrs-hint" style={{ marginTop: 8 }}>{t.lblTotalMonthlyCost}: {totalMonthlyCost.toLocaleString()} KZT</div>

            <div className="vrs-row3" style={{ marginTop: 14 }}>
              <div>
                <span className="vrs-label">{t.lblExpectedRevenue}</span>
                <input className="vrs-input" value={form.expectedMonthlyRevenue} onChange={update("expectedMonthlyRevenue")} placeholder={t.phExpectedRevenue} />
              </div>
              <div>
                <span className="vrs-label">{t.lblExpectedRevenueY1}</span>
                <input className="vrs-input" value={form.expectedRevenueY1} onChange={update("expectedRevenueY1")} placeholder={t.phExpectedRevenueY1} />
              </div>
              <div>
                <span className="vrs-label">{t.lblBreakEven}</span>
                <input className="vrs-input" value={form.breakEvenMonths} onChange={update("breakEvenMonths")} placeholder={t.phBreakEven} />
              </div>
            </div>

            <div className="vrs-section-title">{t.secTeam}</div>
            <div className="vrs-row2">
              <div>
                <span className="vrs-label">{t.lblTeamSize}</span>
                <input className="vrs-input" value={form.teamSize} onChange={update("teamSize")} placeholder={t.phTeamSize} />
              </div>
              <div>
                <span className="vrs-label">{t.lblLeadershipYears}</span>
                <input className="vrs-input" value={form.leadershipYears} onChange={update("leadershipYears")} placeholder={t.phLeadershipYears} />
              </div>
            </div>
            <span className="vrs-label">{t.lblPriorExperience}</span>
            <textarea className="vrs-textarea" value={form.priorExperience} onChange={update("priorExperience")} placeholder={t.phPriorExperience} />

            <div className="vrs-section-title">{t.secKazakhstan}</div>
            <span className="vrs-label">{t.lblTargetMarket}</span>
            <select className="vrs-select" value={form.targetMarket} onChange={update("targetMarket")}>
              {Object.entries(t.targetMarkets).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <div className="vrs-row2">
              <div>
                <span className="vrs-label">{t.lblAifc}</span>
                <select className="vrs-select" value={form.aifcCompatible} onChange={update("aifcCompatible")}>
                  {Object.entries(t.yesno).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <span className="vrs-label">{t.lblGovGrants}</span>
                <select className="vrs-select" value={form.govGrants} onChange={update("govGrants")}>
                  {Object.entries(t.yesno).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
            </div>

            <div className="vrs-section-title">{t.secExtra}</div>
            <span className="vrs-label">{t.lblExtraContext}</span>
            <textarea className="vrs-textarea" value={form.extraContext} onChange={update("extraContext")} placeholder={t.phExtraContext} />

            <button className="vrs-btn" disabled={!canSubmit} onClick={evaluate}>
              {loading ? t.btnEvaluating : t.btnEvaluate}
            </button>
            {error && <div className="vrs-err">{error}</div>}
          </div>

          {/* RESULT PANEL */}
          <div className="vrs-panel vrs-result-panel">
            {history.length > 0 && (
              <div className="vrs-history-strip">
                <div className="vrs-history-title">{t.historyTitle}</div>
                {history.map((h) => (
                  <div key={h.ts} className="vrs-history-chip" onClick={() => loadHistoryEntry(h)}>
                    {h.name || "—"} · {h.total_score}
                  </div>
                ))}
              </div>
            )}

            {!result && !loading && (
              <div className="vrs-ledger-lines">
                <div className="l" /><div className="l" /><div className="l" />
                <div className="caption">{t.resultPlaceholder}</div>
                <div className="l" /><div className="l" /><div className="l" />
              </div>
            )}

            {loading && (
              <div className="vrs-loading-steps">
                {t.loadingSteps.map((step, i) => (
                  <div key={i} className={"vrs-loading-step" + (i === loadingStepIdx ? " active" : i < loadingStepIdx ? " done" : "")}>
                    <span className="vrs-loading-dot" />
                    {step}
                  </div>
                ))}
              </div>
            )}

            {result && (
              <>
                <Seal score={result.total_score} verdict={result.verdict} t={t} />
                <VerdictTag verdict={result.verdict} t={t} />
                <div className="vrs-confidence">
                  {t.confidenceLabel}: <b>{result.confidence?.score}%</b>
                </div>

                <div className="vrs-bars">
                  <Bar label={t.barInnovation} value={result.innovation?.total} max={25}
                    rationale={result.innovation?.rationale}
                    subLabels={t.innovationSub}
                    subScores={result.innovation} maxima={{ originality: 10, technology: 10, problem: 5 }} />
                  <Bar label={t.barMarket} value={result.market?.total} max={25}
                    rationale={result.market?.rationale}
                    subLabels={t.marketSub}
                    subScores={result.market} maxima={{ market_size: 10, customers: 10, competition: 5 }} />
                  <Bar label={t.barTeam} value={result.team?.total} max={25}
                    rationale={result.team?.rationale}
                    subLabels={t.teamSub}
                    subScores={result.team} maxima={{ leadership: 10, skills: 10, experience: 5 }} />
                  <Bar label={t.barFinance} value={result.finance?.total} max={25}
                    rationale={result.finance?.rationale}
                    subLabels={t.financeSub}
                    subScores={result.finance} maxima={{ budget: 10, revenue_model: 10, risk_analysis: 5 }} />
                </div>

                <div className="vrs-block">
                  <div className="vrs-block-title">{t.blockFundingType}</div>
                  <div className="vrs-funding-type-tag">{t.fundingTypes[result.funding_type?.type] || result.funding_type?.type}</div>
                  <div className="vrs-funding-type-reason">{result.funding_type?.reason}</div>
                </div>

                <div className="vrs-block">
                  <div className="vrs-block-title">{t.blockRisks}</div>
                  {Object.entries(result.risks || {}).map(([k, v]) => (
                    <React.Fragment key={k}>
                      <div className="vrs-risk-item">
                        <span className="vrs-risk-name">{t.riskLabels[k] || k}</span>
                        <span className="vrs-risk-val" style={{ color: riskColor(v?.level) }}>{t.riskLevels[v?.level] || v?.level}</span>
                      </div>
                      <div className="vrs-risk-reason">{v?.reason}</div>
                    </React.Fragment>
                  ))}
                </div>

                <div className="vrs-block">
                  <div className="vrs-block-title">{t.blockStrengths}</div>
                  <ul className="vrs-list">
                    {(result.strengths || []).map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>

                <div className="vrs-block">
                  <div className="vrs-block-title">{t.blockWeaknesses}</div>
                  <ul className="vrs-list">
                    {(result.weaknesses || []).map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>

                <div className="vrs-block">
                  <div className="vrs-block-title">{t.blockRecommendations}</div>
                  <ul className="vrs-list">
                    {(result.recommendations || []).map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>

                {result.confidence?.score < 70 && (
                  <div className="vrs-block">
                    <div className="vrs-block-title">{t.blockConfidence}</div>
                    <div className="vrs-funding-type-reason">{result.confidence?.reason}</div>
                  </div>
                )}

                <button className="vrs-download-btn" onClick={downloadReport}>{t.btnDownloadReport}</button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="vrs-footer">{t.footerCredit}</div>
    </div>
  );
}

function Seal({ score, verdict, t }) {
  const colorMap = { IMMEDIATE_FUNDING: "#4C8C7C", RECOMMENDED: "#C9A227", NEEDS_IMPROVEMENT: "#C98A27", NOT_READY: "#B2554B" };
  const color = colorMap[verdict] || "#B2554B";
  const circumference = 2 * Math.PI * 72;
  const dash = (Math.min(Math.max(score || 0, 0), 100) / 100) * circumference;
  return (
    <div className="vrs-seal-wrap">
      <svg viewBox="0 0 168 168" width="168" height="168">
        <circle cx="84" cy="84" r="72" fill="none" stroke="rgba(237,230,214,0.15)" strokeWidth="3" />
        <circle
          cx="84" cy="84" r="72" fill="none"
          stroke={color} strokeWidth="3"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          transform="rotate(-90 84 84)"
        />
        <circle cx="84" cy="84" r="58" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
        <text x="84" y="80" textAnchor="middle" className="vrs-seal-num" fill="#EDE6D6" fontSize="34">{score}</text>
        <text x="84" y="102" textAnchor="middle" fill="rgba(237,230,214,0.55)" fontSize="10" letterSpacing="2" fontFamily="IBM Plex Mono, monospace">{t.scoreUnit}</text>
      </svg>
    </div>
  );
}

function VerdictTag({ verdict, t }) {
  const meta = t.verdict[verdict] || t.verdict.NOT_READY;
  const colorMap = { IMMEDIATE_FUNDING: "#4C8C7C", RECOMMENDED: "#C9A227", NEEDS_IMPROVEMENT: "#C98A27", NOT_READY: "#B2554B" };
  const color = colorMap[verdict] || "#B2554B";
  return (
    <>
      <div className="vrs-verdict-tag" style={{ color, borderColor: color }}>{meta.text}</div>
      <div className="vrs-verdict-sub">{meta.sub}</div>
    </>
  );
}

function Bar({ label, value, max, rationale, subLabels, subScores, maxima }) {
  const [open, setOpen] = useState(false);
  const v = typeof value === "number" ? value : 0;
  const pct = Math.min(Math.max((v / max) * 100, 0), 100);
  const subEntries = subLabels ? Object.keys(subLabels) : [];
  return (
    <div className="vrs-bar-row">
      <div className="vrs-bar-top">
        <span>{label}</span>
        <span className="vrs-bar-top-right">
          <span>{v}/{max}</span>
          <button className={"vrs-info-btn" + (open ? " open" : "")} onClick={() => setOpen((o) => !o)} type="button">i</button>
        </span>
      </div>
      <div className="vrs-bar-track">
        <div className="vrs-bar-fill" style={{ width: pct + "%", background: "#C9A227" }} />
      </div>
      {open && (
        <div className="vrs-bar-detail">
          {subEntries.length > 0 && subScores && (
            <div className="vrs-bar-sub">
              {subEntries.map((key, i) => (
                <span key={key}>
                  {subLabels[key]} {subScores[key] ?? 0}/{maxima?.[key]}
                  {i < subEntries.length - 1 ? " · " : ""}
                </span>
              ))}
            </div>
          )}
          {rationale && <div className="vrs-bar-rationale">{rationale}</div>}
        </div>
      )}
    </div>
  );
}

function riskColor(v) {
  if (v === "Low") return "#4C8C7C";
  if (v === "High") return "#B2554B";
  return "#C9A227";
}
