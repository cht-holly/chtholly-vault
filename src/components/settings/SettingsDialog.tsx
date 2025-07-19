/**
 * SettingsDialog Component
 * 
 * Modal dialog for configuring application settings including currency selection
 * and refresh intervals.
 */

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { usePortfolioStore } from '../../stores/portfolioStore'
import { AppSettings } from '../../types/crypto'
import { Settings, Save } from 'lucide-react'

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const { settings, updateSettings } = usePortfolioStore()
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update local settings when store settings change
  useEffect(() => {
    setLocalSettings(settings)
  }, [settings, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await updateSettings(localSettings)
      onOpenChange(false)
    } catch (error) {
      console.error('Error updating settings:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setLocalSettings(settings) // Reset to original settings
    onOpenChange(false)
  }

  const currencyOptions = [
    { value: 'USD', label: 'US Dollar (USD)', symbol: '$' },
    { value: 'SGD', label: 'Singapore Dollar (SGD)', symbol: 'S$' },
    { value: 'MYR', label: 'Malaysian Ringgit (MYR)', symbol: 'RM' }
  ]

  const refreshIntervalOptions = [
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' },
    { value: 120, label: '2 minutes' },
    { value: 300, label: '5 minutes' },
    { value: 600, label: '10 minutes' }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[95vh] sm:max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-2 shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <form onSubmit={handleSubmit} className="space-y-6 pb-6">
            {/* Currency Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Display Currency</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {currencyOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex flex-col items-center space-y-2 cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <input
                    type="radio"
                    name="currency"
                    value={option.value}
                    checked={localSettings.currency === option.value}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        currency: e.target.value as 'USD' | 'SGD' | 'MYR'
                      })
                    }
                    className="w-4 h-4"
                  />
                  <div className="text-center">
                    <div className="font-medium text-sm">{option.value}</div>
                    <div className="text-xs text-muted-foreground">{option.symbol}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

            {/* Refresh Interval */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Refresh Interval</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {refreshIntervalOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex flex-col items-center space-y-2 cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <input
                    type="radio"
                    name="refreshInterval"
                    value={option.value}
                    checked={localSettings.refreshInterval === option.value}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        refreshInterval: parseInt(e.target.value)
                      })
                    }
                    className="w-4 h-4"
                  />
                  <div className="text-center">
                    <div className="font-medium text-sm">{option.label}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

            {/* Auto Refresh Toggle */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Auto Refresh</Label>
              <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <div>
                <div className="font-medium text-sm">Enable automatic updates</div>
                <div className="text-xs text-muted-foreground">
                  Prices update automatically in background
                </div>
              </div>
              <input
                type="checkbox"
                checked={localSettings.autoRefresh}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    autoRefresh: e.target.checked
                  })
                }
                className="w-4 h-4"
              />
            </label>
          </div>

            {/* Hide Values Toggle */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Privacy</Label>
              <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <div>
                <div className="font-medium text-sm">Hide portfolio values</div>
                <div className="text-xs text-muted-foreground">
                  Show asterisks instead of actual amounts
                </div>
              </div>
              <input
                type="checkbox"
                checked={localSettings.hideValues}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    hideValues: e.target.checked
                  })
                }
                className="w-4 h-4"
              />
            </label>
          </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
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