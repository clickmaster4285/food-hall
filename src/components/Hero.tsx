import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  { img: hero1, headline: "Where Food Meets Culture", sub: "Come for food, stay for the experience" },
  { img: hero2, headline: "Every Flavor, One Roof", sub: "Diverse cuisines from around the world" },
  { img: hero3, headline: "Nights That Sizzle", sub: "Live music, great food, unforgettable vibes" },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "back.out(1.7)" }
      );
    }
  }, [current]);

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.img}
            alt={slide.headline}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <div ref={textRef}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-primary-foreground mb-4 leading-tight">
            {slides[current].headline}
          </h1>
          <p className="font-body text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {slides[current].sub}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#about" className="bg-gradient-fire text-primary-foreground px-8 py-4 rounded-full font-body font-bold text-lg hover:scale-105 transition-transform">
              Explore Now
            </a>
            <a href="#contact" className="border-2 border-primary-foreground/50 text-primary-foreground px-8 py-4 rounded-full font-body font-bold text-lg hover:bg-primary-foreground/10 transition-colors">
              Book an Event
            </a>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-primary w-8" : "bg-primary-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
