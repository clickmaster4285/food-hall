import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sarah K.",
    role: "Food Hall Operations Manager",
    quote:
      "The platform completely transformed how we manage vendors and orders. Everything is now centralized and significantly more efficient.",
    company: "Taste Group Operations",
    initial: "S",
  },
  {
    name: "Marcus J.",
    role: "Customer Experience Lead",
    quote:
      "We now have full visibility into customer flow and peak hours. It’s helped us optimize staffing and reduce wait times drastically.",
    company: "Urban Dining Collective",
    initial: "M",
  },
  {
    name: "Priya R.",
    role: "Event & Venue Manager",
    quote:
      "Managing large-scale events is now seamless. The system handles coordination across vendors without operational bottlenecks.",
    company: "Elite Venue Management",
    initial: "P",
  },
  {
    name: "David L.",
    role: "Food Vendor Partner",
    quote:
      "As a vendor, the platform gave me real-time insights into sales and performance. It helped me scale my outlet faster than expected.",
    company: "Independent Vendor",
    initial: "D",
  },
  {
    name: "Emily W.",
    role: "Food Hall Investor",
    quote:
      "This system provides the operational transparency we need to evaluate and scale food hall investments confidently.",
    company: "FoodTech Ventures",
    initial: "E",
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