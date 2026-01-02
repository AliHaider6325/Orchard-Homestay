// ParallaxSection.tsx
import React, { type CSSProperties } from "react";

// Define the styling for the background image
const parallaxStyle: CSSProperties = {
  backgroundImage: `url('https://media.istockphoto.com/id/488152916/photo/organic-red-ripe-apples-on-the-orchard-tree-with-leaves.jpg?s=612x612&w=0&k=20&c=ro9CnL3qOX4Q4bMs6zD-1Zg8BpYoCCQsPJOWdJ9Y2SQ=')`,
  backgroundAttachment: "fixed",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const ParallaxSection: React.FC = () => {
  return (
    <div
      className="relative flex items-center justify-center w-full h-[60vh] md:h-[80vh] overflow-hidden"
      style={parallaxStyle}
    >
      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/30 backdrop-brightness-75">
        <p className="text-white text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight drop-shadow-lg">
          Wake up surrounded by nature
        </p>

        <hr className="w-16 my-6 border-2 border-white/70" />

        <p className="text-white/90 text-center text-lg sm:text-xl font-light">
          Experience the tranquility of our orchard retreats.
        </p>
      </div>
    </div>
  );
};

export default ParallaxSection;
