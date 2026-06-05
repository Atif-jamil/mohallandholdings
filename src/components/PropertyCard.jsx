import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Eye,
  Heart,
  Share2,
  Droplet,
  Car,
  Shield,
  Calendar,
} from "lucide-react";

const PropertyCard = ({ property }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/property/${property.id}`);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this ${property.type} for $${property.price.toLocaleString()}`,
        url: window.location.origin + `/property/${property.id}`,
      });
    } else {
      navigator.clipboard.writeText(
        window.location.origin + `/property/${property.id}`,
      );
      alert("Link copied to clipboard!");
    }
  };

  const formattedPrice =
    property.type === "Rental"
      ? `$${property.price.toLocaleString()}/month`
      : `$${property.price.toLocaleString()}`;

  // Get status badge color and text
  const getStatusBadge = () => {
    switch (property.status) {
      case "sold":
        return {
          text: "SOLD OUT",
          bg: "bg-red-600",
          color: "text-white",
          rotate: "-rotate-6",
        };
      case "under-construction":
        return {
          text: "UNDER CONSTRUCTION",
          bg: "bg-orange-600",
          color: "text-white",
          rotate: "-rotate-3",
        };
      case "not-available":
        return {
          text: "NOT AVAILABLE",
          bg: "bg-gray-600",
          color: "text-white",
          rotate: "rotate-0",
        };
      default:
        return null;
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-500 cursor-pointer group"
      onClick={handleViewDetails}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-64">
        <motion.img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Dark Overlay for Status Badges */}
        {statusBadge && (
          <div className="absolute inset-0 bg-black/40 z-10"></div>
        )}

        {/* Price Tag */}
        <div className="absolute top-4 left-4 bg-[#ffe098] text-[#062b23] px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-20">
          {formattedPrice}
        </div>

        {/* Type Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-amber-700 z-20">
          {property.type}
        </div>

        {/* Status Badge - Large Center Badge */}
        {statusBadge && (
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${statusBadge.bg} ${statusBadge.color} px-6 py-3 rounded-full text-base font-bold shadow-2xl z-20 ${statusBadge.rotate} border-2 border-white/30 whitespace-nowrap`}
          >
            {statusBadge.text}
          </div>
        )}

        {/* Pool Badge */}
        {property.hasPool &&
          property.status !== "sold" &&
          property.status !== "not-available" && (
            <div className="absolute bottom-4 left-4 bg-blue-500/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-white flex items-center gap-1 z-20">
              <Droplet size={12} />
              Pool
            </div>
          )}

        {/* Action Buttons - Only show if property is available */}
        {property.status !== "sold" && property.status !== "not-available" && (
          <div className="absolute bottom-4 right-4 flex gap-2 z-20">
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleLike}
              className="bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-rose-50 transition-colors"
            >
              <Heart
                size={18}
                className={
                  isLiked ? "fill-rose-500 text-rose-500" : "text-gray-600"
                }
              />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              onClick={handleShare}
              className="bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-blue-50 transition-colors"
            >
              <Share2 size={18} className="text-gray-600" />
            </motion.button>
          </div>
        )}

        {/* Overlay on hover - Only show if property is available */}
        {property.status !== "sold" && property.status !== "not-available" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center z-15"
          >
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white text-amber-700 px-6 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-amber-700 hover:text-white transition-all shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
            >
              <Eye size={18} />
              View Details
            </motion.button>
          </motion.div>
        )}

        {/* For Sold/Not Available - Show message instead */}
        {(property.status === "sold" ||
          property.status === "not-available") && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-15">
            <div className="text-center">
              <p className="text-white text-sm font-semibold bg-black/60 px-3 py-1 rounded-full">
                {property.status === "sold"
                  ? "🏷️ Property Sold"
                  : "⏰ Currently Unavailable"}
              </p>
              <p className="text-white text-xs mt-2 bg-black/50 px-2 py-1 rounded-full">
                Check back soon for new listings
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-amber-700 transition-colors">
          {property.title}
        </h3>

        <div className="flex items-center gap-1 text-gray-500 mb-3">
          <MapPin size={16} className="flex-shrink-0" />
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>

        <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-3 mt-2">
          <div className="flex items-center gap-2 text-gray-600">
            <Bed size={16} className="text-amber-600" />
            <span className="text-xs font-medium">
              {property.bedrooms} Beds
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Bath size={16} className="text-amber-600" />
            <span className="text-xs font-medium">
              {property.bathrooms} Baths
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Square size={16} className="text-amber-600" />
            <span className="text-xs font-medium">
              {property.area.toLocaleString()} sq.ft
            </span>
          </div>
        </div>

        {/* Additional Features Row */}
        <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-gray-100">
          {property.hasPool &&
            property.status !== "sold" &&
            property.status !== "not-available" && (
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full flex items-center gap-1">
                <Droplet size={10} /> Pool
              </span>
            )}
          {property.hasGarden &&
            property.status !== "sold" &&
            property.status !== "not-available" && (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                🌿 Garden
              </span>
            )}
          {property.hasParking &&
            property.status !== "sold" &&
            property.status !== "not-available" && (
              <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                <Car size={10} /> Parking
              </span>
            )}
          {property.hasSecurity &&
            property.status !== "sold" &&
            property.status !== "not-available" && (
              <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full flex items-center gap-1">
                <Shield size={10} /> Security
              </span>
            )}
          {property.builtYear &&
            property.status !== "sold" &&
            property.status !== "not-available" && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                <Calendar size={10} /> {property.builtYear}
              </span>
            )}

          {/* Status indicator in content */}
          {property.status === "sold" && (
            <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full flex items-center gap-1">
              🔴 Sold Out
            </span>
          )}
          {property.status === "under-construction" && (
            <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full flex items-center gap-1">
              🏗️ Under Construction
            </span>
          )}
          {property.status === "not-available" && (
            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
              ⏰ Not Available
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
