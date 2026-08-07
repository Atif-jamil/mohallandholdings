import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Award, Users, Clock, Shield } from 'lucide-react'
import PropertyCard from '../components/PropertyCard'
import Testimonials from '../components/Testimonials'
import { propertiesData } from '../data/propertiesData'
import styled from 'styled-components'

// Styled Button Components with Brand Colors
const StyledPrimaryButton = styled.div`
  .shadow__btn {
    padding: 12px 32px;
    border: none;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    border-radius: 50px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: 0.5s;
    transition-property: box-shadow, transform;
    cursor: pointer;
    background: linear-gradient(135deg, #062b23, #0a4a3d, #0d5f4f);
    box-shadow: 0 0 15px rgba(6, 43, 35, 0.5);
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .shadow__btn:hover {
    box-shadow: 0 0 8px rgba(6, 43, 35, 0.6),
                0 0 20px rgba(6, 43, 35, 0.5),
                0 0 35px rgba(6, 43, 35, 0.4),
                0 0 60px rgba(6, 43, 35, 0.3);
    transform: translateY(-2px);
    background: #ffe098;
    color: #062b23;
  }
`

const StyledOutlineButton = styled.div`
  .shadow__btn-outline {
    padding: 12px 32px;
    font-size: 16px;
    font-weight: 600;
    color: #062b23;
    border-radius: 50px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: 0.5s;
    transition-property: box-shadow, transform, background-color, color;
    cursor: pointer;
    background: #ffe098;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .shadow__btn-outline:hover {
    background: #ffe098;
    color: #062b23;
    box-shadow: 0 0 15px rgba(6, 43, 35, 0.5);
    transform: translateY(-4px);
    border-color: #ffe098;
  }
`

const StyledViewAllButton = styled.div`
  .shadow__btn-view {
    padding: 14px 36px;
    border: none;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    border-radius: 50px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: 0.5s;
    transition-property: box-shadow, transform;
    cursor: pointer;
    background: linear-gradient(135deg, #062b23, #0a4a3d, #0d5f4f);
    box-shadow: 0 0 20px rgba(6, 43, 35, 0.4);
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .shadow__btn-view:hover {
    box-shadow: 0 0 10px rgba(6, 43, 35, 0.6),
                0 0 25px rgba(6, 43, 35, 0.5),
                0 0 45px rgba(6, 43, 35, 0.4);
    transform: translateY(-2px) scale(1.02);
    background: #ffe098;
    color: #062b23;
  }
`

const StyledCTAButton = styled.div`
  .shadow__btn-cta {
    padding: 16px 40px;
    border: none;
    font-size: 18px;
    font-weight: 700;
    color: #062b23;
    border-radius: 50px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: 0.5s;
    transition-property: box-shadow, transform;
    cursor: pointer;
    background: white;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    display: inline-flex;
    align-items: center;
    gap: 12px;
  }

  .shadow__btn-cta:hover {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.8),
                0 0 30px rgba(255, 255, 255, 0.6),
                0 0 50px rgba(255, 255, 255, 0.4);
    transform: translateY(-2px) scale(1.02);
    background: #ffe098;
    color: #062b23;
  }
`

const Home = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const featuredProperties = propertiesData.slice(0, 6)

  const features = [
    { icon: Award, title: 'Premium Properties', description: 'Luxury homes and commercial spaces' },
    { icon: Users, title: 'Expert Agents', description: 'Professional guidance at every step' },
    { icon: Clock, title: 'Fast Response', description: 'Quick and efficient service' },
    { icon: Shield, title: 'Secure Deals', description: 'Safe and transparent transactions' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop"
            alt="Luxury Villa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#062b23]/70 via-[#062b23]/50 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Find Your Dream
              <span className="gradient-text block"> Property Today</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover luxury living with MOHAL LANDHOLDINGS - Your trusted partner in premium real estate
            </p>
            <div className="flex gap-4 flex-wrap">
              {/* Explore Properties Button */}
              <StyledPrimaryButton>
                <Link to="/properties" className="shadow__btn">
                  Explore Properties
                  <ArrowRight size={18} />
                </Link>
              </StyledPrimaryButton>
              
              {/* Contact Us Button */}
              <StyledOutlineButton>
                <Link to="/contact" className=" shadow__btn-outline">
                  Contact Us
                </Link>
              </StyledOutlineButton>
            </div>
          </motion.div>
        </div>

      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-[#062b23]">Us</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide exceptional real estate services with unmatched expertise and dedication
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="text-center p-6 rounded-2xl bg-[#062b23] card-shadow hover:card-shadow-hover transition-all"
              >
                <div className="w-16 h-16 bg-[#ffe098] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-[#062b23]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#ffe098]">{feature.title}</h3>
                <p className="text-gray-600 text-white">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gradient-to-br from-[#ffe098]/10 to-white" ref={ref}>
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-[#062b23]">Properties</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of premium properties
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <StyledViewAllButton>
              <Link to="/properties" className="shadow__btn-view">
                View All Properties
                <ArrowRight size={18} />
              </Link>
            </StyledViewAllButton>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-[#062b23]">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl mb-8 text-[#ffe098]">
              Contact us today and let our experts guide you
            </p>
            <StyledCTAButton>
              <Link to="/contact" className="shadow__btn-cta">
                Get Started
                <ArrowRight size={20} />
              </Link>
            </StyledCTAButton>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home