import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal, HoverScale } from '../../components/Animations/Animations'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 這裡可以添加表單提交邏輯
    console.log('Form submitted:', formData)
  }

  const contactInfo = [
    {
      icon: "📧",
      title: "電子郵件",
      value: "hello@example.com",
      link: "mailto:hello@example.com"
    },
    {
      icon: "📱",
      title: "電話",
      value: "+886 912 345 678",
      link: "tel:+886912345678"
    },
    {
      icon: "📍",
      title: "位置",
      value: "台北市, 台灣",
      link: "#"
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "linkedin.com/in/yourprofile",
      link: "https://linkedin.com/in/yourprofile"
    }
  ]

  return (
    <div className="contact">
      <div className="container">
        {/* Header */}
        <ScrollReveal>
          <div className="contact-header">
            <h1 className="page-title">聯絡我</h1>
            <p className="page-subtitle">
              有專案想法或合作機會嗎？讓我們一起討論如何實現您的創意
            </p>
          </div>
        </ScrollReveal>

        <div className="contact-content">
          {/* Contact Info */}
          <ScrollReveal>
            <div className="contact-info">
              <h2>聯絡資訊</h2>
              <p>
                我總是樂於討論新的專案機會。無論您有具體的需求，
                還是只是想聊聊技術，都歡迎與我聯絡。
              </p>
              
              <div className="contact-items">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    className="contact-item"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="contact-icon">{item.icon}</div>
                    <div className="contact-details">
                      <h3>{item.title}</h3>
                      <p>{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal>
            <div className="contact-form-container">
              <h2>發送訊息</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">姓名</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="請輸入您的姓名"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">電子郵件</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="請輸入您的電子郵件"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">主題</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="請輸入訊息主題"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">訊息內容</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="請詳細描述您的需求或想法..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="btn-primary submit-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  發送訊息
                </motion.button>
              </form>
            </div>
          </ScrollReveal>
        </div>

        {/* Social Links */}
        <ScrollReveal>
          <div className="social-section">
            <h2>關注我</h2>
            <div className="social-links">
              <HoverScale>
                <a href="#" className="social-link">
                  <span className="social-icon">🐙</span>
                  <span>GitHub</span>
                </a>
              </HoverScale>
              
              <HoverScale>
                <a href="#" className="social-link">
                  <span className="social-icon">💼</span>
                  <span>LinkedIn</span>
                </a>
              </HoverScale>
              
              <HoverScale>
                <a href="#" className="social-link">
                  <span className="social-icon">🐦</span>
                  <span>Twitter</span>
                </a>
              </HoverScale>
              
              <HoverScale>
                <a href="#" className="social-link">
                  <span className="social-icon">📸</span>
                  <span>Instagram</span>
                </a>
              </HoverScale>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

export default Contact
