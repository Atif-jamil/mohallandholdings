/* src/crm/pages/AppointmentBooking.jsx */
import React, { useState } from "react";
import { Calendar, CheckCircle2, XCircle, Clock, Search, Phone, Mail, Building2 } from "lucide-react";
import { useCRM } from "../../context/CRMContext";

const AppointmentBooking = () => {
  const { appointments, updateAppointmentStatus } = useCRM();
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = appointments.filter(
    (a) =>
      a.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointment Bookings</h1>
          <p className="text-xs text-gray-500">Property tour & consultation requests</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search appointments by client name or property..."
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
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Property</th>
                <th className="py-3 px-4">Scheduled Date & Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-400">
                    No appointments recorded.
                  </td>
                </tr>
              ) : (
                filtered.map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900">{apt.clientName}</td>
                    <td className="py-3 px-4 space-y-0.5">
                      <div className="flex items-center gap-1 text-gray-700 font-medium">
                        <Phone size={12} className="text-gray-400" /> {apt.phone}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-[11px]">
                        <Mail size={12} className="text-gray-400" /> {apt.email}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#062b23]">
                      <div className="flex items-center gap-1.5">
                        <Building2 size={14} /> {apt.propertyTitle}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-amber-600" /> {apt.date} at {apt.time}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full font-bold text-[10px] ${
                          apt.status === "Accepted"
                            ? "bg-emerald-100 text-emerald-800"
                            : apt.status === "Rejected"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {apt.status !== "Accepted" && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, "Accepted")}
                            className="px-3 py-1 bg-emerald-600 text-white rounded-lg font-bold text-[10px] hover:bg-emerald-700 cursor-pointer"
                          >
                            Accept
                          </button>
                        )}
                        {apt.status !== "Rejected" && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, "Rejected")}
                            className="px-3 py-1 bg-rose-600 text-white rounded-lg font-bold text-[10px] hover:bg-rose-700 cursor-pointer"
                          >
                            Reject
                          </button>
                        )}
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

export default AppointmentBooking;
