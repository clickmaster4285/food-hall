import { useEffect, useRef } from "react";
import gsap from "gsap";
import blog1 from "@/assets/blog-1.webp";
import blog2 from "@/assets/blog-2.webp";
import blog3 from "@/assets/blog-3.webp";

const blogs = [
  { 
    tag: "Food Culture", 
    title: "Why Food Halls Are the Future of Urban Dining", 
    date: "Mar 15, 2026", 
    image: blog1,
    description: "Discover how food halls are transforming the way we experience dining in cities worldwide.",
    readTime: "5 min read"
  },
  { 
    tag: "Events", 
    title: "Top 5 Events You Can't Miss This Spring", 
    date: "Mar 10, 2026", 
    image: blog2,
    description: "From food festivals to live music, here's what's happening at Food Hall this season.",
    readTime: "3 min read"
  },
  { 
    tag: "Chef Spotlight", 
    title: "Meet Chef Maria: From Street Food to Stardom", 
    date: "Mar 5, 2026", 
    image: blog3,
    description: "The inspiring journey of how Chef Maria built her culinary empire from humble beginnings.",
    readTime: "4 min read"
  },
];

const Blogs = () => {
  const ref = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            const cards = document.querySelectorAll(".blog-card");
            
            gsap.fromTo(cards,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.2,
                ease: "power3.out",
                onComplete: () => {
                  animatedRef.current = true;
                },
              }
            );
            
            observer.unobserve(entry.target);
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
      const cards = document.querySelectorAll(".blog-card");
      cards.forEach((card) => {
        const image = card.querySelector("img");
        
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
            duration: 0.3,
            ease: "power2.out",
          });
          if (image) {
            gsap.to(image, {
              scale: 1.05,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        });
        
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
          if (image) {
            gsap.to(image, {
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        });
      });
    };

    setTimeout(addHoverEffects, 100);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section id="blog" ref={ref} className="py-20 md:py-28 px-4 md:px-8" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container mx-auto max-w-7xl">
        
        {/* Label */}
        <p className="text-sm font-semibold mb-2 uppercase tracking-widest text-center text-secondary">
          Blog
        </p>
        


  



       
        {/* Title */}
        <h2 className="section-title text-center text-4xl md:text-5xl font-bold mb-6" style={{ color: '#0f172a' }}>
          Stories & <span style={{ background: 'linear-gradient(135deg, #1e293b, #14b8a6, #0ea5e9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Bites</span>
        </h2>
        
        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogs.map((b, i) => (
            <div 
              key={i} 
              className="blog-card bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              {/* Image Section */}
              <div className="overflow-hidden h-56 relative">
                <img 
                  src={b.image} 
                  alt={b.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#1e293b' }}>
                    {b.tag}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: '#64748b' }}>{b.date}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs" style={{ color: '#64748b' }}>{b.readTime}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 transition-colors group-hover:text-teal-600 line-clamp-2" style={{ color: '#0f172a' }}>
                  {b.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {b.description}
                </p>
                
              
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Blogs;