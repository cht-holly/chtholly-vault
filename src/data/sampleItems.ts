/**
 * AGENT INSTRUCTION: Sample Data Template
 * 
 * This file contains sample data that demonstrates the BaseItem structure.
 * When adapting for other industries:
 * 
 * 1. Replace these items with your industry-specific data
 * 2. Keep the same structure but change content
 * 3. Maintain the variety of categories and features shown
 * 4. Preserve the mix of popular/featured items for UI testing
 * 
 * Examples of adaptation:
 * - Photography: Replace with gallery data (wedding, portrait, etc.)
 * - E-commerce: Replace with product data (electronics, clothing, etc.)
 * - Social: Replace with post/content data (text, image, video, etc.)
 */

import { BaseItem } from '@/types/base';

export const sampleItems: BaseItem[] = [
  // Technology/Productivity Category
  {
    id: 'tech-productivity-1',
    name: 'Focus Flow',
    category: 'productivity',
    description: 'Streamlined workflow system for maximum productivity and focus',
    coreThemes: ['focus', 'efficiency', 'workflow', 'clarity'],
    tags: ['productivity', 'focus', 'workflow', 'efficiency', 'time-management'],
    color: '#3B82F6', // Blue
    isPopular: true,
    isFeatured: false,
    metadata: {
      difficulty: 'beginner',
      timeToImplement: '1 week',
      category: 'productivity'
    }
  },
  {
    id: 'tech-creative-2',
    name: 'Creative Catalyst',
    category: 'creativity',
    description: 'Unlock your creative potential with innovative thinking patterns',
    coreThemes: ['creativity', 'innovation', 'inspiration', 'originality'],
    tags: ['creativity', 'innovation', 'design', 'art', 'inspiration'],
    color: '#10B981', // Green
    isPopular: true,
    isFeatured: true,
    metadata: {
      difficulty: 'intermediate',
      timeToImplement: '2 weeks',
      category: 'creativity'
    }
  },

  // Lifestyle Category
  {
    id: 'life-wellness-3',
    name: 'Mindful Balance',
    category: 'wellness',
    description: 'Achieve work-life balance through mindful living practices',
    coreThemes: ['balance', 'mindfulness', 'wellness', 'harmony'],
    tags: ['wellness', 'balance', 'mindfulness', 'health', 'lifestyle'],
    color: '#8B5CF6', // Purple
    isPopular: false,
    isFeatured: true,
    metadata: {
      difficulty: 'beginner',
      timeToImplement: '3 days',
      category: 'wellness'
    }
  },
  {
    id: 'life-adventure-4',
    name: 'Adventure Seeker',
    category: 'lifestyle',
    description: 'Embrace new experiences and step outside your comfort zone',
    coreThemes: ['adventure', 'exploration', 'growth', 'courage'],
    tags: ['adventure', 'travel', 'exploration', 'courage', 'growth'],
    color: '#F59E0B', // Orange
    isPopular: false,
    isFeatured: false,
    metadata: {
      difficulty: 'advanced',
      timeToImplement: '1 month',
      category: 'lifestyle'
    }
  },

  // Business Category
  {
    id: 'biz-leadership-5',
    name: 'Strategic Leader',
    category: 'business',
    description: 'Develop strategic thinking and leadership capabilities',
    coreThemes: ['leadership', 'strategy', 'vision', 'influence'],
    tags: ['leadership', 'business', 'strategy', 'management', 'influence'],
    color: '#EF4444', // Red
    isPopular: true,
    isFeatured: false,
    metadata: {
      difficulty: 'advanced',
      timeToImplement: '6 weeks',
      category: 'business'
    }
  },
  {
    id: 'biz-networking-6',
    name: 'Connection Builder',
    category: 'business',
    description: 'Build meaningful professional relationships and networks',
    coreThemes: ['networking', 'relationships', 'communication', 'influence'],
    tags: ['networking', 'communication', 'relationships', 'business', 'growth'],
    color: '#06B6D4', // Cyan
    isPopular: false,
    isFeatured: true,
    metadata: {
      difficulty: 'intermediate',
      timeToImplement: '4 weeks',
      category: 'business'
    }
  },

  // Health & Fitness Category
  {
    id: 'health-energy-7',
    name: 'Energy Optimizer',
    category: 'health',
    description: 'Boost your natural energy levels and vitality',
    coreThemes: ['energy', 'vitality', 'health', 'stamina'],
    tags: ['health', 'energy', 'fitness', 'nutrition', 'vitality'],
    color: '#84CC16', // Lime
    isPopular: true,
    isFeatured: true,
    metadata: {
      difficulty: 'beginner',
      timeToImplement: '2 weeks',
      category: 'health'
    }
  },
  {
    id: 'health-recovery-8',
    name: 'Recovery Master',
    category: 'health',
    description: 'Optimize sleep and recovery for peak performance',
    coreThemes: ['recovery', 'sleep', 'restoration', 'performance'],
    tags: ['sleep', 'recovery', 'health', 'performance', 'restoration'],
    color: '#6366F1', // Indigo
    isPopular: false,
    isFeatured: false,
    metadata: {
      difficulty: 'intermediate',
      timeToImplement: '3 weeks',
      category: 'health'
    }
  },

  // Learning Category
  {
    id: 'learn-skill-9',
    name: 'Skill Accelerator',
    category: 'learning',
    description: 'Master new skills faster with optimized learning techniques',
    coreThemes: ['learning', 'mastery', 'skills', 'growth'],
    tags: ['learning', 'skills', 'education', 'mastery', 'development'],
    color: '#EC4899', // Pink
    isPopular: true,
    isFeatured: false,
    metadata: {
      difficulty: 'intermediate',
      timeToImplement: '5 weeks',
      category: 'learning'
    }
  }
];

/**
 * CATEGORY MAPPING HELPER
 * 
 * Use this to get category-specific styling and behavior.
 * Adapt the categories and colors for your industry.
 */
export const getCategoryInfo = (category: string) => {
  const categoryMap = {
    productivity: {
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      icon: '⚡',
      description: 'Efficiency and workflow optimization'
    },
    creativity: {
      color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      icon: '🎨',
      description: 'Creative thinking and innovation'
    },
    wellness: {
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      icon: '🧘',
      description: 'Mind-body balance and wellness'
    },
    lifestyle: {
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      icon: '🌟',
      description: 'Lifestyle enhancement and growth'
    },
    business: {
      color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      icon: '💼',
      description: 'Professional and business development'
    },
    health: {
      color: 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300',
      icon: '💪',
      description: 'Physical health and fitness'
    },
    learning: {
      color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      icon: '📚',
      description: 'Skill development and learning'
    }
  };

  return categoryMap[category as keyof typeof categoryMap] || {
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    icon: '📋',
    description: 'General category'
  };
};

/**
 * FILTERING HELPERS
 * 
 * These functions help filter and sort the items.
 * Adapt the logic for your industry needs.
 */

export const getPopularItems = () => sampleItems.filter(item => item.isPopular);
export const getFeaturedItems = () => sampleItems.filter(item => item.isFeatured);
export const getItemsByCategory = (category: string) => 
  sampleItems.filter(item => item.category === category);

export const getAllCategories = () => {
  const categories = [...new Set(sampleItems.map(item => item.category))];
  return categories.sort();
};

export const searchItems = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return sampleItems.filter(item => 
    item.name.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    item.coreThemes.some(theme => theme.toLowerCase().includes(lowercaseQuery))
  );
};
