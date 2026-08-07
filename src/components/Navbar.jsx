/* src/components/Navbar.jsx */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Home, Building2, Phone, Info, LogIn, Users } from 'lucide-react';
import { CgGirl } from 'react-icons/cg';
import logo from '../assets/logo 1.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Profiles', path: '/profiles', icon: <Users size={18} /> },
    { name: 'Videos', path: '/videos', icon: <CgGirl size={18} /> },
  ];

  const propertiesDropdown = [
    { name: 'Villas', path: '/villas' },
    { name: 'Houses', path: '/houses' },
    { name: 'Apartments', path: '/apartments' },
    { name: 'Plots', path: '/plots' },
    { name: 'Rentals', path: '/rentals' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-nav shadow-xl bg-white/95 backdrop-blur-md'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Vertically centered, fitted neatly within navbar height with crisp readable text */}
            <Link to="/" className="relative group flex-shrink-0 flex items-center">
              <div className="flex items-center py-1">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative flex items-center justify-center bg-white rounded-xl p-1 shadow-sm border border-[#ffe098]/40 overflow-hidden"
                >
                  <img
                    src={logo}
                    alt="MOHAL LAND HOLDINGS"
                    className="h-12 sm:h-14 md:h-16 w-auto max-h-16 object-contain object-center scale-105 transform"
                  />
                  <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ffe098] rounded-full animate-pulse"></div>
                </motion.div>
              </div>
              <div className="absolute -inset-1 bg-[#062b23]/0 rounded-xl transition-all duration-500 group-hover:bg-[#062b23]/5 -z-10"></div>
            </Link>

            {/* Desktop Navigation - Shifted slightly left with balanced spacing */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 font-medium text-sm xl:text-base transition-all duration-300 hover:text-[#062b23] relative group ${
                    location.pathname === link.path ? 'text-[#062b23] font-bold' : 'text-gray-700'
                  }`}
                >
                  {link.icon}
                  {link.name}

                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#062b23] rounded-full"
                    />
                  )}

                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#062b23] rounded-full transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}

              {/* Properties Dropdown */}
              <div className="relative group">
                <button
                  className={`flex items-center gap-2 font-medium text-sm xl:text-base transition-colors duration-300 ${
                    propertiesDropdown.some((item) => location.pathname === item.path)
                      ? 'text-[#062b23] font-bold'
                      : 'text-gray-700 hover:text-[#062b23]'
                  }`}
                >
                  <Building2 size={18} />
                  Properties
                </button>

                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
                  <div className="py-2">
                    {propertiesDropdown.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#ffe098] hover:text-[#062b23] font-medium transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact */}
              <Link
                to="/contact"
                className={`flex items-center gap-2 font-medium text-sm xl:text-base transition-all duration-300 hover:text-[#062b23] relative group ${
                  location.pathname === '/contact' ? 'text-[#062b23] font-bold' : 'text-gray-700'
                }`}
              >
                <Phone size={18} />
                Contact
              </Link>

              {/* Desktop Login Button */}
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#062b23] to-[#0a4a3d] text-[#ffe098] rounded-full font-bold text-sm shadow-md hover:shadow-xl hover:from-[#0a4a3d] hover:to-[#062b23] hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 border border-[#ffe098]/30"
              >
                <LogIn size={18} />
                Login
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 text-[#062b23] transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu - Completely Responsive */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl pt-24 px-5 lg:hidden flex flex-col justify-between pb-8 overflow-y-auto"
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                  location.pathname === link.path
                    ? "bg-[#ffe098] text-[#062b23] shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                location.pathname === "/contact"
                  ? "bg-[#ffe098] text-[#062b23] shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Phone size={18} />
              <span>Contact</span>
            </Link>

            <div className="border-t border-gray-200 pt-4 mt-2">
              <p className="px-4 text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-wider">
                Property Types
              </p>
              <div className="grid grid-cols-2 gap-2">
                {propertiesDropdown.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      location.pathname === item.path
                        ? "text-[#062b23] bg-[#ffe098]"
                        : "text-gray-600 bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Fully Responsive Mobile Login Button */}
          <div className="pt-6 border-t border-gray-100 mt-4">
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-gradient-to-r from-[#062b23] to-[#0a4a3d] text-[#ffe098] rounded-2xl font-bold text-sm shadow-xl border border-[#ffe098]/40 active:scale-95 transition-all text-center cursor-pointer"
            >
              <LogIn size={18} />
              Login to CRM
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
