import { useEffect, useRef } from "react";
import gsap from "gsap";

const steps = [
  {
    step: "1",
    icon: "🚶",
    title: "Enter the System",
    desc: "Customers access a unified digital platform to explore all vendors in one place.",
  },
  {
    step: "2",
    icon: "👀",
    title: "Discover Vendors",
    desc: "Browse integrated menus from multiple food vendors in a single, seamless interface.",
  },
  {
    step: "3",
    icon: "🛒",
    title: "Unified Ordering",
    desc: "Place multiple vendor orders through one checkout system powered by centralized POS.",
  },
  {
    step: "4",
    icon: "🎉",
    title: "Smart Fulfillment",
    desc: "Orders are routed, prepared, and served efficiently with real-time operational tracking.",
  },
];

const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            const cards = document.querySelectorAll(".step-card");
            
            gsap.fromTo(cards,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.2,
                ease: "bounce.out",
                onComplete: () => {
                  animatedRef.current = true;
                },
              }
            );
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section ref={ref} className="section-padding bg-muted">
      <div className="container mx-auto px-4">
        <p className="font-body text-secondary font-semibold mb-2 uppercase tracking-widest text-sm text-center">
          How It Works
        </p>

        <h2 className="text-center text-4xl md:text-5xl font-bold mb-12" style={{ color: '#0f172a' }}>
          Simple as <span style={{ background: 'linear-gradient(135deg, #1e293b, #14b8a6, #0ea5e9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>1-2-3-4</span>
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <div key={i} className="step-card text-center">
              <div className="w-20 h-20 bg-gradient-fire rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                {s.icon}
              </div>
              <span className="font-display text-primary text-sm">Step {s.step}</span>
              <h3 className="font-display text-lg text-foreground mb-1">{s.title}</h3>
              <p className="font-body text-muted-foreground text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;