import React from 'react'
import { useTheme } from '../../hooks/useTheme'
import './ThemeToggle.css'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`切換到${theme === 'dark' ? '亮色' : '暗色'}模式`}
    >
      <div className="pull-switch">
        {/* 燈泡 */}
        <div className="light-bulb">
          <svg 
            className={`bulb-icon ${theme === 'light' ? 'active' : ''}`}
            viewBox="0 0 24 24" 
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 21h6m-3-1v-1m0-1c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5c0 .5-.1 1-.3 1.5-.2.5-.4.9-.7 1.3-.3.4-.7.7-1.2.9-.5.2-1 .3-1.6.3H9c-.6 0-1.1-.1-1.6-.3-.5-.2-.9-.5-1.2-.9-.3-.4-.5-.8-.7-1.3-.2-.5-.3-1-.3-1.5 0-2.5 2-4.5 4.5-4.5S9 13.5 9 16z" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"/>
            <path d="M12 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8.5 4.5L7 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M15.5 4.5L17 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          
          {/* 燈泡發光效果 */}
          <div className={`bulb-glow ${theme === 'light' ? 'active' : ''}`}></div>
        </div>
        
        {/* 拉繩 */}
        <div className="pull-cord">
          <div className="cord-line"></div>
          <div className="cord-handle"></div>
        </div>
        
        {/* 背景光暈 */}
        <div className={`ambient-glow ${theme === 'light' ? 'warm' : 'cool'}`}></div>
      </div>
    </button>
  )
}

export default ThemeToggle

