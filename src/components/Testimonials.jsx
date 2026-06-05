import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, UserRound } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Ahmed',
    location: 'Lahore',
    rating: 5,
    text: 'Absolutely outstanding service! The team at MOHAL LANDHOLDINGS helped me find my dream villa within days. Professional, transparent, and truly caring about their clients.',
    icon: UserRound
  },
  {
    id: 2,
    name: 'Usman Malik',
    location: 'Bahria Orchard',
    rating: 5,
    text: 'Best real estate experience I\'ve ever had. They understood exactly what I was looking for and delivered beyond expectations. Highly recommended!',
    icon: UserRound
  },
  {
    id: 3,
    name: 'Fatima Khan',
    location: 'Lahore',
    rating: 5,
    text: 'The property listings are premium and exactly as described. The team is very responsive and guided us through every step. 5 stars!',
    icon: UserRound
  }
]

const Testimonials = () => {
  return (
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
            What Our <span className="text-[#062b23]">Clients Say</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from our valued clients who found their dream properties with us
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-6 card-shadow relative"
            >
              <Quote className="absolute top-6 right-6 text-[#ffe098] w-12 h-12" />
              
              <div className="flex items-center gap-4 mb-4">
                {/* Centered Icon Container */}
                <div className="w-14 h-14 bg-gradient-to-br from-[#062b23] to-[#0a4a3d] rounded-full flex items-center justify-center ring-2 ring-[#ffe098] flex-shrink-0">
                  <testimonial.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#ffe098] text-[#ffe098]" />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials