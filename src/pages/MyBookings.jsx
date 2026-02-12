import { useContext, useEffect, useState } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";


export default function MyBookings() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL = "http://localhost:3000";

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${baseURL}/bookings?email=${user.email}`)
        .then((res) => {
          setBookings(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  const handleCancel = async (id) => {
  const result = await Swal.fire({
    title: "Cancel Booking?",
    text: "This booking will be permanently removed!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Cancel It",
    cancelButtonText: "No, Keep It",
  });

  if (!result.isConfirmed) return;

  try {
    const res = await axios.delete(`${baseURL}/bookings/${id}`);

    if (res.data.deletedCount > 0) {
      Swal.fire({
        title: "Cancelled!",
        text: "Your booking has been cancelled.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });

      setBookings(bookings.filter((b) => b._id !== id));
    }
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Failed to cancel booking.",
      icon: "error",
    });
  }
};


  const calculateTotal = (start, end, price) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24) + 1;
    return diffDays * price;
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
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <div className="border border-blue-100 rounded-xl p-8 text-center">
          <p className="text-gray-600">You have no bookings yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-lg transition p-4"
            >
              <img
                src={b.coverImage}
                alt={b.vehicleName}
                className="w-full h-44 object-cover rounded-xl"
              />

              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-semibold text-blue-600">
                  {b.vehicleName}
                </h3>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Location:</span> {b.location}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Start:</span>{" "}
                  {new Date(b.startDate).toLocaleDateString()}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">End:</span>{" "}
                  {new Date(b.endDate).toLocaleDateString()}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Total Price:</span> $
                  {calculateTotal(
                    b.startDate,
                    b.endDate,
                    b.pricePerDay
                  )}
                </p>

                <button
                  onClick={() => handleCancel(b._id)}
                  className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
