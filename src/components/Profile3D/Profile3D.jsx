import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import './Profile3D.css'

const Profile3D = () => {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const animationRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!mountRef.current) return

    // 場景設置
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    })

    // 存儲引用
    sceneRef.current = scene
    cameraRef.current = camera
    rendererRef.current = renderer

    // 渲染器設置
    renderer.setSize(400, 400)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    // 相機位置
    camera.position.z = 3

    // 創建頭像幾何體
    const headGeometry = new THREE.SphereGeometry(0.8, 32, 32)
    const headMaterial = new THREE.MeshPhongMaterial({
      color: 0xff6b6b,
      transparent: true,
      opacity: 0.8,
      shininess: 100
    })
    const head = new THREE.Mesh(headGeometry, headMaterial)
    scene.add(head)

    // 創建身體
    const bodyGeometry = new THREE.CylinderGeometry(0.6, 0.4, 1.2, 8)
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: 0x4ecdc4,
      transparent: true,
      opacity: 0.8
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = -0.8
    scene.add(body)

    // 創建手臂
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 8)
    const armMaterial = new THREE.MeshPhongMaterial({
      color: 0xff6b6b,
      transparent: true,
      opacity: 0.8
    })
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial)
    leftArm.position.set(-0.7, -0.4, 0)
    leftArm.rotation.z = 0.3
    scene.add(leftArm)
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial)
    rightArm.position.set(0.7, -0.4, 0)
    rightArm.rotation.z = -0.3
    scene.add(rightArm)

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // 添加粒子環繞效果
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 50
    const positions = new Float32Array(particlesCount * 3)
    
    for (let i = 0; i < particlesCount; i++) {
      const angle = (i / particlesCount) * Math.PI * 2
      const radius = 2 + Math.random() * 0.5
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = Math.sin(angle) * radius
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xff6b6b,
      transparent: true,
      opacity: 0.6
    })
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // 動畫循環
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)
      
      // 旋轉動畫
      head.rotation.y += 0.01
      body.rotation.y += 0.005
      leftArm.rotation.z = 0.3 + Math.sin(Date.now() * 0.001) * 0.1
      rightArm.rotation.z = -0.3 + Math.sin(Date.now() * 0.001) * 0.1
      
      // 粒子環繞
      particles.rotation.y += 0.002
      
      // 呼吸效果
      const scale = 1 + Math.sin(Date.now() * 0.002) * 0.05
      head.scale.setScalar(scale)
      body.scale.setScalar(scale)

      renderer.render(scene, camera)
    }

    animate()
    setIsLoaded(true)

    // 清理函數
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <motion.div
      className="profile-3d-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div 
        ref={mountRef} 
        className="profile-3d"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
      <div className="profile-info">
        <h3>3D 個人形象</h3>
        <p>使用 Three.js 創建的互動式 3D 角色</p>
      </div>
    </motion.div>
  )
}

export default Profile3D
