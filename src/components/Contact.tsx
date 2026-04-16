import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Send, Mail, Phone, MapPin, Clock, Navigation, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const LOCATION = {
  fullAddress:
    "Paris Shopping Mall, 4th floor, Main PWD Rd, PWD Housing Society Sector A, Islamabad, Punjab 45700, Pakistan",
};

const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  LOCATION.fullAddress
)}&output=embed`;

const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const animatedRef = useRef(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Valid email is required";
    }
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            const elements = document.querySelectorAll(".contact-el");
            
            gsap.fromTo(elements,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
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

    // Add hover animations
    const addHoverEffects = () => {
      const cards = document.querySelectorAll(".contact-card");
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);

    if (btnRef.current) {
      gsap.fromTo(btnRef.current, 
        { scale: 1 }, 
        { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1 }
      );
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          phone: form.phone,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
        setErrors({});
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send. Please try again or email marketing@clickmasters.pk");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-background border rounded-xl px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
      errors[field] ? "border-destructive" : "border-border"
    }`;

  return (
    <section id="contact" ref={ref} className="py-20 md:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="contact-el font-body text-secondary font-semibold mb-2 uppercase tracking-widest text-sm">
            Get In Touch
          </p>

          <h2 className="section-title text-center text-4xl md:text-5xl font-bold mb-6" style={{ color: '#0f172a' }}>
            Let's Make It <span style={{ background: 'linear-gradient(135deg, #1e293b, #14b8a6, #0ea5e9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}> Happen</span>
          </h2>
          <p className="contact-el text-muted-foreground mt-4 max-w-2xl mx-auto">
            Ready to transform your food hall experience? Drop us a message and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left side - Contact Info */}
          <div className="space-y-6">
            <div className="contact-el contact-card bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-2">Visit Us</h3>
                  <p className="font-body text-muted-foreground">{LOCATION.fullAddress}</p>
                </div>
              </div>
            </div>

            <div className="contact-el contact-card bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-2">Call Us</h3>
                  <p className="font-body text-muted-foreground">+92 333-1116842</p>
                  <p className="font-body text-muted-foreground">+92 332-5394285</p>
                </div>
              </div>
            </div>

            <div className="contact-el contact-card bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-2">Email</h3>
                  <p className="font-body text-muted-foreground">marketing@clickmasters.pk</p>
                  <p className="font-body text-muted-foreground">info@clickmasters.pk</p>
                </div>
              </div>
            </div>

            <div className="contact-el contact-card bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-2">Business Hours</h3>
                  <p className="font-body text-muted-foreground">Monday - Saturday: 9AM - 6PM</p>
                  <p className="font-body text-muted-foreground">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="contact-el rounded-2xl overflow-hidden border border-border">
              <iframe
                src={MAP_EMBED_URL}
                width="100%"
                height="200"
                style={{ border: 0 }}
                loading="lazy"
                title="Location"
                className="w-full h-full"
              />
            </div>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                LOCATION.fullAddress
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-el inline-flex items-center gap-2 text-secondary text-sm hover:underline"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>
          </div>

          {/* Right side - Form */}
          <div className="contact-el">
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-xl border border-border space-y-5">
              <div className="flex gap-2 items-center mb-4 pb-3 border-b border-border">
                <MessageSquare className="w-5 h-5 text-secondary" />
                <h3 className="font-display font-semibold text-foreground text-lg">Send us a message</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  className={inputClass("name")}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  className={inputClass("email")}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number <span className="text-muted-foreground text-xs">(Optional)</span>
                </label>
                <input
                  type="tel"
                  className={inputClass("phone")}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+92 XXX XXXXXXX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Message <span className="text-primary">*</span>
                </label>
                <textarea
                  className={`${inputClass("message")} resize-none`}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your food hall..."
                  rows={4}
                />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
              </div>
              
              <button
                ref={btnRef}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary text-primary font-body font-bold py-4 rounded-xl text-lg hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Sending Message..." : "Send Message"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;