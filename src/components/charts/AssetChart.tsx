/**
 * AssetChart Component
 * 
 * Historical price chart for individual cryptocurrency assets.
 * Shows price movement over time with interactive features.
 */

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { CryptoAsset, ChartDataPoint } from '../../types/crypto'
import { usePortfolioStore } from '../../stores/portfolioStore'
import { formatCurrency } from '../../utils/formatters'
import { TrendingUp, TrendingDown, Loader2 } from 'lucide-react'

interface AssetChartProps {
  asset: CryptoAsset
  className?: string
}

export function AssetChart({ asset, className }: AssetChartProps) {
  const { settings, convertAmount } = usePortfolioStore()
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<'7' | '30' | '90'>('30')

  useEffect(() => {
    // Temporarily disabled to avoid API rate limits
    // loadChartData()
    setChartData([])
    setIsLoading(false)
    setError('Charts temporarily disabled to avoid API rate limits')
  }, [asset.id, timeRange])

  const loadChartData = async () => {
    // Temporarily disabled to avoid API rate limits
    console.log('Chart API calls disabled to avoid rate limits')
    setChartData([])
    setIsLoading(false)
    setError('Charts temporarily disabled to avoid API rate limits')
    return

      // // Convert price data to chart format
      // const processedData: ChartDataPoint[] = data.prices.map(([timestamp, price]) => ({
      //   timestamp,
      //   date: new Date(timestamp).toLocaleDateString(),
      //   value: convertAmount(price, 'USD')
      // }))

      // setChartData(processedData)
    // } catch (err) {
    //   console.error('Error loading chart data:', err)
    //   setError('Failed to load chart data')
    // } finally {
    //   setIsLoading(false)
    // }
  }

  const timeRangeOptions = [
    { value: '7', label: '7D' },
    { value: '30', label: '30D' },
    { value: '90', label: '90D' }
  ]

  const currentPrice = convertAmount(asset.currentPrice || 0, 'USD')
  const priceChange = asset.priceChange24h || 0
  const isPositive = priceChange >= 0

  const formatTooltipValue = (value: number) => {
    return formatCurrency(value, settings.currency)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <CardTitle className="text-lg">{asset.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{asset.symbol}</Badge>
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(currentPrice, settings.currency)}
                </span>
                <div className={`flex items-center gap-1 text-sm ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>{isPositive ? '+' : ''}{priceChange.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {timeRangeOptions.map((option) => (
              <Button
                key={option.value}
                variant={timeRange === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(option.value as '7' | '30' | '90')}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-red-600 mb-2">Error loading chart</p>
                <p className="text-sm text-muted-foreground">{error}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={loadChartData}
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No data available</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => formatCurrency(value, settings.currency, 0)}
                />
                <Tooltip 
                  formatter={(value: number) => [formatTooltipValue(value), 'Price']}
                  labelFormatter={(label) => `Date: ${label}`}
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? '#16a34a' : '#dc2626'}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}