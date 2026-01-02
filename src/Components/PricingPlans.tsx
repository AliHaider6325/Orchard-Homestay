// PricingPlans.tsx
import React from "react";
import { Bed, Users, Home, Sunrise } from "lucide-react";

// --- Types ---
interface PriceOption {
  id: number;
  type: string;
  subtitle: string;
  priceINR: number;
  priceUSD: number;
  occupancy: string;
  description: string;
  availableRooms: number;
  icon: typeof Bed | typeof Users | typeof Home;
  isFeatured: boolean;
}

// --- Data ---
const pricingData: PriceOption[] = [
  {
    id: 1,
    type: "Single Room",
    subtitle: "Single Occupancy",
    priceINR: 1600,
    priceUSD: 20,
    occupancy: "Solo Traveler (1 Person)",
    description: "Private comfort for the independent explorer.",
    availableRooms: 4,
    icon: Bed,
    isFeatured: false, // Not featured
  },
  {
    id: 2,
    type: "Double Room",
    subtitle: "Double Occupancy",
    priceINR: 2500,
    priceUSD: 30,
    occupancy: "Shared Retreat (2 Persons)",
    description: "Perfect space for couples or shared accommodation.",
    availableRooms: 4,
    icon: Users,
    isFeatured: true, // Static Best Value tag
  },
  {
    id: 3,
    type: "Family Suite",
    subtitle: "(2 double beds: occupy 4 persons)",
    priceINR: 4500,
    priceUSD: 54,
    occupancy: "Family & Group (4 Persons)",
    description: "Two double beds ensuring comfort for the whole group.",
    availableRooms: 4,
    icon: Home,
    isFeatured: false, // Not featured
  },
];

// --- Sub Component for Animated Card ---

interface PricingCardProps {
  plan: PriceOption;
  index: number;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, index }) => {
  const Icon = plan.icon;
  const delay = index * 0.15;

  // Base classes for all cards (Default state is light/white)
  const baseClasses = `
    group relative p-6 md:p-8 rounded-3xl transition-all duration-300 ease-in-out 
    border border-gray-200 bg-white text-gray-900 shadow-xl
    transform hover:scale-[1.03] hover:shadow-2xl hover:z-10
    animate-slideIn
  `;

  // Hover styling (applies to ALL cards when hovered)
  const hoverClasses = `
    group-hover:border-yellow-400 
    group-hover:bg-gray-900 
    group-hover:text-white 
    group-hover:shadow-2xl 
    group-hover:shadow-yellow-500/30
  `;

  // Dynamic classes for text/icons, applying dark/yellow only on hover
  const iconColor = "text-emerald-600 group-hover:text-yellow-400";
  const priceColor = "text-emerald-600 group-hover:text-yellow-400";
  const textColor = "text-gray-600 group-hover:text-gray-300";
  const titleColor = "text-gray-900 group-hover:text-white";

  return (
    <div
      id="pricing"
      className={` hover:bg-blue-950 ${baseClasses} ${hoverClasses}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* STATIC "Best Value" Tag (Only visible if isFeatured is true, not tied to hover) */}
      {plan.isFeatured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold uppercase tracking-wider bg-yellow-400 text-gray-900 rounded-full shadow-lg">
          Best Value
        </span>
      )}

      {/* Icon and Type */}
      <div className="flex items-center space-x-3 mb-4">
        <Icon
          className={`w-8 h-8 flex-shrink-0 transition-colors duration-300 ${iconColor}`}
        />
        <h3
          className={`text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${titleColor}`}
        >
          {plan.type}
        </h3>
      </div>

      {/* Price */}
      <div className="my-6">
        <p
          className={`text-4xl md:text-5xl font-extrabold transition-colors duration-300 ${priceColor}`}
        >
          ₹{plan.priceINR}
          <span
            className={`text-xl md:text-2xl font-semibold text-gray-500 ml-2 transition-colors duration-300 ${textColor}`}
          >
            /night
          </span>
        </p>
        <p
          className={`text-base md:text-lg mt-1 text-gray-500 transition-colors duration-300 ${textColor}`}
        >
          (${plan.priceUSD} / night)
        </p>
      </div>

      {/* Occupancy and Description */}
      <div
        className={`py-4 mb-4 border-t border-gray-200 group-hover:border-gray-700 transition-colors duration-300`}
      >
        <p
          className={`text-lg font-semibold text-gray-700 transition-colors duration-300 ${textColor}`}
        >
          Occupancy:
        </p>
        <p
          className={`text-xl font-bold transition-colors duration-300 ${titleColor}`}
        >
          {plan.occupancy}
        </p>
      </div>

      {/* Features List */}
      <ul className="space-y-3 text-sm md:text-base mb-4">
        {" "}
        {/* Added mb-4 for final spacing */}
        <li className="flex items-center">
          <Sunrise
            className={`w-5 h-5 mr-2 flex-shrink-0 transition-colors duration-300 ${iconColor}`}
          />
          <span className={`transition-colors duration-300 ${textColor}`}>
            {plan.description}
          </span>
        </li>
        <li className="flex items-center">
          <Sunrise
            className={`w-5 h-5 mr-2 flex-shrink-0 transition-colors duration-300 ${iconColor}`}
          />
          <span className={`transition-colors duration-300 ${textColor}`}>
            Rooms Available: <b>{plan.availableRooms}</b>
          </span>
        </li>
        <li className="flex items-center">
          <Sunrise
            className={`w-5 h-5 mr-2 flex-shrink-0 transition-colors duration-300 ${iconColor}`}
          />
          <span className={`transition-colors duration-300 ${textColor}`}>
            Includes daily Breakfast (Rs. 150 value)
          </span>
        </li>
      </ul>

      {/* REMOVED: The Call to Action button previously here */}
    </div>
  );
};

// --- Main Component ---

const PricingPlans: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 bg-white">
      <header className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Our Exclusive Stay Options
        </h2>
        <p className="text-xl text-gray-600 mt-4">
          Experience the tranquility of Kupwara with tailored pricing plans.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {pricingData.map((plan, index) => (
          <PricingCard key={plan.id} plan={plan} index={index} />
        ))}
      </div>

      {/* Custom CSS for X and Y animations (kept as requested) */}
      <style>{`
        /* Animation ensures an initial state of being slightly down and to the left (X/Y motion) */
        .animate-slideIn {
          animation: slideIn 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          opacity: 0;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            /* X-axis movement (Slide right) + Y-axis movement (Slide up) */
            transform: translateY(40px) translateX(-5px) rotateX(10deg);
          }
          to {
            opacity: 1;
            /* Reset to original position */
            transform: translateY(0) translateX(0) rotateX(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export default PricingPlans;
