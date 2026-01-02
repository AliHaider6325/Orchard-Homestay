import { useEffect, useState } from "react";

const images = [
  "/assets/home.jpg",
  "/assets/outview.png",
  "/assets/Home11.jpg",
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <section
      id="top"
      className="relative h-screen w-full overflow-hidden mt-20"
    >
      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* 💥 FIX: Gradient Overlay (Darker at the bottom for text contrast) */}
      <div
        className="absolute inset-0"
        style={{
          // Tailwind arbitrary value for a smooth vertical gradient:
          // Transparent (to-transparent) at the top, fading to black with 70% opacity at the bottom.
          backgroundImage:
            "linear-gradient(to top, rgba(0, 0, 0, 0.7) 10%, transparent 100%)",
        }}
      />
      {/* We can also add a subtle top gradient if needed: */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-linear-to-b from-black/20 to-transparent" />

      {/* Content: Increased padding to keep it off the very bottom edge */}
      {/* We need z-10 on the content to make sure it renders above the gradient layers */}
      <div className="relative z-10 h-full flex flex-col justify-end items-center text-white text-center px-6 pb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to ORCHARD HOMESTAY
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl">
          Stay in the paradise of nature with a beautiful view and nearby
          locations. Empower your travel experience with our 24/7 service.
        </p>
      </div>

      {/* Left Arrow (Kept z-20 to ensure it is above all overlays) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full text-white z-20 transition"
      >
        ❮
      </button>

      {/* Right Arrow (Kept z-20 to ensure it is above all overlays) */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full text-white z-20 transition"
      >
        ❯
      </button>
    </section>
  );
};

export default HeroSlider;
