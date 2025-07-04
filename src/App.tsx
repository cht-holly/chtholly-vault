/**
 * AGENT INSTRUCTION: Main App Component with Multi-Theme Support
 * 
 * This demonstrates how to implement a multi-theme system that adapts
 * the entire application's appearance based on the current view/industry.
 * 
 * ADAPTATION GUIDE:
 * 1. Add new theme variants in multi-provider.tsx
 * 2. Define theme colors in index.css
 * 3. Update navbar branding based on current view
 * 4. Maintain responsive behavior across all themes
 */

import { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { ThemeProvider } from './components/theme/provider'
import { NavBar } from './components/layout/NavBar'
import { LandingPage } from './components/layout/LandingPage'
import { Footer } from './components/layout/Footer'
import { ItemGrid } from './components/features/ItemGrid'
import { PhotoGrid } from './components/features/gallery/PhotoGrid'
import { PhotoHero } from './components/features/gallery/PhotoHero'
import { sampleItems, getPopularItems, getFeaturedItems } from './data/sampleItems'
import { samplePhotos } from './data/samplePhotos'
import { BaseItem, BaseFlowData } from './types/base'
import { PhotoItem } from './types/photography'

// View state type
type ViewState = 'landing' | 'goals' | 'photos'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentView, setCurrentView] = useState<ViewState>('landing')
  const [selectedTab, setSelectedTab] = useState<'all' | 'popular' | 'featured'>('all')
  
  // Listen for custom navigation events
  useEffect(() => {
    const handleNavigation = (event: CustomEvent) => {
      const view = event.detail as ViewState
      setCurrentView(view)
    }
    
    window.addEventListener('navigate-to-example', handleNavigation as EventListener)
    return () => window.removeEventListener('navigate-to-example', handleNavigation as EventListener)
  }, [])
  
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
    setCurrentView('photos')
  }

  const handlePhotoSelect = (photo: PhotoItem) => {
    // For now, just log the photo selection
    // In a real app, this would open a lightbox or detail view
    console.log('Photo selected:', photo)
  }

  const handleSignIn = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="chtholly-ui-theme">
      <div className={`min-h-screen bg-background text-foreground ${currentView === 'photos' ? 'photo-theme' : ''}`}>
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
        <main>
          {currentView === 'landing' ? (
            <LandingPage
              heading="AI Agent-Friendly React Template"
              subheading="Built for Rapid Development"
              subtitle="A comprehensive React TypeScript template designed specifically for AI agents to quickly build modern, responsive applications for any industry."
              ctaText="Explore Examples"
              ctaTextMobile="Explore"
              onCtaClick={handleGetStarted}
              primaryFeatureTitle="Agent-Optimized"
              secondaryFeatureTitle="Industry-Agnostic"
            />
          ) : currentView === 'goals' ? (
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

                {/* Item Grid */}
                <ItemGrid 
                  items={getDisplayItems()}
                  title={`${selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Goals`}
                  onItemSelect={handleItemSelect}
                  onFlowComplete={handleFlowComplete}
                />
              </div>
              
              {/* Footer for example page */}
              <Footer showAllSections={false} className="mt-12" />
            </div>
          ) : currentView === 'photos' ? (
            <div className="min-h-screen">
              {/* Photo Hero Section */}
              <PhotoHero 
                featuredPhoto={samplePhotos.find(p => p.isFeatured) || samplePhotos[0]}
                title="Photography Portfolio"
                subtitle="Discover stunning photography that captures life's most extraordinary moments"
                ctaText="Explore Gallery"
                onScrollToGallery={() => {
                  const galleryElement = document.querySelector('[data-gallery-section]')
                  if (galleryElement) {
                    galleryElement.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              />
              
              {/* Photo Gallery Section */}
              <div className="container mx-auto px-4 py-16" data-gallery-section>
                <div className="max-w-6xl mx-auto">
                  {/* Photo Grid Component */}
                  <PhotoGrid 
                    photos={samplePhotos}
                    onPhotoSelect={handlePhotoSelect}
                  />
                </div>
                
                {/* Footer for photo gallery page */}
                <Footer showAllSections={false} className="mt-16" />
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
