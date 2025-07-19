/**
 * CryptoSearch Component
 * 
 * Provides search functionality for cryptocurrencies with autocomplete,
 * popular suggestions, and easy selection interface.
 */

import { useState, useEffect, useRef } from 'react'
import { Search, TrendingUp, Plus, X } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { CryptoListItem } from '../../types/crypto'
import { coinGeckoApi } from '../../services/coinGeckoApi'

interface CryptoSearchProps {
  onSelect: (crypto: CryptoListItem) => void
  onClose?: () => void
  excludeIds?: string[]
  placeholder?: string
  showPopular?: boolean
  maxResults?: number
}

export function CryptoSearch({ 
  onSelect, 
  onClose, 
  excludeIds = [],
  placeholder = "Search cryptocurrencies...",
  showPopular = true,
  maxResults = 20
}: CryptoSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<CryptoListItem[]>([])
  const [popularCryptos, setPopularCryptos] = useState<CryptoListItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Load popular cryptocurrencies
  useEffect(() => {
    if (showPopular) {
      loadPopularCryptos()
    }
  }, [showPopular])

  // Search cryptocurrencies when query changes
  useEffect(() => {
    if (query.trim().length >= 2) {
      searchCryptos(query)
    } else {
      setResults([])
      setSelectedIndex(-1)
    }
  }, [query])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.()
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        )
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
      } else if (event.key === 'Enter') {
        event.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex])
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [results, selectedIndex, onClose])

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex])

  const loadPopularCryptos = async () => {
    try {
      const { data, error } = await coinGeckoApi.getPopularCryptocurrencies()
      if (error) {
        setError(error.message)
        return
      }
      
      if (data) {
        const popular: CryptoListItem[] = data.slice(0, 10).map(crypto => ({
          id: crypto.id,
          symbol: crypto.symbol.toUpperCase(),
          name: crypto.name,
          image: crypto.image,
          marketCap: crypto.market_cap,
          rank: crypto.market_cap_rank
        }))
        setPopularCryptos(popular)
      }
    } catch (error) {
      console.error('Error loading popular cryptocurrencies:', error)
      setError('Failed to load popular cryptocurrencies')
    }
  }

  const searchCryptos = async (searchQuery: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const { data, error } = await coinGeckoApi.searchCryptocurrencies(searchQuery)
      
      if (error) {
        setError(error.message)
        setResults([])
        return
      }
      
      if (data) {
        // Filter out excluded cryptocurrencies
        const filteredResults = data
          .filter(crypto => !excludeIds.includes(crypto.id))
          .slice(0, maxResults)
        
        setResults(filteredResults)
        setSelectedIndex(-1)
      }
    } catch (error) {
      console.error('Error searching cryptocurrencies:', error)
      setError('Search failed. Please try again.')
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelect = (crypto: CryptoListItem) => {
    onSelect(crypto)
    setQuery('')
    setResults([])
    setSelectedIndex(-1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const displayResults = query.trim().length >= 2 ? results : popularCryptos

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add Cryptocurrency</h3>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            className="pl-10"
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
            {error}
          </div>
        )}

        {/* Results */}
        <div className="space-y-2">
          {query.trim().length < 2 && showPopular && (
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Popular Cryptocurrencies</span>
            </div>
          )}
          
          {displayResults.length > 0 && (
            <div 
              ref={resultsRef}
              className="max-h-96 overflow-y-auto space-y-1 border rounded-md"
            >
              {displayResults.map((crypto, index) => (
                <button
                  key={crypto.id}
                  onClick={() => handleSelect(crypto)}
                  className={`w-full p-3 text-left hover:bg-muted/50 transition-colors border-b border-border last:border-b-0 ${
                    index === selectedIndex ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {crypto.image && (
                        <img 
                          src={crypto.image} 
                          alt={crypto.name}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{crypto.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {crypto.symbol}
                          </Badge>
                        </div>
                        {crypto.rank && (
                          <div className="text-xs text-muted-foreground">
                            Rank #{crypto.rank}
                          </div>
                        )}
                      </div>
                    </div>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {query.trim().length >= 2 && results.length === 0 && !isLoading && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No cryptocurrencies found for "{query}"</p>
              <p className="text-sm">Try searching with a different name or symbol</p>
            </div>
          )}
          
          {query.trim().length < 2 && popularCryptos.length === 0 && !isLoading && showPopular && (
            <div className="text-center py-8 text-muted-foreground">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Unable to load popular cryptocurrencies</p>
              <p className="text-sm">Start typing to search for cryptocurrencies</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
          <p>Use ↑↓ arrow keys to navigate, Enter to select, Esc to close</p>
        </div>
      </CardContent>
    </Card>
  )
}