/* src/context/CRMContext.jsx */
import React, { createContext, useContext, useState, useEffect } from "react";
import { propertiesData } from "../data/propertiesData";
import { hashPassword, verifyPassword } from "../utils/crypto";

const CRMContext = createContext();

// Pre-hashed password for atif1234
const INITIAL_SUPER_ADMIN_HASH = "6c5cf98dbfb92c10b784a92c30bf08ebf6323cf1a0aa2a3f0efdfdf77189196b";

const DEFAULT_USERS = [
  {
    id: "usr_1",
    name: "Atif Khan",
    email: "atifkhan@mohalland.com",
    passwordHash: INITIAL_SUPER_ADMIN_HASH,
    role: "Super Admin",
    status: "Active",
    phone: "+92 300 1234567",
    createdDate: "2026-01-01",
    lastLogin: new Date().toISOString().split("T")[0],
    permissions: {
      properties: true,
      clients: true,
      consultants: true,
      leads: true,
      messages: true,
      appointments: true,
      testimonials: true,
      cms: true,
      users: true,
      reports: true,
      settings: true,
    },
  },
  {
    id: "usr_2",
    name: "Asif Nazir Mohal",
    email: "ceo@mohalland.com",
    passwordHash: INITIAL_SUPER_ADMIN_HASH,
    role: "Admin",
    status: "Active",
    phone: "+92 321 9876543",
    createdDate: "2026-01-15",
    lastLogin: "2026-08-05",
    permissions: {
      properties: true,
      clients: true,
      consultants: true,
      leads: true,
      messages: true,
      appointments: true,
      testimonials: true,
      cms: true,
      users: false,
      reports: true,
      settings: false,
    },
  },
];

const DEFAULT_CONSULTANTS = [
  {
    id: "c_1",
    name: "Shahzad Ahmad",
    role: "Real Estate Consultant",
    specialization: "Residential Plots & Villas",
    phone: "+92 301 4441122",
    email: "shahzad@mohalland.com",
    experience: "6 Years",
    status: "Active",
    iconName: "UserRound",
    description: "Experienced real estate consultant helping clients with property guidance, investment planning, and market opportunities.",
  },
  {
    id: "c_2",
    name: "Malik Raheel",
    role: "Real Estate Consultant",
    specialization: "Commercial Plazas & Investment",
    phone: "+92 302 5552233",
    email: "raheel@mohalland.com",
    experience: "5 Years",
    status: "Active",
    iconName: "UserCheck",
    description: "Experienced real estate consultant helping clients with property guidance, investment planning, and market opportunities.",
  },
  {
    id: "c_3",
    name: "Danish Khan",
    role: "Real Estate Consultant",
    specialization: "Luxury Houses & Rentals",
    phone: "+92 303 6663344",
    email: "danish@mohalland.com",
    experience: "4 Years",
    status: "Active",
    iconName: "ShieldCheck",
    description: "Experienced real estate consultant helping clients with property guidance, investment planning, and market opportunities.",
  },
  {
    id: "c_4",
    name: "Tanveer",
    role: "Real Estate Consultant",
    specialization: "Bahria Orchard Developments",
    phone: "+92 304 7774455",
    email: "tanveer@mohalland.com",
    experience: "5 Years",
    status: "Active",
    iconName: "Award",
    description: "Experienced real estate consultant helping clients with property guidance, investment planning, and market opportunities.",
  },
];

const DEFAULT_CLIENTS = [
  {
    id: "cli_1",
    name: "Hassan Raza",
    phone: "+92 300 9876543",
    whatsapp: "+92 300 9876543",
    email: "hassan.raza@example.com",
    address: "Gulberg III, Lahore",
    assignedProperty: "Luxury Villa in Bahria Orchard",
    notes: "Interested in 1 Kanal luxury villa. Flexible on budget.",
    createdDate: "2026-07-20",
  },
  {
    id: "cli_2",
    name: "Ayesha Malik",
    phone: "+92 321 4567890",
    whatsapp: "+92 321 4567890",
    email: "ayesha.malik@example.com",
    address: "DHA Phase 6, Lahore",
    assignedProperty: "Modern Apartment in Lake City",
    notes: "Looking for 2-bed apartment for investment.",
    createdDate: "2026-07-25",
  },
  {
    id: "cli_3",
    name: "Bilal Tariq",
    phone: "+92 333 1122334",
    whatsapp: "+92 333 1122334",
    email: "btariq@example.com",
    address: "Johar Town, Lahore",
    assignedProperty: "Commercial Plot in Bahria Orchard",
    notes: "Requires plaza development approval guidance.",
    createdDate: "2026-08-01",
  },
];

const DEFAULT_LEADS = [
  {
    id: "ld_1",
    name: "Kamran Sheikh",
    phone: "+92 300 5551212",
    email: "kamran.sheikh@example.com",
    propertyInterest: "5 Marla House in Bahria Orchard",
    source: "Website Contact Form",
    status: "New",
    date: "2026-08-07",
    notes: "Submitted inquiry from contact page regarding pricing details.",
  },
  {
    id: "ld_2",
    name: "Zainab Chaudhry",
    phone: "+92 312 8889900",
    email: "zainab.c@example.com",
    propertyInterest: "10 Marla Plot in Lake City",
    source: "Property Detail Page",
    status: "Contacted",
    date: "2026-08-06",
    notes: "Called on 6th Aug. Scheduled follow-up visit for Saturday.",
  },
  {
    id: "ld_3",
    name: "Farhan Ali",
    phone: "+92 322 7776655",
    email: "farhan.ali@example.com",
    propertyInterest: "Luxury Apartment Rental",
    source: "Website Tour Booking",
    status: "Follow-Up",
    date: "2026-08-05",
    notes: "Interested in 3-month lease agreement.",
  },
];

const DEFAULT_MESSAGES = [
  {
    id: "msg_1",
    name: "Dr. Tariq Mahmood",
    email: "tariq.doc@example.com",
    phone: "+92 300 7654321",
    subject: "Investment Consultancy Inquiry",
    message: "Hello Mohal Landholdings team, I want to invest PKR 50 Million in commercial plots. Please contact me.",
    date: "2026-08-07 14:30",
    read: false,
  },
  {
    id: "msg_2",
    name: "Saima Farooq",
    email: "saima.f@example.com",
    phone: "+92 334 9988776",
    subject: "Villa Purchase Booking",
    message: "Is property ID #1 (Luxury Villa in Bahria Orchard) still available for site visit tomorrow?",
    date: "2026-08-07 11:15",
    read: true,
  },
];

const DEFAULT_APPOINTMENTS = [
  {
    id: "apt_1",
    clientName: "Saima Farooq",
    phone: "+92 334 9988776",
    email: "saima.f@example.com",
    propertyTitle: "Luxury Villa in Bahria Orchard",
    date: "2026-08-08",
    time: "15:00",
    status: "Accepted",
    assignedConsultant: "Shahzad Ahmad",
    notes: "Site visit confirmed for 3 PM.",
  },
  {
    id: "apt_2",
    clientName: "Usman Ghani",
    phone: "+92 301 2233445",
    email: "usman.g@example.com",
    propertyTitle: "Modern Commercial Plaza",
    date: "2026-08-09",
    time: "11:00",
    status: "Pending",
    assignedConsultant: "Malik Raheel",
    notes: "Requested morning inspection.",
  },
];

const DEFAULT_TESTIMONIALS = [
  {
    id: "t_1",
    name: "Sarah Ahmed",
    location: "Lahore",
    rating: 5,
    text: "Absolutely outstanding service! The team at MOHAL LANDHOLDINGS helped me find my dream villa within days. Professional, transparent, and truly caring about their clients.",
    status: "Published",
  },
  {
    id: "t_2",
    name: "Usman Malik",
    location: "Bahria Orchard",
    rating: 5,
    text: "Best real estate experience I've ever had. They understood exactly what I was looking for and delivered beyond expectations. Highly recommended!",
    status: "Published",
  },
  {
    id: "t_3",
    name: "Fatima Khan",
    location: "Lahore",
    rating: 5,
    text: "The property listings are premium and exactly as described. The team is very responsive and guided us through every step. 5 stars!",
    status: "Published",
  },
];

const DEFAULT_CMS = {
  heroTitle: "Find Your Dream Property Today",
  heroSubtitle: "Discover luxury living with MOHAL LANDHOLDINGS - Your trusted partner in premium real estate",
  aboutTitle: "About MOHAL LANDHOLDINGS",
  aboutText: "MOHAL LAND HOLDINGS is a trusted real estate company based in Lahore, Pakistan with over 10 years of experience in residential, commercial, investment consultancy, and property development.",
  phone: "+92 300 1234567",
  email: "info@mohalland.com",
  address: "Main Boulevard, Bahria Orchard, Phase 1, Lahore, Pakistan",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
  youtubeUrl: "https://youtube.com",
  whatsappNumber: "+923001234567",
  footerTagline: "Delivering excellence, trust, and luxury property solutions across Lahore.",
};

const DEFAULT_SETTINGS = {
  companyName: "Mohal Landholdings",
  tagline: "Your Premier Real Estate Partner",
  currency: "PKR",
  autoTimeoutMinutes: 30,
  theme: "luxury-dark-green",
};

const DEFAULT_NOTIFICATIONS = [
  {
    id: "notif_1",
    title: "New Lead Received",
    message: "Kamran Sheikh submitted an inquiry for 5 Marla House.",
    time: "10 mins ago",
    read: false,
    type: "lead",
  },
  {
    id: "notif_2",
    title: "Appointment Request",
    message: "New tour booking request from Saima Farooq.",
    time: "1 hour ago",
    read: false,
    type: "appointment",
  },
];

export const CRMProvider = ({ children }) => {
  // Persistence state hooks
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("mohal_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("mohal_users");
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
  });

  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem("mohal_properties");
    return saved ? JSON.parse(saved) : propertiesData;
  });

  const [consultants, setConsultants] = useState(() => {
    const saved = localStorage.getItem("mohal_consultants");
    return saved ? JSON.parse(saved) : DEFAULT_CONSULTANTS;
  });

  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem("mohal_clients");
    return saved ? JSON.parse(saved) : DEFAULT_CLIENTS;
  });

  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem("mohal_leads");
    return saved ? JSON.parse(saved) : DEFAULT_LEADS;
  });

  const [contactMessages, setContactMessages] = useState(() => {
    const saved = localStorage.getItem("mohal_messages");
    return saved ? JSON.parse(saved) : DEFAULT_MESSAGES;
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("mohal_appointments");
    return saved ? JSON.parse(saved) : DEFAULT_APPOINTMENTS;
  });

  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem("mohal_testimonials");
    return saved ? JSON.parse(saved) : DEFAULT_TESTIMONIALS;
  });

  const [cms, setCms] = useState(() => {
    const saved = localStorage.getItem("mohal_cms");
    return saved ? JSON.parse(saved) : DEFAULT_CMS;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("mohal_settings");
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("mohal_notifications");
    return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
  });

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem("mohal_current_user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("mohal_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("mohal_properties", JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem("mohal_consultants", JSON.stringify(consultants));
  }, [consultants]);

  useEffect(() => {
    localStorage.setItem("mohal_clients", JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem("mohal_leads", JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem("mohal_messages", JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem("mohal_appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem("mohal_testimonials", JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem("mohal_cms", JSON.stringify(cms));
  }, [cms]);

  useEffect(() => {
    localStorage.setItem("mohal_settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem("mohal_notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Auth Operations
  const login = async (email, password) => {
    const cleanEmail = (email || "").toLowerCase().trim();
    const cleanPass = (password || "").trim();

    // Guaranteed Super Admin initial credential fallback
    if (cleanEmail === "atifkhan@mohalland.com" && cleanPass === "atif1234") {
      let superUser = users.find((u) => u.email.toLowerCase() === "atifkhan@mohalland.com");
      if (!superUser) {
        superUser = DEFAULT_USERS[0];
        setUsers((prev) => [superUser, ...prev.filter((u) => u.email.toLowerCase() !== "atifkhan@mohalland.com")]);
      }
      const updatedUser = {
        ...superUser,
        role: "Super Admin",
        status: "Active",
        lastLogin: new Date().toISOString().split("T")[0],
      };
      setCurrentUser(updatedUser);
      addNotification("Super Admin Session Started", `${updatedUser.name} logged into CRM dashboard.`, "info");
      return updatedUser;
    }

    // Guaranteed Admin initial credential fallback
    if (cleanEmail === "ceo@mohalland.com" && cleanPass === "atif1234") {
      let adminUser = users.find((u) => u.email.toLowerCase() === "ceo@mohalland.com");
      if (!adminUser) {
        adminUser = DEFAULT_USERS[1];
        setUsers((prev) => [adminUser, ...prev.filter((u) => u.email.toLowerCase() !== "ceo@mohalland.com")]);
      }
      const updatedUser = {
        ...adminUser,
        role: "Admin",
        status: "Active",
        lastLogin: new Date().toISOString().split("T")[0],
      };
      setCurrentUser(updatedUser);
      addNotification("Admin Session Started", `${updatedUser.name} logged into CRM dashboard.`, "info");
      return updatedUser;
    }

    const foundUser = users.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.status === "Active"
    );
    if (!foundUser) {
      throw new Error("Invalid Email or Password");
    }

    let isValid = false;
    if (foundUser.passwordHash === cleanPass || foundUser.password === cleanPass) {
      isValid = true;
    } else {
      isValid = await verifyPassword(cleanPass, foundUser.passwordHash);
    }

    if (!isValid) {
      throw new Error("Invalid Email or Password");
    }

    const updatedUser = {
      ...foundUser,
      lastLogin: new Date().toISOString().split("T")[0],
    };

    setUsers((prev) => prev.map((u) => (u.id === foundUser.id ? updatedUser : u)));
    setCurrentUser(updatedUser);
    addNotification("User Session Started", `${updatedUser.name} logged into CRM dashboard.`, "info");
    return updatedUser;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const changeUserPassword = async (userId, oldPassword, newPassword) => {
    const u = users.find((x) => x.id === userId);
    if (!u) throw new Error("User not found");

    if (oldPassword) {
      const isOldValid = await verifyPassword(oldPassword, u.passwordHash);
      if (!isOldValid) throw new Error("Incorrect current password");
    }

    const newHash = await hashPassword(newPassword);
    const updated = { ...u, passwordHash: newHash };
    setUsers((prev) => prev.map((x) => (x.id === userId ? updated : x)));
    if (currentUser?.id === userId) {
      setCurrentUser(updated);
    }
  };

  const hasPermission = (permKey) => {
    if (!currentUser) return false;
    if (currentUser.role === "Super Admin") return true;
    return Boolean(currentUser.permissions?.[permKey]);
  };

  // Notification Helper
  const addNotification = (title, message, type = "info") => {
    const newNotif = {
      id: "notif_" + Date.now(),
      title,
      message,
      time: "Just now",
      read: false,
      type,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // CRUD Helpers for Properties
  const addProperty = (propData) => {
    const newProp = {
      ...propData,
      id: propData.id || properties.length + 1,
      featured: propData.featured ?? false,
      status: propData.status || "Available",
    };
    setProperties((prev) => [newProp, ...prev]);
    addNotification("Property Added", `New property "${newProp.title}" created.`, "property");
  };

  const updateProperty = (id, propData) => {
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, ...propData } : p)));
    addNotification("Property Updated", `Property ID #${id} modified.`, "property");
  };

  const deleteProperty = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    addNotification("Property Deleted", `Property ID #${id} removed.`, "property");
  };

  // CRUD Helpers for Clients
  const addClient = (cliData) => {
    const newCli = {
      ...cliData,
      id: "cli_" + Date.now(),
      createdDate: new Date().toISOString().split("T")[0],
    };
    setClients((prev) => [newCli, ...prev]);
    addNotification("Client Added", `Client ${newCli.name} added to database.`, "client");
  };

  const updateClient = (id, cliData) => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...cliData } : c)));
  };

  const deleteClient = (id) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  // CRUD Helpers for Consultants
  const addConsultant = (cData) => {
    const newC = {
      ...cData,
      id: "c_" + Date.now(),
      status: cData.status || "Active",
      iconName: cData.iconName || "UserRound",
    };
    setConsultants((prev) => [...prev, newC]);
  };

  const updateConsultant = (id, cData) => {
    setConsultants((prev) => prev.map((c) => (c.id === id ? { ...c, ...cData } : c)));
  };

  const deleteConsultant = (id) => {
    setConsultants((prev) => prev.filter((c) => c.id !== id));
  };

  // Website Public Submissions -> CRM Ingestion
  const submitLeadFromWebsite = (leadData) => {
    const newLead = {
      id: "ld_" + Date.now(),
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email,
      propertyInterest: leadData.propertyInterest || "General Property Inquiry",
      source: leadData.source || "Website Contact Form",
      status: "New",
      date: new Date().toISOString().split("T")[0],
      notes: leadData.notes || leadData.message || "",
    };

    setLeads((prev) => [newLead, ...prev]);

    // Also add to contact messages
    const newMsg = {
      id: "msg_" + Date.now(),
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      subject: leadData.propertyInterest ? `Inquiry for ${leadData.propertyInterest}` : "Website Inquiry",
      message: leadData.message || leadData.notes || "Inquiry submitted via website form.",
      date: new Date().toLocaleString(),
      read: false,
    };
    setContactMessages((prev) => [newMsg, ...prev]);

    addNotification("New Inquiry Received", `Inquiry from ${newLead.name} (${newLead.phone})`, "lead");
  };

  const submitAppointment = (aptData) => {
    const newApt = {
      id: "apt_" + Date.now(),
      clientName: aptData.clientName,
      phone: aptData.phone,
      email: aptData.email,
      propertyTitle: aptData.propertyTitle,
      date: aptData.date,
      time: aptData.time || "12:00",
      status: "Pending",
      assignedConsultant: aptData.assignedConsultant || "Unassigned",
      notes: aptData.notes || "Requested site visit via property detail page.",
    };
    setAppointments((prev) => [newApt, ...prev]);
    addNotification("Appointment Booking", `Site tour requested by ${newApt.clientName}`, "appointment");
  };

  // CRM Operations for Leads, Messages, Appointments, Testimonials, CMS, Users, Settings
  const updateLeadStatus = (id, newStatus, notes) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus, ...(notes && { notes }) } : l))
    );
  };

  const deleteLead = (id) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const deleteMessage = (id) => {
    setContactMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const markMessageRead = (id) => {
    setContactMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const updateAppointmentStatus = (id, newStatus, date, time) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus, ...(date && { date }), ...(time && { time }) } : a))
    );
  };

  const addTestimonial = (tData) => {
    const newT = {
      ...tData,
      id: "t_" + Date.now(),
      status: tData.status || "Published",
    };
    setTestimonials((prev) => [...prev, newT]);
  };

  const updateTestimonial = (id, tData) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...tData } : t)));
  };

  const deleteTestimonial = (id) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const updateCMS = (newCms) => {
    setCms((prev) => ({ ...prev, ...newCms }));
    addNotification("CMS Updated", "Website content updated successfully.", "cms");
  };

  const addUser = async (uData) => {
    const passHash = await hashPassword(uData.password || "mohal1234");
    const newUser = {
      ...uData,
      id: "usr_" + Date.now(),
      passwordHash: passHash,
      createdDate: new Date().toISOString().split("T")[0],
      status: uData.status || "Active",
      permissions: uData.permissions || {
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
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const updateUser = (id, uData) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...uData } : u)));
  };

  const deleteUser = (id) => {
    // Prevent deleting main super admin
    const target = users.find((u) => u.id === id);
    if (target?.email === "atifkhan@mohalland.com") {
      throw new Error("Cannot delete default Super Admin account!");
    }
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addNotification("Settings Saved", "System settings updated.", "settings");
  };

  return (
    <CRMContext.Provider
      value={{
        currentUser,
        users,
        properties,
        consultants,
        clients,
        leads,
        contactMessages,
        appointments,
        testimonials,
        cms,
        settings,
        notifications,
        login,
        logout,
        changeUserPassword,
        hasPermission,
        addNotification,
        markNotificationRead,
        clearAllNotifications,
        addProperty,
        updateProperty,
        deleteProperty,
        addClient,
        updateClient,
        deleteClient,
        addConsultant,
        updateConsultant,
        deleteConsultant,
        submitLeadFromWebsite,
        submitAppointment,
        updateLeadStatus,
        deleteLead,
        deleteMessage,
        markMessageRead,
        updateAppointmentStatus,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        updateCMS,
        addUser,
        updateUser,
        deleteUser,
        updateSettings,
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error("useCRM must be used within a CRMProvider");
  }
  return context;
};
