import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { 
    name: "Sarah K.", 
    role: "Food Blogger & Critic", 
    quote: "This place is ELECTRIC! The variety is insane and the vibe is unmatched. I bring all my friends here!",
    company: "Taste Magazine",
    initial: "S"
  },
  { 
    name: "Marcus J.", 
    role: "Regular Visitor", 
    quote: "My family's new weekend tradition. The kids love the play area and we love the food. Win-win!",
    company: "Local Resident",
    initial: "M"
  },
  { 
    name: "Priya R.", 
    role: "Event Planner", 
    quote: "Hosted my company holiday party here. The team at DineFlow made everything seamless and delicious.",
    company: "Elite Events Co.",
    initial: "P"
  },
  { 
    name: "David L.", 
    role: "Local Chef & Vendor", 
    quote: "As a vendor, the support and foot traffic are incredible. My business grew 3x in the first year!",
    company: "David's Kitchen",
    initial: "D"
  },
  { 
    name: "Emily W.", 
    role: "Culinary Enthusiast", 
    quote: "I've been to food halls around the world. This one has SOUL. The music, the people, the energy — chef's kiss!",
    company: "Food Critic",
    initial: "E"
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { scale: 0.95, opacity: 0, y: 20 }, 
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" }
      );
    }
  }, [current]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.fromTo(cardRef.current,
            { scale: 0.8, opacity: 0, y: 30 },
            { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.2)" }
          );
        },
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="section-padding bg-foreground">
      <div className="container mx-auto max-w-4xl px-4">
        
        {/* Label */}
        <p className="font-body text-secondary font-semibold mb-2 uppercase tracking-widest text-sm text-center">
          Testimonials
        </p>
        
        {/* Title */}
        <h2 className="section-title text-center text-4xl md:text-5xl font-bold mb-6 text-white">
          What People <span style={{ background: 'linear-gradient(135deg, #14b8a6, #0ea5e9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Say</span>
        </h2>

        {/* Testimonial Card */}
        <div ref={cardRef} className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/20 rounded-3xl p-8 md:p-12 shadow-2xl">
          
      
          
       
          
          {/* Author Info */}
          <div className="text-center">
            <p className="font-display text-secondary text-lg font-semibold">
              {testimonials[current].name}
            </p>
               {/* Quote Text */}
          <p className="font-body text-xl md:text-xl text-primary-foreground/90 my-6  text-center">
            "{testimonials[current].quote}"
            </p>
            
            <p className="font-body text-primary-foreground/60 text-sm mt-1">
              {testimonials[current].role}
            </p>
            <p className="font-body text-primary-foreground/40 text-xs mt-1">
              {testimonials[current].company}
            </p>
          </div>
          
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current 
                  ? "bg-primary w-6 h-2" 
                  : "bg-primary-foreground/30 w-2 h-2 hover:bg-primary-foreground/50"
              }`}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Testimonials;