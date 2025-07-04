/**
 * AGENT INSTRUCTION: Customization Step Component
 * 
 * This step allows users to customize their experience preferences.
 * Adapt the options for your specific industry needs.
 */

import React from 'react';
import { Settings, Palette, Clock, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BaseItem, BaseFlowData } from '@/types/base';

interface CustomizationStepProps {
  item: BaseItem;
  data: Partial<BaseFlowData>;
  onUpdate: (updates: Partial<BaseFlowData>) => void;
}

export const CustomizationStep: React.FC<CustomizationStepProps> = ({
  item,
  data,
  onUpdate
}) => {
  const updateCustomization = (key: string, value: any) => {
    const currentCustomizations = data.customizations || {
      style: 'modern',
      approach: 'friendly',
      timeframe: 'immediate',
      intensity: 3 as 1 | 2 | 3 | 4 | 5
    };
    
    onUpdate({
      customizations: {
        ...currentCustomizations,
        [key]: value
      }
    });
  };

  const styleOptions = [
    { value: 'gentle', label: 'Gentle', description: 'Soft and encouraging approach' },
    { value: 'powerful', label: 'Powerful', description: 'Bold and assertive tone' },
    { value: 'modern', label: 'Modern', description: 'Contemporary and fresh style' },
    { value: 'classic', label: 'Classic', description: 'Traditional and timeless approach' }
  ];

  const approachOptions = [
    { value: 'friendly', label: 'Friendly', description: 'Warm and personal tone' },
    { value: 'professional', label: 'Professional', description: 'Business-like and formal' },
    { value: 'casual', label: 'Casual', description: 'Relaxed and informal' },
    { value: 'motivational', label: 'Motivational', description: 'Inspiring and energetic' }
  ];

  const timeframeOptions = [
    { value: 'immediate', label: 'Immediate', description: 'Focus on present moment' },
    { value: 'short-term', label: 'Short-term', description: 'Next few weeks or months' },
    { value: 'long-term', label: 'Long-term', description: 'Future goals and vision' },
    { value: 'ongoing', label: 'Ongoing', description: 'Continuous improvement' }
  ];

  const intensityLevels = [
    { value: 1, label: 'Gentle', description: 'Light and easy-going' },
    { value: 2, label: 'Moderate', description: 'Balanced approach' },
    { value: 3, label: 'Standard', description: 'Regular intensity' },
    { value: 4, label: 'Strong', description: 'High-impact approach' },
    { value: 5, label: 'Maximum', description: 'Most intense experience' }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <div 
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
          style={{ backgroundColor: `${item.color}20` }}
        >
          <Settings className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: item.color }} />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Customize Your Experience
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto px-4">
          Choose the style and approach that feels right for you.
        </p>
      </div>

      <div className="space-y-4">
        {/* Style Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Style
            </CardTitle>
            <CardDescription>
              Choose the overall style that resonates with you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {styleOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    data.customizations?.style === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => updateCustomization('style', option.value)}
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

        {/* Approach Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Approach
            </CardTitle>
            <CardDescription>
              Select the communication style you prefer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {approachOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    data.customizations?.approach === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => updateCustomization('approach', option.value)}
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

        {/* Timeframe Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Timeframe
            </CardTitle>
            <CardDescription>
              Choose your preferred timeframe focus
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {timeframeOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    data.customizations?.timeframe === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => updateCustomization('timeframe', option.value)}
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

        {/* Intensity Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Intensity Level
            </CardTitle>
            <CardDescription>
              Select the intensity that feels comfortable for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Gentle</span>
                <span>Maximum</span>
              </div>
              <div className="flex gap-2">
                {intensityLevels.map((level) => (
                  <button
                    key={level.value}
                    className={`flex-1 p-2 text-xs font-medium rounded border-2 transition-colors ${
                      data.customizations?.intensity === level.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => updateCustomization('intensity', level.value)}
                  >
                    <div>{level.value}</div>
                    <div className="mt-1">{level.label}</div>
                  </button>
                ))}
              </div>
              <div className="text-center">
                <Badge variant="outline" className="text-xs">
                  Current: {intensityLevels.find(l => l.value === data.customizations?.intensity)?.description || 'Standard'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
