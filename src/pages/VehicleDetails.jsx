import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const baseURL = "http://localhost:3000";

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseURL}/vehicles/${id}`);
        setVehicle(res.data);
      } catch (error) {
        toast.error("Failed to load vehicle");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (!vehicle?._id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full border border-blue-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-600">Not Found</h2>
          <p className="text-gray-600 mt-2">This vehicle does not exist.</p>
          <button
            onClick={() => navigate("/allVehicles")}
            className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to All Vehicles
          </button>
        </div>
      </div>
    );
  }

  const {
    vehicleName,
    owner,
    category,
    categories,
    pricePerDay,
    location,
    availability,
    description,
    coverImage,
    userEmail,
    createdAt,
  } = vehicle;

  const handleBookNow = () => {
    // Booking feature will added next reminded here for me!
    toast.success("Booking feature will be added next");
  };

  return (
    <div className="bg-white min-h-screen max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="border border-blue-100 rounded-2xl p-3 shadow-sm">
          <img
            src={coverImage}
            alt={vehicleName}
            className="w-full h-[380px] object-cover rounded-xl"
          />
        </div>

        {/* Details */}
        <div className="border border-blue-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-blue-600">{vehicleName}</h2>

          <div className="mt-4 space-y-2 text-gray-700">
            <p>
              <span className="font-semibold text-blue-600">Owner:</span>{" "}
              {owner}
            </p>
            <p>
              <span className="font-semibold text-blue-600">Category:</span>{" "}
              {category}
            </p>
            <p>
              <span className="font-semibold text-blue-600">Tag:</span>{" "}
              {categories || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-blue-600">Location:</span>{" "}
              {location}
            </p>
            <p>
              <span className="font-semibold text-blue-600">Availability:</span>{" "}
              {availability}
            </p>
            <p>
              <span className="font-semibold text-blue-600">Price Per Day:</span>{" "}
              ${pricePerDay}
            </p>

            <p className="pt-3">
              <span className="font-semibold text-blue-600">Description:</span>
              <br />
              <span className="text-gray-600">{description}</span>
            </p>

            <div className="pt-3 text-sm text-gray-500">
              <p>
                <span className="font-semibold text-blue-600">Owner Email:</span>{" "}
                {userEmail}
              </p>
              <p>
                <span className="font-semibold text-blue-600">Created At:</span>{" "}
                {createdAt ? new Date(createdAt).toLocaleString() : "N/A"}
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleBookNow}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Book Now
            </button>

            <button
              onClick={() => navigate(-1)}
              className="flex-1 border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
