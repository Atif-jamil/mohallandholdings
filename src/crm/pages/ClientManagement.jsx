/* src/crm/pages/ClientManagement.jsx */
import React, { useState } from "react";
import { Users, Plus, Search, Phone, Mail, MapPin, Edit, Trash2, X, MessageSquare } from "lucide-react";
import { useCRM } from "../../context/CRMContext";

const ClientManagement = () => {
  const { clients, addClient, updateClient, deleteClient } = useCRM();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    assignedProperty: "",
    notes: "",
  });

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      phone: "+92 300 ",
      whatsapp: "+92 300 ",
      email: "",
      address: "Lahore, Pakistan",
      assignedProperty: "",
      notes: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (c) => {
    setEditingId(c.id);
    setFormData({
      name: c.name || "",
      phone: c.phone || "",
      whatsapp: c.whatsapp || "",
      email: c.email || "",
      address: c.address || "",
      assignedProperty: c.assignedProperty || "",
      notes: c.notes || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateClient(editingId, formData);
    } else {
      addClient(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
          <p className="text-xs text-gray-500">Manage buyer records, property assignments & notes</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 bg-[#062b23] text-[#ffe098] rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#0a4a3d] hover:text-white transition-all shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Plus size={16} /> Add New Client
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search clients by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#062b23]"
          />
          <Search size={14} className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Contact Details</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Assigned Property</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-400">
                    No clients found.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#ffe098] text-[#062b23] flex items-center justify-center font-extrabold text-xs">
                          {client.name.charAt(0)}
                        </div>
                        {client.name}
                      </div>
                    </td>
                    <td className="py-3 px-4 space-y-0.5">
                      <div className="flex items-center gap-1 text-gray-700 font-medium">
                        <Phone size={12} className="text-gray-400" /> {client.phone}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-[11px]">
                        <Mail size={12} className="text-gray-400" /> {client.email}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-gray-400" /> {client.address}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-full font-semibold text-[11px]">
                        {client.assignedProperty || "General Buyer"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400">{client.createdDate}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(client)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete client record for "${client.name}"?`)) {
                              deleteClient(client.id);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#062b23]">
                {editingId ? "Edit Client Details" : "Register New Client"}
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Phone Number
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
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Assigned Property
                </label>
                <input
                  type="text"
                  value={formData.assignedProperty}
                  onChange={(e) => setFormData({ ...formData, assignedProperty: e.target.value })}
                  placeholder="e.g. Luxury Villa in Bahria Orchard"
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs"
                />
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
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;
