import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { AnimatePresence } from "framer-motion";


export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const baseURL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const loadVehicle = async () => {
      try {
        const res = await axios.get(`${baseURL}/vehicles/${id}`);
        setVehicle(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadVehicle();
  }, [id]);

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

    const totalPrice = totalDays * vehicle.pricePerDay;

    const confirm = await Swal.fire({
      title: "Confirm Booking?",
      html: `
        <p><strong>${vehicle.vehicleName}</strong></p>
        <p>From: ${startDate}</p>
        <p>To: ${endDate}</p>
        <p>Total Days: ${totalDays}</p>
        <p>Total Price: $${totalPrice}</p>
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
      vehicleName: vehicle.vehicleName,
      coverImage: vehicle.coverImage,
      pricePerDay: vehicle.pricePerDay,
      location: vehicle.location,
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
          icon: "success",
          confirmButtonColor: "#2563eb",
        });

        navigate("/myBookings");
      }
    } catch (error) {
      Swal.fire({
        title: "Booking Failed",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Vehicle not found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-base-100 px-4 py-10"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-base-100 rounded-2xl shadow-lg border border-blue-100 overflow-hidden"
      >
        {/* Image */}
        <motion.img
          src={vehicle.coverImage}
          alt={vehicle.vehicleName}
          className="w-full h-72 object-cover"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="p-6 space-y-3"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">
            {vehicle.vehicleName}
          </h2>

          <p className="text-gray-600">
            <strong>Category:</strong> {vehicle.category}
          </p>

          <p className="text-gray-600">
            <strong>Location:</strong> {vehicle.location}
          </p>

          <p className="text-gray-600">
            <strong>Price Per Day:</strong> ${vehicle.pricePerDay}
          </p>

          <p className="text-gray-600">
            <strong>Description:</strong> {vehicle.description}
          </p>

          {/* Booking Section */}
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-blue-200 rounded-lg px-3 py-2"
              />

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-blue-200 rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookNow}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Book Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="flex-1 border border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50 transition"
              >
                Back
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
