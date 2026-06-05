import React from "react";
import image from "../assets/ceo.jpeg";
import { motion } from "framer-motion";
import {
  Award,
  Users,
  Building2,
  Trophy,
  Heart,
  Target,
  Eye,
  Quote,
} from "lucide-react";

const About = () => {
  const stats = [
    { number: "100+", label: "Properties Sold", icon: Building2 },
    { number: "200+", label: "Happy Clients", icon: Users },
    { number: "5", label: "Years Experience", icon: Trophy },
    { number: "98%", label: "Client Satisfaction", icon: Heart },
  ];

  const achievements = [
    "Successfully sold multiple residential and commercial plots",
    "Delivered ready-to-move houses to satisfied clients",
    "Helped numerous families find their ideal homes",
    "Built a strong reputation based on trust and performance in the Lahore market",
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=1920&h=600&fit=crop"
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
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            About <span className="text-[#ffe098]">MOHAL LANDHOLDINGS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto px-4"
          >
            Trusted real estate solutions in Lahore, Pakistan
          </motion.p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Who <span className="text-[#062b23]">We Are</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                <span className="font-semibold text-[#062b23]">
                  MOHAL LAND HOLDINGS
                </span>{" "}
                is a trusted and rapidly growing real estate company based in
                Lahore, Pakistan. With over{" "}
                <span className="font-semibold">
                  4–5 years of hands-on experience
                </span>{" "}
                in the local property market, we have built a strong reputation
                for delivering reliable, transparent, and client-focused real
                estate solutions.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Over the years, we have successfully facilitated the sale of
                numerous residential and commercial plots in some of Lahore's
                most sought-after locations, including{" "}
                <span className="font-semibold">
                  Bahria Orchard and surrounding developments
                </span>
                . Our portfolio also includes fully constructed, ready-to-move
                houses that are designed to meet modern living standards while
                maintaining affordability and quality.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                At MOHAL LAND HOLDINGS, we believe that buying a property is not
                just a transaction — it's a{" "}
                <span className="font-semibold">life decision</span>. That's why
                we focus on building long-term relationships with our clients by
                providing honest guidance, secure deals, and personalized
                support at every step.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our deep understanding of Lahore's real estate market trends
                allows us to guide investors and homebuyers toward the best
                opportunities, whether it's purchasing a plot, investing in
                rental properties, or owning a dream home.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?w=800&h=600&fit=crop"
                alt="Professional Real Estate Team"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#062b23] to-[#0a4a3d] rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#ffe098]/10 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#ffe098] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-[#062b23]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#062b23] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
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
              Our <span className="text-[#062b23]">Achievements</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Milestones that define our journey of excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 bg-white rounded-xl card-shadow hover:card-shadow-hover transition-all"
              >
                <div className="w-8 h-8 bg-[#ffe098] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="w-4 h-4 text-[#062b23]" />
                </div>
                <p className="text-gray-700">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Message Section - Fixed Image */}
      <section className="py-20 bg-gradient-to-br from-[#ffe098]/10 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <Quote className="absolute -top-6 -left-6 w-16 h-16 text-[#ffe098] opacity-50" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  CEO <span className="text-[#062b23]">Message</span>
                </h2>
                <h3 className="text-2xl font-semibold text-[#062b23] mb-1">
                  Asif Nazir Mohal
                </h3>
                <p className="text-[#062b23] font-medium mb-4">
                  CEO & Senior Real Estate Consultant
                </p>
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    <span className="font-semibold">Asif Nazir Mohal</span> is an experienced leader in the real estate industry with over <span className="font-semibold">10 years of professional experience</span>. Throughout his career, he has successfully worked on property consultancy, real estate investments, commercial projects, residential developments, plazas, and building projects.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    His expertise includes identifying profitable investment opportunities, managing development projects, and building long-term client trust. Under his leadership, the company continues to grow with innovation, professionalism, and a strong vision for the future.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative inline-block">
                {/* Back div - Cream/Gold shadow */}
                <div
                  className="absolute inset-0 rounded-2xl transform rotate-6"
                  style={{ background: "#ffe098" }}
                ></div>

                {/* Front div - Dark Green border */}
                <div
                  className="relative rounded-2xl p-2"
                  style={{ background: "#062b23" }}
                >
                  <img
                    src={image}
                    alt="Asif Nazir Mohal - CEO"
                    className="rounded-xl w-80 h-80 md:w-96 md:h-96 object-cover"
                    style={{ objectPosition: "top 15% center" }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Professional <span className="text-[#062b23]">Team</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              Our professional team consists of experienced consultants, business development specialists, and media professionals working together to deliver trusted real estate solutions, market expertise, and exceptional client service.
            </p>
            
            {/* Explore Team Profiles Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/profiles"
                className="inline-block bg-[#062b23] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-[#062b23]/25 hover:bg-[#ffe098] hover:text-[#062b23]"
              >
                Explore Team Profiles
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#062b23]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <div className="w-16 h-16 bg-[#ffe098]/20 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-4">
                <Target className="w-8 h-8 text-[#ffe098]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                Our Mission
              </h3>
              <p className="text-[#ffe098]/80 leading-relaxed">
                To provide secure, transparent, and high-quality real estate
                services that help people invest confidently and build their
                future.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <div className="w-16 h-16 bg-[#ffe098]/20 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-4">
                <Eye className="w-8 h-8 text-[#ffe098]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
              <p className="text-[#ffe098]/80 leading-relaxed">
                To become one of Lahore's most trusted and recognized real
                estate brands by consistently delivering value and excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your{" "}
              <span className="text-[#062b23]">Real Estate Journey?</span>
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Let us help you find the perfect property. Our team of experts is
              ready to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-[#062b23] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-[#062b23]/25 hover:scale-105 active:scale-95 hover:bg-[#ffe098] hover:text-[#062b23]"
              >
                Contact Us Today
              </a>
              <a
                href="/properties"
                className="border-2 border-[#062b23] text-[#062b23] px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[#ffe098] hover:border-[#ffe098] hover:shadow-lg hover:text-[#062b23]"
              >
                Explore Properties
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;