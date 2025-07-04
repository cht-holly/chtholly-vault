/**
 * AGENT INSTRUCTION: Review Step Component
 * 
 * This final step shows a summary of user choices and handles completion.
 * Adapt the review content for your industry needs.
 */

import React from 'react';
import { Sparkles, CheckCircle, Clock, User, Settings, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BaseItem, BaseFlowData } from '@/types/base';

interface ReviewStepProps {
  item: BaseItem;
  data: Partial<BaseFlowData>;
  onUpdate: (updates: Partial<BaseFlowData>) => void;
  isProcessing?: boolean;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  item,
  data,
  isProcessing = false
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <div 
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
          style={{ backgroundColor: `${item.color}20` }}
        >
          {isProcessing ? (
            <div className="w-6 h-6 sm:w-8 sm:h-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: item.color }} />
          )}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {isProcessing ? 'Creating Your Experience...' : 'Review & Generate'}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto px-4">
          {isProcessing 
            ? 'Please wait while we create your personalized experience...'
            : 'Review your choices and generate your personalized experience.'
          }
        </p>
      </div>

      {!isProcessing && (
        <div className="space-y-4">
          {/* Goal Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Your Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {data.goal || 'No specific goal set'}
              </p>
            </CardContent>
          </Card>

          {/* Context Summary */}
          {(data.currentSituation || data.challenges?.length || data.desiredOutcomes?.length) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Your Context
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.currentSituation && (
                  <div>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Current Situation:</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{data.currentSituation}</p>
                  </div>
                )}
                
                {data.challenges && data.challenges.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Challenges:</p>
                    <div className="flex flex-wrap gap-1">
                      {data.challenges.map((challenge, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {challenge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {data.desiredOutcomes && data.desiredOutcomes.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Desired Outcomes:</p>
                    <div className="flex flex-wrap gap-1">
                      {data.desiredOutcomes.map((outcome, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          {outcome}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Customizations Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Your Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Style:</p>
                  <Badge variant="outline" className="text-xs capitalize">
                    {data.customizations?.style || 'Modern'}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Approach:</p>
                  <Badge variant="outline" className="text-xs capitalize">
                    {data.customizations?.approach || 'Friendly'}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Timeframe:</p>
                  <Badge variant="outline" className="text-xs capitalize">
                    {data.customizations?.timeframe || 'Immediate'}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Intensity:</p>
                  <Badge variant="outline" className="text-xs">
                    Level {data.customizations?.intensity || 3}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Preferences */}
          {data.preferences && Object.keys(data.preferences).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Additional Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {data.preferences.device && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Primary Device:</span>
                      <Badge variant="outline" className="text-xs capitalize">
                        {data.preferences.device}
                      </Badge>
                    </div>
                  )}
                  {data.preferences.usageTime && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Preferred Time:</span>
                      <Badge variant="outline" className="text-xs capitalize">
                        {data.preferences.usageTime}
                      </Badge>
                    </div>
                  )}
                  {data.preferences.notifications && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Notifications:</span>
                      <Badge variant="outline" className="text-xs capitalize">
                        {data.preferences.notifications}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* What Happens Next */}
          <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                <CheckCircle className="w-5 h-5" />
                What Happens Next?
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-green-300">
                After you click "Complete", we'll create your personalized experience based on your choices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  Generate personalized content based on your goal
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  Apply your style and preference settings
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  Create your customized experience
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  Make it available for immediate use
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {isProcessing && (
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
              <div className="space-y-2">
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  Creating your personalized experience...
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  This usually takes a few seconds
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
