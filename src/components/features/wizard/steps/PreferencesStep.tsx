/**
 * AGENT INSTRUCTION: Preferences Step Component
 * 
 * This optional step collects additional user preferences.
 * Adapt for your industry-specific settings.
 */

import React from 'react';
import { Volume2, Monitor, Smartphone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BaseItem, BaseFlowData } from '@/types/base';

interface PreferencesStepProps {
  item: BaseItem;
  data: Partial<BaseFlowData>;
  onUpdate: (updates: Partial<BaseFlowData>) => void;
}

export const PreferencesStep: React.FC<PreferencesStepProps> = ({
  item,
  data,
  onUpdate
}) => {
  const updatePreference = (key: string, value: any) => {
    onUpdate({
      preferences: {
        ...data.preferences,
        [key]: value
      }
    });
  };

  const deviceOptions = [
    { value: 'mobile', label: 'Mobile', icon: Smartphone, description: 'Optimized for phone use' },
    { value: 'desktop', label: 'Desktop', icon: Monitor, description: 'Better for computer use' },
    { value: 'both', label: 'Both', icon: Monitor, description: 'I use both devices equally' }
  ];

  const usageTimeOptions = [
    { value: 'morning', label: 'Morning', description: 'Start my day with focus' },
    { value: 'afternoon', label: 'Afternoon', description: 'Midday boost' },
    { value: 'evening', label: 'Evening', description: 'Wind down time' },
    { value: 'flexible', label: 'Flexible', description: 'Varies by day' }
  ];

  const notificationOptions = [
    { value: 'all', label: 'All Updates', description: 'Keep me informed of everything' },
    { value: 'important', label: 'Important Only', description: 'Just the essential updates' },
    { value: 'minimal', label: 'Minimal', description: 'Only critical notifications' },
    { value: 'none', label: 'None', description: 'I\'ll check manually' }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <div 
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
          style={{ backgroundColor: `${item.color}20` }}
        >
          <Volume2 className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: item.color }} />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Preferences & Settings
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto px-4">
          Optional settings to enhance your experience. You can always change these later.
        </p>
      </div>

      <div className="space-y-4">
        {/* Device Preference */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Primary Device
            </CardTitle>
            <CardDescription>
              Which device will you primarily use?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {deviceOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div
                    key={option.value}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-colors text-center ${
                      data.preferences?.device === option.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => updatePreference('device', option.value)}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {option.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Usage Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Preferred Time
            </CardTitle>
            <CardDescription>
              When do you typically like to use apps like this?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {usageTimeOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    data.preferences?.usageTime === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => updatePreference('usageTime', option.value)}
                >
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {option.description}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              How would you like to receive updates?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {notificationOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    data.preferences?.notifications === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => updatePreference('notifications', option.value)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {option.description}
                      </div>
                    </div>
                    {data.preferences?.notifications === option.value && (
                      <Badge variant="outline" className="text-xs">Selected</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400 px-4">
        💡 These preferences help optimize your experience but are completely optional.
      </div>
    </div>
  );
};
