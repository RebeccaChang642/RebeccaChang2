import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import './ProjectCard3D.css'

const ProjectCard3D = ({ project, index }) => {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const animationRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

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
    renderer.setSize(300, 200)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    // 相機位置
    camera.position.z = 3

    // 創建 3D 幾何體
    const geometry = new THREE.BoxGeometry(1, 0.6, 0.1)
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(0.6 + index * 0.1, 0.8, 0.6),
      transparent: true,
      opacity: 0.9,
      shininess: 100
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // 添加邊框
    const edges = new THREE.EdgesGeometry(geometry)
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.3 
    })
    const wireframe = new THREE.LineSegments(edges, lineMaterial)
    scene.add(wireframe)

    // 動畫循環
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)
      
      // 旋轉動畫
      mesh.rotation.x += 0.005
      mesh.rotation.y += 0.01
      wireframe.rotation.x = mesh.rotation.x
      wireframe.rotation.y = mesh.rotation.y

      // 懸停效果
      if (isHovered) {
        mesh.scale.setScalar(1.1)
        mesh.position.z = 0.2
      } else {
        mesh.scale.setScalar(1)
        mesh.position.z = 0
      }

      renderer.render(scene, camera)
    }

    animate()

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
  }, [index, isHovered])

  return (
    <motion.div
      className="project-card-3d"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="card-3d-container">
        <div ref={mountRef} className="three-canvas" />
        <div className="card-overlay">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-tags">
            {project.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard3D
