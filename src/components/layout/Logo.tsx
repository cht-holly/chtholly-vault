/**
 * Logo Component
 * 
 * Brand logo for the crypto portfolio monitoring app.
 */

import { TrendingUp } from "lucide-react";

interface LogoProps {
  brandName?: string;
  tagline?: string;
  className?: string;
  onClick?: () => void;
}

export const Logo = ({ 
  brandName = "Chtholly Vault", 
  tagline = "Privacy-First Portfolio Tracking",
  className = "",
  onClick
}: LogoProps) => {
  return (
    <div 
      className={`flex items-center group cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Logo Icon Container */}
      <div className="relative mr-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-blue-200 dark:group-hover:shadow-blue-900/50 transition-all duration-300">
          <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </div>
        {/* Subtle animation indicator */}
        <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-400 opacity-75 animate-pulse"></div>
      </div>
      
      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline">
          <span className="font-bold text-lg sm:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Chtholly<span className="ml-0.5">Vault</span>
          </span>
        </div>
        <span className="text-xs font-medium text-blue-500/70 dark:text-blue-400/70 tracking-widest uppercase mt-0.5 hidden xs:block">
          {tagline}
        </span>
      </div>
    </div>
  );
};
