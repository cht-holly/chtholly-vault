/**
 * AGENT INSTRUCTION: Goal Setting Step Component
 * 
 * This step component collects the user's primary goal or objective.
 * Adapt the suggestions and prompts for your specific industry.
 * 
 * INDUSTRY ADAPTATIONS:
 * 
 * E-commerce:
 * - Goal: "Find the perfect product for my needs"
 * - Suggestions: Product recommendations, budget ranges, delivery preferences
 * 
 * Photography:
 * - Goal: "Capture my special moments professionally"
 * - Suggestions: Session types, styles, package options
 * 
 * Finance:
 * - Goal: "Build wealth and secure my financial future"
 * - Suggestions: Investment strategies, risk levels, time horizons
 * 
 * Education:
 * - Goal: "Learn new skills to advance my career"
 * - Suggestions: Course types, learning paths, certification goals
 */

import React, { useState } from 'react';
import { Target, Lightbulb, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { BaseItem, BaseFlowData } from '@/types/base';

interface GoalStepProps {
  item: BaseItem;
  data: Partial<BaseFlowData>;
  onUpdate: (updates: Partial<BaseFlowData>) => void;
}

export const GoalStep: React.FC<GoalStepProps> = ({
  item,
  data,
  onUpdate
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Generate goal suggestions based on item category and themes
  const getGoalSuggestions = () => {
    const suggestions: Record<string, string[]> = {
      productivity: [
        "Improve my daily workflow and eliminate distractions for maximum efficiency",
        "Complete important projects on time without procrastination",
        "Develop better time management skills and work-life balance",
        "Create organized systems that help me stay focused and productive"
      ],
      creativity: [
        "Unlock my creative potential and generate innovative ideas consistently",
        "Overcome creative blocks and maintain inspiration for my projects",
        "Develop a unique creative style and express myself confidently",
        "Build creative habits that fuel my artistic growth"
      ],
      wellness: [
        "Achieve better work-life balance and reduce daily stress",
        "Develop healthy habits that improve my physical and mental wellbeing",
        "Create a sustainable self-care routine that fits my lifestyle",
        "Build resilience and maintain emotional balance in challenging times"
      ],
      business: [
        "Develop strong leadership skills and inspire my team effectively",
        "Build a successful business strategy and achieve growth targets",
        "Improve my networking abilities and create valuable professional relationships",
        "Master strategic thinking and make confident business decisions"
      ],
      lifestyle: [
        "Create more meaningful experiences and embrace new adventures",
        "Build confidence to step outside my comfort zone regularly",
        "Develop a growth mindset that helps me see challenges as opportunities",
        "Design a lifestyle that aligns with my values and long-term goals"
      ]
    };
    
    // Try to match category, fallback to general suggestions
    const categoryKey = Object.keys(suggestions).find(key => 
      item.category.toLowerCase().includes(key) || 
      item.coreThemes.some(theme => theme.toLowerCase().includes(key))
    ) || 'productivity';
    
    return suggestions[categoryKey];
  };

  const selectSuggestion = (suggestion: string) => {
    onUpdate({ goal: suggestion });
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <div 
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
          style={{ backgroundColor: `${item.color}20` }}
        >
          <Target className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: item.color }} />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          What's Your Goal?
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto px-4">
          Be specific about what you want to achieve with "{item.name}". 
          The more detailed you are, the better we can personalize your experience.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Your Specific Goal
          </CardTitle>
          <CardDescription>
            Describe what you want to accomplish in detail
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={data.goal || ''}
            onChange={(e) => onUpdate({ goal: e.target.value })}
            placeholder={`Example: I want to improve my ${item.category} skills and feel more confident in this area. I'd like to overcome any obstacles and achieve consistent progress toward my objectives.`}
            className="min-h-[100px] sm:min-h-[120px] resize-none w-full max-w-full text-sm sm:text-base"
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-2 text-xs sm:text-sm text-gray-500">
            <span className="text-xs sm:text-sm">Be as specific as possible</span>
            <span className="text-xs sm:text-sm">{data.goal?.length || 0}/500</span>
          </div>
        </CardContent>
      </Card>

      {/* Goal Suggestions Section */}
      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            Goal Suggestions
          </CardTitle>
          <CardDescription>
            Need inspiration? Try one of these personalized goals for your {item.name} journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              {showSuggestions ? 'Hide Goal Ideas' : 'Show Goal Ideas'}
            </Button>

            {showSuggestions && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Suggested Goals for {item.category}
                  </span>
                </div>
                {getGoalSuggestions().map((suggestion, index) => (
                  <div 
                    key={index}
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-colors active:bg-blue-50 dark:active:bg-blue-900/20"
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {suggestion}
                    </p>
                  </div>
                ))}
                
                <Button 
                  variant="ghost" 
                  onClick={() => setShowSuggestions(false)}
                  className="w-full mt-2 text-gray-600"
                >
                  Hide Suggestions
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
