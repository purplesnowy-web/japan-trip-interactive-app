/*
 * 行程調整集中入口
 *
 * 後續新增或改期，優先只修改這個檔案。
 * app.js 保留穩定的顯示邏輯，圖片庫也不需要跟著重做。
 */
window.TRIP_UPDATES = {
  itinerary: {
    d0614: {
      detail: "退房後直接帶行李前往 ORIX 札幌站前店，11:30 取 SA CLASS 小型車後離開市中心，前往 Cocoa Resort 洞爺湖住宿與婚禮主線。",
      status: "confirmed",
    },
    d0616: {
      detail: "17:00 前回 ORIX 札幌站前店還車，入住船舶花園薄野飯店，可接札幌祭或中島公園屋台。",
      status: "confirmed",
    },
    d0620: {
      title: "ミネラルマーケット2026、南麻布醫美預約",
      detail: "上午集中逛大田區產業プラザ PiO 礦物市場，13:40 左右離場。15:00 女友前往白金ビークリニック本院，預留約 2.5 小時；療程後以休息、簡單用餐或直接回上野為主。",
      links: {
        map: "https://www.google.com/maps/dir/?api=1&origin=%E5%A4%A7%E7%94%B0%E5%8C%BA%E7%94%A3%E6%A5%AD%E3%83%97%E3%83%A9%E3%82%B6%20PiO&destination=%E7%99%BD%E9%87%91%E3%83%93%E3%83%BC%E3%82%AF%E3%83%AA%E3%83%8B%E3%83%83%E3%82%AF%E6%9C%AC%E9%99%A2",
        site: "https://mineralmarket.jp/",
      },
    },
  },

  bookings: {
    t2: {
      title: "ORIX 札幌租車 SA CLASS 小型車",
      meta: "已預約 · 6/14 11:30 取車 → 6/16 17:00 還車 · 53.5 小時 · 2 人 · ETC 卡、CDW、RAP 已加入 · 總額 ¥26,587",
      status: "confirmed",
    },
  },

  places: [
    {
      id: "p14b",
      region: "tokyo",
      type: "activity",
      title: "白金ビークリニック本院",
      detail: "6/20 15:00 女友醫美預約，時間約 2.5 小時。從白金高輪站步行約 8 分鐘，療程後不安排趕路。",
      image: "assets/activity-0618-tokyo-culture.png",
      tags: ["預約", "南麻布", "醫美"],
      links: {
        map: "https://maps.app.goo.gl/ZDVAwKB6jj5ZfC8m7?g_st=ic",
        site: "https://bc-cl.jp/clinic/shirokane/",
      },
    },
  ],

  dayMaps: {
    d0620: {
      area: "蒲田 PiO 到南麻布",
      note: "上午集中逛礦物市場；13:40 左右離場，為 15:00 南麻布預約保留 50-60 分鐘交通與緩衝。",
      points: [
        { label: "上野飯店", query: "Hotel Sardonyx Ueno", x: 22, y: 24, kind: "hotel" },
        { label: "大田區產業 PiO", query: "大田区産業プラザ PiO", x: 68, y: 70, kind: "mineral" },
        { label: "白金ビークリニック", query: "白金ビークリニック本院", x: 52, y: 42, kind: "activity" },
        { label: "白金高輪站", query: "白金高輪駅", x: 45, y: 34, kind: "transport" },
      ],
    },
  },

  dayModeNotes: {
    d0614: {
      title: "ORIX 取車與離開札幌",
      items: [
        "09:30-10:00 飯店退房、整理行李",
        "10:00-10:25 帶行李直接從飯店前往 ORIX 札幌站前店",
        "10:25-11:20 抵達 ORIX，確認證件、ETC 卡、CDW 與 RAP",
        "11:30 取 SA CLASS 小型車",
        "11:45 後離開札幌市中心",
        "中午後往洞爺湖／HOTEL COCOA RESORT",
      ],
      warning: "不要取車後開回狸小路飯店拿行李，這會增加 YOSAKOI 管制風險。",
    },
    d0616: {
      title: "洞爺湖回札幌還車",
      items: [
        "下午由洞爺湖返回札幌",
        "建議預留市區交通與加油時間",
        "17:00 前回 ORIX 札幌站前店還車",
        "還車後前往船舶花園薄野飯店入住",
      ],
      warning: "還車時間已確認為 17:00，不要再沿用舊版 18:00。",
    },
    d0620: {
      title: "6/20 礦物市場與醫美預約",
      items: [
        "上午：大田區產業プラザ PiO 礦物市場，優先完成真正想看的攤位",
        "13:20-13:40：結帳、整理戰利品、準備離場",
        "13:40-14:40：由 PiO 前往南麻布，保留轉乘、步行與找路時間",
        "15:00-17:30：白金ビークリニック本院預約",
        "17:30 後：南麻布周邊休息、簡單用餐或直接回上野",
      ],
      warning: "醫美後不安排酒精、奔波或需要準時抵達的支線；實際照診所術後指示調整。",
    },
  },
};
