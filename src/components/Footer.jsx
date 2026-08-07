/* Footer.jsx - Updated with brand logo and contact details */
import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Youtube, Clock } from 'lucide-react'
import { FaTiktok } from 'react-icons/fa';
import logo from '../assets/logo 1.png';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Profiles', path: '/profiles' },
    { name: 'Properties', path: '/properties' },
    { name: 'Contact', path: '/contact' },
  ]

  const propertyTypes = [
    { name: 'Villas', path: '/villas' },
    { name: 'Houses', path: '/houses' },
    { name: 'Apartments', path: '/apartments' },
    { name: 'Plots', path: '/plots' },
    { name: 'Rentals', path: '/rentals' },
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/mohallandholdings', color: 'hover:bg-blue-600' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/mohallandholdings', color: 'hover:bg-pink-600' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/mohalland', color: 'hover:bg-blue-400' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@mohallandholdings', color: 'hover:bg-red-600' },
    { name: 'TikTok', icon: FaTiktok, url: 'https://tiktok.com/@mohallandholdings', color: 'hover:bg-black' },
  ]

  return (
    <footer className="relative text-white mt-20 overflow-hidden">
      {/* Background Image with Low Transparency */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1448630360428-65456885c650?w=1920&h=800&fit=crop" 
          alt="Luxury Building Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#062b23]/95 to-[#041a15]/95"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info - Render new Mohal Landholdings logo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="MOHAL LANDHOLDINGS" className="h-14 md:h-16 w-auto object-contain brightness-0 invert" />
            </div>
            <div className="mt-4">
              <p className="text-gray-200 text-sm leading-relaxed font-medium">
                <span className="text-[#ffe098] font-bold text-base">MOHAL LANDHOLDINGS</span>
                <span className="block mt-1">A trusted real estate company based in Lahore, Pakistan with <span className="text-[#ffe098] font-semibold">5 years of hands-on experience</span> in the local property market.</span>
              </p>
              <p className="text-gray-300 text-sm leading-relaxed mt-2">
                We specialize in residential and commercial plots, ready-to-move houses, and premium properties in <span className="text-[#ffe098]">Bahria Orchard</span> and surrounding developments.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-lg`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#ffe098]">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-300 hover:text-[#ffe098] transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#ffe098]">Property Types</h4>
            <ul className="space-y-2">
              {propertyTypes.map((type) => (
                <li key={type.path}>
                  <Link to={type.path} className="text-gray-300 hover:text-[#ffe098] transition-colors duration-300">
                    {type.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#ffe098]">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 group">
                <MapPin size={18} className="text-[#ffe098] mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <a 
                    href="https://maps.google.com/?cid=3489486187623201114" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 text-sm hover:text-[#ffe098] transition-colors block font-semibold"
                  >
                    MOHAL LANDHOLDINGS
                  </a>
                  <p className="text-gray-400 text-xs mt-1">Lahore, Pakistan</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone size={18} className="text-[#ffe098] group-hover:scale-110 transition-transform" />
                <div>
                  <a href="tel:+923311111730" className="text-gray-300 hover:text-[#ffe098] transition-colors block font-semibold">
                    +92 331 1111730
                  </a>
                  <p className="text-gray-400 text-xs mt-1">Contact Phone</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <Mail size={18} className="text-[#ffe098] group-hover:scale-110 transition-transform" />
                <a href="mailto:info@mohallandholdings.com" className="text-gray-300 hover:text-[#ffe098] transition-colors break-all">
                  info@mohallandholdings.com
                </a>
              </div>
              <div className="flex items-start gap-3 group mt-2 pt-2 border-t border-white/10">
                <Clock size={18} className="text-[#ffe098] mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-300 text-sm">Working Hours</p>
                  <p className="text-gray-400 text-xs">Mon-Sun: 10:00 AM - 7:00 PM</p>
                  <p className="text-gray-400 text-xs">Friday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} MOHAL LANDHOLDINGS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer