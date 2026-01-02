import { Leaf, Mountain, Home } from "lucide-react"; // Example icons

const KeyFeatures = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Title and Story */}
        <h2 className="text-4xl font-extrabold text-emerald-600 mb-4">
          Escape to the Heart of the Apple Valley
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto">
          Orchard Homestay offers more than just a room—it offers a timeless
          experience. Wake up to the scent of pine and fresh apples, with the
          majestic Himalayas at your doorstep.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1: The Orchard/Nature */}
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-green-600">
            <Leaf className="w-10 h-10 mx-auto text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold text-green-800 mb-2">
              Travel Equipments
            </h3>
            <p className="text-gray-500">
              We provide a range of high-quality travel equipment to enhance
              your outdoor adventures. This includes comfortable travel tents,
              cozy sleeping bags, sturdy hiking sticks, and much more. Whether
              you're planning a hike or a camping trip, our gear ensures you
              have everything you need for a safe and enjoyable experience.
            </p>
          </div>

          {/* Feature 2: The View/Location */}
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-yellow-600">
            <Mountain className="w-10 h-10 mx-auto text-yellow-600 mb-4" />
            <h3 className="text-2xl font-semibold text-yellow-600 mb-2">
              Transportation
            </h3>
            <p className="text-gray-500">
              Our transportation services ensure your journey is smooth and
              safe. We provide reliable vehicles for all your travel needs,
              whether it’s a trip to nearby attractions or a scenic drive
              through the countryside. Our professional drivers prioritize your
              safety and comfort, allowing you to relax and enjoy the beautiful
              surroundings.
            </p>
          </div>

          {/* Feature 3: The Comfort/Home */}
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 text-blue-600">
            <Home className="w-10 h-10 mx-auto text-blue-600 mb-4" />
            <h3 className="text-2xl font-semibold text-blue-800 mb-2">
              Focused Activities
            </h3>
            <p className="text-gray-500">
              We offer a diverse range of activities designed to entertain and
              challenge you. Enjoy wildlife tourism, savor wild and traditional
              Kashmiri food, and experience seasonal fruits and organic
              vegetables. Participate in agricultural and horticultural
              activities, giving you a unique opportunity to immerse yourself in
              the local culture and traditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
