import { useEffect, useRef } from "react";
import gsap from "gsap";
import whyUsImg from "@/assets/whyUs.jpg";

const reasons = [
  {
    num: "01",
    title: "Verified Vendor Network",
    desc: "Only trusted and performance-tested vendors are onboarded to ensure consistent operational quality.",
  },
  {
    num: "02",
    title: "Ecosystem-Focused Platform",
    desc: "Built to support scalable food hall ecosystems that connect vendors, customers, and management seamlessly.",
  },
  {
    num: "03",
    title: "Dynamic Operational Flow",
    desc: "Real-time updates, rotating menus, and adaptive workflows keep the system efficient and responsive.",
  },
  {
    num: "04",
    title: "Always-On Operations",
    desc: "Designed for continuous service across peak and off-peak hours with stable performance and reliability.",
  },
];

const WhyChooseUs = () => {
  const ref = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            const items = document.querySelectorAll(".why-item");
            const image = document.querySelector(".why-image");
            
            gsap.fromTo(items,
              { x: -40, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.12,
                ease: "power3.out",
              }
            );
            
            gsap.fromTo(image,
              { x: 40, opacity: 0, scale: 0.9 },
              {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
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

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 md:px-8" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container mx-auto max-w-7xl">
        
        {/* Label */}
        <p className="text-sm font-semibold mb-3 uppercase tracking-widest text-center" style={{ color: '#14b8a6' }}>
          Why Choose Us
        </p>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 leading-tight" style={{ color: '#0f172a' }}>
          Why Choose <span style={{ background: 'linear-gradient(135deg, #14b8a6, #0ea5e9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Food Hall?</span>
        </h2>

        {/* Grid Layout - Stack on mobile, side by side on desktop */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left side - List (shows first on mobile) */}
          <div className="flex-1 space-y-5 order-2 lg:order-1">
            {reasons.map((r, i) => (
              <div
                key={i}
                className="why-item flex items-start gap-6 bg-white border border-gray-200 rounded-2xl p-6 hover:border-teal-400/40 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <span className="text-3xl md:text-4xl shrink-0 font-bold transition-all duration-300 group-hover:scale-110" style={{ color: '#14b8a6' }}>
                  {r.num}
                </span>

                <div>
                  <h3 className="text-xl font-semibold mb-1 transition-all duration-300 group-hover:text-teal-600" style={{ color: '#0f172a' }}>
                    {r.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Image (shows on top on mobile) */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="why-image rounded-2xl overflow-hidden shadow-xl sticky top-24">
              <img 
                src={whyUsImg} 
                alt="Why Choose Food Hall" 
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;