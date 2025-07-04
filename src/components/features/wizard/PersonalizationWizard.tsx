/**
 * AGENT INSTRUCTION: Generic Multi-Step Wizard Component
 * 
 * This is a complete multi-step wizard component extracted from the original subliminal app.
 * It can be adapted for any industry that needs a multi-step process.
 * 
 * TO ADAPT FOR YOUR INDUSTRY:
 * 1. Update the step titles and descriptions
 * 2. Customize the step components for your data collection needs
 * 3. Replace the icons with industry-appropriate ones
 * 4. Adapt the progress flow to match your process
 * 5. Customize the completion logic
 * 
 * INDUSTRY EXAMPLES:
 * 
 * E-commerce:
 * - Steps: Product Selection → Customization → Shipping → Payment → Review
 * - Icons: ShoppingBag, Settings, Truck, CreditCard, CheckCircle
 * 
 * Photography:
 * - Steps: Session Type → Date & Time → Location → Package → Confirmation
 * - Icons: Camera, Calendar, MapPin, Package, CheckCircle
 * 
 * Finance:
 * - Steps: Goals → Risk Assessment → Investment Selection → Allocation → Review
 * - Icons: Target, ShieldCheck, TrendingUp, PieChart, CheckCircle
 * 
 * Education:
 * - Steps: Course Selection → Learning Path → Schedule → Payment → Enrollment
 * - Icons: BookOpen, Route, Calendar, CreditCard, GraduationCap
 * 
 * FEATURES:
 * - Responsive mobile-first design
 * - Progress tracking with visual indicators
 * - Step navigation with validation
 * - Smooth animations between steps
 * - Form validation and error handling
 * - Skip optional steps functionality
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Target, 
  MessageSquare, 
  Settings, 
  Volume2, 
  Sparkles, 
  X,
  SkipForward 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BaseItem, BaseFlowData } from '@/types/base';

// Step Components
import { GoalStep } from './steps/GoalStep';
import { ContextStep } from './steps/ContextStep';
import { CustomizationStep } from './steps/CustomizationStep';
import { PreferencesStep } from './steps/PreferencesStep';
import { ReviewStep } from './steps/ReviewStep';

export interface WizardStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
  isOptional?: boolean;
}

interface PersonalizationWizardProps {
  item: BaseItem;
  onComplete: (item: BaseItem, flowData: BaseFlowData) => void;
  onClose: () => void;
}

export const PersonalizationWizard: React.FC<PersonalizationWizardProps> = ({
  item,
  onComplete,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [flowData, setFlowData] = useState<Partial<BaseFlowData>>({
    customizations: {
      style: 'modern',
      approach: 'friendly',
      timeframe: 'immediate',
      intensity: 3
    }
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const steps: WizardStep[] = [
    {
      id: 1,
      title: 'Set Your Goal',
      description: 'Define what you want to achieve',
      isCompleted: !!flowData.goal,
      isActive: currentStep === 1
    },
    {
      id: 2,
      title: 'Add Context',
      description: 'Tell us about your situation (Optional)',
      isCompleted: !!flowData.currentSituation,
      isActive: currentStep === 2,
      isOptional: true
    },
    {
      id: 3,
      title: 'Customize',
      description: 'Personalize your experience',
      isCompleted: !!flowData.customizations,
      isActive: currentStep === 3
    },
    {
      id: 4,
      title: 'Preferences',
      description: 'Fine-tune your settings (Optional)',
      isCompleted: currentStep > 4,
      isActive: currentStep === 4,
      isOptional: true
    },
    {
      id: 5,
      title: 'Review & Generate',
      description: 'Confirm and create your personalized experience',
      isCompleted: false,
      isActive: currentStep === 5
    }
  ];

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    const step = steps.find(s => s.id === stepId);
    if (step && (step.isCompleted || stepId <= currentStep)) {
      setCurrentStep(stepId);
    }
  };

  const handleComplete = async () => {
    if (!isFormValid()) return;
    
    setIsProcessing(true);
    
    try {
      // Apply defaults if user hasn't provided context
      const completeData: BaseFlowData = {
        goal: flowData.goal || 'Improve and grow',
        currentSituation: flowData.currentSituation || 'Looking to improve in this area',
        challenges: flowData.challenges || ['Need more focus'],
        desiredOutcomes: flowData.desiredOutcomes || ['Feel more confident and capable'],
        customizations: flowData.customizations!,
        preferences: flowData.preferences
      };
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onComplete(item, completeData);
    } catch (error) {
      console.error('Failed to complete flow:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const isFormValid = (): boolean => {
    return !!(flowData.goal && flowData.customizations);
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!flowData.goal;
      case 2:
        return true; // Optional step
      case 3:
        return !!flowData.customizations;
      case 4:
        return true; // Optional step
      case 5:
        return !!flowData.goal;
      default:
        return false;
    }
  };

  const updateFlowData = (updates: Partial<BaseFlowData>) => {
    setFlowData(prev => {
      const newCustomizations = updates.customizations ? {
        ...prev.customizations,
        ...updates.customizations
      } : prev.customizations;
      
      return {
        ...prev,
        ...updates,
        customizations: newCustomizations
      };
    });
  };

  const skipOptionalStep = () => {
    if (currentStep === 2) {
      const hasUserContent = flowData.currentSituation || 
                            (flowData.challenges && flowData.challenges.length > 0) ||
                            (flowData.desiredOutcomes && flowData.desiredOutcomes.length > 0);
      
      if (!hasUserContent) {
        updateFlowData({
          currentSituation: 'Looking to improve in this area',
          challenges: ['Need more confidence'],
          desiredOutcomes: ['Feel more confident and capable']
        });
      }
    }
    handleNext();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <GoalStep
            item={item}
            data={flowData}
            onUpdate={updateFlowData}
          />
        );
      case 2:
        return (
          <ContextStep
            item={item}
            data={flowData}
            onUpdate={updateFlowData}
          />
        );
      case 3:
        return (
          <CustomizationStep
            item={item}
            data={flowData}
            onUpdate={updateFlowData}
          />
        );
      case 4:
        return (
          <PreferencesStep
            item={item}
            data={flowData}
            onUpdate={updateFlowData}
          />
        );
      case 5:
        return (
          <ReviewStep
            item={item}
            data={flowData}
            onUpdate={updateFlowData}
            isProcessing={isProcessing}
          />
        );
      default:
        return null;
    }
  };

  const getStepIcon = (step: WizardStep) => {
    switch (step.id) {
      case 1: return Target;
      case 2: return MessageSquare;
      case 3: return Settings;
      case 4: return Volume2;
      case 5: return Sparkles;
      default: return Target;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-0 sm:p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-900 w-full sm:max-w-4xl sm:rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-screen"
      >
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Customize: {item.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Step {currentStep} of {steps.length}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <Progress value={progress} className="mb-4" />
          
          {/* Step Indicators - Desktop */}
          <div className="hidden sm:flex justify-between">
            {steps.map((step) => {
              const Icon = getStepIcon(step);
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                    step.isActive 
                      ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                      : step.isCompleted 
                        ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20' 
                        : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  disabled={!step.isCompleted && step.id > currentStep}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    step.isActive 
                      ? 'bg-blue-600 text-white' 
                      : step.isCompleted 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    {step.isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-xs font-medium text-center leading-tight">
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="p-4 sm:p-6"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="flex gap-2">
              {/* Skip button for optional steps */}
              {steps[currentStep - 1]?.isOptional && (
                <Button
                  variant="ghost"
                  onClick={skipOptionalStep}
                  className="flex items-center gap-2"
                >
                  <SkipForward className="w-4 h-4" />
                  Skip
                </Button>
              )}

              {currentStep < steps.length ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  disabled={!isFormValid() || isProcessing}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isProcessing ? (
                    <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  {isProcessing ? 'Processing...' : 'Complete'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
