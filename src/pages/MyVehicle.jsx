import { useContext, useEffect, useState } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";


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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
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
                  <span className="font-medium">Price/Day:</span>{" "}
                  ${vehicle.pricePerDay}
                </p>

                <div className="flex gap-2 pt-3">
                  <Link
                    to={`/vehicle/${vehicle._id}`}
                    className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View
                  </Link>

                  <Link
                    to={`/updateVehicle/${vehicle._id}`}
                    className="flex-1 text-center border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition"
                  >
                    Update
                  </Link>

                  <button
                    onClick={() => handleDelete(vehicle._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
