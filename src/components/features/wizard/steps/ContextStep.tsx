/**
 * AGENT INSTRUCTION: Context Step Component
 * 
 * This optional step collects context about the user's current situation.
 * Adapt the questions and prompts for your specific industry.
 */

import React from 'react';
import { MessageSquare, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { BaseItem, BaseFlowData } from '@/types/base';

interface ContextStepProps {
  item: BaseItem;
  data: Partial<BaseFlowData>;
  onUpdate: (updates: Partial<BaseFlowData>) => void;
}

export const ContextStep: React.FC<ContextStepProps> = ({
  item,
  data,
  onUpdate
}) => {
  const handleChallengesChange = (value: string) => {
    const challenges = value.split('\n').filter(c => c.trim());
    onUpdate({ challenges });
  };

  const handleOutcomesChange = (value: string) => {
    const desiredOutcomes = value.split('\n').filter(o => o.trim());
    onUpdate({ desiredOutcomes });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <div 
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
          style={{ backgroundColor: `${item.color}20` }}
        >
          <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: item.color }} />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Tell Us About Your Situation
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto px-4">
          This optional step helps us personalize your experience better. You can skip this if you prefer.
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Current Situation
            </CardTitle>
            <CardDescription>
              Describe where you are right now (optional)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={data.currentSituation || ''}
              onChange={(e) => onUpdate({ currentSituation: e.target.value })}
              placeholder="Example: I'm currently working in a demanding job and looking to improve my skills in this area..."
              className="min-h-[80px] resize-none"
              maxLength={300}
            />
            <div className="flex justify-end mt-2">
              <span className="text-xs text-gray-500">{data.currentSituation?.length || 0}/300</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Challenges
            </CardTitle>
            <CardDescription>
              What obstacles are you facing? (One per line, optional)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={data.challenges?.join('\n') || ''}
              onChange={(e) => handleChallengesChange(e.target.value)}
              placeholder={`Example challenges:
Lack of confidence
Time management issues
Difficulty staying focused
Fear of taking risks`}
              className="min-h-[100px] resize-none"
              maxLength={400}
            />
            <div className="flex justify-end mt-2">
              <span className="text-xs text-gray-500">
                {data.challenges?.join('\n').length || 0}/400
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Desired Outcomes
            </CardTitle>
            <CardDescription>
              What would success look like? (One per line, optional)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={data.desiredOutcomes?.join('\n') || ''}
              onChange={(e) => handleOutcomesChange(e.target.value)}
              placeholder={`Example outcomes:
Feel more confident and capable
Achieve better work-life balance
Complete projects successfully
Build stronger relationships`}
              className="min-h-[100px] resize-none"
              maxLength={400}
            />
            <div className="flex justify-end mt-2">
              <span className="text-xs text-gray-500">
                {data.desiredOutcomes?.join('\n').length || 0}/400
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400 px-4">
        💡 This information helps create a more personalized experience, but you can skip this step if you prefer to keep things simple.
      </div>
    </div>
  );
};
