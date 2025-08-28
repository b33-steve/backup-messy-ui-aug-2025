'use client';

import React, { useState, useEffect } from 'react';

export function SimpleThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem('simple-theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('dark');
    }
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark') => {
    console.log('🎨 SimpleThemeToggle: Applying theme:', newTheme);
    
    // SIMPLE: Just set CSS classes - globals.css handles everything
    document.documentElement.className = newTheme;
    document.body.className = newTheme;
    
    // Save to localStorage
    localStorage.setItem('simple-theme', newTheme);
    
    console.log('✅ SimpleThemeToggle: Theme applied via CSS classes');
  };
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    console.log('🔄 SimpleThemeToggle: Toggling theme from', theme, 'to', newTheme);
    
    // SIMPLE: Just update state and apply
    setTheme(newTheme);
    applyTheme(newTheme);
    
    console.log('✅ SimpleThemeToggle: Theme toggle complete');
  };

  return (
    <button 
      id="simple-theme-toggle"
      type="button"
      onClick={toggleTheme}
      style={{
        fontSize: '20px',
        cursor: 'pointer',
        padding: '10px',
        borderRadius: '12px',
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        color: 'var(--text-primary)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontWeight: '600',
        fontSize: '12px',
        letterSpacing: '0.5px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05) translateY(-1px)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) translateY(0)';
        e.currentTarget.style.background = 'var(--card-bg)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <span style={{ fontSize: '16px' }}>
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
      <span>
        {theme === 'dark' ? 'DARK' : 'LIGHT'}
      </span>
    </button>
  );
}