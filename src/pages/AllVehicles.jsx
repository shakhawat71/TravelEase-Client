import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const baseURL = "http://localhost:3000";

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

  // 🔥 Filtering & Sorting Logic
  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];

    // Filter by category
    if (categoryFilter !== "All") {
      result = result.filter(
        (v) => v.category === categoryFilter
      );
    }

    // Search by location
    if (searchLocation.trim() !== "") {
      result = result.filter((v) =>
        v.location
          .toLowerCase()
          .includes(searchLocation.toLowerCase())
      );
    }

    // Sort by price
    if (sortOrder === "low") {
      result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    }

    if (sortOrder === "high") {
      result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }

    return result;
  }, [vehicles, categoryFilter, sortOrder, searchLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">
        All Vehicles
      </h2>

      {/* 🔥 Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-blue-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All Categories</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Electric">Electric</option>
          <option value="Van">Van</option>
        </select>

        {/* Sort */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-blue-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Sort by Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="border border-blue-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Vehicles Grid */}
      {filteredVehicles.length === 0 ? (
        <div className="border border-blue-100 rounded-xl p-8 text-center">
          <p className="text-gray-600">
            No vehicles match your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-lg transition p-4"
            >
              <img
                src={vehicle.coverImage}
                alt={vehicle.vehicleName}
                className="w-full h-48 object-cover rounded-xl"
              />

              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-semibold text-blue-600">
                  {vehicle.vehicleName}
                </h3>

                <p className="text-sm text-gray-600">
                  Category: {vehicle.category}
                </p>

                <p className="text-sm text-gray-600">
                  Location: {vehicle.location}
                </p>

                <p className="text-sm text-gray-600">
                  Price/Day: ${vehicle.pricePerDay}
                </p>

                <Link
                  to={`/vehicle/${vehicle._id}`}
                  className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-3"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
