import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  { num: "01", title: "Curated Quality", desc: "Every vendor is handpicked and vetted for quality, taste, and creativity." },
  { num: "02", title: "Community First", desc: "We support local chefs, create jobs, and build neighborhood connections." },
  { num: "03", title: "Always Fresh", desc: "Rotating vendors and seasonal menus keep things exciting every visit." },
  { num: "04", title: "All-Day Destination", desc: "Morning coffee to late-night bites — we're here whenever hunger strikes." },
];

const WhyChooseUs = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-item", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        x: 80,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-foreground">
      <div className="container mx-auto max-w-4xl">
        <p className="font-body text-primary font-semibold mb-2 uppercase tracking-widest text-sm text-center">Why Us</p>
        <h2 className="font-display text-4xl md:text-5xl text-primary-foreground text-center mb-12">
          Why Choose <span className="text-gradient-fire">FoodHall?</span>
        </h2>
        <div className="space-y-6">
          {reasons.map((r, i) => (
            <div key={i} className="why-item flex items-start gap-6 bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-6 hover:border-primary/40 transition-colors">
              <span className="font-display text-3xl text-primary shrink-0">{r.num}</span>
              <div>
                <h3 className="font-display text-xl text-primary-foreground mb-1">{r.title}</h3>
                <p className="font-body text-primary-foreground/60">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
