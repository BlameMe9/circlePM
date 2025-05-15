import * as React from 'react';

export interface ExitFullscreenIconProps {
   className?: string;
   size?: number;
}

export function ExitFullscreenIcon({ className, size = 24 }: ExitFullscreenIconProps) {
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
         <path d="M3 11h6V5"></path>
         <path d="M21 13h-6v6"></path>
         <path d="M9 3v6H3"></path>
         <path d="M15 21v-6h6"></path>
      </svg>
   );
}
