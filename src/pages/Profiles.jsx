/* pages/Profiles.jsx */
import React from 'react'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import ceoImage from '../assets/ceo.jpeg'

const Profiles = () => {
  const consultants = [
    {
      name: 'Shahzad Ahmad',
      role: 'Real Estate Consultant',
      description: 'Experienced real estate consultant helping clients with property guidance, investment planning, and market opportunities.',
    },
    {
      name: 'Dawar Ali',
      role: 'Real Estate Consultant',
      description: 'Experienced real estate consultant helping clients with property guidance, investment planning, and market opportunities.',
    },
    {
      name: 'Warasat Ali',
      role: 'Real Estate Consultant',
      description: 'Experienced real estate consultant helping clients with property guidance, investment planning, and market opportunities.',
    },
    {
      name: 'Arman Bhuller',
      role: 'Real Estate Consultant',
      description: 'Experienced real estate consultant helping clients with property guidance, investment planning, and market opportunities.',
    },
    {
      name: 'Malik Raheel',
      role: 'Real Estate Consultant',
      description: 'Experienced real estate consultant helping clients with property guidance, investment planning, and market opportunities.',
    },
    {
      name: 'Danish Khan',
      role: 'Real Estate Consultant',
      description: 'Experienced real estate consultant helping clients with property guidance, investment planning, and market opportunities.',
    },
    {
      name: 'Omer Javed',
      role: 'Real Estate Consultant',
      description: 'Experienced real estate consultant helping clients with property guidance, investment planning, and market opportunities.',
    },
    {
      name: 'Tanveer',
      role: 'Real Estate Consultant',
      description: 'Experienced real estate consultant helping clients with property guidance, investment planning, and market opportunities.',
    }
  ]

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=500&fit=crop"
            alt="Our Team"
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
            Our <span className="text-[#ffe098]">Professional Team</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto px-4"
          >
            Meet the experts behind MOHAL LAND HOLDINGS - dedicated to excellence in real estate
          </motion.p>
        </div>
      </section>

      {/* CEO Featured Section - Image left, Content right */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Executive <span className="text-[#062b23]">Leadership</span>
            </h2>
            <div className="w-24 h-1 bg-[#ffe098] mx-auto rounded-full"></div>
          </motion.div>

          {/* CEO Section - Image Left | Content Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section - Left side on desktop, top on mobile */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 lg:order-1"
            >
              <div className="relative">
                {/* Back shadow div - Cream/Gold */}
                <div
                  className="absolute inset-0 rounded-2xl transform rotate-6"
                  style={{ background: "#ffe098" }}
                ></div>
                {/* Front div - Dark Green border */}
                <div
                  className="relative rounded-2xl p-1"
                  style={{ background: "#062b23" }}
                >
                  <img
                    src={ceoImage}
                    alt="Asif Nazir Mohal - CEO"
                    className="relative rounded-2xl shadow-2xl w-full object-cover h-[400px] lg:h-[600px]"
                  />
                </div>
              </div>
            </motion.div>

            {/* Content Section - Right side on desktop, bottom on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 lg:order-2"
            >
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#062b23]">
                  Asif Nazir Mohal
                </h2>
                <p className="text-[#062b23] font-semibold text-lg mb-4">
                  CEO & Senior Real Estate Consultant
                </p>
                <div className="w-20 h-1 bg-[#ffe098] mb-6 rounded-full"></div>
                <p className="text-gray-600 leading-relaxed">
                  Asif Nazir Mohal is a highly experienced real estate professional with over <span className="font-semibold text-[#062b23]">10 years of industry experience</span>. He has successfully worked on residential projects, commercial plazas, building developments, investment consultancy, and large-scale property planning. His leadership, market understanding, and long-term business vision have played a major role in the company's growth. He continues to lead with professionalism, trust, and innovation.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section - Two Cards */}
      <section className="py-20 bg-gradient-to-br from-[#ffe098]/10 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Leadership <span className="text-[#062b23]">Team</span>
            </h2>
            <div className="w-24 h-1 bg-[#ffe098] mx-auto rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Meet our key leaders driving business growth and brand excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1 - Omar Akhter */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 border border-[#062b23]/10 group"
            >
              <div className="bg-gradient-to-br from-[#062b23] to-[#0a4a3d] p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M0%200h20v20H0V0zm20%2020h20v20H20V20z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>
                <div className="relative z-10">
                  <div className="w-28 h-28 bg-white/15 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border-3 border-white/30 group-hover:scale-110 transition-transform duration-300">
                    <User size={48} className="text-[#ffe098]" />
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-[#062b23] mb-1">Omar Akhter</h3>
                <p className="text-[#062b23] font-semibold text-sm mb-3">Real Estate Business Development</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Responsible for business expansion, strategic partnerships, client acquisition, and identifying growth opportunities in the real estate market.
                </p>
              </div>
            </motion.div>

            {/* Card 2 - Jawad Nazir Mohal */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 border border-[#062b23]/10 group"
            >
              <div className="bg-gradient-to-br from-[#062b23] to-[#0a4a3d] p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M0%200h20v20H0V0zm20%2020h20v20H20V20z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>
                <div className="relative z-10">
                  <div className="w-28 h-28 bg-white/15 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border-3 border-white/30 group-hover:scale-110 transition-transform duration-300">
                    <User size={48} className="text-[#ffe098]" />
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-[#062b23] mb-1">Jawad Nazir Mohal</h3>
                <p className="text-[#062b23] font-semibold text-sm mb-3">Media Head</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Leads digital branding, media communication, public engagement, and company marketing strategies.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Real Estate Consultants Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Real Estate <span className="text-[#062b23]">Consultants</span>
            </h2>
            <div className="w-24 h-1 bg-[#ffe098] mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced consultants are dedicated to helping you find the perfect property
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {consultants.map((consultant, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 border border-[#062b23]/10 group"
              >
                <div className="bg-gradient-to-br from-[#062b23] to-[#0a4a3d] p-6 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M0%200h20v20H0V0zm20%2020h20v20H20V20z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-white/15 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border-2 border-white/30 group-hover:scale-110 transition-transform duration-300">
                      <User size={32} className="text-[#ffe098]" />
                    </div>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold text-[#062b23] mb-1">{consultant.name}</h3>
                  <p className="text-[#062b23] font-semibold text-xs mb-2">{consultant.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{consultant.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-[#062b23]">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Work With Our <span className="text-[#ffe098]">Experts?</span>
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact our professional team today and let us help you find your dream property
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-[#ffe098] text-[#062b23] px-8 py-3 rounded-full font-semibold hover:bg-white transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
                Contact Our Team
              </a>
              <a href="/properties" className="border-2 border-[#ffe098] text-[#ffe098] px-8 py-3 rounded-full font-semibold hover:bg-[#ffe098] hover:text-[#062b23] transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
                Explore Properties
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Profiles