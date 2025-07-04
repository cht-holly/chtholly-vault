/**
 * AGENT INSTRUCTION: PhotoHero Component
 * 
 * This component creates a stunning hero section for the photography portfolio
 * with parallax effects and immersive design. It demonstrates advanced UX patterns
 * that can be adapted for any visual industry.
 * 
 * ADAPTATION GUIDE:
 * 1. Replace PhotoItem with your industry-specific item type
 * 2. Customize the hero content and call-to-action
 * 3. Adapt the parallax effect for your brand aesthetic
 * 4. Maintain the mobile-first responsive behavior
 * 
 * CREATIVE FEATURES:
 * - Parallax scrolling effect on hero background
 * - Animated text entrance with staggered timing
 * - Smooth scroll navigation to content
 * - Responsive overlay with optimal contrast
 * - Touch-optimized interactions
 * 
 * INDUSTRY ADAPTATIONS:
 * - E-commerce: Featured product showcase with dynamic pricing
 * - Real Estate: Property hero with key details and virtual tour
 * - Portfolio: Project showcase with client testimonials
 * - Fashion: Model portfolio with booking CTA
 * - Travel: Destination showcase with booking integration
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PhotoItem } from '@/types/photography';
import { ChevronDown, Camera, Eye, MapPin } from 'lucide-react';

interface PhotoHeroProps {
  featuredPhoto: PhotoItem;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  onScrollToGallery?: () => void;
  className?: string;
}

export const PhotoHero = ({
  featuredPhoto,
  title = "Photography Portfolio",
  subtitle = "Capturing moments that tell extraordinary stories",
  ctaText = "Explore Gallery",
  onCtaClick,
  onScrollToGallery,
  className = ""
}: PhotoHeroProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Image loading
  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = featuredPhoto.imageUrl;
  }, [featuredPhoto.imageUrl]);

  const handleScrollToGallery = () => {
    if (onScrollToGallery) {
      onScrollToGallery();
    } else {
      // Default smooth scroll to gallery
      const galleryElement = document.querySelector('[data-gallery-section]');
      if (galleryElement) {
        galleryElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={`relative h-screen overflow-hidden ${className}`}>
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        {/* Loading placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
        )}
        
        {/* Hero Image */}
        <img
          src={featuredPhoto.imageUrl}
          alt={featuredPhoto.name}
          className={`
            w-full h-full object-cover scale-110 transition-opacity duration-1000
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        
        {/* Pattern Overlay for Visual Interest */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        {/* Photo Category Badge */}
        <Badge 
          variant="outline" 
          className="mb-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 animate-slideInUp"
          style={{ animationDelay: '0.2s' }}
        >
          <Camera className="w-3 h-3 mr-1" />
          {featuredPhoto.category.charAt(0).toUpperCase() + featuredPhoto.category.slice(1)} Photography
        </Badge>
        
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-slideInUp"
            style={{ animationDelay: '0.4s' }}>
          {title}
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-2xl text-white/90 animate-slideInUp"
           style={{ animationDelay: '0.6s' }}>
          {subtitle}
        </p>
        
        {/* Featured Photo Info */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm text-white/80 animate-slideInUp"
             style={{ animationDelay: '0.8s' }}>
          {featuredPhoto.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{featuredPhoto.location.city}, {featuredPhoto.location.country}</span>
            </div>
          )}
          {featuredPhoto.camera && (
            <div className="flex items-center gap-1">
              <Camera className="w-4 h-4" />
              <span>{featuredPhoto.camera.brand} {featuredPhoto.camera.model}</span>
            </div>
          )}
          {featuredPhoto.camera?.settings && (
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{featuredPhoto.camera.settings.aperture} • {featuredPhoto.camera.settings.shutter}</span>
            </div>
          )}
        </div>
        
        {/* CTA Button */}
        <Button 
          size="lg"
          className="bg-white text-black hover:bg-white/90 transition-all duration-300 animate-slideInUp shadow-lg hover:shadow-xl"
          style={{ animationDelay: '1s' }}
          onClick={onCtaClick}
        >
          {ctaText}
        </Button>
        
        {/* Scroll Indicator */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-white/80 animate-bounce"
          onClick={handleScrollToGallery}
          aria-label="Scroll to gallery"
        >
          <ChevronDown className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

/**
 * USAGE EXAMPLES:
 * 
 * Basic hero with featured photo:
 * <PhotoHero 
 *   featuredPhoto={featuredPhoto}
 *   title="My Photography"
 *   subtitle="Capturing life's beautiful moments"
 * />
 * 
 * With custom CTA:
 * <PhotoHero 
 *   featuredPhoto={weddingPhoto}
 *   title="Wedding Photography"
 *   subtitle="Your special day deserves exceptional memories"
 *   ctaText="Book Your Session"
 *   onCtaClick={openBookingModal}
 * />
 * 
 * INDUSTRY ADAPTATIONS:
 * 
 * E-commerce Product Hero:
 * <ProductHero 
 *   featuredProduct={product}
 *   title="Premium Collection"
 *   subtitle="Discover our finest products"
 *   ctaText="Shop Now"
 *   onCtaClick={openShop}
 * />
 * 
 * Real Estate Property Hero:
 * <PropertyHero 
 *   featuredProperty={property}
 *   title="Luxury Living"
 *   subtitle="Find your dream home"
 *   ctaText="View Properties"
 *   onCtaClick={openListings}
 * />
 */
