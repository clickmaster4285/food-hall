import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-el", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={ref} className="section-padding bg-background">
      <div className="container mx-auto max-w-4xl">
        <p className="contact-el font-body text-primary font-semibold mb-2 uppercase tracking-widest text-sm text-center">Get In Touch</p>
        <h2 className="contact-el font-display text-4xl md:text-5xl text-foreground text-center mb-12">
          Let's Make It <span className="text-gradient-fire">Happen</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="contact-el space-y-6">
            <div>
              <h3 className="font-display text-xl text-foreground mb-2">📍 Visit Us</h3>
              <p className="font-body text-muted-foreground">123 Flavor Street, Downtown District<br />Open Daily: 11AM – 11PM</p>
            </div>
            <div>
              <h3 className="font-display text-xl text-foreground mb-2">📞 Call Us</h3>
              <p className="font-body text-muted-foreground">(555) 123-FOOD</p>
            </div>
            <div>
              <h3 className="font-display text-xl text-foreground mb-2">📧 Email</h3>
              <p className="font-body text-muted-foreground">hello@foodhall.com</p>
            </div>
          </div>

          <form className="contact-el space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-muted border border-border rounded-xl px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-muted border border-border rounded-xl px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select className="w-full bg-muted border border-border rounded-xl px-4 py-3 font-body text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Event Booking</option>
              <option>Vendor Inquiry</option>
              <option>General Question</option>
              <option>Partnership</option>
            </select>
            <textarea
              placeholder="Tell us more..."
              rows={4}
              className="w-full bg-muted border border-border rounded-xl px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <button
              type="submit"
              className="w-full bg-gradient-fire text-primary-foreground font-body font-bold py-4 rounded-xl text-lg hover:opacity-90 transition-opacity"
            >
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
