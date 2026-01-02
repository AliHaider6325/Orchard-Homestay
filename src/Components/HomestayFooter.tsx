// HomestayFooter.tsx
import React from "react";
import { Mail, Phone, MapPin, Feather } from "lucide-react";
// 1. Import necessary icons from react-icons/fa
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

// --- Configuration Data ---
const HOMESTAY_NAME = "The Orchard Homestay";
const CURRENT_YEAR = new Date().getFullYear();

// IMPORTANT: Fill these placeholders with your actual social media links
const SOCIAL_LINKS = {
  FACEBOOK_URL: "https://www.facebook.com/yourhomestayprofile", // <-- Update this link!
  INSTAGRAM_URL: "https://www.instagram.com/yourhomestayprofile", // <-- Update this link!
};

const CONTACT_INFO = {
  phone: "+91 97971 52006",
  whatsapp: "+91 70063 79928",
  email: "orchardhomestay17@gmail.com",
  registration: "JKPG00002528",
};

const LOCATION_INFO = {
  address: "Bhat Mohallah Villagam",
  cityState: "Kupwara, Jammu & Kashmir",
  country: "India",
  postalCode: "193224",
};

const FOOTER_LINKS = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", href: "#" },
      { name: "Rooms & Pricing", href: "#" },
      { name: "Gallery", href: "#" },
      { name: "Testimonials", href: "#" },
    ],
  },
  {
    title: "Policies",
    links: [
      { name: "Check-in/Out Rules", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
];

// 2. Removed custom SVG icons (FacebookIcon, InstagramIcon, WhatsappIcon)

// --- Component ---

const HomestayFooter: React.FC = () => {
  const cleanedWhatsappNumber = CONTACT_INFO.whatsapp.replace(/[^0-9+]/g, "");

  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-10">
          {/* Column 1: Logo and Mission */}
          <div>
            <div className="flex items-center text-white mb-4">
              <img
                src="./src/assets/logo.png"
                alt={`${HOMESTAY_NAME} Logo`}
                className="w-50 h-auto"
              />
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Experience the tranquility of Kashmir. Your peaceful retreat
              amidst orchards and mountains.
            </p>
            <p className="mt-3 text-xs text-gray-500">
              Reg. #: {CONTACT_INFO.registration}
            </p>
          </div>

          {/* Column 2 & 3: Quick Links and Policies */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold text-white mb-4 border-b border-emerald-500 pb-1 inline-block">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-emerald-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-emerald-500 pb-1 inline-block">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                <p>
                  {LOCATION_INFO.address}, {LOCATION_INFO.cityState} <br />
                  {LOCATION_INFO.country} - {LOCATION_INFO.postalCode}
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/ /g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  Call: {CONTACT_INFO.phone}
                </a>
              </div>
              {/* 3. Using FaWhatsapp for inline contact info section */}
              <div className="flex items-center">
                <FaWhatsapp className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                <a
                  href={`https://wa.me/${cleanedWhatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {CONTACT_INFO.whatsapp}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  Email: {CONTACT_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* --- Bottom Row (Copyright & Social) --- */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            © {CURRENT_YEAR} {HOMESTAY_NAME}. All rights reserved.
          </p>

          {/* Updated Social Icons in the bottom row */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* 4. Facebook using FaFacebook */}
            <a
              href={SOCIAL_LINKS.FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-400 hover:text-emerald-500 transition-colors"
            >
              <FaFacebook className="w-6 h-6" />
            </a>

            {/* 5. Instagram using FaInstagram */}
            <a
              href={SOCIAL_LINKS.INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-emerald-500 transition-colors"
            >
              <FaInstagram className="w-6 h-6" />
            </a>

            {/* 6. WhatsApp using FaWhatsapp */}
            <a
              href={`https://wa.me/${cleanedWhatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-gray-400 hover:text-emerald-500 transition-colors"
            >
              <FaWhatsapp className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomestayFooter;
