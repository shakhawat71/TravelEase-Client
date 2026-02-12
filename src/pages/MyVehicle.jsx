import { useContext, useEffect, useState } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";



export default function MyVehicle() {
  const { user } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL = "http://localhost:3000";

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${baseURL}/vehicles?email=${user.email}`)
        .then((res) => {
          setVehicles(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Delete Vehicle?",
    text: "This vehicle will be permanently removed!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Delete It",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    const res = await axios.delete(`${baseURL}/vehicles/${id}`);

    if (res.data.deletedCount > 0) {
      await Swal.fire({
        title: "Deleted!",
        text: "Your vehicle has been removed.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });

      setVehicles(vehicles.filter((v) => v._id !== id));
    }
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Failed to delete vehicle.",
      icon: "error",
    });
  }
};


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
        My Vehicles
      </h2>

      {vehicles.length === 0 ? (
        <div className="border border-blue-100 rounded-xl p-8 text-center">
          <p className="text-gray-600">You have not added any vehicles yet.</p>
        </div>
      ) : (
  <motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
>
  {vehicles.map((vehicle) => (
        <motion.div
          key={vehicle._id}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
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

        <p className="text-sm text-gray-600">
          Location: {vehicle.location}
        </p>

        <p className="text-sm text-gray-600">
          Category: {vehicle.category}
        </p>

        <p className="text-sm font-medium text-gray-700">
          ${vehicle.pricePerDay} / day
        </p>

        <div className="flex gap-2 mt-3">
          <motion.div whileHover={{ scale: 1.05 }} className="flex-1">
            <Link
              to={`/updateVehicle/${vehicle._id}`}
              className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Update
            </Link>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDelete(vehicle._id)}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  ))}
</motion.div>

      )}
    </div>
  );
}
