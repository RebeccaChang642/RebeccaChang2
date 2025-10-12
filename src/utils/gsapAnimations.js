import { gsap } from 'gsap'

// 動態導入 ScrollTrigger
let ScrollTrigger = null
const loadScrollTrigger = async () => {
  if (!ScrollTrigger) {
    const module = await import('gsap/ScrollTrigger')
    ScrollTrigger = module.ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)
  }
  return ScrollTrigger
}

// GSAP 動畫工具類
class GSAPAnimations {
  constructor() {
    this.init()
  }

  init() {
    // 設置全域 GSAP 配置
    gsap.config({
      nullTargetWarn: false,
      trialWarn: false
    })
  }

  // 淡入動畫
  fadeIn(element, options = {}) {
    const defaults = {
      duration: 1,
      delay: 0,
      ease: "power2.out",
      y: 50,
      opacity: 0
    }
    
    const config = { ...defaults, ...options }
    
    return gsap.fromTo(element, 
      { 
        opacity: config.opacity,
        y: config.y 
      },
      {
        opacity: 1,
        y: 0,
        duration: config.duration,
        delay: config.delay,
        ease: config.ease
      }
    )
  }

  // 滑入動畫
  slideIn(element, direction = 'left', options = {}) {
    const directions = {
      left: { x: -100, y: 0 },
      right: { x: 100, y: 0 },
      up: { x: 0, y: -100 },
      down: { x: 0, y: 100 }
    }
    
    const defaults = {
      duration: 1,
      delay: 0,
      ease: "power2.out",
      ...directions[direction]
    }
    
    const config = { ...defaults, ...options }
    
    return gsap.fromTo(element,
      { 
        opacity: 0,
        x: config.x,
        y: config.y 
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: config.duration,
        delay: config.delay,
        ease: config.ease
      }
    )
  }

  // 縮放動畫
  scaleIn(element, options = {}) {
    const defaults = {
      duration: 0.8,
      delay: 0,
      ease: "back.out(1.7)",
      scale: 0.5
    }
    
    const config = { ...defaults, ...options }
    
    return gsap.fromTo(element,
      { 
        opacity: 0,
        scale: config.scale 
      },
      {
        opacity: 1,
        scale: 1,
        duration: config.duration,
        delay: config.delay,
        ease: config.ease
      }
    )
  }

  // 旋轉動畫
  rotateIn(element, options = {}) {
    const defaults = {
      duration: 1,
      delay: 0,
      ease: "power2.out",
      rotation: 180
    }
    
    const config = { ...defaults, ...options }
    
    return gsap.fromTo(element,
      { 
        opacity: 0,
        rotation: config.rotation 
      },
      {
        opacity: 1,
        rotation: 0,
        duration: config.duration,
        delay: config.delay,
        ease: config.ease
      }
    )
  }

  // 文字打字機效果
  typewriter(element, options = {}) {
    const defaults = {
      duration: 2,
      delay: 0,
      ease: "none"
    }
    
    const config = { ...defaults, ...options }
    
    return gsap.fromTo(element,
      { 
        opacity: 0,
        width: 0 
      },
      {
        opacity: 1,
        width: "auto",
        duration: config.duration,
        delay: config.delay,
        ease: config.ease
      }
    )
  }

  // 滾動觸發動畫
  async scrollTrigger(element, animation, options = {}) {
    const ScrollTrigger = await loadScrollTrigger()
    
    const defaults = {
      trigger: element,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    }
    
    const config = { ...defaults, ...options }
    
    return ScrollTrigger.create({
      ...config,
      animation: animation
    })
  }

  // 視差滾動效果
  async parallax(element, options = {}) {
    const ScrollTrigger = await loadScrollTrigger()
    
    const defaults = {
      yPercent: -50,
      ease: "none"
    }
    
    const config = { ...defaults, ...options }
    
    return gsap.to(element, {
      yPercent: config.yPercent,
      ease: config.ease,
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })
  }

  // 時間軸動畫
  createTimeline(options = {}) {
    const defaults = {
      paused: false,
      repeat: 0,
      yoyo: false
    }
    
    const config = { ...defaults, ...options }
    
    return gsap.timeline(config)
  }

  // 暫停所有動畫
  pauseAll() {
    gsap.globalTimeline.pause()
  }

  // 恢復所有動畫
  resumeAll() {
    gsap.globalTimeline.resume()
  }

  // 殺死所有動畫
  killAll() {
    gsap.killTweensOf("*")
  }
}

// 創建全域實例
const gsapAnimations = new GSAPAnimations()

export default gsapAnimations
export { gsap }
