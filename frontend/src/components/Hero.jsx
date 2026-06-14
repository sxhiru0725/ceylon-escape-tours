import { motion } from "framer-motion";
import { Plane, Compass, MapPin, ArrowDown, Sparkles } from "lucide-react";

export default function Hero() {
  const handleScrollTo = (id) => {
    const target = document.querySelector(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-navy-bg"
    >
      {/* Decorative Radial Background Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-ocean/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-tropical/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-sunset/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Floating Travel Elements - Rendered via Lucide + CSS animations */}
      <div className="absolute top-1/4 left-10 md:left-24 text-white/10 animate-float pointer-events-none hidden md:block">
        <Compass size={60} className="stroke-[1] rotate-12" />
      </div>
      
      <div className="absolute top-1/3 right-1/4 text-white/10 animate-float-reverse pointer-events-none hidden lg:block">
        <div className="flex items-center gap-2 border border-white/5 bg-white/2 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-sand">
          <MapPin size={12} className="text-sunset" />
          <span>Ella Gap, Sri Lanka</span>
        </div>
      </div>

      <div className="absolute bottom-1/4 left-1/5 text-white/5 animate-float pointer-events-none hidden lg:block">
        {/* Palm Leaf / Cloud representation */}
        <div className="w-16 h-8 rounded-full bg-white/10 blur-[1px]" />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12">
        
        {/* Left Side: Bold Digital Agency Content */}
        <div className="lg:col-span-7 flex flex-col text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 self-start bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 text-gold text-xs font-bold tracking-widest uppercase mb-6"
          >
            <Sparkles size={12} />
            Ceylon Escape Tours
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6"
          >
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean via-tropical to-gold">Sri Lanka</span> Like Never Before
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-white/80 max-w-xl mb-8 leading-relaxed font-light"
          >
            Explore golden beaches, misty mountains, scenic train rides, waterfalls, and unforgettable island adventures with our handpicked Sri Lanka tour packages.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => handleScrollTo("#packages")}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-ocean to-tropical text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-ocean/30 cursor-pointer animate-pulse-glow"
            >
              Explore Packages
            </button>
            
            <button
              onClick={() => handleScrollTo("#contact")}
              className="px-8 py-4 rounded-full border border-white/10 hover:border-gold bg-white/5 hover:bg-gold/10 text-white hover:text-gold font-bold text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-md"
            >
              Plan My Trip
            </button>
          </motion.div>
        </div>

        {/* Right Side: Visual Image Grid Layout with Float animations */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[420px] aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl animate-float"
          >
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent z-10 opacity-70" />
            
            {/* The Main High Quality Hero Image */}
            <img 
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80" 
              alt="Beautiful Sri Lanka beach with palms" 
              className="w-full h-full object-cover select-none scale-105 hover:scale-110 transition-transform duration-700"
            />

            {/* Float Card 1: Experience badge */}
            <div className="absolute bottom-6 left-6 right-6 z-20 glass-card p-4 rounded-2xl flex items-center gap-3">
              <div className="bg-sunset p-2.5 rounded-xl text-white">
                <Plane size={18} className="animate-float-fast" />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/60 font-semibold uppercase tracking-wider">Tropical Escapes</p>
                <h3 className="text-sm font-bold text-white">Down South to Ella Mountains</h3>
              </div>
            </div>
          </motion.div>

          {/* Additional Floating Cards for layout depth */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute top-1/4 -right-6 z-20 glass-card px-4 py-2.5 rounded-xl border border-white/10 flex items-center gap-2 animate-float-reverse shadow-xl"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-tropical" />
            <span className="text-xs font-bold text-white tracking-wide">9 Arch Bridge Scenic Walk</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute bottom-1/4 -left-6 z-20 bg-gradient-to-br from-gold to-sunset px-4 py-2.5 rounded-xl border border-white/10 flex items-center gap-2 animate-float shadow-xl text-navy-dark"
          >
            <Sparkles size={14} className="stroke-[2.5]" />
            <span className="text-xs font-black tracking-wide uppercase">LKR 38,000+ Deals</span>
          </motion.div>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        onClick={() => handleScrollTo("#intro")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-2 text-white/40 hover:text-white transition-colors"
      >
        <span className="text-[10px] tracking-widest uppercase font-bold">Scroll Down</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
}
