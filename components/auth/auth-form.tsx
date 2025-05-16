'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';

import { toast } from 'sonner';
import { ChromeIcon } from 'lucide-react';

export default function AuthForm() {
   const router = useRouter();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
   const [isSignInSubmitting, setIsSignInSubmitting] = useState(false);
   const [authError, setAuthError] = useState<string | null>(null);

   const handleSignUp = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setAuthError(null);
      try {
         const { data, error } = await supabase.auth.signUp({
            email,
            password,
         });
         if (error) throw error;
         toast.success('Check your email for the confirmation link!');
         // data.user contains the user object
         // data.session contains the session object
      } catch (error: any) {
         setAuthError(error.message);
         toast.error(error.message);
      } finally {
         setIsSubmitting(false);
      }
   };

   const handleGoogleSignIn = async () => {
      setIsGoogleSubmitting(true);
      setAuthError(null);
      try {
         const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
               redirectTo: window.location.origin + '/dashboard',
            },
         });
         if (error) throw error;
         // User will be redirected to Google's sign-in page
         // and then back to the redirectTo URL.
      } catch (error: any) {
         setAuthError(error.message);
         toast.error(error.message);
      } finally {
         setIsGoogleSubmitting(false);
      }
   };

   const handleSignIn = async () => {
      setIsSignInSubmitting(true);
      setAuthError(null);
      try {
         const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
         });
         if (error) throw error;
         toast.success('Signed in successfully!');
         // data.user contains the user object
         // data.session contains the session object
         router.push('/dashboard'); // Redirect to dashboard
      } catch (error: any) {
         setAuthError(error.message);
         toast.error(error.message);
      } finally {
         setIsSignInSubmitting(false);
      }
   };

   return (
      <div className="flex items-center justify-center min-h-screen bg-background">
         <Card className="w-[400px]">
            <CardHeader className="text-center">
               <CardTitle className="text-2xl">Create an account</CardTitle>
               <CardDescription>
                  Let's get started. Fill in the details below to create your account.
               </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleSubmitting}
               >
                  {isGoogleSubmitting ? (
                     <>
                        <svg
                           className="animate-spin -ml-1 mr-3 h-5 w-5 text-foreground"
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
                           ></circle>
                           <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                           ></path>
                        </svg>
                        Redirecting...
                     </>
                  ) : (
                     <>
                        <ChromeIcon className="mr-2 h-4 w-4" /> Sign in with Google
                     </>
                  )}
               </Button>
               <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                     <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                     <span className="bg-card px-2 text-muted-foreground">Or</span>
                  </div>
               </div>
               <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-1">
                     <Label htmlFor="email-auth">Email</Label>{' '}
                     {/* Changed ID for uniqueness if needed, though now single form */}
                     <Input
                        id="email-auth"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                     />
                  </div>
                  <div className="space-y-1">
                     <Label htmlFor="password-auth">Password</Label> {/* Changed ID */}
                     <Input
                        id="password-auth"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                     />
                     <p className="text-xs text-muted-foreground">Minimum 8 characters.</p>
                  </div>
                  <div className="flex items-center space-x-2">
                     <Checkbox id="terms-auth" /> {/* Changed ID */}
                     <Label htmlFor="terms-auth" className="text-sm font-normal">
                        I agree to the{' '}
                        <a href="#" className="underline">
                           Terms & Conditions
                        </a>
                     </Label>
                  </div>
                  {authError && <p className="text-sm text-destructive">{authError}</p>}
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                     {isSubmitting ? 'Creating Account...' : 'Sign up'}
                  </Button>
               </form>
            </CardContent>
            <CardFooter className="flex-col items-center space-y-2">
               <p className="text-xs text-center text-muted-foreground">
                  Already have an account?{' '}
                  <button
                     type="button"
                     className="font-medium text-primary hover:text-primary/90 underline hover:no-underline p-0 h-auto bg-transparent disabled:opacity-50"
                     onClick={handleSignIn}
                     disabled={isSignInSubmitting || isSubmitting || isGoogleSubmitting} // Disable if any auth action is in progress
                  >
                     {isSignInSubmitting ? 'Signing In...' : 'Sign in'}
                  </button>
               </p>
            </CardFooter>
         </Card>
      </div>
   );
}
