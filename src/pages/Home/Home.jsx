import React, { useEffect, useRef } from 'react'
// 暫時移除 framer-motion 以排除依賴異常
// import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import './Home.css'

// 在模組層級註冊 ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const sceneRef = useRef(null)
  const bannerRef = useRef(null)
  const project1Ref = useRef(null)
  const project2Ref = useRef(null)
  const project3Ref = useRef(null)
  const project4Ref = useRef(null)
  const project5Ref = useRef(null)
  const canvasRef = useRef(null)
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)

  // Three.js 互動背景效果
  useEffect(() => {
    if (!canvasRef.current) return

    // 檢測當前主題
    const isDarkMode = document.documentElement.classList.contains('dark') || 
                       !document.documentElement.classList.contains('light')

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.position.z = 5

    // 鼠標位置
    const mouse = { x: 0, y: 0 }
    const targetRotation = { x: 0, y: 0 }
    const currentRotation = { x: 0, y: 0 }

    // 創建粒子系統
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1200
    const posArray = new Float32Array(particlesCount * 3)
    const scaleArray = new Float32Array(particlesCount)

    for (let i = 0; i < particlesCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 20
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 20
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 20
      scaleArray[i] = Math.random()
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: isDarkMode ? '#ff6b6b' : '#ff8e8e',
      transparent: true,
      opacity: isDarkMode ? 0.8 : 0.5,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // 添加幾何形狀作為互動元素
    const torusGeometry = new THREE.TorusGeometry(1.5, 0.3, 16, 100)
    const torusMaterial = new THREE.MeshBasicMaterial({ 
      color: isDarkMode ? '#ff8e8e' : '#ff6b6b',
      wireframe: true,
      transparent: true,
      opacity: isDarkMode ? 0.3 : 0.2
    })
    const torus = new THREE.Mesh(torusGeometry, torusMaterial)
    scene.add(torus)

    // 監聽鼠標移動
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      
      targetRotation.x = mouse.y * 0.5
      targetRotation.y = mouse.x * 0.5
    }
    window.addEventListener('mousemove', handleMouseMove)

    // 動畫循環
    let animationId
    const clock = new THREE.Clock()
    
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()
      
      // 平滑跟隨鼠標
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05
      
      // 粒子旋轉
      particlesMesh.rotation.y = currentRotation.y + elapsedTime * 0.05
      particlesMesh.rotation.x = currentRotation.x + elapsedTime * 0.03
      
      // 環形幾何旋轉
      torus.rotation.x = -currentRotation.x * 2 + elapsedTime * 0.1
      torus.rotation.y = -currentRotation.y * 2 + elapsedTime * 0.1
      torus.rotation.z = elapsedTime * 0.05
      
      // 粒子呼吸效果
      const positions = particlesGeometry.attributes.position.array
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3
        const x = positions[i3]
        const y = positions[i3 + 1]
        
        positions[i3 + 2] = Math.sin(elapsedTime + x) * Math.cos(elapsedTime + y) * 0.5
      }
      particlesGeometry.attributes.position.needsUpdate = true
      
      renderer.render(scene, camera)
    }
    animate()

    // 處理窗口大小變化
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      renderer.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      torusGeometry.dispose()
      torusMaterial.dispose()
    }
  }, [])

  // 自訂鼠標游標
  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    const moveCursor = (e) => {
      const x = e.clientX
      const y = e.clientY
      
      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.3,
        ease: 'power2.out'
      })
      
      gsap.to(cursorDot, {
        x: x,
        y: y,
        duration: 0.1,
        ease: 'power2.out'
      })
    }

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
        ease: 'back.out(2)'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', moveCursor)
    
    // 為所有可點擊元素添加 hover 效果
    const clickables = document.querySelectorAll('a, button, .scene-card')
    clickables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  // 作品卡片 3D 傾斜效果
  useEffect(() => {
    const cards = document.querySelectorAll('.scene-card')
    
    cards.forEach(card => {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        
        const rotateX = (y - centerY) / 10
        const rotateY = (centerX - x) / 10
        
        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          duration: 0.5,
          ease: 'power2.out'
        })
      }
      
      const handleMouseLeave = () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: 'power2.out'
        })
      }
      
      card.addEventListener('mousemove', handleMouseMove)
      card.addEventListener('mouseleave', handleMouseLeave)
    })
    
    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', () => {})
        card.removeEventListener('mouseleave', () => {})
      })
    }
  }, [])

  // GSAP 滾動動畫
  useEffect(() => {
    // 強制回到頂部
    window.scrollTo(0, 0)
    
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    let ctx = gsap.context(() => {
      // 清除所有舊的 ScrollTrigger
      ScrollTrigger.getAll().forEach(t => t.kill())

      // 初始化所有元素狀態
      gsap.set(bannerRef.current, { 
        scale: 1, 
        opacity: 1,
        visibility: 'visible',
        transformOrigin: '50% 50%'
      })
      
      gsap.set([
        project1Ref.current,
        project2Ref.current,
        project3Ref.current,
        project4Ref.current,
        project5Ref.current
      ], { 
        opacity: 0,
        visibility: 'hidden',
        scale: 0.9
      })

      // 創建時間軸
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: 'top top',
          end: '+=600%',
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      })

      // Banner 放大動畫 - 持續更久，更平滑
      tl.to(bannerRef.current, {
        scale: 12,
        opacity: 0.8,
        duration: 2.5,
        ease: 'power1.in'
      })
      // Banner 繼續放大並淡出
      .to(bannerRef.current, {
        scale: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in'
      })
      .set(bannerRef.current, { visibility: 'hidden' })
      // 作品 1 淡入 - 帶有彈性效果
      .set(project1Ref.current, { visibility: 'visible' }, '-=0.5')
      .to(project1Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.2)'
      }, '<')
      // 作品 1 停留
      .to({}, { duration: 1 })
      // 作品 1 淡出，作品 2 淡入
      .to(project1Ref.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: 'power2.in'
      })
      .set(project1Ref.current, { visibility: 'hidden' })
      .set(project2Ref.current, { visibility: 'visible' }, '-=0.25')
      .to(project2Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.2)'
      }, '<')
      // 作品 2 停留
      .to({}, { duration: 1 })
      // 作品 2 淡出，作品 3 淡入
      .to(project2Ref.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: 'power2.in'
      })
      .set(project2Ref.current, { visibility: 'hidden' })
      .set(project3Ref.current, { visibility: 'visible' }, '-=0.25')
      .to(project3Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.2)'
      }, '<')
      // 作品 3 停留
      .to({}, { duration: 1 })
      // 作品 3 淡出，作品 4 淡入
      .to(project3Ref.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: 'power2.in'
      })
      .set(project3Ref.current, { visibility: 'hidden' })
      .set(project4Ref.current, { visibility: 'visible' }, '-=0.25')
      .to(project4Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.2)'
      }, '<')
      // 作品 4 停留
      .to({}, { duration: 1 })
      // 作品 4 淡出，作品 5 淡入
      .to(project4Ref.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: 'power2.in'
      })
      .set(project4Ref.current, { visibility: 'hidden' })
      .set(project5Ref.current, { visibility: 'visible' }, '-=0.25')
      .to(project5Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.2)'
      }, '<')
      // 作品 5 停留
      .to({}, { duration: 1.5 })
    })

    // 延遲刷新確保正確計算
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      ctx.revert()
    }
  }, [])

  const projects = [
    {
      id: 1,
      title: "電商平台",
      description: "現代化的電商解決方案，提供流暢的購物體驗",
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 2,
      title: "行動應用",
      description: "跨平台行動應用，整合多種功能模組",
      tags: ["React Native", "Firebase", "TypeScript"]
    },
    {
      id: 3,
      title: "數據視覺化",
      description: "互動式數據儀表板，提供即時分析",
      tags: ["D3.js", "Python", "PostgreSQL"]
    }
  ]

  const skills = [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "TypeScript", level: 75 },
    { name: "Python", level: 70 },
    { name: "UI/UX Design", level: 85 }
  ]

  return (
    <div className="home">
      {/* 自訂游標 */}
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={cursorDotRef} className="custom-cursor-dot"></div>
      
      {/* ScrollTrigger 釘住場景 */}
      <section className="scroll-scene" ref={sceneRef}>
        <canvas ref={canvasRef} className="three-canvas" />
        <div className="scene-sticky">
          {/* Banner 大字會被無限放大 */}
          <h1 ref={bannerRef} className="banner-title">
            創建
            <span className="gradient-text">數位體驗</span>
          </h1>

          {/* 作品集 1 */}
          <div ref={project1Ref} className="scene-layer">
            <div className="scene-card">
              <h3>作品集 1｜電商平台</h3>
              <p>現代化的電商解決方案，提供流暢的購物體驗。</p>
              <div className="project-tags">
                <span className="tag">React</span>
                <span className="tag">Node.js</span>
                <span className="tag">MongoDB</span>
              </div>
            </div>
          </div>

          {/* 作品集 2 */}
          <div ref={project2Ref} className="scene-layer">
            <div className="scene-card">
              <h3>作品集 2｜行動應用</h3>
              <p>跨平台行動應用，整合多種功能模組。</p>
              <div className="project-tags">
                <span className="tag">React Native</span>
                <span className="tag">Firebase</span>
                <span className="tag">TypeScript</span>
              </div>
            </div>
          </div>

          {/* 作品集 3 */}
          <div ref={project3Ref} className="scene-layer">
            <div className="scene-card">
              <h3>作品集 3｜數據視覺化</h3>
              <p>互動式數據儀表板，提供即時分析。</p>
              <div className="project-tags">
                <span className="tag">D3.js</span>
                <span className="tag">Python</span>
                <span className="tag">PostgreSQL</span>
              </div>
            </div>
          </div>

          {/* 作品集 4 */}
          <div ref={project4Ref} className="scene-layer">
            <div className="scene-card">
              <h3>作品集 4｜品牌官網</h3>
              <p>高效能多語系品牌官網，SEO 最佳化。</p>
              <div className="project-tags">
                <span className="tag">Next.js</span>
                <span className="tag">i18n</span>
                <span className="tag">SSR</span>
              </div>
            </div>
          </div>

          {/* 作品集 5 */}
          <div ref={project5Ref} className="scene-layer">
            <div className="scene-card">
              <h3>作品集 5｜活動宣傳頁</h3>
              <p>轉場動畫與收單表單，行銷成效最佳化。</p>
              <div className="project-tags">
                <span className="tag">Framer Motion</span>
                <span className="tag">GSAP</span>
                <span className="tag">Vite</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="projects-preview">
        <div className="container">
          <div>
            <h2 className="section-title">精選作品</h2>
          </div>
          
          <div className="projects-grid">
            {projects.slice(2).map((project, index) => (
              <div
                key={project.id}
                className="project-card"
              >
                <div className="project-image">
                  <div className="project-placeholder">
                    <span>{project.title}</span>
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <div className="projects-cta">
              <Link to="/portfolio" className="btn-primary">
                查看所有作品
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills">
        <div className="container">
          <div>
            <h2 className="section-title">技能專長</h2>
          </div>
          
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="skill-item"
              >
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div>
            <div className="cta-content">
              <h2>準備開始您的專案了嗎？</h2>
              <p>讓我們一起創造令人驚豔的數位體驗</p>
              <Link to="/contact" className="btn-primary">
                開始合作
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home