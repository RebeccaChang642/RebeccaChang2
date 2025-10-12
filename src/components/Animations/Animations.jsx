import React from 'react'
import { motion } from 'framer-motion'

// 動畫變體
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -60 }
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 60 }
}

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

// 動畫組件
export const FadeInUp = ({ children, delay = 0, duration = 0.6, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -60 }}
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
)

export const FadeInLeft = ({ children, delay = 0, duration = 0.6, ...props }) => (
  <motion.div
    initial={{ opacity: 0, x: -60 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 60 }}
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
)

export const FadeInRight = ({ children, delay = 0, duration = 0.6, ...props }) => (
  <motion.div
    initial={{ opacity: 0, x: 60 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -60 }}
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
)

export const ScaleIn = ({ children, delay = 0, duration = 0.6, ...props }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
)

export const RotateIn = ({ children, delay = 0, duration = 0.8, ...props }) => (
  <motion.div
    initial={{ opacity: 0, rotate: -180 }}
    animate={{ opacity: 1, rotate: 0 }}
    exit={{ opacity: 0, rotate: 180 }}
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
)

// 懸停動畫組件
export const HoverScale = ({ children, scale = 1.05, ...props }) => (
  <motion.div
    whileHover={{ scale }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
    {...props}
  >
    {children}
  </motion.div>
)

export const HoverLift = ({ children, y = -5, ...props }) => (
  <motion.div
    whileHover={{ y }}
    transition={{ duration: 0.2 }}
    {...props}
  >
    {children}
  </motion.div>
)

// 滾動動畫組件
export const ScrollReveal = ({ children, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
    {...props}
  >
    {children}
  </motion.div>
)

// 文字動畫組件
export const TextReveal = ({ children, delay = 0, ...props }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay }}
    {...props}
  >
    {children}
  </motion.div>
)

// 載入動畫組件
export const LoadingSpinner = ({ size = 40, color = "#ff6b6b" }) => (
  <motion.div
    className="loading-spinner"
    style={{
      width: size,
      height: size,
      border: `3px solid rgba(255, 107, 107, 0.3)`,
      borderTop: `3px solid ${color}`,
      borderRadius: '50%'
    }}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  />
)

// 頁面轉場組件
export const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
)

// 按鈕動畫組件
export const AnimatedButton = ({ children, ...props }) => (
  <motion.button
    whileHover={{ 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(255, 107, 107, 0.3)"
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
    {...props}
  >
    {children}
  </motion.button>
)

// 卡片動畫組件
export const AnimatedCard = ({ children, ...props }) => (
  <motion.div
    whileHover={{ 
      y: -10,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
    }}
    transition={{ duration: 0.3 }}
    {...props}
  >
    {children}
  </motion.div>
)
