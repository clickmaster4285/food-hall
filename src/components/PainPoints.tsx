import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pains = [
  { emoji: "😴", title: "Boring Dining Options", desc: "Tired of the same old restaurants with the same old menus? You deserve variety." },
  { emoji: "🍽️", title: "Limited Food Choices", desc: "One cuisine per restaurant? Life's too short to settle for just one flavor." },
  { emoji: "😶", title: "No Social Vibe", desc: "Eating alone in silence? Where's the energy, the music, the community?" },
];

const PainPoints = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pain-card", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-foreground">
      <div className="container mx-auto">
        <p className="font-body text-primary font-semibold mb-2 uppercase tracking-widest text-sm text-center">The Problem</p>
        <h2 className="font-display text-4xl md:text-5xl text-primary-foreground text-center mb-12">
          Sound <span className="text-gradient-fire">Familiar?</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pains.map((p, i) => (
            <div key={i} className="pain-card bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-8 text-center hover:border-primary/50 transition-colors">
              <span className="text-5xl block mb-4">{p.emoji}</span>
              <h3 className="font-display text-xl text-primary-foreground mb-2">{p.title}</h3>
              <p className="font-body text-primary-foreground/60">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
