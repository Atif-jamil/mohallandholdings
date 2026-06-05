import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sliders, X } from 'lucide-react'

const FilterSidebar = ({ filters, setFilters, onClose, isMobile }) => {
  const [localFilters, setLocalFilters] = useState(filters)

  const propertyTypes = ['All', 'Villa', 'House', 'Apartment', 'Plot', 'Rental']
  const locations = ['All', 'Lahore', 'Islamabad', 'Karachi', 'Bahria Town']

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    setFilters(newFilters)
  }

  return (
    <motion.div
      initial={isMobile ? { x: -300 } : { opacity: 0 }}
      animate={isMobile ? { x: 0 } : { opacity: 1 }}
      exit={isMobile ? { x: -300 } : { opacity: 0 }}
      className={`${isMobile ? 'fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl' : 'bg-white rounded-2xl p-6 card-shadow'} h-full overflow-y-auto`}
    >
      {isMobile && (
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-lg">Filters</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <Sliders size={20} className="text-amber-600" />
          <h3 className="font-bold text-lg">Filter Properties</h3>
        </div>

        {/* Property Type */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Property Type</label>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleFilterChange('type', type)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  localFilters.type === type
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Location</label>
          <div className="flex flex-wrap gap-2">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => handleFilterChange('location', loc)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  localFilters.location === loc
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Price Range: ${localFilters.minPrice} - ${localFilters.maxPrice}
          </label>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500">Min Price ($)</label>
              <input
                type="range"
                min="0"
                max="2000000"
                step="50000"
                value={localFilters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Max Price ($)</label>
              <input
                type="range"
                min="0"
                max="3000000"
                step="50000"
                value={localFilters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Bedrooms</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => handleFilterChange('bedrooms', localFilters.bedrooms === num ? 0 : num)}
                className={`w-10 h-10 rounded-lg transition-all ${
                  localFilters.bedrooms === num
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => {
            const resetFilters = { type: 'All', location: 'All', minPrice: 0, maxPrice: 3000000, bedrooms: 0 }
            setLocalFilters(resetFilters)
            setFilters(resetFilters)
          }}
          className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </motion.div>
  )
}

export default FilterSidebar