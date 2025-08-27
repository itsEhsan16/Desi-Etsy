import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, UserCircle, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Thank you for subscribing!",
      description: "You'll receive updates about new collections and exclusive offers.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Stay Connected with Indian Heritage
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Get exclusive access to new collections, artisan stories, and special offers. 
            Join our community celebrating India's rich craft traditions.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/90 border-0 focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
              data-testid="input-newsletter-email"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors px-8"
              data-testid="button-newsletter-subscribe"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          
          <div className="flex items-center justify-center space-x-6 text-primary-foreground/80">
            <div className="flex items-center space-x-2">
              <Gift className="h-5 w-5" />
              <span className="text-sm">Exclusive offers</span>
            </div>
            <div className="flex items-center space-x-2">
              <UserCircle className="h-5 w-5" />
              <span className="text-sm">Artisan stories</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span className="text-sm">New arrivals</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
