(() => {
const STORAGE_KEY = "jp-island-trip-2026-v2-state";
const JPY_TO_TWD_DIVISOR = 5;

const mapUrl = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
const searchUrl = (query) => `https://www.google.com/search?q=${encodeURIComponent(query)}`;
const directionsUrl = (points = []) => {
  const named = points.map((point) => point.query || point.label);
  const [origin, ...rest] = named;
  const destination = rest.pop() || origin;
  const waypoints = rest.join("|");
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}${waypoints ? `&waypoints=${encodeURIComponent(waypoints)}` : ""}`;
};

const clone = (value) => JSON.parse(JSON.stringify(value));
const tripData = window.TRIP_DATA || {};

const route = clone(tripData.route || []);
const itinerary = clone(tripData.itinerary || []);
const bookings = clone(tripData.bookings || []);
const places = clone(tripData.places || []);
const tasks = clone(tripData.tasks || []);
const dayMaps = clone(tripData.dayMaps || {});
const manuals = clone(tripData.manuals || []);
const statusLabels = tripData.statusLabels || {};
const regionLabels = tripData.regionLabels || {};
const typeLabels = { ...(tripData.typeLabels || {}), expense: "記帳" };
const visualAssets = { ...(tripData.visualAssets || {}), ...(window.TRIP_VISUAL_ASSETS || {}) };
const placeImages = tripData.placeImages || {};
const plannedExpenses = [];

const payerLabels = {
  husband: "老公",
  wife: "老婆",
  pending: "待補",
};

const expenseCategories = ["餐飲", "交通", "住宿", "活動", "購物", "咖啡", "其他"];

const dayModeNotes = {
  d0610: {
    title: "新千歲機場到飯店",
    items: [
      "國際線 84 號巴士站搭空港連絡巴士／札幌都心行",
      "南3条すすきの下車，步行或短程計程車到 GRANBELL HOTEL TANUKI",
      "若巴士異常，改 JR 快速 Airport 到札幌站，再轉計程車",
    ],
    warning: "6/10 抵達日以入住與暖身為主，不要把晚上排滿。",
  },
  d0612: {
    title: "札幌東北側行程",
    items: [
      "10:00-13:30 莫埃來沼公園",
      "14:00-14:40 移動到札幌啤酒博物館",
      "14:40-16:15 札幌啤酒博物館",
      "晚上回狸小路／薄野，或直接吃成吉思汗",
    ],
  },
  d0622: {
    title: "早班機日重點",
    items: [
      "04:20 起床",
      "05:00 出門",
      "JL903 HND→OKA 07:20-10:00",
      "NH1727 OKA→MMY 14:10-15:05",
      "抵達後聯絡飯店接駁",
    ],
    warning: "前一天晚上請提早收行李，這天不適合臨時找東西。",
  },
  d0627: {
    title: "返程日重點",
    items: ["整理行李與易碎品", "11:00 前往下地島機場", "JX891 SHI→TPE 14:00-14:10", "伴手禮分裝"],
  },
};

let state = loadState();
let filters = { query: "", region: "all", category: "all" };

const els = {
  todayCockpit: document.querySelector("#todayCockpit"),
  regionTabs: document.querySelector("#regionTabs"),
  searchInput: document.querySelector("#searchInput"),
  categoryFilter: document.querySelector("#categoryFilter"),
  daysCount: document.querySelector("#daysCount"),
  progressPercent: document.querySelector("#progressPercent"),
  progressText: document.querySelector("#progressText"),
  expenseTotal: document.querySelector("#expenseTotal"),
  expenseBalance: document.querySelector("#expenseBalance"),
  openTasks: document.querySelector("#openTasks"),
  itineraryList: document.querySelector("#itineraryList"),
  placeGrid: document.querySelector("#placeGrid"),
  bookingList: document.querySelector("#bookingList"),
  taskList: document.querySelector("#taskList"),
  expenseForm: document.querySelector("#expenseForm"),
  expenseDate: document.querySelector("#expenseDate"),
  expenseTitle: document.querySelector("#expenseTitle"),
  expenseCategory: document.querySelector("#expenseCategory"),
  expenseAmount: document.querySelector("#expenseAmount"),
  expenseCurrency: document.querySelector("#expenseCurrency"),
  expensePayer: document.querySelector("#expensePayer"),
  expenseNote: document.querySelector("#expenseNote"),
  expenseLive: document.querySelector("#expenseLive"),
  expenseSummary: document.querySelector("#expenseSummary"),
  expenseList: document.querySelector("#expenseList"),
  exportCsvBtn: document.querySelector("#exportCsvBtn"),
  dialog: document.querySelector("#detailDialog"),
  dialogContent: document.querySelector("#dialogContent"),
};

function loadState() {
  try {
    return normalizeState(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  } catch {
    return normalizeState(null);
  }
}

function normalizeState(saved) {
  return {
    statuses: saved?.statuses || {},
    tasks: saved?.tasks || {},
    expenses: Array.isArray(saved?.expenses) ? saved.expenses : [],
    expensePayers: saved?.expensePayers || {},
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalize(value) {
  return String(value || "").toLowerCase().trim();
}

function itemText(item) {
  const links = item.links ? Object.values(item.links).join(" ") : "";
  return normalize([item.date, item.weekday, item.title, item.detail, item.meta, item.region, item.type, item.category, links, ...(item.tags || [])].join(" "));
}

function matches(item, category = item.type || item.category) {
  const queryMatch = !filters.query || itemText(item).includes(filters.query);
  const regionMatch = filters.region === "all" || !item.region || item.region === filters.region;
  const categoryMatch = filters.category === "all" || category === filters.category || item.type === filters.category;
  return queryMatch && regionMatch && categoryMatch;
}

function currentStatus(item) {
  return state.statuses[item.id] || item.status || "confirmed";
}

function jpyMoney(value) {
  return `¥${Math.round(Number(value) || 0).toLocaleString("ja-JP")}`;
}

function twdMoney(value) {
  return `NT$${Math.round(Number(value) || 0).toLocaleString("zh-TW")}`;
}

function convertExpenseAmount(amount, currency) {
  const cleanAmount = Math.max(0, Number(amount) || 0);
  if (currency === "TWD") {
    return {
      amount: cleanAmount,
      currency,
      jpyAmount: Math.round(cleanAmount * JPY_TO_TWD_DIVISOR),
      twdAmount: Math.round(cleanAmount),
    };
  }
  return {
    amount: cleanAmount,
    currency: "JPY",
    jpyAmount: Math.round(cleanAmount),
    twdAmount: Math.round(cleanAmount / JPY_TO_TWD_DIVISOR),
  };
}

function normalizeExpense(entry, source = "user") {
  const converted = convertExpenseAmount(entry.amount ?? entry.jpyAmount ?? 0, entry.currency || "JPY");
  return {
    id: entry.id,
    date: entry.date || "",
    title: entry.title || "未命名支出",
    category: entry.category || "其他",
    note: entry.note || "",
    source,
    payer: source === "planned" ? state.expensePayers[entry.id] || entry.payer || "pending" : entry.payer || "pending",
    ...converted,
  };
}

function mergeById(target, source) {
  source.forEach((item) => {
    const existing = target.find((entry) => entry.id === item.id);
    if (existing) Object.assign(existing, item);
    else target.push(item);
  });
}

function applyTripUpdates(updates = window.TRIP_UPDATES) {
  if (!updates) return;

  Object.entries(updates.itinerary || {}).forEach(([id, patch]) => {
    const day = itinerary.find((item) => item.id === id);
    if (day) Object.assign(day, patch);
  });

  Object.entries(updates.bookings || {}).forEach(([id, patch]) => {
    const booking = bookings.find((item) => item.id === id);
    if (booking) Object.assign(booking, patch);
  });

  mergeById(places, updates.places || []);

  Object.entries(updates.dayMaps || {}).forEach(([id, patch]) => {
    dayMaps[id] = { ...(dayMaps[id] || {}), ...patch };
  });

  Object.entries(updates.dayModeNotes || {}).forEach(([id, patch]) => {
    dayModeNotes[id] = { ...(dayModeNotes[id] || {}), ...patch };
  });

  mergeById(plannedExpenses, updates.expenses || []);
  Object.assign(visualAssets, updates.visualAssets || {});
}

function applyExpenseSeeds(seeds = window.EXPENSE_SEEDS || []) {
  mergeById(plannedExpenses, seeds);
}

function allExpenses() {
  return [
    ...plannedExpenses.map((expense) => normalizeExpense(expense, "planned")),
    ...state.expenses.map((expense) => normalizeExpense(expense, "user")),
  ];
}

function expenseStats(entries = allExpenses()) {
  const totalJpy = entries.reduce((sum, entry) => sum + entry.jpyAmount, 0);
  const pendingJpy = entries.filter((entry) => entry.payer === "pending").reduce((sum, entry) => sum + entry.jpyAmount, 0);
  const husbandJpy = entries.filter((entry) => entry.payer === "husband").reduce((sum, entry) => sum + entry.jpyAmount, 0);
  const wifeJpy = entries.filter((entry) => entry.payer === "wife").reduce((sum, entry) => sum + entry.jpyAmount, 0);
  return { totalJpy, pendingJpy, husbandJpy, wifeJpy, settlement: Math.round((husbandJpy - wifeJpy) / 2) };
}

function settlementText(settlement) {
  if (!settlement) return "目前兩邊平衡";
  const amount = Math.abs(settlement);
  return settlement > 0
    ? `老婆補老公 ${jpyMoney(amount)} / ${twdMoney(amount / JPY_TO_TWD_DIVISOR)}`
    : `老公補老婆 ${jpyMoney(amount)} / ${twdMoney(amount / JPY_TO_TWD_DIVISOR)}`;
}

function tripDate(day) {
  const [, month, date] = day.id.match(/^d(\d{2})(\d{2})$/) || [];
  return new Date(2026, Number(month) - 1, Number(date));
}

function selectedDay() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const first = tripDate(itinerary[0]);
  const last = tripDate(itinerary[itinerary.length - 1]);
  if (today <= first) return itinerary[0];
  if (today >= last) return itinerary[itinerary.length - 1];
  return itinerary.find((day) => tripDate(day).getTime() === today.getTime()) || itinerary.find((day) => tripDate(day) > today) || itinerary[0];
}

function linkButtons(links = {}, title = "") {
  const enriched = { ...links };
  if (title && !enriched.site && !enriched.sns && !enriched.web) {
    enriched.web = searchUrl(`${title} official website Instagram`);
  }
  const specs = [
    ["map", "Maps"],
    ["site", "官網"],
    ["sns", "SNS"],
    ["web", "搜尋"],
  ];
  return specs
    .filter(([key]) => enriched[key])
    .map(([key, label]) => `<a class="action-link ${key}" href="${enriched[key]}" target="_blank" rel="noreferrer">${label}</a>`)
    .join("");
}

function visualFor(item) {
  const asset = visualAssets[item.id] || {};
  const assetIsReal = ["officialSite", "officialSNS", "maps"].includes(asset.sourceType);
  return {
    image: assetIsReal ? asset.image || item.image || placeImages[item.id] : item.image || asset.image || placeImages[item.id],
    icon: item.visualIcon || asset.icon,
    sourceType: asset.sourceType,
    sourceName: asset.sourceName,
  };
}

function mediaHtml(item, className = "") {
  const visual = visualFor(item);
  const sourceLabel = {
    officialSite: "官網照片",
    officialSNS: "官方 SNS",
    maps: "Maps 參考",
    generated: "手繪代表圖",
    icon: "隱私保護",
  }[visual.sourceType] || "";

  if (visual.image) {
    return `
      <figure class="media ${className}">
        <img src="${visual.image}" alt="${item.title} 代表照片" loading="lazy" />
        ${sourceLabel ? `<figcaption>${sourceLabel}${visual.sourceName ? ` · ${visual.sourceName}` : ""}</figcaption>` : ""}
      </figure>
    `;
  }

  return `
    <div class="media icon-media ${className}" aria-label="${item.title} 代表圖示">
      <span>${visual.icon || item.icon || "地"}</span>
      ${sourceLabel ? `<small>${sourceLabel}</small>` : ""}
    </div>
  `;
}

function miniMapHtml(day) {
  const map = dayMaps[day.id];
  if (!map?.points?.length) return "";
  const path = map.points.map((point) => `${point.x},${point.y}`).join(" ");
  return `
    <div class="mini-map-card">
      <div class="mini-map-head">
        <strong>${map.area}</strong>
        <a class="action-link map" href="${directionsUrl(map.points)}" target="_blank" rel="noreferrer">當日動線</a>
      </div>
      <div class="mini-map">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points="${path}" /></svg>
        ${map.points.map((point, index) => `
          <a class="map-pin ${point.kind}" href="${mapUrl(point.query || point.label)}" target="_blank" rel="noreferrer" style="left:${point.x}%; top:${point.y}%;">
            <span>${index + 1}</span>
          </a>
        `).join("")}
      </div>
      <ol>
        ${map.points.map((point, index) => `<li><span>${index + 1}</span><a href="${mapUrl(point.query || point.label)}" target="_blank" rel="noreferrer">${point.label}</a></li>`).join("")}
      </ol>
    </div>
  `;
}

function noteHtml(day) {
  const note = dayModeNotes[day.id];
  if (!note) return "";
  return `
    <div class="note-box">
      <strong>${note.title}</strong>
      <ul>${note.items.map((item) => `<li>${item}</li>`).join("")}</ul>
      ${note.warning ? `<p>${note.warning}</p>` : ""}
    </div>
  `;
}

function renderTabs() {
  els.regionTabs.innerHTML = Object.entries(regionLabels).map(([key, label]) => `
    <button class="segment ${filters.region === key ? "active" : ""}" type="button" data-region="${key}">${label}</button>
  `).join("");
}

function renderToday() {
  const day = selectedDay();
  const note = dayModeNotes[day.id];
  const map = dayMaps[day.id];
  const dayExpenses = allExpenses().filter((expense) => expense.date === day.date);
  const stats = expenseStats(dayExpenses);
  const nextAction = note?.items?.[0] || day.detail;
  const urgentTasks = tasks.filter((task) => task.detail.includes(day.date) || task.title.includes(day.date)).slice(0, 3);

  els.todayCockpit.innerHTML = `
    <div class="today-date">
      <span>${day.date}</span>
      <small>星期${day.weekday}</small>
    </div>
    <div class="today-main">
      <p class="kicker">${regionLabels[day.region]} · ${typeLabels[day.type]}</p>
      <h2>${day.title}</h2>
      <p>${day.detail}</p>
      <div class="next-action">
        <span>下一步</span>
        <strong>${nextAction}</strong>
      </div>
      <div class="button-row">
        ${linkButtons(day.links, day.title)}
        ${map ? `<a class="action-link map" href="${directionsUrl(map.points)}" target="_blank" rel="noreferrer">開啟今日路線</a>` : ""}
      </div>
    </div>
    <div class="today-side">
      <div class="side-stat"><span>今日預定支出</span><strong>${jpyMoney(stats.totalJpy)}</strong><small>${twdMoney(stats.totalJpy / JPY_TO_TWD_DIVISOR)}</small></div>
      <div class="side-stat"><span>付款狀態</span><strong>${stats.pendingJpy ? `${jpyMoney(stats.pendingJpy)} 待補` : "已分配"}</strong><small>${settlementText(stats.settlement)}</small></div>
      ${urgentTasks.length ? `<div class="mini-list">${urgentTasks.map((task) => `<span>${task.title}</span>`).join("")}</div>` : `<div class="mini-list"><span>目前沒有當日待辦。</span></div>`}
    </div>
    ${noteHtml(day)}
    ${miniMapHtml(day)}
  `;
}

function renderMetrics() {
  const tracked = [...itinerary, ...bookings];
  const finished = tracked.filter((item) => ["confirmed", "done"].includes(currentStatus(item))).length;
  const doneTasks = tasks.filter((task) => state.tasks[task.id]).length;
  const total = tracked.length + tasks.length;
  const percent = Math.round(((finished + doneTasks) / total) * 100);
  const stats = expenseStats();

  els.daysCount.textContent = itinerary.length;
  els.progressPercent.textContent = `${percent}%`;
  els.progressText.textContent = `${finished + doneTasks} / ${total} 項`;
  els.expenseTotal.textContent = jpyMoney(stats.totalJpy);
  els.expenseBalance.textContent = settlementText(stats.settlement);
  els.openTasks.textContent = tasks.length - doneTasks;
}

function renderItinerary() {
  els.itineraryList.innerHTML = itinerary.map((day) => {
    const hidden = matches(day, day.type) ? "" : " hidden";
    const status = currentStatus(day);
    return `
      <article class="day-card${hidden}" data-detail-kind="itinerary" data-id="${day.id}">
        <div class="day-card-top">
          <div class="date-chip"><strong>${day.date}</strong><span>週${day.weekday}</span></div>
          <button class="status-pill ${status}" type="button" data-status-for="${day.id}">${statusLabels[status]}</button>
        </div>
        ${mediaHtml(day)}
        <div class="card-body">
          <p class="kicker">${regionLabels[day.region]} · ${typeLabels[day.type]}</p>
          <h3>${day.title}</h3>
          <p>${day.detail}</p>
          <div class="button-row">${linkButtons(day.links, day.title)}</div>
        </div>
        ${noteHtml(day)}
        ${miniMapHtml(day)}
      </article>
    `;
  }).join("");
}

function renderPlaces() {
  els.placeGrid.innerHTML = places.map((place, index) => {
    const hidden = matches(place, place.type) ? "" : " hidden";
    return `
      <article class="place-card ${index % 5 === 0 ? "feature" : ""}${hidden}" data-place-id="${place.id}">
        ${mediaHtml(place)}
        <div class="card-body">
          <p class="kicker">${regionLabels[place.region]} · ${typeLabels[place.type]}</p>
          <h3>${place.title}</h3>
          <p>${place.detail}</p>
          <div class="tag-row">${(place.tags || []).map((tag) => `<span>${tag}</span>`).join("")}</div>
          <div class="button-row">${linkButtons(place.links, place.title)}</div>
        </div>
      </article>
    `;
  }).join("");
}

function renderBookings() {
  els.bookingList.innerHTML = bookings.map((booking) => {
    const hidden = matches(booking, booking.category) ? "" : " hidden";
    const status = currentStatus(booking);
    return `
      <article class="booking-card${hidden}">
        <span class="booking-icon">${booking.icon}</span>
        <div>
          <p class="kicker">${booking.date}</p>
          <h3>${booking.title}</h3>
          <p>${booking.meta}</p>
          <div class="button-row">${linkButtons(booking.links, booking.title)}</div>
        </div>
        <button class="status-pill ${status}" type="button" data-status-for="${booking.id}">${statusLabels[status]}</button>
      </article>
    `;
  }).join("");
}

function renderTasks() {
  els.taskList.innerHTML = tasks.map((task) => {
    const done = Boolean(state.tasks[task.id]);
    const hidden = matches(task, "task") ? "" : " hidden";
    return `
      <label class="task-item ${done ? "done" : ""}${hidden}">
        <input class="task-toggle" type="checkbox" data-task="${task.id}" ${done ? "checked" : ""} />
        <span><strong>${task.title}</strong><small>${task.detail}</small></span>
        <em>${regionLabels[task.region]}</em>
      </label>
    `;
  }).join("");
}

function renderExpenseCategories() {
  els.expenseCategory.innerHTML = expenseCategories.map((category) => `<option value="${category}">${category}</option>`).join("");
}

function renderExpenses() {
  const entries = allExpenses();
  const visible = entries.filter((entry) => matches({ ...entry, type: "expense", tags: [entry.category, payerLabels[entry.payer]] }, "expense"));
  const stats = expenseStats(entries);
  const categoryTotals = expenseCategories
    .map((category) => ({ category, total: entries.filter((entry) => entry.category === category).reduce((sum, entry) => sum + entry.jpyAmount, 0) }))
    .filter((item) => item.total > 0);

  els.expenseSummary.innerHTML = `
    <article><span>總支出</span><strong>${jpyMoney(stats.totalJpy)}</strong><small>${twdMoney(stats.totalJpy / JPY_TO_TWD_DIVISOR)}</small></article>
    <article><span>老公已付</span><strong>${jpyMoney(stats.husbandJpy)}</strong><small>${twdMoney(stats.husbandJpy / JPY_TO_TWD_DIVISOR)}</small></article>
    <article><span>老婆已付</span><strong>${jpyMoney(stats.wifeJpy)}</strong><small>${twdMoney(stats.wifeJpy / JPY_TO_TWD_DIVISOR)}</small></article>
    <article><span>待補</span><strong>${jpyMoney(stats.pendingJpy)}</strong><small>${twdMoney(stats.pendingJpy / JPY_TO_TWD_DIVISOR)}</small></article>
    <article class="wide-summary"><span>平分結算</span><strong>${settlementText(stats.settlement)}</strong><small>固定日幣除 5 估台幣</small></article>
    ${categoryTotals.length ? `<article class="wide-summary category-chart"><span>分類</span>${categoryTotals.map((item) => `<div><b>${item.category}</b><i style="--w:${Math.max(8, (item.total / stats.totalJpy) * 100)}%"></i><em>${jpyMoney(item.total)}</em></div>`).join("")}</article>` : ""}
  `;

  els.expenseList.innerHTML = visible.map((entry) => `
    <article class="expense-item ${entry.source}">
      <div>
        <p class="kicker">${entry.date || "未填日期"} · ${entry.category} · ${entry.currency}</p>
        <h3>${entry.title}</h3>
        ${entry.note ? `<p>${entry.note}</p>` : ""}
        <div class="tag-row"><span>${entry.source === "planned" ? "預定支出" : "已記帳"}</span><span>${payerLabels[entry.payer]}</span></div>
      </div>
      <div class="expense-amount"><strong>${jpyMoney(entry.jpyAmount)}</strong><small>${twdMoney(entry.twdAmount)}</small></div>
      <div class="expense-actions">
        ${Object.entries(payerLabels).map(([key, label]) => `<button class="segment ${entry.payer === key ? "active" : ""}" type="button" data-expense-payer="${entry.id}" data-payer="${key}" data-source="${entry.source}">${label}</button>`).join("")}
        ${entry.source === "user" ? `<button class="text-button danger" type="button" data-delete-expense="${entry.id}">刪除</button>` : ""}
      </div>
    </article>
  `).join("") || `<div class="empty-state">目前沒有符合的記帳項目。</div>`;
}

function updateExpenseLivePreview() {
  const amount = Number(els.expenseAmount.value) || 0;
  const currency = els.expenseCurrency.value || "JPY";
  if (!amount) {
    els.expenseLive.textContent = "輸入金額後自動換算";
    return;
  }
  const converted = convertExpenseAmount(amount, currency);
  els.expenseLive.textContent = `${jpyMoney(converted.jpyAmount)} / ${twdMoney(converted.twdAmount)}（固定日幣除 5）`;
}

function addExpenseFromForm() {
  const amount = Number(els.expenseAmount.value) || 0;
  const title = els.expenseTitle.value.trim();
  if (!amount || !title) {
    els.expenseLive.textContent = "請先輸入項目與金額。";
    return;
  }
  const converted = convertExpenseAmount(amount, els.expenseCurrency.value);
  state.expenses.unshift({
    id: `expense-${Date.now()}`,
    date: els.expenseDate.value.trim(),
    title,
    category: expenseCategories.includes(els.expenseCategory.value) ? els.expenseCategory.value : "其他",
    payer: els.expensePayer.value,
    note: els.expenseNote.value.trim(),
    amount: converted.amount,
    currency: converted.currency,
  });
  saveState();
  els.expenseForm.reset();
  els.expenseCurrency.value = "JPY";
  els.expensePayer.value = "husband";
  updateExpenseLivePreview();
  renderAll();
}

function setExpensePayer(id, payer, source) {
  if (!payerLabels[payer]) return;
  if (source === "planned") {
    state.expensePayers[id] = payer;
  } else {
    const expense = state.expenses.find((entry) => entry.id === id);
    if (expense) expense.payer = payer;
  }
  saveState();
  renderAll();
}

function deleteExpense(id) {
  state.expenses = state.expenses.filter((expense) => expense.id !== id);
  saveState();
  renderAll();
}

function cycleStatus(id) {
  const order = ["confirmed", "pending", "backup", "flexible", "todo", "done"];
  const source = [...itinerary, ...bookings].find((item) => item.id === id);
  const now = currentStatus(source);
  state.statuses[id] = order[(order.indexOf(now) + 1) % order.length];
  saveState();
  renderAll();
}

function exportExpensesCsv() {
  const rows = [["date", "title", "category", "payer", "currency", "amount", "jpyAmount", "twdAmount", "note", "source"]];
  allExpenses().forEach((entry) => {
    rows.push([entry.date, entry.title, entry.category, payerLabels[entry.payer], entry.currency, entry.amount, entry.jpyAmount, entry.twdAmount, entry.note, entry.source]);
  });
  const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "japan-trip-expenses.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

function openDetail(kind, id) {
  const item = kind === "itinerary" ? itinerary.find((entry) => entry.id === id) : null;
  if (!item) return;
  els.dialogContent.innerHTML = `
    <div class="dialog-body">
      <p class="kicker">${item.date} · ${regionLabels[item.region]}</p>
      <h2>${item.title}</h2>
      ${mediaHtml(item)}
      <p>${item.detail}</p>
      <div class="button-row">${linkButtons(item.links, item.title)}</div>
      ${noteHtml(item)}
      ${miniMapHtml(item)}
    </div>
  `;
  els.dialog.showModal();
}

function renderAll() {
  renderTabs();
  renderToday();
  renderMetrics();
  renderItinerary();
  renderPlaces();
  renderBookings();
  renderTasks();
  renderExpenses();
}

function bindEvents() {
  els.searchInput.addEventListener("input", (event) => {
    filters.query = normalize(event.target.value);
    renderAll();
  });

  els.categoryFilter.addEventListener("change", (event) => {
    filters.category = event.target.value;
    renderAll();
  });

  els.expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addExpenseFromForm();
  });

  [els.expenseAmount, els.expenseCurrency].forEach((input) => {
    input.addEventListener("input", updateExpenseLivePreview);
    input.addEventListener("change", updateExpenseLivePreview);
  });

  els.exportCsvBtn.addEventListener("click", exportExpensesCsv);

  document.addEventListener("click", (event) => {
    const region = event.target.closest("[data-region]");
    if (region) {
      filters.region = region.dataset.region;
      renderAll();
      return;
    }

    const jump = event.target.closest("[data-jump]");
    if (jump) {
      document.querySelector(`#${jump.dataset.jump}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const statusButton = event.target.closest("[data-status-for]");
    if (statusButton) {
      event.stopPropagation();
      cycleStatus(statusButton.dataset.statusFor);
      return;
    }

    const detail = event.target.closest("[data-detail-kind]");
    if (detail && !event.target.closest("button, a")) {
      openDetail(detail.dataset.detailKind, detail.dataset.id);
      return;
    }

    const expensePayer = event.target.closest("[data-expense-payer]");
    if (expensePayer) {
      setExpensePayer(expensePayer.dataset.expensePayer, expensePayer.dataset.payer, expensePayer.dataset.source);
      return;
    }

    const deleteExpenseButton = event.target.closest("[data-delete-expense]");
    if (deleteExpenseButton) {
      deleteExpense(deleteExpenseButton.dataset.deleteExpense);
    }
  });

  document.addEventListener("change", (event) => {
    const task = event.target.closest("[data-task]");
    if (!task) return;
    state.tasks[task.dataset.task] = task.checked;
    saveState();
    renderAll();
  });

  document.querySelector(".dialog-close").addEventListener("click", () => els.dialog.close());
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
  document.querySelector("#resetBtn").addEventListener("click", () => {
    state = normalizeState(null);
    saveState();
    renderAll();
  });
}

applyTripUpdates();
applyExpenseSeeds();
renderExpenseCategories();
bindEvents();
renderAll();
})();
