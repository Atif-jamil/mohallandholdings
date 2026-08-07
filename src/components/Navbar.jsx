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
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  <img
                    src={logo}
                    alt="MOHAL LAND HOLDINGS Logo"
                    className="h-14 sm:h-16 md:h-20 w-auto object-contain rounded-xl shadow-sm p-1 bg-white"
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#ffe098] rounded-full animate-pulse"></div>
                </motion.div>
              </div>
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

              {/* Properties Dropdown */}
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

              {/* Contact */}
              <Link
                to="/contact"
                className={`flex items-center gap-2 font-medium transition-all duration-300 hover:text-[#062b23] relative group ${
                  location.pathname === '/contact' ? 'text-[#062b23]' : 'text-gray-700'
                }`}
              >
                <Phone size={18} />
                Contact
              </Link>

              {/* Desktop Login Button */}
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#062b23] to-[#0a4a3d] text-white rounded-full font-semibold text-sm shadow-md hover:shadow-xl hover:from-[#0a4a3d] hover:to-[#ffe098] hover:text-[#062b23] transition-all duration-300 transform hover:-translate-y-0.5 border border-[#ffe098]/30"
              >
                <LogIn size={18} />
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed inset-0 z-40 bg-white/98 backdrop-blur-lg pt-20 px-4 lg:hidden flex flex-col justify-between pb-8"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  location.pathname === link.path
                    ? "bg-[#ffe098] text-[#062b23] font-bold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.icon}
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === "/contact"
                  ? "bg-[#ffe098] text-[#062b23] font-bold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Phone size={18} />
              <span className="font-medium">Contact</span>
            </Link>

            <div className="border-t border-gray-200 pt-4">
              <p className="px-4 text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                Properties Categories
              </p>
              {propertiesDropdown.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm transition-all ${
                    location.pathname === item.path
                      ? "text-[#062b23] bg-[#ffe098] font-bold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 mx-4 px-5 py-3.5 bg-[#062b23] text-[#ffe098] rounded-full font-bold shadow-lg hover:bg-[#0a4a3d] transition-all"
          >
            <LogIn size={18} />
            Login to CRM
          </Link>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
