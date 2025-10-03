import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Portfolio.css'

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "電商平台",
      description: "現代化的電商解決方案，提供流暢的購物體驗",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Web Development"
    },
    {
      id: 2,
      title: "行動應用",
      description: "跨平台行動應用，整合多種功能模組",
      tags: ["React Native", "Firebase", "TypeScript"],
      category: "Mobile Development"
    },
    {
      id: 3,
      title: "數據視覺化",
      description: "互動式數據儀表板，提供即時分析",
      tags: ["D3.js", "Python", "PostgreSQL"],
      category: "Data Visualization"
    },
    {
      id: 4,
      title: "社交媒體平台",
      description: "現代化的社交平台，支援即時通訊",
      tags: ["Vue.js", "Socket.io", "Redis"],
      category: "Web Development"
    },
    {
      id: 5,
      title: "AI 聊天機器人",
      description: "智能聊天機器人，提供客戶服務支援",
      tags: ["Python", "TensorFlow", "OpenAI"],
      category: "AI/ML"
    },
    {
      id: 6,
      title: "區塊鏈應用",
      description: "去中心化應用程式，提供安全的交易環境",
      tags: ["Solidity", "Web3.js", "Ethereum"],
      category: "Blockchain"
    }
  ]

  const categories = ["All", "Web Development", "Mobile Development", "Data Visualization", "AI/ML", "Blockchain"]

  return (
    <div className="portfolio">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="portfolio-header">
            <h1 className="page-title">作品集</h1>
            <p className="page-subtitle">
              探索我的創意作品，每個專案都代表著對技術的熱情與對品質的追求
            </p>
          </div>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="filter-tabs">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`filter-tab ${index === 0 ? 'active' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="project-image">
                <div className="project-placeholder">
                  <span>{project.title}</span>
                </div>
              </div>
              <div className="project-content">
                <div className="project-meta">
                  <span className="project-category">{project.category}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="portfolio-cta">
            <h2>對我的作品感興趣嗎？</h2>
            <p>讓我們討論您的下一個專案</p>
            <Link to="/contact" className="btn-primary">
              開始合作
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Portfolio