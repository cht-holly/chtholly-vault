/**
 * AGENT INSTRUCTION: Utility Functions
 * 
 * This file contains utility functions used throughout the template.
 * These functions are essential for the component library to work properly.
 * 
 * Key functions:
 * - cn(): Class name utility for combining Tailwind classes
 * - Based on clsx and tailwind-merge for optimal class handling
 * 
 * When adapting for other industries:
 * 1. Keep these utility functions as-is
 * 2. Add industry-specific utilities if needed
 * 3. Maintain the same patterns for consistency
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
