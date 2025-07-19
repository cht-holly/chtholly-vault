/**
 * CoinGecko API Service
 * 
 * Handles all interactions with the CoinGecko API for cryptocurrency data.
 * Implements caching, rate limiting, and error handling.
 */

import { 
  CoinGeckoListResponse, 
  CoinGeckoMarketResponse, 
  CoinGeckoHistoricalResponse,
  CryptoListItem,
  APIError,
  APIResponse
} from '../types/crypto'

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds
const CRYPTO_LIST_CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours for crypto list

interface CacheEntry<T> {
  data: T
  timestamp: number
  expiry: number
}

class CoinGeckoApiService {
  private cache = new Map<string, CacheEntry<any>>()
  private requestQueue: Array<() => Promise<void>> = []
  private isProcessingQueue = false
  private lastRequestTime = 0
  private readonly REQUEST_DELAY = 1000 // 1 second between requests to respect rate limits

  /**
   * Add request to queue to manage rate limiting
   */
  private async queueRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.requestQueue.push(async () => {
        try {
          const result = await requestFn()
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
      this.processQueue()
    })
  }

  /**
   * Process the request queue with rate limiting
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessingQueue || this.requestQueue.length === 0) {
      return
    }

    this.isProcessingQueue = true

    while (this.requestQueue.length > 0) {
      const now = Date.now()
      const timeSinceLastRequest = now - this.lastRequestTime

      if (timeSinceLastRequest < this.REQUEST_DELAY) {
        await new Promise(resolve => setTimeout(resolve, this.REQUEST_DELAY - timeSinceLastRequest))
      }

      const request = this.requestQueue.shift()
      if (request) {
        this.lastRequestTime = Date.now()
        await request()
      }
    }

    this.isProcessingQueue = false
  }

  /**
   * Check if cached data is still valid
   */
  private isCacheValid<T>(cacheEntry: CacheEntry<T>): boolean {
    return Date.now() < cacheEntry.expiry
  }

  /**
   * Get data from cache or return null if not found/expired
   */
  private getFromCache<T>(key: string): T | null {
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
  private setCache<T>(key: string, data: T, duration: number): void {
    const timestamp = Date.now()
    this.cache.set(key, {
      data,
      timestamp,
      expiry: timestamp + duration
    })
  }

  /**
   * Make HTTP request with error handling
   */
  private async makeRequest<T>(url: string): Promise<T> {
    const response = await fetch(url)
    
    if (!response.ok) {
      const error: APIError = {
        message: `HTTP Error: ${response.status} ${response.statusText}`,
        status: response.status
      }
      
      if (response.status === 429) {
        error.message = 'Rate limit exceeded. Please try again later.'
        error.code = 'RATE_LIMIT_EXCEEDED'
      } else if (response.status >= 500) {
        error.message = 'CoinGecko API is temporarily unavailable. Please try again later.'
        error.code = 'SERVER_ERROR'
      }
      
      throw error
    }

    return response.json()
  }

  /**
   * Get complete list of all cryptocurrencies
   */
  async getCryptocurrencyList(): Promise<APIResponse<CryptoListItem[]>> {
    try {
      const cacheKey = 'crypto-list'
      const cached = this.getFromCache<CryptoListItem[]>(cacheKey)
      
      if (cached) {
        return {
          data: cached,
          error: null,
          isLoading: false
        }
      }

      const data = await this.queueRequest<CoinGeckoListResponse[]>(() =>
        this.makeRequest(`${COINGECKO_BASE_URL}/coins/list`)
      )

      const cryptoList: CryptoListItem[] = data.map(item => ({
        id: item.id,
        symbol: item.symbol.toUpperCase(),
        name: item.name
      }))

      this.setCache(cacheKey, cryptoList, CRYPTO_LIST_CACHE_DURATION)

      return {
        data: cryptoList,
        error: null,
        isLoading: false
      }
    } catch (error) {
      console.error('Error fetching cryptocurrency list:', error)
      return {
        data: null,
        error: error as APIError,
        isLoading: false
      }
    }
  }

  /**
   * Get market data for specific cryptocurrencies
   */
  async getMarketData(coinIds: string[], currency = 'usd'): Promise<APIResponse<CoinGeckoMarketResponse[]>> {
    try {
      if (coinIds.length === 0) {
        return {
          data: [],
          error: null,
          isLoading: false
        }
      }

      const cacheKey = `market-data-${coinIds.join(',')}-${currency}`
      const cached = this.getFromCache<CoinGeckoMarketResponse[]>(cacheKey)
      
      if (cached) {
        return {
          data: cached,
          error: null,
          isLoading: false
        }
      }

      const idsParam = coinIds.join(',')
      const url = `${COINGECKO_BASE_URL}/coins/markets?vs_currency=${currency}&ids=${idsParam}&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h`

      const data = await this.queueRequest<CoinGeckoMarketResponse[]>(() =>
        this.makeRequest(url)
      )

      this.setCache(cacheKey, data, CACHE_DURATION)

      return {
        data,
        error: null,
        isLoading: false
      }
    } catch (error) {
      console.error('Error fetching market data:', error)
      return {
        data: null,
        error: error as APIError,
        isLoading: false
      }
    }
  }

  /**
   * Get historical price data for a specific cryptocurrency
   */
  async getHistoricalData(
    coinId: string, 
    days: number = 30, 
    currency = 'usd'
  ): Promise<APIResponse<CoinGeckoHistoricalResponse>> {
    try {
      const cacheKey = `historical-${coinId}-${days}-${currency}`
      const cached = this.getFromCache<CoinGeckoHistoricalResponse>(cacheKey)
      
      if (cached) {
        return {
          data: cached,
          error: null,
          isLoading: false
        }
      }

      const url = `${COINGECKO_BASE_URL}/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`

      const data = await this.queueRequest<CoinGeckoHistoricalResponse>(() =>
        this.makeRequest(url)
      )

      // Cache historical data for longer since it doesn't change
      this.setCache(cacheKey, data, CACHE_DURATION * 2)

      return {
        data,
        error: null,
        isLoading: false
      }
    } catch (error) {
      console.error('Error fetching historical data:', error)
      return {
        data: null,
        error: error as APIError,
        isLoading: false
      }
    }
  }

  /**
   * Search cryptocurrencies by name or symbol
   */
  async searchCryptocurrencies(query: string): Promise<APIResponse<CryptoListItem[]>> {
    try {
      const { data: allCryptos, error } = await this.getCryptocurrencyList()
      
      if (error || !allCryptos) {
        return {
          data: null,
          error: error || { message: 'Failed to load cryptocurrency list' },
          isLoading: false
        }
      }

      const normalizedQuery = query.toLowerCase().trim()
      const results = allCryptos.filter(crypto => 
        crypto.name.toLowerCase().includes(normalizedQuery) ||
        crypto.symbol.toLowerCase().includes(normalizedQuery) ||
        crypto.id.toLowerCase().includes(normalizedQuery)
      )

      // Sort results by relevance (exact matches first, then starts with, then contains)
      results.sort((a, b) => {
        const aName = a.name.toLowerCase()
        const aSymbol = a.symbol.toLowerCase()
        const bName = b.name.toLowerCase()
        const bSymbol = b.symbol.toLowerCase()

        // Exact matches first
        if (aSymbol === normalizedQuery) return -1
        if (bSymbol === normalizedQuery) return 1
        if (aName === normalizedQuery) return -1
        if (bName === normalizedQuery) return 1

        // Starts with matches
        if (aSymbol.startsWith(normalizedQuery) && !bSymbol.startsWith(normalizedQuery)) return -1
        if (bSymbol.startsWith(normalizedQuery) && !aSymbol.startsWith(normalizedQuery)) return 1
        if (aName.startsWith(normalizedQuery) && !bName.startsWith(normalizedQuery)) return -1
        if (bName.startsWith(normalizedQuery) && !aName.startsWith(normalizedQuery)) return 1

        // Alphabetical order for the rest
        return aName.localeCompare(bName)
      })

      return {
        data: results.slice(0, 50), // Limit to 50 results
        error: null,
        isLoading: false
      }
    } catch (error) {
      console.error('Error searching cryptocurrencies:', error)
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

  /**
   * Get popular cryptocurrencies (top 100 by market cap)
   */
  async getPopularCryptocurrencies(currency = 'usd'): Promise<APIResponse<CoinGeckoMarketResponse[]>> {
    try {
      const cacheKey = `popular-cryptos-${currency}`
      const cached = this.getFromCache<CoinGeckoMarketResponse[]>(cacheKey)
      
      if (cached) {
        return {
          data: cached,
          error: null,
          isLoading: false
        }
      }

      const url = `${COINGECKO_BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`

      const data = await this.queueRequest<CoinGeckoMarketResponse[]>(() =>
        this.makeRequest(url)
      )

      this.setCache(cacheKey, data, CACHE_DURATION)

      return {
        data,
        error: null,
        isLoading: false
      }
    } catch (error) {
      console.error('Error fetching popular cryptocurrencies:', error)
      return {
        data: null,
        error: error as APIError,
        isLoading: false
      }
    }
  }
}

export const coinGeckoApi = new CoinGeckoApiService()
export default coinGeckoApi