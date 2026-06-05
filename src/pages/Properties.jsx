import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Filter } from 'lucide-react'
import PropertyCard from '../components/PropertyCard'
import FilterSidebar from '../components/FilterSidebar'
import { propertiesData } from '../data/propertiesData'

const Properties = () => {
  const [filteredProperties, setFilteredProperties] = useState(propertiesData)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: 'All',
    location: 'All',
    minPrice: 0,
    maxPrice: 3000000,
    bedrooms: 0
  })

  useEffect(() => {
    let filtered = [...propertiesData]

    if (filters.type !== 'All') {
      filtered = filtered.filter(p => p.type === filters.type)
    }

    if (filters.location !== 'All') {
      filtered = filtered.filter(p => p.location.includes(filters.location))
    }

    filtered = filtered.filter(p => 
      p.price >= filters.minPrice && p.price <= filters.maxPrice
    )

    if (filters.bedrooms > 0) {
      filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms)
    }

    setFilteredProperties(filtered)
  }, [filters])

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=500&fit=crop"
            alt="Properties"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#062b23]/80 to-[#062b23]/60" />
        </div>
        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Our <span className="text-[#ffe098]">Properties</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-200"
          >
            Discover your perfect home from our exclusive collection
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8">
          {/* Filter Toggle Button (Mobile) */}
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden fixed bottom-20 right-6 z-40 bg-[#062b23] text-white p-4 rounded-full shadow-lg hover:bg-[#ffe098] hover:text-[#062b23] transition-all duration-300"
          >
            <Filter size={24} />
          </button>

          <div className="flex gap-8">
            {/* Desktop Filters */}
            <div className="hidden lg:block w-80">
              <FilterSidebar filters={filters} setFilters={setFilters} isMobile={false} />
            </div>

            {/* Mobile Filters Modal */}
            {showFilters && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
                <FilterSidebar 
                  filters={filters} 
                  setFilters={setFilters} 
                  onClose={() => setShowFilters(false)}
                  isMobile={true}
                />
              </div>
            )}

            {/* Properties Grid */}
            <div className="flex-1">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">
                  Showing <span className="font-semibold text-[#062b23]">{filteredProperties.length}</span> properties
                </p>
              </div>

              {filteredProperties.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
                  <button
                    onClick={() => setFilters({ type: 'All', location: 'All', minPrice: 0, maxPrice: 3000000, bedrooms: 0 })}
                    className="mt-4 bg-[#062b23] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-[#062b23]/25 hover:scale-105 active:scale-95 hover:bg-[#ffe098] hover:text-[#062b23]"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Properties