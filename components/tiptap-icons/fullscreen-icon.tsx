import * as React from 'react';

export interface FullscreenIconProps {
   className?: string;
   size?: number;
}

export function FullscreenIcon({ className, size = 24 }: FullscreenIconProps) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
         className={className}
      >
         <path d="M3 7V3h4"></path>
         <path d="M21 7V3h-4"></path>
         <path d="M3 17v4h4"></path>
         <path d="M21 17v4h-4"></path>
      </svg>
   );
}
