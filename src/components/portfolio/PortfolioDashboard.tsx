/**
 * PortfolioDashboard Component
 * 
 * Main dashboard showing portfolio overview, assets, and real-time updates.
 */

import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '../ui/dropdown-menu'
import { usePortfolioStore } from '../../stores/portfolioStore'
import { AddAssetDialog } from '../crypto/AddAssetDialog'
import { EditAssetDialog } from '../crypto/EditAssetDialog'
import { ChartsPage } from '../charts/ChartsPage'
import { CryptoAsset } from '../../types/crypto'
import { 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  RefreshCw,
  AlertCircle,
  Clock,
  Edit,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Download,
  Upload,
  MoreVertical
} from 'lucide-react'
import { formatCurrency, formatPercentage, formatDate } from '../../utils/formatters'
import { Footer } from '../layout/Footer'

type SortOption = 'value' | 'name' | 'change' | 'quantity'
type SortDirection = 'asc' | 'desc'

export function PortfolioDashboard() {
  const [addAssetOpen, setAddAssetOpen] = useState(false)
  const [editAssetOpen, setEditAssetOpen] = useState(false)
  const [showCharts, setShowCharts] = useState(false)
  const [editingAsset, setEditingAsset] = useState<CryptoAsset | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('value')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const {
    portfolio,
    analytics,
    settings,
    isLoading,
    error,
    lastRefresh,
    refreshPrices,
    clearError,
    convertAmount,
    updateSettings,
    exportHoldings,
    importHoldings
  } = usePortfolioStore()

  // Calculate if we need to show empty state
  const isEmpty = portfolio.assets.length === 0

  // Auto-refresh on mount
  useEffect(() => {
    if (portfolio.assets.length > 0) {
      refreshPrices()
    }
  }, [])

  const handleRefresh = () => {
    refreshPrices()
  }

  const handleEditAsset = (asset: CryptoAsset) => {
    setEditingAsset(asset)
    setEditAssetOpen(true)
  }


  const handleToggleHideValues = async () => {
    await updateSettings({ hideValues: !settings.hideValues })
  }

  const formatHiddenValue = (value: string) => {
    if (settings.hideValues) {
      return '*'.repeat(Math.min(value.length, 8))
    }
    return value
  }

  const handleExportHoldings = () => {
    exportHoldings()
  }

  const handleImportHoldings = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string)
            if (data.holdings && Array.isArray(data.holdings)) {
              const holdings = data.holdings.map((h: any) => ({
                id: h.id,
                name: h.name,
                symbol: h.symbol,
                quantity: h.quantity,
                purchasePrice: h.purchasePrice,
                addedDate: h.addedDate ? new Date(h.addedDate) : new Date()
              }))
              importHoldings(holdings)
            } else {
              alert('Invalid holdings file format')
            }
          } catch (error) {
            alert('Error reading file: ' + error)
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const handleSort = (newSortBy: SortOption) => {
    if (sortBy === newSortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(newSortBy)
      setSortDirection('desc')
    }
  }

  const getSortedAssets = () => {
    return [...portfolio.assets].sort((a, b) => {
      let aValue: number | string
      let bValue: number | string

      switch (sortBy) {
        case 'value':
          aValue = convertAmount(a.currentPrice || 0, 'USD') * a.quantity
          bValue = convertAmount(b.currentPrice || 0, 'USD') * b.quantity
          break
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'change':
          aValue = a.priceChange24h || 0
          bValue = b.priceChange24h || 0
          break
        case 'quantity':
          aValue = a.quantity
          bValue = b.quantity
          break
        default:
          return 0
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }

      return 0
    })
  }

  // Show charts page if requested
  if (showCharts) {
    return <ChartsPage onBack={() => setShowCharts(false)} />
  }

  if (isEmpty) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Empty State */}
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <DollarSign className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Start Building Your Portfolio</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Add your first cryptocurrency to begin tracking your portfolio's performance 
              with real-time prices and analytics.
            </p>
            
            {/* Desktop Empty State Actions */}
            <div className="hidden lg:flex gap-4 justify-center">
              <Button onClick={() => setAddAssetOpen(true)} size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Asset
              </Button>
              <Button onClick={handleImportHoldings} variant="outline" size="lg">
                <Upload className="h-4 w-4 mr-2" />
                Import Holdings
              </Button>
            </div>
            
            {/* Mobile Empty State Actions */}
            <div className="lg:hidden space-y-4">
              <p className="text-sm text-muted-foreground">
                Tap "Add Asset" below to get started
              </p>
              <Button onClick={handleImportHoldings} variant="outline" size="lg" className="w-full max-w-xs">
                <Upload className="h-4 w-4 mr-2" />
                Or Import Holdings
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile FAB for Empty State */}
        <div className="lg:hidden fixed bottom-6 right-4 z-50">
          <Button
            onClick={() => setAddAssetOpen(true)}
            size="lg"
            className="flex items-center gap-2 px-4 py-3 h-auto rounded-full shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium text-sm">Add Asset</span>
          </Button>
        </div>
        
        <AddAssetDialog 
          open={addAssetOpen} 
          onOpenChange={setAddAssetOpen}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Desktop Header - unchanged */}
        <div className="hidden lg:flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Portfolio Dashboard</h1>
            <p className="text-muted-foreground">
              Track your cryptocurrency investments in real-time
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleImportHoldings}
              title="Import holdings from JSON"
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportHoldings}
              title="Export holdings to JSON"
              disabled={isEmpty}
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleHideValues}
              title={settings.hideValues ? 'Show values' : 'Hide values'}
            >
              {settings.hideValues ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="h-8"
              aria-label={isLoading ? 'Refreshing prices...' : 'Refresh prices'}
              title={isLoading ? 'Refreshing prices...' : 'Refresh prices'}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Button onClick={() => setAddAssetOpen(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
          </div>
        </div>

        {/* Mobile Header - Clean & Minimal */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Portfolio</h1>
              <p className="text-sm text-muted-foreground">
                Track your crypto investments
              </p>
            </div>
            
            {/* Mobile Action Bar */}
            <div className="flex items-center gap-2">
              {/* Quick Refresh */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="h-9 w-9 p-0"
                aria-label={isLoading ? 'Refreshing prices...' : 'Refresh prices'}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
              
              {/* Smart Actions Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setAddAssetOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Asset
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleToggleHideValues}>
                    {settings.hideValues ? (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Show Values
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-4 w-4 mr-2" />
                        Hide Values
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleImportHoldings}>
                    <Upload className="h-4 w-4 mr-2" />
                    Import Holdings
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleExportHoldings}
                    disabled={isEmpty}
                    className={isEmpty ? 'opacity-50' : ''}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Holdings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-red-800 font-medium">Error Loading Data</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={clearError}>
                  <span className="sr-only">Dismiss</span>
                  ×
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Portfolio Overview */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatHiddenValue(formatCurrency(analytics.totalValue, settings.currency))}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {analytics.totalChangePercentage24h >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <div className={`text-sm font-medium ${
                    analytics.totalChangePercentage24h >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <div className="flex items-center gap-1">
                      <span>{formatPercentage(analytics.totalChangePercentage24h)}</span>
                      <span>
                        ({analytics.totalChangePercentage24h >= 0 ? '+' : ''}{formatHiddenValue(formatCurrency(analytics.totalChange24h, settings.currency))})
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">24h</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Best Performer
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analytics.topPerformer ? (
                  <div>
                    <div className="text-lg font-bold">
                      {analytics.topPerformer.asset.symbol}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        {formatPercentage(analytics.topPerformer.changePercentage)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    No data available
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Worst Performer
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analytics.worstPerformer ? (
                  <div>
                    <div className="text-lg font-bold">
                      {analytics.worstPerformer.asset.symbol}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <TrendingDown className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium text-red-600">
                        {formatPercentage(analytics.worstPerformer.changePercentage)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    No data available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Assets List */}
        <Card>
          <CardHeader className="pb-4">
            {/* Clean Header */}
            <CardTitle className="text-2xl font-bold mb-2">Your Assets</CardTitle>
            
            {/* Sort Controls with Last Updated on same line */}
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
                <div className="flex gap-1">
                <Button
                  variant={sortBy === 'value' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSort('value')}
                  className="h-8"
                >
                  Value
                  {sortBy === 'value' && (
                    sortDirection === 'desc' ? <ArrowDown className="h-3 w-3 ml-1" /> : <ArrowUp className="h-3 w-3 ml-1" />
                  )}
                </Button>
                <Button
                  variant={sortBy === 'name' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSort('name')}
                  className="h-8"
                >
                  Name
                  {sortBy === 'name' && (
                    sortDirection === 'desc' ? <ArrowDown className="h-3 w-3 ml-1" /> : <ArrowUp className="h-3 w-3 ml-1" />
                  )}
                </Button>
                <Button
                  variant={sortBy === 'change' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSort('change')}
                  className="h-8"
                >
                  Change
                  {sortBy === 'change' && (
                    sortDirection === 'desc' ? <ArrowDown className="h-3 w-3 ml-1" /> : <ArrowUp className="h-3 w-3 ml-1" />
                  )}
                </Button>
                <Button
                  variant={sortBy === 'quantity' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSort('quantity')}
                  className="h-8"
                >
                  Quantity
                  {sortBy === 'quantity' && (
                    sortDirection === 'desc' ? <ArrowDown className="h-3 w-3 ml-1" /> : <ArrowUp className="h-3 w-3 ml-1" />
                  )}
                </Button>
                </div>
              </div>
              
              {/* Last Updated - moved to same line as sort controls */}
              {lastRefresh && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1.5 rounded-md">
                  <Clock className="h-3.5 w-3.5" />
                  {formatDate(lastRefresh)}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getSortedAssets().map((asset) => {
                const currentPriceUSD = asset.currentPrice || 0
                const currentPrice = convertAmount(currentPriceUSD, 'USD')
                const currentValue = currentPrice * asset.quantity
                const priceChange = asset.priceChange24h || 0
                const absoluteChange24h = currentValue * (priceChange / 100)
                const profitLoss = asset.purchasePrice 
                  ? convertAmount((currentPriceUSD - asset.purchasePrice) * asset.quantity, 'USD')
                  : null

                return (
                  <div
                    key={asset.id}
                    className="flex flex-col sm:grid sm:grid-cols-12 sm:items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors group gap-3 sm:gap-0"
                  >
                    {/* Mobile Layout - Stack vertically */}
                    <div className="sm:hidden space-y-3">
                      {/* Asset Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {asset.image && (
                            <img 
                              src={asset.image} 
                              alt={asset.name}
                              className="w-6 h-6 rounded-full flex-shrink-0"
                            />
                          )}
                          <span className="font-medium">{asset.name}</span>
                          <Badge variant="outline" className="shrink-0">{asset.symbol}</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditAsset(asset)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Quantity and Value */}
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          {asset.quantity} {asset.symbol}
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {formatHiddenValue(formatCurrency(currentValue, settings.currency))}
                          </div>
                          {priceChange !== 0 && (
                            <div className="flex items-center justify-end gap-1 text-xs">
                              {priceChange >= 0 ? (
                                <TrendingUp className="h-3 w-3 text-green-600" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-red-600" />
                              )}
                              <span className={`font-medium ${
                                priceChange >= 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {formatPercentage(priceChange)}
                              </span>
                            </div>
                          )}
                          {profitLoss !== null && (
                            <div className={`text-xs ${
                              profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              P&L: {formatHiddenValue(formatCurrency(profitLoss, settings.currency))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout - Grid */}
                    {/* Asset Info - 6 columns */}
                    <div className="hidden sm:block sm:col-span-6">
                      <div className="flex items-center gap-4">
                        {asset.image && (
                          <img 
                            src={asset.image} 
                            alt={asset.name}
                            className="w-8 h-8 rounded-full flex-shrink-0"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium truncate">{asset.name}</span>
                            <Badge variant="outline" className="shrink-0">{asset.symbol}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {asset.quantity} {asset.symbol}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price & Change - 5 columns */}
                    <div className="hidden sm:block sm:col-span-5 sm:text-right">
                      <div className="font-medium">
                        {formatHiddenValue(formatCurrency(currentValue, settings.currency))}
                      </div>
                      <div className="flex items-center justify-end gap-2 text-sm">
                        {priceChange !== 0 && (
                          <>
                            {priceChange >= 0 ? (
                              <TrendingUp className="h-3 w-3 text-green-600" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-600" />
                            )}
                            <span className={`font-medium ${
                              priceChange >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {formatPercentage(priceChange)} ({priceChange >= 0 ? '+' : ''}{formatHiddenValue(formatCurrency(absoluteChange24h, settings.currency))})
                            </span>
                          </>
                        )}
                      </div>
                      {profitLoss !== null && (
                        <div className={`text-xs ${
                          profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          P&L: {formatHiddenValue(formatCurrency(profitLoss, settings.currency))}
                        </div>
                      )}
                    </div>

                    {/* Actions - 1 column */}
                    <div className="hidden sm:flex sm:col-span-1 sm:justify-end">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditAsset(asset)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Floating Action Button - Primary Action */}
      <div className="lg:hidden fixed bottom-6 right-4 z-50">
        <Button
          onClick={() => setAddAssetOpen(true)}
          size="lg"
          className="flex items-center gap-2 px-4 py-3 h-auto rounded-full shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium text-sm">Add Asset</span>
        </Button>
      </div>

      <AddAssetDialog 
        open={addAssetOpen} 
        onOpenChange={setAddAssetOpen}
      />
      
      <EditAssetDialog 
        open={editAssetOpen} 
        onOpenChange={setEditAssetOpen}
        asset={editingAsset}
      />

      {/* Footer */}
      <Footer className="mt-12 sm:mt-16 lg:mt-20" />
    </div>
  )
}