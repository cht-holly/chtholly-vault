/**
 * AGENT INSTRUCTION: Main App Component
 * 
 * This is the root component of the React TypeScript template.
 * It demonstrates the basic structure and patterns to follow.
 * 
 * When adapting for other industries:
 * 1. Replace the content with your industry-specific layout
 * 2. Keep the ThemeProvider wrapper for dark/light mode support
 * 3. Maintain the mobile-first responsive structure
 * 4. Add your routing logic (React Router) here
 * 5. Customize the navigation and landing page components
 * 
 * Key patterns to preserve:
 * - ThemeProvider for consistent theming
 * - Mobile-first responsive design
 * - Proper TypeScript typing
 * - Component composition structure
 * - Navigation + Landing Page + Features layout
 */

import { useState } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { ThemeProvider } from './components/theme/provider'
import { NavBar } from './components/layout/NavBar'
import { LandingPage } from './components/layout/LandingPage'
import { ItemGrid } from './components/features/ItemGrid'
import { sampleItems, getPopularItems, getFeaturedItems } from './data/sampleItems'
import { BaseItem, BaseFlowData } from './types/base'

function App() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'popular' | 'featured'>('all')
  const [currentView, setCurrentView] = useState<'home' | 'features'>('home')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const getDisplayItems = () => {
    switch (selectedTab) {
      case 'popular':
        return getPopularItems()
      case 'featured':
        return getFeaturedItems()
      default:
        return sampleItems
    }
  }

  const handleItemSelect = (item: BaseItem) => {
    console.log('Item selected:', item)
  }

  const handleFlowComplete = (item: BaseItem, flowData: BaseFlowData) => {
    console.log('Flow completed for item:', item, 'with data:', flowData)
  }

  const handleGetStarted = () => {
    setCurrentView('features')
  }

  const handleSignIn = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="chtholly-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        {/* Navigation Bar */}
        <NavBar
          brandName="Chtholly UI"
          brandTagline="Modern React Template"
          isAuthenticated={isAuthenticated}
          onPrimaryAction={handleGetStarted}
          onSecondaryAction={handleSignIn}
          primaryButtonText="Get Started"
          secondaryButtonText="Sign In"
          primaryButtonTextMobile="Start"
          secondaryButtonTextMobile="Login"
          userName="John Doe"
          userEmail="john@example.com"
          userInitials="JD"
          onLogout={handleLogout}
        />

        {/* Main Content */}
        <main className="">
          {currentView === 'home' ? (
            <LandingPage
              heading="AI Agent-Friendly React Template"
              subheading="Built for Rapid Development"
              subtitle="A comprehensive React TypeScript template designed specifically for AI agents to quickly build modern, responsive applications for any industry."
              ctaText="Explore Goals"
              ctaTextMobile="Explore"
              onCtaClick={handleGetStarted}
              primaryFeatureTitle="Agent-Optimized"
              secondaryFeatureTitle="Industry-Agnostic"
            />
          ) : (
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-6xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Goal Setting & Achievement
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Discover goals that inspire you and create a personalized path to success
                  </p>
                  
                  {/* Tab Navigation */}
                  <div className="flex justify-center gap-2 mb-8">
                    <Button 
                      variant={selectedTab === 'all' ? 'default' : 'outline'}
                      onClick={() => setSelectedTab('all')}
                      size="sm"
                    >
                      All Goals
                    </Button>
                    <Button 
                      variant={selectedTab === 'popular' ? 'default' : 'outline'}
                      onClick={() => setSelectedTab('popular')}
                      size="sm"
                    >
                      Popular
                    </Button>
                    <Button 
                      variant={selectedTab === 'featured' ? 'default' : 'outline'}
                      onClick={() => setSelectedTab('featured')}
                      size="sm"
                    >
                      Featured
                    </Button>
                  </div>
                </div>

                {/* Item Grid - Real component from original app */}
                <ItemGrid 
                  items={getDisplayItems()}
                  title={`${selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Goals`}
                  onItemSelect={handleItemSelect}
                  onFlowComplete={handleFlowComplete}
                />

                {/* Template Information Cards */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Production-Ready Components</CardTitle>
                      <CardDescription>
                        Real patterns from a successful app
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        The grid above demonstrates real component patterns extracted from a production subliminal app.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Mobile-First Design</CardTitle>
                      <CardDescription>
                        Responsive layouts that work on all devices
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Notice how the grid adapts: 1 column on mobile, 2 on tablet, 3 on desktop.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Agent-Friendly Code</CardTitle>
                      <CardDescription>
                        Built for AI agents to easily adapt
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Every component includes comprehensive documentation for AI agents to adapt to any industry.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
