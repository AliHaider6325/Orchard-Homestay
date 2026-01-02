import { useState } from "react";

// --- Navigation Link Configuration ---
const NAV_LINKS = [
  // href must match the 'id' of the corresponding section component
  { name: "Home", href: "#top" }, // Assuming a section at the top has id="top"
  { name: "About", href: "#about" },
  { name: "Pricing", href: "#pricing" },
  // { name: "Gallery", href: "#gallery" },
  { name: "Booking", href: "#booking" },
  { name: "Contact", href: "#contact" }, // Can link to the Footer or a contact section
];
// --- Component ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Add scroll-smooth to enable smooth scrolling across the whole navigation
    <nav className="w-full fixed top-0 left-0 z-50 shadow-lg bg-[#061E29] scroll-smooth">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between pr-10">
        <div className="flex items-center">
          <img
            src="/assets/logo.png"
            alt="Orchard Homestay Logo"
            className="h-45 md:h-45 sm:h-45 object-contain"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-yellow-400 cursor-pointer transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            // Close Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-green-800 shadow-xl z-40 transition-all duration-300 ease-in-out">
          <ul className="flex flex-col space-y-4 px-6 py-6 text-white font-medium text-center border-t border-green-700">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                // Close the menu after clicking a link
                onClick={() => setIsOpen(false)}
                className="hover:text-yellow-400 cursor-pointer py-2 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
