/**
 * PortfolioChart Component
 * 
 * Shows historical portfolio value calculated from individual crypto historical prices.
 */

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { usePortfolioStore } from '../../stores/portfolioStore'
import { formatCurrency } from '../../utils/formatters'
import { TrendingUp, TrendingDown, BarChart3, Loader2 } from 'lucide-react'

interface PortfolioChartProps {
  className?: string
}

interface ChartDataPoint {
  date: string
  value: number
  timestamp: number
}

export function PortfolioChart({ className }: PortfolioChartProps) {
  const { portfolio, analytics, settings } = usePortfolioStore()
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [timeRange, setTimeRange] = useState<'7' | '14' | '30'>('30')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Temporarily disabled to avoid API rate limits
    // if (portfolio.assets.length > 0) {
    //   calculatePortfolioHistory()
    // } else {
    //   setChartData([])
    // }
    setChartData([])
  }, [portfolio.assets, timeRange, settings.currency])

  const calculatePortfolioHistory = async () => {
    // Temporarily disabled to avoid API rate limits
    console.log('Chart API calls disabled to avoid rate limits')
    setChartData([])
    setIsLoading(false)
    setError('Charts temporarily disabled to avoid API rate limits')
  }

  const timeRangeOptions = [
    { value: '7', label: '7D' },
    { value: '14', label: '14D' },
    { value: '30', label: '30D' }
  ]

  const calculateChange = () => {
    if (chartData.length < 2) return { change: 0, changePercent: 0 }
    
    const firstValue = chartData[0].value
    const lastValue = chartData[chartData.length - 1].value
    const change = lastValue - firstValue
    const changePercent = firstValue > 0 ? (change / firstValue) * 100 : 0
    
    return { change, changePercent }
  }

  const { change, changePercent } = calculateChange()
  const isPositive = change >= 0

  const formatTooltipValue = (value: number) => {
    return formatCurrency(value, settings.currency)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Portfolio Value
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground">
                  {analytics ? formatCurrency(analytics.totalValue, settings.currency) : 'Loading...'}
                </span>
                {chartData.length > 1 && (
                  <div className={`flex items-center gap-1 text-sm ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>
                      {isPositive ? '+' : ''}{formatCurrency(change, settings.currency)} 
                      ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {timeRangeOptions.map((option) => (
              <Button
                key={option.value}
                variant={timeRange === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(option.value as '7' | '14' | '30')}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Loading portfolio history...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-red-600 mb-2">Error loading chart</p>
                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={calculatePortfolioHistory}
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground mb-2">No portfolio data</p>
                <p className="text-sm text-muted-foreground">
                  Add cryptocurrencies to see historical performance
                </p>
              </div>
            </div>
          ) : chartData.length < 2 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground mb-2">Building history...</p>
                <p className="text-sm text-muted-foreground">
                  Need more data points to show trends
                </p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 20,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} />
                <XAxis 
                  dataKey="date"
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => formatCurrency(value, settings.currency, 0)}
                />
                <Tooltip 
                  formatter={(value: number) => [formatTooltipValue(value), 'Portfolio Value']}
                  labelFormatter={(label) => `Date: ${label}`}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? '#16a34a' : '#dc2626'}
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ 
                    r: 6, 
                    fill: isPositive ? '#16a34a' : '#dc2626',
                    stroke: 'hsl(var(--background))',
                    strokeWidth: 2
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}