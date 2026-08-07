/* src/components/ProtectedRoute.jsx */
import React from "react";
import { Navigate } from "react-router-dom";
import { useCRM } from "../context/CRMContext";

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { currentUser, hasPermission } = useCRM();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl text-center border border-gray-200">
          <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl">
            !
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Restricted</h2>
          <p className="text-gray-600 text-sm mb-6">
            You do not have permission to view this CRM module. Please contact your Super Admin.
          </p>
          <a
            href="/crm/dashboard"
            className="inline-block px-6 py-2.5 bg-[#062b23] text-white rounded-xl font-semibold hover:bg-[#ffe098] hover:text-[#062b23] transition-colors text-sm"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
