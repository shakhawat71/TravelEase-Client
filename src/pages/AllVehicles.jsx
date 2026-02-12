import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend (WSL) running on 3000
  const baseURL = "http://localhost:3000";

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setLoading(true);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">All Vehicles</h2>

      {vehicles.length === 0 ? (
        <div className="border border-blue-100 rounded-xl p-8 text-center">
          <p className="text-gray-600">No vehicles found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-lg transition p-4"
            >
              <img
                src={vehicle?.coverImage}
                alt={vehicle?.vehicleName}
                className="w-full h-48 object-cover rounded-xl"
              />

              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-semibold text-blue-600">
                  {vehicle?.vehicleName}
                </h3>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Category:</span>{" "}
                  {vehicle?.category}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Location:</span>{" "}
                  {vehicle?.location}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Availability:</span>{" "}
                  {vehicle?.availability}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Price/Day:</span>{" "}
                  ${vehicle?.pricePerDay}
                </p>

                <div className="pt-3">
                  <Link
                    to={`/vehicle/${vehicle._id}`}
                    className="inline-block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
