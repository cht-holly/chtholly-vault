/**
 * AGENT INSTRUCTION: Footer Component
 * 
 * This is a reusable footer component that can be used across the application.
 * 
 * TO ADAPT FOR YOUR INDUSTRY:
 * 1. Update the brand name and description
 * 2. Customize the links in Quick Links and Resources sections
 * 3. Replace the logo icon with your brand icon
 * 4. Update the external links (GitHub, Examples, etc.)
 * 5. Adjust the color scheme to match your brand
 * 
 * USAGE:
 * - Use on landing pages for comprehensive footer
 * - Use on internal pages for consistent branding
 * - Customize links and sections as needed
 * - Responsive design works on all screen sizes
 */

import { Button } from "@/components/ui/button";
import { Zap, Github, ExternalLink } from "lucide-react";

interface FooterProps {
  brandName?: string;
  description?: string;
  showAllSections?: boolean;
  className?: string;
}

export const Footer = ({
  brandName = "Chtholly UI",
  description = "A comprehensive React TypeScript template designed for AI agents to rapidly build modern, responsive applications across any industry.",
  showAllSections = true,
  className = ""
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`w-full border-t border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="pt-8 sm:pt-12 pb-6 sm:pb-8">
          {showAllSections ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12">
              {/* Brand Section */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-bold">{brandName}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 max-w-md">
                  {description}
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href="https://github.com/cht-holly/chtholly-ui" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Examples
                  </Button>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Examples</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Components</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Getting Started</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">AI Agent Guide</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">TypeScript Patterns</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Industry Templates</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Best Practices</a></li>
                </ul>
              </div>
            </div>
          ) : (
            // Simplified footer for internal pages
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                <span className="font-semibold">{brandName}</span>
              </div>
              <div className="flex justify-center gap-4 mb-4">
                <Button variant="ghost" size="sm" className="gap-2" asChild>
                  <a href="https://github.com/cht-holly/chtholly-ui" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Examples
                </Button>
              </div>
            </div>
          )}

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-xs text-muted-foreground">
              © {currentYear} {brandName}. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
