/**
 * AGENT INSTRUCTION: Generic Authentication Form Component
 * 
 * This component provides a complete authentication form with both social login 
 * and traditional email/password options. It's designed to be easily adaptable 
 * for any industry or application.
 * 
 * ADAPTATION GUIDE:
 * 1. Replace social login providers with your preferred options (Apple, Google, Facebook, etc.)
 * 2. Customize the form fields for your authentication requirements
 * 3. Update the styling to match your brand colors and design system
 * 4. Integrate with your authentication backend/service
 * 5. Add form validation and error handling
 * 
 * INDUSTRY EXAMPLES:
 * 
 * E-commerce:
 * - Add "Continue as Guest" option
 * - Include newsletter signup checkbox
 * - Add "Remember me" functionality
 * 
 * B2B SaaS:
 * - Add company email validation
 * - Include "Sign up for team" option
 * - Add SSO integration buttons
 * 
 * Healthcare:
 * - Add security compliance notices
 * - Include "Patient vs Provider" selection
 * - Add additional verification steps
 * 
 * Education:
 * - Add "Student vs Teacher" options
 * - Include school/institution field
 * - Add "Parent/Guardian" access option
 * 
 * FEATURES:
 * - Responsive mobile-first design
 * - Social login integration ready
 * - Form validation ready
 * - Accessible form controls
 * - Modern UI with shadcn/ui components
 */

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginFormProps {
  className?: string;
  onSubmit?: (email: string, password: string) => void;
  onSocialLogin?: (provider: 'apple' | 'google') => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  title?: string;
  description?: string;
  showSocialLogin?: boolean;
  showEmailLogin?: boolean;
  isLoading?: boolean;
}

export function LoginForm({
  className,
  onSubmit,
  onSocialLogin,
  onForgotPassword,
  onSignUp,
  title = "Welcome back",
  description = "Login with your Apple or Google account",
  showSocialLogin = true,
  showEmailLogin = true,
  isLoading = false,
}: LoginFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      onSubmit(email, password);
    }
  };

  const handleSocialLogin = (provider: 'apple' | 'google') => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              
              {/* Social Login Options */}
              {showSocialLogin && (
                <div className="flex flex-col gap-4">
                  <Button 
                    type="button"
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleSocialLogin('apple')}
                    disabled={isLoading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="currentColor"
                      />
                    </svg>
                    Continue with Apple
                  </Button>
                  <Button 
                    type="button"
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </div>
              )}

              {/* Divider */}
              {showSocialLogin && showEmailLogin && (
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              )}

              {/* Email/Password Login */}
              {showEmailLogin && (
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <button
                        type="button"
                        onClick={onForgotPassword}
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                        disabled={isLoading}
                      >
                        Forgot your password?
                      </button>
                    </div>
                    <Input 
                      id="password" 
                      name="password"
                      type="password" 
                      required 
                      disabled={isLoading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </div>
              )}

              {/* Sign Up Link */}
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={onSignUp}
                  className="underline underline-offset-4 hover:text-primary"
                  disabled={isLoading}
                >
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Terms and Privacy */}
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By continuing, you agree to our{" "}
        <a href="#" className="hover:text-primary">Terms of Service</a>{" "}
        and{" "}
        <a href="#" className="hover:text-primary">Privacy Policy</a>.
      </div>
    </div>
  );
}

/**
 * USAGE EXAMPLES:
 * 
 * Basic usage:
 * <LoginForm />
 * 
 * With callbacks:
 * <LoginForm 
 *   onSubmit={(email, password) => console.log('Login:', email, password)}
 *   onSocialLogin={(provider) => console.log('Social login:', provider)}
 *   onForgotPassword={() => console.log('Forgot password')}
 *   onSignUp={() => console.log('Sign up')}
 * />
 * 
 * Customized for industry:
 * <LoginForm 
 *   title="Welcome to MedPortal"
 *   description="Sign in to access your patient records"
 *   showSocialLogin={false}
 *   onSubmit={handleHealthcareLogin}
 * />
 * 
 * With loading state:
 * <LoginForm 
 *   isLoading={isSigningIn}
 *   onSubmit={handleAsyncLogin}
 * />
 */
