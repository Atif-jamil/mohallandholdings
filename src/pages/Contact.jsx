/* Contact.jsx - Updated with new contact details and brand colors */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = `Contact Form Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0A%0AMessage:%0A${formData.message}`;

    // Open email client with pre-filled form data
    window.location.href = `mailto:info@mohallandholdings.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    setFormStatus("Opening your email client...");
    setTimeout(() => setFormStatus(""), 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: "MOHAL LANDHOLDINGS, Lahore, Pakistan",
      link: "https://maps.google.com/?cid=3489486187623201114",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+92 331 1111730",
      link: "tel:+923311111730",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "info@mohallandholdings.com",
      link: "mailto:info@mohallandholdings.com",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: "Mon-Sun: 10:00 AM - 7:00 PM",
    },
  ];

  return (
    <div>
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://plus.unsplash.com/premium_photo-1663100543835-b869b64ab435?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Contact"
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
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl"
          >
            Get in touch with our real estate experts
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 card-shadow"
            >
              <h2 className="text-3xl font-bold mb-6 text-[#062b23]">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="input-field"
                    placeholder="+92 XXX XXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="input-field resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Send Message
                </button>
                {formStatus && (
                  <p className="text-center text-[#062b23] text-sm mt-2">
                    {formStatus}
                  </p>
                )}
              </form>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 card-shadow">
                <h3 className="text-2xl font-bold mb-6 text-[#062b23]">
                  Get in Touch
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-[#ffe098] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#062b23] transition-colors">
                        <info.icon className="w-6 h-6 text-[#062b23] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {info.title}
                        </h4>
                        {info.link ? (
                          <a
                            href={info.link}
                            target={
                              info.title === "Visit Us" ? "_blank" : "_self"
                            }
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-[#062b23] transition-colors"
                          >
                            {info.details}
                          </a>
                        ) : (
                          <p className="text-gray-600">{info.details}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp Direct Chat - Updated number */}
              <div className="bg-gradient-to-r from-[#062b23] to-[#0a4a3d] rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4">
                  <MessageCircle size={40} />
                  <div>
                    <h4 className="font-bold text-lg">
                      Chat with us on WhatsApp
                    </h4>
                    <p className="text-[#ffe098] text-sm">
                      Quick response within minutes
                    </p>
                  </div>
                  <a
                    href="https://wa.me/923311111730?text=Hello! I'm interested in your properties. Can you help me?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto bg-[#ffe098] text-[#062b23] px-4 py-2 rounded-full font-semibold hover:bg-white transition-colors"
                  >
                    Start Chat
                  </a>
                </div>
              </div>

              {/* Google Maps */}
              <div className="bg-white rounded-2xl overflow-hidden card-shadow">
                <iframe
                  title="MOHAL LANDHOLDINGS Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.234567890123!2d74.218162!3d31.3186297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919ab508501cd45%3A0x307ccf66c7c4115a!2sMOHAL%20LANDHOLDINGS!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
