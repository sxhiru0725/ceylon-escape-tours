import { motion } from "framer-motion";
import { Palmtree, Mountain, Map, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Palmtree,
    title: "Beach Escapes",
    description: "Sun-drenched days along Galle, Mirissa, and Unawatuna. Experience golden sands, whale watching, and fresh local seafood.",
    color: "from-ocean to-tropical",
    border: "border-ocean/30"
  },
  {
    icon: Mountain,
    title: "Mountain Adventures",
    description: "Misty highlands, scenic train journeys, tea estate walks, and panoramic peaks like Little Adam's Peak in Ella.",
    color: "from-tropical to-gold",
    border: "border-tropical/30"
  },
  {
    icon: Map,
    title: "Custom Island Tours",
    description: "Tailor-made itineraries created for your pace and style. Handpick your favorite destinations across Sri Lanka.",
    color: "from-sunset to-gold",
    border: "border-sunset/30"
  }
];

export default function Intro() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

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
      id="intro" 
      className="relative py-24 md:py-32 bg-navy-bg overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-ocean/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-sunset/5 rounded-full blur-[80px] pointer-events-none" />

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
            Our Philosophy
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6"
          >
            Island Journeys Designed With Care
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 font-light leading-relaxed"
          >
            From the golden beaches of Down South to the misty hills of Ella, we create smooth, memorable and beautiful Sri Lankan travel experiences for every traveller.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ 
                  y: -12, 
                  borderColor: "rgba(212, 175, 55, 0.4)",
                  boxShadow: "0 20px 40px -15px rgba(0, 119, 182, 0.15)"
                }}
                className={`glass-card rounded-3xl p-8 text-left border ${feature.border} transition-all duration-300 relative group flex flex-col justify-between h-full`}
              >
                {/* Accent line */}
                <div className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div>
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feature.color} text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={26} />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-white mb-4 group-hover:text-gold transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed mb-8 font-light">
                    {feature.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <button
                  onClick={() => handleScrollTo(idx === 2 ? "#contact" : "#packages")}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80 group-hover:text-gold transition-colors self-start cursor-pointer mt-auto"
                >
                  Learn More 
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
