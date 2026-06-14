import { motion } from "framer-motion";
import { Sparkles, MapPin } from "lucide-react";

export default function ComboOffer({ onSelectPackage }) {
  return (
    <section 
      id="experience" 
      className="relative py-24 md:py-32 overflow-hidden bg-navy-dark"
    >
      {/* Decorative Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-ocean/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-10 right-1/4 w-96 h-96 bg-sunset/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Banner Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full rounded-[36px] overflow-hidden border border-white/10 bg-gradient-to-br from-navy-light/80 via-navy-dark/95 to-navy-light/60 p-8 md:p-16 lg:p-20 shadow-2xl"
        >
          {/* Background Images Blended (Absolute placement behind text) */}
          <div className="absolute inset-0 w-full h-full flex opacity-20 pointer-events-none">
            <div className="w-1/2 h-full relative">
              <img 
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80" 
                alt="Southern beach blend"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-transparent to-transparent" />
            </div>
            <div className="w-1/2 h-full relative">
              <img 
                src="https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=600&q=80" 
                alt="Ella mountain blend"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-navy-dark via-transparent to-transparent" />
            </div>
          </div>
          
          {/* Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left side text */}
            <div className="lg:col-span-7 text-left flex flex-col">
              {/* Promo Offer Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 self-start bg-sunset/10 border border-sunset/30 rounded-full px-4.5 py-2 text-sunset text-xs font-black tracking-widest uppercase mb-6"
              >
                <Sparkles size={12} className="stroke-[3]" />
                Save up to 15% on combo tours
              </motion.div>

              {/* Headline */}
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                Beach to Mountain <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset to-gold">Combo Package</span>
              </h2>

              {/* Subtext */}
              <p className="text-white/80 text-base md:text-lg font-light leading-relaxed mb-8 max-w-xl">
                Enjoy the best of both worlds. Start with the golden beaches of Down South (Galle, Mirissa, Unawatuna) and continue into the misty tea mountains of Ella.
              </p>

              {/* Booking Trigger Button */}
              <button
                onClick={() => onSelectPackage("combo-package")}
                className="px-8 py-4.5 rounded-full bg-gradient-to-r from-sunset to-gold text-navy-dark font-black text-sm tracking-widest uppercase shadow-lg hover:shadow-sunset/20 transition-all duration-300 self-start cursor-pointer hover:scale-105 animate-pulse-glow"
              >
                Book Combo Package
              </button>
            </div>

            {/* Right side route visualization */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[200px]">
              
              {/* Route Map Graphic */}
              <div className="w-full max-w-[320px] aspect-square relative border border-white/5 bg-navy-dark/40 rounded-3xl p-6 backdrop-blur-md">
                
                {/* SVG Route Line */}
                <svg className="absolute inset-0 w-full h-full p-8" viewBox="0 0 200 200" fill="none">
                  {/* Base Route Dashed Line */}
                  <path 
                    d="M 30,170 C 60,150 140,150 170,30" 
                    stroke="rgba(255,255,255,0.15)" 
                    strokeWidth="3" 
                    strokeDasharray="6 6" 
                  />

                  {/* Animated Overlay Route Line */}
                  <motion.path 
                    d="M 30,170 C 60,150 140,150 170,30" 
                    stroke="url(#routeGradient)" 
                    strokeWidth="3" 
                    strokeDasharray="6 6"
                    initial={{ strokeDashoffset: 100 }}
                    whileInView={{ strokeDashoffset: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                    style={{ strokeDashoffset: 100 }}
                  />

                  {/* Definitions */}
                  <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0077B6" />
                      <stop offset="50%" stopColor="#2A9D8F" />
                      <stop offset="100%" stopColor="#F77F00" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Pin 1: Beach */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-8 left-8 flex flex-col items-center gap-1"
                >
                  <div className="bg-ocean text-white p-2 rounded-full border border-white/10 shadow-lg animate-float">
                    <MapPin size={14} className="fill-white" />
                  </div>
                  <span className="text-[10px] font-bold text-white/80 tracking-wider">Down South</span>
                </motion.div>

                {/* Pin 2: Mountain */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="absolute top-8 right-8 flex flex-col items-center gap-1"
                >
                  <div className="bg-sunset text-white p-2 rounded-full border border-white/10 shadow-lg animate-float-reverse">
                    <MapPin size={14} className="fill-white" />
                  </div>
                  <span className="text-[10px] font-bold text-white/80 tracking-wider">Ella Peak</span>
                </motion.div>

                {/* Route Arrow Indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/5 bg-navy-light px-3 py-1 rounded-full text-[9px] font-bold text-sand uppercase tracking-wider shadow">
                  Beach → Mountain
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
