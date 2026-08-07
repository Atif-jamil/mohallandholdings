/* App.jsx - Complete Website + Integrated CRM Routing */
import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import LoadingSpinner from "./components/LoadingSpinner";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { CRMProvider } from "./context/CRMContext";

// CRM Layout & Pages
import CRMLayout from "./crm/components/CRMLayout";
import Dashboard from "./crm/pages/Dashboard";
import PropertyManagement from "./crm/pages/PropertyManagement";
import ClientManagement from "./crm/pages/ClientManagement";
import ConsultantManagement from "./crm/pages/ConsultantManagement";
import LeadsManagement from "./crm/pages/LeadsManagement";
import ContactMessages from "./crm/pages/ContactMessages";
import AppointmentBooking from "./crm/pages/AppointmentBooking";
import TestimonialManagement from "./crm/pages/TestimonialManagement";
import WebsiteCMS from "./crm/pages/WebsiteCMS";
import UserManagement from "./crm/pages/UserManagement";
import Reports from "./crm/pages/Reports";
import Settings from "./crm/pages/Settings";

// Public Website Lazy-loaded Pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Profiles = lazy(() => import("./pages/Profiles"));
const Properties = lazy(() => import("./pages/Properties"));
const Villas = lazy(() => import("./pages/Villas"));
const Houses = lazy(() => import("./pages/Houses"));
const Apartments = lazy(() => import("./pages/Apartments"));
const Plots = lazy(() => import("./pages/Plots"));
const Rentals = lazy(() => import("./pages/Rentals"));
const Contact = lazy(() => import("./pages/Contact"));
const Videos = lazy(() => import("./pages/Videos"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));

function AppContent() {
  const location = useLocation();
  const isCrmOrLogin = location.pathname.startsWith("/crm") || location.pathname === "/login";

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {!isCrmOrLogin && <Navbar />}

      <main className={`flex-grow ${!isCrmOrLogin ? "pt-20" : ""}`}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Website Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/villas" element={<Villas />} />
            <Route path="/houses" element={<Houses />} />
            <Route path="/apartments" element={<Apartments />} />
            <Route path="/plots" element={<Plots />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/property/:id" element={<PropertyDetail />} />

            {/* Auth Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected CRM Routes */}
            <Route
              path="/crm"
              element={
                <ProtectedRoute>
                  <CRMLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route
                path="properties"
                element={
                  <ProtectedRoute requiredPermission="properties">
                    <PropertyManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="clients"
                element={
                  <ProtectedRoute requiredPermission="clients">
                    <ClientManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="consultants"
                element={
                  <ProtectedRoute requiredPermission="consultants">
                    <ConsultantManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="leads"
                element={
                  <ProtectedRoute requiredPermission="leads">
                    <LeadsManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="messages"
                element={
                  <ProtectedRoute requiredPermission="messages">
                    <ContactMessages />
                  </ProtectedRoute>
                }
              />
              <Route
                path="appointments"
                element={
                  <ProtectedRoute requiredPermission="appointments">
                    <AppointmentBooking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="testimonials"
                element={
                  <ProtectedRoute requiredPermission="testimonials">
                    <TestimonialManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="cms"
                element={
                  <ProtectedRoute requiredPermission="cms">
                    <WebsiteCMS />
                  </ProtectedRoute>
                }
              />
              <Route
                path="users"
                element={
                  <ProtectedRoute requiredPermission="users">
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="reports"
                element={
                  <ProtectedRoute requiredPermission="reports">
                    <Reports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="settings"
                element={
                  <ProtectedRoute requiredPermission="settings">
                    <Settings />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {!isCrmOrLogin && <Footer />}
      {!isCrmOrLogin && <WhatsAppButton />}
    </div>
  );
}

function App() {
  return (
    <CRMProvider>
      <AppContent />
    </CRMProvider>
  );
}

export default App;