/* eslint-disable no-unused-vars */
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
   SunIcon,
   MoonIcon,
   ChevronRightIcon,
   CopyIcon,
   MailIcon,
   UsersIcon,
   Link2Icon,
   KeyboardIcon,
} from 'lucide-react'; // Assuming lucide-react for icons

interface WelcomeSequenceProps {
   onComplete?: () => void;
}

const totalSteps = 5; // Based on the screenshots

export function WelcomeSequence({ onComplete }: WelcomeSequenceProps) {
   const [currentStep, setCurrentStep] = useState(1);
   const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | null>(null);
   const [inviteLink, setInviteLink] = useState('https://app.circlepm.com/invite/XYZ123ABC'); // Placeholder

   const handleGoToStep = (step: number) => {
      if (step >= 1 && step <= totalSteps) {
         setCurrentStep(step);
      }
   };

   const handleNextStep = () => {
      if (currentStep < totalSteps) {
         setCurrentStep(currentStep + 1);
      } else {
         onComplete?.();
      }
   };

   // const handlePrevStep = () => {
   //   if (currentStep > 1) {
   //     setCurrentStep(currentStep - 1);
   //   }
   // };

   const renderStepContent = () => {
      switch (currentStep) {
         case 1:
            return (
               <Card className="w-full">
                  <CardHeader className="px-2 pt-2 pb-1">
                     <CardTitle className="text-md font-semibold">Choose your style</CardTitle>
                     <CardDescription className="text-xs">
                        Change your theme at any time via the command menu or settings.
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="px-2 pb-2 space-y-3">
                     <div className="grid grid-cols-2 gap-3">
                        <Button
                           variant={selectedTheme === 'light' ? 'default' : 'outline'}
                           className="h-auto p-3 flex flex-col items-center justify-center space-y-2 border-2"
                           onClick={() => setSelectedTheme('light')}
                        >
                           <div className="w-full h-16 bg-gray-100 rounded-md border border-gray-300 flex items-center justify-center">
                              <SunIcon className="w-6 h-6 text-gray-600" />
                           </div>
                           <span className="text-xs font-medium">Light</span>
                        </Button>
                        <Button
                           variant={selectedTheme === 'dark' ? 'default' : 'outline'}
                           className="h-auto p-3 flex flex-col items-center justify-center space-y-2 border-2"
                           onClick={() => setSelectedTheme('dark')}
                        >
                           <div className="w-full h-16 bg-gray-800 rounded-md border border-gray-700 flex items-center justify-center">
                              <MoonIcon className="w-6 h-6 text-gray-200" />
                           </div>
                           <span className="text-xs font-medium">Dark</span>
                        </Button>
                     </div>
                     <Button
                        onClick={handleNextStep}
                        className="w-full mt-2"
                        disabled={!selectedTheme}
                     >
                        Continue <ChevronRightIcon className="ml-2 h-4 w-4" />
                     </Button>
                  </CardContent>
               </Card>
            );
         // Add cases for other steps here
         case 2:
            return (
               <Card className="w-full text-center">
                  <CardHeader className="px-4 pt-8 pb-4">
                     {/* Placeholder for an App Logo if available */}
                     {/* <div className="mx-auto mb-4 h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Logo</span>
              </div> */}
                     <CardTitle className="text-2xl font-bold">Welcome to CirclePM</CardTitle>
                     <CardDescription className="text-sm max-w-xs mx-auto pt-1">
                        CirclePM is a build system for developing products. Streamline issues,
                        projects, and product roadmaps.
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 pb-6">
                     <Button onClick={handleNextStep} className="w-full">
                        Get started <ChevronRightIcon className="ml-2 h-4 w-4" />
                     </Button>
                  </CardContent>
               </Card>
            );
         case 3:
            return (
               <Card className="w-full text-center">
                  <CardHeader className="px-4 pt-8 pb-4">
                     <CardTitle className="text-2xl font-bold">Meet the command menu</CardTitle>
                     <CardDescription className="text-sm max-w-xs mx-auto pt-1">
                        Complete any action in seconds by typing it into the command menu.
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 pb-6 space-y-4">
                     <div className="text-sm text-muted-foreground">
                        Try opening the command menu with:
                     </div>
                     <div className="flex items-center justify-center space-x-2">
                        <kbd className="pointer-events-none inline-flex h-9 select-none items-center gap-1 rounded border bg-muted px-3 font-mono text-sm font-medium text-muted-foreground opacity-100">
                           Ctrl
                        </kbd>
                        <kbd className="pointer-events-none inline-flex h-9 select-none items-center gap-1 rounded border bg-muted px-3 font-mono text-sm font-medium text-muted-foreground opacity-100">
                           K
                        </kbd>
                     </div>
                     <Button onClick={handleNextStep} className="w-full pt-2">
                        Continue <ChevronRightIcon className="ml-2 h-4 w-4" />
                     </Button>
                  </CardContent>
               </Card>
            );
         case 4:
            // eslint-disable-next-line no-unused-vars
            const handleCopyLink = () => {
               navigator.clipboard.writeText(inviteLink);
               // Add toast notification for feedback if desired
               // eslint-disable-next-line no-console
               console.log('Link copied:', inviteLink);
            };
            return (
               <Card className="w-full text-center">
                  <CardHeader className="px-4 pt-8 pb-4">
                     <CardTitle className="text-2xl font-bold">
                        Invite co-workers to your team
                     </CardTitle>
                     <CardDescription className="text-sm max-w-xs mx-auto pt-1">
                        CirclePM is meant to be used with your team. Invite some co-workers to test
                        it out with.
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 pb-6 space-y-4">
                     <div>
                        <label htmlFor="inviteLink" className="sr-only">
                           Invite Link
                        </label>
                        <div className="flex items-center space-x-2">
                           <Input
                              id="inviteLink"
                              type="text"
                              value={inviteLink}
                              readOnly
                              className="flex-grow"
                           />
                           <Button
                              variant="outline"
                              size="icon"
                              onClick={handleCopyLink}
                              aria-label="Copy invite link"
                           >
                              <CopyIcon className="h-4 w-4" />
                           </Button>
                        </div>
                     </div>
                     <Button variant="ghost" className="w-full justify-center text-sm">
                        <MailIcon className="mr-2 h-4 w-4" /> Invite with email
                     </Button>
                     <Button onClick={handleNextStep} className="w-full">
                        Continue <ChevronRightIcon className="ml-2 h-4 w-4" />
                     </Button>
                  </CardContent>
               </Card>
            );
         case 5:
            return (
               <Card className="w-full text-center">
                  <CardHeader className="px-4 pt-8 pb-4">
                     <CardTitle className="text-2xl font-bold">You're good to go</CardTitle>
                     <CardDescription className="text-sm max-w-sm mx-auto pt-1">
                        Go ahead and explore the app. When you're ready, create your first item by
                        pressing{' '}
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                           C
                        </kbd>
                        .
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 pb-6 space-y-4">
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                        <Card className="p-3">
                           <CardHeader className="p-1 pb-1">
                              <UsersIcon className="h-5 w-5 mb-1 text-muted-foreground" />
                              <CardTitle className="text-sm font-semibold">
                                 Tell your team
                              </CardTitle>
                           </CardHeader>
                           <CardContent className="p-1">
                              <p className="text-xs text-muted-foreground">
                                 Show how to invite your team members.
                              </p>
                           </CardContent>
                        </Card>
                        <Card className="p-3">
                           <CardHeader className="p-1 pb-1">
                              <Link2Icon className="h-5 w-5 mb-1 text-muted-foreground" />
                              <CardTitle className="text-sm font-semibold">
                                 Integrate Tools
                              </CardTitle>
                           </CardHeader>
                           <CardContent className="p-1">
                              <p className="text-xs text-muted-foreground">
                                 Link your GitHub & Slack and other tools.
                              </p>
                           </CardContent>
                        </Card>
                        <Card className="p-3">
                           <CardHeader className="p-1 pb-1">
                              <KeyboardIcon className="h-5 w-5 mb-1 text-muted-foreground" />
                              <CardTitle className="text-sm font-semibold">
                                 Keyboard shortcuts
                              </CardTitle>
                           </CardHeader>
                           <CardContent className="p-1">
                              <p className="text-xs text-muted-foreground">
                                 Learn the keyboard commands by pressing{' '}
                                 <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                    ?
                                 </kbd>
                                 .
                              </p>
                           </CardContent>
                        </Card>
                     </div>
                     <Button onClick={handleNextStep} className="w-full">
                        Open CirclePM
                     </Button>
                  </CardContent>
               </Card>
            );
         default:
            return null;
      }
   };

   return (
      <>
         {renderStepContent()}
         {/* Progress indicator dots */}
         <div className="flex justify-center space-x-1.5 mt-6 mb-2">
            {' '}
            {/* Adjusted spacing and dot size */}
            {Array.from({ length: totalSteps }).map((_, index) => {
               const stepNumber = index + 1;
               return (
                  <button
                     key={index}
                     type="button"
                     aria-label={`Go to step ${stepNumber}`}
                     onClick={() => handleGoToStep(stepNumber)}
                     className={`h-2 w-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        currentStep === stepNumber
                           ? 'bg-primary scale-125'
                           : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                     } transition-all duration-150 ease-in-out`}
                     // Add a small visual indication for the current step, e.g., larger or different color
                  />
               );
            })}
         </div>
      </>
   );
}
