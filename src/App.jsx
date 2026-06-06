import { useState } from "react";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Packages from "./components/Packages";
import Destinations from "./components/Destinations";
import ExperienceSection from "./components/ExperienceSection";
import ComboOffer from "./components/ComboOffer";
import WhyChooseUs from "./components/WhyChooseUs";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [selectedPackage, setSelectedPackage] = useState("");

  const handleSelectPackage = (packageId) => {
    setSelectedPackage(packageId);
    
    // Smooth scroll to the contact form
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-navy-bg text-white overflow-hidden selection:bg-gold selection:text-navy-dark">
      {/* 1. Preloader */}
      <Preloader />

      {/* 2. Floating Tools */}
      <ScrollToTop />

      {/* 3. Sticky Navigation */}
      <Navbar />

      {/* 4. Hero Banner */}
      <Hero />

      {/* 5. Animated Intro Section */}
      <Intro />

      {/* 6. Featured Packages Section */}
      <Packages onSelectPackage={handleSelectPackage} />

      {/* 7. Destination Showcase Section */}
      <Destinations />

      {/* 8. Down South Experience Section */}
      <ExperienceSection
        title="Relax by the Golden Coast of Sri Lanka"
        description="Experience the beauty of Sri Lanka’s southern coast with golden beaches, historic streets, ocean views, fresh seafood, surfing spots and unforgettable sunsets."
        features={[
          "Beach stays",
          "Galle Fort",
          "Whale watching",
          "Surfing",
          "Turtle hatchery",
          "Sunset viewpoints"
        ]}
        buttonText="Explore Down South"
        images={[
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1588598126744-8848db9ff9e0?auto=format&fit=crop&w=600&q=80"
        ]}
        reverse={false}
        isElla={false}
        onExplore={() => handleSelectPackage("down-south")}
      />

      {/* 9. Ella Experience Section */}
      <ExperienceSection
        title="Escape to the Misty Mountains of Ella"
        description="Ella is the perfect destination for travellers who love nature, mountain views, waterfalls, hiking, tea estates and peaceful hill country weather."
        features={[
          "Scenic train journey",
          "Nine Arch Bridge",
          "Ravana Falls",
          "Tea estates",
          "Little Adam’s Peak",
          "Mountain viewpoints"
        ]}
        buttonText="Explore Ella"
        images={[
          "https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1563282218-e124f4fc4481?auto=format&fit=crop&w=600&q=80"
        ]}
        reverse={true}
        isElla={true}
        onExplore={() => handleSelectPackage("ella-getaway")}
      />

      {/* 10. Combo Package Promo Section */}
      <ComboOffer onSelectPackage={handleSelectPackage} />

      {/* 11. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 12. Gallery Section */}
      <Gallery />

      {/* 13. Testimonials Section */}
      <Testimonials />

      {/* 14. Contact Enquiry Form Section */}
      <Contact selectedPackage={selectedPackage} />

      {/* 15. Footer Section */}
      <Footer />
    </div>
  );
}

export default App;
