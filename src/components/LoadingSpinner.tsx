interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

export default function LoadingSpinner({
  size = 'md',
  color = 'primary',
  className = '',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const colorClasses = {
    primary: 'text-primary-600 dark:text-primary-400',
    white: 'text-white',
    gray: 'text-gray-600 dark:text-gray-400',
  };

  return (
    <div className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`}>
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

// Enhanced loading states
export function LoadingCard() {
  return (
    <div className="animate-pulse">
      <div className="h-48 rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
      <div className="mt-4 space-y-3">
        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
}

export function LoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
}

// Skeleton loader for content
export function ContentSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="space-y-4">
        <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-6 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
}
