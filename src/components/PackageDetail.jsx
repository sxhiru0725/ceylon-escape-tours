import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Clock,
  MapPin,
  Check,
  X,
  ArrowLeft,
  ChevronRight,
  Users,
  Calendar,
  Navigation,
  Sparkles,
  Phone,
  Camera,
  ArrowRight,
} from "lucide-react";
import { packages } from "../data/tourData";

export default function PackageDetail() {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const pkg = packages.find((p) => p.id === packageId);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-navy-bg flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-4xl font-black text-white mb-4">
            Package Not Found
          </h1>
          <p className="text-white/60 mb-8">
            The tour package you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-ocean to-tropical text-white font-bold text-sm tracking-wider uppercase hover:brightness-110 transition-all"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const otherPackages = packages.filter((p) => p.id !== pkg.id);

  const handleBookNow = () => {
    navigate(`/?package=${pkg.id}#contact`);
  };

  return (
    <div className="min-h-screen bg-navy-bg text-white">
      {/* ══════════════════════════════════════════════════
          1. HERO BANNER
      ══════════════════════════════════════════════════ */}
      <section className="relative w-full h-[70vh] min-h-[500px] max-h-[750px] overflow-hidden">
        {/* Background Image */}
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={pkg.image}
          alt={pkg.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-bg via-navy-bg/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-bg/60 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass-card border border-white/10 hover:border-gold/40 text-white/90 hover:text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 group"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 pb-12 md:pb-16">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 text-xs text-white/50 mb-4"
            >
              <Link
                to="/"
                className="hover:text-white transition-colors"
              >
                Home
              </Link>
              <ChevronRight size={12} />
              <span className="text-white/40">Packages</span>
              <ChevronRight size={12} />
              <span className="text-gold">{pkg.name}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 max-w-3xl leading-tight"
            >
              {pkg.name}
            </motion.h1>

            {/* Meta Tags Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              {/* Rating */}
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <Star size={14} className="fill-gold text-gold" />
                <span className="text-xs font-bold text-white">
                  {pkg.rating.toFixed(1)}
                </span>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <Clock size={14} className="text-ocean" />
                <span className="text-xs font-bold text-white">
                  {pkg.duration}
                </span>
              </div>

              {/* Locations */}
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <MapPin size={14} className="text-tropical" />
                <span className="text-xs font-bold text-white">
                  {pkg.locations}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-1.5 bg-gradient-to-br from-gold to-sunset px-4 py-2 rounded-full text-navy-dark font-black text-sm shadow-lg">
                <Sparkles size={12} className="stroke-[2.5]" />
                <span>{pkg.price}</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/70 text-base md:text-lg max-w-2xl font-light leading-relaxed"
            >
              {pkg.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. OVERVIEW SECTION
      ══════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 border-t border-white/5">
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-ocean/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Long Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2"
            >
              <h2 className="font-display text-2xl md:text-3xl font-black text-white mb-6">
                About This Tour
              </h2>
              <div className="space-y-4">
                {pkg.longDescription.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-white/70 text-base leading-relaxed font-light"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Quick Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col gap-4"
            >
              {[
                {
                  icon: Calendar,
                  label: "Best Time to Visit",
                  value: pkg.bestTimeToVisit,
                  color: "text-ocean",
                  bg: "bg-ocean/10",
                  border: "border-ocean/20",
                },
                {
                  icon: Users,
                  label: "Group Size",
                  value: pkg.groupSize,
                  color: "text-tropical",
                  bg: "bg-tropical/10",
                  border: "border-tropical/20",
                },
                {
                  icon: Navigation,
                  label: "Starting Point",
                  value: pkg.startingPoint,
                  color: "text-sunset",
                  bg: "bg-sunset/10",
                  border: "border-sunset/20",
                },
                {
                  icon: Clock,
                  label: "Duration",
                  value: pkg.duration,
                  color: "text-gold",
                  bg: "bg-gold/10",
                  border: "border-gold/20",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`glass-card rounded-2xl p-5 border ${item.border} flex items-start gap-4`}
                >
                  <div
                    className={`shrink-0 w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center ${item.color}`}
                  >
                    <item.icon size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. DAY-BY-DAY ITINERARY
      ══════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-navy-dark border-t border-white/5">
        <div className="absolute bottom-[20%] left-[-8%] w-[400px] h-[400px] bg-tropical/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <div className="text-gold text-xs font-bold tracking-widest uppercase mb-4">
              Your Journey
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-4">
              Day-by-Day Itinerary
            </h2>
            <p className="text-white/60 text-sm max-w-lg mx-auto font-light">
              Every detail planned, every moment unforgettable.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line (desktop) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-ocean via-tropical to-sunset opacity-30" />

            <div className="space-y-12 lg:space-y-20">
              {pkg.itinerary.map((day, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, delay: idx * 0.1 }}
                    className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                      isEven ? "" : "lg:direction-rtl"
                    }`}
                  >
                    {/* Day Number Circle (center, desktop) */}
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="w-14 h-14 rounded-full bg-navy-dark border-2 border-gold/40 flex items-center justify-center shadow-lg shadow-gold/10">
                        <span className="font-display font-black text-gold text-sm">
                          {String(day.day).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Image */}
                    <div
                      className={`${
                        isEven ? "lg:order-1" : "lg:order-2"
                      } relative rounded-2xl overflow-hidden aspect-[16/10] group`}
                    >
                      <img
                        src={day.image}
                        alt={day.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent" />

                      {/* Mobile day badge */}
                      <div className="lg:hidden absolute top-4 left-4 w-10 h-10 rounded-full bg-navy-dark/80 border border-gold/40 flex items-center justify-center backdrop-blur-md">
                        <span className="font-display font-black text-gold text-xs">
                          {String(day.day).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Text Content */}
                    <div
                      className={`${
                        isEven ? "lg:order-2 lg:pl-12" : "lg:order-1 lg:pr-12"
                      }`}
                    >
                      <div className="text-ocean text-[10px] font-bold tracking-widest uppercase mb-2">
                        Day {day.day}
                      </div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-4">
                        {day.title}
                      </h3>
                      <p className="text-white/65 text-sm leading-relaxed font-light">
                        {day.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. INCLUDED / EXCLUDED
      ══════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <div className="text-gold text-xs font-bold tracking-widest uppercase mb-4">
              What You Get
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white">
              Included & Excluded
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Included */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="glass-card rounded-3xl p-8 md:p-10 border border-tropical/15"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-tropical/15 flex items-center justify-center text-tropical">
                  <Check size={20} className="stroke-[3]" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  What's Included
                </h3>
              </div>
              <ul className="space-y-4">
                {pkg.included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="shrink-0 w-5 h-5 mt-0.5 rounded-full bg-tropical/10 border border-tropical/30 flex items-center justify-center text-tropical">
                      <Check size={10} className="stroke-[3]" />
                    </div>
                    <span className="text-sm text-white/75 font-light leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Excluded */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="glass-card rounded-3xl p-8 md:p-10 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/50">
                  <X size={20} className="stroke-[3]" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  What's Excluded
                </h3>
              </div>
              <ul className="space-y-4">
                {pkg.excluded.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="shrink-0 w-5 h-5 mt-0.5 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/30">
                      <X size={10} className="stroke-[3]" />
                    </div>
                    <span className="text-sm text-white/50 font-light leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. PHOTO GALLERY
      ══════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-navy-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <div className="text-gold text-xs font-bold tracking-widest uppercase mb-4">
              Visual Preview
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white">
              Photo Gallery
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          >
            {pkg.galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                  idx === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                onClick={() => setLightboxIdx(idx)}
              >
                <img
                  src={img}
                  alt={`${pkg.name} gallery ${idx + 1}`}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    idx === 0 ? "h-full min-h-[280px] md:min-h-[400px]" : "h-48 md:h-56"
                  }`}
                />
                <div className="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/30 transition-colors duration-300 flex items-center justify-center">
                  <Camera
                    size={28}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-navy-dark/95 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={() => setLightboxIdx(null)}
            >
              <motion.img
                key={lightboxIdx}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={pkg.galleryImages[lightboxIdx]}
                alt={`Gallery ${lightboxIdx + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Close */}
              <button
                onClick={() => setLightboxIdx(null)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full glass-card border border-white/10 flex items-center justify-center text-white hover:text-gold hover:border-gold/40 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Navigation Arrows */}
              {lightboxIdx > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIdx(lightboxIdx - 1);
                  }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-card border border-white/10 flex items-center justify-center text-white hover:text-gold hover:border-gold/40 transition-all cursor-pointer"
                >
                  <ArrowLeft size={18} />
                </button>
              )}
              {lightboxIdx < pkg.galleryImages.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIdx(lightboxIdx + 1);
                  }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-card border border-white/10 flex items-center justify-center text-white hover:text-gold hover:border-gold/40 transition-all cursor-pointer"
                >
                  <ArrowRight size={18} />
                </button>
              )}

              {/* Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-white/50 tracking-widest">
                {lightboxIdx + 1} / {pkg.galleryImages.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ══════════════════════════════════════════════════
          6. BOOKING CTA
      ══════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-ocean/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-gold text-xs font-bold tracking-widest uppercase mb-4">
              Ready to Explore?
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white mb-6">
              Book the {pkg.name}
            </h2>
            <p className="text-white/60 text-base md:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Submit your enquiry and our Sri Lankan travel experts will get
              back to you within 24 hours with a personalised proposal.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleBookNow}
                className="px-10 py-4.5 rounded-full bg-gradient-to-r from-ocean to-tropical text-white font-bold text-sm tracking-widest uppercase shadow-lg hover:shadow-ocean/20 hover:brightness-110 transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                <Phone size={16} />
                Enquire Now
              </button>

              <div className="flex items-center gap-2 text-white/40 text-xs font-light">
                <Sparkles size={12} className="text-gold" />
                Starting from{" "}
                <span className="text-gold font-bold">{pkg.price}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. RELATED PACKAGES
      ══════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-navy-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <div className="text-gold text-xs font-bold tracking-widest uppercase mb-4">
              More Adventures
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white">
              Explore Other Packages
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {otherPackages.map((other, idx) => (
              <motion.div
                key={other.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <Link
                  to={`/packages/${other.id}`}
                  className="group relative rounded-2xl overflow-hidden glass-card border border-white/10 hover:border-gold/30 flex flex-col h-full transition-all duration-500 shadow-xl hover:shadow-gold/5"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <img
                      src={other.image}
                      alt={other.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/20 to-transparent opacity-80" />

                    {/* Price */}
                    <div className="absolute bottom-3 right-3 bg-gradient-to-br from-gold to-sunset px-3 py-1.5 rounded-lg text-navy-dark font-black text-xs shadow-lg flex items-center gap-1">
                      <Sparkles size={10} className="stroke-[2.5]" />
                      {other.price}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-1.5 text-tropical text-[10px] font-bold uppercase tracking-wider mb-2">
                      <MapPin size={11} className="shrink-0" />
                      {other.locations.length > 40
                        ? other.locations.slice(0, 40) + "..."
                        : other.locations}
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors">
                      {other.name}
                    </h3>
                    <p className="text-white/55 text-xs leading-relaxed font-light mb-4 flex-grow">
                      {other.description}
                    </p>
                    <div className="text-xs font-bold text-ocean tracking-wider uppercase flex items-center gap-1 group-hover:text-gold transition-colors">
                      View Details
                      <ArrowRight
                        size={12}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
