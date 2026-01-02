// NearbyLocations.tsx
import React, { useState } from "react";
import { MapPin, ArrowRight, X } from "lucide-react";

// --- Types ---
interface LocationData {
  id: number;
  name: string;
  description: string;
  distance: string;
  imageUrl: string;
  // Added a placeholder for multiple gallery images
  galleryImages: string[];
}

// --- Data ---
const locations: LocationData[] = [
  {
    id: 1,
    name: "Bungus Valley",
    description:
      "Bungus Valley is a serene, untouched meadow in Jammu & Kashmir known for its lush greenery and Himalayan beauty.",
    distance: "25km Away",
    imageUrl: "/assets/locations/bv2.jpg",
    galleryImages: [
      "/assets/locations/bv1.jfif",
      "/assets/locations/bv2.jpg",
      "/assets/locations/bv3.jpg",
      "/assets/locations/bv4.webp",
    ],
  },
  {
    id: 2,
    name: "Tangadar",
    description:
      "Tangdhar is a scenic town in Jammu & Kashmir, famous for its mountain views, rivers, and peaceful border-area charm.",
    distance: "45km Away",
    imageUrl: "/assets/locations/t1.webp",
    galleryImages: [
      "/assets/locations/t1.webp",
      "/assets/locations/t2.jpg",
      "/assets/locations/t3.jfif",
      "/assets/locations/t4.jfif",
    ],
  },
  {
    id: 3,
    name: "Karen",
    description:
      "Karen is a quiet border village in Jammu & Kashmir, known for its scenic riverside views and gateway to the Karnah Valley.",
    distance: "25km Away",
    imageUrl: "/assets/locations/k2.webp",
    galleryImages: [
      "/assets/locations/k1.webp",
      "/assets/locations/k2.webp",
      "/assets/locations/k3.webp",
      "/assets/locations/k4.webp",
    ],
  },
  {
    id: 4,
    name: "Lolab Valley",
    description:
      "Lolab Valley is a lush green valley in Jammu & Kashmir, famous for its forests, meadows, and peaceful natural beauty.",
    distance: "20km Away",
    imageUrl: "/assets/locations/l1.webp",
    galleryImages: [
      "/assets/locations/l1.webp",
      "/assets/locations/l2.jfif",
      "/assets/locations/l3.webp",
      "/assets/locations/l4.jpg",
    ],
  },
];

// --- Gallery Modal Component ---

interface GalleryProps {
  location: LocationData;
  onClose: () => void;
}

const LocationGallery: React.FC<GalleryProps> = ({ location, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-full overflow-y-auto relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full text-gray-800 hover:bg-gray-200 transition-colors"
          aria-label="Close Gallery"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <header className="p-6 border-b">
          <h2 className="text-3xl font-bold text-gray-900">
            {location.name} Gallery
          </h2>
          <p className="text-gray-600 mt-1">{location.description}</p>
        </header>

        {/* Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
          {location.galleryImages.map((src, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-md aspect-w-4 aspect-h-3"
            >
              <img
                src={src}
                alt={`${location.name} view ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Sub Component for Location Card ---

interface LocationCardProps {
  location: LocationData;
  onClick: (location: LocationData) => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onClick }) => {
  return (
    // Card is clickable to open the gallery
    <div
      className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 transform hover:shadow-2xl hover:scale-[1.03] cursor-pointer"
      onClick={() => onClick(location)}
    >
      {/* Image Container */}
      <div className="h-60 overflow-hidden">
        <img
          src={location.imageUrl}
          alt={location.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Content Overlay */}
      <div className="p-4 bg-white">
        <div className="flex items-center text-sm font-semibold text-gray-500 mb-2">
          <MapPin className="w-4 h-4 mr-1 text-emerald-500" />
          {location.distance}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {location.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4">{location.description}</p>

        {/* Explore Link: Visible on mobile, enhanced on desktop hover */}
        <div className="flex items-center text-emerald-600 font-semibold transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100">
          Explore Gallery
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 md:group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const NearbyLocations: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );

  const handleCardClick = (location: LocationData) => {
    setSelectedLocation(location);
  };

  const handleCloseGallery = () => {
    setSelectedLocation(null);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-16 bg-white">
        <header className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Explore Nearby Attractions
          </h2>
          <p className="text-xl text-gray-600 mt-3">
            Discover the beauty and history just a short trip from our location.
          </p>
        </header>

        {/* Responsive Grid/Scrolling Layout */}
        <div className="flex space-x-6 overflow-x-scroll pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 max-w-7xl mx-auto">
          {locations.map((loc) => (
            // Ensure cards maintain their size in the scrollable view
            <div
              key={loc.id}
              className="w-72 md:w-auto flex-shrink-0 md:flex-shrink"
            >
              <LocationCard location={loc} onClick={handleCardClick} />
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Modal rendering */}
      {selectedLocation && (
        <LocationGallery
          location={selectedLocation}
          onClose={handleCloseGallery}
        />
      )}
    </>
  );
};

export default NearbyLocations;
