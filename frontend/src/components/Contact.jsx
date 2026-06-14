import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Compass, AlertCircle, ChevronDown } from "lucide-react";
import { submitEnquiry } from "../api/enquiries";

export default function Contact({ selectedPackage }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tourPackage: selectedPackage || "",
    travelDate: "",
    numberOfPeople: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError("");
    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.tourPackage) newErrors.tourPackage = "Please select a tour package";
    if (
      formData.numberOfPeople &&
      (parseInt(formData.numberOfPeople, 10) <= 0 ||
        parseInt(formData.numberOfPeople, 10) > 100)
    ) {
      newErrors.numberOfPeople = "Must be between 1 and 100 travellers";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError("");

      try {
        await submitEnquiry(formData);
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          tourPackage: "",
          travelDate: "",
          numberOfPeople: "",
          message: ""
        });
      } catch (error) {
        setIsSubmitting(false);
        setSubmitError(error.message);
        if (error.fields) setErrors(error.fields);
      }
    }
  };

  return (
    <section 
      id="contact" 
      className="relative py-24 md:py-32 bg-navy-dark overflow-hidden border-t border-white/5"
    >
      {/* Decorative Orbs */}
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-ocean/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[450px] h-[450px] bg-tropical/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-gold text-xs font-bold tracking-widest uppercase mb-4"
          >
            Start Your Journey
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6"
          >
            Plan Your Sri Lankan Escape
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/60 text-sm max-w-lg mx-auto font-light leading-relaxed"
          >
            Submit this form with your preferences, and our local travel specialists will design a custom proposal within 24 hours.
          </motion.p>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative glass-card rounded-[32px] p-8 md:p-12 border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 text-left relative z-10">
            
            {/* Input Row 1: Full name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-sand">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className={`w-full bg-navy-dark/60 rounded-xl border px-4.5 py-3.5 text-sm text-white placeholder-white/20 transition-all duration-300 focus:outline-none focus:bg-navy-dark ${
                    errors.name ? "border-sunset/60 focus:border-sunset" : "border-white/10 focus:border-gold/50"
                  }`}
                />
                {errors.name && (
                  <span className="flex items-center gap-1 text-[11px] font-medium text-sunset mt-1">
                    <AlertCircle size={10} /> {errors.name}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-sand">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  className={`w-full bg-navy-dark/60 rounded-xl border px-4.5 py-3.5 text-sm text-white placeholder-white/20 transition-all duration-300 focus:outline-none focus:bg-navy-dark ${
                    errors.email ? "border-sunset/60 focus:border-sunset" : "border-white/10 focus:border-gold/50"
                  }`}
                />
                {errors.email && (
                  <span className="flex items-center gap-1 text-[11px] font-medium text-sunset mt-1">
                    <AlertCircle size={10} /> {errors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Input Row 2: Phone Number & Select Package */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-sand">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +94 77 123 4567"
                  className={`w-full bg-navy-dark/60 rounded-xl border px-4.5 py-3.5 text-sm text-white placeholder-white/20 transition-all duration-300 focus:outline-none focus:bg-navy-dark ${
                    errors.phone ? "border-sunset/60 focus:border-sunset" : "border-white/10 focus:border-gold/50"
                  }`}
                />
                {errors.phone && (
                  <span className="flex items-center gap-1 text-[11px] font-medium text-sunset mt-1">
                    <AlertCircle size={10} /> {errors.phone}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-sand">Select Package</label>
                <div className="relative">
                  <select
                    name="tourPackage"
                    value={formData.tourPackage}
                    onChange={handleChange}
                    className={`w-full bg-navy-dark/60 rounded-xl border px-4.5 py-3.5 text-sm text-white transition-all duration-300 focus:outline-none focus:bg-navy-dark appearance-none ${
                      errors.tourPackage ? "border-sunset/60 focus:border-sunset" : "border-white/10 focus:border-gold/50"
                    }`}
                  >
                    <option value="" className="bg-navy-dark text-white/55">-- Choose Package --</option>
                    <option value="down-south" className="bg-navy-dark">Down South Escape</option>
                    <option value="ella-getaway" className="bg-navy-dark">Ella Mountain Getaway</option>
                    <option value="combo-package" className="bg-navy-dark">Down South + Ella Combo Package</option>
                    <option value="custom-tour" className="bg-navy-dark">Custom Sri Lanka Tour</option>
                  </select>
                  {/* Custom Arrow */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                    <ChevronDown size={16} />
                  </div>
                </div>
                {errors.tourPackage && (
                  <span className="flex items-center gap-1 text-[11px] font-medium text-sunset mt-1">
                    <AlertCircle size={10} /> {errors.tourPackage}
                  </span>
                )}
              </div>
            </div>

            {/* Input Row 3: Travel Date & Travellers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-sand">Preferred Travel Date</label>
                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  min={new Date().toISOString().slice(0, 10)}
                  className={`w-full bg-navy-dark/60 rounded-xl border px-4.5 py-3.5 text-sm text-white/80 transition-all duration-300 focus:outline-none focus:bg-navy-dark ${
                    errors.travelDate ? "border-sunset/60 focus:border-sunset" : "border-white/10 focus:border-gold/50"
                  }`}
                />
                {errors.travelDate && (
                  <span className="flex items-center gap-1 text-[11px] font-medium text-sunset mt-1">
                    <AlertCircle size={10} /> {errors.travelDate}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-sand">Number of Travellers</label>
                <input
                  type="number"
                  name="numberOfPeople"
                  value={formData.numberOfPeople}
                  onChange={handleChange}
                  min="1"
                  placeholder="e.g. 2"
                  className={`w-full bg-navy-dark/60 rounded-xl border px-4.5 py-3.5 text-sm text-white placeholder-white/20 transition-all duration-300 focus:outline-none focus:bg-navy-dark ${
                    errors.numberOfPeople ? "border-sunset/60 focus:border-sunset" : "border-white/10 focus:border-gold/50"
                  }`}
                />
                {errors.numberOfPeople && (
                  <span className="flex items-center gap-1 text-[11px] font-medium text-sunset mt-1">
                    <AlertCircle size={10} /> {errors.numberOfPeople}
                  </span>
                )}
              </div>
            </div>

            {/* Input Row 4: Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-sand">Message / Special Requests</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Share details such as accommodation preferences, diet restrictions, budget guidelines, etc..."
                className={`w-full bg-navy-dark/60 rounded-xl border px-4.5 py-3.5 text-sm text-white placeholder-white/20 transition-all duration-300 focus:outline-none focus:bg-navy-dark ${
                  errors.message ? "border-sunset/60 focus:border-sunset" : "border-white/10 focus:border-gold/50"
                }`}
              />
              {errors.message && (
                <span className="flex items-center gap-1 text-[11px] font-medium text-sunset mt-1">
                  <AlertCircle size={10} /> {errors.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            {submitError && (
              <div className="flex items-center gap-2 rounded-xl border border-sunset/40 bg-sunset/10 px-4 py-3 text-sm text-sunset">
                <AlertCircle size={16} />
                {submitError}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4.5 rounded-xl bg-gradient-to-r from-ocean to-tropical text-white font-bold text-sm tracking-widest uppercase hover:brightness-110 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-ocean/15"
            >
              {isSubmitting ? (
                <>
                  <Compass size={18} className="animate-spin" />
                  Sending Enquiry...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Travel Enquiry
                </>
              )}
            </button>
          </form>

          {/* Success Overlay Modal */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-navy-dark/95 backdrop-blur-md flex flex-col items-center justify-center p-8 z-20 text-center"
              >
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="max-w-md flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-tropical/15 text-tropical border border-tropical/30 flex items-center justify-center mb-6 shadow-lg">
                    <CheckCircle2 size={36} className="stroke-[2]" />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-3">
                    Enquiry Sent Successfully!
                  </h3>

                  <p className="text-white/60 text-sm leading-relaxed mb-8 font-light">
                    Thank you. Your enquiry has been sent successfully.
                  </p>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-gold hover:text-gold text-white font-bold text-xs tracking-wider uppercase transition-colors duration-300 cursor-pointer"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
