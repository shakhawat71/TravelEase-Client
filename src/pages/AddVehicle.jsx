import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AddVehicle() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const baseURL = import.meta.env.VITE_API_URL;

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    const form = e.target;

    const vehicleName = form.vehicleName.value.trim();
    const owner = form.owner.value.trim();
    const category = form.category.value;
    const categories = form.categories.value; // optional tag-type
    const pricePerDay = Number(form.pricePerDay.value);
    const location = form.location.value.trim();
    const availability = form.availability.value;
    const coverImage = form.coverImage.value.trim();
    const description = form.description.value.trim();

    if (!vehicleName || !owner || !category || !location || !coverImage || !description) {
      return toast.error("Please fill all required fields.");
    }

    if (!pricePerDay || pricePerDay <= 0) {
      return toast.error("Price per day must be a positive number.");
    }

    const vehicleData = {
      vehicleName,
      owner,
      category,              // "Sedan / SUV / Electric / Van"
      pricePerDay,           // number
      location,
      availability,          // "Available / Booked"
      description,
      coverImage,            // imgbb URL
      userEmail: user?.email, // auto
      createdAt: new Date().toISOString(), // auto
      categories,            // optional extra tag
    };

    try {
      setLoading(true);
      const res = await axios.post(`${baseURL}/vehicles`, vehicleData);

      if (res.data?.insertedId) {
        toast.success("Vehicle Added Successfully ✅");
        form.reset();
        navigate("/myVehicle"); // go to My Vehicles after adding
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 max-w-4xl mx-auto px-4 py-10">
      <div className="border border-blue-100 shadow-lg rounded-2xl p-8 bg-base-100">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
          Add a Vehicle
        </h2>

        <form onSubmit={handleAddVehicle} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Vehicle Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-blue-600">
              Vehicle Name *
            </label>
            <input
              name="vehicleName"
              type="text"
              placeholder="Toyota Corolla"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Owner Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-blue-600">
              Owner Name *
            </label>
            <input
              name="owner"
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 text-sm font-medium text-blue-600">
              Category *
            </label>
            <select
              name="category"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-base-100"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Electric">Electric</option>
              <option value="Van">Van</option>
            </select>
          </div>

          {/* Extra Tag: categories */}
          <div>
            <label className="block mb-2 text-sm font-medium text-blue-600">
              Categories (tag)
            </label>
            <select
              name="categories"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-base-100"
              defaultValue="General"
            >
              <option value="General">General</option>
              <option value="Electric">Electric</option>
              <option value="Luxury">Luxury</option>
              <option value="Budget">Budget</option>
              <option value="Family">Family</option>
            </select>
          </div>

          {/* Price Per Day */}
          <div>
            <label className="block mb-2 text-sm font-medium text-blue-600">
              Price Per Day ($) *
            </label>
            <input
              name="pricePerDay"
              type="number"
              placeholder="70"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              min="1"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 text-sm font-medium text-blue-600">
              Location *
            </label>
            <input
              name="location"
              type="text"
              placeholder="Dhaka, Bangladesh"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Availability */}
          <div>
            <label className="block mb-2 text-sm font-medium text-blue-600">
              Availability *
            </label>
            <select
              name="availability"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-base-100"
              required
              defaultValue="Available"
            >
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
            </select>
          </div>

          {/* User Email (read-only) */}
          <div>
            <label className="block mb-2 text-sm font-medium text-blue-600">
              User Email (Auto)
            </label>
            <input
              type="text"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-2 border border-blue-200 rounded-lg bg-blue-50 text-gray-600"
            />
          </div>

          {/* Cover Image */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-blue-600">
              Cover Image URL (imgbb) *
            </label>
            <input
              name="coverImage"
              type="url"
              placeholder="https://i.ibb.co/..."
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-blue-600">
              Description *
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Comfortable 5-seater with A/C and GPS..."
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
