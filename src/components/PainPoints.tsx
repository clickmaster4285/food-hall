import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pains = [
  {
    title: "Fragmented Vendor Operations",
    desc: "Food halls often rely on disconnected systems, making it difficult to manage multiple vendors efficiently.",
  },
  {
    title: "Lack of Unified Ordering System",
    desc: "Customers and staff must deal with separate workflows for each vendor, leading to inefficiencies and delays.",
  },
  {
    title: "Poor Operational Visibility",
    desc: "Management lacks real-time insight into sales, performance, and order flow across the entire food hall.",
  },
];

const PainPoints = () => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".pain-card");

      gsap.set(cards, {
        y: 40,
        opacity: 0,
        scale: 0.96,
      });

      gsap.to(cards, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      cards.forEach((card) => {
        const hoverTl = gsap.timeline({ paused: true });

        hoverTl.to(card, {
          y: -8,
          scale: 1.02,
          duration: 0.25,
          ease: "power2.out",
        });

        card.addEventListener("mouseenter", () => hoverTl.play());
        card.addEventListener("mouseleave", () => hoverTl.reverse());
      });

      ScrollTrigger.refresh();
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-primary text-white">
      <div className="container mx-auto">

        {/* Label */}
        <p className="font-body text-secondary font-semibold mb-3 uppercase tracking-widest text-xs text-center">
          Experience Gap
        </p>

        {/* Title */}
        <h2 className="font-bold text-4xl md:text-5xl text-center mb-12 leading-tight">
          Rethinking How We{" "}
          <span style={{ background: 'linear-gradient(135deg, #14b8a6, #0ea5e9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Dine Together</span>
        </h2>



        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {pains.map((p, i) => (
            <div
              key={i}
              className="pain-card bg-white/10 border border-white/15 rounded-2xl p-8 backdrop-blur-sm cursor-pointer transition-all"
            >
              <h3 className="font-display text-xl text-secondary mb-3">
                {p.title}
              </h3>

              <p className="font-body text-white/70 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default PainPoints;