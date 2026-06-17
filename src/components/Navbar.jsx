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
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="relative group">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative"
              >
                <img
                  src={logo}
                  alt="MOHAL LAND HOLDINGS Logo"
                  className="w-70 h-70 object-contain rounded-xl"
                />

                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#ffe098] rounded-full animate-pulse"></div>
              </motion.div>

              <div className="absolute -inset-2 bg-[#062b23]/0 rounded-2xl transition-all duration-500 group-hover:bg-[#062b23]/5 -z-10"></div>
            </Link>

            {/* Desktop Navigation */}

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 font-medium transition-all duration-300 hover:text-[#062b23] relative group ${
                    location.pathname === link.path ? 'text-[#062b23]' : 'text-gray-700'
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

              {/* Properties */}

              <div className="relative group">
                <button
                  className={`flex items-center gap-2 font-medium transition-colors duration-300 ${
                    propertiesDropdown.some((item) => location.pathname === item.path)
                      ? 'text-[#062b23]'
                      : 'text-gray-700 hover:text-[#062b23]'
                  }`}
                >
                  <Building2 size={18} />
                  Properties
                </button>

                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-2">
                    {propertiesDropdown.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-4 py-2.5 text-gray-700 hover:bg-[#ffe098] hover:text-[#062b23]"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact after Properties */}

              <Link
                to="/contact"
                className={`flex items-center gap-2 font-medium transition-all duration-300 hover:text-[#062b23] relative group ${
                  location.pathname === '/contact' ? 'text-[#062b23]' : 'text-gray-700'
                }`}
              >
                <Phone size={18} />
                Contact
              </Link>
            </div>

            {/* Mobile Button */}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
