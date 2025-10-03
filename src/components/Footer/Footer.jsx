import React from 'react'
import { motion } from 'framer-motion'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Portfolio</h3>
            <p>創建令人驚豔的數位體驗</p>
          </div>
          
          <div className="footer-section">
            <h4>快速連結</h4>
            <ul>
              <li><a href="/">首頁</a></li>
              <li><a href="/portfolio">作品集</a></li>
              <li><a href="/about">關於我</a></li>
              <li><a href="/contact">聯絡我</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>技術</h4>
            <ul>
              <li>React</li>
              <li>Framer Motion</li>
              <li>GSAP</li>
              <li>Lenis</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>聯絡資訊</h4>
            <p>email@example.com</p>
            <div className="social-links">
              <a href="#" aria-label="GitHub">GitHub</a>
              <a href="#" aria-label="LinkedIn">LinkedIn</a>
              <a href="#" aria-label="Twitter">Twitter</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Portfolio. 版權所有。</p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
