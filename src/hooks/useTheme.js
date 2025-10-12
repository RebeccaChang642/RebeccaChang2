import { useState, useEffect } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // 檢查 localStorage 中的主題設定，預設為暗色模式
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    
    // 移除所有主題類別
    root.classList.remove('light', 'dark')
    
    // 添加當前主題類別
    root.classList.add(theme)
    
    // 保存到 localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme }
}

