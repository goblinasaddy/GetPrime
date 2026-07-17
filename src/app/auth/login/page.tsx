"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/footer";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialError = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Decode the real error from the callback URL
  const initialErrorMsg = initialError
    ? errorDescription
      ? decodeURIComponent(errorDescription)
      : initialError === "AuthCallbackError"
      ? "Google sign-in failed. Make sure your redirect URL (http://localhost:3000/auth/callback) is listed under Authentication → URL Configuration → Redirect URLs in your Supabase project."
      : decodeURIComponent(initialError)
    : null;

  const [error, setError] = useState<string | null>(initialErrorMsg);

  const getErrorMessage = (err: any): string => {
    if (!err) return "An unexpected error occurred.";
    if (typeof err === "string") return err;
    const msg: string = err?.message ?? err?.error_description ?? "";
    if (!msg || msg.trim() === "{}") {
      return "An unexpected error occurred. Please try again.";
    }
    // Humanize common Supabase error messages
    if (msg.includes("Invalid login credentials"))
      return "Incorrect email or password. Please check your credentials.";
    if (msg.includes("Email not confirmed"))
      return "Your email address is not confirmed. Please check your inbox and click the verification link.";
    if (msg.includes("User already registered"))
      return "An account with this email already exists. Please sign in instead.";
    if (msg.includes("provider is not enabled"))
      return "Google Login is not enabled in the Supabase dashboard. Go to Authentication → Providers → Google to enable it.";
    if (msg.includes("redirect_uri_mismatch") || msg.includes("redirect"))
      return "Redirect URL mismatch. Add 'http://localhost:3000/auth/callback' to your Supabase Redirect URLs under Authentication → URL Configuration.";
    if (msg.includes("Password should be at least"))
      return "Password must be at least 6 characters long.";
    return msg;
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(getErrorMessage(err));
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const supabase = createClient();
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        
        if (data.session) {
          router.push("/");
        } else {
          setMessage("Sign-up successful! Please check your email inbox to confirm your account.");
          setLoading(false);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      setError(getErrorMessage(err));
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-border shadow-md bg-white">
      <CardHeader className="text-center pb-4 border-b border-border">
        <CardTitle className="text-2xl font-bold text-primary tracking-tight">
          GetPrime
        </CardTitle>
        <CardDescription className="text-slate-500 font-medium">
          Practice TCS NQT exactly like the real exam.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 flex flex-col space-y-4">
        <div className="text-center text-sm text-slate-600 mb-1">
          Amity University Placement Preparation Portal
        </div>

        {error && (
          <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded leading-relaxed">
            {error}
          </div>
        )}

        {message && (
          <div className="p-3 text-xs bg-green-50 text-green-700 border border-green-200 rounded leading-relaxed">
            {message}
          </div>
        )}

        {/* Google Login Option */}
        <Button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full h-12 text-sm font-semibold flex items-center justify-center gap-2"
        >
          {loading && !email ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.3.65 4.5 1.8l2.4-2.4C17.3 1.7 14.9 1 12.24 1 6.58 1 2 5.58 2 11.24s4.58 10.24 10.24 10.24c5.79 0 10.24-4.1 10.24-10.24 0-.69-.08-1.36-.21-1.95H12.24z" />
              </svg>
              Continue with Google
            </>
          )}
        </Button>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400 uppercase tracking-widest bg-white">OR</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Email/Password Option */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="text-xs font-semibold text-slate-700">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@amity.edu"
              required
              disabled={loading}
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="password" className="text-xs font-semibold text-slate-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            variant="outline"
            className="w-full h-11 text-sm font-semibold border-slate-300 hover:bg-slate-50 text-slate-800"
          >
            {loading && email ? (
              <span className="w-5 h-5 border-2 border-slate-800 border-t-transparent rounded-full animate-spin" />
            ) : isSignUp ? (
              "Create Account"
            ) : (
              "Sign In with Email"
            )}
          </Button>
        </form>

        {/* Form Switch Link */}
        <div className="text-center pt-2">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-primary font-semibold hover:underline"
            disabled={loading}
          >
            {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <div className="flex-1 flex items-center justify-center p-4">
        <Suspense fallback={
          <Card className="w-full max-w-md border-border shadow-md bg-white p-8 text-center space-y-4">
            <span className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin inline-block mx-auto" />
            <h2 className="text-sm font-bold text-slate-800">Loading Login Portal...</h2>
          </Card>
        }>
          <LoginForm />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
