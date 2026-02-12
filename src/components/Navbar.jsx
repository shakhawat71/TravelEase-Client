import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-500";

  const buttonStyle = ({ isActive }) =>
    isActive
      ? "btn btn-sm bg-blue-600 text-white border-none"
      : "btn btn-sm bg-white text-gray-700 border border-gray-300 hover:bg-blue-50";

  const handleLogout = () => {
    logoutUser()
      .then(() => toast.success("Logged out"))
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="navbar bg-white shadow-sm px-4">
      {/* LEFT */}
      <div className="navbar-start">
        {/* MOBILE DROPDOWN */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn bg-black text-white hover:bg-gray-800 border-none lg:hidden"
          >
            ☰
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-white rounded-box w-52"
          >
            <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
            <li><NavLink to="/allVehicles" className={navLinkStyle}>All Vehicles</NavLink></li>
            <li><NavLink to="/addVehicle" className={navLinkStyle}>Add Vehicle</NavLink></li>
            <li><NavLink to="/myVehicle" className={navLinkStyle}>My Vehicles</NavLink></li>
            <li><NavLink to="/myBookings" className={navLinkStyle}>My Bookings</NavLink></li>

            {!user ? (
              <>
                <li><NavLink to="/login" className={navLinkStyle}>Login</NavLink></li>
                <li><NavLink to="/register" className={navLinkStyle}>Register</NavLink></li>
              </>
            ) : (
              <li>
                <button onClick={handleLogout} className="text-red-600">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TravelEase
        </Link>
      </div>

      {/* CENTER (Desktop Menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
          <li><NavLink to="/allVehicles" className={navLinkStyle}>All Vehicles</NavLink></li>
          <li><NavLink to="/addVehicle" className={navLinkStyle}>Add Vehicle</NavLink></li>
          <li><NavLink to="/myVehicle" className={navLinkStyle}>My Vehicles</NavLink></li>
          <li><NavLink to="/myBookings" className={navLinkStyle}>My Bookings</NavLink></li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end">
        {!user ? (
          <div className="flex gap-2">
            <NavLink to="/login" className={buttonStyle}>
              Login
            </NavLink>
            <NavLink to="/register" className={buttonStyle}>
              Register
            </NavLink>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            {/* Avatar button */}
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border border-blue-200">
                <img
                  src={user?.photoURL || "https://i.ibb.co/2FsfXqM/user.png"}
                  alt="user"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Dropdown */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-4 shadow bg-white rounded-box w-72 border border-blue-100"
            >
              <li className="pointer-events-none">
                <div className="flex items-center gap-3 bg-white">
                  <img
                    className="w-12 h-12 rounded-full border border-blue-200 object-cover"
                    src={user?.photoURL || "https://i.ibb.co/2FsfXqM/user.png"}
                    alt="user"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="font-semibold text-blue-600">
                      {user?.displayName || "No Name"}
                    </p>
                    <p className="text-xs text-gray-600 break-all">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </li>

              <li className="mt-2">
                <button
                  onClick={handleLogout}
                  className="btn btn-sm bg-blue-600 text-white border-none hover:bg-blue-700 w-full"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
