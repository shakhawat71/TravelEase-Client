import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function AllVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const res = await axios.get(`${baseURL}/vehicles`);
        setVehicles(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];

    if (categoryFilter !== "All") {
      result = result.filter((v) => v.category === categoryFilter);
    }

    if (searchLocation.trim() !== "") {
      result = result.filter((v) =>
        (v.location || "").toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    if (sortOrder === "low") result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sortOrder === "high") result.sort((a, b) => b.pricePerDay - a.pricePerDay);

    return result;
  }, [vehicles, categoryFilter, sortOrder, searchLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">All Vehicles</h2>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-blue-200 rounded-lg px-3 py-2 bg-base-100 text-base-content
                     focus:ring-2 focus:ring-blue-400"
        >
          <option value="All" className="text-black">All Categories</option>
          <option value="Sedan" className="text-black">Sedan</option>
          <option value="SUV" className="text-black">SUV</option>
          <option value="Electric" className="text-black">Electric</option>
          <option value="Van" className="text-black">Van</option>
        </select>

        {/* Sort */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-blue-200 rounded-lg px-3 py-2 bg-base-100 text-base-content
                     focus:ring-2 focus:ring-blue-400"
        >
          <option value="" className="text-black">Sort by Price</option>
          <option value="low" className="text-black">Low → High</option>
          <option value="high" className="text-black">High → Low</option>
        </select>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="border border-blue-200 rounded-lg px-3 py-2 bg-base-100 text-base-content
                     placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Vehicles Grid */}
      {filteredVehicles.length === 0 ? (
        <div className="border border-base-200 rounded-xl p-8 text-center bg-base-100">
          <p className="text-base-content/70">No vehicles match your criteria.</p>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredVehicles.map((vehicle) => (
            <motion.div
              key={vehicle._id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -10 }}
              className="border border-base-200 rounded-2xl shadow-sm hover:shadow-2xl
                         transition-all duration-500 overflow-hidden bg-base-100"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-t-2xl">
                <motion.img
                  src={vehicle.coverImage}
                  alt={vehicle.vehicleName}
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-600">
                  {vehicle.vehicleName}
                </h3>

                <p className="text-sm text-base-content/70">
                  Location: {vehicle.location}
                </p>

                <p className="text-sm text-base-content/70">
                  Category: {vehicle.category}
                </p>

                <p className="text-sm font-medium text-base-content">
                  ${vehicle.pricePerDay} / day
                </p>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to={`/vehicle/${vehicle._id}`}
                    className="block text-center mt-3 bg-blue-600 text-white py-2 rounded-lg
                               hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
