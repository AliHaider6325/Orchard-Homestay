// types.ts (Optional: you can put these in a separate file or at the top of the component)
import type { LucideIcon } from "lucide-react";

interface Attraction {
  name: string;
  distance: string;
}

interface Meal {
  type: string;
  price: string;
  details: string;
}

interface LocationDetail {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface HomestayData {
  location: string;
  details: LocationDetail[];
  attractions: Attraction[];
  meals: Meal[];
  specialMeals: string;
  research: {
    owner: string;
    opportunities: string[];
  };
  facilities: string[];
  services: string[];
}

type ActiveTab = "overview" | "location" | "meals" | "facilities" | "research";
// ----------------------------------------------------------------------------------

// OrchardHomestayDetails.tsx
import React, { useState } from "react";
import {
  ArrowRight,
  MapPin,
  Briefcase,
  BookOpen,
  Coffee,
  Lightbulb,
  ExternalLink, // Added ExternalLink icon
} from "lucide-react";

// --- Data ---
const homestayData: HomestayData = {
  location: "Villagam, Kupwara, Jammu and Kashmir, India",
  details: [
    { icon: MapPin, label: "Srinagar Airport", value: "100 km away" },
    { icon: MapPin, label: "Baramulla Rly. Station", value: "47 km away" },
    {
      icon: Briefcase,
      label: "Pick-up/Drop-off",
      value: "Available (charges apply)",
    },
  ],
  attractions: [
    { name: "Bangus Valley", distance: "25 km" },
    { name: "Lolab Valley", distance: "20 km" },
    { name: "Karen", distance: "25 km" },
    { name: "Tangdar", distance: "45 km" },
  ],
  meals: [
    {
      type: "Breakfast",
      price: "Rs. 150",
      details:
        "Traditional Kashmiri Nanki tea, Bread toast, Eggs, tea and coffee.",
    },
    {
      type: "Lunch & Dinner",
      price: "Rs. 500",
      details: "Dal, Rice, Roti, Dahi, vegetables, veg Biryani.",
    },
  ],
  specialMeals:
    "Special Kashmiri Dishes (Kehwa, Nun Chai, Wazwan dishes like Rista, Yakhni, Rogan Josh, etc.) available on order at an additional cost.",
  research: {
    owner: "Dr. Shiekh Marifatul Haq",
    opportunities: ["Forest Ecology", "Ethnobiology", "Wildlife"],
  },
  facilities: [
    "Free WiFi",
    "Parking Facilities",
    "Delicious home-cooked meals featuring local cuisine",
    "Outdoor seating area to enjoy picturesque views",
    "Seasonal Fruits available",
    "Literature on Forest Biodiversity and Local Traditional Knowledge",
    "Laundry service",
    "Facilities for trekking (tents, sleeping bags, trekking sticks)",
    "Guided tours to nearby forests and mountain areas",
    "Assistance with pick-up and drop-off service (paid)",
  ],
  services: [],
};
// --- End Data ---

// --- Sub-Components with TypeScript Props ---

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({
  isActive,
  children,
  onClick,
}) => (
  <button
    className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-all duration-300 ${
      isActive
        ? "bg-white text-emerald-700 border-b-2 border-emerald-500 shadow-md"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

interface DetailCardProps {
  icon: LucideIcon;
  title: string;
  content: string;
}

const DetailCard: React.FC<DetailCardProps> = ({
  icon: Icon,
  title,
  content,
}) => (
  <div className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-[1.02]">
    <div className="flex items-start space-x-3">
      <Icon className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
      <div>
        <h4 className="text-lg font-bold text-gray-800">{title}</h4>
        <p className="text-gray-600 text-sm">{content}</p>
      </div>
    </div>
  </div>
);

// --- Main Component ---

const OrchardHomestayDetails: React.FC = () => {
  // Explicitly typing the useState hook for ActiveTab
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");

  const getResearchLink = (field: string): string | null => {
    switch (field) {
      case "Forest Ecology":
        return "https://link.springer.com/article/10.1186/s13002-023-00606-3";
      case "Ethnobiology":
        return "https://www.mdpi.com/2079-7737/11/3/455";
      case "Wildlife":
        return "https://link.springer.com/article/10.1007/s10531-024-02778-0";
      default:
        return null;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "location":
        return (
          <div className="grid md:grid-cols-3 gap-6 animate-fadeIn p-4">
            <h3 className="text-xl md:col-span-3 font-semibold text-gray-700 mb-2">
              Location Details
            </h3>
            <DetailCard
              icon={MapPin}
              title="Homestay Address"
              content={homestayData.location}
            />
            {homestayData.details.map((item, index) => (
              <DetailCard
                key={index}
                icon={item.icon}
                title={item.label}
                content={item.value}
              />
            ))}

            <h3 className="text-xl md:col-span-3 font-semibold text-gray-700 mt-6 mb-2">
              Nearby Attractions
            </h3>
            {homestayData.attractions.map((attraction, index) => (
              <DetailCard
                key={index}
                icon={MapPin}
                title={attraction.name}
                content={`${attraction.distance} from Orchard Homestay`}
              />
            ))}
          </div>
        );
      case "meals":
        return (
          <div className="space-y-6 animate-fadeIn p-4">
            <h3 className="text-xl font-semibold text-gray-700">Meal Plans</h3>
            {homestayData.meals.map((meal, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-lg border-l-4 border-emerald-400"
              >
                <Coffee className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-bold text-gray-800">
                    {meal.type}:{" "}
                    <span className="text-emerald-600">{meal.price}</span>
                  </h4>
                  <p className="text-gray-600">{meal.details}</p>
                </div>
              </div>
            ))}
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 shadow-md">
              <p className="font-semibold text-yellow-800">Specialty Dishes:</p>
              <p className="text-sm text-yellow-700">
                {homestayData.specialMeals}
              </p>
            </div>
          </div>
        );
      case "facilities":
        // Combine facilities and services for rendering in the same section
        const combinedItems = [
          ...homestayData.facilities,
          ...homestayData.services,
        ];

        return (
          <div className="space-y-6 animate-fadeIn p-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Amenities and Services
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {combinedItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <ArrowRight className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "research":
        return (
          <div className="space-y-6 animate-fadeIn p-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Research Opportunities
            </h3>
            <div className="p-6 bg-emerald-50 rounded-xl shadow-lg border-l-4 border-emerald-500">
              <p className="text-lg font-medium text-gray-800 mb-3">
                A unique opportunity to advance your research endeavors.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Owned by <b>{homestayData.research.owner}</b>.
              </p>
              <div className="flex flex-wrap gap-3">
                {homestayData.research.opportunities.map((field, index) => {
                  const link = getResearchLink(field);
                  const isLink = !!link;
                  const linkStyle =
                    "bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer";
                  const staticStyle = "bg-emerald-200 text-emerald-800";

                  const Tag = isLink ? "a" : "span";
                  const props = isLink
                    ? {
                        href: link,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        title: `View publication for ${field}`,
                      }
                    : {};

                  return (
                    <Tag
                      key={index}
                      className={`flex items-center text-sm font-semibold px-3 py-1 rounded-full shadow-sm transition-colors ${
                        isLink ? linkStyle : staticStyle
                      }`}
                      {...props}
                    >
                      <BookOpen className="w-3 h-3 mr-1" />
                      {field}
                      {isLink && <ExternalLink className="w-3 h-3 ml-1" />}
                    </Tag>
                  );
                })}
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-700 mt-6">
              Exploration Opportunities
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <DetailCard
                icon={Lightbulb}
                title="Lolab Valley"
                content="Explore the serene landscapes of Lolab Valley."
              />
              <DetailCard
                icon={Lightbulb}
                title="Manigah Meadows"
                content="Trek through Manigah Meadows for stunning views."
              />
              <DetailCard
                icon={Lightbulb}
                title="Villages"
                content="Visit picturesque villages like Karen and Tangdar."
              />
            </div>
          </div>
        );
      case "overview":
      default:
        return (
          <div id="about" className="space-y-6 animate-fadeIn p-4">
            <div className="p-6 bg-white rounded-xl shadow-2xl border-l-4 border-emerald-500 transition-all duration-500 hover:shadow-lg">
              <h3 className="text-3xl font-extrabold text-emerald-700 mb-2">
                Welcome to ORCHARD HOMESTAY!
              </h3>
              <p className="text-gray-700 text-lg">
                Nestled in the breathtaking landscapes of{" "}
                <b>{homestayData.location.split(",").slice(0, 3).join(", ")}</b>
                , we offer an immersive experience into the tranquility and
                culture of Kashmir.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <DetailCard
                icon={MapPin}
                title="Address"
                content={homestayData.location}
              />
              <DetailCard
                icon={Coffee}
                title="Full Meals"
                content="Options for breakfast, lunch, and dinner, plus special Kashmiri Wazwan dishes."
              />
              <DetailCard
                icon={BookOpen}
                title="Unique Focus"
                content="Research opportunities in Forest Ecology and Ethnobiology."
              />
              <DetailCard
                icon={Briefcase}
                title="Facilities"
                content="Free WiFi, Parking, Outdoor Seating, and Trekking Gear."
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Title Section with Animation */}
      <header className="text-center mb-10 pb-4 border-b border-emerald-200 animate-slideInDown">
        <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
          <span className="text-emerald-600">ORCHARD</span> HOMESTAY
        </h1>
        <p className="text-xl text-gray-500 mt-2">{homestayData.location}</p>
      </header>

      {/* Tabs Navigation */}
      <div className="flex justify-center flex-wrap gap-2 mb-8 sticky top-0 z-10 bg-gray-50/95 py-3 rounded-b-lg shadow-sm">
        <TabButton
          isActive={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </TabButton>
        <TabButton
          isActive={activeTab === "location"}
          onClick={() => setActiveTab("location")}
        >
          🗺️ Location & Attractions
        </TabButton>
        <TabButton
          isActive={activeTab === "meals"}
          onClick={() => setActiveTab("meals")}
        >
          🍽️ Meals & Dining
        </TabButton>
        <TabButton
          isActive={activeTab === "facilities"}
          onClick={() => setActiveTab("facilities")}
        >
          ⚙️ Amenities & Services
        </TabButton>
        <TabButton
          isActive={activeTab === "research"}
          onClick={() => setActiveTab("research")}
        >
          🔬 Research & Exploration
        </TabButton>
      </div>

      {/* Tab Content Area - Animated for clarity */}
      <div className="bg-gray-50 min-h-[400px] rounded-b-xl rounded-tr-xl shadow-2xl p-6 transition-all duration-500">
        {renderTabContent()}
      </div>

      {/* REMOVED: The old "Click to learn more" button is removed */}

      {/* Custom CSS for Animations */}
      <style>{`
        /* Simple Fade In Animation for Content */
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Simple Slide In Animation for Header */
        .animate-slideInDown {
          animation: slideInDown 0.7s ease-out forwards;
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default OrchardHomestayDetails;
