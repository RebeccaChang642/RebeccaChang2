import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Portfolio from './pages/Portfolio/Portfolio'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import './App.css'
import 'lenis/dist/lenis.css'

// 註冊 ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // 防止瀏覽器記住滾動位置
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    
    // 確保從頂部開始
    window.scrollTo(0, 0)
    
    // 初始化 Lenis 平滑滾動
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false
    })

    // 將 Lenis 滾動事件同步到 ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // 使用 GSAP ticker 驅動 Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // 關閉 GSAP 的 lag smoothing（因為 Lenis 已經處理了）
    gsap.ticker.lagSmoothing(0)
    
    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
