'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Camera, 
  Menu, 
  X, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Wrench, 
  ShieldCheck, 
  Truck, 
  Layout, 
  CheckCheck, 
  Loader2, 
  ImageOff,
  Users,
  Instagram,
  Check
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: glassmorphic
// Divider Style: D-RULE
// Typography Personality: mono-accent

const brief = {
  "brand": {
    "name": "Camera Store and More",
    "tagline": "Capturing Reality Through Precision Optics",
    "description": "Lagos' premier destination for professional digital cameras, studio lighting, drones, and filmmaking essentials.",
    "industry": "tech",
    "region": "nigeria"
  },
  "contact": {
    "whatsapp": "+2348000000000",
    "instagram": "camerastoreandmore",
    "email": "hello@camerastoreandmore.com",
    "address": "60 Aroloya street off idumagbo AVENUE, Lagos"
  },
  "heroImage": {
    "url": "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?q=80&w=1080"
  }
};

const products = [
  {
    "name": "Sony Alpha A7 IV",
    "description": "Full-frame mirrorless interchangeable lens camera with advanced autofocus.",
    "price": "₦1,850,000",
    "image": "https://images.unsplash.com/photo-1774647665776-7ce17ad3d4d1?q=80&w=1080"
  },
  {
    "name": "DJI Mini 3 Pro",
    "description": "Ultralight foldable drone with 4K HDR video capabilities.",
    "price": "₦750,000",
    "image": "https://images.unsplash.com/photo-1631052941794-2a6e26d4ac17?q=80&w=1080"
  },
  {
    "name": "Godox SL60W Video Light",
    "description": "Continuous LED light source for professional studio cinematography.",
    "price": "₦120,000",
    "image": "https://images.unsplash.com/photo-1647427854253-b92bb40c9330?q=80&w=1080"
  },
  {
    "name": "Professional Backdrop Kit",
    "description": "Heavy-duty stand with premium seamless black cotton backdrop.",
    "price": "₦45,000",
    "image": "https://images.unsplash.com/photo-1603425013520-e0b30e6e37dc?q=80&w=1080"
  }
];

const features = [
  { title: "Technical Support", description: "Expert guidance on setting up your filmmaking or photography rig.", icon: Wrench },
  { title: "Authenticity Guaranteed", description: "100% genuine equipment sourced directly from official manufacturers.", icon: ShieldCheck },
  { title: "Fast Island Delivery", description: "Swift and secure delivery across Lagos and nationwide shipping.", icon: Truck },
  { title: "Studio Consulting", description: "Custom lighting and acoustics planning for your creative space.", icon: Layout }
];

const testimonials = [
  { name: "Tunde Ajayi", text: "The only place in Lagos I trust for my lighting rigs. Their Godox stock is unmatched.", role: "Director of Photography" },
  { name: "Sarah Boateng", text: "Fast delivery and the camera was in perfect condition. Their technical support is life-saving.", role: "Content Creator" },
  { name: "Emeka Okoro", text: "Best prices for backdrops and studio accessories. A one-stop shop for every photographer.", role: "Studio Owner" }
];

const gallery = [
  "https://images.unsplash.com/photo-1635444282667-029d62d679f4?q=80&w=1080",
  "https://images.unsplash.com/photo-1639413665566-2f75adf7b7ca?q=80&w=1080",
  "https://images.unsplash.com/photo-1619045281496-3259c834539c?q=80&w=1080",
  "https://images.unsplash.com/photo-1517179465283-0221aea1d382?q=80&w=1080"
];

// --- Hooks ---

const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

const useTypewriter = (text: string, speed = 55) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplay(prev => prev + text.charAt(i)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-200 ${className}`}>
        <ImageOff size={24} className="text-zinc-400" />
      </div>
    );
  }
  return (
    <Image 
      src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} 
    />
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/90 backdrop-blur-xl border-b border-accent/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-accent flex items-center justify-center text-primary font-bold text-xl rounded-sm">C</div>
          <span className="font-heading font-bold text-xl tracking-tighter uppercase hidden sm:block">Camera Store</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {['Equipment', 'About', 'Contact'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium uppercase tracking-widest hover:text-accent/60 transition-colors">
              {link}
            </a>
          ))}
          <a href="#contact" className="bg-accent text-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform rounded-sm">
            Explore Gear
          </a>
        </div>

        <button className="md:hidden text-accent" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-primary z-[60] transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center">
          <span className="font-heading font-black text-xl uppercase italic">CS&M</span>
          <button onClick={() => setIsOpen(false)}><X size={32} /></button>
        </div>
        <div className="flex flex-col items-center justify-center h-[70vh] gap-8">
          {['Equipment', 'About', 'Contact'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-4xl font-heading font-bold uppercase tracking-tighter">
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const typedHeadline = useTypewriter("The Filmmaker's Arsenal.", 60);
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="hero" ref={ref} className="min-h-screen flex flex-col justify-center bg-primary px-6 overflow-hidden relative pt-20">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <p className="font-mono text-accent/60 text-xs tracking-[0.4em] uppercase mb-8 animate-fadeIn">
          Lagos, Nigeria — Est. 2018
        </p>
        <h1 className="font-heading text-[12vw] md:text-[8vw] font-bold text-accent leading-[0.85] tracking-tighter uppercase italic">
          {typedHeadline}<span className="inline-block w-[0.1em] h-[0.8em] bg-accent ml-1 animate-pulse" />
        </h1>
        
        <div className={`mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-10 border-t border-accent/10 pt-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-md">
            <p className="text-accent/70 text-lg md:text-xl leading-relaxed">
              {brief.brand.description} Curated for cinematic excellence in the heart of West Africa.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a href="#products" className="bg-accent text-primary px-10 py-5 font-bold text-sm uppercase tracking-widest hover:bg-accent/90 transition-all text-center">
              Explore Inventory
            </a>
            <div className="hidden lg:flex items-center gap-4 ml-6">
              <div className="flex -space-x-3">
                {[1,2,3].map(n => (
                  <div key={n} className="w-10 h-10 rounded-full border-2 border-primary bg-accent/10 flex items-center justify-center text-[10px] font-bold">
                    {n === 3 ? '14k+' : ''}
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-mono uppercase tracking-tighter leading-none">
                Trusted by Lagos&apos; <br/> Top Cinematographers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={`absolute bottom-0 right-0 w-full md:w-1/2 h-[40vh] md:h-[60vh] -z-10 transition-all duration-1000 delay-500 overflow-hidden ${isVisible ? 'opacity-10 opacity-30 md:opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <SafeImage src={brief.heroImage.url} alt="Cinematic lens" fill className="object-cover grayscale" />
      </div>
    </section>
  );
};

const Features = () => {
  const { ref, isVisible } = useScrollReveal();
  const icons = [Wrench, ShieldCheck, Truck, Layout];

  return (
    <section id="features" ref={ref} className="py-28 px-6 bg-secondary/30 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-accent tracking-tighter uppercase italic">Why Professionals <br/> Choose Us</h2>
          </div>
          <p className="text-accent/50 font-mono text-sm tracking-widest max-w-xs md:text-right">
            Beyond hardware, we provide the tools for your creative evolution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-accent/5 border border-accent/5">
          {features.map((f, i) => {
            const IconComp = icons[i] || Wrench;
            return (
              <div key={i} className={`p-10 bg-primary group hover:bg-accent transition-all duration-500 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 rounded-full border border-accent/10 flex items-center justify-center mb-8 group-hover:border-primary/20 group-hover:bg-primary/10">
                  <IconComp size={20} className="text-accent group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-accent group-hover:text-primary mb-4 transition-colors">{f.title}</h3>
                <p className="text-accent/60 text-sm leading-relaxed group-hover:text-primary/70 transition-colors">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="equipment" ref={ref} className="py-28 px-6 bg-primary overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-32">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs tracking-[0.5em] uppercase text-accent/40 mb-4 block">Selected Inventory</span>
          <h2 className="font-heading text-5xl font-bold tracking-tighter uppercase italic">Featured Gear</h2>
        </div>

        {products.map((p, i) => (
          <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: `${i * 150}ms` }}>
            <div className="w-full md:w-1/2 relative group">
              <div className="aspect-[4/5] relative overflow-hidden bg-secondary">
                <SafeImage src={p.image} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
              </div>
              <div className={`absolute -bottom-6 ${i % 2 === 0 ? '-right-6' : '-left-6'} w-1/2 h-1/2 border border-accent/10 -z-10 group-hover:border-accent/40 transition-colors`} />
            </div>
            
            <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
              <div className={`flex flex-col ${i % 2 === 0 ? 'items-start' : 'md:items-end'}`}>
                <span className="font-mono text-accent/30 text-4xl font-bold tracking-tighter mb-4">
                  0{i + 1}
                </span>
                <h3 className="font-heading text-4xl md:text-5xl font-bold text-accent leading-none uppercase tracking-tighter mb-6">{p.name}</h3>
                <p className="text-accent/60 text-lg leading-relaxed mb-8 max-w-md">{p.description}</p>
                <div className="flex items-center gap-6">
                  <span className="text-2xl font-bold tracking-tighter">{p.price}</span>
                  <a href="#contact" className="bg-accent text-primary px-8 py-3 font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                    Enquire
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const About = () => {
  const { ref, isVisible } = useScrollReveal();
  const stats = [
    { number: "14k+", label: "Community Followers", icon: Users },
    { number: "3.9k", label: "Inventory Items", icon: Camera },
    { number: "100%", label: "Genuine Products", icon: Check }
  ];

  return (
    <section id="about" ref={ref} className="py-28 px-6 bg-accent text-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-primary/20 h-full" />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.5fr] gap-20 items-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <h2 className="font-heading text-5xl md:text-7xl font-bold uppercase italic tracking-tighter leading-[0.9]">Legacy in Every Frame</h2>
          <p className="mt-10 font-mono text-primary/40 text-xs tracking-[0.4em] uppercase">Sharp delivery across Naija</p>
        </div>
        
        <div className={`space-y-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <p className="text-xl md:text-2xl leading-relaxed text-primary/80 font-light">
            Located in the heart of Lagos, Camera Store and More has been the silent partner behind Nigeria&apos;s most iconic visual content. We bridge the gap between vision and reality with world-class gear.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 pt-12 border-t border-primary/10">
            {stats.map((s, i) => {
              const StatIcon = s.icon;
              return (
                <div key={i}>
                  <div className="flex items-center gap-3 mb-2">
                    <StatIcon size={16} className="text-primary/40" />
                    <p className="font-heading text-4xl font-bold tracking-tighter">{s.number}</p>
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary/40">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-28 px-6 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-heading text-4xl font-bold tracking-tighter uppercase italic">The Studio Setup</h2>
          <div className="w-1/3 h-px bg-accent/10 mb-2" />
        </div>
        <div ref={ref} className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
          {gallery.map((src, i) => (
            <div key={i} className={`break-inside-avoid relative group overflow-hidden bg-secondary transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <SafeImage src={src} alt={`Gallery ${i}`} className="w-full h-auto object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-28 bg-secondary/50 overflow-hidden border-y border-accent/5">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="font-heading text-5xl font-bold tracking-tighter uppercase italic">Voice of the Creators</h2>
      </div>
      <div className="w-full overflow-hidden">
        <div className="flex w-[200%] gap-8 animate-slide-left hover:[animation-play-state:paused] py-4">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="w-80 md:w-[450px] shrink-0 bg-primary p-12 border border-accent/5 transition-all duration-500 hover:border-accent/20">
              <div className="flex gap-1 mb-8">
                {[1,2,3,4,5].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-accent" />)}
              </div>
              <p className="text-accent/80 text-xl leading-relaxed italic mb-10">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-4 border-t border-accent/5 pt-8">
                <div className="w-12 h-12 bg-accent text-primary font-bold flex items-center justify-center rounded-sm text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-accent uppercase tracking-tight">{t.name}</p>
                  <p className="text-accent/40 text-[10px] font-mono uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { ref, isVisible } = useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="py-28 px-6 bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-20 items-center">
        <div className={`bg-primary/40 backdrop-blur-3xl p-8 md:p-12 border border-accent/10 shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          {sent ? (
            <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn">
              <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-8">
                <CheckCheck size={32} className="text-primary" />
              </div>
              <h3 className="font-heading text-3xl font-bold uppercase tracking-tight mb-4">Message Logged</h3>
              <p className="text-accent/60 max-w-sm">We&apos;ll be in touch with your quote shortly. Welcome to the elite roster.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="font-heading text-3xl font-bold uppercase tracking-tight mb-8">Secure Your Order</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(['name', 'email', 'phone']).map(field => (
                  <input
                    key={field}
                    type={field === 'email' ? 'email' : 'text'}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={(form as any)[field]}
                    onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                    required={field !== 'phone'}
                    className="w-full bg-accent/5 border border-accent/10 px-5 py-4 text-accent placeholder-accent/30 text-sm outline-none transition-all focus:border-accent focus:bg-transparent"
                  />
                ))}
              </div>
              <textarea 
                rows={4} 
                placeholder="Equipment list or inquiry details"
                value={form.message}
                onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                required
                className="w-full bg-accent/5 border border-accent/10 px-5 py-4 text-accent placeholder-accent/30 text-sm outline-none transition-all focus:border-accent focus:bg-transparent"
              />
              <button type="submit" disabled={loading} className="w-full bg-accent text-primary py-5 font-bold uppercase tracking-[0.2em] hover:bg-accent/90 transition-all flex justify-center items-center gap-3">
                {loading ? <Loader2 className="animate-spin" /> : <>Send Inquiry <ArrowRight size={18} /></>}
              </button>
            </form>
          )}
        </div>

        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <h2 className="font-heading text-6xl md:text-8xl font-bold text-accent mb-10 leading-[0.8] tracking-tighter uppercase italic">Visit Our Showroom</h2>
          <div className="space-y-8 font-mono text-sm tracking-widest uppercase">
            <div className="flex gap-4">
              <MapPin size={18} className="shrink-0 text-accent/40" />
              <p>{brief.contact.address}</p>
            </div>
            <div className="flex gap-4">
              <Phone size={18} className="shrink-0 text-accent/40" />
              <p>{brief.contact.whatsapp}</p>
            </div>
            <div className="flex gap-4">
              <Mail size={18} className="shrink-0 text-accent/40" />
              <p>{brief.contact.email}</p>
            </div>
            <div className="flex gap-4">
              <Instagram size={18} className="shrink-0 text-accent/40" />
              <p>@{brief.contact.instagram}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 bg-primary border-t border-accent/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent flex items-center justify-center text-primary font-bold text-xl rounded-sm">C</div>
              <span className="font-heading font-black text-2xl tracking-tighter uppercase">CS&M</span>
            </div>
            <p className="text-accent/50 text-sm max-w-xs leading-relaxed uppercase tracking-tighter">
              Lagos&apos; premier destination for professional cinematography and photography gear since 2018.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent/30">Shop</p>
              <ul className="space-y-2 text-sm uppercase tracking-tighter font-bold">
                <li><a href="#" className="hover:text-accent/60">Cameras</a></li>
                <li><a href="#" className="hover:text-accent/60">Lenses</a></li>
                <li><a href="#" className="hover:text-accent/60">Studio</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent/30">Support</p>
              <ul className="space-y-2 text-sm uppercase tracking-tighter font-bold">
                <li><a href="#" className="hover:text-accent/60">Shipping</a></li>
                <li><a href="#" className="hover:text-accent/60">Repairs</a></li>
                <li><a href="#" className="hover:text-accent/60">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent/30">Newsletter</p>
            <div className="flex gap-px border border-accent/10">
              <input type="text" placeholder="Email" className="bg-transparent px-4 py-3 text-xs outline-none flex-1 font-mono uppercase tracking-widest" />
              <button className="bg-accent text-primary px-4 hover:bg-accent/90"><ArrowRight size={16} /></button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-accent/5 font-mono text-[10px] uppercase tracking-[0.3em] text-accent/30">
          <p>© {new Date().getFullYear()} Camera Store and More. Lagos, Nigeria.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <span className="text-accent/30 font-mono text-[10px] tracking-[0.5em] uppercase whitespace-nowrap">
          The Optics Authority
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>
      <Features />
      <Products />
      <About />
      <GallerySection />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}