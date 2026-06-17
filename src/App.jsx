/* App.jsx - Updated with Profiles route */
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import LoadingSpinner from "./components/LoadingSpinner";
import NotFound from "./pages/NotFound";

// Lazy load pages for better performance
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

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
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
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;