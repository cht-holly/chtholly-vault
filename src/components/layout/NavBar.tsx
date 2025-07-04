/**
 * AGENT INSTRUCTION: Navigation Bar Component
 * 
 * This is the main navigation bar component that can be adapted for any industry.
 * 
 * TO ADAPT FOR YOUR INDUSTRY:
 * 1. Customize the CTA buttons text and actions
 * 2. Update button colors to match your brand
 * 3. Adjust the navigation structure based on your app flow
 * 4. Add/remove authentication states as needed
 * 5. Customize responsive behavior for your specific needs
 * 
 * BUTTON CUSTOMIZATION EXAMPLES:
 * 
 * E-commerce:
 * - Primary: "Shop Now" / "View Cart"
 * - Secondary: "Sign In" / "Create Account"
 * 
 * Photography:
 * - Primary: "Book Session" / "View Portfolio"
 * - Secondary: "Get Quote" / "Contact"
 * 
 * Finance:
 * - Primary: "Start Trading" / "View Dashboard"
 * - Secondary: "Learn More" / "Sign Up"
 * 
 * Health/Fitness:
 * - Primary: "Start Workout" / "Join Now"
 * - Secondary: "Free Trial" / "Learn More"
 * 
 * Education:
 * - Primary: "Start Learning" / "Browse Courses"
 * - Secondary: "Free Trial" / "Sign Up"
 * 
 * RESPONSIVE DESIGN:
 * - Mobile-first approach with collapsible menu
 * - Responsive button text (full text on desktop, abbreviated on mobile)
 * - Proper spacing and touch targets for mobile
 */

import { ThemeToggle } from "@/components/theme/toggle";
import { Button } from "@/components/ui/button";
import { NavMenu } from "./NavMenu";
import { UserNav } from "./UserNav";
import { Logo } from "./Logo";

interface NavBarProps {
  brandName?: string;
  brandTagline?: string;
  isAuthenticated?: boolean;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonTextMobile?: string;
  secondaryButtonTextMobile?: string;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  userInitials?: string;
  onLogout?: () => void;
}

export const NavBar = ({
  brandName = "YourBrand",
  brandTagline = "Your Tagline",
  isAuthenticated = false,
  onPrimaryAction,
  onSecondaryAction,
  primaryButtonText = "Get Started",
  secondaryButtonText = "Sign In",
  primaryButtonTextMobile = "Start",
  secondaryButtonTextMobile = "Sign In",
  userName,
  userEmail,
  userAvatar,
  userInitials,
  onLogout
}: NavBarProps) => {
  return (
    <nav className="flex items-center justify-between px-2 sm:px-4 py-2 bg-background border-b border-border">
      <div className="flex h-12 sm:h-16 items-center">
        <a className="flex h-12 sm:h-16 items-center cursor-pointer" href="/">
          <Logo brandName={brandName} tagline={brandTagline} />
        </a>
        <div className="ml-4 sm:ml-8 lg:ml-12 xl:ml-16 hidden md:block">
          <NavMenu brandName={brandName} />
        </div>
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
        <ThemeToggle />
        {!isAuthenticated ? (
          <>
            <Button 
              variant="outline" 
              size="sm"
              className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20 text-xs sm:text-sm px-2 sm:px-4"
              onClick={onSecondaryAction}
            >
              <span className="hidden sm:inline">{secondaryButtonText}</span>
              <span className="sm:hidden">{secondaryButtonTextMobile}</span>
            </Button>
            <Button 
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/50 transition-all duration-300 text-xs sm:text-sm px-2 sm:px-4"
              onClick={onPrimaryAction}
            >
              <span className="hidden sm:inline">{primaryButtonText}</span>
              <span className="sm:hidden">{primaryButtonTextMobile}</span>
            </Button>
          </>
        ) : (
          <UserNav 
            userName={userName}
            userEmail={userEmail}
            userAvatar={userAvatar}
            userInitials={userInitials}
            onLogout={onLogout}
          />
        )}
      </div>
    </nav>
  );
};
