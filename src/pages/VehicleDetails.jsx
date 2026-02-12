import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";


export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const baseURL = "http://localhost:3000";

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseURL}/vehicles/${id}`);
        setVehicle(res.data);
      } catch (error) {
        toast.error("Failed to load vehicle");
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

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-blue-600 text-xl font-semibold">
          Vehicle not found
        </p>
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

  const handleBookNow = async () => {
  if (!startDate || !endDate) {
    return toast.error("Please select booking dates");
  }

  if (new Date(startDate) > new Date(endDate)) {
    return toast.error("End date must be after start date");
  }

  const totalDays =
    (new Date(endDate) - new Date(startDate)) /
      (1000 * 60 * 60 * 24) +
    1;

  const totalPrice = totalDays * pricePerDay;

  const confirm = await Swal.fire({
    title: "Confirm Booking?",
    html: `
      <p><strong>Vehicle:</strong> ${vehicleName}</p>
      <p><strong>From:</strong> ${startDate}</p>
      <p><strong>To:</strong> ${endDate}</p>
      <p><strong>Total Days:</strong> ${totalDays}</p>
      <p><strong>Total Price:</strong> $${totalPrice}</p>
    `,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm Booking",
  });

  if (!confirm.isConfirmed) return;

  const bookingData = {
    vehicleId: vehicle._id,
    vehicleName,
    coverImage,
    pricePerDay,
    location,
    owner,
    startDate,
    endDate,
    bookingDate: new Date().toISOString(),
    userEmail: user?.email,
    userName: user?.displayName,
  };

  try {
    const res = await axios.post(`${baseURL}/bookings`, bookingData);

    if (res.data?.insertedId) {
      await Swal.fire({
        title: "Booked Successfully!",
        text: "Your vehicle has been booked.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });

      navigate("/myBookings");
    }
  } catch (error) {
    Swal.fire({
      title: "Booking Failed",
      text:
        error.response?.data?.message ||
        "This vehicle is already booked for selected dates.",
      icon: "error",
    });
  }
};


  return (
    <div className="bg-white min-h-screen max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Image */}
        <div className="border border-blue-100 rounded-2xl p-3 shadow-sm">
          <img
            src={coverImage}
            alt={vehicleName}
            className="w-full h-100 object-cover rounded-xl"
          />
        </div>

        {/* Details */}
        <div className="border border-blue-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            {vehicleName}
          </h2>

          <div className="space-y-2 text-gray-700">
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
          </div>

          <div className="mt-4">
            <span className="font-semibold text-blue-600">Description:</span>
            <p className="text-gray-600 mt-1">{description}</p>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            <p>
              <span className="font-semibold text-blue-600">Owner Email:</span>{" "}
              {userEmail}
            </p>
            <p>
              <span className="font-semibold text-blue-600">Created At:</span>{" "}
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>

          {/* Booking Section */}
          <div className="mt-8 space-y-4">

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-blue-600 font-medium mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm text-blue-600 font-medium mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleBookNow}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition shadow-md"
              >
                Book Now
              </button>

              <button
                onClick={() => navigate(-1)}
                className="flex-1 border border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50 transition"
              >
                Back
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
