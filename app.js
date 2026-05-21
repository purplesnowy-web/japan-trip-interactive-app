const STORAGE_KEY = "jp-island-trip-2026-v2-state";

const mapUrl = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
const directionsUrl = (points) => {
  const named = points.map((point) => point.query || point.label);
  const [origin, ...rest] = named;
  const destination = rest.pop() || origin;
  const waypoints = rest.join("|");
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}${waypoints ? `&waypoints=${encodeURIComponent(waypoints)}` : ""}`;
};

const route = [
  { city: "台北", note: "6/10 出發", icon: "TPE" },
  { city: "札幌", note: "6/10-6/16", icon: "SPK" },
  { city: "洞爺湖", note: "6/14-6/16", icon: "TOY" },
  { city: "東京", note: "6/17-6/22", icon: "TYO" },
  { city: "宮古島", note: "6/22-6/27", icon: "MMY" },
  { city: "台北", note: "6/27 返程", icon: "TPE" },
];

const itinerary = [
  { id: "d0610", date: "6/10", weekday: "三", region: "hokkaido", type: "main", icon: "飛", art: "plane", title: "台北到札幌", detail: "入住札幌格蘭貝爾飯店狸小路，晚上 YOSAKOI 索朗祭，大通公園周邊慢逛。", status: "confirmed", links: { map: mapUrl("Odori Park Sapporo"), site: "https://www.yosakoi-soran.jp/" } },
  { id: "d0611", date: "6/11", weekday: "四", region: "hokkaido", type: "main", icon: "倉", art: "canal", title: "小樽運河慢散步", detail: "北運河、舊倉庫群、城市散步，重點放在節奏與照片。", status: "confirmed", links: { map: mapUrl("Otaru Canal") } },
  { id: "d0612", date: "6/12", weekday: "五", region: "hokkaido", type: "branch", icon: "公", art: "park", title: "莫埃來沼公園", detail: "莫埃來沼公園與城市留白，午後可視體力回市區補咖啡。", status: "confirmed", links: { map: mapUrl("Moerenuma Park"), site: "https://moerenumapark.jp/" } },
  { id: "d0613", date: "6/13", weekday: "六", region: "hokkaido", type: "shop", icon: "咖", art: "coffee", title: "狸小路補給與咖啡散步", detail: "さっぽろ石ころマーケット、札幌咖啡散步與市區補給。", status: "confirmed", links: { map: mapUrl("Sapporo TV Tower"), site: "https://www.1456m.com/" } },
  { id: "d0614", date: "6/14", weekday: "日", region: "hokkaido", type: "transport", icon: "車", art: "car", title: "札幌前往洞爺湖", detail: "11:00 ORIX 取車，KSS 小型車，前往 Cocoa Resort 洞爺湖住宿與婚禮主線。", status: "pending", links: { map: mapUrl("Cocoa Resort Toyako"), site: "https://cocoaresort.jp/" } },
  { id: "d0615", date: "6/15", weekday: "一", region: "hokkaido", type: "main", icon: "湖", art: "lake", title: "洞爺湖婚禮主線", detail: "Cocoa Resort 與婚禮主線，湖邊留白，不排過密，保留拍照與休息。", status: "confirmed", links: { map: mapUrl("Cocoa Resort Toyako"), site: "https://cocoaresort.jp/" } },
  { id: "d0616", date: "6/16", weekday: "二", region: "hokkaido", type: "transport", icon: "還", art: "car", title: "洞爺湖回札幌", detail: "18:00 還車，入住船舶花園薄野飯店，可接札幌祭或中島公園屋台。", status: "confirmed", links: { map: mapUrl("Ship Garden Susukino Hotel Sapporo") } },
  { id: "d0617", date: "6/17", weekday: "三", region: "tokyo", type: "transport", icon: "飛", art: "plane", title: "札幌到東京", detail: "ANA NH62 CTS → HND，入住上野寶石飯店，阿美橫丁輕量散步。", status: "confirmed", links: { map: mapUrl("Hotel Sardonyx Ueno"), site: "https://hotel-sardonyx.jp/ueno/" } },
  { id: "d0618", date: "6/18", weekday: "四", region: "tokyo", type: "main", icon: "城", art: "castle", title: "皇居、神保町、東京站", detail: "皇居東御苑解謎、三省堂活動、東京車站與京橋支線，原宿或表參道視體力決定。", status: "confirmed", links: { map: mapUrl("皇居東御苑"), site: "https://www.kunaicho.go.jp/jp/visit/event/nazotoki/" } },
  { id: "d0619", date: "6/19", weekday: "五", region: "tokyo", type: "shop", icon: "晶", art: "mineral", title: "御徒町礦物巡禮", detail: "Jewelry Marche 巡禮、クリスタル・ワールド、ニルヴァーナストーン。", status: "confirmed", links: { map: mapUrl("御徒町 ジュエリーマルシェ"), site: "https://www.jewelry-marche.com/" } },
  { id: "d0620", date: "6/20", weekday: "六", region: "tokyo", type: "shop", icon: "展", art: "mineral", title: "ミネラルマーケット2026", detail: "大田區產業プラザ PiO 固定主線，優先度最高。", status: "confirmed", links: { map: mapUrl("大田区産業プラザ PiO"), site: "https://mineralmarket.jp/" } },
  { id: "d0621", date: "6/21", weekday: "日", region: "tokyo", type: "branch", icon: "市", art: "market", title: "日本橋、上野與回場", detail: "Jewelry Marche 回場、OLD NEW MARKET 日本橋、上野髮型名店支線。晚上收車，隔天 04:20 起床。", status: "confirmed", links: { map: mapUrl("OLD NEW MARKET 日本橋"), site: "https://www.oldnewmarket.com/" } },
  { id: "d0622", date: "6/22", weekday: "一", region: "miyako", type: "transport", icon: "飛", art: "plane", title: "東京、沖繩到宮古島", detail: "上野出發，JAL JL903 HND → OKA 07:20-10:00，ANA NH1727 OKA → MMY 14:10-15:05，入住 Hotel Santa Barbara。", status: "confirmed", links: { map: mapUrl("Hotel Santa Barbara Miyakojima Resort"), site: "https://santabarbara-miyakojima.com/" } },
  { id: "d0623", date: "6/23", weekday: "二", region: "miyako", type: "main", icon: "潛", art: "snorkel", title: "東南線順路日", detail: "KKDay 潛水建議上午場，午餐サマー太陽或 A&W，下午宮古神社、市區小店、Blue Seal、MAXVALU，15:30-17:00 Ningin Coffee。", status: "pending", links: { map: mapUrl("Ningin Coffee Miyakojima"), site: "https://www.kkday.com/zh-tw/product/551971" } },
  { id: "d0624", date: "6/24", weekday: "三", region: "miyako", type: "main", icon: "海", art: "sea", title: "北海岸一日", detail: "Kujira Diner 早餐、海中公園、西平安名崎、雪鹽工廠、池間大橋、Gelato Cafe Ninufa、HARRY'S Shrimp Truck、砂山海灘。", status: "pending", links: { map: mapUrl("Sunayama Beach Miyakojima"), sns: "https://www.instagram.com/gelato_cafe_ninufa/" } },
  { id: "d0625", date: "6/25", weekday: "四", region: "miyako", type: "main", icon: "橋", art: "bridge", title: "伊良部與 17END 拍照日", detail: "牧山展望台、伊良部大橋、海之驛、Blue Turtle 午餐、1 LAB Hello VACAY、國仲商店、なかゆくい商店、Shinbiji、17END，晚上 HULAR。", status: "pending", links: { map: mapUrl("17END Miyakojima") } },
  { id: "d0626", date: "6/26", weekday: "五", region: "miyako", type: "branch", icon: "補", art: "shopping", title: "自由日、補貨與伴手禮", detail: "Kujira Diner 早餐，白天自由安排與補貨，PAINAGAMA BLUE BOOTH、Niima Soba、久松製麵所、SUNDAYS、小さな幸せ Sakuri、MAXVALU、藥妝與店吉商港。", status: "pending", links: { map: mapUrl("MAXVALU Miyako Minami"), sns: "https://www.instagram.com/painagama_bluebooth/" } },
  { id: "d0627", date: "6/27", weekday: "六", region: "miyako", type: "transport", icon: "返", art: "luggage", title: "宮古島返回台北", detail: "11:00 前往下地島機場，星宇 JX891 SHI → TPE 14:00-14:10，整理行李、保護易碎購物、分裝伴手禮。", status: "confirmed", links: { map: mapUrl("Shimojishima Airport") } },
];

const bookings = [
  { id: "h1", category: "hotel", region: "hokkaido", icon: "宿", date: "6/10-6/14", title: "札幌格蘭貝爾飯店狸小路", meta: "Granbell Hotel Tanuki, Sapporo · 已訂 · NT$15,784.89", status: "confirmed", links: { map: mapUrl("Granbell Hotel Tanuki Sapporo"), site: "https://granbellhotel.jp/sapporo-tanukikoji/" } },
  { id: "h2", category: "hotel", region: "hokkaido", icon: "宿", date: "6/14-6/16", title: "Cocoa Resort 洞爺湖", meta: "洞爺湖住宿 · 已確認 · 費用待補", status: "confirmed", links: { map: mapUrl("Cocoa Resort Toyako"), site: "https://cocoaresort.jp/" } },
  { id: "h3", category: "hotel", region: "hokkaido", icon: "宿", date: "6/16-6/17", title: "船舶花園薄野飯店", meta: "已訂 · NT$4,252", status: "confirmed", links: { map: mapUrl("Ship Garden Susukino Hotel Sapporo") } },
  { id: "h4", category: "hotel", region: "tokyo", icon: "宿", date: "6/17-6/22", title: "上野寶石飯店", meta: "Hotel Sardonyx Ueno · 已訂 · NT$16,344", status: "confirmed", links: { map: mapUrl("Hotel Sardonyx Ueno"), site: "https://hotel-sardonyx.jp/ueno/" } },
  { id: "h5", category: "hotel", region: "miyako", icon: "宿", date: "6/22-6/27", title: "Hotel Santa Barbara Miyakojima Resort", meta: "公司行程住宿 · 已確認 · 費用待補", status: "confirmed", links: { map: mapUrl("Hotel Santa Barbara Miyakojima Resort"), site: "https://santabarbara-miyakojima.com/" } },
  { id: "t1", category: "transport", region: "hokkaido", icon: "飛", date: "6/10", title: "台北 → 札幌", meta: "長榮航空 · 已確認", status: "confirmed" },
  { id: "t2", category: "transport", region: "hokkaido", icon: "車", date: "6/14-6/16", title: "ORIX 札幌租車 KSS 小型車", meta: "預估 ¥26,400", status: "pending", links: { map: mapUrl("ORIX Rent a Car Sapporo Station"), site: "https://car.orix.co.jp/" } },
  { id: "t3", category: "transport", region: "tokyo", icon: "飛", date: "6/17", title: "新千歲 CTS → 羽田 HND", meta: "ANA NH62 · 已確認", status: "confirmed" },
  { id: "t4", category: "transport", region: "miyako", icon: "飛", date: "6/22", title: "羽田 HND → 那霸 OKA", meta: "JAL JL903 · 07:20-10:00 · 2 人 TWD 7,494", status: "confirmed" },
  { id: "t5", category: "transport", region: "miyako", icon: "飛", date: "6/22", title: "那霸 OKA → 宮古 MMY", meta: "ANA NH1727 · 14:10-15:05 · 2 人 TWD 4,358", status: "confirmed" },
  { id: "t6", category: "transport", region: "miyako", icon: "飛", date: "6/27", title: "下地島 SHI → 台北 TPE", meta: "星宇 JX891 · 14:00-14:10 · 公司行程", status: "confirmed" },
];

const places = [
  { id: "p01", region: "hokkaido", type: "activity", title: "大通公園 YOSAKOI 索朗祭", detail: "6/10 晚上主線，札幌抵達後暖身。", tags: ["祭典", "札幌"], links: { map: mapUrl("Odori Park Sapporo"), site: "https://www.yosakoi-soran.jp/" } },
  { id: "p02", region: "hokkaido", type: "activity", title: "小樽運河", detail: "6/11 小樽慢散步主線。", tags: ["散步", "小樽"], links: { map: mapUrl("Otaru Canal") } },
  { id: "p03", region: "hokkaido", type: "activity", title: "莫埃來沼公園", detail: "6/12 城市留白與公園線。", tags: ["公園", "札幌"], links: { map: mapUrl("Moerenuma Park"), site: "https://moerenumapark.jp/" } },
  { id: "p04", region: "hokkaido", type: "activity", title: "さっぽろ石ころマーケット", detail: "6/13 礦物活動，札幌電視塔 2F。", tags: ["礦物", "活動"], links: { map: mapUrl("Sapporo TV Tower"), site: "https://www.1456m.com/" } },
  { id: "p04b", region: "hokkaido", type: "shop", title: "Cocoa Resort 洞爺湖", detail: "6/14-6/16 洞爺湖住宿，婚禮主線與湖邊留白的基地。", tags: ["住宿", "洞爺湖"], links: { map: mapUrl("Cocoa Resort Toyako"), site: "https://cocoaresort.jp/" } },
  { id: "p05", region: "hokkaido", type: "shop", title: "PHILOCOFFEA 札幌", detail: "粕谷哲 4:6 沖煮法，北海道邊線。", tags: ["咖啡", "札幌"], links: { map: mapUrl("PHILOCOFFEA Sapporo") } },
  { id: "p06", region: "hokkaido", type: "shop", title: "Seed Coffee Roasters", detail: "札幌龜頭，精品咖啡。", tags: ["咖啡", "札幌"], links: { map: mapUrl("Seed Coffee Roasters Sapporo") } },
  { id: "p07", region: "hokkaido", type: "shop", title: "Cafe Morihiko 森彦", detail: "古民家咖啡，札幌咖啡文化地標。", tags: ["咖啡", "地標"], links: { map: mapUrl("Cafe Morihiko Sapporo") } },
  { id: "p08", region: "hokkaido", type: "shop", title: "Baristart Coffee", detail: "北海道牛奶拿鐵代表。", tags: ["咖啡", "拿鐵"], links: { map: mapUrl("Baristart Coffee Sapporo") } },
  { id: "p09", region: "tokyo", type: "activity", title: "皇居東御苑實境解謎", detail: "6/18 主線活動。", tags: ["解謎", "皇居"], links: { map: mapUrl("皇居東御苑"), site: "https://www.kunaicho.go.jp/jp/visit/event/nazotoki/" } },
  { id: "p10", region: "tokyo", type: "activity", title: "ミネルホリック！Vol.7", detail: "三省堂書店 神田神保町本店活動。", tags: ["活動", "神保町"], links: { map: mapUrl("三省堂書店 神田神保町本店"), site: "https://jinbocho.books-sanseido.co.jp/events/10221" } },
  { id: "p11", region: "tokyo", type: "shop", title: "Jewelry Marche", detail: "6/19、6/21 御徒町礦物巡禮與回場。", tags: ["礦物", "御徒町"], links: { map: mapUrl("御徒町 ジュエリーマルシェ"), site: "https://www.jewelry-marche.com/" } },
  { id: "p12", region: "tokyo", type: "shop", title: "クリスタル・ワールド御徒町店", detail: "晶體完整度優先，原石、結晶、化石、隕石。", tags: ["礦物", "御徒町"], links: { map: mapUrl("Crystal World Okachimachi") } },
  { id: "p13", region: "tokyo", type: "shop", title: "ニルヴァーナストーン御徒町", detail: "裸石與原石量感補強。", tags: ["礦物", "御徒町"], links: { map: mapUrl("Nirvana Stone Okachimachi") } },
  { id: "p14", region: "tokyo", type: "shop", title: "ミネラルマーケット2026", detail: "6/20 大田區產業プラザ PiO，東京段固定主線。", tags: ["礦物", "蒲田"], links: { map: mapUrl("大田区産業プラザ PiO"), site: "https://mineralmarket.jp/" } },
  { id: "p15", region: "tokyo", type: "activity", title: "OLD NEW MARKET 日本橋", detail: "6/21 日本橋散步與市集。", tags: ["市集", "日本橋"], links: { map: mapUrl("OLD NEW MARKET 日本橋"), site: "https://www.oldnewmarket.com/" } },
  { id: "p16", region: "tokyo", type: "branch", title: "原宿／表參道 Cat Street", detail: "6/18 視體力彈性支線。", tags: ["散步", "支線"], links: { map: mapUrl("Cat Street Harajuku") } },
  { id: "p17", region: "tokyo", type: "branch", title: "コスモスペース 原宿", detail: "石的專門店，東京副指南支線。", tags: ["礦物", "原宿"], links: { map: mapUrl("コスモスペース 原宿") } },
  { id: "p18", region: "tokyo", type: "branch", title: "ウサギノネドコ東京店", detail: "自然造形美與礦物美學支線。", tags: ["美學", "礦物"], links: { map: mapUrl("ウサギノネドコ 東京店") } },
  { id: "m01", region: "miyako", type: "shop", title: "Hotel Santa Barbara Miyakojima Resort", detail: "6/22 抵達後入住，飯店接駁需先提供入住日、預約姓名、航班資訊。", tags: ["住宿", "接駁"], links: { map: mapUrl("Hotel Santa Barbara Miyakojima Resort"), site: "https://santabarbara-miyakojima.com/" } },
  { id: "m02", region: "miyako", type: "activity", title: "奧那霸前濱海灘", detail: "6/22 16:30-18:30 看海與拍照。", tags: ["海灘", "拍照"], links: { map: mapUrl("Yonaha Maehama Beach Miyakojima") } },
  { id: "m03", region: "miyako", type: "shop", title: "Meshival Paina Terrace", detail: "6/22 晚餐，約 ¥2,000-¥3,000。", tags: ["晚餐"], links: { map: mapUrl("Meshival Paina Terrace Miyakojima") } },
  { id: "m04", region: "miyako", type: "activity", title: "KKDay 潛水", detail: "6/23 建議上午場，清水與海況優先。", tags: ["潛水"], links: { site: "https://www.kkday.com/zh-tw/product/551971" } },
  { id: "m05", region: "miyako", type: "shop", title: "サマー太陽", detail: "6/23 午餐優先，雞尾酒與在地餐點。", tags: ["午餐"], links: { map: mapUrl("サマー太陽 宮古島"), sns: "https://www.instagram.com/summertaiyo/" } },
  { id: "m06", region: "miyako", type: "shop", title: "Ningin Coffee", detail: "6/23 15:30-17:00，ニンギン咖啡。", tags: ["咖啡"], links: { map: mapUrl("Ningin Coffee Miyakojima"), sns: "https://www.instagram.com/ningincoffee__ninginkukan/" } },
  { id: "m07", region: "miyako", type: "shop", title: "宮古島とんかつ琉宮", detail: "6/23 備案餐廳，6/26 SNS 加分檔案。", tags: ["晚餐", "備案"], links: { map: mapUrl("宮古島 とんかつ 琉宮"), sns: "https://www.instagram.com/miyakogyu_tamashiro/" } },
  { id: "m08", region: "miyako", type: "shop", title: "宮古牛焼肉玉城", detail: "6/23 備案或 6/26 燒肉檔案。", tags: ["燒肉"], links: { map: mapUrl("宮古牛焼肉 玉城") } },
  { id: "m09", region: "miyako", type: "shop", title: "Kujira Diner", detail: "6/24、6/26 早餐，沖繩飯糰。", tags: ["早餐"], links: { map: mapUrl("Kujira Diner Miyakojima"), sns: "https://www.instagram.com/onigiri_kujira/" } },
  { id: "m10", region: "miyako", type: "activity", title: "宮古島海中公園", detail: "6/24 北海岸主線。", tags: ["海景"], links: { map: mapUrl("宮古島海中公園") } },
  { id: "m11", region: "miyako", type: "activity", title: "西平安名崎", detail: "6/24 北海岸拍照點。", tags: ["拍照"], links: { map: mapUrl("西平安名崎 宮古島") } },
  { id: "m12", region: "miyako", type: "shop", title: "雪鹽工廠", detail: "6/24 補給與伴手禮。", tags: ["伴手禮"], links: { map: mapUrl("雪塩ミュージアム 宮古島") } },
  { id: "m13", region: "miyako", type: "shop", title: "Gelato Cafe Ninufa", detail: "池間島支線，海邊 gelato，海美味道組合。", tags: ["甜點"], links: { map: mapUrl("Gelato Cafe Ninufa Miyakojima"), sns: "https://www.instagram.com/gelato_cafe_ninufa/" } },
  { id: "m14", region: "miyako", type: "shop", title: "HARRY'S Shrimp Truck", detail: "6/24 北海岸餐車。", tags: ["餐車"], links: { map: mapUrl("HARRY'S Shrimp Truck Miyakojima") } },
  { id: "m15", region: "miyako", type: "activity", title: "砂山海灘", detail: "6/24 北海岸收尾拍照點，退潮時間更適合。", tags: ["海灘"], links: { map: mapUrl("Sunayama Beach Miyakojima") } },
  { id: "m16", region: "miyako", type: "activity", title: "牧山展望台與伊良部大橋", detail: "6/25 伊良部拍照日主線。", tags: ["拍照", "橋"], links: { map: mapUrl("牧山展望台 伊良部大橋") } },
  { id: "m17", region: "miyako", type: "shop", title: "Blue Turtle", detail: "6/25 午餐，海景第一排。", tags: ["午餐", "海景"], links: { map: mapUrl("Blue Turtle Miyakojima") } },
  { id: "m18", region: "miyako", type: "shop", title: "Kuninaka Shoten 國仲商店", detail: "6/25 補貨點。", tags: ["補貨"], links: { map: mapUrl("Kuninaka Shoten Miyakojima") } },
  { id: "m19", region: "miyako", type: "shop", title: "なかゆくい商店", detail: "排隊看狀況，宮古島小吃補給。", tags: ["小吃"], links: { map: mapUrl("なかゆくい商店 宮古島") } },
  { id: "m20", region: "miyako", type: "activity", title: "17END", detail: "6/25 拍照日重點，自洋裝、墨鏡、草帽。下午較慢。", tags: ["拍照", "海"], links: { map: mapUrl("17END Miyakojima") } },
  { id: "m21", region: "miyako", type: "shop", title: "PAINAGAMA BLUE BOOTH", detail: "6/26 SNS 加分檔案，海景熱帶氣氛冰。", tags: ["甜點", "SNS"], links: { map: mapUrl("PAINAGAMA BLUE BOOTH"), sns: "https://www.instagram.com/painagama_bluebooth/" } },
  { id: "m22", region: "miyako", type: "shop", title: "Niima Soba にいまそば", detail: "6/26 早上先電話確認。", tags: ["麵", "午餐"], links: { map: mapUrl("にいまそば 宮古島") } },
  { id: "m23", region: "miyako", type: "shop", title: "久松製麵所", detail: "6/26 可做製麵所檔案。", tags: ["麵"], links: { map: mapUrl("久松製麺所 宮古島"), sns: "https://www.instagram.com/hisamatsuseimen_jinkuya/" } },
  { id: "m24", region: "miyako", type: "shop", title: "SUNDAYS Miyakojima", detail: "6/26 漢堡自拍檔案。", tags: ["漢堡", "SNS"], links: { map: mapUrl("SUNDAYS Miyakojima") } },
  { id: "m25", region: "miyako", type: "shop", title: "小さな幸せ Sakuri", detail: "6/26 小可愛甜點打卡。", tags: ["甜點"], links: { map: mapUrl("小さな幸せ Sakuri 宮古島") } },
  { id: "m26", region: "miyako", type: "shop", title: "MAXVALU 宮古南店", detail: "6/26 補貨清單主力。", tags: ["補貨"], links: { map: mapUrl("MAXVALU Miyako Minami") } },
  { id: "m27", region: "miyako", type: "shop", title: "Drugstore Mori 宮古島店", detail: "藥妝補貨。", tags: ["藥妝"], links: { map: mapUrl("ドラッグストアモリ 宮古島店") } },
  { id: "m28", region: "miyako", type: "shop", title: "Drugstore Mori 久貝店", detail: "藥妝補貨備案。", tags: ["藥妝"], links: { map: mapUrl("ドラッグストアモリ 久貝店") } },
  { id: "m29", region: "miyako", type: "shop", title: "店吉商港 宮古島店", detail: "6/26 補貨點。", tags: ["補貨"], links: { map: mapUrl("ドン・キホーテ 宮古島店") } },
];

const tasks = [
  { id: "task-early", region: "tokyo", type: "task", title: "6/21 晚上請收車，6/22 04:20 起床", detail: "東京到宮古島轉機日很早，前一晚不要排太滿。" },
  { id: "task-hotel-shuttle", region: "miyako", type: "task", title: "提供 Hotel Santa Barbara 接駁資料", detail: "需提供入住日、預約姓名、航班資訊。" },
  { id: "task-0622-meal", region: "miyako", type: "task", title: "6/22 抵達宮古空港後聯絡飯店公司櫃台", detail: "確認接駁、入住流程與晚餐節奏。" },
  { id: "task-dress", region: "miyako", type: "task", title: "宮古島 Dress code", detail: "多巴胺色系，白色或黃色；Day 4 拍照日建議白洋裝、墨鏡、草帽。" },
  { id: "task-waterproof", region: "miyako", type: "task", title: "裝備確認", detail: "浮潛鞋、防曬、防水手機袋、乾濕分離袋、清水與海邊走路準備。" },
  { id: "task-souvenir", region: "miyako", type: "task", title: "6/27 行李與伴手禮保護", detail: "整理行李、保護易碎購物、分裝伴手禮。" },
];

const dayMaps = {
  d0610: {
    area: "札幌中心",
    note: "狸小路住宿、大通公園祭典在同一個市中心活動圈。",
    points: [
      { label: "Granbell Hotel", query: "Granbell Hotel Tanuki Sapporo", x: 34, y: 66, kind: "hotel" },
      { label: "大通公園", query: "Odori Park Sapporo", x: 50, y: 45, kind: "activity" },
      { label: "YOSAKOI", query: "YOSAKOI Soran Festival Odori Park Sapporo", x: 62, y: 38, kind: "activity" },
    ],
  },
  d0611: {
    area: "小樽運河",
    note: "以運河與舊倉庫群為核心，適合步行慢逛。",
    points: [
      { label: "小樽站", query: "Otaru Station", x: 28, y: 62, kind: "transport" },
      { label: "小樽運河", query: "Otaru Canal", x: 58, y: 46, kind: "activity" },
      { label: "舊倉庫群", query: "Otaru Canal Warehouse", x: 70, y: 36, kind: "activity" },
    ],
  },
  d0612: {
    area: "札幌東北側",
    note: "莫埃來沼公園離市中心較遠，建議把它當成單一主線。",
    points: [
      { label: "札幌中心", query: "Sapporo Station", x: 28, y: 70, kind: "transport" },
      { label: "莫埃來沼公園", query: "Moerenuma Park", x: 70, y: 30, kind: "activity" },
    ],
  },
  d0613: {
    area: "札幌市中心",
    note: "電視塔、狸小路、咖啡點都集中，適合邊逛邊補給。",
    points: [
      { label: "札幌電視塔", query: "Sapporo TV Tower", x: 62, y: 40, kind: "activity" },
      { label: "石ころマーケット", query: "さっぽろ石ころマーケット", x: 66, y: 36, kind: "shop" },
      { label: "狸小路", query: "Tanukikoji Shopping Street Sapporo", x: 42, y: 62, kind: "shop" },
      { label: "森彦", query: "Cafe Morihiko Sapporo", x: 25, y: 45, kind: "coffee" },
    ],
  },
  d0614: {
    area: "札幌到洞爺湖",
    note: "這天是移動日，取車後往洞爺湖住宿。",
    points: [
      { label: "ORIX 札幌", query: "ORIX Rent a Car Sapporo Station", x: 22, y: 42, kind: "transport" },
      { label: "洞爺湖", query: "Lake Toya", x: 64, y: 50, kind: "activity" },
      { label: "Cocoa Resort", query: "Cocoa Resort Toyako", x: 75, y: 58, kind: "hotel" },
    ],
  },
  d0615: {
    area: "洞爺湖",
    note: "住宿與湖邊活動集中，保留婚禮與休息節奏。",
    points: [
      { label: "Cocoa Resort", query: "Cocoa Resort Toyako", x: 44, y: 62, kind: "hotel" },
      { label: "洞爺湖畔", query: "Lake Toya", x: 58, y: 38, kind: "activity" },
    ],
  },
  d0616: {
    area: "洞爺湖到札幌",
    note: "回札幌還車後，再接薄野住宿與中島公園支線。",
    points: [
      { label: "Cocoa Resort", query: "Cocoa Resort Toyako", x: 25, y: 58, kind: "hotel" },
      { label: "ORIX 還車", query: "ORIX Rent a Car Sapporo Station", x: 66, y: 42, kind: "transport" },
      { label: "薄野飯店", query: "Ship Garden Susukino Hotel Sapporo", x: 76, y: 58, kind: "hotel" },
    ],
  },
  d0617: {
    area: "上野",
    note: "抵達東京後以飯店與阿美橫丁輕量散步為主。",
    points: [
      { label: "HND", query: "Haneda Airport", x: 24, y: 72, kind: "transport" },
      { label: "上野寶石飯店", query: "Hotel Sardonyx Ueno", x: 65, y: 40, kind: "hotel" },
      { label: "阿美橫丁", query: "Ameya-Yokocho Ueno", x: 74, y: 48, kind: "activity" },
    ],
  },
  d0618: {
    area: "東京中心到西側",
    note: "皇居、東京站、神保町集中；原宿表參道是彈性延伸。",
    points: [
      { label: "皇居東御苑", query: "皇居東御苑", x: 54, y: 42, kind: "activity" },
      { label: "神保町", query: "三省堂書店 神田神保町本店", x: 48, y: 28, kind: "activity" },
      { label: "東京站", query: "Tokyo Station", x: 64, y: 52, kind: "transport" },
      { label: "Cat Street", query: "Cat Street Harajuku", x: 24, y: 62, kind: "branch" },
    ],
  },
  d0619: {
    area: "御徒町",
    note: "礦物店彼此距離近，適合集中巡禮。",
    points: [
      { label: "Jewelry Marche", query: "御徒町 ジュエリーマルシェ", x: 48, y: 44, kind: "mineral" },
      { label: "Crystal World", query: "Crystal World Okachimachi", x: 62, y: 38, kind: "mineral" },
      { label: "Nirvana Stone", query: "Nirvana Stone Okachimachi", x: 58, y: 58, kind: "mineral" },
    ],
  },
  d0620: {
    area: "蒲田 PiO",
    note: "ミネラルマーケット是固定主線，這天不要分散太多。",
    points: [
      { label: "上野飯店", query: "Hotel Sardonyx Ueno", x: 35, y: 34, kind: "hotel" },
      { label: "大田區產業 PiO", query: "大田区産業プラザ PiO", x: 66, y: 65, kind: "mineral" },
    ],
  },
  d0621: {
    area: "御徒町、日本橋、上野",
    note: "回場與市集之間距離可控，晚上要提早收。",
    points: [
      { label: "御徒町", query: "Okachimachi Station", x: 40, y: 34, kind: "mineral" },
      { label: "日本橋", query: "OLD NEW MARKET 日本橋", x: 62, y: 58, kind: "market" },
      { label: "上野飯店", query: "Hotel Sardonyx Ueno", x: 36, y: 48, kind: "hotel" },
    ],
  },
  d0622: {
    area: "東京、沖繩、宮古島",
    note: "這天是長距離移動日，重點是航班銜接與飯店接駁。",
    points: [
      { label: "HND", query: "Haneda Airport", x: 22, y: 36, kind: "transport" },
      { label: "OKA", query: "Naha Airport", x: 52, y: 55, kind: "transport" },
      { label: "MMY", query: "Miyako Airport", x: 76, y: 62, kind: "transport" },
      { label: "Santa Barbara", query: "Hotel Santa Barbara Miyakojima Resort", x: 84, y: 46, kind: "hotel" },
    ],
  },
  d0623: {
    area: "宮古島東南線",
    note: "潛水、市區小店與咖啡集中在南側與市區。",
    points: [
      { label: "KKDay 潛水", query: "Miyakojima diving", x: 32, y: 58, kind: "activity" },
      { label: "サマー太陽", query: "サマー太陽 宮古島", x: 50, y: 48, kind: "food" },
      { label: "Ningin Coffee", query: "Ningin Coffee Miyakojima", x: 62, y: 38, kind: "coffee" },
      { label: "MAXVALU", query: "MAXVALU Miyako Minami", x: 70, y: 62, kind: "shop" },
    ],
  },
  d0624: {
    area: "宮古島北海岸",
    note: "北海岸一條線順走，海景與甜點放同一天。",
    points: [
      { label: "Kujira Diner", query: "Kujira Diner Miyakojima", x: 35, y: 65, kind: "food" },
      { label: "海中公園", query: "宮古島海中公園", x: 52, y: 36, kind: "activity" },
      { label: "西平安名崎", query: "西平安名崎 宮古島", x: 66, y: 24, kind: "activity" },
      { label: "Ninufa", query: "Gelato Cafe Ninufa Miyakojima", x: 78, y: 44, kind: "food" },
      { label: "砂山海灘", query: "Sunayama Beach Miyakojima", x: 48, y: 54, kind: "beach" },
    ],
  },
  d0625: {
    area: "伊良部、下地島",
    note: "橋、海景午餐、17END 是一組拍照動線。",
    points: [
      { label: "牧山展望台", query: "牧山展望台 伊良部大橋", x: 36, y: 45, kind: "activity" },
      { label: "Blue Turtle", query: "Blue Turtle Miyakojima", x: 54, y: 56, kind: "food" },
      { label: "國仲商店", query: "Kuninaka Shoten Miyakojima", x: 62, y: 42, kind: "shop" },
      { label: "17END", query: "17END Miyakojima", x: 78, y: 24, kind: "beach" },
    ],
  },
  d0626: {
    area: "宮古島市區補貨",
    note: "自由日以補貨、甜點、餐廳與藥妝為主。",
    points: [
      { label: "Kujira Diner", query: "Kujira Diner Miyakojima", x: 34, y: 42, kind: "food" },
      { label: "Painagama", query: "PAINAGAMA BLUE BOOTH", x: 44, y: 58, kind: "food" },
      { label: "Niima Soba", query: "にいまそば 宮古島", x: 58, y: 44, kind: "food" },
      { label: "MAXVALU", query: "MAXVALU Miyako Minami", x: 72, y: 62, kind: "shop" },
      { label: "藥妝", query: "ドラッグストアモリ 宮古島店", x: 80, y: 48, kind: "shop" },
    ],
  },
  d0627: {
    area: "下地島機場",
    note: "最後一天以退房、整理與前往機場為主。",
    points: [
      { label: "Santa Barbara", query: "Hotel Santa Barbara Miyakojima Resort", x: 35, y: 60, kind: "hotel" },
      { label: "下地島機場", query: "Shimojishima Airport", x: 74, y: 36, kind: "transport" },
    ],
  },
};

const manuals = [
  { title: "01 Master Overview", src: "assets/page-1.jpg" },
  { title: "02 Hokkaido", src: "assets/page-2.jpg" },
  { title: "03 Tokyo Main", src: "assets/page-3.jpg" },
  { title: "04 Tokyo Side Guide", src: "assets/page-4.jpg" },
  { title: "05 Miyakojima Day 1-2", src: "assets/page-5.jpg" },
  { title: "06 Miyakojima Day 3-4", src: "assets/page-6.jpg" },
  { title: "07 Miyakojima Day 5-6", src: "assets/page-7.jpg" },
];

const statusLabels = {
  confirmed: "已確認",
  done: "已完成",
  pending: "待確認",
  todo: "待處理",
};

const regionLabels = {
  all: "全部",
  hokkaido: "北海道",
  tokyo: "東京",
  miyako: "宮古島",
};

const typeLabels = {
  main: "主線",
  branch: "支線",
  hotel: "住宿",
  transport: "交通",
  shop: "地點餐廳",
  activity: "活動",
  task: "待辦",
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
  todayPanel: document.querySelector("#todayPanel"),
  designNotes: document.querySelector("#designNotes"),
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
  const links = item.links ? Object.values(item.links).join(" ") : "";
  return normalize([item.date, item.weekday, item.title, item.detail, item.meta, item.region, item.type, links, ...(item.tags || [])].join(" "));
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

function renderLinkButtons(links = {}) {
  const specs = [
    ["map", "Google Maps"],
    ["site", "官網"],
    ["sns", "SNS"],
  ];
  return specs
    .filter(([key]) => links[key])
    .map(([key, label]) => `<a class="small-link ${key}" href="${links[key]}" target="_blank" rel="noreferrer">${label}</a>`)
    .join("");
}

function renderIllustration(kind = "spark") {
  const drawings = {
    mineral: `
      <svg viewBox="0 0 120 96" aria-hidden="true">
        <path class="wash cyan" d="M22 72 39 28l18 44Z" />
        <path class="wash pink" d="M48 76 72 18l26 58Z" />
        <path d="M22 72 39 28l18 44ZM48 76 72 18l26 58ZM39 28l9 48M72 18l-5 58M72 18l13 58" />
        <path class="spark" d="M24 18h14M31 11v14M94 23h10M99 18v10" />
      </svg>`,
    coffee: `
      <svg viewBox="0 0 120 96" aria-hidden="true">
        <path class="wash pink" d="M24 48h58v12a24 24 0 0 1-24 24H48a24 24 0 0 1-24-24Z" />
        <path d="M24 48h58v12a24 24 0 0 1-24 24H48a24 24 0 0 1-24-24ZM82 54h10c10 0 10 17 0 17h-9" />
        <path class="steam" d="M40 35c-6-7 8-9 1-18M58 34c-6-7 8-9 1-18M72 35c-6-7 8-9 1-18" />
      </svg>`,
    plane: `
      <svg viewBox="0 0 120 96" aria-hidden="true">
        <path class="wash cyan" d="M14 55 104 24 72 63l-3 22-18-16-23 9Z" />
        <path d="M14 55 104 24 72 63l-3 22-18-16-23 9Z M51 69l53-45" />
        <path class="spark" d="M22 25h12M28 19v12M91 70h12M97 64v12" />
      </svg>`,
    lake: `
      <svg viewBox="0 0 120 96" aria-hidden="true">
        <path class="wash cyan" d="M18 70c18-12 30 8 48-4 15-10 25-4 36 4v16H18Z" />
        <path d="M18 70c18-12 30 8 48-4 15-10 25-4 36 4M27 54l18-27 17 27M54 54l20-34 25 43" />
        <path class="spark" d="M20 82c14-6 25 5 39 0 13-5 25-5 41 1" />
      </svg>`,
    sea: `
      <svg viewBox="0 0 120 96" aria-hidden="true">
        <circle class="wash pink" cx="82" cy="28" r="14" />
        <path d="M17 64c11-9 22-9 33 0s22 9 33 0 22-9 33 0M16 78c11-9 22-9 33 0s22 9 33 0 22-9 33 0" />
        <path class="wash cyan" d="M20 66c10-8 21-8 31 0s20 8 30 0 21-8 31 0v23H20Z" />
      </svg>`,
    bridge: `
      <svg viewBox="0 0 120 96" aria-hidden="true">
        <path class="wash cyan" d="M15 70c18-20 72-20 90 0v15H15Z" />
        <path d="M15 70c18-20 72-20 90 0M24 70V55M40 63V46M60 58V36M80 63V46M96 70V55M20 78h90" />
      </svg>`,
    castle: `
      <svg viewBox="0 0 120 96" aria-hidden="true">
        <path class="wash pink" d="M30 76V42l30-22 30 22v34Z" />
        <path d="M30 76V42l30-22 30 22v34ZM42 76V55h36v21M46 40h28M52 30h16M34 52h16M70 52h16" />
      </svg>`,
    market: `
      <svg viewBox="0 0 120 96" aria-hidden="true">
        <path class="wash pink" d="M24 38h72l-8 22H32Z" />
        <path d="M24 38h72l-8 22H32ZM33 60v26M87 60v26M39 30h42M45 30l8-12h20l8 12" />
        <path class="spark" d="M42 72h37" />
      </svg>`,
    snorkel: `
      <svg viewBox="0 0 120 96" aria-hidden="true">
        <path class="wash cyan" d="M24 58c16-14 28 10 44-4s27-6 39 5v28H24Z" />
        <path d="M35 34c8-12 28-12 36 0v18H35ZM71 43h15c10 0 10-21 1-21h-6M31 64c17-10 27 8 43-3 14-9 24-5 35 2" />
      </svg>`,
    car: `
      <svg viewBox="0 0 120 96" aria-hidden="true">
        <path class="wash cyan" d="M22 60h12l12-20h34l13 20h9v20H22Z" />
        <path d="M22 60h12l12-20h34l13 20h9v20H22ZM43 60h41M38 80a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM87 80a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      </svg>`,
    shopping: `
      <svg viewBox="0 0 120 96" aria-hidden="true">
        <path class="wash pink" d="M33 35h54l-5 52H38Z" />
        <path d="M33 35h54l-5 52H38ZM46 35c0-23 28-23 28 0M45 56h30M45 70h20" />
      </svg>`,
    luggage: `
      <svg viewBox="0 0 120 96" aria-hidden="true">
        <path class="wash cyan" d="M38 30h44v58H38Z" />
        <path d="M38 30h44v58H38ZM50 30V18h20v12M48 43h24M48 58h24M48 73h24M32 88h56" />
      </svg>`,
    park: `
      <svg viewBox="0 0 120 96" aria-hidden="true">
        <path class="wash cyan" d="M36 81h52L62 25Z" />
        <path d="M62 25v56M36 81h52L62 25ZM30 83h74" />
        <path class="spark" d="M24 36c10-14 22-14 32 0M68 42c10-14 22-14 32 0" />
      </svg>`,
    canal: `
      <svg viewBox="0 0 120 96" aria-hidden="true">
        <path class="wash cyan" d="M15 68h90v20H15Z" />
        <path d="M18 66h84M22 80c15-7 25 6 40 0s25-7 42 0M28 58V32h22v26M70 58V28h22v30M25 32h28M67 28h28" />
      </svg>`,
  };

  return `<div class="sketch">${drawings[kind] || drawings.market}</div>`;
}

function renderDayMap(day) {
  const map = dayMaps[day.id];
  if (!map) return "";
  const path = map.points.map((point) => `${point.x},${point.y}`).join(" ");
  return `
    <section class="day-map" aria-label="${day.date} ${map.area}活動位置示意">
      <div class="day-map-head">
        <div>
          <strong>${map.area}</strong>
          <span>${map.note}</span>
        </div>
        <a class="small-link map" href="${directionsUrl(map.points)}" target="_blank" rel="noreferrer">開啟當日地圖</a>
      </div>
      <div class="mini-map">
        <svg class="mini-map-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points="${path}" />
        </svg>
        ${map.points.map((point, index) => `
          <a class="map-pin ${point.kind}" href="${mapUrl(point.query || point.label)}" target="_blank" rel="noreferrer" style="left:${point.x}%; top:${point.y}%;" aria-label="開啟 ${point.label} Google Maps">
            <span>${index + 1}</span>
          </a>
        `).join("")}
      </div>
      <ol class="map-list">
        ${map.points.map((point, index) => `
          <li>
            <span class="map-number">${index + 1}</span>
            <a href="${mapUrl(point.query || point.label)}" target="_blank" rel="noreferrer">${point.label}</a>
          </li>
        `).join("")}
      </ol>
    </section>
  `;
}

function renderRoute() {
  els.routeMap.innerHTML = route.map((stop) => `
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
    ["手冊", "7 頁"],
    ["連結", `${places.filter((place) => place.links?.map).length}+ 地圖`],
  ].map(([label, value]) => `<div class="route-stat"><strong>${value}</strong><br><span>${label}</span></div>`).join("");
}

function renderTabs() {
  els.regionTabs.innerHTML = Object.entries(regionLabels).map(([key, label]) => `
    <button class="segment ${filters.region === key ? "active" : ""}" type="button" data-region="${key}">${label}</button>
  `).join("");
}

function renderItinerary() {
  els.itineraryList.className = filters.view === "cards" ? "timeline cards-view" : "timeline";
  els.itineraryList.innerHTML = itinerary.map((day) => {
    const status = currentStatus(day);
    const hidden = matches(day, day.type) ? "" : " hidden";
    return `
      <article class="day-row${hidden}" data-detail-kind="itinerary" data-id="${day.id}">
        <div class="date-block">${day.date}<span>星期${day.weekday}</span></div>
        ${renderIllustration(day.art)}
        <div class="day-main">
          <h3>${day.title}</h3>
          <p>${day.detail}</p>
          <div class="tag-row">
            <span class="tag">${regionLabels[day.region]}</span>
            <span class="tag">${typeLabels[day.type]}</span>
          </div>
          <div class="shop-actions">${renderLinkButtons(day.links)}</div>
          ${renderDayMap(day)}
        </div>
        <button class="status-pill ${status}" type="button" data-status-for="${day.id}">${statusLabels[status]}</button>
      </article>
    `;
  }).join("");
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
          <div class="shop-actions">${renderLinkButtons(booking.links)}</div>
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

function renderPlaces() {
  els.shopGrid.innerHTML = places.map((place, index) => {
    const hidden = matches(place, place.type) ? "" : " hidden";
    const accent = index % 3 === 0 ? "var(--sky)" : index % 3 === 1 ? "var(--sage-soft)" : "var(--rose)";
    return `
      <article class="shop-card${hidden}" style="--accent: ${accent}">
        ${renderIllustration(place.tags.includes("礦物") ? "mineral" : place.tags.includes("咖啡") ? "coffee" : place.tags.includes("海灘") || place.tags.includes("海景") ? "sea" : place.tags.includes("拍照") ? "bridge" : place.type === "activity" ? "market" : "shopping")}
        <div>
          <p class="panel-kicker">${regionLabels[place.region]} · ${typeLabels[place.type]}</p>
          <h3>${place.title}</h3>
          <p>${place.detail}</p>
        </div>
        <div class="tag-row">${place.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
        <div class="shop-actions">${renderLinkButtons(place.links)}</div>
      </article>
    `;
  }).join("");
}

function renderLinks() {
  const linked = places
    .filter((place) => place.links?.site || place.links?.sns)
    .concat(bookings.filter((booking) => booking.links?.site));
  els.linkList.innerHTML = linked.map((item) => {
    const hidden = matches(item, item.type || item.category) ? "" : " hidden";
    return `
      <div class="link-item${hidden}">
        <span><strong>${item.title}</strong><br><small>${regionLabels[item.region]} · ${item.tags?.join("、") || typeLabels[item.category]}</small></span>
        <span class="inline-actions">${renderLinkButtons(item.links)}</span>
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

function tripDate(day) {
  const [, month, date] = day.id.match(/^d(\d{2})(\d{2})$/) || [];
  return new Date(2026, Number(month) - 1, Number(date));
}

function renderTodayPanel() {
  if (!els.todayPanel) return;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstDay = tripDate(itinerary[0]);
  const lastDay = tripDate(itinerary[itinerary.length - 1]);
  let mode = "before";
  let selected = itinerary[0];

  if (today > lastDay) {
    mode = "after";
    selected = itinerary[itinerary.length - 1];
  } else if (today >= firstDay) {
    mode = "during";
    selected = itinerary.find((day) => tripDate(day).getTime() === today.getTime()) || itinerary[0];
  }

  const selectedMap = dayMaps[selected.id];
  const daysDiff = Math.round((tripDate(selected) - today) / 86400000);
  const title =
    mode === "before"
      ? `距離出發還有 ${Math.max(daysDiff, 0)} 天`
      : mode === "after"
        ? "旅程已完成，現在適合整理回憶"
        : "今天的行程焦點";

  els.todayPanel.innerHTML = `
    <div class="today-card">
      ${renderIllustration(selected.art)}
      <div class="today-copy">
        <p class="panel-kicker">${title}</p>
        <h3>${selected.date} 星期${selected.weekday} · ${selected.title}</h3>
        <p>${selected.detail}</p>
        <div class="tag-row">
          <span class="tag">${regionLabels[selected.region]}</span>
          <span class="tag">${typeLabels[selected.type]}</span>
          ${selectedMap ? `<span class="tag">${selectedMap.area}</span>` : ""}
        </div>
        <div class="shop-actions">
          ${renderLinkButtons(selected.links)}
          ${selectedMap ? `<a class="small-link map" href="${directionsUrl(selectedMap.points)}" target="_blank" rel="noreferrer">當日動線</a>` : ""}
          <button class="small-link button-link" type="button" data-jump="itinerary">看完整每日行程</button>
        </div>
      </div>
    </div>
  `;
}

function renderDesignNotes() {
  if (!els.designNotes) return;
  const notes = [
    ["先總覽", "像金融 dashboard 一樣，先看天數、費用、完成率與待辦，降低資訊壓力。"],
    ["再行動", "今日模式只放下一步與當日地圖，避免旅途中被完整資料淹沒。"],
    ["最後查明細", "每日行程、住宿交通、地點連結分區，是把資料庫變成可操作工具。"],
  ];
  els.designNotes.innerHTML = `
    <div class="lesson-list">
      ${notes.map(([title, text], index) => `
        <article class="lesson-card">
          <span class="lesson-number">${index + 1}</span>
          <strong>${title}</strong>
          <p>${text}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderAll() {
  renderTabs();
  renderItinerary();
  renderBookings();
  renderTasks();
  renderPlaces();
  renderLinks();
  renderMetrics();
  renderTodayPanel();
  renderDesignNotes();
  markEmptyPanels();
}

function markEmptyPanels() {
  ["itineraryList", "bookingList", "taskList", "shopGrid", "linkList"].forEach((key) => {
    const el = els[key];
    if (!el) return;
    const existingEmpty = el.querySelector(".empty-state");
    if (existingEmpty) existingEmpty.remove();
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
      ${renderIllustration(item.art || item.icon)}
      <p>${item.detail || item.meta || ""}</p>
      <div class="tag-row">
        <span class="tag">${statusLabels[currentStatus(item)]}</span>
        ${item.category ? `<span class="tag">${typeLabels[item.category]}</span>` : ""}
      </div>
      <div class="shop-actions">${renderLinkButtons(item.links)}</div>
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
      markEmptyPanels();
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
