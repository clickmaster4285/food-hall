import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  { icon: "🌮🍜🍕", title: "Multi-Cuisine Paradise", desc: "From tacos to sushi, BBQ to vegan bowls — every craving satisfied under one roof." },
  { icon: "🎶🎉", title: "Live Social Experience", desc: "Live DJs, themed nights, communal tables — dining becomes an event, not just a meal." },
  { icon: "✨🔥", title: "Electric Atmosphere", desc: "Neon lights, open kitchens, buzzing energy — feel the vibe the moment you walk in." },
];

const Solutions = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sol-card", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        x: -60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container mx-auto">
        <p className="font-body text-secondary font-semibold mb-2 uppercase tracking-widest text-sm text-center">The Solution</p>
        <h2 className="section-title text-4xl md:text-5xl font-bold text-center mb-6" style={{ color: '#0f172a' }}>
          Welcome to <span style={{ background: 'linear-gradient(135deg, #1e293b, #14b8a6, #0ea5e9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>The Experience</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {solutions.map((s, i) => (
            <div key={i} className="sol-card bg-card rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow text-center">
              <span className="text-4xl block mb-4">{s.icon}</span>
              <h3 className="font-display text-xl text-foreground mb-2">{s.title}</h3>
              <p className="font-body text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
