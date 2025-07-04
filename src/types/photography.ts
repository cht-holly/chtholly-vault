/**
 * AGENT INSTRUCTION: Photography Types
 * 
 * This file extends the base types for photography-specific functionality.
 * These interfaces demonstrate how to adapt the generic BaseItem structure
 * for a specific industry while maintaining all core template patterns.
 * 
 * ADAPTATION PATTERN:
 * 1. Extend BaseItem with industry-specific properties
 * 2. Create specialized interfaces for domain objects
 * 3. Maintain type safety and documentation
 * 4. Provide examples for other industries
 * 
 * INDUSTRY ADAPTATIONS:
 * - E-commerce: Product extends BaseItem with pricing, inventory, reviews
 * - Healthcare: Service extends BaseItem with duration, providers, insurance
 * - Education: Course extends BaseItem with lessons, instructor, prerequisites
 */

import { BaseItem, BaseFlowData } from './base';

// Photography-specific categories
export type PhotoCategory = 'wedding' | 'portrait' | 'landscape' | 'commercial' | 'street';

// Camera brands for filtering
export type CameraBrand = 'Canon' | 'Nikon' | 'Sony' | 'Fujifilm' | 'Leica' | 'Olympus' | 'Panasonic' | 'Other';

// Photo tags for advanced filtering
export type PhotoTag = 
  // Style tags
  | 'artistic' | 'documentary' | 'creative' | 'classic' | 'modern' | 'vintage' | 'elegant' | 'candid'
  // Technical tags
  | 'black-white' | 'color' | 'natural-light' | 'studio' | 'golden-hour' | 'night' | 'sunrise'
  // Subject tags
  | 'people' | 'nature' | 'architecture' | 'details' | 'macro' | 'wide-angle' | 'urban' | 'product' | 'luxury'
  // Event tags
  | 'ceremony' | 'reception' | 'engagement' | 'family' | 'corporate' | 'lifestyle' | 'wedding'
  // Location/Setting tags
  | 'mountain' | 'ocean' | 'vineyard' | 'dramatic' | 'landscape' | 'mountains';

// Location information
export interface LocationInfo {
  city: string;
  country: string;
  venue?: string;
  region?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Camera and technical details
export interface CameraInfo {
  brand: CameraBrand;
  model: string;
  lens: string;
  settings: {
    aperture: string;    // e.g., "f/2.8"
    shutter: string;     // e.g., "1/250s"
    iso: number;         // e.g., 400
    focalLength: string; // e.g., "85mm"
  };
}

// Shoot details and context
export interface ShootDetails {
  date: Date;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  lighting: 'natural' | 'studio' | 'mixed' | 'available';
  clientType: 'wedding' | 'portrait' | 'commercial' | 'personal' | 'event';
  duration?: number; // in hours
}

// Extended photo item interface
export interface PhotoItem extends BaseItem {
  // Visual properties
  imageUrl: string;
  thumbnailUrl: string;
  aspectRatio: number; // width/height for masonry layout
  
  // Photography metadata
  camera: CameraInfo;
  location: LocationInfo;
  shootDetails: ShootDetails;
  
  // Content organization
  category: PhotoCategory;
  tags: PhotoTag[];
  
  // Portfolio management
  isPortfolioFeatured: boolean;
  isClientWork: boolean;
  isBestWork: boolean;
  
  // Additional metadata
  caption?: string;
  story?: string; // Longer description of the photo story
  series?: string; // If part of a photo series
}

// Photo booking/inquiry data (extends BaseFlowData)
export interface PhotoBookingData extends BaseFlowData {
  // Event details
  eventType: PhotoCategory;
  eventDate: Date;
  eventLocation: LocationInfo;
  guestCount?: number;
  
  // Photography requirements
  hours: number;
  style: PhotoTag[];
  deliverables: string[];
  specialRequests: string[];
  
  // Contact information
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    preferredContact: 'email' | 'phone' | 'text';
  };
  
  // Budget and timeline
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  timeline: string;
}

// Gallery collection interface
export interface PhotoGallery {
  id: string;
  title: string;
  description: string;
  category: PhotoCategory;
  coverPhoto: PhotoItem;
  photos: PhotoItem[];
  tags: PhotoTag[];
  location?: LocationInfo;
  date: Date;
  isPublic: boolean;
  isFeatured: boolean;
}

// Filter state for photo browsing
export interface PhotoFilters {
  categories: PhotoCategory[];
  tags: PhotoTag[];
  locations: string[];
  cameraBrands: CameraBrand[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  clientTypes: string[];
  featured?: boolean;
  search?: string;
}

// Photography statistics for portfolio
export interface PhotoStats {
  totalPhotos: number;
  categoryCounts: Record<PhotoCategory, number>;
  popularTags: PhotoTag[];
  topLocations: string[];
  cameraUsage: Record<CameraBrand, number>;
  yearlyStats: Record<number, number>;
}

/**
 * USAGE EXAMPLES:
 * 
 * Basic Photo Display:
 * ```tsx
 * const photo: PhotoItem = {
 *   ...baseItemProps,
 *   imageUrl: "/photos/wedding-001.jpg",
 *   camera: { brand: "Canon", model: "5D Mark IV", ... },
 *   location: { city: "San Francisco", country: "USA" },
 *   category: "wedding",
 *   tags: ["ceremony", "natural-light", "classic"]
 * };
 * ```
 * 
 * Gallery Filter:
 * ```tsx
 * const filters: PhotoFilters = {
 *   categories: ["wedding", "portrait"],
 *   tags: ["natural-light"],
 *   cameraBrands: ["Canon", "Sony"],
 *   featured: true
 * };
 * ```
 * 
 * INDUSTRY ADAPTATION EXAMPLES:
 * 
 * E-commerce Product:
 * ```typescript
 * interface Product extends BaseItem {
 *   price: number;
 *   images: string[];
 *   inventory: number;
 *   specifications: Record<string, string>;
 *   reviews: Review[];
 * }
 * ```
 * 
 * Healthcare Service:
 * ```typescript
 * interface MedicalService extends BaseItem {
 *   duration: number;
 *   providerTypes: string[];
 *   insuranceAccepted: string[];
 *   location: LocationInfo;
 *   availability: TimeSlot[];
 * }
 * ```
 */
