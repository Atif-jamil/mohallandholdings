/* src/crm/pages/ContactMessages.jsx */
import React, { useState } from "react";
import { MessageSquare, Search, Trash2, CheckCircle, Mail, Phone, Download } from "lucide-react";
import { useCRM } from "../../context/CRMContext";
import { exportToCSV } from "../../utils/crypto";

const ContactMessages = () => {
  const { contactMessages, markMessageRead, deleteMessage } = useCRM();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMessages = contactMessages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    exportToCSV("Contact_Messages_Export", contactMessages, {
      name: "Client Name",
      email: "Email Address",
      phone: "Phone Number",
      subject: "Inquiry Subject",
      message: "Message Body",
      date: "Submission Date",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Website Contact Messages</h1>
          <p className="text-xs text-gray-500">Inquiries submitted directly from website forms</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 bg-[#062b23] text-[#ffe098] rounded-xl font-bold text-xs hover:bg-[#0a4a3d] hover:text-white transition-all shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search messages by name, email, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#062b23]"
          />
          <Search size={14} className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center text-gray-400 text-sm">
            No contact messages found.
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-6 rounded-2xl border transition-all ${
                msg.read
                  ? "bg-white border-gray-200 shadow-sm"
                  : "bg-amber-50/50 border-amber-200 shadow-md ring-1 ring-amber-300"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-gray-100 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#062b23] text-[#ffe098] flex items-center justify-center font-bold text-sm shadow">
                    {msg.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">{msg.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Mail size={12} /> {msg.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone size={12} /> {msg.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{msg.date}</span>
                  {!msg.read && (
                    <button
                      onClick={() => markMessageRead(msg.id)}
                      className="px-3 py-1 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle size={14} /> Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (window.confirm("Delete this message?")) {
                        deleteMessage(msg.id);
                      }
                    }}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs text-[#062b23] mb-1">Subject: {msg.subject}</h4>
                <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                  {msg.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactMessages;
