import { useEffect, useRef } from "react";
import gsap from "gsap";
import aboutImg from "@/assets/about.webp";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            const elements = document.querySelectorAll(".about-content");
            const image = document.querySelector(".about-image");
            
            // Animate text content
            gsap.fromTo(elements,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                stagger: 0.15,
                ease: "power3.out",
              }
            );
            
            // Animate image
            gsap.fromTo(image,
              { x: -50, opacity: 0, scale: 0.9 },
              {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
              }
            );
            
            animatedRef.current = true;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Add hover effect for image
    const addHoverEffect = () => {
      const image = document.querySelector(".about-image");
      if (image) {
        image.addEventListener("mouseenter", () => {
          gsap.to(image, {
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out",
          });
        });
        
        image.addEventListener("mouseleave", () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      }
    };

    setTimeout(addHoverEffect, 100);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 md:px-8"
      style={{ backgroundColor: '#f8fafc' }}
    >
      <div className="container mx-auto max-w-6xl">
        
        {/* Grid Layout with Image and Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Image */}
          <div className="about-image rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={aboutImg} 
              alt="About Food Hall" 
              className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
          
          {/* Right side - Content */}
          <div className="space-y-6">
            
            {/* Label */}
            <p className="about-content text-sm font-semibold uppercase tracking-widest text-secondary">
              Who We Are
            </p>

         {/* Title */}
<h2 className="section-title text-4xl md:text-5xl font-bold mb-6 text-foreground">
  More Than Just a{" "}
  <span className="bg-gradient-to-r from-slate-800 via-slate-600 to-sky-600 bg-clip-text text-transparent">
    Food Hall
  </span>
</h2>

{/* Paragraph 1 */}
<p className="about-content text-lg leading-relaxed text-muted-foreground">
  A modern food hall platform designed to connect vendors, streamline operations, and elevate multi-cuisine dining experiences under one unified system.
</p>

{/* Paragraph 2 */}
<p className="about-content text-lg leading-relaxed text-muted-foreground">
  From daily service to high-traffic peak hours, the platform ensures smooth coordination between customers, stalls, and management creating efficiency at every touchpoint.
</p>

{/* Paragraph 3 */}
<p className="about-content text-lg leading-relaxed text-muted-foreground">
  Every interaction inside the food hall is powered by structure, speed, and clarity enabling a smarter, more connected dining ecosystem.
</p>
            
   
            
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default About;