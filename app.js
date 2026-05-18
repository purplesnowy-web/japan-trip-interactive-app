const STORAGE_KEY = "jp-island-trip-2026-state";

const route = [
  { city: "台北", note: "出發", icon: "TPE" },
  { city: "札幌", note: "6/10-6/16", icon: "SPK" },
  { city: "洞爺湖", note: "6/14-6/16", icon: "TOY" },
  { city: "東京", note: "6/17-6/22", icon: "TYO" },
  { city: "宮古島", note: "6/22-6/27", icon: "MYK" },
  { city: "台北", note: "返程", icon: "TPE" },
];

const itinerary = [
  { id: "d0610", date: "6/10", weekday: "三", region: "hokkaido", type: "main", icon: "✈", title: "抵達札幌", detail: "入住札幌格蘭貝爾飯店狸小路，晚上 YOSAKOI 索朗祭。", status: "confirmed" },
  { id: "d0611", date: "6/11", weekday: "四", region: "hokkaido", type: "main", icon: "☙", title: "小樽慢遊", detail: "小樽運河、舊倉庫群，保留城市散步與咖啡時間。", status: "confirmed" },
  { id: "d0612", date: "6/12", weekday: "五", region: "hokkaido", type: "branch", icon: "△", title: "莫埃來沼公園", detail: "白天走公園線，視天氣調整回市區時間。", status: "confirmed" },
  { id: "d0613", date: "6/13", weekday: "六", region: "hokkaido", type: "shop", icon: "☕", title: "狸小路補給與咖啡", detail: "さっぽろ石ころマーケット、咖啡散步與備案咖啡店。", status: "confirmed" },
  { id: "d0614", date: "6/14", weekday: "日", region: "hokkaido", type: "transport", icon: "車", title: "札幌前往洞爺湖", detail: "11:00 ORIX 取車，前往洞爺湖婚禮方安排住宿。", status: "pending" },
  { id: "d0615", date: "6/15", weekday: "一", region: "hokkaido", type: "main", icon: "湖", title: "洞爺湖婚禮主線", detail: "婚禮主線、湖邊留白，當天不排滿。", status: "confirmed" },
  { id: "d0616", date: "6/16", weekday: "二", region: "hokkaido", type: "transport", icon: "車", title: "洞爺湖回札幌", detail: "18:00 還車，入住薄野船舶花園飯店。", status: "confirmed" },
  { id: "d0617", date: "6/17", weekday: "三", region: "tokyo", type: "transport", icon: "✈", title: "札幌飛東京", detail: "CTS → HND，入住上野寶石飯店，阿美橫丁輕量散步。", status: "todo" },
  { id: "d0618", date: "6/18", weekday: "四", region: "tokyo", type: "main", icon: "城", title: "皇居東御苑解謎", detail: "東京車站北圓頂咖啡、橫丁奇境、原宿／表參道支線。", status: "confirmed" },
  { id: "d0619", date: "6/19", weekday: "五", region: "tokyo", type: "shop", icon: "◇", title: "Jewelry Marche Day 1", detail: "御徒町礦物店巡禮，晶體完整度優先。", status: "confirmed" },
  { id: "d0620", date: "6/20", weekday: "六", region: "tokyo", type: "shop", icon: "◆", title: "ミネラルマーケット2026", detail: "PiO 主線，注意展場燈光與自然光二次確認。", status: "confirmed" },
  { id: "d0621", date: "6/21", weekday: "日", region: "tokyo", type: "branch", icon: "市", title: "日本橋與御徒町回場", detail: "Jewelry Marche 回場、OLD NEW MARKET、日本橋散步。", status: "confirmed" },
  { id: "d0622", date: "6/22", weekday: "一", region: "miyako", type: "transport", icon: "✈", title: "東京到宮古島", detail: "HND → SHI，宮古島貝旅會合，住宿待補。", status: "todo" },
  { id: "d0623", date: "6/23", weekday: "二", region: "miyako", type: "main", icon: "海", title: "宮古島貝旅主線", detail: "依集合資訊與海況安排，保留拍照、潮汐與午休彈性。", status: "pending" },
  { id: "d0624", date: "6/24", weekday: "三", region: "miyako", type: "main", icon: "貝", title: "宮古島貝旅主線", detail: "以貝旅活動為核心，餐廳與移動依現場節奏調整。", status: "pending" },
  { id: "d0625", date: "6/25", weekday: "四", region: "miyako", type: "branch", icon: "橋", title: "宮古島彈性支線", detail: "橋景、海灘、咖啡或市區補給，依天氣決定。", status: "pending" },
  { id: "d0626", date: "6/26", weekday: "五", region: "miyako", type: "branch", icon: "島", title: "宮古島留白日", detail: "預留整理、採買與補拍，不把最後一天塞滿。", status: "pending" },
  { id: "d0627", date: "6/27", weekday: "六", region: "miyako", type: "transport", icon: "✈", title: "宮古島返回台北", detail: "星宇 JX891，收束全程資料與戰利品。", status: "confirmed" },
];

const bookings = [
  { id: "h1", category: "hotel", region: "hokkaido", icon: "床", date: "6/10-6/14", title: "札幌格蘭貝爾飯店狸小路", meta: "NT$15,784.89", status: "confirmed", link: "https://maps.google.com/?q=Granbell+hotel+Tanuki+Sapporo" },
  { id: "h2", category: "hotel", region: "hokkaido", icon: "湯", date: "6/14-6/16", title: "洞爺湖婚禮方安排住宿", meta: "費用待補", status: "done" },
  { id: "h3", category: "hotel", region: "hokkaido", icon: "床", date: "6/16-6/17", title: "船舶花園薄野飯店", meta: "NT$4,252", status: "confirmed", link: "https://maps.google.com/?q=Vessel+Hotel+Campana+Susukino" },
  { id: "h4", category: "hotel", region: "tokyo", icon: "床", date: "6/17-6/22", title: "上野寶石飯店", meta: "NT$16,344", status: "confirmed", link: "https://maps.google.com/?q=Hotel+Sardonyx+Ueno" },
  { id: "h5", category: "hotel", region: "miyako", icon: "床", date: "6/22-6/27", title: "宮古島貝旅指定飯店", meta: "待補", status: "pending" },
  { id: "t1", category: "transport", region: "hokkaido", icon: "✈", date: "台北 → 札幌", title: "長榮班機", meta: "已鎖定", status: "confirmed" },
  { id: "t2", category: "transport", region: "hokkaido", icon: "車", date: "6/14 11:00-6/16 18:00", title: "ORIX 札幌租車 KSS 小型車", meta: "約 ¥26,400", status: "pending", link: "https://maps.google.com/?q=ORIX+Rent+a+Car+Sapporo+Station" },
  { id: "t3", category: "transport", region: "tokyo", icon: "✈", date: "6/17", title: "CTS → HND 國內線", meta: "待購", status: "todo" },
  { id: "t4", category: "transport", region: "miyako", icon: "✈", date: "6/22", title: "HND → SHI 國內線", meta: "待購", status: "todo" },
  { id: "t5", category: "transport", region: "miyako", icon: "✈", date: "宮古島 → 台北", title: "星宇 JX891", meta: "已鎖定", status: "confirmed" },
];

const shops = [
  { id: "s1", region: "tokyo", type: "shop", title: "クリスタル・ワールド御徒町店", detail: "原石、結晶、化石、隕石。晶體完整度優先。", tags: ["御徒町", "礦物"], link: "https://maps.google.com/?q=Crystal+World+Okachimachi" },
  { id: "s2", region: "tokyo", type: "shop", title: "ニルヴァーナストーン御徒町", detail: "水晶、裸石、原石量感補強。", tags: ["御徒町", "裸石"], link: "https://maps.google.com/?q=Nirvana+Stone+Okachimachi" },
  { id: "s3", region: "tokyo", type: "shop", title: "ミネラルマルシェTOKYOミュージアム", detail: "東京站／日本橋，展場型常設空間。", tags: ["日本橋", "展場"], link: "https://maps.google.com/?q=Mineral+Marche+Tokyo+Museum" },
  { id: "s4", region: "tokyo", type: "shop", title: "ウサギノネドコ東京店", detail: "谷中／根津，美學靈感店，自然造形美。", tags: ["美學", "支線"], link: "https://maps.google.com/?q=Usaginonedoko+Tokyo" },
  { id: "s5", region: "hokkaido", type: "shop", title: "さっぽろ石ころマーケット", detail: "6/12-6/14，札幌電視塔 2F。", tags: ["札幌", "活動"], link: "https://www.1456m.com/" },
  { id: "c1", region: "hokkaido", type: "shop", title: "Brew it by NODE", detail: "市中心精品咖啡，推薦日 6/10、6/13。", tags: ["咖啡", "札幌"], link: "https://maps.google.com/?q=Brew+it+by+NODE+Sapporo" },
  { id: "c2", region: "hokkaido", type: "shop", title: "BARISTART COFFEE SAPPORO", detail: "北海道牛奶拿鐵，推薦日 6/12、6/13。", tags: ["咖啡", "牛奶拿鐵"], link: "https://maps.google.com/?q=BARISTART+COFFEE+SAPPORO" },
  { id: "c3", region: "hokkaido", type: "shop", title: "Cafe Morihiko 森彦本店", detail: "札幌咖啡文化地標，6/13 備案。", tags: ["咖啡", "地標"], link: "https://maps.google.com/?q=Cafe+Morihiko+Sapporo" },
];

const quickLinks = [
  { id: "l1", region: "hokkaido", label: "YOSAKOI 索朗祭", url: "https://www.yosakoi-soran.jp/" },
  { id: "l2", region: "hokkaido", label: "莫埃來沼公園", url: "https://moerenumapark.jp/" },
  { id: "l3", region: "hokkaido", label: "北海道神宮例祭", url: "http://www.hokkaidojingu.or.jp/festival/" },
  { id: "l4", region: "tokyo", label: "皇居東御苑解謎", url: "https://www.kunaicho.go.jp/jp/visit/event/nazotoki/" },
  { id: "l5", region: "tokyo", label: "TOKYO STATION CAFE", url: "https://www.iwafu.com/tw/events/1133806" },
  { id: "l6", region: "tokyo", label: "Jewelry Marche", url: "https://www.jewelry-marche.com/event/jun_1.html" },
  { id: "l7", region: "tokyo", label: "ミネラルマーケット", url: "https://mineralmarket.jp/" },
  { id: "l8", region: "tokyo", label: "OLD NEW MARKET", url: "https://www.oldnewmarket.com/" },
];

const tasks = [
  { id: "task-orix", region: "hokkaido", type: "task", title: "ORIX 租車最後確認", detail: "確認取還車時間、保險、駕照譯本與 KSS 小型車條件。", status: "pending" },
  { id: "task-ctshnd", region: "tokyo", type: "task", title: "CTS → HND 國內線購票", detail: "對齊 6/17 入住東京與下午輕量散步節奏。", status: "todo" },
  { id: "task-hndshi", region: "miyako", type: "task", title: "HND → SHI 國內線購票", detail: "對齊 6/22 宮古島貝旅會合時間。", status: "todo" },
  { id: "task-toya", region: "hokkaido", type: "task", title: "洞爺湖住宿費用補記", detail: "婚禮方住宿已完成安排，補上費用與聯絡窗口。", status: "pending" },
  { id: "task-miyako", region: "miyako", type: "task", title: "宮古島飯店與集合資訊補記", detail: "補上指定飯店、集合地點、接駁與退房資訊。", status: "pending" },
];

const manuals = [
  { title: "PAGE 1 總覽", src: "assets/page-1.png" },
  { title: "PAGE 2 北海道篇", src: "assets/page-2.png" },
  { title: "PAGE 3 東京篇", src: "assets/page-3.png" },
  { title: "PAGE 4 礦物與咖啡", src: "assets/page-4.png" },
  { title: "PAGE 5 總表", src: "assets/page-5.png" },
];

const statusLabels = {
  confirmed: "已確認",
  done: "已完成",
  pending: "待確認",
  todo: "待購",
};

const regionLabels = {
  all: "全部",
  hokkaido: "北海道",
  tokyo: "東京",
  miyako: "宮古島",
};

let state = loadState();
let filters = { query: "", region: "all", category: "all", view: "timeline" };

const els = {
  routeMap: document.querySelector("#routeMap"),
  routeStats: document.querySelector("#routeStats"),
  regionTabs: document.querySelector("#regionTabs"),
  searchInput: document.querySelector("#searchInput"),
  categoryFilter: document.querySelector("#categoryFilter"),
  itineraryList: document.querySelector("#itineraryList"),
  bookingList: document.querySelector("#bookingList"),
  taskList: document.querySelector("#taskList"),
  shopGrid: document.querySelector("#shopGrid"),
  linkList: document.querySelector("#linkList"),
  manualGallery: document.querySelector("#manualGallery"),
  daysCount: document.querySelector("#daysCount"),
  knownHotelCost: document.querySelector("#knownHotelCost"),
  progressPercent: document.querySelector("#progressPercent"),
  progressText: document.querySelector("#progressText"),
  openTasks: document.querySelector("#openTasks"),
  dialog: document.querySelector("#detailDialog"),
  dialogContent: document.querySelector("#dialogContent"),
};

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { statuses: {}, tasks: {} };
  } catch {
    return { statuses: {}, tasks: {} };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalize(value) {
  return String(value || "").toLowerCase().trim();
}

function itemText(item) {
  return normalize([item.date, item.weekday, item.title, item.detail, item.meta, item.region, item.type, ...(item.tags || [])].join(" "));
}

function currentStatus(item) {
  return state.statuses[item.id] || item.status || "confirmed";
}

function matches(item, category = item.type || item.category) {
  const queryMatch = !filters.query || itemText(item).includes(filters.query);
  const regionMatch = filters.region === "all" || item.region === filters.region;
  const categoryMatch = filters.category === "all" || category === filters.category || item.type === filters.category;
  return queryMatch && regionMatch && categoryMatch;
}

function money(value) {
  return new Intl.NumberFormat("zh-TW", { style: "currency", currency: "TWD", maximumFractionDigits: 0 }).format(value);
}

function renderRoute() {
  els.routeMap.innerHTML = route.map((stop, index) => `
    <div class="route-step">
      <span class="route-dot">${stop.icon}</span>
      <div>
        <strong>${stop.city}</strong>
        <div class="route-line" aria-hidden="true"></div>
      </div>
      <span>${stop.note}</span>
    </div>
  `).join("");

  els.routeStats.innerHTML = [
    ["旅程", "18 天"],
    ["城市", "5 站"],
    ["原則", "慢節奏"],
  ].map(([label, value]) => `<div class="route-stat"><strong>${value}</strong><br><span>${label}</span></div>`).join("");
}

function renderTabs() {
  els.regionTabs.innerHTML = Object.entries(regionLabels).map(([key, label]) => `
    <button class="segment ${filters.region === key ? "active" : ""}" type="button" data-region="${key}">${label}</button>
  `).join("");
}

function renderItinerary() {
  els.itineraryList.className = filters.view === "cards" ? "timeline cards-view" : "timeline";
  const html = itinerary.map((day) => {
    const status = currentStatus(day);
    const hidden = matches(day, day.type) ? "" : " hidden";
    return `
      <article class="day-row${hidden}" data-detail-kind="itinerary" data-id="${day.id}">
        <div class="date-block">${day.date}<span>星期${day.weekday}</span></div>
        <div class="day-icon">${day.icon}</div>
        <div class="day-main">
          <h3>${day.title}</h3>
          <p>${day.detail}</p>
          <div class="tag-row">
            <span class="tag">${regionLabels[day.region]}</span>
            <span class="tag">${day.type === "main" ? "主線" : day.type === "branch" ? "支線" : day.type === "transport" ? "交通" : "收藏咖啡"}</span>
          </div>
        </div>
        <button class="status-pill ${status}" type="button" data-status-for="${day.id}">${statusLabels[status]}</button>
      </article>
    `;
  }).join("");
  els.itineraryList.innerHTML = html || emptyState();
}

function renderBookings() {
  els.bookingList.innerHTML = bookings.map((booking) => {
    const status = currentStatus(booking);
    const hidden = matches(booking, booking.category) ? "" : " hidden";
    return `
      <article class="booking-card${hidden}" data-detail-kind="booking" data-id="${booking.id}">
        <span class="booking-icon">${booking.icon}</span>
        <div class="booking-main">
          <div class="booking-meta">${booking.date}</div>
          <h3>${booking.title}</h3>
          <p>${booking.meta}</p>
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
        <span>
          <strong class="task-title">${task.title}</strong>
          <span class="booking-meta">${task.detail}</span>
        </span>
        <span class="tag">${regionLabels[task.region]}</span>
      </label>
    `;
  }).join("");
}

function renderShops() {
  els.shopGrid.innerHTML = shops.map((shop, index) => {
    const hidden = matches(shop, "shop") ? "" : " hidden";
    const accent = index % 3 === 0 ? "var(--sky)" : index % 3 === 1 ? "var(--sage-soft)" : "var(--rose)";
    return `
      <article class="shop-card${hidden}" style="--accent: ${accent}">
        <div>
          <p class="panel-kicker">${regionLabels[shop.region]}</p>
          <h3>${shop.title}</h3>
          <p>${shop.detail}</p>
        </div>
        <div class="tag-row">${shop.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
        <div class="shop-actions">
          <a class="small-link" href="${shop.link}" target="_blank" rel="noreferrer">開啟連結</a>
        </div>
      </article>
    `;
  }).join("");
}

function renderLinks() {
  els.linkList.innerHTML = quickLinks.map((link) => {
    const hidden = matches({ ...link, type: "branch", detail: link.url }, "branch") ? "" : " hidden";
    return `
      <div class="link-item${hidden}">
        <span><strong>${link.label}</strong><br><small>${regionLabels[link.region]}</small></span>
        <a href="${link.url}" target="_blank" rel="noreferrer">前往</a>
      </div>
    `;
  }).join("");
}

function renderManuals() {
  els.manualGallery.innerHTML = manuals.map((manual, index) => `
    <button class="manual-thumb" type="button" data-manual="${index}">
      <img src="${manual.src}" alt="${manual.title}" loading="lazy" />
      <strong>${manual.title}</strong>
    </button>
  `).join("");
}

function renderMetrics() {
  const knownHotelCost = 15784.89 + 4252 + 16344;
  const tracked = [...itinerary, ...bookings];
  const finished = tracked.filter((item) => ["confirmed", "done"].includes(currentStatus(item))).length;
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((task) => state.tasks[task.id]).length;
  const percent = Math.round(((finished + doneTasks) / (tracked.length + totalTasks)) * 100);

  els.daysCount.textContent = itinerary.length;
  els.knownHotelCost.textContent = money(knownHotelCost);
  els.progressPercent.textContent = `${percent}%`;
  els.progressText.textContent = `${finished + doneTasks} / ${tracked.length + totalTasks} 項`;
  els.openTasks.textContent = totalTasks - doneTasks;
}

function renderAll() {
  renderTabs();
  renderItinerary();
  renderBookings();
  renderTasks();
  renderShops();
  renderLinks();
  renderMetrics();
  markEmptyPanels();
}

function markEmptyPanels() {
  ["itineraryList", "bookingList", "taskList", "shopGrid", "linkList"].forEach((key) => {
    const el = els[key];
    if (!el) return;
    const visible = Array.from(el.children).some((child) => !child.classList.contains("hidden"));
    if (!visible) {
      el.insertAdjacentHTML("beforeend", emptyState());
    }
  });
}

function emptyState() {
  return `<div class="empty-state">目前篩選沒有符合項目。</div>`;
}

function cycleStatus(id) {
  const order = ["confirmed", "pending", "todo", "done"];
  const source = [...itinerary, ...bookings].find((item) => item.id === id);
  const now = currentStatus(source);
  const next = order[(order.indexOf(now) + 1) % order.length];
  state.statuses[id] = next;
  saveState();
  renderAll();
}

function openDetail(kind, id) {
  const pools = { itinerary, booking: bookings };
  const item = pools[kind]?.find((entry) => entry.id === id);
  if (!item) return;
  els.dialogContent.innerHTML = `
    <div class="dialog-body">
      <p class="panel-kicker">${regionLabels[item.region]} · ${item.date || ""}</p>
      <h2>${item.title}</h2>
      <p>${item.detail || item.meta || ""}</p>
      <div class="tag-row">
        <span class="tag">${statusLabels[currentStatus(item)]}</span>
        ${item.category ? `<span class="tag">${item.category === "hotel" ? "住宿" : "交通"}</span>` : ""}
      </div>
      ${item.link ? `<p><a class="small-link" href="${item.link}" target="_blank" rel="noreferrer">開啟地圖</a></p>` : ""}
    </div>
  `;
  els.dialog.showModal();
}

function openManual(index) {
  const manual = manuals[index];
  els.dialogContent.innerHTML = `
    <div class="dialog-body">
      <p class="panel-kicker">原始手冊</p>
      <h2>${manual.title}</h2>
      <img src="${manual.src}" alt="${manual.title}" />
    </div>
  `;
  els.dialog.showModal();
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

  document.addEventListener("click", (event) => {
    const regionButton = event.target.closest("[data-region]");
    if (regionButton) {
      filters.region = regionButton.dataset.region;
      renderAll();
      return;
    }

    const viewButton = event.target.closest("[data-view]");
    if (viewButton) {
      filters.view = viewButton.dataset.view;
      document.querySelectorAll("[data-view]").forEach((button) => button.classList.toggle("active", button === viewButton));
      renderItinerary();
      return;
    }

    const statusButton = event.target.closest("[data-status-for]");
    if (statusButton) {
      event.stopPropagation();
      cycleStatus(statusButton.dataset.statusFor);
      return;
    }

    const detail = event.target.closest("[data-detail-kind]");
    if (detail && !event.target.closest("button")) {
      openDetail(detail.dataset.detailKind, detail.dataset.id);
      return;
    }

    const manual = event.target.closest("[data-manual]");
    if (manual) {
      openManual(Number(manual.dataset.manual));
      return;
    }

    const jump = event.target.closest("[data-jump]");
    if (jump) {
      document.querySelector(`#${jump.dataset.jump}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    state = { statuses: {}, tasks: {} };
    saveState();
    renderAll();
  });
}

renderRoute();
renderManuals();
bindEvents();
renderAll();
