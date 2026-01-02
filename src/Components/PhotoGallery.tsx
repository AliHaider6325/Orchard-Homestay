import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { section } from "framer-motion/client";

// --- animations (INLINE, no directory change) ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// --- 1. DEFINE IMAGE DATA ---
interface Album {
  title: string;
  cover: string;
  description: string;
  images: string[];
}

const GALLERY_DATA: Album[] = [
  {
    title: "The House",
    cover: "./src/assets/home.jpg",
    description: "Exterior views, architecture, and the beautiful facade.",
    images: [
      "./src/assets/gallery/house/1.jpg",
      "./src/assets/gallery/house/2.png",
      "./src/assets/gallery/house/3.jpg",
    ],
  },
  {
    title: "Interiors",
    cover: "./src/assets/interior.jpg",
    description: "Cozy rooms, traditional wooden accents, and common areas.",
    images: [
      "./src/assets/gallery/interiors/1.jpg",
      "./src/assets/gallery/interiors/2.png",
      "./src/assets/gallery/interiors/3.jpg",
    ],
  },
  {
    title: "Surroundings",
    cover: "./src/assets/surrondings.png",
    description:
      "The apple orchard, nearby landscapes, and stunning Kashmir views.",
    images: [
      "./src/assets/gallery/surrondings/1.jpg",
      "./src/assets/gallery/surrondings/2.jpg",
      "./src/assets/gallery/surrondings/3.jpg",
      "./src/assets/gallery/surrondings/4.jpg",
      "./src/assets/gallery/surrondings/5.jpg",
      "./src/assets/gallery/surrondings/6.jpg",
      "./src/assets/gallery/surrondings/7.jpg",
      "./src/assets/gallery/surrondings/8.jpg",
      "./src/assets/gallery/surrondings/9.jpg",
      "./src/assets/gallery/surrondings/10.jpg",
      "./src/assets/gallery/surrondings/11.jpg",
    ],
  },
  {
    title: "Food & Dining",
    cover: "./src/assets/food.jpg",
    description:
      "Wazwan, local delicacies, and dining experiences at the homestay.",
    images: [
      "./src/assets/gallery/food/f2.jpg",
      "./src/assets/gallery/food/f3.jpg",
      "./src/assets/gallery/food/f4.jpg",
      "./src/assets/gallery/food/f5.jpg",
      "./src/assets/gallery/food/f6.jpg",
    ],
  },
];

// --- 2. MODAL COMPONENT (REVISED FIX FOR OVERFLOW) ---
interface GalleryModalProps {
  images: string[];
  title: string;
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  images,
  title,
  onClose,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const prevSlide = () =>
    setSlideIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextSlide = () =>
    setSlideIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  if (!images || images.length === 0) return null;

  return (
    // <section id="gallery">
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-y-auto w-screen h-screen"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        // Key Fix: Used flex-col and max-h-screen calculation to manage vertical space
        className="relative w-full max-w-5xl bg-green-900 rounded-lg shadow-2xl flex flex-col max-h-[calc(100vh-2rem)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (Fixed height) */}
        <div
          id="gallery"
          className="p-4 border-b border-green-700 flex justify-between items-center flex-shrink-0"
        >
          <h3 className="text-xl font-semibold text-white">
            {title} ({slideIndex + 1} / {images.length})
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-yellow-400 p-2 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Image Slideshow (Takes remaining space) */}
        {/* Key Fix: Ensures this container takes max space and manages overflow */}
        <div className="relative flex-grow flex items-center justify-center p-4 overflow-hidden">
          <img
            src={images[slideIndex]}
            alt={`${title} photo ${slideIndex + 1}`}
            // Key Fix: The combination of max-w-full, max-h-full, and object-contain
            // is the most reliable way to resize large images to fit their container.
            className="max-w-full max-h-full object-contain transition-opacity duration-300"
          />
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full z-10 transition"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full z-10 transition"
          >
            &#10095;
          </button>
        </div>
      </motion.div>
    </div>
    // </section>
  );
};

// --- 3. MAIN GALLERY COMPONENT ---
const PhotoGallery: React.FC = () => {
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);

  const openModal = useCallback((album: Album) => setActiveAlbum(album), []);
  const closeModal = useCallback(() => setActiveAlbum(null), []);

  return (
    <>
      <section className="py-20">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-4xl font-extrabold text-emerald-600 mb-2 text-center"
          >
            Our Photo Gallery
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-xl text-gray-600 mb-12 text-center max-w-4xl mx-auto"
          >
            Explore the beauty of the homestay and its serene surroundings in
            Kashmir through our curated albums.
          </motion.p>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            {GALLERY_DATA.map((album, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="relative overflow-hidden rounded-xl shadow-xl group cursor-pointer transform hover:scale-[1.02] transition-all duration-300"
                onClick={() => openModal(album)}
              >
                <img
                  src={album.cover}
                  alt={album.title}
                  className="w-full h-72 object-cover transition-opacity duration-500 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-end justify-start p-4">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {album.title}
                    </h3>
                    <p className="text-sm text-gray-200">
                      {album.description.split(".")[0]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {activeAlbum && (
        <GalleryModal
          images={activeAlbum.images}
          title={activeAlbum.title}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default PhotoGallery;
