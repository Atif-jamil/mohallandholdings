/* src/crm/pages/Dashboard.jsx */
import React from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  UserCheck,
  Target,
  MessageSquare,
  Calendar,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { useCRM } from "../../context/CRMContext";
import { BarChart, StatusDonutChart } from "../components/ChartComponents";

const Dashboard = () => {
  const { properties, clients, consultants, leads, contactMessages, appointments } = useCRM();

  // Metrics calculation
  const totalProperties = properties.length;
  const availableProperties = properties.filter((p) => p.status === "Available").length;
  const soldProperties = properties.filter((p) => p.status === "Sold").length;
  const rentedProperties = properties.filter((p) => p.status === "Rented").length;
  const featuredProperties = properties.filter((p) => p.featured).length;

  const totalClients = clients.length;
  const totalConsultants = consultants.length;
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === "New").length;
  const todayInquiries = contactMessages.length;

  // Revenue estimation
  const monthlyRevenueData = [
    { label: "Mar", value: 18, formattedValue: "18M" },
    { label: "Apr", value: 24, formattedValue: "24M" },
    { label: "May", value: 30, formattedValue: "30M" },
    { label: "Jun", value: 38, formattedValue: "38M" },
    { label: "Jul", value: 45, formattedValue: "45M" },
    { label: "Aug", value: 52, formattedValue: "52M" },
  ];

  const salesTrendData = [
    { label: "Mar", value: 4, color: "#062b23" },
    { label: "Apr", value: 6, color: "#062b23" },
    { label: "May", value: 9, color: "#062b23" },
    { label: "Jun", value: 12, color: "#062b23" },
    { label: "Jul", value: 15, color: "#062b23" },
    { label: "Aug", value: 18, color: "#ffe098" },
  ];

  const metricCards = [
    {
      title: "Total Properties",
      value: totalProperties,
      subtitle: `${availableProperties} Available | ${soldProperties} Sold`,
      icon: Building2,
      bgColor: "bg-emerald-500",
      textColor: "text-emerald-500",
      lightBg: "bg-emerald-50",
      link: "/crm/properties",
    },
    {
      title: "Active Clients",
      value: totalClients,
      subtitle: `${totalClients} Registered Clients`,
      icon: Users,
      bgColor: "bg-blue-500",
      textColor: "text-blue-500",
      lightBg: "bg-blue-50",
      link: "/crm/clients",
    },
    {
      title: "Total Clients",
      value: totalClients,
      subtitle: `${totalClients} Registered Clients`,
      icon: Users,
      bgColor: "bg-amber-500",
      textColor: "text-amber-500",
      lightBg: "bg-amber-50",
      link: "/crm/clients",
    },
    {
      title: "Today's Inquiries",
      value: todayInquiries,
      subtitle: `${contactMessages.filter((m) => !m.read).length} Unread Messages`,
      icon: MessageSquare,
      bgColor: "bg-purple-500",
      textColor: "text-purple-500",
      lightBg: "bg-purple-50",
      link: "/crm/messages",
    },
    {
      title: "Active Consultants",
      value: totalConsultants,
      subtitle: "Professional Advisory Team",
      icon: UserCheck,
      bgColor: "bg-[#062b23]",
      textColor: "text-[#062b23]",
      lightBg: "bg-[#ffe098]/30",
      link: "/crm/consultants",
    },
    {
      title: "Monthly Revenue",
      value: "PKR 52M",
      subtitle: "+15.5% vs previous month",
      icon: DollarSign,
      bgColor: "bg-[#062b23]",
      textColor: "text-[#062b23]",
      lightBg: "bg-[#ffe098]/30",
      link: "/crm/reports",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#062b23] via-[#0a4a3d] to-[#0d5f4f] rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl">
          <span className="inline-block px-3 py-1 bg-[#ffe098] text-[#062b23] font-bold text-xs rounded-full uppercase tracking-wider mb-3">
            Real Estate CRM Dashboard
          </span>
          <h1 className="text-3xl font-extrabold mb-2">Welcome to Mohal Landholdings CRM</h1>
          <p className="text-gray-200 text-sm leading-relaxed">
            Monitor real-time property performance, client portfolios, inquiry messages, and track monthly sales metrics.
          </p>
        </div>

        <div className="relative z-10 flex gap-3 flex-wrap">
          <Link
            to="/crm/properties"
            className="px-5 py-3 bg-[#ffe098] text-[#062b23] rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg flex items-center gap-2"
          >
            <Plus size={16} /> Add Property
          </Link>
          <Link
            to="/crm/messages"
            className="px-5 py-3 bg-white/10 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
          >
            <MessageSquare size={16} /> View Messages
          </Link>
        </div>

        {/* Decorative subtle background shape */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#ffe098]/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${card.lightBg} ${card.textColor} flex items-center justify-center`}>
                  <Icon size={24} />
                </div>
                <ArrowUpRight size={18} className="text-gray-400 group-hover:text-[#062b23] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <div className="text-3xl font-extrabold text-gray-900 mb-1">{card.value}</div>
              <div className="font-bold text-sm text-gray-700 mb-1">{card.title}</div>
              <div className="text-xs text-gray-400">{card.subtitle}</div>
            </Link>
          );
        })}
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales & Revenue Chart */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900">Monthly Sales Volume</h3>
              <p className="text-xs text-gray-400">Total properties closed per month</p>
            </div>
            <span className="p-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold flex items-center gap-1">
              <TrendingUp size={14} /> +24% YoY
            </span>
          </div>
          <BarChart data={salesTrendData} />
        </div>

        {/* Property Status Distribution */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900">Property Inventory Status</h3>
              <p className="text-xs text-gray-400">Current breakdown of listings</p>
            </div>
            <Link to="/crm/properties" className="text-xs font-bold text-[#062b23] hover:underline">
              View All
            </Link>
          </div>
          <StatusDonutChart
            available={availableProperties}
            sold={soldProperties}
            rented={rentedProperties}
            featured={featuredProperties}
          />
        </div>
      </div>

      {/* Recent Activity & Quick Inquiries Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Website Inquiries */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg text-gray-900">Recent Website Inquiries</h3>
              <p className="text-xs text-gray-400">Forms submitted by potential buyers</p>
            </div>
            <Link to="/crm/messages" className="text-xs font-bold text-[#062b23] hover:underline">
              Manage All Messages
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 uppercase font-semibold">
                  <th className="py-3 px-3">Client</th>
                  <th className="py-3 px-3">Contact</th>
                  <th className="py-3 px-3">Subject</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {contactMessages.slice(0, 5).map((msg) => (
                  <tr key={msg.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-gray-800">{msg.name}</td>
                    <td className="py-3 px-3 text-gray-600">{msg.phone}</td>
                    <td className="py-3 px-3 text-gray-600 truncate max-w-[150px]">{msg.subject}</td>
                    <td className="py-3 px-3 text-gray-400">{msg.date}</td>
                    <td className="py-3 px-3 text-right">
                      <span
                        className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          msg.read ? "bg-gray-100 text-gray-600" : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {msg.read ? "Read" : "Unread"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Upcoming Appointments */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg text-gray-900">Site Appointments</h3>
                <p className="text-xs text-gray-400">Scheduled property tours</p>
              </div>
              <Calendar size={18} className="text-[#062b23]" />
            </div>

            <div className="space-y-4">
              {appointments.slice(0, 3).map((apt) => (
                <div key={apt.id} className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                  <div className="p-2 bg-[#ffe098] text-[#062b23] rounded-xl font-bold text-xs flex-shrink-0 mt-0.5">
                    <Calendar size={16} />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-bold text-xs text-gray-900 truncate">{apt.clientName}</h4>
                    <p className="text-[11px] text-gray-500 truncate">{apt.propertyTitle}</p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1">
                      <span>{apt.date} at {apt.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/crm/appointments"
            className="mt-6 w-full py-2.5 bg-gray-100 text-[#062b23] rounded-xl text-center text-xs font-bold hover:bg-[#062b23] hover:text-white transition-all block"
          >
            View All Appointments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
