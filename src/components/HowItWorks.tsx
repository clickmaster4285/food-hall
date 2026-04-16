import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { step: "1", icon: "🚶", title: "Walk In", desc: "No reservations needed. Just show up and explore!" },
  { step: "2", icon: "👀", title: "Browse & Discover", desc: "Stroll through 20+ stalls and find what excites you." },
  { step: "3", icon: "🛒", title: "Order Anywhere", desc: "Order from multiple vendors in one visit — mix and match!" },
  { step: "4", icon: "🎉", title: "Eat, Vibe, Repeat", desc: "Grab a seat, enjoy the music, and soak in the atmosphere." },
];

const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".step-card", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "bounce.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-muted">
      <div className="container mx-auto">
        <p className="font-body text-secondary font-semibold mb-2 uppercase tracking-widest text-sm text-center">How It Works</p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground text-center mb-12">
          Simple as <span className="text-gradient-fire">1-2-3-4</span>
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
