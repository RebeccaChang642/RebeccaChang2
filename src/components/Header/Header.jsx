import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import './Header.css'

const Header = ({ isMenuOpen, toggleMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="header-container">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/">
            <span className="logo-text">Portfolio</span>
          </Link>
        </motion.div>

        <nav className="nav-desktop">
          <Link to="/" className="nav-link">首頁</Link>
          <Link to="/portfolio" className="nav-link">作品集</Link>
          <Link to="/about" className="nav-link">關於我</Link>
          <Link to="/contact" className="nav-link">聯絡我</Link>
          <div className="nav-theme-toggle">
            <ThemeToggle />
          </div>
        </nav>

        <motion.button
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          whileTap={{ scale: 0.95 }}
          aria-label="開啟選單"
        >
          <span></span>
          <span></span>
          <span></span>
        </motion.button>
      </div>
    </motion.header>
  )
}

export default Header
