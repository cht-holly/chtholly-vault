/**
 * Navigation Bar Component
 * 
 * Clean navigation bar for the crypto portfolio monitoring app.
 */

import { ThemeToggle } from "@/components/theme/toggle";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { Settings } from "lucide-react";

interface NavBarProps {
  brandTagline?: string;
  onPrimaryAction?: () => void;
  primaryButtonText?: string;
  primaryButtonTextMobile?: string;
  onLogoClick?: () => void;
  onSettingsClick?: () => void;
  showSettings?: boolean;
}

export const NavBar = ({
  brandTagline = "Privacy-First Portfolio Tracking",
  onPrimaryAction,
  primaryButtonText,
  primaryButtonTextMobile,
  onLogoClick,
  onSettingsClick,
  showSettings = false
}: NavBarProps) => {
  return (
    <nav className="flex items-center justify-between px-2 sm:px-4 py-2 bg-background border-b border-border relative z-[100]">
      <div className="flex h-12 sm:h-16 items-center">
        <Logo 
          tagline={brandTagline} 
          onClick={onLogoClick}
        />
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
        {showSettings && onSettingsClick && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onSettingsClick}
            className="h-10 w-10 touch-manipulation"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
        )}
        <ThemeToggle />
        {primaryButtonText && onPrimaryAction && (
          <Button 
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/50 transition-all duration-300 text-xs sm:text-sm px-2 sm:px-4"
            onClick={onPrimaryAction}
          >
            <span className="hidden sm:inline">{primaryButtonText}</span>
            <span className="sm:hidden">{primaryButtonTextMobile}</span>
          </Button>
        )}
      </div>
    </nav>
  );
};
