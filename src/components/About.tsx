import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-content", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-background">
      <div className="container mx-auto max-w-4xl text-center">
        <p className="about-content font-body text-primary font-semibold mb-2 uppercase tracking-widest text-sm">Who We Are</p>
        <h2 className="about-content font-display text-4xl md:text-5xl text-foreground mb-6">
          More Than Just a <span className="text-gradient-fire">Food Court</span>
        </h2>
        <p className="about-content font-body text-lg text-muted-foreground leading-relaxed mb-6">
          We're a community hub where foodies, families, and friends come together to explore bold flavors from around the globe. 
          Our food hall isn't just about eating — it's about discovering new cultures, supporting local chefs, and creating memories 
          over shared plates. Whether you're grabbing a quick lunch or spending an evening with live music and craft cocktails, 
          this is your space to connect, celebrate, and feast.
        </p>
        <p className="about-content font-body text-lg text-muted-foreground leading-relaxed">
          Born from a passion for bringing diverse communities together, we've built a space where every stall tells a story, 
          every dish is an adventure, and every visit feels like coming home.
        </p>
      </div>
    </section>
  );
};

export default About;
