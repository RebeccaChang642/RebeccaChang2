import React from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal, HoverScale } from '../../components/Animations/Animations'
import Profile3D from '../../components/Profile3D/Profile3D'
import './About.css'

const About = () => {
  const experiences = [
    {
      year: "2023 - 現在",
      title: "資深全端開發者",
      company: "科技公司",
      description: "負責大型專案的架構設計與開發，帶領團隊完成多個重要產品"
    },
    {
      year: "2021 - 2023",
      title: "前端開發者",
      company: "新創公司",
      description: "專注於 React 生態系統，開發現代化的使用者介面"
    },
    {
      year: "2019 - 2021",
      title: "實習生",
      company: "軟體公司",
      description: "學習基礎開發技能，參與小型專案開發"
    }
  ]

  const achievements = [
    "完成 50+ 個專案",
    "服務 100+ 位客戶",
    "獲得 5 個技術認證",
    "開源專案 1000+ stars"
  ]

  return (
    <div className="about">
      <div className="container">
        {/* Header */}
        <ScrollReveal>
          <div className="about-header">
            <h1 className="page-title">關於我</h1>
            <p className="page-subtitle">
              熱愛技術的全端開發者，致力於創造優質的數位體驗
            </p>
          </div>
        </ScrollReveal>

        {/* Hero Section */}
        <div className="about-hero">
          <ScrollReveal>
            <Profile3D />
          </ScrollReveal>
          
          <ScrollReveal>
            <div className="about-content">
              <h2>你好，我是開發者</h2>
              <p>
                我是一名充滿熱情的全端開發者，專精於現代化網頁應用程式開發。
                擁有豐富的 React、Node.js 開發經驗，以及對新技術的持續學習熱忱。
              </p>
              <p>
                我相信好的程式碼不僅要功能完整，更要易於維護和擴展。
                我注重使用者體驗，致力於創造既美觀又實用的數位產品。
              </p>
              
              <div className="achievements">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="achievement-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="achievement-icon">✓</span>
                    <span>{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Experience */}
        <ScrollReveal>
          <div className="experience-section">
            <h2 className="section-title">工作經歷</h2>
            <div className="timeline">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="timeline-item"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-year">{exp.year}</div>
                    <h3 className="timeline-title">{exp.title}</h3>
                    <div className="timeline-company">{exp.company}</div>
                    <p className="timeline-description">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Skills */}
        <ScrollReveal>
          <div className="skills-section">
            <h2 className="section-title">技能專長</h2>
            <div className="skills-categories">
              <div className="skill-category">
                <h3>前端開發</h3>
                <div className="skill-list">
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">Vue.js</span>
                  <span className="skill-tag">TypeScript</span>
                  <span className="skill-tag">Next.js</span>
                  <span className="skill-tag">Tailwind CSS</span>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>後端開發</h3>
                <div className="skill-list">
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">Express</span>
                  <span className="skill-tag">MongoDB</span>
                  <span className="skill-tag">PostgreSQL</span>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>工具與技術</h3>
                <div className="skill-list">
                  <span className="skill-tag">Git</span>
                  <span className="skill-tag">Docker</span>
                  <span className="skill-tag">AWS</span>
                  <span className="skill-tag">Figma</span>
                  <span className="skill-tag">Photoshop</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <div className="about-cta">
            <h2>讓我們一起創造美好的數位體驗</h2>
            <p>準備好開始您的下一個專案了嗎？</p>
            <a href="/contact" className="btn-primary">
              聯絡我
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

export default About
