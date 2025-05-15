'use client';

import { WelcomeSequence } from '@/components/welcome/welcome-sequence';
import React from 'react';
// import { useRouter } from 'next/navigation'; // Uncomment if you need router

export default function WelcomePage() {
   // const router = useRouter(); // Uncomment if you need router

   const handleWelcomeComplete = () => {
      // Logic to handle completion of the welcome sequence
      // For example, redirect to the main dashboard or update user state
      console.log('Welcome sequence completed!');
      // router.push('/dashboard'); // Example redirect
   };

   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
         <div className="w-full max-w-md">
            <WelcomeSequence onComplete={handleWelcomeComplete} />
         </div>
      </div>
   );
}
