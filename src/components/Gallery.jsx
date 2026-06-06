import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Compass } from "lucide-react";
import { gallery } from "../data/tourData";

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "auto";
  };

  const showNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prevIndex) => (prevIndex + 1) % gallery.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prevIndex) => (prevIndex - 1 + gallery.length) % gallery.length);
  };

  return (
    <section 
      id="gallery" 
      className="relative py-24 md:py-32 bg-navy-dark overflow-hidden border-t border-white/5"
    >
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 right-[-10%] w-[350px] h-[350px] bg-ocean/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-10%] w-[350px] h-[350px] bg-tropical/5 rounded-full blur-[100px] pointer-events-none" />

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
            Visual Journey
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6"
          >
            Capture The Moments
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 font-light"
          >
            Take a visual tour through golden beaches, emerald tea gardens, and historical landmarks.
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              onClick={() => openLightbox(index)}
              key={item.title}
              className="group relative aspect-square rounded-3xl overflow-hidden shadow-lg border border-white/5 cursor-pointer"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-110"
              />

              {/* Dark Hover Overlay */}
              <div className="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/75 transition-all duration-300 flex flex-col justify-end p-6" />

              {/* Text / Icon content appearing on hover */}
              <div className="absolute inset-x-6 bottom-6 z-10 text-left opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gold uppercase tracking-widest block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-display text-base font-bold text-white leading-tight">
                    {item.title}
                  </h3>
                </div>
                <div className="bg-white/10 p-2.5 rounded-full text-white backdrop-blur-md border border-white/15 hover:bg-gold hover:text-navy-dark transition-colors">
                  <Maximize2 size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-navy-bg/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          >
            {/* Top Bar controls */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-2 text-white/60">
                <Compass size={18} className="text-gold" />
                <span className="text-xs uppercase font-bold tracking-widest">{gallery[lightboxIndex].category}</span>
              </div>
              <button
                onClick={closeLightbox}
                className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full border border-white/10 transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Left navigation */}
            <button
              onClick={showPrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 rounded-full border border-white/10 transition-colors cursor-pointer z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Main Visual Slide */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[75vh] flex flex-col items-center justify-center rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <img
                src={gallery[lightboxIndex].image}
                alt={gallery[lightboxIndex].title}
                className="w-full h-full object-contain rounded-2xl max-h-[70vh]"
              />
              <div className="absolute bottom-4 left-6 right-6 text-left bg-navy-dark/80 backdrop-blur-md border border-white/5 p-4.5 rounded-xl mt-4 max-w-md hidden sm:block">
                <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-1">{gallery[lightboxIndex].category}</p>
                <h4 className="text-sm font-bold text-white">{gallery[lightboxIndex].title}</h4>
              </div>
            </motion.div>

            {/* Right navigation */}
            <button
              onClick={showNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 rounded-full border border-white/10 transition-colors cursor-pointer z-10"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Footer index label */}
            <div className="absolute bottom-6 text-white/50 text-xs font-semibold uppercase tracking-wider">
              {lightboxIndex + 1} / {gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
