import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: "🏢",
    title: "Multi-Vendor Management",
    desc: "Centralized control for onboarding, managing, and monitoring 20+ food vendors in one system.",
  },
  {
    icon: "📅",
    title: "Event & Peak-Time Scheduling",
    desc: "Plan and manage live events, promotions, and peak-hour operations with full visibility.",
  },
  {
    icon: "📊",
    title: "Space Utilization Control",
    desc: "Optimize seating layouts, crowd flow, and space efficiency through real-time data insights.",
  },
  {
    icon: "🔄",
    title: "Customer Flow Management",
    desc: "Improve customer experience with intelligent queue handling and service distribution.",
  },
  {
    icon: "💰",
    title: "Revenue Stream Analytics",
    desc: "Track sales performance across vendors, categories, and product lines in real time.",
  },
  {
    icon: "🖥️",
    title: "Operational Dashboard",
    desc: "Manage staff activity, system performance, and live order flow from a unified dashboard.",
  },
];

const Features = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            const cards = document.querySelectorAll(".feat-card");
            
            // Animate each card from different directions based on index
            cards.forEach((card, index) => {
              const direction = index % 3 === 0 ? -50 : index % 3 === 1 ? 50 : 0;
              const yDirection = index % 3 === 2 ? 50 : 0;
              
              gsap.fromTo(card,
                { 
                  x: direction, 
                  y: yDirection, 
                  opacity: 0,
                  scale: 0.8,
                  rotation: direction > 0 ? 5 : direction < 0 ? -5 : 0
                },
                {
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  rotation: 0,
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: "back.out(0.7)",
                }
              );
            });
            
            // Animate header elements
            gsap.fromTo(".section-label",
              { y: -30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
            );
            
            gsap.fromTo(".section-title",
              { scale: 0.9, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(0.5)" }
            );
            
            gsap.fromTo(".section-description",
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
            );
            
            setHasAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Add hover animations
    const addHoverEffects = () => {
      const cards = document.querySelectorAll(".feat-card");
      cards.forEach((card) => {
        const icon = card.querySelector("span:first-child");
        const cardTitle = card.querySelector("h3");
        
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -12,
            scale: 1.03,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 25px 40px rgba(0, 0, 0, 0.12)",
          });
          
          if (icon) {
            gsap.to(icon, {
              scale: 1.2,
              rotate: 8,
              duration: 0.25,
              ease: "back.out(0.6)",
            });
          }
          
          if (cardTitle) {
            gsap.to(cardTitle, {
              x: 6,
              duration: 0.2,
              ease: "power2.out",
            });
          }
        });
        
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "none",
          });
          
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotate: 0,
              duration: 0.25,
              ease: "power2.out",
            });
          }
          
          if (cardTitle) {
            gsap.to(cardTitle, {
              x: 0,
              duration: 0.2,
              ease: "power2.out",
            });
          }
        });
      });
    };

    setTimeout(addHoverEffects, 100);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section id="features" ref={ref} className="py-20 md:py-28 px-4 md:px-8 overflow-hidden" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="section-label text-sm text-secondary font-semibold mb-3 uppercase tracking-widest" >
            What We Offer
          </p>
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0f172a' }}>
            Everything You <span style={{ background: 'linear-gradient(135deg, #1e293b, #14b8a6, #0ea5e9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Need</span>
          </h2>
          <p className="section-description text-gray-600 max-w-2xl mx-auto">
            Discover a world of culinary experiences designed for everyone
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="feat-card bg-white rounded-xl p-6 border border-gray-200 transition-all cursor-pointer group relative overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-blue-500/0 group-hover:from-teal-500/5 group-hover:to-blue-500/10 transition-all duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <span className="text-5xl mb-4 block transition-all duration-300 inline-block">
                  {f.icon}
                </span>
                <h3 className="text-xl font-semibold mb-2 transition-all duration-300" style={{ color: '#0f172a' }}>
                  {f.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed transition-all duration-300">
                  {f.desc}
                </p>
                
                {/* Animated border bottom */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-300 group-hover:w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;