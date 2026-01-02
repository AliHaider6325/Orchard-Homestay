// StickyContactBar.tsx
import React from "react";
import { FaWhatsapp, FaPhone, FaEnvelope } from "react-icons/fa";

// --- Configuration Data ---
const CONTACT_INFO = {
  phone: "+919797152006",
  whatsapp: "+917006379928",
  email: "orchardhomestay17@gmail.com",
};

// --- Component ---

const StickyContactBar: React.FC = () => {
  // Clean the phone and WhatsApp numbers for URL use
  const cleanedPhone = CONTACT_INFO.phone.replace(/[^0-9+]/g, "");
  const cleanedWhatsapp = CONTACT_INFO.whatsapp.replace(/[^0-9+]/g, "");

  const EMAIL_SUBJECT = "Booking Inquiry for The Orchard Homestay";

  // ***************************************************************
  // **** FIX: Use the Direct Gmail Compose URL ********************
  // ***************************************************************
  const gmailComposeUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${
    CONTACT_INFO.email
  }&su=${encodeURIComponent(EMAIL_SUBJECT)}`;

  const contactItems = [
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      href: `https://wa.me/${cleanedWhatsapp}`,
      color: "bg-green-500 hover:bg-green-600",
      ariaLabel: "Chat with us on WhatsApp",
    },
    {
      icon: FaPhone,
      label: "Call Now",
      href: `tel:${cleanedPhone}`,
      color: "bg-emerald-500 hover:bg-emerald-600",
      ariaLabel: "Call us directly",
    },
    {
      icon: FaEnvelope,
      label: "Email (via Gmail)",
      href: gmailComposeUrl,
      color: "bg-sky-500 hover:bg-sky-600",
      ariaLabel: "Send us an email via Gmail",
    },
  ];

  return (
    // *********************************************************************************
    // IMPORTANT: The target attribute must be '_blank' for the Gmail URL to work.
    // *********************************************************************************
    <div
      className="fixed bottom-4 left-4 z-50 
                       flex flex-col space-y-3"
    >
      {contactItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          // Use _blank for Gmail URL, as it must open a new browser tab
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.ariaLabel}
          className={`
                        ${item.color} 
                        text-white 
                        shadow-lg 
                        transition-all 
                        duration-300 
                        p-3 
                        rounded-full 
                        flex 
                        items-center 
                        justify-center 
                        w-12 h-12 
                        group
                    `}
        >
          <item.icon className="w-6 h-6" />

          {/* Tooltip on hover */}
          <span
            className="absolute right-1/2 transform translate-x-1/2 -top-10 
                                     bg-gray-800 text-white text-xs py-1 px-2 rounded-md 
                                     opacity-0 group-hover:opacity-100 
                                     transition-opacity duration-300 
                                     whitespace-nowrap"
          >
            {item.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default StickyContactBar;
