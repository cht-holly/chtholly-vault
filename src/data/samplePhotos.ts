/**
 * AGENT INSTRUCTION: Photography Sample Data
 * 
 * This file demonstrates how to create compelling sample data for the photography
 * example. The data includes realistic metadata, diverse categories, and
 * professional photography scenarios.
 * 
 * ADAPTATION STRATEGY:
 * 1. Replace photo URLs with your industry-specific content
 * 2. Adapt metadata fields to match your domain
 * 3. Maintain variety in categories and features
 * 4. Keep realistic, professional-quality data
 * 
 * INDUSTRY EXAMPLES:
 * - E-commerce: Product images with specifications, prices, reviews
 * - Real Estate: Property photos with details, locations, pricing
 * - Food & Beverage: Menu items with ingredients, allergens, nutritional info
 */

import { PhotoItem, PhotoGallery, PhotoCategory, CameraBrand } from '@/types/photography';

// High-quality sample photos with realistic metadata
export const samplePhotos: PhotoItem[] = [
  // Wedding Photography
  {
    id: 'wedding-ceremony-001',
    name: 'Golden Hour Ceremony',
    category: 'wedding',
    description: 'A breathtaking ceremony moment captured during golden hour at Napa Valley vineyard',
    coreThemes: ['love', 'celebration', 'elegance', 'romance'],
    tags: ['ceremony', 'natural-light', 'golden-hour', 'classic', 'people'],
    color: '#D97706', // Warm golden
    isPopular: true,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=1200&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=600&fit=crop',
    aspectRatio: 0.67, // 2:3 portrait
    camera: {
      brand: 'Canon',
      model: '5D Mark IV',
      lens: '85mm f/1.4',
      settings: {
        aperture: 'f/2.0',
        shutter: '1/320s',
        iso: 200,
        focalLength: '85mm'
      }
    },
    location: {
      city: 'Napa Valley',
      country: 'USA',
      venue: 'Silverado Resort',
      region: 'California'
    },
    shootDetails: {
      date: new Date('2024-06-15'),
      timeOfDay: 'evening',
      lighting: 'natural',
      clientType: 'wedding',
      duration: 8
    },
    isPortfolioFeatured: true,
    isClientWork: true,
    isBestWork: true,
    caption: 'Love illuminated by nature\'s perfect light',
    story: 'This moment was captured just as the sun began to set behind the rolling hills of Napa Valley. The natural backlighting created a magical atmosphere that perfectly framed this intimate ceremony moment.',
    metadata: {
      difficulty: 'intermediate',
      timeToImplement: '8 hours',
      category: 'wedding'
    }
  },

  {
    id: 'wedding-details-002',
    name: 'Vintage Wedding Details',
    category: 'wedding',
    description: 'Elegant vintage-inspired wedding details with soft natural lighting',
    coreThemes: ['elegance', 'vintage', 'details', 'craftsmanship'],
    tags: ['details', 'vintage', 'natural-light', 'macro', 'classic'],
    color: '#C084FC', // Soft purple
    isPopular: false,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
    aspectRatio: 1.5, // 3:2 landscape
    camera: {
      brand: 'Sony',
      model: 'A7R IV',
      lens: '90mm Macro',
      settings: {
        aperture: 'f/4.0',
        shutter: '1/125s',
        iso: 400,
        focalLength: '90mm'
      }
    },
    location: {
      city: 'Charleston',
      country: 'USA',
      venue: 'Historic Plantation',
      region: 'South Carolina'
    },
    shootDetails: {
      date: new Date('2024-05-20'),
      timeOfDay: 'afternoon',
      lighting: 'natural',
      clientType: 'wedding',
      duration: 1
    },
    isPortfolioFeatured: true,
    isClientWork: true,
    isBestWork: false,
    caption: 'Beauty lies in the details',
    metadata: {
      difficulty: 'beginner',
      timeToImplement: '1 hour',
      category: 'wedding'
    }
  },

  // Portrait Photography
  {
    id: 'portrait-business-003',
    name: 'Executive Portrait Session',
    category: 'portrait',
    description: 'Professional corporate headshot with dramatic studio lighting',
    coreThemes: ['professionalism', 'confidence', 'leadership', 'success'],
    tags: ['corporate', 'studio', 'people', 'modern', 'black-white'],
    color: '#1F2937', // Dark gray
    isPopular: true,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    aspectRatio: 0.8, // 4:5 portrait
    camera: {
      brand: 'Nikon',
      model: 'D850',
      lens: '105mm f/2.8',
      settings: {
        aperture: 'f/5.6',
        shutter: '1/200s',
        iso: 100,
        focalLength: '105mm'
      }
    },
    location: {
      city: 'New York',
      country: 'USA',
      venue: 'Corporate Studio',
      region: 'Manhattan'
    },
    shootDetails: {
      date: new Date('2024-07-02'),
      timeOfDay: 'afternoon',
      lighting: 'studio',
      clientType: 'commercial',
      duration: 2
    },
    isPortfolioFeatured: true,
    isClientWork: true,
    isBestWork: true,
    caption: 'Capturing leadership presence',
    metadata: {
      difficulty: 'intermediate',
      timeToImplement: '2 hours',
      category: 'portrait'
    }
  },

  {
    id: 'portrait-family-004',
    name: 'Family Lifestyle Session',
    category: 'portrait',
    description: 'Candid family moments in natural outdoor setting',
    coreThemes: ['family', 'connection', 'joy', 'authenticity'],
    tags: ['family', 'lifestyle', 'natural-light', 'people', 'color'],
    color: '#059669', // Green
    isPopular: true,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=400&fit=crop',
    aspectRatio: 1.5, // 3:2 landscape
    camera: {
      brand: 'Canon',
      model: 'R6 Mark II',
      lens: '50mm f/1.2',
      settings: {
        aperture: 'f/2.8',
        shutter: '1/250s',
        iso: 320,
        focalLength: '50mm'
      }
    },
    location: {
      city: 'Portland',
      country: 'USA',
      venue: 'Laurelhurst Park',
      region: 'Oregon'
    },
    shootDetails: {
      date: new Date('2024-06-28'),
      timeOfDay: 'morning',
      lighting: 'natural',
      clientType: 'portrait',
      duration: 1.5
    },
    isPortfolioFeatured: false,
    isClientWork: true,
    isBestWork: false,
    caption: 'Authentic moments, naturally captured',
    metadata: {
      difficulty: 'beginner',
      timeToImplement: '1.5 hours',
      category: 'portrait'
    }
  },

  // Landscape Photography
  {
    id: 'landscape-mountain-005',
    name: 'Alpine Sunrise Majesty',
    category: 'landscape',
    description: 'Dramatic mountain sunrise with layered peaks and atmospheric mist',
    coreThemes: ['nature', 'majesty', 'serenity', 'wilderness'],
    tags: ['nature', 'mountain', 'sunrise', 'wide-angle', 'color'],
    color: '#0EA5E9', // Sky blue
    isPopular: true,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=900&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=450&fit=crop',
    aspectRatio: 1.56, // 16:10 wide
    camera: {
      brand: 'Sony',
      model: 'A7R V',
      lens: '16-35mm f/2.8',
      settings: {
        aperture: 'f/11',
        shutter: '1/60s',
        iso: 100,
        focalLength: '24mm'
      }
    },
    location: {
      city: 'Banff',
      country: 'Canada',
      venue: 'Lake Louise',
      region: 'Alberta'
    },
    shootDetails: {
      date: new Date('2024-08-10'),
      timeOfDay: 'morning',
      lighting: 'natural',
      clientType: 'personal',
      duration: 3
    },
    isPortfolioFeatured: true,
    isClientWork: false,
    isBestWork: true,
    caption: 'Where earth touches heaven',
    story: 'Woke up at 4 AM to hike to this viewpoint for the perfect sunrise. The layered mountains and morning mist created this ethereal scene that lasted only minutes.',
    metadata: {
      difficulty: 'advanced',
      timeToImplement: '6 hours',
      category: 'landscape'
    }
  },

  {
    id: 'landscape-coastal-006',
    name: 'Coastal Drama',
    category: 'landscape',
    description: 'Powerful coastal scene with crashing waves and dramatic clouds',
    coreThemes: ['power', 'drama', 'ocean', 'weather'],
    tags: ['nature', 'ocean', 'dramatic', 'wide-angle', 'color'],
    color: '#0F766E', // Teal
    isPopular: false,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1400&h=900&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=700&h=450&fit=crop',
    aspectRatio: 1.56, // 16:10 wide
    camera: {
      brand: 'Fujifilm',
      model: 'X-T5',
      lens: '10-24mm f/4',
      settings: {
        aperture: 'f/8',
        shutter: '1/125s',
        iso: 160,
        focalLength: '14mm'
      }
    },
    location: {
      city: 'Big Sur',
      country: 'USA',
      venue: 'McWay Falls',
      region: 'California'
    },
    shootDetails: {
      date: new Date('2024-07-15'),
      timeOfDay: 'evening',
      lighting: 'natural',
      clientType: 'personal',
      duration: 2
    },
    isPortfolioFeatured: true,
    isClientWork: false,
    isBestWork: false,
    caption: 'Nature\'s raw power on display',
    metadata: {
      difficulty: 'intermediate',
      timeToImplement: '4 hours',
      category: 'landscape'
    }
  },

  // Commercial Photography
  {
    id: 'commercial-product-007',
    name: 'Luxury Watch Collection',
    category: 'commercial',
    description: 'High-end product photography with precision lighting and styling',
    coreThemes: ['luxury', 'precision', 'craftsmanship', 'elegance'],
    tags: ['product', 'studio', 'luxury', 'details', 'macro'],
    color: '#4F46E5', // Indigo
    isPopular: true,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1000&h=1200&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=600&fit=crop',
    aspectRatio: 0.83, // 5:6 portrait
    camera: {
      brand: 'Canon',
      model: 'R5',
      lens: '100mm Macro',
      settings: {
        aperture: 'f/16',
        shutter: '1/60s',
        iso: 100,
        focalLength: '100mm'
      }
    },
    location: {
      city: 'Los Angeles',
      country: 'USA',
      venue: 'Commercial Studio',
      region: 'California'
    },
    shootDetails: {
      date: new Date('2024-06-05'),
      timeOfDay: 'afternoon',
      lighting: 'studio',
      clientType: 'commercial',
      duration: 4
    },
    isPortfolioFeatured: true,
    isClientWork: true,
    isBestWork: true,
    caption: 'Precision meets artistry',
    metadata: {
      difficulty: 'advanced',
      timeToImplement: '6 hours',
      category: 'commercial'
    }
  },

  // Street Photography
  {
    id: 'street-urban-008',
    name: 'City Life Symphony',
    category: 'street',
    description: 'Candid moment of urban life during rush hour in downtown',
    coreThemes: ['urban', 'movement', 'life', 'spontaneity'],
    tags: ['documentary', 'people', 'urban', 'black-white', 'candid'],
    color: '#64748B', // Slate
    isPopular: false,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
    aspectRatio: 1.5, // 3:2 landscape
    camera: {
      brand: 'Leica',
      model: 'M11',
      lens: '35mm f/1.4',
      settings: {
        aperture: 'f/5.6',
        shutter: '1/500s',
        iso: 800,
        focalLength: '35mm'
      }
    },
    location: {
      city: 'Tokyo',
      country: 'Japan',
      venue: 'Shibuya Crossing',
      region: 'Tokyo'
    },
    shootDetails: {
      date: new Date('2024-07-20'),
      timeOfDay: 'evening',
      lighting: 'available',
      clientType: 'personal',
      duration: 0.5
    },
    isPortfolioFeatured: false,
    isClientWork: false,
    isBestWork: false,
    caption: 'Life in motion',
    metadata: {
      difficulty: 'intermediate',
      timeToImplement: '30 minutes',
      category: 'street'
    }
  },
  // Additional photos for better gallery diversity
  {
    id: 'street-urban-001',
    name: 'City Life',
    category: 'street',
    description: 'Candid street photography capturing urban energy',
    coreThemes: ['urban', 'lifestyle', 'energy', 'authenticity'],
    tags: ['urban', 'candid', 'people', 'documentary'],
    color: '#6B7280',
    isPopular: true,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=1200&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop',
    aspectRatio: 0.67, // 2:3 portrait
    camera: {
      brand: 'Sony',
      model: 'A7R V',
      lens: '35mm f/1.8',
      settings: {
        aperture: 'f/2.8',
        shutter: '1/125s',
        iso: 400,
        focalLength: '35mm'
      }
    },
    location: {
      city: 'New York',
      country: 'USA',
      region: 'Manhattan'
    },
    shootDetails: {
      date: new Date('2024-02-15'),
      timeOfDay: 'afternoon',
      lighting: 'available',
      clientType: 'personal',
      duration: 2
    },
    isPortfolioFeatured: true,
    isClientWork: false,
    isBestWork: false,
    caption: 'Urban energy captured',
    story: 'Captured during a spontaneous street photography session in Manhattan, this image embodies the raw energy and authentic moments of city life.',
    metadata: {
      difficulty: 'intermediate',
      timeToImplement: '45 minutes',
      category: 'street'
    }
  },
  {
    id: 'landscape-mountains-002',
    name: 'Alpine Majesty',
    category: 'landscape',
    description: 'Majestic mountain peaks during blue hour',
    coreThemes: ['nature', 'tranquility', 'adventure', 'dramatic'],
    tags: ['mountains', 'golden-hour', 'nature', 'dramatic'],
    color: '#1E40AF',
    isPopular: true,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    aspectRatio: 1.5, // 3:2 landscape
    camera: {
      brand: 'Nikon',
      model: 'D850',
      lens: '24-70mm f/2.8',
      settings: {
        aperture: 'f/8',
        shutter: '1/60s',
        iso: 100,
        focalLength: '35mm'
      }
    },
    location: {
      city: 'Banff',
      country: 'Canada',
      region: 'Alberta'
    },
    shootDetails: {
      date: new Date('2024-03-20'),
      timeOfDay: 'morning',
      lighting: 'natural',
      clientType: 'personal',
      duration: 3
    },
    isPortfolioFeatured: true,
    isClientWork: false,
    isBestWork: true,
    caption: 'Nature\'s grandeur',
    story: 'This breathtaking vista was captured during a hiking expedition in the Canadian Rockies, showcasing the raw beauty of alpine landscapes.',
    metadata: {
      difficulty: 'advanced',
      timeToImplement: '2 hours',
      category: 'landscape'
    }
  },
  {
    id: 'portrait-fashion-002',
    name: 'Urban Fashion',
    category: 'portrait',
    description: 'Contemporary fashion portrait with urban backdrop',
    coreThemes: ['fashion', 'contemporary', 'urban', 'style'],
    tags: ['people', 'urban', 'modern', 'elegant'],
    color: '#DC2626',
    isPopular: false,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1200&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop',
    aspectRatio: 0.67, // 2:3 portrait
    camera: {
      brand: 'Canon',
      model: 'R5',
      lens: '85mm f/1.2',
      settings: {
        aperture: 'f/1.8',
        shutter: '1/200s',
        iso: 160,
        focalLength: '85mm'
      }
    },
    location: {
      city: 'Los Angeles',
      country: 'USA',
      region: 'California'
    },
    shootDetails: {
      date: new Date('2024-01-10'),
      timeOfDay: 'afternoon',
      lighting: 'available',
      clientType: 'commercial',
      duration: 1.5
    },
    isPortfolioFeatured: false,
    isClientWork: true,
    isBestWork: false,
    caption: 'Contemporary style',
    story: 'A modern fashion portrait session in downtown LA, blending urban architecture with contemporary style for a fashion editorial.',
    metadata: {
      difficulty: 'intermediate',
      timeToImplement: '1 hour',
      category: 'portrait'
    }
  }
];

// Featured galleries showcasing different photography styles
export const featuredGalleries: PhotoGallery[] = [
  {
    id: 'gallery-wedding-vineyard',
    title: 'Napa Valley Wedding',
    description: 'An elegant vineyard wedding captured during golden hour',
    category: 'wedding',
    coverPhoto: samplePhotos[0], // Golden Hour Ceremony
    photos: samplePhotos.filter(p => p.category === 'wedding'),
    tags: ['wedding', 'vineyard', 'golden-hour', 'elegant'],
    location: {
      city: 'Napa Valley',
      country: 'USA',
      region: 'California'
    },
    date: new Date('2024-06-15'),
    isPublic: true,
    isFeatured: true
  },
  {
    id: 'gallery-landscape-alpine',
    title: 'Alpine Adventures',
    description: 'Breathtaking mountain landscapes from Canadian Rockies',
    category: 'landscape',
    coverPhoto: samplePhotos[4], // Alpine Sunrise Majesty
    photos: samplePhotos.filter(p => p.category === 'landscape'),
    tags: ['landscape', 'mountains', 'nature', 'sunrise'],
    location: {
      city: 'Banff',
      country: 'Canada',
      region: 'Alberta'
    },
    date: new Date('2024-08-10'),
    isPublic: true,
    isFeatured: true
  }
];

// Helper function to get category information with colors and descriptions
export const getCategoryInfo = (category: PhotoCategory) => {
  const categoryMap = {
    wedding: {
      label: 'Wedding',
      color: '#D97706', // Warm amber
      description: 'Capturing love stories and celebration moments',
      icon: '💍'
    },
    portrait: {
      label: 'Portrait',
      color: '#059669', // Green
      description: 'Professional and lifestyle portrait photography',
      icon: '👤'
    },
    landscape: {
      label: 'Landscape',
      color: '#0EA5E9', // Sky blue
      description: 'Nature and scenic photography',
      icon: '🏔️'
    },
    commercial: {
      label: 'Commercial',
      color: '#4F46E5', // Indigo
      description: 'Product and brand photography',
      icon: '📸'
    },
    street: {
      label: 'Street',
      color: '#64748B', // Slate
      description: 'Documentary and urban life photography',
      icon: '🏙️'
    }
  };

  return categoryMap[category] || categoryMap.portrait;
};

// Helper function to get camera brand information
export const getCameraBrandInfo = (brand: CameraBrand) => {
  const brandMap = {
    Canon: { color: '#DC2626', icon: '📷' },
    Nikon: { color: '#FCD34D', icon: '📷' },
    Sony: { color: '#1F2937', icon: '📷' },
    Fujifilm: { color: '#059669', icon: '📷' },
    Leica: { color: '#DC2626', icon: '📷' },
    Olympus: { color: '#3B82F6', icon: '📷' },
    Panasonic: { color: '#6366F1', icon: '📷' },
    Other: { color: '#6B7280', icon: '📷' }
  };

  return brandMap[brand] || brandMap.Other;
};

// Helper functions for filtering and sorting
export const getPhotosByCategory = (category: PhotoCategory) => {
  return samplePhotos.filter(photo => photo.category === category);
};

export const getFeaturedPhotos = () => {
  return samplePhotos.filter(photo => photo.isFeatured);
};

export const getPortfolioPhotos = () => {
  return samplePhotos.filter(photo => photo.isPortfolioFeatured);
};

export const getBestWorkPhotos = () => {
  return samplePhotos.filter(photo => photo.isBestWork);
};

export const getPhotosByLocation = (city: string) => {
  return samplePhotos.filter(photo => 
    photo.location.city.toLowerCase().includes(city.toLowerCase())
  );
};

export const getPhotosByCameraBrand = (brand: CameraBrand) => {
  return samplePhotos.filter(photo => photo.camera.brand === brand);
};

export const searchPhotos = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return samplePhotos.filter(photo =>
    photo.name.toLowerCase().includes(lowerQuery) ||
    photo.description.toLowerCase().includes(lowerQuery) ||
    photo.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    photo.location.city.toLowerCase().includes(lowerQuery) ||
    photo.location.country.toLowerCase().includes(lowerQuery)
  );
};

// Sample photographer profile data
export const photographerProfile = {
  name: 'Alex Chen',
  title: 'Professional Photographer',
  bio: 'Specializing in weddings, portraits, and landscape photography with over 8 years of experience capturing life\'s most precious moments.',
  location: 'San Francisco, CA',
  specialties: ['Wedding Photography', 'Portrait Sessions', 'Landscape Art'],
  contact: {
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    website: 'https://alexchen.photography'
  },
  social: {
    instagram: '@alexchenphotography',
    facebook: 'alexchenphotography',
    behance: 'alexchen'
  },
  stats: {
    totalPhotos: samplePhotos.length,
    weddingsShot: 150,
    yearsExperience: 8,
    happyClients: 500
  }
};

/**
 * INDUSTRY ADAPTATION EXAMPLES:
 * 
 * E-commerce Products:
 * ```typescript
 * export const sampleProducts: Product[] = [
 *   {
 *     id: 'product-laptop-001',
 *     name: 'MacBook Pro 16"',
 *     category: 'electronics',
 *     price: 2499,
 *     images: ['main.jpg', 'side.jpg', 'ports.jpg'],
 *     specifications: { cpu: 'M3 Pro', ram: '32GB', storage: '1TB' }
 *   }
 * ];
 * ```
 * 
 * Real Estate Properties:
 * ```typescript
 * export const sampleProperties: Property[] = [
 *   {
 *     id: 'property-house-001',
 *     name: 'Modern Family Home',
 *     category: 'residential',
 *     price: 850000,
 *     images: ['exterior.jpg', 'kitchen.jpg', 'bedroom.jpg'],
 *     details: { bedrooms: 4, bathrooms: 3, sqft: 2400 }
 *   }
 * ];
 * ```
 */
