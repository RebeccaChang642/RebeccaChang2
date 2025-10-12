# 現代化作品集網站

這是一個使用 React、Lenis、GSAP 和 Framer Motion 構建的現代化作品集網站。

## 🚀 技術棧

- **React 18** - 現代化前端框架
- **Vite** - 快速建構工具
- **React Router** - 客戶端路由
- **Lenis** - 平滑滾動庫
- **GSAP** - 專業動畫庫
- **Framer Motion** - React 動畫庫
- **Three.js** - JavaScript 3D 庫
- **Styled Components** - CSS-in-JS 樣式解決方案

## ✨ 功能特色

- 🎨 **現代化設計** - 深色主題，漸層效果
- 📱 **響應式設計** - 適配各種裝置尺寸
- 🎭 **豐富動畫** - GSAP 和 Framer Motion 動畫效果
- 🖱️ **平滑滾動** - Lenis 提供的流暢滾動體驗
- 🎮 **3D 互動** - Three.js 創建的 3D 場景和物件
- ⚡ **高效能** - Vite 建構，快速載入
- 🎯 **SEO 友善** - 語義化 HTML 結構

## 📁 專案結構

```
src/
├── components/          # 可重用組件
│   ├── Layout/         # 佈局組件
│   ├── Header/         # 頁首組件
│   ├── Navigation/     # 導航組件
│   ├── Footer/         # 頁尾組件
│   ├── Animations/     # 動畫組件
│   ├── ThreeScene/     # 3D 場景組件
│   ├── ProjectCard3D/  # 3D 作品卡片
│   └── Profile3D/      # 3D 個人形象
├── pages/              # 頁面組件
│   ├── Home/           # 首頁
│   ├── Portfolio/      # 作品集
│   ├── About/          # 關於我
│   └── Contact/        # 聯絡我
├── utils/              # 工具函數
│   └── gsapAnimations.js
├── App.jsx             # 主應用組件
├── main.jsx            # 應用入口
└── index.css           # 全域樣式
```

## 🛠️ 安裝與執行

### 前置需求

- Node.js 16+ 
- npm 或 yarn

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

開啟瀏覽器訪問 `http://localhost:3000`

### 建構生產版本

```bash
npm run build
```

### 預覽生產版本

```bash
npm run preview
```

## 🎨 動畫系統

### GSAP 動畫

專案包含完整的 GSAP 動畫工具類，提供：

- 淡入/淡出動畫
- 滑入動畫（左、右、上、下）
- 縮放動畫
- 旋轉動畫
- 文字打字機效果
- 滾動觸發動畫
- 視差滾動效果
- 時間軸動畫

### Framer Motion 組件

提供多種預設動畫組件：

- `FadeInUp` - 向上淡入
- `FadeInLeft` - 向左淡入
- `FadeInRight` - 向右淡入
- `ScaleIn` - 縮放淡入
- `HoverScale` - 懸停縮放
- `ScrollReveal` - 滾動顯示
- `AnimatedButton` - 動畫按鈕
- `AnimatedCard` - 動畫卡片

## 📱 響應式設計

網站完全響應式，適配：

- 桌面端 (1200px+)
- 平板端 (768px - 1199px)
- 手機端 (< 768px)

## 🎯 頁面功能

### 首頁 (Home)
- Hero 區域與動畫
- 精選作品預覽
- 技能展示
- 行動呼籲

### 作品集 (Portfolio)
- 專案網格展示
- 分類篩選
- 專案詳情卡片
- 懸停效果

### 關於我 (About)
- 個人介紹
- 工作經歷時間軸
- 技能分類展示
- 成就統計

### 聯絡我 (Contact)
- 聯絡資訊卡片
- 聯絡表單
- 社群媒體連結
- 表單驗證

## 🔧 自訂配置

### 修改主題色彩

在 `src/index.css` 中修改 CSS 變數：

```css
:root {
  --primary-color: #ff6b6b;
  --secondary-color: #ff8e8e;
  --background-dark: #0a0a0a;
  --background-light: #1a1a1a;
}
```

### 添加新動畫

在 `src/components/Animations/Animations.jsx` 中添加新的動畫組件。

### 修改 Lenis 設定

在 `src/App.jsx` 中調整 Lenis 配置：

```jsx
<LenisProvider options={{
  lerp: 0.1,
  duration: 1.2,
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
}}>
```

## 📄 授權

MIT License

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📞 聯絡

如有問題或建議，請透過以下方式聯絡：

- Email: hello@example.com
- GitHub: [your-github-profile]

---

**享受創建令人驚豔的數位體驗！** ✨
