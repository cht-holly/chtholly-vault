/**
 * AGENT INSTRUCTION: PhotoGrid Component
 * 
 * This component creates a stunning masonry-style photo gallery that adapts
 * from the base ItemGrid pattern. It demonstrates how to create industry-specific
 * layouts while maintaining the core template principles.
 * 
 * ADAPTATION GUIDE:
 * 1. Replace PhotoItem with your industry-specific interface
 * 2. Customize the card layout for your content type
 * 3. Adapt filtering and search for your domain
 * 4. Maintain responsive behavior and mobile-first design
 * 
 * CREATIVE FEATURES:
 * - Masonry grid layout for dynamic image sizes
 * - Smooth hover effects with metadata preview
 * - Advanced filtering by category, location, camera brand
 * - Progressive loading with blur-up effect
 * - Mobile-optimized touch interactions
 * 
 * RESPONSIVE BEHAVIOR:
 * - Mobile: Single column with full-width cards
 * - Tablet: Two columns with medium spacing
 * - Desktop: 3-4 columns based on screen size
 * - Touch optimization: Proper touch targets and gestures
 * 
 * INDUSTRY ADAPTATIONS:
 * - E-commerce: Product grid with prices, ratings, quick add
 * - Real Estate: Property grid with details, virtual tours
 * - Portfolio: Work samples with project details, client info
 * - Social Media: Post grid with engagement metrics, actions
 */

import { useState, useMemo } from 'react';
import { PhotoItem, PhotoCategory, CameraBrand, PhotoFilters } from '@/types/photography';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCategoryInfo } from '@/data/samplePhotos';
import { Camera, MapPin, Eye } from 'lucide-react';

interface PhotoCardProps {
  photo: PhotoItem;
  onSelectPhoto: (photo: PhotoItem) => void;
  className?: string;
  style?: React.CSSProperties;
}

const PhotoCard = ({ photo, onSelectPhoto, className = '', style }: PhotoCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const categoryInfo = getCategoryInfo(photo.category);

  const handleSelectPhoto = () => {
    onSelectPhoto(photo);
  };

  return (
    <Card 
      className={`
        group cursor-pointer touch-manipulation overflow-hidden 
        border-0 bg-white dark:bg-gray-800
        shadow-sm hover:shadow-2xl
        transition-all duration-500 ease-out
        transform hover:scale-[1.02] hover:-translate-y-1
        w-full
        ${photo.isFeatured ? 'ring-2 ring-yellow-300 dark:ring-yellow-500' : ''}
        ${className}
      `}
      style={{ 
        boxShadow: `
          0 1px 3px 0 rgba(0, 0, 0, 0.1),
          0 1px 2px 0 rgba(0, 0, 0, 0.06)
        `,
        '--hover-shadow': `
          0 25px 50px -12px rgba(0, 0, 0, 0.25),
          0 10px 20px -5px rgba(0, 0, 0, 0.1),
          0 4px 6px -2px rgba(0, 0, 0, 0.05)
        `,
        ...style
      } as React.CSSProperties}
      onClick={handleSelectPhoto}
    >
      <div className="relative overflow-hidden">
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div 
            className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse w-full"
            style={{ aspectRatio: photo.aspectRatio }}
          />
        )}
        
        {/* Main image */}
        <img
          src={photo.imageUrl}
          alt={photo.name}
          className={`w-full h-auto object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ aspectRatio: photo.aspectRatio }}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Overlay with metadata */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
            {/* Title and category */}
            <div className="mb-2">
              <h3 className="font-semibold text-sm sm:text-base mb-1 line-clamp-2">
                {photo.name}
              </h3>
              <Badge 
                className="text-xs"
                style={{ backgroundColor: categoryInfo.color }}
              >
                {categoryInfo.label}
              </Badge>
            </div>
            
            {/* Metadata icons */}
            <div className="flex items-center gap-3 text-xs sm:text-sm opacity-90">
              <div className="flex items-center gap-1">
                <Camera className="w-3 h-3" />
                <span>{photo.camera.brand}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{photo.location.city}</span>
              </div>
              {photo.isPortfolioFeatured && (
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>Featured</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {photo.isFeatured && (
            <Badge variant="secondary" className="text-xs">
              Featured
            </Badge>
          )}
          {photo.isBestWork && (
            <Badge variant="outline" className="text-xs bg-white/90 text-gray-700">
              Best Work
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};

interface PhotoFilterProps {
  filters: PhotoFilters;
  onFiltersChange: (filters: PhotoFilters) => void;
  totalCount: number;
}

const PhotoFilter = ({ filters, onFiltersChange, totalCount }: PhotoFilterProps) => {
  const categories: PhotoCategory[] = ['wedding', 'portrait', 'landscape', 'commercial', 'street'];
  const cameraBrands: CameraBrand[] = ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Leica'];

  const updateFilters = (key: keyof PhotoFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleCategory = (category: PhotoCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilters('categories', newCategories);
  };

  const toggleCameraBrand = (brand: CameraBrand) => {
    const newBrands = filters.cameraBrands.includes(brand)
      ? filters.cameraBrands.filter(b => b !== brand)
      : [...filters.cameraBrands, brand];
    updateFilters('cameraBrands', newBrands);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      tags: [],
      locations: [],
      cameraBrands: [],
      clientTypes: [],
      search: ''
    });
  };

  const hasActiveFilters = filters.categories.length > 0 || 
                          filters.cameraBrands.length > 0 || 
                          filters.featured !== undefined ||
                          (filters.search && filters.search.length > 0);

  return (
    <div className="space-y-4 mb-6">
      {/* Results count and clear filters */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {totalCount} {totalCount === 1 ? 'photo' : 'photos'} found
        </p>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-xs"
          >
            Clear all filters
          </Button>
        )}
      </div>

      {/* Category filters */}
      <div>
        <h4 className="text-sm font-medium mb-2">Categories</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const info = getCategoryInfo(category);
            const isActive = filters.categories.includes(category);
            return (
              <Button
                key={category}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => toggleCategory(category)}
                className={`text-xs ${isActive ? 'shadow-md' : ''}`}
                style={isActive ? { backgroundColor: info.color } : {}}
              >
                {info.icon} {info.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Camera brand filters */}
      <div>
        <h4 className="text-sm font-medium mb-2">Camera Brands</h4>
        <div className="flex flex-wrap gap-2">
          {cameraBrands.map((brand) => {
            const isActive = filters.cameraBrands.includes(brand);
            return (
              <Button
                key={brand}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => toggleCameraBrand(brand)}
                className="text-xs"
              >
                📷 {brand}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Featured toggle */}
      <div>
        <Button
          variant={filters.featured ? "default" : "outline"}
          size="sm"
          onClick={() => updateFilters('featured', filters.featured ? undefined : true)}
          className="text-xs"
        >
          ⭐ Featured Work
        </Button>
      </div>
    </div>
  );
};

interface PhotoGridProps {
  photos: PhotoItem[];
  title?: string;
  onPhotoSelect?: (photo: PhotoItem) => void;
  onLightboxOpen?: (photo: PhotoItem, photos: PhotoItem[]) => void;
  showFilters?: boolean;
}

export const PhotoGrid = ({
  photos = [],
  title,
  onPhotoSelect,
  onLightboxOpen,
  showFilters = true
}: PhotoGridProps) => {
  const [filters, setFilters] = useState<PhotoFilters>({
    categories: [],
    tags: [],
    locations: [],
    cameraBrands: [],
    clientTypes: []
  });

  // Filter photos based on current filters
  const filteredPhotos = useMemo(() => {
    return photos.filter(photo => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(photo.category)) {
        return false;
      }

      // Camera brand filter
      if (filters.cameraBrands.length > 0 && !filters.cameraBrands.includes(photo.camera.brand)) {
        return false;
      }

      // Featured filter
      if (filters.featured !== undefined && photo.isFeatured !== filters.featured) {
        return false;
      }

      // Search filter
      if (filters.search && filters.search.length > 0) {
        const searchLower = filters.search.toLowerCase();
        const searchFields = [
          photo.name,
          photo.description,
          photo.location.city,
          photo.location.country,
          photo.camera.brand,
          photo.camera.model,
          ...photo.tags
        ].join(' ').toLowerCase();
        
        if (!searchFields.includes(searchLower)) {
          return false;
        }
      }

      return true;
    });
  }, [photos, filters]);

  const handlePhotoSelect = (photo: PhotoItem) => {
    if (onLightboxOpen) {
      onLightboxOpen(photo, filteredPhotos);
    } else if (onPhotoSelect) {
      onPhotoSelect(photo);
    }
  };

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No photos found</h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters or check back later for new content.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      {title && (
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">
            Capturing moments that tell stories
          </p>
        </div>
      )}

      {/* Filters */}
      {showFilters && (
        <PhotoFilter 
          filters={filters}
          onFiltersChange={setFilters}
          totalCount={filteredPhotos.length}
        />
      )}

      {/* Empty state after filtering */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-12">
          <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No photos match your filters</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Try adjusting your filter criteria or clear all filters to see more photos.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setFilters({ categories: [], tags: [], locations: [], cameraBrands: [], clientTypes: [] })}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        /* Professional Photo Gallery with Masonry Layout */
        <div 
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-4 lg:gap-6 space-y-3 sm:space-y-4 lg:space-y-6"
        >
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className={`
                break-inside-avoid mb-3 sm:mb-4 lg:mb-6
                animate-fadeIn
                ${index % 3 === 0 ? 'sm:animate-slideInLeft' : ''}
                ${index % 3 === 1 ? 'sm:animate-slideInUp' : ''}
                ${index % 3 === 2 ? 'sm:animate-slideInRight' : ''}
              `}
              style={{
                animationDelay: `${Math.min(index * 50, 500)}ms`
              }}
            >
              <PhotoCard
                photo={photo}
                onSelectPhoto={handlePhotoSelect}
                className=""
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * USAGE EXAMPLES:
 * 
 * Basic photo gallery:
 * <PhotoGrid photos={samplePhotos} title="Portfolio Gallery" />
 * 
 * With lightbox integration:
 * <PhotoGrid 
 *   photos={weddingPhotos} 
 *   title="Wedding Photography"
 *   onLightboxOpen={openLightbox}
 *   showFilters={true}
 * />
 * 
 * Filtered gallery:
 * <PhotoGrid 
 *   photos={filteredPhotos} 
 *   onPhotoSelect={selectPhoto}
 *   showFilters={false}
 * />
 * 
 * INDUSTRY ADAPTATIONS:
 * 
 * E-commerce Product Grid:
 * <ProductGrid 
 *   products={products} 
 *   title="Featured Products"
 *   onProductSelect={openProductDetails}
 *   showFilters={true}
 * />
 * 
 * Real Estate Listings:
 * <PropertyGrid 
 *   properties={properties} 
 *   title="Available Properties"
 *   onPropertySelect={openPropertyDetails}
 *   showFilters={true}
 * />
 */
