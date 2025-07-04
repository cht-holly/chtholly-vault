/**
 * AI AGENT VALIDATION UTILITIES
 * 
 * This module provides validation functions that AI agents can use to ensure
 * their modifications follow the correct patterns and maintain consistency.
 */

import { BaseItem, BaseFlowData } from '@/types/base';

// Type guards for validation
export const isValidBaseItem = (item: any): item is BaseItem => {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.description === 'string' &&
    typeof item.category === 'string' &&
    Array.isArray(item.coreThemes) &&
    item.coreThemes.every((theme: any) => typeof theme === 'string') &&
    (item.isPopular === undefined || typeof item.isPopular === 'boolean') &&
    (item.isFeatured === undefined || typeof item.isFeatured === 'boolean')
  );
};

export const isValidBaseFlowData = (data: any): data is BaseFlowData => {
  return (
    typeof data === 'object' &&
    data !== null &&
    Array.isArray(data.goals) &&
    data.goals.every((goal: any) => typeof goal === 'string') &&
    typeof data.context === 'string' &&
    typeof data.customizations === 'object' &&
    data.customizations !== null &&
    typeof data.customizations.style === 'string' &&
    typeof data.customizations.approach === 'string' &&
    typeof data.customizations.timeframe === 'string' &&
    typeof data.customizations.intensity === 'number'
  );
};

// Component prop validation
export interface ComponentValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const validateItemGridProps = (props: any): ComponentValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required props
  if (!props.items) {
    errors.push('ItemGrid requires "items" prop');
  } else if (!Array.isArray(props.items)) {
    errors.push('ItemGrid "items" prop must be an array');
  } else {
    props.items.forEach((item: any, index: number) => {
      if (!isValidBaseItem(item)) {
        errors.push(`Item at index ${index} is not a valid BaseItem`);
      }
    });
  }

  // Optional props validation
  if (props.title !== undefined && typeof props.title !== 'string') {
    errors.push('ItemGrid "title" prop must be a string');
  }

  if (props.onItemSelect !== undefined && typeof props.onItemSelect !== 'function') {
    errors.push('ItemGrid "onItemSelect" prop must be a function');
  }

  if (props.onFlowComplete !== undefined && typeof props.onFlowComplete !== 'function') {
    errors.push('ItemGrid "onFlowComplete" prop must be a function');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

export const validatePersonalizationWizardProps = (props: any): ComponentValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required props
  if (!props.item) {
    errors.push('PersonalizationWizard requires "item" prop');
  } else if (!isValidBaseItem(props.item)) {
    errors.push('PersonalizationWizard "item" prop must be a valid BaseItem');
  }

  if (!props.onComplete) {
    errors.push('PersonalizationWizard requires "onComplete" prop');
  } else if (typeof props.onComplete !== 'function') {
    errors.push('PersonalizationWizard "onComplete" prop must be a function');
  }

  if (!props.onClose) {
    errors.push('PersonalizationWizard requires "onClose" prop');
  } else if (typeof props.onClose !== 'function') {
    errors.push('PersonalizationWizard "onClose" prop must be a function');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

export const validateLoginFormProps = (props: any): ComponentValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // All props are optional for LoginForm, but validate types if provided
  if (props.onSubmit !== undefined && typeof props.onSubmit !== 'function') {
    errors.push('LoginForm "onSubmit" prop must be a function');
  }

  if (props.onSocialLogin !== undefined && typeof props.onSocialLogin !== 'function') {
    errors.push('LoginForm "onSocialLogin" prop must be a function');
  }

  if (props.title !== undefined && typeof props.title !== 'string') {
    errors.push('LoginForm "title" prop must be a string');
  }

  if (props.showSocialLogin !== undefined && typeof props.showSocialLogin !== 'boolean') {
    errors.push('LoginForm "showSocialLogin" prop must be a boolean');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// File structure validation
export const validateFileStructure = (filePath: string, componentType: 'ui' | 'layout' | 'features'): ComponentValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  const expectedPatterns = {
    ui: /^src\/components\/ui\/[a-z-]+\.tsx$/,
    layout: /^src\/components\/layout\/[A-Z][a-zA-Z]*\.tsx$/,
    features: /^src\/components\/features\/[A-Z][a-zA-Z]*\.tsx$/
  };

  if (!expectedPatterns[componentType].test(filePath)) {
    errors.push(`File path "${filePath}" does not match expected pattern for ${componentType} components`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Responsive class validation
export const validateResponsiveClasses = (className: string): ComponentValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for common responsive patterns
  const mobileFirstPattern = /^[^:]+(\s+sm:[^:]+)*(\s+lg:[^:]+)*(\s+xl:[^:]+)*$/;
  
  if (!mobileFirstPattern.test(className)) {
    warnings.push('Classes should follow mobile-first pattern (base classes, then sm:, lg:, xl:)');
  }

  // Check for minimum touch target on buttons
  if (className.includes('button') || className.includes('btn')) {
    if (!className.includes('min-h-') && !className.includes('h-')) {
      warnings.push('Button elements should have minimum height for touch targets');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Industry data validation
export const validateIndustryDataMapping = (_originalData: any, mappedData: BaseItem): ComponentValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!isValidBaseItem(mappedData)) {
    errors.push('Mapped data does not conform to BaseItem interface');
  }

  // Check that essential information is preserved
  if (!mappedData.name || mappedData.name.trim() === '') {
    errors.push('Mapped item must have a non-empty name');
  }

  if (!mappedData.description || mappedData.description.trim() === '') {
    errors.push('Mapped item must have a non-empty description');
  }

  if (!mappedData.category || mappedData.category.trim() === '') {
    errors.push('Mapped item must have a non-empty category');
  }

  if (!mappedData.coreThemes || mappedData.coreThemes.length === 0) {
    warnings.push('Mapped item should have at least one core theme');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Component documentation validation
export const validateComponentDocumentation = (componentCode: string): ComponentValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for required documentation patterns
  if (!componentCode.includes('AI AGENT PATTERN:') && !componentCode.includes('AGENT INSTRUCTION:')) {
    errors.push('Component must include AI agent documentation header');
  }

  if (!componentCode.includes('MODIFICATION STEPS:') && !componentCode.includes('TO ADAPT FOR YOUR INDUSTRY:')) {
    warnings.push('Component should include modification/adaptation instructions');
  }

  if (!componentCode.includes('USAGE EXAMPLES:')) {
    warnings.push('Component should include usage examples');
  }

  // Check for TypeScript interface
  if (!componentCode.includes('interface ') && !componentCode.includes('type ')) {
    warnings.push('Component should define TypeScript interface for props');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Comprehensive validation function
export const validateTemplateModification = (modification: {
  type: 'component' | 'data' | 'style';
  componentType?: 'ui' | 'layout' | 'features';
  filePath?: string;
  props?: any;
  data?: any;
  code?: string;
}): ComponentValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  switch (modification.type) {
    case 'component':
      if (modification.filePath && modification.componentType) {
        const fileResult = validateFileStructure(modification.filePath, modification.componentType);
        errors.push(...fileResult.errors);
        warnings.push(...fileResult.warnings);
      }

      if (modification.code) {
        const docResult = validateComponentDocumentation(modification.code);
        errors.push(...docResult.errors);
        warnings.push(...docResult.warnings);
      }

      if (modification.props) {
        // Validate props based on component type
        // This would need to be expanded based on specific component
      }
      break;

    case 'data':
      if (modification.data) {
        if (Array.isArray(modification.data)) {
          modification.data.forEach((item: any, index: number) => {
            if (!isValidBaseItem(item)) {
              errors.push(`Data item at index ${index} is not a valid BaseItem`);
            }
          });
        } else if (!isValidBaseItem(modification.data)) {
          errors.push('Data item is not a valid BaseItem');
        }
      }
      break;

    case 'style':
      // Style validation logic would go here
      break;
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Export all validation functions
export const AgentValidation = {
  isValidBaseItem,
  isValidBaseFlowData,
  validateItemGridProps,
  validatePersonalizationWizardProps,
  validateLoginFormProps,
  validateFileStructure,
  validateResponsiveClasses,
  validateIndustryDataMapping,
  validateComponentDocumentation,
  validateTemplateModification
};

export default AgentValidation;
