/* src/crm/pages/WebsiteCMS.jsx */
import React, { useState } from "react";
import { FileText, Save, Globe, Phone, Mail, MapPin, Share2, Sparkles } from "lucide-react";
import { useCRM } from "../../context/CRMContext";

const WebsiteCMS = () => {
  const { cms, updateCMS } = useCRM();
  const [formData, setFormData] = useState({ ...cms });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCMS(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Website Content Management (CMS)</h1>
          <p className="text-xs text-gray-500">Edit public website hero text, about section, contact info & links</p>
        </div>
        <button
          onClick={handleSubmit}
          className="px-5 py-2.5 bg-[#062b23] text-[#ffe098] rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#0a4a3d] hover:text-white transition-all shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Save size={16} /> Save Changes Live
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <Sparkles size={16} /> Website CMS content updated live! Changes are now visible on the public website.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hero Section CMS */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-[#062b23] flex items-center gap-2 border-b border-gray-100 pb-3">
            <Globe size={18} /> Hero Section Options
          </h3>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
              Hero Headline Title
            </label>
            <input
              type="text"
              value={formData.heroTitle || ""}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
              Hero Subtitle / Description
            </label>
            <textarea
              rows="2"
              value={formData.heroSubtitle || ""}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
            />
          </div>
        </div>

        {/* Contact Info CMS */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-[#062b23] flex items-center gap-2 border-b border-gray-100 pb-3">
            <Phone size={18} /> Company Contact Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
              Office Physical Address
            </label>
            <input
              type="text"
              value={formData.address || ""}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
            />
          </div>
        </div>

        {/* Social Links CMS */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-[#062b23] flex items-center gap-2 border-b border-gray-100 pb-3">
            <Share2 size={18} /> Social Media Links & Footer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Facebook URL
              </label>
              <input
                type="text"
                value={formData.facebookUrl || ""}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Instagram URL
              </label>
              <input
                type="text"
                value={formData.instagramUrl || ""}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                YouTube URL
              </label>
              <input
                type="text"
                value={formData.youtubeUrl || ""}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
              Footer Tagline
            </label>
            <input
              type="text"
              value={formData.footerTagline || ""}
              onChange={(e) => setFormData({ ...formData, footerTagline: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default WebsiteCMS;
