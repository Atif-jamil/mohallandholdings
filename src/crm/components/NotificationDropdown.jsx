/* src/crm/components/NotificationDropdown.jsx */
import React, { useState, useRef, useEffect } from "react";
import { Bell, CheckCheck, Trash2, ShieldAlert, Building2, UserPlus, Calendar } from "lucide-react";
import { useCRM } from "../../context/CRMContext";

const NotificationDropdown = () => {
  const { notifications, markNotificationRead, clearAllNotifications } = useCRM();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "lead":
        return <UserPlus size={16} className="text-amber-600" />;
      case "property":
        return <Building2 size={16} className="text-emerald-600" />;
      case "appointment":
        return <Calendar size={16} className="text-blue-600" />;
      default:
        return <ShieldAlert size={16} className="text-[#062b23]" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-[#062b23] transition-all cursor-pointer shadow-sm"
        title="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white font-bold text-xs rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          <div className="p-4 bg-[#062b23] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell size={18} className="text-[#ffe098]" />
              <h3 className="font-bold text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-[#ffe098] text-[#062b23] font-bold text-xs rounded-full">
                  {unreadCount} New
                </span>
              )}
            </div>
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="text-xs text-gray-300 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <Trash2 size={14} /> Clear
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                No notifications right now
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`p-4 transition-colors cursor-pointer flex gap-3 items-start ${
                    n.read ? "bg-white hover:bg-gray-50" : "bg-amber-50/50 hover:bg-amber-50"
                  }`}
                >
                  <div className="p-2 bg-gray-100 rounded-xl flex-shrink-0 mt-0.5">
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-xs text-gray-800">{n.title}</h4>
                      <span className="text-[10px] text-gray-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-snug">{n.message}</p>
                  </div>
                  {!n.read && (
                    <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
