import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bed, Bath, Square, MapPin, ArrowLeft, Phone, Mail, 
  Droplet, Car, Shield, Calendar, X, Heart, Share2, 
  Home, Maximize2, Check
} from 'lucide-react'
import { propertiesData } from '../data/propertiesData'

const PropertyDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showEmailPopup, setShowEmailPopup] = useState(false)
  const [emailForm, setEmailForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  useEffect(() => {
    const found = propertiesData.find(p => p.id === parseInt(id))
    if (found) {
      setProperty(found)
    } else {
      navigate('/properties')
    }
  }, [id, navigate])

  if (!property) {
    return null
  }

  const images = property.gallery || [property.image]
  const phoneNumber = '923410437852'
  const emailAddress = 'atifjamil007@gmail.com'

  const handleContactAgent = () => {
    window.location.href = `tel:${phoneNumber}`
  }

  const handleWhatsApp = () => {
    const message = `Hello! I am interested in ${property.title} located at ${property.location}. Can you provide more details?`
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleSendEmail = () => {
    // Open email popup modal instead of directly opening email client
    setShowEmailPopup(true)
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    
    // Create email content
    const subject = `Property Inquiry: ${property.title} - ${property.location}`
    const body = `Name: ${emailForm.name}%0AEmail: ${emailForm.email}%0APhone: ${emailForm.phone}%0A%0AMessage:%0A${emailForm.message}%0A%0AProperty Details:%0A- Title: ${property.title}%0A- Location: ${property.location}%0A- Price: $${property.price.toLocaleString()}${property.type === 'Rental' ? '/month' : ''}%0A- Type: ${property.type}%0A- Bedrooms: ${property.bedrooms}%0A- Bathrooms: ${property.bathrooms}`
    
    // Open default email client
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    // Close popup
    setShowEmailPopup(false)
    
    // Show success message
    alert('Opening your email client...')
    
    // Reset form
    setEmailForm({ name: '', email: '', phone: '', message: '' })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this ${property.type} for $${property.price.toLocaleString()}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const amenities = [
    { name: 'Swimming Pool', available: property.hasPool, icon: Droplet },
    { name: 'Garden', available: property.hasGarden, icon: () => <span>🌿</span> },
    { name: 'Parking', available: property.hasParking, icon: Car },
    { name: '24/7 Security', available: property.hasSecurity, icon: Shield },
  ]

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-amber-700 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Properties
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl overflow-hidden card-shadow"
            >
              {/* Main Image */}
              <div 
                className="relative cursor-pointer group"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={images[selectedImage]}
                  alt={property.title}
                  className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white px-4 py-2 rounded-full flex items-center gap-2">
                    <Maximize2 size={16} />
                    Click to enlarge
                  </div>
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-amber-600' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Property Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 card-shadow"
          >
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  property.status === 'sold' ? 'bg-red-100 text-red-700' :
                  property.status === 'under-construction' ? 'bg-orange-100 text-orange-700' :
                  property.status === 'not-available' ? 'bg-gray-100 text-gray-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {property.status === 'sold' ? 'SOLD OUT' :
                   property.status === 'under-construction' ? 'UNDER CONSTRUCTION' :
                   property.status === 'not-available' ? 'NOT AVAILABLE' :
                   property.type}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Heart size={20} className={isLiked ? 'fill-rose-500 text-rose-500' : 'text-gray-400'} />
                  </button>
                  <button 
                    onClick={handleShare}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Share2 size={20} className="text-gray-400" />
                  </button>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
              <div className="flex items-center gap-1 text-gray-500">
                <MapPin size={16} />
                <span>{property.location}</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="text-3xl font-bold text-amber-700">
                ${property.price.toLocaleString()}
                {property.type === 'Rental' && <span className="text-sm font-normal text-gray-500">/month</span>}
              </div>
              {property.type !== 'Rental' && (
                <p className="text-sm text-gray-500 mt-1">One-time payment</p>
              )}
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-3 gap-4 border-y border-gray-100 py-4 mb-6">
              <div className="text-center">
                <Bed className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <p className="text-sm font-semibold text-gray-800">{property.bedrooms}</p>
                <p className="text-xs text-gray-500">Bedrooms</p>
              </div>
              <div className="text-center">
                <Bath className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <p className="text-sm font-semibold text-gray-800">{property.bathrooms}</p>
                <p className="text-xs text-gray-500">Bathrooms</p>
              </div>
              <div className="text-center">
                <Square className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <p className="text-sm font-semibold text-gray-800">{property.area.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Sq.ft</p>
              </div>
            </div>

            {/* Area in Marla */}
            {property.areaMarla && (
              <div className="mb-4 p-3 bg-amber-50 rounded-xl">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Area:</span> {property.areaMarla} Marla ({property.area.toLocaleString()} sq.ft)
                </p>
              </div>
            )}

            {/* Amenities */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {amenity.available ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-gray-300" />
                    )}
                    <span className={`text-sm ${amenity.available ? 'text-gray-700' : 'text-gray-400'}`}>
                      {amenity.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Built Year */}
            {property.builtYear && (
              <div className="mb-6 flex items-center gap-2 text-gray-600">
                <Calendar size={16} />
                <span className="text-sm">Built in {property.builtYear}</span>
              </div>
            )}

            {/* Contact Buttons */}
            <div className="space-y-3">
              <button 
                onClick={handleContactAgent}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                Contact Agent
              </button>
              <button 
                onClick={handleWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                WhatsApp
              </button>
              <button 
                onClick={handleSendEmail}
                className="btn-outline w-full flex items-center justify-center gap-2"
              >
                <Mail size={18} />
                Send Email
              </button>
            </div>
          </motion.div>
        </div>

        {/* Description Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 bg-white rounded-2xl p-8 card-shadow"
        >
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {property.description}
          </p>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3">Property Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Home size={16} className="text-amber-600" />
                <span className="text-sm text-gray-600">Property Type: {property.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-amber-600" />
                <span className="text-sm text-gray-600">Location: {property.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed size={16} className="text-amber-600" />
                <span className="text-sm text-gray-600">Bedrooms: {property.bedrooms}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath size={16} className="text-amber-600" />
                <span className="text-sm text-gray-600">Bathrooms: {property.bathrooms}</span>
              </div>
              <div className="flex items-center gap-2">
                <Square size={16} className="text-amber-600" />
                <span className="text-sm text-gray-600">Area: {property.area} sq.ft ({property.areaMarla} Marla)</span>
              </div>
              {property.builtYear && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-amber-600" />
                  <span className="text-sm text-gray-600">Built Year: {property.builtYear}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Email Popup Modal */}
      <AnimatePresence>
        {showEmailPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowEmailPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Send Email Inquiry</h3>
                <button
                  onClick={() => setShowEmailPopup(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={emailForm.name}
                    onChange={(e) => setEmailForm({...emailForm, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={emailForm.email}
                    onChange={(e) => setEmailForm({...emailForm, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={emailForm.phone}
                    onChange={(e) => setEmailForm({...emailForm, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="+92 XXX XXXXXXX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message *</label>
                  <textarea
                    rows="4"
                    required
                    value={emailForm.message}
                    onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                    placeholder="I'm interested in this property. Please provide more details..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Send Email
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
              <img
                src={images[selectedImage]}
                alt="Property"
                className="w-full h-auto max-h-[90vh] object-contain"
              />
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        selectedImage === index ? 'bg-white w-4' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PropertyDetail