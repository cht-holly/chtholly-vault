/**
 * AGENT INSTRUCTION: Landing Page Component
 * 
 * This is a generic landing page component that can be adapted for any industry.
 * 
 * TO ADAPT FOR YOUR INDUSTRY:
 * 1. Replace the heading text with your value proposition
 * 2. Update the subtitle with your specific benefits
 * 3. Customize the feature sections for your industry
 * 4. Replace icons with industry-appropriate ones
 * 5. Update CTA button text and actions
 * 6. Adjust colors to match your brand
 * 
 * HEADING EXAMPLES BY INDUSTRY:
 * 
 * E-commerce:
 * - "Find Everything You Need" / "Shop with Confidence"
 * 
 * Photography:
 * - "Capture Perfect Moments" / "Professional Photography Made Easy"
 * 
 * Finance:
 * - "Smart Investment Decisions" / "Take Control of Your Financial Future"
 * 
 * Health/Fitness:
 * - "Transform Your Health" / "Achieve Your Fitness Goals"
 * 
 * Education:
 * - "Learn New Skills" / "Advance Your Career with Expert-Led Courses"
 * 
 * ICON SUGGESTIONS:
 * - Shield: Security, Trust, Protection
 * - CheckCircle: Verification, Success, Completion
 * - Sparkles: Quality, Premium, Magic
 * - Heart: Care, Love, Wellness
 * - Zap: Speed, Energy, Power
 * - Star: Rating, Excellence, Featured
 * - Users: Community, Team, Social
 * - Award: Achievement, Recognition, Quality
 * 
 * RESPONSIVE DESIGN:
 * - Mobile-first approach with progressive enhancement
 * - Responsive text sizes and spacing
 * - Grid layouts that adapt to screen size
 * - Touch-friendly button sizes
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle, Sparkles, Heart, Zap, Star, Code, Smartphone, Bot } from "lucide-react";
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
  heading = "AI Agent-Friendly React Template",
  subheading = "Built for Rapid Development",
  subtitle = "A comprehensive React TypeScript template designed specifically for AI agents to quickly build modern, responsive applications for any industry.",
  ctaText = "Start Building",
  ctaTextMobile = "Start",
  onCtaClick,
  primaryFeatureTitle = "Agent-Optimized",
  secondaryFeatureTitle = "Industry-Agnostic",
  features = [
    {
      icon: <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0 mt-0.5" />,
      title: "Comprehensive Documentation",
      description: "Every component includes detailed AI agent instructions and adaptation patterns."
    },
    {
      icon: <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0 mt-0.5" />,
      title: "Zero Configuration",
      description: "Ready to use out of the box with modern tooling and best practices."
    },
    {
      icon: <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0 mt-0.5" />,
      title: "Industry-Agnostic",
      description: "Generic components that adapt to any industry - e-commerce, healthcare, education, and more."
    },
    {
      icon: <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0 mt-0.5" />,
      title: "Mobile-First Design",
      description: "Responsive components optimized for all screen sizes and touch interactions."
    },
    {
      icon: <Star className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0 mt-0.5" />,
      title: "TypeScript Native",
      description: "Full TypeScript support with comprehensive type definitions and interfaces."
    },
    {
      icon: <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0 mt-0.5" />,
      title: "Modern Stack",
      description: "Built with React 18, Vite, shadcn/ui, Tailwind CSS, and Zustand for state management."
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
              {heading}
            </span>
            <span className="text-gray-800 dark:text-gray-100 text-lg sm:text-2xl xs:text-3xl lg:text-3xl font-bold mt-1 sm:mt-2">
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
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
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
              Experience the difference with our comprehensive platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
            {/* Primary Feature */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-200 dark:border-green-800/30">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Shield className="w-5 h-5 sm:w-7 sm:h-7 text-green-600 flex-shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-green-800 dark:text-green-200">
                  {primaryFeatureTitle}
                </h3>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-green-700 dark:text-green-300">
                {features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {feature.icon}
                    <span>{feature.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Secondary Feature */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200 dark:border-blue-800/30">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-blue-600 flex-shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-blue-800 dark:text-blue-200">
                  {secondaryFeatureTitle}
                </h3>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                {features.slice(4).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {feature.icon}
                    <span>{feature.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Template Showcase Section */}
        <div className="w-full max-w-6xl mx-auto mt-6 sm:mt-8 lg:mt-10 px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Why Choose This Template?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Built with real-world patterns and designed for rapid development
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-green-200 dark:border-green-800/30 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                    <Code className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-green-800 dark:text-green-200">Production-Ready Components</CardTitle>
                    <CardDescription className="text-green-600 dark:text-green-400">
                      Real patterns from successful apps
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Every component is extracted from production applications and battle-tested for real-world use cases.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 dark:border-blue-800/30 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-blue-800 dark:text-blue-200">Mobile-First Design</CardTitle>
                    <CardDescription className="text-blue-600 dark:text-blue-400">
                      Responsive layouts for all devices
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Responsive grids that adapt seamlessly: 1 column on mobile, 2 on tablet, 3 on desktop with perfect touch targets.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 dark:border-purple-800/30 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10 sm:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <Bot className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-purple-800 dark:text-purple-200">Agent-Friendly Code</CardTitle>
                    <CardDescription className="text-purple-600 dark:text-purple-400">
                      Built for AI agents to easily adapt
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Comprehensive documentation and clear patterns make it easy for AI agents to adapt components for any industry.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Professional Footer */}
        <Footer className="mt-12 sm:mt-16 lg:mt-20" />
      </div>
    </div>
  );
};
