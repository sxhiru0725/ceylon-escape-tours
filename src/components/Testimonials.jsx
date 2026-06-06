import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../data/tourData";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section 
      className="relative py-24 md:py-32 bg-navy-bg overflow-hidden border-t border-white/5"
    >
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-[-10%] w-[350px] h-[350px] bg-ocean/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-[-10%] w-[350px] h-[350px] bg-sunset/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-gold text-xs font-bold tracking-widest uppercase mb-4"
          >
            Traveller Reviews
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6"
          >
            What Our Guests Say
          </motion.h2>
        </div>

        {/* Carousel Content */}
        <div className="relative max-w-4xl mx-auto min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-[32px] p-8 md:p-12 border border-white/10 shadow-2xl relative w-full text-left"
            >
              {/* Quote Mark Decoration */}
              <Quote className="absolute right-8 top-8 text-white/5 w-24 h-24 stroke-[1]" />
              
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                {/* Guest Avatar */}
                <div className="shrink-0 relative">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-gold shadow-lg shadow-gold/15">
                    <img 
                      src={testimonials[activeIndex].avatar} 
                      alt={testimonials[activeIndex].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-tr from-gold to-sunset text-navy-dark px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase">
                    Verified
                  </div>
                </div>

                {/* Review Text */}
                <div className="flex-grow">
                  {/* Stars */}
                  <div className="flex gap-1 text-gold mb-4">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-gold" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-white/95 text-base md:text-lg leading-relaxed mb-6 font-light italic">
                    "{testimonials[activeIndex].text}"
                  </p>

                  {/* Author */}
                  <div>
                    <h4 className="font-display text-lg font-bold text-white group-hover:text-gold transition-colors">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-xs text-white/60 font-semibold tracking-wide uppercase">
                      From {testimonials[activeIndex].location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dot Indicators & Arrows */}
        <div className="flex items-center justify-center gap-6 mt-10">
          {/* Arrow Left */}
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-gold hover:text-gold text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2.5">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "w-6 bg-gold" : "w-2.5 bg-white/20"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Right */}
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-gold hover:text-gold text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
