import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { emoji: "🌮", name: "Mexican & Latin", color: "bg-gradient-fire" },
  { emoji: "🍜", name: "Asian Fusion", color: "bg-gradient-teal" },
  { emoji: "🍕", name: "Italian & Pizza", color: "bg-gradient-warm" },
  { emoji: "🍔", name: "Burgers & BBQ", color: "bg-gradient-fire" },
  { emoji: "🥗", name: "Healthy & Vegan", color: "bg-gradient-teal" },
  { emoji: "🍩", name: "Desserts & Coffee", color: "bg-gradient-warm" },
  { emoji: "🍣", name: "Sushi & Seafood", color: "bg-gradient-fire" },
  { emoji: "🥘", name: "Middle Eastern", color: "bg-gradient-teal" },
];

const Vendors = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".vendor-card", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        scale: 0.5,
        opacity: 0,
        rotation: -10,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.7)",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="vendors" ref={ref} className="section-padding bg-background">
      <div className="container mx-auto">
        <p className="font-body text-primary font-semibold mb-2 uppercase tracking-widest text-sm text-center">Our Vendors</p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground text-center mb-12">
          A World of <span className="text-gradient-fire">Flavors</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {categories.map((c, i) => (
            <div key={i} className={`vendor-card ${c.color} rounded-2xl p-6 text-center text-primary-foreground hover:scale-105 transition-transform cursor-pointer`}>
              <span className="text-5xl block mb-3">{c.emoji}</span>
              <h3 className="font-display text-sm md:text-base">{c.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vendors;
