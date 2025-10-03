import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Navigation.css'

const Navigation = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: '/', label: '首頁' },
    { path: '/portfolio', label: '作品集' },
    { path: '/about', label: '關於我' },
    { path: '/contact', label: '聯絡我' }
  ]

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  }

  const itemVariants = {
    closed: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.nav
            className="nav-mobile"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="nav-content">
              <div className="nav-header">
                <h2>選單</h2>
              </div>
              <ul className="nav-list">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.path}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className="nav-item"
                      onClick={onClose}
                    >
                      <span className="nav-item-text">{item.label}</span>
                      <span className="nav-item-indicator"></span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}

export default Navigation
