/* src/crm/pages/Reports.jsx */
import React, { useState } from "react";
import { BarChart3, Download, FileSpreadsheet, Filter, Printer } from "lucide-react";
import { useCRM } from "../../context/CRMContext";
import { exportToCSV } from "../../utils/crypto";

const Reports = () => {
  const { properties, clients, leads, contactMessages } = useCRM();
  const [reportType, setReportType] = useState("properties");

  const handleExportCSV = () => {
    if (reportType === "properties") {
      exportToCSV("Properties_Report", properties, {
        title: "Title",
        category: "Category",
        price: "Price",
        status: "Status",
        location: "Location",
        area: "Area",
      });
    } else if (reportType === "clients") {
      exportToCSV("Clients_Report", clients, {
        name: "Name",
        phone: "Phone",
        email: "Email",
        address: "Address",
        assignedProperty: "Property",
      });
    } else {
      exportToCSV("Leads_Report", leads, {
        name: "Lead Name",
        phone: "Phone",
        email: "Email",
        propertyInterest: "Interest",
        status: "Status",
        date: "Date",
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports Generator</h1>
          <p className="text-xs text-gray-500">Export inventory, client portfolios, and lead performance</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold text-xs hover:bg-gray-200 flex items-center gap-2 cursor-pointer"
          >
            <Printer size={16} /> Print / Save PDF
          </button>
          <button
            onClick={handleExportCSV}
            className="px-5 py-2.5 bg-[#062b23] text-[#ffe098] rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#0a4a3d] hover:text-white transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Download size={16} /> Export to Excel (CSV)
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex gap-3">
        <button
          onClick={() => setReportType("properties")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            reportType === "properties"
              ? "bg-[#062b23] text-[#ffe098]"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Property Inventory Report ({properties.length})
        </button>
        <button
          onClick={() => setReportType("clients")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            reportType === "clients"
              ? "bg-[#062b23] text-[#ffe098]"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Client Directory Report ({clients.length})
        </button>
        <button
          onClick={() => setReportType("leads")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            reportType === "leads"
              ? "bg-[#062b23] text-[#ffe098]"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Leads Pipeline Report ({leads.length})
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6">
        <h3 className="font-bold text-base text-[#062b23] mb-4 uppercase tracking-wider">
          Report Preview: {reportType}
        </h3>

        {reportType === "properties" && (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b font-bold text-gray-600">
                <th className="py-2.5 px-3">Title</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Price</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {properties.map((p) => (
                <tr key={p.id}>
                  <td className="py-2.5 px-3 font-semibold">{p.title}</td>
                  <td className="py-2.5 px-3 uppercase">{p.category}</td>
                  <td className="py-2.5 px-3 font-bold text-[#062b23]">{p.price}</td>
                  <td className="py-2.5 px-3">{p.location}</td>
                  <td className="py-2.5 px-3 font-bold">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {reportType === "clients" && (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b font-bold text-gray-600">
                <th className="py-2.5 px-3">Client Name</th>
                <th className="py-2.5 px-3">Phone</th>
                <th className="py-2.5 px-3">Email</th>
                <th className="py-2.5 px-3">Address</th>
                <th className="py-2.5 px-3">Property</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {clients.map((c) => (
                <tr key={c.id}>
                  <td className="py-2.5 px-3 font-semibold">{c.name}</td>
                  <td className="py-2.5 px-3">{c.phone}</td>
                  <td className="py-2.5 px-3">{c.email}</td>
                  <td className="py-2.5 px-3">{c.address}</td>
                  <td className="py-2.5 px-3 font-bold">{c.assignedProperty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {reportType === "leads" && (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b font-bold text-gray-600">
                <th className="py-2.5 px-3">Lead Name</th>
                <th className="py-2.5 px-3">Phone</th>
                <th className="py-2.5 px-3">Property Interest</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {leads.map((l) => (
                <tr key={l.id}>
                  <td className="py-2.5 px-3 font-semibold">{l.name}</td>
                  <td className="py-2.5 px-3">{l.phone}</td>
                  <td className="py-2.5 px-3">{l.propertyInterest}</td>
                  <td className="py-2.5 px-3 font-bold">{l.status}</td>
                  <td className="py-2.5 px-3">{l.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Reports;
