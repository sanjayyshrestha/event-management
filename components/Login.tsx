'use client'
import { useState } from "react";
import { Calendar, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { login, registerUser } from "@/actions/user";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";


export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [isSigningUp,setIsSigningUp]=useState(false)
  const [isLoggingIn,setIsLoggingIn]=useState(false)
  const [authValue,setAuthValue]=useState('signup')
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoggingIn(true)
      const formData=new FormData()
      formData.append('email',email)
      formData.append('password',password)
      await login(formData)
     toast.success("Logged in successfully");
    } catch (error) {
      console.log('Error while logging in : ',error)
    }finally{
      setIsLoggingIn(false)
    }
   
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningUp(true)
    try {
    const formData=new FormData();
    formData.append('name',signupName)
    formData.append('email',signupEmail)
    formData.append('password',signupPassword)
    await registerUser(formData)
    setEmail('')
    setPassword('')
    toast.success('User registered successfully')
    setAuthValue('login')
    } catch (error) {
      console.log('Error in sign up : ',error)
    }finally{
      setIsSigningUp(false)
    }
  
  };

  const handleGoogleSignIn = async () => {
    
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Illustration/Branding */}
        <div className="hidden md:flex flex-col justify-center gap-6 p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <Calendar className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl">EventHub</h1>
              <p className="text-muted-foreground">
                Book events with ease
              </p>
            </div>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                ✓
              </div>
              <div>
                <p className="text-foreground">
                  Discover Amazing Events
                </p>
                <p className="text-sm">
                  Browse and book from hundreds of events
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                ✓
              </div>
              <div>
                <p className="text-foreground">
                  Easy Management
                </p>
                <p className="text-sm">
                  Track all your bookings in one place
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                ✓
              </div>
              <div>
                <p className="text-foreground">
                  Secure & Reliable
                </p>
                <p className="text-sm">
                  Your data is safe with us
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login/Signup Form */}
        <Card className="border shadow-2xl">
          <CardHeader>
            <div className="flex md:hidden items-center justify-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Calendar className="h-6 w-6" />
              </div>
              <span>EventHub</span>
            </div>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={authValue} onValueChange={(value)=>setAuthValue(value)} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value='login'>
                <form
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-input-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      required
                      className="bg-input-background"
                    />
                  </div>
                  <Button
                  disabled={isLoggingIn}
                    type="submit"
                    className="w-full shadow-md hover:shadow-lg transition-shadow"
                  >
                 {isLoggingIn ? "Signing In…" : "Sign In"}
                  </Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleGoogleSignIn}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </Button>

                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Demo: Use "admin@example.com" for admin access
                </p>
              </TabsContent>

              <TabsContent value="signup">
                <form
                  onSubmit={handleSignup}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">
                      Full Name
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={signupName}
                      onChange={(e) =>
                        setSignupName(e.target.value)
                      }
                      required
                      className="bg-input-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={signupEmail}
                      onChange={(e) =>
                        setSignupEmail(e.target.value)
                      }
                      required
                      className="bg-input-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) =>
                        setSignupPassword(e.target.value)
                      }
                      required
                      className="bg-input-background"
                    />
                  </div>
                  <Button
                  disabled={isSigningUp}
                    type="submit"
                    className="w-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    {isSigningUp?"Creating...":"Create Account"}
                  </Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleGoogleSignIn}
                >
                  <Mail className="h-5 w-5" />
                  Sign up with Google
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}