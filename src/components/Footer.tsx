const Footer = () => (
  <footer className="bg-foreground py-12 px-4">
    <div className="container mx-auto max-w-5xl">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="font-display text-xl text-primary-foreground mb-4">🔥 FoodHall</h3>
          <p className="font-body text-primary-foreground/50 text-sm">Come for food, stay for the experience. Your neighborhood's favorite gathering place.</p>
        </div>
        <div>
          <h4 className="font-display text-sm text-primary-foreground mb-3">Quick Links</h4>
          {["About", "Features", "Vendors", "Blog"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="block font-body text-primary-foreground/50 text-sm hover:text-primary transition-colors mb-1">{l}</a>
          ))}
        </div>
        <div>
          <h4 className="font-display text-sm text-primary-foreground mb-3">Connect</h4>
          {["Instagram", "TikTok", "Facebook", "Twitter"].map((s) => (
            <a key={s} href="#" className="block font-body text-primary-foreground/50 text-sm hover:text-primary transition-colors mb-1">{s}</a>
          ))}
        </div>
        <div>
          <h4 className="font-display text-sm text-primary-foreground mb-3">Hours</h4>
          <p className="font-body text-primary-foreground/50 text-sm">Mon–Thu: 11AM – 10PM</p>
          <p className="font-body text-primary-foreground/50 text-sm">Fri–Sat: 11AM – 12AM</p>
          <p className="font-body text-primary-foreground/50 text-sm">Sunday: 10AM – 9PM</p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 pt-6 text-center">
        <p className="font-body text-primary-foreground/30 text-sm">© 2026 FoodHall. All rights reserved. Made with 🔥</p>
      </div>
    </div>
  </footer>
);

export default Footer;
