/**
 * Footer Component
 * 
 * Simple footer for the crypto portfolio monitoring app.
 */

import { TrendingUp } from "lucide-react";

interface FooterProps {
  className?: string;
}

export const Footer = ({
  className = ""
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`w-full border-t border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="pt-8 sm:pt-12 pb-6 sm:pb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-3 h-3 text-white" />
              </div>
              <span className="font-semibold">Chtholly Vault</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-xs text-muted-foreground mb-2">
              © {currentYear} Chtholly Vault. Privacy-first cryptocurrency portfolio tracking.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with{" "}
              <a 
                href="https://chtholly.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
              >
                Chtholly UI
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
