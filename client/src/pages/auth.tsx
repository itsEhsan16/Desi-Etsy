import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/auth-context";
import LoginModal from "@/components/auth/login-modal";

export default function Auth() {
  const [, setLocation] = useLocation();
  const { user, openAuthModal } = useAuth();

  useEffect(() => {
    if (user) {
      // If user is already logged in, redirect to home
      setLocation("/");
    } else {
      // Open the auth modal
      openAuthModal();
    }
  }, [user, setLocation, openAuthModal]);

  // If user gets logged in while on this page, redirect
  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to <span className="text-primary">Desi Etsy</span>
          </h1>
          <p className="text-muted-foreground">
            Join our community of craft lovers and discover authentic handmade treasures
          </p>
        </div>
        
        {/* The LoginModal component will handle the authentication */}
        <LoginModal />
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
