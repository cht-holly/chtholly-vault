/**
 * Yahoo Finance Exchange Rate API Service
 * 
 * Handles currency exchange rate retrieval for SGD, MYR, and USD.
 * Uses Yahoo Finance's public endpoints without API key requirement.
 */

import { APIError, APIResponse } from '../types/crypto'

const YAHOO_FINANCE_BASE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds

interface YahooFinanceResponse {
  chart: {
    result: Array<{
      meta: {
        symbol: string
        regularMarketPrice: number
        previousClose: number
        regularMarketTime: number
      }
      timestamp: number[]
      indicators: {
        quote: Array<{
          close: number[]
        }>
      }
    }>
    error: any
  }
}

export interface ExchangeRate {
  fromCurrency: string
  toCurrency: string
  rate: number
  timestamp: Date
  change24h?: number
  changePercent24h?: number
}

interface CacheEntry {
  data: ExchangeRate
  timestamp: number
  expiry: number
}

class ExchangeRateApiService {
  private cache = new Map<string, CacheEntry>()
  private lastRequestTime = 0
  private readonly REQUEST_DELAY = 1000 // 1 second between requests

  /**
   * Rate limiting for requests
   */
  private async rateLimitedRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    const now = Date.now()
    const timeSinceLastRequest = now - this.lastRequestTime

    if (timeSinceLastRequest < this.REQUEST_DELAY) {
      await new Promise(resolve => setTimeout(resolve, this.REQUEST_DELAY - timeSinceLastRequest))
    }

    this.lastRequestTime = Date.now()
    return requestFn()
  }

  /**
   * Check if cached data is still valid
   */
  private isCacheValid(cacheEntry: CacheEntry): boolean {
    return Date.now() < cacheEntry.expiry
  }

  /**
   * Get data from cache or return null if not found/expired
   */
  private getFromCache(key: string): ExchangeRate | null {
    const cached = this.cache.get(key)
    if (cached && this.isCacheValid(cached)) {
      return cached.data
    }
    if (cached) {
      this.cache.delete(key) // Remove expired cache
    }
    return null
  }

  /**
   * Set data in cache with expiry
   */
  private setCache(key: string, data: ExchangeRate): void {
    const timestamp = Date.now()
    this.cache.set(key, {
      data,
      timestamp,
      expiry: timestamp + CACHE_DURATION
    })
  }

  /**
   * Get currency pair symbol for Yahoo Finance
   */
  private getCurrencyPairSymbol(fromCurrency: string, toCurrency: string): string {
    // Handle direct pairs that Yahoo Finance supports
    if (fromCurrency === 'USD' && toCurrency === 'SGD') {
      return 'SGD=X'
    } else if (fromCurrency === 'USD' && toCurrency === 'MYR') {
      return 'MYR=X'
    } else if (fromCurrency === 'SGD' && toCurrency === 'MYR') {
      return 'SGDMYR=X'
    } else if (fromCurrency === 'SGD' && toCurrency === 'USD') {
      return 'SGDUSD=X'
    } else if (fromCurrency === 'MYR' && toCurrency === 'USD') {
      return 'MYRUSD=X'
    } else if (fromCurrency === 'MYR' && toCurrency === 'SGD') {
      return 'MYRSGD=X'
    }
    
    // Default to USD base pair
    return `${toCurrency}=X`
  }

  /**
   * Make HTTP request to Yahoo Finance API
   */
  private async makeRequest(symbol: string): Promise<YahooFinanceResponse> {
    const url = `${YAHOO_FINANCE_BASE_URL}/${symbol}?interval=1d&range=2d`
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    if (!response.ok) {
      const error: APIError = {
        message: `Failed to fetch exchange rate: ${response.status} ${response.statusText}`,
        status: response.status
      }
      throw error
    }

    return response.json()
  }

  /**
   * Get exchange rate between two currencies
   */
  async getExchangeRate(
    fromCurrency: string, 
    toCurrency: string
  ): Promise<APIResponse<ExchangeRate>> {
    try {
      // Return 1.0 for same currency
      if (fromCurrency === toCurrency) {
        return {
          data: {
            fromCurrency,
            toCurrency,
            rate: 1.0,
            timestamp: new Date()
          },
          error: null,
          isLoading: false
        }
      }

      const cacheKey = `${fromCurrency}-${toCurrency}`
      const cached = this.getFromCache(cacheKey)
      
      if (cached) {
        return {
          data: cached,
          error: null,
          isLoading: false
        }
      }

      const symbol = this.getCurrencyPairSymbol(fromCurrency, toCurrency)
      
      const response = await this.rateLimitedRequest(() => this.makeRequest(symbol))
      
      if (response.chart.error) {
        throw new Error(response.chart.error.description || 'Yahoo Finance API error')
      }

      const result = response.chart.result[0]
      if (!result) {
        throw new Error('No data received from Yahoo Finance')
      }

      const currentPrice = result.meta.regularMarketPrice
      const previousClose = result.meta.previousClose
      
      if (!currentPrice) {
        throw new Error('Invalid price data from Yahoo Finance')
      }

      // Calculate 24h change
      const change24h = previousClose ? currentPrice - previousClose : 0
      const changePercent24h = previousClose ? ((currentPrice - previousClose) / previousClose) * 100 : 0

      // Handle inverted rates (when we need the inverse of what Yahoo provides)
      let finalRate = currentPrice
      let finalChange = change24h
      let finalChangePercent = changePercent24h

      // If we need the inverse (e.g., SGD to USD when Yahoo gives USD to SGD)
      if ((fromCurrency === 'SGD' && toCurrency === 'USD') || 
          (fromCurrency === 'MYR' && toCurrency === 'USD') ||
          (fromCurrency === 'MYR' && toCurrency === 'SGD')) {
        finalRate = 1 / currentPrice
        finalChange = -change24h / (currentPrice * currentPrice)
        finalChangePercent = -changePercent24h
      }

      const exchangeRate: ExchangeRate = {
        fromCurrency,
        toCurrency,
        rate: finalRate,
        timestamp: new Date(result.meta.regularMarketTime * 1000),
        change24h: finalChange,
        changePercent24h: finalChangePercent
      }

      this.setCache(cacheKey, exchangeRate)

      return {
        data: exchangeRate,
        error: null,
        isLoading: false
      }
    } catch (error) {
      console.error('Error fetching exchange rate:', error)
      
      // Return fallback rate of 1.0 if both currencies are the same
      if (fromCurrency === toCurrency) {
        return {
          data: {
            fromCurrency,
            toCurrency,
            rate: 1.0,
            timestamp: new Date()
          },
          error: null,
          isLoading: false
        }
      }

      return {
        data: null,
        error: error as APIError,
        isLoading: false
      }
    }
  }

  /**
   * Get multiple exchange rates at once
   */
  async getMultipleExchangeRates(
    baseCurrency: string,
    targetCurrencies: string[]
  ): Promise<APIResponse<ExchangeRate[]>> {
    try {
      const promises = targetCurrencies.map(currency => 
        this.getExchangeRate(baseCurrency, currency)
      )

      const results = await Promise.all(promises)
      const exchangeRates: ExchangeRate[] = []
      const errors: string[] = []

      results.forEach((result, index) => {
        if (result.data) {
          exchangeRates.push(result.data)
        } else if (result.error) {
          errors.push(`${baseCurrency}-${targetCurrencies[index]}: ${result.error.message}`)
        }
      })

      if (exchangeRates.length === 0) {
        return {
          data: null,
          error: { message: `Failed to fetch any exchange rates: ${errors.join(', ')}` },
          isLoading: false
        }
      }

      return {
        data: exchangeRates,
        error: errors.length > 0 ? { message: `Some rates failed: ${errors.join(', ')}` } : null,
        isLoading: false
      }
    } catch (error) {
      console.error('Error fetching multiple exchange rates:', error)
      return {
        data: null,
        error: error as APIError,
        isLoading: false
      }
    }
  }

  /**
   * Convert amount from one currency to another
   */
  async convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): Promise<APIResponse<{ convertedAmount: number; exchangeRate: ExchangeRate }>> {
    try {
      const rateResponse = await this.getExchangeRate(fromCurrency, toCurrency)
      
      if (!rateResponse.data) {
        return {
          data: null,
          error: rateResponse.error || { message: 'Failed to get exchange rate' },
          isLoading: false
        }
      }

      const convertedAmount = amount * rateResponse.data.rate

      return {
        data: {
          convertedAmount,
          exchangeRate: rateResponse.data
        },
        error: null,
        isLoading: false
      }
    } catch (error) {
      console.error('Error converting currency:', error)
      return {
        data: null,
        error: error as APIError,
        isLoading: false
      }
    }
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    this.cache.clear()
  }
}

export const exchangeRateApi = new ExchangeRateApiService()
export default exchangeRateApi