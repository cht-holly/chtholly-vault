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
    { value: 'USD', label: 'US Dollar (USD)', symbol: '$', flag: '🇺🇸' },
    { value: 'EUR', label: 'Euro (EUR)', symbol: '€', flag: '🇪🇺' },
    { value: 'SGD', label: 'Singapore Dollar (SGD)', symbol: 'S$', flag: '🇸🇬' },
    { value: 'MYR', label: 'Malaysian Ringgit (MYR)', symbol: 'RM', flag: '🇲🇾' },
    { value: 'CNY', label: 'Chinese Yuan (CNY)', symbol: '¥', flag: '🇨🇳' },
    { value: 'JPY', label: 'Japanese Yen (JPY)', symbol: '¥', flag: '🇯🇵' },
    { value: 'KRW', label: 'Korean Won (KRW)', symbol: '₩', flag: '🇰🇷' },
    { value: 'TWD', label: 'Taiwan Dollar (TWD)', symbol: 'NT$', flag: '🇹🇼' }
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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] sm:max-h-none flex flex-col p-0 my-4 sm:my-8">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2 shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 pb-4 sm:pb-6">
            {/* Currency Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Display Currency</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currencyOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex flex-col items-center space-y-1.5 cursor-pointer p-2.5 rounded-lg border transition-all relative ${
                      localSettings.currency === option.value 
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/20' 
                        : 'hover:bg-muted/50 hover:border-border'
                    }`}
                  >
                    <input
                      type="radio"
                      name="currency"
                      value={option.value}
                      checked={localSettings.currency === option.value}
                      onChange={(e) =>
                        setLocalSettings({
                          ...localSettings,
                          currency: e.target.value as 'USD' | 'SGD' | 'MYR' | 'CNY' | 'JPY' | 'KRW' | 'TWD' | 'EUR'
                        })
                      }
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <span className="text-base">{option.flag}</span>
                        <div className="font-medium text-xs">{option.value}</div>
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-full">
                        {option.label.split(' (')[0]}
                      </div>
                    </div>
                  </label>
              ))}
            </div>
          </div>

            {/* Refresh Interval */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Refresh Interval</Label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {refreshIntervalOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex flex-col items-center space-y-1.5 cursor-pointer p-2.5 rounded-lg border transition-all ${
                      localSettings.refreshInterval === option.value
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                        : 'hover:bg-muted/50 hover:border-border'
                    }`}
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
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="font-medium text-sm">{option.label}</div>
                    </div>
                  </label>
              ))}
            </div>
          </div>

            {/* Toggles - Side by side on desktop */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
                {/* Auto Refresh Toggle */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Auto Refresh</Label>
                <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex-1 pr-3">
                    <div className="font-medium text-sm">Automatic updates</div>
                    <div className="text-xs text-muted-foreground">
                      Refresh prices in background
                    </div>
                  </div>
                  <div className="relative inline-flex items-center shrink-0">
                    <input
                      type="checkbox"
                      checked={localSettings.autoRefresh}
                      onChange={(e) =>
                        setLocalSettings({
                          ...localSettings,
                          autoRefresh: e.target.checked
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </div>
                </label>
              </div>

              {/* Unit Price Display */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Unit Price Display</Label>
                <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex-1 pr-3">
                    <div className="font-medium text-sm">Show prices in USD</div>
                    <div className="text-xs text-muted-foreground">
                      Always display in USD
                    </div>
                  </div>
                  <div className="relative inline-flex items-center shrink-0">
                    <input
                      type="checkbox"
                      checked={localSettings.showPricesInUSD}
                      onChange={(e) =>
                        setLocalSettings({
                          ...localSettings,
                          showPricesInUSD: e.target.checked
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </div>
                </label>
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Privacy</Label>
              <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex-1 pr-3">
                  <div className="font-medium text-sm">Hide portfolio values</div>
                  <div className="text-xs text-muted-foreground">
                    Show asterisks instead of actual amounts
                  </div>
                </div>
                <div className="relative inline-flex items-center shrink-0">
                  <input
                    type="checkbox"
                    checked={localSettings.hideValues}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        hideValues: e.target.checked
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </div>
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