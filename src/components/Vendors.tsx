import { useEffect, useRef } from "react";
import gsap from "gsap";

const categories = [
  { emoji: "🌮", name: "Mexican & Latin" },
  { emoji: "🍜", name: "Asian Fusion" },
  { emoji: "🍕", name: "Italian & Pizza" },
  { emoji: "🍔", name: "Burgers & BBQ" },
  { emoji: "🥗", name: "Healthy & Vegan" },
  { emoji: "🍩", name: "Desserts & Coffee" },
  { emoji: "🍣", name: "Sushi & Seafood" },
  { emoji: "🥘", name: "Middle Eastern" },
];

const Vendors = () => {
  const ref = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            const cards = document.querySelectorAll(".vendor-card");
            gsap.fromTo(cards,
              { scale: 0.5, opacity: 0, rotation: -10 },
              {
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "back.out(1.7)",
                onComplete: () => {
                  animatedRef.current = true;
                },
              }
            );
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Add hover effects
    const addHoverEffects = () => {
      const cards = document.querySelectorAll(".vendor-card");
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.08,
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });
          const emoji = card.querySelector("span");
          if (emoji) {
            gsap.to(emoji, {
              scale: 1.2,
              rotate: 5,
              duration: 0.2,
              ease: "back.out(0.6)",
            });
          }
        });
        
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
          const emoji = card.querySelector("span");
          if (emoji) {
            gsap.to(emoji, {
              scale: 1,
              rotate: 0,
              duration: 0.2,
              ease: "power2.out",
            });
          }
        });
      });
    };

    // Small delay to ensure DOM is ready
    setTimeout(addHoverEffects, 100);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section id="vendors" ref={ref} className="section-padding bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="font-body text-primary font-semibold mb-2 uppercase tracking-widest text-sm">
            Our Vendors
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground text-center mb-4">
            A World of <span className="text-gradient-primary">Flavors</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Explore diverse cuisines from around the world
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {categories.map((c, i) => (
            <div 
              key={i} 
              className="vendor-card bg-gradient-primary rounded-2xl p-6 text-center text-primary-foreground transition-all cursor-pointer shadow-lg hover:shadow-xl"
            >
              <span className="text-5xl block mb-3">{c.emoji}</span>
              <h3 className="font-display text-sm md:text-base font-semibold">{c.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vendors;