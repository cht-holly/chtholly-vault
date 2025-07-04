/**
 * AGENT INSTRUCTION: Logo Component
 * 
 * This is a generic logo component that can be easily customized for any brand.
 * 
 * TO ADAPT FOR YOUR INDUSTRY:
 * 1. Replace the icon (Zap) with your industry-specific icon
 * 2. Update brandName to your company/app name
 * 3. Update tagline to match your value proposition
 * 4. Adjust colors to match your brand palette
 * 5. Modify gradient classes (from-blue-600 to-purple-600) for brand colors
 * 
 * ICON SUGGESTIONS BY INDUSTRY:
 * - E-commerce: ShoppingBag, Store, Package
 * - Photography: Camera, Aperture, Image
 * - Finance: DollarSign, TrendingUp, PieChart
 * - Health: Heart, Activity, Shield
 * - Education: BookOpen, GraduationCap, Users
 * - Technology: Code, Cpu, Zap
 * - Food: UtensilsCrossed, Coffee, ChefHat
 * - Travel: MapPin, Compass, Plane
 * - Real Estate: Home, Building, MapPin
 * - Fitness: Dumbbell, Activity, Target
 * 
 * RESPONSIVE DESIGN:
 * - Mobile-first approach with scalable sizing
 * - Hide tagline on very small screens
 * - Adjustable icon and text sizes
 */

import { Zap } from "lucide-react";

interface LogoProps {
  brandName?: string;
  tagline?: string;
  className?: string;
}

export const Logo = ({ 
  brandName = "YourBrand", 
  tagline = "Your Tagline",
  className = ""
}: LogoProps) => {
  return (
    <div className={`flex items-center group ${className}`}>
      {/* Logo Icon Container */}
      <div className="relative mr-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-blue-200 dark:group-hover:shadow-blue-900/50 transition-all duration-300">
          <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </div>
        {/* Subtle animation indicator */}
        <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-400 opacity-75 animate-pulse"></div>
      </div>
      
      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline">
          <span className="font-bold text-lg sm:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            {brandName}
          </span>
        </div>
        <span className="text-xs font-medium text-blue-500/70 dark:text-blue-400/70 tracking-widest uppercase mt-0.5 hidden xs:block">
          {tagline}
        </span>
      </div>
    </div>
  );
};
