# 2026 日本縱貫線 Travel Cockpit V5

這是手機優先的旅行作戰台版本。V4 保留作為穩定備份，V5 將資料、介面與部署包整理成更容易維護的結構。

## 上傳 GitHub

上傳 GitHub Pages 時，請上傳 `japan-trip-interactive-app-v5-github-lite-upload` 裡面的全部內容，不要上傳 zip，也不要上傳外層資料夾本身。

## 主要檔案

- `index.html`：V5 頁面結構。
- `app.js`：互動、搜尋、狀態、記帳、CSV 匯出。
- `styles.css`：手機優先視覺系統。
- `data/trip-data.js`：核心行程資料。
- `data/trip-updates.js`：後續行程更新入口。
- `data/visual-assets.js`：圖片來源覆寫層。
- `data/expense-seeds.js`：預定支出，例如秘密咖哩。

## 目前包含

- 6/14 秘密のカレー部屋、租車、定山溪到洞爺湖路線。
- 6/20 PiO 礦物市場與白金ビークリニック。
- 6/21 雑司ヶ谷手創り市與 OLD NEW MARKET 積極版。
- JPY / TWD 雙幣記帳、老公／老婆／待補、平分結算、CSV 匯出。
- 官方真實照片優先，秘密地點不顯示入口照片。

## 圖片策略

V5 使用壓縮後的 `.jpg` 圖片，整包維持在 GitHub 網頁上傳安全範圍。若未來要換更高品質或大量真實圖片，建議改接 Cloudinary 或其他圖片 CDN。
