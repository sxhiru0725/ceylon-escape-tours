import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Compass } from "lucide-react";
import { destinations } from "../data/tourData";

const categories = ["All", "Beach", "Mountain", "Culture", "Adventure", "Nature"];

export default function Destinations() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDestinations = selectedCategory === "All"
    ? destinations
    : destinations.filter((dest) => dest.category === selectedCategory);

  return (
    <section 
      id="destinations" 
      className="relative py-24 md:py-32 bg-navy-dark overflow-hidden border-t border-white/5"
    >
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-[-10%] w-[400px] h-[400px] bg-tropical/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[400px] h-[400px] bg-ocean/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="text-left max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-gold text-xs font-bold tracking-widest uppercase mb-4"
            >
              Explore Sri Lanka
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight"
            >
              Popular Island Destinations
            </motion.h2>
          </div>

          {/* Subtitle / text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/60 text-sm max-w-sm font-light text-left md:text-right"
          >
            From quiet historic towns to tropical bays and cloud forests, choose your perfect escape.
          </motion.p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-12 border-b border-white/5 pb-6 justify-start">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? "bg-gradient-to-r from-ocean to-tropical text-white shadow-lg shadow-ocean/20 border-transparent"
                    : "bg-white/5 border border-white/10 hover:border-gold/50 text-white/80 hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Grid of Destination Cards */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredDestinations.map((dest) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                key={dest.name}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-white/5 flex flex-col justify-end"
              >
                {/* Image */}
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Content Overlay */}
                <div className="relative p-6 z-10 text-left transition-transform duration-500 transform translate-y-8 group-hover:translate-y-0">
                  {/* Category Badge */}
                  <span className="inline-block bg-white/10 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full text-[10px] font-bold text-sand uppercase tracking-wider mb-3">
                    {dest.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-white mb-2 flex items-center gap-1.5 group-hover:text-gold transition-colors">
                    <MapPin size={16} className="text-gold" />
                    {dest.name}
                  </h3>

                  {/* Description - Fades in on hover */}
                  <p className="text-white/60 text-xs font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 max-w-sm">
                    {dest.description}
                  </p>
                </div>

                {/* Micro Border Glow */}
                <div className="absolute inset-0 border border-white/5 group-hover:border-gold/20 rounded-3xl transition-colors pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
