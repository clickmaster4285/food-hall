import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const blogs = [
  { tag: "Food Culture", title: "Why Food Halls Are the Future of Urban Dining", date: "Mar 15, 2026", color: "bg-primary" },
  { tag: "Events", title: "Top 5 Events You Can't Miss This Spring", date: "Mar 10, 2026", color: "bg-secondary" },
  { tag: "Chef Spotlight", title: "Meet Chef Maria: From Street Food to Stardom", date: "Mar 5, 2026", color: "bg-fire" },
];

const Blogs = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="blog" ref={ref} className="section-padding bg-muted">
      <div className="container mx-auto">
        <p className="font-body text-primary font-semibold mb-2 uppercase tracking-widest text-sm text-center">Blog</p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground text-center mb-12">
          Stories & <span className="text-gradient-fire">Bites</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {blogs.map((b, i) => (
            <div key={i} className="blog-card bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-shadow cursor-pointer group">
              <div className={`${b.color} h-40 flex items-center justify-center`}>
                <span className="text-6xl opacity-30">📰</span>
              </div>
              <div className="p-6">
                <span className="font-body text-xs text-primary font-semibold uppercase tracking-wider">{b.tag}</span>
                <h3 className="font-display text-lg text-foreground mt-2 mb-2 group-hover:text-primary transition-colors">{b.title}</h3>
                <p className="font-body text-muted-foreground text-sm">{b.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
