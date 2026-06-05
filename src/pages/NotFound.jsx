import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search, Building2 } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-20 px-4">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-white to-gray-50/50"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Animated 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          className="relative mb-8"
        >
          <div className="text-9xl md:text-[200px] font-black leading-none">
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 bg-clip-text text-transparent">
              4
            </span>
            <span className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 bg-clip-text text-transparent mx-2 md:mx-4">
              0
            </span>
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 bg-clip-text text-transparent">
              4
            </span>
          </div>
          
          {/* Decorative Circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-amber-500/5 rounded-full blur-2xl -z-10"
          />
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        {/* Search Icon Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center">
              <Search size={32} className="text-amber-600" />
            </div>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="absolute -inset-2 bg-amber-400/20 rounded-2xl -z-10"
            />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <NavLink
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105"
          >
            <Home size={18} />
            Go to Home Page
          </NavLink>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-amber-600 text-amber-700 rounded-full font-semibold hover:bg-amber-50 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-gray-500 text-sm mb-4">You might be looking for:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <NavLink
              to="/properties"
              className="text-sm text-gray-600 hover:text-amber-600 transition-colors px-3 py-1 bg-gray-100 hover:bg-amber-50 rounded-full"
            >
              All Properties
            </NavLink>
            <NavLink
              to="/villas"
              className="text-sm text-gray-600 hover:text-amber-600 transition-colors px-3 py-1 bg-gray-100 hover:bg-amber-50 rounded-full"
            >
              Villas
            </NavLink>
            <NavLink
              to="/houses"
              className="text-sm text-gray-600 hover:text-amber-600 transition-colors px-3 py-1 bg-gray-100 hover:bg-amber-50 rounded-full"
            >
              Houses
            </NavLink>
            <NavLink
              to="/apartments"
              className="text-sm text-gray-600 hover:text-amber-600 transition-colors px-3 py-1 bg-gray-100 hover:bg-amber-50 rounded-full"
            >
              Apartments
            </NavLink>
            <NavLink
              to="/contact"
              className="text-sm text-gray-600 hover:text-amber-600 transition-colors px-3 py-1 bg-gray-100 hover:bg-amber-50 rounded-full"
            >
              Contact Us
            </NavLink>
          </div>
        </motion.div>

        {/* Decorative Building Icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-0 left-0 right-0 flex justify-center opacity-10 pointer-events-none"
        >
          <Building2 size={120} className="text-gray-600" />
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound