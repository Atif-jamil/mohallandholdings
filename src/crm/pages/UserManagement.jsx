/* src/crm/pages/UserManagement.jsx */
import React, { useState } from "react";
import { UserCog, Plus, Shield, Search, KeyRound, Trash2, Edit, Check, X, ShieldAlert } from "lucide-react";
import { useCRM } from "../../context/CRMContext";

const ALL_PERMISSIONS = [
  { key: "properties", label: "Properties Management" },
  { key: "clients", label: "Client Database" },
  { key: "consultants", label: "Consultant Directory" },
  { key: "leads", label: "Leads Pipeline" },
  { key: "messages", label: "Contact Inquiries" },
  { key: "appointments", label: "Appointments" },
  { key: "testimonials", label: "Testimonials" },
  { key: "cms", label: "Website CMS Editor" },
  { key: "users", label: "User Management (RBAC)" },
  { key: "reports", label: "Reports & Analytics" },
  { key: "settings", label: "System Settings" },
];

const UserManagement = () => {
  const { users, currentUser, addUser, updateUser, deleteUser, changeUserPassword } = useCRM();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Staff",
    status: "Active",
    password: "",
    permissions: {
      properties: true,
      clients: true,
      consultants: true,
      leads: true,
      messages: true,
      appointments: true,
      testimonials: true,
      cms: false,
      users: false,
      reports: true,
      settings: false,
    },
  });

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      email: "",
      phone: "+92 300 ",
      role: "Staff",
      status: "Active",
      password: "mohal1234",
      permissions: {
        properties: true,
        clients: true,
        consultants: true,
        leads: true,
        messages: true,
        appointments: true,
        testimonials: true,
        cms: false,
        users: false,
        reports: true,
        settings: false,
      },
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (u) => {
    setEditingId(u.id);
    setFormData({
      name: u.name || "",
      email: u.email || "",
      phone: u.phone || "",
      role: u.role || "Staff",
      status: u.status || "Active",
      password: "",
      permissions: u.permissions || {
        properties: true,
        clients: true,
        consultants: true,
        leads: true,
        messages: true,
        appointments: true,
        testimonials: true,
        cms: false,
        users: false,
        reports: true,
        settings: false,
      },
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      updateUser(editingId, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        status: formData.status,
        permissions: formData.permissions,
      });
      if (formData.password) {
        await changeUserPassword(editingId, null, formData.password);
      }
    } else {
      await addUser(formData);
    }
    setIsModalOpen(false);
  };

  const handleTogglePerm = (permKey) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permKey]: !prev.permissions[permKey],
      },
    }));
  };

  if (currentUser?.role !== "Super Admin") {
    return (
      <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center max-w-md mx-auto my-12">
        <ShieldAlert size={48} className="text-amber-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Restricted Super Admin Area</h2>
        <p className="text-xs text-gray-500">
          Only the Super Admin (`atifkhan@mohalland.com`) can create users, assign roles, and configure system permissions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management & Permissions</h1>
          <p className="text-xs text-gray-500">Role-based Access Control (Super Admin, Admin, Staff)</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#062b23] text-[#ffe098] rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#0a4a3d] hover:text-white transition-all shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Plus size={16} /> Create User Account
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search users by name or email..."
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
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Login</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 font-bold text-gray-900">
                      <div className="w-8 h-8 rounded-full bg-[#062b23] text-[#ffe098] flex items-center justify-center font-extrabold text-xs shadow">
                        {u.name.charAt(0)}
                      </div>
                      {u.name}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{u.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        u.role === "Super Admin"
                          ? "bg-purple-100 text-purple-900"
                          : u.role === "Admin"
                          ? "bg-amber-100 text-amber-900"
                          : "bg-blue-100 text-blue-900"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        u.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{u.lastLogin || "Never"}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(u)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                      >
                        <Edit size={16} />
                      </button>
                      {u.email !== "atifkhan@mohalland.com" && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete user "${u.name}"?`)) {
                              deleteUser(u.id);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#062b23]">
                {editingId ? "Edit User Account & Permissions" : "Create New CRM Account"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-bold"
                  >
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-bold"
                  >
                    <option value="Active">Active</option>
                    <option value="Deactivated">Deactivated</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  {editingId ? "Reset Password (Leave blank to keep current)" : "Initial Password"}
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-2">
                  Module Permissions
                </label>
                <div className="grid grid-cols-2 gap-2 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  {ALL_PERMISSIONS.map((p) => {
                    const isChecked = Boolean(formData.permissions[p.key]);
                    return (
                      <label
                        key={p.key}
                        className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleTogglePerm(p.key)}
                          className="w-4 h-4 text-[#062b23] rounded"
                        />
                        {p.label}
                      </label>
                    );
                  })}
                </div>
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
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
