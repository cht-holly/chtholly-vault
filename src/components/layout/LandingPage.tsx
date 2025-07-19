/**
 * Landing Page Component
 * 
 * Main landing page for the crypto portfolio monitoring app.
 */

import { Button } from "@/components/ui/button";
import { Shield, Eye, Lock, Zap, TrendingUp, BarChart3 } from "lucide-react";
import { Footer } from "./Footer";

interface LandingPageProps {
  heading?: string;
  subheading?: string;
  subtitle?: string;
  ctaText?: string;
  ctaTextMobile?: string;
  onCtaClick?: () => void;
  primaryFeatureTitle?: string;
  secondaryFeatureTitle?: string;
  features?: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
}

export const LandingPage = ({
  heading = "Privacy-First Crypto Portfolio Tracking",
  subheading = "Your Data Stays Yours",
  subtitle = "Spreading your crypto across multiple wallets keeps you secure, but makes tracking total value nearly impossible. Get a consolidated view of your entire portfolio while keeping your data completely private.",
  ctaText = "Start Tracking",
  ctaTextMobile = "Start",
  onCtaClick,
  primaryFeatureTitle = "Why Portfolio Tracking is Broken",
  secondaryFeatureTitle = "How Chtholly Vault Fixes It",
  features = [
    {
      icon: <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 flex-shrink-0 mt-0.5" />,
      title: "Multiple Wallets",
      description: "You spread crypto across hardware wallets, exchanges, and DeFi protocols for security."
    },
    {
      icon: <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 flex-shrink-0 mt-0.5" />,
      title: "Lost in Numbers",
      description: "Constantly switching between apps and spreadsheets to calculate your total worth."
    },
    {
      icon: <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 flex-shrink-0 mt-0.5" />,
      title: "Privacy Concerns",
      description: "Portfolio trackers want your wallet addresses and personal data. Not happening."
    },
    {
      icon: <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0 mt-0.5" />,
      title: "Complete Privacy",
      description: "Track everything locally on your device. No wallet addresses, no personal data required."
    },
    {
      icon: <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0 mt-0.5" />,
      title: "One Clear View",
      description: "See your total portfolio value across all wallets in real-time, in your preferred currency."
    },
    {
      icon: <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0 mt-0.5" />,
      title: "Smart & Simple",
      description: "Just add your holdings manually. Get live prices automatically. Stay in control."
    }
  ]
}: LandingPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] xs:min-h-[600px] lg:min-h-[700px] overflow-hidden">
      <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 pt-4 sm:pt-8 lg:pt-12 max-w-7xl mx-auto px-2 sm:px-4 w-full">
        {/* Main Heading */}
        <div className="text-center space-y-3 sm:space-y-4 lg:space-y-6 w-full">
          <h1 className="text-2xl sm:text-3xl xs:text-5xl lg:text-6xl leading-tight font-extrabold flex flex-col items-center text-center">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
              Privacy-First Crypto
            </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
              Portfolio Tracking
            </span>
            <span className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl xs:text-3xl lg:text-3xl font-bold mt-2 sm:mt-3">
              {subheading}
            </span>
          </h1>
          
          {/* Subtitle */}
          <div className="font-medium text-center text-sm sm:text-lg xs:text-xl max-w-[300px] sm:max-w-[500px] lg:max-w-[700px] text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 mx-auto">
            {subtitle}
          </div>

          {/* CTA Button */}
          <Button 
            className="w-full max-w-[280px] sm:max-w-[320px] py-4 sm:py-6 font-bold text-base sm:text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-blue-200 dark:hover:shadow-blue-900/50 transition-all duration-300 transform hover:scale-105 mx-auto"
            onClick={onCtaClick}
          >
            <div className="flex items-center justify-center w-full gap-2">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">{ctaText}</span>
              <span className="sm:hidden">{ctaTextMobile}</span>
            </div>
          </Button>
        </div>

        {/* Features Section */}
        <div className="w-full max-w-5xl mx-auto mt-2 sm:mt-3 lg:mt-4">
          {/* Simple tagline */}
          <div className="text-center mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium px-2">
              Built for crypto investors who value privacy and security
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
            {/* Challenge Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-amber-200 dark:border-amber-800/30">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Shield className="w-5 h-5 sm:w-7 sm:h-7 text-amber-600 flex-shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-amber-800 dark:text-amber-200">
                  {primaryFeatureTitle}
                </h3>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-amber-700 dark:text-amber-300">
                {features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {feature.icon}
                    <div>
                      <div className="font-medium text-amber-800 dark:text-amber-200">{feature.title}</div>
                      <div className="text-amber-600 dark:text-amber-400">{feature.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution Card */}
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200 dark:border-blue-800/30">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7 text-blue-600 flex-shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-blue-800 dark:text-blue-200">
                  {secondaryFeatureTitle}
                </h3>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                {features.slice(3).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {feature.icon}
                    <div>
                      <div className="font-medium text-blue-800 dark:text-blue-200">{feature.title}</div>
                      <div className="text-blue-600 dark:text-blue-400">{feature.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>


        {/* Professional Footer */}
        <Footer className="mt-12 sm:mt-16 lg:mt-20" />
      </div>
    </div>
  );
};
