import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Users, CheckCircle, ShieldCheck, Car, Award, Percent } from "lucide-react";

const stats = [
  { 
    value: 500, 
    suffix: "+", 
    label: "Happy Travellers", 
    icon: Users,
    color: "text-ocean",
    bg: "bg-ocean/10"
  },
  { 
    value: 50, 
    suffix: "+", 
    label: "Custom Tours", 
    icon: CheckCircle,
    color: "text-tropical",
    bg: "bg-tropical/10"
  },
  { 
    value: 24, 
    suffix: "/7", 
    label: "Travel Support", 
    icon: ShieldCheck,
    color: "text-sunset",
    bg: "bg-sunset/10"
  },
  { 
    value: 100, 
    suffix: "%", 
    label: "Private Transport", 
    icon: Car,
    color: "text-gold",
    bg: "bg-gold/10"
  },
  { 
    value: 15, 
    suffix: "+", 
    label: "Local Guides", 
    icon: Award,
    color: "text-ocean",
    bg: "bg-ocean/10"
  },
  { 
    value: 10, 
    suffix: "%+", 
    label: "Best Price Deals", 
    icon: Percent,
    color: "text-sunset",
    bg: "bg-sunset/10"
  }
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const node = ref.current;
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value) + suffix;
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, suffix]);

  return <span ref={ref} className="font-display text-4xl sm:text-5xl font-black text-white glow-text-blue">0{suffix}</span>;
}

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      className="relative py-24 md:py-32 bg-navy-bg overflow-hidden border-t border-white/5"
    >
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-[-10%] w-[400px] h-[400px] bg-sunset/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] w-[400px] h-[400px] bg-ocean/5 rounded-full blur-[100px] pointer-events-none" />

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
            Why Ceylon Escape
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6"
          >
            Experience Premium Service
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 font-light"
          >
            We take pride in arranging high-end, comfortable, and unforgettable custom private journeys for our guests.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                whileHover={{ 
                  y: -8, 
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  boxShadow: "0 15px 30px -10px rgba(0, 119, 182, 0.1)"
                }}
                className="glass-card p-6 md:p-8 rounded-3xl border border-white/5 text-left flex flex-col justify-between transition-all duration-300 group"
              >
                {/* Icon Circle */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className="stroke-[2]" />
                </div>

                {/* Counter value */}
                <div>
                  <div className="mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <h3 className="text-white/60 text-sm font-semibold tracking-wide uppercase">
                    {stat.label}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
