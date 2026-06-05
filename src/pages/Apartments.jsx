import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropertyCard from "../components/PropertyCard";
import { propertiesData } from "../data/propertiesData";

const Apartments = () => {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const filtered = propertiesData.filter((p) => p.category === "apartment");
    setApartments(filtered);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&h=500&fit=crop"
            alt="Premium Real Estate Office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#062b23]/80 to-[#062b23]/60" />
        </div>
        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl text-[#ffe098] md:text-6xl font-bold mb-4"
          >
            Modern Apartments
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto px-4"
          >
            Contemporary living spaces in prime locations
          </motion.p>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartments.map((apartment) => (
              <PropertyCard key={apartment.id} property={apartment} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Apartments;
