import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass } from "lucide-react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let hideTimer;

    const handleLoad = () => {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setLoading(false), 800);
    };

    const fallbackTimer = setTimeout(handleLoad, 2500);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(fallbackTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-dark"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Decorative Background Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ocean/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tropical/10 rounded-full blur-3xl" />
          
          <div className="relative flex flex-col items-center z-10">
            {/* Animated Compass Icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                rotate: 360,
                transition: { 
                  duration: 1.5, 
                  ease: "easeOut",
                  rotate: { repeat: Infinity, duration: 6, ease: "linear" } 
                } 
              }}
              className="text-gold mb-6 bg-navy-light/60 p-4 rounded-full border border-gold/30 shadow-lg shadow-gold/10"
            >
              <Compass size={64} className="stroke-[1.5]" />
            </motion.div>

            {/* Glowing Brand Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.4, duration: 0.8 } }}
              className="font-display text-3xl md:text-5xl font-black tracking-wider text-white uppercase text-center"
            >
              Ceylon <span className="text-gold glow-text-gold">Escape</span> Tours
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7, transition: { delay: 0.8, duration: 0.8 } }}
              className="mt-3 text-sm md:text-base tracking-widest text-sand uppercase font-medium"
            >
              Discover Sri Lanka Like Never Before
            </motion.p>
            
            {/* Loading Bar */}
            <div className="w-48 h-1 bg-navy-light rounded-full mt-8 overflow-hidden relative border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-ocean via-tropical to-sunset"
                initial={{ left: "-100%" }}
                animate={{ 
                  left: "100%", 
                  transition: { 
                    repeat: Infinity, 
                    duration: 1.8, 
                    ease: "easeInOut" 
                  } 
                }}
                style={{ position: "absolute", width: "50%" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
