import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";



export default function Home() {
  const [heroImages, setHeroImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [latestVehicles, setLatestVehicles] = useState([]);

  const baseURL = "http://localhost:3000";

  useEffect(() => {
  const loadVehicles = async () => {
    try {
      const res = await axios.get(`${baseURL}/vehicles`);
      const allVehicles = res.data;

      // HERO → Random images (no fixed limit required)
      const shuffledImages = [...allVehicles]
        .map(v => v.coverImage)
        .filter(Boolean)
        .sort(() => Math.random() - 0.5);

      setHeroImages(shuffledImages);

      //LATEST VEHICLES → Sort by createdAt and take 6
      const latestSix = [...allVehicles]
        .filter(v => v.createdAt)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);

      setLatestVehicles(latestSix);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  loadVehicles();
}, []);


  // Auto slider
  useEffect(() => {
    if (heroImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages]);

  return (
    <div className="bg-white">
    {/* HERO SLIDER SECTION */}
    <section className="relative h-75 sm:h-105 md:h-130 overflow-hidden">
      {/* Background (Image Slider) */}
      <div
        className="absolute inset-0 bg-center bg-cover transition-all duration-1000"
        style={{
          backgroundImage: heroImages.length
            ? `url(${heroImages[currentIndex]})`
            : "linear-gradient(to right, #1d4ed8, #2563eb)",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Find Your Perfect Ride with TravelEase
        </h1>
        <p className="max-w-2xl mb-6 text-lg">
          Discover the best vehicles for your journey. Safe, affordable, and easy booking
          experience.
        </p>
        <Link
          to="/allVehicles"
          className="bg-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Explore Vehicles
        </Link>
      </div>
    </section>





      {/* LATEST VEHICLES SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-8 text-center">
          Latest Vehicles
        </h2>

        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg text-blue-600"></span>
          </div>
        ) : latestVehicles.length === 0 ? (
          <p className="text-center text-gray-500">
            No vehicles available.
          </p>
        ) : (
          <>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
            {latestVehicles.map((vehicle) => (
            <motion.div
              key={vehicle._id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -10 }}
              className="bg-white border border-blue-100 rounded-2xl 
              shadow-sm hover:shadow-2xl 
              transition-all duration-500 overflow-hidden"
            >
            {/* Image */}
            <div className="overflow-hidden rounded-t-2xl">
              <motion.img
                src={vehicle.coverImage}
                alt={vehicle.vehicleName}
                className="w-full h-44 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg sm:text-xl font-semibold text-blue-600">
                {vehicle.vehicleName}
              </h3>

              <p className="text-sm text-gray-600">
                Location: {vehicle.location}
              </p>

              <p className="text-sm text-gray-600">
                Category: {vehicle.category}
              </p>

              <p className="text-sm font-medium text-gray-700">
                ${vehicle.pricePerDay} / day
              </p>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to={`/vehicle/${vehicle._id}`}
                  className="block text-center mt-3 
                  bg-blue-600 text-white py-2 rounded-lg 
                  hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </motion.div>
            </div>
            </motion.div>
            ))}
            </motion.div>


            {/* View All Button */}
            <div className="text-center mt-10">
              <Link
                to="/allVehicles"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition font-semibold"
              >
                View All Vehicles
              </Link>
            </div>
          </>
        )}
      </section>


      {/* WHY CHOOSE US SECTION */}
      <section className="bg-blue-50 py-16 px-4">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-10">
          Why Choose TravelEase?
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Wide Selection
            </h3>
            <p className="text-gray-600">
              Choose from sedans, SUVs, electric cars, and vans for every need.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Affordable Prices
            </h3>
            <p className="text-gray-600">
              Competitive daily pricing with no hidden fees.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Secure Booking
            </h3>
            <p className="text-gray-600">
              Safe and reliable booking system with date validation.
            </p>
          </div>
        </div>
      </section>

      {/*POPULAR CATEGORIES SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-8">
          Popular Categories
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {["Sedan", "SUV", "Electric", "Van"].map((cat) => (
            <div
              key={cat}
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition cursor-pointer"
            >
              {cat}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
