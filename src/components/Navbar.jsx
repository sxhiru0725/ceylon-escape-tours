import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Compass, Phone } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Packages", href: "#packages" },
  { name: "Destinations", href: "#destinations" },
  { name: "Experience", href: "#experience" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active link detection — only on homepage
      if (!isHome) return;
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.querySelector(link.href);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.href.slice(1));
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (isHome) {
      // On homepage — smooth scroll to section
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth"
        });
        setActiveSection(href.slice(1));
      }
    } else {
      // On another page — navigate to homepage with hash
      navigate("/" + href);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? "glass-nav py-4 shadow-lg shadow-navy-dark/40" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="bg-gradient-to-tr from-ocean to-tropical p-2 rounded-lg text-white group-hover:rotate-12 transition-transform duration-300">
              <Compass size={24} className="stroke-[2]" />
            </div>
            <span className="font-display font-black text-xl tracking-wider text-white uppercase">
              Ceylon <span className="text-gold">Escape</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = isHome && activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative font-medium text-sm tracking-wide uppercase transition-colors duration-300 py-1 ${
                    isActive ? "text-gold" : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold to-sunset"
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Contact Button */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/30 hover:border-gold bg-gold/10 text-gold hover:text-white hover:bg-gold transition-all duration-300 font-semibold text-xs tracking-wider uppercase shadow-md hover:shadow-gold/25"
            >
              <Phone size={14} />
              Enquire Now
            </a>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white/90 hover:text-white focus:outline-none p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 lg:hidden bg-navy-dark/95 backdrop-blur-xl flex items-center justify-center"
          >
            {/* Background Decorative Rings */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-ocean/15 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-sunset/10 rounded-full blur-3xl" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="w-full max-w-sm px-6 text-center relative z-10"
            >
              <div className="flex flex-col gap-6 items-center">
                {navLinks.map((link, idx) => {
                  const isActive = isHome && activeSection === link.href.slice(1);
                  return (
                    <motion.a
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`text-2xl font-display font-bold uppercase tracking-wider py-2 transition-colors ${
                        isActive ? "text-gold glow-text-gold" : "text-white/80 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </motion.a>
                  );
                })}

                <motion.a
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, "#contact")}
                  className="mt-6 flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-ocean to-tropical text-white font-bold text-sm tracking-widest uppercase hover:brightness-110 transition-all duration-300 shadow-lg"
                >
                  <Phone size={16} />
                  Plan My Trip
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
