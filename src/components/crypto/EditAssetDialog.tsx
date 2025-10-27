/**
 * EditAssetDialog Component
 * 
 * Modal dialog for editing cryptocurrency asset quantities and purchase prices.
 */

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { CryptoAsset } from '../../types/crypto'
import { usePortfolioStore } from '../../stores/portfolioStore'
import { Save, Trash2 } from 'lucide-react'

interface EditAssetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  asset: CryptoAsset | null
}

export function EditAssetDialog({ open, onOpenChange, asset }: EditAssetDialogProps) {
  const [quantity, setQuantity] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [targetMultiplier, setTargetMultiplier] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { updateAssetQuantity, updateAssetPurchasePrice, updateHoldingTargetMultiplier, removeAsset } = usePortfolioStore()

  // Update form when asset changes
  useEffect(() => {
    if (asset) {
      setQuantity(asset.quantity.toString())
      setPurchasePrice(asset.purchasePrice?.toString() || '')
      setTargetMultiplier(asset.targetMultiplier?.toString() || '')
    }
  }, [asset])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!asset || !quantity || parseFloat(quantity) <= 0) {
      return
    }

    setIsSubmitting(true)

    try {
      // Update quantity
      updateAssetQuantity(asset.id, parseFloat(quantity))

      // Update purchase price if provided
      if (purchasePrice) {
        updateAssetPurchasePrice(asset.id, parseFloat(purchasePrice))
      }

      // Update target multiplier if provided
      if (targetMultiplier) {
        updateHoldingTargetMultiplier(asset.id, parseFloat(targetMultiplier))
      } else {
        updateHoldingTargetMultiplier(asset.id, undefined)
      }

      // Close dialog
      onOpenChange(false)
    } catch (error) {
      console.error('Error updating asset:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRemove = () => {
    if (!asset) return
    
    if (confirm(`Are you sure you want to remove ${asset.name} from your portfolio?`)) {
      removeAsset(asset.id)
      onOpenChange(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  if (!asset) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Asset</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Asset Info */}
          <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/50">
            <div>
              <h4 className="font-medium">{asset.name}</h4>
              <p className="text-sm text-muted-foreground">
                {asset.symbol}
              </p>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="edit-quantity">Quantity *</Label>
              <Input
                id="edit-quantity"
                type="number"
                step="any"
                min="0"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                How much {asset.symbol} do you own?
              </p>
            </div>

            <div>
              <Label htmlFor="edit-purchasePrice">Average Purchase Price (Optional)</Label>
              <Input
                id="edit-purchasePrice"
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

            <div>
              <Label htmlFor="edit-targetMultiplier">Target Multiplier (Optional)</Label>
              <Input
                id="edit-targetMultiplier"
                type="number"
                step="0.1"
                min="0"
                placeholder="e.g., 1.5 for 150%"
                value={targetMultiplier}
                onChange={(e) => setTargetMultiplier(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Target profit multiplier (1.5 = 150%, 2 = 200%)
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleRemove}
                className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || !quantity || parseFloat(quantity) <= 0}
                className="flex-1"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}