/* src/crm/pages/Settings.jsx */
import React, { useState } from "react";
import { Settings as SettingsIcon, Save, KeyRound, Shield, CheckCircle, Sparkles } from "lucide-react";
import { useCRM } from "../../context/CRMContext";

const Settings = () => {
  const { settings, updateSettings, currentUser, changeUserPassword } = useCRM();

  const [companyName, setCompanyName] = useState(settings.companyName || "Mohal Landholdings");
  const [tagline, setTagline] = useState(settings.tagline || "Your Premier Real Estate Partner");
  const [currency, setCurrency] = useState(settings.currency || "PKR");
  const [autoTimeoutMinutes, setAutoTimeoutMinutes] = useState(settings.autoTimeoutMinutes || 30);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passMsg, setPassMsg] = useState("");
  const [passErr, setPassErr] = useState("");
  const [settingsMsg, setSettingsMsg] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings({
      companyName,
      tagline,
      currency,
      autoTimeoutMinutes: Number(autoTimeoutMinutes),
    });
    setSettingsMsg(true);
    setTimeout(() => setSettingsMsg(false), 3000);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPassMsg("");
    setPassErr("");

    if (newPassword !== confirmPassword) {
      setPassErr("New passwords do not match!");
      return;
    }

    if (newPassword.length < 6) {
      setPassErr("Password must be at least 6 characters long.");
      return;
    }

    try {
      await changeUserPassword(currentUser.id, oldPassword, newPassword);
      setPassMsg("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPassErr(err.message || "Failed to update password.");
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">CRM System Settings</h1>
        <p className="text-xs text-gray-500">Configure company metadata, security passwords, and session timeout</p>
      </div>

      {settingsMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <Sparkles size={16} /> System settings saved successfully.
        </div>
      )}

      {/* Change Password Form */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-[#062b23] flex items-center gap-2 border-b border-gray-100 pb-3">
          <KeyRound size={18} /> Security & Account Password
        </h3>

        {passMsg && (
          <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold">
            {passMsg}
          </div>
        )}
        {passErr && (
          <div className="p-3 bg-rose-50 text-rose-800 border border-rose-200 rounded-xl text-xs font-bold">
            {passErr}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-[#062b23] text-[#ffe098] rounded-xl font-bold text-xs hover:bg-[#0a4a3d] hover:text-white transition-all shadow-md cursor-pointer"
          >
            Update My Password
          </button>
        </form>
      </div>

      {/* System Settings Form */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-[#062b23] flex items-center gap-2 border-b border-gray-100 pb-3">
          <SettingsIcon size={18} /> System & Company Branding
        </h3>

        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Default Currency
              </label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Auto Session Timeout (Minutes)
              </label>
              <input
                type="number"
                value={autoTimeoutMinutes}
                onChange={(e) => setAutoTimeoutMinutes(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-[#062b23] text-[#ffe098] rounded-xl font-bold text-xs hover:bg-[#0a4a3d] hover:text-white transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <Save size={16} /> Save System Settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
