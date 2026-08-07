/* src/crm/pages/LeadsManagement.jsx */
import React, { useState } from "react";
import { Target, Search, Phone, Mail, Clock, CheckCircle2, UserPlus, Trash2, Edit } from "lucide-react";
import { useCRM } from "../../context/CRMContext";

const LEAD_STATUSES = ["New", "Contacted", "Follow-Up", "Closed"];

const LeadsManagement = () => {
  const { leads, updateLeadStatus, deleteLead, addClient } = useCRM();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      l.propertyInterest.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || l.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleConvertToClient = (lead) => {
    addClient({
      name: lead.name,
      phone: lead.phone,
      whatsapp: lead.phone,
      email: lead.email,
      address: "Lahore",
      assignedProperty: lead.propertyInterest,
      notes: `Converted from Lead (${lead.source}). Original notes: ${lead.notes || "None"}`,
    });
    updateLeadStatus(lead.id, "Closed", "Converted into registered Client.");
    alert(`Lead "${lead.name}" converted into a Client successfully!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads Pipeline</h1>
          <p className="text-xs text-gray-500">Track and manage automated website inquiries & tour leads</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative max-w-md w-full">
          <input
            type="text"
            placeholder="Search leads by name, phone, property..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#062b23]"
          />
          <Search size={14} className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div className="flex gap-2">
          {["All", ...LEAD_STATUSES].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedStatus === status
                  ? "bg-[#062b23] text-[#ffe098]"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Lead Name</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Property Interest</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-400">
                    No leads found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-extrabold text-xs">
                          {lead.name.charAt(0)}
                        </div>
                        {lead.name}
                      </div>
                    </td>
                    <td className="py-3 px-4 space-y-0.5">
                      <div className="flex items-center gap-1 text-gray-700 font-medium">
                        <Phone size={12} className="text-gray-400" /> {lead.phone}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-[11px]">
                        <Mail size={12} className="text-gray-400" /> {lead.email}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#062b23]">
                      {lead.propertyInterest}
                    </td>
                    <td className="py-3 px-4 text-gray-500">{lead.source}</td>
                    <td className="py-3 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer ${
                          lead.status === "New"
                            ? "bg-amber-100 text-amber-900 border-amber-300"
                            : lead.status === "Contacted"
                            ? "bg-blue-100 text-blue-900 border-blue-300"
                            : lead.status === "Follow-Up"
                            ? "bg-purple-100 text-purple-900 border-purple-300"
                            : "bg-emerald-100 text-emerald-900 border-emerald-300"
                        }`}
                      >
                        {LEAD_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {lead.status !== "Closed" && (
                          <button
                            onClick={() => handleConvertToClient(lead)}
                            className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg font-bold text-[11px] hover:bg-emerald-700 transition-colors flex items-center gap-1 cursor-pointer"
                            title="Convert to Client"
                          >
                            <UserPlus size={12} /> Convert Client
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete lead "${lead.name}"?`)) {
                              deleteLead(lead.id);
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
    </div>
  );
};

export default LeadsManagement;
