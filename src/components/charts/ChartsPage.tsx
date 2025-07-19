/**
 * ChartsPage Component
 * 
 * Main page for displaying portfolio and individual asset charts.
 */

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { AssetChart } from './AssetChart'
import { PortfolioChart } from './PortfolioChart'
import { usePortfolioStore } from '../../stores/portfolioStore'
import { CryptoAsset } from '../../types/crypto'
import { BarChart3, TrendingUp, ArrowLeft } from 'lucide-react'

interface ChartsPageProps {
  onBack?: () => void
}

export function ChartsPage({ onBack }: ChartsPageProps) {
  const { portfolio } = usePortfolioStore()
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset | null>(null)
  const [viewMode, setViewMode] = useState<'portfolio' | 'assets'>('portfolio')

  const isEmpty = portfolio.assets.length === 0

  if (isEmpty) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
          )}
          
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No Data to Chart</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Add some cryptocurrencies to your portfolio to see charts and analytics.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold">Charts & Analytics</h1>
              <p className="text-muted-foreground">
                Visualize your portfolio performance and individual asset trends
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'portfolio' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('portfolio')}
            >
              Portfolio
            </Button>
            <Button
              variant={viewMode === 'assets' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('assets')}
            >
              Assets
            </Button>
          </div>
        </div>

        {/* Portfolio Chart */}
        {viewMode === 'portfolio' && (
          <div className="space-y-6">
            <PortfolioChart />
            
            {/* Asset Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Your Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {portfolio.assets.map((asset) => (
                    <div
                      key={asset.id}
                      className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedAsset(asset)
                        setViewMode('assets')
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{asset.symbol}</Badge>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{asset.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {asset.quantity} {asset.symbol}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Individual Asset Charts */}
        {viewMode === 'assets' && (
          <div className="space-y-6">
            {/* Asset Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Asset to View</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {portfolio.assets.map((asset) => (
                    <Button
                      key={asset.id}
                      variant={selectedAsset?.id === asset.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedAsset(asset)}
                    >
                      {asset.symbol}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected Asset Chart */}
            {selectedAsset ? (
              <AssetChart asset={selectedAsset} />
            ) : (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Select an asset above to view its price chart
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}