import React from "react";
import { motion } from "framer-motion";
import { Check, Compass, ArrowRight } from "lucide-react";

export default function ExperienceSection({
  title,
  description,
  features,
  buttonText,
  images,
  reverse = false,
  isElla = false,
  onExplore
}) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section 
      className={`relative py-24 md:py-32 overflow-hidden border-t border-white/5 ${
        isElla 
          ? "bg-gradient-to-b from-navy-dark via-navy-bg to-navy-dark" 
          : "bg-navy-bg"
      }`}
    >
      {/* Background Orbs */}
      {isElla ? (
        <div className="absolute top-[30%] left-[20%] w-[350px] h-[350px] bg-tropical/10 rounded-full blur-[90px] pointer-events-none" />
      ) : (
        <div className="absolute top-[30%] right-[20%] w-[350px] h-[350px] bg-ocean/10 rounded-full blur-[90px] pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-16 items-center`}>
          
          {/* Content Column */}
          <div className={`lg:col-span-6 flex flex-col text-left ${
            reverse ? "lg:order-last" : ""
          }`}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-gold text-xs font-bold tracking-widest uppercase mb-4"
            >
              {isElla ? "Highland Adventures" : "Coastal Escapes"}
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base text-white/70 font-light leading-relaxed mb-8"
            >
              {description}
            </motion.p>

            {/* Feature Chips */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, borderColor: "rgba(212,175,55,0.4)" }}
                  className="glass-card px-4 py-2.5 rounded-xl border border-white/5 flex items-center gap-2"
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white ${
                    isElla ? "bg-tropical" : "bg-ocean"
                  }`}>
                    <Check size={12} className="stroke-[3]" />
                  </div>
                  <span className="text-xs font-bold text-white/80">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <button
                onClick={onExplore}
                className={`group px-7 py-3.5 rounded-full text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-all duration-300 shadow-lg cursor-pointer ${
                  isElla 
                    ? "bg-gradient-to-r from-tropical to-gold hover:shadow-tropical/20" 
                    : "bg-gradient-to-r from-ocean to-tropical hover:shadow-ocean/20"
                }`}
              >
                {buttonText}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Collage Column */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-4/5 aspect-[4/3] rounded-[28px] overflow-hidden border border-white/10 shadow-2xl relative group"
            >
              <img 
                src={images[0]} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy-dark/10 group-hover:bg-transparent transition-colors duration-300" />
            </motion.div>

            {/* Overlapping Secondary Image */}
            <motion.div
              initial={{ opacity: 0, x: reverse ? -50 : 50, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className={`absolute bottom-[-40px] ${
                reverse ? "left-0" : "right-0"
              } w-1/2 aspect-[4/3] rounded-2xl overflow-hidden border-4 border-navy-bg shadow-2xl group animate-float-reverse`}
            >
              <img 
                src={images[1]} 
                alt={`${title} details`} 
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Compass badge on top */}
            <div className="absolute top-[-20px] left-[10%] bg-gradient-to-tr from-gold to-sunset text-navy-dark p-3 rounded-full border border-white/10 shadow-lg animate-float hidden sm:block">
              <Compass size={20} className="animate-spin-slow duration-[10000ms]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
