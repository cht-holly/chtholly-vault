/**
 * Crypto Portfolio Monitor - Type Definitions
 * 
 * TypeScript interfaces for cryptocurrency portfolio management
 */

// Holdings data (persistent - what user owns)
export interface CryptoHolding {
  id: string; // CoinGecko ID (required for API calls)
  symbol: string; // e.g., "BTC"
  name: string; // e.g., "Bitcoin"
  quantity: number; // User's holdings
  purchasePrice?: number; // Optional: user's average purchase price
  targetMultiplier?: number; // Optional: target profit multiplier (e.g., 1.5 = 150%)
  addedDate: Date; // When user added this asset
  image?: string; // Logo URL from CoinGecko
}

// Price data (cached - from API)
export interface CryptoPriceData {
  id: string;
  currentPrice: number;
  priceChange24h: number;
  lastUpdated: Date;
  image?: string; // Logo URL from API
}

// Combined view for UI
export interface CryptoAsset extends CryptoHolding {
  currentPrice?: number; // Current market price
  priceChange24h?: number; // 24h price change percentage
  lastUpdated?: Date; // When price was last updated
}

// Holdings portfolio (persistent)
export interface HoldingsPortfolio {
  id: string;
  name: string;
  holdings: CryptoHolding[];
  createdDate: Date;
  lastUpdated: Date;
}

// Combined portfolio for UI
export interface Portfolio {
  id: string;
  name: string;
  assets: CryptoAsset[];
  createdDate: Date;
  lastUpdated: Date;
  refreshInterval: number; // Price refresh interval in seconds (default: 60)
}

export interface PortfolioSnapshot {
  date: Date;
  totalValue: number;
  assetValues: Record<string, number>;
}

export interface CryptoListItem {
  id: string; // CoinGecko ID
  symbol: string;
  name: string;
  image?: string; // Logo URL
  marketCap?: number;
  rank?: number;
}

export interface AppSettings {
  refreshInterval: number; // Default: 60 seconds
  currency: 'USD' | 'SGD' | 'MYR' | 'CNY' | 'JPY' | 'KRW' | 'TWD' | 'EUR'; // Default: 'USD'
  theme: 'light' | 'dark' | 'system';
  autoRefresh: boolean; // Default: true
  hideValues: boolean; // Default: false
  showPricesInUSD: boolean; // Default: false - Show unit prices always in USD regardless of currency setting
  showTargetPrices: boolean; // Default: false - Show target prices using multiplier instead of current prices
}

// CoinGecko API Response Types
export interface CoinGeckoListResponse {
  id: string;
  symbol: string;
  name: string;
}

export interface CoinGeckoMarketResponse {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
}

export interface CoinGeckoHistoricalResponse {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

// Portfolio Analytics Types
export interface PortfolioAnalytics {
  totalValue: number;
  totalChange24h: number;
  totalChangePercentage24h: number;
  totalProfitLoss: number;
  totalProfitLossPercentage: number;
  topPerformer: {
    asset: CryptoAsset;
    changePercentage: number;
  } | null;
  worstPerformer: {
    asset: CryptoAsset;
    changePercentage: number;
  } | null;
  assetDistribution: {
    asset: CryptoAsset;
    value: number;
    percentage: number;
  }[];
}

// Chart Data Types
export interface ChartDataPoint {
  timestamp: number;
  date: string;
  value: number;
}

export interface AssetChartData {
  assetId: string;
  assetName: string;
  data: ChartDataPoint[];
}

// API Service Types
export interface APIError {
  message: string;
  status?: number;
  code?: string;
}

export interface APIResponse<T> {
  data: T | null;
  error: APIError | null;
  isLoading: boolean;
}