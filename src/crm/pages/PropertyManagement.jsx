/* src/crm/pages/PropertyManagement.jsx */
import React, { useState } from "react";
import {
  Building2,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Star,
  CheckCircle,
  XCircle,
  Eye,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Upload,
  X,
  Check,
} from "lucide-react";
import { useCRM } from "../../context/CRMContext";

const PropertyManagement = () => {
  const { properties, consultants, addProperty, updateProperty, deleteProperty } = useCRM();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "Lahore",
    location: "Bahria Orchard, Lahore",
    category: "villa",
    type: "Sale",
    beds: 4,
    baths: 4,
    area: "10 Marla",
    status: "Available",
    featured: false,
    amenities: ["Swimming Pool", "Garden", "Security", "Parking"],
    assignedAgent: "Shahzad Ahmad",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    videoUrl: "",
    mapUrl: "",
  });

  // Filter properties
  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = filterCity === "All" || p.location.includes(filterCity);
    const matchesType = filterType === "All" || p.category === filterType;
    const matchesStatus = filterStatus === "All" || p.status === filterStatus;
    return matchesSearch && matchesCity && matchesType && matchesStatus;
  });

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      price: "PKR 3.5 Crore",
      city: "Lahore",
      location: "Bahria Orchard, Lahore",
      category: "villa",
      type: "Sale",
      beds: 4,
      baths: 4,
      area: "10 Marla",
      status: "Available",
      featured: false,
      amenities: ["Security", "Parking", "Electricity", "Water Supply"],
      assignedAgent: "Shahzad Ahmad",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      videoUrl: "",
      mapUrl: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p) => {
    setEditingId(p.id);
    setFormData({
      title: p.title || "",
      description: p.description || "",
      price: p.price || "",
      city: p.city || "Lahore",
      location: p.location || "",
      category: p.category || "villa",
      type: p.type || "Sale",
      beds: p.beds || 3,
      baths: p.baths || 3,
      area: p.area || "10 Marla",
      status: p.status || "Available",
      featured: p.featured || false,
      amenities: p.amenities || ["Security", "Parking"],
      assignedAgent: p.assignedAgent || "Shahzad Ahmad",
      image: p.image || "",
      videoUrl: p.videoUrl || "",
      mapUrl: p.mapUrl || "",
    });
    setIsModalOpen(true);
  };

  const handleSaveProperty = (e) => {
    e.preventDefault();
    if (editingId) {
      updateProperty(editingId, formData);
    } else {
      addProperty(formData);
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = (p, nextStatus) => {
    updateProperty(p.id, { status: nextStatus });
  };

  const handleToggleFeature = (p) => {
    updateProperty(p.id, { featured: !p.featured });
  };

  return (
    <div className="space-y-6">
      {/* Top Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Property Management</h1>
          <p className="text-xs text-gray-500">Manage real estate catalog, features, and status</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 bg-[#062b23] text-[#ffe098] rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#0a4a3d] hover:text-white transition-all shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Plus size={16} /> Add New Property
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#062b23]"
          />
          <Search size={14} className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#062b23]"
          >
            <option value="All">All Categories</option>
            <option value="villa">Villa</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="plot">Plot</option>
            <option value="rental">Rental</option>
          </select>
        </div>

        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#062b23]"
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Rented">Rented</option>
          </select>
        </div>

        <div>
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#062b23]"
          >
            <option value="All">All Locations</option>
            <option value="Bahria Orchard">Bahria Orchard</option>
            <option value="Lake City">Lake City</option>
            <option value="Lahore">Lahore</option>
          </select>
        </div>
      </div>

      {/* Property Grid Table View */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Property</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Specs</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-gray-400">
                    No properties match the current filters.
                  </td>
                </tr>
              ) : (
                filteredProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prop.image}
                          alt={prop.title}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-200"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 line-clamp-1">{prop.title}</h4>
                          <p className="text-[11px] text-gray-400 flex items-center gap-1">
                            <MapPin size={10} /> {prop.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="capitalize font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg">
                        {prop.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#062b23]">{prop.price}</td>
                    <td className="py-3 px-4 text-gray-600">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span>{prop.beds} Beds</span> • <span>{prop.area}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={prop.status}
                        onChange={(e) => handleToggleStatus(prop, e.target.value)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer ${
                          prop.status === "Available"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : prop.status === "Sold"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        }`}
                      >
                        <option value="Available">Available</option>
                        <option value="Sold">Sold</option>
                        <option value="Rented">Rented</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleFeature(prop)}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          prop.featured
                            ? "bg-amber-100 text-amber-600 border-amber-300"
                            : "text-gray-400 hover:text-amber-500 border-gray-200"
                        }`}
                        title={prop.featured ? "Featured on Home" : "Click to feature"}
                      >
                        <Star size={16} fill={prop.featured ? "currentColor" : "none"} />
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(prop)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete property "${prop.title}"?`)) {
                              deleteProperty(prop.id);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-[#062b23]">
                {editingId ? "Edit Property Details" : "Add New Listing"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Property Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Luxury 10 Marla Villa in Bahria Orchard"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-[#062b23]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="PKR 3.5 Crore"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-[#062b23]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Category / Type
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-[#062b23]"
                  >
                    <option value="villa">Villa</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="plot">Plot</option>
                    <option value="rental">Rental</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Complete Location & Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Block B, Bahria Orchard, Raiwind Road, Lahore"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-[#062b23]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={formData.beds}
                    onChange={(e) => setFormData({ ...formData, beds: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    value={formData.baths}
                    onChange={(e) => setFormData({ ...formData, baths: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Area
                  </label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="10 Marla"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Main Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed specs, floor layout, construction materials..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-[#062b23] rounded"
                  />
                  Featured Property
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#062b23] text-[#ffe098] rounded-xl text-xs font-bold hover:bg-[#0a4a3d] hover:text-white transition-all shadow-md cursor-pointer"
                >
                  Save Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyManagement;
