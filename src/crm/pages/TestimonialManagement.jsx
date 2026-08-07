/* src/crm/pages/TestimonialManagement.jsx */
import React, { useState } from "react";
import { Quote, Plus, Star, Edit, Trash2, X, Eye, EyeOff } from "lucide-react";
import { useCRM } from "../../context/CRMContext";

const TestimonialManagement = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useCRM();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    location: "Lahore",
    rating: 5,
    text: "",
    status: "Published",
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      location: "Bahria Orchard, Lahore",
      rating: 5,
      text: "",
      status: "Published",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingId(t.id);
    setFormData({
      name: t.name || "",
      location: t.location || "",
      rating: t.rating || 5,
      text: t.text || "",
      status: t.status || "Published",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateTestimonial(editingId, formData);
    } else {
      addTestimonial(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Testimonials</h1>
          <p className="text-xs text-gray-500">Manage client reviews displayed on the website</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#062b23] text-[#ffe098] rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#0a4a3d] hover:text-white transition-all shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <button
                  onClick={() =>
                    updateTestimonial(t.id, {
                      status: t.status === "Published" ? "Hidden" : "Published",
                    })
                  }
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer flex items-center gap-1 ${
                    t.status === "Published"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {t.status === "Published" ? <Eye size={12} /> : <EyeOff size={12} />}
                  {t.status}
                </button>
              </div>

              <Quote className="text-[#ffe098] w-8 h-8 mb-2" />
              <p className="text-xs text-gray-600 leading-relaxed mb-4">"{t.text}"</p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-gray-900">{t.name}</h4>
                <span className="text-[10px] text-gray-400">{t.location}</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Delete testimonial?")) {
                      deleteTestimonial(t.id);
                    }
                  }}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#062b23]">
                {editingId ? "Edit Testimonial" : "Add Testimonial"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Client Name
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
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Rating (1-5 Stars)
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs"
                >
                  <option value={5}>5 Stars - Outstanding</option>
                  <option value={4}>4 Stars - Great</option>
                  <option value={3}>3 Stars - Good</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Review Content
                </label>
                <textarea
                  rows="3"
                  required
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
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
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialManagement;
