/*
 * 行程調整集中入口
 *
 * 後續新增或改期，優先只修改這個檔案。
 * app.js 保留穩定的顯示邏輯，圖片庫也不需要跟著重做。
 */
window.TRIP_UPDATES = {
  planningNotes: {
    d0621_market_candidates: {
      status: "applied-aggressive",
      title: "6/21 東京市集候選規劃",
      decision: "6/20 不排市集；6/21 採積極版正式接入 app：上午雑司ヶ谷手創り市，午後 OLD NEW MARKET 日本橋，再接御徒町或咖啡，傍晚回上野收行李。",
      markets: [
        {
          name: "OLD NEW MARKET 日本橋",
          date: "6/20-6/21",
          time: "12:00-17:00",
          priority: "high",
          fit: "6/21 12:30-14:30 最適合插入，和日本橋、御徒町回場路線順。",
          links: {
            site: "https://www.oldnewmarket.com/",
            map: "https://www.google.com/maps/search/?api=1&query=OLD%20NEW%20MARKET%20%E6%97%A5%E6%9C%AC%E6%A9%8B",
          },
        },
        {
          name: "雑司ヶ谷 手創り市",
          date: "6/21",
          time: "10:00-16:00",
          priority: "medium",
          fit: "可作上午支線；若加入，建議 10:00-11:30，之後移動到日本橋。",
          links: {
            site: "https://fmfm.jp/event/detail/14237",
            map: "https://www.google.com/maps/search/?api=1&query=%E9%9B%91%E5%8F%B8%E3%83%B6%E8%B0%B7%20%E6%89%8B%E5%89%B5%E3%82%8A%E5%B8%82",
          },
        },
        {
          name: "大井競馬場 Tokyo City Flea Market",
          date: "6/19-6/21",
          time: "需再查當日公告",
          priority: "low",
          fit: "不建議排入；位置偏南，和 6/21 日本橋、御徒町、上野收行李路線不順。",
        },
      ],
      proposedSchedule: [
        "10:00-11:30：雑司ヶ谷 手創り市（可選，體力好才排）",
        "11:30-12:20：移動到日本橋",
        "12:30-14:30：OLD NEW MARKET 日本橋",
        "14:30-16:00：御徒町／Jewelry Marche 回場或咖啡",
        "16:30 後：回上野、整理行李、早點收心準備 6/22 早班機",
      ],
      conservativeVersion: [
        "12:00-14:30：OLD NEW MARKET 日本橋",
        "14:30-16:00：御徒町／Jewelry Marche 回場或咖啡",
        "16:30 後：回上野整理行李",
      ],
      note: "已轉入 itinerary / places / dayMaps / dayModeNotes；此區保留為決策紀錄。",
    },
  },

  itinerary: {
    d0614: {
      title: "札幌、秘密咖哩、定山溪到洞爺湖",
      detail: "退房後直接帶行李前往 ORIX 札幌站前店，11:30 取 SA CLASS 小型車。離開札幌後走國道 230，13:00 秘密のカレー部屋預約，之後視時間短走二見吊橋，再經郷の駅ホッときもべつ、道の駅とうや湖展望台，最後抵達 Cocoa Resort 洞爺湖。",
      status: "confirmed",
      links: {
        map: "https://www.google.com/maps/dir/?api=1&origin=ORIX%20Rent%20a%20Car%20Sapporo%20Station&destination=Cocoa%20Resort%20Toyako&waypoints=%E3%82%AB%E3%82%BC%E3%83%9E%E3%83%81%E3%83%9E%E3%83%BC%E3%83%88%E3%81%A8%E7%87%BB%E8%A3%BD%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E7%A0%94%E7%A9%B6%E6%89%80%7C%E4%BA%8C%E8%A6%8B%E5%90%8A%E6%A9%8B%7C%E9%83%B7%E3%81%AE%E9%A7%85%E3%83%9B%E3%83%83%E3%81%A8%E3%81%8D%E3%82%82%E3%81%B9%E3%81%A4%7C%E9%81%93%E3%81%AE%E9%A7%85%E3%81%A8%E3%81%86%E3%82%84%E6%B9%96%20%E5%B1%95%E6%9C%9B%E5%8F%B0",
        site: "https://cocoaresort.jp/",
      },
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
    d0621: {
      title: "雑司ヶ谷手創り市、OLD NEW MARKET、日本橋與御徒町",
      detail: "上午 10:00-11:30 雑司ヶ谷手創り市，11:30-12:20 移動到日本橋，12:30-14:30 OLD NEW MARKET 日本橋，14:30-16:00 御徒町／Jewelry Marche 回場或咖啡。16:30 後回上野整理行李，準備 6/22 早班機。",
      status: "confirmed",
      links: {
        map: "https://www.google.com/maps/dir/?api=1&origin=Hotel%20Sardonyx%20Ueno&destination=Hotel%20Sardonyx%20Ueno&waypoints=%E9%9B%91%E5%8F%B8%E3%83%B6%E8%B0%B7%20%E6%89%8B%E5%89%B5%E3%82%8A%E5%B8%82%7COLD%20NEW%20MARKET%20%E6%97%A5%E6%9C%AC%E6%A9%8B%7C%E5%BE%A1%E5%BE%92%E7%94%BA%20%E3%82%B8%E3%83%A5%E3%82%A8%E3%83%AA%E3%83%BC%E3%83%9E%E3%83%AB%E3%82%B7%E3%82%A7",
        site: "https://www.oldnewmarket.com/",
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
      id: "hkd0614-jodankei-dango",
      region: "hokkaido",
      type: "shop",
      title: "定団渓 糰子備案",
      detail: "6/14 已有 13:00 秘密咖哩預約，定団渓改為附近甜點備案。若咖哩後仍想吃、時間與胃容量都允許，再短停。",
      image: "assets/place-jodankei-dango.png",
      tags: ["糰子", "定山溪", "備案"],
      links: {
        map: "https://www.google.com/maps/search/?api=1&query=%E5%AE%9A%E5%9B%A3%E6%B8%93%20%E5%AE%9A%E5%B1%B1%E6%B8%93",
      },
    },
    {
      id: "hkd0614-secret-curry",
      region: "hokkaido",
      type: "shop",
      title: "秘密のカレー部屋",
      detail: "6/14 13:00，2 人，秘密のカレーセット全 5 品，合計 ¥5,720。預約時間 5 分鐘前到カゼマチマートと燻製デザイン研究所，先在櫃台結帳；現金與信用卡可用。停車使用風マチビルヂング旁免費停車場。不要在 SNS 公開秘密入口或精確入口資訊。",
      visualIcon: "カ",
      tags: ["預約", "定山溪", "午餐", "隱私提醒"],
      links: {
        map: "https://www.google.com/maps/search/?api=1&query=%E3%82%AB%E3%82%BC%E3%83%9E%E3%83%81%E3%83%9E%E3%83%BC%E3%83%88%E3%81%A8%E7%87%BB%E8%A3%BD%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E7%A0%94%E7%A9%B6%E6%89%80%20%E5%AE%9A%E5%B1%B1%E6%B8%93",
        web: "https://www.google.com/search?q=%E7%A7%98%E5%AF%86%E3%81%AE%E3%82%AB%E3%83%AC%E3%83%BC%E9%83%A8%E5%B1%8B%20SelectType",
      },
    },
    {
      id: "hkd0614-futami",
      region: "hokkaido",
      type: "activity",
      title: "定山溪二見公園、二見吊橋",
      detail: "6/14 中途休息觀光。朱紅色吊橋與二見定山之道入口，適合 20-30 分鐘散步伸展。",
      image: "assets/place-futami-bridge.png",
      tags: ["散步", "定山溪", "吊橋"],
      links: {
        map: "https://www.google.com/maps/search/?api=1&query=%E4%BA%8C%E8%A6%8B%E5%90%8A%E6%A9%8B%20%E5%AE%9A%E5%B1%B1%E6%B8%93",
        site: "https://jozankei.jp/spot/105/",
      },
    },
    {
      id: "hkd0614-kimobetsu",
      region: "hokkaido",
      type: "shop",
      title: "郷の駅ホッときもべつ",
      detail: "6/14 國道 230 中途補給點，可短停逛逛、洗手間與整理車上物品。",
      image: "assets/place-hot-kimobetsu.png",
      tags: ["道之驛", "補給", "短停"],
      links: {
        map: "https://maps.app.goo.gl/sxQcr4YFU5cVkbVHA?g_st=il",
      },
    },
    {
      id: "hkd0614-toyako-view",
      region: "hokkaido",
      type: "activity",
      title: "道の駅とうや湖 展望台",
      detail: "6/14 抵達洞爺湖前的展望停靠點。道之驛 4-10 月官方時間 8:30-17:00，可視抵達時間短停看景。",
      image: "assets/place-toyako-viewpoint.png",
      tags: ["道之驛", "展望台", "洞爺湖"],
      links: {
        map: "https://maps.app.goo.gl/6jnrmyLsDq4yoYZSA?g_st=il",
        site: "https://www.michi-no-eki.jp/stations/views/18889",
      },
    },
    {
      id: "p14b",
      region: "tokyo",
      type: "activity",
      title: "白金ビークリニック本院",
      detail: "6/20 15:00 女友醫美預約，時間約 2.5 小時。從白金高輪站步行約 8 分鐘，療程後不安排趕路。",
      image: "assets/place-shirokane-clinic.png",
      tags: ["預約", "南麻布", "醫美"],
      links: {
        map: "https://maps.app.goo.gl/ZDVAwKB6jj5ZfC8m7?g_st=ic",
        site: "https://bc-cl.jp/clinic/shirokane/",
      },
    },
    {
      id: "p19",
      region: "tokyo",
      type: "activity",
      title: "雑司ヶ谷 手創り市",
      detail: "6/21 10:00-11:30 上午市集支線。以手作器物、雜貨與小型攤位為主，逛完直接移動到日本橋 OLD NEW MARKET。",
      image: "assets/place-zoshigaya-market.png",
      tags: ["市集", "手作", "支線"],
      links: {
        map: "https://www.google.com/maps/search/?api=1&query=%E9%9B%91%E5%8F%B8%E3%83%B6%E8%B0%B7%20%E6%89%8B%E5%89%B5%E3%82%8A%E5%B8%82",
        site: "https://fmfm.jp/event/detail/14237",
      },
    },
  ],

  dayMaps: {
    d0614: {
      area: "札幌、定山溪、喜茂別、洞爺湖",
      note: "6/14 取車後走國道 230。重點是中途短停，不要把每個點都逛太久，避免太晚到飯店。",
      points: [
        { label: "Granbell Hotel", query: "Granbell Hotel Tanuki Sapporo", x: 12, y: 28, kind: "hotel" },
        { label: "ORIX 札幌", query: "ORIX Rent a Car Sapporo Station", x: 22, y: 38, kind: "transport" },
        { label: "秘密咖哩集合點", query: "カゼマチマートと燻製デザイン研究所 定山渓", x: 36, y: 52, kind: "food" },
        { label: "二見吊橋", query: "二見吊橋 定山渓", x: 43, y: 58, kind: "activity" },
        { label: "ホッときもべつ", query: "郷の駅ホッときもべつ", x: 56, y: 66, kind: "shop" },
        { label: "とうや湖 展望台", query: "道の駅とうや湖 展望台", x: 74, y: 54, kind: "activity" },
        { label: "Cocoa Resort", query: "Cocoa Resort Toyako", x: 84, y: 68, kind: "hotel" },
      ],
    },
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
    d0621: {
      area: "雑司ヶ谷、日本橋、御徒町、上野",
      note: "積極版：上午雑司ヶ谷，午後日本橋，再回御徒町或咖啡。16:30 後收心回上野，6/22 早班機優先。",
      points: [
        { label: "上野飯店", query: "Hotel Sardonyx Ueno", x: 30, y: 30, kind: "hotel" },
        { label: "雑司ヶ谷手創り市", query: "雑司ヶ谷 手創り市", x: 18, y: 60, kind: "market" },
        { label: "OLD NEW MARKET", query: "OLD NEW MARKET 日本橋", x: 62, y: 56, kind: "market" },
        { label: "Jewelry Marche", query: "御徒町 ジュエリーマルシェ", x: 40, y: 44, kind: "mineral" },
        { label: "回上野收行李", query: "Hotel Sardonyx Ueno", x: 34, y: 28, kind: "hotel" },
      ],
    },
  },

  dayModeNotes: {
    d0614: {
      title: "ORIX 取車、秘密咖哩與洞爺湖路上小旅行",
      items: [
        "09:30-10:00 飯店退房、整理行李",
        "10:00-10:25 帶行李直接從飯店前往 ORIX 札幌站前店",
        "10:25-11:20 抵達 ORIX，確認證件、ETC 卡、CDW 與 RAP",
        "11:30 取 SA CLASS 小型車",
        "11:45 後離開札幌市中心，往定山溪",
        "12:55 前抵達カゼマチマートと燻製デザイン研究所，先結帳",
        "13:00-13:45 秘密のカレー部屋，2 人合計 ¥5,720",
        "13:55-14:20 二見公園、二見吊橋散步休息",
        "15:00-15:20 郷の駅ホッときもべつ短停補給",
        "16:00-16:20 道の駅とうや湖展望台短停看景",
        "16:45-17:30 抵達 Cocoa Resort 洞爺湖",
      ],
      warning: "秘密咖哩不要公開入口或精確位置；若取車或道路延誤，優先保留 13:00 預約，二見吊橋與展望台可縮短。",
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
    d0621: {
      title: "6/21 市集積極版",
      items: [
        "10:00-11:30 雑司ヶ谷 手創り市",
        "11:30-12:20 移動到日本橋",
        "12:30-14:30 OLD NEW MARKET 日本橋",
        "14:30-16:00 御徒町／Jewelry Marche 回場或咖啡",
        "16:30 後回上野、整理行李、準備 6/22 早班機",
      ],
      warning: "6/22 要 04:20 起床。若 6/21 早上疲勞，直接砍掉雑司ヶ谷，保留 OLD NEW MARKET 與回上野收行李。",
    },
  },

  expenses: [
    {
      id: "exp-0614-secret-curry",
      date: "6/14",
      title: "秘密のカレー部屋 2 人午餐",
      category: "餐飲",
      amount: 5720,
      currency: "JPY",
      payer: "pending",
      note: "秘密咖哩套餐全 5 品，現場先結帳；付款人待現場確認。",
    },
  ],

  visualAssets: {
    p03: { image: "https://moerenumapark.jp/control-panel/wp-content/uploads/2014/05/img037_11.jpg", sourceType: "officialSite", sourceName: "Moerenuma Park 官網", sourceUrl: "https://moerenumapark.jp/english/" 