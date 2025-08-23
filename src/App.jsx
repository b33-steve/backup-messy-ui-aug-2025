// src/App.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [theme, setTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      theme === 'light' ? 'bg-gradient-light' : 
      theme === 'dark' ? 'bg-gradient-dark' : 'bg-gradient-gray'
    }`}>
      {/* Fixed Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 h-16 z-50 ${
        theme === 'light' 
          ? 'bg-white/80 border-b border-gray-200' 
          : 'bg-gray-900/80 border-b border-gray-700'
      } backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PM33
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-2">
            {['Dashboard', 'Chat', 'Tasks', 'Data', 'Settings'].map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item.toLowerCase())}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === item.toLowerCase()
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : theme === 'light'
                    ? 'hover:bg-gray-100 text-gray-700'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {['light', 'dark', 'gray'].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  theme === t
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          {currentPage === 'dashboard' && <DashboardPage theme={theme} />}
          {currentPage === 'chat' && <StrategicChat theme={theme} />}
        </AnimatePresence>
      </main>
    </div>
  );
};

// Dashboard Component with 3-column layout
const DashboardPage = ({ theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto p-6"
    >
      <div className="grid grid-cols-[300px_1fr_350px] gap-6">
        {/* Left Sidebar */}
        <div className="space-y-4">
          <GlassCard theme={theme}>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              🎯 Strategic Tools
            </h3>
            <div className="space-y-2">
              {['Strategic Chat', 'Project Delivery', 'Analytics', 'OKR Planner'].map((tool) => (
                <button
                  key={tool}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                    theme === 'light'
                      ? 'hover:bg-blue-50 text-gray-700'
                      : 'hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  {tool}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard theme={theme}>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Company Context
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">Company Profile</div>
                <div className="font-medium">TechStartup Inc.</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Current Priorities</div>
                <div className="font-medium">Q4 Launch</div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Center Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Command Center</h1>
            <p className="text-gray-600">Good morning! Let's tackle today's strategic priorities.</p>
          </div>

          <GlassCard theme={theme} className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-500">AI INTELLIGENCE BRIEFING - LIVE</span>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Strategic AI Co-Pilot Ready</h2>
            
            <p className="text-gray-600 mb-6">
              Ask any strategic question. I'll suggest frameworks like ICE or RICE, then apply them with your company context to generate executable workflows.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <StrategyCard
                theme={theme}
                title="COMPETITIVE STRATEGY"
                subtitle="Competitor launched similar features"
                description="They have 10x funding. Strategic response?"
                color="blue"
              />
              <StrategyCard
                theme={theme}
                title="RESOURCE ALLOCATION"
                subtitle="Hire developer vs marketing spend"
                description="$15k budget to reach 50 beta users"
                color="green"
              />
              <StrategyCard
                theme={theme}
                title="GROWTH STRATEGY"
                subtitle="Low beta-to-paid conversion"
                description="Great feedback, poor conversion rates"
                color="orange"
              />
              <StrategyCard
                theme={theme}
                title="MARKET STRATEGY"
                subtitle="Enterprise vs SMB focus"
                description="Bigger deals vs momentum building"
                color="purple"
              />
            </div>
          </GlassCard>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          <GlassCard theme={theme}>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              ⚡ Competitive Landscape
            </h3>
            <div className="space-y-3">
              <div>
                <div className="font-medium">Primary: Productboard</div>
                <div className="text-sm text-gray-500">Series C, $100M+ funding, roadmap focus</div>
              </div>
              <div>
                <div className="font-medium">Secondary: Aha!</div>
                <div className="text-sm text-gray-500">Profitable, strategy docs, enterprise</div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Our Advantage: Strategic AI + execution
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard theme={theme}>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              👥 Team & Resources
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Team Size:</span>
                <span className="font-medium">3 people</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Runway:</span>
                <span className="font-medium">6 months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Key Constraint:</span>
                <span className="font-medium text-orange-500">Limited marketing</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard theme={theme}>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              📊 Key Metrics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Beta Signups:</span>
                <span className="font-medium">15 total</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Available Budget:</span>
                <span className="font-medium">$15,000</span>
              </div>
              <div className="mt-3">
                <div className="text-sm text-gray-500 mb-1">30% to goal (50 beta users)</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }} />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
};

// Strategic Chat Component (placeholder)
const StrategicChat = ({ theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto p-6"
    >
      <GlassCard theme={theme} className="p-6">
        <h1 className="text-2xl font-bold mb-4">Strategic Chat</h1>
        <p className="text-gray-600">Strategic chat interface coming soon...</p>
      </GlassCard>
    </motion.div>
  );
};

// Glass Card Component
const GlassCard = ({ children, className = '', theme }) => {
  return (
    <div className={`
      rounded-xl p-4 transition-all duration-300
      ${theme === 'light' 
        ? 'bg-white/70 border border-gray-200' 
        : 'bg-gray-800/50 border border-gray-700'
      }
      backdrop-blur-md shadow-lg hover:shadow-xl hover:-translate-y-1
      ${className}
    `}>
      {children}
    </div>
  );
};

// Strategy Card Component
const StrategyCard = ({ title, subtitle, description, color, theme }) => {
  const colors = {
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    orange: 'from-orange-400 to-orange-600',
    purple: 'from-purple-400 to-purple-600',
  };

  return (
    <div className={`
      p-4 rounded-lg transition-all duration-300 cursor-pointer
      ${theme === 'light' 
        ? 'bg-gray-50 hover:bg-gray-100' 
        : 'bg-gray-700/50 hover:bg-gray-700'
      }
    `}>
      <div className={`text-xs font-semibold mb-2 bg-gradient-to-r ${colors[color]} bg-clip-text text-transparent`}>
        {title}
      </div>
      <div className="font-medium text-sm mb-1">{subtitle}</div>
      <div className="text-xs text-gray-500">{description}</div>
    </div>
  );
};

export default App;