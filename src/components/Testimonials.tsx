import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { name: "Sarah K.", role: "Food Blogger", quote: "This place is ELECTRIC! The variety is insane and the vibe is unmatched. I bring all my friends here!", avatar: "🧑‍🍳" },
  { name: "Marcus J.", role: "Regular Visitor", quote: "My family's new weekend tradition. The kids love the play area and we love the food. Win-win!", avatar: "👨‍👩‍👧" },
  { name: "Priya R.", role: "Event Planner", quote: "Hosted my company holiday party here. The team at FoodHall made everything seamless and delicious.", avatar: "💃" },
  { name: "David L.", role: "Local Chef", quote: "As a vendor, the support and foot traffic are incredible. My business grew 3x in the first year!", avatar: "👨‍🍳" },
  { name: "Emily W.", role: "Foodie", quote: "I've been to food halls around the world. This one has SOUL. The music, the people, the energy — chef's kiss!", avatar: "🌟" },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" });
    }
  }, [current]);

  return (
    <section id="testimonials" ref={sectionRef} className="section-padding bg-foreground">
      <div className="container mx-auto max-w-3xl text-center">
        <p className="font-body text-primary font-semibold mb-2 uppercase tracking-widest text-sm">Testimonials</p>
        <h2 className="font-display text-4xl md:text-5xl text-primary-foreground mb-12">
          What People <span className="text-gradient-fire">Say</span>
        </h2>

        <div ref={cardRef} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-3xl p-8 md:p-12">
          <span className="text-6xl block mb-4">{testimonials[current].avatar}</span>
          <p className="font-body text-xl md:text-2xl text-primary-foreground/90 italic mb-6 leading-relaxed">
            "{testimonials[current].quote}"
          </p>
          <p className="font-display text-primary text-lg">{testimonials[current].name}</p>
          <p className="font-body text-primary-foreground/50 text-sm">{testimonials[current].role}</p>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-primary-foreground/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
