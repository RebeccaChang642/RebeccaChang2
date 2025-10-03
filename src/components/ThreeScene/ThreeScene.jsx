import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import './ThreeScene.css'

const ThreeScene = ({ type = 'particles' }) => {
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
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    })

    // 存儲引用
    sceneRef.current = scene
    cameraRef.current = camera
    rendererRef.current = renderer

    // 渲染器設置
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    // 相機位置
    camera.position.z = 5

    // 根據類型創建不同的 3D 效果
    let objects = []
    
    switch (type) {
      case 'particles':
        objects = createParticleSystem(scene)
        break
      case 'geometric':
        objects = createGeometricShapes(scene)
        break
      case 'floating':
        objects = createFloatingObjects(scene)
        break
      default:
        objects = createParticleSystem(scene)
    }

    // 動畫循環
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)
      
      // 更新對象動畫
      objects.forEach(obj => {
        if (obj.update) obj.update()
      })

      // 相機輕微旋轉
      camera.position.x = Math.sin(Date.now() * 0.0005) * 0.5
      camera.position.y = Math.cos(Date.now() * 0.0003) * 0.3
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()
    setIsLoaded(true)

    // 響應式處理
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // 清理函數
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [type])

  // 創建粒子系統
  const createParticleSystem = (scene) => {
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1000
    
    const positions = new Float32Array(particlesCount * 3)
    const colors = new Float32Array(particlesCount * 3)
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      
      // 顏色漸變
      const color = new THREE.Color()
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8
    })
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)
    
    return [{
      mesh: particles,
      update: () => {
        const positions = particles.geometry.attributes.position.array
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += 0.001 // 向上移動
          if (positions[i + 1] > 10) {
            positions[i + 1] = -10
          }
        }
        particles.geometry.attributes.position.needsUpdate = true
        particles.rotation.y += 0.001
      }
    }]
  }

  // 創建幾何形狀
  const createGeometricShapes = (scene) => {
    const objects = []
    const geometries = [
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.SphereGeometry(0.3, 32, 32),
      new THREE.ConeGeometry(0.3, 0.6, 8),
      new THREE.TorusGeometry(0.3, 0.1, 16, 100)
    ]
    
    geometries.forEach((geometry, index) => {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.6 + index * 0.1, 0.8, 0.6),
        wireframe: true,
        transparent: true,
        opacity: 0.6
      })
      
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = (Math.random() - 0.5) * 10
      mesh.position.y = (Math.random() - 0.5) * 10
      mesh.position.z = (Math.random() - 0.5) * 10
      
      scene.add(mesh)
      
      objects.push({
        mesh,
        update: () => {
          mesh.rotation.x += 0.01
          mesh.rotation.y += 0.01
          mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001
        }
      })
    })
    
    return objects
  }

  // 創建浮動物體
  const createFloatingObjects = (scene) => {
    const objects = []
    
    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.SphereGeometry(0.1, 16, 16)
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
        transparent: true,
        opacity: 0.7
      })
      
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      )
      
      scene.add(mesh)
      
      objects.push({
        mesh,
        update: () => {
          mesh.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002
          mesh.rotation.x += 0.01
          mesh.rotation.y += 0.01
        }
      })
    }
    
    return objects
  }

  return (
    <div className="three-scene-container">
      <div 
        ref={mountRef} 
        className="three-scene"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  )
}

export default ThreeScene
