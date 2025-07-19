/**
 * Portfolio Store - Zustand State Management
 * 
 * Manages portfolio state, settings, and data persistence.
 * Implements auto-refresh, local storage, and analytics calculations.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { 
  CryptoAsset, 
  CryptoHolding,
  CryptoPriceData,
  Portfolio, 
  HoldingsPortfolio,
  PortfolioSnapshot, 
  AppSettings, 
  PortfolioAnalytics
} from '../types/crypto'
import { coinGeckoApi } from '../services/coinGeckoApi'
import { ExchangeRate } from '../services/exchangeRateApi'

interface PortfolioState {
  // Holdings data (persistent)
  holdingsPortfolio: HoldingsPortfolio
  
  // Price data (cached)
  priceData: Record<string, CryptoPriceData>
  
  // Combined portfolio for UI
  portfolio: Portfolio
  portfolioHistory: PortfolioSnapshot[]
  
  // Settings
  settings: AppSettings
  
  // Exchange rates
  exchangeRates: Record<string, ExchangeRate>
  
  // UI state
  isLoading: boolean
  error: string | null
  lastRefresh: Date | null
  
  // Analytics
  analytics: PortfolioAnalytics | null
  
  // Actions
  addHolding: (holding: Omit<CryptoHolding, 'addedDate'>) => void
  removeHolding: (holdingId: string) => void
  updateHoldingQuantity: (holdingId: string, quantity: number) => void
  updateHoldingPurchasePrice: (holdingId: string, price: number) => void
  importHoldings: (holdings: CryptoHolding[]) => void
  exportHoldings: () => void
  
  // Legacy methods (for compatibility)
  addAsset: (asset: Omit<CryptoAsset, 'addedDate'>) => void
  removeAsset: (assetId: string) => void
  updateAssetQuantity: (assetId: string, quantity: number) => void
  updateAssetPurchasePrice: (assetId: string, price: number) => void
  
  // Data combination
  combineHoldingsWithPrices: () => void
  
  // Settings actions
  updateSettings: (settings: Partial<AppSettings>) => Promise<void>
  setRefreshInterval: (interval: number) => void
  
  // Data refresh actions
  refreshPrices: () => Promise<void>
  refreshExchangeRates: () => Promise<void>
  startAutoRefresh: () => void
  stopAutoRefresh: () => void
  
  // Analytics actions
  calculateAnalytics: () => void
  savePortfolioSnapshot: () => void
  
  // Currency conversion
  convertAmount: (amount: number, fromCurrency?: string) => number
  
  // Utility actions
  clearError: () => void
  reset: () => void
}

// Default settings
const defaultSettings: AppSettings = {
  refreshInterval: 60, // 1 minute
  currency: 'USD',
  theme: 'system',
  autoRefresh: true,
  hideValues: false
}

// Default holdings portfolio
const defaultHoldingsPortfolio: HoldingsPortfolio = {
  id: 'main',
  name: 'My Portfolio',
  holdings: [],
  createdDate: new Date(),
  lastUpdated: new Date()
}

// Default portfolio
const defaultPortfolio: Portfolio = {
  id: 'main',
  name: 'My Portfolio',
  assets: [],
  createdDate: new Date(),
  lastUpdated: new Date(),
  refreshInterval: 60
}

let refreshInterval: NodeJS.Timeout | null = null

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      // Initial state
      holdingsPortfolio: defaultHoldingsPortfolio,
      priceData: {},
      portfolio: defaultPortfolio,
      portfolioHistory: [],
      settings: defaultSettings,
      exchangeRates: {},
      isLoading: false,
      error: null,
      lastRefresh: null,
      analytics: null,

      // Holdings management actions
      addHolding: (holding) => {
        const { holdingsPortfolio } = get()
        const existingHolding = holdingsPortfolio.holdings.find(h => h.id === holding.id)
        
        if (existingHolding) {
          // Update existing holding quantity
          get().updateHoldingQuantity(holding.id, existingHolding.quantity + holding.quantity)
          return
        }

        const newHolding: CryptoHolding = {
          ...holding,
          addedDate: new Date()
        }

        const updatedHoldingsPortfolio = {
          ...holdingsPortfolio,
          holdings: [...holdingsPortfolio.holdings, newHolding],
          lastUpdated: new Date()
        }

        set({ holdingsPortfolio: updatedHoldingsPortfolio })
        get().combineHoldingsWithPrices()
        get().calculateAnalytics()
        
        // Refresh prices for the new asset
        get().refreshPrices()
      },

      removeHolding: (holdingId) => {
        const { holdingsPortfolio } = get()
        const updatedHoldingsPortfolio = {
          ...holdingsPortfolio,
          holdings: holdingsPortfolio.holdings.filter(h => h.id !== holdingId),
          lastUpdated: new Date()
        }

        set({ holdingsPortfolio: updatedHoldingsPortfolio })
        get().combineHoldingsWithPrices()
        get().calculateAnalytics()
      },

      updateHoldingQuantity: (holdingId, quantity) => {
        const { holdingsPortfolio } = get()
        const updatedHoldingsPortfolio = {
          ...holdingsPortfolio,
          holdings: holdingsPortfolio.holdings.map(holding =>
            holding.id === holdingId
              ? { ...holding, quantity }
              : holding
          ),
          lastUpdated: new Date()
        }

        set({ holdingsPortfolio: updatedHoldingsPortfolio })
        get().combineHoldingsWithPrices()
        get().calculateAnalytics()
      },

      updateHoldingPurchasePrice: (holdingId, price) => {
        const { holdingsPortfolio } = get()
        const updatedHoldingsPortfolio = {
          ...holdingsPortfolio,
          holdings: holdingsPortfolio.holdings.map(holding =>
            holding.id === holdingId
              ? { ...holding, purchasePrice: price }
              : holding
          ),
          lastUpdated: new Date()
        }

        set({ holdingsPortfolio: updatedHoldingsPortfolio })
        get().combineHoldingsWithPrices()
        get().calculateAnalytics()
      },

      importHoldings: (holdings) => {
        const { holdingsPortfolio } = get()
        const updatedHoldingsPortfolio = {
          ...holdingsPortfolio,
          holdings: holdings.map(h => ({
            ...h,
            addedDate: h.addedDate || new Date()
          })),
          lastUpdated: new Date()
        }

        set({ holdingsPortfolio: updatedHoldingsPortfolio })
        get().combineHoldingsWithPrices()
        get().calculateAnalytics()
        get().refreshPrices()
      },

      exportHoldings: () => {
        const { holdingsPortfolio } = get()
        
        const exportData = {
          name: holdingsPortfolio.name,
          exportDate: new Date().toISOString(),
          holdings: holdingsPortfolio.holdings.map(holding => ({
            id: holding.id,
            name: holding.name,
            symbol: holding.symbol,
            quantity: holding.quantity,
            purchasePrice: holding.purchasePrice,
            addedDate: holding.addedDate
          }))
        }
        
        const dataStr = JSON.stringify(exportData, null, 2)
        const dataBlob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = `crypto-holdings-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      },

      // Legacy asset management actions (for compatibility)
      addAsset: (asset) => {
        // Convert asset to holding
        const holding = {
          id: asset.id,
          symbol: asset.symbol,
          name: asset.name,
          quantity: asset.quantity,
          purchasePrice: asset.purchasePrice
        }
        get().addHolding(holding)
      },

      removeAsset: (assetId) => {
        get().removeHolding(assetId)
      },

      updateAssetQuantity: (assetId, quantity) => {
        get().updateHoldingQuantity(assetId, quantity)
      },

      updateAssetPurchasePrice: (assetId, price) => {
        get().updateHoldingPurchasePrice(assetId, price)
      },

      // Data combination
      combineHoldingsWithPrices: () => {
        const { holdingsPortfolio, priceData } = get()
        
        const combinedAssets: CryptoAsset[] = holdingsPortfolio.holdings.map(holding => {
          const price = priceData[holding.id]
          return {
            ...holding,
            currentPrice: price?.currentPrice,
            priceChange24h: price?.priceChange24h,
            lastUpdated: price?.lastUpdated,
            image: holding.image || price?.image // Prefer saved image, fallback to cached
          }
        })

        const updatedPortfolio: Portfolio = {
          id: holdingsPortfolio.id,
          name: holdingsPortfolio.name,
          assets: combinedAssets,
          createdDate: holdingsPortfolio.createdDate,
          lastUpdated: holdingsPortfolio.lastUpdated,
          refreshInterval: 60
        }

        set({ portfolio: updatedPortfolio })
      },


      // Settings actions
      updateSettings: async (newSettings) => {
        const { settings } = get()
        const updatedSettings = { ...settings, ...newSettings }
        
        set({ settings: updatedSettings })
        
        // Refresh exchange rates if currency changed
        if (newSettings.currency && newSettings.currency !== settings.currency) {
          await get().refreshExchangeRates()
          get().combineHoldingsWithPrices()
          get().calculateAnalytics()
        }
        
        // Restart auto-refresh if interval changed
        if (newSettings.refreshInterval && newSettings.refreshInterval !== settings.refreshInterval) {
          get().setRefreshInterval(newSettings.refreshInterval)
        }
      },

      setRefreshInterval: (interval) => {
        const { settings } = get()
        get().updateSettings({ refreshInterval: interval })
        
        // Update portfolio refresh interval
        const { portfolio } = get()
        const updatedPortfolio = {
          ...portfolio,
          refreshInterval: interval
        }
        set({ portfolio: updatedPortfolio })
        
        // Restart auto-refresh
        if (settings.autoRefresh) {
          get().stopAutoRefresh()
          get().startAutoRefresh()
        }
      },

      // Data refresh actions
      refreshPrices: async () => {
        const { holdingsPortfolio, settings } = get()
        
        if (holdingsPortfolio.holdings.length === 0) {
          return
        }

        set({ isLoading: true, error: null })

        try {
          const assetIds = holdingsPortfolio.holdings.map(holding => holding.id)
          const { data: marketData, error } = await coinGeckoApi.getMarketData(assetIds, 'usd')

          if (error) {
            set({ error: error.message, isLoading: false })
            return
          }

          if (!marketData) {
            set({ error: 'No market data received', isLoading: false })
            return
          }

          // Update price data cache
          const updatedPriceData: Record<string, CryptoPriceData> = {}
          marketData.forEach(marketInfo => {
            updatedPriceData[marketInfo.id] = {
              id: marketInfo.id,
              currentPrice: marketInfo.current_price,
              priceChange24h: marketInfo.price_change_percentage_24h,
              lastUpdated: new Date(),
              image: marketInfo.image
            }
          })

          set({ 
            priceData: { ...get().priceData, ...updatedPriceData },
            isLoading: false,
            lastRefresh: new Date()
          })

          // Combine holdings with prices
          get().combineHoldingsWithPrices()

          // Refresh exchange rates if needed
          if (settings.currency !== 'USD') {
            await get().refreshExchangeRates()
          }

          // Calculate analytics and save snapshot
          get().calculateAnalytics()
          get().savePortfolioSnapshot()

        } catch (error) {
          console.error('Error refreshing prices:', error)
          set({ 
            error: error instanceof Error ? error.message : 'Failed to refresh prices',
            isLoading: false
          })
        }
      },

      refreshExchangeRates: async () => {
        const { settings } = get()
        
        if (settings.currency === 'USD') {
          return // No need to refresh if using USD
        }

        // Use fixed exchange rates
        const fixedRates = {
          'USD-SGD': { fromCurrency: 'USD', toCurrency: 'SGD', rate: 1.35, timestamp: new Date() },
          'USD-MYR': { fromCurrency: 'USD', toCurrency: 'MYR', rate: 4.48, timestamp: new Date() }
        }
        
        const rate = fixedRates[`USD-${settings.currency}`]
        if (rate) {
          set(state => ({
            exchangeRates: {
              ...state.exchangeRates,
              [`USD-${settings.currency}`]: rate
            }
          }))
        }
      },

      startAutoRefresh: () => {
        const { settings } = get()
        
        if (!settings.autoRefresh) {
          return
        }

        // Clear existing interval
        if (refreshInterval) {
          clearInterval(refreshInterval)
        }

        // Set new interval
        refreshInterval = setInterval(() => {
          // Only refresh if tab is visible
          if (!document.hidden) {
            get().refreshPrices()
          }
        }, settings.refreshInterval * 1000)

        // Initial refresh
        get().refreshPrices()
      },

      stopAutoRefresh: () => {
        if (refreshInterval) {
          clearInterval(refreshInterval)
          refreshInterval = null
        }
      },

      // Currency conversion
      convertAmount: (amount: number, fromCurrency = 'USD') => {
        const { settings, exchangeRates } = get()
        
        if (fromCurrency === settings.currency) {
          return amount
        }

        const rateKey = `${fromCurrency}-${settings.currency}`
        const rate = exchangeRates[rateKey]
        
        if (rate) {
          return amount * rate.rate
        }

        // Fallback: return original amount if no rate available
        return amount
      },

      // Analytics calculation
      calculateAnalytics: () => {
        const { portfolio, convertAmount } = get()
        
        if (portfolio.assets.length === 0) {
          set({ analytics: null })
          return
        }

        let totalValue = 0
        let totalChange24h = 0
        let topPerformer: { asset: CryptoAsset; changePercentage: number } | null = null
        let worstPerformer: { asset: CryptoAsset; changePercentage: number } | null = null
        const assetDistribution: { asset: CryptoAsset; value: number; percentage: number }[] = []

        // Calculate individual asset values and changes
        portfolio.assets.forEach(asset => {
          const currentPriceUSD = asset.currentPrice || 0
          const currentPrice = convertAmount(currentPriceUSD, 'USD')
          const value = currentPrice * asset.quantity
          const change24h = asset.priceChange24h || 0
          
          totalValue += value
          totalChange24h += (value * change24h) / 100

          // Track top and worst performers
          if (topPerformer === null || change24h > topPerformer.changePercentage) {
            topPerformer = { asset, changePercentage: change24h }
          }
          if (worstPerformer === null || change24h < worstPerformer.changePercentage) {
            worstPerformer = { asset, changePercentage: change24h }
          }

          assetDistribution.push({ asset, value, percentage: 0 })
        })

        // Calculate percentages
        assetDistribution.forEach(item => {
          item.percentage = totalValue > 0 ? (item.value / totalValue) * 100 : 0
        })

        // Sort by value (highest first)
        assetDistribution.sort((a, b) => b.value - a.value)

        const totalChangePercentage24h = totalValue > 0 ? (totalChange24h / totalValue) * 100 : 0

        const analytics: PortfolioAnalytics = {
          totalValue,
          totalChange24h,
          totalChangePercentage24h,
          topPerformer,
          worstPerformer,
          assetDistribution
        }

        set({ analytics })
      },

      // Portfolio snapshot for history
      savePortfolioSnapshot: () => {
        const { portfolio, portfolioHistory, analytics, convertAmount } = get()
        
        if (!analytics) {
          return
        }

        const snapshot: PortfolioSnapshot = {
          date: new Date(),
          totalValue: analytics.totalValue,
          assetValues: Object.fromEntries(
            portfolio.assets.map(asset => [
              asset.id,
              convertAmount((asset.currentPrice || 0) * asset.quantity, 'USD')
            ])
          )
        }

        // Keep only last 30 days of history
        const cutoffDate = new Date()
        cutoffDate.setDate(cutoffDate.getDate() - 30)
        
        const filteredHistory = portfolioHistory.filter(h => h.date >= cutoffDate)
        
        set({ 
          portfolioHistory: [...filteredHistory, snapshot]
        })
      },

      // Utility actions
      clearError: () => {
        set({ error: null })
      },

      reset: () => {
        get().stopAutoRefresh()
        set({
          holdingsPortfolio: defaultHoldingsPortfolio,
          priceData: {},
          portfolio: defaultPortfolio,
          portfolioHistory: [],
          settings: defaultSettings,
          isLoading: false,
          error: null,
          lastRefresh: null,
          analytics: null
        })
      },

    }),
    {
      name: 'crypto-portfolio-store',
      partialize: (state) => ({
        holdingsPortfolio: state.holdingsPortfolio,
        settings: state.settings
      }),
    }
  )
)

// Auto-start refresh when store is hydrated - only listen to autoRefresh setting changes
let previousAutoRefresh: boolean | undefined = undefined
usePortfolioStore.subscribe(
  (state) => {
    if (previousAutoRefresh !== state.settings.autoRefresh) {
      previousAutoRefresh = state.settings.autoRefresh
      if (state.settings.autoRefresh) {
        state.startAutoRefresh()
      } else {
        state.stopAutoRefresh()
      }
    }
  }
)

// Initialize holdings combination on first load
setTimeout(() => {
  const state = usePortfolioStore.getState()
  state.combineHoldingsWithPrices()
}, 100)

// Handle visibility change to pause/resume auto-refresh
document.addEventListener('visibilitychange', () => {
  const { settings, startAutoRefresh, stopAutoRefresh } = usePortfolioStore.getState()
  
  if (document.hidden) {
    // Tab is hidden, pause auto-refresh
    stopAutoRefresh()
  } else if (settings.autoRefresh) {
    // Tab is visible, resume auto-refresh
    startAutoRefresh()
  }
})