/**
 * Crypto Portfolio Monitor - Main Application Component
 * 
 * Privacy-first cryptocurrency portfolio tracking application.
 * All data stored locally, no backend required.
 */

import { useState, useEffect } from 'react'
import { ThemeProvider } from './components/theme/provider'
import { NavBar } from './components/layout/NavBar'
import { LandingPage } from './components/layout/LandingPage'
import { PortfolioDashboard } from './components/portfolio/PortfolioDashboard'
import { SettingsDialog } from './components/settings/SettingsDialog'
import { usePortfolioStore } from './stores/portfolioStore'

function App() {
  const { portfolio } = usePortfolioStore()
  const [currentView, setCurrentView] = useState<'landing' | 'portfolio'>('landing')
  const [settingsOpen, setSettingsOpen] = useState(false)
  
  // Persist view state and show portfolio if user has assets
  useEffect(() => {
    const savedView = localStorage.getItem('crypto-monitor-current-view')
    if (savedView === 'portfolio' || portfolio.assets.length > 0) {
      setCurrentView('portfolio')
    }
  }, [portfolio.assets.length])
  
  const handleGetStarted = () => {
    setCurrentView('portfolio')
    localStorage.setItem('crypto-monitor-current-view', 'portfolio')
  }

  const handleGoToLanding = () => {
    setCurrentView('landing')
    localStorage.setItem('crypto-monitor-current-view', 'landing')
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="crypto-monitor-theme">
      <div className="min-h-screen bg-background text-foreground">
        {/* Navigation Bar */}
        <NavBar
          brandName="Chtholly Vault"
          brandTagline="Privacy-First Portfolio Tracking"
          onPrimaryAction={currentView === 'landing' ? handleGetStarted : undefined}
          primaryButtonText={currentView === 'landing' ? "Get Started" : undefined}
          primaryButtonTextMobile={currentView === 'landing' ? "Start" : undefined}
          onLogoClick={handleGoToLanding}
          showSettings={currentView === 'portfolio'}
          onSettingsClick={() => setSettingsOpen(true)}
        />

        {/* Main Content */}
        <main>
          {currentView === 'landing' ? (
            <LandingPage
              heading="Privacy-First Crypto Portfolio Tracking"
              subheading="Your Data Stays Yours"
              subtitle="Track your entire crypto portfolio in one place. Complete privacy guaranteed."
              ctaText="Start Tracking"
              ctaTextMobile="Start"
              onCtaClick={handleGetStarted}
              primaryFeatureTitle="Why Portfolio Tracking is Difficult"
              secondaryFeatureTitle="How We Fix It"
            />
          ) : (
            <PortfolioDashboard />
          )}
        </main>

        {/* Settings Dialog */}
        <SettingsDialog 
          open={settingsOpen} 
          onOpenChange={setSettingsOpen}
        />
      </div>
    </ThemeProvider>
  )
}

export default App