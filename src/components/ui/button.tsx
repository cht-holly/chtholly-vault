/**
 * AGENT INSTRUCTION: Button Component
 * 
 * This is a shadcn/ui button component with app-specific styling.
 * When adapting for other industries:
 * 
 * 1. Keep the variant system (default, destructive, outline, ghost, link)
 * 2. Maintain size system (default, sm, lg, icon)
 * 3. Preserve accessibility features (aria-labels, keyboard navigation)
 * 4. Customize colors using CSS variables in index.css
 * 5. Keep mobile touch targets (min-h-[44px] for primary actions)
 * 
 * Common adaptations:
 * - E-commerce: "Add to Cart", "Buy Now", "Add to Wishlist"
 * - Photography: "View Gallery", "Book Session", "Download"
 * - Social: "Like", "Share", "Follow"
 * 
 * CSS Classes to maintain:
 * - touch-manipulation for mobile optimization
 * - Proper hover and focus states
 * - Responsive sizing with sm: prefixes
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-manipulation",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
