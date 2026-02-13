import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CATEGORY_OPTIONS = ["Sedan", "SUV", "Electric", "Van"];
const TAG_OPTIONS = ["General", "Electric", "Luxury", "Budget", "Family"];
const AVAILABILITY_OPTIONS = ["Available", "Booked"];

export default function UpdateVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const baseURL = "http://localhost:3000";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    vehicleName: "",
    owner: "",
    category: "",
    categories: "General",
    pricePerDay: "",
    location: "",
    availability: "Available",
    coverImage: "",
    description: "",
    userEmail: "",
  });

  const isOwner = useMemo(() => {
    return !!user?.email && user.email === form.userEmail;
  }, [user?.email, form.userEmail]);

  // Load vehicle
  useEffect(() => {
    const loadVehicle = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseURL}/vehicles/${id}`);
        const v = res.data;

        if (!v?._id) {
          toast.error("Vehicle not found");
          navigate("/myVehicle");
          return;
        }

        setForm({
          vehicleName: v.vehicleName || "",
          owner: v.owner || "",
          category: v.category || "",
          categories: v.categories || "General",
          pricePerDay: v.pricePerDay ?? "",
          location: v.location || "",
          availability: v.availability || "Available",
          coverImage: v.coverImage || "",
          description: v.description || "",
          userEmail: v.userEmail || "",
        });
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        toast.error("Failed to load vehicle");
      } finally {
        setLoading(false);
      }
    };

    loadVehicle();
  }, [id, navigate]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.vehicleName.trim()) return "Vehicle name is required";
    if (!form.owner.trim()) return "Owner name is required";
    if (!form.category) return "Category is required";
    if (!form.location.trim()) return "Location is required";
    if (!form.coverImage.trim()) return "Cover image URL is required";
    if (!form.description.trim()) return "Description is required";

    const price = Number(form.pricePerDay);
    if (!price || price <= 0) return "Price per day must be a positive number";

    return null;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // (optional) only owner can update
    if (form.userEmail && user?.email && user.email !== form.userEmail) {
      return Swal.fire({
        title: "Not allowed",
        text: "You can only update your own vehicles.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }

    const errorMsg = validate();
    if (errorMsg) return toast.error(errorMsg);

    const confirm = await Swal.fire({
      title: "Update Vehicle?",
      text: "Your changes will be saved.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    const payload = {
      vehicleName: form.vehicleName.trim(),
      owner: form.owner.trim(),
      category: form.category,
      categories: form.categories,
      pricePerDay: Number(form.pricePerDay),
      location: form.location.trim(),
      availability: form.availability,
      coverImage: form.coverImage.trim(),
      description: form.description.trim(),
      // do NOT change userEmail, createdAt from update page
    };

    try {
      setSaving(true);
      const res = await axios.patch(`${baseURL}/vehicles/${id}`, payload);

      if (res.data?.modifiedCount > 0) {
        await Swal.fire({
          title: "Updated!",
          text: "Vehicle updated successfully.",
          icon: "success",
          confirmButtonColor: "#2563eb",
        });
        navigate("/myVehicle");
      } else {
        toast("No changes were made.");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 max-w-4xl mx-auto px-4 py-10">
      <div className="border border-blue-100 shadow-lg rounded-2xl p-8 bg-base-100">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Update Vehicle
        </h2>

        {!isOwner && form.userEmail ? (
          <div className="mb-6 border border-red-200 bg-red-50 text-red-600 rounded-xl p-4">
            You are viewing a vehicle that does not belong to your account. Updating is not allowed.
          </div>
        ) : null}

        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Vehicle Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-blue-600">
              Vehicle Name *
            </label>
            <input
              name="vehicleName"
              type="text"
              value={form.vehicleName}
              onChange={onChange}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Owner */}
          <div>
            <label className="block mb-2 text-sm font-medium text-blue-600">
              Owner Name *
            </label>
            <input
              name="owner"
              type="text"
              value={form.owner}
              onChange={onChange}
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
              value={form.category}
              onChange={onChange}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg bg-base-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Tag */}
          <div>
            <label className="block mb-2 text-sm font-medium text-blue-600">
              Categories (tag)
            </label>
            <select
              name="categories"
              value={form.categories}
              onChange={onChange}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg bg-base-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {TAG_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 text-sm font-medium text-blue-600">
              Price Per Day ($) *
            </label>
            <input
              name="pricePerDay"
              type="number"
              min="1"
              value={form.pricePerDay}
              onChange={onChange}
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
              value={form.availability}
              onChange={onChange}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg bg-base-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              {AVAILABILITY_OPTIONS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-blue-600">
              Location *
            </label>
            <input
              name="location"
              type="text"
              value={form.location}
              onChange={onChange}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Cover Image */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-blue-600">
              Cover Image URL *
            </label>
            <input
              name="coverImage"
              type="url"
              value={form.coverImage}
              onChange={onChange}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {form.coverImage ? (
              <img
                src={form.coverImage}
                alt="preview"
                className="mt-3 w-full max-h-64 object-cover rounded-xl border border-blue-100"
              />
            ) : null}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-blue-600">
              Description *
            </label>
            <textarea
              name="description"
              rows="4"
              value={form.description}
              onChange={onChange}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex gap-4 pt-2">
            <button
              type="submit"
              disabled={saving || (!isOwner && !!form.userEmail)}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
            >
              {saving ? "Updating..." : "Update Vehicle"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 border border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
