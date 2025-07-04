/**
 * AGENT INSTRUCTION: Base Type System
 * 
 * These are the core types that should be adapted for any industry.
 * Follow this pattern to maintain consistency across all components.
 * 
 * When adapting for other industries:
 * 1. Replace BaseItem properties with industry-specific fields
 * 2. Customize categories for your domain (e.g., 'wedding', 'portrait', 'commercial' for photography)
 * 3. Adapt the PersonalizationData to match your customization flow
 * 4. Keep the same structure but change field names and values
 * 
 * Examples:
 * - E-commerce: BaseItem = Product, categories = clothing/electronics/books
 * - Photography: BaseItem = Gallery, categories = wedding/portrait/landscape
 * - Social: BaseItem = Post, categories = text/image/video
 */

// Base entity that all items should extend
export interface BaseItem {
  id: string;
  name: string; // "Confident Alpha" -> "Wedding Gallery", "iPhone 15", "Fitness Post"
  category: string; // Define specific union types for your industry
  description: string;
  coreThemes: string[]; // "confidence, leadership" -> "elegant, romantic", "fast, reliable"
  tags: string[]; // Flexible tagging system
  iconUrl?: string;
  color: string; // Brand color for theming
  isPopular?: boolean;
  isFeatured?: boolean; // Changed from isTrending for more generic use
  metadata?: Record<string, any>; // Industry-specific additional data
}

// Base flow data for multi-step processes
export interface BaseFlowData {
  goal: string; // What the user wants to achieve
  currentSituation: string; // Where they are now
  challenges: string[]; // What obstacles they face
  desiredOutcomes: string[]; // What success looks like
  customizations: {
    style: string; // 'gentle' | 'powerful' | 'elegant' | 'modern'
    approach: string; // 'first-person' | 'second-person' | 'formal' | 'casual'
    timeframe: string; // 'present' | 'future' | 'immediate' | 'long-term'
    intensity: 1 | 2 | 3 | 4 | 5; // Level of engagement/complexity
  };
  preferences?: Record<string, any>; // Industry-specific preferences
}

// Generic result/output interface
export interface GeneratedResult {
  id: string;
  itemId: string; // References the BaseItem
  title: string;
  content: any[]; // Could be affirmations, photos, products, etc.
  output?: Blob | string; // Generated file, URL, or data
  outputUrl?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

// Multi-step flow configuration
export interface FlowStep {
  id: number;
  title: string;
  description: string;
  isRequired: boolean;
  component?: string; // React component name for this step
}

// User interaction tracking
export interface UserPreferences {
  selectedItems: string[]; // IDs of selected BaseItems
  completedFlows: string[]; // IDs of completed flows
  customSettings: Record<string, any>;
  lastActivity: Date;
}

/**
 * INDUSTRY ADAPTATION EXAMPLES:
 * 
 * Photography App:
 * interface Gallery extends BaseItem {
 *   category: 'wedding' | 'portrait' | 'landscape' | 'commercial';
 *   photoCount: number;
 *   pricing: { session: number; prints: number; };
 * }
 * 
 * E-commerce App:
 * interface Product extends BaseItem {
 *   category: 'electronics' | 'clothing' | 'books' | 'home';
 *   price: number;
 *   inStock: boolean;
 *   rating: number;
 * }
 * 
 * Social Media App:
 * interface Post extends BaseItem {
 *   category: 'text' | 'image' | 'video' | 'poll';
 *   author: User;
 *   likes: number;
 *   comments: Comment[];
 * }
 */
