import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Anita Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    comment: "The Banarasi saree I ordered exceeded all my expectations. The craftsmanship is exquisite, and you can feel the love and tradition woven into every thread. Absolutely stunning!",
    initials: "AS"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Delhi, India",
    rating: 5,
    comment: "I bought a beautiful pottery set for my new home. Each piece tells a story of India's rich heritage. The quality is exceptional and the artisan's skill is truly remarkable.",
    initials: "RK"
  },
  {
    id: 3,
    name: "Priya Mehta",
    location: "Bangalore, Karnataka",
    rating: 5,
    comment: "The jewelry piece I purchased is absolutely divine. The intricate work and attention to detail is phenomenal. I've received so many compliments! Highly recommended.",
    initials: "PM"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-br from-secondary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-secondary">Customers Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from satisfied customers who have experienced the beauty of authentic Indian crafts
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="shadow-lg" data-testid={`testimonial-${testimonial.id}`}>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-accent">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">{testimonial.rating}.0</span>
                </div>
                
                <p className="text-muted-foreground mb-6 italic leading-relaxed">
                  "{testimonial.comment}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                    {testimonial.initials}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
