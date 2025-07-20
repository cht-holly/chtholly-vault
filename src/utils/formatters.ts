/**
 * Utility functions for formatting data display
 */

/**
 * Format currency values
 */
export function formatCurrency(value: number, currency = 'USD', decimals = 2): string {
  if (value === 0) {
    const symbol = getCurrencySymbol(currency)
    return `${symbol}0.00`
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value)
}

/**
 * Get currency symbol for a given currency code
 */
export function getCurrencySymbol(currency: string): string {
  switch (currency.toUpperCase()) {
    case 'USD':
      return '$'
    case 'SGD':
      return 'S$'
    case 'MYR':
      return 'RM'
    case 'CNY':
      return '¥'
    default:
      return currency
  }
}

/**
 * Format percentage values
 */
export function formatPercentage(value: number, decimals = 2): string {
  if (value === 0) return '0.00%'
  
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(decimals)}%`
}

/**
 * Format large numbers with appropriate suffixes
 */
export function formatNumber(value: number, decimals = 2): string {
  if (value === 0) return '0'
  
  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''
  
  if (abs >= 1e12) {
    return `${sign}${(abs / 1e12).toFixed(decimals)}T`
  } else if (abs >= 1e9) {
    return `${sign}${(abs / 1e9).toFixed(decimals)}B`
  } else if (abs >= 1e6) {
    return `${sign}${(abs / 1e6).toFixed(decimals)}M`
  } else if (abs >= 1e3) {
    return `${sign}${(abs / 1e3).toFixed(decimals)}K`
  } else {
    return `${sign}${abs.toFixed(decimals)}`
  }
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

/**
 * Format date for charts
 */
export function formatChartDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric'
  }).format(date)
}

/**
 * Format time for display
 */
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date)
}

/**
 * Format market cap with appropriate currency formatting
 */
export function formatMarketCap(value: number): string {
  if (value === 0) return '$0'
  
  const formatted = formatNumber(value)
  return `$${formatted}`
}

/**
 * Format crypto quantity with dynamic decimal places
 */
export function formatCryptoQuantity(quantity: number, symbol: string): string {
  let decimals = 4
  
  // Use more decimals for very small amounts
  if (quantity < 0.01) {
    decimals = 8
  } else if (quantity < 1) {
    decimals = 6
  } else if (quantity < 10) {
    decimals = 4
  } else {
    decimals = 2
  }
  
  return `${quantity.toFixed(decimals)} ${symbol}`
}

/**
 * Format price with appropriate decimal places
 */
export function formatPrice(price: number): string {
  if (price === 0) return '$0.00'
  
  let decimals = 2
  
  if (price < 0.01) {
    decimals = 8
  } else if (price < 1) {
    decimals = 6
  } else if (price < 10) {
    decimals = 4
  }
  
  return formatCurrency(price, 'USD', decimals)
}

/**
 * Format duration in human readable format
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m`
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600)
    return `${hours}h`
  } else {
    const days = Math.floor(seconds / 86400)
    return `${days}d`
  }
}

/**
 * Format refresh interval for display
 */
export function formatRefreshInterval(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} seconds`
  } else {
    const minutes = Math.floor(seconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''}`
  }
}