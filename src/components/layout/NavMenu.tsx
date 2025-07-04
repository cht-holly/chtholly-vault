/**
 * AGENT INSTRUCTION: Navigation Menu Component
 * 
 * This is a generic navigation menu component that can be adapted for any industry.
 * 
 * TO ADAPT FOR YOUR INDUSTRY:
 * 1. Replace the features array with your industry-specific features
 * 2. Update categories to match your product/service categories
 * 3. Customize the main navigation link text and descriptions
 * 4. Adjust the gradient colors to match your brand
 * 5. Update href paths to match your routing structure
 * 
 * EXAMPLES BY INDUSTRY:
 * 
 * E-commerce:
 * - Features: Product Catalog, Shopping Cart, Wishlist, Reviews, Recommendations
 * - Categories: Electronics, Clothing, Home & Garden, Sports, Books
 * 
 * Photography:
 * - Features: Portfolio Gallery, Booking System, Client Portal, Image Editing, Print Shop
 * - Categories: Wedding, Portrait, Landscape, Commercial, Events
 * 
 * Finance:
 * - Features: Portfolio Tracking, Market Analysis, Risk Assessment, Alerts, Reports
 * - Categories: Stocks, Bonds, Crypto, Real Estate, Commodities
 * 
 * Health/Fitness:
 * - Features: Workout Plans, Nutrition Tracking, Progress Monitoring, Community, Coaching
 * - Categories: Strength Training, Cardio, Yoga, Nutrition, Wellness
 * 
 * Education:
 * - Features: Course Catalog, Progress Tracking, Certificates, Discussion Forums, Assignments
 * - Categories: Programming, Design, Business, Languages, Science
 * 
 * RESPONSIVE DESIGN:
 * - Hidden on mobile (shown via mobile menu)
 * - Dropdown menus with proper hover states
 * - Accessible navigation with keyboard support
 */

import * as React from "react"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

// CUSTOMIZE THIS: Replace with your industry-specific examples
const examples: { title: string; href: string; description: string }[] = [
  {
    title: "Goal Setting",
    href: "/examples/goals",
    description: "Interactive goal-setting interface with personalization wizard and achievement tracking.",
  },
  {
    title: "Photo Portfolio", 
    href: "/examples/photo",
    description: "Photography portfolio showcase with gallery layouts and booking systems.",
  },
  {
    title: "E-commerce",
    href: "/examples/ecommerce",
    description: "Product catalog with shopping cart, filters, and checkout flow components.",
  },
  {
    title: "Healthcare Portal",
    href: "/examples/healthcare",
    description: "Patient portal with appointment booking, medical records, and telemedicine features.",
  },
  {
    title: "Education Platform",
    href: "/examples/education",
    description: "Learning management system with course catalog, progress tracking, and assignments.",
  },
  {
    title: "Finance Dashboard",
    href: "/examples/finance",
    description: "Investment portfolio tracking with market analysis, charts, and financial planning tools.",
  },
]

interface NavMenuProps {
  brandName?: string;
  brandDescription?: string;
}

export function NavMenu({ 
  brandName = "Your App", 
  brandDescription = "Transform your workflow with our innovative platform designed for modern professionals."
}: NavMenuProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <h1>Features</h1>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-blue-600/20 p-6 no-underline outline-none focus:shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/50 transition-all duration-300"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {brandName}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      {brandDescription}
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/get-started" title="Get Started">
                Begin your journey with our guided setup process.
              </ListItem>
              <ListItem href="/explore" title="Explore">
                Discover all the features and capabilities available.
              </ListItem>
              <ListItem href="/dashboard" title="Dashboard">
                Access your personalized dashboard and analytics.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Examples</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {examples.map((example) => (
                <ListItem
                  key={example.title}
                  title={example.title}
                  href={example.href}
                >
                  {example.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {/* Add additional navigation items as needed */}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
