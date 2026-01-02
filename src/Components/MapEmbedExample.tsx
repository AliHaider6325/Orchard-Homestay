// ResponsiveMap.tsx

import React from "react";

// The URL for the Google Maps iframe embed.
interface ResponsiveMapProps {
  mapEmbedUrl: string;
}

const ResponsiveMap: React.FC<ResponsiveMapProps> = ({ mapEmbedUrl }) => {
  const [hasError, setHasError] = React.useState(false);

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <header className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Find Our Homestay Location
        </h2>
        <p className="text-xl text-gray-600 mt-2">
          Use the interactive map below to get directions.
        </p>
      </header>

      {/* --- Map Container --- */}
      {/* Maintains a 16:9 aspect ratio using padding-top trick for responsiveness */}
      <div className="relative w-full pt-[56.25%] rounded-xl shadow-2xl overflow-hidden border border-gray-200">
        <iframe
          src={mapEmbedUrl}
          className={`absolute top-0 left-0 w-full h-full border-0 ${
            hasError ? "hidden" : ""
          }`}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title="Embedded Homestay Location Map"
          // Set error state if the iframe fails to load (often due to security/URL issue)
          onError={() => setHasError(true)}
        ></iframe>
      </div>
    </div>
  );
};

// --- Full Working Example Component ---

// ********************************************************************
// ********** LOCATION SUCCESSFULLY ADDED HERE ************************
// ********************************************************************

const DEFAULT_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d210447.01304136054!2d73.95175737182271!3d34.49693681996497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e0e74d36693c7d%3A0x6152db97900e698d!2sBhat%20Mohalla!5e0!3m2!1sen!2sus!4v1767356489207!5m2!1sen!2sus";

const MapEmbedExample: React.FC = () => {
  // This variable uses your homestay's specific map embed URL
  const yourLocationEmbedUrl = DEFAULT_EMBED_URL;

  return (
    <div className="min-h-screen bg-gray-50">
      <ResponsiveMap mapEmbedUrl={yourLocationEmbedUrl} />
    </div>
  );
};

export default MapEmbedExample;
