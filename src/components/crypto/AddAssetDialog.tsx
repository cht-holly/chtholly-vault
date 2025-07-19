/**
 * AddAssetDialog Component
 * 
 * Modal dialog for adding cryptocurrency assets to the portfolio.
 * Combines crypto search with quantity input.
 */

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { CryptoSearch } from './CryptoSearch'
import { CryptoListItem } from '../../types/crypto'
import { usePortfolioStore } from '../../stores/portfolioStore'
import { Plus, ArrowLeft } from 'lucide-react'

interface AddAssetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddAssetDialog({ open, onOpenChange }: AddAssetDialogProps) {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoListItem | null>(null)
  const [quantity, setQuantity] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { addAsset, portfolio } = usePortfolioStore()

  const handleCryptoSelect = (crypto: CryptoListItem) => {
    setSelectedCrypto(crypto)
  }

  const handleBack = () => {
    setSelectedCrypto(null)
    setQuantity('')
    setPurchasePrice('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedCrypto || !quantity || parseFloat(quantity) <= 0) {
      return
    }

    setIsSubmitting(true)

    try {
      const asset = {
        id: selectedCrypto.id,
        symbol: selectedCrypto.symbol,
        name: selectedCrypto.name,
        quantity: parseFloat(quantity),
        purchasePrice: purchasePrice ? parseFloat(purchasePrice) : undefined
      }

      addAsset(asset)
      
      // Reset form and close dialog
      setSelectedCrypto(null)
      setQuantity('')
      setPurchasePrice('')
      onOpenChange(false)
    } catch (error) {
      console.error('Error adding asset:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setSelectedCrypto(null)
    setQuantity('')
    setPurchasePrice('')
    onOpenChange(false)
  }

  // Get list of existing asset IDs to exclude from search
  const existingAssetIds = portfolio.assets.map(asset => asset.id)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {selectedCrypto ? 'Add Asset Details' : 'Add Cryptocurrency'}
          </DialogTitle>
        </DialogHeader>

        {!selectedCrypto ? (
          /* Crypto Search Step */
          <CryptoSearch
            onSelect={handleCryptoSelect}
            onClose={handleClose}
            excludeIds={existingAssetIds}
            placeholder="Search for cryptocurrency to add..."
            showPopular={true}
            maxResults={20}
          />
        ) : (
          /* Asset Details Step */
          <div className="space-y-6">
            {/* Back Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to search
            </Button>

            {/* Selected Crypto Info */}
            <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/50">
              {selectedCrypto.image && (
                <img 
                  src={selectedCrypto.image} 
                  alt={selectedCrypto.name}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div>
                <h4 className="font-medium">{selectedCrypto.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedCrypto.symbol}
                </p>
              </div>
            </div>

            {/* Asset Details Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  step="any"
                  min="0"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  How much {selectedCrypto.symbol} do you own?
                </p>
              </div>

              <div>
                <Label htmlFor="purchasePrice">Average Purchase Price (Optional)</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  step="any"
                  min="0"
                  placeholder="Enter purchase price in USD"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Your average purchase price for profit/loss calculation
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !quantity || parseFloat(quantity) <= 0}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Adding...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Asset
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}