/* src/crm/components/CRMLayout.jsx */
import React, { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCheck,
  MessageSquare,
  Calendar,
  Quote,
  FileText,
  UserCog,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Globe,
  Shield,
  Search,
} from "lucide-react";
import { useCRM } from "../../context/CRMContext";
import NotificationDropdown from "./NotificationDropdown";
import logo from "../../assets/logo 1.png";

const CRMLayout = () => {
  const { currentUser, logout, hasPermission, settings } = useCRM();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Pipeline module completely removed as requested
  const navItems = [
    { label: "Dashboard", path: "/crm/dashboard", icon: LayoutDashboard, perm: null, superOnly: false },
    { label: "Properties", path: "/crm/properties", icon: Building2, perm: "properties", superOnly: false },
    { label: "Clients", path: "/crm/clients", icon: Users, perm: "clients", superOnly: false },
    { label: "Consultants", path: "/crm/consultants", icon: UserCheck, perm: "consultants", superOnly: false },
    { label: "Messages", path: "/crm/messages", icon: MessageSquare, perm: "messages", superOnly: false },
    { label: "Appointments", path: "/crm/appointments", icon: Calendar, perm: "appointments", superOnly: false },
    { label: "Testimonials", path: "/crm/testimonials", icon: Quote, perm: "testimonials", superOnly: false },
    { label: "Website CMS", path: "/crm/cms", icon: FileText, perm: "cms", superOnly: true },
    { label: "User Management", path: "/crm/users", icon: UserCog, perm: "users", superOnly: true },
    { label: "Reports & Analytics", path: "/crm/reports", icon: BarChart3, perm: "reports", superOnly: false },
    { label: "System Settings", path: "/crm/settings", icon: Settings, perm: "settings", superOnly: true },
  ];

  // RBAC Filtering: Completely hide restricted modules from unauthorized users
  const isSuperAdmin = currentUser?.role === "Super Admin";
  const filteredNavItems = navItems.filter((item) => {
    if (isSuperAdmin) return true;
    if (item.superOnly) return false;
    if (item.perm === null) return true;
    return hasPermission(item.perm);
  });

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans antialiased text-gray-800 relative">
      {/* Fixed Desktop Sidebar (stuck to viewport left) */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#062b23] text-white flex-shrink-0 h-screen sticky top-0 shadow-2xl z-30">
        {/* Sidebar Header - High quality prominent logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="MOHAL LANDHOLDINGS Logo" className="h-12 md:h-14 w-auto object-contain brightness-0 invert" />
          </Link>
        </div>

        {/* User Status Card */}
        <div className="p-4 mx-4 my-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ffe098] text-[#062b23] flex items-center justify-center font-extrabold text-sm shadow">
            {currentUser?.name ? currentUser.name.charAt(0) : "U"}
          </div>
          <div className="flex-grow min-w-0">
            <h4 className="font-bold text-sm text-white truncate">{currentUser?.name}</h4>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#ffe098]">
              <Shield size={12} /> {currentUser?.role}
            </span>
          </div>
        </div>

        {/* Navigation Menu (Independently Scrollable) */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto pb-6 custom-scrollbar">
          <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-[#ffe098]/70">
            Navigation Menu
          </div>
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-[#ffe098] text-[#062b23] font-bold shadow-lg shadow-black/20"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} className={isActive ? "text-[#062b23]" : "text-[#ffe098]"} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-[#062b23]">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-white/10 text-white rounded-xl text-xs font-semibold hover:bg-white/20 transition-colors"
          >
            <Globe size={16} /> View Live Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-rose-600/80 text-white rounded-xl text-xs font-semibold hover:bg-rose-600 transition-colors cursor-pointer"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Right Content Area (Scrolls independently) */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-y-auto">
        {/* Top Sticky Header Bar */}
        <header className="h-20 bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {mobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 font-medium">
              <span>{settings.companyName || "Mohal Landholdings"}</span>
              <span>/</span>
              <span className="text-[#062b23] font-bold uppercase tracking-wide">
                {location.pathname.replace("/crm/", "").replace("-", " ") || "Dashboard"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block w-64">
              <input
                type="text"
                placeholder="Search CRM..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#062b23] transition-all"
              />
              <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
            </div>

            <NotificationDropdown />

            <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
              <div className="hidden md:block text-right">
                <div className="text-xs font-bold text-gray-800">{currentUser?.name}</div>
                <div className="text-[10px] text-amber-700 font-bold uppercase">{currentUser?.role}</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#062b23] text-[#ffe098] font-bold flex items-center justify-center text-xs shadow">
                {currentUser?.name ? currentUser.name.charAt(0) : "U"}
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex">
            <div className="w-72 bg-[#062b23] text-white flex flex-col h-full shadow-2xl">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <img src={logo} alt="MOHAL LANDHOLDINGS" className="h-10 w-auto object-contain brightness-0 invert" />
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
                {filteredNavItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                        isActive
                          ? "bg-[#ffe098] text-[#062b23] font-bold"
                          : "text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      <Icon size={18} className={isActive ? "text-[#062b23]" : "text-[#ffe098]"} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-white/10 space-y-2">
                <Link
                  to="/"
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full py-2 bg-white/10 text-white rounded-xl text-xs"
                >
                  <Globe size={14} /> Live Website
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full py-2 bg-rose-600/80 text-white rounded-xl text-xs"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CRMLayout;
