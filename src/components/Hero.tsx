import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import hero1 from "@/assets/hero-1.webp";
import hero2 from "@/assets/hero-2.webp";
import hero3 from "@/assets/hero-3.webp";

const slides = [
  {
    img: hero1,
    headline: "Where Food Meets Culture",
    sub: "A connected ecosystem for vendors, operations, and unforgettable dining experiences.",
  },
  {
    img: hero2,
    headline: "Every Flavor, One System",
    sub: "Unified management for multi-vendor food halls with seamless ordering and control.",
  },
  {
    img: hero3,
    headline: "Built for Busy Food Halls",
    sub: "Real-time operations, fast checkout, and smooth coordination across every stall.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // text animation
  useEffect(() => {
    if (!textRef.current) return;

    gsap.fromTo(
      textRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  }, [current]);

  return (
    <section id="hero" className="relative h-screen overflow-hidden bg-background">

      {/* Slides */}
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
            className="w-full h-full object-cover scale-105"
          />

          {/* Clean subtle overlay (no heavy dark mask) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">

        <div ref={textRef} className="max-w-3xl">

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-4 leading-tight">
            {slides[current].headline}
          </h1>

          <p className="font-body text-lg md:text-xl text-white/80 mb-8">
            {slides[current].sub}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">

            <a
              href="#about"
              className="bg-secondary text-white px-8 py-4 rounded-full font-body font-semibold text-lg hover:scale-105 transition-transform"
            >
              Explore Now
            </a>

            <a
              href="#contact"
              className="border border-white/30 text-white px-8 py-4 rounded-full font-body font-semibold text-lg hover:bg-white/10 transition-colors"
            >
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
            className={`transition-all rounded-full ${
              i === current
                ? "w-8 h-2 bg-secondary"
                : "w-2 h-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;