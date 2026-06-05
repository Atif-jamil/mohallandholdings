// import React from 'react'
// import { Mail } from 'lucide-react'

// const EmailButton = ({ property, className = '', children }) => {
//   const emailAddress = 'atifjamil007@gmail.com'
  
//   const handleSendEmail = () => {
//     const subject = property 
//       ? `Property Inquiry: ${property.title} - ${property.location}`
//       : 'Property Inquiry'
    
//     const body = property 
//       ? `Hello MOHAL LAND HOLDINGS Team,

// I am interested in the following property:

// 🏠 Property: ${property.title}
// 📍 Location: ${property.location}
// 💰 Price: $${property.price.toLocaleString()}${property.type === 'Rental' ? '/month' : ''}
// 🏷️ Type: ${property.type}
// 🛏️ Bedrooms: ${property.bedrooms}
// 🛁 Bathrooms: ${property.bathrooms}
// 📐 Area: ${property.area} sq.ft (${property.areaMarla} Marla)

// Please provide more details about this property and let me know when I can schedule a viewing.

// Thank you,
// [Your Name]`
//       : `Hello MOHAL LAND HOLDINGS Team,

// I would like to get more information about your properties.

// Please contact me at your earliest convenience.

// Thank you,
// [Your Name]`

//     const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
//     window.location.href = mailtoLink
//   }

//   return (
//     <button onClick={handleSendEmail} className={className}>
//       {children || (
//         <>
//           <Mail size={18} />
//           Send Email
//         </>
//       )}
//     </button>
//   )
// }

// export default EmailButton