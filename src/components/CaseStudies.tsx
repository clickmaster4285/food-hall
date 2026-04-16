import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import caseStudyImg from "@/assets/caseStudy.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: 50000,
    label: "Monthly Transactions",
    desc: "High-volume order processing powered through the platform with consistent performance scaling",
    suffix: "+",
    prefix: "",
  },
  {
    value: 95,
    label: "Vendor Platform Retention",
    desc: "Food vendors continuously operate on the system due to reliability and operational efficiency",
    suffix: "%",
    prefix: "",
  },
  {
    value: 4.8,
    label: "System Reliability Score",
    desc: "Measured across uptime, order accuracy, and operational performance",
    suffix: "★",
    prefix: "",
  },
  {
    value: 200,
    label: "Managed Events & Operations",
    desc: "Includes large-scale dining events, peak-hour coordination, and vendor operations support",
    suffix: "+",
    prefix: "",
  },
];
const CaseStudies = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  // Counter animation function
  const animateCounter = (index: number, targetValue: number) => {
    let startTime: number | null = null;
    const duration = 2000;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      let currentValue;
      if (targetValue % 1 !== 0) {
        currentValue = (targetValue * easeProgress).toFixed(1);
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = parseFloat(currentValue);
          return newCounters;
        });
      } else {
        currentValue = Math.floor(targetValue * easeProgress);
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = currentValue;
          return newCounters;
        });
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const cards = document.querySelectorAll(".stat-card");
      const image = document.querySelector(".case-image");
      const overlayCard = document.querySelector(".overlay-card");
      
      if (cards.length === 0) return;
      
      // Set initial state
      gsap.set(cards, { 
        scale: 0.3, 
        opacity: 0 
      });
      
      gsap.set(image, {
        scale: 0.8,
        opacity: 0,
        x: 50
      });
      
      gsap.set(overlayCard, {
        y: 30,
        opacity: 0
      });
      
      // Create scroll trigger
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 80%",
        onEnter: () => {
          if (!hasAnimated) {
            // Animate cards
            gsap.to(cards, {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "elastic.out(1, 0.5)",
              onComplete: () => {
                // Start counter animations after cards appear
                stats.forEach((stat, index) => {
                  animateCounter(index, stat.value);
                });
              }
            });
            
            // Animate image
            gsap.to(image, {
              scale: 1,
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: "power3.out",
            });
            
            // Animate overlay card
            gsap.to(overlayCard, {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: 0.3,
              ease: "back.out(0.5)",
            });
            
            setHasAnimated(true);
          }
        },
        onLeaveBack: () => {
          if (hasAnimated) {
            gsap.set(cards, { 
              scale: 0.3, 
              opacity: 0 
            });
            gsap.set(image, {
              scale: 0.8,
              opacity: 0,
              x: 50
            });
            gsap.set(overlayCard, {
              y: 30,
              opacity: 0
            });
            setCounters(stats.map(() => 0));
            setHasAnimated(false);
          }
        },
      });
      
      // Refresh ScrollTrigger
      ScrollTrigger.refresh();
    }, 100);
    
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [hasAnimated]);

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container mx-auto">
        
        {/* Label */}
        <p className="font-body text-secondary font-semibold mb-2 uppercase tracking-widest text-sm text-center">
          Results
        </p>
        
        {/* Title */}
        <h2 className="section-title text-center text-4xl md:text-5xl font-bold mb-6" style={{ color: '#0f172a' }}>
          The Numbers <span style={{ background: 'linear-gradient(135deg, #1e293b, #14b8a6, #0ea5e9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Speak</span>
        </h2>
    
        
        {/* Image Section with Overlay Card */}
        <div className="case-image max-w-5xl mx-auto relative">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img 
              src={caseStudyImg} 
              alt="Case Study" 
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
          
          {/* Overlay Card - The design you liked */}
          <div className="overlay-card absolute -bottom-6 left-6 right-6 bg-card border border-border rounded-xl p-4 shadow-xl backdrop-blur-sm">
            <p className="font-body text-sm text-muted-foreground italic">
              "The best decision we made was joining Food Hall. Our revenue has tripled!"
            </p>
            <p className="font-display text-xs font-semibold text-secondary mt-2">
              — Maria G., Vendor Partner
            </p>
          </div>
        </div>
            
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16">
          {stats.map((s, i) => (
            <div key={i} className="stat-card bg-card rounded-2xl p-6 text-center border border-border shadow-md font-medium">
              <span className="font-display text-4xl text-gradient-fire block mb-1">
                {s.prefix}
                {s.label === "Average Rating" 
                  ? counters[i].toFixed(1)
                  : counters[i].toLocaleString()}
                {s.suffix}
              </span>
              <h3 className="font-display text-base text-secondary mb-1">{s.label}</h3>
              <p className="font-body text-muted-foreground text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default CaseStudies;