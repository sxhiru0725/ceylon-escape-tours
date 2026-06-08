import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass, Mail, Phone, MapPin, Send } from "lucide-react";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    )
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    )
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/94771234567",
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    )
  }
];

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && /\S+@\S+\.\S+/.test(email)) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const navigate = useNavigate();

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    } else {
      // If section not found (we're on a detail page), navigate home
      navigate("/" + id);
    }
  };

  return (
    <footer className="relative bg-navy-dark border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-ocean/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-80 h-80 bg-tropical/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 text-left">
          
          {/* Brand Info (Col span 4) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link 
              to="/"
              className="flex items-center gap-2 mb-6 group cursor-pointer"
            >
              <div className="bg-gradient-to-tr from-ocean to-tropical p-2 rounded-lg text-white group-hover:rotate-12 transition-transform duration-300">
                <Compass size={22} className="stroke-[2]" />
              </div>
              <span className="font-display font-black text-xl tracking-wider text-white uppercase">
                Ceylon <span className="text-gold">Escape</span>
              </span>
            </Link>
            
            <p className="text-white/60 text-sm font-light leading-relaxed mb-6 max-w-sm">
              Beautiful Sri Lankan journeys, planned with care. Explore the tropical coasts and misty hills of our magical island.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.name}`}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-gold hover:text-gold text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>


          {/* Quick Links Column (Col span 2) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-l-2 border-gold pl-2.5">
              Quick Links
            </h3>
            <ul className="space-y-3.5">
              {[
                { name: "Home", href: "#home" },
                { name: "Packages", href: "#packages" },
                { name: "Destinations", href: "#destinations" },
                { name: "Experience", href: "#experience" },
                { name: "Gallery", href: "#gallery" },
                { name: "Contact", href: "#contact" }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-white/60 hover:text-gold text-sm transition-colors duration-300 font-light"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages Links Column (Col span 2) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-l-2 border-tropical pl-2.5">
              Tour Packages
            </h3>
            <ul className="space-y-3.5">
              {[
                { name: "Down South Escape", to: "/packages/down-south" },
                { name: "Ella Mountain Getaway", to: "/packages/ella-getaway" },
                { name: "Beach to Mountain Combo", to: "/packages/combo-package" },
                { name: "Custom Sri Lanka Tour", to: "/packages/custom-tour" }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-gold text-sm transition-colors duration-300 font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Newsletter Column (Col span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            {/* Contact Details */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-l-2 border-sunset pl-2.5">
                Contact Us
              </h3>
              <ul className="space-y-3.5 text-sm text-white/60 font-light">
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-gold shrink-0" />
                  <a href="mailto:hello@ceylonescapetours.com" className="hover:text-white transition-colors">
                    hello@ceylonescapetours.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-gold shrink-0" />
                  <a href="tel:+94771234567" className="hover:text-white transition-colors">
                    +94 77 123 4567
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="text-gold shrink-0" />
                  <span>Colombo, Sri Lanka</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
                Newsletter
              </h4>
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pr-12 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                  required
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-2 p-2 bg-gradient-to-tr from-ocean to-tropical text-white rounded-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  <Send size={12} />
                </button>
              </form>
              {subscribed && (
                <p className="text-[10px] text-tropical font-bold mt-2 animate-pulse-glow">
                  Subscribed successfully!
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 font-light">
            &copy; {new Date().getFullYear()} Ceylon Escape Tours. All rights reserved.
          </p>
          <div className="flex gap-4 text-[10px] uppercase tracking-wider font-bold text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
