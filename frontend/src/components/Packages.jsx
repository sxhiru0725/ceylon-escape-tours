import { motion } from "framer-motion";
import { Star, Clock, MapPin, Check, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { packages } from "../data/tourData";

export default function Packages() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      id="packages" 
      className="relative py-24 md:py-32 bg-navy-bg overflow-hidden border-t border-white/5"
    >
      {/* Background Orbs */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-ocean/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-sunset/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-gold text-xs font-bold tracking-widest uppercase mb-4"
          >
            Our Handpicked Tours
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6"
          >
            Handpicked Sri Lanka Packages
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 font-light"
          >
            Choose from our premium pre-planned tours or build a completely customized journey across Sri Lanka's beautiful coasts and hills.
          </motion.p>
        </div>

        {/* Packages Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {packages.map((pkg) => {
            return (
              <motion.div
                key={pkg.id}
                variants={cardVariants}
                className="group relative rounded-3xl overflow-hidden glass-card border border-white/10 flex flex-col justify-between h-full hover:border-gold/30 transition-all duration-500 shadow-2xl hover:shadow-gold/5"
              >
                {/* Upper Section: Zoomable Image and Tags */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  {/* Hover Image Zoom */}
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  
                  {/* Subtle black overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/20 to-transparent opacity-80" />

                  {/* Rating Badge */}
                  <div className="absolute top-4 left-4 bg-navy-dark/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1">
                    <Star size={14} className="fill-gold text-gold" />
                    <span className="text-xs font-bold text-white">{pkg.rating.toFixed(1)}</span>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-4 right-4 bg-gradient-to-br from-gold to-sunset px-4 py-2 rounded-xl text-navy-dark font-black text-sm tracking-wide shadow-lg flex items-center gap-1">
                    <Sparkles size={12} className="stroke-[2.5]" />
                    <span>{pkg.price}</span>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 flex items-center gap-1.5 text-white text-xs font-semibold">
                    <Clock size={12} />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                {/* Lower Section: Content */}
                <div className="p-8 flex flex-col justify-between flex-grow text-left">
                  <div>
                    {/* Locations */}
                    <div className="flex items-start gap-1.5 text-tropical mb-2 text-xs font-bold uppercase tracking-wider">
                      <MapPin size={14} className="shrink-0 mt-[1px]" />
                      <span>{pkg.locations}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                      {pkg.name}
                    </h3>

                    {/* Description */}
                    <p className="text-white/70 text-sm leading-relaxed mb-6 font-light">
                      {pkg.description}
                    </p>

                    {/* Highlights List */}
                    <div className="border-t border-white/5 pt-5 mb-8">
                      <h4 className="text-xs font-bold text-sand uppercase tracking-widest mb-3">Highlights</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {pkg.highlights.map((highlight) => (
                          <div key={highlight} className="flex items-center gap-2 text-xs text-white/60">
                            <div className="shrink-0 w-4 h-4 rounded-full bg-tropical/10 border border-tropical/30 flex items-center justify-center text-tropical">
                              <Check size={10} className="stroke-[3]" />
                            </div>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button — now links to detail page */}
                  <Link
                    to={`/packages/${pkg.id}`}
                    className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold hover:bg-gold hover:text-navy-dark font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-md group-hover:animate-pulse-glow flex items-center justify-center gap-2"
                  >
                    {pkg.buttonText}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
