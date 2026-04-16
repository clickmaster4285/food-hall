import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "50K+", label: "Monthly Visitors", desc: "Growing 30% month over month since launch" },
  { value: "95%", label: "Vendor Retention", desc: "Our vendors love it here — and it shows" },
  { value: "4.8★", label: "Average Rating", desc: "Across Google, Yelp, and TripAdvisor" },
  { value: "200+", label: "Events Hosted", desc: "Weddings, birthdays, corporate — we do it all" },
];

const CaseStudies = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        scale: 0.3,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "elastic.out(1, 0.5)",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container mx-auto">
        <p className="font-body text-primary font-semibold mb-2 uppercase tracking-widest text-sm text-center">Results</p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground text-center mb-12">
          The Numbers <span className="text-gradient-fire">Speak</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((s, i) => (
            <div key={i} className="stat-card bg-card rounded-2xl p-6 text-center border border-border shadow-md">
              <span className="font-display text-4xl text-gradient-fire block mb-1">{s.value}</span>
              <h3 className="font-display text-base text-foreground mb-1">{s.label}</h3>
              <p className="font-body text-muted-foreground text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
