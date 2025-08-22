import { clsx, type ClassValue } from 'clsx';

// Utility function to combine class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Responsive utilities
export const responsive = {
  container: 'container mx-auto px-4 sm:px-6 lg:px-8',
} as const;

// Spacing utilities
export const spacing = {
  section: 'py-12 md:py-16 lg:py-20',
  container: 'px-4 sm:px-6 lg:px-8',
  content: 'max-w-6xl mx-auto',
} as const;
