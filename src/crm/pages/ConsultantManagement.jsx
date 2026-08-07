/* src/crm/pages/ConsultantManagement.jsx */
import React, { useState } from "react";
import { UserCheck, Plus, Search, Phone, Mail, Award, Edit, Trash2, X, UserRound, ShieldCheck, Briefcase, Building } from "lucide-react";
import { useCRM } from "../../context/CRMContext";

const AVAILABLE_ICONS = [
  { name: "UserRound", icon: UserRound, label: "Default Profile Icon" },
  { name: "UserCheck", icon: UserCheck, label: "Verified Agent Icon" },
  { name: "ShieldCheck", icon: ShieldCheck, label: "Security & Legal Icon" },
  { name: "Award", icon: Award, label: "Top Producer Icon" },
  { name: "Briefcase", icon: Briefcase, label: "Business Dev Icon" },
  { name: "Building", icon: Building, label: "Plaza Specialist Icon" },
];

const ConsultantManagement = () => {
  const { consultants, addConsultant, updateConsultant, deleteConsultant } = useCRM();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "Real Estate Consultant",
    specialization: "Residential & Commercial",
    phone: "+92 300 ",
    email: "",
    experience: "5 Years",
    status: "Active",
    iconName: "UserRound",
    description: "Experienced real estate consultant helping clients with property guidance.",
  });

  const filteredConsultants = consultants.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      role: "Real Estate Consultant",
      specialization: "Residential Plots & Villas",
      phone: "+92 300 ",
      email: "",
      experience: "5 Years",
      status: "Active",
      iconName: "UserRound",
      description: "Experienced real estate consultant helping clients with property guidance.",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (c) => {
    setEditingId(c.id);
    setFormData({
      name: c.name || "",
      role: c.role || "Real Estate Consultant",
      specialization: c.specialization || "Residential",
      phone: c.phone || "",
      email: c.email || "",
      experience: c.experience || "5 Years",
      status: c.status || "Active",
      iconName: c.iconName || "UserRound",
      description: c.description || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateConsultant(editingId, formData);
    } else {
      addConsultant(formData);
    }
    setIsModalOpen(false);
  };

  const getIconComponent = (iconName) => {
    const found = AVAILABLE_ICONS.find((i) => i.name === iconName);
    return found ? found.icon : UserRound;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Consultant Directory</h1>
          <p className="text-xs text-gray-500">Manage real estate advisory team (Icon-based profiles only)</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 bg-[#062b23] text-[#ffe098] rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#0a4a3d] hover:text-white transition-all shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Plus size={16} /> Add Consultant
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search consultants by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#062b23]"
          />
          <Search size={14} className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredConsultants.map((c) => {
          const IconComponent = getIconComponent(c.iconName);
          return (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div className="bg-gradient-to-br from-[#062b23] to-[#0a4a3d] p-6 text-center relative">
                <div className="w-20 h-20 bg-[#ffe098] text-[#062b23] rounded-full flex items-center justify-center mx-auto border-3 border-white/30 shadow-md mb-2">
                  <IconComponent size={36} />
                </div>
                <h3 className="font-bold text-lg text-white">{c.name}</h3>
                <span className="text-[11px] font-semibold text-[#ffe098]">{c.role}</span>
              </div>

              <div className="p-5 space-y-3 flex-1 text-xs text-gray-600">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Specialization</span>
                  <span className="font-semibold text-gray-800">{c.specialization}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Phone size={12} className="text-gray-400" /> {c.phone}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail size={12} className="text-gray-400" /> {c.email || "consultant@mohalland.com"}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award size={12} className="text-gray-400" /> {c.experience} Experience
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() =>
                    updateConsultant(c.id, {
                      status: c.status === "Active" ? "Inactive" : "Active",
                    })
                  }
                  className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer ${
                    c.status === "Active"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {c.status}
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(c)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete consultant ${c.name}?`)) {
                        deleteConsultant(c.id);
                      }
                    }}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#062b23]">
                {editingId ? "Edit Consultant" : "Add Consultant"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-2">
                  Select Profile Icon (No photos permitted)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {AVAILABLE_ICONS.map((item) => {
                    const Icon = item.icon;
                    const isSelected = formData.iconName === item.name;
                    return (
                      <button
                        type="button"
                        key={item.name}
                        onClick={() => setFormData({ ...formData, iconName: item.name })}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#062b23] text-[#ffe098] border-[#062b23] font-bold"
                            : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <Icon size={24} />
                        <span className="text-[10px] truncate max-w-full">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Specialization
                  </label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#062b23] text-[#ffe098] rounded-xl text-xs font-bold hover:bg-[#0a4a3d]"
                >
                  Save Consultant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantManagement;
