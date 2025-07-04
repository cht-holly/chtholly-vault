/**
 * AGENT INSTRUCTION: Badge Component
 * 
 * This is a shadcn/ui badge component for displaying tags, status, and categories.
 * When adapting for other industries:
 * 
 * 1. Keep the variant system (default, secondary, destructive, outline)
 * 2. Customize colors using CSS variables for brand consistency
 * 3. Use for categories, status indicators, tags, counts
 * 4. Maintain responsive text sizing (text-xs for mobile optimization)
 * 
 * Common usage patterns:
 * - Category badges: <Badge className={getCategoryColor(category)}>Category</Badge>
 * - Status badges: <Badge variant="secondary">Popular</Badge>
 * - Count badges: <Badge variant="outline">+3 more</Badge>
 * 
 * CSS Classes to maintain:
 * - text-xs for mobile readability
 * - inline-flex for proper alignment
 * - rounded-full for modern appearance
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
