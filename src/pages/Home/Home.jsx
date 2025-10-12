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
      color: isDarkMode ? '#F5CB86' : '#7E5936',
      transparent: true,
      opacity: isDarkMode ? 0.8 : 0.5,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // 創建飄動的立體字母元素
    const textGroup = new THREE.Group()
    
    // 目標文字
    const targetText = "Rebecca Chang"
    const letters = targetText.split('')
    
    // 創建立體字母
    const create3DLetters = () => {
      letters.forEach((letter, index) => {
        // 跳過空格
        if (letter === ' ') return
        
        // 創建立方體作為字母的基礎形狀
        let letterGeometry
        switch(letter.toLowerCase()) {
          case 'r':
            letterGeometry = new THREE.BoxGeometry(0.3, 0.5, 0.2)
            break
          case 'e':
            letterGeometry = new THREE.BoxGeometry(0.3, 0.5, 0.2)
            break
          case 'b':
            letterGeometry = new THREE.BoxGeometry(0.3, 0.5, 0.2)
            break
          case 'c':
            letterGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.2, 8, 1, false, 0, Math.PI)
            break
          case 'a':
            letterGeometry = new THREE.ConeGeometry(0.3, 0.5, 6)
            break
          case 'h':
            letterGeometry = new THREE.BoxGeometry(0.3, 0.5, 0.2)
            break
          case 'n':
            letterGeometry = new THREE.BoxGeometry(0.3, 0.5, 0.2)
            break
          case 'g':
            letterGeometry = new THREE.BoxGeometry(0.3, 0.5, 0.2)
            break
          default:
            letterGeometry = new THREE.BoxGeometry(0.3, 0.5, 0.2)
        }
        
        const letterMaterial = new THREE.MeshBasicMaterial({ 
          color: isDarkMode ? '#F5CB86' : '#7E5936',
          transparent: true,
          opacity: 0.8,
          wireframe: true
        })
        
        const letterMesh = new THREE.Mesh(letterGeometry, letterMaterial)
        
        // 計算正確位置（考慮空格）
        let correctX = 0
        for (let i = 0; i < index; i++) {
          if (targetText[i] === ' ') {
            correctX += 0.4 // 空格寬度
          } else {
            correctX += 0.35 // 字母寬度
          }
        }
        correctX -= (targetText.replace(/\s/g, '').length * 0.35) / 2 // 置中
        
        // 初始位置（亂序分散）
        letterMesh.position.x = correctX + (Math.random() - 0.5) * 8
        letterMesh.position.y = (Math.random() - 0.5) * 6
        letterMesh.position.z = (Math.random() - 0.5) * 4
        
        // 隨機旋轉
        letterMesh.rotation.x = Math.random() * Math.PI * 2
        letterMesh.rotation.y = Math.random() * Math.PI * 2
        letterMesh.rotation.z = Math.random() * Math.PI * 2
        
        // 存儲目標位置和字母資訊
        letterMesh.userData = {
          targetX: correctX,
          targetY: 0,
          targetZ: 0,
          targetRotationX: 0,
          targetRotationY: 0,
          targetRotationZ: 0,
          letter: letter,
          index: index,
          isForming: false
        }
        
        textGroup.add(letterMesh)
      })
    }
    
    // 創建立體字母
    create3DLetters()
    
    // 添加滑鼠互動檢測
    let isHovered = false
    let hoverStartTime = 0
    const hoverDuration = 1000 // 1秒後變為正確字串
    
    const raycaster = new THREE.Raycaster()
    const mouseVector = new THREE.Vector2()
    
    const checkIntersection = (event) => {
      mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1
      
      raycaster.setFromCamera(mouseVector, camera)
      const intersects = raycaster.intersectObjects(textGroup.children)
      
      if (intersects.length > 0) {
        if (!isHovered) {
          isHovered = true
          hoverStartTime = Date.now()
        }
      } else {
        isHovered = false
        hoverStartTime = 0
      }
    }
    
    window.addEventListener('mousemove', checkIntersection)
    
    scene.add(textGroup)

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
      
      // 文字組整體旋轉
      textGroup.rotation.x = -currentRotation.x * 0.3 + elapsedTime * 0.02
      textGroup.rotation.y = -currentRotation.y * 0.3 + elapsedTime * 0.01
      textGroup.rotation.z = elapsedTime * 0.01
      
      // 檢查滑鼠懸停狀態
      const currentTime = Date.now()
      const hoverProgress = isHovered ? Math.min(1, (currentTime - hoverStartTime) / hoverDuration) : 0
      
      // 字母動畫邏輯
      textGroup.children.forEach((letterMesh, index) => {
        const userData = letterMesh.userData
        
        if (hoverProgress > 0) {
          // 滑鼠懸停時：字母慢慢移動到正確位置形成字串
          const targetPos = {
            x: userData.targetX,
            y: userData.targetY,
            z: userData.targetZ
          }
          
          // 平滑移動到目標位置
          letterMesh.position.x += (targetPos.x - letterMesh.position.x) * (0.05 + hoverProgress * 0.1)
          letterMesh.position.y += (targetPos.y - letterMesh.position.y) * (0.05 + hoverProgress * 0.1)
          letterMesh.position.z += (targetPos.z - letterMesh.position.z) * (0.05 + hoverProgress * 0.1)
          
          // 旋轉到正確角度（正立）
          letterMesh.rotation.x += (userData.targetRotationX - letterMesh.rotation.x) * (0.03 + hoverProgress * 0.07)
          letterMesh.rotation.y += (userData.targetRotationY - letterMesh.rotation.y) * (0.03 + hoverProgress * 0.07)
          letterMesh.rotation.z += (userData.targetRotationZ - letterMesh.rotation.z) * (0.03 + hoverProgress * 0.07)
          
          // 變為實心，確保清晰可見
          letterMesh.material.wireframe = hoverProgress < 0.8
          letterMesh.material.opacity = 0.8 + (hoverProgress * 0.2)
          
          userData.isForming = hoverProgress > 0.5
        } else {
          // 正常狀態：跟著粒子系統飄動
          const particleInfluence = 0.3
          const timeOffset = index * 0.5
          
          // 跟著粒子系統的旋轉和運動
          letterMesh.position.x += Math.sin(elapsedTime * 0.2 + timeOffset) * 0.002 * particleInfluence
          letterMesh.position.y += Math.cos(elapsedTime * 0.3 + timeOffset) * 0.001 * particleInfluence
          letterMesh.position.z += Math.sin(elapsedTime * 0.15 + timeOffset) * 0.0008 * particleInfluence
          
          // 持續旋轉
          letterMesh.rotation.x += 0.003
          letterMesh.rotation.y += 0.005
          letterMesh.rotation.z += 0.002
          
          // 保持線框模式
          letterMesh.material.wireframe = true
          letterMesh.material.opacity = 0.8
          
          userData.isForming = false
        }
      })
      
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
      window.removeEventListener('mousemove', checkIntersection)
      renderer.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
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
          end: '+=400%',
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
      .to({}, { duration: 0.5 })
    })

    // 延遲刷新確保正確計算
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      ctx.revert()
    }
  }, [])


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