import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: "🍴", title: "20+ Food Vendors", desc: "Curated selection of the best local and international chefs" },
  { icon: "🎵", title: "Live Events Weekly", desc: "Music, comedy nights, food festivals, and pop-ups" },
  { icon: "🪑", title: "Flexible Seating", desc: "Communal tables, cozy corners, and outdoor patios" },
  { icon: "👨‍👩‍👧‍👦", title: "Family-Friendly", desc: "Kids play area, high chairs, and family portions" },
  { icon: "🍺", title: "Craft Bar", desc: "Local craft beers, signature cocktails, and fresh juices" },
  { icon: "📶", title: "Work-Friendly", desc: "Free WiFi, power outlets, and quiet zones for remote workers" },
];

const Features = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feat-card", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={ref} className="section-padding bg-muted">
      <div className="container mx-auto">
        <p className="font-body text-primary font-semibold mb-2 uppercase tracking-widest text-sm text-center">What We Offer</p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground text-center mb-12">
          Everything You <span className="text-gradient-fire">Need</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className="feat-card bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all hover:-translate-y-1">
              <span className="text-4xl mb-3 block">{f.icon}</span>
              <h3 className="font-display text-lg text-foreground mb-1">{f.title}</h3>
              <p className="font-body text-muted-foreground text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
